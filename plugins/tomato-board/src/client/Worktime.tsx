import { useEffect, useMemo, useRef, useState } from 'react'
import { Modal, Button } from '@deepseek-ai/dsh-client-ui-primitives'
import type { TomatoItem } from './TomatoBoard'
import type { WorktimeMetadata, WorktimeUnit } from '../worktime-model.ts'
import { addDays, calendarStart, dateKey, datesBetween, taskTitle, unitDates, unitHasCreatedTasks } from '../worktime-model.ts'
import { worktimeText as t } from './worktime-locale.ts'
import { AssigneePicker } from './AssigneePicker.tsx'
import css from './worktime.module.css'

type HistoryTask = { itemKey: string; title: string; status: string; start: string; end: string; days: number }
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
const openItem = (itemKey: string) => window.open(`/api/tomato-board/open/${encodeURIComponent(itemKey)}`, '_blank', 'noopener,noreferrer')
const todayKey = () => dateKey(new Date())
const sorted = (units: WorktimeUnit[]) => [...units].sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0))
const daysIn = (start: string, end: string) => { try { return datesBetween(start, end).length } catch { return 0 } }

/** Five-week planning calendar: pick days, then one plan per requirement. */
export function Worktime({ assignee, users, onAssigneeChange, onRefresh }: { assignee: string; users: Array<{ username: string; name: string }>; onAssigneeChange: (username: string) => void; onRefresh: () => void }) {
  const [items, setItems] = useState<TomatoItem[]>([])
  const [anchor, setAnchor] = useState(todayKey)
  const [units, setUnits] = useState<WorktimeUnit[]>([])
  const [history, setHistory] = useState<HistoryTask[]>([])
  const [error, setError] = useState('')
  const [historyError, setHistoryError] = useState('')
  const [loading, setLoading] = useState(false)
  const [version, setVersion] = useState(0)
  const [selectedStory, setSelectedStory] = useState('')
  const [selection, setSelection] = useState<{ start: string; end: string } | null>(null)
  const [choosing, setChoosing] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [editingKey, setEditingKey] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
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
  useEffect(() => { pending.current = selection }, [selection])
  useEffect(() => { readOnlyRef.current = readOnly }, [readOnly])
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true); setError(''); setItems([]); setUnits([])
    const query = encodeURIComponent(assignee)
    void Promise.all([
      api<{ units: WorktimeUnit[] }>(`?assignee=${query}`, undefined, controller.signal).then(data => setUnits(data.units)),
      fetch(`/api/tomato-board/items?assignee=${query}`, { signal: controller.signal, headers: { accept: 'application/json' } }).then(async response => {
        const data = await response.json() as { items?: TomatoItem[]; error?: string }
        if (!response.ok) throw new Error(data.error || t.readFailed)
        setItems(data.items ?? [])
      }),
    ]).catch(error => { if (!controller.signal.aborted) setError(errorText(error)) }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [version, assignee])
  useEffect(() => {
    const controller = new AbortController(); setHistoryError(''); setHistory([])
    void api<{ tasks: HistoryTask[]; truncated?: boolean }>(`/history?start=${start}&end=${end}&assignee=${encodeURIComponent(assignee)}`, undefined, controller.signal).then(data => {
      setHistory(data.tasks)
      if (data.truncated) setHistoryError(t.historyFailed)
    }).catch(error => { if (!controller.signal.aborted) setHistoryError(`${t.historyFailed}：${errorText(error)}`) })
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
      const fresh = await api<{ units: WorktimeUnit[] }>(`?assignee=${encodeURIComponent(assignee)}`)
      setUnits(fresh.units)
      setEditingKey(itemKey); closePicker(); setMessage(t.saved)
    } catch (error) { setError(errorText(error)) } finally { setSaving(false) }
  }
  const knownKeys = new Set(units.flatMap(unit => unit.tasks.flatMap(task => task.itemKey ? [task.itemKey] : [])))
  const remote = history.filter(task => !knownKeys.has(task.itemKey))
  const weeks: string[][] = []
  for (let i = 0; i < dates.length; i += 7) weeks.push(dates.slice(i, i + 7))
  type Bar = { key: string; kind: 'unit' | 'task'; startCol: number; span: number; lane: number; label: string; tip: string; unverified?: boolean; onClick: () => void }
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
    for (const unit of units) {
      const c = clip(unit.start, unit.end)
      if (!c) continue
      bars.push({ key: `u-${unit.id}-${weekStart}`, kind: 'unit', ...c, lane: 0, label: unit.title, tip: `${t.request} · ${unit.itemKey} · ${unit.start} ~ ${unit.end} · ${datesBetween(unit.start, unit.end).length}${t.days}`, onClick: () => setEditingKey(unit.itemKey) })
      for (const [i, task] of unit.tasks.entries()) {
        const tc = clip(task.start, task.end)
        if (!tc) continue
        bars.push({ key: `t-${unit.id}-${i}-${weekStart}`, kind: 'task', ...tc, lane: 0, unverified: task.status !== 'created', label: task.title, tip: task.error || `${t.task} · ${task.start} ~ ${task.end} · ${task.days}${t.personDays}${task.itemKey ? ` · ${task.itemKey}` : ''} · ${task.status === 'created' ? t.created : task.status === 'pending' ? t.pending : t.uncertain}`, onClick: () => setEditingKey(unit.itemKey) })
      }
    }
    for (const task of remote) {
      const c = clip(task.start, task.end)
      if (!c) continue
      bars.push({ key: `r-${task.itemKey}-${weekStart}`, kind: 'task', ...c, lane: 0, label: task.title, tip: `${t.task} · ${task.status} · ${task.itemKey} · ${task.start} ~ ${task.end}`, onClick: () => openItem(task.itemKey) })
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
  const editingUnits = editingKey ? sorted(units.filter(unit => unit.itemKey === editingKey)) : []
  return <div className={css.page}>
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
    {error && !choosing && <p role="alert" className={css.error}>{error}</p>}
    {historyError && <p role="status" className={css.notice}>{historyError}</p>}
    {message && <p role="status" className={css.notice}>{message}</p>}
    <section className={css.calendarArea} aria-label={t.dateSelection}>
      <div className={`${css.calendar} ${dragging ? css.dragging : ''}`}>
        {t.weekdays.map(day => <div className={css.weekday} key={day}>{day}</div>)}
        {weeks.map(weekDates => {
          const bars = buildBars(weekDates)
          return <div className={css.week} key={weekDates[0]}>
            {weekDates.map((day, di) => {
              const selected = range && day >= range[0] && day <= range[1]
              const isToday = day === todayKey()
              return <div key={day} className={`${css.day} ${di < 2 ? css.weekend : ''} ${selected ? css.selectedDay : ''}`}
                data-date={day} onPointerDown={readOnly ? undefined : event => {
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
              {bars.map(bar => <button key={bar.key} type="button" title={bar.tip} onClick={bar.onClick} className={`${css.bar} ${bar.kind === 'unit' ? css.barUnit : bar.unverified ? css.barUnverified : css.barTask}`} style={{ gridColumn: `${bar.startCol} / span ${bar.span}`, gridRow: String(bar.lane + 1) }}>{bar.label}</button>)}
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
    {editingKey && editingUnits.length > 0 && <GroupEditor key={editingKey} itemKey={editingKey} units={editingUnits} onClose={() => setEditingKey('')} onSaved={notice => { setVersion(v => v + 1); onRefresh(); if (notice) setMessage(notice) }} />}
  </div>
}

/** One requirement is one plan: every date range it owns is allocated together. */
function GroupEditor({ itemKey, units, onClose, onSaved }: { itemKey: string; units: WorktimeUnit[]; onClose: () => void; onSaved: (notice?: string) => void }) {
  const title = units[0]?.title || itemKey
  const savedUnits = useRef(units)
  const [meta, setMeta] = useState<WorktimeMetadata | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [cost, setCost] = useState(units[0]?.cost || '')
  const [team, setTeam] = useState(units[0]?.team || '')
  const [category, setCategory] = useState(units[0]?.category || '')
  const [pendingDelete, setPendingDelete] = useState<string | null>(null)
  const [confirmRetry, setConfirmRetry] = useState(false)
  const [ranges, setRanges] = useState<RangeDraft[]>(() => units.map(unit => ({ key: unit.id, id: unit.id, revision: unit.revision, start: unit.start, end: unit.end, locked: unitHasCreatedTasks(unit, units) })))
  // Prefill from the editable batch only: created ranges keep their own history.
  const [drafts, setDrafts] = useState(() => Object.fromEntries(stages.map(stage => {
    const task = units.filter(unit => !unitHasCreatedTasks(unit, units))
      .flatMap(unit => unit.tasks).find(item => item.stage === stage)
    return [stage, { days: task ? String(task.days) : '', title: task?.title || taskTitle(title, stage) }]
  })) as Record<Stage, { days: string; title: string }>)
  // A range that already created Tasks is history; every other range stays editable,
  // so a requirement can be planned again in a later batch.
  const hasCreated = units.some(unit => unit.tasks.some(task => task.status === 'created'))
  const openCount = ranges.filter(range => !range.locked).length
  const retried = units.some(unit => unit.tasks.some(task => task.status !== 'pending' && task.status !== 'created'))
  const count = useMemo(() => {
    const valid = ranges.filter(range => !range.locked && range.start && range.end && range.end >= range.start)
    try { return valid.length ? unitDates(valid).length : 0 } catch { return 0 }
  }, [ranges])
  const plannedCount = useMemo(() => {
    const valid = ranges.filter(range => range.start && range.end && range.end >= range.start)
    try { return valid.length ? unitDates(valid).length : 0 } catch { return 0 }
  }, [ranges])
  const createdTasks = units.flatMap(unit => unit.tasks).filter(task => task.status === 'created')
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
  /** Read the requirement's stored ranges; the server merges touching ones already. */
  async function loadGroup(): Promise<RangeDraft[]> {
    const data = await api<{ units: WorktimeUnit[] }>('?assignee=currentUser()')
    savedUnits.current = data.units.filter(unit => unit.itemKey === itemKey)
    return data.units.filter(unit => unit.itemKey === itemKey)
      .sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0))
      .map(unit => ({ key: unit.id, id: unit.id, revision: unit.revision, start: unit.start, end: unit.end, locked: unitHasCreatedTasks(unit, data.units) }))
  }
  /** Persist ranges first so creation always sees the exact saved revisions. */
  async function persistRanges(): Promise<Array<{ id: string; revision: number }>> {
    const open = ranges.filter(range => !range.locked)
    if (!open.length) throw new Error(t.rangeEmpty)
    for (const range of open) {
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
    return next.filter(range => !range.locked && range.id).map(range => ({ id: range.id!, revision: range.revision ?? 0 }))
  }
  async function saveRanges() {
    setBusy(true); setError('')
    try { await persistRanges(); onSaved(t.saved); onClose() } catch (error) { setError(errorText(error)) } finally { setBusy(false) }
  }
  /** A plan that already created Tasks asks once more before it is removed. */
  async function askRemove(range: RangeDraft) {
    if (busy) return
    if (range.locked && pendingDelete !== range.key) { setPendingDelete(range.key); setError(''); return }
    setPendingDelete(null)
    await removeRange(range)
  }
  /** Removing a saved range takes effect immediately; unsaved rows just disappear. */
  async function removeRange(range: RangeDraft) {
    if (busy) return
    if (!range.id) { setRanges(current => current.filter(value => value.key !== range.key)); return }
    setBusy(true); setError('')
    try {
      await api('/delete', { id: range.id, revision: range.revision ?? 0 })
      // The remaining ranges may now touch and be merged; reload them.
      setRanges(await loadGroup())
      onSaved(t.rangeRemoved)
    } catch (error) { setError(errorText(error)) } finally { setBusy(false) }
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
    footer={<><Button variant="ghost" disabled={busy} onClick={onClose}>{t.close}</Button><Button variant="outline" disabled={busy || !openCount} onClick={() => void saveRanges()}>{busy ? t.saving : t.saveRanges}</Button><Button variant="primary" disabled={busy || !openCount || !meta || !cost || !team || !category || !inputTasks.length || over || (retried && !confirmRetry)} onClick={() => void create()}>{busy ? t.creating : t.create}</Button></>}>
    <div className={css.form}>
      <div className={css.unitSummary}><span>{itemKey}</span><strong>{plannedCount} {t.days}</strong><button type="button" onClick={() => openItem(itemKey)}>{t.view} ↗</button></div>
      <p className={css.help}>{t.createdAllocation} {createdDays} {t.personDays} · {t.currentCapacity} {count} {t.days}</p>
      <div className={css.stageHeading}><h3>{t.range}</h3><span>{ranges.length}</span></div>
      <p className={css.help}>{t.rangeHint}</p>
      <div className={css.ranges}>{ranges.map((range, index) => <div className={css.rangeRow} key={range.key}>
        <input type="date" aria-label={`${t.start}${index + 1}`} value={range.start} disabled={range.locked || busy} onChange={event => changeRange(range.key, { start: event.target.value })} />
        <span>—</span>
        <input type="date" aria-label={`${t.end}${index + 1}`} min={range.start} value={range.end} disabled={range.locked || busy} onChange={event => changeRange(range.key, { end: event.target.value })} />
        <small>{daysIn(range.start, range.end)} {t.days}{range.locked ? ` · ${t.created}` : ''}</small>
        <button type="button" aria-label={t.removeRange} disabled={busy} className={pendingDelete === range.key ? css.danger : undefined} onClick={() => void askRemove(range)}>{pendingDelete === range.key ? t.confirmDelete : t.removeRange}</button>
      </div>)}</div>
      <button type="button" className={css.addRange} disabled={busy} onClick={() => setRanges(current => [...current, { key: crypto.randomUUID(), start: '', end: '' }])}>{t.addRange}</button>
      {!meta && !error && <p role="status">{t.loading}</p>}
      {meta && <><div className={css.twoColumns}><label>{t.project}<input readOnly value={meta.project} /></label><label>{t.owner}<input readOnly value={meta.assigneeName} /></label>{renderSelect(t.cost, cost, meta.costs, setCost)}{renderSelect(t.team, team, meta.teams, setTeam)}{renderSelect(t.category, category, meta.categories, setCategory)}</div><p className={css.help}>{meta.suggestionSource}</p></>}
      {hasCreated && <><div className={css.stageHeading}><h3>{t.createdAllocation}</h3><span>{createdDays} {t.personDays}</span></div>
        {createdTasks.map((task, i) => <div className={css.result} key={task.itemKey || i}><strong>{t.stageLabels[task.stage as Stage]} · {task.title}</strong><small>{task.start} — {task.end} · {task.days} {t.personDays} · {t.created}</small>{task.itemKey && <button type="button" onClick={() => openItem(task.itemKey!)}>{task.itemKey} ↗</button>}{task.skipped?.length ? <small>{t.skippedFields}：{task.skipped.join('、')}</small> : null}</div>)}
      </>}
      {openCount > 0 && <><div className={css.stageHeading}><h3>{t.currentStages}</h3><span>{t.total} <b>{total}</b> / {count} {t.personDays}{total < count - 1e-6 && <> · {t.unallocated} {Number((count - total).toFixed(2))}</>}</span></div>
      <p className={css.help}>{t.splitHint}</p>
      <div className={css.stages}>{stages.map(stage => <div key={stage} className={css.stageRow}>
        <label>{t.stageLabels[stage]}<input type="number" min="0.5" step="0.5" inputMode="decimal" placeholder="0" disabled={busy} aria-label={`${t.stageLabels[stage]} ${t.personDays}`} value={drafts[stage].days} onChange={event => setDrafts(current => ({ ...current, [stage]: { ...current[stage], days: event.target.value } }))} /></label>
        <label>{t.taskTitle}<input value={drafts[stage].title} disabled={busy} aria-label={`${t.stageLabels[stage]} ${t.taskTitle}`} onChange={event => setDrafts(current => ({ ...current, [stage]: { ...current[stage], title: event.target.value } }))} /></label>
      </div>)}</div>
      {over && <p className={css.error} role="alert">{t.overAllocate}：{total} &gt; {count} {t.personDays}</p>}
      </>}
      {hasCreated && <p className={css.notice}>{t.locked}</p>}
      {retried && <><p className={css.notice}>{t.retryHint}</p><label><input type="checkbox" checked={confirmRetry} disabled={busy} onChange={event => setConfirmRetry(event.target.checked)} />{t.confirmRetry}</label></>}
      {pendingDelete && <p className={css.notice}>{t.deleteKeepsTasks}</p>}
      {units.flatMap(unit => unit.tasks).filter(task => task.status !== 'created').map((task, i) => <div className={css.result} key={i}><strong>{task.title}</strong><small>{task.start} — {task.end} · {task.days} {t.personDays} · {task.status === 'pending' ? t.pending : t.uncertain}</small>{task.itemKey && <button type="button" onClick={() => openItem(task.itemKey!)}>{task.itemKey} ↗</button>}{task.error && <p className={css.error}>{task.error}</p>}</div>)}
      {error && <p role="alert" className={css.error}>{error}</p>}
    </div>
  </Modal>
}
