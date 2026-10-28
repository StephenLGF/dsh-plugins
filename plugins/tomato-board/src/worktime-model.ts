/** Durable calendar units and their individually verified Tomato tasks. */
export interface WorktimeTask {
  stage: string
  title: string
  days: number
  start: string
  end: string
  itemKey?: string
  status: 'pending' | 'creating' | 'created' | 'uncertain'
  /** One date per allocated half-day; preserves gaps when calendar ranges change. */
  allocationSlots?: string[]
  error?: string
  /** Optional Task fields omitted because the create screen only accepts another range. */
  skipped?: string[]
}

/** A continuous date selection remains one operation across task creation. */
export interface WorktimeUnit {
  id: string
  itemKey: string
  title: string
  workspace: string
  start: string
  end: string
  revision: number
  updatedAt: string
  assignees?: string[]
  project?: string
  team?: string
  cost?: string
  category?: string
  tasks: WorktimeTask[]
}

/** A Task may cover several ranges even though its record belongs to the first. */
export function unitHasCreatedTasks(unit: WorktimeUnit, units: WorktimeUnit[]): boolean {
  return units.some(owner => owner.itemKey === unit.itemKey && owner.tasks.some(task =>
    task.status === 'created' && task.start <= unit.end && task.end >= unit.start))
}

export type WorktimeTaskChange = { itemKey: string; action: 'delete' }
  | { itemKey: string; action: 'move'; start: string; end: string }

/** Render an in-flight change without modifying the last server snapshot. */
export function applyTaskChange<T extends { itemKey?: string; start: string; end: string; allocationSlots?: string[] }>(tasks: T[], change: WorktimeTaskChange | null): T[] {
  if (!change) return tasks
  return tasks.flatMap(task => {
    if (task.itemKey !== change.itemKey) return [task]
    if (change.action === 'delete') return []
    const next = { ...task, start: change.start, end: change.end }
    delete next.allocationSlots
    return [next]
  })
}

export type WorktimeRequirementChange = { action: 'move'; id: string; delta: number }
  | { action: 'resize'; id: string; start: string; end: string }

/** Join touching ranges without changing any Task dates or creation records. */
export function mergeRequirementRanges(units: WorktimeUnit[], itemKey: string, preserveAllocated = false): WorktimeUnit[] {
  const group = units.filter(unit => unit.itemKey === itemKey).sort((a, b) => a.start.localeCompare(b.start) || a.id.localeCompare(b.id))
  const merged: WorktimeUnit[] = []
  for (const unit of group) {
    const previous = merged.at(-1)
    const locked = preserveAllocated && previous && (unitHasCreatedTasks(unit, units) || unitHasCreatedTasks(previous, units)
      || unit.tasks.some(task => task.status !== 'pending') || previous.tasks.some(task => task.status !== 'pending'))
    if (previous && !locked && unit.start <= addDays(previous.end, 1)) {
      merged[merged.length - 1] = { ...previous, end: previous.end > unit.end ? previous.end : unit.end,
        tasks: [...previous.tasks, ...unit.tasks], revision: Math.max(previous.revision, unit.revision) + 1,
        updatedAt: previous.updatedAt > unit.updatedAt ? previous.updatedAt : unit.updatedAt,
        assignees: [...new Set([...(previous.assignees ?? []), ...(unit.assignees ?? [])])],
        cost: previous.cost || unit.cost || '', team: previous.team || unit.team || '', category: previous.category || unit.category || '' }
    } else merged.push(unit)
  }
  const survivors = new Map(merged.map(unit => [unit.id, unit]))
  return units.flatMap(unit => unit.itemKey !== itemKey ? [unit] : survivors.has(unit.id) ? [survivors.get(unit.id)!] : [])
}

/** Change one range, then merge its continuous neighbours; Task dates stay unchanged. */
export function applyRequirementChange(units: WorktimeUnit[], change: WorktimeRequirementChange | null): WorktimeUnit[] {
  if (!change) return units
  const active = units.find(unit => unit.id === change.id)
  if (!active) return units
  const next = units.map(unit => {
    if (change.action === 'resize') return unit.id === change.id ? { ...unit, start: change.start, end: change.end } : unit
    if (unit.id !== change.id) return unit
    return { ...unit, start: addDays(unit.start, change.delta), end: addDays(unit.end, change.delta) }
  })
  return mergeRequirementRanges(next, active.itemKey)
}

