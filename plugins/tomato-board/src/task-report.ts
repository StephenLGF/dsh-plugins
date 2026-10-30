type Row = Record<string, unknown>
type Run = (args: string[]) => Promise<unknown>
const row = (value: unknown): Row => value && typeof value === 'object' && !Array.isArray(value) ? value as Row : {}
const text = (value: unknown): string => typeof value === 'string' ? value : textObject(value)
const textObject = (value: unknown): string => value && typeof value === 'object' ? text(row(value).name) : ''
const array = (value: unknown): unknown[] => Array.isArray(value) ? value : []
const fields = (item: Row) => row(item.values ?? item.value)
const date = (value: unknown): string => {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/u.test(value)) return value.slice(0, 10)
  return typeof value === 'number' && Number.isFinite(value) ? new Date(value + 8 * 3600_000).toISOString().slice(0, 10) : ''
}
const stamp = (day: string) => Date.parse(`${day}T00:00:00+08:00`)
const validDate = (day: unknown): day is string => typeof day === 'string' && /^\d{4}-\d{2}-\d{2}$/u.test(day) && Number.isFinite(stamp(day)) && date(stamp(day)) === day
const keyPattern = /^[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-\d+$/u
const reviewStates = new Set(['工时核对', '工时核对中'])
const doneStates = new Set(['已完成'])
const progressStates = new Set(['进行中', '开发中'])

export interface TaskReportInput {
  itemKey: string
  expectedStatus: string
  expectedStart: string
  expectedEnd: string
  expectedActualDays: number | null
  expectedActualStart: string
  expectedActualEnd: string
  days: number
  actualStart: string
  actualEnd: string
}
export interface TaskReportResult {
  itemKey: string
  outcome: 'success' | 'skipped' | 'failed' | 'partial' | 'unknown'
  currentStatus: string
  steps: string[]
  fieldsWritten: boolean
  error?: string
}
export interface TaskReportConstraints { finishRange?: [string, string]; daysMin?: number; daysMax?: number }

export async function loadTaskReportConstraints(run: Run): Promise<TaskReportConstraints> {
  const definitions = await Promise.all(['ActualFinishTime', 'StoryPoint1'].map(key => run(['team', 'field', 'list', '--keyword', key, '--fields', 'property', '--size', '100'])))
  const find = (payload: unknown, key: string) => {
    const values = Array.isArray(payload) ? payload : row(payload).fields
    const definition = array(values).map(row).find(value => value.key === key)
    if (!definition) throw new Error(`无法读取报工字段约束：${key}`)
    return row(definition.property)
  }
  const finish = find(definitions[0], 'ActualFinishTime'); const effort = find(definitions[1], 'StoryPoint1')
  const range = array(finish.range).map(date)
  if (finish.range != null && (range.length !== 2 || range.some(value => !validDate(value)))) throw new Error('无法确认实际完成日期的允许范围')
  return {
    ...(range.length === 2 ? { finishRange: range as [string, string] } : {}),
    ...(typeof effort.min === 'number' ? { daysMin: effort.min } : {}),
    ...(typeof effort.max === 'number' ? { daysMax: effort.max } : {}),
  }
}

function transitions(payload: unknown) {
  if (Array.isArray(payload)) return payload.map(row)
  const value = row(payload)
  for (const key of ['transitions', 'data', 'result']) {
    if (Array.isArray(value[key])) return array(value[key]).map(row)
    if (Array.isArray(row(value[key]).transitions)) return array(row(value[key]).transitions).map(row)
  }
  throw new Error('无法读取 Task 工作流')
}

/** Only follow live, unambiguous business transitions; never approve work hours. */
function nextTransition(currentStatus: string, candidates: Row[]) {
  const review = candidates.filter(value => reviewStates.has(text(value.targetStatus ?? value.status)))
  const done = candidates.filter(value => doneStates.has(text(value.targetStatus ?? value.status)))
  const progress = candidates.filter(value => progressStates.has(text(value.targetStatus ?? value.status)))
  const groups = progressStates.has(currentStatus) ? [review, done] : [progress, review, done]
  const options = groups.find(group => group.some(value => value.disabled === false && text(value.transition))) ?? groups.flat()
  const enabled = options.filter(value => value.disabled === false && text(value.transition))
  if (enabled.length > 1) throw new Error('存在多个报工流转，请在番茄中选择具体分支')
  if (!enabled.length) throw new Error(options.map(value => text(value.disabledReason)).filter(Boolean).join('；') || '当前没有可用的报工流转，请在番茄中检查工作流和必填字段')
  return enabled[0]!
}

export function createTaskReportService(run: Run) {
  return async (input: TaskReportInput, user: Row, start: string, end: string, constraints: TaskReportConstraints = {}): Promise<TaskReportResult> => {
    const result: TaskReportResult = { itemKey: String(input.itemKey ?? ''), outcome: 'failed', currentStatus: '', steps: [], fieldsWritten: false }
    let mutating = false
    const read = async () => row(await run(['team', 'item', 'view', input.itemKey]))
    const owned = (item: Row) => {
      if (text(item.itemType) !== 'Task') throw new Error('只能对 Task 报工')
      if (!array(fields(item).assignee).map(row).some(owner =>
        (text(user.userId) && text(owner.objectId ?? owner.value) === text(user.userId))
        || (text(user.username) && text(owner.username) === text(user.username)))) throw new Error('只能对当前登录用户负责的 Task 报工')
    }
    try {
      if (!keyPattern.test(input.itemKey) || !validDate(start) || !validDate(end) || end < start
        || !validDate(input.actualStart) || !validDate(input.actualEnd) || input.actualEnd < input.actualStart
        || typeof input.days !== 'number' || !Number.isFinite(input.days) || input.days <= 0 || !Number.isInteger(input.days * 2)) throw new Error('请填写有效的实际日期和工时，最小单位为 0.5 人天')
      if (constraints.finishRange && (input.actualEnd < constraints.finishRange[0] || input.actualEnd > constraints.finishRange[1])) throw new Error(`实际完成日期须在 ${constraints.finishRange.join(' — ')} 范围内`)
      if ((constraints.daysMin != null && input.days < constraints.daysMin) || (constraints.daysMax != null && input.days > constraints.daysMax)) throw new Error('实际工时超出番茄允许范围')
      let item = await read()
      owned(item)
      let value = fields(item)
      result.currentStatus = text(item.status)
      const taskStart = date(value.DateSDate); const taskEnd = date(value.qiwangwanchengriqi)
      if (!taskStart || !taskEnd || taskStart > end || taskEnd < start) throw new Error('Task 已不在所选周，请刷新')
      if (reviewStates.has(result.currentStatus) || doneStates.has(result.currentStatus)) return { ...result, outcome: 'skipped' }
      if (result.currentStatus !== input.expectedStatus || taskStart !== input.expectedStart || taskEnd !== input.expectedEnd
        || date(value.StartDate) !== input.expectedActualStart || date(value.ActualFinishTime) !== input.expectedActualEnd
        || (value.StoryPoint1 == null ? null : Number(value.StoryPoint1)) !== input.expectedActualDays) throw new Error('Task 状态、日期或实际工时已变化，请刷新后重试')
      // Check the first edge before changing any fields.
      nextTransition(result.currentStatus, transitions(await run(['team', 'transition', 'list', input.itemKey])))
      item = await read(); owned(item); value = fields(item)
      if (text(item.status) !== input.expectedStatus || date(value.DateSDate) !== input.expectedStart || date(value.qiwangwanchengriqi) !== input.expectedEnd
        || date(value.StartDate) !== input.expectedActualStart || date(value.ActualFinishTime) !== input.expectedActualEnd
        || (value.StoryPoint1 == null ? null : Number(value.StoryPoint1)) !== input.expectedActualDays) throw new Error('报工前 Task 数据已变化，请刷新后重试')
      const values = { StartDate: stamp(input.actualStart), ActualFinishTime: stamp(input.actualEnd), StoryPoint1: input.days }
      const matches = (item: Row) => {
        const actual = fields(item)
        return date(actual.StartDate) === input.actualStart && date(actual.ActualFinishTime) === input.actualEnd && Number(actual.StoryPoint1) === input.days
          && date(actual.DateSDate) === input.expectedStart && date(actual.qiwangwanchengriqi) === input.expectedEnd
      }
      mutating = true
      await run(['team', 'item', 'edit', input.itemKey, '--values', JSON.stringify(values)])
      item = await read(); value = fields(item)
      result.fieldsWritten = date(value.StartDate) === input.actualStart && date(value.ActualFinishTime) === input.actualEnd && Number(value.StoryPoint1) === input.days
      if (!result.fieldsWritten) throw new Error('实际工时或日期回读不一致，已停止流转，请核对番茄')
      mutating = false
      for (let step = 0; step < 3; step++) {
        owned(item)
        result.currentStatus = text(item.status)
        if (reviewStates.has(result.currentStatus) || doneStates.has(result.currentStatus)) return { ...result, outcome: 'success' }
        const currentStatus = result.currentStatus
        const selected = nextTransition(currentStatus, transitions(await run(['team', 'transition', 'list', input.itemKey])))
        // The workflow lookup can take time; ownership and status may change meanwhile.
        item = await read(); owned(item)
        if (text(item.status) !== currentStatus) throw new Error('流转前 Task 状态已变化，已停止，请刷新后核对')
        if (!matches(item)) throw new Error('流转前 Task 日期或工时已变化，已停止，请刷新后核对')
        mutating = true
        await run(['team', 'transition', 'execute', input.itemKey, '--transition', text(selected.transition)])
        item = await read()
        result.currentStatus = text(item.status)
        if (result.currentStatus !== text(selected.targetStatus ?? selected.status)) throw new Error('流转结果与目标状态不一致，请核对番茄')
        result.steps.push(`${currentStatus} → ${result.currentStatus}`)
        mutating = false
      }
      throw new Error('已达到流转步数限制，请核对番茄')
    } catch (error) {
      result.outcome = mutating ? 'unknown' : result.fieldsWritten || result.steps.length ? 'partial' : 'failed'
      result.error = error instanceof Error ? error.message : '报工失败'
      // A failed write response must never trigger an automatic second write.
      if (mutating) {
        try {
          const actual = await read()
          result.currentStatus = text(actual.status)
          const value = fields(actual)
          result.fieldsWritten = date(value.StartDate) === input.actualStart && date(value.ActualFinishTime) === input.actualEnd && Number(value.StoryPoint1) === input.days
        } catch { /* The outcome remains unknown. */ }
        result.error = `结果待核对，未自动重试：${result.error}`
      }
      return result
    }
  }
}
