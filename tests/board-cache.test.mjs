import assert from 'node:assert/strict'
import test from 'node:test'
import { readBoardCache, writeBoardCache } from '../plugins/tomato-board/src/client/board-cache.ts'

function storage() {
  const entries = new Map()
  return { entries, getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value) }
}
const item = { itemKey: 'Story-1', title: '需求', status: '开发中', itemType: 'Story', workspace: 'Report', workspaceKey: 'Report', workspaceName: '报表',
  creator: 'user', createdAt: '2026-10-27T08:00:00Z', assignees: ['user'], priority: 'P1', tomatoUrl: 'https://example.com/Story-1' }

test('restores the last successful board snapshot while keeping assignee caches separate', () => {
  const local = storage()
  assert.equal(readBoardCache('currentUser()', local), null)
  writeBoardCache('currentUser()', { items: [item], truncated: true }, local)
  assert.deepEqual(readBoardCache('currentUser()', local).items, [item])
  assert.equal(readBoardCache('currentUser()', local).truncated, true)
  assert.equal(readBoardCache('another-user', local), null)
  writeBoardCache('another-user', { items: [{ ...item, itemKey: 'Story-2' }], truncated: false }, local)
  assert.equal(readBoardCache('another-user', local).items[0].itemKey, 'Story-2')
  assert.equal(readBoardCache('currentUser()', local).items[0].itemKey, 'Story-1')
})

test('a successful empty result replaces stale cached cards', () => {
  const local = storage()
  writeBoardCache('user', { items: [item], truncated: true }, local)
  writeBoardCache('user', { items: [], truncated: false }, local)
  assert.deepEqual(readBoardCache('user', local).items, [])
  assert.equal(readBoardCache('user', local).truncated, false)
})

test('damaged, outdated or inaccessible cache data never prevents server loading', () => {
  for (const raw of ['invalid-json', 'null', JSON.stringify({ version: 0, items: [] }),
    JSON.stringify({ version: 1, items: [{ itemKey: 'broken' }], truncated: false, updatedAt: Date.now() })]) {
    assert.equal(readBoardCache('user', { getItem: () => raw }), null)
  }
  const unavailable = { getItem() { throw new Error('disabled') }, setItem() { throw new Error('quota') } }
  assert.equal(readBoardCache('user', unavailable), null)
  assert.doesNotThrow(() => writeBoardCache('user', { items: [item], truncated: false }, unavailable))
  assert.equal(readBoardCache('user', null), null)
})
