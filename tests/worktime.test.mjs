import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Readable } from 'node:stream'
import { apply } from '../plugins/tomato-board/lib/index.js'
import { allocateTasks, calendarStart, taskTitle } from '../plugins/tomato-board/src/worktime-model.ts'
import { resolveCliExecutable } from '../plugins/tomato-board/src/cli-path.ts'

test('calendar spans five Saturday-based weeks and allocates fractional stages without losing days', () => {
  assert.equal(calendarStart('2026-10-26'), '2026-10-10')
  assert.equal(calendarStart('2026-11-01'), '2026-10-17')
  const tasks = allocateTasks('2026-10-26', '2026-10-28', [
    { stage: 'understand', title: '梳理订阅需求与项目', days: .5 },
    { stage: 'design', title: '设计订阅方案', days: .5 },
    { stage: 'develop', title: '实现订阅与智能订阅', days: 2 },
  ])
  assert.deepEqual(tasks.map(t => [t.start, t.end]), [['2026-10-26', '2026-10-26'], ['2026-10-26', '2026-10-26'], ['2026-10-27', '2026-10-28']])
  assert.doesNotThrow(() => allocateTasks('2026-10-26', '2026-10-28', [{ stage: 'develop', title: '开发订阅功能', days: 2 }]))
  assert.throws(() => allocateTasks('2026-10-26', '2026-10-28', [{ stage: 'develop', title: '开发订阅功能', days: 4 }]), /合计/)
  assert.throws(() => allocateTasks('2026-10-26', '2026-10-28', [{ stage: 'develop', title: '开发订阅功能', days: 0.25 }]), /0\.5/)
  assert.match(taskTitle('Insight高级仪表盘支持订阅与智能订阅-前端', 'develop'), /实现.*高级仪表盘.*订阅.*集成/)
})

test('resolves the CLI without depending on the developer machine PATH', async t => {
  const home = await mkdtemp(join(tmpdir(), 'tomato-cli-path-'))
  t.after(() => rm(home, { recursive: true, force: true }))
  const bin = join(home, '.local', 'bin')
  await mkdir(bin, { recursive: true })
  const executable = join(bin, 'gitee')
  await writeFile(executable, '#!/bin/sh\nexit 0\n', { mode: 0o755 })
  assert.equal(resolveCliExecutable('gitee', '', home), executable)
  assert.equal(resolveCliExecutable(executable, '', home), executable)
  assert.throws(() => resolveCliExecutable('missing-tomato-cli-test', '', home), /找不到/)
})

