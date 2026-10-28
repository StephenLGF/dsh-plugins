export interface TeamPeriod { start: string; end: string }
type Fields = Record<string, unknown>
export function teamDate(value: unknown): string {
  if (typeof value !== 'string' && typeof value !== 'number') return ''
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/u.test(value)) {
    const time = Date.parse(`${value}T00:00:00Z`)
    return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? value : ''
  }
  const time = typeof value === 'number' ? value : Date.parse(value)
  return Number.isFinite(time) ? new Date(time + 8 * 3600_000).toISOString().slice(0, 10) : ''
}
export function teamPeriod(start: unknown, end: unknown): TeamPeriod {
  const period = { start: teamDate(start), end: teamDate(end) }
  if (!period.start || !period.end || period.end < period.start) throw new Error('迭代缺少有效起止日期，请先在番茄中补全')
  return period
}
const amount = (raw: unknown): number | null => {
  if ((typeof raw !== 'number' && typeof raw !== 'string') || raw === '' || (typeof raw === 'string' && !raw.trim())) return null
  const value = Number(raw)
  return Number.isFinite(value) && value >= 0 ? value : null
}
const days = (start: string, end: string) => Math.round((Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86400000) + 1

/** Story estimates and Task effort have different units and must stay separate. */
export function teamItemMetrics(itemType: string, fields: Fields, inSprint: boolean, period: TeamPeriod) {
  const start = teamDate(fields.DateSDate)
  const end = teamDate(fields.qiwangwanchengriqi)
  const hasDates = Boolean(start && end && end >= start)
  const overlaps = hasDates && start <= period.end && end >= period.start
  if (itemType === 'Task') {
    if (!overlaps) return null
    const plannedDays = amount(fields.planStoryPoint)
    const overlapDays = days(start < period.start ? period.start : start, end > period.end ? period.end : end)
    return { storyPoints: null, plannedDays, periodDays: plannedDays === null ? null : Number((plannedDays * overlapDays / days(start, end)).toFixed(4)), plannedStart: start, plannedEnd: end }
  }
  if (!['Story', 'EnablerStory'].includes(itemType) || (hasDates ? !overlaps : !inSprint)) return null
  return { storyPoints: amount(fields.StoryPoint), plannedDays: null, periodDays: null, plannedStart: start, plannedEnd: end }
}
