type Row = Record<string, unknown>
type Run = (args: string[]) => Promise<unknown>
const row = (value: unknown): Row => value && typeof value === 'object' && !Array.isArray(value) ? value as Row : {}
const text = (value: unknown): string => typeof value === 'string' ? value : value && typeof value === 'object' ? text(row(value).name ?? row(value).label) : ''
const array = (value: unknown): unknown[] => Array.isArray(value) ? value : []
const keyPattern = /^[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-\d+$/u
const types = ['Story', 'EnablerStory']
export interface RequirementOption { itemKey: string; title: string; status: string; assignees: string[] }

function option(raw: unknown): RequirementOption | null {
  const item = row(raw)
  if (!types.includes(text(item.itemType)) && !types.includes(text(row(item.itemType).key))) return null
  const itemKey = text(item.key)
  if (!keyPattern.test(itemKey) || !text(item.name)) return null
  const values = row(item.values ?? item.value)
  const assignees = array(values.assignee ?? item.assignee).map(row).map(user => text(user.label) || text(user.nickname) || text(user.username)).filter(Boolean)
  return { itemKey, title: text(item.name), status: text(item.status), assignees }
}

/** Permission-scoped requirement search, deliberately independent of board owner filters. */
export async function searchRequirements(run: Run, query: string) {
  const q = query.trim()
  if (!q) return { items: [], truncated: false }
  if (q.length > 120) throw new Error('搜索内容最多 120 个字符')
  if (keyPattern.test(q)) {
    const item = option(await run(['team', 'item', 'view', q]))
    return { items: item ? [item] : [], truncated: false }
  }
  const payload = row(await run(['team', 'item', 'search', '--iql', `类型 in ${JSON.stringify(types)} and 标题 ~ ${JSON.stringify(q)}`,
    '--fields', 'key,name,status,itemType,assignee', '--page', '1', '--size', '20']))
  if (!Array.isArray(payload.items)) throw new Error('番茄返回的需求列表格式异常')
  const items = [...new Map(payload.items.map(option).filter((item): item is RequirementOption => item !== null).map(item => [item.itemKey, item])).values()]
  const total = Number(payload.count ?? payload.total)
  const truncated = Number.isFinite(total) ? total > payload.items.length : payload.items.length === 20 && payload.nextPageIndex !== -1
  return { items, truncated }
}
