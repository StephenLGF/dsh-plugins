import test from 'node:test'
import assert from 'node:assert/strict'
import { createTaskBugService } from '../plugins/tomato-board/src/task-bugs.ts'

function setup() {
  const calls = []
  const target = { key: 'Bug-1', objectId: 'bug1', name: '订阅失败', itemType: { name: 'Bug' }, status: { name: '待测试' } }
  const source = { key: 'Task-1', objectId: 'task1', itemType: { name: 'Task' }, ancestor: { objectId: 'story1', key: 'Story-1', name: '父需求' }, values: { assignee: [{ objectId: 'owner1' }] } }
  const state = { linked: false, owner: 'owner1', edits: 0 }
  const service = createTaskBugService(async args => {
    calls.push(args)
    if (args[1] === 'user') return { userId: state.owner }
    if (args[2] === 'view') return args[3] === 'Task-1' ? source : target
    if (args[2] === 'search') {
      const iql = args[args.indexOf('--iql') + 1]
      const linked = iql.includes('linkedItemsOf')
      return { count: linked && !state.linked ? 0 : 1, items: linked && !state.linked ? [] : [target] }
    }
    if (args[2] === 'edit') { state.edits++; state.linked = true; return { success: true } }
    throw new Error('unexpected command')
  }, { bugLinkTypeId: 'native-relates' })
  return { service, calls, state }
}

test('suggests defects from the parent implementation hierarchy and reads live statuses', async () => {
  const { service, calls } = setup()
  const data = await service.load('Task-1')
  assert.deepEqual(data.parent, { itemKey: 'Story-1', title: '父需求' })
  assert.deepEqual(data.linked, [])
  assert.equal(data.suggested[0].status, '待测试')
  assert.ok(calls.some(args => args.includes('类型 in ["Bug","测试缺陷","线上Bug","升级问题"] and (ancestors in ["story1"])')))
  assert.equal(calls.filter(args => args[2] === 'edit').length, 0)
})

test('writes native Relations and skips an already linked Bug', async () => {
  const { service, calls, state } = setup()
  await service.link('Task-1', 'Bug-1')
  const edit = calls.find(args => args[2] === 'edit')
  assert.deepEqual(JSON.parse(edit[edit.indexOf('--values') + 1]), { Relations: { links: [{ linkType: 'native-relates', destinationItems: ['bug1'] }] } })
  await service.link('Task-1', 'Bug-1')
  assert.equal(state.edits, 1)
  assert.equal((await service.load('Task-1')).linked[0].status, '待测试')
})

test('rejects relationship writes to another owner’s Task', async () => {
  const { service, state } = setup()
  state.owner = 'other-owner'
  await assert.rejects(service.link('Task-1', 'Bug-1'), /自己负责/)
  assert.equal(state.edits, 0)
})

test('supports exact Bug number lookup and validates the source key', async () => {
  const { service } = setup()
  assert.equal((await service.load('Task-1', 'Bug-1')).items[0].itemKey, 'Bug-1')
  await assert.rejects(service.load('invalid'), /无效/)
})

test('counts unique Task keys with caching and updates the cache immediately after linking', async () => {
  const { service, calls } = setup()
  assert.deepEqual(await service.counts(['Task-1', 'Task-1']), { counts: { 'Task-1': 0 }, failed: [] })
  const before = calls.length
  await service.counts(['Task-1'])
  assert.equal(calls.length, before)
  const result = await service.link('Task-1', 'Bug-1')
  assert.equal(result.count, 1)
  const afterLink = calls.length
  assert.deepEqual(await service.counts(['Task-1']), { counts: { 'Task-1': 1 }, failed: [] })
  assert.equal(calls.length, afterLink)
  assert.ok(calls.some(args => args[2] === 'search' && args[args.indexOf('--size') + 1] === '1'))
})

test('failed counts remain unknown and invalid batches never invoke the CLI', async () => {
  const { service, calls } = setup()
  assert.deepEqual(await service.counts(['Task-2']), { counts: {}, failed: ['Task-2'] })
  const before = calls.length
  await assert.rejects(service.counts(['invalid']), /无效/)
  await assert.rejects(service.counts(Array(101).fill('Task-1')), /最多 100/)
  assert.equal(calls.length, before)
})

test('a stale background count cannot overwrite a newer modal result', async () => {
  let release, signalStarted
  const gate = new Promise(resolve => { release = resolve })
  const started = new Promise(resolve => { signalStarted = resolve })
  const service = createTaskBugService(async args => {
    if (args[2] === 'view') return { objectId: 'task1', itemType: { name: 'Task' } }
    if (args[args.indexOf('--size') + 1] === '1') {
      signalStarted(); await gate
      return { count: 0, items: [] }
    }
    return { count: 1, items: [{ key: 'Bug-1', itemType: { name: 'Bug' }, status: { name: '新建' } }] }
  }, {})
  const counting = service.counts(['Task-1'])
  await started
  assert.equal((await service.load('Task-1')).linked.length, 1)
  release()
  assert.deepEqual(await counting, { counts: { 'Task-1': 1 }, failed: [] })
})
