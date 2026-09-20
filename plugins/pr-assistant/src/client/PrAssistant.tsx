import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import type { Context } from '@deepseek-ai/cordis'
import type { ModelCatalog, ModelSelection } from '@deepseek-ai/dsh-api-session-controller/types'
import type {} from '@deepseek-ai/dsh-api-session-controller/client'
import type {} from '@deepseek-ai/dsh-api-session-controller/remote'
import type { WorkspaceView } from '@deepseek-ai/dsh-api-workspace-controller/client'
import type {} from '@deepseek-ai/dsh-api-workspace-controller/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import css from './pr-assistant.module.css'

interface PullRequest {
  number: number
  title: string
  author: string
  updatedAt: string
  url: string
  draft: boolean
  conflictStatus: 'conflicting' | 'mergeable' | 'unknown'
  sourceBranch: string
  targetBranch: string
}

interface RepositoryResult {
  workspaceId: WorkspaceView['workspaceId']
  workspaceTitle: string
  localPath: string
  provider?: 'github' | 'gitee'
  repository?: string
  url?: string
  openCount: number
  truncated?: boolean
  pullRequests: PullRequest[]
  error?: string
}

interface PullRequestDetail {
  number: number
  title: string
  description: string
  author: string
  sourceBranch: string
  targetBranch: string
  url: string
  updatedAt: string
  commitCount: number | null
  additions: number
  deletions: number
  changedFiles: number
  conflictStatus: 'conflicting' | 'mergeable' | 'unknown'
  mergeStatus: string
  commits: Array<{
    sha: string
    title: string
    author: string
    committedAt: string
    url: string
  }>
  files: Array<{
    path: string
    previousPath: string
    additions: number
    deletions: number
    status: 'added' | 'deleted' | 'renamed' | 'modified'
    diff: string
  }>
}

interface ReviewModel extends ModelSelection {
  key: string
  label: string
  providerName: string
  description?: string
}

interface ReviewResult {
  text: string
  time: number
}

interface ConflictLink {
  operationId: string
  sessionId: string
  path: string
  sourceBranch: string
  targetBranch: string
  sourceSha: string
  targetSha: string
}

interface ConflictGitStatus {
  operationId: string
  sourceBranch: string
  targetBranch: string
  sourceSha: string
  targetSha: string
  currentBranch: string
  headSha: string
  clean: boolean
  unresolved: string[]
  targetMerged: boolean
  hasCommit: boolean
  pushReady: boolean
  changedFiles: Array<{ status: string; path: string }>
  commits: Array<{ sha: string; title: string }>
  diff: string
  diffTruncated: boolean
}

const EMPTY_REVIEW_EVENTS = { entries: [], hasMore: false, revision: 0, change: { kind: 'replace' as const, entries: [] } }

let disposeWorkbench: (() => void) | null = null
const HIDDEN_REPOSITORIES_KEY = 'prAssistant.hiddenRepositories.v1'
const REVIEW_SESSION_LINKS_KEY = 'prAssistant.reviewSessionLinks.v1'
const CONFLICT_LINKS_KEY = 'prAssistant.conflictLinks.v1'
type HarnessSessionId = Parameters<Context['sessions']['binding']>[0]

function reviewLinkKey(repository: RepositoryResult, pullRequest: PullRequest) {
  return `${repository.workspaceId}:${pullRequest.number}`
}

function readReviewSessionLinks(): Record<string, string> {
  try {
    const value = JSON.parse(window.localStorage.getItem(REVIEW_SESSION_LINKS_KEY) ?? '{}')
    return value && typeof value === 'object' ? value as Record<string, string> : {}
  } catch {
    return {}
  }
}

function linkedReviewSession(repository: RepositoryResult, pullRequest: PullRequest): HarnessSessionId | null {
  const value = readReviewSessionLinks()[reviewLinkKey(repository, pullRequest)]
  return typeof value === 'string' && value ? value as HarnessSessionId : null
}

function saveReviewSession(repository: RepositoryResult, pullRequest: PullRequest, sessionId: HarnessSessionId) {
  const links = readReviewSessionLinks()
  links[reviewLinkKey(repository, pullRequest)] = String(sessionId)
  window.localStorage.setItem(REVIEW_SESSION_LINKS_KEY, JSON.stringify(links))
}

function readConflictLinks(): Record<string, ConflictLink> {
  try {
    const value = JSON.parse(window.localStorage.getItem(CONFLICT_LINKS_KEY) ?? '{}')
    return value && typeof value === 'object' ? value as Record<string, ConflictLink> : {}
  } catch {
    return {}
  }
}

function conflictLink(repository: RepositoryResult, pullRequest: PullRequest): ConflictLink | null {
  const value = readConflictLinks()[reviewLinkKey(repository, pullRequest)]
  return value && typeof value.operationId === 'string' && typeof value.sessionId === 'string' ? value : null
}

function saveConflictLink(repository: RepositoryResult, pullRequest: PullRequest, value: ConflictLink) {
  const links = readConflictLinks()
  links[reviewLinkKey(repository, pullRequest)] = value
  window.localStorage.setItem(CONFLICT_LINKS_KEY, JSON.stringify(links))
}

function findReviewSession(ctx: Context, repository: RepositoryResult, pullRequest: PullRequest): HarnessSessionId | null {
  const snapshot = ctx.sessions.list.getSnapshot()
  // 只有至少跑过一轮对话的评审会话才算「已关联」：blank 会话（创建后没跑起来、
  // 流程失败留下的空壳等）不拦截入口，让它走选项目的新建评审流程。
  const hasConversation = (id: HarnessSessionId) => snapshot.byId[id]?.blank === false
  const linked = linkedReviewSession(repository, pullRequest)
  if (linked && hasConversation(linked)) return linked
  const expectedTitle = `[PR #${pullRequest.number}] ${pullRequest.title}`
  return snapshot.ids.find(id => {
    const summary = snapshot.byId[id]
    return summary?.title === expectedTitle && summary.cwd === repository.localPath && summary.blank === false
  }) ?? null
}

