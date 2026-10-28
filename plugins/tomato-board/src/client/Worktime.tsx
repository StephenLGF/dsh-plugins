import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { DragEvent } from 'react'
import { Modal, Button, Toast } from '@deepseek-ai/dsh-client-ui-primitives'
import type { TomatoItem } from './TomatoBoard'
import type { WorktimeMetadata, WorktimeUnit, WorktimeTaskChange, WorktimeRequirementChange } from '../worktime-model.ts'
import { addDays, applyRequirementChange, applyTaskChange, calendarDragAllowed, calendarDragRanges, calendarStart, dateKey, datesBetween, availableWorktimeSlots, taskTitle, unitDates, unitHasCreatedTasks } from '../worktime-model.ts'
import { worktimeText as t } from './worktime-locale.ts'
import { AssigneePicker } from './AssigneePicker.tsx'
import { TaskBugs } from './TaskBugs.tsx'
import { TomatoLinkButton } from './TomatoLinkButton.tsx'
import css from './worktime.module.css'

type HistoryTask = { itemKey: string; title: string; status: string; start: string; end: string; days: number }
type CalendarDrag = { task?: HistoryTask; unit?: WorktimeUnit; anchor: string; edge: 'move' | 'start' | 'end' }
type DragPreview = { ranges: Array<{ start: string; end: string }>; target: string; kind: 'unit' | 'task'; invalid: boolean }
type Stage = keyof typeof t.stageLabels
type RangeDraft = { key: string; id?: string; revision?: number; start: string; end: string; locked?: boolean }
const stages = Object.keys(t.stageLabels) as Stage[]
const errorText = (error: unknown) => error instanceof Error ? error.message : t.readFailed
async function api<T>(path: string, input?: unknown, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`/api/tomato-board/worktime${path}`, {
    method: input === undefined ? 'GET' : 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' },
    ...(input === undefined ? {} : { body: JSON.stringify(input) }), ...(signal ? { signal } : {}),
  })
  // Routes are registered when the DSH process starts, so a refreshed page can
  // still talk to an older host half until the app is restarted.
  if (response.status === 404) throw new Error(t.hostStale)
  let data
  try { data = await response.json() } catch { throw new Error(`${t.readFailed} (${response.status})`) }
  if (!response.ok) throw new Error(/缺少操作单元|未知路由|Not Found/u.test(String(data.error ?? '')) ? t.hostStale : data.error || `${t.readFailed} (${response.status})`)
  return data as T
}
const todayKey = () => dateKey(new Date())
const sorted = (units: WorktimeUnit[]) => [...units].sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0))
const daysIn = (start: string, end: string) => { try { return datesBetween(start, end).length } catch { return 0 } }

