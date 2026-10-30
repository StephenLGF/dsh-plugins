import assert from 'node:assert/strict'
import test from 'node:test'
import { createTaskReportService, loadTaskReportConstraints } from '../plugins/tomato-board/src/task-report.ts'
import { reportWeek, suggestReportDays } from '../plugins/tomato-board/src/task-report-model.ts'

const user = { userId: 'owner1', username: 'alice' }
const input = {
  itemKey: 'Task-1', expectedStatus: '新建', expectedStart: '2026-10-27', expectedEnd: '2026-10-27',
  expectedActualDays: null, expectedActualStart: '', expectedActualEnd: '', days: .5, actualStart: '2026-10-27', actualEnd: '2026-10-27',
}

function setup({ status = '新建', owner = 'owner1', disabled = false, directDone = false, failExecute = false, partialEdit = false, reassign = false, ambiguous = false, drift = false } = {}) {
  const calls = []
  let edits = 0
  const item = { itemType: { name: 'Task' }, status: { name: status }, values: {
    DateSDate: '2026-10-27', qiwangwanchengriqi: '2026-10-27', assignee: [{ objectId: owner }],
  } }
  const run = async args => {
    calls.push(args)
    if (args[1] === 'item' && args[2] === 'view') return structuredClone(item)
    if (args[1] === 'item' && args[2] === 'edit') {
      edits++
      const values = JSON.parse(args[args.indexOf('--values') + 1])
      Object.assign(item.values, values)
      if (partialEdit) delete item.values.StoryPoint1
      if (reassign) item.values.assignee = [{ objectId: 'other' }]
      return {}
    }
    if (args[2] === 'list') {
      const targetStatus = item.status.name === '新建' ? '进行中' : directDone ? '已完成' : '工时核对中'
      const edges = [{ transition: item.status.name === '新建' ? '实际开始按钮' : '实际提交按钮', targetStatus, disabled, ...(disabled ? { disabledReason: '所属团队必填' } : {}) }]
      if (ambiguous) edges.push({ transition: '另一按钮', targetStatus, disabled: false })
      if (drift && edits) item.status.name = '已取消'
      return edges
    }
    if (args[2] === 'execute') {
      if (failExecute) throw new Error('写响应丢失')
      item.status.name = item.status.name === '新建' ? '进行中' : directDone ? '已完成' : '工时核对中'
      return {}
    }
    throw new Error(`unexpected CLI: ${args}`)
  }
  return { item, calls, report: (value = input, constraints = {}) => createTaskReportService(run)(value, user, '2026-10-26', '2026-11-01', constraints) }
}

test('report weeks start Monday, including year and Sunday boundaries', () => {
  assert.equal(reportWeek('2026-10-30'), '2026-10-26')
  assert.equal(reportWeek('2026-11-01'), '2026-10-26')
  assert.equal(reportWeek('2027-01-01'), '2026-12-28')
})

test('shares each day in half-day units and sums multi-day Tasks', () => {
  const allocation = suggestReportDays([
    { itemKey: 'Task-1', start: '2026-10-26', end: '2026-10-28' },
    { itemKey: 'Task-2', start: '2026-10-27', end: '2026-10-27' },
  ], '2026-10-26')
  assert.deepEqual(allocation, { days: { 'Task-1': 2.5, 'Task-2': .5 }, conflicts: [] })
  const crowded = suggestReportDays([1, 2, 3].map(id => ({ itemKey: `Task-${id}`, start: '2026-10-27', end: '2026-10-27' })), '2026-10-26')
  assert.deepEqual(crowded.conflicts, [{ date: '2026-10-27', itemKeys: ['Task-1', 'Task-2', 'Task-3'] }])
  assert.equal(Object.values(crowded.days).reduce((sum, value) => sum + value, 0), 0)
})

test('clips suggested effort to the selected week', () => {
  const allocation = suggestReportDays([{ itemKey: 'Task-1', start: '2026-10-25', end: '2026-10-27' }], '2026-10-26')
  assert.equal(allocation.days['Task-1'], 2)
})

test('writes and verifies actual effort before following exact live edges to review, and never approves', async () => {
  const ctx = setup()
  const result = await ctx.report()
  assert.equal(result.outcome, 'success')
  assert.equal(result.fieldsWritten, true)
  assert.equal(result.currentStatus, '工时核对中')
  assert.deepEqual(result.steps, ['新建 → 进行中', '进行中 → 工时核对中'])
  assert.deepEqual(ctx.calls.filter(args => args[2] === 'execute').map(args => args.at(-1)), ['实际开始按钮', '实际提交按钮'])
  assert.equal(ctx.item.values.StoryPoint1, .5)
  assert.equal(ctx.calls.filter(args => args[2] === 'edit').length, 1)
})