function useReviewResult(ctx: Context, sessionId: HarnessSessionId | null): ReviewResult | null {
  const binding = sessionId ? ctx.sessions.binding(sessionId) : undefined
  const source = binding?.eventSource
  const window = useSyncExternalStore(
    listener => source?.subscribe(listener) ?? (() => {}),
    () => source?.getSnapshot() ?? EMPTY_REVIEW_EVENTS,
    () => source?.getSnapshot() ?? EMPTY_REVIEW_EVENTS,
  )
  const running = useSyncExternalStore(
    listener => binding?.session.subscribe(listener) ?? (() => {}),
    () => binding?.session.getSnapshot().running ?? false,
    () => binding?.session.getSnapshot().running ?? false,
  )
  if (running) return null
  for (let index = window.entries.length - 1; index >= 0; index -= 1) {
    const entry = window.entries[index]
    if (entry?.type !== 'event' || entry.event.type !== 'assistant/message') continue
    const text = entry.event.data.message.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n')
      .trim()
    if (text) return { text, time: entry.event.time }
  }
  return null
}

function readHiddenRepositories() {
  try {
    const value = JSON.parse(window.localStorage.getItem(HIDDEN_REPOSITORIES_KEY) ?? '[]')
    return new Set(Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [])
  } catch {
    return new Set<string>()
  }
}

function relativeTime(value: string) {
  const elapsed = Date.now() - new Date(value).getTime()
  if (!Number.isFinite(elapsed)) return ''
  const hours = Math.max(0, Math.floor(elapsed / 3_600_000))
  if (hours < 1) return '刚刚更新'
  if (hours < 24) return `${hours} 小时前`
  return `${Math.floor(hours / 24)} 天前`
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch { /* fall through to legacy path */ }
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

async function inspectWorkspace(workspace: WorkspaceView): Promise<RepositoryResult> {
  try {
    const query = new URLSearchParams({ path: workspace.path })
    const response = await fetch(`/api/pr-assistant/repository?${query}`, { headers: { accept: 'application/json' } })
    const body = await response.json() as Omit<RepositoryResult, 'workspaceId' | 'workspaceTitle'> & { error?: string }
    if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`)
    return { ...body, workspaceId: workspace.workspaceId, workspaceTitle: workspace.title, localPath: workspace.path }
  } catch (error) {
    return {
      workspaceId: workspace.workspaceId,
      workspaceTitle: workspace.title,
      localPath: workspace.path,
      openCount: 0,
      pullRequests: [],
      error: error instanceof Error ? error.message : '仓库读取失败',
    }
  }
}

async function inspectWorkspaces(workspaces: readonly WorkspaceView[], concurrency = 4) {
  const results = new Array<RepositoryResult>(workspaces.length)
  let cursor = 0
  await Promise.all(Array.from({ length: Math.min(concurrency, workspaces.length) }, async () => {
    while (cursor < workspaces.length) {
      const index = cursor
      cursor += 1
      const workspace = workspaces[index]
      if (!workspace) break
      results[index] = await inspectWorkspace(workspace)
    }
  }))
  return results
}

function SidebarAction({ wide, openWorkbench }: { wide: boolean; openWorkbench: () => void }) {
  return (
    <button className={css.sidebarAction} type="button" title="PR 助手" onClick={openWorkbench}>
      <span className={css.branchIcon} aria-hidden="true"><i /><i /><i /></span>
      {wide ? <span>PR 助手</span> : null}
    </button>
  )
}

function FileDiff({ diff }: { diff: string }) {
  if (!diff) return <div className={css.diffUnavailable}>该文件没有可展示的文本差异，可能是二进制文件或平台省略了补丁。</div>
  return <pre className={css.diffBlock}>{diff.split('\n').map((line, index) => (
    <span className={line.startsWith('+') ? css.diffAdd : line.startsWith('-') ? css.diffDelete : line.startsWith('@@') ? css.diffHunk : undefined} key={index}>{line || ' '}\n</span>
  ))}</pre>
}

interface CommitDetail {
  sha: string
  files: NonNullable<PullRequestDetail['files']>
}

type CommitSummary = PullRequestDetail['commits'][number]

async function readApiJson<T>(response: Response): Promise<T> {
  const text = await response.text()
  let body: T & { error?: string }
  try {
    body = JSON.parse(text) as T & { error?: string }
  } catch {
    if (response.status === 404) throw new Error('提交详情接口尚未加载，请重启 Harness Desktop 后重试')
    throw new Error(text.trim() || `接口返回了无效数据 (${response.status})`)
  }
  if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`)
  return body
}

function CommitRow({ commit, repositoryPath }: { commit: CommitSummary; repositoryPath: string }) {
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<CommitDetail['files'] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open || files || loading) return
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    const query = new URLSearchParams({ path: repositoryPath, sha: commit.sha })
    void fetch(`/api/pr-assistant/commit?${query}`, {
      headers: { accept: 'application/json' },
      signal: controller.signal,
    }).then(async response => {
      const body = await readApiJson<CommitDetail>(response)
      setFiles(body.files ?? [])
    }).catch(reason => {
      if (reason instanceof Error && reason.name === 'AbortError') return
      setError(reason instanceof Error ? reason.message : '提交详情读取失败')
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false)
    })
    return () => controller.abort()
  }, [commit.sha, files, open, repositoryPath])

  async function copySha() {
    if (await copyToClipboard(commit.sha)) {
      setCopied(true)
    }
  }

  return (
    <li>
      <div className={css.commitRow}>
        <button
          className={css.commitMain}
          type="button"
          aria-expanded={open}
          title={open ? '收起提交详情' : '展开提交详情'}
          onClick={() => setOpen(value => !value)}
        >
          <span className={css.disclosureIcon} aria-hidden="true"><svg viewBox="0 0 12 12"><path d="m4.5 2.5 3.5 3.5-3.5 3.5" /></svg></span>
          <div className={css.commitMeta}>
            <strong>{commit.title || '无提交说明'}</strong>
            <span>{commit.author || '未知作者'} · {relativeTime(commit.committedAt)}</span>
          </div>
        </button>
        <button
          className={css.commitShaButton}
          type="button"
          title={copied ? '已复制' : '复制完整 commit hash'}
          aria-label={copied ? `已复制 ${commit.sha}` : `复制 ${commit.sha}`}
          aria-pressed={copied}
          onClick={() => void copySha()}
        >
          <code>{commit.sha.slice(0, 7)}</code>
          <span className={css.commitShaCopyHint} aria-hidden="true">{copied ? '✓' : '⧉'}</span>
        </button>
        {commit.url ? (
          <button
            className={css.commitExternal}
            type="button"
            aria-label="打开提交"
            title="打开提交"
            onClick={() => window.open(commit.url, '_blank', 'noopener,noreferrer')}
          >
            ↗
          </button>
        ) : null}
      </div>
      {open ? (
        <div className={css.commitBody}>
          {loading ? <div className={css.commitState}>正在读取提交变更…</div> : null}
          {error ? <div className={css.commitState} role="alert">{error}</div> : null}
          {files ? (
            files.length ? (
              <ol className={css.commitFiles}>
                {files.map(file => (
                  <li key={`${file.previousPath}:${file.path}`}>
                    <details>
                      <summary>
                        <span className={css.disclosureIcon} aria-hidden="true"><svg viewBox="0 0 12 12"><path d="m4.5 2.5 3.5 3.5-3.5 3.5" /></svg></span>
                        <span className={css.fileStatus}>{file.status === 'added' ? 'A' : file.status === 'deleted' ? 'D' : file.status === 'renamed' ? 'R' : 'M'}</span>
                        <code>{file.path}</code>
                        <span className={css.fileCounts}><i>+{file.additions}</i><b>−{file.deletions}</b></span>
                      </summary>
                      <FileDiff diff={file.diff} />
                    </details>
                  </li>
                ))}
              </ol>
            ) : <div className={css.commitState}>该提交没有可展示的文件变更。</div>
          ) : null}
        </div>
      ) : null}
    </li>
  )
}