/** Five-week planning calendar: pick days, then one plan per requirement. */
export function Worktime({ assignee, users, onAssigneeChange, onRefresh }: { assignee: string; users: Array<{ username: string; name: string }>; onAssigneeChange: (username: string) => void; onRefresh: () => void }) {
  const pageRef = useRef<HTMLDivElement>(null)
  const notificationId = useRef(0)
  const [notification, setNotification] = useState<{ id: number; text: string; error: boolean } | null>(null)
  const dismissNotification = useCallback(() => setNotification(null), [])
  const notify = useCallback((text: string, error = false) => {
    setNotification({ id: ++notificationId.current, text, error })
  }, [])
  const [items, setItems] = useState<TomatoItem[]>([])
  const [anchor, setAnchor] = useState(todayKey)
  const [units, setUnits] = useState<WorktimeUnit[]>([])
  const [archivedUnits, setArchivedUnits] = useState<WorktimeUnit[]>([])
  const [history, setHistory] = useState<HistoryTask[]>([])
  const [requirementChange, setRequirementChange] = useState<WorktimeRequirementChange | null>(null)
  const [taskChange, setTaskChange] = useState<WorktimeTaskChange | null>(null)
  const mutationPending = useRef(false)
  const readEpoch = useRef(0)
  const [error, setErrorValue] = useState('')
  const setError = useCallback((value: string) => {
    setErrorValue(value)
    if (value) notify(value, true)
  }, [notify])
  const [historyError, setHistoryError] = useState('')
  const [loading, setLoading] = useState(false)
  const [version, setVersion] = useState(0)
  const [selectedStory, setSelectedStory] = useState('')
  const [selection, setSelection] = useState<{ start: string; end: string } | null>(null)
  const [choosing, setChoosing] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [editingKey, setEditingKey] = useState('')
  const [editingTask, setEditingTask] = useState<HistoryTask | null>(null)
  const draggedTask = useRef<CalendarDrag | null>(null)
  const [dragPreview, setDragPreview] = useState<DragPreview | null>(null)
  const dragImage = useRef<HTMLCanvasElement | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessageValue] = useState('')
  const setMessage = useCallback((value: string) => {
    setMessageValue(value === t.taskSyncing ? value : '')
    if (value && value !== t.taskSyncing) notify(value)
    else dismissNotification()
  }, [notify, dismissNotification])
  const selecting = useRef(false)
  const pending = useRef<{ start: string; end: string } | null>(null)
  const readOnlyRef = useRef(false)
  // A pointer gesture already opened the dialog; the trailing click must not re-pick.
  const justReleased = useRef(false)
  const start = calendarStart(anchor)
  const end = addDays(start, 34)
  const dates = useMemo(() => datesBetween(start, end), [start, end])
  const requirements = useMemo(() => items.filter(item => ['Story', 'EnablerStory'].includes(item.itemType)), [items])
  const range = selection ? [selection.start, selection.end].sort() as [string, string] : null
  const readOnly = assignee !== 'currentUser()'
  const calendarUnits = useMemo(() => applyRequirementChange(units, requirementChange).map(unit => ({ ...unit, tasks: applyTaskChange(unit.tasks, taskChange) })), [units, requirementChange, taskChange])
  const calendarHistory = useMemo(() => applyTaskChange(history, taskChange), [history, taskChange])
  const [bugCounts, setBugCounts] = useState<Record<string, number>>({})
  const bugCountRevisions = useRef(new Map<string, number>())
  const updateBugCount = useCallback((itemKey: string, count: number) => {
    bugCountRevisions.current.set(itemKey, (bugCountRevisions.current.get(itemKey) ?? 0) + 1)
    setBugCounts(current => current[itemKey] === count ? current : { ...current, [itemKey]: count })
  }, [])
  const visibleTaskKeys = useMemo(() => [...new Set([
    ...calendarUnits.flatMap(unit => unit.tasks), ...calendarHistory,
  ].filter(task => task.itemKey && task.start <= end && task.end >= start).map(task => task.itemKey!))].sort().join(','), [calendarUnits, calendarHistory, start, end])
  useEffect(() => {
    if (!visibleTaskKeys) return
    const controller = new AbortController()
    const keys = visibleTaskKeys.split(',')
    const revisions = new Map(keys.map(key => [key, bugCountRevisions.current.get(key) ?? 0]))
    // Counts arrive separately so Task dates never wait for relationship queries.
    void (async () => {
      for (let offset = 0; offset < keys.length && !controller.signal.aborted; offset += 20) {
        try {
          const result = await api<{ counts: Record<string, number> }>('/task-bug-counts', { itemKeys: keys.slice(offset, offset + 20) }, controller.signal)
          if (controller.signal.aborted) return
          const fresh = Object.fromEntries(Object.entries(result.counts).filter(([key]) => revisions.get(key) === (bugCountRevisions.current.get(key) ?? 0)))
          setBugCounts(current => ({ ...current, ...fresh }))
        } catch { /* A missing count must not hide Tasks or replace known counts with zero. */ }
      }
    })()
    return () => controller.abort()
  }, [visibleTaskKeys, version])
  useEffect(() => { pending.current = selection }, [selection])
  useEffect(() => { readOnlyRef.current = readOnly }, [readOnly])
  useEffect(() => {
    const controller = new AbortController()
    const epoch = readEpoch.current
    setLoading(true)
    const query = encodeURIComponent(assignee)
    void Promise.all([
      api<{ units: WorktimeUnit[]; archivedUnits?: WorktimeUnit[] }>(`?assignee=${query}`, undefined, controller.signal).then(data => {
        if (!controller.signal.aborted && !mutationPending.current && epoch === readEpoch.current) { setUnits(data.units); setArchivedUnits(data.archivedUnits ?? []) }
      }),
      fetch(`/api/tomato-board/items?assignee=${query}`, { signal: controller.signal, headers: { accept: 'application/json' } }).then(async response => {
        const data = await response.json() as { items?: TomatoItem[]; error?: string }
        if (!response.ok) throw new Error(data.error || t.readFailed)
        setItems(data.items ?? [])
      }),
    ]).catch(error => { if (!controller.signal.aborted && !mutationPending.current && epoch === readEpoch.current) setError(errorText(error)) }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [version, assignee])
  useEffect(() => {
    const controller = new AbortController(); setHistoryError('')
    const epoch = readEpoch.current
    void api<{ tasks: HistoryTask[]; truncated?: boolean }>(`/history?start=${start}&end=${end}&assignee=${encodeURIComponent(assignee)}`, undefined, controller.signal).then(data => {
      if (controller.signal.aborted || mutationPending.current || epoch !== readEpoch.current) return
      setHistory(data.tasks)
      if (data.truncated) setHistoryError(t.historyFailed)
    }).catch(error => { if (!controller.signal.aborted && !mutationPending.current && epoch === readEpoch.current) setHistoryError(`${t.historyFailed}：${errorText(error)}`) })
    return () => controller.abort()
  }, [start, end, version, assignee])
  // Releasing the pointer finishes a click or a drag, and the plan dialog opens
  // immediately — the calendar never waits for a second confirmation step.
  useEffect(() => {
    const stop = () => {
      if (!selecting.current) return
      selecting.current = false
      setDragging(false)
      if (readOnlyRef.current || !pending.current) return
      justReleased.current = true
      window.setTimeout(() => { justReleased.current = false }, 0)
      setSelectedStory(''); setError(''); setChoosing(true)
    }
    window.addEventListener('pointerup', stop)
    window.addEventListener('pointercancel', stop)
    return () => { window.removeEventListener('pointerup', stop); window.removeEventListener('pointercancel', stop) }
  }, [])
  const beginSelection = (day: string) => { selecting.current = true; setDragging(true); setMessage(''); setSelection({ start: day, end: day }) }
  // The day number is a button, so its own click opens the plan dialog directly.
  const pickDay = (day: string) => { setMessage(''); setSelection({ start: day, end: day }); setSelectedStory(''); setError(''); setChoosing(true) }
  const stretchSelection = (day: string) => { if (selecting.current) setSelection(current => current ? { ...current, end: day } : { start: day, end: day }) }
  const closePicker = () => { setChoosing(false); setSelection(null); setSelectedStory('') }
  async function saveSelection(itemKey: string) {
    if (!range || saving) return
    const duplicate = units.find(unit => unit.itemKey === itemKey && unit.start === range[0] && unit.end === range[1])
    if (duplicate) { setEditingKey(itemKey); closePicker(); setMessage(t.duplicate); return }
    setSaving(true); setError('')
    try {
      await api('/unit', { id: crypto.randomUUID(), itemKey, start: range[0], end: range[1] })
      // A touching range is merged server-side, so the absorbed unit is gone: re-read the list.
      const fresh = await api<{ units: WorktimeUnit[]; archivedUnits?: WorktimeUnit[] }>(`?assignee=${encodeURIComponent(assignee)}`)
      setUnits(fresh.units); setArchivedUnits(fresh.archivedUnits ?? [])
      setEditingKey(itemKey); closePicker(); setMessage(t.saved)
    } catch (error) { setError(errorText(error)) } finally { setSaving(false) }
  }
  async function mutateTask(task: HistoryTask, action: 'move' | 'delete', next?: { start: string; end: string }) {
    if (readOnly || saving || mutationPending.current) throw new Error(t.taskBusy)
    if (action === 'move' && (!next || !daysIn(next.start, next.end))) throw new Error(t.rangeInvalid)
    const change: WorktimeTaskChange = action === 'delete' ? { itemKey: task.itemKey, action }
      : { itemKey: task.itemKey, action, start: next!.start, end: next!.end }
    mutationPending.current = true; readEpoch.current += 1
    setTaskChange(change); setEditingTask(null); setSaving(true); setError(''); setMessage(t.taskSyncing)
    try {
      await api('/task', { itemKey: task.itemKey, action, expectedStart: task.start, expectedEnd: task.end,
        ...(next ?? {}), ...(action === 'delete' ? { confirm: true } : {}) })
      setUnits(current => current.map(unit => ({ ...unit, tasks: applyTaskChange(unit.tasks, change) })))
      setHistory(current => applyTaskChange(current, change))
      setMessage(action === 'delete' ? t.taskDeleted : t.taskMoved)
      setVersion(value => value + 1); onRefresh()
    } catch (error) {
      setMessage(''); setError(`${t.taskRolledBack}：${errorText(error)}`)
    } finally {
      readEpoch.current += 1; mutationPending.current = false
      setTaskChange(null); setSaving(false)
    }
  }
  async function mutateRequirement(unit: WorktimeUnit, change: WorktimeRequirementChange) {
    if (readOnly || saving || mutationPending.current) throw new Error(t.taskBusy)
    if (change.action === 'resize' && !daysIn(change.start, change.end)) throw new Error(t.rangeInvalid)
    mutationPending.current = true; readEpoch.current += 1
    setRequirementChange(change); setEditingKey(''); setSaving(true); setError(''); setMessage(t.taskSyncing)
    try {
      const data = await api<{ units: WorktimeUnit[] }>('/requirement', { ...change, itemKey: unit.itemKey,
        units: [{ id: unit.id, revision: unit.revision }] })
      setUnits(data.units); setMessage(t.requirementSaved); setVersion(value => value + 1); onRefresh()
    } catch (error) { setMessage(''); setError(`${t.taskRolledBack}：${errorText(error)}`) }
    finally {
      readEpoch.current += 1; mutationPending.current = false
      setRequirementChange(null); setSaving(false)
    }
  }
  function previewRanges(source: CalendarDrag, day: string) {
    const active = source.task ?? source.unit!
    return calendarDragRanges([active], active, source.anchor, source.edge, day)
  }
  function updateDragPreview(day: string) {
    const source = draggedTask.current
    if (!source) return
    setDragPreview(current => current?.target === day ? current : {
      ranges: previewRanges(source, day), target: day, kind: source.unit ? 'unit' : 'task',
      invalid: !calendarDragAllowed(source.task ?? source.unit!, source.edge, day),
    })
  }
  function weekDropDay(event: DragEvent<HTMLElement>, weekDates: string[]) {
    const bounds = event.currentTarget.getBoundingClientRect()
    return weekDates[Math.min(6, Math.max(0, Math.floor((event.clientX - bounds.left) / bounds.width * 7)))]!
  }
  async function dropTask(day: string) {
    const source = draggedTask.current
    draggedTask.current = null; setDragPreview(null)
    if (!source || source.anchor === day || readOnly) return
    if (!calendarDragAllowed(source.task ?? source.unit!, source.edge, day)) { setError(t.rangeInvalid); return }
    const next = previewRanges(source, day)[0]!
    const delta = Math.round((Date.parse(`${day}T12:00:00Z`) - Date.parse(`${source.anchor}T12:00:00Z`)) / 86400000)
    try {
      if (source.unit) {
        await mutateRequirement(source.unit, source.edge === 'move'
          ? { action: 'move', id: source.unit.id, delta }
          : { action: 'resize', id: source.unit.id, ...next })
      } else if (source.task) {
        await mutateTask(source.task, 'move', next)
      }
    } catch (error) { setError(errorText(error)) }
  }
  const knownKeys = new Set(calendarUnits.flatMap(unit => unit.tasks.flatMap(task => task.itemKey ? [task.itemKey] : [])))
  const remote = calendarHistory.filter(task => !knownKeys.has(task.itemKey))
  const weeks: string[][] = []
  for (let i = 0; i < dates.length; i += 7) weeks.push(dates.slice(i, i + 7))
  type Bar = { key: string; kind: 'unit' | 'task'; startCol: number; span: number; lane: number; label: string; tip: string; unverified?: boolean; task?: HistoryTask; unit?: WorktimeUnit; anchor?: string; onClick: () => void }
  function beginBarDrag(event: DragEvent<HTMLElement>, bar: Bar, edge: 'move' | 'start' | 'end' = 'move') {
    event.stopPropagation()
    const data = bar.task ?? bar.unit
    if (!data || !bar.anchor || readOnly || saving) { event.preventDefault(); return }
    const bounds = event.currentTarget.getBoundingClientRect()
    const offset = Math.min(bar.span - 1, Math.max(0, Math.floor((event.clientX - bounds.left) / bounds.width * bar.span)))
    const anchor = edge === 'move' ? addDays(bar.anchor, offset) : edge === 'start' ? data.start : data.end
    draggedTask.current = { ...(bar.task ? { task: bar.task } : {}), ...(bar.unit ? { unit: bar.unit } : {}), anchor, edge }
    event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', data.itemKey)
    if (!dragImage.current) { dragImage.current = document.createElement('canvas'); dragImage.current.width = 1; dragImage.current.height = 1 }
    event.dataTransfer.setDragImage(dragImage.current, 0, 0)
    setDragPreview({ ranges: previewRanges(draggedTask.current, anchor), target: anchor, kind: bar.unit ? 'unit' : 'task', invalid: false })
  }
  /** macOS-calendar style: clip each unit/task into the week, then stack overlapping bars into lanes. */
  const buildBars = (weekDates: string[]): Bar[] => {
    const weekStart = weekDates[0]!
    const weekEnd = weekDates[6]!
    const bars: Bar[] = []
    const clip = (s: string, e: string) => {
      if (!s || !e || e < weekStart || s > weekEnd) return null
      const i = weekDates.indexOf(s < weekStart ? weekStart : s)
      const j = weekDates.indexOf(e > weekEnd ? weekEnd : e)
      return i < 0 || j < 0 ? null : { startCol: i + 1, span: j - i + 1 }
    }
    for (const unit of calendarUnits) {
      const c = clip(unit.start, unit.end)
      if (c) bars.push({ key: `u-${unit.id}-${weekStart}`, kind: 'unit', ...c, lane: 0, unit, anchor: unit.start < weekStart ? weekStart : unit.start, label: unit.title, tip: `${t.request} · ${unit.itemKey} · ${unit.start} ~ ${unit.end} · ${datesBetween(unit.start, unit.end).length}${t.days}`, onClick: () => setEditingKey(unit.itemKey) })
      for (const [i, task] of unit.tasks.entries()) {
        const tc = clip(task.start, task.end)
        if (!tc) continue
        bars.push({ key: `t-${unit.id}-${i}-${weekStart}`, kind: 'task', ...tc, lane: 0, unverified: task.status !== 'created', ...(task.itemKey ? { task: { ...task, itemKey: task.itemKey }, anchor: task.start < weekStart ? weekStart : task.start } : {}), label: task.title, tip: task.error || `${t.task} · ${task.start} ~ ${task.end} · ${task.days}${t.personDays}${task.itemKey ? ` · ${task.itemKey}` : ''} · ${task.status === 'created' ? t.created : task.status === 'pending' ? t.pending : t.uncertain}`, onClick: () => task.itemKey ? setEditingTask({ ...task, itemKey: task.itemKey }) : setEditingKey(unit.itemKey) })
      }
    }
    for (const task of remote) {
      const c = clip(task.start, task.end)
      if (!c) continue
      bars.push({ key: `r-${task.itemKey}-${weekStart}`, kind: 'task', ...c, lane: 0, task, anchor: task.start < weekStart ? weekStart : task.start, label: task.title, tip: `${t.task} · ${task.status} · ${task.itemKey} · ${task.start} ~ ${task.end}`, onClick: () => setEditingTask(task) })
    }
    bars.sort((a, b) => a.startCol - b.startCol || b.span - a.span)
    const laneEnds: number[] = []
    for (const bar of bars) {
      let lane = laneEnds.findIndex(laneEnd => laneEnd < bar.startCol)
      if (lane === -1) { lane = laneEnds.length; laneEnds.push(0) }
      bar.lane = lane
      laneEnds[lane] = bar.startCol + bar.span - 1
    }
    return bars
  }
  const editingUnits = editingKey ? sorted(calendarUnits.filter(unit => unit.itemKey === editingKey)) : []
  return <div ref={pageRef} className={css.page}>
    {notification && <Toast key={notification.id} text={notification.text} anchor={pageRef.current} holdMs={notification.error ? 5000 : 2000} onDone={dismissNotification} />}
    <div className={css.toolbar}>
      <div className={css.period}><h2>{start.replaceAll('-', '.')} <span>—</span> {end.replaceAll('-', '.')}</h2><div className={css.legend}><span className={css.storyDot} />{t.request}<span className={css.taskDot} />{t.task}{!readOnly && <small>{t.dayPickHint}</small>}</div></div>
      <div className={css.navigation}>
        <AssigneePicker users={users} value={assignee} onChange={onAssigneeChange} label={null} className={css.userPicker!} currentUserName={t.currentUser} ariaLabel={t.switchUser} />
        {readOnly && <span className={css.readOnlyTag}>{t.readOnlyView}</span>}
        <button type="button" aria-label={t.previous} onClick={() => setAnchor(addDays(anchor, -7))}>‹</button>
        <button type="button" onClick={() => setAnchor(todayKey())}>{t.today}</button>
        <button type="button" aria-label={t.next} onClick={() => setAnchor(addDays(anchor, 7))}>›</button>
        <button type="button" disabled={loading} onClick={() => { setVersion(v => v + 1); onRefresh() }}>{loading ? t.loading : t.refresh}</button>
      </div>
    </div>
    {historyError && <p role="status" className={css.notice}>{historyError}</p>}
    {message && <p role="status" className={css.notice}>{message}</p>}
    <section className={css.calendarArea} aria-label={t.dateSelection}>
      <div className={`${css.previewStatus} ${dragPreview?.invalid ? css.previewDisabledStatus : ''}`} role="status" aria-live="polite">{dragPreview && <>{dragPreview.invalid ? t.invalidDrag : t.previewRange} · {dragPreview.ranges.map(value => `${value.start} — ${value.end}`).join(' / ')}</>}</div>
      <div className={`${css.calendar} ${dragging ? css.dragging : ''} ${dragPreview ? css.previewing : ''}`}>
        <div className={css.weekHeader}>{t.weekdays.map(day => <div className={css.weekday} key={day}>{day}</div>)}</div>
        {weeks.map(weekDates => {
          const bars = buildBars(weekDates)
          const laneCount = bars.reduce((count, bar) => Math.max(count, bar.lane + 1), 0)
          return <div className={css.week} key={weekDates[0]}>
            <div className={css.weekScroll} role="region" aria-label={`${weekDates[0]} — ${weekDates[6]}`} tabIndex={0}>
            <div className={css.weekContent} style={{ height: `${34 + laneCount * 23}px` }}
            onDragOver={event => { if (!draggedTask.current || readOnly || saving) return; event.preventDefault(); const day = weekDropDay(event, weekDates); event.dataTransfer.dropEffect = calendarDragAllowed(draggedTask.current.task ?? draggedTask.current.unit!, draggedTask.current.edge, day) ? 'move' : 'none'; updateDragPreview(day) }}
            onDrop={event => { if (!draggedTask.current || readOnly || saving) return; event.preventDefault(); event.stopPropagation(); void dropTask(weekDropDay(event, weekDates)) }}>
            {weekDates.map((day, di) => {
              const selected = range && day >= range[0] && day <= range[1]
              const previewed = dragPreview?.ranges.some(value => value.start <= day && day <= value.end)
              const isToday = day === todayKey()
              return <div key={day} className={`${css.day} ${di < 2 ? css.weekend : ''}`} data-highlighted={selected || previewed ? true : undefined}
                aria-disabled={dragPreview?.invalid && dragPreview.target === day ? true : undefined} data-date={day} onPointerDown={readOnly ? undefined : event => {
                  const target = event.target as HTMLElement
                  // The day number is a pick target too, so a drag may start on it.
                  if (event.button !== 0 || target.closest('a,input,textarea,select') || (target.closest('button') && !target.closest('[data-pick]'))) return
                  event.preventDefault(); beginSelection(day)
                }} onPointerEnter={readOnly ? undefined : () => stretchSelection(day)}>
                <button type="button" data-pick="day" className={css.dayNumber} aria-label={day} aria-pressed={!!selected} aria-current={isToday ? 'date' : undefined} disabled={readOnly} onClick={() => { if (!justReleased.current) pickDay(day) }}>
                  <small>{day.slice(5, 7)}/</small>{Number(day.slice(8))}
                </button>
              </div>
            })}
            <div className={css.events}>
              {bars.map(bar => <button key={bar.key} type="button" title={bar.tip}
                draggable={!readOnly && !saving && !!(bar.task || bar.unit)} onDragStart={event => beginBarDrag(event, bar)} onDragEnd={() => { draggedTask.current = null; setDragPreview(null) }} onClick={bar.onClick} className={`${css.bar} ${bar.kind === 'unit' ? css.barUnit : bar.unverified ? css.barUnverified : css.barTask}`} style={{ gridColumn: `${bar.startCol} / span ${bar.span}`, gridRow: String(bar.lane + 1) }}>
                <span className={css.barLabel}>{bar.label}</span>
                {bar.task && (bugCounts[bar.task.itemKey] ?? 0) > 0 && <span className={css.taskBugBadge} aria-label={`关联 ${bugCounts[bar.task.itemKey]} 个 Bug`} title={`关联 ${bugCounts[bar.task.itemKey]} 个 Bug`}>{bugCounts[bar.task.itemKey]}</span>}
                {!readOnly && !saving && (bar.task || bar.unit) && <>
                  {(bar.task ?? bar.unit)!.start >= weekDates[0]! && <span className={`${css.resizeHandle} ${css.resizeStart}`} draggable title={t.resizeStart} onDragStart={event => beginBarDrag(event, bar, 'start')} onClick={event => event.stopPropagation()} />}
                  {(bar.task ?? bar.unit)!.end <= weekDates[6]! && <span className={`${css.resizeHandle} ${css.resizeEnd}`} draggable title={t.resizeEnd} onDragStart={event => beginBarDrag(event, bar, 'end')} onClick={event => event.stopPropagation()} />}
                </>}
              </button>)}
            </div>
            </div>
            </div>
            <div className={css.weekHighlights} aria-hidden="true">
              {weekDates.map(day => {
                const selected = range && day >= range[0] && day <= range[1]
                const previewed = dragPreview?.ranges.some(value => value.start <= day && day <= value.end)
                const previewStart = dragPreview?.ranges.some(value => value.start === day)
                const previewEnd = dragPreview?.ranges.some(value => value.end === day)
                const disabled = dragPreview?.invalid && (previewed || dragPreview.target === day)
                return <div key={day} className={`${css.highlightCell} ${selected ? css.selectedDay : ''} ${previewed ? dragPreview?.kind === 'task' ? css.previewTaskDay : css.previewUnitDay : ''} ${previewStart ? css.previewStartDay : ''} ${previewEnd ? css.previewEndDay : ''} ${disabled ? css.previewDisabledDay : ''}`} />
              })}
            </div>
          </div>
        })}
      </div>
    </section>
    {choosing && range && <Modal open title={t.pickTitle} closeLabel={t.close} onClose={() => { if (!saving) closePicker() }} className={css.dialogNarrow!}
      footer={<><Button variant="ghost" disabled={saving} onClick={closePicker}>{t.cancel}</Button><Button variant="primary" disabled={!selectedStory || saving} onClick={() => void saveSelection(selectedStory)}>{saving ? t.saving : t.confirmPick}</Button></>}>
      <div className={css.form}>
        <select aria-label={t.pickTitle} value={selectedStory} onChange={event => setSelectedStory(event.target.value)}>
          <option value="">{t.placeholder}</option>
          {requirements.map(item => <option key={item.itemKey} value={item.itemKey}>{item.itemKey} · {item.title}</option>)}
        </select>
        {error && <p className={css.error} role="alert">{error}</p>}
      </div>
    </Modal>}
    {editingTask && <TaskEditor key={editingTask.itemKey} task={editingTask} readOnly={readOnly} busy={saving} onClose={() => setEditingTask(null)} onMutate={mutateTask} onNotify={notify} onBugCountChange={updateBugCount} />}
    {editingKey && editingUnits.length > 0 && <GroupEditor key={editingKey} itemKey={editingKey} units={editingUnits} archivedUnits={archivedUnits} onClose={() => setEditingKey('')} onSaved={notice => { setVersion(v => v + 1); onRefresh(); if (notice) setMessage(notice) }} />}
  </div>
}

/** One requirement is one plan: every date range it owns is allocated together. */
function GroupEditor({ itemKey, units, archivedUnits, onClose, onSaved }: { itemKey: string; units: WorktimeUnit[]; archivedUnits: WorktimeUnit[]; onClose: () => void; onSaved: (notice?: string) => void }) {
  const historyUnits = [...units, ...archivedUnits.filter(unit => unit.itemKey === itemKey)]
  const title = units[0]?.title || itemKey
  const savedUnits = useRef(units)
  const [meta, setMeta] = useState<WorktimeMetadata | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [cost, setCost] = useState(units[0]?.cost || '')
  const [team, setTeam] = useState(units[0]?.team || '')
  const [category, setCategory] = useState(units[0]?.category || '')
  const [confirmRetry, setConfirmRetry] = useState(false)
  const [ranges, setRanges] = useState<RangeDraft[]>(() => units.map(unit => ({ key: unit.id, id: unit.id, revision: unit.revision, start: unit.start, end: unit.end, locked: unitHasCreatedTasks(unit, units) })))
  // Prefill unsent drafts only; confirmed Tasks are shown separately.
  const [drafts, setDrafts] = useState(() => Object.fromEntries(stages.map(stage => {
    const task = units.flatMap(unit => unit.tasks).find(item => item.stage === stage && item.status !== 'created' && !item.itemKey)
    return [stage, { days: task ? String(task.days) : '', title: task?.title || taskTitle(title, stage) }]
  })) as Record<Stage, { days: string; title: string }>)
  // Existing Tasks keep their dates and consume capacity; extra slots form the next batch.
  const hasCreated = historyUnits.some(unit => unit.tasks.some(task => task.status === 'created'))
  const rangeCount = ranges.length
  const rangesChanged = ranges.length !== savedUnits.current.length || ranges.some(range => {
    const original = savedUnits.current.find(unit => unit.id === range.id)
    return !original || original.start !== range.start || original.end !== range.end
  })
  const retried = historyUnits.some(unit => unit.tasks.some(task => task.status !== 'pending' && task.status !== 'created'))
  const count = useMemo(() => {
    const valid = ranges.filter(range => range.start && range.end && range.end >= range.start)
    try { return valid.length ? availableWorktimeSlots(unitDates(valid), historyUnits.flatMap(unit => unit.tasks), unitDates(historyUnits)).length / 2 : 0 } catch { return 0 }
  }, [ranges, units, archivedUnits, itemKey])
  const plannedCount = useMemo(() => {
    const valid = ranges.filter(range => range.start && range.end && range.end >= range.start)
    try { return valid.length ? unitDates(valid).length : 0 } catch { return 0 }
  }, [ranges])
  const createdTasks = historyUnits.flatMap(unit => unit.tasks).filter(task => task.status === 'created')
  const createdDays = createdTasks.reduce((sum, task) => sum + task.days, 0)
  const total = stages.reduce((sum, stage) => sum + (Number(drafts[stage].days) || 0), 0)
  const over = total > count + 1e-6
  useEffect(() => {
    const controller = new AbortController()
    void api<WorktimeMetadata>(`/metadata?itemKey=${encodeURIComponent(itemKey)}`, undefined, controller.signal).then(data => {
      setMeta(data); setCost(current => current || data.suggestedCost); setTeam(current => current || data.suggestedTeam)
      setCategory(current => current || data.categories.find(value => /bug|BUG|Bug/u.test(title) ? /bug|BUG|Bug/u.test(value) : value === '软件开发') || data.categories[0] || '')
    }).catch(error => { if (!controller.signal.aborted) setError(errorText(error)) })
    return () => controller.abort()
  }, [itemKey, title])
  const inputTasks = stages.filter(stage => Number(drafts[stage].days) > 0).map(stage => ({ stage, days: Number(drafts[stage].days), title: drafts[stage].title }))
  const changeRange = (key: string, patch: Partial<RangeDraft>) => setRanges(current => current.map(range => range.key === key ? { ...range, ...patch } : range))
  /** Persist ranges first so creation always sees the exact saved revisions. */
  async function persistRanges(): Promise<Array<{ id: string; revision: number }>> {
    if (!ranges.length && !rangesChanged) throw new Error(t.rangeEmpty)
    for (const range of ranges) {
      if (!range.start || !range.end) throw new Error(t.rangeIncomplete)
      if (range.end < range.start) throw new Error(t.rangeInvalid)
      datesBetween(range.start, range.end)
    }
    const data = await api<{ units: WorktimeUnit[] }>('/ranges', {
      itemKey, units: savedUnits.current.map(unit => ({ id: unit.id, revision: unit.revision })),
      ranges: ranges.map(range => ({ id: range.id || range.key, start: range.start, end: range.end })),
      cost, team, category,
    })
    savedUnits.current = data.units
    const next = sorted(data.units).map(unit => ({ key: unit.id, id: unit.id, revision: unit.revision,
      start: unit.start, end: unit.end, locked: unitHasCreatedTasks(unit, data.units) }))
    setRanges(next)
    return next.filter(range => range.id).map(range => ({ id: range.id!, revision: range.revision ?? 0 }))
  }
  async function saveRanges() {
    setBusy(true); setError('')
    try { await persistRanges(); onSaved(t.saved); onClose() } catch (error) { setError(errorText(error)) } finally { setBusy(false) }
  }
  async function create() {
    setBusy(true); setError('')
    try {
      const claims = await persistRanges()
      if (over) throw new Error(`${t.overAllocate}：${total} > ${count} ${t.personDays}`)
      const result = await api<{ unit: WorktimeUnit; units?: WorktimeUnit[]; error?: string }>('/create', { units: claims, cost, team, category, tasks: inputTasks, confirmRetry })
      if (result.error) { onSaved(); setError(result.error) } else { onSaved(t.createdMessage); onClose() }
    } catch (error) { setError(errorText(error)) } finally { setBusy(false) }
  }
  const renderSelect = (label: string, value: string, values: string[], change: (value: string) => void) => <label>{label}<select required value={value} disabled={busy} onChange={event => change(event.target.value)}><option value="">{t.placeholder}</option>{values.map(option => <option key={option}>{option}</option>)}</select></label>
  return <Modal open title={`${t.edit} · ${itemKey}`} description={title} closeLabel={t.close} onClose={() => { if (!busy) onClose() }} className={css.dialog!}
    footer={<><Button variant="ghost" disabled={busy} onClick={onClose}>{t.close}</Button><Button variant="outline" disabled={busy || (!rangeCount && !rangesChanged)} onClick={() => void saveRanges()}>{busy ? t.saving : t.saveRanges}</Button><Button variant="primary" disabled={busy || !rangeCount || count <= 0 || !meta || !cost || !team || !category || !inputTasks.length || over || (retried && !confirmRetry)} onClick={() => void create()}>{busy ? t.creating : t.create}</Button></>}>
    <div className={css.form}>
      <div className={css.unitSummary}><span>{itemKey}</span><strong>{plannedCount} {t.days}</strong><TomatoLinkButton itemKey={itemKey} /></div>
      <p className={css.help}>{t.createdAllocation} {createdDays} {t.personDays} · {t.currentCapacity} {count} {t.personDays}</p>
      <div className={css.stageHeading}><h3>{t.range}</h3><span>{ranges.length}</span></div>
      <p className={css.help}>{t.rangeHint}</p>
      <div className={css.ranges}>{ranges.map((range, index) => <div className={css.rangeRow} key={range.key}>
        <input type="date" aria-label={`${t.start}${index + 1}`} value={range.start} disabled={range.locked || busy} onChange={event => changeRange(range.key, { start: event.target.value })} />
        <span>—</span>
        <input type="date" aria-label={`${t.end}${index + 1}`} min={range.start} value={range.end} disabled={range.locked || busy} onChange={event => changeRange(range.key, { end: event.target.value })} />
        <small>{daysIn(range.start, range.end)} {t.days}{range.locked ? ` · ${t.created}` : ''}</small>
        <button type="button" disabled={busy} aria-label={`${t.deleteRange} ${index + 1}`} title={t.rangeDeleteHint} onClick={() => setRanges(current => current.filter(value => value.key !== range.key))}>{t.deleteRange}</button>
      </div>)}</div>
      <button type="button" className={css.addRange} disabled={busy} onClick={() => setRanges(current => [...current, { key: crypto.randomUUID(), start: '', end: '' }])}>{t.addRange}</button>
      {!meta && !error && <p role="status">{t.loading}</p>}
      {meta && <><div className={css.twoColumns}><label>{t.project}<input readOnly value={meta.project} /></label><label>{t.owner}<input readOnly value={meta.assigneeName} /></label>{renderSelect(t.cost, cost, meta.costs, setCost)}{renderSelect(t.team, team, meta.teams, setTeam)}{renderSelect(t.category, category, meta.categories, setCategory)}</div><p className={css.help}>{meta.suggestionSource}</p></>}
      {hasCreated && <><div className={css.stageHeading}><h3>{t.createdAllocation}</h3><span>{createdDays} {t.personDays}</span></div>
        {createdTasks.map((task, i) => <div className={css.result} key={task.itemKey || i}><strong>{t.stageLabels[task.stage as Stage]} · {task.title}</strong><small>{task.start} — {task.end} · {task.days} {t.personDays} · {t.created}</small>{task.itemKey && <div className={css.itemLink}><span>{task.itemKey}</span><TomatoLinkButton itemKey={task.itemKey} /></div>}{task.skipped?.length ? <small>{t.skippedFields}：{task.skipped.join('、')}</small> : null}</div>)}
      </>}
      {rangeCount > 0 && <><div className={css.stageHeading}><h3>{t.currentStages}</h3><span>{t.total} <b>{total}</b> / {count} {t.personDays}{total < count - 1e-6 && <> · {t.unallocated} {Number((count - total).toFixed(2))}</>}</span></div>
      <p className={css.help}>{t.splitHint}</p>
      <div className={css.stages}>{stages.map(stage => <div key={stage} className={css.stageRow}>
        <label>{t.stageLabels[stage]}<input type="number" min="0.5" step="0.5" inputMode="decimal" placeholder="0" disabled={busy} aria-label={`${t.stageLabels[stage]} ${t.personDays}`} value={drafts[stage].days} onChange={event => setDrafts(current => ({ ...current, [stage]: { ...current[stage], days: event.target.value } }))} /></label>
        <label>{t.taskTitle}<input value={drafts[stage].title} disabled={busy} aria-label={`${t.stageLabels[stage]} ${t.taskTitle}`} onChange={event => setDrafts(current => ({ ...current, [stage]: { ...current[stage], title: event.target.value } }))} /></label>
      </div>)}</div>
      {over && <p className={css.error} role="alert">{t.overAllocate}：{total} &gt; {count} {t.personDays}</p>}
      </>}
      {hasCreated && <p className={css.notice}>{t.locked}</p>}
      {retried && <><p className={css.notice}>{t.retryHint}</p><label><input type="checkbox" checked={confirmRetry} disabled={busy} onChange={event => setConfirmRetry(event.target.checked)} />{t.confirmRetry}</label></>}
      {historyUnits.flatMap(unit => unit.tasks).filter(task => task.status !== 'created').map((task, i) => <div className={css.result} key={i}><strong>{task.title}</strong><small>{task.start} — {task.end} · {task.days} {t.personDays} · {task.status === 'pending' ? t.pending : t.uncertain}</small>{task.itemKey && <div className={css.itemLink}><span>{task.itemKey}</span><TomatoLinkButton itemKey={task.itemKey} /></div>}{task.error && <p className={css.error}>{task.error}</p>}</div>)}
      {error && <p role="alert" className={css.error}>{error}</p>}
    </div>
  </Modal>
}

/** Task changes always persist to Tomato; requirement ranges stay in the calendar. */
function TaskEditor({ task, readOnly, busy: calendarBusy, onClose, onMutate, onNotify, onBugCountChange }: {
  task: HistoryTask; readOnly: boolean; busy: boolean; onClose: () => void
  onNotify: (text: string, error?: boolean) => void
  onBugCountChange: (itemKey: string, count: number) => void
  onMutate: (task: HistoryTask, action: 'move' | 'delete', next?: { start: string; end: string }) => Promise<void>
}) {
  const [start, setStart] = useState(task.start)
  const [end, setEnd] = useState(task.end)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState('')
  const [linking, setLinking] = useState(false)
  const busy = calendarBusy || linking
  const statusLabel = ({ created: '已创建', pending: '待创建', creating: '创建中', uncertain: '待核对' } as Record<string, string>)[task.status] ?? task.status
  async function submit(action: 'move' | 'delete') {
    if (action === 'delete' && !confirmDelete) { setConfirmDelete(true); return }
    setError('')
    try { await onMutate(task, action, { start, end }) } catch (error) { setError(errorText(error)) }
  }
  return <Modal open title={`${t.task} · ${task.itemKey}`} description={task.title} closeLabel={t.close} onClose={() => { if (!busy) onClose() }} className={css.taskDialog!}
    footer={<><Button variant="ghost" disabled={busy} onClick={onClose}>{t.close}</Button>{!readOnly && <><Button variant="outline" disabled={busy} onClick={() => void submit('delete')}>{confirmDelete ? t.confirmDelete : t.deleteTask}</Button><Button variant="primary" disabled={busy || !daysIn(start, end) || (start === task.start && end === task.end)} onClick={() => void submit('move')}>{busy ? t.saving : t.saveTaskDates}</Button></>}</>}>
    <div className={css.form}><div className={css.unitSummary}><span>{task.days} {t.personDays}{statusLabel && ` · ${statusLabel}`}</span><TomatoLinkButton itemKey={task.itemKey} /></div>
      <div className={css.twoColumns}>
      <label>{t.start}<input type="date" value={start} disabled={readOnly || busy} onChange={event => setStart(event.target.value)} /></label>
      <label>{t.end}<input type="date" min={start} value={end} disabled={readOnly || busy} onChange={event => setEnd(event.target.value)} /></label>
      </div>
      <TaskBugs itemKey={task.itemKey} readOnly={readOnly} disabled={calendarBusy} request={api} onBusyChange={setLinking} onNotify={onNotify} onCountChange={onBugCountChange} />
      {confirmDelete && <p className={css.notice}>{t.taskDeleteHint}</p>}{error && <p role="alert" className={css.error}>{error}</p>}
    </div>
  </Modal>
}
