import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-api-session-controller/client'
import type { WorkspaceView } from '@deepseek-ai/dsh-api-workspace-controller/client'
import type {} from '@deepseek-ai/dsh-api-workspace-controller/client'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import {
  Button, IconChevronDownOutline14, IconCloseOutline16, IconRefreshOutline16, Menu, Modal,
} from '@deepseek-ai/dsh-client-ui-primitives'
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import { SessionId } from '@deepseek-ai/dsh-session/types'
import css from './tomato-board.module.css'

interface TomatoItem {
  itemKey: string
  title: string
  status: string
  itemType: string
  workspace: string
  creator: string
  priority: string
}

interface TomatoTransition {
  transition: string
  targetStatus: string
  disabled: boolean
  disabledReason?: string
}

interface TomatoTransitionState {
  currentStatus: string
  transitions: TomatoTransition[]
}

interface BoardState {
  open: boolean
  loading: boolean
  items: TomatoItem[]
  error: string | null
  selectedItem: TomatoItem | null
}

let state: BoardState = { open: false, loading: false, items: [], error: null, selectedItem: null }
let disposeWorkbench: (() => void) | null = null
const listeners = new Set<() => void>()
const emit = (patch: Partial<BoardState>) => {
  state = { ...state, ...patch }
  for (const listener of listeners) listener()
}
const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
const snapshot = () => state

const TOMATO_TYPE_OPTIONS = ['测试缺陷', '缺陷', 'Bug', 'EnablerStory', 'Story', 'Task']
const TOMATO_STATUS_ORDER = [
  '新建', 'Bugfix', '修复中', '开发中', '待测试', '测试中', '测试通过', '已完成',
  '已取消', '延期解决', '测试完成', '待开发', '不修复', '已挂起',
]
const TOMATO_FILTER_BLACKLIST_KEY = 'taskboard.tomatoFilterBlacklist.v1'
const TOMATO_SESSION_LINKS_KEY = 'taskboard.tomatoSessionLinks.v1'

function readSessionLinks(): Record<string, string> {
  try {
    const value = JSON.parse(window.localStorage.getItem(TOMATO_SESSION_LINKS_KEY) ?? '{}')
    return value && typeof value === 'object' ? value as Record<string, string> : {}
  } catch {
    return {}
  }
}

function linkedSessionId(itemKey: string): SessionId | '' {
  const value = readSessionLinks()[itemKey]
  return typeof value === 'string' && value ? SessionId(value) : ''
}

function saveSessionLink(itemKey: string, sessionId: SessionId) {
  const links = readSessionLinks()
  links[itemKey] = sessionId
  window.localStorage.setItem(TOMATO_SESSION_LINKS_KEY, JSON.stringify(links))
}

function readFilterBlacklist(): { types: Set<string>; statuses: Set<string> } {
  try {
    const value = JSON.parse(window.localStorage.getItem(TOMATO_FILTER_BLACKLIST_KEY) ?? '{}')
    return {
      types: new Set(Array.isArray(value?.types) ? value.types.filter((item: unknown): item is string => typeof item === 'string') : []),
      statuses: new Set(Array.isArray(value?.statuses) ? value.statuses.filter((item: unknown): item is string => typeof item === 'string') : []),
    }
  } catch {
    return { types: new Set(), statuses: new Set() }
  }
}

