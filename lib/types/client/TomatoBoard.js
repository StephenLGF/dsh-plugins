import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Button, IconCloseOutline16, IconRefreshOutline16, Menu, Modal, } from '@deepseek-ai/dsh-client-ui-primitives';
import { SessionId } from '@deepseek-ai/dsh-session/types';
import css from './tomato-board.module.css';
let state = { open: false, loading: false, items: [], error: null, selectedItem: null };
let disposeWorkbench = null;
const listeners = new Set();
const emit = (patch) => {
    state = { ...state, ...patch };
    for (const listener of listeners)
        listener();
};
const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};
const snapshot = () => state;
const TOMATO_TYPE_OPTIONS = ['测试缺陷', '缺陷', 'Bug', 'EnablerStory', 'Story', 'Task'];
const TOMATO_STATUS_ORDER = [
    '新建', 'Bugfix', '修复中', '开发中', '待测试', '测试中', '测试通过', '已完成',
    '已取消', '延期解决', '测试完成', '待开发', '不修复', '已挂起',
];
const TOMATO_FILTER_BLACKLIST_KEY = 'taskboard.tomatoFilterBlacklist.v1';
const TOMATO_SESSION_LINKS_KEY = 'taskboard.tomatoSessionLinks.v1';
function readSessionLinks() {
    try {
        const value = JSON.parse(window.localStorage.getItem(TOMATO_SESSION_LINKS_KEY) ?? '{}');
        return value && typeof value === 'object' ? value : {};
    }
    catch {
        return {};
    }
}
function linkedSessionId(itemKey) {
    const value = readSessionLinks()[itemKey];
    return typeof value === 'string' && value ? SessionId(value) : '';
}
function saveSessionLink(itemKey, sessionId) {
    const links = readSessionLinks();
    links[itemKey] = sessionId;
    window.localStorage.setItem(TOMATO_SESSION_LINKS_KEY, JSON.stringify(links));
}
function readFilterBlacklist() {
    try {
        const value = JSON.parse(window.localStorage.getItem(TOMATO_FILTER_BLACKLIST_KEY) ?? '{}');
        return {
            types: new Set(Array.isArray(value?.types) ? value.types.filter((item) => typeof item === 'string') : []),
            statuses: new Set(Array.isArray(value?.statuses) ? value.statuses.filter((item) => typeof item === 'string') : []),
        };
    }
    catch {
        return { types: new Set(), statuses: new Set() };
    }
}
async function refresh() {
    emit({ loading: true, error: null });
    try {
        const response = await fetch('/api/tomato-board/items', { headers: { accept: 'application/json' } });
        const body = await response.json();
        if (!response.ok)
            throw new Error(body.error || `请求失败 (${response.status})`);
        emit({ items: body.items ?? [] });
    }
    catch (error) {
        emit({ error: error instanceof Error ? error.message : '番茄事项读取失败' });
    }
    finally {
        emit({ loading: false });
    }
}
function closeWorkbench() {
    const dispose = disposeWorkbench;
    disposeWorkbench = null;
    emit({ open: false, selectedItem: null });
    dispose?.();
}
function TomatoBoardAction({ wide, openWorkbench }) {
    return (_jsxs("button", { className: css.sidebarAction, type: "button", title: "\u756A\u8304\u5DE5\u4F5C\u53F0", onClick: openWorkbench, children: [_jsx("span", { className: css.tomatoIcon, "aria-hidden": "true", children: "T" }), wide && _jsx("span", { children: "\u756A\u8304\u5DE5\u4F5C\u53F0" })] }));
}
function CreateConversationDialog({ ctx, item }) {
    const [workspaceId, setWorkspaceId] = useState('');
    const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState(null);
    const workspaces = useSyncExternalStore(listener => ctx.workspaces.list.subscribe(listener), () => ctx.workspaces.list.getSnapshot(), () => ctx.workspaces.list.getSnapshot());
    const selectedWorkspace = workspaces.items.find(workspace => workspace.workspaceId === workspaceId);
    async function createConversation() {
        if (!selectedWorkspace || creating)
            return;
        setCreating(true);
        setError(null);
        try {
            const createdSessionId = await ctx.sessions.create({ workspaceId: selectedWorkspace.workspaceId });
            const session = ctx.sessions.binding(createdSessionId)?.session;
            if (!session)
                throw new Error('新建对话未能在 Harness 中加载');
            const title = `[${item.itemKey}] ${item.title}`;
            const renamed = await session.rename(title);
            if (!renamed.ok)
                throw new Error(`对话标题设置失败：${renamed.error.message}`);
            const prompt = [
                `请处理番茄事项 ${item.itemKey}。`,
                `标题：${item.title}`,
                `类型：${item.itemType || '未设置'}`,
                `状态：${item.status || '未设置'}`,
                `优先级：${item.priority || '未设置'}`,
            ].join('\n');
            const prompted = await session.prompt([{ type: 'text', text: prompt }], 'queue');
            if (!prompted.ok)
                throw new Error(`事项上下文写入失败：${prompted.error.message}`);
            saveSessionLink(item.itemKey, createdSessionId);
            ctx.sessions.open(createdSessionId);
            closeWorkbench();
        }
        catch (reason) {
            setError(reason instanceof Error ? reason.message : 'Harness 对话创建失败');
        }
        finally {
            setCreating(false);
        }
    }
    return (_jsx(Modal, { open: true, onClose: () => emit({ selectedItem: null }), title: "\u9009\u62E9\u5904\u7406\u8BE5\u4E8B\u9879\u7684\u4ED3\u5E93", closeLabel: "\u5173\u95ED", description: item.title, className: css.createDialog, footer: (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "ghost", onClick: () => emit({ selectedItem: null }), children: "\u53D6\u6D88" }), _jsx(Button, { variant: "primary", disabled: !selectedWorkspace || creating, onClick: () => void createConversation(), children: creating ? '正在创建…' : '创建并进入对话' })] })), children: _jsxs("div", { className: css.dialogBody, children: [_jsx("span", { children: item.itemKey }), error ? _jsx("div", { className: css.error, role: "alert", children: error }) : null, _jsx(Menu, { open: workspaceMenuOpen, portal: true, items: workspaces.items.map((workspace) => ({
                        id: workspace.workspaceId,
                        label: workspace.title,
                    })), selectedId: workspaceId || undefined, onSelect: id => {
                        setWorkspaceId(id);
                        setWorkspaceMenuOpen(false);
                    }, onClose: () => setWorkspaceMenuOpen(false), anchor: (_jsxs(Button, { className: css.workspaceTrigger, variant: "outline", "aria-haspopup": "menu", "aria-expanded": workspaceMenuOpen, onClick: () => setWorkspaceMenuOpen(open => !open), children: [_jsx("span", { children: selectedWorkspace?.title ?? '选择 Harness 项目…' }), _jsx("span", { "aria-hidden": "true", children: "\u2304" })] })) }), selectedWorkspace ? _jsx("code", { children: selectedWorkspace.path }) : null] }) }));
}
function TomatoBoardPanel({ ctx }) {
    const board = useSyncExternalStore(subscribe, snapshot, snapshot);
    const workbenchRef = useRef(null);
    const [search, setSearch] = useState('');
    const [blacklist, setBlacklist] = useState(readFilterBlacklist);
    const sessions = useSyncExternalStore(listener => ctx.sessions.list.subscribe(listener), () => ctx.sessions.list.getSnapshot(), () => ctx.sessions.list.getSnapshot());
    useEffect(() => {
        if (board.open && board.items.length === 0 && !board.loading && !board.error)
            void refresh();
    }, [board.error, board.items.length, board.loading, board.open]);
    useEffect(() => {
        if (!board.open)
            return;
        const closeOnOutsideNavigation = (event) => {
            if (!(event.target instanceof Element))
                return;
            if (workbenchRef.current?.contains(event.target))
                return;
            if (event.target.closest('[role="dialog"], [role="menu"]'))
                return;
            closeWorkbench();
        };
        document.addEventListener('pointerdown', closeOnOutsideNavigation, true);
        return () => document.removeEventListener('pointerdown', closeOnOutsideNavigation, true);
    }, [board.open]);
    if (!board.open)
        return null;
    function openItem(item) {
        const stored = linkedSessionId(item.itemKey);
        const titlePrefix = `[${item.itemKey}]`;
        const discovered = sessions.ids.find(id => {
            const summary = sessions.byId[id];
            return summary?.title?.startsWith(titlePrefix) || summary?.displayTitle.startsWith(titlePrefix);
        });
        const associated = stored && sessions.byId[stored] ? stored : discovered;
        if (associated) {
            saveSessionLink(item.itemKey, associated);
            ctx.sessions.open(associated);
            closeWorkbench();
            return;
        }
        emit({ selectedItem: item });
    }
    const normalizedSearch = search.trim().toLowerCase();
    const filteredItems = board.items.filter(item => (!blacklist.types.has(item.itemType)
        && !blacklist.statuses.has(item.status)
        && (!normalizedSearch || [
            item.itemKey, item.title, item.itemType, item.status, item.workspace, item.creator, item.priority,
        ].join(' ').toLowerCase().includes(normalizedSearch))));
    const typeOptions = [...new Set([...TOMATO_TYPE_OPTIONS, ...board.items.map(item => item.itemType).filter(Boolean)])];
    const statusOptions = [...new Set([
            ...TOMATO_STATUS_ORDER,
            ...board.items.map(item => item.status).filter(status => !TOMATO_STATUS_ORDER.includes(status)),
        ])];
    const statuses = [...new Set([
            ...TOMATO_STATUS_ORDER.filter(status => filteredItems.some(item => item.status === status)),
            ...filteredItems.map(item => item.status).filter(status => !TOMATO_STATUS_ORDER.includes(status)),
        ])];
    const toggleBlacklist = (kind, value) => setBlacklist(current => {
        const nextValues = new Set(current[kind]);
        if (nextValues.has(value))
            nextValues.delete(value);
        else
            nextValues.add(value);
        const next = { ...current, [kind]: nextValues };
        window.localStorage.setItem(TOMATO_FILTER_BLACKLIST_KEY, JSON.stringify({
            types: [...next.types],
            statuses: [...next.statuses],
        }));
        return next;
    });
    return (_jsxs("section", { ref: workbenchRef, className: css.workbench, "aria-label": "\u756A\u8304\u5DE5\u4F5C\u53F0", children: [_jsxs("header", { className: css.header, children: [_jsxs("div", { children: [_jsx("h1", { children: "\u756A\u8304\u5DE5\u4F5C\u53F0" }), _jsx("p", { children: board.loading ? '正在读取番茄事项…' : `显示 ${filteredItems.length} / ${board.items.length} 个事项` })] }), _jsxs("div", { className: css.actions, children: [_jsxs("label", { className: css.searchField, children: [_jsx("span", { "aria-hidden": "true", children: "\u2315" }), _jsx("input", { type: "search", value: search, onChange: event => setSearch(event.target.value), placeholder: "\u641C\u7D22\u6807\u9898\u6216 tag\u2026", "aria-label": "\u641C\u7D22\u6807\u9898\u6216 tag" }), search && _jsx("button", { type: "button", "aria-label": "\u6E05\u7A7A\u641C\u7D22\u8BCD", onClick: () => setSearch(''), children: "\u00D7" })] }), _jsxs("details", { className: css.filterMenu, children: [_jsxs("summary", { "aria-label": "\u7C7B\u578B\u548C\u72B6\u6001\u7B5B\u9009", title: "\u7C7B\u578B\u548C\u72B6\u6001\u7B5B\u9009", children: [_jsx("span", { "aria-hidden": "true", children: "\u25BD" }), (blacklist.types.size > 0 || blacklist.statuses.size > 0) && _jsx("i", {})] }), _jsxs("div", { className: css.filterPopover, children: [_jsx(FilterRow, { label: "\u7C7B\u578B", options: typeOptions, hidden: blacklist.types, onToggle: value => toggleBlacklist('types', value) }), _jsx(FilterRow, { label: "\u72B6\u6001", options: statusOptions, hidden: blacklist.statuses, onToggle: value => toggleBlacklist('statuses', value) })] })] }), _jsx(Button, { variant: "toolbar", size: "sm", className: css.headerIconButton, icon: _jsx(IconRefreshOutline16, {}), title: "\u5237\u65B0\u756A\u8304\u4E8B\u9879", "aria-label": "\u5237\u65B0\u756A\u8304\u4E8B\u9879", disabled: board.loading, onClick: () => void refresh() }), _jsx(Button, { variant: "toolbar", size: "sm", className: css.headerIconButton, icon: _jsx(IconCloseOutline16, {}), title: "\u5173\u95ED\u756A\u8304\u5DE5\u4F5C\u53F0", "aria-label": "\u5173\u95ED\u756A\u8304\u5DE5\u4F5C\u53F0", onClick: closeWorkbench })] })] }), board.error && _jsx("div", { className: css.error, role: "alert", children: board.error }), _jsxs("div", { className: css.board, children: [statuses.map(status => {
                        const items = filteredItems.filter(item => item.status === status);
                        return (_jsxs("section", { className: css.lane, "aria-labelledby": `tomato-lane-${status}`, children: [_jsxs("header", { className: css.laneHeader, children: [_jsx("h2", { id: `tomato-lane-${status}`, children: status }), _jsx("span", { children: items.length })] }), _jsx("div", { className: css.cards, children: items.map(item => (_jsxs("article", { className: css.card, tabIndex: 0, role: "button", onClick: () => openItem(item), onKeyDown: event => {
                                            if (event.key === 'Enter' || event.key === ' ') {
                                                event.preventDefault();
                                                openItem(item);
                                            }
                                        }, children: [_jsxs("div", { className: css.cardTopline, children: [_jsx("span", { className: css.key, children: item.itemKey }), _jsx(Button, { className: css.tomatoLink, variant: "ghost", size: "sm", title: "\u5728\u756A\u8304\u4E2D\u6253\u5F00\u4E8B\u9879", "aria-label": `在番茄中打开 ${item.itemKey}`, onClick: event => {
                                                            event.stopPropagation();
                                                            window.open(`/api/tomato-board/open/${encodeURIComponent(item.itemKey)}`, '_blank', 'noopener,noreferrer');
                                                        }, onKeyDown: event => event.stopPropagation(), children: "\u2197" })] }), _jsx("strong", { children: item.title }), _jsx("span", { className: css.meta, children: [item.itemType, item.priority, item.creator].filter(Boolean).join(' · ') })] }, item.itemKey))) })] }, status));
                    }), !board.loading && !board.error && statuses.length === 0 && (_jsx("div", { className: css.empty, children: "\u5F53\u524D\u6CA1\u6709\u53EF\u663E\u793A\u7684\u756A\u8304\u4E8B\u9879" }))] }), board.selectedItem ? _jsx(CreateConversationDialog, { ctx: ctx, item: board.selectedItem }) : null] }));
}
function FilterRow({ label, options, hidden, onToggle }) {
    return (_jsxs("div", { className: css.filterRow, children: [_jsx("span", { children: label }), _jsx("div", { children: options.map(option => (_jsx("button", { className: hidden.has(option) ? '' : css.selectedFilter, type: "button", "aria-pressed": !hidden.has(option), onClick: () => onToggle(option), children: option }, option))) })] }));
}
function TomatoConversationShortcut({ sessionId, useSessions }) {
    const itemKey = useSessions(state => {
        const summary = state.byId[sessionId];
        const title = summary?.title ?? summary?.displayTitle ?? '';
        return /^\[([^\]]+)\]/u.exec(title)?.[1]?.trim() ?? '';
    });
    if (!itemKey)
        return null;
    return (_jsx(Button, { variant: "toolbar", size: "sm", title: "\u5728\u756A\u8304\u4E2D\u6253\u5F00\u4E8B\u9879", "aria-label": `在番茄中打开 ${itemKey}`, onClick: () => window.open(`/api/tomato-board/open/${encodeURIComponent(itemKey)}`, '_blank', 'noopener,noreferrer'), children: "\u756A\u8304 \u2197" }));
}
export const inject = ['slots', 'sessions', 'workspaces'];
export function apply(ctx) {
    ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({ name: 'conversation.session.header.actions', id: 'tomato-shortcut', order: 12 }, TomatoConversationShortcut));
    ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({ name: 'sidebar.footer.action', id: 'tomato-board' }, props => _jsx(TomatoBoardAction, { ...props, openWorkbench: () => {
            if (disposeWorkbench)
                return;
            emit({ open: true });
            disposeWorkbench = ctx.slots.register({ name: 'conversation', priority: -100 }, () => _jsx(TomatoBoardPanel, { ctx: ctx }));
        } })));
}
//# sourceMappingURL=TomatoBoard.js.map