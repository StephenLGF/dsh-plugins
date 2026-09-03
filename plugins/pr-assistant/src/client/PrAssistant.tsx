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
  hasConflict: boolean
  mergeStatus: string
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

const EMPTY_REVIEW_EVENTS = { entries: [], hasMore: false, revision: 0, change: { kind: 'replace' as const, entries: [] } }

let disposeWorkbench: (() => void) | null = null
const HIDDEN_REPOSITORIES_KEY = 'prAssistant.hiddenRepositories.v1'
const REVIEW_SESSION_LINKS_KEY = 'prAssistant.reviewSessionLinks.v1'
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

function removeReviewSession(repository: RepositoryResult, pullRequest: PullRequest) {
  const links = readReviewSessionLinks()
  delete links[reviewLinkKey(repository, pullRequest)]
  window.localStorage.setItem(REVIEW_SESSION_LINKS_KEY, JSON.stringify(links))
}

function findReviewSession(ctx: Context, repository: RepositoryResult, pullRequest: PullRequest): HarnessSessionId | null {
  const linked = linkedReviewSession(repository, pullRequest)
  if (linked && ctx.sessions.binding(linked)) return linked
  const expectedTitle = `[PR #${pullRequest.number}] ${pullRequest.title}`
  const snapshot = ctx.sessions.list.getSnapshot()
  return snapshot.ids.find(id => {
    const summary = snapshot.byId[id]
    return summary?.title === expectedTitle && summary.cwd === repository.localPath
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
      const platformCommand = repository.provider === 'gitee'
        ? `使用只读命令 gitee code pr view ${pullRequest.number} 和 gitee code pr diff ${pullRequest.number} 获取完整证据。`
        : `使用 GitHub API 或当前可用的 GitHub 工具读取 PR #${pullRequest.number} 的完整提交与 diff。`
      const prompt = [
        `请对当前仓库的 PR #${pullRequest.number} 做一次严格的代码评审。`,
        `标题：${detail.title}`,
        `分支：${detail.sourceBranch} → ${detail.targetBranch}`,
        `当前摘要：${detail.changedFiles} 个文件，+${detail.additions}/-${detail.deletions}，${detail.hasConflict ? '存在合并风险' : '未检测到冲突'}。`,
        platformCommand,
        '重点检查正确性、回归风险、安全性、并发/状态一致性、边界条件、性能和缺失测试。',
        '只报告可以用代码证据证明的问题；每条问题标注严重级别、文件路径、紧凑行号范围、触发场景和修复建议。',
        '回复必须简明且仅保留必要信息：不要复述 PR 背景、检查过程或给出泛化建议；每个问题最多一个短段落。',
        '如果没有发现问题，只回复“未发现明确问题”，必要时再用一行列出关键未验证风险。',
        '本次只做只读评审；不要修改代码、提交分支、合并 PR 或向代码平台发表评论，除非我之后明确授权。',
      ].join('\n')
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
  const workspaces = useSyncExternalStore(
    listener => ctx.workspaces.list.subscribe(listener),
    () => ctx.workspaces.list.getSnapshot(),
    () => ctx.workspaces.list.getSnapshot(),
  )

  async function refresh() {
    setLoading(true)
    const next = await Promise.all(workspaces.items.map(inspectWorkspace))
    setResults(next)
    setLoading(false)
  }

  useEffect(() => { void refresh() }, [workspaces.items])
  useEffect(() => {
    if (!selection) return
    const controller = new AbortController()
    const query = new URLSearchParams({ path: selection.repository.localPath, number: String(selection.pullRequest.number) })
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

  function openAiReview() {
    if (!selection) return
    if (reviewResult) {
      setReviewOpen(true)
      return
    }
    const sessionId = findReviewSession(ctx, selection.repository, selection.pullRequest)
    if (sessionId) {
      saveReviewSession(selection.repository, selection.pullRequest, sessionId)
      ctx.sessions.open(sessionId)
      close()
      return
    }
    removeReviewSession(selection.repository, selection.pullRequest)
    setReviewOpen(true)
  }

  const linkedSessionId = selection ? findReviewSession(ctx, selection.repository, selection.pullRequest) : null
  const hasLinkedReview = linkedSessionId !== null
  const reviewResult = useReviewResult(ctx, linkedSessionId)

  return (
    <section ref={panelRef} className={css.workbench} aria-label="PR 助手">
      <header className={css.header}>
        <div>
          <span className={css.eyebrow}>REVIEW RADAR</span>
          <div className={css.titleRow}>
            {selection ? <button className={css.titleBack} type="button" aria-label="返回 PR 列表" title="返回 PR 列表" onClick={() => setSelection(null)}>←</button> : null}
            <h1>{selection ? `#${selection.pullRequest.number} PR 详情` : 'PR 助手'}</h1>
          </div>
          <p>{selection ? selection.repository.repository : `${healthy} 个代码仓库 · ${total} 个待处理 PR`}</p>
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
            <>
              <section className={css.detailHero}>
                <div>
                  <span>{detail.author} · {relativeTime(detail.updatedAt)}</span>
                  <h2>{detail.title}</h2>
                  <code>{detail.sourceBranch} → {detail.targetBranch}</code>
                </div>
                <div className={css.detailActions}>
                  <button className={css.reviewButton} type="button" onClick={openAiReview}>{reviewResult ? '重新分析' : hasLinkedReview ? '查看 AI 分析' : 'AI 评审'}</button>
                  <button type="button" onClick={() => window.open(detail.url, '_blank', 'noopener,noreferrer')}>打开 PR ↗</button>
                </div>
              </section>
              <section className={css.detailStats}>
                <div><strong>{detail.commitCount ?? '—'}</strong><span>{detail.commitCount === null ? '提交数暂不可用' : '提交'}</span></div>
                <div><strong>{detail.changedFiles}</strong><span>变更文件</span></div>
                <div><strong className={css.addition}>+{detail.additions}</strong><span>新增行</span></div>
                <div><strong className={css.deletion}>−{detail.deletions}</strong><span>删除行</span></div>
                <div><strong className={detail.hasConflict ? css.conflict : css.clean}>{detail.hasConflict ? '有风险' : '无冲突'}</strong><span>合并状态</span></div>
              </section>
              {detail.description ? <section className={css.description}><h3>说明</h3><p>{detail.description}</p></section> : null}
              {reviewResult ? (
                <section className={css.reviewResult}>
                  <header>
                    <div><span className={css.eyebrow}>AI REVIEW</span><h3>AI 分析结果</h3></div>
                    <button type="button" onClick={() => { if (linkedSessionId) { ctx.sessions.open(linkedSessionId); close() } }}>打开评审对话 ↗</button>
                  </header>
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
          ) : null}
        </main>
      ) : (<>
        <div className={css.summary}>
          <div><strong>{total}</strong><span>Open PR</span></div>
          <div><strong>{visibleResults.filter(item => item.openCount > 0).length}</strong><span>等待审查的仓库</span></div>
          <div><strong>{visibleResults.filter(item => item.error).length}</strong><span>需要配置</span></div>
        </div>
        <main className={css.grid}>
        {filtered.map(result => (
          <article className={css.repo} key={result.workspaceId}>
            <div className={css.repoHeader}>
              <div>
                <span className={css.provider}>{result.provider ?? 'GIT'}</span>
                <h2>{result.repository ?? result.workspaceTitle}</h2>
                <p>{result.workspaceTitle}</p>
              </div>
              <div className={css.repoTools}>
                <button className={css.hideRepo} type="button" onClick={() => hideRepository(result.workspaceId)}>隐藏</button>
                <span className={result.openCount ? css.countActive : css.count}>{result.openCount}</span>
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
      </>)}</div>
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
      disposeWorkbench = ctx.slots.register(
        { name: 'conversation', priority: -100 },
        () => <PrAssistantPanel ctx={ctx} close={close} />,
      )
    }} />,
  ))
}