/** Use calendar dates across week boundaries for both the drag preview and its saved result. */
export function calendarDragAllowed(active: { start: string; end: string }, edge: 'move' | 'start' | 'end', target: string): boolean {
  return edge === 'move' || (edge === 'start' ? target <= active.end : target >= active.start)
}

export function calendarDragRanges(ranges: Array<{ start: string; end: string }>, active: { start: string; end: string }, anchor: string,
  edge: 'move' | 'start' | 'end', target: string): Array<{ start: string; end: string }> {
  if (!calendarDragAllowed(active, edge, target)) return [{ start: active.start, end: active.end }]
  if (edge === 'start') return [{ start: target, end: active.end }]
  if (edge === 'end') return [{ start: active.start, end: target }]
  const delta = Math.round((Date.parse(`${target}T12:00:00Z`) - Date.parse(`${anchor}T12:00:00Z`)) / 86400000)
  return ranges.map(range => ({ start: addDays(range.start, delta), end: addDays(range.end, delta) }))
}

/** Creation metadata is discovered from the story and current Task screen. */
export interface WorktimeMetadata {
  project: string
  assignee: string
  assigneeName: string
  teams: string[]
  costs: string[]
  categories: string[]
  suggestedTeam: string
  suggestedCost: string
  suggestionSource: string
  actualRange: string[] | null
}

/** Format a browser-local calendar date without UTC conversion. */
export function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

/** Add calendar days using local noon to avoid daylight-saving midnight gaps. */
export function addDays(value: string, days: number): string {
  const date = new Date(`${value}T12:00:00`)
  date.setDate(date.getDate() + days)
  return dateKey(date)
}

/** Inclusive, bounded dates; rejects invalid or reversed selections. */
export function datesBetween(start: string, end: string): string[] {
  const valid = (s: string) => /^\d{4}-\d{2}-\d{2}$/u.test(s) && dateKey(new Date(`${s}T12:00:00`)) === s
  if (!valid(start) || !valid(end) || end < start) throw new Error('请选择有效的连续日期')
  const dates: string[] = []
  for (let day = start; day <= end; day = addDays(day, 1)) {
    if (dates.length >= 366) throw new Error('一次安排最多 366 天')
    dates.push(day)
  }
  return dates
}

/** The five-week view starts two Saturdays before the anchor's week. */
export function calendarStart(anchor: string): string {
  const day = new Date(`${anchor}T12:00:00`).getDay()
  return addDays(anchor, -((day + 1) % 7) - 14)
}

/** Generate descriptive editable titles from the requirement and phase. */
export function taskTitle(story: string, stage: string): string {
  const subject = story.replace(/^[【\[].*?[】\]]\s*/u, '').replace(/[-—]\s*(前端|后端)\s*$/u, '').trim()
  const capability = subject.replace(/支持/u, '的')
  switch (stage) {
    case 'understand': return `梳理${capability}需求与现有项目实现`
    case 'design': return `设计${capability}的技术方案与实现路径`
    case 'develop': return `实现${capability}能力并完成集成`
    case 'verify': return `验证${capability}功能与边界场景`
    case 'bugfix': return `定位并修复${subject}相关问题`
    default: throw new Error('未知任务阶段')
  }
}

/** Every planned date of one requirement, de-duplicated and chronological. */
export function unitDates(units: Array<{ start: string; end: string }>): string[] {
  const dates = new Set<string>()
  for (const unit of units) for (const day of datesBetween(unit.start, unit.end)) dates.add(day)
  return [...dates].sort()
}

