import { useEffect, useMemo, useState } from 'react'
import { Button, IconRefreshOutline16 } from '@deepseek-ai/dsh-client-ui-primitives'
import css from './story-points.module.css'

type User = { username: string; name: string }
type Sprint = { sprintId: string; name: string; workspaceKey: string; status: string; startDate?: string }
type Item = { itemKey: string; title: string; status: string; storyPoints: number | null; tomatoUrl: string }
type Result = { items: Item[]; truncated: boolean }
const TEAM_KEY = 'taskboard.tomatoStoryTeam.v1'
const colors = ['#d76b50', '#458e88', '#c79940', '#687fb2', '#976f9c', '#75914f', '#be7f92', '#698b9d']
const number = (value: number) => new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 4 }).format(value)
const total = (items: Item[]) => items.reduce((sum, item) => sum + (item.storyPoints ?? 0), 0)
async function json<T>(url: string, signal?: AbortSignal, method = 'GET'): Promise<T> {
  const response = await fetch(url, { method, signal: signal ?? null, headers: { accept: 'application/json' } })
  const body = await response.json()
  if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`)
  return body as T
}
function readTeam(): string[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(TEAM_KEY) ?? '[]')
    return Array.isArray(saved) ? [...new Set(saved.filter((value): value is string => typeof value === 'string' && /^[A-Za-z0-9_.@-]{1,128}$/u.test(value)))] : []
  } catch { return [] }
}

export function StoryPoints() {
  const [sprints, setSprints] = useState<Sprint[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [sprint, setSprint] = useState('')
  const [owner, setOwner] = useState('currentUser()')
  const [team, setTeam] = useState(readTeam)
  const [adding, setAdding] = useState(false)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Record<string, Result>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [directoryError, setDirectoryError] = useState('')
  const [directoryLoading, setDirectoryLoading] = useState(true)
  const [version, setVersion] = useState(0)
  const [directoryVersion, setDirectoryVersion] = useState(0)
  const [editing, setEditing] = useState<Item | null>(null)
  const [draft, setDraft] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [notice, setNotice] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    setDirectoryLoading(true)
    setDirectoryError('')
    void Promise.all([
      json<{ sprints: Sprint[] }>('/api/tomato-board/sprints', controller.signal),
      json<{ users: User[] }>('/api/tomato-board/filters', controller.signal),
    ]).then(([data, directory]) => {
      const sorted = [...data.sprints].sort((a, b) => (b.startDate ?? '').localeCompare(a.startDate ?? ''))
      setSprints(sorted)
      setUsers(directory.users)
      setSprint(current => current || sorted[0]?.sprintId || '')
    }).catch(error => { if (!controller.signal.aborted) setDirectoryError(error.message) })
      .finally(() => { if (!controller.signal.aborted) setDirectoryLoading(false) })
    return () => controller.abort()
  }, [directoryVersion])
  useEffect(() => { try { localStorage.setItem(TEAM_KEY, JSON.stringify(team)) } catch { /* Storage can be disabled. */ } }, [team])
  const ownersKey = JSON.stringify([...new Set([owner, ...team])].sort())
  useEffect(() => {
    if (!sprint) return
    const controller = new AbortController()
    setResults({})
    setErrors({})
    const owners = JSON.parse(ownersKey) as string[]
    // Keep CLI pressure bounded when comparing a larger team.
    const worker = async () => {
      while (owners.length && !controller.signal.aborted) {
        const username = owners.shift()!
        try {
          const data = await json<Result>(`/api/tomato-board/story-points?${new URLSearchParams({ sprint, assignee: username })}`, controller.signal)
          if (!controller.signal.aborted) setResults(current => ({ ...current, [username]: data }))
        } catch (error) {
          if (!controller.signal.aborted) setErrors(current => ({ ...current, [username]: error instanceof Error ? error.message : '读取失败' }))
        }
      }
    }
    void Promise.all([worker(), worker(), worker()])
    return () => controller.abort()
  }, [sprint, ownersKey, version])
  const personal = results[owner]
  const items = useMemo(() => [...(personal?.items ?? [])].sort((a, b) => (b.storyPoints ?? -1) - (a.storyPoints ?? -1) || a.itemKey.localeCompare(b.itemKey)), [personal])
  const sum = total(items)
  const slices = items.filter(item => item.storyPoints !== null && item.storyPoints > 0)
  let offset = 0
  const gradient = slices.map((item, index) => {
    const start = offset
    offset += item.storyPoints! / sum * 100
    return `${colors[index % colors.length]} ${start}% ${offset}%`
  }).join(', ')
  const userName = (username: string) => username === 'currentUser()' ? '我' : users.find(user => user.username === username)?.name ?? username
  const ranking = team.map(username => ({ username, result: results[username], points: total(results[username]?.items ?? []) }))
    .sort((a, b) => Number(Boolean(b.result)) - Number(Boolean(a.result)) || b.points - a.points || a.username.localeCompare(b.username))
  const max = Math.max(1, ...ranking.map(row => row.points))
  const available = users.filter(user => !team.includes(user.username) && `${user.name} ${user.username}`.toLowerCase().includes(search.toLowerCase()))
  const refresh = () => { setResults({}); setErrors({}); setVersion(value => value + 1) }
  const changeSprint = (value: string) => { setResults({}); setErrors({}); setSprint(value); setEditing(null); setNotice('') }
  async function save() {
    if (!editing || saving) return
    if (!draft.trim() || !Number.isFinite(Number(draft)) || Number(draft) < 0) { setSaveError('请输入大于或等于 0 的故事点'); return }
    setSaving(true)
    setSaveError('')
    try {
      await json(`/api/tomato-board/story-point/${encodeURIComponent(editing.itemKey)}?${new URLSearchParams({ value: draft })}`, undefined, 'POST')
      setNotice(`${editing.itemKey} 故事点已保存`)
      setEditing(null)
      refresh()
    } catch (error) { setSaveError(error instanceof Error ? error.message : '保存失败') }
    finally { setSaving(false) }
  }
  return <div className={css.page}>
    <div className={css.toolbar}>
      <div><span className={css.eyebrow}>SPRINT / STORY POINTS</span><h2>迭代故事点</h2><p>看清个人投入，比较团队分布</p></div>
      <div className={css.controls}><label>迭代<select aria-label="选择迭代" value={sprint} disabled={directoryLoading || saving} onChange={event => changeSprint(event.target.value)}>
        {!sprints.length && <option value="">{directoryLoading ? '正在读取迭代…' : '暂无迭代'}</option>}
        {sprints.map(value => <option key={value.sprintId} value={value.sprintId}>{value.name} · {value.workspaceKey}{value.status === 'completed' ? '（已结束）' : ''}</option>)}
      </select></label><Button variant="toolbar" size="sm" className={css.headerIconButton} icon={<IconRefreshOutline16 />} title="刷新迭代故事点" aria-label="刷新迭代故事点" disabled={saving} onClick={() => { refresh(); if (directoryError || !sprints.length) setDirectoryVersion(value => value + 1) }} /></div>
    </div>
    {directoryError && <p className={css.error} role="alert">{directoryError}，请点击刷新重试。</p>}
    {notice && <p role="status" className={css.notice}>{notice}</p>}
    {!directoryLoading && !directoryError && !sprints.length && <p className={css.empty}>当前没有可访问的迭代。</p>}
    <div className={css.columns}>
      <section className={css.panel} aria-label="个人故事点">
        <div className={css.panelHeader}><h3>个人分布</h3><select aria-label="选择个人负责人" value={owner} disabled={saving} onChange={event => { setOwner(event.target.value); setEditing(null); setNotice('') }}>
          <option value="currentUser()">我负责的</option>{users.map(user => <option key={user.username} value={user.username}>{user.name} · {user.username}</option>)}
        </select></div>
        {errors[owner] ? <p role="alert" className={css.error}>{errors[owner]}</p> : !personal ? <p className={css.empty} role="status">{sprint ? '正在读取个人故事点…' : '请选择迭代'}</p> : <>
          {personal.truncated && <p className={css.error}>事项达到读取上限，以下为部分统计。</p>}
          <div className={css.summary}><div><span className={css.eyebrow}>故事点总数</span><div className={css.total}>{number(sum)}<small> SP</small></div><p>{items.filter(item => item.storyPoints !== null).length} 项已估点 · {items.filter(item => item.storyPoints === null).length} 项未填写</p></div>
            <div className={css.pie} role="img" aria-label={`个人故事点分布，共 ${number(sum)} 点；各需求明细见下方列表`} style={{ background: gradient ? `conic-gradient(${gradient})` : undefined }}><div><strong>{slices.length}</strong><span>项占比</span></div></div>
          </div>
          <div className={css.listHeading}><h4>需求列表</h4><span>{items.length} 项</span></div>
          {!items.length && <p className={css.empty}>该负责人在本迭代暂无事项。</p>}
          {items.length > 0 && !slices.length && <p className={css.notice}>暂无大于 0 的故事点，填写后即可查看分布。</p>}
          <div className={css.items}>{items.map(item => <div className={css.item} key={item.itemKey}>
            <span className={css.dot} style={{ background: item.storyPoints && item.storyPoints > 0 ? colors[slices.indexOf(item) % colors.length] : 'var(--dsw-alias-border-l2, #ddd)' }} />
            <div className={css.itemText}><a href={item.tomatoUrl} target="_blank" rel="noreferrer">{item.title}</a><small>{item.itemKey} · {item.status}{sum > 0 && item.storyPoints !== null ? ` · ${number(item.storyPoints / sum * 100)}%` : ''}</small></div>
            <strong className={css.itemPoints}>{item.storyPoints === null ? '未填写' : `${number(item.storyPoints)} SP`}</strong><button disabled={saving} onClick={() => { setEditing(item); setDraft(item.storyPoints === null ? '' : String(item.storyPoints)); setSaveError('') }}>调整</button>
          </div>)}</div>
        </>}
      </section>
      <section className={css.panel} aria-label="团队故事点">
        <div className={css.panelHeader}><h3>团队排行</h3><button aria-expanded={adding} onClick={() => setAdding(value => !value)}>＋ 添加负责人</button></div>
        {adding && <div className={css.addPeople}><input type="search" aria-label="搜索团队负责人" placeholder="搜索姓名或用户名…" value={search} onChange={event => setSearch(event.target.value)} /><div>{available.map(user => <button key={user.username} disabled={saving} onClick={() => setTeam(current => [...current, user.username])}>{user.name}<small>{user.username}</small><span>＋</span></button>)}{!available.length && <p>没有可添加的负责人</p>}</div></div>}
        <div className={css.chips}>{team.map(username => <span key={username}>{userName(username)}<button disabled={saving} aria-label={`移除 ${userName(username)}`} onClick={() => setTeam(current => current.filter(value => value !== username))}>×</button></span>)}</div>
        <p className={css.caption}>按故事点从高到低排列 · {team.length} 位负责人</p>
        {!team.length && <div className={css.empty}><span className={css.emptyIcon}>▥</span><h4>一起看看团队的投入</h4><p>添加负责人，比较本迭代的故事点分布。</p></div>}
        <div className={css.ranking}>{ranking.map((row, index) => <div key={row.username} className={css.rankRow}>
          <div className={css.rankLabel}><span>{row.result ? String(index + 1).padStart(2, '0') : '—'}</span><strong>{userName(row.username)}</strong><b>{row.result ? `${number(row.points)} SP` : errors[row.username] ? '读取失败' : '读取中…'}</b></div>
          {row.result ? <><div className={css.track}><div style={{ width: `${row.points / max * 100}%` }} /></div><small>{row.result.items.length} 个事项{row.result.truncated ? ' · 仅统计部分事项' : ''}</small></> : errors[row.username] ? <p className={css.error}>{errors[row.username]}</p> : null}
        </div>)}</div>
        <p className={css.footnote}>统计当前迭代全部状态的卡片；未填故事点不计入总数，多负责人卡片分别计入各负责人。团队名单保存在当前浏览器。</p>
      </section>
    </div>
    {editing && <div className={css.modalBackdrop}><form className={css.dialog} role="dialog" aria-modal="true" aria-labelledby="story-edit-title" onSubmit={event => { event.preventDefault(); void save() }} onKeyDown={event => { if (event.key === 'Escape' && !saving) setEditing(null); if (event.key === 'Tab') { const nodes = event.currentTarget.querySelectorAll<HTMLElement>('input:not(:disabled), button:not(:disabled)'); const first = nodes[0]; const last = nodes[nodes.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() } } }}>
      <h3 id="story-edit-title">调整故事点</h3><p>{editing.itemKey} · {editing.title}</p><label>故事点<input autoFocus type="number" min="0" step="any" required value={draft} disabled={saving} onChange={event => setDraft(event.target.value)} /></label>
      <small>保存后同步到番茄卡片，并更新个人和团队统计。</small>{saveError && <p className={css.error} role="alert">{saveError}</p>}<div className={css.dialogActions}><button type="button" disabled={saving} onClick={() => setEditing(null)}>取消</button><button type="submit" disabled={saving}>{saving ? '保存中…' : '保存故事点'}</button></div>
    </form></div>}
  </div>
}
