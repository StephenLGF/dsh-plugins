window.__ModuleLoader__.load({
	id: "@stephenlgf/dsh-tomato-board",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region ../../core/session/lib/types/types.js
		/**
		* Brand a string as a {@link SessionId}.
		* @param id - the raw session id string.
		* @returns the same string, branded (a compile-time cast — no runtime cost).
		*/
		function SessionId(id) {
			return id;
		}
		//#endregion
		//#region \0dsh-css:/Users/gengfeng/deepseek-harness/packages/client/tomato-board/src/client/tomato-board.module.css.mjs
		const css = ".Y6kksa_sidebarAction{width:100%;min-height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;white-space:nowrap;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out);background:0 0;border:0;border-radius:10px;align-items:center;gap:9px;margin:0;padding:0 10px;display:flex}.Y6kksa_sidebarAction:hover{background:var(--dsw-alias-interactive-bg-hover)}.Y6kksa_tomatoIcon{width:18px;height:18px;color:var(--dsw-alias-label-primary-inverted);background:var(--dsw-alias-state-error-primary);border-radius:6px;flex:none;place-items:center;font-size:11px;font-weight:750;display:inline-grid}.Y6kksa_transitionTrigger{align-items:center;gap:6px;display:inline-flex}.Y6kksa_transitionCaption{color:var(--dsw-alias-label-secondary);font-size:12px}.Y6kksa_transitionTrigger strong{color:var(--dsw-alias-label-primary);font-size:12px;font-weight:650}.Y6kksa_transitionDivider{background:var(--dsw-alias-border-l2);width:1px;height:14px;margin:0 2px}.Y6kksa_transitionAction{color:var(--dsw-alias-state-business-primary);font-size:12px;font-weight:650}.Y6kksa_transitionChevron{color:var(--dsw-alias-state-business-primary);transition:transform var(--ds-transition-duration-fast) var(--ds-ease-in-out)}.Y6kksa_transitionTrigger[aria-expanded=true] .Y6kksa_transitionChevron{transform:rotate(180deg)}.Y6kksa_workbench{min-width:0;height:100%;min-height:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-family:var(--dsw-font-family);flex-direction:column;flex:1;display:flex;position:relative}.Y6kksa_createDialog{width:min(480px,100%)}.Y6kksa_dialogBody{flex-direction:column;gap:12px;display:flex}.Y6kksa_dialogBody>span{color:var(--dsw-alias-state-error-primary);font-size:12px;font-weight:700}.Y6kksa_dialogBody code{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;font-size:13px}.Y6kksa_workspaceTrigger{justify-content:space-between;width:100%;display:flex}.Y6kksa_header{border-bottom:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 72%, transparent);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 72%, transparent);backdrop-filter:blur(16px);justify-content:space-between;align-items:center;min-height:52px;padding:8px 16px;display:flex}.Y6kksa_header h1{margin:0;font-size:16px;line-height:22px}.Y6kksa_header p{color:var(--dsw-alias-label-secondary);margin:1px 0 0;font-size:12px;line-height:16px}.Y6kksa_actions{align-items:center;gap:8px;display:flex}.Y6kksa_actions button{border:1px solid var(--dsw-alias-border-l2);min-height:34px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-button-elevated-fill);cursor:pointer;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out);border-radius:10px;padding:0 14px}.Y6kksa_actions button:hover{border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-button-floating-hover)}.Y6kksa_actions button:disabled{cursor:wait;opacity:.55}.Y6kksa_actions .Y6kksa_headerIconButton{border-radius:8px;width:34px;min-width:34px;height:34px;min-height:34px;padding:0}.Y6kksa_searchField{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:10px;align-items:center;gap:6px;width:220px;min-height:34px;padding:0 8px;display:flex}.Y6kksa_searchField input{min-width:0;color:inherit;font:inherit;background:0 0;border:0;outline:0;flex:1}.Y6kksa_searchField button{border:0;min-height:24px;padding:0 5px}.Y6kksa_filterMenu{position:relative}.Y6kksa_filterMenu summary{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:10px;place-items:center;width:34px;height:34px;list-style:none;display:grid;position:relative}.Y6kksa_filterMenu summary::-webkit-details-marker{display:none}.Y6kksa_filterMenu summary i{background:var(--dsw-alias-state-error-primary);border-radius:50%;width:5px;height:5px;position:absolute;top:5px;right:5px}.Y6kksa_filterPopover{z-index:10;border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-layer-2) 94%, transparent);width:min(760px,100vw - 320px);box-shadow:var(--dsw-shadow-lv3);backdrop-filter:blur(18px);border-radius:16px;gap:12px;padding:14px;display:grid;position:absolute;top:calc(100% + 8px);right:0}.Y6kksa_filterRow{align-items:flex-start;gap:12px;display:flex}.Y6kksa_filterRow>span{width:36px;color:var(--dsw-alias-label-secondary);padding-top:7px;font-size:13px}.Y6kksa_filterRow>div{flex-wrap:wrap;flex:1;gap:7px;display:flex}.Y6kksa_filterRow button{min-height:30px;color:var(--dsw-alias-label-secondary);padding:3px 11px}.Y6kksa_filterRow .Y6kksa_selectedFilter{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, transparent)}.Y6kksa_error{color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-state-error-secondary);border-radius:12px;margin:16px 24px 0;padding:12px 14px}.Y6kksa_board{flex:1;align-items:flex-start;gap:12px;padding:8px 12px;display:flex;overflow:auto}.Y6kksa_lane{border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 86%, transparent);border-radius:16px;flex-direction:column;width:300px;min-width:300px;max-height:100%;display:flex}.Y6kksa_laneHeader{justify-content:space-between;align-items:center;padding:12px 14px 10px;display:flex}.Y6kksa_laneHeader h2{margin:0;font-size:14px}.Y6kksa_laneHeader span{text-align:center;min-width:22px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-overlay);border-radius:999px;padding:2px 6px;font-size:12px}.Y6kksa_cards{padding:0 8px 8px;overflow-y:auto}.Y6kksa_card{border:1px solid var(--dsw-alias-border-l2);min-width:0;max-width:100%;color:inherit;background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 96%, transparent);box-shadow:var(--dsw-shadow-lv1);text-align:left;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out), box-shadow var(--ds-transition-duration-fast) var(--ds-ease-in-out);cursor:pointer;border-radius:14px;flex-direction:column;gap:7px;margin-top:8px;padding:12px;text-decoration:none;display:flex;overflow:hidden}.Y6kksa_card:hover{border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-button-floating-hover);box-shadow:var(--dsw-shadow-lv2)}.Y6kksa_card:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.Y6kksa_card strong,.Y6kksa_key,.Y6kksa_meta{overflow-wrap:anywhere;word-break:normal;min-width:0}.Y6kksa_cardTopline{justify-content:space-between;align-items:center;gap:8px;min-width:0;display:flex}.Y6kksa_tomatoLink{border-radius:8px;flex:none;place-items:center;width:28px;min-width:28px;height:28px;min-height:28px;padding:0;line-height:1;display:inline-grid}.Y6kksa_card strong{font-size:14px;font-weight:600;line-height:1.45}.Y6kksa_key{color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:650}.Y6kksa_meta{color:var(--dsw-alias-label-tertiary);font-size:12px}.Y6kksa_empty{color:var(--dsw-alias-label-tertiary);margin:auto}@media (width<=820px){.Y6kksa_header{align-items:flex-start;gap:10px}.Y6kksa_actions{flex-wrap:wrap;justify-content:flex-end}.Y6kksa_searchField{width:170px}}";
		const tagId = "@stephenlgf/dsh-tomato-board/tomato-board.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephenlgf/dsh-tomato-board";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var tomato_board_module_css_default = {
			"actions": "Y6kksa_actions",
			"board": "Y6kksa_board",
			"card": "Y6kksa_card",
			"cardTopline": "Y6kksa_cardTopline",
			"cards": "Y6kksa_cards",
			"createDialog": "Y6kksa_createDialog",
			"dialogBody": "Y6kksa_dialogBody",
			"empty": "Y6kksa_empty",
			"error": "Y6kksa_error",
			"filterMenu": "Y6kksa_filterMenu",
			"filterPopover": "Y6kksa_filterPopover",
			"filterRow": "Y6kksa_filterRow",
			"header": "Y6kksa_header",
			"headerIconButton": "Y6kksa_headerIconButton",
			"key": "Y6kksa_key",
			"lane": "Y6kksa_lane",
			"laneHeader": "Y6kksa_laneHeader",
			"meta": "Y6kksa_meta",
			"searchField": "Y6kksa_searchField",
			"selectedFilter": "Y6kksa_selectedFilter",
			"sidebarAction": "Y6kksa_sidebarAction",
			"tomatoIcon": "Y6kksa_tomatoIcon",
			"tomatoLink": "Y6kksa_tomatoLink",
			"transitionAction": "Y6kksa_transitionAction",
			"transitionCaption": "Y6kksa_transitionCaption",
			"transitionChevron": "Y6kksa_transitionChevron",
			"transitionDivider": "Y6kksa_transitionDivider",
			"transitionTrigger": "Y6kksa_transitionTrigger",
			"workbench": "Y6kksa_workbench",
			"workspaceTrigger": "Y6kksa_workspaceTrigger"
		};
		//#endregion
		//#region src/client/TomatoBoard.tsx
		let state = {
			open: false,
			loading: false,
			items: [],
			error: null,
			selectedItem: null
		};
		let disposeWorkbench = null;
		const listeners = /* @__PURE__ */ new Set();
		const emit = (patch) => {
			state = {
				...state,
				...patch
			};
			for (const listener of listeners) listener();
		};
		const subscribe = (listener) => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		};
		const snapshot = () => state;
		const TOMATO_TYPE_OPTIONS = [
			"测试缺陷",
			"缺陷",
			"Bug",
			"EnablerStory",
			"Story",
			"Task"
		];
		const TOMATO_STATUS_ORDER = [
			"新建",
			"Bugfix",
			"修复中",
			"开发中",
			"待测试",
			"测试中",
			"测试通过",
			"已完成",
			"已取消",
			"延期解决",
			"测试完成",
			"待开发",
			"不修复",
			"已挂起"
		];
		const TOMATO_FILTER_BLACKLIST_KEY = "taskboard.tomatoFilterBlacklist.v1";
		const TOMATO_SESSION_LINKS_KEY = "taskboard.tomatoSessionLinks.v1";
		function readSessionLinks() {
			try {
				const value = JSON.parse(window.localStorage.getItem(TOMATO_SESSION_LINKS_KEY) ?? "{}");
				return value && typeof value === "object" ? value : {};
			} catch {
				return {};
			}
		}
		function linkedSessionId(itemKey) {
			const value = readSessionLinks()[itemKey];
			return typeof value === "string" && value ? SessionId(value) : "";
		}
		function saveSessionLink(itemKey, sessionId) {
			const links = readSessionLinks();
			links[itemKey] = sessionId;
			window.localStorage.setItem(TOMATO_SESSION_LINKS_KEY, JSON.stringify(links));
		}
		function readFilterBlacklist() {
			try {
				const value = JSON.parse(window.localStorage.getItem(TOMATO_FILTER_BLACKLIST_KEY) ?? "{}");
				return {
					types: new Set(Array.isArray(value?.types) ? value.types.filter((item) => typeof item === "string") : []),
					statuses: new Set(Array.isArray(value?.statuses) ? value.statuses.filter((item) => typeof item === "string") : [])
				};
			} catch {
				return {
					types: /* @__PURE__ */ new Set(),
					statuses: /* @__PURE__ */ new Set()
				};
			}
		}
		async function refresh() {
			emit({
				loading: true,
				error: null
			});
			try {
				const response = await fetch("/api/tomato-board/items", { headers: { accept: "application/json" } });
				const body = await response.json();
				if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`);
				emit({ items: body.items ?? [] });
			} catch (error) {
				emit({ error: error instanceof Error ? error.message : "番茄事项读取失败" });
			} finally {
				emit({ loading: false });
			}
		}
		function closeWorkbench() {
			const dispose = disposeWorkbench;
			disposeWorkbench = null;
			emit({
				open: false,
				selectedItem: null
			});
			dispose?.();
		}
		function TomatoBoardAction({ wide, openWorkbench }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				className: tomato_board_module_css_default.sidebarAction,
				type: "button",
				title: "番茄工作台",
				onClick: openWorkbench,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: tomato_board_module_css_default.tomatoIcon,
					"aria-hidden": "true",
					children: "T"
				}), wide && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "番茄工作台" })]
			});
		}
		function CreateConversationDialog({ ctx, item }) {
			const [workspaceId, setWorkspaceId] = (0, react.useState)("");
			const [workspaceMenuOpen, setWorkspaceMenuOpen] = (0, react.useState)(false);
			const [creating, setCreating] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)(null);
			const workspaces = (0, react.useSyncExternalStore)((listener) => ctx.workspaces.list.subscribe(listener), () => ctx.workspaces.list.getSnapshot(), () => ctx.workspaces.list.getSnapshot());
			const selectedWorkspace = workspaces.items.find((workspace) => workspace.workspaceId === workspaceId);
			async function createConversation() {
				if (!selectedWorkspace || creating) return;
				setCreating(true);
				setError(null);
				try {
					const createdSessionId = await ctx.sessions.create({ workspaceId: selectedWorkspace.workspaceId });
					const session = ctx.sessions.binding(createdSessionId)?.session;
					if (!session) throw new Error("新建对话未能在 Harness 中加载");
					const title = `[${item.itemKey}] ${item.title}`;
					const renamed = await session.rename(title);
					if (!renamed.ok) throw new Error(`对话标题设置失败：${renamed.error.message}`);
					const prompt = [
						`请处理番茄事项 ${item.itemKey}。`,
						`标题：${item.title}`,
						`类型：${item.itemType || "未设置"}`,
						`状态：${item.status || "未设置"}`,
						`优先级：${item.priority || "未设置"}`
					].join("\n");
					const prompted = await session.prompt([{
						type: "text",
						text: prompt
					}], "queue");
					if (!prompted.ok) throw new Error(`事项上下文写入失败：${prompted.error.message}`);
					saveSessionLink(item.itemKey, createdSessionId);
					ctx.sessions.open(createdSessionId);
					closeWorkbench();
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : "Harness 对话创建失败");
				} finally {
					setCreating(false);
				}
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open: true,
				onClose: () => emit({ selectedItem: null }),
				title: "选择处理该事项的仓库",
				closeLabel: "关闭",
				description: item.title,
				className: tomato_board_module_css_default.createDialog,
				footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "ghost",
					onClick: () => emit({ selectedItem: null }),
					children: "取消"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "primary",
					disabled: !selectedWorkspace || creating,
					onClick: () => void createConversation(),
					children: creating ? "正在创建…" : "创建并进入对话"
				})] }),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: tomato_board_module_css_default.dialogBody,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: item.itemKey }),
						error ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: tomato_board_module_css_default.error,
							role: "alert",
							children: error
						}) : null,
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
							open: workspaceMenuOpen,
							portal: true,
							items: workspaces.items.map((workspace) => ({
								id: workspace.workspaceId,
								label: workspace.title
							})),
							selectedId: workspaceId || void 0,
							onSelect: (id) => {
								setWorkspaceId(id);
								setWorkspaceMenuOpen(false);
							},
							onClose: () => setWorkspaceMenuOpen(false),
							anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								className: tomato_board_module_css_default.workspaceTrigger,
								variant: "outline",
								"aria-haspopup": "menu",
								"aria-expanded": workspaceMenuOpen,
								onClick: () => setWorkspaceMenuOpen((open) => !open),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: selectedWorkspace?.title ?? "选择 Harness 项目…" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: "⌄"
								})]
							})
						}),
						selectedWorkspace ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: selectedWorkspace.path }) : null
					]
				})
			});
		}
		function TomatoBoardPanel({ ctx }) {
			const board = (0, react.useSyncExternalStore)(subscribe, snapshot, snapshot);
			const workbenchRef = (0, react.useRef)(null);
			const [search, setSearch] = (0, react.useState)("");
			const [blacklist, setBlacklist] = (0, react.useState)(readFilterBlacklist);
			const sessions = (0, react.useSyncExternalStore)((listener) => ctx.sessions.list.subscribe(listener), () => ctx.sessions.list.getSnapshot(), () => ctx.sessions.list.getSnapshot());
			(0, react.useEffect)(() => {
				if (board.open && board.items.length === 0 && !board.loading && !board.error) refresh();
			}, [
				board.error,
				board.items.length,
				board.loading,
				board.open
			]);
			(0, react.useEffect)(() => {
				if (!board.open) return;
				const closeOnOutsideNavigation = (event) => {
					if (!(event.target instanceof Element)) return;
					if (workbenchRef.current?.contains(event.target)) return;
					if (event.target.closest("[role=\"dialog\"], [role=\"menu\"]")) return;
					closeWorkbench();
				};
				document.addEventListener("pointerdown", closeOnOutsideNavigation, true);
				return () => document.removeEventListener("pointerdown", closeOnOutsideNavigation, true);
			}, [board.open]);
			if (!board.open) return null;
			function openItem(item) {
				const stored = linkedSessionId(item.itemKey);
				const titlePrefix = `[${item.itemKey}]`;
				const discovered = sessions.ids.find((id) => {
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
			const filteredItems = board.items.filter((item) => !blacklist.types.has(item.itemType) && !blacklist.statuses.has(item.status) && (!normalizedSearch || [
				item.itemKey,
				item.title,
				item.itemType,
				item.status,
				item.workspace,
				item.creator,
				item.priority
			].join(" ").toLowerCase().includes(normalizedSearch)));
			const typeOptions = [...new Set([...TOMATO_TYPE_OPTIONS, ...board.items.map((item) => item.itemType).filter(Boolean)])];
			const statusOptions = [...new Set([...TOMATO_STATUS_ORDER, ...board.items.map((item) => item.status).filter((status) => !TOMATO_STATUS_ORDER.includes(status))])];
			const statuses = [...new Set([...TOMATO_STATUS_ORDER.filter((status) => filteredItems.some((item) => item.status === status)), ...filteredItems.map((item) => item.status).filter((status) => !TOMATO_STATUS_ORDER.includes(status))])];
			const toggleBlacklist = (kind, value) => setBlacklist((current) => {
				const nextValues = new Set(current[kind]);
				if (nextValues.has(value)) nextValues.delete(value);
				else nextValues.add(value);
				const next = {
					...current,
					[kind]: nextValues
				};
				window.localStorage.setItem(TOMATO_FILTER_BLACKLIST_KEY, JSON.stringify({
					types: [...next.types],
					statuses: [...next.statuses]
				}));
				return next;
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				ref: workbenchRef,
				className: tomato_board_module_css_default.workbench,
				"aria-label": "番茄工作台",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
						className: tomato_board_module_css_default.header,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: "番茄工作台" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: board.loading ? "正在读取番茄事项…" : `显示 ${filteredItems.length} / ${board.items.length} 个事项` })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: tomato_board_module_css_default.actions,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									className: tomato_board_module_css_default.searchField,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											children: "⌕"
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "search",
											value: search,
											onChange: (event) => setSearch(event.target.value),
											placeholder: "搜索标题或 tag…",
											"aria-label": "搜索标题或 tag"
										}),
										search && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": "清空搜索词",
											onClick: () => setSearch(""),
											children: "×"
										})
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
									className: tomato_board_module_css_default.filterMenu,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", {
										"aria-label": "类型和状态筛选",
										title: "类型和状态筛选",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											children: "▽"
										}), (blacklist.types.size > 0 || blacklist.statuses.size > 0) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {})]
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: tomato_board_module_css_default.filterPopover,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(FilterRow, {
											label: "类型",
											options: typeOptions,
											hidden: blacklist.types,
											onToggle: (value) => toggleBlacklist("types", value)
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FilterRow, {
											label: "状态",
											options: statusOptions,
											hidden: blacklist.statuses,
											onToggle: (value) => toggleBlacklist("statuses", value)
										})]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "toolbar",
									size: "sm",
									className: tomato_board_module_css_default.headerIconButton,
									icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutline16, {}),
									title: "刷新番茄事项",
									"aria-label": "刷新番茄事项",
									disabled: board.loading,
									onClick: () => void refresh()
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "toolbar",
									size: "sm",
									className: tomato_board_module_css_default.headerIconButton,
									icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCloseOutline16, {}),
									title: "关闭番茄工作台",
									"aria-label": "关闭番茄工作台",
									onClick: closeWorkbench
								})
							]
						})]
					}),
					board.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: tomato_board_module_css_default.error,
						role: "alert",
						children: board.error
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: tomato_board_module_css_default.board,
						children: [statuses.map((status) => {
							const items = filteredItems.filter((item) => item.status === status);
							return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
								className: tomato_board_module_css_default.lane,
								"aria-labelledby": `tomato-lane-${status}`,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
									className: tomato_board_module_css_default.laneHeader,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
										id: `tomato-lane-${status}`,
										children: status
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: items.length })]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: tomato_board_module_css_default.cards,
									children: items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
										className: tomato_board_module_css_default.card,
										tabIndex: 0,
										role: "button",
										onClick: () => openItem(item),
										onKeyDown: (event) => {
											if (event.key === "Enter" || event.key === " ") {
												event.preventDefault();
												openItem(item);
											}
										},
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: tomato_board_module_css_default.cardTopline,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: tomato_board_module_css_default.key,
													children: item.itemKey
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
													className: tomato_board_module_css_default.tomatoLink,
													variant: "ghost",
													size: "sm",
													title: "在番茄中打开事项",
													"aria-label": `在番茄中打开 ${item.itemKey}`,
													onClick: (event) => {
														event.stopPropagation();
														window.open(`/api/tomato-board/open/${encodeURIComponent(item.itemKey)}`, "_blank", "noopener,noreferrer");
													},
													onKeyDown: (event) => event.stopPropagation(),
													children: "↗"
												})]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: item.title }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: tomato_board_module_css_default.meta,
												children: [
													item.itemType,
													item.priority,
													item.creator
												].filter(Boolean).join(" · ")
											})
										]
									}, item.itemKey))
								})]
							}, status);
						}), !board.loading && !board.error && statuses.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: tomato_board_module_css_default.empty,
							children: "当前没有可显示的番茄事项"
						})]
					}),
					board.selectedItem ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CreateConversationDialog, {
						ctx,
						item: board.selectedItem
					}) : null
				]
			});
		}
		function FilterRow({ label, options, hidden, onToggle }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: tomato_board_module_css_default.filterRow,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: options.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					className: hidden.has(option) ? "" : tomato_board_module_css_default.selectedFilter,
					type: "button",
					"aria-pressed": !hidden.has(option),
					onClick: () => onToggle(option),
					children: option
				}, option)) })]
			});
		}
		function TomatoConversationShortcut({ ctx, sessionId, useSessions }) {
			const itemKey = useSessions((state) => {
				const summary = state.byId[sessionId];
				const title = summary?.title ?? summary?.displayTitle ?? "";
				return /^\[([^\]]+)\]/u.exec(title)?.[1]?.trim() ?? "";
			});
			const [menuOpen, setMenuOpen] = (0, react.useState)(false);
			const [loading, setLoading] = (0, react.useState)(false);
			const [transitioning, setTransitioning] = (0, react.useState)(false);
			const [transitionState, setTransitionState] = (0, react.useState)({
				currentStatus: "",
				transitions: []
			});
			const [transitionError, setTransitionError] = (0, react.useState)(null);
			(0, react.useEffect)(() => {
				if (!itemKey) return;
				const controller = new AbortController();
				setLoading(true);
				setTransitionError(null);
				setTransitionState({
					currentStatus: "",
					transitions: []
				});
				fetch(`/api/tomato-board/transitions/${encodeURIComponent(itemKey)}`, {
					headers: { accept: "application/json" },
					signal: controller.signal
				}).then(async (response) => {
					const body = await response.json();
					if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`);
					setTransitionState({
						currentStatus: body.currentStatus || "",
						transitions: body.transitions ?? []
					});
				}).catch((error) => {
					if (error instanceof Error && error.name === "AbortError") return;
					setTransitionError(error instanceof Error ? error.message : "番茄流转状态读取失败");
				}).finally(() => {
					if (!controller.signal.aborted) setLoading(false);
				});
				return () => controller.abort();
			}, [itemKey]);
			if (!itemKey) return null;
			async function transitionTo(transitionName) {
				if (transitioning) return;
				setMenuOpen(false);
				setTransitioning(true);
				setTransitionError(null);
				try {
					const query = new URLSearchParams({ transition: transitionName });
					const response = await fetch(`/api/tomato-board/transition/${encodeURIComponent(itemKey)}?${query}`, {
						method: "POST",
						headers: { accept: "application/json" }
					});
					const body = await response.json();
					if (!response.ok) {
						const selected = transitionState.transitions.find((transition) => transition.transition === transitionName);
						const failure = [
							body.error,
							body.details?.stderr,
							body.details?.stdout
						].filter(Boolean).join("\n");
						const requiredFieldsMissing = /字段.{0,24}必填|必填.{0,24}字段|流转前需填写/u.test(failure);
						if (selected?.targetStatus === "待测试" && requiredFieldsMissing) {
							const session = ctx.sessions.binding(sessionId)?.session;
							if (!session) throw new Error("当前 Harness 对话未加载，无法交给 AI 继续处理");
							const prompt = [
								`番茄事项 ${itemKey} 流转到「待测试」失败，CLI 提示存在必填字段缺失。`,
								"请先读取番茄事项详情，并结合当前对话和仓库代码进行分析。",
								"基于证据补齐并回读确认以下字段：根因分析、RD引入原因分析、原因描述、修复版本、解决方案。",
								"不要编造业务事实；证据不足时先向我确认。",
								"只有这些字段已经持久化且回读一致后，才能重新执行「修复完成」流转到「待测试」，最后再次回读状态验证。",
								`CLI 失败信息：${failure || "未返回具体原因"}`
							].join("\n");
							const prompted = await session.prompt([{
								type: "text",
								text: prompt
							}], "queue");
							if (!prompted.ok) throw new Error(`无法把流转任务交给 AI：${prompted.error.message}`);
							setTransitionError("必填字段缺失，已交给当前对话中的 AI 分析并继续处理");
							return;
						}
						throw new Error(failure || `请求失败 (${response.status})`);
					}
					const transitionsResponse = await fetch(`/api/tomato-board/transitions/${encodeURIComponent(itemKey)}`, { headers: { accept: "application/json" } });
					const transitionsBody = await transitionsResponse.json();
					if (!transitionsResponse.ok) throw new Error(transitionsBody.error || `状态刷新失败 (${transitionsResponse.status})`);
					setTransitionState({
						currentStatus: transitionsBody.currentStatus || body.currentStatus || "",
						transitions: transitionsBody.transitions ?? []
					});
				} catch (error) {
					setTransitionError(error instanceof Error ? error.message : "番茄事项流转失败");
				} finally {
					setTransitioning(false);
				}
			}
			const availableTransitions = transitionState.transitions.filter((transition) => !transition.disabled);
			const delegatedToAgent = transitionError?.startsWith("必填字段缺失") === true;
			const transitionTitle = transitionError ? delegatedToAgent ? transitionError : `番茄流转失败：${transitionError}` : loading ? "正在查询番茄事项状态" : availableTransitions.length === 0 ? `当前状态「${transitionState.currentStatus || "未知"}」没有可用流转` : `当前状态：${transitionState.currentStatus || "未知"}`;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
				open: menuOpen,
				portal: true,
				align: "end",
				items: transitionState.transitions.map((transition) => ({
					id: transition.transition,
					label: `流转到 ${transition.targetStatus}`,
					disabled: transition.disabled
				})),
				onSelect: (transitionName) => void transitionTo(transitionName),
				onClose: () => setMenuOpen(false),
				anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "toolbar",
					size: "sm",
					className: tomato_board_module_css_default.transitionTrigger,
					title: transitionTitle,
					"aria-label": transitionTitle,
					"aria-haspopup": "menu",
					"aria-expanded": menuOpen,
					disabled: loading || transitioning || availableTransitions.length === 0,
					onClick: () => setMenuOpen((open) => !open),
					children: transitioning || delegatedToAgent || transitionError ? transitioning ? "正在流转…" : delegatedToAgent ? "AI 已接手" : "流转失败" : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: tomato_board_module_css_default.transitionCaption,
							children: "状态"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: transitionState.currentStatus || "查询中…" }),
						availableTransitions.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: tomato_board_module_css_default.transitionDivider,
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: tomato_board_module_css_default.transitionAction,
								children: "流转"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: tomato_board_module_css_default.transitionChevron })
						] }) : null
					] })
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
				variant: "toolbar",
				size: "sm",
				title: "在番茄中打开事项",
				"aria-label": `在番茄中打开 ${itemKey}`,
				onClick: () => window.open(`/api/tomato-board/open/${encodeURIComponent(itemKey)}`, "_blank", "noopener,noreferrer"),
				children: "番茄 ↗"
			})] });
		}
		const inject = [
			"slots",
			"sessions",
			"workspaces"
		];
		function apply(ctx) {
			ctx.slots.inject("conversation.session.header.actions", () => ctx.slots.register({
				name: "conversation.session.header.actions",
				id: "tomato-shortcut",
				order: 12
			}, (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoConversationShortcut, {
				...props,
				ctx
			})));
			ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
				name: "sidebar.footer.action",
				id: "tomato-board"
			}, (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoBoardAction, {
				...props,
				openWorkbench: () => {
					if (disposeWorkbench) return;
					emit({ open: true });
					disposeWorkbench = ctx.slots.register({
						name: "conversation",
						priority: -100
					}, () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoBoardPanel, { ctx }));
				}
			})));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map