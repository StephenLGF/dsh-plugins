import { readFile, mkdir, writeFile, rename, open, unlink } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { randomUUID, createHash } from 'node:crypto'
import type { Context } from '@deepseek-ai/cordis'
import { addDays, allocateGroupTasks, datesBetween, unitDates, unitHasCreatedTasks } from './worktime-model.ts'
import type { WorktimeMetadata, WorktimeUnit } from './worktime-model.ts'

type RecordValue = Record<string, unknown>
interface Request {
  method?: string
  url?: string
  headers?: Record<string, string | string[] | undefined>
  [Symbol.asyncIterator]?: () => AsyncIterator<Uint8Array | string>
}
interface Response {
  statusCode: number
  setHeader(name: string, value: string): void
  end(body?: string): void
}
interface Server {
  register(route: { kind: 'exact'; path: string; handler: (request: Request, response: Response) => Promise<void> }): () => void
}
interface Dependencies {
  server: Server
  run(args: string[]): Promise<unknown>
  crossSite(request: Request): boolean
  dataFile?: string
  scope: string
  invalidate(): void
}
interface Store { version: 1; units: WorktimeUnit[] }
const keyPattern = /^[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-\d+$/u
const record = (value: unknown): RecordValue => value && typeof value === 'object' && !Array.isArray(value) ? value as RecordValue : {}
const text = (value: unknown): string => typeof value === 'string' ? value : Array.isArray(value) ? text(value[0]) : value && typeof value === 'object' ? text(record(value).name ?? record(value).label ?? record(value).value) : ''
const list = (value: unknown): unknown[] => Array.isArray(value) ? value : []
const fieldValues = (raw: unknown) => record(record(raw).values ?? record(raw).value)
const localDate = (value: unknown): string => {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/u.test(value)) return value.slice(0, 10)
  if (typeof value !== 'number') return ''
  return new Date(value + 8 * 3600_000).toISOString().slice(0, 10)
}
const timestamp = (value: string) => Date.parse(`${value}T00:00:00+08:00`)

async function body(request: Request): Promise<RecordValue> {
  if (!request[Symbol.asyncIterator]) throw new Error('请求不支持 JSON 正文')
  let value = ''
  for await (const chunk of request as Required<Pick<Request, typeof Symbol.asyncIterator>>) {
    value += typeof chunk === 'string' ? chunk : Buffer.from(chunk).toString('utf8')
    if (Buffer.byteLength(value) > 64 * 1024) throw new Error('请求内容过大')
  }
  return record(JSON.parse(value))
}

function validateUnit(value: RecordValue): Pick<WorktimeUnit, 'id' | 'itemKey' | 'title' | 'workspace' | 'start' | 'end'> {
  if (typeof value.id !== 'string' || !/^[a-zA-Z0-9-]{8,80}$/u.test(value.id)
    || typeof value.itemKey !== 'string' || !keyPattern.test(value.itemKey)
    || typeof value.start !== 'string' || typeof value.end !== 'string') throw new Error('无效的需求或日期安排')
  datesBetween(value.start, value.end)
  return { id: value.id, itemKey: value.itemKey, title: '', workspace: '', start: value.start, end: value.end }
}

async function storyContext(run: Dependencies['run'], itemKey: string) {
  if (!keyPattern.test(itemKey)) throw new Error('无效的需求编号')
  const story = record(await run(['team', 'item', 'view', itemKey]))
  if (!['Story', 'EnablerStory', 'Bug', '测试缺陷', '线上Bug', '升级问题'].includes(text(story.itemType))) throw new Error('请选择故事或缺陷需求')
  const workspace = text(record(story.workspace).key)
  const fields = fieldValues(story)
  const project = text(fields.view_project)
  if (!workspace || !project) throw new Error('需求缺少所属空间或所属项目，请先在番茄中补全')
  const assignees = list(fields.assignee).map(record)
  if (!assignees.length || assignees.some(user => !text(user.objectId))) throw new Error('需求未设置有效负责人，请先在番茄中补全')
  return { story, fields, workspace, project, assignees }
}

