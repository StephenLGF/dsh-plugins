/** Work items supported by the scheduling/reporting tools. Creation remains Task. */
export const scheduledTaskTypes = ['Task', '跟踪任务'] as const
export const scheduledTaskIql = `类型 in ${JSON.stringify(scheduledTaskTypes)}`
export function isScheduledTask(type: string): boolean {
  return (scheduledTaskTypes as readonly string[]).includes(type)
}
