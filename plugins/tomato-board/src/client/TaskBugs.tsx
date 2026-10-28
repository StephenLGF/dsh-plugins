import { useEffect, useRef, useState } from 'react'
import { Button } from '@deepseek-ai/dsh-client-ui-primitives'
import type { TaskBug } from '../task-bugs.ts'
import { TomatoLinkButton } from './TomatoLinkButton.tsx'
import css from './worktime.module.css'

interface BugData { linked: TaskBug[]; suggested: TaskBug[]; parent: { itemKey: string; title: string } | null; canLink: boolean }
type Request = <T>(path: string, input?: unknown, signal?: AbortSignal) => Promise<T>
export function TaskBugs({ itemKey, readOnly, disabled, request, onBusyChange, onNotify, onCountChange }: {
  itemKey: string; readOnly: boolean; disabled: boolean; request: Request
  onBusyChange: (busy: boolean) => void; onNotify: (text: string, error?: boolean) => void
  onCountChange: (itemKey: string, count: number) => void
}) {
  const [data, setData] = useState<BugData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [version, setVersion] = useState(0)
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [searchVersion, setSearchVersion] = useState(0)
  const [results, setResults] = useState<TaskBug[]>([])
  const [searching, setSearching] = useState(false)
  const [linking, setLinking] = useState('')
  const pending = useRef(false)
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true); setError('')
    void request<BugData>(`/task-bugs?itemKey=${encodeURIComponent(itemKey)}`, undefined, controller.signal)
      .then(value => { if (!controller.signal.aborted) { setData(value); onCountChange(itemKey, value.linked.length) } })
      .catch(error => { if (!controller.signal.aborted) setError(error instanceof Error ? error.message : 'Bug 读取失败') })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [itemKey, request, version, onCountChange])
  useEffect(() => {
    if (!submitted) { setResults([]); setSearching(false); return }
    const controller = new AbortController()
    setSearching(true); setError(''); setResults([])
    void request<{ items: TaskBug[] }>(`/task-bugs?itemKey=${encodeURIComponent(itemKey)}&q=${encodeURIComponent(submitted)}`, undefined, controller.signal)
      .then(value => { if (!controller.signal.aborted) setResults(value.items) })
      .catch(error => { if (!controller.signal.aborted) setError(error instanceof Error ? error.message : 'Bug 搜索失败') })
      .finally(() => { if (!controller.signal.aborted) setSearching(false) })
    return () => controller.abort()
  }, [itemKey, request, submitted, searchVersion])
  async function link(bug: TaskBug) {
    if (!data?.canLink || disabled || readOnly || pending.current || loading) return
    pending.current = true; onBusyChange(true); setLinking(bug.itemKey); setError('')
    // Show the association immediately; the last snapshot remains available for rollback.
    const previous = data
    setData({ ...data, linked: [...data.linked, bug] })
    onCountChange(itemKey, data.linked.length + 1)
    try {
      const result = await request<{ bug: TaskBug; count: number }>('/task-bug', { itemKey, bugKey: bug.itemKey })
      setData(current => current ? { ...current, linked: current.linked.map(value => value.itemKey === bug.itemKey ? result.bug : value) } : current)
      onCountChange(itemKey, result.count)
      onNotify('Bug 已关联到番茄 Task')
    } catch (error) {
      setData(previous)
      onCountChange(itemKey, previous.linked.length)
      const message = `${error instanceof Error ? error.message : 'Bug 关联失败'}；请刷新核对番茄中的关联结果`
      setError(message); onNotify(message, true)
    } finally { pending.current = false; setLinking(''); onBusyChange(false) }
  }
  const linkedKeys = new Set(data?.linked.map(bug => bug.itemKey))
  const candidates = (submitted ? results : data?.suggested ?? []).filter(bug => !linkedKeys.has(bug.itemKey))
  function row(bug: TaskBug, candidate = false) {
    return <li key={bug.itemKey} className={css.bugRow}>
      <div className={css.bugTitle}><span>{bug.title}</span><small>{bug.itemKey}</small></div>
      <span className={css.bugStatus}>{linking === bug.itemKey ? '关联中…' : bug.status || '未知状态'}</span>
      <TomatoLinkButton itemKey={bug.itemKey} />
      {candidate && !readOnly && <Button size="sm" variant="outline" disabled={disabled || loading || Boolean(linking) || !data?.canLink} onClick={() => void link(bug)}>关联</Button>}
    </li>
  }
  return <section className={css.bugs} aria-label="关联 Bug" aria-busy={loading}>
    <div className={css.bugToolbar}>
      <div className={css.bugHeading}><h3>关联 Bug</h3><Button size="sm" variant="ghost" disabled={disabled || loading || Boolean(linking)} onClick={() => { setVersion(value => value + 1); setSearchVersion(value => value + 1) }}>刷新</Button></div>
      {!readOnly && data && !loading &&
        <form className={css.bugSearch} onSubmit={event => { event.preventDefault(); setSubmitted(query.trim()); setSearchVersion(value => value + 1) }}>
          <input aria-label="搜索 Bug" maxLength={120} placeholder="搜索其他 Bug 标题或编号" value={query} disabled={disabled || Boolean(linking)} onChange={event => { setQuery(event.target.value); if (!event.target.value.trim()) setSubmitted('') }} />
          <Button size="sm" type="submit" variant="outline" disabled={disabled || searching || !query.trim() || Boolean(linking)}>搜索</Button>
        </form>
      }
    </div>
    {loading ? <p className={css.bugEmpty}>正在读取…</p> : <div className={css.bugColumns} data-readonly={readOnly || undefined}>
      <section className={css.bugPanel} aria-label="已关联 Bug">
        <div className={css.bugPanelHeading}><h4>已关联 <small>{data?.linked.length ?? 0}</small></h4></div>
        {data?.linked.length ? <ul className={css.bugList}>{data.linked.map(bug => row(bug))}</ul> : <p className={css.bugEmpty}>暂无关联 Bug</p>}
      </section>
      {!readOnly && data && <section className={css.bugPanel} aria-label="可关联缺陷">
        <div className={css.bugPanelHeading}>
          <h4>{submitted ? '搜索结果' : '父需求下的缺陷'} <small>{searching ? '…' : candidates.length}</small></h4>
          {!submitted && data.parent && <span className={css.bugParent} title={data.parent.title}>{data.parent.itemKey}<TomatoLinkButton itemKey={data.parent.itemKey} /></span>}
          {submitted && <Button size="sm" variant="ghost" onClick={() => { setSubmitted(''); setQuery('') }}>返回</Button>}
        </div>
        {searching ? <p className={css.bugEmpty}>正在搜索…</p> : candidates.length ? <ul className={css.bugList}>{candidates.map(bug => row(bug, true))}</ul> : <p className={css.bugEmpty}>{submitted ? '未找到可关联的 Bug' : '暂无可关联的缺陷'}</p>}
      </section>}
    </div>}
    {error && <p role="alert" className={css.error}>{error}</p>}
  </section>
}
