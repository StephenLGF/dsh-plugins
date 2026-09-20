import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, IconRefreshOutline16 } from '@deepseek-ai/dsh-client-ui-primitives';
import css from './story-points.module.css';
import { Tag } from './Tag';
const LEGACY_TEAM_KEY = 'taskboard.tomatoStoryTeam.v1';
const TEAMS_KEY = 'taskboard.tomatoStoryTeams.v2';
const SPRINT_KEY = 'taskboard.tomatoStorySprint.v1';
const OWNER_KEY = 'taskboard.tomatoStoryOwner.v1';
const colors = ['#d76b50', '#458e88', '#c79940', '#687fb2', '#976f9c', '#75914f', '#be7f92', '#698b9d'];
const number = (value) => new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 4 }).format(value);
const total = (items) => items.reduce((sum, item) => sum + (item.storyPoints ?? 0), 0);
const savedValue = (key, fallback) => { try {
    return localStorage.getItem(key) || fallback;
}
catch {
    return fallback;
} };
const teamId = () => `team-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
async function json(url, signal) {
    const response = await fetch(url, { signal: signal ?? null, cache: 'no-store', headers: { accept: 'application/json', 'cache-control': 'no-cache' } });
    const text = await response.text();
    let body;
    try {
        body = text ? JSON.parse(text) : {};
    }
    catch {
        throw new Error(response.status === 404 || text.trim() === 'not found' ? '迭代故事点接口尚未加载，请完全重启 DSH Desktop' : `服务返回了无法识别的内容 (${response.status})`);
    }
    if (!response.ok)
        throw new Error(typeof body.error === 'string' ? body.error : `请求失败 (${response.status})`);
    return body;
}
function readTeams() {
    try {
        const saved = JSON.parse(localStorage.getItem(TEAMS_KEY) ?? '[]');
        if (Array.isArray(saved) && saved.length)
            return saved.flatMap(value => value && typeof value === 'object' ? [{ id: String(value.id), name: String(value.name), members: Array.isArray(value.members) ? [...new Set(value.members)] : [] }] : []);
        const legacy = JSON.parse(localStorage.getItem(LEGACY_TEAM_KEY) ?? '[]');
        return Array.isArray(legacy) && legacy.length ? [{ id: 'team-default', name: '默认团队', members: legacy.filter((value) => typeof value === 'string') }] : [];
    }
    catch {
        return [];
    }
}
export function StoryPoints({ toolbarTarget, onOpenItem }) {
    const [sprints, setSprints] = useState([]);
    const [users, setUsers] = useState([]);
    const [sprint, setSprint] = useState(() => savedValue(SPRINT_KEY, ''));
    const [owner, setOwner] = useState(() => savedValue(OWNER_KEY, 'currentUser()'));
    const [teams, setTeams] = useState(readTeams);
    const [openTeamId, setOpenTeamId] = useState(() => readTeams()[0]?.id ?? '');
    const [loadedTeams, setLoadedTeams] = useState(() => { const first = readTeams()[0]?.id; return new Set(first ? [first] : []); });
    const [teamDraft, setTeamDraft] = useState('');
    const [teamEditor, setTeamEditor] = useState(null);
    const [addingTeamId, setAddingTeamId] = useState('');
    const addPeopleRef = useRef(null);
    const addPeopleInputRef = useRef(null);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState({});
    const [errors, setErrors] = useState({});
    const [directoryError, setDirectoryError] = useState('');
    const [directoryLoading, setDirectoryLoading] = useState(true);
    const [version, setVersion] = useState(0);
    const [directoryVersion, setDirectoryVersion] = useState(0);
    useEffect(() => {
        const controller = new AbortController();
        setDirectoryLoading(true);
        setDirectoryError('');
        void Promise.all([json('/api/tomato-board/sprints', controller.signal), json('/api/tomato-board/filters', controller.signal)]).then(([data, directory]) => { const sorted = [...data.sprints].sort((a, b) => (b.startDate ?? '').localeCompare(a.startDate ?? '')); setSprints(sorted); setUsers(directory.users); setSprint(current => sorted.some(value => value.sprintId === current) ? current : sorted[0]?.sprintId || ''); }).catch(error => { if (!controller.signal.aborted)
            setDirectoryError(error.message); }).finally(() => { if (!controller.signal.aborted)
            setDirectoryLoading(false); });
        return () => controller.abort();
    }, [directoryVersion]);
    useEffect(() => { try {
        localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
    }
    catch { } }, [teams]);
    useEffect(() => { if (sprint)
        try {
            localStorage.setItem(SPRINT_KEY, sprint);
        }
        catch { } }, [sprint]);
    useEffect(() => { try {
        localStorage.setItem(OWNER_KEY, owner);
    }
    catch { } }, [owner]);
    const openTeam = teams.find(team => team.id === openTeamId);
    const openMembers = openTeam?.members ?? [];
    const ownersKey = JSON.stringify([...new Set([owner, ...(loadedTeams.has(openTeamId) ? openMembers : [])])].sort());
    useEffect(() => {
        if (!sprint)
            return;
        const controller = new AbortController();
        const owners = JSON.parse(ownersKey).filter(username => !results[username] && !errors[username]);
        const worker = async () => { while (owners.length && !controller.signal.aborted) {
            const username = owners.shift();
            try {
                const data = await json(`/api/tomato-board/story-points?${new URLSearchParams({ sprint, assignee: username, refresh: String(version) })}`, controller.signal);
                if (!controller.signal.aborted)
                    setResults(current => ({ ...current, [username]: data }));
            }
            catch (error) {
                if (!controller.signal.aborted)
                    setErrors(current => ({ ...current, [username]: error instanceof Error ? error.message : '读取失败' }));
            }
        } };
        void Promise.all([worker(), worker(), worker()]);
        return () => controller.abort();
    }, [sprint, ownersKey, version]);
    const personal = results[owner];
    const items = useMemo(() => [...(personal?.items ?? [])].sort((a, b) => (b.storyPoints ?? -1) - (a.storyPoints ?? -1) || a.itemKey.localeCompare(b.itemKey)), [personal]);
    const sum = total(items);
    const slices = items.filter(item => item.storyPoints !== null && item.storyPoints > 0);
    let offset = 0;
    const gradient = slices.map((item, index) => { const start = offset; offset += item.storyPoints / sum * 100; return `${colors[index % colors.length]} ${start}% ${offset}%`; }).join(', ');
    const userName = (username) => username === 'currentUser()' ? '我' : users.find(user => user.username === username)?.name ?? username;
    const toggleTeam = (id) => { setOpenTeamId(current => current === id ? '' : id); setLoadedTeams(current => new Set(current).add(id)); setAddingTeamId(''); setTeamEditor(null); };
    const ranking = openMembers.map(username => ({ username, result: results[username], points: total(results[username]?.items ?? []) })).sort((a, b) => Number(Boolean(b.result)) - Number(Boolean(a.result)) || b.points - a.points || a.username.localeCompare(b.username));
    const max = Math.max(1, ...ranking.map(row => row.points));
    const available = users.filter(user => !openMembers.includes(user.username) && `${user.name} ${user.username}`.toLowerCase().includes(search.toLowerCase()));
    const submitTeam = () => { const name = teamDraft.trim(); if (!name || !teamEditor)
        return; if (teamEditor.mode === 'create') {
        const team = { id: teamId(), name, members: [] };
        setTeams(current => [...current, team]);
        setOpenTeamId(team.id);
        setLoadedTeams(current => new Set(current).add(team.id));
    }
    else
        setTeams(current => current.map(team => team.id === teamEditor.id ? { ...team, name } : team)); setTeamDraft(''); setTeamEditor(null); };
    const deleteTeam = (id) => { setTeams(current => current.filter(team => team.id !== id)); if (openTeamId === id)
        setOpenTeamId(''); setLoadedTeams(current => { const next = new Set(current); next.delete(id); return next; }); };
    const updateMembers = (id, updater) => setTeams(current => current.map(team => team.id === id ? { ...team, members: updater(team.members) } : team));
    useEffect(() => { if (!addingTeamId)
        return; const close = (event) => { if (event.target instanceof Node && !addPeopleRef.current?.contains(event.target)) {
        setAddingTeamId('');
        setSearch('');
    } }; document.addEventListener('pointerdown', close, true); requestAnimationFrame(() => addPeopleInputRef.current?.focus()); return () => document.removeEventListener('pointerdown', close, true); }, [addingTeamId]);
    useEffect(() => { toolbarTarget(_jsxs("div", { className: css.headerControls, children: [_jsxs("label", { children: [_jsx("span", { children: "\u8FED\u4EE3" }), _jsxs("select", { "aria-label": "\u9009\u62E9\u8FED\u4EE3", value: sprint, disabled: directoryLoading, onChange: event => { setSprint(event.target.value); setResults({}); setErrors({}); setLoadedTeams(new Set()); }, children: [!sprints.length && _jsx("option", { value: "", children: directoryLoading ? '正在读取迭代…' : '暂无迭代' }), sprints.map(value => _jsxs("option", { value: value.sprintId, children: [value.name, " \u00B7 ", value.workspaceKey, value.status === 'completed' ? '（已结束）' : ''] }, value.sprintId))] })] }), _jsx(Button, { variant: "toolbar", size: "sm", className: css.headerIconButton, icon: _jsx(IconRefreshOutline16, {}), title: "\u5237\u65B0", "aria-label": "\u5237\u65B0\u8FED\u4EE3\u6545\u4E8B\u70B9", onClick: () => { setResults({}); setErrors({}); setVersion(value => value + 1); if (directoryError || !sprints.length)
                    setDirectoryVersion(value => value + 1); } })] })); return () => toolbarTarget(null); }, [directoryError, directoryLoading, sprint, sprints, toolbarTarget]);
    return _jsxs("div", { className: css.page, children: [directoryError && _jsxs("p", { className: css.error, children: [directoryError, "\uFF0C\u8BF7\u70B9\u51FB\u5237\u65B0\u91CD\u8BD5\u3002"] }), _jsxs("div", { className: css.columns, children: [_jsxs("section", { className: css.panel, "aria-label": "\u4E2A\u4EBA\u6545\u4E8B\u70B9", children: [_jsxs("div", { className: css.panelHeader, children: [_jsx("h3", { children: "\u4E2A\u4EBA\u5206\u5E03" }), _jsxs("select", { "aria-label": "\u9009\u62E9\u4E2A\u4EBA\u8D1F\u8D23\u4EBA", value: owner, onChange: event => setOwner(event.target.value), children: [_jsx("option", { value: "currentUser()", children: "\u6211\u8D1F\u8D23\u7684" }), users.map(user => _jsxs("option", { value: user.username, children: [user.name, " \u00B7 ", user.username] }, user.username))] })] }), errors[owner] ? _jsx("p", { className: css.error, children: errors[owner] }) : !personal ? _jsx("p", { className: css.empty, children: sprint ? '正在读取个人故事点…' : '请选择迭代' }) : _jsxs(_Fragment, { children: [_jsxs("div", { className: css.summary, children: [_jsxs("div", { children: [_jsx("span", { className: css.eyebrow, children: "\u6545\u4E8B\u70B9\u603B\u6570" }), _jsxs("div", { className: css.total, children: [number(sum), _jsx("small", { children: " SP" })] })] }), _jsx("div", { className: css.pie, style: { background: gradient ? `conic-gradient(${gradient})` : undefined }, children: _jsxs("div", { children: [_jsx("strong", { children: slices.length }), _jsx("span", { children: "\u9879\u5360\u6BD4" })] }) })] }), _jsxs("div", { className: css.listHeading, children: [_jsx("h4", { children: "\u9700\u6C42\u5217\u8868" }), _jsxs("span", { children: [items.length, " \u9879"] })] }), !items.length && _jsx("p", { className: css.empty, children: "\u8BE5\u8D1F\u8D23\u4EBA\u5728\u672C\u8FED\u4EE3\u6682\u65E0\u4E8B\u9879\u3002" }), _jsx("div", { children: items.map(item => _jsxs("div", { className: css.item, role: "button", tabIndex: 0, "aria-label": `打开 ${item.itemKey} 的对话`, onClick: () => onOpenItem(item), onKeyDown: event => { if (event.key === 'Enter' || event.key === ' ') {
                                                event.preventDefault();
                                                onOpenItem(item);
                                            } }, children: [_jsx("span", { className: css.dot, style: { background: item.storyPoints && item.storyPoints > 0 ? colors[slices.indexOf(item) % colors.length] : 'var(--dsw-alias-border-l2, #ddd)' } }), _jsxs("div", { className: css.itemText, children: [_jsx("span", { className: css.itemTitle, children: item.title }), _jsx("small", { children: item.itemKey }), _jsx(Tag, { children: item.status })] }), _jsx("strong", { className: css.itemPoints, children: item.storyPoints === null ? '未估点' : `${number(item.storyPoints)} SP` }), _jsx(Button, { className: css.tomatoLink, variant: "ghost", size: "sm", title: "\u5728\u756A\u8304\u4E2D\u6253\u5F00\u4E8B\u9879", "aria-label": `在番茄中打开 ${item.itemKey}`, onClick: event => { event.stopPropagation(); window.open(item.tomatoUrl, '_blank', 'noopener,noreferrer'); }, onKeyDown: event => event.stopPropagation(), children: "\u2197" })] }, item.itemKey)) })] })] }), _jsxs("section", { className: css.panel, "aria-label": "\u56E2\u961F\u6545\u4E8B\u70B9", children: [_jsxs("div", { className: css.teamsHeader, children: [_jsx("h3", { children: "\u56E2\u961F\u5206\u5E03" }), _jsx("button", { className: css.addTeamButton, "aria-label": "\u521B\u5EFA\u56E2\u961F", title: "\u521B\u5EFA\u56E2\u961F", onClick: () => { setTeamEditor({ mode: 'create' }); setTeamDraft(''); }, children: "\uFF0B \u521B\u5EFA\u56E2\u961F" })] }), teamEditor?.mode === 'create' && _jsxs("form", { className: css.teamEditor, onSubmit: event => { event.preventDefault(); submitTeam(); }, children: [_jsx("input", { autoFocus: true, placeholder: "\u56E2\u961F\u540D\u79F0", value: teamDraft, onChange: event => setTeamDraft(event.target.value) }), _jsx("button", { type: "button", onClick: () => setTeamEditor(null), children: "\u53D6\u6D88" }), _jsx("button", { type: "submit", children: "\u521B\u5EFA" })] }), _jsx("div", { className: css.teamAccordions, children: teams.map(team => { const open = openTeamId === team.id; const rows = open ? ranking : []; return _jsxs("article", { className: css.teamAccordion, children: [_jsxs("div", { className: css.teamAccordionHeader, children: [_jsxs("button", { className: css.teamToggle, "aria-expanded": open, onClick: () => toggleTeam(team.id), children: [_jsx("span", { className: css.chevron, children: "\u203A" }), _jsx("strong", { children: team.name }), _jsxs("small", { children: [team.members.length, " \u4EBA"] })] }), _jsx("button", { className: css.renameTeam, "aria-label": `改名 ${team.name}`, title: "\u6539\u540D", onClick: () => { setTeamEditor({ mode: 'rename', id: team.id }); setTeamDraft(team.name); setOpenTeamId(team.id); }, children: "\u270E" }), _jsx("div", { className: css.teamRowActions, children: _jsx("button", { "aria-label": `删除 ${team.name}`, title: "\u5220\u9664", onClick: () => deleteTeam(team.id), children: "\u00D7" }) })] }), teamEditor?.mode === 'rename' && teamEditor.id === team.id && _jsxs("form", { className: css.teamEditor, onSubmit: event => { event.preventDefault(); submitTeam(); }, children: [_jsx("input", { autoFocus: true, value: teamDraft, onChange: event => setTeamDraft(event.target.value) }), _jsx("button", { type: "button", onClick: () => setTeamEditor(null), children: "\u53D6\u6D88" }), _jsx("button", { type: "submit", children: "\u4FDD\u5B58" })] }), open && _jsxs("div", { className: css.teamBody, children: [_jsxs("div", { className: css.teamBodyToolbar, children: [_jsx("span", { children: team.members.length ? '成员故事点' : '暂无成员' }), _jsxs("div", { ref: addingTeamId === team.id ? addPeopleRef : undefined, className: css.addPeopleRoot, children: [_jsx("button", { className: css.smallAddButton, onClick: () => setAddingTeamId(current => current === team.id ? '' : team.id), children: "\uFF0B \u6DFB\u52A0\u6210\u5458" }), addingTeamId === team.id && _jsxs("div", { className: css.addPeople, role: "dialog", children: [_jsxs("div", { className: css.addPeopleTitle, children: [_jsx("strong", { children: "\u6DFB\u52A0\u6210\u5458" }), _jsx("button", { onClick: () => setAddingTeamId(''), children: "\u00D7" })] }), _jsx("input", { ref: addPeopleInputRef, value: search, onChange: event => setSearch(event.target.value), placeholder: "\u641C\u7D22\u59D3\u540D\u6216\u7528\u6237\u540D\u2026" }), _jsxs("div", { children: [available.map(user => _jsxs("button", { onClick: () => { updateMembers(team.id, current => [...current, user.username]); setAddingTeamId(''); setSearch(''); }, children: [user.name, _jsx("small", { children: user.username }), _jsx("span", { children: "\uFF0B" })] }, user.username)), !available.length && _jsx("p", { children: "\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u6210\u5458" })] })] })] })] }), _jsx("div", { className: css.ranking, children: rows.map((row, index) => _jsx("div", { className: css.rankRow, children: _jsxs("div", { className: css.memberRow, children: [_jsxs("button", { className: css.rankLabel, "aria-pressed": owner === row.username, onClick: () => setOwner(row.username), children: [_jsx("i", { className: css.rankFill, style: { width: `${row.points / max * 100}%` } }), _jsx("span", { className: css.rankIndex, children: String(index + 1).padStart(2, '0') }), _jsx("span", { className: css.memberAvatar, children: userName(row.username).slice(0, 1) }), _jsxs("span", { className: css.memberIdentity, children: [_jsx("strong", { children: userName(row.username) }), _jsx("small", { children: row.result ? `${row.result.items.length} 个事项` : errors[row.username] ? '读取失败' : '读取中…' })] }), _jsx("b", { children: row.result ? `${number(row.points)} SP` : '—' })] }), _jsx("button", { className: css.removeMember, "aria-label": `移除 ${userName(row.username)}`, title: "\u79FB\u9664\u6210\u5458", onClick: () => updateMembers(team.id, current => current.filter(value => value !== row.username)), children: "\u00D7" })] }) }, row.username)) }), !team.members.length && _jsx("div", { className: css.teamBodyEmpty, children: "\u6DFB\u52A0\u6210\u5458\u540E\u67E5\u770B\u6545\u4E8B\u70B9\u5206\u5E03" })] })] }, team.id); }) }), !teams.length && _jsx("div", { className: css.empty, children: "\u70B9\u51FB\u53F3\u4E0A\u89D2\u52A0\u53F7\u521B\u5EFA\u56E2\u961F\u3002" })] })] })] });
}
//# sourceMappingURL=StoryPoints.js.map