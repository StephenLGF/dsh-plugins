import { execFile } from 'node:child_process'
import process from 'node:process'
import { promisify } from 'node:util'
import type { Context } from '@deepseek-ai/cordis'

const execFileAsync = promisify(execFile)
const ROUTE = '/api/tomato-board/items'
const OPEN_ROUTE = '/api/tomato-board/open'
const PRIORITY_NAMES = new Map([
  ['69e65065-4b34-4109-bca9-0154e548554a', 'P0'],
  ['8f7912a5-9176-4a79-a269-2269ac42b5a2', 'P1'],
  ['ca8c3e43-3e7b-444d-8940-d0967d944921', 'P2'],
  ['1a3e1092-7d70-42ee-ad38-0e8d953c4c23', 'P3'],
  ['faae52da-28c8-46fc-96dd-db9cdb28b557', 'P4'],
])

interface WebServer {
  register(route: {
    kind: 'exact' | 'prefix'
    path: string
    handler: (request: { method?: string; url?: string }, response: HttpResponse) => void | Promise<void>
  }): () => void
}

interface HttpResponse {
  statusCode: number
  setHeader(name: string, value: string): void
  end(body?: string): void
}

interface Config {
  executable?: string
  profile?: string
  iql?: string
  tomatoOrigin?: string
  tomatoTenant?: string
}

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

function normalizeItem(raw: unknown) {
  const item = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {}
  const nested = item.value && typeof item.value === 'object'
    ? item.value as Record<string, unknown>
    : item.values && typeof item.values === 'object'
      ? item.values as Record<string, unknown>
      : item
  return {
    itemKey: firstText(item.itemKey ?? item.key ?? item.id ?? nested.itemKey ?? nested.key),
    title: firstText(item.title ?? item.name ?? nested.title ?? nested.name ?? nested['标题']),
    status: firstText(item.status ?? nested.status ?? nested['状态']),
    itemType: firstText(item.itemType ?? item.type ?? nested.itemType ?? nested['类型']),
    workspace: firstText(item.workspace ?? nested.workspace ?? nested['所属空间']),
    creator: firstText(item.creator ?? item.createdBy ?? nested['创建人'] ?? nested.createdBy),
    priority: (() => {
      const priority = firstText(item.priority ?? nested.priority ?? nested['优先级'])
      return PRIORITY_NAMES.get(priority) ?? priority
    })(),
  }
}

async function loadItems(config: Config) {
  const executable = config.executable || process.env.TOMATO_CLI_EXECUTABLE || 'gitee'
  const profile = config.profile || process.env.TOMATO_PROFILE || 'osc'
  const iql = config.iql
    || "负责人 = currentUser() and 所属空间 in ['Gitee-Team', 'Gitee-Test'] and 类型 in ['Story', 'EnablerStory', 'Bug', '测试缺陷']"
  const rawItems: unknown[] = []
  let page = 1
  while (rawItems.length < 5000) {
    const result = await execFileAsync(executable, [
      'team', 'item', 'search',
      '--profile', profile,
      '--page', String(page),
      '--size', '50',
      '--iql', iql,
      '--fields', 'priority,createdBy',
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
    if (!hasMore || pageItems.length === 0) break
    page += 1
  }
  const excludedStatuses = new Set(['测试通过', '测试完成', '不修复', '已取消'])
  return rawItems.map(normalizeItem).filter(item => (
    item.itemKey && item.title && item.status && !excludedStatuses.has(item.status)
  ))
}

function sendJson(response: HttpResponse, status: number, body: unknown) {
  response.statusCode = status
  response.setHeader('content-type', 'application/json; charset=utf-8')
  response.setHeader('cache-control', 'no-store')
  response.end(JSON.stringify(body))
}

export const name = 'tomato-board'
export const inject = ['webServer']

export function apply(ctx: Context, config: Config = {}): void {
  const webServer = ctx.get('webServer') as unknown as WebServer
  ctx.effect(() => webServer.register({
    kind: 'exact',
    path: ROUTE,
    async handler(request, response) {
      if (request.method !== 'GET') {
        sendJson(response, 405, { error: 'Method not allowed' })
        return
      }
      try {
        sendJson(response, 200, { items: await loadItems(config) })
      } catch (error) {
        sendJson(response, 502, {
          error: error instanceof Error ? error.message : '番茄事项读取失败',
        })
      }
    },
  }), 'tomato-board: HTTP items route')
  ctx.effect(() => webServer.register({
    kind: 'prefix',
    path: OPEN_ROUTE,
    handler(request, response) {
      if (request.method !== 'GET') {
        sendJson(response, 405, { error: 'Method not allowed' })
        return
      }
      const pathname = new URL(request.url ?? OPEN_ROUTE, 'http://localhost').pathname
      const itemKey = decodeURIComponent(pathname.slice(OPEN_ROUTE.length).replace(/^\/+/, '')).trim()
      if (!itemKey || !/^[\p{L}\p{N}._-]{1,160}$/u.test(itemKey)) {
        sendJson(response, 400, { error: '无效的番茄事项编号' })
        return
      }
      const origin = config.tomatoOrigin || 'https://osc.gitee.work'
      const tenant = config.tomatoTenant || 'xly-poc'
      const workspace = itemKey.replace(/-\d+$/u, '')
      const target = new URL(`/_team/${encodeURIComponent(tenant)}/item/${encodeURIComponent(itemKey)}`, origin)
      target.searchParams.set('workspace', workspace)
      target.searchParams.set('tenant', tenant)
      target.searchParams.set('hiddenHeader', 'true')
      target.searchParams.set('from', 'one')
      target.searchParams.set('frameless', 'true')
      response.statusCode = 302
      response.setHeader('location', target.toString())
      response.setHeader('cache-control', 'no-store')
      response.end()
    },
  }), 'tomato-board: HTTP external item route')
}
