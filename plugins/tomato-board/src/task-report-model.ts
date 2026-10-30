import { addDays, datesBetween } from './worktime-model.ts'

/** Reporting weeks follow Monday–Sunday, independently of the calendar viewport. */
export function reportWeek(day: string): string {
  const weekday = new Date(`${day}T00:00:00Z`).getUTCDay()
  return addDays(day, -((weekday + 6) % 7))
}

/** At most two selected Tasks share one person-day, in half-day units. */
export function suggestReportDays(tasks: Array<{ itemKey: string; start: string; end: string }>, start: string) {
  const days: Record<string, number> = Object.fromEntries(tasks.map(task => [task.itemKey, 0]))
  const conflicts: Array<{ date: string; itemKeys: string[] }> = []
  for (const date of datesBetween(start, addDays(start, 6))) {
    const active = tasks.filter(task => task.start <= date && date <= task.end)
    if (active.length > 2) {
      conflicts.push({ date, itemKeys: active.map(task => task.itemKey) })
      continue
    }
    for (const task of active) days[task.itemKey]! += active.length === 2 ? .5 : 1
  }
  return { days, conflicts }
}
