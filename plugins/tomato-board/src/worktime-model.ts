/** Durable calendar units and their individually verified Tomato tasks. */
export interface WorktimeTask {
  stage: string
  title: string
  days: number
  start: string
  end: string
  itemKey?: string
  status: 'pending' | 'creating' | 'created' | 'uncertain'
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

/**
 * Allocate person-days across one requirement's ordered dates. Half days are the
 * smallest unit, so two stages may share a date; a plan may leave time
 * unallocated but may never exceed the planned total.
 */
export function allocateGroupTasks(dates: string[], tasks: Array<{ stage: string; title: string; days: number }>): WorktimeTask[] {
  if (!dates.length) throw new Error('请先选择需求的日期')
  if (!tasks.length || tasks.length > 20) throw new Error('请填写至少一个阶段的人天')
  let spent = 0
  const result = tasks.map(task => {
    if (!['understand', 'design', 'develop', 'verify', 'bugfix'].includes(task.stage)
      || !task.title.trim() || task.title.length > 240 || !Number.isFinite(task.days) || task.days <= 0) throw new Error('任务标题或人天无效')
    if (task.days < 0.5 - 1e-9) throw new Error('每个阶段至少 0.5 人天')
    if (Math.abs(task.days * 2 - Math.round(task.days * 2)) > 1e-9) throw new Error('每个阶段需按 0.5 人天递增')
    const first = Math.floor(spent + 1e-8)
    spent += task.days
    const last = Math.ceil(spent - 1e-8) - 1
    return { ...task, title: task.title.trim(), start: dates[first] ?? '', end: dates[last] ?? '', status: 'pending' as const }
  })
  if (spent > dates.length + 1e-6) throw new Error(`阶段合计不能大于 ${dates.length} 人天，当前为 ${Number(spent.toFixed(4))} 人天`)
  return result
}

/** Allocate fractional person-days over one continuous range. */
export function allocateTasks(start: string, end: string, tasks: Array<{ stage: string; title: string; days: number }>): WorktimeTask[] {
  return allocateGroupTasks(datesBetween(start, end), tasks)
}
