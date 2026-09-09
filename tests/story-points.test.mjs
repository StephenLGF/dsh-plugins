import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { apply } from '../plugins/tomato-board/lib/index.js'

function routes(config = {}) {
  const entries = []
  apply({ get: () => ({ register: entry => { entries.push(entry); return () => {} } }), effect: fn => fn() }, config)
  return async (path, method = 'GET', headers = {}) => {
    const route = entries.find(entry => entry.path === path.split('?')[0]) ?? entries.find(entry => entry.kind === 'prefix' && path.startsWith(`${entry.path}/`))
    let body
    const response = { statusCode: 0, setHeader() {}, end: value => { body = JSON.parse(value) } }
    await route.handler({ url: path, method, headers }, response)
    return { status: response.statusCode, body }
  }
}

test('story point endpoints reject invalid inputs and cross-site edits', async () => {
  const request = routes({ executable: '/must-not-run' })
  for (const value of ['', '-1', 'NaN', 'Infinity', 'hello']) {
    assert.equal((await request(`/api/tomato-board/story-point/Story-1?value=${value}`, 'POST')).status, 400)
  }
  assert.equal((await request('/api/tomato-board/story-point/Story-1?value=2', 'POST', { 'sec-fetch-site': 'cross-site' })).status, 403)
  assert.equal((await request('/api/tomato-board/story-points?sprint=bad%22')).status, 400)
  assert.equal((await request('/api/tomato-board/sprints', 'POST')).status, 405)
})

test('statistics paginate, include completed/zero/unestimated cards, and verify edits', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'tomato-points-'))
  try {
    const executable = join(dir, 'gitee')
    await writeFile(executable, `#!/usr/bin/env node
const a = process.argv.slice(2)
const arg = name => a[a.indexOf(name) + 1]
const card = (id, points) => ({key: 'Story-' + id, name: 'Requirement ' + id, itemType: {name: 'Story'}, status: {name: '已完成'}, values: {StoryPoint: points, sprint: [{objectId: 'abc'}]}})
if (a[1] === 'sprint') console.log(JSON.stringify({sprints: [{sprintId: 'abc', name: 'Sprint'}], nextPageIndex: -1}))
else if (a[2] === 'search') {
  if (!arg('--fields').includes('StoryPoint') || !arg('--iql').includes('迭代 = "abc"')) process.exit(1)
  const second = arg('--page') === '2'
  console.log(JSON.stringify({count: 51, nextPageIndex: second ? -1 : 2, items: second ? [card(51, null)] : Array.from({length: 50}, (_, i) => card(i + 1, i === 0 ? 0 : 1))}))
} else if (a[2] === 'edit') { if (JSON.parse(arg('--values')).StoryPoint !== 3.5) process.exit(1); console.log('{}') }
else if (a[2] === 'view') console.log(JSON.stringify(card(1, 3.5)))
else process.exit(1)
`, { mode: 0o755 })
    const request = routes({ executable, excludedStatuses: ['已完成'], iql: '负责人 = "another"' })
    const result = await request('/api/tomato-board/story-points?sprint=abc')
    assert.equal(result.status, 200)
    assert.equal(result.body.items.length, 51)
    assert.equal(result.body.items[0].storyPoints, 0)
    assert.equal(result.body.items[50].storyPoints, null)
    assert.equal(result.body.items.reduce((sum, item) => sum + (item.storyPoints ?? 0), 0), 49)
    assert.equal(result.body.truncated, false)
    assert.equal((await routes({ executable, maxItems: 20 })('/api/tomato-board/story-points?sprint=abc')).body.truncated, true)
    assert.equal((await request('/api/tomato-board/story-point/Story-1?value=3.5', 'POST')).body.storyPoints, 3.5)
    assert.equal((await request('/api/tomato-board/sprints')).body.sprints.length, 1)
  } finally { await rm(dir, { recursive: true, force: true }) }
})
