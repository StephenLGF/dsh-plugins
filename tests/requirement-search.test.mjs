import assert from 'node:assert/strict'
import test from 'node:test'
import { searchRequirements } from '../plugins/tomato-board/src/requirement-search.ts'

const story = { key: 'Story-42', name: '其他同事负责的需求', itemType: { key: 'Story', name: 'Story' }, status: { name: '进行中' }, values: { assignee: [{ username: 'bob', label: '同事(bob)' }] } }

test('searches requirement titles across owners with escaped IQL and a bounded result size', async () => {
  let args
  const query = '图表" or 负责人 = currentUser()'
  const result = await searchRequirements(async value => { args = value; return { count: 30, items: [story] } }, query)
  assert.equal(args[args.indexOf('--iql') + 1], `类型 in ["Story","EnablerStory"] and 标题 ~ ${JSON.stringify(query)}`)
  assert.equal(args[args.indexOf('--size') + 1], '20')
  assert.equal(result.truncated, true)
  assert.deepEqual(result.items, [{ itemKey: 'Story-42', title: story.name, status: '进行中', assignees: ['同事(bob)'] }])
})

test('exact requirement IDs use live detail reads and reject Task results', async () => {
  const result = await searchRequirements(async args => { assert.deepEqual(args, ['team', 'item', 'view', 'Story-42']); return story }, '  Story-42  ')
  assert.equal(result.items.length, 1)
  const task = await searchRequirements(async () => ({ ...story, itemType: { name: 'Task' } }), 'Story-42')
  assert.deepEqual(task.items, [])
})

test('retains enabler requirements, deduplicates keys and excludes unexpected item types', async () => {
  const result = await searchRequirements(async () => ({ count: 4, items: [story, story, { ...story, key: 'Story-43', itemType: { key: 'EnablerStory' } }, { ...story, key: 'Task-1', itemType: { name: 'Task' } }] }), '需求')
  assert.deepEqual(result.items.map(item => item.itemKey), ['Story-42', 'Story-43'])
})

test('empty and overlong queries never invoke the CLI, and server failures remain explicit', async () => {
  let calls = 0
  const run = async () => { calls++; throw new Error('无访问权限') }
  assert.deepEqual(await searchRequirements(run, '  '), { items: [], truncated: false })
  await assert.rejects(() => searchRequirements(run, 'x'.repeat(121)), /最多 120/)
  assert.equal(calls, 0)
  await assert.rejects(() => searchRequirements(run, 'Story-42'), /无访问权限/)
  await assert.rejects(() => searchRequirements(async () => ({}), '图表'), /格式异常/)
})
