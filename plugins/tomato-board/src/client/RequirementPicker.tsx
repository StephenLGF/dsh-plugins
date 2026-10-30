import { useEffect, useState } from 'react'
import type { RequirementOption } from '../requirement-search.ts'
import { TomatoLinkButton } from './TomatoLinkButton.tsx'
import css from './worktime.module.css'

type Request = <T>(path: string, input?: unknown, signal?: AbortSignal) => Promise<T>

export function RequirementPicker({ items, selected, disabled, request, onSelect }: {
  items: RequirementOption[]; selected: string; disabled: boolean; request: Request; onSelect: (key: string) => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<RequirementOption[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [truncated, setTruncated] = useState(false)
  const q = query.trim()
  useEffect(() => {
    if (!q) { setResults([]); setError(''); setLoading(false); setTruncated(false); return }
    const controller = new AbortController()
    setLoading(true); setError(''); setResults([]); setTruncated(false)
    const timer = window.setTimeout(() => {
      void request<{ items: RequirementOption[]; truncated: boolean }>(`/requirements?q=${encodeURIComponent(q)}`, undefined, controller.signal).then(data => {
        if (!controller.signal.aborted) { setResults(data.items); setTruncated(data.truncated) }
      }).catch(error => { if (!controller.signal.aborted) setError(error instanceof Error ? error.message : '搜索失败') })
        .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    }, 300)
    return () => { window.clearTimeout(timer); controller.abort() }
  }, [q, request])
  return <div className={css.requirementPicker}>
    <input type="search" autoFocus aria-label="搜索需求编号或标题" placeholder="搜索需求编号或标题（不限负责人）" maxLength={120} value={query} disabled={disabled}
      onChange={event => { setQuery(event.target.value); onSelect('') }} />
    {!q ? <select aria-label="我的需求" value={selected} disabled={disabled} onChange={event => onSelect(event.target.value)}>
      <option value="">从我的需求中选择</option>
      {items.map(item => <option key={item.itemKey} value={item.itemKey}>{item.itemKey} · {item.title}</option>)}
    </select> : <>
      {loading ? <p role="status" className={css.help}>正在搜索…</p> : error ? <p role="alert" className={css.error}>{error}</p> : results.length === 0 ? <p className={css.help}>没有找到可访问的需求，请尝试完整编号或其他关键词。</p> :
        <div className={css.requirementResults}>{results.map(item => <div className={css.requirementResult} key={item.itemKey}>
          <button type="button" className={css.requirementChoice} aria-pressed={selected === item.itemKey} disabled={disabled} onClick={() => onSelect(item.itemKey)}>
            <strong>{item.title}</strong><span>{item.itemKey} · {item.status || '状态未知'} · {item.assignees.join('、') || '未设置负责人'}</span>
          </button><TomatoLinkButton itemKey={item.itemKey} disabled={disabled} />
        </div>)}</div>}
      {truncated && <p className={css.help}>仅显示前 20 条，请输入更具体的标题或完整编号。</p>}
    </>}
    <small className={css.help}>新分配的 Task 由当前登录用户负责。</small>
  </div>
}
