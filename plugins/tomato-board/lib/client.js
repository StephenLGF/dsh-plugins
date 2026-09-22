window.__ModuleLoader__.load({
	id: "@stephen1620/dsh-tomato-board",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region ../../../../../../Users/gengfeng/deepseek-harness/packages/core/session/src/types.ts
		/**
		* Brand a string as a {@link SessionId}.
		* @param id - the raw session id string.
		* @returns the same string, branded (a compile-time cast — no runtime cost).
		*/
		function SessionId(id) {
			return id;
		}
		//#endregion
		//#region \0dsh-css:/Users/gengfeng/dsh-tomato-board/plugins/tomato-board/src/client/tomato-board.module.css.mjs
		const css$2 = "._9lHw_W_sidebarAction{width:100%;min-height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;white-space:nowrap;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out);background:0 0;border:0;border-radius:10px;align-items:center;gap:9px;margin:0;padding:0 10px;display:flex}._9lHw_W_sidebarAction:hover{background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_topbarAction{border:1px solid var(--dsw-alias-border-l2);min-height:28px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);cursor:pointer;font:inherit;white-space:nowrap;border-radius:8px;align-items:center;gap:7px;padding:4px 9px;font-size:12px;font-weight:600;display:inline-flex}._9lHw_W_topbarAction:hover{border-color:color-mix(in srgb, var(--tomato-accent,var(--dsw-alias-state-error-primary)) 45%, var(--dsw-alias-border-l2));background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_topbarAction:focus-visible{outline:2px solid var(--tomato-accent,var(--dsw-alias-state-error-primary));outline-offset:2px}._9lHw_W_topbarAction ._9lHw_W_tomatoIcon{border-radius:5px;width:16px;height:16px;font-size:10px}._9lHw_W_tomatoIcon{width:18px;height:18px;color:var(--dsw-alias-label-primary-inverted);background:var(--tomato-accent,var(--dsw-alias-state-error-primary));border-radius:6px;flex:none;place-items:center;font-size:11px;font-weight:750;display:inline-grid}._9lHw_W_transitionTrigger{align-items:center;gap:6px;display:inline-flex}._9lHw_W_transitionCaption{color:var(--dsw-alias-label-secondary);font-size:12px}._9lHw_W_transitionTrigger strong{color:var(--dsw-alias-label-primary);font-size:12px;font-weight:650}._9lHw_W_transitionDivider{background:var(--dsw-alias-border-l2);width:1px;height:14px;margin:0 2px}._9lHw_W_transitionAction{color:var(--tomato-accent,var(--dsw-alias-state-business-primary));font-size:12px;font-weight:650}._9lHw_W_transitionChevron{color:var(--tomato-accent,var(--dsw-alias-state-business-primary));transition:transform var(--ds-transition-duration-fast) var(--ds-ease-in-out)}._9lHw_W_transitionTrigger[aria-expanded=true] ._9lHw_W_transitionChevron{transform:rotate(180deg)}._9lHw_W_workbench{--tomato-accent:var(--dsw-alias-state-business-primary,#3478c8);--tomato-accent-soft:color-mix(in srgb, var(--tomato-accent) 12%, transparent);--tomato-accent-border:color-mix(in srgb, var(--tomato-accent) 48%, var(--dsw-alias-border-l2));width:100%;height:100%;min-height:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-family:var(--dsw-font-family);border-left:1px solid var(--dsw-alias-border-l2);flex-direction:column;display:flex;position:relative;overflow:hidden}._9lHw_W_createDialog{width:min(480px,100%)}._9lHw_W_dialogBody{flex-direction:column;gap:12px;display:flex}._9lHw_W_dialogBody>span{color:var(--tomato-accent,var(--dsw-alias-state-error-primary));font-size:12px;font-weight:700}._9lHw_W_dialogBody code{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;font-size:13px}._9lHw_W_workspaceTrigger{justify-content:space-between;width:100%;display:flex}._9lHw_W_header{z-index:20;border-bottom:1px solid #0000;flex:none;padding:12px 28px 0 20px;position:relative}._9lHw_W_header:after{content:\"\";z-index:0;background:var(--dsw-alias-border-l2);pointer-events:none;height:1px;position:absolute;bottom:1px;left:0;right:0}._9lHw_W_titleRow{align-items:center;gap:10px;min-height:32px;display:flex}._9lHw_W_header h1{text-overflow:ellipsis;white-space:nowrap;border-radius:12px;flex:1;min-width:0;margin:0;padding:4px 8px;font-size:14px;font-weight:500;line-height:20px;overflow:hidden}._9lHw_W_pageTabs{z-index:1;gap:36px;margin-top:4px;padding-left:8px;display:flex;position:relative}._9lHw_W_pageTabs button{color:var(--dsw-alias-label-tertiary);cursor:pointer;font:inherit;background:0 0;border:0;padding:0 0 11px;font-size:13px;font-weight:500;line-height:16px;position:relative}._9lHw_W_pageTabs button:after{content:\"\";background:0 0;border-radius:2px;height:2px;position:absolute;bottom:1px;left:0;right:0}._9lHw_W_pageTabs button:hover,._9lHw_W_pageTabs button[aria-current=page]{color:var(--dsw-alias-state-business-primary)}._9lHw_W_pageTabs button[aria-current=page]:after{background:var(--dsw-alias-state-business-primary)}._9lHw_W_pageTabs button:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:3px}._9lHw_W_actions{z-index:1;align-items:center;gap:8px;min-height:32px;display:flex;position:relative}._9lHw_W_actions ._9lHw_W_headerIconButton{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:28px;min-width:28px;height:28px;color:var(--dsw-alias-label-secondary);transition:all var(--ds-transition-duration-fast) var(--ds-ease-in-out);border-radius:8px;padding:0}._9lHw_W_actions ._9lHw_W_headerIconButton:hover{border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}._9lHw_W_actions ._9lHw_W_headerIconButton:disabled{opacity:.5;cursor:not-allowed}._9lHw_W_searchField{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:10px;align-items:center;gap:6px;width:220px;min-height:28px;padding:0 8px;display:flex}._9lHw_W_searchField input{min-width:0;color:inherit;font:inherit;background:0 0;border:0;outline:0;flex:1}._9lHw_W_searchField button{border:0;min-height:24px;padding:0 5px}._9lHw_W_filterMenu{position:relative}._9lHw_W_filterMenu summary{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:10px;place-items:center;width:28px;height:28px;list-style:none;display:grid;position:relative}._9lHw_W_filterMenu summary::-webkit-details-marker{display:none}._9lHw_W_filterMenu summary i{background:var(--tomato-accent,var(--dsw-alias-state-error-primary));border-radius:50%;width:5px;height:5px;position:absolute;top:5px;right:5px}._9lHw_W_filterPopover{z-index:30;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);width:min(500px,100vw - 320px);box-shadow:var(--dsw-shadow-lv3);border-radius:16px;gap:10px;padding:12px;display:grid;position:absolute;top:calc(100% + 8px);right:0}._9lHw_W_assigneeFilter{align-items:flex-start;gap:12px;display:flex}._9lHw_W_assigneeFilter>span{width:48px;color:var(--dsw-alias-label-secondary);white-space:nowrap;flex:0 0 48px;padding-top:8px;font-size:13px}._9lHw_W_assigneePicker{min-width:260px;position:relative}._9lHw_W_assigneeFilter ._9lHw_W_assigneeTrigger{border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 82%, transparent);width:100%;height:30px;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb, var(--dsw-alias-bg-overlay) 46%, transparent);border-radius:999px;justify-content:space-between;align-items:center;gap:12px;padding:0 8px 0 12px;font-size:12px;display:flex}._9lHw_W_assigneeFilter ._9lHw_W_assigneeTrigger:hover{background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_assigneeTrigger>span{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._9lHw_W_assigneeDropdown{z-index:40;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:320px;box-shadow:var(--dsw-shadow-lv3);border-radius:10px;padding:8px;position:absolute;top:calc(100% + 5px);left:0}._9lHw_W_assigneeDropdown>input{border:1px solid var(--dsw-alias-border-l2);width:100%;height:32px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font:inherit;border-radius:7px;outline:0;padding:0 9px}._9lHw_W_assigneeDropdown>input:focus{border-color:var(--tomato-accent,var(--dsw-alias-state-business-primary))}._9lHw_W_assigneeDropdown>[role=listbox]{max-height:260px;margin-top:7px;overflow:auto}._9lHw_W_assigneeDropdown [role=option]{width:100%;min-height:38px;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;background:0 0;border:0;border-radius:7px;flex-direction:column;justify-content:center;align-items:flex-start;gap:2px;padding:6px 9px;display:flex}._9lHw_W_assigneeDropdown [role=option]:hover,._9lHw_W_assigneeDropdown [role=option][aria-selected=true]{background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_assigneeDropdown strong{font-size:12px;font-weight:550}._9lHw_W_assigneeDropdown small{color:var(--dsw-alias-label-secondary);font-size:10px}._9lHw_W_assigneeDropdown p{color:var(--dsw-alias-label-secondary);text-align:center;margin:0;padding:18px 8px;font-size:11px}._9lHw_W_filterRow{align-items:flex-start;gap:12px;display:flex}._9lHw_W_filterRow>span{width:48px;color:var(--dsw-alias-label-secondary);white-space:nowrap;flex:0 0 48px;padding-top:7px;font-size:13px}._9lHw_W_filterRow>div{flex-wrap:wrap;flex:1;gap:7px;display:flex}._9lHw_W_workspaceSelect{flex:1;min-width:0;display:block;position:relative}._9lHw_W_workspaceSelect>span{flex:1}._9lHw_W_filterRow ._9lHw_W_workspaceTrigger{border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 82%, transparent);width:100%;min-height:30px;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb, var(--dsw-alias-bg-overlay) 46%, transparent);font:inherit;text-align:left;cursor:pointer;border-radius:999px;justify-content:space-between;align-items:center;gap:10px;padding:3px 8px 3px 12px;font-size:12px;display:flex}._9lHw_W_filterRow ._9lHw_W_workspaceTrigger:hover{background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_filterRow ._9lHw_W_workspaceTrigger>span{min-width:0;color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._9lHw_W_workspaceChevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s;display:inline-flex}._9lHw_W_workspaceTrigger[aria-expanded=true] ._9lHw_W_workspaceChevron{color:var(--tomato-accent,var(--dsw-alias-state-business-primary));transform:rotate(180deg)}._9lHw_W_error{color:var(--tomato-accent,var(--dsw-alias-state-error-primary));background:var(--dsw-alias-state-error-secondary);border-radius:12px;margin:16px 24px 0;padding:12px 14px}._9lHw_W_notice{color:var(--dsw-alias-label-secondary);margin:0;padding:8px 20px;font-size:11px}._9lHw_W_board{z-index:1;flex:1;align-items:flex-start;gap:12px;padding:8px 12px;display:flex;position:relative;overflow:auto}._9lHw_W_lane{border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 86%, transparent);width:300px;min-width:300px;max-height:100%;transition:transform .16s var(--ds-ease-in-out), opacity .16s var(--ds-ease-in-out), box-shadow .16s var(--ds-ease-in-out);border-radius:16px;flex-direction:column;display:flex}._9lHw_W_laneDragging{opacity:.5;transform:scale(.985)}._9lHw_W_laneDropBefore{box-shadow:-4px 0 0 var(--tomato-accent,var(--dsw-alias-state-business-primary));transform:translate(8px)}._9lHw_W_laneDropAfter{box-shadow:4px 0 0 var(--tomato-accent,var(--dsw-alias-state-business-primary));transform:translate(-8px)}._9lHw_W_laneHeader{cursor:grab;user-select:none;justify-content:space-between;align-items:center;padding:12px 14px 10px;display:flex}._9lHw_W_laneHeader:active{cursor:grabbing}@media (prefers-reduced-motion:reduce){._9lHw_W_lane{transition:none}}._9lHw_W_laneHeader h2{margin:0;font-size:14px}._9lHw_W_laneHeader span{text-align:center;min-width:22px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-overlay);border-radius:999px;padding:2px 6px;font-size:12px}._9lHw_W_cards{padding:0 8px 8px;overflow-y:auto}._9lHw_W_card{border:1px solid var(--dsw-alias-border-l2);min-width:0;max-width:100%;color:inherit;background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 96%, transparent);box-shadow:var(--dsw-shadow-lv1);text-align:left;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out), box-shadow var(--ds-transition-duration-fast) var(--ds-ease-in-out);cursor:pointer;border-radius:14px;flex-direction:column;gap:7px;margin-top:8px;padding:12px;text-decoration:none;display:flex;overflow:hidden}._9lHw_W_card:hover{border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-button-floating-hover);box-shadow:var(--dsw-shadow-lv2)}._9lHw_W_cardMuted{opacity:.46;filter:saturate(.2);box-shadow:none}._9lHw_W_cardMuted:hover{opacity:.62}._9lHw_W_card:focus-visible{outline:2px solid var(--tomato-accent,var(--dsw-alias-state-business-primary));outline-offset:2px}._9lHw_W_card strong,._9lHw_W_key,._9lHw_W_meta{overflow-wrap:anywhere;word-break:normal;min-width:0}._9lHw_W_cardTopline{justify-content:space-between;align-items:center;gap:8px;min-width:0;display:flex}._9lHw_W_cardButtons{align-items:center;gap:2px;display:inline-flex}._9lHw_W_muteButton,._9lHw_W_tomatoLink{border-radius:8px;flex:none;place-items:center;width:28px;min-width:28px;height:28px;min-height:28px;padding:0;line-height:1;display:inline-grid}._9lHw_W_muteButton{color:var(--dsw-alias-label-tertiary);font-size:9px}._9lHw_W_muteButton[aria-pressed=true]{color:var(--dsw-alias-label-primary)}._9lHw_W_card strong{font-size:14px;font-weight:600;line-height:1.45}._9lHw_W_key{color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:650}._9lHw_W_cardMeta{flex-wrap:wrap;align-items:center;gap:5px;min-width:0;display:flex}._9lHw_W_empty{color:var(--dsw-alias-label-tertiary);margin:auto}@media (width<=820px){._9lHw_W_titleRow{flex-wrap:wrap}._9lHw_W_actions{flex-wrap:wrap;justify-content:flex-end}._9lHw_W_searchField{width:170px}}";
		const tagId$2 = "@stephen1620/dsh-tomato-board/tomato-board.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephen1620/dsh-tomato-board";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
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
			"cardMeta": "_9lHw_W_cardMeta",
			"cardMuted": "_9lHw_W_cardMuted",
			"cardTopline": "_9lHw_W_cardTopline",
			"cards": "_9lHw_W_cards",
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
			"titleRow": "_9lHw_W_titleRow",
			"tomatoIcon": "_9lHw_W_tomatoIcon",
			"tomatoLink": "_9lHw_W_tomatoLink",
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
		//#region \0dsh-css:/Users/gengfeng/dsh-tomato-board/plugins/tomato-board/src/client/story-points.module.css.mjs
		const css$1 = ".d6j1rW_page{--tomato-accent:var(--dsw-alias-state-business-primary,#3478c8);--tomato-accent-soft:color-mix(in srgb, var(--tomato-accent) 10%, transparent);min-height:0;color:var(--dsw-alias-label-primary,#292d32);flex:1;padding:14px 18px 18px;overflow:auto}.d6j1rW_page *{box-sizing:border-box}.d6j1rW_page button,.d6j1rW_page select,.d6j1rW_page input{font:inherit;color:inherit;border:1px solid var(--dsw-alias-border-l2,#dedfdf);background:var(--dsw-alias-bg-base,white);border-radius:8px;min-width:0;padding:8px 12px}.d6j1rW_page button{cursor:pointer;white-space:nowrap}.d6j1rW_page button:hover{background:var(--dsw-alias-interactive-bg-hover,#f4f4f2)}.d6j1rW_page button:disabled{opacity:.5;cursor:wait}.d6j1rW_page :focus-visible{outline:2px solid var(--tomato-accent);outline-offset:3px}.d6j1rW_page h3,.d6j1rW_page h4,.d6j1rW_page p{margin:0}.d6j1rW_panelHeader,.d6j1rW_listHeading,.d6j1rW_rankLabel{justify-content:space-between;align-items:center;gap:12px;display:flex}.d6j1rW_caption,.d6j1rW_footnote,.d6j1rW_itemText small,.d6j1rW_rankRow small,.d6j1rW_listHeading span{color:var(--dsw-alias-label-secondary,#797c80);font-size:12px;line-height:1.5}.d6j1rW_eyebrow{letter-spacing:1.6px;color:var(--dsw-alias-label-secondary,#797c80);font-size:10px;font-weight:650}.d6j1rW_headerControls{align-items:center;gap:8px;display:flex}.d6j1rW_headerControls label{color:var(--dsw-alias-label-secondary,#797c80);align-items:center;gap:7px;font-size:12px;display:flex}.d6j1rW_headerControls select{border:1px solid var(--dsw-alias-border-l2,#dedfdf);width:min(320px,34vw);min-width:0;height:28px;color:var(--dsw-alias-label-primary,#292d32);background:var(--dsw-alias-bg-base,white);font:inherit;border-radius:9px;padding:0 10px}.d6j1rW_headerIconButton{border-radius:8px;width:28px;min-width:28px;height:28px;min-height:28px;padding:0!important}.d6j1rW_columns{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);align-items:start;gap:14px;display:grid}.d6j1rW_teamsHeader{border-bottom:1px solid var(--dsw-alias-border-l2,#e4e4df);justify-content:space-between;align-items:center;padding-bottom:12px;display:flex}.d6j1rW_teamsHeader h3{font-size:16px}.d6j1rW_addTeamButton{height:30px;font-weight:600;min-width:0!important;padding:0 10px!important;font-size:12px!important}.d6j1rW_teamEditor{background:var(--dsw-alias-interactive-bg-hover,#f3f3f1);border-radius:9px;align-items:center;gap:7px;margin:9px 0;padding:8px;display:flex}.d6j1rW_teamEditor input{flex:1;min-width:0}.d6j1rW_teamEditor button{padding:6px 8px;font-size:11px}.d6j1rW_teamAccordions{gap:8px;margin-top:10px;display:grid}.d6j1rW_teamAccordion{border:1px solid var(--dsw-alias-border-l2,#e4e4df);border-radius:10px;overflow:visible}.d6j1rW_teamAccordionHeader{align-items:center;gap:2px;min-height:42px;padding:4px 6px;display:flex}.d6j1rW_teamToggle{text-align:left;align-items:center;gap:8px;min-width:0;display:flex;background:0 0!important;border:0!important;padding:6px!important}.d6j1rW_teamToggle strong{text-overflow:ellipsis;min-width:0;font-size:13px;overflow:hidden}.d6j1rW_teamToggle small{color:var(--dsw-alias-label-secondary);font-size:10px}.d6j1rW_renameTeam{width:27px;height:27px;margin-left:-3px;min-width:27px!important;color:var(--dsw-alias-label-secondary)!important;background:0 0!important;border-color:#0000!important;padding:0!important}.d6j1rW_renameTeam:hover{color:var(--tomato-accent)!important}.d6j1rW_chevron{color:var(--dsw-alias-label-tertiary);font-size:18px;line-height:1;transition:transform .16s}.d6j1rW_teamToggle[aria-expanded=true] .d6j1rW_chevron{color:var(--tomato-accent);transform:rotate(90deg)}.d6j1rW_teamRowActions{gap:2px;margin-left:auto;display:flex}.d6j1rW_teamRowActions button{width:27px;min-width:27px;height:27px;color:var(--dsw-alias-label-secondary);background:0 0;border-color:#0000;padding:0}.d6j1rW_teamRowActions button:last-child:hover{color:var(--dsw-alias-state-error-primary,#bd4336)}.d6j1rW_teamBody{border-top:1px solid var(--dsw-alias-border-l2,#e4e4df);padding:10px 12px 12px;position:relative}.d6j1rW_teamBodyToolbar{color:var(--dsw-alias-label-secondary);justify-content:space-between;align-items:center;gap:8px;font-size:11px;display:flex}.d6j1rW_smallAddButton{border-radius:6px!important;padding:4px 7px!important;font-size:10px!important}.d6j1rW_teamBodyEmpty{color:var(--dsw-alias-label-secondary);text-align:center;padding:20px 8px 10px;font-size:11px}.d6j1rW_memberRow{align-items:center;gap:4px;display:flex}.d6j1rW_memberRow .d6j1rW_rankLabel{flex:1;min-width:0}.d6j1rW_rankIndex{font-variant-numeric:tabular-nums;flex:0 0 22px;width:22px;color:var(--dsw-alias-label-tertiary)!important}.d6j1rW_memberAvatar{background:var(--tomato-accent-soft);border-radius:9px;flex:0 0 28px;place-items:center;width:28px;height:28px;font-weight:750;display:inline-grid;color:var(--tomato-accent)!important;font-size:12px!important}.d6j1rW_memberIdentity{z-index:1;flex:1;gap:1px;min-width:0;display:grid;position:relative}.d6j1rW_memberIdentity strong{text-overflow:ellipsis;overflow:hidden}.d6j1rW_memberIdentity small{color:var(--dsw-alias-label-tertiary);font-size:10px;font-weight:400}.d6j1rW_rankFill{z-index:0;border-radius:inherit;background:color-mix(in srgb, var(--tomato-accent) 22%, transparent);pointer-events:none;max-width:100%;position:absolute;inset:0 auto 0 0}.d6j1rW_rankLabel>.d6j1rW_rankIndex,.d6j1rW_rankLabel>.d6j1rW_memberAvatar,.d6j1rW_rankLabel>b{z-index:1;position:relative}.d6j1rW_removeMember{opacity:0;width:25px;height:25px;min-width:25px!important;color:var(--dsw-alias-label-tertiary)!important;background:0 0!important;border-color:#0000!important;padding:0!important}.d6j1rW_memberRow:hover .d6j1rW_removeMember,.d6j1rW_removeMember:focus-visible{opacity:1}.d6j1rW_removeMember:hover{color:var(--dsw-alias-state-error-primary,#bd4336)!important}.d6j1rW_panel{border:1px solid var(--dsw-alias-border-l2,#e4e4df);background:var(--dsw-alias-bg-base,white);border-radius:14px;min-width:0;padding:16px}.d6j1rW_panelHeader{border-bottom:1px solid var(--dsw-alias-border-l2,#e4e4df);padding-bottom:12px}.d6j1rW_panelHeader h3{white-space:nowrap;font-size:16px}.d6j1rW_panelHeader select{max-width:65%;font-size:12px}.d6j1rW_panelHeader button{font-size:12px}.d6j1rW_summary{justify-content:space-between;align-items:center;gap:16px;padding:16px 0;display:flex}.d6j1rW_total{font-variant-numeric:tabular-nums;letter-spacing:-2px;font-size:48px;font-weight:600;line-height:1.15}.d6j1rW_total small{letter-spacing:0;color:var(--dsw-alias-label-secondary,#797c80);font-size:15px}.d6j1rW_pie{background:var(--dsw-alias-border-l2,#e7e7e2);width:136px;height:136px;box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--dsw-alias-border-l2,#ddd) 55%, transparent), 0 14px 36px #00000012;border-radius:50%;flex:0 0 136px;padding:17px;position:relative;transform:rotate(-90deg)}.d6j1rW_pie:after{content:\"\";border:1px solid color-mix(in srgb, var(--tomato-accent) 24%, transparent);border-radius:50%;position:absolute;inset:-6px}.d6j1rW_pie>div{z-index:1;background:var(--dsw-alias-bg-base,white);width:100%;height:100%;box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l2,#e7e7e2);border-radius:50%;flex-direction:column;justify-content:center;align-items:center;display:flex;position:relative;transform:rotate(90deg)}.d6j1rW_pie strong{font-size:28px;line-height:1}.d6j1rW_pie span{letter-spacing:.08em;color:var(--dsw-alias-label-secondary,#797c80);margin-top:5px;font-size:10px}.d6j1rW_listHeading{padding:10px 0}.d6j1rW_listHeading h4{font-size:13px}.d6j1rW_item{border-top:1px solid var(--dsw-alias-border-l2,#e4e4df);align-items:center;gap:10px;padding:10px 12px;display:flex}.d6j1rW_dot{border-radius:3px;flex-shrink:0;width:8px;height:8px}.d6j1rW_itemText{flex:1;min-width:0}.d6j1rW_itemTitle{color:inherit;overflow-wrap:anywhere;font-size:13px;line-height:1.5;text-decoration:none}.d6j1rW_itemTitle:hover{text-decoration:underline}.d6j1rW_itemText small{margin-right:7px;font-size:10px;display:inline-block}.d6j1rW_itemPoints{white-space:nowrap;font-variant-numeric:tabular-nums;font-size:12px}.d6j1rW_item button{padding:5px 8px;font-size:11px}.d6j1rW_chips{flex-wrap:wrap;gap:8px;margin:12px 0 8px;display:flex}.d6j1rW_chips>span{background:var(--dsw-alias-interactive-bg-hover,#f2f3f0);border-radius:6px;align-items:center;gap:6px;padding:3px 5px 3px 10px;font-size:12px;display:flex}.d6j1rW_chips button{background:0 0;border:0;padding:1px 5px}.d6j1rW_ranking{gap:3px;margin-top:8px;display:grid}.d6j1rW_rankRow{border-radius:9px}.d6j1rW_rankLabel{text-align:left;background:0 0;border:0;border-radius:9px;gap:8px;width:100%;min-height:48px;padding:6px 4px;font-size:13px;position:relative}.d6j1rW_rankLabel:hover{color:var(--tomato-accent);box-shadow:inset 0 0 0 1.5px color-mix(in srgb, var(--tomato-accent) 45%, transparent);background:0 0!important}.d6j1rW_rankLabel[aria-pressed=true]{color:var(--tomato-accent);box-shadow:inset 0 0 0 1.5px var(--tomato-accent);background:0 0!important}.d6j1rW_rankLabel[aria-pressed=true] .d6j1rW_memberAvatar{background:var(--tomato-accent);color:#fff!important}.d6j1rW_rankLabel b{font-variant-numeric:tabular-nums;flex:none;font-size:13px}.d6j1rW_track{display:none}.d6j1rW_footnote{border-top:1px solid var(--dsw-alias-border-l2,#e4e4df);padding-top:12px;font-size:11px;margin-top:20px!important}.d6j1rW_empty{text-align:center;color:var(--dsw-alias-label-secondary,#797c80);padding:36px 12px;font-size:13px}.d6j1rW_empty h4{margin-bottom:8px}.d6j1rW_emptyIcon{color:var(--tomato-accent);margin-bottom:12px;font-size:32px;display:block}.d6j1rW_error{color:var(--dsw-alias-state-error-primary,#bd4336);overflow-wrap:anywhere;padding:10px 0;font-size:12px}.d6j1rW_notice{color:var(--dsw-alias-label-secondary,#797c80);padding:8px 0;font-size:12px}.d6j1rW_teamHeader{overflow:visible}.d6j1rW_addPeopleRoot{position:relative}.d6j1rW_addPeople{z-index:30;border:1px solid var(--dsw-alias-border-l2,#ddd);background:var(--dsw-alias-bg-layer-2,white);border-radius:12px;width:min(330px,72vw);padding:10px;position:absolute;top:calc(100% + 7px);right:0;box-shadow:0 16px 46px #0002}.d6j1rW_addPeopleTitle{justify-content:space-between;align-items:center;gap:10px;display:flex;margin:0 0 8px!important}.d6j1rW_addPeopleTitle strong{font-size:12px}.d6j1rW_addPeopleTitle button{justify-content:center;min-width:26px;height:26px;width:26px!important;padding:0!important}.d6j1rW_addPeople input{width:100%}.d6j1rW_addPeople>div:last-child{max-height:210px;margin-top:8px;overflow:auto}.d6j1rW_addPeople>div:last-child>button{text-align:left;border:0;gap:8px;width:100%;display:flex}.d6j1rW_addPeople small{opacity:.6;flex:1}@media (width<=1000px){.d6j1rW_columns{grid-template-columns:1fr}.d6j1rW_page{padding:14px}}@media (width<=620px){.d6j1rW_teamHeader{flex-direction:column;align-items:flex-start}.d6j1rW_teamActions{justify-content:flex-start}.d6j1rW_memberToolbar{flex-direction:column;align-items:stretch}}@media (width<=540px){.d6j1rW_page{padding:10px}.d6j1rW_panel{padding:12px}.d6j1rW_headerControls label>span{display:none}.d6j1rW_headerControls select{width:min(220px,55vw)}.d6j1rW_pie{flex-basis:120px;width:120px;height:120px;padding:16px}.d6j1rW_total{font-size:42px}.d6j1rW_item{gap:7px}}.d6j1rW_item[role=button]{cursor:pointer;border-radius:8px}.d6j1rW_item[role=button]:hover{background:var(--dsw-alias-interactive-bg-hover)}.d6j1rW_item[role=button]:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.d6j1rW_item .d6j1rW_tomatoLink{background:0 0;border:0;flex:none;width:28px;height:28px;padding:0}";
		const tagId$1 = "@stephen1620/dsh-tomato-board/story-points.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephen1620/dsh-tomato-board";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var story_points_module_css_default = {
			"addPeople": "d6j1rW_addPeople",
			"addPeopleRoot": "d6j1rW_addPeopleRoot",
			"addPeopleTitle": "d6j1rW_addPeopleTitle",
			"addTeamButton": "d6j1rW_addTeamButton",
			"caption": "d6j1rW_caption",
			"chevron": "d6j1rW_chevron",
			"chips": "d6j1rW_chips",
			"columns": "d6j1rW_columns",
			"dot": "d6j1rW_dot",
			"empty": "d6j1rW_empty",
			"emptyIcon": "d6j1rW_emptyIcon",
			"error": "d6j1rW_error",
			"eyebrow": "d6j1rW_eyebrow",
			"footnote": "d6j1rW_footnote",
			"headerControls": "d6j1rW_headerControls",
			"headerIconButton": "d6j1rW_headerIconButton",
			"item": "d6j1rW_item",
			"itemPoints": "d6j1rW_itemPoints",
			"itemText": "d6j1rW_itemText",
			"itemTitle": "d6j1rW_itemTitle",
			"listHeading": "d6j1rW_listHeading",
			"memberAvatar": "d6j1rW_memberAvatar",
			"memberIdentity": "d6j1rW_memberIdentity",
			"memberRow": "d6j1rW_memberRow",
			"memberToolbar": "d6j1rW_memberToolbar",
			"notice": "d6j1rW_notice",
			"page": "d6j1rW_page",
			"panel": "d6j1rW_panel",
			"panelHeader": "d6j1rW_panelHeader",
			"pie": "d6j1rW_pie",
			"rankFill": "d6j1rW_rankFill",
			"rankIndex": "d6j1rW_rankIndex",
			"rankLabel": "d6j1rW_rankLabel",
			"rankRow": "d6j1rW_rankRow",
			"ranking": "d6j1rW_ranking",
			"removeMember": "d6j1rW_removeMember",
			"renameTeam": "d6j1rW_renameTeam",
			"smallAddButton": "d6j1rW_smallAddButton",
			"summary": "d6j1rW_summary",
			"teamAccordion": "d6j1rW_teamAccordion",
			"teamAccordionHeader": "d6j1rW_teamAccordionHeader",
			"teamAccordions": "d6j1rW_teamAccordions",
			"teamActions": "d6j1rW_teamActions",
			"teamBody": "d6j1rW_teamBody",
			"teamBodyEmpty": "d6j1rW_teamBodyEmpty",
			"teamBodyToolbar": "d6j1rW_teamBodyToolbar",
			"teamEditor": "d6j1rW_teamEditor",
			"teamHeader": "d6j1rW_teamHeader",
			"teamRowActions": "d6j1rW_teamRowActions",
			"teamToggle": "d6j1rW_teamToggle",
			"teamsHeader": "d6j1rW_teamsHeader",
			"tomatoLink": "d6j1rW_tomatoLink",
			"total": "d6j1rW_total",
			"track": "d6j1rW_track"
		};
		//#endregion
		//#region \0dsh-css:/Users/gengfeng/dsh-tomato-board/plugins/tomato-board/src/client/tag.module.css.mjs
		const css = ".KP77Yq_tag{--tag-border-color:color-mix(in srgb, var(--dsw-alias-border-l2) 82%, transparent);--tag-text-color:var(--dsw-alias-label-secondary);--tag-bg-color:color-mix(in srgb, var(--dsw-alias-bg-overlay) 46%, transparent);--tag-weight:550;overflow-wrap:anywhere;border:1px solid var(--tag-border-color);max-width:100%;color:var(--tag-text-color);background:var(--tag-bg-color);font-size:10px;font-weight:var(--tag-weight);white-space:normal;border-radius:999px;flex:none;padding:2px 9px;line-height:1.4}.KP77Yq_toned{--tag-border-color:color-mix(in srgb, var(--tag-tone) 38%, transparent);--tag-text-color:var(--tag-tone);--tag-bg-color:color-mix(in srgb, var(--tag-tone) 13%, transparent);--tag-weight:700}.KP77Yq_tag.KP77Yq_toggle{cursor:pointer;min-height:26px;font:inherit;font-size:10px;font-weight:var(--tag-weight);align-items:center;padding:2px 10px;line-height:1.4;display:inline-flex}.KP77Yq_tag.KP77Yq_toggle:hover{background:var(--dsw-alias-interactive-bg-hover)}.KP77Yq_tag.KP77Yq_toned.KP77Yq_toggle:hover{background:color-mix(in srgb, var(--tag-tone) 18%, transparent)}.KP77Yq_tag.KP77Yq_toggle:focus-visible{outline:2px solid var(--tag-tone,var(--dsw-alias-state-business-primary));outline-offset:2px}.KP77Yq_off{opacity:.5;filter:saturate(.55)}";
		const tagId = "@stephen1620/dsh-tomato-board/tag.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephen1620/dsh-tomato-board";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var tag_module_css_default = {
			"off": "KP77Yq_off",
			"tag": "KP77Yq_tag",
			"toggle": "KP77Yq_toggle",
			"toned": "KP77Yq_toned"
		};
		//#endregion
		//#region ../../../../../../Users/gengfeng/dsh-tomato-board/plugins/tomato-board/src/client/Tag.tsx
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
		//#region ../../../../../../Users/gengfeng/dsh-tomato-board/plugins/tomato-board/src/client/StoryPoints.tsx
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
		const total = (items) => items.reduce((sum, item) => sum + (item.storyPoints ?? 0), 0);
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
		function StoryPoints({ toolbarTarget, onOpenItem }) {
			const [sprints, setSprints] = (0, react.useState)([]);
			const [users, setUsers] = (0, react.useState)([]);
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
			const [results, setResults] = (0, react.useState)({});
			const [errors, setErrors] = (0, react.useState)({});
			const [directoryError, setDirectoryError] = (0, react.useState)("");
			const [directoryLoading, setDirectoryLoading] = (0, react.useState)(true);
			const [version, setVersion] = (0, react.useState)(0);
			const [directoryVersion, setDirectoryVersion] = (0, react.useState)(0);
			(0, react.useEffect)(() => {
				const controller = new AbortController();
				setDirectoryLoading(true);
				setDirectoryError("");
				Promise.all([json("/api/tomato-board/sprints", controller.signal), json("/api/tomato-board/filters", controller.signal)]).then(([data, directory]) => {
					const sorted = [...data.sprints].sort((a, b) => (b.startDate ?? "").localeCompare(a.startDate ?? ""));
					setSprints(sorted);
					setUsers(directory.users);
					setSprint((current) => sorted.some((value) => value.sprintId === current) ? current : sorted[0]?.sprintId || "");
				}).catch((error) => {
					if (!controller.signal.aborted) setDirectoryError(error.message);
				}).finally(() => {
					if (!controller.signal.aborted) setDirectoryLoading(false);
				});
				return () => controller.abort();
			}, [directoryVersion]);
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
			(0, react.useEffect)(() => {
				if (directoryLoading || !sprint) return;
				const scope = JSON.stringify([sprint, version]);
				const sameScope = resultScope.current === scope;
				if (!sameScope) {
					resultScope.current = scope;
					setResults({});
					setErrors({});
				}
				const controller = new AbortController();
				const owners = JSON.parse(ownersKey).filter((username) => !sameScope || !results[username] && !errors[username]);
				const worker = async () => {
					while (owners.length && !controller.signal.aborted) {
						const username = owners.shift();
						try {
							const data = await json(`/api/tomato-board/story-points?${new URLSearchParams({
								sprint,
								assignee: username,
								refresh: String(version)
							})}`, controller.signal);
							if (!controller.signal.aborted) setResults((current) => ({
								...current,
								[username]: data
							}));
						} catch (error) {
							if (!controller.signal.aborted) setErrors((current) => ({
								...current,
								[username]: error instanceof Error ? error.message : "读取失败"
							}));
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
				version
			]);
			const personal = results[owner];
			const items = (0, react.useMemo)(() => [...personal?.items ?? []].sort((a, b) => (b.storyPoints ?? -1) - (a.storyPoints ?? -1) || a.itemKey.localeCompare(b.itemKey)), [personal]);
			const sum = total(items);
			const slices = items.filter((item) => item.storyPoints !== null && item.storyPoints > 0);
			let offset = 0;
			const gradient = slices.map((item, index) => {
				const start = offset;
				offset += item.storyPoints / sum * 100;
				return `${colors[index % colors.length]} ${start}% ${offset}%`;
			}).join(", ");
			const userName = (username) => username === "currentUser()" ? "我" : users.find((user) => user.username === username)?.name ?? username;
			const toggleTeam = (id) => {
				setOpenTeamId((current) => current === id ? "" : id);
				setAddingTeamId("");
				setTeamEditor(null);
			};
			const ranking = openMembers.map((username) => ({
				username,
				result: results[username],
				points: total(results[username]?.items ?? [])
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
				toolbarTarget(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: story_points_module_css_default.headerControls,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "迭代" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
						"aria-label": "选择迭代",
						value: sprint,
						disabled: directoryLoading,
						onChange: (event) => {
							setSprint(event.target.value);
							setResults({});
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
						className: story_points_module_css_default.headerIconButton,
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutline16, {}),
						title: "刷新",
						"aria-label": "刷新迭代故事点",
						onClick: () => {
							setResults({});
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
				toolbarTarget
			]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: story_points_module_css_default.page,
				children: [directoryError && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
					className: story_points_module_css_default.error,
					children: [directoryError, "，请点击刷新重试。"]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: story_points_module_css_default.columns,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: story_points_module_css_default.panel,
						"aria-label": "个人故事点",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: story_points_module_css_default.panelHeader,
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
						}), errors[owner] ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: story_points_module_css_default.error,
							children: errors[owner]
						}) : !personal ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: story_points_module_css_default.empty,
							children: sprint ? "正在读取个人故事点…" : "请选择迭代"
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: story_points_module_css_default.summary,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: story_points_module_css_default.eyebrow,
									children: "故事点总数"
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: story_points_module_css_default.total,
									children: [number(sum), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: " SP" })]
								})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: story_points_module_css_default.pie,
									style: { background: gradient ? `conic-gradient(${gradient})` : void 0 },
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: slices.length }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "项占比" })] })
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: story_points_module_css_default.listHeading,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", { children: "需求列表" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [items.length, " 项"] })]
							}),
							!items.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: story_points_module_css_default.empty,
								children: "该负责人在本迭代暂无事项。"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: story_points_module_css_default.item,
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
										className: story_points_module_css_default.dot,
										style: { background: item.storyPoints && item.storyPoints > 0 ? colors[slices.indexOf(item) % colors.length] : "var(--dsw-alias-border-l2, #ddd)" }
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: story_points_module_css_default.itemText,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: story_points_module_css_default.itemTitle,
												children: item.title
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: item.itemKey }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Tag, { children: item.status })
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", {
										className: story_points_module_css_default.itemPoints,
										children: item.storyPoints === null ? "未估点" : `${number(item.storyPoints)} SP`
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										className: story_points_module_css_default.tomatoLink,
										variant: "ghost",
										size: "sm",
										title: "在番茄中打开事项",
										"aria-label": `在番茄中打开 ${item.itemKey}`,
										onClick: (event) => {
											event.stopPropagation();
											window.open(item.tomatoUrl, "_blank", "noopener,noreferrer");
										},
										onKeyDown: (event) => event.stopPropagation(),
										children: "↗"
									})
								]
							}, item.itemKey)) })
						] })]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: story_points_module_css_default.panel,
						"aria-label": "团队故事点",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: story_points_module_css_default.teamsHeader,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "团队分布" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									className: story_points_module_css_default.addTeamButton,
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
								className: story_points_module_css_default.teamEditor,
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
								className: story_points_module_css_default.teamAccordions,
								children: teams.map((team) => {
									const open = openTeamId === team.id;
									const rows = open ? ranking : [];
									return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
										className: story_points_module_css_default.teamAccordion,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: story_points_module_css_default.teamAccordionHeader,
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
														className: story_points_module_css_default.teamToggle,
														"aria-expanded": open,
														onClick: () => toggleTeam(team.id),
														children: [
															/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
																className: story_points_module_css_default.chevron,
																children: "›"
															}),
															/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: team.name }),
															/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [team.members.length, " 人"] })
														]
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
														className: story_points_module_css_default.renameTeam,
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
														className: story_points_module_css_default.teamRowActions,
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
												className: story_points_module_css_default.teamEditor,
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
												className: story_points_module_css_default.teamBody,
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
														className: story_points_module_css_default.teamBodyToolbar,
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: team.members.length ? "成员故事点" : "暂无成员" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
															ref: addingTeamId === team.id ? addPeopleRef : void 0,
															className: story_points_module_css_default.addPeopleRoot,
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
																className: story_points_module_css_default.smallAddButton,
																onClick: () => setAddingTeamId((current) => current === team.id ? "" : team.id),
																children: "＋ 添加成员"
															}), addingTeamId === team.id && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																className: story_points_module_css_default.addPeople,
																role: "dialog",
																children: [
																	/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																		className: story_points_module_css_default.addPeopleTitle,
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
														className: story_points_module_css_default.ranking,
														children: rows.map((row, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
															className: story_points_module_css_default.rankRow,
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																className: story_points_module_css_default.memberRow,
																children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
																	className: story_points_module_css_default.rankLabel,
																	"aria-pressed": owner === row.username,
																	onClick: () => setOwner(row.username),
																	children: [
																		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {
																			className: story_points_module_css_default.rankFill,
																			style: { width: `${row.points / max * 100}%` }
																		}),
																		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
																			className: story_points_module_css_default.rankIndex,
																			children: String(index + 1).padStart(2, "0")
																		}),
																		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
																			className: story_points_module_css_default.memberAvatar,
																			children: userName(row.username).slice(0, 1)
																		}),
																		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
																			className: story_points_module_css_default.memberIdentity,
																			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: userName(row.username) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: row.result ? `${row.result.items.length} 个事项` : errors[row.username] ? "读取失败" : "读取中…" })]
																		}),
																		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: row.result ? `${number(row.points)} SP` : "—" })
																	]
																}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
																	className: story_points_module_css_default.removeMember,
																	"aria-label": `移除 ${userName(row.username)}`,
																	title: "移除成员",
																	onClick: () => updateMembers(team.id, (current) => current.filter((value) => value !== row.username)),
																	children: "×"
																})]
															})
														}, row.username))
													}),
													!team.members.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
														className: story_points_module_css_default.teamBodyEmpty,
														children: "添加成员后查看故事点分布"
													})
												]
											})
										]
									}, team.id);
								})
							}),
							!teams.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: story_points_module_css_default.empty,
								children: "点击右上角加号创建团队。"
							})
						]
					})]
				})]
			});
		}
		//#endregion
		//#region ../../../../../../Users/gengfeng/dsh-tomato-board/plugins/tomato-board/src/client/TomatoBoard.tsx
		let state = {
			open: false,
			loading: false,
			loaded: false,
			items: [],
			error: null,
			successMessage: null,
			selectedItem: null,
			truncated: false
		};
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
		async function refresh(assignee = "currentUser()") {
			emit({
				loading: true,
				error: null,
				successMessage: null
			});
			try {
				const query = new URLSearchParams({ assignee });
				const response = await fetch(`/api/tomato-board/items?${query}`, { headers: { accept: "application/json" } });
				const body = await response.json();
				if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`);
				emit({
					items: body.items ?? [],
					truncated: body.truncated === true,
					loaded: true,
					successMessage: `已刷新 ${body.items?.length ?? 0} 条事项`
				});
			} catch (error) {
				emit({ error: error instanceof Error ? error.message : "番茄事项读取失败" });
			} finally {
				emit({ loading: false });
			}
		}
		function dismissSuccessMessage() {
			emit({ successMessage: null });
		}
		function closeWorkbench(ctx) {
			emit({
				open: false,
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
			const [storyToolbar, setStoryToolbar] = (0, react.useState)(null);
			const [search, setSearch] = (0, react.useState)("");
			const [blacklist, setBlacklist] = (0, react.useState)(readFilterBlacklist);
			const [mutedItems, setMutedItems] = (0, react.useState)(readMutedItems);
			const [selectedAssignee, setSelectedAssignee] = (0, react.useState)("currentUser()");
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
				if (board.open && !board.loaded && !board.loading && !board.error) refresh();
			}, [
				board.error,
				board.loaded,
				board.loading,
				board.open
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
									page === "points" && storyToolbar,
									page === "board" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
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
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-current": page === "board" ? "page" : void 0,
								onClick: () => setPage("board"),
								children: "事项看板"
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-current": page === "points" ? "page" : void 0,
								onClick: () => setPage("points"),
								children: "迭代投入"
							})]
						})]
					}),
					page === "points" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StoryPoints, {
						toolbarTarget: setStoryToolbar,
						onOpenItem: openItem
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						board.successMessage && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Toast, {
							text: board.successMessage,
							anchor: workbenchRef.current,
							holdMs: 1500,
							onDone: dismissSuccessMessage
						}),
						board.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: tomato_board_module_css_default.error,
							role: "alert",
							children: board.error
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
								const items = filteredItems.filter((item) => item.status === status);
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
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: tomato_board_module_css_default.key,
														children: item.itemKey
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
														}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
															className: tomato_board_module_css_default.tomatoLink,
															variant: "ghost",
															size: "sm",
															title: "在番茄中打开事项",
															"aria-label": `在番茄中打开 ${item.itemKey}`,
															onClick: (event) => {
																event.stopPropagation();
																window.open(item.tomatoUrl, "_blank", "noopener,noreferrer");
															},
															onKeyDown: (event) => event.stopPropagation(),
															children: "↗"
														})]
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
					] }),
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
		function AssigneePicker({ users, value, onChange }) {
			const rootRef = (0, react.useRef)(null);
			const [open, setOpen] = (0, react.useState)(false);
			const [query, setQuery] = (0, react.useState)("");
			const options = (0, react.useMemo)(() => [{
				username: "currentUser()",
				name: "我负责的"
			}, ...users.filter((user) => user.username !== "currentUser()")], [users]);
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
				className: tomato_board_module_css_default.assigneeFilter,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "负责人" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					ref: rootRef,
					className: tomato_board_module_css_default.assigneePicker,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "outline",
						size: "sm",
						className: tomato_board_module_css_default.assigneeTrigger,
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
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
				variant: "toolbar",
				size: "sm",
				title: "在番茄中打开事项",
				"aria-label": `在番茄中打开 ${itemKey}`,
				disabled: !transitionState.tomatoUrl,
				onClick: () => window.open(transitionState.tomatoUrl, "_blank", "noopener,noreferrer"),
				children: "番茄 ↗"
			})] });
		}
		const inject = [
			"slots",
			"layout",
			"sessions",
			"workspaces"
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