async function metadata(run: Dependencies['run'], itemKey: string) {
  const context = await storyContext(run, itemKey)
  const { project, workspace, assignees, fields } = context
  const rawFields = await run(['team', 'field', 'workspace', '--workspace', workspace, '--item-type', 'Task', '--fields', 'data,property'])
  const definitions = list(rawFields).map(record)
  if (!definitions.length) throw new Error('无法读取 Task 创建字段')
  const options = (key: string) => {
    const field = definitions.find(field => field.key === key)
    return list(record(field?.data).customData ?? record(field?.schema).options).map(record).map(option => ({ label: text(option.label), value: text(option.value) }))
  }
  const iql = `所属空间 = ${JSON.stringify(text(record(context.story.workspace).name))} and 类型 = Task and view_project = ${JSON.stringify(project)} order by 创建时间 desc`
  const recent = record(await run(['team', 'item', 'search', '--iql', iql, '--size', '10', '--fields', 'key,Dropdown2,suoshutuandui']))
  const recentValues = list(recent.items).map(fieldValues)
  const unanimous = (key: string) => { const values = [...new Set(recentValues.map(value => text(value[key])).filter(Boolean))]; return values.length === 1 ? values[0]! : '' }
  const range = list(record(definitions.find(field => field.key === 'ActualFinishTime')?.property).range).map(localDate).filter(Boolean)
  const data: WorktimeMetadata = {
    project, assignee: assignees.map(user => text(user.objectId)).join(','), assigneeName: assignees.map(user => text(user.label ?? user.username ?? user.objectId)).join('、'),
    teams: options('suoshutuandui').map(option => option.label), costs: options('Dropdown2').map(option => option.label),
    categories: options('Dropdown_task').map(option => option.label).filter(value => ['软件开发', '修复BUG', 'bug修复', 'Bug修复'].includes(value)),
    suggestedTeam: text(fields.suoshutuandui) || unanimous('suoshutuandui'), suggestedCost: text(fields.Dropdown2) || unanimous('Dropdown2'),
    suggestionSource: recentValues.length ? '继承需求字段；空值参考同项目近期 Task 的一致取值，请核对' : '继承需求字段；缺失项请手动选择',
    actualRange: range.length === 2 ? range : null,
  }
  return { context, definitions, options, data }
}


/** Gitee Team user fields take label/nickname/username/value objects, never LeanCloud pointers. */
function userValue(user: RecordValue): RecordValue {
  const nickname = text(user.nickname); const username = text(user.username)
  const label = text(user.label) || (nickname && username ? `${nickname}(${username})` : username || nickname)
  return Object.fromEntries([['label', label], ['nickname', nickname], ['username', username], ['value', text(user.objectId)]]
    .filter(([, value]) => value !== '')) as RecordValue
}

/** One requirement is one plan, so touching or overlapping ranges merge into one unit. */
function mergeRanges(store: Store, itemKey: string): WorktimeUnit | undefined {
  const group = store.units.filter(unit => unit.itemKey === itemKey)
    .sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0))
  let previous: WorktimeUnit | undefined
  for (const unit of group) {
    if (previous) {
      // A range with a created Task keeps its own history and never absorbs its neighbour.
      const locked = unitHasCreatedTasks(unit, store.units) || unitHasCreatedTasks(previous, store.units)
        || unit.tasks.some(task => task.status !== 'pending') || previous.tasks.some(task => task.status !== 'pending')
      if (!locked && unit.start <= addDays(previous.end, 1)) {
        if (unit.end > previous.end) previous.end = unit.end
        if (!previous.cost && unit.cost) previous.cost = unit.cost
        if (!previous.team && unit.team) previous.team = unit.team
        if (!previous.category && unit.category) previous.category = unit.category
        previous.revision += 1
        previous.updatedAt = new Date().toISOString()
        store.units.splice(store.units.indexOf(unit), 1)
        continue
      }
    }
    previous = unit
  }
  return store.units.find(unit => unit.itemKey === itemKey)
}

/** The unit that now owns a date the caller used to address. */
function survivor(store: Store, itemKey: string, day: string): WorktimeUnit | undefined {
  return store.units.find(unit => unit.itemKey === itemKey && unit.start <= day && day <= unit.end)
    ?? store.units.find(unit => unit.itemKey === itemKey)
}

