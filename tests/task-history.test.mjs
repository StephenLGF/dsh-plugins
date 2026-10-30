import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Readable } from 'node:stream'
import { registerWorktime } from '../plugins/tomato-board/src/worktime.ts'

async function setup(t, run) {
  const dir = await mkdtemp(join(tmpdir(), 'tomato-live-tasks-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  const routes = []
  registerWorktime({ effect: fn => fn() }, {
    server: { register: route => { routes.push(route); return () => {} } },
    run, crossSite: () => false, scope: 'test', dataFile: join(dir, 'plans.json'), invalidate() {},
  })
  return async (url, input) => {
    const request = Readable.from(input === undefined ? [] : [JSON.stringify(input)])
    Object.assign(request, { method: input === undefined ? 'GET' : 'POST', url })
    const response = { statusCode: 0, setHeader() {}, end(value) { this.body = JSON.parse(value) } }
    await routes.find(route => route.path === url.split('?')[0]).handler(request, response)
    return response
  }
}

const history = '/api/tomato-board/worktime/history?start=2026-10-01&end=2026-10-31'
const task = (username, overrides = {}) => ({
  itemType: { name: 'Task' }, name: '最新标题', status: { name: '修复中' },
  values: { assignee: [{ username, value: `${username}-id` }], DateSDate: '2026-10-20', qiwangwanchengriqi: '2026-10-22', planStoryPoint: 2, ...overrides },
})

test('Task calendar verifies live ownership and dates instead of trusting stale search rows', async t => {
  let transferred = false
  const request = await setup(t, async args => {
    if (args[1] === 'user') return { username: 'alice', userId: 'alice-id' }
    if (args[2] === 'search') return { count: 4, items: ['Task-1', 'Task-2', 'Task-3', 'Task-1'].map(key => ({ key, name: '旧标题' })) }
    if (args[3] === 'Task-1') return task(transferred ? 'bob' : 'alice')
    if (args[3] === 'Task-2') return task('bob')
    return task('alice', { DateSDate: '2026-11-01', qiwangwanchengriqi: '2026-11-02' })
  })
  const first = await request(history)
  assert.equal(first.statusCode, 200)
  assert.deepEqual(first.body.tasks, [{ itemKey: 'Task-1', title: '最新标题', status: '修复中', start: '2026-10-20', end: '2026-10-22', days: 2, actualDays: null, actualStart: '', actualEnd: '' }])
  transferred = true
  assert.deepEqual((await request(history)).body.tasks, [])
  assert.equal((await request(`${history}&assignee=bob`)).body.tasks.length, 2)
})

test('failed detail reads report a refresh failure rather than a successful empty calendar', async t => {
  const request = await setup(t, async args => {
    if (args[1] === 'user') return { username: 'alice' }
    if (args[2] === 'search') return { count: 1, items: [{ key: 'Task-1' }] }
    throw new Error('服务器暂不可用')
  })
  const result = await request(history)
  assert.equal(result.statusCode, 400)
  assert.match(result.body.error, /服务器暂不可用/)
})

test('a reassigned Task cannot be deleted and does not leave a pending deletion journal', async t => {
  const calls = []
  const request = await setup(t, async args => {
    calls.push(args)
    if (args[1] === 'user') return { username: 'alice', userId: 'alice-id' }
    if (args[2] === 'view') return task('bob')
    throw new Error('unexpected write')
  })
  const input = { itemKey: 'Task-1', action: 'delete', confirm: true, expectedStart: '2026-10-20', expectedEnd: '2026-10-22' }
  const result = await request('/api/tomato-board/worktime/task', input)
  assert.equal(result.statusCode, 400)
  assert.match(result.body.error, /当前登录用户/)
  assert.equal(calls.some(args => args[2] === 'delete'), false)
  assert.deepEqual((await request('/api/tomato-board/worktime')).body.units, [])
})

test('report rejects more than two selected Tasks on one day before any CLI call', async t => {
  const request = await setup(t, async () => { throw new Error('must not invoke CLI') })
  const response = await request('/api/tomato-board/worktime/report', {
    start: '2026-10-26', end: '2026-11-01', tasks: [1, 2, 3].map(id => ({ itemKey: `Task-${id}`, expectedStart: '2026-10-27', expectedEnd: '2026-10-27' })),
  })
  assert.equal(response.statusCode, 400)
  assert.match(response.body.error, /超过两个 Task/)
})

test('weekly report returns individual results and keeps another owner’s Task untouched', async t => {
  const items = { 'Task-1': task('alice'), 'Task-2': task('bob') }
  for (const item of Object.values(items)) {
    item.status = { name: '新建' }
    item.values.DateSDate = '2026-10-27'; item.values.qiwangwanchengriqi = '2026-10-27'
  }
  const calls = []
  const request = await setup(t, async args => {
    calls.push(args)
    if (args[1] === 'user') return { userId: 'alice-id', username: 'alice' }
    if (args[1] === 'field') return { fields: [{ key: args[args.indexOf('--keyword') + 1], property: {} }] }
    const item = items[args[3]]
    if (args[2] === 'view') return structuredClone(item)
    if (args[2] === 'edit') { Object.assign(item.values, JSON.parse(args.at(-1))); return {} }
    if (args[2] === 'list') return [{ transition: item.status.name === '新建' ? '开始' : '提交', targetStatus: item.status.name === '新建' ? '进行中' : '工时核对中', disabled: false }]
    if (args[2] === 'execute') { item.status.name = item.status.name === '新建' ? '进行中' : '工时核对中'; return {} }
    throw new Error('unexpected CLI call')
  })
  const response = await request('/api/tomato-board/worktime/report', {
    start: '2026-10-26', end: '2026-11-01', tasks: Object.keys(items).map(itemKey => ({
      itemKey, expectedStatus: '新建', expectedStart: '2026-10-27', expectedEnd: '2026-10-27',
      expectedActualDays: null, expectedActualStart: '', expectedActualEnd: '', days: .5, actualStart: '2026-10-27', actualEnd: '2026-10-27',
    })),
  })
  assert.equal(response.statusCode, 200)
  assert.deepEqual(response.body.results.map(result => result.outcome), ['success', 'failed'])
  assert.equal(items['Task-1'].values.StoryPoint1, .5)
  assert.equal(items['Task-2'].values.StoryPoint1, undefined)
  assert.equal(calls.some(args => ['edit', 'execute'].includes(args[2]) && args[3] === 'Task-2'), false)
})
