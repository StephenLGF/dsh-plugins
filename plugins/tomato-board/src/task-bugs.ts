type Row = Record<string, unknown>
type Run = (args: string[]) => Promise<unknown>
export interface BugLinkConfig { bugLinkTypeId?: string; bugLinkNames?: string[] }
export interface TaskBug { itemKey: string; title: string; status: string }
const record = (value: unknown): Row => value && typeof value === 'object' && !Array.isArray(value) ? value as Row : {}
const text = (value: unknown): string => typeof value === 'string' ? value : value && typeof value === 'object' ? text(record(value).name) : ''
const array = (value: unknown): unknown[] => Array.isArray(value) ? value : []
const keyPattern = /^[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-\d+$/u
const bugTypes = ['Bug', '测试缺陷', '线上Bug', '升级问题']
const bugFilter = `类型 in ${JSON.stringify(bugTypes)}`
const isBug = (row: Row) => bugTypes.includes(text(row.itemType)) || bugTypes.includes(text(record(row.itemType).key))
const bug = (row: Row): TaskBug => ({ itemKey: text(row.key), title: text(row.name), status: text(row.status) })

/** All reads and writes use native Team data; no local relationship cache. */
export function createTaskBugService(run: Run, config: BugLinkConfig) {
  const names = config.bugLinkNames?.length ? config.bugLinkNames : ['relates to', 'relates to2']
  const countCache = new Map<string, { count: number; expires: number }>()
  const countReads = new Map<string, Promise<number>>()
  function rememberCount(itemKey: string, count: number) {
    if (countCache.size >= 500 && !countCache.has(itemKey)) countCache.delete(countCache.keys().next().value!)
    countCache.set(itemKey, { count, expires: Date.now() + 30_000 })
  }
  async function task(itemKey: string) {
    if (!keyPattern.test(itemKey)) throw new Error('无效的 Task 编号')
    const value = record(await run(['team', 'item', 'view', itemKey]))
    if (text(value.itemType) !== 'Task') throw new Error('请选择 Task')
    if (!text(value.objectId)) throw new Error('Task 缺少事项标识')
    return value
  }
  async function search(iql: string): Promise<TaskBug[]> {
    const items = new Map<string, TaskBug>()
    for (let page = 1; page <= 20; page++) {
      const payload = record(await run(['team', 'item', 'search', '--iql', `${bugFilter} and (${iql})`, '--fields', 'key,name,status,itemType', '--size', '50', '--page', String(page)]))
      if (!Array.isArray(payload.items)) throw new Error('番茄返回的缺陷列表格式异常')
      for (const row of payload.items.map(record).filter(isBug)) {
        const value = bug(row)
        if (keyPattern.test(value.itemKey)) items.set(value.itemKey, value)
      }
      if (payload.items.length < 50 || Number(payload.nextPageIndex) === -1
        || (Number.isFinite(Number(payload.count)) && page * 50 >= Number(payload.count))) return [...items.values()]
    }
    throw new Error('缺陷超过 1000 条，请在番茄中缩小范围')
  }
  function linkedQuery(item: Row) {
    // Team's linkedItemsOf requires the direction label as its second argument.
    return names.map(name => `item in linkedItemsOf(${JSON.stringify(`id = ${text(item.objectId)}`)}, ${JSON.stringify(name)})`).join(' or ')
  }
  async function count(itemKey: string): Promise<number> {
    const cached = countCache.get(itemKey)
    if (cached && cached.expires > Date.now()) return cached.count
    const pending = countReads.get(itemKey)
    if (pending) return pending
    const snapshot = countCache.get(itemKey)
    const read = (async () => {
      const source = await task(itemKey)
      const payload = record(await run(['team', 'item', 'search', '--iql', `${bugFilter} and (${linkedQuery(source)})`, '--size', '1', '--fields', 'key']))
      const value = Number(payload.count)
      if (payload.count == null || !Number.isSafeInteger(value) || value < 0) throw new Error('番茄返回的关联 Bug 数量异常')
      // A modal read or a completed link is newer than this in-flight count.
      const newer = countCache.get(itemKey)
      if (newer && newer !== snapshot) return newer.count
      rememberCount(itemKey, value)
      return value
    })()
    countReads.set(itemKey, read)
    try { return await read } finally { if (countReads.get(itemKey) === read) countReads.delete(itemKey) }
  }
  return {
    async counts(itemKeys: string[]) {
      if (!Array.isArray(itemKeys) || itemKeys.length > 100 || itemKeys.some(key => typeof key !== 'string' || !keyPattern.test(key))) throw new Error('无效的 Task 编号列表（最多 100 个）')
      const keys = [...new Set(itemKeys)]
      const counts: Record<string, number> = {}
      const failed: string[] = []
      let index = 0
      await Promise.all(Array.from({ length: Math.min(3, keys.length) }, async () => {
        while (index < keys.length) {
          const key = keys[index++]!
          try { counts[key] = await count(key) } catch { failed.push(key) }
        }
      }))
      return { counts, failed }
    },
    async load(itemKey: string, query = '') {
      const value = await task(itemKey)
      if (query) {
        if (query.length > 120) throw new Error('搜索内容不能超过 120 字')
        if (keyPattern.test(query)) {
          const target = record(await run(['team', 'item', 'view', query]))
          return { items: isBug(target) ? [bug(target)] : [] }
        }
        return { items: await search(`标题 ~ ${JSON.stringify(query)}`) }
      }
      const ancestor = record(value.ancestor)
      const parent = text(ancestor.objectId) ? { itemKey: text(ancestor.key), title: text(ancestor.name) } : null
      const [linked, suggested] = await Promise.all([
        search(linkedQuery(value)),
        parent ? search(`ancestors in ${JSON.stringify([text(ancestor.objectId)])}`) : Promise.resolve([]),
      ])
      rememberCount(itemKey, linked.length)
      return { linked, suggested, parent, canLink: Boolean(config.bugLinkTypeId) }
    },
    async link(itemKey: string, bugKey: string) {
      if (!config.bugLinkTypeId) throw new Error('尚未配置番茄事项关联类型')
      if (!keyPattern.test(bugKey)) throw new Error('无效的 Bug 编号')
      const [source, target, user] = await Promise.all([
        task(itemKey), run(['team', 'item', 'view', bugKey]).then(record), run(['team', 'user', 'current']).then(record),
      ])
      const owners = array(record(source.values).assignee).map(record)
      if (!owners.some(owner => (text(user.userId) && text(owner.objectId ?? owner.value) === text(user.userId))
        || (text(user.username) && text(owner.username) === text(user.username)))) throw new Error('只能关联自己负责的 Task')
      if (!isBug(target) || !text(target.objectId)) throw new Error('请选择有效的缺陷事项')
      const existing = await search(linkedQuery(source))
      if (existing.some(item => item.itemKey === bugKey)) { rememberCount(itemKey, existing.length); return { bug: bug(target), count: existing.length } }
      await run(['team', 'item', 'edit', itemKey, '--values', JSON.stringify({ Relations: {
        links: [{ linkType: config.bugLinkTypeId, destinationItems: [text(target.objectId)] }],
      } })])
      rememberCount(itemKey, existing.length + 1)
      return { bug: bug(target), count: existing.length + 1 }
    },
  }
}
