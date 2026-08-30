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
  Button, IconCloseOutline16, IconRefreshOutline16, Menu, Modal,
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

function TomatoConversationShortcut({ sessionId, useSessions }: PropsRuntime<'conversation.session.header.actions'>) {
  const itemKey = useSessions(state => {
    const summary = state.byId[sessionId]
    const title = summary?.title ?? summary?.displayTitle ?? ''
    return /^\[([^\]]+)\]/u.exec(title)?.[1]?.trim() ?? ''
  })
  if (!itemKey) return null
  return (
    <Button
      variant="toolbar"
      size="sm"
      title="在番茄中打开事项"
      aria-label={`在番茄中打开 ${itemKey}`}
      onClick={() => window.open(`/api/tomato-board/open/${encodeURIComponent(itemKey)}`, '_blank', 'noopener,noreferrer')}
    >
      番茄 ↗
    </Button>
  )
}

export const inject = ['slots', 'sessions', 'workspaces']

export function apply(ctx: Context): void {
  ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register(
    { name: 'conversation.session.header.actions', id: 'tomato-shortcut', order: 12 },
    TomatoConversationShortcut,
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