async function setup(t, { failSecond = false, failFirst = false, requiredActualFinish = false, failRead = false } = {}) {
  const dir = await mkdtemp(join(tmpdir(), 'tomato-worktime-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  const db = join(dir, 'cli.json')
  await writeFile(db, JSON.stringify({ created: [], failSecond, failFirst, failRead }))
  const executable = join(dir, 'gitee')
  await writeFile(executable, `#!${process.execPath}
import fs from 'node:fs';
const db=${JSON.stringify(db)}; const state=JSON.parse(fs.readFileSync(db)); const args=process.argv.slice(2);const arg=k=>args[args.indexOf(k)+1];
const field=(key,name,opts,required=true)=>({key,name,required,data:{customData:opts.map(x=>({label:x,value:x}))},property:{}});
const story={key:'Story-1',objectId:'story1',name:'高级仪表盘支持订阅',itemType:{name:'Story'},workspace:{key:'Report',name:'Insight'},values:{view_project:['产品项目'],assignee:[{objectId:'owner1',username:'owner',nickname:'负责人',label:'负责人(owner)'}]}};
let result={};
if(args[1]==='field') result=[field('view_project','所属项目',['产品项目']),field('Dropdown2','工时成本归属',['主线产品']),field('suoshutuandui','所属团队',['Insight团队']),field('Dropdown_task','任务分类',['软件开发','修复BUG']),field('assignee','负责人',[]),field('qiwangwanchengriqi','计划完成时间',[]),{key:'ActualFinishTime',name:'实际完成时间',required:${requiredActualFinish},property:{range:[1792080000000,1792684800000]}}];
else if(args[2]==='search') result={count:1,items:[{key:'Task-old',values:{Dropdown2:['主线产品'],suoshutuandui:['Insight团队']}}]};
else if(args[2]==='view') { if(args[3]!=='Story-1'&&state.failRead){state.failRead=false;fs.writeFileSync(db,JSON.stringify(state));process.exit(2)} result=args[3]==='Story-1'?story:state.created.find(x=>x.key===args[3]); }
else if(args[2]==='create') { state.attempts=(state.attempts||0)+1; fs.writeFileSync(db,JSON.stringify(state)); if(state.failFirst&&state.attempts===1)process.exit(2); if(state.failSecond&&state.created.length===1)process.exit(2); const item={key:'Task-'+(state.created.length+1),name:arg('--title'),ancestors:[{objectId:'story1'}],values:JSON.parse(arg('--values'))};state.created.push(item);fs.writeFileSync(db,JSON.stringify(state));result={itemKey:item.key}; }
else process.exit(3);
console.log(JSON.stringify(result));
`, { mode: 0o755 })
  const dataFile = join(dir, 'history.json')
  const makeRequest = () => {
    const routes = []
    const disposers = []
    apply({ get: () => ({ register: route => { routes.push(route); return () => { routes.splice(routes.indexOf(route), 1) } } }), effect: fn => { disposers.push(fn()) } }, { executable, worktimeDataFile: dataFile })
    const request = async (path, input, headers = {}) => {
      const route = routes.find(route => route.path === path.split('?')[0])
      assert.ok(route, path)
      const req = Readable.from(input === undefined ? [] : [JSON.stringify(input)])
      Object.assign(req, { url: path, method: input === undefined ? 'GET' : 'POST', headers })
      let output
      const res = { statusCode: 0, setHeader() {}, end: body => { output = JSON.parse(body) } }
      await route.handler(req, res)
      return { status: res.statusCode, body: output }
    }
    return { request, dispose: () => disposers.forEach(dispose => dispose()), routes }
  }
  return { ...makeRequest(), makeRequest, dataFile, db }
}

const unit = { id: 'unit-12345678', itemKey: 'Story-1', start: '2026-10-16', end: '2026-10-18' }
const create = revision => ({ id: unit.id, revision, cost: '主线产品', team: 'Insight团队', category: '软件开发', tasks: [
  { stage: 'understand', title: '梳理高级仪表盘订阅需求与现有项目实现', days: 1 },
  { stage: 'develop', title: '实现高级仪表盘订阅功能并完成集成', days: 2 },
] })

test('real CLI process persists a unit, verifies two child Tasks, prevents duplicates, and survives plugin remount', async t => {
  const fixture = await setup(t)
  let result = await fixture.request('/api/tomato-board/worktime/unit', unit)
  assert.equal(result.status, 200)
  assert.equal(result.body.unit.title, '高级仪表盘支持订阅')
  const meta = await fixture.request('/api/tomato-board/worktime/metadata?itemKey=Story-1')
  assert.equal(meta.body.suggestedCost, '主线产品')
  assert.equal(meta.body.suggestedTeam, 'Insight团队')
  result = await fixture.request('/api/tomato-board/worktime/create', create(1))
  assert.equal(result.status, 200)
  assert.deepEqual(result.body.unit.tasks.map(task => task.status), ['created', 'created'])
  assert.equal(result.body.unit.tasks[1].start, '2026-10-17')
  const remote = JSON.parse(await readFile(fixture.db, 'utf8'))
  assert.equal(remote.created.length, 2)
  assert.equal(remote.created[0].values.StoryPoint1, 1)
  assert.equal(remote.created[1].values.planStoryPoint, 2)
  assert.equal(remote.created[1].values.StoryPoint1, remote.created[1].values.planStoryPoint)
  assert.equal(remote.created[1].values.StartDate, remote.created[1].values.DateSDate)
  assert.equal(remote.created[1].values.ActualFinishTime, remote.created[1].values.qiwangwanchengriqi)
  assert.deepEqual(remote.created[0].values.assignee, [{ label: '负责人(owner)', nickname: '负责人', username: 'owner', value: 'owner1' }])
  result = await fixture.request('/api/tomato-board/worktime/create', create(2))
  assert.match(result.body.error, /已创建 Task/)
  assert.equal(JSON.parse(await readFile(fixture.db, 'utf8')).created.length, 2)
  fixture.dispose()
  assert.equal(fixture.routes.length, 0)
  const reboot = fixture.makeRequest()
  result = await reboot.request('/api/tomato-board/worktime')
  assert.equal(result.body.units[0].tasks[1].itemKey, 'Task-2')
  assert.equal((await reboot.request('/api/tomato-board/worktime/unit', { ...unit, revision: 2, end: '2026-10-29' })).status, 400)
})

test('partial failure preserves confirmed and uncertain outcomes without retrying a mutation', async t => {
  const { request, db } = await setup(t, { failSecond: true })
  await request('/api/tomato-board/worktime/unit', unit)
  const result = await request('/api/tomato-board/worktime/create', create(1))
  assert.deepEqual(result.body.unit.tasks.map(task => task.status), ['created', 'uncertain'])
  await request('/api/tomato-board/worktime/create', create(2))
  assert.equal(JSON.parse(await readFile(db, 'utf8')).created.length, 1)
})

test('rejects cross-site writes, stale revisions, person-day mismatch and out-of-range actual dates before creating', async t => {
  const { request, db } = await setup(t)
  assert.equal((await request('/api/tomato-board/worktime/unit', unit, { 'sec-fetch-site': 'cross-site' })).status, 403)
  await request('/api/tomato-board/worktime/unit', unit)
  assert.equal((await request('/api/tomato-board/worktime/create', create(99))).status, 400)
  const wrong = create(1); wrong.tasks[1].days = 4
  const over = await request('/api/tomato-board/worktime/create', wrong)
  assert.equal(over.status, 400)
  assert.match(over.body.error, /不能大于/)
  // An optional field whose allowed range excludes the planned dates is skipped, not fatal.
  const ranged = await setup(t)
  const out = await ranged.request('/api/tomato-board/worktime/unit', { id: 'unit-out-of-range', itemKey: 'Story-1', start: '2026-10-26', end: '2026-10-28' })
  assert.equal(out.status, 200)
  const allowed = await ranged.request('/api/tomato-board/worktime/create', { id: 'unit-out-of-range', revision: 1, cost: '主线产品', team: 'Insight团队', category: '软件开发', tasks: [{ stage: 'develop', title: '实现高级仪表盘订阅功能并完成集成', days: 3 }] })
  assert.equal(allowed.status, 200)
  // The actual-work trio only persists together, so all three are dropped here.
  assert.deepEqual(allowed.body.unit.tasks[0].skipped, ['实际完成时间', '实际工作量', '实际开始时间'])
  const created = JSON.parse(await readFile(ranged.db, 'utf8')).created
  assert.equal(created.length, 1)
  assert.equal(created[0].values.ActualFinishTime, undefined)
  assert.equal(created[0].values.StartDate, undefined)
  assert.equal(created[0].values.StoryPoint1, undefined)
  assert.equal(created[0].values.DateSDate, created[0].values.qiwangwanchengriqi - 2 * 86400000)
  // A required field can never be dropped, so the range is reported instead.
  const strict = await setup(t, { requiredActualFinish: true })
  await strict.request('/api/tomato-board/worktime/unit', { id: 'unit-out-of-range', itemKey: 'Story-1', start: '2026-10-26', end: '2026-10-28' })
  const blocked = await strict.request('/api/tomato-board/worktime/create', { id: 'unit-out-of-range', revision: 1, cost: '主线产品', team: 'Insight团队', category: '软件开发', tasks: [{ stage: 'develop', title: '实现高级仪表盘订阅功能并完成集成', days: 3 }] })
  assert.equal(blocked.status, 400)
  assert.match(blocked.body.error, /实际完成时间允许范围为 2026-10-16～2026-10-23/)
  assert.equal(JSON.parse(await readFile(strict.db, 'utf8')).created.length, 0)
})

test('allocates one requirement plan across every date range, skipping unallocated stages', async t => {
  const { request, dataFile, db } = await setup(t)
  await request('/api/tomato-board/worktime/unit', { id: 'unit-aaaaaaaa', itemKey: 'Story-1', start: '2026-10-16', end: '2026-10-17' })
  await request('/api/tomato-board/worktime/unit', { id: 'unit-bbbbbbbb', itemKey: 'Story-1', start: '2026-10-20', end: '2026-10-21' })
  const result = await request('/api/tomato-board/worktime/create', {
    units: [{ id: 'unit-aaaaaaaa', revision: 1 }, { id: 'unit-bbbbbbbb', revision: 1 }],
    cost: '主线产品', team: 'Insight团队', category: '软件开发',
    tasks: [
      { stage: 'understand', title: '梳理高级仪表盘订阅需求与现有项目实现', days: 1 },
      { stage: 'design', title: '不分配就不创建', days: 0 },
      { stage: 'develop', title: '实现高级仪表盘订阅功能并完成集成', days: 1 },
    ],
  })
  assert.equal(result.status, 200)
  assert.deepEqual(result.body.units.flatMap(unit => unit.tasks.map(task => [task.stage, task.start, task.end])), [
    ['understand', '2026-10-16', '2026-10-16'],
    ['develop', '2026-10-17', '2026-10-17'],
  ])
  assert.equal(JSON.parse(await readFile(db, 'utf8')).created.length, 2)
  const store = JSON.parse(await readFile(dataFile, 'utf8'))
  assert.equal(store.units[0].tasks.length, 2)
  assert.equal(store.units[1].tasks.length, 0)
  assert.equal(JSON.parse(await readFile(db, 'utf8')).created[1].values.StoryPoint1, 1)
})

test('requires half-day granularity, keeps revisions in step across ranges and reports the kept Tasks when a created plan is deleted', async t => {
  const { request, dataFile } = await setup(t)
  await request('/api/tomato-board/worktime/unit', { id: 'unit-aaaaaaaa', itemKey: 'Story-1', start: '2026-10-16', end: '2026-10-16' })
  const tiny = await request('/api/tomato-board/worktime/create', {
    units: [{ id: 'unit-aaaaaaaa', revision: 1 }], cost: '主线产品', team: 'Insight团队', category: '软件开发',
    tasks: [{ stage: 'develop', title: '实现高级仪表盘订阅功能并完成集成', days: 0.25 }],
  })
  assert.equal(tiny.status, 400)
  assert.match(tiny.body.error, /0\.5/)
  const created = await request('/api/tomato-board/worktime/create', {
    units: [{ id: 'unit-aaaaaaaa', revision: 1 }], cost: '主线产品', team: 'Insight团队', category: '软件开发',
    tasks: [{ stage: 'develop', title: '实现高级仪表盘订阅功能并完成集成', days: 0.5 }],
  })
  assert.equal(created.status, 200)
  assert.equal(created.body.units[0].tasks[0].days, 0.5)
  const removed = await request('/api/tomato-board/worktime/delete', { id: 'unit-aaaaaaaa', revision: 2 })
  assert.equal(removed.status, 200)
  assert.equal(removed.body.created, 1)
  assert.equal(JSON.parse(await readFile(dataFile, 'utf8')).units.length, 0)
})

test('deletes an unallocated range and refuses a group whose ranges changed underneath', async t => {
  const { request, dataFile } = await setup(t)
  await request('/api/tomato-board/worktime/unit', { id: 'unit-aaaaaaaa', itemKey: 'Story-1', start: '2026-10-16', end: '2026-10-16' })
  await request('/api/tomato-board/worktime/unit', { id: 'unit-bbbbbbbb', itemKey: 'Story-1', start: '2026-10-20', end: '2026-10-20' })
  assert.equal((await request('/api/tomato-board/worktime/delete', { id: 'unit-bbbbbbbb', revision: 1 })).status, 200)
  assert.equal(JSON.parse(await readFile(dataFile, 'utf8')).units.length, 1)
  const stale = await request('/api/tomato-board/worktime/create', {
    units: [{ id: 'unit-aaaaaaaa', revision: 1 }, { id: 'unit-bbbbbbbb', revision: 1 }],
    cost: '主线产品', team: 'Insight团队', category: '软件开发',
    tasks: [{ stage: 'develop', title: '实现高级仪表盘订阅功能并完成集成', days: 1 }],
  })
  assert.equal(stale.status, 400)
  assert.match(stale.body.error, /刷新/)
})

test('merges touching ranges of one requirement and keeps a plan that already has Tasks apart', async t => {
  const { request, dataFile } = await setup(t)
  await request('/api/tomato-board/worktime/unit', { id: 'unit-aaaaaaaa', itemKey: 'Story-1', start: '2026-10-16', end: '2026-10-17' })
  const merged = await request('/api/tomato-board/worktime/unit', { id: 'unit-bbbbbbbb', itemKey: 'Story-1', start: '2026-10-18', end: '2026-10-19' })
  assert.equal(merged.status, 200)
  assert.equal(merged.body.unit.id, 'unit-aaaaaaaa')
  assert.equal(merged.body.unit.start, '2026-10-16')
  assert.equal(merged.body.unit.end, '2026-10-19')
  let store = JSON.parse(await readFile(dataFile, 'utf8'))
  assert.deepEqual(store.units.map(unit => [unit.itemKey, unit.start, unit.end]), [['Story-1', '2026-10-16', '2026-10-19']])
  const created = await request('/api/tomato-board/worktime/create', {
    units: [{ id: 'unit-aaaaaaaa', revision: store.units[0].revision }], cost: '主线产品', team: 'Insight团队', category: '软件开发',
    tasks: [{ stage: 'develop', title: '实现高级仪表盘订阅功能并完成集成', days: 4 }],
  })
  assert.equal(created.status, 200)
  assert.equal(created.body.unit.tasks[0].days, 4)
  // The plan now owns created Tasks, so its neighbour keeps its own range.
  await request('/api/tomato-board/worktime/unit', { id: 'unit-cccccccc', itemKey: 'Story-1', start: '2026-10-20', end: '2026-10-21' })
  store = JSON.parse(await readFile(dataFile, 'utf8'))
  assert.deepEqual(store.units.map(unit => [unit.start, unit.end]), [['2026-10-16', '2026-10-19'], ['2026-10-20', '2026-10-21']])
})

test('deleting a range between two touching ones merges them', async t => {
  const { request, dataFile } = await setup(t)
  await request('/api/tomato-board/worktime/unit', { id: 'unit-aaaaaaaa', itemKey: 'Story-1', start: '2026-10-16', end: '2026-10-16' })
  await request('/api/tomato-board/worktime/unit', { id: 'unit-bbbbbbbb', itemKey: 'Story-1', start: '2026-10-21', end: '2026-10-21' })
  const gap = await request('/api/tomato-board/worktime/unit', { id: 'unit-cccccccc', itemKey: 'Story-1', start: '2026-10-17', end: '2026-10-19' })
  assert.equal(gap.body.unit.id, 'unit-aaaaaaaa')
  assert.equal(gap.body.unit.end, '2026-10-19')
  // Removing the earlier block leaves 10-17..10-19 next to 10-21; a gap of one day remains.
  const store = JSON.parse(await readFile(dataFile, 'utf8'))
  assert.deepEqual(store.units.map(unit => [unit.start, unit.end]), [['2026-10-16', '2026-10-19'], ['2026-10-21', '2026-10-21']])
})

test('a failed creation stays editable so the plan can be retried', async t => {
  const { request, makeRequest, db } = await setup(t, { failFirst: true })
  await request('/api/tomato-board/worktime/unit', unit)
  const failed = await request('/api/tomato-board/worktime/create', create(1))
  assert.equal(failed.status, 200)
  assert.match(failed.body.error, /请核对后处理/)
  assert.equal(failed.body.unit.tasks[0].status, 'uncertain')
  const unconfirmed = await request('/api/tomato-board/worktime/create', create(2))
  assert.equal(unconfirmed.status, 400)
  assert.match(unconfirmed.body.error, /确认重试/)
  // The record is not history yet: the range may still be edited and the plan retried.
  const edited = await request('/api/tomato-board/worktime/unit', { id: unit.id, revision: 2, itemKey: 'Story-1', start: '2026-10-16', end: '2026-10-17' })
  assert.equal(edited.status, 200)
  const retried = await request('/api/tomato-board/worktime/create', { ...create(3), confirmRetry: true, tasks: [{ stage: 'develop', title: '实现高级仪表盘订阅功能并完成集成', days: 2 }] })
  assert.equal(retried.status, 200)
  assert.equal(retried.body.unit.tasks.length, 1)
  assert.equal(retried.body.unit.tasks[0].status, 'created')
  assert.equal(JSON.parse(await readFile(db, 'utf8')).created.length, 1)
})

test('a Task spanning ranges locks every covered range against editing and duplicate creation', async t => {
  const { request, dataFile } = await setup(t)
  const first = { ...unit, id: 'unit-cross-first', start: '2026-10-16', end: '2026-10-17' }
  const second = { ...unit, id: 'unit-cross-second', start: '2026-10-20', end: '2026-10-21' }
  await request('/api/tomato-board/worktime/unit', first)
  await request('/api/tomato-board/worktime/unit', second)
  const created = await request('/api/tomato-board/worktime/create', { ...create(1),
    units: [{ id: first.id, revision: 1 }, { id: second.id, revision: 1 }],
    tasks: [{ stage: 'develop', title: '实现跨时间段的功能', days: 4 }],
  })
  assert.equal(created.body.unit.tasks[0].status, 'created')
  const edit = await request('/api/tomato-board/worktime/unit', { ...second, revision: 2, end: '2026-10-22' })
  assert.equal(edit.status, 400)
  const duplicate = await request('/api/tomato-board/worktime/create', { ...create(2), id: second.id })
  assert.equal(duplicate.status, 400)
  assert.match(duplicate.body.error, /已创建 Task/)
  assert.equal(JSON.parse(await readFile(dataFile, 'utf8')).units[1].end, second.end)
})

test('a known Task whose verification failed cannot be duplicated even with confirmed retry', async t => {
  const { request, db } = await setup(t, { failRead: true })
  await request('/api/tomato-board/worktime/unit', unit)
  const failed = await request('/api/tomato-board/worktime/create', create(1))
  assert.equal(failed.body.unit.tasks[0].status, 'uncertain')
  assert.equal(failed.body.unit.tasks[0].itemKey, 'Task-1')
  const retry = await request('/api/tomato-board/worktime/create', { ...create(2), confirmRetry: true })
  assert.equal(retry.status, 400)
  assert.match(retry.body.error, /已有 Task 编号/)
  assert.equal(JSON.parse(await readFile(db, 'utf8')).created.length, 1)
})

test('saves all range edits before merging and rejects a stale snapshot without partial writes', async t => {
  const { request, dataFile } = await setup(t)
  const first = { ...unit, id: 'unit-range-first', start: '2026-10-16', end: '2026-10-17' }
  const second = { ...unit, id: 'unit-range-second', start: '2026-10-20', end: '2026-10-21' }
  await request('/api/tomato-board/worktime/unit', first)
  await request('/api/tomato-board/worktime/unit', second)
  const input = { itemKey: unit.itemKey, units: [{ id: first.id, revision: 1 }, { id: second.id, revision: 1 }],
    ranges: [{ ...first, end: '2026-10-19' }, { ...second, start: '2026-10-22', end: '2026-10-23' }],
  }
  const saved = await request('/api/tomato-board/worktime/ranges', input)
  assert.equal(saved.status, 200)
  assert.deepEqual(saved.body.units.map(value => [value.start, value.end]), [['2026-10-16', '2026-10-19'], ['2026-10-22', '2026-10-23']])
  const before = await readFile(dataFile, 'utf8')
  assert.equal((await request('/api/tomato-board/worktime/ranges', input)).status, 400)
  assert.equal(await readFile(dataFile, 'utf8'), before)
  assert.equal((await request('/api/tomato-board/worktime/unit', { ...first, id: 'unit-absorbed-id', revision: 1 })).status, 400)
})

test('a requirement can be planned again in a later batch without touching created Tasks', async t => {
  const { request, dataFile } = await setup(t)
  await request('/api/tomato-board/worktime/unit', { id: 'unit-aaaaaaaa', itemKey: 'Story-1', start: '2026-10-16', end: '2026-10-17' })
  const first = await request('/api/tomato-board/worktime/create', {
    units: [{ id: 'unit-aaaaaaaa', revision: 1 }], cost: '主线产品', team: 'Insight团队', category: '软件开发',
    tasks: [{ stage: 'develop', title: '实现高级仪表盘订阅功能并完成集成', days: 2 }],
  })
  assert.equal(first.status, 200)
  assert.equal(first.body.unit.tasks[0].status, 'created')
  // Later batch: a new, non-touching range for the same requirement.
  await request('/api/tomato-board/worktime/unit', { id: 'unit-bbbbbbbb', itemKey: 'Story-1', start: '2026-10-20', end: '2026-10-21' })
  const second = await request('/api/tomato-board/worktime/create', {
    units: [{ id: 'unit-bbbbbbbb', revision: 1 }], cost: '主线产品', team: 'Insight团队', category: '软件开发',
    tasks: [{ stage: 'verify', title: '联调与验证高级仪表盘订阅链路', days: 2 }],
  })
  assert.equal(second.status, 200)
  const store = JSON.parse(await readFile(dataFile, 'utf8'))
  const byRange = Object.fromEntries(store.units.map(unit => [`${unit.start}~${unit.end}`, unit.tasks.map(task => [task.stage, task.status])]))
  assert.deepEqual(byRange, { '2026-10-16~2026-10-17': [['develop', 'created']], '2026-10-20~2026-10-21': [['verify', 'created']] })
  // Re-creating a batch that already produced Tasks is still refused.
  const repeat = await request('/api/tomato-board/worktime/create', {
    units: [{ id: 'unit-aaaaaaaa', revision: store.units[0].revision }], cost: '主线产品', team: 'Insight团队', category: '软件开发',
    tasks: [{ stage: 'develop', title: '实现高级仪表盘订阅功能并完成集成', days: 2 }],
  })
  assert.equal(repeat.status, 400)
  assert.match(repeat.body.error, /已创建 Task/)
})
