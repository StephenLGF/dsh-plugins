type CacheStorage = Pick<Storage, 'getItem' | 'setItem'>
const prefix = 'taskboard.tomatoViews.v1:'
function browserStorage(): CacheStorage | null {
  try { return typeof window === 'undefined' ? null : window.localStorage } catch { return null }
}
/** Restore only a validated successful snapshot; storage is always optional. */
export function readViewCache<T>(key: string, validate: (value: unknown) => value is T, storage: CacheStorage | null = browserStorage()): T | null {
  try {
    const raw = storage?.getItem(prefix + encodeURIComponent(key))
    if (!raw || raw.length > 10_000_000) return null
    const value = JSON.parse(raw)
    return value?.version === 1 && Number.isFinite(value.updatedAt) && validate(value.data) ? value.data : null
  } catch { return null }
}
export function writeViewCache<T>(key: string, data: T, storage: CacheStorage | null = browserStorage()): void {
  try {
    const value = JSON.stringify({ version: 1, updatedAt: Date.now(), data })
    if (value.length <= 10_000_000) storage?.setItem(prefix + encodeURIComponent(key), value)
  } catch { /* Preserve the last snapshot if storage is full or disabled. */ }
}
