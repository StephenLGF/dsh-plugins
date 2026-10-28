import { useEffect, useMemo, useRef, useState } from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { Button, IconRefreshOutline16 } from '@deepseek-ai/dsh-client-ui-primitives'
import { TomatoLinkButton } from './TomatoLinkButton.tsx'
import css from './team-management.module.css'
import { readViewCache, writeViewCache } from './view-cache.ts'
import { teamDate } from '../team-metrics.ts'
import { Tag } from './Tag'
import type { TomatoItem } from './TomatoBoard'

type User = { username: string; name: string }
type Sprint = { sprintId: string; name: string; workspaceKey: string; status: string; startDate?: string; endDate?: string }
type Item = TomatoItem & { storyPoints: number | null; plannedDays: number | null; periodDays: number | null; plannedStart: string; plannedEnd: string }
type Metric = 'days' | 'points'
type Result = { items: Item[]; truncated: boolean }
type Directory = { sprints: Sprint[]; users: User[] }
const resultsKey = (sprint: string) => 'team-results:' + sprint
function isDirectory(value: unknown): value is Directory {
  const data = value as Directory | null
  return Boolean(data && Array.isArray(data.sprints) && Array.isArray(data.users)
    && data.sprints.every(row => row && typeof row.sprintId === 'string' && typeof row.name === 'string')
    && data.users.every(row => row && typeof row.username === 'string' && typeof row.name === 'string'))
}
function isResults(value: unknown): value is Record<string, Result> {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).length > 1000) return false
  return Object.values(value).every((row: Result) => row && typeof row.truncated === 'boolean' && Array.isArray(row.items) && row.items.length <= 20_000
    && row.items.every(item => item && typeof item.itemKey === 'string' && typeof item.title === 'string'
      && typeof item.itemType === 'string' && typeof item.status === 'string'
      && (item.storyPoints === null || Number.isFinite(item.storyPoints)) && (item.periodDays === null || Number.isFinite(item.periodDays))))
}
type Team = { id: string; name: string; members: string[] }
const LEGACY_TEAM_KEY = 'taskboard.tomatoStoryTeam.v1'
const TEAMS_KEY = 'taskboard.tomatoStoryTeams.v2'
const SPRINT_KEY = 'taskboard.tomatoStorySprint.v1'
const OWNER_KEY = 'taskboard.tomatoStoryOwner.v1'
const colors = ['#d76b50', '#458e88', '#c79940', '#687fb2', '#976f9c', '#75914f', '#be7f92', '#698b9d']
const number = (value: number) => new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 4 }).format(value)
const metricValue = (item: Item, metric: Metric) => (metric === 'days' ? item.periodDays : item.storyPoints) ?? 0
const total = (items: Item[], metric: Metric) => items.reduce((sum, item) => sum + metricValue(item, metric), 0)
const savedValue = (key: string, fallback: string) => { try { return localStorage.getItem(key) || fallback } catch { return fallback } }
const teamId = () => `team-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
async function json<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal: signal ?? null, cache: 'no-store', headers: { accept: 'application/json', 'cache-control': 'no-cache' } }); const text = await response.text(); let body: Record<string, unknown>
  try { body = text ? JSON.parse(text) as Record<string, unknown> : {} } catch { throw new Error(response.status === 404 || text.trim() === 'not found' ? '迭代故事点接口尚未加载，请完全重启 DSH Desktop' : `服务返回了无法识别的内容 (${response.status})`) }
  if (!response.ok) throw new Error(typeof body.error === 'string' ? body.error : `请求失败 (${response.status})`); return body as T
}
function readTeams(): Team[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(TEAMS_KEY) ?? '[]')
    if (Array.isArray(saved) && saved.length) return saved.flatMap(value => value && typeof value === 'object' ? [{ id: String((value as Team).id), name: String((value as Team).name), members: Array.isArray((value as Team).members) ? [...new Set((value as Team).members)] : [] }] : [])
    const legacy: unknown = JSON.parse(localStorage.getItem(LEGACY_TEAM_KEY) ?? '[]')
    return Array.isArray(legacy) && legacy.length ? [{ id: 'team-default', name: '默认团队', members: legacy.filter((value): value is string => typeof value === 'string') }] : []
  } catch { return [] }
}

export function TeamManagement({ toolbarTarget, onOpenItem, active: visible = true }: { active?: boolean; toolbarTarget: Dispatch<SetStateAction<ReactNode>>; onOpenItem: (item: TomatoItem) => void }) {
  const [metric, setMetric] = useState<Metric>(() => savedValue('taskboard.tomatoTeamMetric.v1', 'days') === 'points' ? 'points' : 'days')
  const unitLabel = metric === 'days' ? '人天' : 'SP'
  useEffect(() => { try { localStorage.setItem('taskboard.tomatoTeamMetric.v1', metric) } catch {} }, [metric])
  const [cachedDirectory] = useState(() => readViewCache('team-directory', isDirectory))
  const [sprints, setSprints] = useState<Sprint[]>(cachedDirectory?.sprints ?? []); const [users, setUsers] = useState<User[]>(cachedDirectory?.users ?? [])
  const [sprint, setSprint] = useState(() => savedValue(SPRINT_KEY, '')); const [owner, setOwner] = useState(() => savedValue(OWNER_KEY, 'currentUser()'))
  const [teams, setTeams] = useState(readTeams); const [openTeamId, setOpenTeamId] = useState(() => readTeams()[0]?.id ?? '')
  const [teamDraft, setTeamDraft] = useState(''); const [teamEditor, setTeamEditor] = useState<{ mode: 'create' | 'rename'; id?: string } | null>(null)
  const [addingTeamId, setAddingTeamId] = useState(''); const addPeopleRef = useRef<HTMLDivElement>(null); const addPeopleInputRef = useRef<HTMLInputElement>(null); const [search, setSearch] = useState('')
  const [results, setResults] = useState<Record<string, Result>>(() => readViewCache(resultsKey(sprint), isResults) ?? {}); const [errors, setErrors] = useState<Record<string, string>>({}); const [directoryError, setDirectoryError] = useState(''); const [directoryLoading, setDirectoryLoading] = useState(!cachedDirectory); const [version, setVersion] = useState(0); const [directoryVersion, setDirectoryVersion] = useState(0)
  useEffect(() => {
    if (!visible) return
    const controller = new AbortController(); setDirectoryLoading(!sprints.length); setDirectoryError('')
    void Promise.all([json<{ sprints: Sprint[] }>('/api/tomato-board/sprints', controller.signal), json<{ users: User[] }>('/api/tomato-board/filters', controller.signal)]).then(([data, directory]) => { if (controller.signal.aborted) return; const sorted = [...data.sprints].sort((a, b) => (b.startDate ?? '').localeCompare(a.startDate ?? '')); setSprints(sorted); setUsers(directory.users); writeViewCache('team-directory', { sprints: sorted, users: directory.users }); setSprint(current => sorted.some(value => value.sprintId === current) ? current : sorted[0]?.sprintId || '') }).catch(error => { if (!controller.signal.aborted) setDirectoryError(error.message) }).finally(() => { if (!controller.signal.aborted) setDirectoryLoading(false) }); return () => controller.abort()
  }, [directoryVersion, visible])
  useEffect(() => { try { localStorage.setItem(TEAMS_KEY, JSON.stringify(teams)) } catch {} }, [teams]); useEffect(() => { if (sprint) try { localStorage.setItem(SPRINT_KEY, sprint) } catch {} }, [sprint]); useEffect(() => { try { localStorage.setItem(OWNER_KEY, owner) } catch {} }, [owner])
  const openTeam = teams.find(team => team.id === openTeamId); const openMembers = openTeam?.members ?? []; const ownersKey = JSON.stringify([...new Set([owner, ...openMembers])].sort())
  const resultScope = useRef('')
  const completedOwners = useRef(new Set<string>())
  useEffect(() => {
    if (!visible) { completedOwners.current.clear(); return }
    if (directoryLoading || !sprint) return
    const scope = JSON.stringify([sprint, version])
    if (resultScope.current !== scope) {
      const previousSprint = resultScope.current ? (JSON.parse(resultScope.current) as [string, number])[0] : sprint
      resultScope.current = scope
      completedOwners.current.clear()
      if (previousSprint !== sprint) setResults(readViewCache(resultsKey(sprint), isResults) ?? {})
      setErrors({})
    }
    const controller = new AbortController()
    const owners = (JSON.parse(ownersKey) as string[]).filter(username => !completedOwners.current.has(username))
    const worker = async () => {
      while (owners.length && !controller.signal.aborted) {
        const username = owners.shift()!
        try {
          const data = await json<Result>('/api/tomato-board/team-management?' + new URLSearchParams({ sprint, assignee: username, refresh: String(version) }), controller.signal)
          if (!controller.signal.aborted) {
            completedOwners.current.add(username)
            const cached = readViewCache(resultsKey(sprint), isResults) ?? {}
            writeViewCache(resultsKey(sprint), { ...cached, [username]: data })
            setResults(current => ({ ...current, [username]: data }))
            setErrors(current => { const next = { ...current }; delete next[username]; return next })
          }
        } catch (error) {
          if (!controller.signal.aborted) {
            completedOwners.current.add(username)
            setErrors(current => ({ ...current, [username]: error instanceof Error ? error.message : String(error) }))
          }
        }
      }
    }
    void Promise.all([worker(), worker(), worker()])
    return () => controller.abort()
  }, [directoryLoading, sprint, ownersKey, version, visible])
  const personal = results[owner]
  const items = useMemo(() => [...(personal?.items ?? [])].sort((a, b) => metricValue(b, metric) - metricValue(a, metric) || a.itemKey.localeCompare(b.itemKey)), [personal, metric])
  const sum = total(items, metric)
  const slices = items.filter(item => metricValue(item, metric) > 0)
  let offset = 0
  const gradient = slices.map((item, index) => { const start = offset; offset += metricValue(item, metric) / sum * 100; return `${colors[index % colors.length]} ${start}% ${offset}%` }).join(', ')
  const userName = (username: string) => username === 'currentUser()' ? '我' : users.find(user => user.username === username)?.name ?? username
  const selectedSprint = sprints.find(value => value.sprintId === sprint)

  const toggleTeam = (id: string) => { setOpenTeamId(current => current === id ? '' : id); setAddingTeamId(''); setTeamEditor(null) }
  const ranking = openMembers.map(username => ({ username, result: results[username], points: total(results[username]?.items ?? [], metric) })).sort((a, b) => Number(Boolean(b.result)) - Number(Boolean(a.result)) || b.points - a.points || a.username.localeCompare(b.username)); const max = Math.max(1, ...ranking.map(row => row.points)); const available = users.filter(user => !openMembers.includes(user.username) && `${user.name} ${user.username}`.toLowerCase().includes(search.toLowerCase()))
  const submitTeam = () => { const name = teamDraft.trim(); if (!name || !teamEditor) return; if (teamEditor.mode === 'create') { const team = { id: teamId(), name, members: [] }; setTeams(current => [...current, team]); setOpenTeamId(team.id) } else setTeams(current => current.map(team => team.id === teamEditor.id ? { ...team, name } : team)); setTeamDraft(''); setTeamEditor(null) }
  const deleteTeam = (id: string) => { setTeams(current => current.filter(team => team.id !== id)); if (openTeamId === id) setOpenTeamId('') }
  const updateMembers = (id: string, updater: (values: string[]) => string[]) => setTeams(current => current.map(team => team.id === id ? { ...team, members: updater(team.members) } : team))
  useEffect(() => { if (!addingTeamId) return; const close = (event: PointerEvent) => { if (event.target instanceof Node && !addPeopleRef.current?.contains(event.target)) { setAddingTeamId(''); setSearch('') } }; document.addEventListener('pointerdown', close, true); requestAnimationFrame(() => addPeopleInputRef.current?.focus()); return () => document.removeEventListener('pointerdown', close, true) }, [addingTeamId])
  useEffect(() => { if (!visible) return; toolbarTarget(<div className={css.headerControls}><label><span>迭代</span><select aria-label="选择迭代" value={sprint} disabled={directoryLoading} onChange={event => { setSprint(event.target.value); setResults(readViewCache(resultsKey(event.target.value), isResults) ?? {}); setErrors({}) }}>{!sprints.length && <option value="">{directoryLoading ? '正在读取迭代…' : '暂无迭代'}</option>}{sprints.map(value => <option key={value.sprintId} value={value.sprintId}>{value.name} · {value.workspaceKey}{value.status === 'completed' ? '（已结束）' : ''}</option>)}</select></label><Button variant="toolbar" size="sm" className={css.headerIconButton} icon={<IconRefreshOutline16 />} title="刷新" aria-label="刷新团队统计" onClick={() => { setErrors({}); setVersion(value => value + 1); if (directoryError || !sprints.length) setDirectoryVersion(value => value + 1) }} /></div>); return () => toolbarTarget(null) }, [directoryError, directoryLoading, sprint, sprints, toolbarTarget, visible])
  return <div className={css.page}>{directoryError && <p className={css.error}>{directoryError}，请点击刷新重试。</p>}<div className={css.metricToolbar}><span>{selectedSprint ? `${teamDate(selectedSprint.startDate)} — ${teamDate(selectedSprint.endDate)}` : '请选择迭代'}</span><div role="group" aria-label="统计指标"><button type="button" aria-pressed={metric === 'days'} onClick={() => setMetric('days')}>Task 人天</button><button type="button" aria-pressed={metric === 'points'} onClick={() => setMetric('points')}>需求故事点</button></div></div><div className={css.columns}>
    <section className={css.panel} aria-label="个人迭代投入"><div className={css.panelHeader}><h3>个人分布</h3><select aria-label="选择个人负责人" value={owner} onChange={event => setOwner(event.target.value)}><option value="currentUser()">我负责的</option>{users.map(user => <option key={user.username} value={user.username}>{user.name} · {user.username}</option>)}</select></div>{errors[owner] && !personal ? <p className={css.error}>{errors[owner]}</p> : !personal ? <p className={css.empty}>{sprint ? '正在读取个人迭代投入…' : '请选择迭代'}</p> : <><div className={css.summary}><div><span className={css.eyebrow}>{metric === 'days' ? '迭代内 Task 计划投入' : '需求故事点'}</span><div className={css.total}>{number(sum)}<small> {unitLabel}</small></div><span className={css.secondaryMetric}>{metric === 'days' ? `需求 ${number(total(items, 'points'))} SP` : `Task ${number(total(items, 'days'))} 人天`}</span></div><div className={css.pie} style={{ background: gradient ? `conic-gradient(${gradient})` : undefined }}><div><strong>{slices.length}</strong><span>项占比</span></div></div></div><div className={css.listHeading}><h4>需求与 Task</h4><span>{items.length} 项</span></div>{!items.length && <p className={css.empty}>该负责人在本迭代暂无事项。</p>}<div>{items.map(item => <div className={css.item} key={item.itemKey} role="button" tabIndex={0} aria-label={`打开 ${item.itemKey} 的对话`} onClick={() => onOpenItem(item)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpenItem(item) } }}><span className={css.dot} style={{ background: metricValue(item, metric) > 0 ? colors[slices.indexOf(item) % colors.length] : 'var(--dsw-alias-border-l2, #ddd)' }} /><div className={css.itemText}><span className={css.itemTitle}>{item.title}</span><small>{item.itemKey}</small><Tag>{item.itemType === 'Task' ? 'Task' : '需求'}</Tag><Tag>{item.status}</Tag>{item.plannedStart && <small>{item.plannedStart} — {item.plannedEnd}</small>}</div><strong className={css.itemPoints}>{item.itemType === 'Task' ? (item.periodDays === null ? '未估算' : `${number(item.periodDays)} 人天`) : (item.storyPoints === null ? '未估点' : `${number(item.storyPoints)} SP`)}</strong><TomatoLinkButton itemKey={item.itemKey} /></div>)}</div></>}</section>
    <section className={css.panel} aria-label="团队迭代投入"><div className={css.teamsHeader}><h3>团队分布</h3><button className={css.addTeamButton} aria-label="创建团队" title="创建团队" onClick={() => { setTeamEditor({ mode: 'create' }); setTeamDraft('') }}>＋ 创建团队</button></div>{teamEditor?.mode === 'create' && <form className={css.teamEditor} onSubmit={event => { event.preventDefault(); submitTeam() }}><input autoFocus placeholder="团队名称" value={teamDraft} onChange={event => setTeamDraft(event.target.value)} /><button type="button" onClick={() => setTeamEditor(null)}>取消</button><button type="submit">创建</button></form>}<div className={css.teamAccordions}>{teams.map(team => { const open = openTeamId === team.id; const rows = open ? ranking : []; return <article className={css.teamAccordion} key={team.id}><div className={css.teamAccordionHeader}><button className={css.teamToggle} aria-expanded={open} onClick={() => toggleTeam(team.id)}><span className={css.chevron}>›</span><strong>{team.name}</strong><small>{team.members.length} 人</small></button><button className={css.renameTeam} aria-label={`改名 ${team.name}`} title="改名" onClick={() => { setTeamEditor({ mode: 'rename', id: team.id }); setTeamDraft(team.name); setOpenTeamId(team.id) }}>✎</button><div className={css.teamRowActions}><button aria-label={`删除 ${team.name}`} title="删除" onClick={() => deleteTeam(team.id)}>×</button></div></div>{teamEditor?.mode === 'rename' && teamEditor.id === team.id && <form className={css.teamEditor} onSubmit={event => { event.preventDefault(); submitTeam() }}><input autoFocus value={teamDraft} onChange={event => setTeamDraft(event.target.value)} /><button type="button" onClick={() => setTeamEditor(null)}>取消</button><button type="submit">保存</button></form>}{open && <div className={css.teamBody}><div className={css.teamBodyToolbar}><span>{team.members.length ? '成员迭代投入' : '暂无成员'}</span><div ref={addingTeamId === team.id ? addPeopleRef : undefined} className={css.addPeopleRoot}><button className={css.smallAddButton} onClick={() => setAddingTeamId(current => current === team.id ? '' : team.id)}>＋ 添加成员</button>{addingTeamId === team.id && <div className={css.addPeople} role="dialog"><div className={css.addPeopleTitle}><strong>添加成员</strong><button onClick={() => setAddingTeamId('')}>×</button></div><input ref={addPeopleInputRef} value={search} onChange={event => setSearch(event.target.value)} placeholder="搜索姓名或用户名…" /><div>{available.map(user => <button key={user.username} onClick={() => { updateMembers(team.id, current => [...current, user.username]); setAddingTeamId(''); setSearch('') }}>{user.name}<small>{user.username}</small><span>＋</span></button>)}{!available.length && <p>没有可添加的成员</p>}</div></div>}</div></div><div className={css.ranking}>{rows.map((row, index) => <div key={row.username} className={css.rankRow}><div className={css.memberRow}><button className={css.rankLabel} aria-pressed={owner === row.username} onClick={() => setOwner(row.username)}><i className={css.rankFill} style={{ width: `${row.points / max * 100}%` }} /><span className={css.rankIndex}>{String(index + 1).padStart(2, '0')}</span><span className={css.memberAvatar}>{userName(row.username).slice(0, 1)}</span><span className={css.memberIdentity}><strong>{userName(row.username)}</strong><small>{row.result ? `${row.result.items.filter(item => item.itemType !== 'Task').length} 个需求 · ${row.result.items.filter(item => item.itemType === 'Task').length} 个 Task` : errors[row.username] ? '读取失败' : '读取中…'}</small></span><b>{row.result ? `${number(row.points)} ${unitLabel}` : '—'}</b></button><button className={css.removeMember} aria-label={`移除 ${userName(row.username)}`} title="移除成员" onClick={() => updateMembers(team.id, current => current.filter(value => value !== row.username))}>×</button></div></div>)}</div>{!team.members.length && <div className={css.teamBodyEmpty}>添加成员后查看迭代投入分布</div>}</div>}</article> })}</div>{!teams.length && <div className={css.empty}>点击右上角加号创建团队。</div>}</section>
  </div></div>
}
