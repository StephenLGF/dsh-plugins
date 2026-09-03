import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type { Context } from '@deepseek-ai/cordis'

const execFileAsync = promisify(execFile)
const ROUTE = '/api/pr-assistant/repository'
const DETAIL_ROUTE = '/api/pr-assistant/pull-request'

interface Config {
  executable?: string
  profile?: string
  githubToken?: string
}

interface WebServer {
  register(route: {
    kind: 'exact'
    path: string
    handler: (request: { method?: string; url?: string }, response: HttpResponse) => void | Promise<void>
  }): () => void
}

interface ChangedFile {
  path: string
  previousPath: string
  additions: number
  deletions: number
  status: 'added' | 'deleted' | 'renamed' | 'modified'
  diff: string
}

interface HttpResponse {
  statusCode: number
  setHeader(name: string, value: string): void
  end(body?: string): void
}

type Provider = 'github' | 'gitee'

function sendJson(response: HttpResponse, status: number, body: unknown) {
  response.statusCode = status
  response.setHeader('content-type', 'application/json; charset=utf-8')
  response.setHeader('cache-control', 'no-store')
  response.end(JSON.stringify(body))
}

function parseRemote(remote: string): { provider: Provider; owner: string; repository: string; url: string } {
  const normalized = remote.trim().replace(/^git@([^:]+):/u, 'https://$1/').replace(/\.git$/u, '')
  const url = new URL(normalized)
  const segments = url.pathname.replace(/^\//u, '').split('/').filter(Boolean)
  const repository = segments.at(-1)
  const owner = segments.at(-2)
  const provider = url.hostname === 'github.com' ? 'github' : url.hostname.includes('gitee') ? 'gitee' : null
  if (!provider || !owner || !repository) throw new Error(`暂不支持该 Git 远端：${url.hostname}`)
  return { provider, owner, repository, url: `https://${url.hostname}/${owner}/${repository}` }
}

function parseCliJson(stdout: string): unknown {
  const withoutAnsi = stdout.replace(/\u001b\[[0-9;?]*[ -/]*[@-~]/gu, '').trim()
  const start = withoutAnsi.search(/[\[{]/u)
  if (start < 0) throw new Error('Gitee CLI 未返回 JSON')
  return JSON.parse(withoutAnsi.slice(start))
}

async function loadGiteePullRequests(path: string, config: Config) {
  const executable = config.executable || 'gitee'
  const profile = config.profile || 'osc'
  const result = await execFileAsync(executable, [
    'code', 'pr', 'list',
    '--states', 'opened',
    '--states', 'drafted',
    '--limit', '100',
    '--json',
    '--profile', profile,
  ], { cwd: path, timeout: 30_000, maxBuffer: 16 * 1024 * 1024 })
  const payload = parseCliJson(result.stdout || result.stderr)
  const record = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {}
  const items = Array.isArray(record.data) ? record.data : Array.isArray(payload) ? payload : []
  const meta = record.meta && typeof record.meta === 'object' ? record.meta as Record<string, unknown> : {}
  const total = Number(meta.total_count)
  return { items, total: Number.isFinite(total) ? total : items.length, truncated: items.length < total }
}

function countDiffLines(diff: string) {
  let additions = 0
  let deletions = 0
  for (const line of diff.split('\n')) {
    if (line.startsWith('+') && !line.startsWith('+++')) additions += 1
    if (line.startsWith('-') && !line.startsWith('---')) deletions += 1
  }
  return { additions, deletions }
}

function normalizeGiteeFile(value: unknown): ChangedFile | null {
  if (!value || typeof value !== 'object') return null
  const file = value as Record<string, unknown>
  const path = String(file.new_path || file.old_path || '')
  if (!path) return null
  const counts = countDiffLines(String(file.diff || ''))
  return {
    path,
    previousPath: String(file.old_path || path),
    ...counts,
    status: file.new_file === true ? 'added' : file.deleted_file === true ? 'deleted' : file.renamed_file === true ? 'renamed' : 'modified',
    diff: String(file.diff || ''),
  }
}

async function loadGiteeCommitCount(path: string, number: number, config: Config): Promise<number | null> {
  try {
    const remote = await git(path, ['remote', 'get-url', 'origin'])
    const pathname = new URL(remote.replace(/^git@([^:]+):/u, 'https://$1/')).pathname.replace(/^\//u, '').replace(/\.git$/u, '')
    const project = encodeURIComponent(pathname)
    const result = await execFileAsync(config.executable || 'gitee', [
      'api', 'GET', `/open/code/api/v8/projects/${project}/merge_requests/${number}/commits`,
      '--profile', config.profile || 'osc', '-o', 'json',
    ], { cwd: path, timeout: 30_000, maxBuffer: 16 * 1024 * 1024 })
    const payload = parseCliJson(result.stdout || result.stderr)
    return Array.isArray(payload) ? payload.length : null
  } catch {
    return null
  }
}

async function loadGiteePullRequest(path: string, number: number, config: Config) {
  const executable = config.executable || 'gitee'
  const profile = config.profile || 'osc'
  const common = { cwd: path, timeout: 30_000, maxBuffer: 32 * 1024 * 1024 }
  const [detailResult, diffResult, commitCount] = await Promise.all([
    execFileAsync(executable, ['code', 'pr', 'view', String(number), '--json', '--profile', profile], common),
    execFileAsync(executable, ['code', 'pr', 'diff', String(number), '--json', '--profile', profile], common),
    loadGiteeCommitCount(path, number, config),
  ])
  const detailValue = parseCliJson(detailResult.stdout || detailResult.stderr)
  const detail = detailValue && typeof detailValue === 'object' ? detailValue as Record<string, unknown> : {}
  const diffValue = parseCliJson(diffResult.stdout || diffResult.stderr)
  const files = (Array.isArray(diffValue) ? diffValue : []).map(normalizeGiteeFile).filter((file): file is ChangedFile => file !== null)
  const authorValue = detail.author
  const author = authorValue && typeof authorValue === 'object' ? authorValue as Record<string, unknown> : {}
  const additions = files.reduce((sum, file) => sum + file.additions, 0)
  const deletions = files.reduce((sum, file) => sum + file.deletions, 0)
  return {
    number,
    title: String(detail.title || ''),
    description: String(detail.description || ''),
    author: String(author.name || author.user_name || ''),
    sourceBranch: String(detail.source_branch || ''),
    targetBranch: String(detail.target_branch || ''),
    url: String(detail.web_url || detail.html_url || ''),
    updatedAt: String(detail.updated_at || ''),
    commitCount,
    additions,
    deletions,
    changedFiles: files.length,
    hasConflict: detail.has_conflict === true || detail.merge_status === 'cannot_be_merged',
    mergeStatus: String(detail.merge_status || ''),
    files,
  }
}

async function loadGithubPullRequest(identity: ReturnType<typeof parseRemote>, number: number, config: Config) {
  const base = `https://api.github.com/repos/${encodeURIComponent(identity.owner)}/${encodeURIComponent(identity.repository)}`
  const [detailValue, filesValue] = await Promise.all([
    requestJson(`${base}/pulls/${number}`, config.githubToken, 'github'),
    requestJson(`${base}/pulls/${number}/files?per_page=100`, config.githubToken, 'github'),
  ])
  const detail = detailValue && typeof detailValue === 'object' ? detailValue as Record<string, unknown> : {}
  const authorValue = detail.user
  const author = authorValue && typeof authorValue === 'object' ? authorValue as Record<string, unknown> : {}
  const headValue = detail.head
  const head = headValue && typeof headValue === 'object' ? headValue as Record<string, unknown> : {}
  const baseValue = detail.base
  const target = baseValue && typeof baseValue === 'object' ? baseValue as Record<string, unknown> : {}
  const files = (Array.isArray(filesValue) ? filesValue : []).map(value => {
    const file = value && typeof value === 'object' ? value as Record<string, unknown> : {}
    return {
      path: String(file.filename || ''),
      previousPath: String(file.previous_filename || file.filename || ''),
      additions: Number(file.additions || 0),
      deletions: Number(file.deletions || 0),
      status: (['added', 'deleted', 'renamed'].includes(String(file.status)) ? file.status : 'modified') as ChangedFile['status'],
      diff: String(file.patch || ''),
    }
  })
  return {
    number,
    title: String(detail.title || ''),
    description: String(detail.body || ''),
    author: String(author.login || ''),
    sourceBranch: String(head.ref || ''),
    targetBranch: String(target.ref || ''),
    url: String(detail.html_url || ''),
    updatedAt: String(detail.updated_at || ''),
    commitCount: Number(detail.commits || 0),
    additions: Number(detail.additions || 0),
    deletions: Number(detail.deletions || 0),
    changedFiles: Number(detail.changed_files || files.length),
    hasConflict: detail.mergeable === false,
    mergeStatus: String(detail.mergeable_state || ''),
    files,
  }
}

async function loadPullRequest(path: string, number: number, config: Config) {
  const remote = await git(path, ['remote', 'get-url', 'origin'])
  const identity = parseRemote(remote)
  return identity.provider === 'gitee'
    ? loadGiteePullRequest(path, number, config)
    : loadGithubPullRequest(identity, number, config)
}

async function git(cwd: string, args: string[]) {
  const result = await execFileAsync('git', ['-C', cwd, ...args], { timeout: 10_000, maxBuffer: 1024 * 1024 })
  return result.stdout.trim()
}

async function requestJson(url: string, token: string | undefined, provider: Provider) {
  const headers: Record<string, string> = { accept: 'application/json', 'user-agent': 'dsh-pr-assistant' }
  if (token) headers.authorization = provider === 'github' ? `Bearer ${token}` : `token ${token}`
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(15_000) })
  const body = await response.json() as unknown
  if (!response.ok) {
    const message = body && typeof body === 'object' && 'message' in body ? String(body.message) : `HTTP ${response.status}`
    throw new Error(message)
  }
  return body
}

async function loadPullRequests(endpoint: string, token: string | undefined, provider: Provider) {
  const items: unknown[] = []
  for (let page = 1; page <= 50; page += 1) {
    const separator = endpoint.includes('?') ? '&' : '?'
    const body = await requestJson(`${endpoint}${separator}page=${page}`, token, provider)
    if (!Array.isArray(body)) throw new Error('代码平台返回了无法识别的 PR 数据')
    items.push(...body)
    if (body.length < 100) return { items, truncated: false }
  }
  return { items, truncated: true }
}

async function loadRepository(path: string, config: Config) {
  const [root, remote] = await Promise.all([
    git(path, ['rev-parse', '--show-toplevel']),
    git(path, ['remote', 'get-url', 'origin']),
  ])
  const identity = parseRemote(remote)
  const loaded = identity.provider === 'gitee'
    ? await loadGiteePullRequests(path, config)
    : await loadPullRequests(
        `https://api.github.com/repos/${encodeURIComponent(identity.owner)}/${encodeURIComponent(identity.repository)}/pulls?state=open&per_page=100`,
        config.githubToken,
        identity.provider,
      ).then(result => ({ ...result, total: result.items.length }))
  const { items, truncated } = loaded
  return {
    ...identity,
    root,
    openCount: loaded.total,
    truncated,
    pullRequests: items.map(value => {
      const item = value && typeof value === 'object' ? value as Record<string, unknown> : {}
      const authorValue = item.user ?? item.author
      const author = authorValue && typeof authorValue === 'object' ? authorValue as Record<string, unknown> : {}
      return {
        number: Number(item.number || item.iid || item.id || 0),
        title: String(item.title ?? ''),
        author: String(author.login ?? author.name ?? ''),
        updatedAt: String(item.updated_at ?? ''),
        url: String(item.html_url || item.web_url || item.url || ''),
        draft: item.draft === true || item.state === 'drafted',
      }
    }),
  }
}

export const name = 'pr-assistant'
export const inject = ['webServer']

export function apply(ctx: Context, config: Config = {}): void {
  const webServer = ctx.get('webServer') as unknown as WebServer
  ctx.effect(() => webServer.register({
    kind: 'exact',
    path: ROUTE,
    async handler(request, response) {
      if (request.method !== 'GET') return sendJson(response, 405, { error: 'Method not allowed' })
      const path = new URL(request.url ?? ROUTE, 'http://localhost').searchParams.get('path')?.trim()
      if (!path) return sendJson(response, 400, { error: '缺少仓库路径' })
      try {
        sendJson(response, 200, await loadRepository(path, config))
      } catch (error) {
        sendJson(response, 502, { error: error instanceof Error ? error.message : 'PR 读取失败' })
      }
    },
  }), 'pr-assistant: repository route')
  ctx.effect(() => webServer.register({
    kind: 'exact',
    path: DETAIL_ROUTE,
    async handler(request, response) {
      if (request.method !== 'GET') return sendJson(response, 405, { error: 'Method not allowed' })
      const url = new URL(request.url ?? DETAIL_ROUTE, 'http://localhost')
      const path = url.searchParams.get('path')?.trim()
      const number = Number(url.searchParams.get('number'))
      if (!path || !Number.isInteger(number) || number <= 0) return sendJson(response, 400, { error: '无效的 PR 详情请求' })
      try {
        sendJson(response, 200, await loadPullRequest(path, number, config))
      } catch (error) {
        sendJson(response, 502, { error: error instanceof Error ? error.message : 'PR 详情读取失败' })
      }
    },
  }), 'pr-assistant: pull request detail route')
}
