import type { TomatoItem } from './TomatoBoard.tsx'

type CacheStorage = Pick<Storage, 'getItem' | 'setItem'>
export interface BoardCache { version: 1; items: TomatoItem[]; truncated: boolean; updatedAt: number }
const prefix = 'taskboard.tomatoItems.v1:'
const textFields = ['itemKey', 'title', 'status', 'itemType', 'workspace', 'workspaceKey', 'workspaceName', 'creator', 'createdAt', 'priority', 'tomatoUrl'] as const

function browserStorage(): CacheStorage | null {
  try { return typeof window === 'undefined' ? null : window.localStorage }
  catch { return null /* Browser storage may be disabled. */ }
}

/** Each assignee has a separate last-successful snapshot; invalid caches never block loading. */
export function readBoardCache(assignee: string, storage: CacheStorage | null = browserStorage()): BoardCache | null {
  try {
    const raw = storage?.getItem(prefix + encodeURIComponent(assignee))
    if (!raw) return null
    const value = JSON.parse(raw) as BoardCache
    if (!value || value.version !== 1 || typeof value.truncated !== 'boolean' || !Number.isFinite(value.updatedAt)
      || !Array.isArray(value.items) || value.items.length > 20_000) return null
    if (!value.items.every(item => item && textFields.every(field => typeof item[field] === 'string')
      && Array.isArray(item.assignees) && item.assignees.every(owner => typeof owner === 'string'))) return null
    return value
  } catch { return null /* Ignore damaged or inaccessible local snapshots. */ }
}

/** Failed requests must not replace the last successful snapshot. */
export function writeBoardCache(assignee: string, data: Pick<BoardCache, 'items' | 'truncated'>, storage: CacheStorage | null = browserStorage()): void {
  try { storage?.setItem(prefix + encodeURIComponent(assignee), JSON.stringify({ ...data, version: 1, updatedAt: Date.now() })) }
  catch { /* Quota or disabled storage must not turn a successful refresh into an error. */ }
}