async function refresh() {
  emit({ loading: true, error: null })
  try {
    const response = await fetch('/api/tomato-board/items', { headers: { accept: 'application/json' } })
    const body = await response.json() as { items?: TomatoItem[]; error?: string }
    if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`)
    emit({ items: body.items ?? [] })
  } catch (error) {
    emit({ error: error instanceof Error ? error.message : '番茄事项读取失败' })
  } finally {
    emit({ loading: false })
  }
}

function closeWorkbench() {
  const dispose = disposeWorkbench
  disposeWorkbench = null
  emit({ open: false, selectedItem: null })
  dispose?.()
}

function TomatoBoardAction({ wide, openWorkbench }: { wide: boolean; openWorkbench: () => void }) {
  return (
    <button className={css.sidebarAction} type="button" title="番茄工作台" onClick={openWorkbench}>
      <span className={css.tomatoIcon} aria-hidden="true">T</span>
      {wide && <span>番茄工作台</span>}
    </button>
  )
}

function CreateConversationDialog({ ctx, item }: { ctx: Context; item: TomatoItem }) {
  const [workspaceId, setWorkspaceId] = useState('')
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const workspaces = useSyncExternalStore(
    listener => ctx.workspaces.list.subscribe(listener),
    () => ctx.workspaces.list.getSnapshot(),
    () => ctx.workspaces.list.getSnapshot(),
  )
  const selectedWorkspace = workspaces.items.find(workspace => workspace.workspaceId === workspaceId)

  async function createConversation() {
    if (!selectedWorkspace || creating) return
    setCreating(true)
    setError(null)
    try {
      const createdSessionId = await ctx.sessions.create({ workspaceId: selectedWorkspace.workspaceId })
      const session = ctx.sessions.binding(createdSessionId)?.session
      if (!session) throw new Error('新建对话未能在 Harness 中加载')
      const title = `[${item.itemKey}] ${item.title}`
      const renamed = await session.rename(title)
      if (!renamed.ok) throw new Error(`对话标题设置失败：${renamed.error.message}`)
      const prompt = [
        `请处理番茄事项 ${item.itemKey}。`,
        `标题：${item.title}`,
        `类型：${item.itemType || '未设置'}`,
        `状态：${item.status || '未设置'}`,
        `优先级：${item.priority || '未设置'}`,
      ].join('\n')
      const prompted = await session.prompt([{ type: 'text', text: prompt }], 'queue')
      if (!prompted.ok) throw new Error(`事项上下文写入失败：${prompted.error.message}`)
      saveSessionLink(item.itemKey, createdSessionId)
      ctx.sessions.open(createdSessionId)
      closeWorkbench()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Harness 对话创建失败')
    } finally {
      setCreating(false)
    }
  }

  return (
    <Modal
      open
      onClose={() => emit({ selectedItem: null })}
      title="选择处理该事项的仓库"
      closeLabel="关闭"
      description={item.title}
      className={css.createDialog!}
      footer={(
        <>
          <Button variant="ghost" onClick={() => emit({ selectedItem: null })}>取消</Button>
          <Button variant="primary" disabled={!selectedWorkspace || creating} onClick={() => void createConversation()}>
            {creating ? '正在创建…' : '创建并进入对话'}
          </Button>
        </>
      )}
    >
      <div className={css.dialogBody}>
        <span>{item.itemKey}</span>
        {error ? <div className={css.error} role="alert">{error}</div> : null}
        <Menu
          open={workspaceMenuOpen}
          portal
          items={workspaces.items.map((workspace: WorkspaceView) => ({
            id: workspace.workspaceId,
            label: workspace.title,
          }))}
          selectedId={workspaceId || undefined}
          onSelect={id => {
            setWorkspaceId(id)
            setWorkspaceMenuOpen(false)
          }}
          onClose={() => setWorkspaceMenuOpen(false)}
          anchor={(
            <Button
              className={css.workspaceTrigger}
              variant="outline"
              aria-haspopup="menu"
              aria-expanded={workspaceMenuOpen}
              onClick={() => setWorkspaceMenuOpen(open => !open)}
            >
              <span>{selectedWorkspace?.title ?? '选择 Harness 项目…'}</span>
              <span aria-hidden="true">⌄</span>
            </Button>
          )}
        />
        {selectedWorkspace ? <code>{selectedWorkspace.path}</code> : null}
      </div>
    </Modal>
  )
}

function TomatoBoardPanel({ ctx }: { ctx: Context }) {
  const board = useSyncExternalStore(subscribe, snapshot, snapshot)
  const workbenchRef = useRef<HTMLElement>(null)
  const [search, setSearch] = useState('')
  const [blacklist, setBlacklist] = useState(readFilterBlacklist)
  const sessions = useSyncExternalStore(
    listener => ctx.sessions.list.subscribe(listener),
    () => ctx.sessions.list.getSnapshot(),
    () => ctx.sessions.list.getSnapshot(),
  )

  useEffect(() => {
    if (board.open && board.items.length === 0 && !board.loading && !board.error) void refresh()
  }, [board.error, board.items.length, board.loading, board.open])
  useEffect(() => {
    if (!board.open) return
    const closeOnOutsideNavigation = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return
      if (workbenchRef.current?.contains(event.target)) return
      if (event.target.closest('[role="dialog"], [role="menu"]')) return
      closeWorkbench()
    }
    document.addEventListener('pointerdown', closeOnOutsideNavigation, true)
    return () => document.removeEventListener('pointerdown', closeOnOutsideNavigation, true)
  }, [board.open])
  if (!board.open) return null

  function openItem(item: TomatoItem) {
    const stored = linkedSessionId(item.itemKey)
    const titlePrefix = `[${item.itemKey}]`
    const discovered = sessions.ids.find(id => {
      const summary = sessions.byId[id]
      return summary?.title?.startsWith(titlePrefix) || summary?.displayTitle.startsWith(titlePrefix)
    })
    const associated = stored && sessions.byId[stored] ? stored : discovered
    if (associated) {
      saveSessionLink(item.itemKey, associated)
      ctx.sessions.open(associated)
      closeWorkbench()
      return
    }
    emit({ selectedItem: item })
  }

  const normalizedSearch = search.trim().toLowerCase()
  const filteredItems = board.items.filter(item => (
    !blacklist.types.has(item.itemType)
    && !blacklist.statuses.has(item.status)
    && (!normalizedSearch || [
      item.itemKey, item.title, item.itemType, item.status, item.workspace, item.creator, item.priority,
    ].join(' ').toLowerCase().includes(normalizedSearch))
  ))
  const typeOptions = [...new Set([...TOMATO_TYPE_OPTIONS, ...board.items.map(item => item.itemType).filter(Boolean)])]
  const statusOptions = [...new Set([
    ...TOMATO_STATUS_ORDER,
    ...board.items.map(item => item.status).filter(status => !TOMATO_STATUS_ORDER.includes(status)),
  ])]
  const statuses = [...new Set([
    ...TOMATO_STATUS_ORDER.filter(status => filteredItems.some(item => item.status === status)),
    ...filteredItems.map(item => item.status).filter(status => !TOMATO_STATUS_ORDER.includes(status)),
  ])]

  const toggleBlacklist = (kind: 'types' | 'statuses', value: string) => setBlacklist(current => {
    const nextValues = new Set(current[kind])
    if (nextValues.has(value)) nextValues.delete(value)
    else nextValues.add(value)
    const next = { ...current, [kind]: nextValues }
    window.localStorage.setItem(TOMATO_FILTER_BLACKLIST_KEY, JSON.stringify({
      types: [...next.types],
      statuses: [...next.statuses],
    }))
    return next
  })

  return (
    <section ref={workbenchRef} className={css.workbench} aria-label="番茄工作台">
      <header className={css.header}>
        <div>
          <h1>番茄工作台</h1>
          <p>{board.loading ? '正在读取番茄事项…' : `显示 ${filteredItems.length} / ${board.items.length} 个事项`}</p>
        </div>
        <div className={css.actions}>
          <label className={css.searchField}>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="搜索标题或 tag…"
              aria-label="搜索标题或 tag"
            />
            {search && <button type="button" aria-label="清空搜索词" onClick={() => setSearch('')}>×</button>}
          </label>
          <details className={css.filterMenu}>
            <summary aria-label="类型和状态筛选" title="类型和状态筛选">
              <span aria-hidden="true">▽</span>
              {(blacklist.types.size > 0 || blacklist.statuses.size > 0) && <i />}
            </summary>
            <div className={css.filterPopover}>
              <FilterRow label="类型" options={typeOptions} hidden={blacklist.types} onToggle={value => toggleBlacklist('types', value)} />
              <FilterRow label="状态" options={statusOptions} hidden={blacklist.statuses} onToggle={value => toggleBlacklist('statuses', value)} />
            </div>
          </details>
          <Button
            variant="toolbar"
            size="sm"
            className={css.headerIconButton}
            icon={<IconRefreshOutline16 />}
            title="刷新番茄事项"
            aria-label="刷新番茄事项"
            disabled={board.loading}
            onClick={() => void refresh()}
          />
          <Button
            variant="toolbar"
            size="sm"
            className={css.headerIconButton}
            icon={<IconCloseOutline16 />}
            title="关闭番茄工作台"
            aria-label="关闭番茄工作台"
            onClick={closeWorkbench}
          />
        </div>
      </header>
      {board.error && <div className={css.error} role="alert">{board.error}</div>}
      <div className={css.board}>
        {statuses.map(status => {
          const items = filteredItems.filter(item => item.status === status)
          return (
            <section className={css.lane} key={status} aria-labelledby={`tomato-lane-${status}`}>
              <header className={css.laneHeader}>
                <h2 id={`tomato-lane-${status}`}>{status}</h2>
                <span>{items.length}</span>
              </header>
              <div className={css.cards}>
                {items.map(item => (
                  <article
                    className={css.card}
                    key={item.itemKey}
                    tabIndex={0}
                    role="button"
                    onClick={() => openItem(item)}
                    onKeyDown={event => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        openItem(item)
                      }
                    }}
                  >
                    <div className={css.cardTopline}>
                      <span className={css.key}>{item.itemKey}</span>
                      <Button
                        className={css.tomatoLink}
                        variant="ghost"
                        size="sm"
                        title="在番茄中打开事项"
                        aria-label={`在番茄中打开 ${item.itemKey}`}
                        onClick={event => {
                          event.stopPropagation()
                          window.open(`/api/tomato-board/open/${encodeURIComponent(item.itemKey)}`, '_blank', 'noopener,noreferrer')
                        }}
                        onKeyDown={event => event.stopPropagation()}
                      >
                        ↗
                      </Button>
                    </div>
                    <strong>{item.title}</strong>
                    <span className={css.meta}>{[item.itemType, item.priority, item.creator].filter(Boolean).join(' · ')}</span>
                  </article>
                ))}
              </div>
            </section>
          )
        })}
        {!board.loading && !board.error && statuses.length === 0 && (
          <div className={css.empty}>当前没有可显示的番茄事项</div>
        )}
      </div>
      {board.selectedItem ? <CreateConversationDialog ctx={ctx} item={board.selectedItem} /> : null}
    </section>
  )
}

function FilterRow({ label, options, hidden, onToggle }: {
  label: string
  options: string[]
  hidden: ReadonlySet<string>
  onToggle: (value: string) => void
}) {
  return (
    <div className={css.filterRow}>
      <span>{label}</span>
      <div>
        {options.map(option => (
          <button
            key={option}
            className={hidden.has(option) ? '' : css.selectedFilter}
            type="button"
            aria-pressed={!hidden.has(option)}
            onClick={() => onToggle(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function TomatoConversationShortcut({ ctx, sessionId, useSessions }: PropsRuntime<'conversation.session.header.actions'> & { ctx: Context }) {
  const itemKey = useSessions(state => {
    const summary = state.byId[sessionId]
    const title = summary?.title ?? summary?.displayTitle ?? ''
    return /^\[([^\]]+)\]/u.exec(title)?.[1]?.trim() ?? ''
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [transitionState, setTransitionState] = useState<TomatoTransitionState>({
    currentStatus: '',
    transitions: [],
  })
  const [transitionError, setTransitionError] = useState<string | null>(null)

  useEffect(() => {
    if (!itemKey) return
    const controller = new AbortController()
    setLoading(true)
    setTransitionError(null)
    setTransitionState({ currentStatus: '', transitions: [] })
    void fetch(`/api/tomato-board/transitions/${encodeURIComponent(itemKey)}`, {
      headers: { accept: 'application/json' },
      signal: controller.signal,
    }).then(async response => {
      const body = await response.json() as TomatoTransitionState & { error?: string }
      if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`)
      setTransitionState({
        currentStatus: body.currentStatus || '',
        transitions: body.transitions ?? [],
      })
    }).catch(error => {
      if (error instanceof Error && error.name === 'AbortError') return
      setTransitionError(error instanceof Error ? error.message : '番茄流转状态读取失败')
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false)
    })
    return () => controller.abort()
  }, [itemKey])

  if (!itemKey) return null

  async function transitionTo(transitionName: string) {
    if (transitioning) return
    setMenuOpen(false)
    setTransitioning(true)
    setTransitionError(null)
    try {
      const query = new URLSearchParams({ transition: transitionName })
      const response = await fetch(`/api/tomato-board/transition/${encodeURIComponent(itemKey)}?${query}`, {
        method: 'POST',
        headers: { accept: 'application/json' },
      })
      const body = await response.json() as {
        currentStatus?: string
        error?: string
        details?: { stderr?: string; stdout?: string }
      }
      if (!response.ok) {
        const selected = transitionState.transitions.find(transition => transition.transition === transitionName)
        const failure = [body.error, body.details?.stderr, body.details?.stdout].filter(Boolean).join('\n')
        const requiredFieldsMissing = /字段.{0,24}必填|必填.{0,24}字段|流转前需填写/u.test(failure)
        if (selected?.targetStatus === '待测试' && requiredFieldsMissing) {
          const session = ctx.sessions.binding(sessionId)?.session
          if (!session) throw new Error('当前 Harness 对话未加载，无法交给 AI 继续处理')
          const prompt = [
            `番茄事项 ${itemKey} 流转到「待测试」失败，CLI 提示存在必填字段缺失。`,
            '请先读取番茄事项详情，并结合当前对话和仓库代码进行分析。',
            '基于证据补齐并回读确认以下字段：根因分析、RD引入原因分析、原因描述、修复版本、解决方案。',
            '不要编造业务事实；证据不足时先向我确认。',
            '只有这些字段已经持久化且回读一致后，才能重新执行「修复完成」流转到「待测试」，最后再次回读状态验证。',
            `CLI 失败信息：${failure || '未返回具体原因'}`,
          ].join('\n')
          const prompted = await session.prompt([{ type: 'text', text: prompt }], 'queue')
          if (!prompted.ok) throw new Error(`无法把流转任务交给 AI：${prompted.error.message}`)
          setTransitionError('必填字段缺失，已交给当前对话中的 AI 分析并继续处理')
          return
        }
        throw new Error(failure || `请求失败 (${response.status})`)
      }
      const transitionsResponse = await fetch(`/api/tomato-board/transitions/${encodeURIComponent(itemKey)}`, {
        headers: { accept: 'application/json' },
      })
      const transitionsBody = await transitionsResponse.json() as TomatoTransitionState & { error?: string }
      if (!transitionsResponse.ok) {
        throw new Error(transitionsBody.error || `状态刷新失败 (${transitionsResponse.status})`)
      }
      setTransitionState({
        currentStatus: transitionsBody.currentStatus || body.currentStatus || '',
        transitions: transitionsBody.transitions ?? [],
      })
    } catch (error) {
      setTransitionError(error instanceof Error ? error.message : '番茄事项流转失败')
    } finally {
      setTransitioning(false)
    }
  }

  const availableTransitions = transitionState.transitions.filter(transition => !transition.disabled)
  const delegatedToAgent = transitionError?.startsWith('必填字段缺失') === true
  const transitionTitle = transitionError
    ? delegatedToAgent ? transitionError : `番茄流转失败：${transitionError}`
    : loading
      ? '正在查询番茄事项状态'
      : availableTransitions.length === 0
        ? `当前状态「${transitionState.currentStatus || '未知'}」没有可用流转`
        : `当前状态：${transitionState.currentStatus || '未知'}`
  return (
    <>
      <Menu
        open={menuOpen}
        portal
        align="end"
        items={transitionState.transitions.map(transition => ({
          id: transition.transition,
          label: `流转到 ${transition.targetStatus}`,
          disabled: transition.disabled,
        }))}
        onSelect={transitionName => void transitionTo(transitionName)}
        onClose={() => setMenuOpen(false)}
        anchor={(
          <Button
            variant="toolbar"
            size="sm"
            className={css.transitionTrigger}
            title={transitionTitle}
            aria-label={transitionTitle}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            disabled={loading || transitioning || availableTransitions.length === 0}
            onClick={() => setMenuOpen(open => !open)}
          >
            {transitioning || delegatedToAgent || transitionError
              ? transitioning ? '正在流转…' : delegatedToAgent ? 'AI 已接手' : '流转失败'
              : (
                <>
                  <span className={css.transitionCaption}>状态</span>
                  <strong>{transitionState.currentStatus || '查询中…'}</strong>
                  {availableTransitions.length > 0 ? (
                    <>
                      <span className={css.transitionDivider} aria-hidden="true" />
                      <span className={css.transitionAction}>流转</span>
                      <IconChevronDownOutline14 className={css.transitionChevron} />
                    </>
                  ) : null}
                </>
              )}
          </Button>
        )}
      />
      <Button
        variant="toolbar"
        size="sm"
        title="在番茄中打开事项"
        aria-label={`在番茄中打开 ${itemKey}`}
        onClick={() => window.open(`/api/tomato-board/open/${encodeURIComponent(itemKey)}`, '_blank', 'noopener,noreferrer')}
      >
        番茄 ↗
      </Button>
    </>
  )
}

export const inject = ['slots', 'sessions', 'workspaces']

export function apply(ctx: Context): void {
  ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register(
    { name: 'conversation.session.header.actions', id: 'tomato-shortcut', order: 12 },
    props => <TomatoConversationShortcut {...props} ctx={ctx} />,
  ))
  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register(
    { name: 'sidebar.footer.action', id: 'tomato-board' },
    props => <TomatoBoardAction {...props} openWorkbench={() => {
      if (disposeWorkbench) return
      emit({ open: true })
      disposeWorkbench = ctx.slots.register(
        { name: 'conversation', priority: -100 },
        () => <TomatoBoardPanel ctx={ctx} />,
      )
    }} />,
  ))
}