test('an in-progress Task can follow the workflow directly to completed', async () => {
  const ctx = setup({ status: '进行中', directDone: true })
  const result = await ctx.report({ ...input, expectedStatus: '进行中' })
  assert.equal(result.outcome, 'success')
  assert.equal(result.currentStatus, '已完成')
  assert.equal(result.steps.length, 1)
})

test('already reviewed or completed Tasks are skipped without any writes', async () => {
  for (const status of ['工时核对中', '已完成']) {
    const ctx = setup({ status })
    assert.equal((await ctx.report()).outcome, 'skipped')
    assert.equal(ctx.calls.some(args => ['edit', 'execute'].includes(args[2])), false)
  }
})

test('rejects stale owner, status or actual effort without writes', async () => {
  for (const options of [{ owner: 'other' }, { status: '已取消' }, {}]) {
    const ctx = setup(options)
    if (!Object.keys(options).length) ctx.item.values.StoryPoint1 = 1
    const result = await ctx.report()
    assert.equal(result.outcome, 'failed')
    assert.equal(ctx.calls.some(args => ['edit', 'execute'].includes(args[2])), false)
  }
})

test('disabled or ambiguous workflows do not change fields', async () => {
  for (const options of [{ disabled: true }, { ambiguous: true }]) {
    const ctx = setup(options)
    const result = await ctx.report()
    assert.equal(result.outcome, 'failed')
    assert.equal(ctx.calls.some(args => args[2] === 'edit'), false)
  }
})

test('follows an enabled completed branch if the review branch is unavailable', async () => {
  const item = { itemType: { name: 'Task' }, status: { name: '进行中' }, values: { DateSDate: '2026-10-27', qiwangwanchengriqi: '2026-10-27', assignee: [{ objectId: 'owner1' }] } }
  const result = await createTaskReportService(async args => {
    if (args[2] === 'view') return structuredClone(item)
    if (args[2] === 'list') return [
      { transition: '提交核对', targetStatus: '工时核对中', disabled: true },
      { transition: '团队工时', targetStatus: '已完成', disabled: false },
    ]
    if (args[2] === 'edit') Object.assign(item.values, JSON.parse(args.at(-1)))
    if (args[2] === 'execute') { assert.equal(args.at(-1), '团队工时'); item.status.name = '已完成' }
    return {}
  })({ ...input, expectedStatus: '进行中' }, user, '2026-10-26', '2026-11-01')
  assert.equal(result.outcome, 'success')
})

test('partial field persistence stops transitions and reports an unverified outcome', async () => {
  const ctx = setup({ partialEdit: true })
  const result = await ctx.report()
  assert.equal(result.outcome, 'unknown')
  assert.equal(ctx.calls.some(args => args[2] === 'execute'), false)
  assert.match(result.error, /回读不一致/)
})

test('an uncertain transition response is reread and never retried', async () => {
  const ctx = setup({ failExecute: true })
  const result = await ctx.report()
  assert.equal(result.outcome, 'unknown')
  assert.equal(result.fieldsWritten, true)
  assert.equal(ctx.calls.filter(args => args[2] === 'execute').length, 1)
  assert.equal(ctx.calls.at(-1)[2], 'view')
})

test('ownership or status changes between steps stop further transitions with partial results', async () => {
  for (const options of [{ reassign: true }, { drift: true }]) {
    const ctx = setup(options)
    const result = await ctx.report()
    assert.equal(result.outcome, 'partial')
    assert.equal(result.fieldsWritten, true)
    assert.equal(ctx.calls.some(args => args[2] === 'execute'), false)
  }
})

test('half-day increments, real dates and server field constraints are enforced before writes', async () => {
  for (const [changes, constraints] of [
    [{ days: .25 }, {}], [{ actualEnd: '2026-02-30' }, {}], [{ days: 0 }, {}],
    [{}, { finishRange: ['2026-10-28', '2026-10-30'] }], [{ days: 10 }, { daysMax: 7 }],
  ]) {
    const ctx = setup()
    const result = await ctx.report({ ...input, ...changes }, constraints)
    assert.equal(result.outcome, 'failed')
    assert.equal(ctx.calls.length, 0)
  }
})

test('discovers actual date bounds and effort constraints by exact field key', async () => {
  const constraints = await loadTaskReportConstraints(async args => ({ fields: [{ key: args[args.indexOf('--keyword') + 1], property: args.includes('ActualFinishTime') ? { range: [1792684800000, 1793289600000] } : { min: 0, max: 20 } }] }))
  assert.deepEqual(constraints, { finishRange: ['2026-10-23', '2026-10-30'], daysMin: 0, daysMax: 20 })
  await assert.rejects(() => loadTaskReportConstraints(async () => ({ fields: [] })), /字段约束/)
})
