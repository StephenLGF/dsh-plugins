window.__ModuleLoader__.load({
	id: "@stephen1620/dsh-tomato-board",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region \0dsh-css:/Users/gengfeng/dsh-tomato-board/plugins/tomato-board/src/client/tomato-link-button.module.css.mjs
		const css$5 = ".AFUbiG_button.AFUbiG_button{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);width:28px;min-width:28px;height:28px;min-height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;vertical-align:middle;background:0 0;border-radius:6px;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex}.AFUbiG_button.AFUbiG_button:hover:not(:disabled){color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-interactive-bg-hover)}.AFUbiG_button.AFUbiG_button:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.AFUbiG_button.AFUbiG_button:disabled{cursor:not-allowed;opacity:.4}.AFUbiG_button svg{flex:none;display:block}";
		const tagId$5 = "@stephen1620/dsh-tomato-board/tomato-link-button.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$5) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephen1620/dsh-tomato-board";
			tag.dataset.pluginCss = tagId$5;
			tag.textContent = css$5;
			document.head.appendChild(tag);
		}
		var tomato_link_button_module_css_default = { "button": "AFUbiG_button" };
		//#endregion
		//#region src/client/TomatoLinkButton.tsx
		/** One external-item action, using the configured host and tenant on the server. */
		function TomatoLinkButton({ itemKey, disabled = false }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: tomato_link_button_module_css_default.button,
				disabled: disabled || !itemKey,
				title: "在番茄中查看",
				"aria-label": `在番茄中查看 ${itemKey}`,
				onClick: (event) => {
					event.stopPropagation();
					window.open(`/api/tomato-board/open/${encodeURIComponent(itemKey)}`, "_blank", "noopener,noreferrer");
				},
				onKeyDown: (event) => {
					if (event.key === "Enter" || event.key === " ") event.stopPropagation();
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
					width: "14",
					height: "14",
					viewBox: "0 0 16 16",
					fill: "none",
					"aria-hidden": "true",
					focusable: "false",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
						d: "M9 3h4v4M13 3 7 9M6 3H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2",
						stroke: "currentColor",
						strokeWidth: "1.4",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			});
		}
		//#endregion
		//#region \0dsh-css:/Users/gengfeng/dsh-tomato-board/plugins/tomato-board/src/client/tomato-board.module.css.mjs
		const css$4 = "._9lHw_W_sidebarAction{width:100%;min-height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;white-space:nowrap;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out);background:0 0;border:0;border-radius:10px;align-items:center;gap:9px;margin:0;padding:0 10px;display:flex}._9lHw_W_sidebarAction:hover{background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_topbarAction{border:1px solid var(--dsw-alias-border-l2);min-height:28px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);cursor:pointer;font:inherit;white-space:nowrap;border-radius:8px;align-items:center;gap:7px;padding:4px 9px;font-size:12px;font-weight:600;display:inline-flex}._9lHw_W_topbarAction:hover{border-color:color-mix(in srgb, var(--tomato-accent,var(--dsw-alias-state-error-primary)) 45%, var(--dsw-alias-border-l2));background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_topbarAction:focus-visible{outline:2px solid var(--tomato-accent,var(--dsw-alias-state-error-primary));outline-offset:2px}._9lHw_W_topbarAction ._9lHw_W_tomatoIcon{border-radius:5px;width:16px;height:16px;font-size:10px}._9lHw_W_tomatoIcon{width:18px;height:18px;color:var(--dsw-alias-label-primary-inverted);background:var(--tomato-accent,var(--dsw-alias-state-error-primary));border-radius:6px;flex:none;place-items:center;font-size:11px;font-weight:750;display:inline-grid}._9lHw_W_transitionTrigger{align-items:center;gap:6px;display:inline-flex}._9lHw_W_transitionCaption{color:var(--dsw-alias-label-secondary);font-size:12px}._9lHw_W_transitionTrigger strong{color:var(--dsw-alias-label-primary);font-size:12px;font-weight:650}._9lHw_W_transitionDivider{background:var(--dsw-alias-border-l2);width:1px;height:14px;margin:0 2px}._9lHw_W_transitionAction{color:var(--tomato-accent,var(--dsw-alias-state-business-primary));font-size:12px;font-weight:650}._9lHw_W_transitionChevron{color:var(--tomato-accent,var(--dsw-alias-state-business-primary));transition:transform var(--ds-transition-duration-fast) var(--ds-ease-in-out)}._9lHw_W_transitionTrigger[aria-expanded=true] ._9lHw_W_transitionChevron{transform:rotate(180deg)}._9lHw_W_workbench{--tomato-accent:var(--dsw-alias-state-business-primary,#3478c8);--tomato-accent-soft:color-mix(in srgb, var(--tomato-accent) 12%, transparent);--tomato-accent-border:color-mix(in srgb, var(--tomato-accent) 48%, var(--dsw-alias-border-l2));width:100%;height:100%;min-height:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-family:var(--dsw-font-family);border-left:1px solid var(--dsw-alias-border-l2);flex-direction:column;display:flex;position:relative;overflow:hidden}._9lHw_W_createDialog{width:min(480px,100%)}._9lHw_W_dialogBody{flex-direction:column;gap:12px;display:flex}._9lHw_W_dialogBody>span{color:var(--tomato-accent,var(--dsw-alias-state-error-primary));font-size:12px;font-weight:700}._9lHw_W_dialogBody code{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;font-size:13px}._9lHw_W_workspaceTrigger{justify-content:space-between;width:100%;display:flex}._9lHw_W_header{z-index:20;border-bottom:1px solid #0000;flex:none;padding:12px 28px 0 20px;position:relative}._9lHw_W_header:after{content:\"\";z-index:0;background:var(--dsw-alias-border-l2);pointer-events:none;height:1px;position:absolute;bottom:1px;left:0;right:0}._9lHw_W_titleRow{align-items:center;gap:10px;min-height:32px;display:flex}._9lHw_W_header h1{text-overflow:ellipsis;white-space:nowrap;border-radius:12px;flex:1;min-width:0;margin:0;padding:4px 8px;font-size:14px;font-weight:500;line-height:20px;overflow:hidden}._9lHw_W_pageTabs{z-index:1;gap:36px;margin-top:4px;padding-left:8px;display:flex;position:relative}._9lHw_W_pageTabs button{color:var(--dsw-alias-label-tertiary);cursor:pointer;font:inherit;background:0 0;border:0;padding:0 0 11px;font-size:13px;font-weight:500;line-height:16px;position:relative}._9lHw_W_pageTabs button:after{content:\"\";background:0 0;border-radius:2px;height:2px;position:absolute;bottom:1px;left:0;right:0}._9lHw_W_pageTabs button:hover,._9lHw_W_pageTabs button[aria-current=page]{color:var(--dsw-alias-state-business-primary)}._9lHw_W_pageTabs button[aria-current=page]:after{background:var(--dsw-alias-state-business-primary)}._9lHw_W_pageTabs button:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:3px}._9lHw_W_actions{z-index:1;align-items:center;gap:8px;min-height:32px;display:flex;position:relative}._9lHw_W_actions ._9lHw_W_headerIconButton{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:28px;min-width:28px;height:28px;color:var(--dsw-alias-label-secondary);transition:all var(--ds-transition-duration-fast) var(--ds-ease-in-out);border-radius:8px;padding:0}._9lHw_W_actions ._9lHw_W_headerIconButton:hover{border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}._9lHw_W_actions ._9lHw_W_headerIconButton:disabled{opacity:.5;cursor:not-allowed}._9lHw_W_searchField{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:10px;align-items:center;gap:6px;width:220px;min-height:28px;padding:0 8px;display:flex}._9lHw_W_searchField input{min-width:0;color:inherit;font:inherit;background:0 0;border:0;outline:0;flex:1}._9lHw_W_filterMenu{position:relative}._9lHw_W_filterMenu summary{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:10px;place-items:center;width:28px;height:28px;list-style:none;display:grid;position:relative}._9lHw_W_filterMenu summary::-webkit-details-marker{display:none}._9lHw_W_filterMenu summary i{background:var(--tomato-accent,var(--dsw-alias-state-error-primary));border-radius:50%;width:5px;height:5px;position:absolute;top:5px;right:5px}._9lHw_W_filterPopover{z-index:30;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);width:min(500px,100vw - 320px);box-shadow:var(--dsw-shadow-lv3);border-radius:16px;gap:10px;padding:12px;display:grid;position:absolute;top:calc(100% + 8px);right:0}._9lHw_W_assigneeFilter{align-items:flex-start;gap:12px;display:flex}._9lHw_W_assigneeFilter>span{width:48px;color:var(--dsw-alias-label-secondary);white-space:nowrap;flex:0 0 48px;padding-top:8px;font-size:13px}._9lHw_W_assigneePicker{min-width:var(--assignee-picker-min-width,260px);position:relative}._9lHw_W_assigneeFilter ._9lHw_W_assigneeTrigger{border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 82%, transparent);width:100%;height:30px;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb, var(--dsw-alias-bg-overlay) 46%, transparent);border-radius:999px;justify-content:space-between;align-items:center;gap:12px;padding:0 8px 0 12px;font-size:12px;display:flex}._9lHw_W_assigneeFilter ._9lHw_W_assigneeTrigger:hover{background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_assigneeTrigger>span{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._9lHw_W_assigneeDropdown{z-index:40;width:var(--assignee-dropdown-width,320px);border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);box-shadow:var(--dsw-shadow-lv3);border-radius:10px;padding:8px;position:absolute;top:calc(100% + 5px);left:0}._9lHw_W_assigneeDropdown>input{border:1px solid var(--dsw-alias-border-l2);width:100%;height:32px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font:inherit;border-radius:7px;outline:0;padding:0 9px}._9lHw_W_assigneeDropdown>input:focus{border-color:var(--tomato-accent,var(--dsw-alias-state-business-primary))}._9lHw_W_assigneeDropdown>[role=listbox]{max-height:260px;margin-top:7px;overflow:auto}._9lHw_W_assigneeDropdown [role=option]{width:100%;min-height:38px;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;background:0 0;border:0;border-radius:7px;flex-direction:column;justify-content:center;align-items:flex-start;gap:2px;padding:6px 9px;display:flex}._9lHw_W_assigneeDropdown [role=option]:hover,._9lHw_W_assigneeDropdown [role=option][aria-selected=true]{background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_assigneeDropdown strong{font-size:12px;font-weight:550}._9lHw_W_assigneeDropdown small{color:var(--dsw-alias-label-secondary);font-size:10px}._9lHw_W_assigneeDropdown p{color:var(--dsw-alias-label-secondary);text-align:center;margin:0;padding:18px 8px;font-size:11px}._9lHw_W_filterRow{align-items:flex-start;gap:12px;display:flex}._9lHw_W_filterRow>span{width:48px;color:var(--dsw-alias-label-secondary);white-space:nowrap;flex:0 0 48px;padding-top:7px;font-size:13px}._9lHw_W_filterRow>div{flex-wrap:wrap;flex:1;gap:7px;display:flex}._9lHw_W_workspaceSelect{flex:1;min-width:0;display:block;position:relative}._9lHw_W_workspaceSelect>span{flex:1}._9lHw_W_filterRow ._9lHw_W_workspaceTrigger{border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 82%, transparent);width:100%;min-height:30px;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb, var(--dsw-alias-bg-overlay) 46%, transparent);font:inherit;text-align:left;cursor:pointer;border-radius:999px;justify-content:space-between;align-items:center;gap:10px;padding:3px 8px 3px 12px;font-size:12px;display:flex}._9lHw_W_filterRow ._9lHw_W_workspaceTrigger:hover{background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_filterRow ._9lHw_W_workspaceTrigger>span{min-width:0;color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._9lHw_W_workspaceChevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s;display:inline-flex}._9lHw_W_workspaceTrigger[aria-expanded=true] ._9lHw_W_workspaceChevron{color:var(--tomato-accent,var(--dsw-alias-state-business-primary));transform:rotate(180deg)}._9lHw_W_error{color:var(--tomato-accent,var(--dsw-alias-state-error-primary));background:var(--dsw-alias-state-error-secondary);border-radius:12px;margin:16px 24px 0;padding:12px 14px}._9lHw_W_notice{color:var(--dsw-alias-label-secondary);margin:0;padding:8px 20px;font-size:11px}._9lHw_W_board{z-index:1;flex:1;align-items:flex-start;gap:12px;padding:8px 12px;display:flex;position:relative;overflow:auto}._9lHw_W_lane{border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 86%, transparent);width:300px;min-width:300px;max-height:100%;transition:transform .16s var(--ds-ease-in-out), opacity .16s var(--ds-ease-in-out), box-shadow .16s var(--ds-ease-in-out);border-radius:16px;flex-direction:column;display:flex}._9lHw_W_laneDragging{opacity:.5;transform:scale(.985)}._9lHw_W_laneDropBefore{box-shadow:-4px 0 0 var(--tomato-accent,var(--dsw-alias-state-business-primary));transform:translate(8px)}._9lHw_W_laneDropAfter{box-shadow:4px 0 0 var(--tomato-accent,var(--dsw-alias-state-business-primary));transform:translate(-8px)}._9lHw_W_laneHeader{cursor:grab;user-select:none;justify-content:space-between;align-items:center;padding:12px 14px 10px;display:flex}._9lHw_W_laneHeader:active{cursor:grabbing}@media (prefers-reduced-motion:reduce){._9lHw_W_lane{transition:none}}._9lHw_W_laneHeader h2{margin:0;font-size:14px}._9lHw_W_laneHeader span{text-align:center;min-width:22px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-overlay);border-radius:999px;padding:2px 6px;font-size:12px}._9lHw_W_cards{padding:0 8px 8px;overflow-y:auto}._9lHw_W_card{border:1px solid var(--dsw-alias-border-l2);min-width:0;max-width:100%;color:inherit;background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 96%, transparent);box-shadow:var(--dsw-shadow-lv1);text-align:left;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out), box-shadow var(--ds-transition-duration-fast) var(--ds-ease-in-out);cursor:pointer;border-radius:14px;flex-direction:column;gap:7px;margin-top:8px;padding:12px;text-decoration:none;display:flex;overflow:hidden}._9lHw_W_card:hover{border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-button-floating-hover);box-shadow:var(--dsw-shadow-lv2)}._9lHw_W_cardMuted{opacity:.46;filter:saturate(.2);box-shadow:none}._9lHw_W_cardMuted:hover{opacity:.62}._9lHw_W_card:focus-visible{outline:2px solid var(--tomato-accent,var(--dsw-alias-state-business-primary));outline-offset:2px}._9lHw_W_card strong,._9lHw_W_key,._9lHw_W_meta{overflow-wrap:anywhere;word-break:normal;min-width:0}._9lHw_W_cardTopline{justify-content:space-between;align-items:center;gap:8px;min-width:0;display:flex}._9lHw_W_cardButtons{align-items:center;gap:2px;display:inline-flex}._9lHw_W_cardIdentity{align-items:center;gap:4px;min-width:0;display:flex}._9lHw_W_cardIdentity ._9lHw_W_copyButton{width:22px;min-width:22px;height:22px;color:var(--dsw-alias-label-secondary);border-radius:5px;flex:none;place-items:center;padding:0;display:inline-grid}._9lHw_W_muteButton{width:28px;min-width:28px;height:28px;min-height:28px;color:var(--dsw-alias-label-tertiary);border-radius:8px;flex:none;place-items:center;padding:0;font-size:9px;line-height:1;display:inline-grid}._9lHw_W_muteButton[aria-pressed=true]{color:var(--dsw-alias-label-primary)}._9lHw_W_card strong{font-size:14px;font-weight:600;line-height:1.45}._9lHw_W_key{color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:650}._9lHw_W_cardMeta{flex-wrap:wrap;align-items:center;gap:5px;min-width:0;display:flex}._9lHw_W_empty{color:var(--dsw-alias-label-tertiary);margin:auto}@media (width<=820px){._9lHw_W_titleRow{flex-wrap:wrap}._9lHw_W_actions{flex-wrap:wrap;justify-content:flex-end}._9lHw_W_searchField{width:170px}}._9lHw_W_tabPanel{flex:1;min-width:0;min-height:0;display:flex;overflow:hidden}._9lHw_W_tabPanel[hidden]{display:none}";
		const tagId$4 = "@stephen1620/dsh-tomato-board/tomato-board.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$4) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephen1620/dsh-tomato-board";
			tag.dataset.pluginCss = tagId$4;
			tag.textContent = css$4;
			document.head.appendChild(tag);
		}
		var tomato_board_module_css_default = {
			"actions": "_9lHw_W_actions",
			"assigneeDropdown": "_9lHw_W_assigneeDropdown",
			"assigneeFilter": "_9lHw_W_assigneeFilter",
			"assigneePicker": "_9lHw_W_assigneePicker",
			"assigneeTrigger": "_9lHw_W_assigneeTrigger",
			"board": "_9lHw_W_board",
			"card": "_9lHw_W_card",
			"cardButtons": "_9lHw_W_cardButtons",
			"cardIdentity": "_9lHw_W_cardIdentity",
			"cardMeta": "_9lHw_W_cardMeta",
			"cardMuted": "_9lHw_W_cardMuted",
			"cardTopline": "_9lHw_W_cardTopline",
			"cards": "_9lHw_W_cards",
			"copyButton": "_9lHw_W_copyButton",
			"createDialog": "_9lHw_W_createDialog",
			"dialogBody": "_9lHw_W_dialogBody",
			"empty": "_9lHw_W_empty",
			"error": "_9lHw_W_error",
			"filterMenu": "_9lHw_W_filterMenu",
			"filterPopover": "_9lHw_W_filterPopover",
			"filterRow": "_9lHw_W_filterRow",
			"header": "_9lHw_W_header",
			"headerIconButton": "_9lHw_W_headerIconButton",
			"key": "_9lHw_W_key",
			"lane": "_9lHw_W_lane",
			"laneDragging": "_9lHw_W_laneDragging",
			"laneDropAfter": "_9lHw_W_laneDropAfter",
			"laneDropBefore": "_9lHw_W_laneDropBefore",
			"laneHeader": "_9lHw_W_laneHeader",
			"meta": "_9lHw_W_meta",
			"muteButton": "_9lHw_W_muteButton",
			"notice": "_9lHw_W_notice",
			"pageTabs": "_9lHw_W_pageTabs",
			"searchField": "_9lHw_W_searchField",
			"sidebarAction": "_9lHw_W_sidebarAction",
			"tabPanel": "_9lHw_W_tabPanel",
			"titleRow": "_9lHw_W_titleRow",
			"tomatoIcon": "_9lHw_W_tomatoIcon",
			"topbarAction": "_9lHw_W_topbarAction",
			"transitionAction": "_9lHw_W_transitionAction",
			"transitionCaption": "_9lHw_W_transitionCaption",
			"transitionChevron": "_9lHw_W_transitionChevron",
			"transitionDivider": "_9lHw_W_transitionDivider",
			"transitionTrigger": "_9lHw_W_transitionTrigger",
			"workbench": "_9lHw_W_workbench",
			"workspaceChevron": "_9lHw_W_workspaceChevron",
			"workspaceSelect": "_9lHw_W_workspaceSelect",
			"workspaceTrigger": "_9lHw_W_workspaceTrigger"
		};
		//#endregion
		//#region \0dsh-css:/Users/gengfeng/dsh-tomato-board/plugins/tomato-board/src/client/pr-assistant.module.css.mjs
		const css$3 = ".PKlHwG_workbench{width:100%;min-width:0;min-height:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-family:var(--dsw-font-family);flex-direction:column;flex:1;font-size:12px;line-height:1.5;display:flex;position:relative;overflow:hidden}.PKlHwG_scrollArea{flex:1;min-height:0;overflow:hidden}.PKlHwG_header{z-index:5;box-sizing:border-box;border-bottom:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb,var(--dsw-alias-bg-base) 90%,transparent);backdrop-filter:blur(18px);flex:none;justify-content:space-between;align-items:center;gap:16px;min-height:44px;padding:6px 16px;display:flex;position:sticky;top:0}.PKlHwG_eyebrow{color:var(--dsw-alias-state-business-primary);letter-spacing:.2em;font:700 9px/1.2 ui-monospace,SFMono-Regular,monospace;display:none}.PKlHwG_titleRow{align-items:center;gap:8px;margin-top:0;display:flex}.PKlHwG_header h1{letter-spacing:-.015em;margin:0;font-size:16px;line-height:22px}.PKlHwG_titleBack{border:1px solid var(--dsw-alias-border-l2);width:28px;height:28px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:8px;padding:0;font-size:16px}.PKlHwG_titleBack:hover{color:var(--dsw-alias-state-business-primary)}.PKlHwG_header p{color:var(--dsw-alias-label-secondary);margin:1px 0 0;font-size:11px;line-height:14px}.PKlHwG_actions{align-items:center;gap:8px;display:flex}.PKlHwG_actions button{border:1px solid var(--dsw-alias-border-l2);min-height:34px;color:inherit;background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:9px;padding:0 13px}.PKlHwG_actions button:disabled{opacity:.5;cursor:wait}.PKlHwG_search{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:9px;align-items:center;gap:7px;width:210px;min-height:34px;padding:0 10px;display:flex}.PKlHwG_search input{width:100%;color:inherit;font:inherit;background:0 0;border:0;outline:0}.PKlHwG_grid{box-sizing:border-box;overscroll-behavior-inline:contain;scrollbar-gutter:stable;grid-auto-columns:minmax(360px,1fr);grid-auto-flow:column;gap:14px;height:100%;min-height:0;padding:18px 22px;display:grid;overflow:auto hidden}.PKlHwG_repo{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);min-width:0;height:100%;min-height:0;box-shadow:0 1px 0 color-mix(in srgb,var(--dsw-alias-label-primary) 5%,transparent);border-radius:14px;flex-direction:column;display:flex;overflow:hidden}.PKlHwG_repoIdentity{align-items:center;gap:9px;min-width:0;display:flex}.PKlHwG_repoTools{flex:none;align-items:center;gap:10px;display:flex}.PKlHwG_hideRepo{color:var(--dsw-alias-label-secondary);cursor:pointer;font:500 11px/16px var(--dsw-font-family);background:0 0;border:0;padding:0}.PKlHwG_hideRepo:hover{color:var(--dsw-alias-state-error-primary)}.PKlHwG_repoHeader{z-index:1;border-bottom:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);flex:none;justify-content:space-between;align-items:center;gap:14px;min-height:54px;padding:10px 14px;display:flex;position:relative}.PKlHwG_provider{color:var(--dsw-alias-state-business-primary);letter-spacing:.12em;text-transform:uppercase;flex:none;font:700 9px/1 ui-monospace,SFMono-Regular,monospace}.PKlHwG_repo h2{letter-spacing:-.015em;text-overflow:ellipsis;white-space:nowrap;min-width:0;margin:0;font-size:14px;overflow:hidden}.PKlHwG_count,.PKlHwG_countActive{border:1px solid var(--dsw-alias-border-l2);background:0 0;border-radius:7px;place-items:center;min-width:max-content;height:24px;padding:0 7px;font:700 13px/1 ui-monospace,SFMono-Regular,monospace;display:grid}.PKlHwG_count{color:var(--dsw-alias-label-tertiary)}.PKlHwG_countActive{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 34%,var(--dsw-alias-border-l2));background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 6%,transparent)}.PKlHwG_prList{overscroll-behavior:contain;scrollbar-gutter:stable;flex:1;min-height:0;margin:0;padding:0;list-style:none;overflow-y:auto}.PKlHwG_prList li+li{border-top:1px solid color-mix(in srgb,var(--dsw-alias-border-l2) 70%,transparent)}.PKlHwG_prRow{align-items:stretch;display:flex}.PKlHwG_prMain{min-width:0;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;flex:1;grid-template-columns:auto minmax(0,1fr) auto;gap:4px 9px;padding:11px 10px 11px 16px;display:grid}.PKlHwG_prRow:hover{background:var(--dsw-alias-interactive-bg-hover)}.PKlHwG_prNumber{color:var(--dsw-alias-state-business-primary);font:650 11px/18px ui-monospace,SFMono-Regular,monospace}.PKlHwG_prTitle{text-overflow:ellipsis;white-space:nowrap;font-size:13px;line-height:18px;overflow:hidden}.PKlHwG_branches,.PKlHwG_meta{min-width:0;color:var(--dsw-alias-label-secondary);grid-column:2/-1;font-size:10px}.PKlHwG_branches{flex-wrap:wrap;align-items:center;gap:5px;display:flex}.PKlHwG_sourceBranch,.PKlHwG_targetBranch{border:1px solid;border-radius:5px;align-items:center;gap:5px;min-width:0;max-width:100%;padding:2px 7px;display:inline-flex}.PKlHwG_sourceBranch{color:#c993ff;background:#9b59d01a;border-color:#9b59d061}.PKlHwG_targetBranch{color:#55c889;background:#3fbf721a;border-color:#3fbf7261}.PKlHwG_branches b{flex:none;font-size:9px;font-weight:650}.PKlHwG_branches code{min-width:0;color:inherit;text-overflow:ellipsis;white-space:nowrap;font:10px/14px ui-monospace,SFMono-Regular,monospace;overflow:hidden}.PKlHwG_draft,.PKlHwG_conflictTag,.PKlHwG_unknownTag{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);border-radius:4px;align-self:center;padding:2px 5px;font-size:9px}.PKlHwG_conflictTag{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 45%,transparent);color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent)}.PKlHwG_unknownTag{color:var(--dsw-alias-label-tertiary)}.PKlHwG_externalLink{width:58px;color:var(--dsw-alias-label-secondary);cursor:pointer;font:500 10px/1 var(--dsw-font-family);background:0 0;border:1px solid #0000;border-radius:7px;margin:8px 8px 8px 0}.PKlHwG_externalLink:hover{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-bg-layer-2)}.PKlHwG_empty{min-height:132px;color:var(--dsw-alias-label-secondary);flex-direction:column;flex:1;justify-content:center;align-items:center;display:flex}.PKlHwG_empty>span{color:#60d98a;border:1px solid #60d98a;border-radius:50%;place-items:center;width:28px;height:28px;display:grid}.PKlHwG_empty p{color:var(--dsw-alias-label-primary);margin:8px 0 2px;font-size:13px}.PKlHwG_empty small{font-size:10px}.PKlHwG_detail{gap:14px;width:min(1080px,100% - 44px);height:100%;margin:0 auto;padding:22px 0 40px;display:grid;overflow-y:auto}.PKlHwG_backToList{border:1px solid var(--dsw-alias-border-l2);width:max-content;min-height:32px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:8px;padding:0 10px}.PKlHwG_backToList:hover{color:var(--dsw-alias-state-business-primary)}.PKlHwG_detailState{min-height:240px;color:var(--dsw-alias-label-secondary);place-items:center;display:grid}.PKlHwG_detailHero,.PKlHwG_detailStats,.PKlHwG_description,.PKlHwG_files{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:14px}.PKlHwG_detailHero{justify-content:space-between;align-items:flex-start;gap:24px;padding:22px;display:flex}.PKlHwG_detailHero>div>span{color:var(--dsw-alias-label-secondary);font-size:11px}.PKlHwG_detailHero h2{letter-spacing:-.025em;max-width:760px;margin:7px 0 14px;font-size:22px;line-height:1.35}.PKlHwG_detailHero code{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);border-radius:6px;padding:5px 8px;font-size:11px}.PKlHwG_detailHero button{border:1px solid var(--dsw-alias-border-l2);min-width:max-content;min-height:34px;color:var(--dsw-alias-state-business-primary);cursor:pointer;background:0 0;border-radius:8px;padding:0 12px}.PKlHwG_detailStats{grid-template-columns:repeat(5,1fr);display:grid;overflow:hidden}.PKlHwG_detailStats div{border-right:1px solid var(--dsw-alias-border-l2);flex-direction:column;justify-content:center;min-height:86px;padding:16px;display:flex}.PKlHwG_detailStats div:last-child{border:0}.PKlHwG_detailStats strong{font:700 18px/1.2 ui-monospace,SFMono-Regular,monospace}.PKlHwG_detailStats span{color:var(--dsw-alias-label-secondary);margin-top:7px;font-size:10px}.PKlHwG_addition,.PKlHwG_clean{color:#3fbf72}.PKlHwG_deletion,.PKlHwG_conflict{color:var(--dsw-alias-state-error-primary)}.PKlHwG_unknown{color:var(--dsw-alias-label-secondary)}.PKlHwG_description{padding:18px 20px}.PKlHwG_description h3,.PKlHwG_files h3{margin:0 0 12px;font-size:13px}.PKlHwG_description p{color:var(--dsw-alias-label-secondary);white-space:pre-wrap;margin:0;font-size:12px;line-height:1.7}.PKlHwG_files{min-width:0;padding:18px 20px}.PKlHwG_files h3 span{color:var(--dsw-alias-label-secondary);font-weight:400}.PKlHwG_files ol{margin:0;padding:0;list-style:none}.PKlHwG_files li{border-top:1px solid color-mix(in srgb,var(--dsw-alias-border-l2) 65%,transparent)}.PKlHwG_files details{min-width:0}.PKlHwG_files summary{cursor:pointer;grid-template-columns:22px minmax(0,1fr) auto;align-items:center;gap:8px;min-height:42px;list-style:none;display:grid}.PKlHwG_files summary::-webkit-details-marker{display:none}.PKlHwG_files summary:before{content:\"›\";color:var(--dsw-alias-label-tertiary);margin-left:-13px;transition:transform .15s;position:absolute}.PKlHwG_files details[open] summary:before{transform:rotate(90deg)}.PKlHwG_fileStatus{color:var(--dsw-alias-label-secondary);font:700 10px/1 ui-monospace,SFMono-Regular,monospace}.PKlHwG_files code{text-overflow:ellipsis;white-space:nowrap;font-size:11px;overflow:hidden}.PKlHwG_fileCounts{gap:8px;font:600 10px/1 ui-monospace,SFMono-Regular,monospace;display:flex}.PKlHwG_fileCounts i{color:#3fbf72;font-style:normal}.PKlHwG_fileCounts b{color:var(--dsw-alias-state-error-primary)}.PKlHwG_diffBlock{border:1px solid var(--dsw-alias-border-l2);max-height:520px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);tab-size:2;border-radius:9px;margin:0 0 12px;padding:12px 0;font:10px/1.55 ui-monospace,SFMono-Regular,monospace;overflow:auto}.PKlHwG_diffBlock span{min-width:max-content;padding:0 12px;display:block}.PKlHwG_diffAdd{color:#62c986;background:#3fbf7217}.PKlHwG_diffDelete{color:#e47b82;background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 9%,transparent)}.PKlHwG_diffHunk{color:var(--dsw-alias-state-business-primary)}.PKlHwG_diffUnavailable{border:1px dashed var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);border-radius:9px;margin:0 0 12px;padding:12px;font-size:11px}.PKlHwG_detailActions{align-items:center;gap:8px;min-width:max-content;display:flex}.PKlHwG_detailHero .PKlHwG_reviewButton{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted);background:var(--dsw-alias-state-business-primary);font-weight:650}.PKlHwG_detailHero .PKlHwG_reviewButton:hover{filter:brightness(1.08)}.PKlHwG_modalBackdrop{z-index:1000;backdrop-filter:blur(5px);background:#00000085;place-items:center;padding:20px;display:grid;position:fixed;inset:0}.PKlHwG_reviewDialog{border:1px solid var(--dsw-alias-border-l2);width:min(480px,100%);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);box-shadow:var(--dsw-shadow-lv3);border-radius:16px;padding:24px}.PKlHwG_reviewDialog h2{letter-spacing:-.025em;margin:5px 0 6px;font-size:20px}.PKlHwG_reviewDialog>p{color:var(--dsw-alias-label-secondary);margin:0 0 20px;font-size:12px;line-height:1.6}.PKlHwG_modelField{gap:7px;display:grid}.PKlHwG_modelField>span{color:var(--dsw-alias-label-secondary);font-size:11px}.PKlHwG_modelField select{border:1px solid var(--dsw-alias-border-l2);width:100%;height:40px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);font:inherit;border-radius:9px;outline:0;padding:0 10px}.PKlHwG_modelField select:focus{border-color:var(--dsw-alias-state-business-primary)}.PKlHwG_modelHint{min-height:18px;color:var(--dsw-alias-label-tertiary);margin-top:7px;font-size:10px}.PKlHwG_reviewError{border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 35%,transparent);color:var(--dsw-alias-state-error-primary);border-radius:8px;margin:0 0 14px;padding:9px 11px;font-size:11px}.PKlHwG_reviewDialog footer{justify-content:flex-end;gap:8px;margin-top:22px;display:flex}.PKlHwG_reviewDialog footer button{border:1px solid var(--dsw-alias-border-l2);min-height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:8px;padding:0 14px}.PKlHwG_reviewDialog footer button:last-child{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted);background:var(--dsw-alias-state-business-primary)}.PKlHwG_reviewDialog footer button:disabled{cursor:not-allowed;opacity:.48}.PKlHwG_error{min-height:100px;color:var(--dsw-alias-state-error-primary);flex-direction:column;justify-content:center;gap:5px;padding:18px;display:flex}.PKlHwG_error span{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;font-size:11px}.PKlHwG_notice{color:var(--dsw-alias-label-secondary);margin:0;padding:8px 16px;font-size:10px}.PKlHwG_noResults{color:var(--dsw-alias-label-secondary);text-align:center;grid-column:1/-1;padding:80px}@media (width<=760px){.PKlHwG_header{flex-direction:column;align-items:flex-start}.PKlHwG_actions{width:100%}.PKlHwG_search{flex:1;min-width:0}.PKlHwG_grid{grid-auto-columns:calc(100vw - 24px);padding:12px}.PKlHwG_detail{width:calc(100% - 24px)}.PKlHwG_detailHero{flex-direction:column}.PKlHwG_detailActions{flex-wrap:wrap;width:100%}.PKlHwG_detailStats{grid-template-columns:repeat(2,1fr)}.PKlHwG_detailStats div{border-bottom:1px solid var(--dsw-alias-border-l2)}}@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}.PKlHwG_files .PKlHwG_diffBlock,.PKlHwG_files .PKlHwG_diffUnavailable{margin-left:30px}.PKlHwG_externalLink svg{fill:none;stroke:currentColor;stroke-width:1.4px;stroke-linecap:round;stroke-linejoin:round;width:15px;height:15px}.PKlHwG_reviewResult,.PKlHwG_reviewPending{border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 26%,var(--dsw-alias-border-l2));background:var(--dsw-alias-bg-layer-1);border-radius:14px}.PKlHwG_reviewResult{min-width:0;padding:18px 20px 20px}.PKlHwG_reviewResult>header{justify-content:space-between;align-items:center;gap:16px;display:flex}.PKlHwG_reviewResultActions{align-items:center;gap:8px;display:flex}.PKlHwG_reviewResultActions button:disabled{opacity:.5;cursor:wait}.PKlHwG_commentSuccess{color:#3fbf72;border:1px solid #3fbf7266;border-radius:8px;margin-top:12px;padding:9px 11px;font-size:11px}.PKlHwG_reviewResult h3{margin:4px 0 0;font-size:15px}.PKlHwG_reviewResult button,.PKlHwG_reviewPending button{border:1px solid var(--dsw-alias-border-l2);min-height:32px;color:var(--dsw-alias-state-business-primary);cursor:pointer;background:0 0;border-radius:8px;padding:0 10px}.PKlHwG_reviewResult>pre{border:1px solid var(--dsw-alias-border-l2);max-height:640px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font:12px/1.7 var(--dsw-font-family);white-space:pre-wrap;overflow-wrap:anywhere;border-radius:10px;margin:16px 0 0;padding:16px;overflow:auto}.PKlHwG_reviewPending{align-items:center;gap:12px;padding:16px 20px;display:flex}.PKlHwG_reviewPending strong{flex:1;font-size:13px}.PKlHwG_restoreDialog{border:1px solid var(--dsw-alias-border-l2);width:min(500px,100%);max-height:min(620px,100vh - 40px);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);box-shadow:var(--dsw-shadow-lv3);border-radius:16px;flex-direction:column;padding:24px;display:flex}.PKlHwG_restoreDialog h2{margin:5px 0 4px;font-size:20px}.PKlHwG_restoreDialog>p{color:var(--dsw-alias-label-secondary);margin:0 0 16px;font-size:12px}.PKlHwG_restoreDialog ol{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;min-height:0;margin:0;padding:0;list-style:none;overflow:auto}.PKlHwG_restoreDialog li+li{border-top:1px solid var(--dsw-alias-border-l2)}.PKlHwG_restoreDialog label{cursor:pointer;align-items:center;gap:11px;min-height:54px;padding:8px 12px;display:flex}.PKlHwG_restoreDialog label:hover{background:var(--dsw-alias-interactive-bg-hover)}.PKlHwG_restoreDialog label>span{flex-direction:column;gap:3px;min-width:0;display:flex}.PKlHwG_restoreDialog strong{text-overflow:ellipsis;white-space:nowrap;font-size:12px;overflow:hidden}.PKlHwG_restoreDialog small{color:var(--dsw-alias-label-secondary);font-size:10px}.PKlHwG_restoreDialog footer{justify-content:flex-end;gap:8px;margin-top:18px;display:flex}.PKlHwG_restoreDialog footer button{border:1px solid var(--dsw-alias-border-l2);min-height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:8px;padding:0 14px}.PKlHwG_restoreDialog footer button:last-child{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted);background:var(--dsw-alias-state-business-primary)}.PKlHwG_restoreDialog footer button:disabled{opacity:.45;cursor:not-allowed}.PKlHwG_files summary{grid-template-columns:14px 22px minmax(0,1fr) auto}.PKlHwG_files summary:before{content:none}.PKlHwG_disclosureIcon{width:14px;height:14px;color:var(--dsw-alias-label-tertiary);place-items:center;transition:transform .15s;display:grid}.PKlHwG_disclosureIcon svg{fill:none;stroke:currentColor;stroke-width:1.5px;stroke-linecap:round;stroke-linejoin:round;width:12px;height:12px}.PKlHwG_files details[open] .PKlHwG_disclosureIcon{transform:rotate(90deg)}.PKlHwG_commits{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:14px;min-width:0;padding:18px 20px}.PKlHwG_commitsHeading{align-items:center;gap:6px;margin:0 0 10px;font-size:13px;display:flex}.PKlHwG_commitsCount{border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 34%,var(--dsw-alias-border-l2));min-width:22px;height:20px;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 6%,transparent);cursor:pointer;border-radius:6px;justify-content:center;align-items:center;padding:0 6px;font:700 11px/1 ui-monospace,SFMono-Regular,monospace;display:inline-flex}.PKlHwG_commitsCount:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 14%,transparent)}.PKlHwG_commits ol{margin:0;padding:0;list-style:none}.PKlHwG_commits li{border-top:1px solid color-mix(in srgb,var(--dsw-alias-border-l2) 65%,transparent);grid-template-columns:64px minmax(0,1fr) 28px;align-items:center;gap:10px;min-height:48px;display:grid}.PKlHwG_commits li>code{color:var(--dsw-alias-state-business-primary);font:10px/1 ui-monospace,SFMono-Regular,monospace}.PKlHwG_commits li>div{flex-direction:column;gap:3px;min-width:0;display:flex}.PKlHwG_commits strong{text-overflow:ellipsis;white-space:nowrap;font-size:12px;font-weight:550;overflow:hidden}.PKlHwG_commits li span{color:var(--dsw-alias-label-secondary);font-size:10px}.PKlHwG_commits button{width:28px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:1px solid #0000;border-radius:7px;padding:0;font-size:13px}.PKlHwG_commits button:hover{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-state-business-primary)}.PKlHwG_commitView{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:14px;min-width:0;padding:18px 20px}.PKlHwG_commitView h3{margin:0 0 10px;font-size:13px}.PKlHwG_commitView h3 span{color:var(--dsw-alias-label-secondary);font-weight:400}.PKlHwG_commitList{margin:0;padding:0;list-style:none}.PKlHwG_commitList li+li{border-top:1px solid color-mix(in srgb,var(--dsw-alias-border-l2) 65%,transparent)}.PKlHwG_commitRow{align-items:center;gap:8px;display:flex}.PKlHwG_commitMain{min-width:0;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;flex:1;grid-template-columns:14px minmax(0,1fr);align-items:center;gap:9px;padding:11px 6px;display:grid}.PKlHwG_commitMain:hover{background:var(--dsw-alias-interactive-bg-hover)}.PKlHwG_commitMeta{flex-direction:column;gap:3px;min-width:0;display:flex}.PKlHwG_commitMain strong{text-overflow:ellipsis;white-space:nowrap;font-size:12px;font-weight:550;overflow:hidden}.PKlHwG_commitMain span{color:var(--dsw-alias-label-secondary);font-size:10px}.PKlHwG_commitShaButton{min-height:26px;color:var(--dsw-alias-state-business-primary);cursor:pointer;font:inherit;background:0 0;border:1px solid #0000;border-radius:7px;align-items:center;gap:5px;padding:0 8px;display:inline-flex}.PKlHwG_commitShaButton:hover{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2)}.PKlHwG_commitShaButton code{color:inherit;font:600 11px/1 ui-monospace,SFMono-Regular,monospace}.PKlHwG_commitShaCopyHint{color:var(--dsw-alias-label-tertiary);font-size:11px}.PKlHwG_commitShaButton[aria-pressed=true] .PKlHwG_commitShaCopyHint{color:#3fbf72}.PKlHwG_commitExternal{width:28px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:1px solid #0000;border-radius:7px;padding:0;font-size:13px}.PKlHwG_commitExternal:hover{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-state-business-primary)}.PKlHwG_commitBody{padding:10px 12px 16px 34px}.PKlHwG_commitState{min-height:72px;color:var(--dsw-alias-label-secondary);place-items:center;font-size:11px;display:grid}.PKlHwG_commitFiles{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);border-radius:10px;margin:6px 0 0;padding:0;list-style:none;overflow:hidden}.PKlHwG_commitFiles li+li{border-top:1px solid color-mix(in srgb,var(--dsw-alias-border-l2) 65%,transparent)}.PKlHwG_commitFiles summary{cursor:pointer;grid-template-columns:14px 22px minmax(0,1fr) auto;align-items:center;gap:8px;min-height:42px;padding:0 14px;list-style:none;display:grid}.PKlHwG_commitFiles summary::-webkit-details-marker{display:none}.PKlHwG_commitFiles summary:before{content:none}.PKlHwG_commitFiles details[open] .PKlHwG_disclosureIcon{transform:rotate(90deg)}.PKlHwG_commitFiles .PKlHwG_diffBlock,.PKlHwG_commitFiles .PKlHwG_diffUnavailable{margin-left:14px;margin-right:14px}.PKlHwG_detailStats .PKlHwG_commitStat{border:0;border-right:1px solid var(--dsw-alias-border-l2);min-height:86px;color:inherit;text-align:left;cursor:pointer;background:0 0;flex-direction:column;justify-content:center;padding:16px;display:flex}.PKlHwG_detailStats .PKlHwG_commitStat:hover{background:var(--dsw-alias-interactive-bg-hover)}.PKlHwG_detailStats .PKlHwG_commitStat:disabled{cursor:default;opacity:.65}.PKlHwG_detailStats .PKlHwG_commitStat strong{font:700 18px/1.2 ui-monospace,SFMono-Regular,monospace}.PKlHwG_detailStats .PKlHwG_commitStat span{color:var(--dsw-alias-state-business-primary);margin-top:7px;font-size:10px}.PKlHwG_detailHero .PKlHwG_conflictButton{border-color:var(--dsw-alias-state-error-primary);color:#fff;background:var(--dsw-alias-state-error-primary);font-weight:650}.PKlHwG_conflictResult{border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 28%,var(--dsw-alias-border-l2));background:var(--dsw-alias-bg-layer-1);border-radius:14px;min-width:0;padding:18px 20px 20px}.PKlHwG_conflictResult>header{justify-content:space-between;align-items:center;gap:16px;display:flex}.PKlHwG_conflictResult h3{margin:4px 0 0;font-size:15px}.PKlHwG_conflictResultActions{gap:8px;display:flex}.PKlHwG_conflictResult button{border:1px solid var(--dsw-alias-border-l2);min-height:32px;color:var(--dsw-alias-state-business-primary);cursor:pointer;background:0 0;border-radius:8px;padding:0 10px}.PKlHwG_conflictResult .PKlHwG_pushButton{color:#fff;background:#2f9f5d;border-color:#3fbf72;font-weight:650}.PKlHwG_conflictFacts{flex-wrap:wrap;gap:8px;margin-top:14px;display:flex}.PKlHwG_conflictFacts>span{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);border-radius:7px;padding:6px 8px;font-size:10px}.PKlHwG_conflictFacts code{color:var(--dsw-alias-label-primary)}.PKlHwG_conflictChanges,.PKlHwG_conflictLogic{margin-top:16px}.PKlHwG_conflictChanges h4,.PKlHwG_conflictLogic h4{margin:0 0 8px;font-size:12px}.PKlHwG_conflictChanges ol{margin:0;padding:0;list-style:none}.PKlHwG_conflictChanges li{border-top:1px solid var(--dsw-alias-border-l2);align-items:center;gap:9px;min-height:30px;display:flex}.PKlHwG_conflictChanges b{width:22px;color:var(--dsw-alias-state-business-primary);font:700 10px/1 ui-monospace,SFMono-Regular,monospace}.PKlHwG_conflictChanges code{overflow-wrap:anywhere;font-size:11px}.PKlHwG_conflictLogic pre{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);max-height:520px;font:12px/1.65 var(--dsw-font-family);white-space:pre-wrap;overflow-wrap:anywhere;border-radius:9px;margin:0;padding:14px;overflow:auto}.PKlHwG_conflictSuccess{color:#3fbf72;border:1px solid #3fbf7266;border-radius:8px;margin-top:12px;padding:9px 11px;font-size:11px}.PKlHwG_workbench button,.PKlHwG_workbench input,.PKlHwG_workbench select{font-family:inherit;font-size:12px;line-height:18px}.PKlHwG_workbench .PKlHwG_actions{flex-wrap:nowrap;flex:none;justify-content:flex-end;min-width:0;max-width:none}.PKlHwG_workbench .PKlHwG_actions button{white-space:nowrap;flex:none;width:auto;font-size:12px;line-height:18px}.PKlHwG_workbench .PKlHwG_actions .PKlHwG_search{box-sizing:border-box;flex:0 230px;width:auto;min-width:100px}.PKlHwG_workbench .PKlHwG_search input{min-width:0}.PKlHwG_workbench .PKlHwG_header{scrollbar-width:thin;flex-wrap:nowrap;gap:12px;overflow-x:auto}.PKlHwG_workbench .PKlHwG_headerIdentity{flex:1 0 180px;align-items:center;gap:12px;min-width:180px;display:flex}.PKlHwG_workbench .PKlHwG_titleRow{flex:none}.PKlHwG_workbench .PKlHwG_header h1{white-space:nowrap;font-size:14px;line-height:20px}.PKlHwG_workbench .PKlHwG_headerIdentity p{text-overflow:ellipsis;white-space:nowrap;min-width:0;max-width:320px;margin:0;overflow:hidden}.PKlHwG_workbench .PKlHwG_actions button,.PKlHwG_workbench .PKlHwG_actions .PKlHwG_search{box-sizing:border-box;border-radius:6px;height:28px;min-height:28px}.PKlHwG_workbench .PKlHwG_actions .PKlHwG_search{flex:0 200px;width:200px}";
		const tagId$3 = "@stephen1620/dsh-tomato-board/pr-assistant.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephen1620/dsh-tomato-board";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		var pr_assistant_module_css_default = {
			"actions": "PKlHwG_actions",
			"addition": "PKlHwG_addition",
			"backToList": "PKlHwG_backToList",
			"branches": "PKlHwG_branches",
			"clean": "PKlHwG_clean",
			"commentSuccess": "PKlHwG_commentSuccess",
			"commitBody": "PKlHwG_commitBody",
			"commitExternal": "PKlHwG_commitExternal",
			"commitFiles": "PKlHwG_commitFiles",
			"commitList": "PKlHwG_commitList",
			"commitMain": "PKlHwG_commitMain",
			"commitMeta": "PKlHwG_commitMeta",
			"commitRow": "PKlHwG_commitRow",
			"commitShaButton": "PKlHwG_commitShaButton",
			"commitShaCopyHint": "PKlHwG_commitShaCopyHint",
			"commitStat": "PKlHwG_commitStat",
			"commitState": "PKlHwG_commitState",
			"commitView": "PKlHwG_commitView",
			"commits": "PKlHwG_commits",
			"commitsCount": "PKlHwG_commitsCount",
			"commitsHeading": "PKlHwG_commitsHeading",
			"conflict": "PKlHwG_conflict",
			"conflictButton": "PKlHwG_conflictButton",
			"conflictChanges": "PKlHwG_conflictChanges",
			"conflictFacts": "PKlHwG_conflictFacts",
			"conflictLogic": "PKlHwG_conflictLogic",
			"conflictResult": "PKlHwG_conflictResult",
			"conflictResultActions": "PKlHwG_conflictResultActions",
			"conflictSuccess": "PKlHwG_conflictSuccess",
			"conflictTag": "PKlHwG_conflictTag",
			"count": "PKlHwG_count",
			"countActive": "PKlHwG_countActive",
			"deletion": "PKlHwG_deletion",
			"description": "PKlHwG_description",
			"detail": "PKlHwG_detail",
			"detailActions": "PKlHwG_detailActions",
			"detailHero": "PKlHwG_detailHero",
			"detailState": "PKlHwG_detailState",
			"detailStats": "PKlHwG_detailStats",
			"diffAdd": "PKlHwG_diffAdd",
			"diffBlock": "PKlHwG_diffBlock",
			"diffDelete": "PKlHwG_diffDelete",
			"diffHunk": "PKlHwG_diffHunk",
			"diffUnavailable": "PKlHwG_diffUnavailable",
			"disclosureIcon": "PKlHwG_disclosureIcon",
			"draft": "PKlHwG_draft",
			"empty": "PKlHwG_empty",
			"error": "PKlHwG_error",
			"externalLink": "PKlHwG_externalLink",
			"eyebrow": "PKlHwG_eyebrow",
			"fileCounts": "PKlHwG_fileCounts",
			"fileStatus": "PKlHwG_fileStatus",
			"files": "PKlHwG_files",
			"grid": "PKlHwG_grid",
			"header": "PKlHwG_header",
			"headerIdentity": "PKlHwG_headerIdentity",
			"hideRepo": "PKlHwG_hideRepo",
			"meta": "PKlHwG_meta",
			"modalBackdrop": "PKlHwG_modalBackdrop",
			"modelField": "PKlHwG_modelField",
			"modelHint": "PKlHwG_modelHint",
			"noResults": "PKlHwG_noResults",
			"notice": "PKlHwG_notice",
			"prList": "PKlHwG_prList",
			"prMain": "PKlHwG_prMain",
			"prNumber": "PKlHwG_prNumber",
			"prRow": "PKlHwG_prRow",
			"prTitle": "PKlHwG_prTitle",
			"provider": "PKlHwG_provider",
			"pushButton": "PKlHwG_pushButton",
			"repo": "PKlHwG_repo",
			"repoHeader": "PKlHwG_repoHeader",
			"repoIdentity": "PKlHwG_repoIdentity",
			"repoTools": "PKlHwG_repoTools",
			"restoreDialog": "PKlHwG_restoreDialog",
			"reviewButton": "PKlHwG_reviewButton",
			"reviewDialog": "PKlHwG_reviewDialog",
			"reviewError": "PKlHwG_reviewError",
			"reviewPending": "PKlHwG_reviewPending",
			"reviewResult": "PKlHwG_reviewResult",
			"reviewResultActions": "PKlHwG_reviewResultActions",
			"scrollArea": "PKlHwG_scrollArea",
			"search": "PKlHwG_search",
			"sourceBranch": "PKlHwG_sourceBranch",
			"targetBranch": "PKlHwG_targetBranch",
			"titleBack": "PKlHwG_titleBack",
			"titleRow": "PKlHwG_titleRow",
			"unknown": "PKlHwG_unknown",
			"unknownTag": "PKlHwG_unknownTag",
			"workbench": "PKlHwG_workbench"
		};
		//#endregion
		//#region src/client/view-cache.ts
		const prefix$1 = "taskboard.tomatoViews.v1:";
		function browserStorage$1() {
			try {
				return typeof window === "undefined" ? null : window.localStorage;
			} catch {
				return null;
			}
		}
		/** Restore only a validated successful snapshot; storage is always optional. */
		function readViewCache(key, validate, storage = browserStorage$1()) {
			try {
				const raw = storage?.getItem(prefix$1 + encodeURIComponent(key));
				if (!raw || raw.length > 1e7) return null;
				const value = JSON.parse(raw);
				return value?.version === 1 && Number.isFinite(value.updatedAt) && validate(value.data) ? value.data : null;
			} catch {
				return null;
			}
		}
		function writeViewCache(key, data, storage = browserStorage$1()) {
			try {
				const value = JSON.stringify({
					version: 1,
					updatedAt: Date.now(),
					data
				});
				if (value.length <= 1e7) storage?.setItem(prefix$1 + encodeURIComponent(key), value);
			} catch {}
		}
		//#endregion
		//#region src/client/PrAssistant.tsx
		function isPrOverview(value) {
			return Array.isArray(value) && value.length <= 2e3 && value.every((repo) => repo && typeof repo.workspaceId === "string" && typeof repo.workspaceTitle === "string" && typeof repo.localPath === "string" && Number.isFinite(repo.openCount) && Array.isArray(repo.pullRequests) && repo.pullRequests.length <= 5e3 && repo.pullRequests.every((pr) => pr && Number.isInteger(pr.number) && typeof pr.title === "string" && typeof pr.url === "string"));
		}
		const EMPTY_REVIEW_EVENTS = {
			entries: [],
			hasMore: false,
			revision: 0,
			change: {
				kind: "replace",
				entries: []
			}
		};
		const HIDDEN_REPOSITORIES_KEY = "prAssistant.hiddenRepositories.v1";
		const REVIEW_SESSION_LINKS_KEY = "prAssistant.reviewSessionLinks.v1";
		const CONFLICT_LINKS_KEY = "prAssistant.conflictLinks.v1";
		function reviewLinkKey(repository, pullRequest) {
			return `${repository.workspaceId}:${pullRequest.number}`;
		}
		function readReviewSessionLinks() {
			try {
				const value = JSON.parse(window.localStorage.getItem(REVIEW_SESSION_LINKS_KEY) ?? "{}");
				return value && typeof value === "object" ? value : {};
			} catch {
				return {};
			}
		}
		function linkedReviewSession(repository, pullRequest) {
			const value = readReviewSessionLinks()[reviewLinkKey(repository, pullRequest)];
			return typeof value === "string" && value ? value : null;
		}
		function saveReviewSession(repository, pullRequest, sessionId) {
			const links = readReviewSessionLinks();
			links[reviewLinkKey(repository, pullRequest)] = String(sessionId);
			window.localStorage.setItem(REVIEW_SESSION_LINKS_KEY, JSON.stringify(links));
		}
		function readConflictLinks() {
			try {
				const value = JSON.parse(window.localStorage.getItem(CONFLICT_LINKS_KEY) ?? "{}");
				return value && typeof value === "object" ? value : {};
			} catch {
				return {};
			}
		}
		function conflictLink(repository, pullRequest) {
			const value = readConflictLinks()[reviewLinkKey(repository, pullRequest)];
			return value && typeof value.operationId === "string" && typeof value.sessionId === "string" ? value : null;
		}
		function saveConflictLink(repository, pullRequest, value) {
			const links = readConflictLinks();
			links[reviewLinkKey(repository, pullRequest)] = value;
			window.localStorage.setItem(CONFLICT_LINKS_KEY, JSON.stringify(links));
		}
		function findReviewSession(ctx, repository, pullRequest) {
			const snapshot = ctx.sessions.list.getSnapshot();
			const hasConversation = (id) => snapshot.byId[id]?.blank === false;
			const linked = linkedReviewSession(repository, pullRequest);
			if (linked && hasConversation(linked)) return linked;
			const expectedTitle = `[PR #${pullRequest.number}] ${pullRequest.title}`;
			return snapshot.ids.find((id) => {
				const summary = snapshot.byId[id];
				return summary?.title === expectedTitle && summary.cwd === repository.localPath && summary.blank === false;
			}) ?? null;
		}
		function useReviewResult(ctx, sessionId) {
			const binding = sessionId ? ctx.sessions.binding(sessionId) : void 0;
			const source = binding?.eventSource;
			const window = (0, react.useSyncExternalStore)((listener) => source?.subscribe(listener) ?? (() => {}), () => source?.getSnapshot() ?? EMPTY_REVIEW_EVENTS, () => source?.getSnapshot() ?? EMPTY_REVIEW_EVENTS);
			if ((0, react.useSyncExternalStore)((listener) => binding?.session.subscribe(listener) ?? (() => {}), () => binding?.session.getSnapshot().running ?? false, () => binding?.session.getSnapshot().running ?? false)) return null;
			for (let index = window.entries.length - 1; index >= 0; index -= 1) {
				const entry = window.entries[index];
				if (entry?.type !== "event" || entry.event.type !== "assistant/message") continue;
				const text = entry.event.data.message.content.filter((block) => block.type === "text").map((block) => block.text).join("\n").trim();
				if (text) return {
					text,
					time: entry.event.time
				};
			}
			return null;
		}
		function readHiddenRepositories() {
			try {
				const value = JSON.parse(window.localStorage.getItem(HIDDEN_REPOSITORIES_KEY) ?? "[]");
				return new Set(Array.isArray(value) ? value.filter((item) => typeof item === "string") : []);
			} catch {
				return /* @__PURE__ */ new Set();
			}
		}
		function relativeTime(value) {
			const elapsed = Date.now() - new Date(value).getTime();
			if (!Number.isFinite(elapsed)) return "";
			const hours = Math.max(0, Math.floor(elapsed / 36e5));
			if (hours < 1) return "刚刚更新";
			if (hours < 24) return `${hours} 小时前`;
			return `${Math.floor(hours / 24)} 天前`;
		}
		async function copyToClipboard(text) {
			try {
				if (navigator.clipboard?.writeText) {
					await navigator.clipboard.writeText(text);
					return true;
				}
			} catch {}
			try {
				const textarea = document.createElement("textarea");
				textarea.value = text;
				textarea.style.position = "fixed";
				textarea.style.opacity = "0";
				document.body.appendChild(textarea);
				textarea.select();
				const ok = document.execCommand("copy");
				document.body.removeChild(textarea);
				return ok;
			} catch {
				return false;
			}
		}
		async function inspectWorkspace(workspace) {
			try {
				const query = new URLSearchParams({ path: workspace.path });
				const response = await fetch(`/api/tomato-board/pr/repository?${query}`, { headers: { accept: "application/json" } });
				const body = await response.json();
				if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`);
				return {
					...body,
					workspaceId: workspace.workspaceId,
					workspaceTitle: workspace.title,
					localPath: workspace.path
				};
			} catch (error) {
				return {
					workspaceId: workspace.workspaceId,
					workspaceTitle: workspace.title,
					localPath: workspace.path,
					openCount: 0,
					pullRequests: [],
					error: error instanceof Error ? error.message : "仓库读取失败"
				};
			}
		}
		async function inspectWorkspaces(workspaces, concurrency = 4) {
			const results = new Array(workspaces.length);
			let cursor = 0;
			await Promise.all(Array.from({ length: Math.min(concurrency, workspaces.length) }, async () => {
				while (cursor < workspaces.length) {
					const index = cursor;
					cursor += 1;
					const workspace = workspaces[index];
					if (!workspace) break;
					results[index] = await inspectWorkspace(workspace);
				}
			}));
			return results;
		}
		function FileDiff({ diff }) {
			if (!diff) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: pr_assistant_module_css_default.diffUnavailable,
				children: "该文件没有可展示的文本差异，可能是二进制文件或平台省略了补丁。"
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
				className: pr_assistant_module_css_default.diffBlock,
				children: diff.split("\n").map((line, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: line.startsWith("+") ? pr_assistant_module_css_default.diffAdd : line.startsWith("-") ? pr_assistant_module_css_default.diffDelete : line.startsWith("@@") ? pr_assistant_module_css_default.diffHunk : void 0,
					children: [line || " ", "\\n"]
				}, index))
			});
		}
		async function readApiJson(response) {
			const text = await response.text();
			let body;
			try {
				body = JSON.parse(text);
			} catch {
				if (response.status === 404) throw new Error("提交详情接口尚未加载，请重启 Harness Desktop 后重试");
				throw new Error(text.trim() || `接口返回了无效数据 (${response.status})`);
			}
			if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`);
			return body;
		}
		function CommitRow({ commit, repositoryPath }) {
			const [open, setOpen] = (0, react.useState)(false);
			const [files, setFiles] = (0, react.useState)(null);
			const [loading, setLoading] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)(null);
			const [copied, setCopied] = (0, react.useState)(false);
			(0, react.useEffect)(() => {
				if (!open || files || loading) return;
				const controller = new AbortController();
				setLoading(true);
				setError(null);
				const query = new URLSearchParams({
					path: repositoryPath,
					sha: commit.sha
				});
				fetch(`/api/tomato-board/pr/commit?${query}`, {
					headers: { accept: "application/json" },
					signal: controller.signal
				}).then(async (response) => {
					setFiles((await readApiJson(response)).files ?? []);
				}).catch((reason) => {
					if (reason instanceof Error && reason.name === "AbortError") return;
					setError(reason instanceof Error ? reason.message : "提交详情读取失败");
				}).finally(() => {
					if (!controller.signal.aborted) setLoading(false);
				});
				return () => controller.abort();
			}, [
				commit.sha,
				files,
				open,
				repositoryPath
			]);
			async function copySha() {
				if (await copyToClipboard(commit.sha)) setCopied(true);
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: pr_assistant_module_css_default.commitRow,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						className: pr_assistant_module_css_default.commitMain,
						type: "button",
						"aria-expanded": open,
						title: open ? "收起提交详情" : "展开提交详情",
						onClick: () => setOpen((value) => !value),
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: pr_assistant_module_css_default.disclosureIcon,
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 12 12",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m4.5 2.5 3.5 3.5-3.5 3.5" })
							})
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: pr_assistant_module_css_default.commitMeta,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: commit.title || "无提交说明" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								commit.author || "未知作者",
								" · ",
								relativeTime(commit.committedAt)
							] })]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						className: pr_assistant_module_css_default.commitShaButton,
						type: "button",
						title: copied ? "已复制" : "复制完整 commit hash",
						"aria-label": copied ? `已复制 ${commit.sha}` : `复制 ${commit.sha}`,
						"aria-pressed": copied,
						onClick: () => void copySha(),
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: commit.sha.slice(0, 7) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: pr_assistant_module_css_default.commitShaCopyHint,
							"aria-hidden": "true",
							children: copied ? "✓" : "⧉"
						})]
					}),
					commit.url ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						className: pr_assistant_module_css_default.commitExternal,
						type: "button",
						"aria-label": "打开提交",
						title: "打开提交",
						onClick: () => window.open(commit.url, "_blank", "noopener,noreferrer"),
						children: "↗"
					}) : null
				]
			}), open ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: pr_assistant_module_css_default.commitBody,
				children: [
					loading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: pr_assistant_module_css_default.commitState,
						children: "正在读取提交变更…"
					}) : null,
					error ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: pr_assistant_module_css_default.commitState,
						role: "alert",
						children: error
					}) : null,
					files ? files.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ol", {
						className: pr_assistant_module_css_default.commitFiles,
						children: files.map((file) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: pr_assistant_module_css_default.disclosureIcon,
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
									viewBox: "0 0 12 12",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m4.5 2.5 3.5 3.5-3.5 3.5" })
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: pr_assistant_module_css_default.fileStatus,
								children: file.status === "added" ? "A" : file.status === "deleted" ? "D" : file.status === "renamed" ? "R" : "M"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: file.path }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: pr_assistant_module_css_default.fileCounts,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("i", { children: ["+", file.additions] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("b", { children: ["−", file.deletions] })]
							})
						] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FileDiff, { diff: file.diff })] }) }, `${file.previousPath}:${file.path}`))
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: pr_assistant_module_css_default.commitState,
						children: "该提交没有可展示的文件变更。"
					}) : null
				]
			}) : null] });
		}
		function CommitView({ commits, repositoryPath }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: pr_assistant_module_css_default.commitView,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h3", { children: ["按提交查看 ", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: commits.length })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ol", {
					className: pr_assistant_module_css_default.commitList,
					children: commits.map((commit) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CommitRow, {
						commit,
						repositoryPath
					}, commit.sha))
				})]
			});
		}
		function conflictLabel(detail) {
			if (detail.conflictStatus === "conflicting") return "存在冲突";
			if (detail.conflictStatus === "mergeable") return "无冲突";
			return "待平台检测";
		}
		function buildReviewPrompt(repository, pullRequest, detail) {
			const commits = detail.commits.length ? detail.commits.map((commit, index) => `${index + 1}. ${commit.sha.slice(0, 12)} ${commit.title || "无提交说明"}（${commit.author || "未知作者"}）`).join("\n") : "提交信息暂不可用。";
			const description = detail.description.trim() || "未提供 PR 说明。";
			const platformCommand = repository.provider === "gitee" ? `如需补充证据，可使用只读命令 gitee code pr view ${pullRequest.number} 和 gitee code pr diff ${pullRequest.number}。` : `如需补充证据，可使用 GitHub API 或当前可用的 GitHub 工具读取 PR #${pullRequest.number} 的完整 diff。`;
			return [
				`请对当前仓库的 PR #${pullRequest.number} 做一次严格的代码评审。`,
				`标题：${detail.title}`,
				`分支：${detail.sourceBranch} → ${detail.targetBranch}`,
				`PR 说明：\n${description}`,
				`当前摘要：${detail.changedFiles} 个文件，+${detail.additions}/-${detail.deletions}，合并状态：${conflictLabel(detail)}${detail.mergeStatus ? `（平台原始状态：${detail.mergeStatus}）` : ""}。`,
				`本 PR 的提交记录（共 ${detail.commitCount ?? detail.commits.length} 个）：\n${commits}`,
				"先结合 PR 说明和每条 commit 的标题理解需求目标与实现演进，再检查最终 diff。不要把明确属于需求目标的行为变化本身当成风险；只有当实现偏离目标、破坏既有约束，或存在可复现缺陷时才报告。commit 信息用于理解意图，不能替代代码证据。",
				platformCommand,
				"重点检查正确性、回归风险、安全性、并发/状态一致性、边界条件、性能和缺失测试。",
				"只报告可以用代码证据证明的问题；每条问题标注严重级别、文件路径、紧凑行号范围、触发场景和修复建议。",
				"回复必须简明且仅保留必要信息：不要复述 PR 背景、检查过程或给出泛化建议；每个问题最多一个短段落。",
				"如果没有发现问题，只回复“未发现明确问题”，必要时再用一行列出关键未验证风险。",
				"本次只做只读评审；不要修改代码、提交分支、合并 PR 或向代码平台发表评论，除非我之后明确授权。"
			].join("\n");
		}
		function buildConflictPrompt(pullRequest, operation) {
			return [
				`请在当前本地仓库中处理 PR #${pullRequest.number} 的合并冲突。`,
				`源分支：${operation.sourceBranch}（预检版本 ${operation.sourceSha}）`,
				`目标分支：${operation.targetBranch}（预检版本 ${operation.targetSha}）`,
				"你已获得修改仓库的授权，但绝对不要 push、force push、rebase、reset --hard 或清理用户文件。",
				`第一步确认仓库路径为 ${operation.path}，执行 git status，并切换/确认当前分支必须是 ${operation.sourceBranch}；若不一致或工作区不干净，立即停止并说明。`,
				`使用锁定的目标提交 ${operation.targetSha} 合并到当前源分支（git merge --no-ff --no-commit ${operation.targetSha}），逐项解决冲突。`,
				"理解源分支与目标分支双方意图后再解决，不得简单选择 ours/theirs 覆盖；解决后检查不存在未合并文件，并运行 git diff --check。",
				"识别并运行与改动相关的仓库测试或类型检查；如果测试失败，修复后重试。无法运行的测试必须明确说明原因。",
				`确认无未解决冲突后提交，提交标题使用“Resolve conflicts for PR #${pullRequest.number}”。只提交本次冲突处理产生的修改。`,
				"最终回复必须包含：1. 提交 hash；2. 测试命令及结果；3. 修改位置（文件及关键区域）；4. 每处冲突的处理逻辑。不要执行 push，推送由用户在 PR 助手中确认。"
			].join("\n");
		}
		function flattenModels(catalog) {
			const models = [];
			const routableProviders = new Set(catalog.routableProviders);
			for (const group of catalog.groups) {
				if (!routableProviders.has(group.id)) continue;
				for (const model of group.models) models.push({
					key: `${group.id}\u0000${model.id}`,
					provider: group.id,
					model: model.id,
					label: model.name,
					providerName: group.name,
					...model.description ? { description: model.description } : {},
					...model.reasoning?.defaultEffort ? { reasoningEffort: model.reasoning.defaultEffort } : {}
				});
			}
			return models;
		}
		function AiReviewDialog({ ctx, repository, pullRequest, detail, onClose, onStarted }) {
			const [models, setModels] = (0, react.useState)([]);
			const [selectedKey, setSelectedKey] = (0, react.useState)("");
			const [loading, setLoading] = (0, react.useState)(true);
			const [starting, setStarting] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)(null);
			(0, react.useEffect)(() => {
				let active = true;
				ctx.remote.session.modelCatalog().then((result) => {
					if (!active) return;
					if (!result.ok) throw new Error(`${result.error.code}: ${result.error.message}`);
					const next = flattenModels(result.value);
					setModels(next);
					setSelectedKey(next.find((model) => model.provider === result.value.default.provider && model.model === result.value.default.model)?.key ?? next[0]?.key ?? "");
				}).catch((reason) => {
					if (active) setError(reason instanceof Error ? reason.message : "模型列表读取失败");
				}).finally(() => {
					if (active) setLoading(false);
				});
				return () => {
					active = false;
				};
			}, [ctx]);
			async function startReview() {
				const selected = models.find((model) => model.key === selectedKey);
				if (!selected || starting) return;
				setStarting(true);
				setError(null);
				try {
					const sessionId = await ctx.sessions.create({ workspaceId: repository.workspaceId });
					const selectedResult = await ctx.remote.session.selectModel({
						sessionId,
						provider: selected.provider,
						model: selected.model,
						...selected.reasoningEffort ? { reasoningEffort: selected.reasoningEffort } : {}
					});
					if (!selectedResult.ok) throw new Error(`模型选择失败：${selectedResult.error.message}`);
					const session = ctx.sessions.binding(sessionId)?.session;
					if (!session) throw new Error("新建评审对话未能在 Harness 中加载");
					const renamed = await session.rename(`[PR #${pullRequest.number}] ${pullRequest.title}`);
					if (!renamed.ok) throw new Error(`评审对话命名失败：${renamed.error.message}`);
					const prompt = buildReviewPrompt(repository, pullRequest, detail);
					const prompted = await session.prompt([{
						type: "text",
						text: prompt
					}], "queue");
					if (!prompted.ok) throw new Error(`评审任务发送失败：${prompted.error.message}`);
					saveReviewSession(repository, pullRequest, sessionId);
					ctx.sessions.open(sessionId);
					onStarted();
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : "AI 评审启动失败");
				} finally {
					setStarting(false);
				}
			}
			const selected = models.find((model) => model.key === selectedKey);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: pr_assistant_module_css_default.modalBackdrop,
				role: "presentation",
				onMouseDown: (event) => {
					if (event.target === event.currentTarget) onClose();
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
					className: pr_assistant_module_css_default.reviewDialog,
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "ai-review-title",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: pr_assistant_module_css_default.eyebrow,
							children: "AI CODE REVIEW"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
							id: "ai-review-title",
							children: "选择评审模型"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
							"将为 ",
							repository.repository,
							" 的 PR #",
							pullRequest.number,
							" 创建一个只读评审对话。"
						] }),
						error ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: pr_assistant_module_css_default.reviewError,
							role: "alert",
							children: error
						}) : null,
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
							className: pr_assistant_module_css_default.modelField,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Harness 模型" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("select", {
								disabled: loading || starting,
								value: selectedKey,
								onChange: (event) => setSelectedKey(event.target.value),
								children: models.map((model) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("option", {
									value: model.key,
									children: [
										model.providerName,
										" · ",
										model.label
									]
								}, model.key))
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: pr_assistant_module_css_default.modelHint,
							children: loading ? "正在读取可用模型…" : selected?.description || selected?.providerName || "没有可用模型"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: starting,
							onClick: onClose,
							children: "取消"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !selected || loading || starting,
							onClick: () => void startReview(),
							children: starting ? "正在创建…" : "开始 AI 评审"
						})] })
					]
				})
			});
		}
		function PrAssistant({ ctx, close, active: visible = true }) {
			const panelRef = (0, react.useRef)(null);
			const refreshGeneration = (0, react.useRef)(0);
			const workspaces = (0, react.useSyncExternalStore)((listener) => ctx.workspaces.list.subscribe(listener), () => ctx.workspaces.list.getSnapshot(), () => ctx.workspaces.list.getSnapshot());
			const overviewKey = "pr-overview:" + JSON.stringify(workspaces.items.map((workspace) => [workspace.workspaceId, workspace.path]).sort());
			const overviewScope = (0, react.useRef)(overviewKey);
			const detailCache = (0, react.useRef)(/* @__PURE__ */ new Map());
			const [results, setResults] = (0, react.useState)(() => readViewCache(overviewKey, isPrOverview) ?? []);
			const resultsRef = (0, react.useRef)(results);
			resultsRef.current = results;
			const [loading, setLoading] = (0, react.useState)(false);
			const [query, setQuery] = (0, react.useState)("");
			const [hiddenRepositories, setHiddenRepositories] = (0, react.useState)(readHiddenRepositories);
			const [restoreOpen, setRestoreOpen] = (0, react.useState)(false);
			const [restoreWorkspaceId, setRestoreWorkspaceId] = (0, react.useState)("");
			const [selection, setSelection] = (0, react.useState)(null);
			const [detail, setDetail] = (0, react.useState)(null);
			const [detailLoading, setDetailLoading] = (0, react.useState)(false);
			const [detailError, setDetailError] = (0, react.useState)(null);
			const [reviewOpen, setReviewOpen] = (0, react.useState)(false);
			const [commitView, setCommitView] = (0, react.useState)(false);
			const [conflict, setConflict] = (0, react.useState)(null);
			const [conflictStatus, setConflictStatus] = (0, react.useState)(null);
			const [conflictBusy, setConflictBusy] = (0, react.useState)(false);
			const [conflictError, setConflictError] = (0, react.useState)(null);
			const [pushed, setPushed] = (0, react.useState)(false);
			const [commentBusy, setCommentBusy] = (0, react.useState)(false);
			const [commentStatus, setCommentStatus] = (0, react.useState)(null);
			async function refresh() {
				const generation = ++refreshGeneration.current;
				setLoading(true);
				try {
					const next = await inspectWorkspaces(workspaces.items);
					if (generation === refreshGeneration.current) {
						const merged = next.map((repo) => {
							const previous = resultsRef.current.find((value) => value.workspaceId === repo.workspaceId && value.localPath === repo.localPath);
							return repo.error && previous ? {
								...previous,
								error: repo.error
							} : repo;
						});
						setResults(merged);
						if (next.some((repo) => !repo.error) || next.length === 0) writeViewCache(overviewKey, merged);
					}
				} finally {
					if (generation === refreshGeneration.current) setLoading(false);
				}
			}
			(0, react.useEffect)(() => {
				if (!visible) return;
				if (overviewScope.current !== overviewKey) {
					overviewScope.current = overviewKey;
					setResults(readViewCache(overviewKey, isPrOverview) ?? []);
				}
				refresh();
				return () => {
					refreshGeneration.current += 1;
				};
			}, [
				workspaces.items,
				overviewKey,
				visible
			]);
			(0, react.useEffect)(() => {
				if (!visible || !selection) return;
				const cacheKey = JSON.stringify([selection.repository.localPath, selection.pullRequest.number]);
				const controller = new AbortController();
				const query = new URLSearchParams({
					path: selection.repository.localPath,
					number: String(selection.pullRequest.number),
					_t: String(Date.now())
				});
				setDetail(detailCache.current.get(cacheKey) ?? null);
				setDetailError(null);
				setDetailLoading(true);
				fetch(`/api/tomato-board/pr/pull-request?${query}`, {
					headers: { accept: "application/json" },
					signal: controller.signal
				}).then(async (response) => {
					const body = await response.json();
					if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`);
					if (!controller.signal.aborted) {
						if (detailCache.current.size >= 20) detailCache.current.delete(detailCache.current.keys().next().value);
						detailCache.current.set(cacheKey, body);
						setDetail(body);
					}
				}).catch((error) => {
					if (error instanceof Error && error.name === "AbortError") return;
					setDetailError(error instanceof Error ? error.message : "PR 详情读取失败");
				}).finally(() => {
					if (!controller.signal.aborted) setDetailLoading(false);
				});
				return () => controller.abort();
			}, [selection, visible]);
			(0, react.useEffect)(() => {
				setCommitView(false);
				setConflict(selection ? conflictLink(selection.repository, selection.pullRequest) : null);
				setConflictStatus(null);
				setConflictError(null);
				setPushed(false);
				setCommentStatus(null);
			}, [selection]);
			(0, react.useEffect)(() => {
				if (!visible || !conflict) return;
				let active = true;
				let timer;
				const refreshStatus = async () => {
					try {
						const query = new URLSearchParams({ operationId: conflict.operationId });
						const status = await readApiJson(await fetch(`/api/tomato-board/pr/conflict/status?${query}`, { headers: { accept: "application/json" } }));
						if (active) setConflictStatus(status);
					} catch (reason) {
						if (active) setConflictError(reason instanceof Error ? reason.message : "冲突处理状态读取失败");
					}
					if (active) timer = window.setTimeout(refreshStatus, 2e3);
				};
				refreshStatus();
				return () => {
					active = false;
					if (timer !== void 0) window.clearTimeout(timer);
				};
			}, [conflict, visible]);
			const filtered = (0, react.useMemo)(() => {
				const needle = query.trim().toLowerCase();
				const visible = results.filter((result) => !hiddenRepositories.has(result.workspaceId));
				if (!needle) return visible;
				return visible.filter((result) => [
					result.workspaceTitle,
					result.repository,
					result.provider
				].some((value) => value?.toLowerCase().includes(needle)));
			}, [
				hiddenRepositories,
				query,
				results
			]);
			const visibleResults = results.filter((result) => !hiddenRepositories.has(result.workspaceId));
			const total = visibleResults.reduce((sum, result) => sum + result.openCount, 0);
			const healthy = visibleResults.filter((result) => !result.error).length;
			function hideRepository(workspaceId) {
				setHiddenRepositories((current) => {
					const next = new Set(current).add(workspaceId);
					window.localStorage.setItem(HIDDEN_REPOSITORIES_KEY, JSON.stringify([...next]));
					return next;
				});
			}
			function restoreRepository(workspaceId) {
				setHiddenRepositories((current) => {
					const next = new Set(current);
					next.delete(workspaceId);
					window.localStorage.setItem(HIDDEN_REPOSITORIES_KEY, JSON.stringify([...next]));
					setRestoreOpen(false);
					setRestoreWorkspaceId("");
					return next;
				});
			}
			async function publishReviewToPr() {
				if (!selection || !reviewResult || commentBusy) return;
				if (reviewResult.text.length > 2e4) {
					setCommentStatus("AI 分析结果超过 20000 个字符，无法发布，请先在会话中精简内容。");
					return;
				}
				if (!window.confirm(`确认将当前 AI 分析结果评论到 PR #${selection.pullRequest.number}？\n\n发布后会对仓库协作者可见。`)) return;
				setCommentBusy(true);
				setCommentStatus(null);
				try {
					await readApiJson(await fetch("/api/tomato-board/pr/review/comment", {
						method: "POST",
						headers: {
							accept: "application/json",
							"content-type": "application/json",
							"x-pr-assistant-action": "1"
						},
						body: JSON.stringify({
							path: selection.repository.localPath,
							number: selection.pullRequest.number,
							body: reviewResult.text
						})
					}));
					setCommentStatus("已成功评论到 PR。");
				} catch (reason) {
					setCommentStatus(reason instanceof Error ? reason.message : "PR 评论发布失败");
				} finally {
					setCommentBusy(false);
				}
			}
			async function startConflictResolution() {
				if (!selection || !detail || conflictBusy) return;
				setConflictBusy(true);
				setConflictError(null);
				try {
					const preflight = await readApiJson(await fetch("/api/tomato-board/pr/conflict/preflight", {
						method: "POST",
						headers: {
							accept: "application/json",
							"content-type": "application/json",
							"x-pr-assistant-action": "1"
						},
						body: JSON.stringify({
							path: selection.repository.localPath,
							number: selection.pullRequest.number
						})
					}));
					const sessionId = await ctx.sessions.create({ cwd: preflight.path });
					const catalog = await ctx.remote.session.modelCatalog();
					if (!catalog.ok) throw new Error(`模型列表读取失败：${catalog.error.message}`);
					const selected = catalog.value.default;
					const selectedResult = await ctx.remote.session.selectModel({
						sessionId,
						...selected
					});
					if (!selectedResult.ok) throw new Error(`模型选择失败：${selectedResult.error.message}`);
					const session = ctx.sessions.binding(sessionId)?.session;
					if (!session) throw new Error("新建冲突处理对话未能在 Harness 中加载");
					const renamed = await session.rename(`[PR #${selection.pullRequest.number}] 处理合并冲突`);
					if (!renamed.ok) throw new Error(`对话命名失败：${renamed.error.message}`);
					const link = {
						...preflight,
						sessionId: String(sessionId)
					};
					const prompted = await session.prompt([{
						type: "text",
						text: buildConflictPrompt(selection.pullRequest, link)
					}], "queue");
					if (!prompted.ok) throw new Error(`冲突处理任务发送失败：${prompted.error.message}`);
					saveConflictLink(selection.repository, selection.pullRequest, link);
					setConflict(link);
					ctx.sessions.open(sessionId);
				} catch (reason) {
					setConflictError(reason instanceof Error ? reason.message : "冲突处理启动失败");
				} finally {
					setConflictBusy(false);
				}
			}
			async function pushConflictResolution() {
				if (!conflict || !conflictStatus?.pushReady || conflictBusy) return;
				if (!window.confirm(`确认将 ${conflictStatus.headSha.slice(0, 12)} 推送到 origin/${conflict.sourceBranch}？`)) return;
				setConflictBusy(true);
				setConflictError(null);
				try {
					await readApiJson(await fetch("/api/tomato-board/pr/conflict/push", {
						method: "POST",
						headers: {
							accept: "application/json",
							"content-type": "application/json",
							"x-pr-assistant-action": "1"
						},
						body: JSON.stringify({
							operationId: conflict.operationId,
							expectedHead: conflictStatus.headSha
						})
					}));
					setPushed(true);
				} catch (reason) {
					setConflictError(reason instanceof Error ? reason.message : "推送失败");
				} finally {
					setConflictBusy(false);
				}
			}
			function openAiReview() {
				if (!selection) return;
				setReviewOpen(true);
			}
			const linkedSessionId = selection ? findReviewSession(ctx, selection.repository, selection.pullRequest) : null;
			const hasLinkedReview = linkedSessionId !== null;
			const reviewResult = useReviewResult(ctx, linkedSessionId);
			const conflictSessionId = conflict?.sessionId;
			const conflictResult = useReviewResult(ctx, conflictSessionId ?? null);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				ref: panelRef,
				className: pr_assistant_module_css_default.workbench,
				"aria-label": "PR 助手",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
						className: pr_assistant_module_css_default.header,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: pr_assistant_module_css_default.headerIdentity,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: pr_assistant_module_css_default.titleRow,
								children: [
									selection && commitView ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										className: pr_assistant_module_css_default.titleBack,
										type: "button",
										"aria-label": "返回 PR 详情",
										title: "返回 PR 详情",
										onClick: () => setCommitView(false),
										children: "←"
									}) : null,
									selection && !commitView ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										className: pr_assistant_module_css_default.titleBack,
										type: "button",
										"aria-label": "返回 PR 列表",
										title: "返回 PR 列表",
										onClick: () => setSelection(null),
										children: "←"
									}) : null,
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: selection ? commitView ? `#${selection.pullRequest.number} 按提交查看` : `#${selection.pullRequest.number} PR 详情` : "PR 助手" })
								]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: selection ? commitView ? `${detail?.commits.length ?? 0} 个提交` : selection.repository.repository : `${healthy} 个代码仓库 · ${total} 个待处理 PR` })]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: pr_assistant_module_css_default.actions,
							children: !selection ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									className: pr_assistant_module_css_default.search,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "⌕"
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										value: query,
										onChange: (event) => setQuery(event.target.value),
										placeholder: "搜索仓库"
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: loading,
									onClick: () => void refresh(),
									children: loading ? "同步中…" : "刷新"
								}),
								hiddenRepositories.size ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										setRestoreWorkspaceId("");
										setRestoreOpen(true);
									},
									children: [
										"恢复隐藏 (",
										hiddenRepositories.size,
										")"
									]
								}) : null
							] }) : null
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: pr_assistant_module_css_default.scrollArea,
						children: selection ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("main", {
							className: pr_assistant_module_css_default.detail,
							children: [
								detailLoading && !detail ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: pr_assistant_module_css_default.detailState,
									children: "正在读取 PR 详情…"
								}) : null,
								detailError ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: pr_assistant_module_css_default.detailState,
									role: "alert",
									children: detailError
								}) : null,
								detail ? commitView ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CommitView, {
									commits: detail.commits,
									repositoryPath: selection.repository.localPath
								}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: pr_assistant_module_css_default.detailHero,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
												detail.author,
												" · ",
												relativeTime(detail.updatedAt)
											] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: detail.title }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("code", { children: [
												detail.sourceBranch,
												" → ",
												detail.targetBranch
											] })
										] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: pr_assistant_module_css_default.detailActions,
											children: [
												detail.conflictStatus === "conflicting" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													className: pr_assistant_module_css_default.conflictButton,
													type: "button",
													disabled: conflictBusy,
													onClick: () => void startConflictResolution(),
													children: conflict ? "重新处理冲突" : conflictBusy ? "正在预检…" : "一键处理冲突"
												}) : null,
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													className: pr_assistant_module_css_default.reviewButton,
													type: "button",
													onClick: openAiReview,
													children: hasLinkedReview ? "重新分析" : "AI 评审"
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => window.open(detail.url, "_blank", "noopener,noreferrer"),
													children: "打开 PR ↗"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: pr_assistant_module_css_default.detailStats,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
												className: pr_assistant_module_css_default.commitStat,
												type: "button",
												disabled: detail.commitCount === null,
												onClick: () => setCommitView(true),
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: detail.commitCount ?? "—" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: detail.commitCount === null ? "提交数暂不可用" : "提交 · 点击查看" })]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: detail.changedFiles }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "变更文件" })] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", {
												className: pr_assistant_module_css_default.addition,
												children: ["+", detail.additions]
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "新增行" })] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", {
												className: pr_assistant_module_css_default.deletion,
												children: ["−", detail.deletions]
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "删除行" })] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												title: detail.mergeStatus ? `平台状态：${detail.mergeStatus}` : void 0,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", {
													className: detail.conflictStatus === "conflicting" ? pr_assistant_module_css_default.conflict : detail.conflictStatus === "mergeable" ? pr_assistant_module_css_default.clean : pr_assistant_module_css_default.unknown,
													children: conflictLabel(detail)
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "冲突状态" })]
											})
										]
									}),
									detail.description ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: pr_assistant_module_css_default.description,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "说明" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: detail.description })]
									}) : null,
									conflict || conflictError ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: pr_assistant_module_css_default.conflictResult,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: pr_assistant_module_css_default.eyebrow,
												children: "CONFLICT RESOLUTION"
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "冲突处理" })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: pr_assistant_module_css_default.conflictResultActions,
												children: [conflictSessionId ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														ctx.sessions.open(conflictSessionId);
														close();
													},
													children: "打开处理会话 ↗"
												}) : null, conflictStatus?.pushReady && !pushed ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													className: pr_assistant_module_css_default.pushButton,
													type: "button",
													disabled: conflictBusy,
													onClick: () => void pushConflictResolution(),
													children: conflictBusy ? "推送中…" : `Push 到 ${conflictStatus.sourceBranch}`
												}) : null]
											})] }),
											conflictError ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: pr_assistant_module_css_default.reviewError,
												role: "alert",
												children: conflictError
											}) : null,
											pushed ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: pr_assistant_module_css_default.conflictSuccess,
												children: ["已成功推送到 origin/", conflict?.sourceBranch]
											}) : null,
											conflictStatus ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: pr_assistant_module_css_default.conflictFacts,
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: ["当前分支 ", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: conflictStatus.currentBranch || "detached HEAD" })] }),
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: ["工作区 ", conflictStatus.clean ? "干净" : "有未提交修改"] }),
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: ["未解决冲突 ", conflictStatus.unresolved.length] }),
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: ["目标已合并 ", conflictStatus.targetMerged ? "是" : "否"] }),
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: ["提交 ", conflictStatus.hasCommit ? conflictStatus.headSha.slice(0, 12) : "尚未生成"] })
												]
											}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: pr_assistant_module_css_default.commitState,
												children: "正在读取仓库处理状态…"
											}),
											conflictStatus?.changedFiles.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: pr_assistant_module_css_default.conflictChanges,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", { children: "已提交修改位置" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ol", { children: conflictStatus.changedFiles.map((file) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: file.status }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: file.path })] }, `${file.status}:${file.path}`)) })]
											}) : null,
											conflictResult ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: pr_assistant_module_css_default.conflictLogic,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", { children: "AI 处理逻辑与测试结果" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", { children: conflictResult.text })]
											}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: pr_assistant_module_css_default.commitState,
												children: "AI 正在处理；完成后将在此回填修改位置、测试结果和处理逻辑。"
											})
										]
									}) : null,
									reviewResult ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: pr_assistant_module_css_default.reviewResult,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: pr_assistant_module_css_default.eyebrow,
												children: "AI REVIEW"
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "AI 分析结果" })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: pr_assistant_module_css_default.reviewResultActions,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													disabled: commentBusy,
													onClick: () => void publishReviewToPr(),
													children: commentBusy ? "发布中…" : "评论到 PR"
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														if (linkedSessionId) {
															ctx.sessions.open(linkedSessionId);
															close();
														}
													},
													children: "打开评审对话 ↗"
												})]
											})] }),
											commentStatus ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: commentStatus === "已成功评论到 PR。" ? pr_assistant_module_css_default.commentSuccess : pr_assistant_module_css_default.reviewError,
												role: "status",
												children: commentStatus
											}) : null,
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", { children: reviewResult.text })
										]
									}) : hasLinkedReview ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: pr_assistant_module_css_default.reviewPending,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: pr_assistant_module_css_default.eyebrow,
												children: "AI REVIEW"
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "AI 分析正在处理中" }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													if (linkedSessionId) {
														ctx.sessions.open(linkedSessionId);
														close();
													}
												},
												children: "查看评审对话"
											})
										]
									}) : null,
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: pr_assistant_module_css_default.files,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h3", { children: ["文件差异 ", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: detail.files.length })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ol", { children: detail.files.map((file) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", { children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: pr_assistant_module_css_default.disclosureIcon,
												"aria-hidden": "true",
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
													viewBox: "0 0 12 12",
													children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m4.5 2.5 3.5 3.5-3.5 3.5" })
												})
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: pr_assistant_module_css_default.fileStatus,
												children: file.status === "added" ? "A" : file.status === "deleted" ? "D" : file.status === "renamed" ? "R" : "M"
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: file.path }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: pr_assistant_module_css_default.fileCounts,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("i", { children: ["+", file.additions] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("b", { children: ["−", file.deletions] })]
											})
										] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FileDiff, { diff: file.diff })] }) }, `${file.previousPath}:${file.path}`)) })]
									})
								] }) : null
							]
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("main", {
							className: pr_assistant_module_css_default.grid,
							children: [filtered.map((result) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
								className: pr_assistant_module_css_default.repo,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: pr_assistant_module_css_default.repoHeader,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: pr_assistant_module_css_default.repoIdentity,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: pr_assistant_module_css_default.provider,
												children: result.provider ?? "GIT"
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
												title: result.repository ?? result.workspaceTitle,
												children: result.repository ?? result.workspaceTitle
											})]
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: pr_assistant_module_css_default.repoTools,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												className: result.openCount ? pr_assistant_module_css_default.countActive : pr_assistant_module_css_default.count,
												children: [result.openCount, " 个 PR"]
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												className: pr_assistant_module_css_default.hideRepo,
												type: "button",
												onClick: () => hideRepository(result.workspaceId),
												children: "隐藏"
											})]
										})]
									}),
									result.error && !result.pullRequests.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: pr_assistant_module_css_default.error,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "无法读取" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: result.error })]
									}) : result.pullRequests.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ol", {
										className: pr_assistant_module_css_default.prList,
										children: result.pullRequests.map((pr) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: pr_assistant_module_css_default.prRow,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
												className: pr_assistant_module_css_default.prMain,
												type: "button",
												onClick: () => setSelection({
													repository: result,
													pullRequest: pr
												}),
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
														className: pr_assistant_module_css_default.prNumber,
														children: ["#", pr.number]
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: pr_assistant_module_css_default.prTitle,
														children: pr.title
													}),
													pr.draft ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: pr_assistant_module_css_default.draft,
														children: "草稿"
													}) : null,
													pr.conflictStatus === "conflicting" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: pr_assistant_module_css_default.conflictTag,
														children: "冲突"
													}) : pr.conflictStatus === "unknown" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: pr_assistant_module_css_default.unknownTag,
														children: "待检测"
													}) : null,
													pr.sourceBranch || pr.targetBranch ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
														className: pr_assistant_module_css_default.branches,
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
															className: pr_assistant_module_css_default.sourceBranch,
															title: `来源分支：${pr.sourceBranch || "未知"}`,
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "来源" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: pr.sourceBranch || "未知" })]
														}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
															className: pr_assistant_module_css_default.targetBranch,
															title: `目标分支：${pr.targetBranch || "未知"}`,
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "目标" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: pr.targetBranch || "未知" })]
														})]
													}) : null,
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
														className: pr_assistant_module_css_default.meta,
														children: [
															pr.author || "未知作者",
															" · ",
															relativeTime(pr.updatedAt)
														]
													})
												]
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												className: pr_assistant_module_css_default.externalLink,
												type: "button",
												"aria-label": "打开 PR",
												title: "打开 PR",
												onClick: () => window.open(pr.url, "_blank", "noopener,noreferrer"),
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
													"aria-hidden": "true",
													viewBox: "0 0 16 16",
													children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M6 3H3.8A1.8 1.8 0 0 0 2 4.8v7.4A1.8 1.8 0 0 0 3.8 14h7.4a1.8 1.8 0 0 0 1.8-1.8V10M9 2h5v5M14 2 7.5 8.5" })
												})
											})]
										}) }, pr.number))
									}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: pr_assistant_module_css_default.empty,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "✓" }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "队列已清空" }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "当前没有待处理的 PR" })
										]
									}),
									result.truncated ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: pr_assistant_module_css_default.notice,
										children: "仅显示前 100 个 PR"
									}) : null
								]
							}, result.workspaceId)), !loading && filtered.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: pr_assistant_module_css_default.noResults,
								children: "没有匹配的仓库"
							}) : null]
						})
					}),
					reviewOpen && selection && detail ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AiReviewDialog, {
						ctx,
						repository: selection.repository,
						pullRequest: selection.pullRequest,
						detail,
						onClose: () => setReviewOpen(false),
						onStarted: close
					}) : null,
					restoreOpen ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: pr_assistant_module_css_default.modalBackdrop,
						role: "presentation",
						onMouseDown: (event) => {
							if (event.target === event.currentTarget) setRestoreOpen(false);
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: pr_assistant_module_css_default.restoreDialog,
							role: "dialog",
							"aria-modal": "true",
							"aria-labelledby": "restore-repository-title",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: pr_assistant_module_css_default.eyebrow,
									children: "HIDDEN REPOSITORIES"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
									id: "restore-repository-title",
									children: "恢复隐藏仓库"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "选择一个仓库恢复到 PR 助手。" }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ol", { children: results.filter((result) => hiddenRepositories.has(result.workspaceId)).map((result) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "restore-repository",
									value: result.workspaceId,
									checked: restoreWorkspaceId === result.workspaceId,
									onChange: () => setRestoreWorkspaceId(result.workspaceId)
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: result.repository ?? result.workspaceTitle }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: result.workspaceTitle })] })] }) }, result.workspaceId)) }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setRestoreOpen(false),
									children: "取消"
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: !restoreWorkspaceId,
									onClick: () => restoreRepository(restoreWorkspaceId),
									children: "恢复所选仓库"
								})] })
							]
						})
					}) : null
				]
			});
		}
		//#endregion
		//#region \0dsh-css:/Users/gengfeng/dsh-tomato-board/plugins/tomato-board/src/client/team-management.module.css.mjs
		const css$2 = ".io-G1G_page{--tomato-accent:var(--dsw-alias-state-business-primary,#3478c8);--tomato-accent-soft:color-mix(in srgb, var(--tomato-accent) 10%, transparent);min-height:0;color:var(--dsw-alias-label-primary,#292d32);flex:1;padding:14px 18px 18px;overflow:auto}.io-G1G_page *{box-sizing:border-box}.io-G1G_page button,.io-G1G_page select,.io-G1G_page input{font:inherit;color:inherit;border:1px solid var(--dsw-alias-border-l2,#dedfdf);background:var(--dsw-alias-bg-base,white);border-radius:8px;min-width:0;padding:8px 12px}.io-G1G_page button{cursor:pointer;white-space:nowrap}.io-G1G_page button:hover{background:var(--dsw-alias-interactive-bg-hover,#f4f4f2)}.io-G1G_page button:disabled{opacity:.5;cursor:wait}.io-G1G_page :focus-visible{outline:2px solid var(--tomato-accent);outline-offset:3px}.io-G1G_page h3,.io-G1G_page h4,.io-G1G_page p{margin:0}.io-G1G_panelHeader,.io-G1G_listHeading,.io-G1G_rankLabel{justify-content:space-between;align-items:center;gap:12px;display:flex}.io-G1G_caption,.io-G1G_footnote,.io-G1G_itemText small,.io-G1G_rankRow small,.io-G1G_listHeading span{color:var(--dsw-alias-label-secondary,#797c80);font-size:12px;line-height:1.5}.io-G1G_eyebrow{letter-spacing:1.6px;color:var(--dsw-alias-label-secondary,#797c80);font-size:10px;font-weight:650}.io-G1G_headerControls{align-items:center;gap:8px;display:flex}.io-G1G_headerControls label{color:var(--dsw-alias-label-secondary,#797c80);align-items:center;gap:7px;font-size:12px;display:flex}.io-G1G_headerControls select{border:1px solid var(--dsw-alias-border-l2,#dedfdf);width:min(320px,34vw);min-width:0;height:28px;color:var(--dsw-alias-label-primary,#292d32);background:var(--dsw-alias-bg-base,white);font:inherit;border-radius:9px;padding:0 10px}.io-G1G_headerIconButton{border-radius:8px;width:28px;min-width:28px;height:28px;min-height:28px;padding:0!important}.io-G1G_columns{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);align-items:start;gap:14px;display:grid}.io-G1G_teamsHeader{border-bottom:1px solid var(--dsw-alias-border-l2,#e4e4df);justify-content:space-between;align-items:center;padding-bottom:12px;display:flex}.io-G1G_teamsHeader h3{font-size:16px}.io-G1G_addTeamButton{height:30px;font-weight:600;min-width:0!important;padding:0 10px!important;font-size:12px!important}.io-G1G_teamEditor{background:var(--dsw-alias-interactive-bg-hover,#f3f3f1);border-radius:9px;align-items:center;gap:7px;margin:9px 0;padding:8px;display:flex}.io-G1G_teamEditor input{flex:1;min-width:0}.io-G1G_teamEditor button{padding:6px 8px;font-size:11px}.io-G1G_teamAccordions{gap:8px;margin-top:10px;display:grid}.io-G1G_teamAccordion{border:1px solid var(--dsw-alias-border-l2,#e4e4df);border-radius:10px;overflow:visible}.io-G1G_teamAccordionHeader{align-items:center;gap:2px;min-height:42px;padding:4px 6px;display:flex}.io-G1G_teamToggle{text-align:left;align-items:center;gap:8px;min-width:0;display:flex;background:0 0!important;border:0!important;padding:6px!important}.io-G1G_teamToggle strong{text-overflow:ellipsis;min-width:0;font-size:13px;overflow:hidden}.io-G1G_teamToggle small{color:var(--dsw-alias-label-secondary);font-size:10px}.io-G1G_renameTeam{width:27px;height:27px;margin-left:-3px;min-width:27px!important;color:var(--dsw-alias-label-secondary)!important;background:0 0!important;border-color:#0000!important;padding:0!important}.io-G1G_renameTeam:hover{color:var(--tomato-accent)!important}.io-G1G_chevron{color:var(--dsw-alias-label-tertiary);font-size:18px;line-height:1;transition:transform .16s}.io-G1G_teamToggle[aria-expanded=true] .io-G1G_chevron{color:var(--tomato-accent);transform:rotate(90deg)}.io-G1G_teamRowActions{gap:2px;margin-left:auto;display:flex}.io-G1G_teamRowActions button{width:27px;min-width:27px;height:27px;color:var(--dsw-alias-label-secondary);background:0 0;border-color:#0000;padding:0}.io-G1G_teamRowActions button:last-child:hover{color:var(--dsw-alias-state-error-primary,#bd4336)}.io-G1G_teamBody{border-top:1px solid var(--dsw-alias-border-l2,#e4e4df);padding:10px 12px 12px;position:relative}.io-G1G_teamBodyToolbar{color:var(--dsw-alias-label-secondary);justify-content:space-between;align-items:center;gap:8px;font-size:11px;display:flex}.io-G1G_smallAddButton{border-radius:6px!important;padding:4px 7px!important;font-size:10px!important}.io-G1G_teamBodyEmpty{color:var(--dsw-alias-label-secondary);text-align:center;padding:20px 8px 10px;font-size:11px}.io-G1G_memberRow{align-items:center;gap:4px;display:flex}.io-G1G_memberRow .io-G1G_rankLabel{flex:1;min-width:0}.io-G1G_rankIndex{font-variant-numeric:tabular-nums;flex:0 0 22px;width:22px;color:var(--dsw-alias-label-tertiary)!important}.io-G1G_memberAvatar{background:var(--tomato-accent-soft);border-radius:9px;flex:0 0 28px;place-items:center;width:28px;height:28px;font-weight:750;display:inline-grid;color:var(--tomato-accent)!important;font-size:12px!important}.io-G1G_memberIdentity{z-index:1;flex:1;gap:1px;min-width:0;display:grid;position:relative}.io-G1G_memberIdentity strong{text-overflow:ellipsis;overflow:hidden}.io-G1G_memberIdentity small{color:var(--dsw-alias-label-tertiary);font-size:10px;font-weight:400}.io-G1G_rankFill{z-index:0;border-radius:inherit;background:color-mix(in srgb, var(--tomato-accent) 22%, transparent);pointer-events:none;max-width:100%;position:absolute;inset:0 auto 0 0}.io-G1G_rankLabel>.io-G1G_rankIndex,.io-G1G_rankLabel>.io-G1G_memberAvatar,.io-G1G_rankLabel>b{z-index:1;position:relative}.io-G1G_removeMember{opacity:0;width:25px;height:25px;min-width:25px!important;color:var(--dsw-alias-label-tertiary)!important;background:0 0!important;border-color:#0000!important;padding:0!important}.io-G1G_memberRow:hover .io-G1G_removeMember,.io-G1G_removeMember:focus-visible{opacity:1}.io-G1G_removeMember:hover{color:var(--dsw-alias-state-error-primary,#bd4336)!important}.io-G1G_panel{border:1px solid var(--dsw-alias-border-l2,#e4e4df);background:var(--dsw-alias-bg-base,white);border-radius:14px;min-width:0;padding:16px}.io-G1G_panelHeader{border-bottom:1px solid var(--dsw-alias-border-l2,#e4e4df);padding-bottom:12px}.io-G1G_panelHeader h3{white-space:nowrap;font-size:16px}.io-G1G_panelHeader select{max-width:65%;font-size:12px}.io-G1G_panelHeader button{font-size:12px}.io-G1G_summary{justify-content:space-between;align-items:center;gap:16px;padding:16px 0;display:flex}.io-G1G_total{font-variant-numeric:tabular-nums;letter-spacing:-2px;font-size:48px;font-weight:600;line-height:1.15}.io-G1G_total small{letter-spacing:0;color:var(--dsw-alias-label-secondary,#797c80);font-size:15px}.io-G1G_pie{background:var(--dsw-alias-border-l2,#e7e7e2);width:136px;height:136px;box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--dsw-alias-border-l2,#ddd) 55%, transparent), 0 14px 36px #00000012;border-radius:50%;flex:0 0 136px;padding:17px;position:relative;transform:rotate(-90deg)}.io-G1G_pie:after{content:\"\";border:1px solid color-mix(in srgb, var(--tomato-accent) 24%, transparent);border-radius:50%;position:absolute;inset:-6px}.io-G1G_pie>div{z-index:1;background:var(--dsw-alias-bg-base,white);width:100%;height:100%;box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l2,#e7e7e2);border-radius:50%;flex-direction:column;justify-content:center;align-items:center;display:flex;position:relative;transform:rotate(90deg)}.io-G1G_pie strong{font-size:28px;line-height:1}.io-G1G_pie span{letter-spacing:.08em;color:var(--dsw-alias-label-secondary,#797c80);margin-top:5px;font-size:10px}.io-G1G_listHeading{padding:10px 0}.io-G1G_listHeading h4{font-size:13px}.io-G1G_item{border-top:1px solid var(--dsw-alias-border-l2,#e4e4df);align-items:center;gap:10px;padding:10px 12px;display:flex}.io-G1G_dot{border-radius:3px;flex-shrink:0;width:8px;height:8px}.io-G1G_itemText{flex:1;min-width:0}.io-G1G_itemTitle{color:inherit;overflow-wrap:anywhere;font-size:13px;line-height:1.5;text-decoration:none}.io-G1G_itemTitle:hover{text-decoration:underline}.io-G1G_itemText small{margin-right:7px;font-size:10px;display:inline-block}.io-G1G_itemPoints{white-space:nowrap;font-variant-numeric:tabular-nums;font-size:12px}.io-G1G_item button{padding:5px 8px;font-size:11px}.io-G1G_chips{flex-wrap:wrap;gap:8px;margin:12px 0 8px;display:flex}.io-G1G_chips>span{background:var(--dsw-alias-interactive-bg-hover,#f2f3f0);border-radius:6px;align-items:center;gap:6px;padding:3px 5px 3px 10px;font-size:12px;display:flex}.io-G1G_chips button{background:0 0;border:0;padding:1px 5px}.io-G1G_ranking{gap:3px;margin-top:8px;display:grid}.io-G1G_rankRow{border-radius:9px}.io-G1G_rankLabel{text-align:left;background:0 0;border:0;border-radius:9px;gap:8px;width:100%;min-height:48px;padding:6px 4px;font-size:13px;position:relative}.io-G1G_rankLabel:hover{color:var(--tomato-accent);box-shadow:inset 0 0 0 1.5px color-mix(in srgb, var(--tomato-accent) 45%, transparent);background:0 0!important}.io-G1G_rankLabel[aria-pressed=true]{color:var(--tomato-accent);box-shadow:inset 0 0 0 1.5px var(--tomato-accent);background:0 0!important}.io-G1G_rankLabel[aria-pressed=true] .io-G1G_memberAvatar{background:var(--tomato-accent);color:#fff!important}.io-G1G_rankLabel b{font-variant-numeric:tabular-nums;flex:none;font-size:13px}.io-G1G_track{display:none}.io-G1G_footnote{border-top:1px solid var(--dsw-alias-border-l2,#e4e4df);padding-top:12px;font-size:11px;margin-top:20px!important}.io-G1G_empty{text-align:center;color:var(--dsw-alias-label-secondary,#797c80);padding:36px 12px;font-size:13px}.io-G1G_empty h4{margin-bottom:8px}.io-G1G_emptyIcon{color:var(--tomato-accent);margin-bottom:12px;font-size:32px;display:block}.io-G1G_error{color:var(--dsw-alias-state-error-primary,#bd4336);overflow-wrap:anywhere;padding:10px 0;font-size:12px}.io-G1G_notice{color:var(--dsw-alias-label-secondary,#797c80);padding:8px 0;font-size:12px}.io-G1G_teamHeader{overflow:visible}.io-G1G_addPeopleRoot{position:relative}.io-G1G_addPeople{z-index:30;border:1px solid var(--dsw-alias-border-l2,#ddd);background:var(--dsw-alias-bg-layer-2,white);border-radius:12px;width:min(330px,72vw);padding:10px;position:absolute;top:calc(100% + 7px);right:0;box-shadow:0 16px 46px #0002}.io-G1G_addPeopleTitle{justify-content:space-between;align-items:center;gap:10px;display:flex;margin:0 0 8px!important}.io-G1G_addPeopleTitle strong{font-size:12px}.io-G1G_addPeopleTitle button{justify-content:center;min-width:26px;height:26px;width:26px!important;padding:0!important}.io-G1G_addPeople input{width:100%}.io-G1G_addPeople>div:last-child{max-height:210px;margin-top:8px;overflow:auto}.io-G1G_addPeople>div:last-child>button{text-align:left;border:0;gap:8px;width:100%;display:flex}.io-G1G_addPeople small{opacity:.6;flex:1}@media (width<=1000px){.io-G1G_columns{grid-template-columns:1fr}.io-G1G_page{padding:14px}}@media (width<=620px){.io-G1G_teamHeader{flex-direction:column;align-items:flex-start}.io-G1G_teamActions{justify-content:flex-start}.io-G1G_memberToolbar{flex-direction:column;align-items:stretch}}@media (width<=540px){.io-G1G_page{padding:10px}.io-G1G_panel{padding:12px}.io-G1G_headerControls label>span{display:none}.io-G1G_headerControls select{width:min(220px,55vw)}.io-G1G_pie{flex-basis:120px;width:120px;height:120px;padding:16px}.io-G1G_total{font-size:42px}.io-G1G_item{gap:7px}}.io-G1G_item[role=button]{cursor:pointer;border-radius:8px}.io-G1G_item[role=button]:hover{background:var(--dsw-alias-interactive-bg-hover)}.io-G1G_item[role=button]:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.io-G1G_metricToolbar{color:var(--dsw-alias-label-secondary);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px;font-size:12px;display:flex}.io-G1G_metricToolbar>div{border:1px solid var(--dsw-alias-border-l2);border-radius:8px;gap:3px;padding:3px;display:inline-flex}.io-G1G_metricToolbar button{color:inherit;font:inherit;cursor:pointer;background:0 0;border:0;border-radius:5px;padding:5px 10px}.io-G1G_metricToolbar button[aria-pressed=true]{color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-interactive-bg-hover)}.io-G1G_secondaryMetric{color:var(--dsw-alias-label-secondary);margin-top:6px;font-size:12px;display:block}";
		const tagId$2 = "@stephen1620/dsh-tomato-board/team-management.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephen1620/dsh-tomato-board";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var team_management_module_css_default = {
			"addPeople": "io-G1G_addPeople",
			"addPeopleRoot": "io-G1G_addPeopleRoot",
			"addPeopleTitle": "io-G1G_addPeopleTitle",
			"addTeamButton": "io-G1G_addTeamButton",
			"caption": "io-G1G_caption",
			"chevron": "io-G1G_chevron",
			"chips": "io-G1G_chips",
			"columns": "io-G1G_columns",
			"dot": "io-G1G_dot",
			"empty": "io-G1G_empty",
			"emptyIcon": "io-G1G_emptyIcon",
			"error": "io-G1G_error",
			"eyebrow": "io-G1G_eyebrow",
			"footnote": "io-G1G_footnote",
			"headerControls": "io-G1G_headerControls",
			"headerIconButton": "io-G1G_headerIconButton",
			"item": "io-G1G_item",
			"itemPoints": "io-G1G_itemPoints",
			"itemText": "io-G1G_itemText",
			"itemTitle": "io-G1G_itemTitle",
			"listHeading": "io-G1G_listHeading",
			"memberAvatar": "io-G1G_memberAvatar",
			"memberIdentity": "io-G1G_memberIdentity",
			"memberRow": "io-G1G_memberRow",
			"memberToolbar": "io-G1G_memberToolbar",
			"metricToolbar": "io-G1G_metricToolbar",
			"notice": "io-G1G_notice",
			"page": "io-G1G_page",
			"panel": "io-G1G_panel",
			"panelHeader": "io-G1G_panelHeader",
			"pie": "io-G1G_pie",
			"rankFill": "io-G1G_rankFill",
			"rankIndex": "io-G1G_rankIndex",
			"rankLabel": "io-G1G_rankLabel",
			"rankRow": "io-G1G_rankRow",
			"ranking": "io-G1G_ranking",
			"removeMember": "io-G1G_removeMember",
			"renameTeam": "io-G1G_renameTeam",
			"secondaryMetric": "io-G1G_secondaryMetric",
			"smallAddButton": "io-G1G_smallAddButton",
			"summary": "io-G1G_summary",
			"teamAccordion": "io-G1G_teamAccordion",
			"teamAccordionHeader": "io-G1G_teamAccordionHeader",
			"teamAccordions": "io-G1G_teamAccordions",
			"teamActions": "io-G1G_teamActions",
			"teamBody": "io-G1G_teamBody",
			"teamBodyEmpty": "io-G1G_teamBodyEmpty",
			"teamBodyToolbar": "io-G1G_teamBodyToolbar",
			"teamEditor": "io-G1G_teamEditor",
			"teamHeader": "io-G1G_teamHeader",
			"teamRowActions": "io-G1G_teamRowActions",
			"teamToggle": "io-G1G_teamToggle",
			"teamsHeader": "io-G1G_teamsHeader",
			"total": "io-G1G_total",
			"track": "io-G1G_track"
		};
		//#endregion
		//#region src/team-metrics.ts
		function teamDate(value) {
			if (typeof value !== "string" && typeof value !== "number") return "";
			if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/u.test(value)) {
				const time = Date.parse(`${value}T00:00:00Z`);
				return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? value : "";
			}
			const time = typeof value === "number" ? value : Date.parse(value);
			return Number.isFinite(time) ? new Date(time + 8 * 36e5).toISOString().slice(0, 10) : "";
		}
		//#endregion
		//#region \0dsh-css:/Users/gengfeng/dsh-tomato-board/plugins/tomato-board/src/client/tag.module.css.mjs
		const css$1 = ".KP77Yq_tag{--tag-border-color:color-mix(in srgb, var(--dsw-alias-border-l2) 82%, transparent);--tag-text-color:var(--dsw-alias-label-secondary);--tag-bg-color:color-mix(in srgb, var(--dsw-alias-bg-overlay) 46%, transparent);--tag-weight:550;overflow-wrap:anywhere;border:1px solid var(--tag-border-color);max-width:100%;color:var(--tag-text-color);background:var(--tag-bg-color);font-size:10px;font-weight:var(--tag-weight);white-space:normal;border-radius:999px;flex:none;padding:2px 9px;line-height:1.4}.KP77Yq_toned{--tag-border-color:color-mix(in srgb, var(--tag-tone) 38%, transparent);--tag-text-color:var(--tag-tone);--tag-bg-color:color-mix(in srgb, var(--tag-tone) 13%, transparent);--tag-weight:700}.KP77Yq_tag.KP77Yq_toggle{cursor:pointer;min-height:26px;font:inherit;font-size:10px;font-weight:var(--tag-weight);align-items:center;padding:2px 10px;line-height:1.4;display:inline-flex}.KP77Yq_tag.KP77Yq_toggle:hover{background:var(--dsw-alias-interactive-bg-hover)}.KP77Yq_tag.KP77Yq_toned.KP77Yq_toggle:hover{background:color-mix(in srgb, var(--tag-tone) 18%, transparent)}.KP77Yq_tag.KP77Yq_toggle:focus-visible{outline:2px solid var(--tag-tone,var(--dsw-alias-state-business-primary));outline-offset:2px}.KP77Yq_off{opacity:.5;filter:saturate(.55)}";
		const tagId$1 = "@stephen1620/dsh-tomato-board/tag.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephen1620/dsh-tomato-board";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var tag_module_css_default = {
			"off": "KP77Yq_off",
			"tag": "KP77Yq_tag",
			"toggle": "KP77Yq_toggle",
			"toned": "KP77Yq_toned"
		};
		//#endregion
		//#region src/client/Tag.tsx
		/**
		* The one tag chip used across the workbench — card metadata, filter chips and
		* status labels. Static usage renders a span; interactive usage renders a
		* toggle button. Only callers that pass `tone` get a colored chip (by
		* convention just the item-type tags).
		*/
		function Tag({ children, tone, interactive = false, pressed, title, className, onClick }) {
			const style = tone === void 0 ? void 0 : { "--tag-tone": tone };
			const classes = [
				tag_module_css_default.tag,
				tone === void 0 ? "" : tag_module_css_default.toned,
				interactive ? tag_module_css_default.toggle : "",
				interactive && pressed === false ? tag_module_css_default.off : "",
				className
			].filter(Boolean).join(" ");
			if (interactive) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: classes,
				style,
				title,
				"aria-pressed": pressed,
				onClick,
				children
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: classes,
				style,
				title,
				children
			});
		}
		//#endregion
		//#region src/client/TeamManagement.tsx
		const resultsKey = (sprint) => "team-results:" + sprint;
		function isDirectory(value) {
			const data = value;
			return Boolean(data && Array.isArray(data.sprints) && Array.isArray(data.users) && data.sprints.every((row) => row && typeof row.sprintId === "string" && typeof row.name === "string") && data.users.every((row) => row && typeof row.username === "string" && typeof row.name === "string"));
		}
		function isResults(value) {
			if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).length > 1e3) return false;
			return Object.values(value).every((row) => row && typeof row.truncated === "boolean" && Array.isArray(row.items) && row.items.length <= 2e4 && row.items.every((item) => item && typeof item.itemKey === "string" && typeof item.title === "string" && typeof item.itemType === "string" && typeof item.status === "string" && (item.storyPoints === null || Number.isFinite(item.storyPoints)) && (item.periodDays === null || Number.isFinite(item.periodDays))));
		}
		const LEGACY_TEAM_KEY = "taskboard.tomatoStoryTeam.v1";
		const TEAMS_KEY = "taskboard.tomatoStoryTeams.v2";
		const SPRINT_KEY = "taskboard.tomatoStorySprint.v1";
		const OWNER_KEY = "taskboard.tomatoStoryOwner.v1";
		const colors = [
			"#d76b50",
			"#458e88",
			"#c79940",
			"#687fb2",
			"#976f9c",
			"#75914f",
			"#be7f92",
			"#698b9d"
		];
		const number = (value) => new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 4 }).format(value);
		const metricValue = (item, metric) => (metric === "days" ? item.periodDays : item.storyPoints) ?? 0;
		const total = (items, metric) => items.reduce((sum, item) => sum + metricValue(item, metric), 0);
		const savedValue = (key, fallback) => {
			try {
				return localStorage.getItem(key) || fallback;
			} catch {
				return fallback;
			}
		};
		const teamId = () => `team-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
		async function json(url, signal) {
			const response = await fetch(url, {
				signal: signal ?? null,
				cache: "no-store",
				headers: {
					accept: "application/json",
					"cache-control": "no-cache"
				}
			});
			const text = await response.text();
			let body;
			try {
				body = text ? JSON.parse(text) : {};
			} catch {
				throw new Error(response.status === 404 || text.trim() === "not found" ? "迭代故事点接口尚未加载，请完全重启 DSH Desktop" : `服务返回了无法识别的内容 (${response.status})`);
			}
			if (!response.ok) throw new Error(typeof body.error === "string" ? body.error : `请求失败 (${response.status})`);
			return body;
		}
		function readTeams() {
			try {
				const saved = JSON.parse(localStorage.getItem(TEAMS_KEY) ?? "[]");
				if (Array.isArray(saved) && saved.length) return saved.flatMap((value) => value && typeof value === "object" ? [{
					id: String(value.id),
					name: String(value.name),
					members: Array.isArray(value.members) ? [...new Set(value.members)] : []
				}] : []);
				const legacy = JSON.parse(localStorage.getItem(LEGACY_TEAM_KEY) ?? "[]");
				return Array.isArray(legacy) && legacy.length ? [{
					id: "team-default",
					name: "默认团队",
					members: legacy.filter((value) => typeof value === "string")
				}] : [];
			} catch {
				return [];
			}
		}
		function TeamManagement({ toolbarTarget, onOpenItem, active: visible = true }) {
			const [metric, setMetric] = (0, react.useState)(() => savedValue("taskboard.tomatoTeamMetric.v1", "days") === "points" ? "points" : "days");
			const unitLabel = metric === "days" ? "人天" : "SP";
			(0, react.useEffect)(() => {
				try {
					localStorage.setItem("taskboard.tomatoTeamMetric.v1", metric);
				} catch {}
			}, [metric]);
			const [cachedDirectory] = (0, react.useState)(() => readViewCache("team-directory", isDirectory));
			const [sprints, setSprints] = (0, react.useState)(cachedDirectory?.sprints ?? []);
			const [users, setUsers] = (0, react.useState)(cachedDirectory?.users ?? []);
			const [sprint, setSprint] = (0, react.useState)(() => savedValue(SPRINT_KEY, ""));
			const [owner, setOwner] = (0, react.useState)(() => savedValue(OWNER_KEY, "currentUser()"));
			const [teams, setTeams] = (0, react.useState)(readTeams);
			const [openTeamId, setOpenTeamId] = (0, react.useState)(() => readTeams()[0]?.id ?? "");
			const [teamDraft, setTeamDraft] = (0, react.useState)("");
			const [teamEditor, setTeamEditor] = (0, react.useState)(null);
			const [addingTeamId, setAddingTeamId] = (0, react.useState)("");
			const addPeopleRef = (0, react.useRef)(null);
			const addPeopleInputRef = (0, react.useRef)(null);
			const [search, setSearch] = (0, react.useState)("");
			const [results, setResults] = (0, react.useState)(() => readViewCache(resultsKey(sprint), isResults) ?? {});
			const [errors, setErrors] = (0, react.useState)({});
			const [directoryError, setDirectoryError] = (0, react.useState)("");
			const [directoryLoading, setDirectoryLoading] = (0, react.useState)(!cachedDirectory);
			const [version, setVersion] = (0, react.useState)(0);
			const [directoryVersion, setDirectoryVersion] = (0, react.useState)(0);
			(0, react.useEffect)(() => {
				if (!visible) return;
				const controller = new AbortController();
				setDirectoryLoading(!sprints.length);
				setDirectoryError("");
				Promise.all([json("/api/tomato-board/sprints", controller.signal), json("/api/tomato-board/filters", controller.signal)]).then(([data, directory]) => {
					if (controller.signal.aborted) return;
					const sorted = [...data.sprints].sort((a, b) => (b.startDate ?? "").localeCompare(a.startDate ?? ""));
					setSprints(sorted);
					setUsers(directory.users);
					writeViewCache("team-directory", {
						sprints: sorted,
						users: directory.users
					});
					setSprint((current) => sorted.some((value) => value.sprintId === current) ? current : sorted[0]?.sprintId || "");
				}).catch((error) => {
					if (!controller.signal.aborted) setDirectoryError(error.message);
				}).finally(() => {
					if (!controller.signal.aborted) setDirectoryLoading(false);
				});
				return () => controller.abort();
			}, [directoryVersion, visible]);
			(0, react.useEffect)(() => {
				try {
					localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
				} catch {}
			}, [teams]);
			(0, react.useEffect)(() => {
				if (sprint) try {
					localStorage.setItem(SPRINT_KEY, sprint);
				} catch {}
			}, [sprint]);
			(0, react.useEffect)(() => {
				try {
					localStorage.setItem(OWNER_KEY, owner);
				} catch {}
			}, [owner]);
			const openMembers = teams.find((team) => team.id === openTeamId)?.members ?? [];
			const ownersKey = JSON.stringify([...new Set([owner, ...openMembers])].sort());
			const resultScope = (0, react.useRef)("");
			const completedOwners = (0, react.useRef)(/* @__PURE__ */ new Set());
			(0, react.useEffect)(() => {
				if (!visible) {
					completedOwners.current.clear();
					return;
				}
				if (directoryLoading || !sprint) return;
				const scope = JSON.stringify([sprint, version]);
				if (resultScope.current !== scope) {
					const previousSprint = resultScope.current ? JSON.parse(resultScope.current)[0] : sprint;
					resultScope.current = scope;
					completedOwners.current.clear();
					if (previousSprint !== sprint) setResults(readViewCache(resultsKey(sprint), isResults) ?? {});
					setErrors({});
				}
				const controller = new AbortController();
				const owners = JSON.parse(ownersKey).filter((username) => !completedOwners.current.has(username));
				const worker = async () => {
					while (owners.length && !controller.signal.aborted) {
						const username = owners.shift();
						try {
							const data = await json("/api/tomato-board/team-management?" + new URLSearchParams({
								sprint,
								assignee: username,
								refresh: String(version)
							}), controller.signal);
							if (!controller.signal.aborted) {
								completedOwners.current.add(username);
								const cached = readViewCache(resultsKey(sprint), isResults) ?? {};
								writeViewCache(resultsKey(sprint), {
									...cached,
									[username]: data
								});
								setResults((current) => ({
									...current,
									[username]: data
								}));
								setErrors((current) => {
									const next = { ...current };
									delete next[username];
									return next;
								});
							}
						} catch (error) {
							if (!controller.signal.aborted) {
								completedOwners.current.add(username);
								setErrors((current) => ({
									...current,
									[username]: error instanceof Error ? error.message : String(error)
								}));
							}
						}
					}
				};
				Promise.all([
					worker(),
					worker(),
					worker()
				]);
				return () => controller.abort();
			}, [
				directoryLoading,
				sprint,
				ownersKey,
				version,
				visible
			]);
			const personal = results[owner];
			const items = (0, react.useMemo)(() => [...personal?.items ?? []].sort((a, b) => metricValue(b, metric) - metricValue(a, metric) || a.itemKey.localeCompare(b.itemKey)), [personal, metric]);
			const sum = total(items, metric);
			const slices = items.filter((item) => metricValue(item, metric) > 0);
			let offset = 0;
			const gradient = slices.map((item, index) => {
				const start = offset;
				offset += metricValue(item, metric) / sum * 100;
				return `${colors[index % colors.length]} ${start}% ${offset}%`;
			}).join(", ");
			const userName = (username) => username === "currentUser()" ? "我" : users.find((user) => user.username === username)?.name ?? username;
			const selectedSprint = sprints.find((value) => value.sprintId === sprint);
			const toggleTeam = (id) => {
				setOpenTeamId((current) => current === id ? "" : id);
				setAddingTeamId("");
				setTeamEditor(null);
			};
			const ranking = openMembers.map((username) => ({
				username,
				result: results[username],
				points: total(results[username]?.items ?? [], metric)
			})).sort((a, b) => Number(Boolean(b.result)) - Number(Boolean(a.result)) || b.points - a.points || a.username.localeCompare(b.username));
			const max = Math.max(1, ...ranking.map((row) => row.points));
			const available = users.filter((user) => !openMembers.includes(user.username) && `${user.name} ${user.username}`.toLowerCase().includes(search.toLowerCase()));
			const submitTeam = () => {
				const name = teamDraft.trim();
				if (!name || !teamEditor) return;
				if (teamEditor.mode === "create") {
					const team = {
						id: teamId(),
						name,
						members: []
					};
					setTeams((current) => [...current, team]);
					setOpenTeamId(team.id);
				} else setTeams((current) => current.map((team) => team.id === teamEditor.id ? {
					...team,
					name
				} : team));
				setTeamDraft("");
				setTeamEditor(null);
			};
			const deleteTeam = (id) => {
				setTeams((current) => current.filter((team) => team.id !== id));
				if (openTeamId === id) setOpenTeamId("");
			};
			const updateMembers = (id, updater) => setTeams((current) => current.map((team) => team.id === id ? {
				...team,
				members: updater(team.members)
			} : team));
			(0, react.useEffect)(() => {
				if (!addingTeamId) return;
				const close = (event) => {
					if (event.target instanceof Node && !addPeopleRef.current?.contains(event.target)) {
						setAddingTeamId("");
						setSearch("");
					}
				};
				document.addEventListener("pointerdown", close, true);
				requestAnimationFrame(() => addPeopleInputRef.current?.focus());
				return () => document.removeEventListener("pointerdown", close, true);
			}, [addingTeamId]);
			(0, react.useEffect)(() => {
				if (!visible) return;
				toolbarTarget(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: team_management_module_css_default.headerControls,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "迭代" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
						"aria-label": "选择迭代",
						value: sprint,
						disabled: directoryLoading,
						onChange: (event) => {
							setSprint(event.target.value);
							setResults(readViewCache(resultsKey(event.target.value), isResults) ?? {});
							setErrors({});
						},
						children: [!sprints.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
							value: "",
							children: directoryLoading ? "正在读取迭代…" : "暂无迭代"
						}), sprints.map((value) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("option", {
							value: value.sprintId,
							children: [
								value.name,
								" · ",
								value.workspaceKey,
								value.status === "completed" ? "（已结束）" : ""
							]
						}, value.sprintId))]
					})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "toolbar",
						size: "sm",
						className: team_management_module_css_default.headerIconButton,
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutline16, {}),
						title: "刷新",
						"aria-label": "刷新团队统计",
						onClick: () => {
							setErrors({});
							setVersion((value) => value + 1);
							if (directoryError || !sprints.length) setDirectoryVersion((value) => value + 1);
						}
					})]
				}));
				return () => toolbarTarget(null);
			}, [
				directoryError,
				directoryLoading,
				sprint,
				sprints,
				toolbarTarget,
				visible
			]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: team_management_module_css_default.page,
				children: [
					directoryError && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
						className: team_management_module_css_default.error,
						children: [directoryError, "，请点击刷新重试。"]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: team_management_module_css_default.metricToolbar,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: selectedSprint ? `${teamDate(selectedSprint.startDate)} — ${teamDate(selectedSprint.endDate)}` : "请选择迭代" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							role: "group",
							"aria-label": "统计指标",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": metric === "days",
								onClick: () => setMetric("days"),
								children: "Task 人天"
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": metric === "points",
								onClick: () => setMetric("points"),
								children: "需求故事点"
							})]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: team_management_module_css_default.columns,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: team_management_module_css_default.panel,
							"aria-label": "个人迭代投入",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: team_management_module_css_default.panelHeader,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "个人分布" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
									"aria-label": "选择个人负责人",
									value: owner,
									onChange: (event) => setOwner(event.target.value),
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
										value: "currentUser()",
										children: "我负责的"
									}), users.map((user) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("option", {
										value: user.username,
										children: [
											user.name,
											" · ",
											user.username
										]
									}, user.username))]
								})]
							}), errors[owner] && !personal ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: team_management_module_css_default.error,
								children: errors[owner]
							}) : !personal ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: team_management_module_css_default.empty,
								children: sprint ? "正在读取个人迭代投入…" : "请选择迭代"
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: team_management_module_css_default.summary,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: team_management_module_css_default.eyebrow,
											children: metric === "days" ? "迭代内 Task 计划投入" : "需求故事点"
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: team_management_module_css_default.total,
											children: [number(sum), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [" ", unitLabel] })]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: team_management_module_css_default.secondaryMetric,
											children: metric === "days" ? `需求 ${number(total(items, "points"))} SP` : `Task ${number(total(items, "days"))} 人天`
										})
									] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: team_management_module_css_default.pie,
										style: { background: gradient ? `conic-gradient(${gradient})` : void 0 },
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: slices.length }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "项占比" })] })
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: team_management_module_css_default.listHeading,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", { children: "需求与 Task" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [items.length, " 项"] })]
								}),
								!items.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: team_management_module_css_default.empty,
									children: "该负责人在本迭代暂无事项。"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: team_management_module_css_default.item,
									role: "button",
									tabIndex: 0,
									"aria-label": `打开 ${item.itemKey} 的对话`,
									onClick: () => onOpenItem(item),
									onKeyDown: (event) => {
										if (event.key === "Enter" || event.key === " ") {
											event.preventDefault();
											onOpenItem(item);
										}
									},
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: team_management_module_css_default.dot,
											style: { background: metricValue(item, metric) > 0 ? colors[slices.indexOf(item) % colors.length] : "var(--dsw-alias-border-l2, #ddd)" }
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: team_management_module_css_default.itemText,
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: team_management_module_css_default.itemTitle,
													children: item.title
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: item.itemKey }),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Tag, { children: item.itemType === "Task" ? "Task" : "需求" }),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Tag, { children: item.status }),
												item.plannedStart && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
													item.plannedStart,
													" — ",
													item.plannedEnd
												] })
											]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", {
											className: team_management_module_css_default.itemPoints,
											children: item.itemType === "Task" ? item.periodDays === null ? "未估算" : `${number(item.periodDays)} 人天` : item.storyPoints === null ? "未估点" : `${number(item.storyPoints)} SP`
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoLinkButton, { itemKey: item.itemKey })
									]
								}, item.itemKey)) })
							] })]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: team_management_module_css_default.panel,
							"aria-label": "团队迭代投入",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: team_management_module_css_default.teamsHeader,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "团队分布" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										className: team_management_module_css_default.addTeamButton,
										"aria-label": "创建团队",
										title: "创建团队",
										onClick: () => {
											setTeamEditor({ mode: "create" });
											setTeamDraft("");
										},
										children: "＋ 创建团队"
									})]
								}),
								teamEditor?.mode === "create" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("form", {
									className: team_management_module_css_default.teamEditor,
									onSubmit: (event) => {
										event.preventDefault();
										submitTeam();
									},
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											autoFocus: true,
											placeholder: "团队名称",
											value: teamDraft,
											onChange: (event) => setTeamDraft(event.target.value)
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setTeamEditor(null),
											children: "取消"
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "submit",
											children: "创建"
										})
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: team_management_module_css_default.teamAccordions,
									children: teams.map((team) => {
										const open = openTeamId === team.id;
										const rows = open ? ranking : [];
										return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
											className: team_management_module_css_default.teamAccordion,
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: team_management_module_css_default.teamAccordionHeader,
													children: [
														/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
															className: team_management_module_css_default.teamToggle,
															"aria-expanded": open,
															onClick: () => toggleTeam(team.id),
															children: [
																/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
																	className: team_management_module_css_default.chevron,
																	children: "›"
																}),
																/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: team.name }),
																/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [team.members.length, " 人"] })
															]
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
															className: team_management_module_css_default.renameTeam,
															"aria-label": `改名 ${team.name}`,
															title: "改名",
															onClick: () => {
																setTeamEditor({
																	mode: "rename",
																	id: team.id
																});
																setTeamDraft(team.name);
																setOpenTeamId(team.id);
															},
															children: "✎"
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
															className: team_management_module_css_default.teamRowActions,
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
																"aria-label": `删除 ${team.name}`,
																title: "删除",
																onClick: () => deleteTeam(team.id),
																children: "×"
															})
														})
													]
												}),
												teamEditor?.mode === "rename" && teamEditor.id === team.id && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("form", {
													className: team_management_module_css_default.teamEditor,
													onSubmit: (event) => {
														event.preventDefault();
														submitTeam();
													},
													children: [
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
															autoFocus: true,
															value: teamDraft,
															onChange: (event) => setTeamDraft(event.target.value)
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setTeamEditor(null),
															children: "取消"
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
															type: "submit",
															children: "保存"
														})
													]
												}),
												open && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: team_management_module_css_default.teamBody,
													children: [
														/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
															className: team_management_module_css_default.teamBodyToolbar,
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: team.members.length ? "成员迭代投入" : "暂无成员" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																ref: addingTeamId === team.id ? addPeopleRef : void 0,
																className: team_management_module_css_default.addPeopleRoot,
																children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
																	className: team_management_module_css_default.smallAddButton,
																	onClick: () => setAddingTeamId((current) => current === team.id ? "" : team.id),
																	children: "＋ 添加成员"
																}), addingTeamId === team.id && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																	className: team_management_module_css_default.addPeople,
																	role: "dialog",
																	children: [
																		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																			className: team_management_module_css_default.addPeopleTitle,
																			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "添加成员" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
																				onClick: () => setAddingTeamId(""),
																				children: "×"
																			})]
																		}),
																		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
																			ref: addPeopleInputRef,
																			value: search,
																			onChange: (event) => setSearch(event.target.value),
																			placeholder: "搜索姓名或用户名…"
																		}),
																		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [available.map((user) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
																			onClick: () => {
																				updateMembers(team.id, (current) => [...current, user.username]);
																				setAddingTeamId("");
																				setSearch("");
																			},
																			children: [
																				user.name,
																				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: user.username }),
																				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "＋" })
																			]
																		}, user.username)), !available.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "没有可添加的成员" })] })
																	]
																})]
															})]
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
															className: team_management_module_css_default.ranking,
															children: rows.map((row, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
																className: team_management_module_css_default.rankRow,
																children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																	className: team_management_module_css_default.memberRow,
																	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
																		className: team_management_module_css_default.rankLabel,
																		"aria-pressed": owner === row.username,
																		onClick: () => setOwner(row.username),
																		children: [
																			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {
																				className: team_management_module_css_default.rankFill,
																				style: { width: `${row.points / max * 100}%` }
																			}),
																			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
																				className: team_management_module_css_default.rankIndex,
																				children: String(index + 1).padStart(2, "0")
																			}),
																			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
																				className: team_management_module_css_default.memberAvatar,
																				children: userName(row.username).slice(0, 1)
																			}),
																			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
																				className: team_management_module_css_default.memberIdentity,
																				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: userName(row.username) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: row.result ? `${row.result.items.filter((item) => item.itemType !== "Task").length} 个需求 · ${row.result.items.filter((item) => item.itemType === "Task").length} 个 Task` : errors[row.username] ? "读取失败" : "读取中…" })]
																			}),
																			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: row.result ? `${number(row.points)} ${unitLabel}` : "—" })
																		]
																	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
																		className: team_management_module_css_default.removeMember,
																		"aria-label": `移除 ${userName(row.username)}`,
																		title: "移除成员",
																		onClick: () => updateMembers(team.id, (current) => current.filter((value) => value !== row.username)),
																		children: "×"
																	})]
																})
															}, row.username))
														}),
														!team.members.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
															className: team_management_module_css_default.teamBodyEmpty,
															children: "添加成员后查看迭代投入分布"
														})
													]
												})
											]
										}, team.id);
									})
								}),
								!teams.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: team_management_module_css_default.empty,
									children: "点击右上角加号创建团队。"
								})
							]
						})]
					})
				]
			});
		}
		//#endregion
		//#region src/worktime-model.ts
		/** A Task may cover several ranges even though its record belongs to the first. */
		function unitHasCreatedTasks(unit, units) {
			return units.some((owner) => owner.itemKey === unit.itemKey && owner.tasks.some((task) => task.status === "created" && task.start <= unit.end && task.end >= unit.start));
		}
		/** Render an in-flight change without modifying the last server snapshot. */
		function applyTaskChange(tasks, change) {
			if (!change) return tasks;
			return tasks.flatMap((task) => {
				if (task.itemKey !== change.itemKey) return [task];
				if (change.action === "delete") return [];
				const next = {
					...task,
					start: change.start,
					end: change.end
				};
				delete next.allocationSlots;
				return [next];
			});
		}
		/** Join touching ranges without changing any Task dates or creation records. */
		function mergeRequirementRanges(units, itemKey, preserveAllocated = false) {
			const group = units.filter((unit) => unit.itemKey === itemKey).sort((a, b) => a.start.localeCompare(b.start) || a.id.localeCompare(b.id));
			const merged = [];
			for (const unit of group) {
				const previous = merged.at(-1);
				const locked = preserveAllocated && previous && (unitHasCreatedTasks(unit, units) || unitHasCreatedTasks(previous, units) || unit.tasks.some((task) => task.status !== "pending") || previous.tasks.some((task) => task.status !== "pending"));
				if (previous && !locked && unit.start <= addDays(previous.end, 1)) merged[merged.length - 1] = {
					...previous,
					end: previous.end > unit.end ? previous.end : unit.end,
					tasks: [...previous.tasks, ...unit.tasks],
					revision: Math.max(previous.revision, unit.revision) + 1,
					updatedAt: previous.updatedAt > unit.updatedAt ? previous.updatedAt : unit.updatedAt,
					assignees: [...new Set([...previous.assignees ?? [], ...unit.assignees ?? []])],
					cost: previous.cost || unit.cost || "",
					team: previous.team || unit.team || "",
					category: previous.category || unit.category || ""
				};
				else merged.push(unit);
			}
			const survivors = new Map(merged.map((unit) => [unit.id, unit]));
			return units.flatMap((unit) => unit.itemKey !== itemKey ? [unit] : survivors.has(unit.id) ? [survivors.get(unit.id)] : []);
		}
		/** Change one range, then merge its continuous neighbours; Task dates stay unchanged. */
		function applyRequirementChange(units, change) {
			if (!change) return units;
			const active = units.find((unit) => unit.id === change.id);
			if (!active) return units;
			return mergeRequirementRanges(units.map((unit) => {
				if (change.action === "resize") return unit.id === change.id ? {
					...unit,
					start: change.start,
					end: change.end
				} : unit;
				if (unit.id !== change.id) return unit;
				return {
					...unit,
					start: addDays(unit.start, change.delta),
					end: addDays(unit.end, change.delta)
				};
			}), active.itemKey);
		}
		/** Use calendar dates across week boundaries for both the drag preview and its saved result. */
		function calendarDragAllowed(active, edge, target) {
			return edge === "move" || (edge === "start" ? target <= active.end : target >= active.start);
		}
		function calendarDragRanges(ranges, active, anchor, edge, target) {
			if (!calendarDragAllowed(active, edge, target)) return [{
				start: active.start,
				end: active.end
			}];
			if (edge === "start") return [{
				start: target,
				end: active.end
			}];
			if (edge === "end") return [{
				start: active.start,
				end: target
			}];
			const delta = Math.round((Date.parse(`${target}T12:00:00Z`) - Date.parse(`${anchor}T12:00:00Z`)) / 864e5);
			return ranges.map((range) => ({
				start: addDays(range.start, delta),
				end: addDays(range.end, delta)
			}));
		}
		/** Format a browser-local calendar date without UTC conversion. */
		function dateKey(date) {
			return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
		}
		/** Add calendar days using local noon to avoid daylight-saving midnight gaps. */
		function addDays(value, days) {
			const date = /* @__PURE__ */ new Date(`${value}T12:00:00`);
			date.setDate(date.getDate() + days);
			return dateKey(date);
		}
		/** Inclusive, bounded dates; rejects invalid or reversed selections. */
		function datesBetween(start, end) {
			const valid = (s) => /^\d{4}-\d{2}-\d{2}$/u.test(s) && dateKey(/* @__PURE__ */ new Date(`${s}T12:00:00`)) === s;
			if (!valid(start) || !valid(end) || end < start) throw new Error("请选择有效的连续日期");
			const dates = [];
			for (let day = start; day <= end; day = addDays(day, 1)) {
				if (dates.length >= 366) throw new Error("一次安排最多 366 天");
				dates.push(day);
			}
			return dates;
		}
		/** The five-week view starts two Saturdays before the anchor's week. */
		function calendarStart(anchor) {
			return addDays(anchor, -(((/* @__PURE__ */ new Date(`${anchor}T12:00:00`)).getDay() + 1) % 7) - 14);
		}
		/** Generate descriptive editable titles from the requirement and phase. */
		function taskTitle(story, stage) {
			const subject = story.replace(/^[【\[].*?[】\]]\s*/u, "").replace(/[-—]\s*(前端|后端)\s*$/u, "").trim();
			const capability = subject.replace(/支持/u, "的");
			switch (stage) {
				case "understand": return `梳理${capability}需求与现有项目实现`;
				case "design": return `设计${capability}的技术方案与实现路径`;
				case "develop": return `实现${capability}能力并完成集成`;
				case "verify": return `验证${capability}功能与边界场景`;
				case "bugfix": return `定位并修复${subject}相关问题`;
				default: throw new Error("未知任务阶段");
			}
		}
		/** Every planned date of one requirement, de-duplicated and chronological. */
		function unitDates(units) {
			const dates = /* @__PURE__ */ new Set();
			for (const unit of units) for (const day of datesBetween(unit.start, unit.end)) dates.add(day);
			return [...dates].sort();
		}
		/** Recover old allocations once, and retain exact half-day dates for subsequent batches. */
		function plannedTaskSlots(dates, tasks) {
			const used = /* @__PURE__ */ new Map();
			const seen = /* @__PURE__ */ new Set();
			const allocations = /* @__PURE__ */ new Map();
			const confirmed = tasks.filter((task) => task.status === "created").sort((a, b) => a.end.localeCompare(b.end) || b.start.localeCompare(a.start));
			const reserve = (day) => used.set(day, (used.get(day) ?? 0) + 1);
			for (const task of confirmed) {
				if (task.itemKey && seen.has(task.itemKey)) continue;
				if (!task.allocationSlots || task.allocationSlots.length !== Math.round(task.days * 2) || task.allocationSlots.some((day) => day < task.start || day > task.end)) continue;
				allocations.set(task, [...task.allocationSlots]);
				task.allocationSlots.forEach(reserve);
				if (task.itemKey) seen.add(task.itemKey);
			}
			for (const task of confirmed) {
				if (allocations.has(task)) continue;
				if (task.itemKey && seen.has(task.itemKey)) continue;
				if (task.itemKey) seen.add(task.itemKey);
				let remaining = Math.ceil(task.days * 2 - 1e-8);
				if (!Number.isSafeInteger(remaining) || remaining <= 0) throw new Error("已有 Task 的人天无效，请先核对");
				const slots = [];
				const relevant = dates.filter((day) => day >= task.start && day <= task.end);
				const candidates = [...relevant, ...datesBetween(task.start, task.end).filter((day) => !relevant.includes(day))];
				for (const day of candidates) {
					const taken = Math.min(remaining, Math.max(0, 2 - (used.get(day) ?? 0)));
					used.set(day, (used.get(day) ?? 0) + taken);
					slots.push(...Array(taken).fill(day));
					remaining -= taken;
					if (!remaining) break;
				}
				allocations.set(task, slots.sort());
			}
			return allocations;
		}
		/** Remaining half-day slots; the wider context recovers legacy multi-range Tasks. */
		function availableWorktimeSlots(dates, tasks, contextDates = dates) {
			const used = /* @__PURE__ */ new Map();
			for (const slots of plannedTaskSlots(contextDates, tasks).values()) for (const day of slots) used.set(day, (used.get(day) ?? 0) + 1);
			return [...new Set(dates)].sort().flatMap((day) => Array(Math.max(0, 2 - (used.get(day) ?? 0))).fill(day));
		}
		//#endregion
		//#region src/client/worktime-locale.ts
		/** Chinese worktime copy, kept separate from rendering and wire discriminants. */
		const worktimeText = {
			switchUser: "切换用户",
			currentUser: "我（当前登录用户）",
			readOnlyView: "只读",
			title: "任务日历",
			previous: "前一周",
			next: "后一周",
			today: "回到本周",
			refresh: "刷新记录",
			personDays: "人天",
			days: "天",
			cancel: "取消",
			save: "保存",
			saving: "正在保存…",
			request: "需求安排",
			task: "Task",
			pending: "待创建",
			created: "已创建",
			uncertain: "结果待核对",
			pickTitle: "选择需求",
			confirmPick: "确定",
			range: "时间段",
			addRange: "＋ 添加时间段",
			deleteRange: "删除",
			rangeDeleteHint: "只移除本地时间段，番茄需求和 Task 保留",
			confirmDelete: "确认移入回收站",
			rangeEmpty: "没有可保存的时间段改动",
			rangeIncomplete: "请填写完整的时间段（开始与结束日期）",
			rangeInvalid: "时间段的结束日期不能早于开始日期",
			rangeHint: "时间段可增删；删除仅移除本地排期，不影响番茄需求和 Task。",
			taskBusy: "当前为只读视图或正在保存，请稍后操作",
			taskDeleted: "Task 已移入番茄回收站，需求安排已保留",
			taskMoved: "Task 计划日期已同步到番茄",
			deleteTask: "删除 Task",
			saveTaskDates: "保存计划日期",
			taskMoveHint: "可拖动日历上的 Task 改期，也可在此修改计划起止日期；实际工时和人天保持不变。",
			taskDeleteHint: "确认后此 Task 及其全部后代将移入番茄回收站，需求安排保留。",
			invalidDrag: "不可放置：开始日期不能晚于结束日期",
			previewRange: "预览日期范围",
			requirementSaved: "当前需求时间段已保存",
			resizeStart: "拖动调整开始日期",
			resizeEnd: "拖动调整结束日期",
			taskSyncing: "日历已更新，正在后台同步…",
			taskRolledBack: "同步未完成，已恢复原来的日历显示",
			start: "开始日期",
			end: "结束日期",
			saveRanges: "保存时间段",
			edit: "工时分配",
			editHint: "每个阶段创建一个直属 Task。标题已结合需求润色，可直接修改。",
			unallocated: "剩余未分配",
			overAllocate: "阶段合计不能超过剩余可分配人天",
			project: "所属项目",
			owner: "Task 负责人",
			team: "所属团队",
			cost: "工时成本归属",
			category: "任务分类",
			placeholder: "请选择",
			loading: "正在读取…",
			stages: "阶段与投入",
			stage: "阶段",
			taskTitle: "Task 标题",
			total: "阶段合计",
			create: "确认并创建 Task",
			creating: "正在创建并核对…",
			createdAllocation: "已分配投入",
			currentCapacity: "本次可分配",
			currentStages: "本次阶段与投入",
			skippedFields: "未写入番茄的字段",
			splitHint: "仅填写需要的阶段，留空的阶段不会创建。每个阶段至少 0.5 人天、按 0.5 递增，合计不能超过剩余可分配人天。",
			retryHint: "上次创建结果待核对。已有 Task 编号的记录不能直接重建；无编号的记录须先确认番茄中没有对应 Task，再重试。",
			confirmRetry: "已核对番茄，确认没有本次待核对记录对应的 Task",
			locked: "已有 Task 会保留；拖拽扩长时间段后，可以继续分配剩余人天。",
			readFailed: "读取失败",
			hostStale: "工时服务仍是旧版本，请退出并重新打开 DSH 后重试",
			close: "关闭",
			saved: "安排已保存",
			createdMessage: "Task 已创建并核对",
			duplicate: "该需求在相同日期已有安排，已打开原记录",
			historyFailed: "番茄历史 Task 读取失败，本地安排仍保留",
			view: "在番茄中查看",
			taskHistory: "番茄历史 Task",
			dateSelection: "选择日期",
			dayPickHint: "点击某天，或拖动连续几天，即可为该需求安排工时",
			stageLabels: {
				understand: "需求与项目理解",
				design: "方案设计",
				develop: "功能开发",
				verify: "联调与验证",
				bugfix: "Bug 修复"
			},
			weekdays: [
				"周六",
				"周日",
				"周一",
				"周二",
				"周三",
				"周四",
				"周五"
			]
		};
		//#endregion
		//#region src/client/AssigneePicker.tsx
		/** Shared searchable assignee picker used by the board and worktime pages. */
		function AssigneePicker({ users, value, onChange, label = "负责人", className, currentUserName = "我负责的", ariaLabel }) {
			const rootRef = (0, react.useRef)(null);
			const [open, setOpen] = (0, react.useState)(false);
			const [query, setQuery] = (0, react.useState)("");
			const options = (0, react.useMemo)(() => [{
				username: "currentUser()",
				name: currentUserName
			}, ...users.filter((user) => user.username !== "currentUser()")], [users, currentUserName]);
			const selected = options.find((option) => option.username === value) ?? options[0];
			const needle = query.trim().toLowerCase();
			const filtered = needle ? options.filter((option) => `${option.name} ${option.username}`.toLowerCase().includes(needle)) : options;
			(0, react.useEffect)(() => {
				if (!open) return;
				const close = (event) => {
					if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
				};
				document.addEventListener("pointerdown", close, true);
				return () => document.removeEventListener("pointerdown", close, true);
			}, [open]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: [tomato_board_module_css_default.assigneeFilter, className].filter(Boolean).join(" "),
				children: [label ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: label }) : null, /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					ref: rootRef,
					className: tomato_board_module_css_default.assigneePicker,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "outline",
						size: "sm",
						className: tomato_board_module_css_default.assigneeTrigger,
						"aria-label": ariaLabel,
						"aria-haspopup": "listbox",
						"aria-expanded": open,
						onClick: () => {
							setOpen((current) => !current);
							setQuery("");
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: selected?.name ?? value }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, {})]
					}), open ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: tomato_board_module_css_default.assigneeDropdown,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							autoFocus: true,
							type: "search",
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "搜索昵称或用户名…",
							"aria-label": "搜索负责人"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							role: "listbox",
							"aria-label": "负责人",
							children: [filtered.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								role: "option",
								"aria-selected": option.username === value,
								onClick: () => {
									onChange(option.username);
									setOpen(false);
									setQuery("");
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: option.name }), option.name !== option.username && option.username !== "currentUser()" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: option.username }) : null]
							}, option.username)), filtered.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "没有匹配的负责人" }) : null]
						})]
					}) : null]
				})]
			});
		}
		//#endregion
		//#region \0dsh-css:/Users/gengfeng/dsh-tomato-board/plugins/tomato-board/src/client/worktime.module.css.mjs
		const css = "._9MUeuG_page{--wt-accent:var(--dsw-alias-state-business-primary);--wt-task:var(--dsw-alias-state-success-primary,var(--dsw-alias-state-business-primary));--wt-line:var(--dsw-alias-border-l2);--wt-bg:var(--dsw-alias-bg-base);--wt-text:var(--dsw-alias-label-primary);--wt-muted:var(--dsw-alias-label-secondary);color:var(--wt-text);box-sizing:border-box;flex-direction:column;flex:1 1 0;min-height:0;padding:10px 14px;display:flex;overflow:hidden}._9MUeuG_toolbar{flex:none;justify-content:space-between;align-items:center;gap:12px;width:100%;max-width:1280px;margin:0 auto 8px;display:flex}._9MUeuG_period{flex-wrap:wrap;align-items:center;gap:16px;display:flex}._9MUeuG_toolbar h2{font-variant-numeric:tabular-nums;letter-spacing:-.04em;margin:0;font-size:18px;font-weight:600;line-height:1.4}._9MUeuG_toolbar h2>span{color:var(--wt-muted);padding:0 6px}._9MUeuG_page button,._9MUeuG_form button{cursor:pointer;font:inherit}._9MUeuG_navigation{flex-wrap:wrap;gap:6px;display:flex}._9MUeuG_navigation button,._9MUeuG_unitSummary button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:6px;padding:4px 8px;font-size:12px;line-height:1.5}._9MUeuG_navigation button:hover{background:var(--dsw-alias-interactive-bg-hover)}._9MUeuG_page button:focus-visible,._9MUeuG_form button:focus-visible,._9MUeuG_form input:focus-visible,._9MUeuG_page input:focus-visible,._9MUeuG_form select:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}._9MUeuG_legend{color:var(--wt-muted);align-items:center;gap:5px;margin:0;font-size:11px;display:flex}._9MUeuG_legend small{margin-left:auto;font-size:11px}._9MUeuG_storyDot,._9MUeuG_taskDot{background:var(--wt-accent);border-radius:2px;width:8px;height:8px;display:inline-block}._9MUeuG_taskDot{background:var(--dsw-alias-state-success-primary,var(--wt-text));border-radius:50%;margin-left:12px}._9MUeuG_help{color:var(--dsw-alias-label-secondary);margin:8px 0 12px;font-size:11px;line-height:1.7}._9MUeuG_calendarArea{flex-direction:column;flex:1;width:100%;min-width:0;max-width:1280px;min-height:0;max-height:640px;margin:auto;display:flex}._9MUeuG_dragging ._9MUeuG_bar{pointer-events:none}._9MUeuG_calendar{border:1px solid var(--wt-line);background:var(--wt-bg);border-radius:12px;flex:1;grid-template-rows:auto repeat(5,minmax(0,1fr));grid-template-columns:repeat(7,minmax(0,1fr));min-height:0;display:grid;overflow:hidden}._9MUeuG_weekHeader{scrollbar-gutter:stable;scrollbar-width:thin;background:var(--dsw-alias-interactive-bg-hover);grid-column:1/-1;grid-template-columns:repeat(7,minmax(0,1fr));display:grid;overflow:hidden auto}._9MUeuG_weekday{text-align:center;color:var(--wt-muted);background:var(--dsw-alias-interactive-bg-hover);border-bottom:1px solid var(--wt-line);padding:5px 8px;font-size:11px}._9MUeuG_week{border-bottom:1px solid var(--wt-line);grid-column:1/-1;grid-template-rows:minmax(0,1fr);grid-template-columns:minmax(0,1fr);min-height:0;display:grid;overflow:hidden}._9MUeuG_weekScroll{scrollbar-gutter:stable;scrollbar-width:thin;overscroll-behavior-y:contain;grid-area:1/1;min-height:0;overflow:hidden auto}._9MUeuG_weekScroll:focus-visible{outline:2px solid var(--wt-accent);outline-offset:-2px}._9MUeuG_weekHighlights{scrollbar-gutter:stable;scrollbar-width:thin;pointer-events:none;z-index:3;grid-area:1/1;grid-template-rows:minmax(0,1fr);grid-template-columns:repeat(7,minmax(0,1fr));min-height:0;display:grid;overflow:hidden auto}._9MUeuG_highlightCell{box-sizing:border-box;min-width:0;min-height:0}._9MUeuG_weekContent{min-height:100%;display:flex;position:relative}._9MUeuG_week:last-of-type{border-bottom:0}._9MUeuG_day{border-right:1px solid var(--wt-line);user-select:none;cursor:pointer;touch-action:none;flex:1 1 0;min-width:0;min-height:0;padding:4px 5px 5px;transition:background .12s;position:relative}._9MUeuG_weekend{background:color-mix(in srgb, var(--wt-text) 5%, var(--wt-bg))}._9MUeuG_selectedDay{background:color-mix(in srgb, var(--wt-accent) 15%, transparent);box-shadow:inset 0 0 0 1px var(--wt-accent)}._9MUeuG_dayNumber{z-index:2;min-width:24px;height:24px;color:var(--wt-text);background:var(--wt-bg);font-variant-numeric:tabular-nums;border:0;border-radius:999px;justify-content:flex-start;align-items:center;gap:2px;margin:0 0 0 1px;padding:0 5px;display:inline-flex;position:sticky;top:0}._9MUeuG_week ._9MUeuG_dayNumber{letter-spacing:-.01em;font-size:14px;font-weight:600;line-height:1}._9MUeuG_dayNumber small{color:var(--wt-muted);font-size:10px;font-weight:400}._9MUeuG_events{z-index:1;pointer-events:none;grid-template-columns:repeat(7,minmax(0,1fr));grid-auto-rows:20px;align-content:start;gap:3px;padding-top:30px;display:grid;position:absolute;top:0;left:0;right:0}._9MUeuG_events ._9MUeuG_bar:hover{filter:brightness(.96)}._9MUeuG_events ._9MUeuG_bar{pointer-events:auto;white-space:nowrap;text-overflow:ellipsis;text-align:left;cursor:pointer;min-width:0;color:var(--wt-text);border-radius:4px;margin:0 3px;padding:0 5px;font-size:11px;line-height:18px;overflow:hidden}._9MUeuG_barUnit{border:1px solid color-mix(in srgb, var(--wt-accent) 30%, transparent);border-left:3px solid var(--wt-accent);background:color-mix(in srgb, var(--wt-accent) 12%, var(--wt-bg))}._9MUeuG_barTask{border:1px solid color-mix(in srgb, var(--wt-task) 26%, transparent);border-left:3px solid var(--wt-task);background:color-mix(in srgb, var(--wt-task) 10%, var(--wt-bg))}._9MUeuG_barUnverified{border:1px dashed color-mix(in srgb, var(--wt-task) 45%, transparent);border-left:3px solid var(--wt-task);background:color-mix(in srgb, var(--wt-task) 6%, var(--wt-bg))}._9MUeuG_readOnlyTag{border:1px solid var(--wt-line);color:var(--wt-muted);white-space:nowrap;border-radius:999px;flex:none;align-self:center;padding:2px 8px;font-size:11px}._9MUeuG_error{color:var(--dsw-alias-state-error-primary);overflow-wrap:anywhere;font-size:12px;line-height:1.7}._9MUeuG_notice{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);border-radius:7px;padding:8px 12px;font-size:11px;line-height:1.7}._9MUeuG_dialog{max-width:94vw;width:min(850px,94vw)!important}._9MUeuG_dialogNarrow{max-width:92vw;width:min(420px,92vw)!important}._9MUeuG_taskDialog{max-width:94vw;font-size:12px;line-height:1.5;width:min(960px,94vw)!important}._9MUeuG_taskDialog button{font-size:12px;line-height:18px}._9MUeuG_taskDialog button:not(._9MUeuG_bugTitle){white-space:nowrap}._9MUeuG_bugs{border-top:1px solid var(--dsw-alias-border-l2);margin-top:16px;padding-top:12px}._9MUeuG_bugToolbar{justify-content:space-between;align-items:center;gap:16px;margin-bottom:10px;display:flex}._9MUeuG_bugColumns{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;display:grid}._9MUeuG_bugColumns[data-readonly]{grid-template-columns:minmax(0,1fr)}._9MUeuG_bugPanel{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;flex-direction:column;min-width:0;height:clamp(220px,34vh,360px);display:flex;overflow:hidden}._9MUeuG_bugPanelHeading{box-sizing:border-box;background:var(--dsw-alias-interactive-bg-hover);border-bottom:1px solid var(--dsw-alias-border-l2);flex-wrap:wrap;flex:none;justify-content:space-between;align-items:center;gap:4px 8px;min-height:38px;padding:6px 12px;display:flex}._9MUeuG_bugPanelHeading h4{margin:0;font-size:12px;font-weight:600}._9MUeuG_bugPanelHeading small{color:var(--dsw-alias-label-secondary);margin-left:4px;font-size:11px;font-weight:400}._9MUeuG_bugEmpty{min-height:100px;color:var(--dsw-alias-label-secondary);flex:1;place-content:center;margin:0;padding:20px;font-size:12px;display:grid}._9MUeuG_bugHeading{justify-content:space-between;align-items:center;gap:8px;display:flex}._9MUeuG_bugHeading h3,._9MUeuG_bugHeading h4{margin:0;font-size:13px;font-weight:600}._9MUeuG_bugHeading h4{font-size:12px}._9MUeuG_bugHeading small{color:var(--dsw-alias-label-secondary);margin-left:4px;font-weight:400}._9MUeuG_bugList{scrollbar-width:thin;scrollbar-gutter:stable;overscroll-behavior-y:contain;flex:1;min-height:0;margin:0;padding:0 12px;list-style:none;overflow-y:auto}._9MUeuG_bugRow{border-bottom:1px solid var(--dsw-alias-border-l2);align-items:center;gap:8px;padding:11px 0;display:flex}._9MUeuG_bugRow:last-child{border-bottom:0}._9MUeuG_bugTitle{text-align:left;min-width:0;color:var(--dsw-alias-label-primary);cursor:default;background:0 0;border:0;flex:1;gap:3px;padding:0;display:grid}._9MUeuG_bugTitle span{overflow-wrap:anywhere;font-size:12px;line-height:1.5}._9MUeuG_bugTitle small,._9MUeuG_bugParent{color:var(--dsw-alias-label-secondary);font-size:11px}._9MUeuG_bugStatus{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary);border-radius:4px;flex:none;padding:2px 7px;font-size:11px}._9MUeuG_bugSearch{flex:0 400px;align-items:center;gap:8px;min-width:0;margin:0;display:flex}._9MUeuG_form ._9MUeuG_bugSearch input{flex:1;width:0;min-width:0;padding:6px 9px}._9MUeuG_bugSearch>button,._9MUeuG_bugHeading>button,._9MUeuG_bugRow>button:not(._9MUeuG_bugTitle){white-space:nowrap;flex:none}._9MUeuG_bugParent{align-items:center;gap:6px;display:inline-flex}@media (width<=760px){._9MUeuG_bugColumns{grid-template-columns:minmax(0,1fr)}._9MUeuG_bugPanel{height:220px}._9MUeuG_bugToolbar{flex-wrap:wrap;gap:8px}._9MUeuG_bugSearch{flex-basis:100%}}._9MUeuG_form{color:var(--dsw-alias-label-primary);max-height:68vh;padding:6px;font-size:12px;line-height:1.5;overflow-y:auto}._9MUeuG_form input:not([type=checkbox]),._9MUeuG_form select{box-sizing:border-box;width:100%;min-width:0;font:inherit;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:7px;padding:8px 10px;font-size:12px}._9MUeuG_form input:read-only{opacity:.75}._9MUeuG_form label{color:var(--dsw-alias-label-secondary);gap:6px;font-size:11px;display:grid}._9MUeuG_twoColumns{grid-template-columns:1fr 1fr;gap:12px;margin:12px 0;display:grid}._9MUeuG_ranges{gap:8px;margin:8px 0;display:grid}._9MUeuG_rangeRow{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto auto;align-items:center;gap:8px;display:grid}._9MUeuG_rangeRow small{color:var(--dsw-alias-label-secondary);white-space:nowrap;font-variant-numeric:tabular-nums;font-size:11px}._9MUeuG_rangeRow>button{color:var(--dsw-alias-state-error-primary);background:0 0;border:0;padding:0 2px;font-size:11px}._9MUeuG_rangeRow>button._9MUeuG_danger{color:var(--wt-bg);background:var(--dsw-alias-state-error-primary);border-radius:4px;padding:1px 6px;font-weight:600}._9MUeuG_addRange{border:1px dashed var(--dsw-alias-border-l2);color:var(--dsw-alias-state-business-primary);background:0 0;border-radius:7px;justify-self:start;margin-bottom:14px;padding:6px 10px;font-size:12px}._9MUeuG_unitSummary{border-bottom:1px solid var(--dsw-alias-border-l2);align-items:center;gap:12px;padding-bottom:10px;font-size:12px;display:flex}._9MUeuG_unitSummary span{color:var(--dsw-alias-label-secondary)}._9MUeuG_unitSummary button{margin-left:auto}._9MUeuG_stageHeading{justify-content:space-between;align-items:center;margin-top:18px;display:flex}._9MUeuG_stageHeading h3{margin:0;font-size:14px;line-height:1.5}._9MUeuG_stageHeading span{color:var(--dsw-alias-label-secondary);font-size:11px}._9MUeuG_stageHeading b{color:var(--dsw-alias-state-business-primary)}._9MUeuG_stages{gap:10px;margin-bottom:18px;display:grid}._9MUeuG_stageRow{grid-template-columns:130px minmax(0,1fr);gap:12px;display:grid}._9MUeuG_result{border-bottom:1px solid var(--dsw-alias-border-l2);gap:6px;padding:10px 0;display:grid}._9MUeuG_reportDialog{width:min(1180px,100vw - 48px)!important;max-width:calc(100vw - 48px)!important}._9MUeuG_reportForm{max-height:68vh}._9MUeuG_reportToolbar{border-bottom:1px solid var(--dsw-alias-border-l2);justify-content:space-between;align-items:center;gap:16px;padding:0 0 12px;display:flex;overflow-x:auto}._9MUeuG_reportWeekNav{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);border-radius:7px;flex:none;align-items:center;height:32px;display:flex}._9MUeuG_reportToolbar svg{fill:none;stroke:currentColor;stroke-width:1.5px;stroke-linecap:round;stroke-linejoin:round;flex:none;width:14px;height:14px}._9MUeuG_reportToolbar ._9MUeuG_reportNavButton,._9MUeuG_reportToolbar ._9MUeuG_reportToolbarButton{min-width:0;height:28px;color:var(--dsw-alias-label-secondary);font:inherit;white-space:nowrap;cursor:pointer;background:0 0;border:0;border-radius:5px;flex:none;justify-content:center;align-items:center;gap:5px;padding:0 9px;font-size:12px;line-height:1;display:inline-flex}._9MUeuG_reportToolbar ._9MUeuG_reportNavButton{width:28px;margin:0 2px;padding:0}._9MUeuG_reportToolbar button:hover:not(:disabled),._9MUeuG_reportWeekPicker:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}._9MUeuG_reportToolbar button:disabled{cursor:default;opacity:.45}._9MUeuG_reportToolbar button[aria-pressed=true]{color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 8%, transparent)}._9MUeuG_reportWeekNav ._9MUeuG_reportWeekPicker{border-right:1px solid var(--dsw-alias-border-l2);border-left:1px solid var(--dsw-alias-border-l2);height:28px;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;white-space:nowrap;cursor:pointer;align-items:center;gap:8px;padding:0 10px;font-size:12px;display:flex;position:relative}._9MUeuG_reportWeekPicker>svg{color:var(--dsw-alias-label-secondary)}._9MUeuG_reportWeekPicker b{color:var(--dsw-alias-label-tertiary);margin:0 3px;font-weight:400}._9MUeuG_reportWeekPicker input[type=date]{opacity:0;cursor:pointer;width:100%;height:100%;padding:0;position:absolute;inset:0}._9MUeuG_reportWeekPicker:focus-within{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px;border-radius:3px}._9MUeuG_reportWeekActions{flex:none;gap:5px;display:flex}._9MUeuG_reportTotal{color:var(--dsw-alias-label-secondary);align-self:center;margin-right:auto;font-size:12px}._9MUeuG_reportTableScroll{overflow-x:auto}._9MUeuG_reportTable{border-collapse:collapse;table-layout:fixed;text-align:left;width:100%;min-width:960px;font-size:12px}._9MUeuG_reportTable th{color:var(--dsw-alias-label-secondary);white-space:nowrap;font-size:11px;font-weight:500}._9MUeuG_reportTable th,._9MUeuG_reportTable td{border-bottom:1px solid var(--dsw-alias-border-l2);vertical-align:top;padding:10px 8px}._9MUeuG_reportTable th:first-child{width:32px}._9MUeuG_reportTable th:nth-child(2){width:30%}._9MUeuG_reportTable th:nth-child(3){width:78px}._9MUeuG_reportTable th:nth-child(4){width:75px}._9MUeuG_reportTable th:nth-child(5){width:86px}._9MUeuG_reportTable th:nth-child(6),._9MUeuG_reportTable th:nth-child(7){width:134px}._9MUeuG_reportTable strong{overflow-wrap:anywhere;font-weight:500;line-height:1.6;display:block}._9MUeuG_reportTable small{color:var(--dsw-alias-label-secondary);font-size:10px}._9MUeuG_reportTable p{margin:4px 0 0}._9MUeuG_reportTable input[type=checkbox]{margin-top:6px}._9MUeuG_reportTable ._9MUeuG_itemLink{margin:3px 0;font-size:11px}._9MUeuG_requirementPicker{gap:10px;display:grid}._9MUeuG_requirementPicker>._9MUeuG_help{margin:0}._9MUeuG_requirementResults{gap:6px;max-height:330px;display:grid;overflow-y:auto}._9MUeuG_requirementResult{align-items:center;gap:6px;display:flex}._9MUeuG_requirementChoice{border:1px solid var(--dsw-alias-border-l2);min-width:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);text-align:left;border-radius:8px;flex:1;gap:5px;padding:10px;display:grid}._9MUeuG_requirementChoice[aria-pressed=true]{border-color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 9%, var(--dsw-alias-bg-base))}._9MUeuG_requirementChoice strong{overflow-wrap:anywhere;font-size:12px;font-weight:500;line-height:1.5}._9MUeuG_requirementChoice span{color:var(--dsw-alias-label-secondary);font-size:11px;line-height:1.5}._9MUeuG_result strong{font-size:12px;font-weight:550;line-height:1.6}._9MUeuG_result small{color:var(--dsw-alias-label-secondary);font-size:11px}._9MUeuG_result button{color:var(--dsw-alias-state-business-primary);background:0 0;border:0;justify-self:start;padding:0;font-size:11px}@media (width<=1000px){._9MUeuG_page{padding:8px 10px}._9MUeuG_toolbar h2{font-size:18px}}@media (width<=720px){._9MUeuG_toolbar{flex-wrap:wrap;align-items:center}._9MUeuG_period{gap:6px 12px}._9MUeuG_navigation{gap:4px}._9MUeuG_legend small{display:none}._9MUeuG_twoColumns{grid-template-columns:1fr}._9MUeuG_stageRow{grid-template-columns:100px minmax(0,1fr)}._9MUeuG_rangeRow{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}}@media (prefers-reduced-motion:reduce){._9MUeuG_day{transition:none}}._9MUeuG_userPicker{--assignee-picker-min-width:150px;--assignee-dropdown-width:280px;align-items:center}._9MUeuG_events ._9MUeuG_bar[draggable=true]{cursor:grab}._9MUeuG_events ._9MUeuG_bar[draggable=true]:active{cursor:grabbing}._9MUeuG_events ._9MUeuG_bar{align-items:center;gap:4px;padding-left:9px;padding-right:9px;display:flex;position:relative}._9MUeuG_barLabel{white-space:nowrap;text-overflow:ellipsis;flex:1;min-width:0;display:block;overflow:hidden}._9MUeuG_taskBugBadge{box-sizing:border-box;background:var(--dsw-alias-state-error-primary,#d93025);color:#fff;font-variant-numeric:tabular-nums;border-radius:7px;flex:none;justify-content:center;align-items:center;min-width:14px;height:14px;padding:0 4px;font-size:10px;font-weight:600;line-height:14px;display:inline-flex}._9MUeuG_resizeHandle{cursor:ew-resize;opacity:0;width:14px;position:absolute;top:0;bottom:0}._9MUeuG_resizeHandle:after{content:\"\";background:currentColor;border-radius:2px;width:2px;position:absolute;top:4px;bottom:4px;left:6px}._9MUeuG_bar:hover ._9MUeuG_resizeHandle{opacity:.65}._9MUeuG_resizeStart{left:0}._9MUeuG_resizeEnd{right:0}._9MUeuG_previewStatus{height:22px;color:var(--wt-muted);white-space:nowrap;text-overflow:ellipsis;flex:none;font-size:11px;line-height:22px;overflow:hidden}._9MUeuG_previewUnitDay{background:color-mix(in srgb, var(--wt-accent) 18%, transparent);box-shadow:inset 0 2px var(--wt-accent), inset 0 -2px var(--wt-accent)}._9MUeuG_previewTaskDay{background:color-mix(in srgb, var(--wt-task) 18%, transparent);box-shadow:inset 0 2px var(--wt-task), inset 0 -2px var(--wt-task)}._9MUeuG_highlightCell._9MUeuG_previewStartDay{border-left:2px solid var(--wt-accent)}._9MUeuG_highlightCell._9MUeuG_previewEndDay{border-right:2px solid var(--wt-accent)}._9MUeuG_previewTaskDay._9MUeuG_previewStartDay{border-left-color:var(--wt-task)}._9MUeuG_previewTaskDay._9MUeuG_previewEndDay{border-right-color:var(--wt-task)}._9MUeuG_previewing ._9MUeuG_bar{opacity:.5}._9MUeuG_day[data-highlighted] ._9MUeuG_dayNumber{font-weight:700}._9MUeuG_previewDisabledDay{cursor:not-allowed;opacity:.6;background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);box-shadow:inset 0 0 0 1px var(--dsw-alias-state-error-primary)}._9MUeuG_previewDisabledStatus{color:var(--dsw-alias-state-error-primary)}._9MUeuG_itemLink{color:var(--dsw-alias-label-secondary);justify-self:start;align-items:center;gap:6px;font-size:11px;display:inline-flex}";
		const tagId = "@stephen1620/dsh-tomato-board/worktime.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephen1620/dsh-tomato-board";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var worktime_module_css_default = {
			"addRange": "_9MUeuG_addRange",
			"bar": "_9MUeuG_bar",
			"barLabel": "_9MUeuG_barLabel",
			"barTask": "_9MUeuG_barTask",
			"barUnit": "_9MUeuG_barUnit",
			"barUnverified": "_9MUeuG_barUnverified",
			"bugColumns": "_9MUeuG_bugColumns",
			"bugEmpty": "_9MUeuG_bugEmpty",
			"bugHeading": "_9MUeuG_bugHeading",
			"bugList": "_9MUeuG_bugList",
			"bugPanel": "_9MUeuG_bugPanel",
			"bugPanelHeading": "_9MUeuG_bugPanelHeading",
			"bugParent": "_9MUeuG_bugParent",
			"bugRow": "_9MUeuG_bugRow",
			"bugSearch": "_9MUeuG_bugSearch",
			"bugStatus": "_9MUeuG_bugStatus",
			"bugTitle": "_9MUeuG_bugTitle",
			"bugToolbar": "_9MUeuG_bugToolbar",
			"bugs": "_9MUeuG_bugs",
			"calendar": "_9MUeuG_calendar",
			"calendarArea": "_9MUeuG_calendarArea",
			"danger": "_9MUeuG_danger",
			"day": "_9MUeuG_day",
			"dayNumber": "_9MUeuG_dayNumber",
			"dialog": "_9MUeuG_dialog",
			"dialogNarrow": "_9MUeuG_dialogNarrow",
			"dragging": "_9MUeuG_dragging",
			"error": "_9MUeuG_error",
			"events": "_9MUeuG_events",
			"form": "_9MUeuG_form",
			"help": "_9MUeuG_help",
			"highlightCell": "_9MUeuG_highlightCell",
			"itemLink": "_9MUeuG_itemLink",
			"legend": "_9MUeuG_legend",
			"navigation": "_9MUeuG_navigation",
			"notice": "_9MUeuG_notice",
			"page": "_9MUeuG_page",
			"period": "_9MUeuG_period",
			"previewDisabledDay": "_9MUeuG_previewDisabledDay",
			"previewDisabledStatus": "_9MUeuG_previewDisabledStatus",
			"previewEndDay": "_9MUeuG_previewEndDay",
			"previewStartDay": "_9MUeuG_previewStartDay",
			"previewStatus": "_9MUeuG_previewStatus",
			"previewTaskDay": "_9MUeuG_previewTaskDay",
			"previewUnitDay": "_9MUeuG_previewUnitDay",
			"previewing": "_9MUeuG_previewing",
			"rangeRow": "_9MUeuG_rangeRow",
			"ranges": "_9MUeuG_ranges",
			"readOnlyTag": "_9MUeuG_readOnlyTag",
			"reportDialog": "_9MUeuG_reportDialog",
			"reportForm": "_9MUeuG_reportForm",
			"reportNavButton": "_9MUeuG_reportNavButton",
			"reportTable": "_9MUeuG_reportTable",
			"reportTableScroll": "_9MUeuG_reportTableScroll",
			"reportToolbar": "_9MUeuG_reportToolbar",
			"reportToolbarButton": "_9MUeuG_reportToolbarButton",
			"reportTotal": "_9MUeuG_reportTotal",
			"reportWeekActions": "_9MUeuG_reportWeekActions",
			"reportWeekNav": "_9MUeuG_reportWeekNav",
			"reportWeekPicker": "_9MUeuG_reportWeekPicker",
			"requirementChoice": "_9MUeuG_requirementChoice",
			"requirementPicker": "_9MUeuG_requirementPicker",
			"requirementResult": "_9MUeuG_requirementResult",
			"requirementResults": "_9MUeuG_requirementResults",
			"resizeEnd": "_9MUeuG_resizeEnd",
			"resizeHandle": "_9MUeuG_resizeHandle",
			"resizeStart": "_9MUeuG_resizeStart",
			"result": "_9MUeuG_result",
			"selectedDay": "_9MUeuG_selectedDay",
			"stageHeading": "_9MUeuG_stageHeading",
			"stageRow": "_9MUeuG_stageRow",
			"stages": "_9MUeuG_stages",
			"storyDot": "_9MUeuG_storyDot",
			"taskBugBadge": "_9MUeuG_taskBugBadge",
			"taskDialog": "_9MUeuG_taskDialog",
			"taskDot": "_9MUeuG_taskDot",
			"toolbar": "_9MUeuG_toolbar",
			"twoColumns": "_9MUeuG_twoColumns",
			"unitSummary": "_9MUeuG_unitSummary",
			"userPicker": "_9MUeuG_userPicker",
			"week": "_9MUeuG_week",
			"weekContent": "_9MUeuG_weekContent",
			"weekHeader": "_9MUeuG_weekHeader",
			"weekHighlights": "_9MUeuG_weekHighlights",
			"weekScroll": "_9MUeuG_weekScroll",
			"weekday": "_9MUeuG_weekday",
			"weekend": "_9MUeuG_weekend"
		};
		//#endregion
		//#region src/client/TaskBugs.tsx
		function TaskBugs({ itemKey, readOnly, disabled, request, onBusyChange, onNotify, onCountChange }) {
			const [data, setData] = (0, react.useState)(null);
			const [loading, setLoading] = (0, react.useState)(true);
			const [error, setError] = (0, react.useState)("");
			const [version, setVersion] = (0, react.useState)(0);
			const [query, setQuery] = (0, react.useState)("");
			const [submitted, setSubmitted] = (0, react.useState)("");
			const [searchVersion, setSearchVersion] = (0, react.useState)(0);
			const [results, setResults] = (0, react.useState)([]);
			const [searching, setSearching] = (0, react.useState)(false);
			const [linking, setLinking] = (0, react.useState)("");
			const pending = (0, react.useRef)(false);
			(0, react.useEffect)(() => {
				const controller = new AbortController();
				setLoading(true);
				setError("");
				request(`/task-bugs?itemKey=${encodeURIComponent(itemKey)}`, void 0, controller.signal).then((value) => {
					if (!controller.signal.aborted) {
						setData(value);
						onCountChange(itemKey, value.linked.length);
					}
				}).catch((error) => {
					if (!controller.signal.aborted) setError(error instanceof Error ? error.message : "Bug 读取失败");
				}).finally(() => {
					if (!controller.signal.aborted) setLoading(false);
				});
				return () => controller.abort();
			}, [
				itemKey,
				request,
				version,
				onCountChange
			]);
			(0, react.useEffect)(() => {
				if (!submitted) {
					setResults([]);
					setSearching(false);
					return;
				}
				const controller = new AbortController();
				setSearching(true);
				setError("");
				setResults([]);
				request(`/task-bugs?itemKey=${encodeURIComponent(itemKey)}&q=${encodeURIComponent(submitted)}`, void 0, controller.signal).then((value) => {
					if (!controller.signal.aborted) setResults(value.items);
				}).catch((error) => {
					if (!controller.signal.aborted) setError(error instanceof Error ? error.message : "Bug 搜索失败");
				}).finally(() => {
					if (!controller.signal.aborted) setSearching(false);
				});
				return () => controller.abort();
			}, [
				itemKey,
				request,
				submitted,
				searchVersion
			]);
			async function link(bug) {
				if (!data?.canLink || disabled || readOnly || pending.current || loading) return;
				pending.current = true;
				onBusyChange(true);
				setLinking(bug.itemKey);
				setError("");
				const previous = data;
				setData({
					...data,
					linked: [...data.linked, bug]
				});
				onCountChange(itemKey, data.linked.length + 1);
				try {
					const result = await request("/task-bug", {
						itemKey,
						bugKey: bug.itemKey
					});
					setData((current) => current ? {
						...current,
						linked: current.linked.map((value) => value.itemKey === bug.itemKey ? result.bug : value)
					} : current);
					onCountChange(itemKey, result.count);
					onNotify("Bug 已关联到番茄 Task");
				} catch (error) {
					setData(previous);
					onCountChange(itemKey, previous.linked.length);
					const message = `${error instanceof Error ? error.message : "Bug 关联失败"}；请刷新核对番茄中的关联结果`;
					setError(message);
					onNotify(message, true);
				} finally {
					pending.current = false;
					setLinking("");
					onBusyChange(false);
				}
			}
			const linkedKeys = new Set(data?.linked.map((bug) => bug.itemKey));
			const candidates = (submitted ? results : data?.suggested ?? []).filter((bug) => !linkedKeys.has(bug.itemKey));
			function row(bug, candidate = false) {
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
					className: worktime_module_css_default.bugRow,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.bugTitle,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: bug.title }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: bug.itemKey })]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: worktime_module_css_default.bugStatus,
							children: linking === bug.itemKey ? "关联中…" : bug.status || "未知状态"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoLinkButton, { itemKey: bug.itemKey }),
						candidate && !readOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							size: "sm",
							variant: "outline",
							disabled: disabled || loading || Boolean(linking) || !data?.canLink,
							onClick: () => void link(bug),
							children: "关联"
						})
					]
				}, bug.itemKey);
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: worktime_module_css_default.bugs,
				"aria-label": "关联 Bug",
				"aria-busy": loading,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: worktime_module_css_default.bugToolbar,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.bugHeading,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "关联 Bug" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								variant: "ghost",
								disabled: disabled || loading || Boolean(linking),
								onClick: () => {
									setVersion((value) => value + 1);
									setSearchVersion((value) => value + 1);
								},
								children: "刷新"
							})]
						}), !readOnly && data && !loading && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("form", {
							className: worktime_module_css_default.bugSearch,
							onSubmit: (event) => {
								event.preventDefault();
								setSubmitted(query.trim());
								setSearchVersion((value) => value + 1);
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								"aria-label": "搜索 Bug",
								maxLength: 120,
								placeholder: "搜索其他 Bug 标题或编号",
								value: query,
								disabled: disabled || Boolean(linking),
								onChange: (event) => {
									setQuery(event.target.value);
									if (!event.target.value.trim()) setSubmitted("");
								}
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								type: "submit",
								variant: "outline",
								disabled: disabled || searching || !query.trim() || Boolean(linking),
								children: "搜索"
							})]
						})]
					}),
					loading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: worktime_module_css_default.bugEmpty,
						children: "正在读取…"
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: worktime_module_css_default.bugColumns,
						"data-readonly": readOnly || void 0,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: worktime_module_css_default.bugPanel,
							"aria-label": "已关联 Bug",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: worktime_module_css_default.bugPanelHeading,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h4", { children: ["已关联 ", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: data?.linked.length ?? 0 })] })
							}), data?.linked.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
								className: worktime_module_css_default.bugList,
								children: data.linked.map((bug) => row(bug))
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: worktime_module_css_default.bugEmpty,
								children: "暂无关联 Bug"
							})]
						}), !readOnly && data && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: worktime_module_css_default.bugPanel,
							"aria-label": "可关联缺陷",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: worktime_module_css_default.bugPanelHeading,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h4", { children: [
										submitted ? "搜索结果" : "父需求下的缺陷",
										" ",
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: searching ? "…" : candidates.length })
									] }),
									!submitted && data.parent && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: worktime_module_css_default.bugParent,
										title: data.parent.title,
										children: [data.parent.itemKey, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoLinkButton, { itemKey: data.parent.itemKey })]
									}),
									submitted && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => {
											setSubmitted("");
											setQuery("");
										},
										children: "返回"
									})
								]
							}), searching ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: worktime_module_css_default.bugEmpty,
								children: "正在搜索…"
							}) : candidates.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
								className: worktime_module_css_default.bugList,
								children: candidates.map((bug) => row(bug, true))
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: worktime_module_css_default.bugEmpty,
								children: submitted ? "未找到可关联的 Bug" : "暂无可关联的缺陷"
							})]
						})]
					}),
					error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						role: "alert",
						className: worktime_module_css_default.error,
						children: error
					})
				]
			});
		}
		//#endregion
		//#region src/task-report-model.ts
		/** Reporting weeks follow Monday–Sunday, independently of the calendar viewport. */
		function reportWeek(day) {
			return addDays(day, -(((/* @__PURE__ */ new Date(`${day}T00:00:00Z`)).getUTCDay() + 6) % 7));
		}
		/** At most two selected Tasks share one person-day, in half-day units. */
		function suggestReportDays(tasks, start) {
			const days = Object.fromEntries(tasks.map((task) => [task.itemKey, 0]));
			const conflicts = [];
			for (const date of datesBetween(start, addDays(start, 6))) {
				const active = tasks.filter((task) => task.start <= date && date <= task.end);
				if (active.length > 2) {
					conflicts.push({
						date,
						itemKeys: active.map((task) => task.itemKey)
					});
					continue;
				}
				for (const task of active) days[task.itemKey] += active.length === 2 ? .5 : 1;
			}
			return {
				days,
				conflicts
			};
		}
		//#endregion
		//#region src/client/TaskReport.tsx
		const today = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Shanghai" }).format(/* @__PURE__ */ new Date());
		const terminal = (status) => [
			"工时核对",
			"工时核对中",
			"已完成",
			"已取消",
			"延期解决"
		].includes(status);
		const errorText$1 = (error) => error instanceof Error ? error.message : "报工失败";
		const outcomeText = {
			success: "报工成功",
			skipped: "已报工，跳过",
			failed: "未完成",
			partial: "部分完成",
			unknown: "结果待核对"
		};
		function TaskReport({ request, onClose, onSaved, onNotify }) {
			const [week, setWeek] = (0, react.useState)(() => reportWeek(today()));
			const end = addDays(week, 6);
			const [version, setVersion] = (0, react.useState)(0);
			const [tasks, setTasks] = (0, react.useState)([]);
			const [selected, setSelected] = (0, react.useState)(/* @__PURE__ */ new Set());
			const [drafts, setDrafts] = (0, react.useState)({});
			const [results, setResults] = (0, react.useState)({});
			const [loading, setLoading] = (0, react.useState)(true);
			const [busy, setBusy] = (0, react.useState)(false);
			const submitting = (0, react.useRef)(false);
			const [error, setError] = (0, react.useState)("");
			const [uncertain, setUncertain] = (0, react.useState)(false);
			const [constraints, setConstraints] = (0, react.useState)({});
			const selectedTasks = (0, react.useMemo)(() => tasks.filter((task) => selected.has(task.itemKey)), [tasks, selected]);
			const suggestions = (0, react.useMemo)(() => {
				const allocation = suggestReportDays(tasks.filter((task) => selected.has(task.itemKey) || [
					"工时核对",
					"工时核对中",
					"已完成"
				].includes(task.status)), week);
				return {
					...allocation,
					conflicts: allocation.conflicts.filter((value) => value.itemKeys.some((key) => selected.has(key)))
				};
			}, [
				tasks,
				selected,
				week
			]);
			const daysFor = (task) => Number(drafts[task.itemKey]?.days ?? suggestions.days[task.itemKey] ?? 0);
			const startFor = (task) => drafts[task.itemKey]?.start ?? (task.actualStart || task.start);
			const endFor = (task) => drafts[task.itemKey]?.end ?? (task.actualEnd || task.end);
			const total = selectedTasks.reduce((sum, task) => sum + daysFor(task), 0);
			const invalid = selectedTasks.some((task) => !Number.isFinite(daysFor(task)) || daysFor(task) <= 0 || !Number.isInteger(daysFor(task) * 2) || !startFor(task) || !endFor(task) || endFor(task) < startFor(task) || constraints.finishRange && (endFor(task) < constraints.finishRange[0] || endFor(task) > constraints.finishRange[1]) || constraints.daysMin != null && daysFor(task) < constraints.daysMin || constraints.daysMax != null && daysFor(task) > constraints.daysMax);
			(0, react.useEffect)(() => {
				const controller = new AbortController();
				setLoading(true);
				setError("");
				setTasks([]);
				setSelected(/* @__PURE__ */ new Set());
				setDrafts({});
				setResults({});
				setUncertain(false);
				Promise.all([request(`/history?start=${week}&end=${end}&assignee=currentUser()`, void 0, controller.signal), request("/report-options", void 0, controller.signal)]).then(([data, limits]) => {
					if (controller.signal.aborted) return;
					if (data.truncated) throw new Error("本周 Task 过多，未获取完整数据，请在番茄中报工");
					setTasks(data.tasks);
					setConstraints(limits);
					setSelected(new Set(data.tasks.filter((task) => !terminal(task.status) && task.start >= week && task.end <= end).map((task) => task.itemKey)));
				}).catch((error) => {
					if (!controller.signal.aborted) setError(errorText$1(error));
				}).finally(() => {
					if (!controller.signal.aborted) setLoading(false);
				});
				return () => controller.abort();
			}, [
				week,
				end,
				version,
				request
			]);
			function toggle(key) {
				setSelected((current) => {
					const next = new Set(current);
					if (next.has(key)) next.delete(key);
					else next.add(key);
					return next;
				});
			}
			function edit(key, field, value) {
				setDrafts((current) => ({
					...current,
					[key]: {
						...current[key],
						[field]: value
					}
				}));
			}
			async function submit() {
				if (submitting.current || !selectedTasks.length || invalid || suggestions.conflicts.length || uncertain) return;
				submitting.current = true;
				setBusy(true);
				setError("");
				const payload = selectedTasks.map((task) => ({
					itemKey: task.itemKey,
					expectedStatus: task.status,
					expectedStart: task.start,
					expectedEnd: task.end,
					expectedActualDays: task.actualDays,
					expectedActualStart: task.actualStart,
					expectedActualEnd: task.actualEnd,
					days: daysFor(task),
					actualStart: startFor(task),
					actualEnd: endFor(task)
				}));
				try {
					const data = await request("/report", {
						start: week,
						end,
						tasks: payload
					});
					setResults(Object.fromEntries(data.results.map((result) => [result.itemKey, result])));
					setSelected(/* @__PURE__ */ new Set());
					setTasks((current) => current.map((task) => {
						const result = data.results.find((value) => value.itemKey === task.itemKey);
						const input = payload.find((value) => value.itemKey === task.itemKey);
						return result ? {
							...task,
							status: result.currentStatus || task.status,
							...result.fieldsWritten && input ? {
								actualDays: input.days,
								actualStart: input.actualStart,
								actualEnd: input.actualEnd
							} : {}
						} : task;
					}));
					setUncertain(data.results.some((result) => result.outcome === "unknown"));
					const success = data.results.filter((result) => result.outcome === "success").length;
					const failed = data.results.filter((result) => !["success", "skipped"].includes(result.outcome)).length;
					onNotify(`报工完成：成功 ${success} 项${failed ? `，${failed} 项需处理` : ""}`, failed > 0);
					if (!failed && data.results.length === payload.length) onClose();
				} catch (error) {
					setError(`未能确认提交结果，请刷新并核对各 Task 后再操作：${errorText$1(error)}`);
					setUncertain(true);
					onNotify("报工结果待核对，请刷新查看", true);
				} finally {
					submitting.current = false;
					setBusy(false);
					onSaved();
				}
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open: true,
				title: "一键报工",
				closeLabel: "关闭",
				className: worktime_module_css_default.reportDialog,
				onClose: () => {
					if (!busy) onClose();
				},
				footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: worktime_module_css_default.reportTotal,
						children: [
							"已选 ",
							selectedTasks.length,
							" 项 · ",
							Number.isFinite(total) ? total : 0,
							" 人天"
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "ghost",
						disabled: busy,
						onClick: onClose,
						children: "关闭"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "primary",
						disabled: busy || loading || !selectedTasks.length || invalid || !!suggestions.conflicts.length || uncertain,
						onClick: () => void submit(),
						children: busy ? "正在报工…" : "确认工时并流转"
					})
				] }),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: `${worktime_module_css_default.form} ${worktime_module_css_default.reportForm}`,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.reportToolbar,
							role: "toolbar",
							"aria-label": "报工周切换",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: worktime_module_css_default.reportWeekNav,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: worktime_module_css_default.reportNavButton,
										"aria-label": "上一周",
										title: "上一周",
										disabled: busy,
										onClick: () => setWeek(addDays(week, -7)),
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
											viewBox: "0 0 16 16",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m10 4-4 4 4 4" })
										})
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: worktime_module_css_default.reportWeekPicker,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
												viewBox: "0 0 16 16",
												"aria-hidden": "true",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
													x: "2.5",
													y: "3.5",
													width: "11",
													height: "10",
													rx: "2"
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M5 2v3m6-3v3M3 7h10" })]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
												week.replaceAll("-", "."),
												" ",
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: "—" }),
												" ",
												end.replaceAll("-", ".")
											] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "date",
												"aria-label": "报工所在周",
												value: week,
												disabled: busy,
												onClick: (event) => {
													try {
														event.currentTarget.showPicker?.();
													} catch {}
												},
												onChange: (event) => {
													if (event.target.value) setWeek(reportWeek(event.target.value));
												}
											})
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: worktime_module_css_default.reportNavButton,
										"aria-label": "下一周",
										title: "下一周",
										disabled: busy,
										onClick: () => setWeek(addDays(week, 7)),
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
											viewBox: "0 0 16 16",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m6 4 4 4-4 4" })
										})
									})
								]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: worktime_module_css_default.reportWeekActions,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: worktime_module_css_default.reportToolbarButton,
									disabled: busy,
									"aria-pressed": week === reportWeek(today()),
									onClick: () => setWeek(reportWeek(today())),
									children: "本周"
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: worktime_module_css_default.reportToolbarButton,
									disabled: busy || loading,
									onClick: () => setVersion((value) => value + 1),
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
										viewBox: "0 0 16 16",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M13 6a5.2 5.2 0 1 0 .2 3M13 2.5V6H9.5" })
									}), "刷新"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: worktime_module_css_default.help,
							children: "单位：人天，最小 0.5。同一天一个 Task 默认 1，两个各 0.5；已报工 Task 仍计入当日任务数。修改后写入实际工时并流转。"
						}),
						suggestions.conflicts.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
							className: worktime_module_css_default.notice,
							role: "alert",
							children: [suggestions.conflicts.map((value) => `${value.date} 有 ${value.itemKeys.length} 个 Task`).join("；"), "。最小单位为 0.5，请取消部分选择或先调整排期。"]
						}),
						selectedTasks.some((task) => task.start < week || task.end > end) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: worktime_module_css_default.notice,
							children: "跨周 Task 的建议工时仅统计本周；提交会覆盖整项 Task 的实际工时，请核对总工时及实际日期。"
						}),
						constraints.finishRange && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
							className: worktime_module_css_default.help,
							children: [
								"番茄允许的实际完成日期：",
								constraints.finishRange.join(" — "),
								"。"
							]
						}),
						invalid && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: worktime_module_css_default.error,
							children: "请核对工时和日期：工时须为正数且以 0.5 递增，日期和工时须符合番茄允许范围。"
						}),
						error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							role: "alert",
							className: worktime_module_css_default.error,
							children: error
						}),
						uncertain && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: worktime_module_css_default.notice,
							children: "部分结果待核对，请先点击刷新查看服务器数据，再决定是否继续。"
						}),
						loading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							role: "status",
							children: "正在读取本周 Task…"
						}) : tasks.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "本周没有 Task" }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: worktime_module_css_default.reportTableScroll,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("table", {
								className: worktime_module_css_default.reportTable,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "选择" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "Task" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "状态" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "计划 / 已报" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "本次实际工时" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "实际开始" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "实际结束" })
								] }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tbody", { children: tasks.map((task) => {
									const result = results[task.itemKey];
									const disabled = busy || terminal(task.status) || uncertain || !!result;
									return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											"aria-label": `选择 ${task.itemKey}`,
											checked: selected.has(task.itemKey),
											disabled,
											onChange: () => toggle(task.itemKey)
										}) }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("td", { children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: task.title }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: worktime_module_css_default.itemLink,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: task.itemKey }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoLinkButton, {
													itemKey: task.itemKey,
													disabled: busy
												})]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
												task.start,
												" — ",
												task.end,
												(task.start < week || task.end > end) && " · 跨周"
											] }),
											result && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
												className: result.outcome === "success" || result.outcome === "skipped" ? worktime_module_css_default.help : worktime_module_css_default.error,
												children: [
													outcomeText[result.outcome],
													result.steps.length ? ` · ${result.steps.join("；")}` : "",
													result.error ? `：${result.error}` : ""
												]
											})
										] }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: task.status }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("td", { children: [
											task.days,
											" / ",
											task.actualDays ?? "—"
										] }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "number",
											min: "0.5",
											step: "0.5",
											"aria-label": `${task.itemKey} 实际工时`,
											value: drafts[task.itemKey]?.days ?? suggestions.days[task.itemKey] ?? task.actualDays ?? "",
											disabled: disabled || !selected.has(task.itemKey),
											onChange: (event) => edit(task.itemKey, "days", event.target.value)
										}) }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "date",
											"aria-label": `${task.itemKey} 实际开始`,
											value: drafts[task.itemKey]?.start ?? (task.actualStart || task.start),
											disabled: disabled || !selected.has(task.itemKey),
											onChange: (event) => edit(task.itemKey, "start", event.target.value)
										}) }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "date",
											"aria-label": `${task.itemKey} 实际结束`,
											value: drafts[task.itemKey]?.end ?? (task.actualEnd || task.end),
											disabled: disabled || !selected.has(task.itemKey),
											onChange: (event) => edit(task.itemKey, "end", event.target.value)
										}) })
									] }, task.itemKey);
								}) })]
							})
						})
					]
				})
			});
		}
		//#endregion
		//#region src/client/RequirementPicker.tsx
		function RequirementPicker({ items, selected, disabled, request, onSelect }) {
			const [query, setQuery] = (0, react.useState)("");
			const [results, setResults] = (0, react.useState)([]);
			const [loading, setLoading] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)("");
			const [truncated, setTruncated] = (0, react.useState)(false);
			const q = query.trim();
			(0, react.useEffect)(() => {
				if (!q) {
					setResults([]);
					setError("");
					setLoading(false);
					setTruncated(false);
					return;
				}
				const controller = new AbortController();
				setLoading(true);
				setError("");
				setResults([]);
				setTruncated(false);
				const timer = window.setTimeout(() => {
					request(`/requirements?q=${encodeURIComponent(q)}`, void 0, controller.signal).then((data) => {
						if (!controller.signal.aborted) {
							setResults(data.items);
							setTruncated(data.truncated);
						}
					}).catch((error) => {
						if (!controller.signal.aborted) setError(error instanceof Error ? error.message : "搜索失败");
					}).finally(() => {
						if (!controller.signal.aborted) setLoading(false);
					});
				}, 300);
				return () => {
					window.clearTimeout(timer);
					controller.abort();
				};
			}, [q, request]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: worktime_module_css_default.requirementPicker,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "search",
						autoFocus: true,
						"aria-label": "搜索需求编号或标题",
						placeholder: "搜索需求编号或标题（不限负责人）",
						maxLength: 120,
						value: query,
						disabled,
						onChange: (event) => {
							setQuery(event.target.value);
							onSelect("");
						}
					}),
					!q ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
						"aria-label": "我的需求",
						value: selected,
						disabled,
						onChange: (event) => onSelect(event.target.value),
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
							value: "",
							children: "从我的需求中选择"
						}), items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("option", {
							value: item.itemKey,
							children: [
								item.itemKey,
								" · ",
								item.title
							]
						}, item.itemKey))]
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [loading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						role: "status",
						className: worktime_module_css_default.help,
						children: "正在搜索…"
					}) : error ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						role: "alert",
						className: worktime_module_css_default.error,
						children: error
					}) : results.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: worktime_module_css_default.help,
						children: "没有找到可访问的需求，请尝试完整编号或其他关键词。"
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: worktime_module_css_default.requirementResults,
						children: results.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.requirementResult,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: worktime_module_css_default.requirementChoice,
								"aria-pressed": selected === item.itemKey,
								disabled,
								onClick: () => onSelect(item.itemKey),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: item.title }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
									item.itemKey,
									" · ",
									item.status || "状态未知",
									" · ",
									item.assignees.join("、") || "未设置负责人"
								] })]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoLinkButton, {
								itemKey: item.itemKey,
								disabled
							})]
						}, item.itemKey))
					}), truncated && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: worktime_module_css_default.help,
						children: "仅显示前 20 条，请输入更具体的标题或完整编号。"
					})] }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", {
						className: worktime_module_css_default.help,
						children: "新分配的 Task 由当前登录用户负责。"
					})
				]
			});
		}
		//#endregion
		//#region src/client/Worktime.tsx
		const stages = Object.keys(worktimeText.stageLabels);
		const errorText = (error) => error instanceof Error ? error.message : worktimeText.readFailed;
		async function api(path, input, signal) {
			const response = await fetch(`/api/tomato-board/worktime${path}`, {
				method: input === void 0 ? "GET" : "POST",
				headers: {
					"content-type": "application/json",
					accept: "application/json"
				},
				...input === void 0 ? {} : { body: JSON.stringify(input) },
				...signal ? { signal } : {}
			});
			if (response.status === 404) throw new Error(worktimeText.hostStale);
			let data;
			try {
				data = await response.json();
			} catch {
				throw new Error(`${worktimeText.readFailed} (${response.status})`);
			}
			if (!response.ok) throw new Error(/缺少操作单元|未知路由|Not Found/u.test(String(data.error ?? "")) ? worktimeText.hostStale : data.error || `${worktimeText.readFailed} (${response.status})`);
			return data;
		}
		const todayKey = () => dateKey(/* @__PURE__ */ new Date());
		const sorted = (units) => [...units].sort((a, b) => a.start < b.start ? -1 : a.start > b.start ? 1 : 0);
		const daysIn = (start, end) => {
			try {
				return datesBetween(start, end).length;
			} catch {
				return 0;
			}
		};
		/** Five-week planning calendar: pick days, then one plan per requirement. */
		function Worktime({ assignee, users, onAssigneeChange, onRefresh }) {
			const pageRef = (0, react.useRef)(null);
			const notificationId = (0, react.useRef)(0);
			const [notification, setNotification] = (0, react.useState)(null);
			const dismissNotification = (0, react.useCallback)(() => setNotification(null), []);
			const notify = (0, react.useCallback)((text, error = false) => {
				setNotification({
					id: ++notificationId.current,
					text,
					error
				});
			}, []);
			const [items, setItems] = (0, react.useState)([]);
			const [anchor, setAnchor] = (0, react.useState)(todayKey);
			const [units, setUnits] = (0, react.useState)([]);
			const [archivedUnits, setArchivedUnits] = (0, react.useState)([]);
			const [history, setHistory] = (0, react.useState)([]);
			const [requirementChange, setRequirementChange] = (0, react.useState)(null);
			const [taskChange, setTaskChange] = (0, react.useState)(null);
			const mutationPending = (0, react.useRef)(false);
			const readEpoch = (0, react.useRef)(0);
			const [error, setErrorValue] = (0, react.useState)("");
			const setError = (0, react.useCallback)((value) => {
				setErrorValue(value);
				if (value) notify(value, true);
			}, [notify]);
			const [historyError, setHistoryError] = (0, react.useState)("");
			const [loading, setLoading] = (0, react.useState)(false);
			const [version, setVersion] = (0, react.useState)(0);
			const [selectedStory, setSelectedStory] = (0, react.useState)("");
			const [selection, setSelection] = (0, react.useState)(null);
			const [choosing, setChoosing] = (0, react.useState)(false);
			const [dragging, setDragging] = (0, react.useState)(false);
			const [editingKey, setEditingKey] = (0, react.useState)("");
			const [editingTask, setEditingTask] = (0, react.useState)(null);
			const [reporting, setReporting] = (0, react.useState)(false);
			const draggedTask = (0, react.useRef)(null);
			const [dragPreview, setDragPreview] = (0, react.useState)(null);
			const dragImage = (0, react.useRef)(null);
			const [saving, setSaving] = (0, react.useState)(false);
			const [message, setMessageValue] = (0, react.useState)("");
			const setMessage = (0, react.useCallback)((value) => {
				setMessageValue(value === worktimeText.taskSyncing ? value : "");
				if (value && value !== worktimeText.taskSyncing) notify(value);
				else dismissNotification();
			}, [notify, dismissNotification]);
			const selecting = (0, react.useRef)(false);
			const pending = (0, react.useRef)(null);
			const readOnlyRef = (0, react.useRef)(false);
			const justReleased = (0, react.useRef)(false);
			const start = calendarStart(anchor);
			const end = addDays(start, 34);
			const dates = (0, react.useMemo)(() => datesBetween(start, end), [start, end]);
			const requirements = (0, react.useMemo)(() => items.filter((item) => ["Story", "EnablerStory"].includes(item.itemType)), [items]);
			const range = selection ? [selection.start, selection.end].sort() : null;
			const readOnly = assignee !== "currentUser()";
			const calendarUnits = (0, react.useMemo)(() => applyRequirementChange(units, requirementChange).map((unit) => ({
				...unit,
				tasks: applyTaskChange(unit.tasks, taskChange)
			})), [
				units,
				requirementChange,
				taskChange
			]);
			const calendarHistory = (0, react.useMemo)(() => applyTaskChange(history, taskChange), [history, taskChange]);
			const [bugCounts, setBugCounts] = (0, react.useState)({});
			const bugCountRevisions = (0, react.useRef)(/* @__PURE__ */ new Map());
			const updateBugCount = (0, react.useCallback)((itemKey, count) => {
				bugCountRevisions.current.set(itemKey, (bugCountRevisions.current.get(itemKey) ?? 0) + 1);
				setBugCounts((current) => current[itemKey] === count ? current : {
					...current,
					[itemKey]: count
				});
			}, []);
			const visibleTaskKeys = (0, react.useMemo)(() => [...new Set([...calendarUnits.flatMap((unit) => unit.tasks.filter((task) => task.status !== "created")), ...calendarHistory].filter((task) => task.itemKey && task.start <= end && task.end >= start).map((task) => task.itemKey))].sort().join(","), [
				calendarUnits,
				calendarHistory,
				start,
				end
			]);
			(0, react.useEffect)(() => {
				if (!visibleTaskKeys) return;
				const controller = new AbortController();
				const keys = visibleTaskKeys.split(",");
				const revisions = new Map(keys.map((key) => [key, bugCountRevisions.current.get(key) ?? 0]));
				(async () => {
					for (let offset = 0; offset < keys.length && !controller.signal.aborted; offset += 20) try {
						const result = await api("/task-bug-counts", { itemKeys: keys.slice(offset, offset + 20) }, controller.signal);
						if (controller.signal.aborted) return;
						const fresh = Object.fromEntries(Object.entries(result.counts).filter(([key]) => revisions.get(key) === (bugCountRevisions.current.get(key) ?? 0)));
						setBugCounts((current) => ({
							...current,
							...fresh
						}));
					} catch {}
				})();
				return () => controller.abort();
			}, [visibleTaskKeys, version]);
			(0, react.useEffect)(() => {
				pending.current = selection;
			}, [selection]);
			(0, react.useEffect)(() => {
				readOnlyRef.current = readOnly;
			}, [readOnly]);
			(0, react.useEffect)(() => {
				setHistory([]);
				setUnits([]);
				setArchivedUnits([]);
				setEditingTask(null);
				setEditingKey("");
				setChoosing(false);
				setSelection(null);
				setReporting(false);
			}, [assignee]);
			(0, react.useEffect)(() => {
				const controller = new AbortController();
				const epoch = readEpoch.current;
				setLoading(true);
				const query = encodeURIComponent(assignee);
				Promise.all([api(`?assignee=${query}`, void 0, controller.signal).then((data) => {
					if (!controller.signal.aborted && !mutationPending.current && epoch === readEpoch.current) {
						setUnits(data.units);
						setArchivedUnits(data.archivedUnits ?? []);
					}
				}), fetch(`/api/tomato-board/items?assignee=${query}`, {
					signal: controller.signal,
					headers: { accept: "application/json" }
				}).then(async (response) => {
					const data = await response.json();
					if (!response.ok) throw new Error(data.error || worktimeText.readFailed);
					if (!controller.signal.aborted) setItems(data.items ?? []);
				})]).catch((error) => {
					if (!controller.signal.aborted && !mutationPending.current && epoch === readEpoch.current) setError(errorText(error));
				}).finally(() => {
					if (!controller.signal.aborted) setLoading(false);
				});
				return () => controller.abort();
			}, [version, assignee]);
			(0, react.useEffect)(() => {
				const controller = new AbortController();
				setHistoryError("");
				const epoch = readEpoch.current;
				api(`/history?start=${start}&end=${end}&assignee=${encodeURIComponent(assignee)}`, void 0, controller.signal).then((data) => {
					if (controller.signal.aborted || mutationPending.current || epoch !== readEpoch.current) return;
					setHistory(data.tasks);
					if (data.truncated) setHistoryError(worktimeText.historyFailed);
				}).catch((error) => {
					if (!controller.signal.aborted && !mutationPending.current && epoch === readEpoch.current) setHistoryError(`${worktimeText.historyFailed}：${errorText(error)}`);
				});
				return () => controller.abort();
			}, [
				start,
				end,
				version,
				assignee
			]);
			(0, react.useEffect)(() => {
				const refresh = () => {
					if (document.visibilityState === "hidden" || mutationPending.current) return;
					setVersion((value) => value + 1);
				};
				window.addEventListener("focus", refresh);
				document.addEventListener("visibilitychange", refresh);
				const timer = window.setInterval(refresh, 6e4);
				return () => {
					window.removeEventListener("focus", refresh);
					document.removeEventListener("visibilitychange", refresh);
					window.clearInterval(timer);
				};
			}, []);
			(0, react.useEffect)(() => {
				const stop = () => {
					if (!selecting.current) return;
					selecting.current = false;
					setDragging(false);
					if (readOnlyRef.current || !pending.current) return;
					justReleased.current = true;
					window.setTimeout(() => {
						justReleased.current = false;
					}, 0);
					setSelectedStory("");
					setError("");
					setChoosing(true);
				};
				window.addEventListener("pointerup", stop);
				window.addEventListener("pointercancel", stop);
				return () => {
					window.removeEventListener("pointerup", stop);
					window.removeEventListener("pointercancel", stop);
				};
			}, []);
			const beginSelection = (day) => {
				selecting.current = true;
				setDragging(true);
				setMessage("");
				setSelection({
					start: day,
					end: day
				});
			};
			const pickDay = (day) => {
				setMessage("");
				setSelection({
					start: day,
					end: day
				});
				setSelectedStory("");
				setError("");
				setChoosing(true);
			};
			const stretchSelection = (day) => {
				if (selecting.current) setSelection((current) => current ? {
					...current,
					end: day
				} : {
					start: day,
					end: day
				});
			};
			const closePicker = () => {
				setChoosing(false);
				setSelection(null);
				setSelectedStory("");
			};
			async function saveSelection(itemKey) {
				if (!range || saving) return;
				if (units.find((unit) => unit.itemKey === itemKey && unit.start === range[0] && unit.end === range[1])) {
					setEditingKey(itemKey);
					closePicker();
					setMessage(worktimeText.duplicate);
					return;
				}
				setSaving(true);
				setError("");
				try {
					await api("/unit", {
						id: crypto.randomUUID(),
						itemKey,
						start: range[0],
						end: range[1]
					});
					const fresh = await api(`?assignee=${encodeURIComponent(assignee)}`);
					setUnits(fresh.units);
					setArchivedUnits(fresh.archivedUnits ?? []);
					setEditingKey(itemKey);
					closePicker();
					setMessage(worktimeText.saved);
				} catch (error) {
					setError(errorText(error));
				} finally {
					setSaving(false);
				}
			}
			async function mutateTask(task, action, next) {
				if (readOnly || saving || mutationPending.current) throw new Error(worktimeText.taskBusy);
				if (action === "move" && (!next || !daysIn(next.start, next.end))) throw new Error(worktimeText.rangeInvalid);
				const change = action === "delete" ? {
					itemKey: task.itemKey,
					action
				} : {
					itemKey: task.itemKey,
					action,
					start: next.start,
					end: next.end
				};
				mutationPending.current = true;
				readEpoch.current += 1;
				setTaskChange(change);
				setEditingTask(null);
				setSaving(true);
				setError("");
				setMessage(worktimeText.taskSyncing);
				try {
					await api("/task", {
						itemKey: task.itemKey,
						action,
						expectedStart: task.start,
						expectedEnd: task.end,
						...next ?? {},
						...action === "delete" ? { confirm: true } : {}
					});
					setUnits((current) => current.map((unit) => ({
						...unit,
						tasks: applyTaskChange(unit.tasks, change)
					})));
					setHistory((current) => applyTaskChange(current, change));
					setMessage(action === "delete" ? worktimeText.taskDeleted : worktimeText.taskMoved);
					setVersion((value) => value + 1);
					onRefresh();
				} catch (error) {
					setMessage("");
					setError(`${worktimeText.taskRolledBack}：${errorText(error)}`);
				} finally {
					readEpoch.current += 1;
					mutationPending.current = false;
					setTaskChange(null);
					setSaving(false);
					setVersion((value) => value + 1);
				}
			}
			async function mutateRequirement(unit, change) {
				if (readOnly || saving || mutationPending.current) throw new Error(worktimeText.taskBusy);
				if (change.action === "resize" && !daysIn(change.start, change.end)) throw new Error(worktimeText.rangeInvalid);
				mutationPending.current = true;
				readEpoch.current += 1;
				setRequirementChange(change);
				setEditingKey("");
				setSaving(true);
				setError("");
				setMessage(worktimeText.taskSyncing);
				try {
					setUnits((await api("/requirement", {
						...change,
						itemKey: unit.itemKey,
						units: [{
							id: unit.id,
							revision: unit.revision
						}]
					})).units);
					setMessage(worktimeText.requirementSaved);
					setVersion((value) => value + 1);
					onRefresh();
				} catch (error) {
					setMessage("");
					setError(`${worktimeText.taskRolledBack}：${errorText(error)}`);
				} finally {
					readEpoch.current += 1;
					mutationPending.current = false;
					setRequirementChange(null);
					setSaving(false);
				}
			}
			function previewRanges(source, day) {
				const active = source.task ?? source.unit;
				return calendarDragRanges([active], active, source.anchor, source.edge, day);
			}
			function updateDragPreview(day) {
				const source = draggedTask.current;
				if (!source) return;
				setDragPreview((current) => current?.target === day ? current : {
					ranges: previewRanges(source, day),
					target: day,
					kind: source.unit ? "unit" : "task",
					invalid: !calendarDragAllowed(source.task ?? source.unit, source.edge, day)
				});
			}
			function weekDropDay(event, weekDates) {
				const bounds = event.currentTarget.getBoundingClientRect();
				return weekDates[Math.min(6, Math.max(0, Math.floor((event.clientX - bounds.left) / bounds.width * 7)))];
			}
			async function dropTask(day) {
				const source = draggedTask.current;
				draggedTask.current = null;
				setDragPreview(null);
				if (!source || source.anchor === day || readOnly) return;
				if (!calendarDragAllowed(source.task ?? source.unit, source.edge, day)) {
					setError(worktimeText.rangeInvalid);
					return;
				}
				const next = previewRanges(source, day)[0];
				const delta = Math.round((Date.parse(`${day}T12:00:00Z`) - Date.parse(`${source.anchor}T12:00:00Z`)) / 864e5);
				try {
					if (source.unit) await mutateRequirement(source.unit, source.edge === "move" ? {
						action: "move",
						id: source.unit.id,
						delta
					} : {
						action: "resize",
						id: source.unit.id,
						...next
					});
					else if (source.task) await mutateTask(source.task, "move", next);
				} catch (error) {
					setError(errorText(error));
				}
			}
			const knownKeys = new Set(calendarUnits.flatMap((unit) => unit.tasks.flatMap((task) => task.status !== "created" && task.itemKey ? [task.itemKey] : [])));
			const remote = calendarHistory.filter((task) => !knownKeys.has(task.itemKey));
			const weeks = [];
			for (let i = 0; i < dates.length; i += 7) weeks.push(dates.slice(i, i + 7));
			function beginBarDrag(event, bar, edge = "move") {
				event.stopPropagation();
				const data = bar.task ?? bar.unit;
				if (!data || !bar.anchor || readOnly || saving) {
					event.preventDefault();
					return;
				}
				const bounds = event.currentTarget.getBoundingClientRect();
				const offset = Math.min(bar.span - 1, Math.max(0, Math.floor((event.clientX - bounds.left) / bounds.width * bar.span)));
				const anchor = edge === "move" ? addDays(bar.anchor, offset) : edge === "start" ? data.start : data.end;
				draggedTask.current = {
					...bar.task ? { task: bar.task } : {},
					...bar.unit ? { unit: bar.unit } : {},
					anchor,
					edge
				};
				event.dataTransfer.effectAllowed = "move";
				event.dataTransfer.setData("text/plain", data.itemKey);
				if (!dragImage.current) {
					dragImage.current = document.createElement("canvas");
					dragImage.current.width = 1;
					dragImage.current.height = 1;
				}
				event.dataTransfer.setDragImage(dragImage.current, 0, 0);
				setDragPreview({
					ranges: previewRanges(draggedTask.current, anchor),
					target: anchor,
					kind: bar.unit ? "unit" : "task",
					invalid: false
				});
			}
			/** macOS-calendar style: clip each unit/task into the week, then stack overlapping bars into lanes. */
			const buildBars = (weekDates) => {
				const weekStart = weekDates[0];
				const weekEnd = weekDates[6];
				const bars = [];
				const clip = (s, e) => {
					if (!s || !e || e < weekStart || s > weekEnd) return null;
					const i = weekDates.indexOf(s < weekStart ? weekStart : s);
					const j = weekDates.indexOf(e > weekEnd ? weekEnd : e);
					return i < 0 || j < 0 ? null : {
						startCol: i + 1,
						span: j - i + 1
					};
				};
				for (const unit of calendarUnits) {
					const c = clip(unit.start, unit.end);
					if (c) bars.push({
						key: `u-${unit.id}-${weekStart}`,
						kind: "unit",
						...c,
						lane: 0,
						unit,
						anchor: unit.start < weekStart ? weekStart : unit.start,
						label: unit.title,
						tip: `${worktimeText.request} · ${unit.itemKey} · ${unit.start} ~ ${unit.end} · ${datesBetween(unit.start, unit.end).length}${worktimeText.days}`,
						onClick: () => setEditingKey(unit.itemKey)
					});
					for (const [i, task] of unit.tasks.entries()) {
						if (task.status === "created") continue;
						const tc = clip(task.start, task.end);
						if (!tc) continue;
						bars.push({
							key: `t-${unit.id}-${i}-${weekStart}`,
							kind: "task",
							...tc,
							lane: 0,
							unverified: true,
							...task.itemKey ? {
								task: {
									...task,
									itemKey: task.itemKey
								},
								anchor: task.start < weekStart ? weekStart : task.start
							} : {},
							label: task.title,
							tip: task.error || `${worktimeText.task} · ${task.start} ~ ${task.end} · ${task.days}${worktimeText.personDays}${task.itemKey ? ` · ${task.itemKey}` : ""} · ${task.status === "pending" ? worktimeText.pending : worktimeText.uncertain}`,
							onClick: () => task.itemKey ? setEditingTask({
								...task,
								itemKey: task.itemKey
							}) : setEditingKey(unit.itemKey)
						});
					}
				}
				for (const task of remote) {
					const c = clip(task.start, task.end);
					if (!c) continue;
					bars.push({
						key: `r-${task.itemKey}-${weekStart}`,
						kind: "task",
						...c,
						lane: 0,
						task,
						anchor: task.start < weekStart ? weekStart : task.start,
						label: task.title,
						tip: `${worktimeText.task} · ${task.status} · ${task.itemKey} · ${task.start} ~ ${task.end}`,
						onClick: () => setEditingTask(task)
					});
				}
				bars.sort((a, b) => a.startCol - b.startCol || b.span - a.span);
				const laneEnds = [];
				for (const bar of bars) {
					let lane = laneEnds.findIndex((laneEnd) => laneEnd < bar.startCol);
					if (lane === -1) {
						lane = laneEnds.length;
						laneEnds.push(0);
					}
					bar.lane = lane;
					laneEnds[lane] = bar.startCol + bar.span - 1;
				}
				return bars;
			};
			const editingUnits = editingKey ? sorted(calendarUnits.filter((unit) => unit.itemKey === editingKey)) : [];
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				ref: pageRef,
				className: worktime_module_css_default.page,
				children: [
					reporting && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TaskReport, {
						request: api,
						onClose: () => setReporting(false),
						onSaved: () => {
							setVersion((v) => v + 1);
							onRefresh();
						},
						onNotify: notify
					}),
					notification && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Toast, {
						text: notification.text,
						anchor: pageRef.current,
						holdMs: notification.error ? 5e3 : 2e3,
						onDone: dismissNotification
					}, notification.id),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: worktime_module_css_default.toolbar,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.period,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("h2", { children: [
								start.replaceAll("-", "."),
								" ",
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "—" }),
								" ",
								end.replaceAll("-", ".")
							] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: worktime_module_css_default.legend,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: worktime_module_css_default.storyDot }),
									worktimeText.request,
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: worktime_module_css_default.taskDot }),
									worktimeText.task,
									!readOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: worktimeText.dayPickHint })
								]
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.navigation,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(AssigneePicker, {
									users,
									value: assignee,
									onChange: onAssigneeChange,
									label: null,
									className: worktime_module_css_default.userPicker,
									currentUserName: worktimeText.currentUser,
									ariaLabel: worktimeText.switchUser
								}),
								readOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: worktime_module_css_default.readOnlyTag,
									children: worktimeText.readOnlyView
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": worktimeText.previous,
									onClick: () => setAnchor(addDays(anchor, -7)),
									children: "‹"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setAnchor(todayKey()),
									children: worktimeText.today
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": worktimeText.next,
									onClick: () => setAnchor(addDays(anchor, 7)),
									children: "›"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: loading,
									onClick: () => {
										setVersion((v) => v + 1);
										onRefresh();
									},
									children: loading ? worktimeText.loading : worktimeText.refresh
								}),
								!readOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: saving,
									onClick: () => setReporting(true),
									children: "一键报工"
								})
							]
						})]
					}),
					historyError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						role: "status",
						className: worktime_module_css_default.notice,
						children: historyError
					}),
					message && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						role: "status",
						className: worktime_module_css_default.notice,
						children: message
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: worktime_module_css_default.calendarArea,
						"aria-label": worktimeText.dateSelection,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: `${worktime_module_css_default.previewStatus} ${dragPreview?.invalid ? worktime_module_css_default.previewDisabledStatus : ""}`,
							role: "status",
							"aria-live": "polite",
							children: dragPreview && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								dragPreview.invalid ? worktimeText.invalidDrag : worktimeText.previewRange,
								" · ",
								dragPreview.ranges.map((value) => `${value.start} — ${value.end}`).join(" / ")
							] })
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: `${worktime_module_css_default.calendar} ${dragging ? worktime_module_css_default.dragging : ""} ${dragPreview ? worktime_module_css_default.previewing : ""}`,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: worktime_module_css_default.weekHeader,
								children: worktimeText.weekdays.map((day) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: worktime_module_css_default.weekday,
									children: day
								}, day))
							}), weeks.map((weekDates) => {
								const bars = buildBars(weekDates);
								const laneCount = bars.reduce((count, bar) => Math.max(count, bar.lane + 1), 0);
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: worktime_module_css_default.week,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: worktime_module_css_default.weekScroll,
										role: "region",
										"aria-label": `${weekDates[0]} — ${weekDates[6]}`,
										tabIndex: 0,
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: worktime_module_css_default.weekContent,
											style: { height: `${34 + laneCount * 23}px` },
											onDragOver: (event) => {
												if (!draggedTask.current || readOnly || saving) return;
												event.preventDefault();
												const day = weekDropDay(event, weekDates);
												event.dataTransfer.dropEffect = calendarDragAllowed(draggedTask.current.task ?? draggedTask.current.unit, draggedTask.current.edge, day) ? "move" : "none";
												updateDragPreview(day);
											},
											onDrop: (event) => {
												if (!draggedTask.current || readOnly || saving) return;
												event.preventDefault();
												event.stopPropagation();
												dropTask(weekDropDay(event, weekDates));
											},
											children: [weekDates.map((day, di) => {
												const selected = range && day >= range[0] && day <= range[1];
												const previewed = dragPreview?.ranges.some((value) => value.start <= day && day <= value.end);
												const isToday = day === todayKey();
												return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
													className: `${worktime_module_css_default.day} ${di < 2 ? worktime_module_css_default.weekend : ""}`,
													"data-highlighted": selected || previewed ? true : void 0,
													"aria-disabled": dragPreview?.invalid && dragPreview.target === day ? true : void 0,
													"data-date": day,
													onPointerDown: readOnly ? void 0 : (event) => {
														const target = event.target;
														if (event.button !== 0 || target.closest("a,input,textarea,select") || target.closest("button") && !target.closest("[data-pick]")) return;
														event.preventDefault();
														beginSelection(day);
													},
													onPointerEnter: readOnly ? void 0 : () => stretchSelection(day),
													children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
														type: "button",
														"data-pick": "day",
														className: worktime_module_css_default.dayNumber,
														"aria-label": day,
														"aria-pressed": !!selected,
														"aria-current": isToday ? "date" : void 0,
														disabled: readOnly,
														onClick: () => {
															if (!justReleased.current) pickDay(day);
														},
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [day.slice(5, 7), "/"] }), Number(day.slice(8))]
													})
												}, day);
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: worktime_module_css_default.events,
												children: bars.map((bar) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
													type: "button",
													title: bar.tip,
													draggable: !readOnly && !saving && !!(bar.task || bar.unit),
													onDragStart: (event) => beginBarDrag(event, bar),
													onDragEnd: () => {
														draggedTask.current = null;
														setDragPreview(null);
													},
													onClick: bar.onClick,
													className: `${worktime_module_css_default.bar} ${bar.kind === "unit" ? worktime_module_css_default.barUnit : bar.unverified ? worktime_module_css_default.barUnverified : worktime_module_css_default.barTask}`,
													style: {
														gridColumn: `${bar.startCol} / span ${bar.span}`,
														gridRow: String(bar.lane + 1)
													},
													children: [
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: worktime_module_css_default.barLabel,
															children: bar.label
														}),
														bar.task && (bugCounts[bar.task.itemKey] ?? 0) > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: worktime_module_css_default.taskBugBadge,
															"aria-label": `关联 ${bugCounts[bar.task.itemKey]} 个 Bug`,
															title: `关联 ${bugCounts[bar.task.itemKey]} 个 Bug`,
															children: bugCounts[bar.task.itemKey]
														}),
														!readOnly && !saving && (bar.task || bar.unit) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(bar.task ?? bar.unit).start >= weekDates[0] && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: `${worktime_module_css_default.resizeHandle} ${worktime_module_css_default.resizeStart}`,
															draggable: true,
															title: worktimeText.resizeStart,
															onDragStart: (event) => beginBarDrag(event, bar, "start"),
															onClick: (event) => event.stopPropagation()
														}), (bar.task ?? bar.unit).end <= weekDates[6] && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: `${worktime_module_css_default.resizeHandle} ${worktime_module_css_default.resizeEnd}`,
															draggable: true,
															title: worktimeText.resizeEnd,
															onDragStart: (event) => beginBarDrag(event, bar, "end"),
															onClick: (event) => event.stopPropagation()
														})] })
													]
												}, bar.key))
											})]
										})
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: worktime_module_css_default.weekHighlights,
										"aria-hidden": "true",
										children: weekDates.map((day) => {
											const selected = range && day >= range[0] && day <= range[1];
											const previewed = dragPreview?.ranges.some((value) => value.start <= day && day <= value.end);
											const previewStart = dragPreview?.ranges.some((value) => value.start === day);
											const previewEnd = dragPreview?.ranges.some((value) => value.end === day);
											const disabled = dragPreview?.invalid && (previewed || dragPreview.target === day);
											return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: `${worktime_module_css_default.highlightCell} ${selected ? worktime_module_css_default.selectedDay : ""} ${previewed ? dragPreview?.kind === "task" ? worktime_module_css_default.previewTaskDay : worktime_module_css_default.previewUnitDay : ""} ${previewStart ? worktime_module_css_default.previewStartDay : ""} ${previewEnd ? worktime_module_css_default.previewEndDay : ""} ${disabled ? worktime_module_css_default.previewDisabledDay : ""}` }, day);
										})
									})]
								}, weekDates[0]);
							})]
						})]
					}),
					choosing && range && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: true,
						title: worktimeText.pickTitle,
						closeLabel: worktimeText.close,
						onClose: () => {
							if (!saving) closePicker();
						},
						className: worktime_module_css_default.dialogNarrow,
						footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "ghost",
							disabled: saving,
							onClick: closePicker,
							children: worktimeText.cancel
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							disabled: !selectedStory || saving,
							onClick: () => void saveSelection(selectedStory),
							children: saving ? worktimeText.saving : worktimeText.confirmPick
						})] }),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.form,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(RequirementPicker, {
								items: requirements,
								selected: selectedStory,
								disabled: saving,
								request: api,
								onSelect: setSelectedStory
							}), error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: worktime_module_css_default.error,
								role: "alert",
								children: error
							})]
						})
					}),
					editingTask && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TaskEditor, {
						task: editingTask,
						readOnly,
						busy: saving,
						onClose: () => setEditingTask(null),
						onMutate: mutateTask,
						onNotify: notify,
						onBugCountChange: updateBugCount
					}, editingTask.itemKey),
					editingKey && editingUnits.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GroupEditor, {
						itemKey: editingKey,
						units: editingUnits,
						archivedUnits,
						onClose: () => setEditingKey(""),
						onSaved: (notice) => {
							setVersion((v) => v + 1);
							onRefresh();
							if (notice) setMessage(notice);
						}
					}, editingKey)
				]
			});
		}
		/** One requirement is one plan: every date range it owns is allocated together. */
		function GroupEditor({ itemKey, units, archivedUnits, onClose, onSaved }) {
			const historyUnits = [...units, ...archivedUnits.filter((unit) => unit.itemKey === itemKey)];
			const title = units[0]?.title || itemKey;
			const savedUnits = (0, react.useRef)(units);
			const [meta, setMeta] = (0, react.useState)(null);
			const [error, setError] = (0, react.useState)("");
			const [busy, setBusy] = (0, react.useState)(false);
			const [cost, setCost] = (0, react.useState)(units[0]?.cost || "");
			const [team, setTeam] = (0, react.useState)(units[0]?.team || "");
			const [category, setCategory] = (0, react.useState)(units[0]?.category || "");
			const [confirmRetry, setConfirmRetry] = (0, react.useState)(false);
			const [ranges, setRanges] = (0, react.useState)(() => units.map((unit) => ({
				key: unit.id,
				id: unit.id,
				revision: unit.revision,
				start: unit.start,
				end: unit.end,
				locked: unitHasCreatedTasks(unit, units)
			})));
			const [drafts, setDrafts] = (0, react.useState)(() => Object.fromEntries(stages.map((stage) => {
				const task = units.flatMap((unit) => unit.tasks).find((item) => item.stage === stage && item.status !== "created" && !item.itemKey);
				return [stage, {
					days: task ? String(task.days) : "",
					title: task?.title || taskTitle(title, stage)
				}];
			})));
			const hasCreated = historyUnits.some((unit) => unit.tasks.some((task) => task.status === "created"));
			const rangeCount = ranges.length;
			const rangesChanged = ranges.length !== savedUnits.current.length || ranges.some((range) => {
				const original = savedUnits.current.find((unit) => unit.id === range.id);
				return !original || original.start !== range.start || original.end !== range.end;
			});
			const retried = historyUnits.some((unit) => unit.tasks.some((task) => task.status !== "pending" && task.status !== "created"));
			const count = (0, react.useMemo)(() => {
				const valid = ranges.filter((range) => range.start && range.end && range.end >= range.start);
				try {
					return valid.length ? availableWorktimeSlots(unitDates(valid), historyUnits.flatMap((unit) => unit.tasks), unitDates(historyUnits)).length / 2 : 0;
				} catch {
					return 0;
				}
			}, [
				ranges,
				units,
				archivedUnits,
				itemKey
			]);
			const plannedCount = (0, react.useMemo)(() => {
				const valid = ranges.filter((range) => range.start && range.end && range.end >= range.start);
				try {
					return valid.length ? unitDates(valid).length : 0;
				} catch {
					return 0;
				}
			}, [ranges]);
			const createdTasks = historyUnits.flatMap((unit) => unit.tasks).filter((task) => task.status === "created");
			const createdDays = createdTasks.reduce((sum, task) => sum + task.days, 0);
			const total = stages.reduce((sum, stage) => sum + (Number(drafts[stage].days) || 0), 0);
			const over = total > count + 1e-6;
			(0, react.useEffect)(() => {
				const controller = new AbortController();
				api(`/metadata?itemKey=${encodeURIComponent(itemKey)}`, void 0, controller.signal).then((data) => {
					setMeta(data);
					setCost((current) => current || data.suggestedCost);
					setTeam((current) => current || data.suggestedTeam);
					setCategory((current) => current || data.categories.find((value) => /bug|BUG|Bug/u.test(title) ? /bug|BUG|Bug/u.test(value) : value === "软件开发") || data.categories[0] || "");
				}).catch((error) => {
					if (!controller.signal.aborted) setError(errorText(error));
				});
				return () => controller.abort();
			}, [itemKey, title]);
			const inputTasks = stages.filter((stage) => Number(drafts[stage].days) > 0).map((stage) => ({
				stage,
				days: Number(drafts[stage].days),
				title: drafts[stage].title
			}));
			const createBlockReasons = [
				!rangeCount && "请添加时间段",
				rangeCount > 0 && count <= 0 && "当前没有剩余可分配人天，请增加时间段",
				!meta && (error ? "Task 创建信息读取失败，请关闭弹窗后重试" : "正在读取 Task 创建信息"),
				meta && !cost && "请选择工时成本归属",
				meta && !team && "请选择所属团队",
				meta && !category && "请选择任务分类",
				!inputTasks.length && "请至少填写一个阶段的人天",
				over && `${worktimeText.overAllocate}（${total} / ${count} 人天）`,
				retried && !confirmRetry && "请先核对上次创建结果并勾选重试确认"
			].filter((value) => typeof value === "string");
			const changeRange = (key, patch) => setRanges((current) => current.map((range) => range.key === key ? {
				...range,
				...patch
			} : range));
			/** Persist ranges first so creation always sees the exact saved revisions. */
			async function persistRanges() {
				if (!ranges.length && !rangesChanged) throw new Error(worktimeText.rangeEmpty);
				for (const range of ranges) {
					if (!range.start || !range.end) throw new Error(worktimeText.rangeIncomplete);
					if (range.end < range.start) throw new Error(worktimeText.rangeInvalid);
					datesBetween(range.start, range.end);
				}
				const data = await api("/ranges", {
					itemKey,
					units: savedUnits.current.map((unit) => ({
						id: unit.id,
						revision: unit.revision
					})),
					ranges: ranges.map((range) => ({
						id: range.id || range.key,
						start: range.start,
						end: range.end
					})),
					cost,
					team,
					category
				});
				savedUnits.current = data.units;
				const next = sorted(data.units).map((unit) => ({
					key: unit.id,
					id: unit.id,
					revision: unit.revision,
					start: unit.start,
					end: unit.end,
					locked: unitHasCreatedTasks(unit, data.units)
				}));
				setRanges(next);
				return next.filter((range) => range.id).map((range) => ({
					id: range.id,
					revision: range.revision ?? 0
				}));
			}
			async function saveRanges() {
				setBusy(true);
				setError("");
				try {
					await persistRanges();
					onSaved(worktimeText.saved);
					onClose();
				} catch (error) {
					setError(errorText(error));
				} finally {
					setBusy(false);
				}
			}
			async function create() {
				setBusy(true);
				setError("");
				try {
					const claims = await persistRanges();
					if (over) throw new Error(`${worktimeText.overAllocate}：${total} > ${count} ${worktimeText.personDays}`);
					const result = await api("/create", {
						units: claims,
						cost,
						team,
						category,
						tasks: inputTasks,
						confirmRetry
					});
					if (result.error) {
						onSaved();
						setError(result.error);
					} else {
						onSaved(worktimeText.createdMessage);
						onClose();
					}
				} catch (error) {
					setError(errorText(error));
				} finally {
					setBusy(false);
				}
			}
			const renderSelect = (label, value, values, change) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [label, /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
				required: true,
				value,
				disabled: busy,
				onChange: (event) => change(event.target.value),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
					value: "",
					children: worktimeText.placeholder
				}), values.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", { children: option }, option))]
			})] });
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open: true,
				title: `${worktimeText.edit} · ${itemKey}`,
				description: title,
				closeLabel: worktimeText.close,
				onClose: () => {
					if (!busy) onClose();
				},
				className: worktime_module_css_default.dialog,
				footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "ghost",
						disabled: busy,
						onClick: onClose,
						children: worktimeText.close
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "outline",
						disabled: busy || !rangeCount && !rangesChanged,
						onClick: () => void saveRanges(),
						children: busy ? worktimeText.saving : worktimeText.saveRanges
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "primary",
						disabled: busy || createBlockReasons.length > 0,
						onClick: () => void create(),
						children: busy ? worktimeText.creating : worktimeText.create
					})
				] }),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: worktime_module_css_default.form,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.unitSummary,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: itemKey }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: [
									plannedCount,
									" ",
									worktimeText.days
								] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoLinkButton, { itemKey })
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
							className: worktime_module_css_default.help,
							children: [
								worktimeText.createdAllocation,
								" ",
								createdDays,
								" ",
								worktimeText.personDays,
								" · ",
								worktimeText.currentCapacity,
								" ",
								count,
								" ",
								worktimeText.personDays
							]
						}),
						!busy && createBlockReasons.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
							className: worktime_module_css_default.error,
							role: "alert",
							children: [
								"暂不能创建：",
								createBlockReasons.join("；"),
								"。"
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.stageHeading,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: worktimeText.range }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: ranges.length })]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: worktime_module_css_default.help,
							children: worktimeText.rangeHint
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: worktime_module_css_default.ranges,
							children: ranges.map((range, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: worktime_module_css_default.rangeRow,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										type: "date",
										"aria-label": `${worktimeText.start}${index + 1}`,
										value: range.start,
										disabled: range.locked || busy,
										onChange: (event) => changeRange(range.key, { start: event.target.value })
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "—" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										type: "date",
										"aria-label": `${worktimeText.end}${index + 1}`,
										min: range.start,
										value: range.end,
										disabled: range.locked || busy,
										onChange: (event) => changeRange(range.key, { end: event.target.value })
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
										daysIn(range.start, range.end),
										" ",
										worktimeText.days,
										range.locked ? ` · ${worktimeText.created}` : ""
									] }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: busy,
										"aria-label": `${worktimeText.deleteRange} ${index + 1}`,
										title: worktimeText.rangeDeleteHint,
										onClick: () => setRanges((current) => current.filter((value) => value.key !== range.key)),
										children: worktimeText.deleteRange
									})
								]
							}, range.key))
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: worktime_module_css_default.addRange,
							disabled: busy,
							onClick: () => setRanges((current) => [...current, {
								key: crypto.randomUUID(),
								start: "",
								end: ""
							}]),
							children: worktimeText.addRange
						}),
						!meta && !error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							role: "status",
							children: worktimeText.loading
						}),
						meta && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.twoColumns,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [worktimeText.project, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									readOnly: true,
									value: meta.project
								})] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [worktimeText.owner, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									readOnly: true,
									value: meta.assigneeName
								})] }),
								renderSelect(worktimeText.cost, cost, meta.costs, setCost),
								renderSelect(worktimeText.team, team, meta.teams, setTeam),
								renderSelect(worktimeText.category, category, meta.categories, setCategory)
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: worktime_module_css_default.help,
							children: meta.suggestionSource
						})] }),
						hasCreated && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.stageHeading,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: worktimeText.createdAllocation }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								createdDays,
								" ",
								worktimeText.personDays
							] })]
						}), createdTasks.map((task, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.result,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: [
									worktimeText.stageLabels[task.stage],
									" · ",
									task.title
								] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
									task.start,
									" — ",
									task.end,
									" · ",
									task.days,
									" ",
									worktimeText.personDays,
									" · ",
									worktimeText.created
								] }),
								task.itemKey && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: worktime_module_css_default.itemLink,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: task.itemKey }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoLinkButton, { itemKey: task.itemKey })]
								}),
								task.skipped?.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
									worktimeText.skippedFields,
									"：",
									task.skipped.join("、")
								] }) : null
							]
						}, task.itemKey || i))] }),
						rangeCount > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: worktime_module_css_default.stageHeading,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: worktimeText.currentStages }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
									worktimeText.total,
									" ",
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: total }),
									" / ",
									count,
									" ",
									worktimeText.personDays,
									total < count - 1e-6 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
										" · ",
										worktimeText.unallocated,
										" ",
										Number((count - total).toFixed(2))
									] })
								] })]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: worktime_module_css_default.help,
								children: worktimeText.splitHint
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: worktime_module_css_default.stages,
								children: stages.map((stage) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: worktime_module_css_default.stageRow,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [worktimeText.stageLabels[stage], /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										type: "number",
										min: "0.5",
										step: "0.5",
										inputMode: "decimal",
										placeholder: "0",
										disabled: busy,
										"aria-label": `${worktimeText.stageLabels[stage]} ${worktimeText.personDays}`,
										value: drafts[stage].days,
										onChange: (event) => setDrafts((current) => ({
											...current,
											[stage]: {
												...current[stage],
												days: event.target.value
											}
										}))
									})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [worktimeText.taskTitle, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										value: drafts[stage].title,
										disabled: busy,
										"aria-label": `${worktimeText.stageLabels[stage]} ${worktimeText.taskTitle}`,
										onChange: (event) => setDrafts((current) => ({
											...current,
											[stage]: {
												...current[stage],
												title: event.target.value
											}
										}))
									})] })]
								}, stage))
							}),
							over && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
								className: worktime_module_css_default.error,
								role: "alert",
								children: [
									worktimeText.overAllocate,
									"：",
									total,
									" > ",
									count,
									" ",
									worktimeText.personDays
								]
							})
						] }),
						hasCreated && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: worktime_module_css_default.notice,
							children: worktimeText.locked
						}),
						retried && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: worktime_module_css_default.notice,
							children: worktimeText.retryHint
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: confirmRetry,
							disabled: busy,
							onChange: (event) => setConfirmRetry(event.target.checked)
						}), worktimeText.confirmRetry] })] }),
						historyUnits.flatMap((unit) => unit.tasks).filter((task) => task.status !== "created").map((task, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.result,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: task.title }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
									task.start,
									" — ",
									task.end,
									" · ",
									task.days,
									" ",
									worktimeText.personDays,
									" · ",
									task.status === "pending" ? worktimeText.pending : worktimeText.uncertain
								] }),
								task.itemKey && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: worktime_module_css_default.itemLink,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: task.itemKey }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoLinkButton, { itemKey: task.itemKey })]
								}),
								task.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: worktime_module_css_default.error,
									children: task.error
								})
							]
						}, i)),
						error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							role: "alert",
							className: worktime_module_css_default.error,
							children: error
						})
					]
				})
			});
		}
		/** Task changes always persist to Tomato; requirement ranges stay in the calendar. */
		function TaskEditor({ task, readOnly, busy: calendarBusy, onClose, onMutate, onNotify, onBugCountChange }) {
			const [start, setStart] = (0, react.useState)(task.start);
			const [end, setEnd] = (0, react.useState)(task.end);
			const [confirmDelete, setConfirmDelete] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)("");
			const [linking, setLinking] = (0, react.useState)(false);
			const busy = calendarBusy || linking;
			const statusLabel = {
				created: "已创建",
				pending: "待创建",
				creating: "创建中",
				uncertain: "待核对"
			}[task.status] ?? task.status;
			async function submit(action) {
				if (action === "delete" && !confirmDelete) {
					setConfirmDelete(true);
					return;
				}
				setError("");
				try {
					await onMutate(task, action, {
						start,
						end
					});
				} catch (error) {
					setError(errorText(error));
				}
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open: true,
				title: `${worktimeText.task} · ${task.itemKey}`,
				description: task.title,
				closeLabel: worktimeText.close,
				onClose: () => {
					if (!busy) onClose();
				},
				className: worktime_module_css_default.taskDialog,
				footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "ghost",
					disabled: busy,
					onClick: onClose,
					children: worktimeText.close
				}), !readOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "outline",
					disabled: busy,
					onClick: () => void submit("delete"),
					children: confirmDelete ? worktimeText.confirmDelete : worktimeText.deleteTask
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "primary",
					disabled: busy || !daysIn(start, end) || start === task.start && end === task.end,
					onClick: () => void submit("move"),
					children: busy ? worktimeText.saving : worktimeText.saveTaskDates
				})] })] }),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: worktime_module_css_default.form,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.unitSummary,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								task.days,
								" ",
								worktimeText.personDays,
								statusLabel && ` · ${statusLabel}`
							] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoLinkButton, { itemKey: task.itemKey })]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: worktime_module_css_default.twoColumns,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [worktimeText.start, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								type: "date",
								value: start,
								disabled: readOnly || busy,
								onChange: (event) => setStart(event.target.value)
							})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [worktimeText.end, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								type: "date",
								min: start,
								value: end,
								disabled: readOnly || busy,
								onChange: (event) => setEnd(event.target.value)
							})] })]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TaskBugs, {
							itemKey: task.itemKey,
							readOnly,
							disabled: calendarBusy,
							request: api,
							onBusyChange: setLinking,
							onNotify,
							onCountChange: onBugCountChange
						}),
						confirmDelete && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: worktime_module_css_default.notice,
							children: worktimeText.taskDeleteHint
						}),
						error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							role: "alert",
							className: worktime_module_css_default.error,
							children: error
						})
					]
				})
			});
		}
		//#endregion
		//#region src/client/board-cache.ts
		const prefix = "taskboard.tomatoItems.v1:";
		const textFields = [
			"itemKey",
			"title",
			"status",
			"itemType",
			"workspace",
			"workspaceKey",
			"workspaceName",
			"creator",
			"createdAt",
			"priority",
			"tomatoUrl"
		];
		function browserStorage() {
			try {
				return typeof window === "undefined" ? null : window.localStorage;
			} catch {
				return null;
			}
		}
		/** Each assignee has a separate last-successful snapshot; invalid caches never block loading. */
		function readBoardCache(assignee, storage = browserStorage()) {
			try {
				const raw = storage?.getItem(prefix + encodeURIComponent(assignee));
				if (!raw) return null;
				const value = JSON.parse(raw);
				if (!value || value.version !== 1 || typeof value.truncated !== "boolean" || !Number.isFinite(value.updatedAt) || !Array.isArray(value.items) || value.items.length > 2e4) return null;
				if (!value.items.every((item) => item && textFields.every((field) => typeof item[field] === "string") && Array.isArray(item.assignees) && item.assignees.every((owner) => typeof owner === "string"))) return null;
				return value;
			} catch {
				return null;
			}
		}
		/** Failed requests must not replace the last successful snapshot. */
		function writeBoardCache(assignee, data, storage = browserStorage()) {
			try {
				storage?.setItem(prefix + encodeURIComponent(assignee), JSON.stringify({
					...data,
					version: 1,
					updatedAt: Date.now()
				}));
			} catch {}
		}
		//#endregion
		//#region src/client/TomatoBoard.tsx
		const initialCache = readBoardCache("currentUser()");
		let state = {
			open: false,
			loading: false,
			loaded: false,
			items: initialCache?.items ?? [],
			error: null,
			successMessage: null,
			selectedItem: null,
			truncated: initialCache?.truncated ?? false,
			assignee: "currentUser()",
			showingCache: initialCache !== null
		};
		let refreshSequence = 0;
		let refreshController = null;
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
		const TOMATO_ITEM_KEY_PATTERN = /^\[([A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-\d+)\]/u;
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
		const TOMATO_SEARCH_KEY = "taskboard.tomatoSearch.v1";
		const TOMATO_SESSION_LINKS_KEY = "taskboard.tomatoSessionLinks.v1";
		const TOMATO_MUTED_ITEMS_KEY = "taskboard.tomatoMutedItems.v1";
		const TOMATO_LANE_ORDER_KEY = "taskboard.tomatoLaneOrder.v1";
		function readLaneOrder() {
			try {
				const value = JSON.parse(window.localStorage.getItem(TOMATO_LANE_ORDER_KEY) ?? "{}");
				return {
					head: typeof value?.head === "string" ? value.head : null,
					next: value?.next && typeof value.next === "object" ? value.next : {}
				};
			} catch {
				return {
					head: null,
					next: {}
				};
			}
		}
		function laneOrderValues(order) {
			const values = [];
			const seen = /* @__PURE__ */ new Set();
			let current = order.head;
			while (current && !seen.has(current) && values.length < 1e3) {
				values.push(current);
				seen.add(current);
				current = order.next[current] ?? null;
			}
			return values;
		}
		function createLaneOrder(values) {
			const next = {};
			values.forEach((value, index) => {
				next[value] = values[index + 1] ?? null;
			});
			return {
				head: values[0] ?? null,
				next
			};
		}
		function applyLaneOrder(statuses, order) {
			const available = new Set(statuses);
			const tracked = laneOrderValues(order).filter((status) => available.has(status));
			const trackedSet = new Set(tracked);
			return [...tracked, ...statuses.filter((status) => !trackedSet.has(status))];
		}
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
			return typeof value === "string" && value ? value : "";
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
					statuses: new Set(Array.isArray(value?.statuses) ? value.statuses.filter((item) => typeof item === "string") : []),
					workspaces: new Set(Array.isArray(value?.workspaces) ? value.workspaces.filter((item) => typeof item === "string") : [])
				};
			} catch {
				return {
					types: /* @__PURE__ */ new Set(),
					statuses: /* @__PURE__ */ new Set(),
					workspaces: /* @__PURE__ */ new Set()
				};
			}
		}
		function readMutedItems() {
			try {
				const value = JSON.parse(window.localStorage.getItem(TOMATO_MUTED_ITEMS_KEY) ?? "[]");
				return new Set(Array.isArray(value) ? value.filter((item) => typeof item === "string") : []);
			} catch {
				return /* @__PURE__ */ new Set();
			}
		}
		function readSearch() {
			try {
				return window.localStorage.getItem(TOMATO_SEARCH_KEY) ?? "";
			} catch {
				return "";
			}
		}
		function saveSearch(value) {
			try {
				if (value) window.localStorage.setItem(TOMATO_SEARCH_KEY, value);
				else window.localStorage.removeItem(TOMATO_SEARCH_KEY);
			} catch {}
		}
		async function refresh(assignee = "currentUser()") {
			const sequence = ++refreshSequence;
			refreshController?.abort();
			const controller = new AbortController();
			refreshController = controller;
			const cached = readBoardCache(assignee);
			const changedOwner = state.assignee !== assignee;
			emit({
				loading: true,
				error: null,
				successMessage: null,
				assignee,
				selectedItem: null,
				showingCache: changedOwner ? cached !== null : state.items.length > 0 || cached !== null,
				...changedOwner || !state.items.length ? {
					items: cached?.items ?? [],
					truncated: cached?.truncated ?? false,
					showingCache: cached !== null
				} : {}
			});
			try {
				const query = new URLSearchParams({ assignee });
				const response = await fetch(`/api/tomato-board/items?${query}`, {
					signal: controller.signal,
					headers: { accept: "application/json" }
				});
				const body = await response.json();
				if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`);
				if (sequence !== refreshSequence || controller.signal.aborted) return;
				if (!Array.isArray(body.items)) throw new Error("番茄事项返回格式异常");
				writeBoardCache(assignee, {
					items: body.items,
					truncated: body.truncated === true
				});
				emit({
					items: body.items,
					truncated: body.truncated === true,
					loaded: true,
					showingCache: false,
					successMessage: `已刷新 ${body.items.length} 条事项`
				});
			} catch (error) {
				if (sequence === refreshSequence && !controller.signal.aborted) emit({ error: error instanceof Error ? error.message : "番茄事项读取失败" });
			} finally {
				if (sequence === refreshSequence) {
					emit({ loading: false });
					refreshController = null;
				}
			}
		}
		function dismissSuccessMessage() {
			emit({ successMessage: null });
		}
		function closeWorkbench(ctx) {
			refreshSequence += 1;
			refreshController?.abort();
			refreshController = null;
			emit({
				open: false,
				loading: false,
				selectedItem: null,
				loaded: false,
				error: null,
				successMessage: null
			});
			ctx.layout.selectPanel(null);
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
		function TomatoBoardTopbarAction({ openWorkbench }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				className: tomato_board_module_css_default.topbarAction,
				type: "button",
				title: "打开番茄工作台",
				onClick: openWorkbench,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: tomato_board_module_css_default.tomatoIcon,
					"aria-hidden": "true",
					children: "T"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "番茄工作台" })]
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
					closeWorkbench(ctx);
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
			const filterMenuRef = (0, react.useRef)(null);
			const [page, setPage] = (0, react.useState)("board");
			const [visitedTabs, setVisitedTabs] = (0, react.useState)({
				pr: false,
				team: false
			});
			const [teamToolbar, setTeamToolbar] = (0, react.useState)(null);
			const [search, setSearch] = (0, react.useState)(readSearch);
			const [blacklist, setBlacklist] = (0, react.useState)(readFilterBlacklist);
			const [mutedItems, setMutedItems] = (0, react.useState)(readMutedItems);
			const [copyNotice, setCopyNotice] = (0, react.useState)(null);
			const [selectedAssignee, setSelectedAssignee] = (0, react.useState)(() => state.assignee);
			const [filterDirectory, setFilterDirectory] = (0, react.useState)({
				users: [],
				workspaces: []
			});
			const [directoryVersion, setDirectoryVersion] = (0, react.useState)(0);
			const [laneOrder, setLaneOrder] = (0, react.useState)(readLaneOrder);
			const [draggedLane, setDraggedLane] = (0, react.useState)(null);
			const [dropLane, setDropLane] = (0, react.useState)(null);
			const laneElements = (0, react.useRef)(/* @__PURE__ */ new Map());
			const previousLanePositions = (0, react.useRef)(/* @__PURE__ */ new Map());
			const sessions = (0, react.useSyncExternalStore)((listener) => ctx.sessions.list.subscribe(listener), () => ctx.sessions.list.getSnapshot(), () => ctx.sessions.list.getSnapshot());
			(0, react.useEffect)(() => {
				if (board.open && !board.loaded && !board.loading && !board.error) refresh(selectedAssignee);
			}, [
				board.error,
				board.loaded,
				board.loading,
				board.open,
				selectedAssignee
			]);
			(0, react.useEffect)(() => {
				if (!board.open) return;
				fetch("/api/tomato-board/filters", { headers: { accept: "application/json" } }).then((response) => response.ok ? response.json() : Promise.reject(/* @__PURE__ */ new Error(`HTTP ${response.status}`))).then((value) => setFilterDirectory(value)).catch(() => {});
			}, [board.open, directoryVersion]);
			(0, react.useEffect)(() => {
				if (!board.open) return;
				const closeOnOutsideNavigation = (event) => {
					if (!(event.target instanceof Element)) return;
					if (workbenchRef.current?.contains(event.target)) return;
					if (event.target.closest("[role=\"dialog\"], [role=\"menu\"]")) return;
					if (event.target.closest("[role=\"presentation\"]")?.querySelector("[role=\"dialog\"][aria-modal=\"true\"]")) return;
					closeWorkbench(ctx);
				};
				document.addEventListener("pointerdown", closeOnOutsideNavigation, true);
				return () => document.removeEventListener("pointerdown", closeOnOutsideNavigation, true);
			}, [board.open]);
			(0, react.useEffect)(() => {
				const closeFilterMenu = (event) => {
					const menu = filterMenuRef.current;
					if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) menu.open = false;
				};
				const closeFilterMenuOnEscape = (event) => {
					if (event.key === "Escape" && filterMenuRef.current?.open) filterMenuRef.current.open = false;
				};
				document.addEventListener("pointerdown", closeFilterMenu, true);
				document.addEventListener("keydown", closeFilterMenuOnEscape);
				return () => {
					document.removeEventListener("pointerdown", closeFilterMenu, true);
					document.removeEventListener("keydown", closeFilterMenuOnEscape);
				};
			}, []);
			(0, react.useLayoutEffect)(() => {
				const previous = previousLanePositions.current;
				if (previous.size === 0) return;
				if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
					previous.clear();
					return;
				}
				for (const [status, element] of laneElements.current) {
					const before = previous.get(status);
					if (!before) continue;
					const after = element.getBoundingClientRect();
					const deltaX = before.left - after.left;
					const deltaY = before.top - after.top;
					if (deltaX || deltaY) element.animate([{ transform: `translate(${deltaX}px, ${deltaY}px)` }, { transform: "translate(0, 0)" }], {
						duration: 240,
						easing: "cubic-bezier(.2,.8,.2,1)"
					});
				}
				previous.clear();
			}, [laneOrder]);
			if (!board.open) return null;
			function openItem(item) {
				const stored = linkedSessionId(item.itemKey);
				const titlePrefix = `[${item.itemKey}]`;
				const hasConversation = (id) => sessions.byId[id]?.blank === false;
				const discovered = sessions.ids.find((id) => {
					const summary = sessions.byId[id];
					return (summary?.title?.startsWith(titlePrefix) === true || summary?.displayTitle?.startsWith(titlePrefix) === true) && hasConversation(id);
				});
				const associated = stored && hasConversation(stored) ? stored : discovered;
				if (associated) {
					saveSessionLink(item.itemKey, associated);
					ctx.sessions.open(associated);
					closeWorkbench(ctx);
					return;
				}
				emit({ selectedItem: item });
			}
			const normalizedSearch = search.trim().toLowerCase();
			const filteredItems = board.items.filter((item) => !blacklist.types.has(item.itemType) && !blacklist.statuses.has(item.status) && !blacklist.workspaces.has(item.workspaceKey) && !blacklist.workspaces.has(item.workspaceName) && (!normalizedSearch || [
				item.itemKey,
				item.title,
				item.itemType,
				item.status,
				item.workspaceKey,
				item.workspaceName,
				item.creator,
				item.assignees.join(" "),
				item.priority
			].join(" ").toLowerCase().includes(normalizedSearch)));
			const typeOptions = [...new Set(board.items.map((item) => item.itemType).filter(Boolean))].sort((left, right) => left.localeCompare(right));
			const statusOptions = applyLaneOrder([...new Set([...TOMATO_STATUS_ORDER, ...board.items.map((item) => item.status).filter((status) => !TOMATO_STATUS_ORDER.includes(status))])], laneOrder);
			const workspaceOptions = (() => {
				const entries = /* @__PURE__ */ new Map();
				for (const item of board.items) {
					const value = item.workspaceKey || item.workspaceName || item.workspace;
					if (!value) continue;
					const label = item.workspaceName && item.workspaceKey && item.workspaceName !== item.workspaceKey ? `${item.workspaceName} (${item.workspaceKey})` : value;
					if (!entries.has(value)) entries.set(value, {
						value,
						label
					});
				}
				return [...entries.values()];
			})();
			const defaultStatuses = [...new Set([...TOMATO_STATUS_ORDER.filter((status) => filteredItems.some((item) => item.status === status)), ...filteredItems.map((item) => item.status).filter((status) => !TOMATO_STATUS_ORDER.includes(status))])];
			const statuses = applyLaneOrder(defaultStatuses, laneOrder);
			const persistBlacklist = (next) => {
				window.localStorage.setItem(TOMATO_FILTER_BLACKLIST_KEY, JSON.stringify({
					types: [...next.types],
					statuses: [...next.statuses],
					workspaces: [...next.workspaces]
				}));
				return next;
			};
			const toggleBlacklist = (kind, value) => setBlacklist((current) => {
				const nextValues = new Set(current[kind]);
				if (nextValues.has(value)) nextValues.delete(value);
				else nextValues.add(value);
				return persistBlacklist({
					...current,
					[kind]: nextValues
				});
			});
			const setWorkspaceFilterAll = (visible) => setBlacklist((current) => persistBlacklist({
				...current,
				workspaces: visible ? /* @__PURE__ */ new Set() : new Set(workspaceOptions.map((option) => option.value))
			}));
			const toggleMutedItem = (itemKey) => setMutedItems((current) => {
				const next = new Set(current);
				if (next.has(itemKey)) next.delete(itemKey);
				else next.add(itemKey);
				window.localStorage.setItem(TOMATO_MUTED_ITEMS_KEY, JSON.stringify([...next]));
				return next;
			});
			const moveLane = (dragged, target, after) => {
				if (dragged === target) return;
				previousLanePositions.current = new Map([...laneElements.current].map(([status, element]) => [status, element.getBoundingClientRect()]));
				setLaneOrder((current) => {
					const visible = applyLaneOrder(defaultStatuses, current).filter((status) => status !== dragged);
					const targetIndex = visible.indexOf(target);
					visible.splice(targetIndex + (after ? 1 : 0), 0, dragged);
					const previousTracked = laneOrderValues(current);
					const trackedSet = new Set([
						...previousTracked,
						dragged,
						target
					]);
					const hiddenTracked = previousTracked.filter((status) => !visible.includes(status));
					const next = createLaneOrder([...visible.filter((status) => trackedSet.has(status)), ...hiddenTracked]);
					window.localStorage.setItem(TOMATO_LANE_ORDER_KEY, JSON.stringify(next));
					return next;
				});
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				ref: workbenchRef,
				className: tomato_board_module_css_default.workbench,
				"aria-label": "番茄工作台",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
						className: tomato_board_module_css_default.header,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: tomato_board_module_css_default.titleRow,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: "番茄工作台" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: tomato_board_module_css_default.actions,
								children: [
									page === "team" && teamToolbar,
									page === "board" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
											className: tomato_board_module_css_default.searchField,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												"aria-hidden": "true",
												children: "⌕"
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "search",
												value: search,
												onChange: (event) => {
													const value = event.target.value;
													setSearch(value);
													saveSearch(value);
												},
												placeholder: "搜索标题或 tag…",
												"aria-label": "搜索标题或 tag"
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
											ref: filterMenuRef,
											className: tomato_board_module_css_default.filterMenu,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("summary", {
												"aria-label": "空间、负责人、类型和状态筛选",
												title: "空间、负责人、类型和状态筛选",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													"aria-hidden": "true",
													children: "▽"
												}), (blacklist.types.size > 0 || blacklist.statuses.size > 0 || blacklist.workspaces.size > 0 || selectedAssignee !== "currentUser()") && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {})]
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: tomato_board_module_css_default.filterPopover,
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)(WorkspaceFilterRow, {
														options: workspaceOptions,
														hidden: blacklist.workspaces,
														onToggle: (value) => toggleBlacklist("workspaces", value),
														onSetAll: setWorkspaceFilterAll
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)(AssigneePicker, {
														users: filterDirectory.users,
														value: selectedAssignee,
														onChange: (value) => {
															setSelectedAssignee(value);
															refresh(value);
														}
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)(FilterRow, {
														label: "类型",
														options: typeOptions,
														hidden: blacklist.types,
														onToggle: (value) => toggleBlacklist("types", value)
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)(FilterRow, {
														label: "状态",
														options: statusOptions,
														hidden: blacklist.statuses,
														onToggle: (value) => toggleBlacklist("statuses", value)
													})
												]
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
											onClick: () => {
												refresh(selectedAssignee);
												setDirectoryVersion((value) => value + 1);
											}
										})
									] }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										variant: "toolbar",
										size: "sm",
										className: tomato_board_module_css_default.headerIconButton,
										icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCloseOutline16, {}),
										title: "关闭番茄工作台",
										"aria-label": "关闭番茄工作台",
										onClick: () => closeWorkbench(ctx)
									})
								]
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("nav", {
							className: tomato_board_module_css_default.pageTabs,
							"aria-label": "番茄工作台页面",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-current": page === "board" ? "page" : void 0,
									onClick: () => setPage("board"),
									children: "事项看板"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-current": page === "worktime" ? "page" : void 0,
									onClick: () => setPage("worktime"),
									children: worktimeText.title
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-current": page === "pr" ? "page" : void 0,
									onClick: () => {
										setVisitedTabs((current) => ({
											...current,
											pr: true
										}));
										setPage("pr");
									},
									children: "PR 助手"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-current": page === "team" ? "page" : void 0,
									onClick: () => {
										setVisitedTabs((current) => ({
											...current,
											team: true
										}));
										setPage("team");
									},
									children: "团队管理"
								})
							]
						})]
					}),
					visitedTabs.pr && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: tomato_board_module_css_default.tabPanel,
						hidden: page !== "pr",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrAssistant, {
							active: page === "pr",
							ctx,
							close: () => closeWorkbench(ctx)
						})
					}),
					visitedTabs.team && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: tomato_board_module_css_default.tabPanel,
						hidden: page !== "team",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TeamManagement, {
							active: page === "team",
							toolbarTarget: setTeamToolbar,
							onOpenItem: openItem
						})
					}),
					page === "worktime" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Worktime, {
						assignee: selectedAssignee,
						users: filterDirectory.users,
						onAssigneeChange: (value) => {
							setSelectedAssignee(value);
							refresh(value);
						},
						onRefresh: () => {
							refresh(selectedAssignee);
						}
					}, selectedAssignee) : page === "board" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						board.successMessage && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Toast, {
							text: board.successMessage,
							anchor: workbenchRef.current,
							holdMs: 1500,
							onDone: dismissSuccessMessage
						}),
						copyNotice && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Toast, {
							text: copyNotice.text,
							anchor: workbenchRef.current,
							holdMs: 1800,
							onDone: () => setCopyNotice(null)
						}, copyNotice.id),
						board.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: tomato_board_module_css_default.error,
							role: "alert",
							children: board.error
						}),
						board.showingCache && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: tomato_board_module_css_default.notice,
							role: "status",
							children: board.loading ? "正在显示上次缓存，后台更新中…" : "当前显示上次缓存，刷新成功后会自动更新。"
						}),
						board.loading && board.items.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: tomato_board_module_css_default.empty,
							role: "status",
							children: "正在读取事项…"
						}),
						board.truncated && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
							className: tomato_board_module_css_default.notice,
							role: "status",
							children: [
								"事项数量已达配置上限，当前仅展示前 ",
								board.items.length,
								" 条。"
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: tomato_board_module_css_default.board,
							children: [statuses.map((status) => {
								const items = filteredItems.filter((item) => item.status === status).sort((left, right) => right.createdAt.localeCompare(left.createdAt));
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
									ref: (element) => {
										if (element) laneElements.current.set(status, element);
										else laneElements.current.delete(status);
									},
									className: `${tomato_board_module_css_default.lane} ${draggedLane === status ? tomato_board_module_css_default.laneDragging : ""} ${dropLane?.status === status ? dropLane.after ? tomato_board_module_css_default.laneDropAfter : tomato_board_module_css_default.laneDropBefore : ""}`,
									"aria-labelledby": `tomato-lane-${status}`,
									onDragOver: (event) => {
										if (!draggedLane || draggedLane === status) return;
										event.preventDefault();
										const bounds = event.currentTarget.getBoundingClientRect();
										setDropLane({
											status,
											after: event.clientX >= bounds.left + bounds.width / 2
										});
									},
									onDrop: (event) => {
										event.preventDefault();
										if (draggedLane && dropLane?.status === status) moveLane(draggedLane, status, dropLane.after);
										setDraggedLane(null);
										setDropLane(null);
									},
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
										className: tomato_board_module_css_default.laneHeader,
										draggable: true,
										title: "拖拽调整泳道顺序",
										onDragStart: (event) => {
											event.dataTransfer.effectAllowed = "move";
											event.dataTransfer.setData("text/plain", status);
											const lane = event.currentTarget.parentElement;
											if (lane) {
												const bounds = lane.getBoundingClientRect();
												event.dataTransfer.setDragImage(lane, Math.min(Math.max(event.clientX - bounds.left, 0), bounds.width), Math.min(Math.max(event.clientY - bounds.top, 0), bounds.height));
											}
											setDraggedLane(status);
										},
										onDragEnd: () => {
											setDraggedLane(null);
											setDropLane(null);
										},
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
											id: `tomato-lane-${status}`,
											children: status
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: items.length })]
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: tomato_board_module_css_default.cards,
										children: items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
											className: `${tomato_board_module_css_default.card} ${mutedItems.has(item.itemKey) ? tomato_board_module_css_default.cardMuted : ""}`,
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
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
														className: tomato_board_module_css_default.cardIdentity,
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: tomato_board_module_css_default.key,
															children: item.itemKey
														}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
															className: tomato_board_module_css_default.copyButton,
															variant: "ghost",
															size: "sm",
															title: "复制事项编号",
															"aria-label": `复制事项编号 ${item.itemKey}`,
															onClick: async (event) => {
																event.stopPropagation();
																const copied = await (0, _deepseek_ai_dsh_client_ui_primitives.writeClipboard)(item.itemKey);
																dismissSuccessMessage();
																setCopyNotice((current) => ({
																	id: (current?.id ?? 0) + 1,
																	text: copied ? `已复制 ${item.itemKey}` : "复制失败，请手动复制事项编号"
																}));
															},
															onKeyDown: (event) => event.stopPropagation(),
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCopyOutline16, { size: 14 })
														})]
													}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
														className: tomato_board_module_css_default.cardButtons,
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
															className: tomato_board_module_css_default.muteButton,
															variant: "ghost",
															size: "sm",
															title: mutedItems.has(item.itemKey) ? "取消置灰" : "置灰标记",
															"aria-label": mutedItems.has(item.itemKey) ? `取消置灰 ${item.itemKey}` : `置灰 ${item.itemKey}`,
															"aria-pressed": mutedItems.has(item.itemKey),
															onClick: (event) => {
																event.stopPropagation();
																toggleMutedItem(item.itemKey);
															},
															onKeyDown: (event) => event.stopPropagation(),
															children: "●"
														}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoLinkButton, { itemKey: item.itemKey })]
													})]
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: item.title }),
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: tomato_board_module_css_default.cardMeta,
													children: [
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Tag, {
															tone: typeTone(item.itemType),
															children: item.itemType
														}),
														(item.workspaceName || item.workspaceKey) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Tag, {
															title: "空间",
															children: item.workspaceName && item.workspaceKey && item.workspaceName !== item.workspaceKey ? `${item.workspaceName} (${item.workspaceKey})` : item.workspaceKey || item.workspaceName
														}),
														item.priority && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Tag, {
															title: "优先级",
															children: priorityLabel(item.priority)
														}),
														item.creator && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Tag, {
															title: "创建人",
															children: ["创建 ", item.creator]
														})
													]
												})
											]
										}, item.itemKey))
									})]
								}, status);
							}), !board.loading && !board.error && statuses.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: tomato_board_module_css_default.empty,
								children: "当前没有可显示的番茄事项"
							})]
						})
					] }) : null,
					board.selectedItem ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CreateConversationDialog, {
						ctx,
						item: board.selectedItem
					}) : null
				]
			});
		}
		const PRIORITY_LABELS = {
			"69e65065-4b34-4109-bca9-0154e548554a": "P0",
			"8f7912a5-9176-4a79-a269-2269ac42b5a2": "P1",
			"ca8c3e43-3e7b-444d-8940-d0967d944921": "P2",
			"ec31e4c1-b55b-479d-be97-86d5f7bf38ef": "P2",
			"1a3e1092-7d70-42ee-ad38-0e8d953c4c23": "P3",
			"faae52da-28c8-46fc-96dd-db9cdb28b557": "P4"
		};
		const priorityLabel = (value) => PRIORITY_LABELS[value] ?? value;
		const TYPE_TONES = {
			Story: "#2f7d72",
			EnablerStory: "#2777a8",
			Task: "#7b61a8",
			Bug: "#c34f43",
			缺陷: "#c34f43",
			测试缺陷: "#d06438",
			Epic: "#9a6b24",
			Feature: "#3f68ad"
		};
		function typeTone(type) {
			if (TYPE_TONES[type]) return TYPE_TONES[type];
			const palette = [
				"#2f7d72",
				"#2777a8",
				"#7b61a8",
				"#c34f43",
				"#9a6b24",
				"#51753a",
				"#a14f78"
			];
			return palette[[...type].reduce((hash, char) => hash + char.charCodeAt(0), 0) % palette.length];
		}
		function FilterRow({ label, options, hidden, onToggle }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: tomato_board_module_css_default.filterRow,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: options.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Tag, {
					interactive: true,
					pressed: !hidden.has(option),
					tone: label === "类型" ? typeTone(option) : void 0,
					onClick: () => onToggle(option),
					children: option
				}, option)) })]
			});
		}
		const WORKSPACE_SELECT_ALL = "workspace:select-all";
		const WORKSPACE_SELECT_NONE = "workspace:select-none";
		/** Multi-select workspace dropdown composed on the shared Menu primitive. */
		function WorkspaceFilterRow({ options, hidden, onToggle, onSetAll }) {
			const [open, setOpen] = (0, react.useState)(false);
			const rootRef = (0, react.useRef)(null);
			const visibleValues = options.filter((option) => !hidden.has(option.value)).map((option) => option.value);
			const summary = options.length === 0 ? "暂无空间" : hidden.size === 0 ? `全部空间 · ${options.length}` : visibleValues.length === 0 ? "未选择空间" : `已选空间 ${visibleValues.length} / ${options.length}`;
			(0, react.useEffect)(() => {
				if (!open) return;
				const onKey = (event) => {
					if (event.key === "Escape") {
						event.stopPropagation();
						setOpen(false);
					}
				};
				const root = rootRef.current;
				root?.addEventListener("keydown", onKey, true);
				return () => root?.removeEventListener("keydown", onKey, true);
			}, [open]);
			const items = options.map((option) => ({
				id: option.value,
				label: option.label
			}));
			const footer = [{
				id: WORKSPACE_SELECT_ALL,
				label: "全部显示"
			}, {
				id: WORKSPACE_SELECT_NONE,
				label: "全部隐藏"
			}];
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: tomato_board_module_css_default.filterRow,
				ref: rootRef,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "空间" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: tomato_board_module_css_default.workspaceSelect,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
						open,
						items,
						footer,
						selectedIds: visibleValues,
						onSelect: (id) => {
							if (id === WORKSPACE_SELECT_ALL) onSetAll(true);
							else if (id === WORKSPACE_SELECT_NONE) onSetAll(false);
							else onToggle(id);
						},
						onClose: () => {
							setOpen(false);
						},
						anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: tomato_board_module_css_default.workspaceTrigger,
							"aria-expanded": open,
							title: summary,
							onClick: () => {
								setOpen(!open);
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: summary }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {
								className: tomato_board_module_css_default.workspaceChevron,
								"aria-hidden": true,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, {})
							})]
						})
					})
				})]
			});
		}
		function TomatoConversationShortcut({ ctx, sessionId, useSessions }) {
			const itemKey = useSessions((state) => {
				const summary = state.byId[sessionId];
				const title = summary?.title ?? summary?.displayTitle ?? "";
				const match = TOMATO_ITEM_KEY_PATTERN.exec(title)?.[1]?.trim();
				if (!match) return "";
				return linkedSessionId(match) === sessionId ? match : "";
			});
			const [menuOpen, setMenuOpen] = (0, react.useState)(false);
			const [loading, setLoading] = (0, react.useState)(false);
			const [transitioning, setTransitioning] = (0, react.useState)(false);
			const [transitionState, setTransitionState] = (0, react.useState)({
				currentStatus: "",
				tomatoUrl: "",
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
					tomatoUrl: "",
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
						tomatoUrl: body.tomatoUrl || "",
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
						tomatoUrl: transitionsBody.tomatoUrl || "",
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
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoLinkButton, {
				itemKey,
				disabled: !transitionState.tomatoUrl
			})] });
		}
		const inject = [
			"slots",
			"layout",
			"sessions",
			"workspaces",
			"remote",
			"remote.session"
		];
		function apply(ctx) {
			ctx.slots.inject("main", () => ctx.slots.register({
				name: "main",
				key: "tomato-board",
				id: "tomato-board-panel"
			}, () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoBoardPanel, { ctx })));
			const openWorkbench = () => {
				emit({
					open: true,
					loaded: false,
					error: null
				});
				ctx.layout.selectPanel("tomato-board");
			};
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
				openWorkbench
			})));
			ctx.slots.inject("conversation.session.header.actions", () => ctx.slots.register({
				name: "conversation.session.header.actions",
				id: "tomato-board-topbar",
				order: 11
			}, () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoBoardTopbarAction, { openWorkbench })));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map