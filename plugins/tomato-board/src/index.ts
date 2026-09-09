import { execFile } from 'node:child_process'
import process from 'node:process'
import { promisify } from 'node:util'
import type { Context } from '@deepseek-ai/cordis'

const execFileAsync = promisify(execFile)
const ROUTE = '/api/tomato-board/items'
const OPEN_ROUTE = '/api/tomato-board/open'
const TRANSITIONS_ROUTE = '/api/tomato-board/transitions'
const TRANSITION_ROUTE = '/api/tomato-board/transition'
const FILTERS_ROUTE = '/api/tomato-board/filters'
const DEFAULT_PRIORITY_NAMES = new Map([
  ['69e65065-4b34-4109-bca9-0154e548554a', 'P0'],
  ['8f7912a5-9176-4a79-a269-2269ac42b5a2', 'P1'],
  ['ca8c3e43-3e7b-444d-8940-d0967d944921', 'P2'],
  ['ec31e4c1-b55b-479d-be97-86d5f7bf38ef', 'P2'],
  ['1a3e1092-7d70-42ee-ad38-0e8d953c4c23', 'P3'],
  ['faae52da-28c8-46fc-96dd-db9cdb28b557', 'P4'],
])

interface WebServer {
  register(route: {
    kind: 'exact' | 'prefix'
    path: string
    handler: (request: { method?: string; url?: string; headers?: Record<string, string | string[] | undefined> }, response: HttpResponse) => void | Promise<void>
  }): () => void
}

interface HttpResponse {
  statusCode: number
  setHeader(name: string, value: string): void
  end(body?: string): void
}

interface TomatoTransition {
  transition: string
  targetStatus: string
  disabled: boolean
  disabledReason?: string
}

interface Config {
  executable?: string
  profile?: string
  iql?: string
  tomatoOrigin?: string
  tomatoTenant?: string
  cacheTtlMs?: number
  maxItems?: number
  excludedStatuses?: string[]
  priorityNames?: Record<string, string>
}

let itemsCache: { key: string; expiresAt: number; value: unknown } | null = null
let itemsInFlight: { key: string; promise: Promise<unknown> } | null = null

function firstText(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (Array.isArray(value)) return value.map(firstText).find(Boolean) ?? ''
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    for (const key of ['name', 'label', 'nickname', 'username', 'value', 'key']) {
      const text = firstText(record[key])
      if (text) return text
    }
  }
  return ''
}

function textList(value: unknown): string[] {
  const values = Array.isArray(value) ? value : value ? [value] : []
  return [...new Set(values.map(firstText).filter(Boolean))]
}

function unwrapItems(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  const record = payload as Record<string, unknown>
  for (const key of ['items', 'data', 'result']) {
    const value = record[key]
    if (Array.isArray(value)) return value
    if (value && typeof value === 'object' && Array.isArray((value as Record<string, unknown>).items)) {
      return (value as { items: unknown[] }).items
    }
  }
  return []
}

function unwrapTransitions(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  const record = payload as Record<string, unknown>
  for (const key of ['transitions', 'data', 'result']) {
    const value = record[key]
    if (Array.isArray(value)) return value
    if (value && typeof value === 'object' && Array.isArray((value as Record<string, unknown>).transitions)) {
      return (value as { transitions: unknown[] }).transitions
    }
  }
  return []
}