function CommitView({ commits, repositoryPath }: { commits: CommitSummary[]; repositoryPath: string }) {
  return (
    <section className={css.commitView}>
      <h3>按提交查看 <span>{commits.length}</span></h3>
      <ol className={css.commitList}>
        {commits.map(commit => (
          <CommitRow key={commit.sha} commit={commit} repositoryPath={repositoryPath} />
        ))}
      </ol>
    </section>
  )
}

function conflictLabel(detail: PullRequestDetail) {
  if (detail.conflictStatus === 'conflicting') return '存在冲突'
  if (detail.conflictStatus === 'mergeable') return '无冲突'
  return '待平台检测'
}

function buildReviewPrompt(repository: RepositoryResult, pullRequest: PullRequest, detail: PullRequestDetail) {
  const commits = detail.commits.length
    ? detail.commits.map((commit, index) => `${index + 1}. ${commit.sha.slice(0, 12)} ${commit.title || '无提交说明'}（${commit.author || '未知作者'}）`).join('\n')
    : '提交信息暂不可用。'
  const description = detail.description.trim() || '未提供 PR 说明。'
  const platformCommand = repository.provider === 'gitee'
    ? `如需补充证据，可使用只读命令 gitee code pr view ${pullRequest.number} 和 gitee code pr diff ${pullRequest.number}。`
    : `如需补充证据，可使用 GitHub API 或当前可用的 GitHub 工具读取 PR #${pullRequest.number} 的完整 diff。`

  return [
    `请对当前仓库的 PR #${pullRequest.number} 做一次严格的代码评审。`,
    `标题：${detail.title}`,
    `分支：${detail.sourceBranch} → ${detail.targetBranch}`,
    `PR 说明：\n${description}`,
    `当前摘要：${detail.changedFiles} 个文件，+${detail.additions}/-${detail.deletions}，合并状态：${conflictLabel(detail)}${detail.mergeStatus ? `（平台原始状态：${detail.mergeStatus}）` : ''}。`,
    `本 PR 的提交记录（共 ${detail.commitCount ?? detail.commits.length} 个）：\n${commits}`,
    '先结合 PR 说明和每条 commit 的标题理解需求目标与实现演进，再检查最终 diff。不要把明确属于需求目标的行为变化本身当成风险；只有当实现偏离目标、破坏既有约束，或存在可复现缺陷时才报告。commit 信息用于理解意图，不能替代代码证据。',
    platformCommand,
    '重点检查正确性、回归风险、安全性、并发/状态一致性、边界条件、性能和缺失测试。',
    '只报告可以用代码证据证明的问题；每条问题标注严重级别、文件路径、紧凑行号范围、触发场景和修复建议。',
    '回复必须简明且仅保留必要信息：不要复述 PR 背景、检查过程或给出泛化建议；每个问题最多一个短段落。',
    '如果没有发现问题，只回复“未发现明确问题”，必要时再用一行列出关键未验证风险。',
    '本次只做只读评审；不要修改代码、提交分支、合并 PR 或向代码平台发表评论，除非我之后明确授权。',
  ].join('\n')
}

