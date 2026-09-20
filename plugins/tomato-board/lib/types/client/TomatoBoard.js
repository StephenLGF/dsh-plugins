import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { Button, IconChevronDownOutline14, IconCloseOutline16, IconRefreshOutline16, Menu, Modal, } from '@deepseek-ai/dsh-client-ui-primitives';
import { SessionId } from '@deepseek-ai/dsh-session/types';
import css from './tomato-board.module.css';
import { StoryPoints } from './StoryPoints';
import { Tag } from './Tag';
let state = { open: false, loading: false, loaded: false, items: [], error: null, successMessage: null, selectedItem: null, truncated: false };
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
// 真实番茄事项 itemKey 形如 `Gitee-Test-2026-737`、`Proxima-1116`：字母前缀（可含连字符分段）+ 数字结尾。
// 只匹配该格式可避免把任意 `[xxx]` 开头的普通对话标题（如 `[分析]`、`[每日复盘]`）误判为番茄事项，
// 进而错误地在对话头上渲染出状态流转按钮并触发无意义的 CLI 调用。
const TOMATO_ITEM_KEY_PATTERN = /^\[([A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-\d+)\]/u;
const TOMATO_STATUS_ORDER = [
    '新建', 'Bugfix', '修复中', '开发中', '待测试', '测试中', '测试通过', '已完成',
    '已取消', '延期解决', '测试完成', '待开发', '不修复', '已挂起',
];
const TOMATO_FILTER_BLACKLIST_KEY = 'taskboard.tomatoFilterBlacklist.v1';
const TOMATO_SESSION_LINKS_KEY = 'taskboard.tomatoSessionLinks.v1';
const TOMATO_MUTED_ITEMS_KEY = 'taskboard.tomatoMutedItems.v1';
const TOMATO_LANE_ORDER_KEY = 'taskboard.tomatoLaneOrder.v1';
function readLaneOrder() {
    try {
        const value = JSON.parse(window.localStorage.getItem(TOMATO_LANE_ORDER_KEY) ?? '{}');
        return {
            head: typeof value?.head === 'string' ? value.head : null,
            next: value?.next && typeof value.next === 'object' ? value.next : {},
        };
    }
    catch {
        return { head: null, next: {} };
    }
}
function laneOrderValues(order) {
    const values = [];
    const seen = new Set();
    let current = order.head;
    while (current && !seen.has(current) && values.length < 1000) {
        values.push(current);
        seen.add(current);
        current = order.next[current] ?? null;
    }
    return values;
}
function createLaneOrder(values) {
    const next = {};
    values.forEach((value, index) => { next[value] = values[index + 1] ?? null; });
    return { head: values[0] ?? null, next };
}
function applyLaneOrder(statuses, order) {
    const available = new Set(statuses);
    const tracked = laneOrderValues(order).filter(status => available.has(status));
    const trackedSet = new Set(tracked);
    return [...tracked, ...statuses.filter(status => !trackedSet.has(status))];
}
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
            workspaces: new Set(Array.isArray(value?.workspaces) ? value.workspaces.filter((item) => typeof item === 'string') : []),
        };
    }
    catch {
        return { types: new Set(), statuses: new Set(), workspaces: new Set() };
    }
}
function readMutedItems() {
    try {
        const value = JSON.parse(window.localStorage.getItem(TOMATO_MUTED_ITEMS_KEY) ?? '[]');
        return new Set(Array.isArray(value) ? value.filter((item) => typeof item === 'string') : []);
    }
    catch {
        return new Set();
    }
}
async function refresh(assignee = 'currentUser()') {
    emit({ loading: true, error: null, successMessage: null });
    try {
        const query = new URLSearchParams({ assignee });
        const response = await fetch(`/api/tomato-board/items?${query}`, { headers: { accept: 'application/json' } });
        const body = await response.json();
        if (!response.ok)
            throw new Error(body.error || `请求失败 (${response.status})`);
        emit({ items: body.items ?? [], truncated: body.truncated === true, loaded: true, successMessage: `已刷新 ${body.items?.length ?? 0} 条事项` });
        setTimeout(() => emit({ successMessage: null }), 2000);
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
    // 关闭时清掉 loaded 和 error：下次打开工作台会重新拉取一次最新数据。
    emit({ open: false, selectedItem: null, loaded: false, error: null, successMessage: null });
    dispose?.();
}
function TomatoBoardAction({ wide, openWorkbench }) {
    return (_jsxs("button", { className: css.sidebarAction, type: "button", title: "\u756A\u8304\u5DE5\u4F5C\u53F0", onClick: openWorkbench, children: [_jsx("span", { className: css.tomatoIcon, "aria-hidden": "true", children: "T" }), wide && _jsx("span", { children: "\u756A\u8304\u5DE5\u4F5C\u53F0" })] }));
}
function TomatoBoardTopbarAction({ openWorkbench }) {
    return (_jsxs("button", { className: css.topbarAction, type: "button", title: "\u6253\u5F00\u756A\u8304\u5DE5\u4F5C\u53F0", onClick: openWorkbench, children: [_jsx("span", { className: css.tomatoIcon, "aria-hidden": "true", children: "T" }), _jsx("span", { children: "\u756A\u8304\u5DE5\u4F5C\u53F0" })] }));
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
    const filterMenuRef = useRef(null);
    const [page, setPage] = useState('board');
    const [storyToolbar, setStoryToolbar] = useState(null);
    const [search, setSearch] = useState('');
    const [blacklist, setBlacklist] = useState(readFilterBlacklist);
    const [mutedItems, setMutedItems] = useState(readMutedItems);
    const [selectedAssignee, setSelectedAssignee] = useState('currentUser()');
    const [filterDirectory, setFilterDirectory] = useState({ users: [], workspaces: [] });
    const [directoryVersion, setDirectoryVersion] = useState(0);
    const [laneOrder, setLaneOrder] = useState(readLaneOrder);
    const [draggedLane, setDraggedLane] = useState(null);
    const [dropLane, setDropLane] = useState(null);
    const laneElements = useRef(new Map());
    const previousLanePositions = useRef(new Map());
    const sessions = useSyncExternalStore(listener => ctx.sessions.list.subscribe(listener), () => ctx.sessions.list.getSnapshot(), () => ctx.sessions.list.getSnapshot());
    useEffect(() => {
        // 用 loaded 而不是 items.length 判断：成功返回空列表时也算加载完成，
        // 否则 loading 变回 false 会再次命中本 effect，形成无限请求循环。
        if (board.open && !board.loaded && !board.loading && !board.error)
            void refresh();
    }, [board.error, board.loaded, board.loading, board.open]);
    useEffect(() => {
        if (!board.open)
            return;
        void fetch('/api/tomato-board/filters', { headers: { accept: 'application/json' } })
            .then(response => response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`)))
            .then(value => setFilterDirectory(value))
            .catch(() => { });
    }, [board.open, directoryVersion]);
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
    useEffect(() => {
        const closeFilterMenu = (event) => {
            const menu = filterMenuRef.current;
            if (menu?.open && event.target instanceof Node && !menu.contains(event.target))
                menu.open = false;
        };
        const closeFilterMenuOnEscape = (event) => {
            if (event.key === 'Escape' && filterMenuRef.current?.open)
                filterMenuRef.current.open = false;
        };
        document.addEventListener('pointerdown', closeFilterMenu, true);
        document.addEventListener('keydown', closeFilterMenuOnEscape);
        return () => {
            document.removeEventListener('pointerdown', closeFilterMenu, true);
            document.removeEventListener('keydown', closeFilterMenuOnEscape);
        };
    }, []);
    useLayoutEffect(() => {
        const previous = previousLanePositions.current;
        if (previous.size === 0)
            return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            previous.clear();
            return;
        }
        for (const [status, element] of laneElements.current) {
            const before = previous.get(status);
            if (!before)
                continue;
            const after = element.getBoundingClientRect();
            const deltaX = before.left - after.left;
            const deltaY = before.top - after.top;
            if (deltaX || deltaY) {
                element.animate([{ transform: `translate(${deltaX}px, ${deltaY}px)` }, { transform: 'translate(0, 0)' }], { duration: 240, easing: 'cubic-bezier(.2,.8,.2,1)' });
            }
        }
        previous.clear();
    }, [laneOrder]);
    if (!board.open)
        return null;
    function openItem(item) {
        const stored = linkedSessionId(item.itemKey);
        const titlePrefix = `[${item.itemKey}]`;
        // 只有至少跑过一轮对话的会话才算「已关联」：blank 会话（创建后没跑起来、
        // 流程失败留下的空壳等）不拦截点击，让它走选项目的新建流程。
        const hasConversation = (id) => sessions.byId[id]?.blank === false;
        const discovered = sessions.ids.find(id => {
            const summary = sessions.byId[id];
            const matched = summary?.title?.startsWith(titlePrefix) === true || summary?.displayTitle?.startsWith(titlePrefix) === true;
            return matched && hasConversation(id);
        });
        const associated = stored && hasConversation(stored) ? stored : discovered;
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
        && !blacklist.workspaces.has(item.workspaceKey)
        && !blacklist.workspaces.has(item.workspaceName)
        && (!normalizedSearch || [
            item.itemKey, item.title, item.itemType, item.status, item.workspaceKey, item.workspaceName, item.creator, item.assignees.join(' '), item.priority,
        ].join(' ').toLowerCase().includes(normalizedSearch))));
    const typeOptions = [...new Set(board.items.map(item => item.itemType).filter(Boolean))].sort((left, right) => left.localeCompare(right));
    const statusOptions = applyLaneOrder([...new Set([
            ...TOMATO_STATUS_ORDER,
            ...board.items.map(item => item.status).filter(status => !TOMATO_STATUS_ORDER.includes(status)),
        ])], laneOrder);
    // Workspace options derive purely from the current assignee's items (the
    // board query is already assignee-scoped server-side), so the count is
    // however many workspaces that assignee actually spans — never the logged-in
    // account's full directory. The item filter checks key AND name so both
    // identity forms hide correctly.
    const workspaceOptions = (() => {
        const entries = new Map();
        for (const item of board.items) {
            const value = item.workspaceKey || item.workspaceName || item.workspace;
            if (!value)
                continue;
            const label = item.workspaceName && item.workspaceKey && item.workspaceName !== item.workspaceKey ? `${item.workspaceName} (${item.workspaceKey})` : value;
            if (!entries.has(value))
                entries.set(value, { value, label });
        }
        return [...entries.values()];
    })();
    const defaultStatuses = [...new Set([
            ...TOMATO_STATUS_ORDER.filter(status => filteredItems.some(item => item.status === status)),
            ...filteredItems.map(item => item.status).filter(status => !TOMATO_STATUS_ORDER.includes(status)),
        ])];
    const statuses = applyLaneOrder(defaultStatuses, laneOrder);
    const persistBlacklist = (next) => {
        window.localStorage.setItem(TOMATO_FILTER_BLACKLIST_KEY, JSON.stringify({
            types: [...next.types],
            statuses: [...next.statuses],
            workspaces: [...next.workspaces],
        }));
        return next;
    };
    const toggleBlacklist = (kind, value) => setBlacklist(current => {
        const nextValues = new Set(current[kind]);
        if (nextValues.has(value))
            nextValues.delete(value);
        else
            nextValues.add(value);
        return persistBlacklist({ ...current, [kind]: nextValues });
    });
    const setWorkspaceFilterAll = (visible) => setBlacklist(current => persistBlacklist({
        ...current,
        workspaces: visible ? new Set() : new Set(workspaceOptions.map(option => option.value)),
    }));
    const toggleMutedItem = (itemKey) => setMutedItems(current => {
        const next = new Set(current);
        if (next.has(itemKey))
            next.delete(itemKey);
        else
            next.add(itemKey);
        window.localStorage.setItem(TOMATO_MUTED_ITEMS_KEY, JSON.stringify([...next]));
        return next;
    });
    const moveLane = (dragged, target, after) => {
        if (dragged === target)
            return;
        previousLanePositions.current = new Map([...laneElements.current].map(([status, element]) => [status, element.getBoundingClientRect()]));
        setLaneOrder(current => {
            const visible = applyLaneOrder(defaultStatuses, current).filter(status => status !== dragged);
            const targetIndex = visible.indexOf(target);
            visible.splice(targetIndex + (after ? 1 : 0), 0, dragged);
            const previousTracked = laneOrderValues(current);
            const trackedSet = new Set([...previousTracked, dragged, target]);
            const hiddenTracked = previousTracked.filter(status => !visible.includes(status));
            const next = createLaneOrder([...visible.filter(status => trackedSet.has(status)), ...hiddenTracked]);
            window.localStorage.setItem(TOMATO_LANE_ORDER_KEY, JSON.stringify(next));
            return next;
        });
    };
    return (_jsxs("section", { ref: workbenchRef, className: css.workbench, "aria-label": "\u756A\u8304\u5DE5\u4F5C\u53F0", children: [_jsxs("header", { className: css.header, children: [_jsxs("div", { className: css.titleRow, children: [_jsx("h1", { children: "\u756A\u8304\u5DE5\u4F5C\u53F0" }), _jsxs("div", { className: css.actions, children: [page === 'points' && storyToolbar, page === 'board' && _jsxs(_Fragment, { children: [_jsxs("label", { className: css.searchField, children: [_jsx("span", { "aria-hidden": "true", children: "\u2315" }), _jsx("input", { type: "search", value: search, onChange: event => setSearch(event.target.value), placeholder: "\u641C\u7D22\u6807\u9898\u6216 tag\u2026", "aria-label": "\u641C\u7D22\u6807\u9898\u6216 tag" }), search && _jsx("button", { type: "button", "aria-label": "\u6E05\u7A7A\u641C\u7D22\u8BCD", onClick: () => setSearch(''), children: "\u00D7" })] }), _jsxs("details", { ref: filterMenuRef, className: css.filterMenu, children: [_jsxs("summary", { "aria-label": "\u7A7A\u95F4\u3001\u8D1F\u8D23\u4EBA\u3001\u7C7B\u578B\u548C\u72B6\u6001\u7B5B\u9009", title: "\u7A7A\u95F4\u3001\u8D1F\u8D23\u4EBA\u3001\u7C7B\u578B\u548C\u72B6\u6001\u7B5B\u9009", children: [_jsx("span", { "aria-hidden": "true", children: "\u25BD" }), (blacklist.types.size > 0 || blacklist.statuses.size > 0 || blacklist.workspaces.size > 0 || selectedAssignee !== 'currentUser()') && _jsx("i", {})] }), _jsxs("div", { className: css.filterPopover, children: [_jsx(WorkspaceFilterRow, { options: workspaceOptions, hidden: blacklist.workspaces, onToggle: value => toggleBlacklist('workspaces', value), onSetAll: setWorkspaceFilterAll }), _jsx(AssigneePicker, { users: filterDirectory.users, value: selectedAssignee, onChange: value => { setSelectedAssignee(value); void refresh(value); } }), _jsx(FilterRow, { label: "\u7C7B\u578B", options: typeOptions, hidden: blacklist.types, onToggle: value => toggleBlacklist('types', value) }), _jsx(FilterRow, { label: "\u72B6\u6001", options: statusOptions, hidden: blacklist.statuses, onToggle: value => toggleBlacklist('statuses', value) })] })] }), _jsx(Button, { variant: "toolbar", size: "sm", className: css.headerIconButton, icon: _jsx(IconRefreshOutline16, {}), title: "\u5237\u65B0\u756A\u8304\u4E8B\u9879", "aria-label": "\u5237\u65B0\u756A\u8304\u4E8B\u9879", disabled: board.loading, onClick: () => { void refresh(selectedAssignee); setDirectoryVersion(value => value + 1); } })] }), _jsx(Button, { variant: "toolbar", size: "sm", className: css.headerIconButton, icon: _jsx(IconCloseOutline16, {}), title: "\u5173\u95ED\u756A\u8304\u5DE5\u4F5C\u53F0", "aria-label": "\u5173\u95ED\u756A\u8304\u5DE5\u4F5C\u53F0", onClick: closeWorkbench })] })] }), _jsxs("nav", { className: css.pageTabs, "aria-label": "\u756A\u8304\u5DE5\u4F5C\u53F0\u9875\u9762", children: [_jsx("button", { type: "button", "aria-current": page === 'board' ? 'page' : undefined, onClick: () => setPage('board'), children: "\u4E8B\u9879\u770B\u677F" }), _jsx("button", { type: "button", "aria-current": page === 'points' ? 'page' : undefined, onClick: () => setPage('points'), children: "\u8FED\u4EE3\u6295\u5165" })] })] }), page === 'points' ? _jsx(StoryPoints, { toolbarTarget: setStoryToolbar, onOpenItem: openItem }) : _jsxs(_Fragment, { children: [board.successMessage && _jsx("div", { className: css.success, role: "status", children: board.successMessage }), board.error && _jsx("div", { className: css.error, role: "alert", children: board.error }), board.truncated && _jsxs("p", { className: css.notice, role: "status", children: ["\u4E8B\u9879\u6570\u91CF\u5DF2\u8FBE\u914D\u7F6E\u4E0A\u9650\uFF0C\u5F53\u524D\u4EC5\u5C55\u793A\u524D ", board.items.length, " \u6761\u3002"] }), _jsxs("div", { className: css.board, children: [statuses.map(status => {
                                const items = filteredItems.filter(item => item.status === status);
                                return (_jsxs("section", { ref: element => { if (element)
                                        laneElements.current.set(status, element);
                                    else
                                        laneElements.current.delete(status); }, className: `${css.lane} ${draggedLane === status ? css.laneDragging : ''} ${dropLane?.status === status ? (dropLane.after ? css.laneDropAfter : css.laneDropBefore) : ''}`, "aria-labelledby": `tomato-lane-${status}`, onDragOver: event => {
                                        if (!draggedLane || draggedLane === status)
                                            return;
                                        event.preventDefault();
                                        const bounds = event.currentTarget.getBoundingClientRect();
                                        setDropLane({ status, after: event.clientX >= bounds.left + bounds.width / 2 });
                                    }, onDrop: event => {
                                        event.preventDefault();
                                        if (draggedLane && dropLane?.status === status)
                                            moveLane(draggedLane, status, dropLane.after);
                                        setDraggedLane(null);
                                        setDropLane(null);
                                    }, children: [_jsxs("header", { className: css.laneHeader, draggable: true, title: "\u62D6\u62FD\u8C03\u6574\u6CF3\u9053\u987A\u5E8F", onDragStart: event => {
                                                event.dataTransfer.effectAllowed = 'move';
                                                event.dataTransfer.setData('text/plain', status);
                                                const lane = event.currentTarget.parentElement;
                                                if (lane) {
                                                    const bounds = lane.getBoundingClientRect();
                                                    event.dataTransfer.setDragImage(lane, Math.min(Math.max(event.clientX - bounds.left, 0), bounds.width), Math.min(Math.max(event.clientY - bounds.top, 0), bounds.height));
                                                }
                                                setDraggedLane(status);
                                            }, onDragEnd: () => { setDraggedLane(null); setDropLane(null); }, children: [_jsx("h2", { id: `tomato-lane-${status}`, children: status }), _jsx("span", { children: items.length })] }), _jsx("div", { className: css.cards, children: items.map(item => (_jsxs("article", { className: `${css.card} ${mutedItems.has(item.itemKey) ? css.cardMuted : ''}`, tabIndex: 0, role: "button", onClick: () => openItem(item), onKeyDown: event => {
                                                    if (event.key === 'Enter' || event.key === ' ') {
                                                        event.preventDefault();
                                                        openItem(item);
                                                    }
                                                }, children: [_jsxs("div", { className: css.cardTopline, children: [_jsx("span", { className: css.key, children: item.itemKey }), _jsxs("div", { className: css.cardButtons, children: [_jsx(Button, { className: css.muteButton, variant: "ghost", size: "sm", title: mutedItems.has(item.itemKey) ? '取消置灰' : '置灰标记', "aria-label": mutedItems.has(item.itemKey) ? `取消置灰 ${item.itemKey}` : `置灰 ${item.itemKey}`, "aria-pressed": mutedItems.has(item.itemKey), onClick: event => {
                                                                            event.stopPropagation();
                                                                            toggleMutedItem(item.itemKey);
                                                                        }, onKeyDown: event => event.stopPropagation(), children: "\u25CF" }), _jsx(Button, { className: css.tomatoLink, variant: "ghost", size: "sm", title: "\u5728\u756A\u8304\u4E2D\u6253\u5F00\u4E8B\u9879", "aria-label": `在番茄中打开 ${item.itemKey}`, onClick: event => {
                                                                            event.stopPropagation();
                                                                            window.open(item.tomatoUrl, '_blank', 'noopener,noreferrer');
                                                                        }, onKeyDown: event => event.stopPropagation(), children: "\u2197" })] })] }), _jsx("strong", { children: item.title }), _jsxs("div", { className: css.cardMeta, children: [_jsx(Tag, { tone: typeTone(item.itemType), children: item.itemType }), (item.workspaceName || item.workspaceKey) && _jsx(Tag, { title: "\u7A7A\u95F4", children: item.workspaceName && item.workspaceKey && item.workspaceName !== item.workspaceKey ? `${item.workspaceName} (${item.workspaceKey})` : item.workspaceKey || item.workspaceName }), item.priority && _jsx(Tag, { title: "\u4F18\u5148\u7EA7", children: priorityLabel(item.priority) }), item.creator && _jsxs(Tag, { title: "\u521B\u5EFA\u4EBA", children: ["\u521B\u5EFA ", item.creator] })] })] }, item.itemKey))) })] }, status));
                            }), !board.loading && !board.error && statuses.length === 0 && (_jsx("div", { className: css.empty, children: "\u5F53\u524D\u6CA1\u6709\u53EF\u663E\u793A\u7684\u756A\u8304\u4E8B\u9879" }))] })] }), board.selectedItem ? _jsx(CreateConversationDialog, { ctx: ctx, item: board.selectedItem }) : null] }));
}
const PRIORITY_LABELS = {
    '69e65065-4b34-4109-bca9-0154e548554a': 'P0',
    '8f7912a5-9176-4a79-a269-2269ac42b5a2': 'P1',
    'ca8c3e43-3e7b-444d-8940-d0967d944921': 'P2',
    'ec31e4c1-b55b-479d-be97-86d5f7bf38ef': 'P2',
    '1a3e1092-7d70-42ee-ad38-0e8d953c4c23': 'P3',
    'faae52da-28c8-46fc-96dd-db9cdb28b557': 'P4',
};
const priorityLabel = (value) => PRIORITY_LABELS[value] ?? value;
const TYPE_TONES = {
    Story: '#2f7d72', EnablerStory: '#2777a8', Task: '#7b61a8', Bug: '#c34f43', 缺陷: '#c34f43', 测试缺陷: '#d06438', Epic: '#9a6b24', Feature: '#3f68ad',
};
function typeTone(type) {
    if (TYPE_TONES[type])
        return TYPE_TONES[type];
    const palette = ['#2f7d72', '#2777a8', '#7b61a8', '#c34f43', '#9a6b24', '#51753a', '#a14f78'];
    return palette[[...type].reduce((hash, char) => hash + char.charCodeAt(0), 0) % palette.length];
}
function FilterRow({ label, options, hidden, onToggle }) {
    return (_jsxs("div", { className: css.filterRow, children: [_jsx("span", { children: label }), _jsx("div", { children: options.map(option => (_jsx(Tag, { interactive: true, pressed: !hidden.has(option), tone: label === '类型' ? typeTone(option) : undefined, onClick: () => onToggle(option), children: option }, option))) })] }));
}
const WORKSPACE_SELECT_ALL = 'workspace:select-all';
const WORKSPACE_SELECT_NONE = 'workspace:select-none';
/** Multi-select workspace dropdown composed on the shared Menu primitive. */
function WorkspaceFilterRow({ options, hidden, onToggle, onSetAll }) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);
    const visibleValues = options.filter(option => !hidden.has(option.value)).map(option => option.value);
    const summary = options.length === 0
        ? '暂无空间'
        : hidden.size === 0
            ? `全部空间 · ${options.length}`
            : visibleValues.length === 0
                ? '未选择空间'
                : `已选空间 ${visibleValues.length} / ${options.length}`;
    // First Esc closes this dropdown only; the host filter popover stays open.
    useEffect(() => {
        if (!open)
            return;
        const onKey = (event) => {
            if (event.key === 'Escape') {
                event.stopPropagation();
                setOpen(false);
            }
        };
        const root = rootRef.current;
        root?.addEventListener('keydown', onKey, true);
        return () => root?.removeEventListener('keydown', onKey, true);
    }, [open]);
    const items = options.map(option => ({ id: option.value, label: option.label }));
    const footer = [
        { id: WORKSPACE_SELECT_ALL, label: '全部显示' },
        { id: WORKSPACE_SELECT_NONE, label: '全部隐藏' },
    ];
    return (_jsxs("div", { className: css.filterRow, ref: rootRef, children: [_jsx("span", { children: "\u7A7A\u95F4" }), _jsx("div", { className: css.workspaceSelect, children: _jsx(Menu, { open: open, items: items, footer: footer, selectedIds: visibleValues, onSelect: (id) => {
                        if (id === WORKSPACE_SELECT_ALL)
                            onSetAll(true);
                        else if (id === WORKSPACE_SELECT_NONE)
                            onSetAll(false);
                        else
                            onToggle(id);
                    }, onClose: () => { setOpen(false); }, anchor: _jsxs("button", { type: "button", className: css.workspaceTrigger, "aria-expanded": open, title: summary, onClick: () => { setOpen(!open); }, children: [_jsx("span", { children: summary }), _jsx("i", { className: css.workspaceChevron, "aria-hidden": true, children: _jsx(IconChevronDownOutline14, {}) })] }) }) })] }));
}
function AssigneePicker({ users, value, onChange }) {
    const rootRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const options = useMemo(() => [{ username: 'currentUser()', name: '我负责的' }, ...users.filter(user => user.username !== 'currentUser()')], [users]);
    const selected = options.find(option => option.username === value) ?? options[0];
    const needle = query.trim().toLowerCase();
    const filtered = needle
        ? options.filter(option => `${option.name} ${option.username}`.toLowerCase().includes(needle))
        : options;
    useEffect(() => {
        if (!open)
            return;
        const close = (event) => {
            if (event.target instanceof Node && !rootRef.current?.contains(event.target))
                setOpen(false);
        };
        document.addEventListener('pointerdown', close, true);
        return () => document.removeEventListener('pointerdown', close, true);
    }, [open]);
    return (_jsxs("div", { className: css.assigneeFilter, children: [_jsx("span", { children: "\u8D1F\u8D23\u4EBA" }), _jsxs("div", { ref: rootRef, className: css.assigneePicker, children: [_jsxs(Button, { variant: "outline", size: "sm", className: css.assigneeTrigger, "aria-haspopup": "listbox", "aria-expanded": open, onClick: () => { setOpen(current => !current); setQuery(''); }, children: [_jsx("span", { children: selected?.name ?? value }), _jsx(IconChevronDownOutline14, {})] }), open ? (_jsxs("div", { className: css.assigneeDropdown, children: [_jsx("input", { autoFocus: true, type: "search", value: query, onChange: event => setQuery(event.target.value), placeholder: "\u641C\u7D22\u6635\u79F0\u6216\u7528\u6237\u540D\u2026", "aria-label": "\u641C\u7D22\u8D1F\u8D23\u4EBA" }), _jsxs("div", { role: "listbox", "aria-label": "\u8D1F\u8D23\u4EBA", children: [filtered.map(option => (_jsxs("button", { type: "button", role: "option", "aria-selected": option.username === value, onClick: () => { onChange(option.username); setOpen(false); setQuery(''); }, children: [_jsx("strong", { children: option.name }), option.name !== option.username && option.username !== 'currentUser()' ? _jsx("small", { children: option.username }) : null] }, option.username))), filtered.length === 0 ? _jsx("p", { children: "\u6CA1\u6709\u5339\u914D\u7684\u8D1F\u8D23\u4EBA" }) : null] })] })) : null] })] }));
}
function TomatoConversationShortcut({ ctx, sessionId, useSessions }) {
    const itemKey = useSessions(state => {
        const summary = state.byId[sessionId];
        const title = summary?.title ?? summary?.displayTitle ?? '';
        const match = TOMATO_ITEM_KEY_PATTERN.exec(title)?.[1]?.trim();
        if (!match)
            return '';
        // 仅当该对话确实由番茄工作台创建并记录在本机映射中时，才认定它是番茄事项对话。
        // 这样即便普通新建对话的标题恰好命中 itemKey 格式，也不会被误带上状态流转 UI。
        return linkedSessionId(match) === sessionId ? match : '';
    });
    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const [transitionState, setTransitionState] = useState({
        currentStatus: '',
        tomatoUrl: '',
        transitions: [],
    });
    const [transitionError, setTransitionError] = useState(null);
    useEffect(() => {
        if (!itemKey)
            return;
        const controller = new AbortController();
        setLoading(true);
        setTransitionError(null);
        setTransitionState({ currentStatus: '', tomatoUrl: '', transitions: [] });
        void fetch(`/api/tomato-board/transitions/${encodeURIComponent(itemKey)}`, {
            headers: { accept: 'application/json' },
            signal: controller.signal,
        }).then(async (response) => {
            const body = await response.json();
            if (!response.ok)
                throw new Error(body.error || `请求失败 (${response.status})`);
            setTransitionState({
                currentStatus: body.currentStatus || '',
                tomatoUrl: body.tomatoUrl || '',
                transitions: body.transitions ?? [],
            });
        }).catch(error => {
            if (error instanceof Error && error.name === 'AbortError')
                return;
            setTransitionError(error instanceof Error ? error.message : '番茄流转状态读取失败');
        }).finally(() => {
            if (!controller.signal.aborted)
                setLoading(false);
        });
        return () => controller.abort();
    }, [itemKey]);
    if (!itemKey)
        return null;
    async function transitionTo(transitionName) {
        if (transitioning)
            return;
        setMenuOpen(false);
        setTransitioning(true);
        setTransitionError(null);
        try {
            const query = new URLSearchParams({ transition: transitionName });
            const response = await fetch(`/api/tomato-board/transition/${encodeURIComponent(itemKey)}?${query}`, {
                method: 'POST',
                headers: { accept: 'application/json' },
            });
            const body = await response.json();
            if (!response.ok) {
                const selected = transitionState.transitions.find(transition => transition.transition === transitionName);
                const failure = [body.error, body.details?.stderr, body.details?.stdout].filter(Boolean).join('\n');
                const requiredFieldsMissing = /字段.{0,24}必填|必填.{0,24}字段|流转前需填写/u.test(failure);
                if (selected?.targetStatus === '待测试' && requiredFieldsMissing) {
                    const session = ctx.sessions.binding(sessionId)?.session;
                    if (!session)
                        throw new Error('当前 Harness 对话未加载，无法交给 AI 继续处理');
                    const prompt = [
                        `番茄事项 ${itemKey} 流转到「待测试」失败，CLI 提示存在必填字段缺失。`,
                        '请先读取番茄事项详情，并结合当前对话和仓库代码进行分析。',
                        '基于证据补齐并回读确认以下字段：根因分析、RD引入原因分析、原因描述、修复版本、解决方案。',
                        '不要编造业务事实；证据不足时先向我确认。',
                        '只有这些字段已经持久化且回读一致后，才能重新执行「修复完成」流转到「待测试」，最后再次回读状态验证。',
                        `CLI 失败信息：${failure || '未返回具体原因'}`,
                    ].join('\n');
                    const prompted = await session.prompt([{ type: 'text', text: prompt }], 'queue');
                    if (!prompted.ok)
                        throw new Error(`无法把流转任务交给 AI：${prompted.error.message}`);
                    setTransitionError('必填字段缺失，已交给当前对话中的 AI 分析并继续处理');
                    return;
                }
                throw new Error(failure || `请求失败 (${response.status})`);
            }
            const transitionsResponse = await fetch(`/api/tomato-board/transitions/${encodeURIComponent(itemKey)}`, {
                headers: { accept: 'application/json' },
            });
            const transitionsBody = await transitionsResponse.json();
            if (!transitionsResponse.ok) {
                throw new Error(transitionsBody.error || `状态刷新失败 (${transitionsResponse.status})`);
            }
            setTransitionState({
                currentStatus: transitionsBody.currentStatus || body.currentStatus || '',
                tomatoUrl: transitionsBody.tomatoUrl || '',
                transitions: transitionsBody.transitions ?? [],
            });
        }
        catch (error) {
            setTransitionError(error instanceof Error ? error.message : '番茄事项流转失败');
        }
        finally {
            setTransitioning(false);
        }
    }
    const availableTransitions = transitionState.transitions.filter(transition => !transition.disabled);
    const delegatedToAgent = transitionError?.startsWith('必填字段缺失') === true;
    const transitionTitle = transitionError
        ? delegatedToAgent ? transitionError : `番茄流转失败：${transitionError}`
        : loading
            ? '正在查询番茄事项状态'
            : availableTransitions.length === 0
                ? `当前状态「${transitionState.currentStatus || '未知'}」没有可用流转`
                : `当前状态：${transitionState.currentStatus || '未知'}`;
    return (_jsxs(_Fragment, { children: [_jsx(Menu, { open: menuOpen, portal: true, align: "end", items: transitionState.transitions.map(transition => ({
                    id: transition.transition,
                    label: `流转到 ${transition.targetStatus}`,
                    disabled: transition.disabled,
                })), onSelect: transitionName => void transitionTo(transitionName), onClose: () => setMenuOpen(false), anchor: (_jsx(Button, { variant: "toolbar", size: "sm", className: css.transitionTrigger, title: transitionTitle, "aria-label": transitionTitle, "aria-haspopup": "menu", "aria-expanded": menuOpen, disabled: loading || transitioning || availableTransitions.length === 0, onClick: () => setMenuOpen(open => !open), children: transitioning || delegatedToAgent || transitionError
                        ? transitioning ? '正在流转…' : delegatedToAgent ? 'AI 已接手' : '流转失败'
                        : (_jsxs(_Fragment, { children: [_jsx("span", { className: css.transitionCaption, children: "\u72B6\u6001" }), _jsx("strong", { children: transitionState.currentStatus || '查询中…' }), availableTransitions.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("span", { className: css.transitionDivider, "aria-hidden": "true" }), _jsx("span", { className: css.transitionAction, children: "\u6D41\u8F6C" }), _jsx(IconChevronDownOutline14, { className: css.transitionChevron })] })) : null] })) })) }), _jsx(Button, { variant: "toolbar", size: "sm", title: "\u5728\u756A\u8304\u4E2D\u6253\u5F00\u4E8B\u9879", "aria-label": `在番茄中打开 ${itemKey}`, disabled: !transitionState.tomatoUrl, onClick: () => window.open(transitionState.tomatoUrl, '_blank', 'noopener,noreferrer'), children: "\u756A\u8304 \u2197" })] }));
}
export const inject = ['slots', 'sessions', 'workspaces'];
export function apply(ctx) {
    const openWorkbench = () => {
        if (disposeWorkbench)
            return;
        emit({ open: true });
        disposeWorkbench = ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'tomato-board-panel' }, () => _jsx(TomatoBoardPanel, { ctx: ctx })));
    };
    ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({ name: 'conversation.session.header.actions', id: 'tomato-shortcut', order: 12 }, props => _jsx(TomatoConversationShortcut, { ...props, ctx: ctx })));
    ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({ name: 'sidebar.footer.action', id: 'tomato-board' }, props => _jsx(TomatoBoardAction, { ...props, openWorkbench: openWorkbench })));
    // The shell's session header is the visible top bar in the Web client.  Keep the
    // sidebar shortcut as a compact fallback for narrow or collapsed layouts.
    ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({ name: 'conversation.session.header.actions', id: 'tomato-board-topbar', order: 11 }, () => _jsx(TomatoBoardTopbarAction, { openWorkbench: openWorkbench })));
}
//# sourceMappingURL=TomatoBoard.js.map