function normalizeItem(raw: unknown, priorityNames = DEFAULT_PRIORITY_NAMES) {
  const item = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {}
  const nested = item.value && typeof item.value === 'object'
    ? item.value as Record<string, unknown>
    : item.values && typeof item.values === 'object'
      ? item.values as Record<string, unknown>
      : item
  const workspaceValue = item.workspace ?? nested.workspace ?? nested['所属空间']
  const workspace = workspaceValue && typeof workspaceValue === 'object' ? workspaceValue as Record<string, unknown> : {}
  const workspaceKey = firstText(workspace.key)
  const workspaceName = firstText(workspace.name ?? workspaceValue)
  return {
    itemKey: firstText(item.itemKey ?? item.key ?? item.id ?? nested.itemKey ?? nested.key),
    title: firstText(item.title ?? item.name ?? nested.title ?? nested.name ?? nested['标题']),
    status: firstText(item.status ?? nested.status ?? nested['状态']),
    itemType: firstText(item.itemType ?? item.type ?? nested.itemType ?? nested['类型']),
    workspace: workspaceKey || workspaceName,
    workspaceKey,
    workspaceName,
    creator: firstText(item.creator ?? item.createdBy ?? nested['创建人'] ?? nested.createdBy),
    assignees: textList(item.assignees ?? item.assignee ?? nested.assignees ?? nested.assignee ?? nested['负责人']),
    priority: (() => {
      const priority = firstText(item.priority ?? nested.priority ?? nested['优先级'])
      return priorityNames.get(priority) ?? priority
    })(),
  }
}

function normalizeTransition(raw: unknown): TomatoTransition | null {
  if (!raw || typeof raw !== 'object') return null
  const value = raw as Record<string, unknown>
  const transition = firstText(value.transition)
  const targetStatus = firstText(value.targetStatus ?? value.status)
  if (!transition || !targetStatus) return null
  return {
    transition,
    targetStatus,
    disabled: value.disabled === true,
    ...(firstText(value.disabledReason) ? { disabledReason: firstText(value.disabledReason) } : {}),
  }
}

function tomatoItemUrl(config: Config, itemKey: string): string {
  const origin = config.tomatoOrigin || 'https://osc.gitee.work'
  const tenant = config.tomatoTenant || 'xly-poc'
  const workspace = itemKey.replace(/-\d+$/u, '')
  const target = new URL(`/_team/${encodeURIComponent(tenant)}/item/${encodeURIComponent(itemKey)}`, origin)
  target.searchParams.set('workspace', workspace)
  target.searchParams.set('tenant', tenant)
  target.searchParams.set('hiddenHeader', 'true')
  target.searchParams.set('from', 'one')
  target.searchParams.set('frameless', 'true')
  return target.toString()
}

function cliSettings(config: Config) {
  return {
    executable: config.executable || process.env.TOMATO_CLI_EXECUTABLE || 'gitee',
    profile: config.profile || process.env.TOMATO_PROFILE || 'osc',
  }
}

async function runJson(config: Config, args: string[]): Promise<unknown> {
  const { executable, profile } = cliSettings(config)
  const result = await execFileAsync(executable, [...args, '--profile', profile, '--output', 'json'], {
    timeout: 120_000,
    maxBuffer: 16 * 1024 * 1024,
  })
  return JSON.parse(result.stdout)
}

async function loadTransitions(config: Config, itemKey: string): Promise<TomatoTransition[]> {
  const payload = await runJson(config, ['team', 'transition', 'list', itemKey])
  return unwrapTransitions(payload).map(normalizeTransition).filter((value): value is TomatoTransition => value !== null)
}

async function loadItem(config: Config, itemKey: string) {
  return normalizeItem(await runJson(config, ['team', 'item', 'view', itemKey]))
}

async function executeTransition(config: Config, itemKey: string, transitionName: string) {
  const transitions = await loadTransitions(config, itemKey)
  const selected = transitions.find(transition => transition.transition === transitionName)
  if (!selected || selected.disabled) {
    throw new Error(selected?.disabledReason || '当前状态不支持该流转')
  }
  const before = await loadItem(config, itemKey)
  await runJson(config, [
    'team', 'transition', 'execute', itemKey,
    '--transition', selected.transition,
  ])
  const after = await loadItem(config, itemKey)
  if (after.status !== selected.targetStatus) {
    throw new Error(`流转后状态校验失败：期望「${selected.targetStatus}」，实际「${after.status || '未知'}」`)
  }
  return {
    itemKey,
    previousStatus: before.status,
    currentStatus: after.status,
    targetStatus: selected.targetStatus,
  }
}

