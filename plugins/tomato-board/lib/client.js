window.__ModuleLoader__.load({
	id: "@stephen1620/dsh-tomato-board",
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
		const css$1 = ".Y6kksa_sidebarAction{width:100%;min-height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;white-space:nowrap;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out);background:0 0;border:0;border-radius:10px;align-items:center;gap:9px;margin:0;padding:0 10px;display:flex}.Y6kksa_sidebarAction:hover{background:var(--dsw-alias-interactive-bg-hover)}.Y6kksa_topbarAction{border:1px solid var(--dsw-alias-border-l2);min-height:28px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);cursor:pointer;font:inherit;white-space:nowrap;border-radius:8px;align-items:center;gap:7px;padding:4px 9px;font-size:12px;font-weight:600;display:inline-flex}.Y6kksa_topbarAction:hover{border-color:color-mix(in srgb, var(--dsw-alias-state-error-primary) 45%, var(--dsw-alias-border-l2));background:var(--dsw-alias-interactive-bg-hover)}.Y6kksa_topbarAction:focus-visible{outline:2px solid var(--dsw-alias-state-error-primary);outline-offset:2px}.Y6kksa_topbarAction .Y6kksa_tomatoIcon{border-radius:5px;width:16px;height:16px;font-size:10px}.Y6kksa_tomatoIcon{width:18px;height:18px;color:var(--dsw-alias-label-primary-inverted);background:var(--dsw-alias-state-error-primary);border-radius:6px;flex:none;place-items:center;font-size:11px;font-weight:750;display:inline-grid}.Y6kksa_transitionTrigger{align-items:center;gap:6px;display:inline-flex}.Y6kksa_transitionCaption{color:var(--dsw-alias-label-secondary);font-size:12px}.Y6kksa_transitionTrigger strong{color:var(--dsw-alias-label-primary);font-size:12px;font-weight:650}.Y6kksa_transitionDivider{background:var(--dsw-alias-border-l2);width:1px;height:14px;margin:0 2px}.Y6kksa_transitionAction{color:var(--dsw-alias-state-business-primary);font-size:12px;font-weight:650}.Y6kksa_transitionChevron{color:var(--dsw-alias-state-business-primary);transition:transform var(--ds-transition-duration-fast) var(--ds-ease-in-out)}.Y6kksa_transitionTrigger[aria-expanded=true] .Y6kksa_transitionChevron{transform:rotate(180deg)}.Y6kksa_workbench{min-width:0;height:100%;min-height:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-family:var(--dsw-font-family);flex-direction:column;flex:1;display:flex;position:relative}.Y6kksa_createDialog{width:min(480px,100%)}.Y6kksa_dialogBody{flex-direction:column;gap:12px;display:flex}.Y6kksa_dialogBody>span{color:var(--dsw-alias-state-error-primary);font-size:12px;font-weight:700}.Y6kksa_dialogBody code{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;font-size:13px}.Y6kksa_workspaceTrigger{justify-content:space-between;width:100%;display:flex}.Y6kksa_header{z-index:20;border-bottom:1px solid color-mix(in srgb, var(--dsw-alias-border-l2) 72%, transparent);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 72%, transparent);backdrop-filter:blur(16px);justify-content:space-between;align-items:center;min-height:52px;padding:8px 16px;display:flex;position:relative}.Y6kksa_header h1{margin:0;font-size:16px;line-height:22px}.Y6kksa_header p{color:var(--dsw-alias-label-secondary);margin:1px 0 0;font-size:12px;line-height:16px}.Y6kksa_actions{align-items:center;gap:8px;display:flex}.Y6kksa_actions button{border:1px solid var(--dsw-alias-border-l2);min-height:34px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-button-elevated-fill);cursor:pointer;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out);border-radius:10px;padding:0 14px}.Y6kksa_actions button:hover{border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-button-floating-hover)}.Y6kksa_actions button:disabled{cursor:wait;opacity:.55}.Y6kksa_actions .Y6kksa_headerIconButton{border-radius:8px;width:34px;min-width:34px;height:34px;min-height:34px;padding:0}.Y6kksa_searchField{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:10px;align-items:center;gap:6px;width:220px;min-height:34px;padding:0 8px;display:flex}.Y6kksa_searchField input{min-width:0;color:inherit;font:inherit;background:0 0;border:0;outline:0;flex:1}.Y6kksa_searchField button{border:0;min-height:24px;padding:0 5px}.Y6kksa_filterMenu{position:relative}.Y6kksa_filterMenu summary{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:10px;place-items:center;width:34px;height:34px;list-style:none;display:grid;position:relative}.Y6kksa_filterMenu summary::-webkit-details-marker{display:none}.Y6kksa_filterMenu summary i{background:var(--dsw-alias-state-error-primary);border-radius:50%;width:5px;height:5px;position:absolute;top:5px;right:5px}.Y6kksa_filterPopover{z-index:30;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);width:min(760px,100vw - 320px);box-shadow:var(--dsw-shadow-lv3);border-radius:16px;gap:12px;padding:14px;display:grid;position:absolute;top:calc(100% + 8px);right:0}.Y6kksa_assigneeFilter{align-items:flex-start;gap:12px;display:flex}.Y6kksa_assigneeFilter>span{width:36px;color:var(--dsw-alias-label-secondary);padding-top:8px;font-size:13px}.Y6kksa_assigneePicker{min-width:260px;position:relative}.Y6kksa_assigneeFilter .Y6kksa_assigneeTrigger{justify-content:space-between;align-items:center;gap:12px;width:100%;height:34px;padding:0 10px;display:flex}.Y6kksa_assigneeTrigger>span{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.Y6kksa_assigneeDropdown{z-index:40;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:320px;box-shadow:var(--dsw-shadow-lv3);border-radius:10px;padding:8px;position:absolute;top:calc(100% + 5px);left:0}.Y6kksa_assigneeDropdown>input{border:1px solid var(--dsw-alias-border-l2);width:100%;height:32px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font:inherit;border-radius:7px;outline:0;padding:0 9px}.Y6kksa_assigneeDropdown>input:focus{border-color:var(--dsw-alias-state-business-primary)}.Y6kksa_assigneeDropdown>[role=listbox]{max-height:260px;margin-top:7px;overflow:auto}.Y6kksa_assigneeDropdown [role=option]{width:100%;min-height:38px;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;background:0 0;border:0;border-radius:7px;flex-direction:column;justify-content:center;align-items:flex-start;gap:2px;padding:6px 9px;display:flex}.Y6kksa_assigneeDropdown [role=option]:hover,.Y6kksa_assigneeDropdown [role=option][aria-selected=true]{background:var(--dsw-alias-interactive-bg-hover)}.Y6kksa_assigneeDropdown strong{font-size:12px;font-weight:550}.Y6kksa_assigneeDropdown small{color:var(--dsw-alias-label-secondary);font-size:10px}.Y6kksa_assigneeDropdown p{color:var(--dsw-alias-label-secondary);text-align:center;margin:0;padding:18px 8px;font-size:11px}.Y6kksa_filterRow{align-items:flex-start;gap:12px;display:flex}.Y6kksa_filterRow>span{width:36px;color:var(--dsw-alias-label-secondary);padding-top:7px;font-size:13px}.Y6kksa_filterRow>div{flex-wrap:wrap;flex:1;gap:7px;display:flex}.Y6kksa_filterRow button{min-height:30px;color:var(--dsw-alias-label-secondary);padding:3px 11px}.Y6kksa_filterRow .Y6kksa_selectedFilter{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, transparent)}.Y6kksa_error{color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-state-error-secondary);border-radius:12px;margin:16px 24px 0;padding:12px 14px}.Y6kksa_notice{color:var(--dsw-alias-label-secondary);margin:0;padding:8px 20px;font-size:11px}.Y6kksa_board{z-index:1;flex:1;align-items:flex-start;gap:12px;padding:8px 12px;display:flex;position:relative;overflow:auto}.Y6kksa_lane{border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 86%, transparent);width:300px;min-width:300px;max-height:100%;transition:transform .16s var(--ds-ease-in-out), opacity .16s var(--ds-ease-in-out), box-shadow .16s var(--ds-ease-in-out);border-radius:16px;flex-direction:column;display:flex}.Y6kksa_laneDragging{opacity:.5;transform:scale(.985)}.Y6kksa_laneDropBefore{box-shadow:-4px 0 0 var(--dsw-alias-state-business-primary);transform:translate(8px)}.Y6kksa_laneDropAfter{box-shadow:4px 0 0 var(--dsw-alias-state-business-primary);transform:translate(-8px)}.Y6kksa_laneHeader{cursor:grab;user-select:none;justify-content:space-between;align-items:center;padding:12px 14px 10px;display:flex}.Y6kksa_laneHeader:active{cursor:grabbing}@media (prefers-reduced-motion:reduce){.Y6kksa_lane{transition:none}}.Y6kksa_laneHeader h2{margin:0;font-size:14px}.Y6kksa_laneHeader span{text-align:center;min-width:22px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-overlay);border-radius:999px;padding:2px 6px;font-size:12px}.Y6kksa_cards{padding:0 8px 8px;overflow-y:auto}.Y6kksa_card{border:1px solid var(--dsw-alias-border-l2);min-width:0;max-width:100%;color:inherit;background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 96%, transparent);box-shadow:var(--dsw-shadow-lv1);text-align:left;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out), box-shadow var(--ds-transition-duration-fast) var(--ds-ease-in-out);cursor:pointer;border-radius:14px;flex-direction:column;gap:7px;margin-top:8px;padding:12px;text-decoration:none;display:flex;overflow:hidden}.Y6kksa_card:hover{border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-button-floating-hover);box-shadow:var(--dsw-shadow-lv2)}.Y6kksa_cardMuted{opacity:.46;filter:saturate(.2);box-shadow:none}.Y6kksa_cardMuted:hover{opacity:.62}.Y6kksa_card:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.Y6kksa_card strong,.Y6kksa_key,.Y6kksa_meta{overflow-wrap:anywhere;word-break:normal;min-width:0}.Y6kksa_cardTopline{justify-content:space-between;align-items:center;gap:8px;min-width:0;display:flex}.Y6kksa_cardButtons{align-items:center;gap:2px;display:inline-flex}.Y6kksa_muteButton,.Y6kksa_tomatoLink{border-radius:8px;flex:none;place-items:center;width:28px;min-width:28px;height:28px;min-height:28px;padding:0;line-height:1;display:inline-grid}.Y6kksa_muteButton{color:var(--dsw-alias-label-tertiary);font-size:9px}.Y6kksa_muteButton[aria-pressed=true]{color:var(--dsw-alias-label-primary)}.Y6kksa_card strong{font-size:14px;font-weight:600;line-height:1.45}.Y6kksa_key{color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:650}.Y6kksa_meta{color:var(--dsw-alias-label-tertiary);font-size:12px}.Y6kksa_empty{color:var(--dsw-alias-label-tertiary);margin:auto}@media (width<=820px){.Y6kksa_header{align-items:flex-start;gap:10px}.Y6kksa_actions{flex-wrap:wrap;justify-content:flex-end}.Y6kksa_searchField{width:170px}}";
		const tagId$1 = "@stephen1620/dsh-tomato-board/tomato-board.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephen1620/dsh-tomato-board";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var tomato_board_module_css_default = {
			"actions": "Y6kksa_actions",
			"assigneeDropdown": "Y6kksa_assigneeDropdown",
			"assigneeFilter": "Y6kksa_assigneeFilter",
			"assigneePicker": "Y6kksa_assigneePicker",
			"assigneeTrigger": "Y6kksa_assigneeTrigger",
			"board": "Y6kksa_board",
			"card": "Y6kksa_card",
			"cardButtons": "Y6kksa_cardButtons",
			"cardMuted": "Y6kksa_cardMuted",
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
			"laneDragging": "Y6kksa_laneDragging",
			"laneDropAfter": "Y6kksa_laneDropAfter",
			"laneDropBefore": "Y6kksa_laneDropBefore",
			"laneHeader": "Y6kksa_laneHeader",
			"meta": "Y6kksa_meta",
			"muteButton": "Y6kksa_muteButton",
			"notice": "Y6kksa_notice",
			"searchField": "Y6kksa_searchField",
			"selectedFilter": "Y6kksa_selectedFilter",
			"sidebarAction": "Y6kksa_sidebarAction",
			"tomatoIcon": "Y6kksa_tomatoIcon",
			"tomatoLink": "Y6kksa_tomatoLink",
			"topbarAction": "Y6kksa_topbarAction",
			"transitionAction": "Y6kksa_transitionAction",
			"transitionCaption": "Y6kksa_transitionCaption",
			"transitionChevron": "Y6kksa_transitionChevron",
			"transitionDivider": "Y6kksa_transitionDivider",
			"transitionTrigger": "Y6kksa_transitionTrigger",
			"workbench": "Y6kksa_workbench",
			"workspaceTrigger": "Y6kksa_workspaceTrigger"
		};
		//#endregion
		//#region \0dsh-css:/Users/gengfeng/deepseek-harness/packages/client/tomato-board/src/client/story-points.module.css.mjs
		const css = ".LfvjxG_page{min-height:0;color:var(--dsw-alias-label-primary,#292d32);flex:1;padding:28px;overflow:auto}.LfvjxG_page *{box-sizing:border-box}.LfvjxG_page button,.LfvjxG_page select,.LfvjxG_page input{font:inherit;color:inherit;border:1px solid var(--dsw-alias-border-l2,#dedfdf);background:var(--dsw-alias-bg-base,white);border-radius:8px;min-width:0;padding:8px 12px}.LfvjxG_page button{cursor:pointer;white-space:nowrap}.LfvjxG_page button:hover{background:var(--dsw-alias-interactive-bg-hover,#f4f4f2)}.LfvjxG_page button:disabled{opacity:.5;cursor:wait}.LfvjxG_page :focus-visible{outline-offset:3px;outline:2px solid #458e88}.LfvjxG_page h2,.LfvjxG_page h3,.LfvjxG_page h4,.LfvjxG_page p{margin:0}.LfvjxG_toolbar,.LfvjxG_controls,.LfvjxG_panelHeader,.LfvjxG_listHeading,.LfvjxG_rankLabel{justify-content:space-between;align-items:center;gap:16px;display:flex}.LfvjxG_toolbar{flex-wrap:wrap;margin-bottom:26px}.LfvjxG_toolbar h2{letter-spacing:-.7px;margin:5px 0;font-size:26px}.LfvjxG_toolbar p,.LfvjxG_summary p,.LfvjxG_caption,.LfvjxG_footnote,.LfvjxG_itemText small,.LfvjxG_rankRow small,.LfvjxG_listHeading span{color:var(--dsw-alias-label-secondary,#797c80);font-size:12px;line-height:1.7}.LfvjxG_eyebrow{letter-spacing:1.6px;color:var(--dsw-alias-label-secondary,#797c80);font-size:10px;font-weight:650}.LfvjxG_controls label{align-items:center;gap:12px;font-size:13px;display:flex}.LfvjxG_controls select{max-width:340px}.LfvjxG_headerIconButton{border-radius:8px;width:34px;min-width:34px;height:34px;min-height:34px;padding:0}.LfvjxG_columns{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);align-items:start;gap:22px;display:grid}.LfvjxG_panel{border:1px solid var(--dsw-alias-border-l2,#e4e4df);background:var(--dsw-alias-bg-base,white);border-radius:16px;min-width:0;padding:22px}.LfvjxG_panelHeader{border-bottom:1px solid var(--dsw-alias-border-l2,#e4e4df);padding-bottom:20px}.LfvjxG_panelHeader h3{white-space:nowrap;font-size:16px}.LfvjxG_panelHeader select{max-width:65%;font-size:12px}.LfvjxG_panelHeader button{font-size:12px}.LfvjxG_summary{justify-content:space-between;align-items:center;gap:20px;padding:30px 0;display:flex}.LfvjxG_total{font-variant-numeric:tabular-nums;letter-spacing:-2px;font-size:58px;font-weight:600;line-height:1.25}.LfvjxG_total small{letter-spacing:0;color:var(--dsw-alias-label-secondary,#797c80);font-size:15px}.LfvjxG_pie{background:var(--dsw-alias-border-l2,#e7e7e2);border-radius:50%;flex:0 0 158px;width:158px;height:158px;padding:25px}.LfvjxG_pie>div{background:var(--dsw-alias-bg-base,white);border-radius:50%;flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%;display:flex}.LfvjxG_pie strong{font-size:26px}.LfvjxG_pie span{color:var(--dsw-alias-label-secondary,#797c80);font-size:11px}.LfvjxG_listHeading{padding:12px 0}.LfvjxG_listHeading h4{font-size:13px}.LfvjxG_item{border-top:1px solid var(--dsw-alias-border-l2,#e4e4df);align-items:center;gap:10px;padding:16px 0;display:flex}.LfvjxG_dot{border-radius:3px;flex-shrink:0;width:8px;height:8px}.LfvjxG_itemText{flex:1;min-width:0}.LfvjxG_itemText a{color:inherit;overflow-wrap:anywhere;font-size:13px;line-height:1.6;text-decoration:none}.LfvjxG_itemText a:hover{text-decoration:underline}.LfvjxG_itemText small{font-size:10px;display:block}.LfvjxG_itemPoints{white-space:nowrap;font-variant-numeric:tabular-nums;font-size:12px}.LfvjxG_item button{padding:5px 8px;font-size:11px}.LfvjxG_chips{flex-wrap:wrap;gap:8px;margin:18px 0 10px;display:flex}.LfvjxG_chips>span{background:var(--dsw-alias-interactive-bg-hover,#f2f3f0);border-radius:6px;align-items:center;gap:6px;padding:3px 5px 3px 10px;font-size:12px;display:flex}.LfvjxG_chips button{background:0 0;border:0;padding:1px 5px}.LfvjxG_ranking{gap:25px;margin-top:24px;display:grid}.LfvjxG_rankLabel{gap:10px;margin-bottom:10px;font-size:13px}.LfvjxG_rankLabel span{color:var(--dsw-alias-label-secondary,#999);font-size:11px}.LfvjxG_rankLabel strong{flex:1}.LfvjxG_rankLabel b{font-variant-numeric:tabular-nums}.LfvjxG_track{background:var(--dsw-alias-interactive-bg-hover,#f1f2ee);border-radius:4px;height:12px;overflow:hidden}.LfvjxG_track>div{border-radius:inherit;background:#458e88;height:100%}.LfvjxG_rankRow:first-child .LfvjxG_track>div{background:#d76b50}.LfvjxG_rankRow small{font-size:10px}.LfvjxG_footnote{border-top:1px solid var(--dsw-alias-border-l2,#e4e4df);padding-top:16px;font-size:11px;margin-top:32px!important}.LfvjxG_empty{text-align:center;color:var(--dsw-alias-label-secondary,#797c80);padding:50px 12px;font-size:13px}.LfvjxG_empty h4{margin-bottom:8px}.LfvjxG_emptyIcon{color:#458e88;margin-bottom:15px;font-size:38px;display:block}.LfvjxG_error{color:var(--dsw-alias-state-error-primary,#bd4336);overflow-wrap:anywhere;padding:12px 0;font-size:12px}.LfvjxG_notice{color:var(--dsw-alias-label-secondary,#797c80);padding:10px 0;font-size:12px}.LfvjxG_addPeople{border:1px solid var(--dsw-alias-border-l2,#ddd);border-radius:10px;margin-top:16px;padding:12px}.LfvjxG_addPeople input{width:100%}.LfvjxG_addPeople>div{max-height:210px;margin-top:8px;overflow:auto}.LfvjxG_addPeople button{text-align:left;border:0;gap:8px;width:100%;display:flex}.LfvjxG_addPeople small{opacity:.6;flex:1}.LfvjxG_modalBackdrop{z-index:100;background:#0006;place-items:center;padding:20px;display:grid;position:fixed;inset:0}.LfvjxG_dialog{background:var(--dsw-alias-bg-base,white);border-radius:16px;gap:18px;width:min(440px,100%);padding:26px;display:grid;box-shadow:0 20px 80px #0003}.LfvjxG_dialog p{font-size:13px;line-height:1.6}.LfvjxG_dialog label{gap:8px;font-size:13px;display:grid}.LfvjxG_dialog small{opacity:.65;font-size:12px}.LfvjxG_dialogActions{justify-content:flex-end;gap:10px;display:flex}@media (width<=1000px){.LfvjxG_columns{grid-template-columns:1fr}.LfvjxG_page{padding:20px}}@media (width<=540px){.LfvjxG_page{padding:12px}.LfvjxG_panel{padding:16px}.LfvjxG_controls{width:100%}.LfvjxG_controls label{flex:1;min-width:0}.LfvjxG_controls select{width:100%}.LfvjxG_pie{flex-basis:126px;width:126px;height:126px;padding:20px}.LfvjxG_total{font-size:44px}.LfvjxG_item{gap:7px}.LfvjxG_toolbar h2{font-size:23px}}";
		const tagId = "@stephen1620/dsh-tomato-board/story-points.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephen1620/dsh-tomato-board";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var story_points_module_css_default = {
			"addPeople": "LfvjxG_addPeople",
			"caption": "LfvjxG_caption",
			"chips": "LfvjxG_chips",
			"columns": "LfvjxG_columns",
			"controls": "LfvjxG_controls",
			"dialog": "LfvjxG_dialog",
			"dialogActions": "LfvjxG_dialogActions",
			"dot": "LfvjxG_dot",
			"empty": "LfvjxG_empty",
			"emptyIcon": "LfvjxG_emptyIcon",
			"error": "LfvjxG_error",
			"eyebrow": "LfvjxG_eyebrow",
			"footnote": "LfvjxG_footnote",
			"headerIconButton": "LfvjxG_headerIconButton",
			"item": "LfvjxG_item",
			"itemPoints": "LfvjxG_itemPoints",
			"itemText": "LfvjxG_itemText",
			"listHeading": "LfvjxG_listHeading",
			"modalBackdrop": "LfvjxG_modalBackdrop",
			"notice": "LfvjxG_notice",
			"page": "LfvjxG_page",
			"panel": "LfvjxG_panel",
			"panelHeader": "LfvjxG_panelHeader",
			"pie": "LfvjxG_pie",
			"rankLabel": "LfvjxG_rankLabel",
			"rankRow": "LfvjxG_rankRow",
			"ranking": "LfvjxG_ranking",
			"summary": "LfvjxG_summary",
			"toolbar": "LfvjxG_toolbar",
			"total": "LfvjxG_total",
			"track": "LfvjxG_track"
		};
		//#endregion
		//#region src/client/StoryPoints.tsx
		const TEAM_KEY = "taskboard.tomatoStoryTeam.v1";
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
		async function json(url, signal, method = "GET") {
			const response = await fetch(url, {
				method,
				signal: signal ?? null,
				headers: { accept: "application/json" }
			});
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`);
			return body;
		}
		function readTeam() {
			try {
				const saved = JSON.parse(localStorage.getItem(TEAM_KEY) ?? "[]");
				return Array.isArray(saved) ? [...new Set(saved.filter((value) => typeof value === "string" && /^[A-Za-z0-9_.@-]{1,128}$/u.test(value)))] : [];
			} catch {
				return [];
			}
		}
		function StoryPoints() {
			const [sprints, setSprints] = (0, react.useState)([]);
			const [users, setUsers] = (0, react.useState)([]);
			const [sprint, setSprint] = (0, react.useState)("");
			const [owner, setOwner] = (0, react.useState)("currentUser()");
			const [team, setTeam] = (0, react.useState)(readTeam);
			const [adding, setAdding] = (0, react.useState)(false);
			const [search, setSearch] = (0, react.useState)("");
			const [results, setResults] = (0, react.useState)({});
			const [errors, setErrors] = (0, react.useState)({});
			const [directoryError, setDirectoryError] = (0, react.useState)("");
			const [directoryLoading, setDirectoryLoading] = (0, react.useState)(true);
			const [version, setVersion] = (0, react.useState)(0);
			const [directoryVersion, setDirectoryVersion] = (0, react.useState)(0);
			const [editing, setEditing] = (0, react.useState)(null);
			const [draft, setDraft] = (0, react.useState)("");
			const [saving, setSaving] = (0, react.useState)(false);
			const [saveError, setSaveError] = (0, react.useState)("");
			const [notice, setNotice] = (0, react.useState)("");
			(0, react.useEffect)(() => {
				const controller = new AbortController();
				setDirectoryLoading(true);
				setDirectoryError("");
				Promise.all([json("/api/tomato-board/sprints", controller.signal), json("/api/tomato-board/filters", controller.signal)]).then(([data, directory]) => {
					const sorted = [...data.sprints].sort((a, b) => (b.startDate ?? "").localeCompare(a.startDate ?? ""));
					setSprints(sorted);
					setUsers(directory.users);
					setSprint((current) => current || sorted[0]?.sprintId || "");
				}).catch((error) => {
					if (!controller.signal.aborted) setDirectoryError(error.message);
				}).finally(() => {
					if (!controller.signal.aborted) setDirectoryLoading(false);
				});
				return () => controller.abort();
			}, [directoryVersion]);
			(0, react.useEffect)(() => {
				try {
					localStorage.setItem(TEAM_KEY, JSON.stringify(team));
				} catch {}
			}, [team]);
			const ownersKey = JSON.stringify([...new Set([owner, ...team])].sort());
			(0, react.useEffect)(() => {
				if (!sprint) return;
				const controller = new AbortController();
				setResults({});
				setErrors({});
				const owners = JSON.parse(ownersKey);
				const worker = async () => {
					while (owners.length && !controller.signal.aborted) {
						const username = owners.shift();
						try {
							const data = await json(`/api/tomato-board/story-points?${new URLSearchParams({
								sprint,
								assignee: username
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
			const ranking = team.map((username) => ({
				username,
				result: results[username],
				points: total(results[username]?.items ?? [])
			})).sort((a, b) => Number(Boolean(b.result)) - Number(Boolean(a.result)) || b.points - a.points || a.username.localeCompare(b.username));
			const max = Math.max(1, ...ranking.map((row) => row.points));
			const available = users.filter((user) => !team.includes(user.username) && `${user.name} ${user.username}`.toLowerCase().includes(search.toLowerCase()));
			const refresh = () => {
				setResults({});
				setErrors({});
				setVersion((value) => value + 1);
			};
			const changeSprint = (value) => {
				setResults({});
				setErrors({});
				setSprint(value);
				setEditing(null);
				setNotice("");
			};
			async function save() {
				if (!editing || saving) return;
				if (!draft.trim() || !Number.isFinite(Number(draft)) || Number(draft) < 0) {
					setSaveError("请输入大于或等于 0 的故事点");
					return;
				}
				setSaving(true);
				setSaveError("");
				try {
					await json(`/api/tomato-board/story-point/${encodeURIComponent(editing.itemKey)}?${new URLSearchParams({ value: draft })}`, void 0, "POST");
					setNotice(`${editing.itemKey} 故事点已保存`);
					setEditing(null);
					refresh();
				} catch (error) {
					setSaveError(error instanceof Error ? error.message : "保存失败");
				} finally {
					setSaving(false);
				}
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: story_points_module_css_default.page,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: story_points_module_css_default.toolbar,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: story_points_module_css_default.eyebrow,
								children: "SPRINT / STORY POINTS"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "迭代故事点" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "看清个人投入，比较团队分布" })
						] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: story_points_module_css_default.controls,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: ["迭代", /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
								"aria-label": "选择迭代",
								value: sprint,
								disabled: directoryLoading || saving,
								onChange: (event) => changeSprint(event.target.value),
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
								title: "刷新迭代故事点",
								"aria-label": "刷新迭代故事点",
								disabled: saving,
								onClick: () => {
									refresh();
									if (directoryError || !sprints.length) setDirectoryVersion((value) => value + 1);
								}
							})]
						})]
					}),
					directoryError && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
						className: story_points_module_css_default.error,
						role: "alert",
						children: [directoryError, "，请点击刷新重试。"]
					}),
					notice && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						role: "status",
						className: story_points_module_css_default.notice,
						children: notice
					}),
					!directoryLoading && !directoryError && !sprints.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: story_points_module_css_default.empty,
						children: "当前没有可访问的迭代。"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: story_points_module_css_default.columns,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: story_points_module_css_default.panel,
							"aria-label": "个人故事点",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: story_points_module_css_default.panelHeader,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "个人分布" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
									"aria-label": "选择个人负责人",
									value: owner,
									disabled: saving,
									onChange: (event) => {
										setOwner(event.target.value);
										setEditing(null);
										setNotice("");
									},
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
								role: "alert",
								className: story_points_module_css_default.error,
								children: errors[owner]
							}) : !personal ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: story_points_module_css_default.empty,
								role: "status",
								children: sprint ? "正在读取个人故事点…" : "请选择迭代"
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								personal.truncated && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: story_points_module_css_default.error,
									children: "事项达到读取上限，以下为部分统计。"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: story_points_module_css_default.summary,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: story_points_module_css_default.eyebrow,
											children: "故事点总数"
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: story_points_module_css_default.total,
											children: [number(sum), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: " SP" })]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
											items.filter((item) => item.storyPoints !== null).length,
											" 项已估点 · ",
											items.filter((item) => item.storyPoints === null).length,
											" 项未填写"
										] })
									] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: story_points_module_css_default.pie,
										role: "img",
										"aria-label": `个人故事点分布，共 ${number(sum)} 点；各需求明细见下方列表`,
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
								items.length > 0 && !slices.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: story_points_module_css_default.notice,
									children: "暂无大于 0 的故事点，填写后即可查看分布。"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: story_points_module_css_default.items,
									children: items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: story_points_module_css_default.item,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: story_points_module_css_default.dot,
												style: { background: item.storyPoints && item.storyPoints > 0 ? colors[slices.indexOf(item) % colors.length] : "var(--dsw-alias-border-l2, #ddd)" }
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: story_points_module_css_default.itemText,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
													href: item.tomatoUrl,
													target: "_blank",
													rel: "noreferrer",
													children: item.title
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
													item.itemKey,
													" · ",
													item.status
												] })]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", {
												className: story_points_module_css_default.itemPoints,
												children: item.storyPoints === null ? "未填写" : `${number(item.storyPoints)} SP`
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												disabled: saving,
												onClick: () => {
													setEditing(item);
													setDraft(item.storyPoints === null ? "" : String(item.storyPoints));
													setSaveError("");
												},
												children: "调整"
											})
										]
									}, item.itemKey))
								})
							] })]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: story_points_module_css_default.panel,
							"aria-label": "团队故事点",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: story_points_module_css_default.panelHeader,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "团队排行" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										"aria-expanded": adding,
										onClick: () => setAdding((value) => !value),
										children: "＋ 添加负责人"
									})]
								}),
								adding && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: story_points_module_css_default.addPeople,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										type: "search",
										"aria-label": "搜索团队负责人",
										placeholder: "搜索姓名或用户名…",
										value: search,
										onChange: (event) => setSearch(event.target.value)
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [available.map((user) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										disabled: saving,
										onClick: () => setTeam((current) => [...current, user.username]),
										children: [
											user.name,
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: user.username }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "＋" })
										]
									}, user.username)), !available.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "没有可添加的负责人" })] })]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: story_points_module_css_default.chips,
									children: team.map((username) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [userName(username), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										disabled: saving,
										"aria-label": `移除 ${userName(username)}`,
										onClick: () => setTeam((current) => current.filter((value) => value !== username)),
										children: "×"
									})] }, username))
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
									className: story_points_module_css_default.caption,
									children: [
										"按故事点从高到低排列 · ",
										team.length,
										" 位负责人"
									]
								}),
								!team.length && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: story_points_module_css_default.empty,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: story_points_module_css_default.emptyIcon,
											children: "▥"
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", { children: "一起看看团队的投入" }),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "添加负责人，比较本迭代的故事点分布。" })
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: story_points_module_css_default.ranking,
									children: ranking.map((row, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: story_points_module_css_default.rankRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: story_points_module_css_default.rankLabel,
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: row.result ? String(index + 1).padStart(2, "0") : "—" }),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: userName(row.username) }),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: row.result ? `${number(row.points)} SP` : errors[row.username] ? "读取失败" : "读取中…" })
											]
										}), row.result ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: story_points_module_css_default.track,
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { style: { width: `${row.points / max * 100}%` } })
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
											row.result.items.length,
											" 个事项",
											row.result.truncated ? " · 仅统计部分事项" : ""
										] })] }) : errors[row.username] ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
											className: story_points_module_css_default.error,
											children: errors[row.username]
										}) : null]
									}, row.username))
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: story_points_module_css_default.footnote,
									children: "统计当前迭代全部状态的卡片；未填故事点不计入总数，多负责人卡片分别计入各负责人。团队名单保存在当前浏览器。"
								})
							]
						})]
					}),
					editing && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: story_points_module_css_default.modalBackdrop,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("form", {
							className: story_points_module_css_default.dialog,
							role: "dialog",
							"aria-modal": "true",
							"aria-labelledby": "story-edit-title",
							onSubmit: (event) => {
								event.preventDefault();
								save();
							},
							onKeyDown: (event) => {
								if (event.key === "Escape" && !saving) setEditing(null);
								if (event.key === "Tab") {
									const nodes = event.currentTarget.querySelectorAll("input:not(:disabled), button:not(:disabled)");
									const first = nodes[0];
									const last = nodes[nodes.length - 1];
									if (event.shiftKey && document.activeElement === first) {
										event.preventDefault();
										last?.focus();
									} else if (!event.shiftKey && document.activeElement === last) {
										event.preventDefault();
										first?.focus();
									}
								}
							},
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
									id: "story-edit-title",
									children: "调整故事点"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", { children: [
									editing.itemKey,
									" · ",
									editing.title
								] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: ["故事点", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									autoFocus: true,
									type: "number",
									min: "0",
									step: "any",
									required: true,
									value: draft,
									disabled: saving,
									onChange: (event) => setDraft(event.target.value)
								})] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "保存后同步到番茄卡片，并更新个人和团队统计。" }),
								saveError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: story_points_module_css_default.error,
									role: "alert",
									children: saveError
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: story_points_module_css_default.dialogActions,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: saving,
										onClick: () => setEditing(null),
										children: "取消"
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: saving,
										children: saving ? "保存中…" : "保存故事点"
									})]
								})
							]
						})
					})
				]
			});
		}
		//#endregion
		//#region src/client/TomatoBoard.tsx
		let state = {
			open: false,
			loading: false,
			items: [],
			error: null,
			selectedItem: null,
			truncated: false
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
				error: null
			});
			try {
				const query = new URLSearchParams({ assignee });
				const response = await fetch(`/api/tomato-board/items?${query}`, { headers: { accept: "application/json" } });
				const body = await response.json();
				if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`);
				emit({
					items: body.items ?? [],
					truncated: body.truncated === true
				});
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
			const filterMenuRef = (0, react.useRef)(null);
			const [page, setPage] = (0, react.useState)("board");
			const [search, setSearch] = (0, react.useState)("");
			const [blacklist, setBlacklist] = (0, react.useState)(readFilterBlacklist);
			const [mutedItems, setMutedItems] = (0, react.useState)(readMutedItems);
			const [selectedAssignee, setSelectedAssignee] = (0, react.useState)("currentUser()");
			const [filterDirectory, setFilterDirectory] = (0, react.useState)({
				users: [],
				workspaces: []
			});
			const [laneOrder, setLaneOrder] = (0, react.useState)(readLaneOrder);
			const [draggedLane, setDraggedLane] = (0, react.useState)(null);
			const [dropLane, setDropLane] = (0, react.useState)(null);
			const laneElements = (0, react.useRef)(/* @__PURE__ */ new Map());
			const previousLanePositions = (0, react.useRef)(/* @__PURE__ */ new Map());
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
				fetch("/api/tomato-board/filters", { headers: { accept: "application/json" } }).then((response) => response.ok ? response.json() : Promise.reject(/* @__PURE__ */ new Error(`HTTP ${response.status}`))).then((value) => setFilterDirectory(value)).catch(() => {});
			}, [board.open]);
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
			const filteredItems = board.items.filter((item) => !blacklist.types.has(item.itemType) && !blacklist.statuses.has(item.status) && !blacklist.workspaces.has(item.workspaceKey || item.workspaceName || item.workspace) && (!normalizedSearch || [
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
			const workspaceOptions = [...new Map([...filterDirectory.workspaces.map((workspace) => [workspace.key || workspace.name, workspace.name && workspace.key && workspace.name !== workspace.key ? `${workspace.name} (${workspace.key})` : workspace.key || workspace.name]), ...board.items.map((item) => [item.workspaceKey || item.workspaceName || item.workspace, item.workspaceName && item.workspaceKey && item.workspaceName !== item.workspaceKey ? `${item.workspaceName} (${item.workspaceKey})` : item.workspaceKey || item.workspaceName])].filter(([value]) => Boolean(value))).entries()].map(([value, label]) => ({
				value,
				label
			}));
			const defaultStatuses = [...new Set([...TOMATO_STATUS_ORDER.filter((status) => filteredItems.some((item) => item.status === status)), ...filteredItems.map((item) => item.status).filter((status) => !TOMATO_STATUS_ORDER.includes(status))])];
			const statuses = applyLaneOrder(defaultStatuses, laneOrder);
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
					statuses: [...next.statuses],
					workspaces: [...next.workspaces]
				}));
				return next;
			});
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
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: "番茄工作台" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: page === "points" ? "个人与团队的迭代投入" : board.loading ? "正在读取番茄事项…" : `显示 ${filteredItems.length} / ${board.items.length} 个事项` })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: tomato_board_module_css_default.actions,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "toolbar",
									size: "sm",
									"aria-pressed": page === "board",
									onClick: () => setPage("board"),
									children: "事项看板"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "toolbar",
									size: "sm",
									"aria-pressed": page === "points",
									onClick: () => setPage("points"),
									children: "迭代故事点"
								}),
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
													onToggle: (value) => toggleBlacklist("workspaces", value)
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
										onClick: () => void refresh(selectedAssignee)
									})
								] }),
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
					page === "points" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StoryPoints, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
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
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: tomato_board_module_css_default.meta,
													children: [
														item.workspaceName && item.workspaceKey && item.workspaceName !== item.workspaceKey ? `${item.workspaceName} (${item.workspaceKey})` : item.workspaceKey || item.workspaceName,
														item.itemType,
														item.priority,
														item.assignees.join("/"),
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
						})
					] }),
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
		function WorkspaceFilterRow({ options, hidden, onToggle }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: tomato_board_module_css_default.filterRow,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "空间" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: options.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					className: hidden.has(option.value) ? "" : tomato_board_module_css_default.selectedFilter,
					type: "button",
					"aria-pressed": !hidden.has(option.value),
					onClick: () => onToggle(option.value),
					children: option.label
				}, option.value)) })]
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
			"sessions",
			"workspaces"
		];
		function apply(ctx) {
			const openWorkbench = () => {
				if (disposeWorkbench) return;
				emit({ open: true });
				disposeWorkbench = ctx.slots.register({
					name: "conversation",
					priority: -100
				}, () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TomatoBoardPanel, { ctx }));
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