function buildConflictPrompt(pullRequest: PullRequest, operation: ConflictLink) {
  return [
    `请在当前本地仓库中处理 PR #${pullRequest.number} 的合并冲突。`,
    `源分支：${operation.sourceBranch}（预检版本 ${operation.sourceSha}）`,
    `目标分支：${operation.targetBranch}（预检版本 ${operation.targetSha}）`,
    '你已获得修改仓库的授权，但绝对不要 push、force push、rebase、reset --hard 或清理用户文件。',
    `第一步确认仓库路径为 ${operation.path}，执行 git status，并切换/确认当前分支必须是 ${operation.sourceBranch}；若不一致或工作区不干净，立即停止并说明。`,
    `使用锁定的目标提交 ${operation.targetSha} 合并到当前源分支（git merge --no-ff --no-commit ${operation.targetSha}），逐项解决冲突。`,
    '理解源分支与目标分支双方意图后再解决，不得简单选择 ours/theirs 覆盖；解决后检查不存在未合并文件，并运行 git diff --check。',
    '识别并运行与改动相关的仓库测试或类型检查；如果测试失败，修复后重试。无法运行的测试必须明确说明原因。',
    `确认无未解决冲突后提交，提交标题使用“Resolve conflicts for PR #${pullRequest.number}”。只提交本次冲突处理产生的修改。`,
    '最终回复必须包含：1. 提交 hash；2. 测试命令及结果；3. 修改位置（文件及关键区域）；4. 每处冲突的处理逻辑。不要执行 push，推送由用户在 PR 助手中确认。',
  ].join('\n')
}

function flattenModels(catalog: ModelCatalog): ReviewModel[] {
  const models: ReviewModel[] = []
  const routableProviders = new Set(catalog.routableProviders)
  for (const group of catalog.groups) {
    if (!routableProviders.has(group.id)) continue
    for (const model of group.models) {
      models.push({
        key: `${group.id}\u0000${model.id}`,
        provider: group.id,
        model: model.id,
        label: model.name,
        providerName: group.name,
        ...(model.description ? { description: model.description } : {}),
        ...(model.reasoning?.defaultEffort ? { reasoningEffort: model.reasoning.defaultEffort } : {}),
      })
    }
  }
  return models
}

function AiReviewDialog({
  ctx, repository, pullRequest, detail, onClose, onStarted,
}: {
  ctx: Context
  repository: RepositoryResult
  pullRequest: PullRequest
  detail: PullRequestDetail
  onClose: () => void
  onStarted: () => void
}) {
  const [models, setModels] = useState<ReviewModel[]>([])
  const [selectedKey, setSelectedKey] = useState('')
  const [loading, setLoading] = useState(true)
  const [starting, setStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    void ctx.remote.session.modelCatalog().then(result => {
      if (!active) return
      if (!result.ok) throw new Error(`${result.error.code}: ${result.error.message}`)
      const next = flattenModels(result.value)
      setModels(next)
      const preferred = next.find(model => model.provider === result.value.default.provider && model.model === result.value.default.model)
      setSelectedKey(preferred?.key ?? next[0]?.key ?? '')
    }).catch(reason => {
      if (active) setError(reason instanceof Error ? reason.message : '模型列表读取失败')
    }).finally(() => {
      if (active) setLoading(false)
    })
    return () => { active = false }
  }, [ctx])

  async function startReview() {
    const selected = models.find(model => model.key === selectedKey)
    if (!selected || starting) return
    setStarting(true)
    setError(null)
    try {
      const sessionId = await ctx.sessions.create({ workspaceId: repository.workspaceId })
      const selectedResult = await ctx.remote.session.selectModel({
        sessionId,
        provider: selected.provider,
        model: selected.model,
        ...(selected.reasoningEffort ? { reasoningEffort: selected.reasoningEffort } : {}),
      })
      if (!selectedResult.ok) throw new Error(`模型选择失败：${selectedResult.error.message}`)
      const session = ctx.sessions.binding(sessionId)?.session
      if (!session) throw new Error('新建评审对话未能在 Harness 中加载')
      const renamed = await session.rename(`[PR #${pullRequest.number}] ${pullRequest.title}`)
      if (!renamed.ok) throw new Error(`评审对话命名失败：${renamed.error.message}`)
      const prompt = buildReviewPrompt(repository, pullRequest, detail)
      const prompted = await session.prompt([{ type: 'text', text: prompt }], 'queue')
      if (!prompted.ok) throw new Error(`评审任务发送失败：${prompted.error.message}`)
      saveReviewSession(repository, pullRequest, sessionId)
      ctx.sessions.open(sessionId)
      onStarted()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'AI 评审启动失败')
    } finally {
      setStarting(false)
    }
  }

  const selected = models.find(model => model.key === selectedKey)
  return (
    <div className={css.modalBackdrop} role="presentation" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className={css.reviewDialog} role="dialog" aria-modal="true" aria-labelledby="ai-review-title">
        <span className={css.eyebrow}>AI CODE REVIEW</span>
        <h2 id="ai-review-title">选择评审模型</h2>
        <p>将为 {repository.repository} 的 PR #{pullRequest.number} 创建一个只读评审对话。</p>
        {error ? <div className={css.reviewError} role="alert">{error}</div> : null}
        <label className={css.modelField}>
          <span>Harness 模型</span>
          <select disabled={loading || starting} value={selectedKey} onChange={event => setSelectedKey(event.target.value)}>
            {models.map(model => <option key={model.key} value={model.key}>{model.providerName} · {model.label}</option>)}
          </select>
        </label>
        <div className={css.modelHint}>{loading ? '正在读取可用模型…' : selected?.description || selected?.providerName || '没有可用模型'}</div>
        <footer>
          <button type="button" disabled={starting} onClick={onClose}>取消</button>
          <button type="button" disabled={!selected || loading || starting} onClick={() => void startReview()}>{starting ? '正在创建…' : '开始 AI 评审'}</button>
        </footer>
      </section>
    </div>
  )
}