/** Register durable planning and verified task-creation routes within the workboard. */
export function registerWorktime(ctx: Context, deps: Dependencies): void {
  const hash = createHash('sha256').update(deps.scope).digest('hex').slice(0, 16)
  const file = deps.dataFile || join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'tomato-worktime', `${hash}.json`)
  const load = async (): Promise<Store> => {
    let raw: string
    try { raw = await readFile(file, 'utf8') } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { version: 1, units: [] }
      throw error
    }
    const value = JSON.parse(raw) as Store
    if (value.version !== 1 || !Array.isArray(value.units)) throw new Error('历史工时数据格式异常，已保留原文件')
    return value
  }
  const save = async (store: Store) => {
    await mkdir(dirname(file), { recursive: true, mode: 0o700 })
    const temp = `${file}.${randomUUID()}.tmp`
    await writeFile(temp, JSON.stringify(store, null, 2) + '\n', { mode: 0o600, flag: 'wx' })
    await rename(temp, file)
  }
  let queue: Promise<unknown> = Promise.resolve()
  const serial = <T,>(fn: () => Promise<T>): Promise<T> => {
    const next = queue.then(async () => {
      await mkdir(dirname(file), { recursive: true, mode: 0o700 })
      let lock
      try { lock = await open(`${file}.lock`, 'wx', 0o600) } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'EEXIST') throw new Error('工时记录正在由其他工作台修改，请稍后刷新；异常退出遗留锁需先核对创建结果')
        throw error
      }
      try { return await fn() } finally { await lock.close(); await unlink(`${file}.lock`) }
    })
    queue = next.catch(() => undefined)
    return next
  }
  const route = (path: string, method: string, action: (request: Request, query: URLSearchParams) => Promise<unknown>) => {
    ctx.effect(() => deps.server.register({ kind: 'exact', path, async handler(request, response) {
      const send = (status: number, value: unknown) => { response.statusCode = status; response.setHeader('content-type', 'application/json; charset=utf-8'); response.setHeader('cache-control', 'no-store'); response.end(JSON.stringify(value)) }
      if (request.method !== method) return send(405, { error: 'Method not allowed' })
      if (method !== 'GET' && deps.crossSite(request)) return send(403, { error: '拒绝跨站修改请求' })
      try { send(200, await action(request, new URL(request.url ?? path, 'http://localhost').searchParams)) }
      catch (error) { send(400, { error: error instanceof Error ? error.message : '工时操作失败' }) }
    } }), `tomato-board: ${path}`)
  }
  route('/api/tomato-board/worktime', 'GET', async (_, query) => {
    const store = await load()
    const assignee = query.get('assignee')
    if (!assignee) return store
    if (assignee !== 'currentUser()' && !/^[A-Za-z0-9_.@-]{1,128}$/u.test(assignee)) throw new Error('无效的负责人')
    // Local plans belong to the current login; another user is read-only and shows only remote tasks.
    return assignee === 'currentUser()' ? store : { ...store, units: [] }
  })
  route('/api/tomato-board/worktime/metadata', 'GET', async (_, query) => (await metadata(deps.run, query.get('itemKey') ?? '')).data)
  route('/api/tomato-board/worktime/ranges', 'POST', async request => {
    const input = await body(request)
    const itemKey = String(input.itemKey ?? '')
    const ranges = list(input.ranges).map(value => validateUnit({ ...record(value), itemKey }))
    if (!ranges.length || new Set(ranges.map(range => range.id)).size !== ranges.length) throw new Error('请选择有效且不重复的时间段')
    return serial(async () => {
      const store = await load()
      const group = store.units.filter(unit => unit.itemKey === itemKey)
      const claims = list(input.units).map(record)
      if (group.length !== claims.length || group.some(unit => !claims.some(claim => claim.id === unit.id && claim.revision === unit.revision))) throw new Error('安排已变化，请刷新后编辑')
      if (group.some(unit => !ranges.some(range => range.id === unit.id))) throw new Error('请先通过删除操作移除已有时间段')
      const { story, workspace, assignees } = await storyContext(deps.run, itemKey)
      const next = ranges.map(range => {
        const existing = store.units.find(unit => unit.id === range.id)
        if (existing && existing.itemKey !== itemKey) throw new Error('时间段编号已被其他需求使用')
        if (existing && unitHasCreatedTasks(existing, store.units)) {
          if (existing.start !== range.start || existing.end !== range.end) throw new Error('已创建 Task 的时间段不能改动日期')
          return existing
        }
        return { ...existing, ...range, title: text(story.name), workspace, tasks: existing?.tasks ?? [],
          assignees: assignees.flatMap(user => [text(user.username), text(user.objectId)]).filter(Boolean),
          cost: String(input.cost ?? existing?.cost ?? ''), team: String(input.team ?? existing?.team ?? ''), category: String(input.category ?? existing?.category ?? ''),
          revision: (existing?.revision ?? 0) + 1, updatedAt: new Date().toISOString(),
        }
      })
      store.units = [...store.units.filter(unit => unit.itemKey !== itemKey), ...next]
      // Merge only after every edit is applied, so absorbed ids cannot be recreated.
      mergeRanges(store, itemKey)
      await save(store)
      return { units: store.units.filter(unit => unit.itemKey === itemKey) }
    })
  })
  route('/api/tomato-board/worktime/unit', 'POST', async request => {
    const input = await body(request)
    const unit = validateUnit(input)
    return serial(async () => {
      const store = await load()
      const existing = store.units.find(value => value.id === unit.id)
      if (!existing && input.revision !== undefined) throw new Error('安排已发生变化，请刷新后编辑')
      if (existing && existing.revision !== input.revision) throw new Error('安排已发生变化，请刷新后编辑')
      if (existing && unitHasCreatedTasks(existing, store.units)) throw new Error('已创建 Task 的时间段不能改动日期；请新增安排以保留历史')
      const { story, workspace, assignees } = await storyContext(deps.run, unit.itemKey)
      // Tasks are allocated for the whole requirement at creation time, so a
      // date unit only stores its range and inherited creation metadata.
      const value: WorktimeUnit = { ...unit, title: text(story.name), workspace, tasks: existing?.tasks ?? [], assignees: assignees.flatMap(user => [text(user.username), text(user.objectId)]).filter(Boolean), revision: (existing?.revision ?? 0) + 1, updatedAt: new Date().toISOString(),
        ...Object.fromEntries(['cost', 'team', 'category'].filter(key => typeof input[key] === 'string').map(key => [key, input[key]])),
      }
      if (existing) store.units[store.units.indexOf(existing)] = value
      else store.units.push(value)
      mergeRanges(store, value.itemKey)
      await save(store)
      return { unit: survivor(store, value.itemKey, value.start) ?? value }
    })
  })
  route('/api/tomato-board/worktime/delete', 'POST', async request => {
    const input = await body(request)
    if (typeof input.id !== 'string') throw new Error('缺少操作单元')
    return serial(async () => {
      const store = await load()
      const unit = store.units.find(value => value.id === input.id)
      if (!unit) return { id: input.id, removed: false }
      if (unit.revision !== input.revision) throw new Error('安排已变化，请刷新后重试')
      // Deleting the plan never touches Tomato: created Tasks stay and reappear as history.
      const created = unit.tasks.filter(task => task.status === 'created').length
      store.units.splice(store.units.indexOf(unit), 1)
      mergeRanges(store, unit.itemKey)
      await save(store)
      return { id: unit.id, removed: true, created }
    })
  })
  route('/api/tomato-board/worktime/create', 'POST', async request => {
    const input = await body(request)
    const claims = (list(input.units).length ? list(input.units) : typeof input.id === 'string' ? [{ id: input.id, revision: input.revision }] : []).map(raw => {
      const value = record(raw)
      return { id: String(value.id ?? ''), revision: Number(value.revision) }
    })
    if (!claims.length) throw new Error('缺少操作单元')
    return serial(async () => {
      const store = await load()
      const first = store.units.find(value => value.id === claims[0]!.id)
      if (!first) throw new Error('安排不存在，请先保存')
      // Only the claimed units form this batch: a requirement may be planned in
      // several batches over time, and units that already created Tasks are history.
      const batch = claims.map(claim => {
        const unit = store.units.find(value => value.id === claim.id)
        if (!unit || unit.itemKey !== first.itemKey || unit.revision !== claim.revision) throw new Error('安排已变化，请刷新后重试')
        if (unitHasCreatedTasks(unit, store.units)) throw new Error('该时间段已创建 Task，请新增时间段后再安排')
        return unit
      })
      const unresolved = store.units.filter(unit => unit.itemKey === first.itemKey).flatMap(unit =>
        unit.tasks.filter(task => (task.status === 'uncertain' || task.status === 'creating')
          && (batch.includes(unit) || batch.some(range => task.start <= range.end && task.end >= range.start))))
      if (unresolved.some(task => task.itemKey)) throw new Error('已有 Task 编号但创建结果待核对，请先核对番茄记录，不能直接重复创建')
      if (unresolved.length && input.confirmRetry !== true) throw new Error('创建结果待核对，请先确认番茄中没有对应 Task，再确认重试')
      const group = store.units.filter(value => value.itemKey === first.itemKey)
      const dates = unitDates(batch)
      // A zero person-day stage means "not allocated": skip it instead of failing.
      const drafts = list(input.tasks).map(record).map(task => ({
        stage: String(task.stage ?? ''), title: String(task.title ?? ''), days: Number(task.days),
      })).filter(task => task.days !== 0)
      const tasks = allocateGroupTasks(dates, drafts)
      const meta = await metadata(deps.run, first.itemKey)
      const { options, data, context, definitions } = meta
      const optionValue = (key: string, label: unknown) => {
        const match = options(key).find(option => option.label === label)
        if (!match) throw new Error(`请选择有效的 ${key}`)
        return [match.value]
      }
      const common: RecordValue = {
        view_project: [context.project], Dropdown2: optionValue('Dropdown2', input.cost), suoshutuandui: optionValue('suoshutuandui', input.team),
        Dropdown_task: optionValue('Dropdown_task', input.category),
        assignee: context.assignees.map(userValue),
      }
      if (!data.categories.includes(String(input.category))) throw new Error('任务分类仅支持软件开发或修复BUG')
      // The plan dates and workload are the point of the record, so they may never
      // be dropped. Every other field is optional: when the create screen only
      // accepts a narrower range (for example the actual finish date of the
      // current sprint), it is omitted instead of failing the whole creation.
      const planKeys = new Set(['DateSDate', 'qiwangwanchengriqi', 'planStoryPoint'])
      const actualKeys = ['StoryPoint1', 'StartDate', 'ActualFinishTime']
      const actualLabels: Record<string, string> = { StoryPoint1: '实际工作量', StartDate: '实际开始时间', ActualFinishTime: '实际完成时间' }
      const prepared = tasks.map(task => {
        const values: RecordValue = { ...common, DateSDate: timestamp(task.start), qiwangwanchengriqi: timestamp(task.end), planStoryPoint: task.days,
          StoryPoint1: task.days, StartDate: timestamp(task.start), ActualFinishTime: timestamp(task.end) }
        const skipped = new Set<string>()
        const skippedLabels: string[] = []
        for (const field of definitions) {
          const key = String(field.key)
          if (field.required === true && !['name', 'workspace', 'itemType'].includes(key) && !(key in values)) throw new Error(`创建界面新增必填字段：${text(field.name)}，请先补充支持`)
          const value = values[key]
          const range = list(record(field.property).range)
          const outside = typeof value === 'number' && range.length === 2 && typeof range[0] === 'number' && typeof range[1] === 'number' && (value < range[0] || value > range[1])
          if (!outside) continue
          if (field.required === true || planKeys.has(key)) throw new Error(`${text(field.name)}允许范围为 ${localDate(range[0])}～${localDate(range[1])}，所选日期超出范围，无法创建 Task`)
          delete values[key]
          skipped.add(key)
          skippedLabels.push(text(field.name))
        }
        // The actual-work fields only persist together: without a writable actual
        // finish date the API silently drops the actual workload and start date.
        if (actualKeys.some(key => skipped.has(key))) {
          for (const key of actualKeys) {
            if (!(key in values)) continue
            delete values[key]
            if (skipped.has(key)) continue
            skipped.add(key)
            skippedLabels.push(actualLabels[key]!)
          }
        }
        if (skippedLabels.length) task.skipped = skippedLabels
        return { task, values, skipped }
      })
      // Each task belongs to the date unit its first day falls into.
      for (const unit of batch) unit.tasks = []
      for (const task of tasks) (batch.find(unit => unit.start <= task.start && task.start <= unit.end) ?? batch[0]!).tasks.push(task)
      for (const unit of batch) {
        unit.project = context.project; unit.team = String(input.team); unit.cost = String(input.cost); unit.category = String(input.category)
        unit.revision += 1; unit.updatedAt = new Date().toISOString()
      }
      await save(store)
      for (const { task, values, skipped } of prepared) {
        task.status = 'creating'
        await save(store)
        try {
          const created = record(await deps.run(['team', 'item', 'create', '--workspace', context.workspace, '--item-type', 'Task', '--parent', first.itemKey, '--title', task.title, '--values', JSON.stringify(values)]))
          const key = text(created.itemKey ?? created.key ?? record(created.result).itemKey)
          if (!keyPattern.test(key)) throw new Error('创建返回缺少事项编号，结果待核对')
          task.itemKey = key
          await save(store)
          const verified = record(await deps.run(['team', 'item', 'view', key]))
          const actual = fieldValues(verified)
          const ancestors = list(verified.ancestors).map(value => text(record(value).objectId ?? value))
          if (!ancestors.includes(text(context.story.objectId ?? context.story.itemId))) throw new Error('父故事校验失败')
          const checks: Array<[string, boolean]> = [
            ['name', text(verified.name) === task.title],
            ['view_project', text(actual.view_project) === text(values.view_project)],
            ['Dropdown2', text(actual.Dropdown2) === text(values.Dropdown2)],
            ['suoshutuandui', text(actual.suoshutuandui) === text(values.suoshutuandui)],
            ['Dropdown_task', text(actual.Dropdown_task) === text(values.Dropdown_task)],
            ['planStoryPoint', Number(actual.planStoryPoint) === task.days],
            ['DateSDate', localDate(actual.DateSDate) === task.start],
            ['qiwangwanchengriqi', localDate(actual.qiwangwanchengriqi) === task.end],
          ]
          const broken = checks.find(([field, ok]) => !ok && !skipped.has(field))
          if (broken) throw new Error(`Task ${broken[0]} 回读校验失败`)
          // Actual-work fields may be dropped by the API even when we sent them.
          const readBackActual: Array<[string, boolean]> = [
            ['StoryPoint1', Number(actual.StoryPoint1) === task.days],
            ['StartDate', localDate(actual.StartDate) === task.start],
            ['ActualFinishTime', localDate(actual.ActualFinishTime) === task.end],
          ]
          for (const [field, ok] of readBackActual) {
            if (ok || skipped.has(field)) continue
            skipped.add(field)
            task.skipped = [...(task.skipped ?? []), actualLabels[field]!]
          }
          const owners = list(actual.assignee).map(value => text(record(value).objectId ?? record(value).value))
          if (!context.assignees.every(user => owners.includes(text(user.objectId)))) throw new Error('Task 负责人回读校验失败')
          task.status = 'created'
        } catch (error) {
          task.status = 'uncertain'; task.error = error instanceof Error ? error.message : '创建结果待核对'
          await save(store)
          return { unit: first, units: group, error: `已保留创建记录，请核对后处理：${task.error}` }
        }
        await save(store)
      }
      deps.invalidate()
      return { unit: first, units: group }
    })
  })
  route('/api/tomato-board/worktime/history', 'GET', async (_, query) => {
    const start = query.get('start') ?? ''; const end = query.get('end') ?? ''
    datesBetween(start, end)
    const assignee = query.get('assignee') || 'currentUser()'
    if (assignee !== 'currentUser()' && !/^[A-Za-z0-9_.@-]{1,128}$/u.test(assignee)) throw new Error('无效的负责人')
    const owner = assignee === 'currentUser()' ? assignee : JSON.stringify(assignee)
    const iql = `负责人 in [${owner}] and 类型 = Task and DateSDate <= ${JSON.stringify(end)} and qiwangwanchengriqi >= ${JSON.stringify(start)}`
    const tasks: unknown[] = []
    for (let page = 1; page <= 100; page += 1) {
      const payload = record(await deps.run(['team', 'item', 'search', '--iql', iql, '--page', String(page), '--size', '50', '--fields', 'key,name,status,DateSDate,qiwangwanchengriqi,planStoryPoint,StartDate,ActualFinishTime,StoryPoint1']))
      const rows = list(payload.items)
      for (const raw of rows) {
        const item = record(raw); const value = fieldValues(item)
        tasks.push({ itemKey: text(item.key ?? item.itemKey), title: text(item.name ?? item.title), status: text(item.status), start: localDate(value.DateSDate), end: localDate(value.qiwangwanchengriqi), days: Number(value.planStoryPoint) || 0 })
      }
      const total = Number(payload.count ?? payload.total)
      if (!rows.length || (Number.isFinite(total) ? tasks.length >= total : rows.length < 50)) return { tasks }
    }
    return { tasks, truncated: true }
  })
}
