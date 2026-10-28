import assert from 'node:assert/strict'
import test from 'node:test'
import { readViewCache, writeViewCache } from '../plugins/tomato-board/src/client/view-cache.ts'

function storage() {
  const entries = new Map()
  return { entries, getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value) }
}
const isRows = value => Array.isArray(value) && value.every(row => row && typeof row.key === 'string')

test('isolates PR inventories and team iteration snapshots', () => {
  const local = storage()
  writeViewCache('pr-overview:repo-a', [{ key: 'PR-1' }], local)
  writeViewCache('team-results:sprint-a', [{ key: 'owner-a' }], local)
  writeViewCache('team-results:sprint-b', [{ key: 'owner-b' }], local)
  assert.deepEqual(readViewCache('pr-overview:repo-a', isRows, local), [{ key: 'PR-1' }])
  assert.equal(readViewCache('pr-overview:repo-b', isRows, local), null)
  assert.deepEqual(readViewCache('team-results:sprint-a', isRows, local), [{ key: 'owner-a' }])
  assert.deepEqual(readViewCache('team-results:sprint-b', isRows, local), [{ key: 'owner-b' }])
})
test('a successful empty snapshot replaces stale rows', () => {
  const local = storage()
  writeViewCache('pr', [{ key: 'old' }], local)
  writeViewCache('pr', [], local)
  assert.deepEqual(readViewCache('pr', isRows, local), [])
})
test('rejects damaged, obsolete and wrong-shaped snapshots', () => {
  for (const value of ['invalid', 'null', JSON.stringify({ version: 0, updatedAt: 1, data: [] }), JSON.stringify({ version: 1, updatedAt: 1, data: [{}] })]) {
    assert.equal(readViewCache('pr', isRows, { getItem: () => value }), null)
  }
})
test('storage failures keep the previous snapshot usable and never block the page', () => {
  const local = storage()
  writeViewCache('pr', [{ key: 'old' }], local)
  writeViewCache('pr', [{ key: 'new' }], { getItem: local.getItem, setItem() { throw new Error('quota') } })
  assert.deepEqual(readViewCache('pr', isRows, local), [{ key: 'old' }])
  assert.equal(readViewCache('pr', isRows, { getItem() { throw new Error('disabled') } }), null)
  assert.equal(readViewCache('pr', isRows, null), null)
  assert.doesNotThrow(() => writeViewCache('pr', [], null))
})
