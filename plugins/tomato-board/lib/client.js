window.__ModuleLoader__.load({
	id: "@stephen1620/dsh-tomato-board",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region \0dsh-css:/Users/gengfeng/dsh-tomato-board/plugins/tomato-board/src/client/tomato-board.module.css.mjs
		const css$3 = "._9lHw_W_sidebarAction{width:100%;min-height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;white-space:nowrap;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out);background:0 0;border:0;border-radius:10px;align-items:center;gap:9px;margin:0;padding:0 10px;display:flex}._9lHw_W_sidebarAction:hover{background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_topbarAction{border:1px solid var(--dsw-alias-border-l2);min-height:28px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);cursor:pointer;font:inherit;white-space:nowrap;border-radius:8px;align-items:center;gap:7px;padding:4px 9px;font-size:12px;font-weight:600;display:inline-flex}._9lHw_W_topbarAction:hover{border-color:color-mix(in srgb, var(--tomato-accent,var(--dsw-alias-state-error-primary)) 45%, var(--dsw-alias-border-l2));background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_topbarAction:focus-visible{outline:2px solid var(--tomato-accent,var(--dsw-alias-state-error-primary));outline-offset:2px}._9lHw_W_topbarAction ._9lHw_W_tomatoIcon{border-radius:5px;width:16px;height:16px;font-size:10px}._9lHw_W_tomatoIcon{width:18px;height:18px;color:var(--dsw-alias-label-primary-inverted);background:var(--tomato-accent,var(--dsw-alias-state-error-primary));border-radius:6px;flex:none;place-items:center;font-size:11px;font-weight:750;display:inline-grid}._9lHw_W_transitionTrigger{align-items:center;gap:6px;display:inline-flex}._9lHw_W_transitionCaption{color:var(--dsw-alias-label-secondary);font-size:12px}._9lHw_W_transitionTrigger strong{color:var(--dsw-alias-label-primary);font-size:12px;font-weight:650}._9lHw_W_transitionDivider{background:var(--dsw-alias-border-l2);width:1px;height:14px;margin:0 2px}._9lHw_W_transitionAction{color:var(--tomato-accent,var(--dsw-alias-state-business-primary));font-size:12px;font-weight:650}._9lHw_W_transitionChevron{color:var(--tomato-accent,var(--dsw-alias-state-business-primary));transition:transform var(--ds-transition-duration-fast) var(--ds-ease-in-out)}._9lHw_W_transitionTrigger[aria-expanded=true] ._9lHw_W_transitionChevron{transform:rotate(180deg)}._9lHw_W_workbench{--tomato-accent:var(--dsw-alias-state-business-primary,#3478c8);--tomato-accent-soft:color-mix(in srgb, var(--tomato-accent) 12%, transparent);--tomato-accent-border:color-mix(in srgb, var(--tomato-accent) 48%, var(--dsw-alias-border-l2));width:100%;height:100%;min-height:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-family:var(--dsw-font-family);border-left:1px solid var(--dsw-alias-border-l2);flex-direction:column;display:flex;position:relative;overflow:hidden}._9lHw_W_createDialog{width:min(480px,100%)}._9lHw_W_dialogBody{flex-direction:column;gap:12px;display:flex}._9lHw_W_dialogBody>span{color:var(--tomato-accent,var(--dsw-alias-state-error-primary));font-size:12px;font-weight:700}._9lHw_W_dialogBody code{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;font-size:13px}._9lHw_W_workspaceTrigger{justify-content:space-between;width:100%;display:flex}._9lHw_W_header{z-index:20;border-bottom:1px solid #0000;flex:none;padding:12px 28px 0 20px;position:relative}._9lHw_W_header:after{content:\"\";z-index:0;background:var(--dsw-alias-border-l2);pointer-events:none;height:1px;position:absolute;bottom:1px;left:0;right:0}._9lHw_W_titleRow{align-items:center;gap:10px;min-height:32px;display:flex}._9lHw_W_header h1{text-overflow:ellipsis;white-space:nowrap;border-radius:12px;flex:1;min-width:0;margin:0;padding:4px 8px;font-size:14px;font-weight:500;line-height:20px;overflow:hidden}._9lHw_W_pageTabs{z-index:1;gap:36px;margin-top:4px;padding-left:8px;display:flex;position:relative}._9lHw_W_pageTabs button{color:var(--dsw-alias-label-tertiary);cursor:pointer;font:inherit;background:0 0;border:0;padding:0 0 11px;font-size:13px;font-weight:500;line-height:16px;position:relative}._9lHw_W_pageTabs button:after{content:\"\";background:0 0;border-radius:2px;height:2px;position:absolute;bottom:1px;left:0;right:0}._9lHw_W_pageTabs button:hover,._9lHw_W_pageTabs button[aria-current=page]{color:var(--dsw-alias-state-business-primary)}._9lHw_W_pageTabs button[aria-current=page]:after{background:var(--dsw-alias-state-business-primary)}._9lHw_W_pageTabs button:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:3px}._9lHw_W_actions{z-index:1;align-items:center;gap:8px;min-height:32px;display:flex;position:relative}._9lHw_W_actions ._9lHw_W_headerIconButton{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:28px;min-width:28px;height:28px;color:var(--dsw-alias-label-secondary);transition:all var(--ds-transition-duration-fast) var(--ds-ease-in-out);border-radius:8px;padding:0}._9lHw_W_actions ._9lHw_W_headerIconButton:hover{border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}._9lHw_W_actions ._9lHw_W_headerIconButton:disabled{opacity:.5;cursor:not-allowed}._9lHw_W_searchField{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:10px;align-items:center;gap:6px;width:220px;min-height:28px;padding:0 8px;display:flex}._9lHw_W_searchField input{min-width:0;color:inherit;font:inherit;background:0 0;border:0;outline:0;flex:1}._9lHw_W_searchField button{border:0;min-height:24px;padding:0 5px}._9lHw_W_filterMenu{position:relative}._9lHw_W_filterMenu summary{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:10px;place-items:center;width:28px;height:28px;list-style:none;display:grid;position:relative}._9lHw_W_filterMenu summary::-webkit-details-marker{display:none}._9lHw_W_filterMenu summary i{background:var(--tomato-accent,var(--dsw-alias-state-error-primary));border-radius:50%;width:5px;height:5px;position:absolute;top:5px;right:5px}._9lHw_W_filterPopover{z-index:30;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);width:min(500px,100vw - 320px);box-shadow:var(--dsw-shadow-lv3);border-radius:16px;gap:10px;padding:12px;display:grid;position:absolute;top:calc(100% + 8px);right:0}._9lHw_W_assigneeFilter{align-items:flex-start;gap:12px;display:flex}._9lHw_W_assigneeFilter>span{width:48px;color:var(--dsw-alias-label-secondary);white-space:nowrap;flex:0 0 48px;padding-top:8px;font-size:13px}._9lHw_W_assigneePicker{min-width:var(--assignee-picker-min-width,260px);position:relative}._9lHw_W_assigneeFilter ._9lHw_W_assigneeTrigger{border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 82%, transparent);width:100%;height:30px;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb, var(--dsw-alias-bg-overlay) 46%, transparent);border-radius:999px;justify-content:space-between;align-items:center;gap:12px;padding:0 8px 0 12px;font-size:12px;display:flex}._9lHw_W_assigneeFilter ._9lHw_W_assigneeTrigger:hover{background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_assigneeTrigger>span{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._9lHw_W_assigneeDropdown{z-index:40;width:var(--assignee-dropdown-width,320px);border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);box-shadow:var(--dsw-shadow-lv3);border-radius:10px;padding:8px;position:absolute;top:calc(100% + 5px);left:0}._9lHw_W_assigneeDropdown>input{border:1px solid var(--dsw-alias-border-l2);width:100%;height:32px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font:inherit;border-radius:7px;outline:0;padding:0 9px}._9lHw_W_assigneeDropdown>input:focus{border-color:var(--tomato-accent,var(--dsw-alias-state-business-primary))}._9lHw_W_assigneeDropdown>[role=listbox]{max-height:260px;margin-top:7px;overflow:auto}._9lHw_W_assigneeDropdown [role=option]{width:100%;min-height:38px;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;background:0 0;border:0;border-radius:7px;flex-direction:column;justify-content:center;align-items:flex-start;gap:2px;padding:6px 9px;display:flex}._9lHw_W_assigneeDropdown [role=option]:hover,._9lHw_W_assigneeDropdown [role=option][aria-selected=true]{background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_assigneeDropdown strong{font-size:12px;font-weight:550}._9lHw_W_assigneeDropdown small{color:var(--dsw-alias-label-secondary);font-size:10px}._9lHw_W_assigneeDropdown p{color:var(--dsw-alias-label-secondary);text-align:center;margin:0;padding:18px 8px;font-size:11px}._9lHw_W_filterRow{align-items:flex-start;gap:12px;display:flex}._9lHw_W_filterRow>span{width:48px;color:var(--dsw-alias-label-secondary);white-space:nowrap;flex:0 0 48px;padding-top:7px;font-size:13px}._9lHw_W_filterRow>div{flex-wrap:wrap;flex:1;gap:7px;display:flex}._9lHw_W_workspaceSelect{flex:1;min-width:0;display:block;position:relative}._9lHw_W_workspaceSelect>span{flex:1}._9lHw_W_filterRow ._9lHw_W_workspaceTrigger{border:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 82%, transparent);width:100%;min-height:30px;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb, var(--dsw-alias-bg-overlay) 46%, transparent);font:inherit;text-align:left;cursor:pointer;border-radius:999px;justify-content:space-between;align-items:center;gap:10px;padding:3px 8px 3px 12px;font-size:12px;display:flex}._9lHw_W_filterRow ._9lHw_W_workspaceTrigger:hover{background:var(--dsw-alias-interactive-bg-hover)}._9lHw_W_filterRow ._9lHw_W_workspaceTrigger>span{min-width:0;color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._9lHw_W_workspaceChevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s;display:inline-flex}._9lHw_W_workspaceTrigger[aria-expanded=true] ._9lHw_W_workspaceChevron{color:var(--tomato-accent,var(--dsw-alias-state-business-primary));transform:rotate(180deg)}._9lHw_W_error{color:var(--tomato-accent,var(--dsw-alias-state-error-primary));background:var(--dsw-alias-state-error-secondary);border-radius:12px;margin:16px 24px 0;padding:12px 14px}._9lHw_W_notice{color:var(--dsw-alias-label-secondary);margin:0;padding:8px 20px;font-size:11px}._9lHw_W_board{z-index:1;flex:1;align-items:flex-start;gap:12px;padding:8px 12px;display:flex;position:relative;overflow:auto}._9lHw_W_lane{border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 86%, transparent);width:300px;min-width:300px;max-height:100%;transition:transform .16s var(--ds-ease-in-out), opacity .16s var(--ds-ease-in-out), box-shadow .16s var(--ds-ease-in-out);border-radius:16px;flex-direction:column;display:flex}._9lHw_W_laneDragging{opacity:.5;transform:scale(.985)}._9lHw_W_laneDropBefore{box-shadow:-4px 0 0 var(--tomato-accent,var(--dsw-alias-state-business-primary));transform:translate(8px)}._9lHw_W_laneDropAfter{box-shadow:4px 0 0 var(--tomato-accent,var(--dsw-alias-state-business-primary));transform:translate(-8px)}._9lHw_W_laneHeader{cursor:grab;user-select:none;justify-content:space-between;align-items:center;padding:12px 14px 10px;display:flex}._9lHw_W_laneHeader:active{cursor:grabbing}@media (prefers-reduced-motion:reduce){._9lHw_W_lane{transition:none}}._9lHw_W_laneHeader h2{margin:0;font-size:14px}._9lHw_W_laneHeader span{text-align:center;min-width:22px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-overlay);border-radius:999px;padding:2px 6px;font-size:12px}._9lHw_W_cards{padding:0 8px 8px;overflow-y:auto}._9lHw_W_card{border:1px solid var(--dsw-alias-border-l2);min-width:0;max-width:100%;color:inherit;background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 96%, transparent);box-shadow:var(--dsw-shadow-lv1);text-align:left;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out), box-shadow var(--ds-transition-duration-fast) var(--ds-ease-in-out);cursor:pointer;border-radius:14px;flex-direction:column;gap:7px;margin-top:8px;padding:12px;text-decoration:none;display:flex;overflow:hidden}._9lHw_W_card:hover{border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-button-floating-hover);box-shadow:var(--dsw-shadow-lv2)}._9lHw_W_cardMuted{opacity:.46;filter:saturate(.2);box-shadow:none}._9lHw_W_cardMuted:hover{opacity:.62}._9lHw_W_card:focus-visible{outline:2px solid var(--tomato-accent,var(--dsw-alias-state-business-primary));outline-offset:2px}._9lHw_W_card strong,._9lHw_W_key,._9lHw_W_meta{overflow-wrap:anywhere;word-break:normal;min-width:0}._9lHw_W_cardTopline{justify-content:space-between;align-items:center;gap:8px;min-width:0;display:flex}._9lHw_W_cardButtons{align-items:center;gap:2px;display:inline-flex}._9lHw_W_muteButton,._9lHw_W_tomatoLink{border-radius:8px;flex:none;place-items:center;width:28px;min-width:28px;height:28px;min-height:28px;padding:0;line-height:1;display:inline-grid}._9lHw_W_muteButton{color:var(--dsw-alias-label-tertiary);font-size:9px}._9lHw_W_muteButton[aria-pressed=true]{color:var(--dsw-alias-label-primary)}._9lHw_W_card strong{font-size:14px;font-weight:600;line-height:1.45}._9lHw_W_key{color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:650}._9lHw_W_cardMeta{flex-wrap:wrap;align-items:center;gap:5px;min-width:0;display:flex}._9lHw_W_empty{color:var(--dsw-alias-label-tertiary);margin:auto}@media (width<=820px){._9lHw_W_titleRow{flex-wrap:wrap}._9lHw_W_actions{flex-wrap:wrap;justify-content:flex-end}._9lHw_W_searchField{width:170px}}";
		const tagId$3 = "@stephen1620/dsh-tomato-board/tomato-board.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephen1620/dsh-tomato-board";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
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
		const css$2 = ".d6j1rW_page{--tomato-accent:var(--dsw-alias-state-business-primary,#3478c8);--tomato-accent-soft:color-mix(in srgb, var(--tomato-accent) 10%, transparent);min-height:0;color:var(--dsw-alias-label-primary,#292d32);flex:1;padding:14px 18px 18px;overflow:auto}.d6j1rW_page *{box-sizing:border-box}.d6j1rW_page button,.d6j1rW_page select,.d6j1rW_page input{font:inherit;color:inherit;border:1px solid var(--dsw-alias-border-l2,#dedfdf);background:var(--dsw-alias-bg-base,white);border-radius:8px;min-width:0;padding:8px 12px}.d6j1rW_page button{cursor:pointer;white-space:nowrap}.d6j1rW_page button:hover{background:var(--dsw-alias-interactive-bg-hover,#f4f4f2)}.d6j1rW_page button:disabled{opacity:.5;cursor:wait}.d6j1rW_page :focus-visible{outline:2px solid var(--tomato-accent);outline-offset:3px}.d6j1rW_page h3,.d6j1rW_page h4,.d6j1rW_page p{margin:0}.d6j1rW_panelHeader,.d6j1rW_listHeading,.d6j1rW_rankLabel{justify-content:space-between;align-items:center;gap:12px;display:flex}.d6j1rW_caption,.d6j1rW_footnote,.d6j1rW_itemText small,.d6j1rW_rankRow small,.d6j1rW_listHeading span{color:var(--dsw-alias-label-secondary,#797c80);font-size:12px;line-height:1.5}.d6j1rW_eyebrow{letter-spacing:1.6px;color:var(--dsw-alias-label-secondary,#797c80);font-size:10px;font-weight:650}.d6j1rW_headerControls{align-items:center;gap:8px;display:flex}.d6j1rW_headerControls label{color:var(--dsw-alias-label-secondary,#797c80);align-items:center;gap:7px;font-size:12px;display:flex}.d6j1rW_headerControls select{border:1px solid var(--dsw-alias-border-l2,#dedfdf);width:min(320px,34vw);min-width:0;height:28px;color:var(--dsw-alias-label-primary,#292d32);background:var(--dsw-alias-bg-base,white);font:inherit;border-radius:9px;padding:0 10px}.d6j1rW_headerIconButton{border-radius:8px;width:28px;min-width:28px;height:28px;min-height:28px;padding:0!important}.d6j1rW_columns{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);align-items:start;gap:14px;display:grid}.d6j1rW_teamsHeader{border-bottom:1px solid var(--dsw-alias-border-l2,#e4e4df);justify-content:space-between;align-items:center;padding-bottom:12px;display:flex}.d6j1rW_teamsHeader h3{font-size:16px}.d6j1rW_addTeamButton{height:30px;font-weight:600;min-width:0!important;padding:0 10px!important;font-size:12px!important}.d6j1rW_teamEditor{background:var(--dsw-alias-interactive-bg-hover,#f3f3f1);border-radius:9px;align-items:center;gap:7px;margin:9px 0;padding:8px;display:flex}.d6j1rW_teamEditor input{flex:1;min-width:0}.d6j1rW_teamEditor button{padding:6px 8px;font-size:11px}.d6j1rW_teamAccordions{gap:8px;margin-top:10px;display:grid}.d6j1rW_teamAccordion{border:1px solid var(--dsw-alias-border-l2,#e4e4df);border-radius:10px;overflow:visible}.d6j1rW_teamAccordionHeader{align-items:center;gap:2px;min-height:42px;padding:4px 6px;display:flex}.d6j1rW_teamToggle{text-align:left;align-items:center;gap:8px;min-width:0;display:flex;background:0 0!important;border:0!important;padding:6px!important}.d6j1rW_teamToggle strong{text-overflow:ellipsis;min-width:0;font-size:13px;overflow:hidden}.d6j1rW_teamToggle small{color:var(--dsw-alias-label-secondary);font-size:10px}.d6j1rW_renameTeam{width:27px;height:27px;margin-left:-3px;min-width:27px!important;color:var(--dsw-alias-label-secondary)!important;background:0 0!important;border-color:#0000!important;padding:0!important}.d6j1rW_renameTeam:hover{color:var(--tomato-accent)!important}.d6j1rW_chevron{color:var(--dsw-alias-label-tertiary);font-size:18px;line-height:1;transition:transform .16s}.d6j1rW_teamToggle[aria-expanded=true] .d6j1rW_chevron{color:var(--tomato-accent);transform:rotate(90deg)}.d6j1rW_teamRowActions{gap:2px;margin-left:auto;display:flex}.d6j1rW_teamRowActions button{width:27px;min-width:27px;height:27px;color:var(--dsw-alias-label-secondary);background:0 0;border-color:#0000;padding:0}.d6j1rW_teamRowActions button:last-child:hover{color:var(--dsw-alias-state-error-primary,#bd4336)}.d6j1rW_teamBody{border-top:1px solid var(--dsw-alias-border-l2,#e4e4df);padding:10px 12px 12px;position:relative}.d6j1rW_teamBodyToolbar{color:var(--dsw-alias-label-secondary);justify-content:space-between;align-items:center;gap:8px;font-size:11px;display:flex}.d6j1rW_smallAddButton{border-radius:6px!important;padding:4px 7px!important;font-size:10px!important}.d6j1rW_teamBodyEmpty{color:var(--dsw-alias-label-secondary);text-align:center;padding:20px 8px 10px;font-size:11px}.d6j1rW_memberRow{align-items:center;gap:4px;display:flex}.d6j1rW_memberRow .d6j1rW_rankLabel{flex:1;min-width:0}.d6j1rW_rankIndex{font-variant-numeric:tabular-nums;flex:0 0 22px;width:22px;color:var(--dsw-alias-label-tertiary)!important}.d6j1rW_memberAvatar{background:var(--tomato-accent-soft);border-radius:9px;flex:0 0 28px;place-items:center;width:28px;height:28px;font-weight:750;display:inline-grid;color:var(--tomato-accent)!important;font-size:12px!important}.d6j1rW_memberIdentity{z-index:1;flex:1;gap:1px;min-width:0;display:grid;position:relative}.d6j1rW_memberIdentity strong{text-overflow:ellipsis;overflow:hidden}.d6j1rW_memberIdentity small{color:var(--dsw-alias-label-tertiary);font-size:10px;font-weight:400}.d6j1rW_rankFill{z-index:0;border-radius:inherit;background:color-mix(in srgb, var(--tomato-accent) 22%, transparent);pointer-events:none;max-width:100%;position:absolute;inset:0 auto 0 0}.d6j1rW_rankLabel>.d6j1rW_rankIndex,.d6j1rW_rankLabel>.d6j1rW_memberAvatar,.d6j1rW_rankLabel>b{z-index:1;position:relative}.d6j1rW_removeMember{opacity:0;width:25px;height:25px;min-width:25px!important;color:var(--dsw-alias-label-tertiary)!important;background:0 0!important;border-color:#0000!important;padding:0!important}.d6j1rW_memberRow:hover .d6j1rW_removeMember,.d6j1rW_removeMember:focus-visible{opacity:1}.d6j1rW_removeMember:hover{color:var(--dsw-alias-state-error-primary,#bd4336)!important}.d6j1rW_panel{border:1px solid var(--dsw-alias-border-l2,#e4e4df);background:var(--dsw-alias-bg-base,white);border-radius:14px;min-width:0;padding:16px}.d6j1rW_panelHeader{border-bottom:1px solid var(--dsw-alias-border-l2,#e4e4df);padding-bottom:12px}.d6j1rW_panelHeader h3{white-space:nowrap;font-size:16px}.d6j1rW_panelHeader select{max-width:65%;font-size:12px}.d6j1rW_panelHeader button{font-size:12px}.d6j1rW_summary{justify-content:space-between;align-items:center;gap:16px;padding:16px 0;display:flex}.d6j1rW_total{font-variant-numeric:tabular-nums;letter-spacing:-2px;font-size:48px;font-weight:600;line-height:1.15}.d6j1rW_total small{letter-spacing:0;color:var(--dsw-alias-label-secondary,#797c80);font-size:15px}.d6j1rW_pie{background:var(--dsw-alias-border-l2,#e7e7e2);width:136px;height:136px;box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--dsw-alias-border-l2,#ddd) 55%, transparent), 0 14px 36px #00000012;border-radius:50%;flex:0 0 136px;padding:17px;position:relative;transform:rotate(-90deg)}.d6j1rW_pie:after{content:\"\";border:1px solid color-mix(in srgb, var(--tomato-accent) 24%, transparent);border-radius:50%;position:absolute;inset:-6px}.d6j1rW_pie>div{z-index:1;background:var(--dsw-alias-bg-base,white);width:100%;height:100%;box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l2,#e7e7e2);border-radius:50%;flex-direction:column;justify-content:center;align-items:center;display:flex;position:relative;transform:rotate(90deg)}.d6j1rW_pie strong{font-size:28px;line-height:1}.d6j1rW_pie span{letter-spacing:.08em;color:var(--dsw-alias-label-secondary,#797c80);margin-top:5px;font-size:10px}.d6j1rW_listHeading{padding:10px 0}.d6j1rW_listHeading h4{font-size:13px}.d6j1rW_item{border-top:1px solid var(--dsw-alias-border-l2,#e4e4df);align-items:center;gap:10px;padding:10px 12px;display:flex}.d6j1rW_dot{border-radius:3px;flex-shrink:0;width:8px;height:8px}.d6j1rW_itemText{flex:1;min-width:0}.d6j1rW_itemTitle{color:inherit;overflow-wrap:anywhere;font-size:13px;line-height:1.5;text-decoration:none}.d6j1rW_itemTitle:hover{text-decoration:underline}.d6j1rW_itemText small{margin-right:7px;font-size:10px;display:inline-block}.d6j1rW_itemPoints{white-space:nowrap;font-variant-numeric:tabular-nums;font-size:12px}.d6j1rW_item button{padding:5px 8px;font-size:11px}.d6j1rW_chips{flex-wrap:wrap;gap:8px;margin:12px 0 8px;display:flex}.d6j1rW_chips>span{background:var(--dsw-alias-interactive-bg-hover,#f2f3f0);border-radius:6px;align-items:center;gap:6px;padding:3px 5px 3px 10px;font-size:12px;display:flex}.d6j1rW_chips button{background:0 0;border:0;padding:1px 5px}.d6j1rW_ranking{gap:3px;margin-top:8px;display:grid}.d6j1rW_rankRow{border-radius:9px}.d6j1rW_rankLabel{text-align:left;background:0 0;border:0;border-radius:9px;gap:8px;width:100%;min-height:48px;padding:6px 4px;font-size:13px;position:relative}.d6j1rW_rankLabel:hover{color:var(--tomato-accent);box-shadow:inset 0 0 0 1.5px color-mix(in srgb, var(--tomato-accent) 45%, transparent);background:0 0!important}.d6j1rW_rankLabel[aria-pressed=true]{color:var(--tomato-accent);box-shadow:inset 0 0 0 1.5px var(--tomato-accent);background:0 0!important}.d6j1rW_rankLabel[aria-pressed=true] .d6j1rW_memberAvatar{background:var(--tomato-accent);color:#fff!important}.d6j1rW_rankLabel b{font-variant-numeric:tabular-nums;flex:none;font-size:13px}.d6j1rW_track{display:none}.d6j1rW_footnote{border-top:1px solid var(--dsw-alias-border-l2,#e4e4df);padding-top:12px;font-size:11px;margin-top:20px!important}.d6j1rW_empty{text-align:center;color:var(--dsw-alias-label-secondary,#797c80);padding:36px 12px;font-size:13px}.d6j1rW_empty h4{margin-bottom:8px}.d6j1rW_emptyIcon{color:var(--tomato-accent);margin-bottom:12px;font-size:32px;display:block}.d6j1rW_error{color:var(--dsw-alias-state-error-primary,#bd4336);overflow-wrap:anywhere;padding:10px 0;font-size:12px}.d6j1rW_notice{color:var(--dsw-alias-label-secondary,#797c80);padding:8px 0;font-size:12px}.d6j1rW_teamHeader{overflow:visible}.d6j1rW_addPeopleRoot{position:relative}.d6j1rW_addPeople{z-index:30;border:1px solid var(--dsw-alias-border-l2,#ddd);background:var(--dsw-alias-bg-layer-2,white);border-radius:12px;width:min(330px,72vw);padding:10px;position:absolute;top:calc(100% + 7px);right:0;box-shadow:0 16px 46px #0002}.d6j1rW_addPeopleTitle{justify-content:space-between;align-items:center;gap:10px;display:flex;margin:0 0 8px!important}.d6j1rW_addPeopleTitle strong{font-size:12px}.d6j1rW_addPeopleTitle button{justify-content:center;min-width:26px;height:26px;width:26px!important;padding:0!important}.d6j1rW_addPeople input{width:100%}.d6j1rW_addPeople>div:last-child{max-height:210px;margin-top:8px;overflow:auto}.d6j1rW_addPeople>div:last-child>button{text-align:left;border:0;gap:8px;width:100%;display:flex}.d6j1rW_addPeople small{opacity:.6;flex:1}@media (width<=1000px){.d6j1rW_columns{grid-template-columns:1fr}.d6j1rW_page{padding:14px}}@media (width<=620px){.d6j1rW_teamHeader{flex-direction:column;align-items:flex-start}.d6j1rW_teamActions{justify-content:flex-start}.d6j1rW_memberToolbar{flex-direction:column;align-items:stretch}}@media (width<=540px){.d6j1rW_page{padding:10px}.d6j1rW_panel{padding:12px}.d6j1rW_headerControls label>span{display:none}.d6j1rW_headerControls select{width:min(220px,55vw)}.d6j1rW_pie{flex-basis:120px;width:120px;height:120px;padding:16px}.d6j1rW_total{font-size:42px}.d6j1rW_item{gap:7px}}.d6j1rW_item[role=button]{cursor:pointer;border-radius:8px}.d6j1rW_item[role=button]:hover{background:var(--dsw-alias-interactive-bg-hover)}.d6j1rW_item[role=button]:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.d6j1rW_item .d6j1rW_tomatoLink{background:0 0;border:0;flex:none;width:28px;height:28px;padding:0}";
		const tagId$2 = "@stephen1620/dsh-tomato-board/story-points.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephen1620/dsh-tomato-board";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
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
		//#region src/client/StoryPoints.tsx
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
		//#region src/worktime-model.ts
		/** A Task may cover several ranges even though its record belongs to the first. */
		function unitHasCreatedTasks(unit, units) {
			return units.some((owner) => owner.itemKey === unit.itemKey && owner.tasks.some((task) => task.status === "created" && task.start <= unit.end && task.end >= unit.start));
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
			removeRange: "删除",
			confirmDelete: "确认删除",
			deleteKeepsTasks: "删除后番茄中已创建的 Task 会保留，并作为历史 Task 继续显示在日历上",
			rangeEmpty: "请至少保留一个时间段",
			rangeRemoved: "时间段已删除",
			rangeIncomplete: "请填写完整的时间段（开始与结束日期）",
			rangeInvalid: "时间段的结束日期不能早于开始日期",
			rangeHint: "时间段可以增删；同一需求的多个时间段会合并计算 Task 人天。",
			start: "开始日期",
			end: "结束日期",
			saveRanges: "保存时间段",
			edit: "工时分配",
			editHint: "每个阶段创建一个直属 Task。标题已结合需求润色，可直接修改。",
			unallocated: "剩余未分配",
			overAllocate: "阶段合计不能大于合计天数",
			project: "所属项目",
			owner: "负责人",
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
			splitHint: "仅填写需要的阶段，留空的阶段不会创建。每个阶段至少 0.5 人天、按 0.5 递增，合计不能大于总天数。",
			retryHint: "上次创建结果待核对。已有 Task 编号的记录不能直接重建；无编号的记录须先确认番茄中没有对应 Task，再重试。",
			confirmRetry: "已核对番茄，确认没有本次待核对记录对应的 Task",
			locked: "已创建 Task 的时间段已锁定并保留历史（日期不可改、不再重复提交）；新增的时间段可以继续安排工时并创建 Task。",
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
		const css = "._9MUeuG_page{--wt-accent:var(--dsw-alias-state-business-primary);--wt-task:var(--dsw-alias-state-success-primary,var(--dsw-alias-state-business-primary));--wt-line:var(--dsw-alias-border-l2);--wt-bg:var(--dsw-alias-bg-base);--wt-text:var(--dsw-alias-label-primary);--wt-muted:var(--dsw-alias-label-secondary);color:var(--wt-text);box-sizing:border-box;flex-direction:column;flex:1 1 0;min-height:0;padding:10px 14px;display:flex;overflow:hidden}._9MUeuG_toolbar{flex:none;justify-content:space-between;align-items:center;gap:12px;margin-bottom:8px;display:flex}._9MUeuG_period{flex-wrap:wrap;align-items:center;gap:16px;display:flex}._9MUeuG_toolbar h2{font-variant-numeric:tabular-nums;letter-spacing:-.04em;margin:0;font-size:18px;font-weight:600;line-height:1.4}._9MUeuG_toolbar h2>span{color:var(--wt-muted);padding:0 6px}._9MUeuG_page button,._9MUeuG_form button{cursor:pointer;font:inherit}._9MUeuG_navigation{flex-wrap:wrap;gap:6px;display:flex}._9MUeuG_navigation button,._9MUeuG_unitSummary button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:6px;padding:4px 8px;font-size:12px;line-height:1.5}._9MUeuG_navigation button:hover{background:var(--dsw-alias-interactive-bg-hover)}._9MUeuG_page button:focus-visible,._9MUeuG_form button:focus-visible,._9MUeuG_form input:focus-visible,._9MUeuG_page input:focus-visible,._9MUeuG_form select:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}._9MUeuG_legend{color:var(--wt-muted);align-items:center;gap:5px;margin:0;font-size:11px;display:flex}._9MUeuG_legend small{margin-left:auto;font-size:11px}._9MUeuG_storyDot,._9MUeuG_taskDot{background:var(--wt-accent);border-radius:2px;width:8px;height:8px;display:inline-block}._9MUeuG_taskDot{background:var(--dsw-alias-state-success-primary,var(--wt-text));border-radius:50%;margin-left:12px}._9MUeuG_help{color:var(--dsw-alias-label-secondary);margin:8px 0 12px;font-size:11px;line-height:1.7}._9MUeuG_calendarArea{flex-direction:column;flex:1;min-width:0;min-height:0;display:flex}._9MUeuG_dragging ._9MUeuG_bar{pointer-events:none}._9MUeuG_calendar{border:1px solid var(--wt-line);background:var(--wt-bg);border-radius:12px;flex:1;grid-template-rows:auto repeat(5,minmax(0,1fr));grid-template-columns:repeat(7,minmax(0,1fr));min-height:0;display:grid;overflow:hidden}._9MUeuG_weekday{text-align:center;color:var(--wt-muted);background:var(--dsw-alias-interactive-bg-hover);border-bottom:1px solid var(--wt-line);padding:5px 8px;font-size:11px}._9MUeuG_week{border-bottom:1px solid var(--wt-line);grid-column:1/-1;min-height:0;display:flex;position:relative;overflow:hidden}._9MUeuG_week:last-of-type{border-bottom:0}._9MUeuG_day{border-right:1px solid var(--wt-line);user-select:none;cursor:pointer;touch-action:none;flex:1 1 0;min-width:0;min-height:0;padding:4px 5px 5px;transition:background .12s;position:relative;overflow:hidden}._9MUeuG_day:nth-child(7){border-right:0}._9MUeuG_weekend{background:color-mix(in srgb, var(--wt-text) 5%, var(--wt-bg))}._9MUeuG_selectedDay{background:color-mix(in srgb, var(--wt-accent) 15%, var(--wt-bg));box-shadow:inset 0 0 0 1px var(--wt-accent)}._9MUeuG_dayNumber{min-width:24px;height:24px;color:var(--wt-text);font-variant-numeric:tabular-nums;background:0 0;border:0;border-radius:999px;justify-content:flex-start;align-items:center;gap:2px;margin:0 0 0 1px;padding:0 5px;display:inline-flex}._9MUeuG_week ._9MUeuG_dayNumber{letter-spacing:-.01em;font-size:14px;font-weight:600;line-height:1}._9MUeuG_dayNumber small{color:var(--wt-muted);font-size:10px;font-weight:400}._9MUeuG_events{z-index:1;pointer-events:none;grid-template-columns:repeat(7,minmax(0,1fr));grid-auto-rows:20px;align-content:start;gap:3px;padding-top:30px;display:grid;position:absolute;top:0;left:0;right:0}._9MUeuG_events ._9MUeuG_bar:hover{filter:brightness(.96)}._9MUeuG_events ._9MUeuG_bar{pointer-events:auto;white-space:nowrap;text-overflow:ellipsis;text-align:left;cursor:pointer;min-width:0;color:var(--wt-text);border-radius:4px;margin:0 3px;padding:0 5px;font-size:11px;line-height:18px;overflow:hidden}._9MUeuG_barUnit{border:1px solid color-mix(in srgb, var(--wt-accent) 30%, transparent);border-left:3px solid var(--wt-accent);background:color-mix(in srgb, var(--wt-accent) 12%, var(--wt-bg))}._9MUeuG_barTask{border:1px solid color-mix(in srgb, var(--wt-task) 26%, transparent);border-left:3px solid var(--wt-task);background:color-mix(in srgb, var(--wt-task) 10%, var(--wt-bg))}._9MUeuG_barUnverified{border:1px dashed color-mix(in srgb, var(--wt-task) 45%, transparent);border-left:3px solid var(--wt-task);background:color-mix(in srgb, var(--wt-task) 6%, var(--wt-bg))}._9MUeuG_readOnlyTag{border:1px solid var(--wt-line);color:var(--wt-muted);white-space:nowrap;border-radius:999px;flex:none;align-self:center;padding:2px 8px;font-size:11px}._9MUeuG_error{color:var(--dsw-alias-state-error-primary);overflow-wrap:anywhere;font-size:12px;line-height:1.7}._9MUeuG_notice{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);border-radius:7px;padding:8px 12px;font-size:11px;line-height:1.7}._9MUeuG_dialog{max-width:94vw;width:min(850px,94vw)!important}._9MUeuG_dialogNarrow{max-width:92vw;width:min(420px,92vw)!important}._9MUeuG_form{color:var(--dsw-alias-label-primary);max-height:68vh;padding:6px;overflow-y:auto}._9MUeuG_form input:not([type=checkbox]),._9MUeuG_form select{box-sizing:border-box;width:100%;min-width:0;font:inherit;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:7px;padding:8px 10px;font-size:12px}._9MUeuG_form input:read-only{opacity:.75}._9MUeuG_form label{color:var(--dsw-alias-label-secondary);gap:6px;font-size:11px;display:grid}._9MUeuG_twoColumns{grid-template-columns:1fr 1fr;gap:12px;margin:12px 0;display:grid}._9MUeuG_ranges{gap:8px;margin:8px 0;display:grid}._9MUeuG_rangeRow{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto auto;align-items:center;gap:8px;display:grid}._9MUeuG_rangeRow small{color:var(--dsw-alias-label-secondary);white-space:nowrap;font-variant-numeric:tabular-nums;font-size:11px}._9MUeuG_rangeRow>button{color:var(--dsw-alias-state-error-primary);background:0 0;border:0;padding:0 2px;font-size:11px}._9MUeuG_rangeRow>button._9MUeuG_danger{color:var(--wt-bg);background:var(--dsw-alias-state-error-primary);border-radius:4px;padding:1px 6px;font-weight:600}._9MUeuG_addRange{border:1px dashed var(--dsw-alias-border-l2);color:var(--dsw-alias-state-business-primary);background:0 0;border-radius:7px;justify-self:start;margin-bottom:14px;padding:6px 10px;font-size:12px}._9MUeuG_unitSummary{border-bottom:1px solid var(--dsw-alias-border-l2);align-items:center;gap:12px;padding-bottom:10px;font-size:12px;display:flex}._9MUeuG_unitSummary span{color:var(--dsw-alias-label-secondary)}._9MUeuG_unitSummary button{margin-left:auto}._9MUeuG_stageHeading{justify-content:space-between;align-items:center;margin-top:18px;display:flex}._9MUeuG_stageHeading h3{margin:0;font-size:14px;line-height:1.5}._9MUeuG_stageHeading span{color:var(--dsw-alias-label-secondary);font-size:11px}._9MUeuG_stageHeading b{color:var(--dsw-alias-state-business-primary)}._9MUeuG_stages{gap:10px;margin-bottom:18px;display:grid}._9MUeuG_stageRow{grid-template-columns:130px minmax(0,1fr);gap:12px;display:grid}._9MUeuG_result{border-bottom:1px solid var(--dsw-alias-border-l2);gap:6px;padding:10px 0;display:grid}._9MUeuG_result strong{font-size:12px;font-weight:550;line-height:1.6}._9MUeuG_result small{color:var(--dsw-alias-label-secondary);font-size:11px}._9MUeuG_result button{color:var(--dsw-alias-state-business-primary);background:0 0;border:0;justify-self:start;padding:0;font-size:11px}@media (width<=1000px){._9MUeuG_page{padding:8px 10px}._9MUeuG_toolbar h2{font-size:18px}}@media (width<=720px){._9MUeuG_toolbar{flex-wrap:wrap;align-items:center}._9MUeuG_period{gap:6px 12px}._9MUeuG_navigation{gap:4px}._9MUeuG_legend small{display:none}._9MUeuG_twoColumns{grid-template-columns:1fr}._9MUeuG_stageRow{grid-template-columns:100px minmax(0,1fr)}._9MUeuG_rangeRow{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}}@media (prefers-reduced-motion:reduce){._9MUeuG_day{transition:none}}._9MUeuG_userPicker{--assignee-picker-min-width:150px;--assignee-dropdown-width:280px;align-items:center}";
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
			"barTask": "_9MUeuG_barTask",
			"barUnit": "_9MUeuG_barUnit",
			"barUnverified": "_9MUeuG_barUnverified",
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
			"legend": "_9MUeuG_legend",
			"navigation": "_9MUeuG_navigation",
			"notice": "_9MUeuG_notice",
			"page": "_9MUeuG_page",
			"period": "_9MUeuG_period",
			"rangeRow": "_9MUeuG_rangeRow",
			"ranges": "_9MUeuG_ranges",
			"readOnlyTag": "_9MUeuG_readOnlyTag",
			"result": "_9MUeuG_result",
			"selectedDay": "_9MUeuG_selectedDay",
			"stageHeading": "_9MUeuG_stageHeading",
			"stageRow": "_9MUeuG_stageRow",
			"stages": "_9MUeuG_stages",
			"storyDot": "_9MUeuG_storyDot",
			"taskDot": "_9MUeuG_taskDot",
			"toolbar": "_9MUeuG_toolbar",
			"twoColumns": "_9MUeuG_twoColumns",
			"unitSummary": "_9MUeuG_unitSummary",
			"userPicker": "_9MUeuG_userPicker",
			"week": "_9MUeuG_week",
			"weekday": "_9MUeuG_weekday",
			"weekend": "_9MUeuG_weekend"
		};
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
		const openItem = (itemKey) => window.open(`/api/tomato-board/open/${encodeURIComponent(itemKey)}`, "_blank", "noopener,noreferrer");
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
			const [items, setItems] = (0, react.useState)([]);
			const [anchor, setAnchor] = (0, react.useState)(todayKey);
			const [units, setUnits] = (0, react.useState)([]);
			const [history, setHistory] = (0, react.useState)([]);
			const [error, setError] = (0, react.useState)("");
			const [historyError, setHistoryError] = (0, react.useState)("");
			const [loading, setLoading] = (0, react.useState)(false);
			const [version, setVersion] = (0, react.useState)(0);
			const [selectedStory, setSelectedStory] = (0, react.useState)("");
			const [selection, setSelection] = (0, react.useState)(null);
			const [choosing, setChoosing] = (0, react.useState)(false);
			const [dragging, setDragging] = (0, react.useState)(false);
			const [editingKey, setEditingKey] = (0, react.useState)("");
			const [saving, setSaving] = (0, react.useState)(false);
			const [message, setMessage] = (0, react.useState)("");
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
			(0, react.useEffect)(() => {
				pending.current = selection;
			}, [selection]);
			(0, react.useEffect)(() => {
				readOnlyRef.current = readOnly;
			}, [readOnly]);
			(0, react.useEffect)(() => {
				const controller = new AbortController();
				setLoading(true);
				setError("");
				setItems([]);
				setUnits([]);
				const query = encodeURIComponent(assignee);
				Promise.all([api(`?assignee=${query}`, void 0, controller.signal).then((data) => setUnits(data.units)), fetch(`/api/tomato-board/items?assignee=${query}`, {
					signal: controller.signal,
					headers: { accept: "application/json" }
				}).then(async (response) => {
					const data = await response.json();
					if (!response.ok) throw new Error(data.error || worktimeText.readFailed);
					setItems(data.items ?? []);
				})]).catch((error) => {
					if (!controller.signal.aborted) setError(errorText(error));
				}).finally(() => {
					if (!controller.signal.aborted) setLoading(false);
				});
				return () => controller.abort();
			}, [version, assignee]);
			(0, react.useEffect)(() => {
				const controller = new AbortController();
				setHistoryError("");
				setHistory([]);
				api(`/history?start=${start}&end=${end}&assignee=${encodeURIComponent(assignee)}`, void 0, controller.signal).then((data) => {
					setHistory(data.tasks);
					if (data.truncated) setHistoryError(worktimeText.historyFailed);
				}).catch((error) => {
					if (!controller.signal.aborted) setHistoryError(`${worktimeText.historyFailed}：${errorText(error)}`);
				});
				return () => controller.abort();
			}, [
				start,
				end,
				version,
				assignee
			]);
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
					setUnits((await api(`?assignee=${encodeURIComponent(assignee)}`)).units);
					setEditingKey(itemKey);
					closePicker();
					setMessage(worktimeText.saved);
				} catch (error) {
					setError(errorText(error));
				} finally {
					setSaving(false);
				}
			}
			const knownKeys = new Set(units.flatMap((unit) => unit.tasks.flatMap((task) => task.itemKey ? [task.itemKey] : [])));
			const remote = history.filter((task) => !knownKeys.has(task.itemKey));
			const weeks = [];
			for (let i = 0; i < dates.length; i += 7) weeks.push(dates.slice(i, i + 7));
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
				for (const unit of units) {
					const c = clip(unit.start, unit.end);
					if (!c) continue;
					bars.push({
						key: `u-${unit.id}-${weekStart}`,
						kind: "unit",
						...c,
						lane: 0,
						label: unit.title,
						tip: `${worktimeText.request} · ${unit.itemKey} · ${unit.start} ~ ${unit.end} · ${datesBetween(unit.start, unit.end).length}${worktimeText.days}`,
						onClick: () => setEditingKey(unit.itemKey)
					});
					for (const [i, task] of unit.tasks.entries()) {
						const tc = clip(task.start, task.end);
						if (!tc) continue;
						bars.push({
							key: `t-${unit.id}-${i}-${weekStart}`,
							kind: "task",
							...tc,
							lane: 0,
							unverified: task.status !== "created",
							label: task.title,
							tip: task.error || `${worktimeText.task} · ${task.start} ~ ${task.end} · ${task.days}${worktimeText.personDays}${task.itemKey ? ` · ${task.itemKey}` : ""} · ${task.status === "created" ? worktimeText.created : task.status === "pending" ? worktimeText.pending : worktimeText.uncertain}`,
							onClick: () => setEditingKey(unit.itemKey)
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
						label: task.title,
						tip: `${worktimeText.task} · ${task.status} · ${task.itemKey} · ${task.start} ~ ${task.end}`,
						onClick: () => openItem(task.itemKey)
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
			const editingUnits = editingKey ? sorted(units.filter((unit) => unit.itemKey === editingKey)) : [];
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: worktime_module_css_default.page,
				children: [
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
								})
							]
						})]
					}),
					error && !choosing && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						role: "alert",
						className: worktime_module_css_default.error,
						children: error
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
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("section", {
						className: worktime_module_css_default.calendarArea,
						"aria-label": worktimeText.dateSelection,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: `${worktime_module_css_default.calendar} ${dragging ? worktime_module_css_default.dragging : ""}`,
							children: [worktimeText.weekdays.map((day) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: worktime_module_css_default.weekday,
								children: day
							}, day)), weeks.map((weekDates) => {
								const bars = buildBars(weekDates);
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: worktime_module_css_default.week,
									children: [weekDates.map((day, di) => {
										const selected = range && day >= range[0] && day <= range[1];
										const isToday = day === todayKey();
										return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: `${worktime_module_css_default.day} ${di < 2 ? worktime_module_css_default.weekend : ""} ${selected ? worktime_module_css_default.selectedDay : ""}`,
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
										children: bars.map((bar) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											title: bar.tip,
											onClick: bar.onClick,
											className: `${worktime_module_css_default.bar} ${bar.kind === "unit" ? worktime_module_css_default.barUnit : bar.unverified ? worktime_module_css_default.barUnverified : worktime_module_css_default.barTask}`,
											style: {
												gridColumn: `${bar.startCol} / span ${bar.span}`,
												gridRow: String(bar.lane + 1)
											},
											children: bar.label
										}, bar.key))
									})]
								}, weekDates[0]);
							})]
						})
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
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
								"aria-label": worktimeText.pickTitle,
								value: selectedStory,
								onChange: (event) => setSelectedStory(event.target.value),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
									value: "",
									children: worktimeText.placeholder
								}), requirements.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("option", {
									value: item.itemKey,
									children: [
										item.itemKey,
										" · ",
										item.title
									]
								}, item.itemKey))]
							}), error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: worktime_module_css_default.error,
								role: "alert",
								children: error
							})]
						})
					}),
					editingKey && editingUnits.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GroupEditor, {
						itemKey: editingKey,
						units: editingUnits,
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
		function GroupEditor({ itemKey, units, onClose, onSaved }) {
			const title = units[0]?.title || itemKey;
			const savedUnits = (0, react.useRef)(units);
			const [meta, setMeta] = (0, react.useState)(null);
			const [error, setError] = (0, react.useState)("");
			const [busy, setBusy] = (0, react.useState)(false);
			const [cost, setCost] = (0, react.useState)(units[0]?.cost || "");
			const [team, setTeam] = (0, react.useState)(units[0]?.team || "");
			const [category, setCategory] = (0, react.useState)(units[0]?.category || "");
			const [pendingDelete, setPendingDelete] = (0, react.useState)(null);
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
				const task = units.filter((unit) => !unitHasCreatedTasks(unit, units)).flatMap((unit) => unit.tasks).find((item) => item.stage === stage);
				return [stage, {
					days: task ? String(task.days) : "",
					title: task?.title || taskTitle(title, stage)
				}];
			})));
			const hasCreated = units.some((unit) => unit.tasks.some((task) => task.status === "created"));
			const openCount = ranges.filter((range) => !range.locked).length;
			const retried = units.some((unit) => unit.tasks.some((task) => task.status !== "pending" && task.status !== "created"));
			const count = (0, react.useMemo)(() => {
				const valid = ranges.filter((range) => !range.locked && range.start && range.end && range.end >= range.start);
				try {
					return valid.length ? unitDates(valid).length : 0;
				} catch {
					return 0;
				}
			}, [ranges]);
			const plannedCount = (0, react.useMemo)(() => {
				const valid = ranges.filter((range) => range.start && range.end && range.end >= range.start);
				try {
					return valid.length ? unitDates(valid).length : 0;
				} catch {
					return 0;
				}
			}, [ranges]);
			const createdTasks = units.flatMap((unit) => unit.tasks).filter((task) => task.status === "created");
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
			const changeRange = (key, patch) => setRanges((current) => current.map((range) => range.key === key ? {
				...range,
				...patch
			} : range));
			/** Read the requirement's stored ranges; the server merges touching ones already. */
			async function loadGroup() {
				const data = await api("?assignee=currentUser()");
				savedUnits.current = data.units.filter((unit) => unit.itemKey === itemKey);
				return data.units.filter((unit) => unit.itemKey === itemKey).sort((a, b) => a.start < b.start ? -1 : a.start > b.start ? 1 : 0).map((unit) => ({
					key: unit.id,
					id: unit.id,
					revision: unit.revision,
					start: unit.start,
					end: unit.end,
					locked: unitHasCreatedTasks(unit, data.units)
				}));
			}
			/** Persist ranges first so creation always sees the exact saved revisions. */
			async function persistRanges() {
				const open = ranges.filter((range) => !range.locked);
				if (!open.length) throw new Error(worktimeText.rangeEmpty);
				for (const range of open) {
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
				return next.filter((range) => !range.locked && range.id).map((range) => ({
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
			/** A plan that already created Tasks asks once more before it is removed. */
			async function askRemove(range) {
				if (busy) return;
				if (range.locked && pendingDelete !== range.key) {
					setPendingDelete(range.key);
					setError("");
					return;
				}
				setPendingDelete(null);
				await removeRange(range);
			}
			/** Removing a saved range takes effect immediately; unsaved rows just disappear. */
			async function removeRange(range) {
				if (busy) return;
				if (!range.id) {
					setRanges((current) => current.filter((value) => value.key !== range.key));
					return;
				}
				setBusy(true);
				setError("");
				try {
					await api("/delete", {
						id: range.id,
						revision: range.revision ?? 0
					});
					setRanges(await loadGroup());
					onSaved(worktimeText.rangeRemoved);
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
						disabled: busy || !openCount,
						onClick: () => void saveRanges(),
						children: busy ? worktimeText.saving : worktimeText.saveRanges
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "primary",
						disabled: busy || !openCount || !meta || !cost || !team || !category || !inputTasks.length || over || retried && !confirmRetry,
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
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => openItem(itemKey),
									children: [worktimeText.view, " ↗"]
								})
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
								worktimeText.days
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
										"aria-label": worktimeText.removeRange,
										disabled: busy,
										className: pendingDelete === range.key ? worktime_module_css_default.danger : void 0,
										onClick: () => void askRemove(range),
										children: pendingDelete === range.key ? worktimeText.confirmDelete : worktimeText.removeRange
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
								task.itemKey && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => openItem(task.itemKey),
									children: [task.itemKey, " ↗"]
								}),
								task.skipped?.length ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
									worktimeText.skippedFields,
									"：",
									task.skipped.join("、")
								] }) : null
							]
						}, task.itemKey || i))] }),
						openCount > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
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
						pendingDelete && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: worktime_module_css_default.notice,
							children: worktimeText.deleteKeepsTasks
						}),
						units.flatMap((unit) => unit.tasks).filter((task) => task.status !== "created").map((task, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
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
								task.itemKey && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => openItem(task.itemKey),
									children: [task.itemKey, " ↗"]
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
		//#endregion
		//#region src/client/TomatoBoard.tsx
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
			const [search, setSearch] = (0, react.useState)(readSearch);
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
													onChange: (event) => {
														const value = event.target.value;
														setSearch(value);
														saveSearch(value);
													},
													placeholder: "搜索标题或 tag…",
													"aria-label": "搜索标题或 tag"
												}),
												search && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-label": "清空搜索词",
													onClick: () => {
														setSearch("");
														saveSearch("");
													},
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
									"aria-current": page === "points" ? "page" : void 0,
									onClick: () => setPage("points"),
									children: "迭代投入"
								})
							]
						})]
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
					}, selectedAssignee) : page === "points" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StoryPoints, {
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