function itemKeyFromRoute(requestUrl: string | undefined, route: string): string {
  const pathname = new URL(requestUrl ?? route, 'http://localhost').pathname
  const itemKey = decodeURIComponent(pathname.slice(route.length).replace(/^\/+/, '')).trim()
  // 与客户端 TOMATO_ITEM_KEY_PATTERN 保持一致：字母前缀（可含连字符分段）+ 数字结尾。
  // 收紧校验可阻止中文/任意文本透传成 itemKey 被发给 gitee CLI，避免误触发与无意义报错。
  return /^[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-\d+$/u.test(itemKey) ? itemKey : ''
}

function assigneeIql(config: Config, assignee: string) {
  const base = config.iql?.trim()
  const owner = assignee === 'currentUser()' ? 'currentUser()' : JSON.stringify(assignee)
  const clause = `负责人 in [${owner}]`
  return base ? `(${base}) and ${clause}` : clause
}

async function loadItems(config: Config, assignee: string) {
  const { executable, profile } = cliSettings(config)
  const iql = assigneeIql(config, assignee)
  const priorityNames = new Map([...DEFAULT_PRIORITY_NAMES, ...Object.entries(config.priorityNames ?? {})])
  const rawItems: unknown[] = []
  let page = 1
  let truncated = false
  const maxItems = Math.max(1, Math.min(config.maxItems ?? 5000, 20_000))
  while (rawItems.length < maxItems) {
    const result = await execFileAsync(executable, [
      'team', 'item', 'search',
      '--profile', profile,
      '--page', String(page),
      '--size', '50',
      '--iql', iql,
      '--fields', 'priority,createdBy,assignee',
      '--output', 'json',
    ], {
      timeout: 120_000,
      maxBuffer: 16 * 1024 * 1024,
    })
    const payload = JSON.parse(result.stdout)
    const pageItems = unwrapItems(payload)
    rawItems.push(...pageItems)
    const record = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {}
    const total = Number(record.count ?? record.total ?? (record.data as Record<string, unknown> | undefined)?.count)
    const hasMore = record.hasNext === true
      || record.hasMore === true
      || (Number.isFinite(total) && rawItems.length < total)
      || (!Number.isFinite(total) && pageItems.length === 50)
    if (rawItems.length >= maxItems && hasMore) {
      truncated = true
      break
    }
    if (!hasMore || pageItems.length === 0) break
    page += 1
  }
  const excludedStatuses = new Set(config.excludedStatuses ?? ['测试通过', '测试完成', '不修复', '已取消'])
  const items = rawItems.slice(0, maxItems).map(item => normalizeItem(item, priorityNames)).filter(item => (
    item.itemKey && item.title && item.status && !excludedStatuses.has(item.status)
  )).map(item => ({ ...item, tomatoUrl: tomatoItemUrl(config, item.itemKey) }))
  return { items, truncated }
}

function loadItemsCached(config: Config, assignee: string) {
  const ttl = Math.max(0, Math.min(config.cacheTtlMs ?? 15_000, 300_000))
  const key = JSON.stringify([cliSettings(config), assignee, config.iql, config.maxItems, config.excludedStatuses, config.priorityNames, config.tomatoOrigin, config.tomatoTenant])
  if (itemsCache?.key === key && itemsCache.expiresAt > Date.now()) return Promise.resolve(itemsCache.value)
  if (itemsInFlight?.key === key) return itemsInFlight.promise
  const promise = loadItems(config, assignee).then(value => {
    itemsCache = { key, expiresAt: Date.now() + ttl, value }
    return value
  }).finally(() => {
    if (itemsInFlight?.promise === promise) itemsInFlight = null
  })
  itemsInFlight = { key, promise }
  return promise
}

async function loadFilters(config: Config) {
  const users: unknown[] = []
  const workspaces: unknown[] = []
  for (let page = 1; page <= 100; page += 1) {
    const payload = await runJson(config, ['team', 'user', 'list', '--page', String(page), '--size', '300'])
    const record = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {}
    const values = Array.isArray(record.users) ? record.users : []
    users.push(...values)
    if (!record.nextPageIndex || values.length === 0) break
  }
  for (let page = 1; page <= 100; page += 1) {
    const payload = await runJson(config, ['team', 'workspace', 'list', '--page', String(page), '--size', '100'])
    const record = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {}
    const values = Array.isArray(record.workspaces) ? record.workspaces : []
    workspaces.push(...values)
    if (!record.nextPageIndex || values.length === 0) break
  }
  return {
    users: users.map(value => {
      const user = value && typeof value === 'object' ? value as Record<string, unknown> : {}
      return { username: firstText(user.username), name: firstText(user.nickname ?? user.name ?? user.username) }
    }).filter(user => user.username),
    workspaces: workspaces.map(value => {
      const workspace = value && typeof value === 'object' ? value as Record<string, unknown> : {}
      return { key: firstText(workspace.key), name: firstText(workspace.name ?? workspace.key) }
    }).filter(workspace => workspace.key || workspace.name),
  }
}

function fieldObjectIds(raw: unknown): string[] {
  const values = Array.isArray(raw) ? raw : raw ? [raw] : []
  return [...new Set(values.flatMap(value => {
    if (typeof value === 'string') return [value.trim()]
    if (!value || typeof value !== 'object') return []
    const record = value as Record<string, unknown>
    return [record.objectId, record.value, record.id].map(firstText).filter(Boolean)
  }).filter(Boolean))]
}

function storyPointValue(raw: unknown): number | null {
  if (raw === null || raw === undefined || raw === '' || typeof raw === 'boolean') return null
  if (typeof raw !== 'number' && typeof raw !== 'string') return null
  if (typeof raw === 'string' && !raw.trim()) return null
  const value = Number(raw)
  return Number.isFinite(value) && value >= 0 ? value : null
}

async function loadSprints(config: Config) {
  const sprints: unknown[] = []
  for (let page = 1; page <= 100; page += 1) {
    const payload = await runJson(config, ['team', 'sprint', 'list', '--status', 'active,notStarted,completed', '--page', String(page), '--size', '100']) as Record<string, unknown>
    const values = Array.isArray(payload.sprints) ? payload.sprints : []
    sprints.push(...values)
    if (!(Number(payload.nextPageIndex) > page) || !values.length) return { sprints }
  }
  throw new Error('迭代数量超出读取上限，请缩小查询范围')
}

async function loadStoryItems(config: Config, sprint: string, assignee: string) {
  // Statistics deliberately do not inherit the board's owner/status filters.
  const owner = assignee === 'currentUser()' ? assignee : JSON.stringify(assignee)
  const iql = `迭代 = ${JSON.stringify(sprint)} and 负责人 in [${owner}] and 类型 in [Story, EnablerStory, Task]`
  const items = new Map<string, ReturnType<typeof normalizeItem> & { storyPoints: number | null; tomatoUrl: string }>()
  const limit = Math.max(1, Math.min(config.maxItems ?? 5000, 20_000))
  for (let page = 1; ; page += 1) {
    const payload = await runJson(config, ['team', 'item', 'search', '--iql', iql, '--fields', 'StoryPoint,assignee,sprint', '--page', String(page), '--size', '50']) as Record<string, unknown>
    const values = unwrapItems(payload)
    for (const raw of values) {
      const item = normalizeItem(raw)
      const record = raw as Record<string, unknown>
      const fields = (record.values ?? record.value ?? record) as Record<string, unknown>
      const itemSprints = fieldObjectIds(fields.sprint ?? fields.Sprint ?? fields['迭代'])
      const isPlanningItem = ['Story', 'EnablerStory', 'Task'].includes(item.itemType)
      if (item.itemKey && isPlanningItem && itemSprints.includes(sprint)) items.set(item.itemKey, { ...item, storyPoints: storyPointValue(fields.StoryPoint), tomatoUrl: tomatoItemUrl(config, item.itemKey) })
    }
    const total = Number(payload.count ?? payload.total)
    const more = Number(payload.nextPageIndex) > page || payload.hasMore === true || payload.hasNext === true
      || (Number.isFinite(total) ? page * 50 < total : values.length === 50)
    if (!more || !values.length) return { items: [...items.values()].slice(0, limit), truncated: items.size > limit }
    if (page * 50 >= limit) return { items: [...items.values()].slice(0, limit), truncated: true }
  }
}

function isCrossSite(request: { headers?: Record<string, string | string[] | undefined> }) {
  const header = (name: string) => {
    const value = request.headers?.[name] ?? request.headers?.[name.toLowerCase()]
    return Array.isArray(value) ? value[0] : value
  }
  if (header('sec-fetch-site') === 'cross-site') return true
  const origin = header('origin')
  const host = header('host')
  if (!origin || !host) return false
  try { return new URL(origin).host !== host } catch { return true }
}

function sendJson(response: HttpResponse, status: number, body: unknown) {
  response.statusCode = status
  response.setHeader('content-type', 'application/json; charset=utf-8')
  response.setHeader('cache-control', 'no-store')
  response.end(JSON.stringify(body))
}

function errorBody(error: unknown, fallback: string) {
  if (!(error instanceof Error)) return { error: fallback }
  const detail = error as Error & { stderr?: unknown; stdout?: unknown }
  return {
    error: error.message || fallback,
    details: {
      stderr: typeof detail.stderr === 'string' ? detail.stderr.slice(-4000) : '',
      stdout: typeof detail.stdout === 'string' ? detail.stdout.slice(-4000) : '',
    },
  }
}

export const name = 'tomato-board'
export const inject = ['webServer']

export function apply(ctx: Context, config: Config = {}): void {
  const webServer = ctx.get('webServer') as unknown as WebServer
  ctx.effect(() => webServer.register({
    kind: 'exact', path: '/api/tomato-board/sprints',
    async handler(request, response) {
      if (request.method !== 'GET') return sendJson(response, 405, { error: 'Method not allowed' })
      try { sendJson(response, 200, await loadSprints(config)) }
      catch (error) { sendJson(response, 502, errorBody(error, '迭代读取失败')) }
    },
  }), 'tomato-board: sprints')
  ctx.effect(() => webServer.register({
    kind: 'exact', path: '/api/tomato-board/story-points',
    async handler(request, response) {
      if (request.method !== 'GET') return sendJson(response, 405, { error: 'Method not allowed' })
      const query = new URL(request.url ?? '/', 'http://localhost').searchParams
      const sprint = query.get('sprint') ?? ''
      const assignee = query.get('assignee') || 'currentUser()'
      if (!/^[A-Za-z0-9_-]{1,128}$/u.test(sprint) || (assignee !== 'currentUser()' && !/^[A-Za-z0-9_.@-]{1,128}$/u.test(assignee))) {
        return sendJson(response, 400, { error: '无效的迭代或负责人' })
      }
      try { sendJson(response, 200, await loadStoryItems(config, sprint, assignee)) }
      catch (error) { sendJson(response, 502, errorBody(error, '故事点读取失败')) }
    },
  }), 'tomato-board: story points')
  ctx.effect(() => webServer.register({
    kind: 'prefix', path: '/api/tomato-board/story-point',
    async handler(request, response) {
      if (request.method !== 'POST') return sendJson(response, 405, { error: 'Method not allowed' })
      if (isCrossSite(request)) return sendJson(response, 403, { error: '拒绝跨站修改请求' })
      const itemKey = itemKeyFromRoute(request.url, '/api/tomato-board/story-point')
      const value = new URL(request.url ?? '/', 'http://localhost').searchParams.get('value')
      const points = storyPointValue(value)
      if (!itemKey || points === null) return sendJson(response, 400, { error: '请输入非负有限故事点数值' })
      try {
        await runJson(config, ['team', 'item', 'edit', itemKey, '--values', JSON.stringify({ StoryPoint: points })])
        const raw = await runJson(config, ['team', 'item', 'view', itemKey]) as Record<string, unknown>
        const fields = (raw.values ?? raw.value ?? raw) as Record<string, unknown>
        const actual = storyPointValue(fields.StoryPoint)
        if (actual !== points) throw new Error('故事点保存后校验失败，请刷新后重试')
        itemsCache = null
        sendJson(response, 200, { itemKey, storyPoints: actual })
      } catch (error) { sendJson(response, 502, errorBody(error, '故事点保存失败')) }
    },
  }), 'tomato-board: edit story point')
  ctx.effect(() => webServer.register({
    kind: 'exact',
    path: ROUTE,
    async handler(request, response) {
      if (request.method !== 'GET') {
        sendJson(response, 405, { error: 'Method not allowed' })
        return
      }
      const assignee = new URL(request.url ?? ROUTE, 'http://localhost').searchParams.get('assignee')?.trim() || 'currentUser()'
      if (assignee !== 'currentUser()' && !/^[A-Za-z0-9_.@-]{1,128}$/u.test(assignee)) {
        sendJson(response, 400, { error: '无效的负责人用户名' })
        return
      }
      try {
        sendJson(response, 200, await loadItemsCached(config, assignee))
      } catch (error) {
        sendJson(response, 502, {
          error: error instanceof Error ? error.message : '番茄事项读取失败',
        })
      }
    },
  }), 'tomato-board: HTTP items route')
  ctx.effect(() => webServer.register({
    kind: 'exact',
    path: FILTERS_ROUTE,
    async handler(request, response) {
      if (request.method !== 'GET') return sendJson(response, 405, { error: 'Method not allowed' })
      try {
        sendJson(response, 200, await loadFilters(config))
      } catch (error) {
        sendJson(response, 502, { error: error instanceof Error ? error.message : '筛选项读取失败' })
      }
    },
  }), 'tomato-board: HTTP filters route')
  ctx.effect(() => webServer.register({
    kind: 'prefix',
    path: OPEN_ROUTE,
    handler(request, response) {
      if (request.method !== 'GET') {
        sendJson(response, 405, { error: 'Method not allowed' })
        return
      }
      const itemKey = itemKeyFromRoute(request.url, OPEN_ROUTE)
      if (!itemKey) {
        sendJson(response, 400, { error: '无效的番茄事项编号' })
        return
      }
      response.statusCode = 302
      response.setHeader('location', tomatoItemUrl(config, itemKey))
      response.setHeader('cache-control', 'no-store')
      response.end()
    },
  }), 'tomato-board: HTTP external item route')
  ctx.effect(() => webServer.register({
    kind: 'prefix',
    path: TRANSITIONS_ROUTE,
    async handler(request, response) {
      if (request.method !== 'GET') {
        sendJson(response, 405, { error: 'Method not allowed' })
        return
      }
      const itemKey = itemKeyFromRoute(request.url, TRANSITIONS_ROUTE)
      if (!itemKey) {
        sendJson(response, 400, { error: '无效的番茄事项编号' })
        return
      }
      try {
        const [item, transitions] = await Promise.all([
          loadItem(config, itemKey),
          loadTransitions(config, itemKey),
        ])
        sendJson(response, 200, {
          itemKey,
          currentStatus: item.status,
          tomatoUrl: tomatoItemUrl(config, itemKey),
          transitions,
        })
      } catch (error) {
        sendJson(response, 502, { error: error instanceof Error ? error.message : '番茄流转状态读取失败' })
      }
    },
  }), 'tomato-board: HTTP transitions route')
  ctx.effect(() => webServer.register({
    kind: 'prefix',
    path: TRANSITION_ROUTE,
    async handler(request, response) {
      if (request.method !== 'POST') {
        sendJson(response, 405, { error: 'Method not allowed' })
        return
      }
      if (isCrossSite(request)) {
        sendJson(response, 403, { error: '拒绝跨站状态流转请求' })
        return
      }
      const url = new URL(request.url ?? TRANSITION_ROUTE, 'http://localhost')
      const itemKey = itemKeyFromRoute(request.url, TRANSITION_ROUTE)
      const transition = url.searchParams.get('transition')?.trim() ?? ''
      if (!itemKey || !transition || transition.length > 160) {
        sendJson(response, 400, { error: '无效的番茄流转请求' })
        return
      }
      try {
        sendJson(response, 200, await executeTransition(config, itemKey, transition))
      } catch (error) {
        sendJson(response, 502, errorBody(error, '番茄事项流转失败'))
      }
    },
  }), 'tomato-board: HTTP transition route')
}