function PrAssistantPanel({ ctx, close }: { ctx: Context; close: () => void }) {
  const panelRef = useRef<HTMLElement>(null)
  const refreshGeneration = useRef(0)
  const [results, setResults] = useState<RepositoryResult[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [hiddenRepositories, setHiddenRepositories] = useState(readHiddenRepositories)
  const [restoreOpen, setRestoreOpen] = useState(false)
  const [restoreWorkspaceId, setRestoreWorkspaceId] = useState('')
  const [selection, setSelection] = useState<{ repository: RepositoryResult; pullRequest: PullRequest } | null>(null)
  const [detail, setDetail] = useState<PullRequestDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [commitView, setCommitView] = useState(false)
  const [conflict, setConflict] = useState<ConflictLink | null>(null)
  const [conflictStatus, setConflictStatus] = useState<ConflictGitStatus | null>(null)
  const [conflictBusy, setConflictBusy] = useState(false)
  const [conflictError, setConflictError] = useState<string | null>(null)
  const [pushed, setPushed] = useState(false)
  const [commentBusy, setCommentBusy] = useState(false)
  const [commentStatus, setCommentStatus] = useState<string | null>(null)
  const workspaces = useSyncExternalStore(
    listener => ctx.workspaces.list.subscribe(listener),
    () => ctx.workspaces.list.getSnapshot(),
    () => ctx.workspaces.list.getSnapshot(),
  )

  async function refresh() {
    const generation = ++refreshGeneration.current
    setLoading(true)
    try {
      const next = await inspectWorkspaces(workspaces.items)
      if (generation === refreshGeneration.current) setResults(next)
    } finally {
      if (generation === refreshGeneration.current) setLoading(false)
    }
  }

  useEffect(() => { void refresh() }, [workspaces.items])
  useEffect(() => {
    if (!selection) return
    setCommitView(false)
    const controller = new AbortController()
    const query = new URLSearchParams({ path: selection.repository.localPath, number: String(selection.pullRequest.number), _t: String(Date.now()) })
    setDetail(null)
    setDetailError(null)
    setDetailLoading(true)
    void fetch(`/api/pr-assistant/pull-request?${query}`, {
      headers: { accept: 'application/json' },
      signal: controller.signal,
    }).then(async response => {
      const body = await response.json() as PullRequestDetail & { error?: string }
      if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`)
      setDetail(body)
    }).catch(error => {
      if (error instanceof Error && error.name === 'AbortError') return
      setDetailError(error instanceof Error ? error.message : 'PR 详情读取失败')
    }).finally(() => {
      if (!controller.signal.aborted) setDetailLoading(false)
    })
    return () => controller.abort()
  }, [selection])
  useEffect(() => {
    setConflict(selection ? conflictLink(selection.repository, selection.pullRequest) : null)
    setConflictStatus(null)
    setConflictError(null)
    setPushed(false)
    setCommentStatus(null)
  }, [selection])
  useEffect(() => {
    if (!conflict) return
    let active = true
    let timer: number | undefined
    const refreshStatus = async () => {
      try {
        const query = new URLSearchParams({ operationId: conflict.operationId })
        const status = await readApiJson<ConflictGitStatus>(await fetch(`/api/pr-assistant/conflict/status?${query}`, { headers: { accept: 'application/json' } }))
        if (active) setConflictStatus(status)
      } catch (reason) {
        if (active) setConflictError(reason instanceof Error ? reason.message : '冲突处理状态读取失败')
      }
      if (active) timer = window.setTimeout(refreshStatus, 2000)
    }
    void refreshStatus()
    return () => { active = false; if (timer !== undefined) window.clearTimeout(timer) }
  }, [conflict])
  useEffect(() => {
    const closeOnOutsideNavigation = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || panelRef.current?.contains(event.target)) return
      if (event.target.closest('[role="dialog"], [role="menu"]')) return
      close()
    }
    document.addEventListener('pointerdown', closeOnOutsideNavigation, true)
    return () => document.removeEventListener('pointerdown', closeOnOutsideNavigation, true)
  }, [close])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const visible = results.filter(result => !hiddenRepositories.has(result.workspaceId))
    if (!needle) return visible
    return visible.filter(result => [result.workspaceTitle, result.repository, result.provider]
      .some(value => value?.toLowerCase().includes(needle)))
  }, [hiddenRepositories, query, results])
  const visibleResults = results.filter(result => !hiddenRepositories.has(result.workspaceId))
  const total = visibleResults.reduce((sum, result) => sum + result.openCount, 0)
  const healthy = visibleResults.filter(result => !result.error).length

  function hideRepository(workspaceId: string) {
    setHiddenRepositories(current => {
      const next = new Set(current).add(workspaceId)
      window.localStorage.setItem(HIDDEN_REPOSITORIES_KEY, JSON.stringify([...next]))
      return next
    })
  }

  function restoreRepository(workspaceId: string) {
    setHiddenRepositories(current => {
      const next = new Set(current)
      next.delete(workspaceId)
      window.localStorage.setItem(HIDDEN_REPOSITORIES_KEY, JSON.stringify([...next]))
      setRestoreOpen(false)
      setRestoreWorkspaceId('')
      return next
    })
  }

  async function publishReviewToPr() {
    if (!selection || !reviewResult || commentBusy) return
    if (reviewResult.text.length > 20_000) {
      setCommentStatus('AI 分析结果超过 20000 个字符，无法发布，请先在会话中精简内容。')
      return
    }
    if (!window.confirm(`确认将当前 AI 分析结果评论到 PR #${selection.pullRequest.number}？\n\n发布后会对仓库协作者可见。`)) return
    setCommentBusy(true)
    setCommentStatus(null)
    try {
      await readApiJson<{ published: true }>(await fetch('/api/pr-assistant/review/comment', {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json', 'x-pr-assistant-action': '1' },
        body: JSON.stringify({
          path: selection.repository.localPath,
          number: selection.pullRequest.number,
          body: reviewResult.text,
        }),
      }))
      setCommentStatus('已成功评论到 PR。')
    } catch (reason) {
      setCommentStatus(reason instanceof Error ? reason.message : 'PR 评论发布失败')
    } finally {
      setCommentBusy(false)
    }
  }

  async function startConflictResolution() {
    if (!selection || !detail || conflictBusy) return
    setConflictBusy(true)
    setConflictError(null)
    try {
      const response = await fetch('/api/pr-assistant/conflict/preflight', {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json', 'x-pr-assistant-action': '1' },
        body: JSON.stringify({ path: selection.repository.localPath, number: selection.pullRequest.number }),
      })
      const preflight = await readApiJson<Omit<ConflictLink, 'sessionId'>>(response)
      const sessionId = await ctx.sessions.create({ cwd: preflight.path })
      const catalog = await ctx.remote.session.modelCatalog()
      if (!catalog.ok) throw new Error(`模型列表读取失败：${catalog.error.message}`)
      const selected = catalog.value.default
      const selectedResult = await ctx.remote.session.selectModel({ sessionId, ...selected })
      if (!selectedResult.ok) throw new Error(`模型选择失败：${selectedResult.error.message}`)
      const session = ctx.sessions.binding(sessionId)?.session
      if (!session) throw new Error('新建冲突处理对话未能在 Harness 中加载')
      const renamed = await session.rename(`[PR #${selection.pullRequest.number}] 处理合并冲突`)
      if (!renamed.ok) throw new Error(`对话命名失败：${renamed.error.message}`)
      const link: ConflictLink = { ...preflight, sessionId: String(sessionId) }
      const prompted = await session.prompt([{ type: 'text', text: buildConflictPrompt(selection.pullRequest, link) }], 'queue')
      if (!prompted.ok) throw new Error(`冲突处理任务发送失败：${prompted.error.message}`)
      saveConflictLink(selection.repository, selection.pullRequest, link)
      setConflict(link)
      ctx.sessions.open(sessionId)
    } catch (reason) {
      setConflictError(reason instanceof Error ? reason.message : '冲突处理启动失败')
    } finally {
      setConflictBusy(false)
    }
  }

  async function pushConflictResolution() {
    if (!conflict || !conflictStatus?.pushReady || conflictBusy) return
    if (!window.confirm(`确认将 ${conflictStatus.headSha.slice(0, 12)} 推送到 origin/${conflict.sourceBranch}？`)) return
    setConflictBusy(true)
    setConflictError(null)
    try {
      await readApiJson<{ pushed: true }>(await fetch('/api/pr-assistant/conflict/push', {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json', 'x-pr-assistant-action': '1' },
        body: JSON.stringify({ operationId: conflict.operationId, expectedHead: conflictStatus.headSha }),
      }))
      setPushed(true)
    } catch (reason) {
      setConflictError(reason instanceof Error ? reason.message : '推送失败')
    } finally {
      setConflictBusy(false)
    }
  }

  function openAiReview() {
    if (!selection) return
    setReviewOpen(true)
  }

  const linkedSessionId = selection ? findReviewSession(ctx, selection.repository, selection.pullRequest) : null
  const hasLinkedReview = linkedSessionId !== null
  const reviewResult = useReviewResult(ctx, linkedSessionId)
  const conflictSessionId = conflict?.sessionId as HarnessSessionId | undefined
  const conflictResult = useReviewResult(ctx, conflictSessionId ?? null)

  return (
    <section ref={panelRef} className={css.workbench} aria-label="PR 助手">
      <header className={css.header}>
        <div>
          <span className={css.eyebrow}>REVIEW RADAR</span>
          <div className={css.titleRow}>
            {selection && commitView ? <button className={css.titleBack} type="button" aria-label="返回 PR 详情" title="返回 PR 详情" onClick={() => setCommitView(false)}>←</button> : null}
            {selection && !commitView ? <button className={css.titleBack} type="button" aria-label="返回 PR 列表" title="返回 PR 列表" onClick={() => setSelection(null)}>←</button> : null}
            <h1>{selection ? (commitView ? `#${selection.pullRequest.number} 按提交查看` : `#${selection.pullRequest.number} PR 详情`) : 'PR 助手'}</h1>
          </div>
          <p>{selection ? (commitView ? `${detail?.commits.length ?? 0} 个提交` : selection.repository.repository) : `${healthy} 个代码仓库 · ${total} 个待处理 PR`}</p>
        </div>
        <div className={css.actions}>
          {!selection ? (
            <>
              <label className={css.search}>
                <span aria-hidden="true">⌕</span>
                <input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索仓库" />
              </label>
              <button type="button" disabled={loading} onClick={() => void refresh()}>{loading ? '同步中…' : '刷新'}</button>
              {hiddenRepositories.size ? <button type="button" onClick={() => { setRestoreWorkspaceId(''); setRestoreOpen(true) }}>恢复隐藏 ({hiddenRepositories.size})</button> : null}
            </>
          ) : null}
          <button type="button" aria-label="关闭" onClick={close}>×</button>
        </div>
      </header>

      <div className={css.scrollArea}>
      {selection ? (
        <main className={css.detail}>
          {detailLoading ? <div className={css.detailState}>正在读取 PR 详情…</div> : null}
          {detailError ? <div className={css.detailState} role="alert">{detailError}</div> : null}
          {detail ? (
            commitView ? (
              <CommitView commits={detail.commits} repositoryPath={selection.repository.localPath} />
            ) : (
              <>
              <section className={css.detailHero}>
                <div>
                  <span>{detail.author} · {relativeTime(detail.updatedAt)}</span>
                  <h2>{detail.title}</h2>
                  <code>{detail.sourceBranch} → {detail.targetBranch}</code>
                </div>
                <div className={css.detailActions}>
                  {detail.conflictStatus === 'conflicting' ? <button className={css.conflictButton} type="button" disabled={conflictBusy} onClick={() => void startConflictResolution()}>{conflict ? '重新处理冲突' : conflictBusy ? '正在预检…' : '一键处理冲突'}</button> : null}
                  <button className={css.reviewButton} type="button" onClick={openAiReview}>{hasLinkedReview ? '重新分析' : 'AI 评审'}</button>
                  <button type="button" onClick={() => window.open(detail.url, '_blank', 'noopener,noreferrer')}>打开 PR ↗</button>
                </div>
              </section>
              <section className={css.detailStats}>
                <button className={css.commitStat} type="button" disabled={detail.commitCount === null} onClick={() => setCommitView(true)}><strong>{detail.commitCount ?? '—'}</strong><span>{detail.commitCount === null ? '提交数暂不可用' : '提交 · 点击查看'}</span></button>
                <div><strong>{detail.changedFiles}</strong><span>变更文件</span></div>
                <div><strong className={css.addition}>+{detail.additions}</strong><span>新增行</span></div>
                <div><strong className={css.deletion}>−{detail.deletions}</strong><span>删除行</span></div>
                <div title={detail.mergeStatus ? `平台状态：${detail.mergeStatus}` : undefined}><strong className={detail.conflictStatus === 'conflicting' ? css.conflict : detail.conflictStatus === 'mergeable' ? css.clean : css.unknown}>{conflictLabel(detail)}</strong><span>冲突状态</span></div>
              </section>
              {detail.description ? <section className={css.description}><h3>说明</h3><p>{detail.description}</p></section> : null}
              {conflict || conflictError ? (
                <section className={css.conflictResult}>
                  <header>
                    <div><span className={css.eyebrow}>CONFLICT RESOLUTION</span><h3>冲突处理</h3></div>
                    <div className={css.conflictResultActions}>
                      {conflictSessionId ? <button type="button" onClick={() => { ctx.sessions.open(conflictSessionId); close() }}>打开处理会话 ↗</button> : null}
                      {conflictStatus?.pushReady && !pushed ? <button className={css.pushButton} type="button" disabled={conflictBusy} onClick={() => void pushConflictResolution()}>{conflictBusy ? '推送中…' : `Push 到 ${conflictStatus.sourceBranch}`}</button> : null}
                    </div>
                  </header>
                  {conflictError ? <div className={css.reviewError} role="alert">{conflictError}</div> : null}
                  {pushed ? <div className={css.conflictSuccess}>已成功推送到 origin/{conflict?.sourceBranch}</div> : null}
                  {conflictStatus ? (
                    <div className={css.conflictFacts}>
                      <span>当前分支 <code>{conflictStatus.currentBranch || 'detached HEAD'}</code></span>
                      <span>工作区 {conflictStatus.clean ? '干净' : '有未提交修改'}</span>
                      <span>未解决冲突 {conflictStatus.unresolved.length}</span>
                      <span>目标已合并 {conflictStatus.targetMerged ? '是' : '否'}</span>
                      <span>提交 {conflictStatus.hasCommit ? conflictStatus.headSha.slice(0, 12) : '尚未生成'}</span>
                    </div>
                  ) : <div className={css.commitState}>正在读取仓库处理状态…</div>}
                  {conflictStatus?.changedFiles.length ? <div className={css.conflictChanges}><h4>已提交修改位置</h4><ol>{conflictStatus.changedFiles.map(file => <li key={`${file.status}:${file.path}`}><b>{file.status}</b><code>{file.path}</code></li>)}</ol></div> : null}
                  {conflictResult ? <div className={css.conflictLogic}><h4>AI 处理逻辑与测试结果</h4><pre>{conflictResult.text}</pre></div> : <div className={css.commitState}>AI 正在处理；完成后将在此回填修改位置、测试结果和处理逻辑。</div>}
                </section>
              ) : null}
              {reviewResult ? (
                <section className={css.reviewResult}>
                  <header>
                    <div><span className={css.eyebrow}>AI REVIEW</span><h3>AI 分析结果</h3></div>
                    <div className={css.reviewResultActions}>
                      <button type="button" disabled={commentBusy} onClick={() => void publishReviewToPr()}>{commentBusy ? '发布中…' : '评论到 PR'}</button>
                      <button type="button" onClick={() => { if (linkedSessionId) { ctx.sessions.open(linkedSessionId); close() } }}>打开评审对话 ↗</button>
                    </div>
                  </header>
                  {commentStatus ? <div className={commentStatus === '已成功评论到 PR。' ? css.commentSuccess : css.reviewError} role="status">{commentStatus}</div> : null}
                  <pre>{reviewResult.text}</pre>
                </section>
              ) : hasLinkedReview ? (
                <section className={css.reviewPending}>
                  <span className={css.eyebrow}>AI REVIEW</span>
                  <strong>AI 分析正在处理中</strong>
                  <button type="button" onClick={() => { if (linkedSessionId) { ctx.sessions.open(linkedSessionId); close() } }}>查看评审对话</button>
                </section>
              ) : null}
              <section className={css.files}>
                <h3>文件差异 <span>{detail.files.length}</span></h3>
                <ol>{detail.files.map(file => (
                  <li key={`${file.previousPath}:${file.path}`}>
                    <details>
                      <summary>
                        <span className={css.disclosureIcon} aria-hidden="true"><svg viewBox="0 0 12 12"><path d="m4.5 2.5 3.5 3.5-3.5 3.5" /></svg></span>
                        <span className={css.fileStatus}>{file.status === 'added' ? 'A' : file.status === 'deleted' ? 'D' : file.status === 'renamed' ? 'R' : 'M'}</span>
                        <code>{file.path}</code>
                        <span className={css.fileCounts}><i>+{file.additions}</i><b>−{file.deletions}</b></span>
                      </summary>
                      <FileDiff diff={file.diff} />
                    </details>
                  </li>
                ))}</ol>
              </section>
              </>
            )
          ) : null}
        </main>
      ) : (
        <main className={css.grid}>
        {filtered.map(result => (
          <article className={css.repo} key={result.workspaceId}>
            <div className={css.repoHeader}>
              <div className={css.repoIdentity}>
                <span className={css.provider}>{result.provider ?? 'GIT'}</span>
                <h2 title={result.repository ?? result.workspaceTitle}>{result.repository ?? result.workspaceTitle}</h2>
              </div>
              <div className={css.repoTools}>
                <span className={result.openCount ? css.countActive : css.count}>{result.openCount} 个 PR</span>
                <button className={css.hideRepo} type="button" onClick={() => hideRepository(result.workspaceId)}>隐藏</button>
              </div>
            </div>
            {result.error ? (
              <div className={css.error}><strong>无法读取</strong><span>{result.error}</span></div>
            ) : result.pullRequests.length ? (
              <ol className={css.prList}>
                {result.pullRequests.map(pr => (
                  <li key={pr.number}>
                    <div className={css.prRow}>
                    <button className={css.prMain} type="button" onClick={() => setSelection({ repository: result, pullRequest: pr })}>
                      <span className={css.prNumber}>#{pr.number}</span>
                      <span className={css.prTitle}>{pr.title}</span>
                      {pr.draft ? <span className={css.draft}>草稿</span> : null}
                      {pr.conflictStatus === 'conflicting' ? <span className={css.conflictTag}>冲突</span> : pr.conflictStatus === 'unknown' ? <span className={css.unknownTag}>待检测</span> : null}
                      {pr.sourceBranch || pr.targetBranch ? (
                        <span className={css.branches}>
                          <span className={css.sourceBranch} title={`来源分支：${pr.sourceBranch || '未知'}`}><b>来源</b><code>{pr.sourceBranch || '未知'}</code></span>
                          <span className={css.targetBranch} title={`目标分支：${pr.targetBranch || '未知'}`}><b>目标</b><code>{pr.targetBranch || '未知'}</code></span>
                        </span>
                      ) : null}
                      <span className={css.meta}>{pr.author || '未知作者'} · {relativeTime(pr.updatedAt)}</span>
                    </button>
                    <button className={css.externalLink} type="button" aria-label="打开 PR" title="打开 PR" onClick={() => window.open(pr.url, '_blank', 'noopener,noreferrer')}>
                      <svg aria-hidden="true" viewBox="0 0 16 16"><path d="M6 3H3.8A1.8 1.8 0 0 0 2 4.8v7.4A1.8 1.8 0 0 0 3.8 14h7.4a1.8 1.8 0 0 0 1.8-1.8V10M9 2h5v5M14 2 7.5 8.5" /></svg>
                    </button>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <div className={css.empty}><span>✓</span><p>队列已清空</p><small>当前没有待处理的 PR</small></div>
            )}
            {result.truncated ? <p className={css.notice}>仅显示前 100 个 PR</p> : null}
          </article>
        ))}
        {!loading && filtered.length === 0 ? <div className={css.noResults}>没有匹配的仓库</div> : null}
        </main>
      )}</div>
      {reviewOpen && selection && detail ? (
        <AiReviewDialog
          ctx={ctx}
          repository={selection.repository}
          pullRequest={selection.pullRequest}
          detail={detail}
          onClose={() => setReviewOpen(false)}
          onStarted={close}
        />
      ) : null}
      {restoreOpen ? (
        <div className={css.modalBackdrop} role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setRestoreOpen(false) }}>
          <section className={css.restoreDialog} role="dialog" aria-modal="true" aria-labelledby="restore-repository-title">
            <span className={css.eyebrow}>HIDDEN REPOSITORIES</span>
            <h2 id="restore-repository-title">恢复隐藏仓库</h2>
            <p>选择一个仓库恢复到 PR 助手。</p>
            <ol>{results.filter(result => hiddenRepositories.has(result.workspaceId)).map(result => (
              <li key={result.workspaceId}>
                <label>
                  <input type="radio" name="restore-repository" value={result.workspaceId} checked={restoreWorkspaceId === result.workspaceId} onChange={() => setRestoreWorkspaceId(result.workspaceId)} />
                  <span><strong>{result.repository ?? result.workspaceTitle}</strong><small>{result.workspaceTitle}</small></span>
                </label>
              </li>
            ))}</ol>
            <footer>
              <button type="button" onClick={() => setRestoreOpen(false)}>取消</button>
              <button type="button" disabled={!restoreWorkspaceId} onClick={() => restoreRepository(restoreWorkspaceId)}>恢复所选仓库</button>
            </footer>
          </section>
        </div>
      ) : null}
    </section>
  )
}

export const inject = ['slots', 'sessions', 'workspaces', 'remote', 'remote.session']

export function apply(ctx: Context): void {
  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register(
    { name: 'sidebar.footer.action', id: 'pr-assistant' },
    props => <SidebarAction {...props} openWorkbench={() => {
      if (disposeWorkbench) return
      const close = () => {
        const dispose = disposeWorkbench
        disposeWorkbench = null
        dispose?.()
      }
      disposeWorkbench = ctx.slots.inject('shell.overlay', () => ctx.slots.register(
        { name: 'shell.overlay', id: 'pr-assistant-panel' },
        () => <PrAssistantPanel ctx={ctx} close={close} />,
      ))
    }} />,
  ))
}
