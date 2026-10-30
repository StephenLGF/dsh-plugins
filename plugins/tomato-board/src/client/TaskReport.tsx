import { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Modal } from '@deepseek-ai/dsh-client-ui-primitives'
import { addDays } from '../worktime-model.ts'
import { reportWeek, suggestReportDays } from '../task-report-model.ts'
import type { TaskReportConstraints, TaskReportInput, TaskReportResult } from '../task-report.ts'
import { TomatoLinkButton } from './TomatoLinkButton.tsx'
import css from './worktime.module.css'

interface ReportTask {
  itemKey: string; title: string; status: string; start: string; end: string; days: number
  actualDays: number | null; actualStart: string; actualEnd: string
}
type Request = <T>(path: string, input?: unknown, signal?: AbortSignal) => Promise<T>
const today = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai' }).format(new Date())
const terminal = (status: string) => ['工时核对', '工时核对中', '已完成', '已取消', '延期解决'].includes(status)
const errorText = (error: unknown) => error instanceof Error ? error.message : '报工失败'
const outcomeText = { success: '报工成功', skipped: '已报工，跳过', failed: '未完成', partial: '部分完成', unknown: '结果待核对' }

export function TaskReport({ request, onClose, onSaved, onNotify }: {
  request: Request; onClose: () => void; onSaved: () => void; onNotify: (text: string, error?: boolean) => void
}) {
  const [week, setWeek] = useState(() => reportWeek(today()))
  const end = addDays(week, 6)
  const [version, setVersion] = useState(0)
  const [tasks, setTasks] = useState<ReportTask[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [drafts, setDrafts] = useState<Record<string, { days?: string; start?: string; end?: string }>>({})
  const [results, setResults] = useState<Record<string, TaskReportResult>>({})
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const submitting = useRef(false)
  const [error, setError] = useState('')
  const [uncertain, setUncertain] = useState(false)
  const [constraints, setConstraints] = useState<TaskReportConstraints>({})
  const selectedTasks = useMemo(() => tasks.filter(task => selected.has(task.itemKey)), [tasks, selected])
  const suggestions = useMemo(() => {
    // Already reported Tasks still occupy their day when reporting remaining Tasks.
    const counted = tasks.filter(task => selected.has(task.itemKey) || ['工时核对', '工时核对中', '已完成'].includes(task.status))
    const allocation = suggestReportDays(counted, week)
    return { ...allocation, conflicts: allocation.conflicts.filter(value => value.itemKeys.some(key => selected.has(key))) }
  }, [tasks, selected, week])
  const daysFor = (task: ReportTask) => Number(drafts[task.itemKey]?.days ?? suggestions.days[task.itemKey] ?? 0)
  const startFor = (task: ReportTask) => drafts[task.itemKey]?.start ?? (task.actualStart || task.start)
  const endFor = (task: ReportTask) => drafts[task.itemKey]?.end ?? (task.actualEnd || task.end)
  const total = selectedTasks.reduce((sum, task) => sum + daysFor(task), 0)
  const invalid = selectedTasks.some(task => !Number.isFinite(daysFor(task)) || daysFor(task) <= 0 || !Number.isInteger(daysFor(task) * 2)
    || !startFor(task) || !endFor(task) || endFor(task) < startFor(task)
    || (constraints.finishRange && (endFor(task) < constraints.finishRange[0] || endFor(task) > constraints.finishRange[1]))
    || (constraints.daysMin != null && daysFor(task) < constraints.daysMin) || (constraints.daysMax != null && daysFor(task) > constraints.daysMax))
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true); setError(''); setTasks([]); setSelected(new Set()); setDrafts({}); setResults({}); setUncertain(false)
    void Promise.all([
      request<{ tasks: ReportTask[]; truncated?: boolean }>(`/history?start=${week}&end=${end}&assignee=currentUser()`, undefined, controller.signal),
      request<TaskReportConstraints>('/report-options', undefined, controller.signal),
    ]).then(([data, limits]) => {
      if (controller.signal.aborted) return
      if (data.truncated) throw new Error('本周 Task 过多，未获取完整数据，请在番茄中报工')
      setTasks(data.tasks)
      setConstraints(limits)
      // A cross-week Task writes whole-item actual effort. Require explicit selection.
      setSelected(new Set(data.tasks.filter(task => !terminal(task.status) && task.start >= week && task.end <= end).map(task => task.itemKey)))
    }).catch(error => { if (!controller.signal.aborted) setError(errorText(error)) }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [week, end, version, request])
  function toggle(key: string) {
    setSelected(current => { const next = new Set(current); if (next.has(key)) next.delete(key); else next.add(key); return next })
  }
  function edit(key: string, field: 'days' | 'start' | 'end', value: string) {
    setDrafts(current => ({ ...current, [key]: { ...current[key], [field]: value } }))
  }
  async function submit() {
    if (submitting.current || !selectedTasks.length || invalid || suggestions.conflicts.length || uncertain) return
    submitting.current = true; setBusy(true); setError('')
    const payload: TaskReportInput[] = selectedTasks.map(task => ({
      itemKey: task.itemKey, expectedStatus: task.status, expectedStart: task.start, expectedEnd: task.end,
      expectedActualDays: task.actualDays, expectedActualStart: task.actualStart, expectedActualEnd: task.actualEnd,
      days: daysFor(task), actualStart: startFor(task), actualEnd: endFor(task),
    }))
    try {
      const data = await request<{ results: TaskReportResult[] }>('/report', { start: week, end, tasks: payload })
      setResults(Object.fromEntries(data.results.map(result => [result.itemKey, result])))
      setSelected(new Set())
      setTasks(current => current.map(task => {
        const result = data.results.find(value => value.itemKey === task.itemKey)
        const input = payload.find(value => value.itemKey === task.itemKey)
        return result ? { ...task, status: result.currentStatus || task.status,
          ...(result.fieldsWritten && input ? { actualDays: input.days, actualStart: input.actualStart, actualEnd: input.actualEnd } : {}) } : task
      }))
      setUncertain(data.results.some(result => result.outcome === 'unknown'))
      const success = data.results.filter(result => result.outcome === 'success').length
      const failed = data.results.filter(result => !['success', 'skipped'].includes(result.outcome)).length
      onNotify(`报工完成：成功 ${success} 项${failed ? `，${failed} 项需处理` : ''}`, failed > 0)
      if (!failed && data.results.length === payload.length) onClose()
    } catch (error) {
      setError(`未能确认提交结果，请刷新并核对各 Task 后再操作：${errorText(error)}`)
      setUncertain(true)
      onNotify('报工结果待核对，请刷新查看', true)
    } finally { submitting.current = false; setBusy(false); onSaved() }
  }
  return <Modal open title="一键报工" closeLabel="关闭" className={css.reportDialog!} onClose={() => { if (!busy) onClose() }}
    footer={<><span className={css.reportTotal}>已选 {selectedTasks.length} 项 · {Number.isFinite(total) ? total : 0} 人天</span><Button variant="ghost" disabled={busy} onClick={onClose}>关闭</Button><Button variant="primary" disabled={busy || loading || !selectedTasks.length || invalid || !!suggestions.conflicts.length || uncertain} onClick={() => void submit()}>{busy ? '正在报工…' : '确认工时并流转'}</Button></>}>
    <div className={`${css.form} ${css.reportForm}`}>
      <div className={css.reportToolbar} role="toolbar" aria-label="报工周切换">
        <div className={css.reportWeekNav}>
          <button type="button" className={css.reportNavButton} aria-label="上一周" title="上一周" disabled={busy} onClick={() => setWeek(addDays(week, -7))}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m10 4-4 4 4 4" /></svg></button>
          <label className={css.reportWeekPicker}>
            <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2.5" y="3.5" width="11" height="10" rx="2" /><path d="M5 2v3m6-3v3M3 7h10" /></svg>
            <span>{week.replaceAll('-', '.')} <b>—</b> {end.replaceAll('-', '.')}</span>
            <input type="date" aria-label="报工所在周" value={week} disabled={busy} onClick={event => { try { event.currentTarget.showPicker?.() } catch { /* Native date control remains available. */ } }} onChange={event => { if (event.target.value) setWeek(reportWeek(event.target.value)) }} />
          </label>
          <button type="button" className={css.reportNavButton} aria-label="下一周" title="下一周" disabled={busy} onClick={() => setWeek(addDays(week, 7))}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 4 4 4-4 4" /></svg></button>
        </div>
        <div className={css.reportWeekActions}>
          <button type="button" className={css.reportToolbarButton} disabled={busy} aria-pressed={week === reportWeek(today())} onClick={() => setWeek(reportWeek(today()))}>本周</button>
          <button type="button" className={css.reportToolbarButton} disabled={busy || loading} onClick={() => setVersion(value => value + 1)}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 6a5.2 5.2 0 1 0 .2 3M13 2.5V6H9.5" /></svg>刷新</button>
        </div>
      </div>
      <p className={css.help}>单位：人天，最小 0.5。同一天一个 Task 默认 1，两个各 0.5；已报工 Task 仍计入当日任务数。修改后写入实际工时并流转。</p>
      {suggestions.conflicts.length > 0 && <p className={css.notice} role="alert">{suggestions.conflicts.map(value => `${value.date} 有 ${value.itemKeys.length} 个 Task`).join('；')}。最小单位为 0.5，请取消部分选择或先调整排期。</p>}
      {selectedTasks.some(task => task.start < week || task.end > end) && <p className={css.notice}>跨周 Task 的建议工时仅统计本周；提交会覆盖整项 Task 的实际工时，请核对总工时及实际日期。</p>}
      {constraints.finishRange && <p className={css.help}>番茄允许的实际完成日期：{constraints.finishRange.join(' — ')}。</p>}
      {invalid && <p className={css.error}>请核对工时和日期：工时须为正数且以 0.5 递增，日期和工时须符合番茄允许范围。</p>}
      {error && <p role="alert" className={css.error}>{error}</p>}
      {uncertain && <p className={css.notice}>部分结果待核对，请先点击刷新查看服务器数据，再决定是否继续。</p>}
      {loading ? <p role="status">正在读取本周 Task…</p> : tasks.length === 0 ? <p>本周没有 Task</p> : <div className={css.reportTableScroll}><table className={css.reportTable}>
        <thead><tr><th>选择</th><th>Task</th><th>状态</th><th>计划 / 已报</th><th>本次实际工时</th><th>实际开始</th><th>实际结束</th></tr></thead>
        <tbody>{tasks.map(task => {
          const result = results[task.itemKey]
          const disabled = busy || terminal(task.status) || uncertain || !!result
          return <tr key={task.itemKey}>
            <td><input type="checkbox" aria-label={`选择 ${task.itemKey}`} checked={selected.has(task.itemKey)} disabled={disabled} onChange={() => toggle(task.itemKey)} /></td>
            <td><strong>{task.title}</strong><div className={css.itemLink}><span>{task.itemKey}</span><TomatoLinkButton itemKey={task.itemKey} disabled={busy} /></div><small>{task.start} — {task.end}{(task.start < week || task.end > end) && ' · 跨周'}</small>{result && <p className={result.outcome === 'success' || result.outcome === 'skipped' ? css.help : css.error}>{outcomeText[result.outcome]}{result.steps.length ? ` · ${result.steps.join('；')}` : ''}{result.error ? `：${result.error}` : ''}</p>}</td>
            <td>{task.status}</td><td>{task.days} / {task.actualDays ?? '—'}</td>
            <td><input type="number" min="0.5" step="0.5" aria-label={`${task.itemKey} 实际工时`} value={drafts[task.itemKey]?.days ?? suggestions.days[task.itemKey] ?? task.actualDays ?? ''} disabled={disabled || !selected.has(task.itemKey)} onChange={event => edit(task.itemKey, 'days', event.target.value)} /></td>
            <td><input type="date" aria-label={`${task.itemKey} 实际开始`} value={drafts[task.itemKey]?.start ?? (task.actualStart || task.start)} disabled={disabled || !selected.has(task.itemKey)} onChange={event => edit(task.itemKey, 'start', event.target.value)} /></td>
            <td><input type="date" aria-label={`${task.itemKey} 实际结束`} value={drafts[task.itemKey]?.end ?? (task.actualEnd || task.end)} disabled={disabled || !selected.has(task.itemKey)} onChange={event => edit(task.itemKey, 'end', event.target.value)} /></td>
          </tr>
        })}</tbody></table></div>}
    </div>
  </Modal>
}
