import { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
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
import { StoryPoints } from './StoryPoints'

export interface TomatoItem {
  itemKey: string
  title: string
  status: string
  itemType: string
  workspace: string
  workspaceKey: string
  workspaceName: string
  creator: string
  assignees: string[]
  priority: string
  tomatoUrl: string
}

interface FilterDirectory {
  users: Array<{ username: string; name: string }>
  workspaces: Array<{ key: string; name: string }>
}

interface LaneOrder {
  head: string | null
  next: Record<string, string | null>
}

interface TomatoTransition {
  transition: string
  targetStatus: string
  disabled: boolean
  disabledReason?: string
}

interface TomatoTransitionState {
  currentStatus: string
  tomatoUrl: string
  transitions: TomatoTransition[]
}

interface BoardState {
  open: boolean
  loading: boolean
  items: TomatoItem[]
  error: string | null
  selectedItem: TomatoItem | null
  truncated: boolean
}

let state: BoardState = { open: false, loading: false, items: [], error: null, selectedItem: null, truncated: false }
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

// 真实番茄事项 itemKey 形如 `Gitee-Test-2026-737`、`Proxima-1116`：字母前缀（可含连字符分段）+ 数字结尾。
// 只匹配该格式可避免把任意 `[xxx]` 开头的普通对话标题（如 `[分析]`、`[每日复盘]`）误判为番茄事项，
// 进而错误地在对话头上渲染出状态流转按钮并触发无意义的 CLI 调用。
const TOMATO_ITEM_KEY_PATTERN = /^\[([A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-\d+)\]/u

const TOMATO_STATUS_ORDER = [
  '新建', 'Bugfix', '修复中', '开发中', '待测试', '测试中', '测试通过', '已完成',
  '已取消', '延期解决', '测试完成', '待开发', '不修复', '已挂起',
]
const TOMATO_FILTER_BLACKLIST_KEY = 'taskboard.tomatoFilterBlacklist.v1'
const TOMATO_SESSION_LINKS_KEY = 'taskboard.tomatoSessionLinks.v1'
const TOMATO_MUTED_ITEMS_KEY = 'taskboard.tomatoMutedItems.v1'
const TOMATO_LANE_ORDER_KEY = 'taskboard.tomatoLaneOrder.v1'

function readLaneOrder(): LaneOrder {
  try {
    const value = JSON.parse(window.localStorage.getItem(TOMATO_LANE_ORDER_KEY) ?? '{}')
    return {
      head: typeof value?.head === 'string' ? value.head : null,
      next: value?.next && typeof value.next === 'object' ? value.next as Record<string, string | null> : {},
    }
  } catch {
    return { head: null, next: {} }
  }
}

function laneOrderValues(order: LaneOrder): string[] {
  const values: string[] = []
  const seen = new Set<string>()
  let current = order.head
  while (current && !seen.has(current) && values.length < 1000) {
    values.push(current)
    seen.add(current)
    current = order.next[current] ?? null
  }
  return values
}

function createLaneOrder(values: string[]): LaneOrder {
  const next: Record<string, string | null> = {}
  values.forEach((value, index) => { next[value] = values[index + 1] ?? null })
  return { head: values[0] ?? null, next }
}

function applyLaneOrder(statuses: string[], order: LaneOrder): string[] {
  const available = new Set(statuses)
  const tracked = laneOrderValues(order).filter(status => available.has(status))
  const trackedSet = new Set(tracked)
  return [...tracked, ...statuses.filter(status => !trackedSet.has(status))]
}

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

function readFilterBlacklist(): { types: Set<string>; statuses: Set<string>; workspaces: Set<string> } {
  try {
    const value = JSON.parse(window.localStorage.getItem(TOMATO_FILTER_BLACKLIST_KEY) ?? '{}')
    return {
      types: new Set(Array.isArray(value?.types) ? value.types.filter((item: unknown): item is string => typeof item === 'string') : []),
      statuses: new Set(Array.isArray(value?.statuses) ? value.statuses.filter((item: unknown): item is string => typeof item === 'string') : []),
      workspaces: new Set(Array.isArray(value?.workspaces) ? value.workspaces.filter((item: unknown): item is string => typeof item === 'string') : []),
    }
  } catch {
    return { types: new Set(), statuses: new Set(), workspaces: new Set() }
  }
}

function readMutedItems(): Set<string> {
  try {
    const value = JSON.parse(window.localStorage.getItem(TOMATO_MUTED_ITEMS_KEY) ?? '[]')
    return new Set(Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [])
  } catch {
    return new Set()
  }
}

async function refresh(assignee = 'currentUser()') {
  emit({ loading: true, error: null })
  try {
    const query = new URLSearchParams({ assignee })
    const response = await fetch(`/api/tomato-board/items?${query}`, { headers: { accept: 'application/json' } })
    const body = await response.json() as { items?: TomatoItem[]; truncated?: boolean; error?: string }
    if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`)
    emit({ items: body.items ?? [], truncated: body.truncated === true })
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

function TomatoBoardTopbarAction({ openWorkbench }: { openWorkbench: () => void }) {
  return (
    <button className={css.topbarAction} type="button" title="打开番茄工作台" onClick={openWorkbench}>
      <span className={css.tomatoIcon} aria-hidden="true">T</span>
      <span>番茄工作台</span>
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
  const filterMenuRef = useRef<HTMLDetailsElement>(null)
  const [page, setPage] = useState<'board' | 'points'>('board')
  const [storyToolbar, setStoryToolbar] = useState<React.ReactNode>(null)
  const [search, setSearch] = useState('')
  const [blacklist, setBlacklist] = useState(readFilterBlacklist)
  const [mutedItems, setMutedItems] = useState(readMutedItems)
  const [selectedAssignee, setSelectedAssignee] = useState('currentUser()')
  const [filterDirectory, setFilterDirectory] = useState<FilterDirectory>({ users: [], workspaces: [] })
  const [laneOrder, setLaneOrder] = useState(readLaneOrder)
  const [draggedLane, setDraggedLane] = useState<string | null>(null)
  const [dropLane, setDropLane] = useState<{ status: string; after: boolean } | null>(null)
  const laneElements = useRef(new Map<string, HTMLElement>())
  const previousLanePositions = useRef(new Map<string, DOMRect>())
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
    void fetch('/api/tomato-board/filters', { headers: { accept: 'application/json' } })
      .then(response => response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`)))
      .then(value => setFilterDirectory(value as FilterDirectory))
      .catch(() => {})
  }, [board.open])
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
  useEffect(() => {
    const closeFilterMenu = (event: PointerEvent) => {
      const menu = filterMenuRef.current
      if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) menu.open = false
    }
    const closeFilterMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && filterMenuRef.current?.open) filterMenuRef.current.open = false
    }
    document.addEventListener('pointerdown', closeFilterMenu, true)
    document.addEventListener('keydown', closeFilterMenuOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeFilterMenu, true)
      document.removeEventListener('keydown', closeFilterMenuOnEscape)
    }
  }, [])
  useLayoutEffect(() => {
    const previous = previousLanePositions.current
    if (previous.size === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      previous.clear()
      return
    }
    for (const [status, element] of laneElements.current) {
      const before = previous.get(status)
      if (!before) continue
      const after = element.getBoundingClientRect()
      const deltaX = before.left - after.left
      const deltaY = before.top - after.top
      if (deltaX || deltaY) {
        element.animate(
          [{ transform: `translate(${deltaX}px, ${deltaY}px)` }, { transform: 'translate(0, 0)' }],
          { duration: 240, easing: 'cubic-bezier(.2,.8,.2,1)' },
        )
      }
    }
    previous.clear()
  }, [laneOrder])
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
    && !blacklist.workspaces.has(item.workspaceKey || item.workspaceName || item.workspace)
    && (!normalizedSearch || [
      item.itemKey, item.title, item.itemType, item.status, item.workspaceKey, item.workspaceName, item.creator, item.assignees.join(' '), item.priority,
    ].join(' ').toLowerCase().includes(normalizedSearch))
  ))
  const typeOptions = [...new Set(board.items.map(item => item.itemType).filter(Boolean))].sort((left, right) => left.localeCompare(right))
  const statusOptions = applyLaneOrder([...new Set([
    ...TOMATO_STATUS_ORDER,
    ...board.items.map(item => item.status).filter(status => !TOMATO_STATUS_ORDER.includes(status)),
  ])], laneOrder)
  const workspaceOptions = [...new Map([
    ...filterDirectory.workspaces.map(workspace => [workspace.key || workspace.name, workspace.name && workspace.key && workspace.name !== workspace.key ? `${workspace.name} (${workspace.key})` : workspace.key || workspace.name] as const),
    ...board.items.map(item => [item.workspaceKey || item.workspaceName || item.workspace, item.workspaceName && item.workspaceKey && item.workspaceName !== item.workspaceKey ? `${item.workspaceName} (${item.workspaceKey})` : item.workspaceKey || item.workspaceName] as const),
  ].filter(([value]) => Boolean(value))).entries()].map(([value, label]) => ({ value, label }))
  const defaultStatuses = [...new Set([
    ...TOMATO_STATUS_ORDER.filter(status => filteredItems.some(item => item.status === status)),
    ...filteredItems.map(item => item.status).filter(status => !TOMATO_STATUS_ORDER.includes(status)),
  ])]
  const statuses = applyLaneOrder(defaultStatuses, laneOrder)

  const toggleBlacklist = (kind: 'types' | 'statuses' | 'workspaces', value: string) => setBlacklist(current => {
    const nextValues = new Set(current[kind])
    if (nextValues.has(value)) nextValues.delete(value)
    else nextValues.add(value)
    const next = { ...current, [kind]: nextValues }
    window.localStorage.setItem(TOMATO_FILTER_BLACKLIST_KEY, JSON.stringify({
      types: [...next.types],
      statuses: [...next.statuses],
      workspaces: [...next.workspaces],
    }))
    return next
  })

  const toggleMutedItem = (itemKey: string) => setMutedItems(current => {
    const next = new Set(current)
    if (next.has(itemKey)) next.delete(itemKey)
    else next.add(itemKey)
    window.localStorage.setItem(TOMATO_MUTED_ITEMS_KEY, JSON.stringify([...next]))
    return next
  })

  const moveLane = (dragged: string, target: string, after: boolean) => {
    if (dragged === target) return
    previousLanePositions.current = new Map([...laneElements.current].map(([status, element]) => [status, element.getBoundingClientRect()]))
    setLaneOrder(current => {
      const visible = applyLaneOrder(defaultStatuses, current).filter(status => status !== dragged)
      const targetIndex = visible.indexOf(target)
      visible.splice(targetIndex + (after ? 1 : 0), 0, dragged)
      const previousTracked = laneOrderValues(current)
      const trackedSet = new Set([...previousTracked, dragged, target])
      const hiddenTracked = previousTracked.filter(status => !visible.includes(status))
      const next = createLaneOrder([...visible.filter(status => trackedSet.has(status)), ...hiddenTracked])
      window.localStorage.setItem(TOMATO_LANE_ORDER_KEY, JSON.stringify(next))
      return next
    })
  }

  return (
    <section ref={workbenchRef} className={css.workbench} aria-label="番茄工作台">
      <header className={css.header}>
        <div className={css.titleRow}>
          <h1>番茄工作台</h1>
          <div className={css.actions}>
            {page === 'points' && storyToolbar}
            {page === 'board' && <><label className={css.searchField}>
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
            <details ref={filterMenuRef} className={css.filterMenu}>
              <summary aria-label="空间、负责人、类型和状态筛选" title="空间、负责人、类型和状态筛选">
                <span aria-hidden="true">▽</span>
                {(blacklist.types.size > 0 || blacklist.statuses.size > 0 || blacklist.workspaces.size > 0 || selectedAssignee !== 'currentUser()') && <i />}
              </summary>
              <div className={css.filterPopover}>
                <WorkspaceFilterRow options={workspaceOptions} hidden={blacklist.workspaces} onToggle={value => toggleBlacklist('workspaces', value)} />
                <AssigneePicker users={filterDirectory.users} value={selectedAssignee} onChange={value => { setSelectedAssignee(value); void refresh(value) }} />
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
              onClick={() => void refresh(selectedAssignee)}
            />
            </>}
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
        </div>
        <nav className={css.pageTabs} aria-label="番茄工作台页面">
          <button type="button" aria-current={page === 'board' ? 'page' : undefined} onClick={() => setPage('board')}>事项看板</button>
          <button type="button" aria-current={page === 'points' ? 'page' : undefined} onClick={() => setPage('points')}>迭代投入</button>
        </nav>
      </header>
      {page === 'points' ? <StoryPoints toolbarTarget={setStoryToolbar} onOpenItem={openItem} /> : <>
      {board.error && <div className={css.error} role="alert">{board.error}</div>}
      {board.truncated && <p className={css.notice} role="status">事项数量已达配置上限，当前仅展示前 {board.items.length} 条。</p>}
      <div className={css.board}>
        {statuses.map(status => {
          const items = filteredItems.filter(item => item.status === status)
          return (
            <section
              ref={element => { if (element) laneElements.current.set(status, element); else laneElements.current.delete(status) }}
              className={`${css.lane} ${draggedLane === status ? css.laneDragging : ''} ${dropLane?.status === status ? (dropLane.after ? css.laneDropAfter : css.laneDropBefore) : ''}`}
              key={status}
              aria-labelledby={`tomato-lane-${status}`}
              onDragOver={event => {
                if (!draggedLane || draggedLane === status) return
                event.preventDefault()
                const bounds = event.currentTarget.getBoundingClientRect()
                setDropLane({ status, after: event.clientX >= bounds.left + bounds.width / 2 })
              }}
              onDrop={event => {
                event.preventDefault()
                if (draggedLane && dropLane?.status === status) moveLane(draggedLane, status, dropLane.after)
                setDraggedLane(null)
                setDropLane(null)
              }}
            >
              <header
                className={css.laneHeader}
                draggable
                title="拖拽调整泳道顺序"
                  onDragStart={event => {
                    event.dataTransfer.effectAllowed = 'move'
                    event.dataTransfer.setData('text/plain', status)
                    const lane = event.currentTarget.parentElement
                    if (lane) {
                      const bounds = lane.getBoundingClientRect()
                      event.dataTransfer.setDragImage(
                        lane,
                        Math.min(Math.max(event.clientX - bounds.left, 0), bounds.width),
                        Math.min(Math.max(event.clientY - bounds.top, 0), bounds.height),
                      )
                    }
                    setDraggedLane(status)
                  }}
                onDragEnd={() => { setDraggedLane(null); setDropLane(null) }}
              >
                <h2 id={`tomato-lane-${status}`}>{status}</h2>
                <span>{items.length}</span>
              </header>
              <div className={css.cards}>
                {items.map(item => (
                  <article
                    className={`${css.card} ${mutedItems.has(item.itemKey) ? css.cardMuted : ''}`}
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
                      <div className={css.cardButtons}>
                        <Button
                          className={css.muteButton}
                          variant="ghost"
                          size="sm"
                          title={mutedItems.has(item.itemKey) ? '取消置灰' : '置灰标记'}
                          aria-label={mutedItems.has(item.itemKey) ? `取消置灰 ${item.itemKey}` : `置灰 ${item.itemKey}`}
                          aria-pressed={mutedItems.has(item.itemKey)}
                          onClick={event => {
                            event.stopPropagation()
                            toggleMutedItem(item.itemKey)
                          }}
                          onKeyDown={event => event.stopPropagation()}
                        >
                          ●
                        </Button>
                        <Button
                          className={css.tomatoLink}
                          variant="ghost"
                          size="sm"
                          title="在番茄中打开事项"
                          aria-label={`在番茄中打开 ${item.itemKey}`}
                          onClick={event => {
                            event.stopPropagation()
                            window.open(item.tomatoUrl, '_blank', 'noopener,noreferrer')
                          }}
                          onKeyDown={event => event.stopPropagation()}
                        >
                          ↗
                        </Button>
                      </div>
                    </div>
                    <strong>{item.title}</strong>
                    <div className={css.cardMeta}>
                      <span className={css.typeTag} style={typeStyle(item.itemType)}>{item.itemType}</span>
                      {(item.workspaceName || item.workspaceKey) && <span className={`${css.metaTag} ${css.workspaceTag}`} title="空间">{item.workspaceName && item.workspaceKey && item.workspaceName !== item.workspaceKey ? `${item.workspaceName} (${item.workspaceKey})` : item.workspaceKey || item.workspaceName}</span>}
                      {item.priority && <span className={`${css.metaTag} ${css.priorityTag}`} data-priority={priorityLabel(item.priority)} title="优先级">{priorityLabel(item.priority)}</span>}
                      {item.creator && <span className={`${css.metaTag} ${css.creatorTag}`} title="创建人">{item.creator}</span>}
                    </div>
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
      </>}
      {board.selectedItem ? <CreateConversationDialog ctx={ctx} item={board.selectedItem} /> : null}
    </section>
  )
}

const PRIORITY_LABELS: Record<string, string> = {
  '69e65065-4b34-4109-bca9-0154e548554a': 'P0',
  '8f7912a5-9176-4a79-a269-2269ac42b5a2': 'P1',
  'ca8c3e43-3e7b-444d-8940-d0967d944921': 'P2',
  'ec31e4c1-b55b-479d-be97-86d5f7bf38ef': 'P2',
  '1a3e1092-7d70-42ee-ad38-0e8d953c4c23': 'P3',
  'faae52da-28c8-46fc-96dd-db9cdb28b557': 'P4',
}
const priorityLabel = (value: string) => PRIORITY_LABELS[value] ?? value

const TYPE_TONES: Record<string, string> = {
  Story: '#2f7d72', EnablerStory: '#2777a8', Task: '#7b61a8', Bug: '#c34f43', 缺陷: '#c34f43', 测试缺陷: '#d06438', Epic: '#9a6b24', Feature: '#3f68ad',
}
function typeTone(type: string): string {
  if (TYPE_TONES[type]) return TYPE_TONES[type]
  const palette = ['#2f7d72', '#2777a8', '#7b61a8', '#c34f43', '#9a6b24', '#51753a', '#a14f78']
  return palette[[...type].reduce((hash, char) => hash + char.charCodeAt(0), 0) % palette.length]!
}
function typeStyle(type: string) {
  const tone = typeTone(type)
  return { '--type-tone': tone } as React.CSSProperties
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
            className={`${hidden.has(option) ? '' : css.selectedFilter} ${label === '类型' ? css.typeFilter : ''}`}
            style={label === '类型' ? typeStyle(option) : undefined}
            type="button"
            aria-pressed={!hidden.has(option)}
            onClick={() => onToggle(option)}
          >
            {label === '类型' && <i aria-hidden="true" />}{option}
          </button>
        ))}
      </div>
    </div>
  )
}

function WorkspaceFilterRow({ options, hidden, onToggle }: {
  options: Array<{ value: string; label: string }>
  hidden: ReadonlySet<string>
  onToggle: (value: string) => void
}) {
  return (
    <div className={css.filterRow}>
      <span>空间</span>
      <div>
        {options.map(option => (
          <button
            key={option.value}
            className={hidden.has(option.value) ? '' : css.selectedFilter}
            type="button"
            aria-pressed={!hidden.has(option.value)}
            onClick={() => onToggle(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function AssigneePicker({ users, value, onChange }: {
  users: FilterDirectory['users']
  value: string
  onChange: (value: string) => void
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const options = useMemo(() => [{ username: 'currentUser()', name: '我负责的' }, ...users.filter(user => user.username !== 'currentUser()')], [users])
  const selected = options.find(option => option.username === value) ?? options[0]
  const needle = query.trim().toLowerCase()
  const filtered = needle
    ? options.filter(option => `${option.name} ${option.username}`.toLowerCase().includes(needle))
    : options

  useEffect(() => {
    if (!open) return
    const close = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', close, true)
    return () => document.removeEventListener('pointerdown', close, true)
  }, [open])

  return (
    <div className={css.assigneeFilter}>
      <span>负责人</span>
      <div ref={rootRef} className={css.assigneePicker}>
        <Button variant="outline" size="sm" className={css.assigneeTrigger} aria-haspopup="listbox" aria-expanded={open} onClick={() => { setOpen(current => !current); setQuery('') }}>
          <span>{selected?.name ?? value}</span><IconChevronDownOutline14 />
        </Button>
        {open ? (
          <div className={css.assigneeDropdown}>
            <input autoFocus type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索昵称或用户名…" aria-label="搜索负责人" />
            <div role="listbox" aria-label="负责人">
              {filtered.map(option => (
                <button key={option.username} type="button" role="option" aria-selected={option.username === value} onClick={() => { onChange(option.username); setOpen(false); setQuery('') }}>
                  <strong>{option.name}</strong>{option.name !== option.username && option.username !== 'currentUser()' ? <small>{option.username}</small> : null}
                </button>
              ))}
              {filtered.length === 0 ? <p>没有匹配的负责人</p> : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function TomatoConversationShortcut({ ctx, sessionId, useSessions }: PropsRuntime<'conversation.session.header.actions'> & { ctx: Context }) {
  const itemKey = useSessions(state => {
    const summary = state.byId[sessionId]
    const title = summary?.title ?? summary?.displayTitle ?? ''
    const match = TOMATO_ITEM_KEY_PATTERN.exec(title)?.[1]?.trim()
    if (!match) return ''
    // 仅当该对话确实由番茄工作台创建并记录在本机映射中时，才认定它是番茄事项对话。
    // 这样即便普通新建对话的标题恰好命中 itemKey 格式，也不会被误带上状态流转 UI。
    return linkedSessionId(match) === sessionId ? match : ''
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [transitionState, setTransitionState] = useState<TomatoTransitionState>({
    currentStatus: '',
    tomatoUrl: '',
    transitions: [],
  })
  const [transitionError, setTransitionError] = useState<string | null>(null)

  useEffect(() => {
    if (!itemKey) return
    const controller = new AbortController()
    setLoading(true)
    setTransitionError(null)
    setTransitionState({ currentStatus: '', tomatoUrl: '', transitions: [] })
    void fetch(`/api/tomato-board/transitions/${encodeURIComponent(itemKey)}`, {
      headers: { accept: 'application/json' },
      signal: controller.signal,
    }).then(async response => {
      const body = await response.json() as TomatoTransitionState & { error?: string }
      if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`)
      setTransitionState({
        currentStatus: body.currentStatus || '',
        tomatoUrl: body.tomatoUrl || '',
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
        tomatoUrl: transitionsBody.tomatoUrl || '',
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
        disabled={!transitionState.tomatoUrl}
        onClick={() => window.open(transitionState.tomatoUrl, '_blank', 'noopener,noreferrer')}
      >
        番茄 ↗
      </Button>
    </>
  )
}

export const inject = ['slots', 'sessions', 'workspaces']

export function apply(ctx: Context): void {
  const openWorkbench = () => {
    if (disposeWorkbench) return
    emit({ open: true })
    disposeWorkbench = ctx.slots.register(
      { name: 'conversation', priority: -100 },
      () => <TomatoBoardPanel ctx={ctx} />,
    )
  }
  ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register(
    { name: 'conversation.session.header.actions', id: 'tomato-shortcut', order: 12 },
    props => <TomatoConversationShortcut {...props} ctx={ctx} />,
  ))
  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register(
    { name: 'sidebar.footer.action', id: 'tomato-board' },
    props => <TomatoBoardAction {...props} openWorkbench={openWorkbench} />,
  ))
  // The shell's session header is the visible top bar in the Web client.  Keep the
  // sidebar shortcut as a compact fallback for narrow or collapsed layouts.
  ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register(
    { name: 'conversation.session.header.actions', id: 'tomato-board-topbar', order: 11 },
    () => <TomatoBoardTopbarAction openWorkbench={openWorkbench} />,
  ))
}