/** Recover old allocations once, and retain exact half-day dates for subsequent batches. */
export function plannedTaskSlots(dates: string[], tasks: WorktimeTask[]): Map<WorktimeTask, string[]> {
  const used = new Map<string, number>()
  const seen = new Set<string>()
  const allocations = new Map<WorktimeTask, string[]>()
  const confirmed = tasks.filter(task => task.status === 'created').sort((a, b) => a.end.localeCompare(b.end) || b.start.localeCompare(a.start))
  const reserve = (day: string) => used.set(day, (used.get(day) ?? 0) + 1)
  // Saved allocations are authoritative even when the enclosing range moves.
  for (const task of confirmed) {
    if (task.itemKey && seen.has(task.itemKey)) continue
    if (!task.allocationSlots || task.allocationSlots.length !== Math.round(task.days * 2)
      || task.allocationSlots.some(day => day < task.start || day > task.end)) continue
    allocations.set(task, [...task.allocationSlots])
    task.allocationSlots.forEach(reserve)
    if (task.itemKey) seen.add(task.itemKey)
  }
  for (const task of confirmed) {
    if (allocations.has(task)) continue
    if (task.itemKey && seen.has(task.itemKey)) continue
    if (task.itemKey) seen.add(task.itemKey)
    let remaining = Math.ceil(task.days * 2 - 1e-8)
    if (!Number.isSafeInteger(remaining) || remaining <= 0) throw new Error('已有 Task 的人天无效，请先核对')
    const slots: string[] = []
    const relevant = dates.filter(day => day >= task.start && day <= task.end)
    const candidates = [...relevant, ...datesBetween(task.start, task.end).filter(day => !relevant.includes(day))]
    for (const day of candidates) {
      const taken = Math.min(remaining, Math.max(0, 2 - (used.get(day) ?? 0)))
      used.set(day, (used.get(day) ?? 0) + taken)
      slots.push(...Array<string>(taken).fill(day))
      remaining -= taken
      if (!remaining) break
    }
    allocations.set(task, slots.sort())
  }
  return allocations
}

/** Remaining half-day slots; the wider context recovers legacy multi-range Tasks. */
export function availableWorktimeSlots(dates: string[], tasks: WorktimeTask[], contextDates = dates): string[] {
  const used = new Map<string, number>()
  for (const slots of plannedTaskSlots(contextDates, tasks).values()) for (const day of slots) used.set(day, (used.get(day) ?? 0) + 1)
  return [...new Set(dates)].sort().flatMap(day => Array<string>(Math.max(0, 2 - (used.get(day) ?? 0))).fill(day))
}

/**
 * Allocate person-days across one requirement's ordered dates. Half days are the
 * smallest unit, so two stages may share a date; a plan may leave time
 * unallocated but may never exceed the planned total.
 */
export function allocateGroupTasks(dates: string[], tasks: Array<{ stage: string; title: string; days: number }>, existing: WorktimeTask[] = [], contextDates = dates): WorktimeTask[] {
  if (!dates.length) throw new Error('请先选择需求的日期')
  if (!tasks.length || tasks.length > 20) throw new Error('请填写至少一个阶段的人天')
  const slots = availableWorktimeSlots(dates, existing, contextDates)
  if (!slots.length) throw new Error('该时间段已创建 Task，当前没有剩余人天，请延长时间段后再安排')
  let spent = 0
  const result = tasks.map(task => {
    if (!['understand', 'design', 'develop', 'verify', 'bugfix'].includes(task.stage)
      || !task.title.trim() || task.title.length > 240 || !Number.isFinite(task.days) || task.days <= 0) throw new Error('任务标题或人天无效')
    if (task.days < 0.5 - 1e-9) throw new Error('每个阶段至少 0.5 人天')
    if (Math.abs(task.days * 2 - Math.round(task.days * 2)) > 1e-9) throw new Error('每个阶段需按 0.5 人天递增')
    const first = Math.round(spent * 2)
    spent += task.days
    const last = Math.round(spent * 2) - 1
    return { ...task, title: task.title.trim(), start: slots[first] ?? '', end: slots[last] ?? '', allocationSlots: slots.slice(first, last + 1), status: 'pending' as const }
  })
  if (spent > slots.length / 2 + 1e-6) throw new Error(`阶段合计不能大于剩余 ${slots.length / 2} 人天，当前为 ${Number(spent.toFixed(4))} 人天`)
  return result
}

/** Allocate fractional person-days over one continuous range. */
export function allocateTasks(start: string, end: string, tasks: Array<{ stage: string; title: string; days: number }>): WorktimeTask[] {
  return allocateGroupTasks(datesBetween(start, end), tasks)
}
