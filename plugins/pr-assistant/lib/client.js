window.__ModuleLoader__.load({
	id: "@stephenlgf/dsh-pr-assistant",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region \0dsh-css:/Users/gengfeng/deepseek-harness/packages/client/pr-assistant/src/client/pr-assistant.module.css.mjs
		const css = ".fhCqya_sidebarAction{width:100%;min-height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;background:0 0;border:0;border-radius:10px;align-items:center;gap:9px;padding:0 10px;display:flex}.fhCqya_sidebarAction:hover{background:var(--dsw-alias-interactive-bg-hover)}.fhCqya_branchIcon{flex:0 0 18px;width:18px;height:18px;position:relative}.fhCqya_branchIcon:before{content:\"\";border-bottom:1.5px solid;border-left:1.5px solid;border-radius:0 0 0 5px;width:8px;height:8px;position:absolute;top:4px;left:4px}.fhCqya_branchIcon i{background:var(--dsw-alias-bg-base);border:1.5px solid;border-radius:50%;width:5px;height:5px;position:absolute}.fhCqya_branchIcon i:first-child{top:0;left:1px}.fhCqya_branchIcon i:nth-child(2){bottom:0;left:1px}.fhCqya_branchIcon i:last-child{top:7px;right:0}.fhCqya_workbench{min-width:0;height:100%;min-height:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-family:var(--dsw-font-family);flex-direction:column;flex:1;display:flex;overflow:hidden}.fhCqya_scrollArea{overscroll-behavior:contain;scrollbar-gutter:stable;flex:1;min-height:0;overflow-y:auto}.fhCqya_header{z-index:5;border-bottom:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb,var(--dsw-alias-bg-base) 90%,transparent);backdrop-filter:blur(18px);justify-content:space-between;align-items:center;gap:24px;min-height:78px;padding:14px 22px;display:flex;position:sticky;top:0}.fhCqya_eyebrow{color:var(--dsw-alias-state-business-primary);letter-spacing:.2em;font:700 9px/1.2 ui-monospace,SFMono-Regular,monospace}.fhCqya_titleRow{align-items:center;gap:8px;margin-top:2px;display:flex}.fhCqya_header h1{letter-spacing:-.03em;margin:0;font-size:22px;line-height:1.15}.fhCqya_titleBack{border:1px solid var(--dsw-alias-border-l2);width:28px;height:28px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:8px;padding:0;font-size:16px}.fhCqya_titleBack:hover{color:var(--dsw-alias-state-business-primary)}.fhCqya_header p{color:var(--dsw-alias-label-secondary);margin:3px 0 0;font-size:12px}.fhCqya_actions{align-items:center;gap:8px;display:flex}.fhCqya_actions button{border:1px solid var(--dsw-alias-border-l2);min-height:34px;color:inherit;background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:9px;padding:0 13px}.fhCqya_actions button:last-child{width:34px;padding:0;font-size:20px}.fhCqya_actions button:disabled{opacity:.5;cursor:wait}.fhCqya_search{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:9px;align-items:center;gap:7px;width:210px;min-height:34px;padding:0 10px;display:flex}.fhCqya_search input{width:100%;color:inherit;font:inherit;background:0 0;border:0;outline:0}.fhCqya_summary{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:14px;grid-template-columns:repeat(3,minmax(0,1fr));margin:20px 22px 0;display:grid;overflow:hidden}.fhCqya_summary div{border-right:1px solid var(--dsw-alias-border-l2);flex-direction:column;justify-content:center;min-height:82px;padding:16px 20px;display:flex}.fhCqya_summary div:last-child{border:0}.fhCqya_summary strong{font:700 27px/1 ui-monospace,SFMono-Regular,monospace}.fhCqya_summary span{color:var(--dsw-alias-label-secondary);margin-top:7px;font-size:11px}.fhCqya_grid{grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:14px;padding:18px 22px 32px;display:grid}.fhCqya_repo{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);min-width:0;box-shadow:0 1px 0 color-mix(in srgb,var(--dsw-alias-label-primary) 5%,transparent);border-radius:14px;overflow:hidden}.fhCqya_repoTools{flex-direction:column;justify-content:space-between;align-self:stretch;align-items:flex-end;gap:8px;display:flex}.fhCqya_hideRepo{color:var(--dsw-alias-label-secondary);cursor:pointer;font:500 11px/16px var(--dsw-font-family);background:0 0;border:0;padding:0}.fhCqya_hideRepo:hover{color:var(--dsw-alias-state-error-primary)}.fhCqya_repoHeader{border-bottom:1px solid var(--dsw-alias-border-l2);justify-content:space-between;align-items:center;min-height:82px;padding:15px 17px;display:flex}.fhCqya_provider{color:var(--dsw-alias-state-business-primary);letter-spacing:.14em;text-transform:uppercase;font:700 9px/1 ui-monospace,SFMono-Regular,monospace}.fhCqya_repo h2{letter-spacing:-.02em;margin:5px 0 0;font-size:16px}.fhCqya_repoHeader p{color:var(--dsw-alias-label-secondary);margin:3px 0 0;font-size:11px}.fhCqya_count,.fhCqya_countActive{border:1px solid var(--dsw-alias-border-l2);background:0 0;border-radius:7px;place-items:center;min-width:30px;height:26px;padding:0 7px;font:700 13px/1 ui-monospace,SFMono-Regular,monospace;display:grid}.fhCqya_count{color:var(--dsw-alias-label-tertiary)}.fhCqya_countActive{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 34%,var(--dsw-alias-border-l2));background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 6%,transparent)}.fhCqya_prList{margin:0;padding:0;list-style:none}.fhCqya_prList li+li{border-top:1px solid color-mix(in srgb,var(--dsw-alias-border-l2) 70%,transparent)}.fhCqya_prRow{align-items:stretch;display:flex}.fhCqya_prMain{min-width:0;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;flex:1;grid-template-columns:auto 1fr auto;gap:3px 9px;padding:11px 10px 11px 16px;display:grid}.fhCqya_prRow:hover{background:var(--dsw-alias-interactive-bg-hover)}.fhCqya_prNumber{color:var(--dsw-alias-state-business-primary);font:650 11px/18px ui-monospace,SFMono-Regular,monospace}.fhCqya_prTitle{text-overflow:ellipsis;white-space:nowrap;font-size:13px;line-height:18px;overflow:hidden}.fhCqya_meta{color:var(--dsw-alias-label-secondary);grid-column:2/-1;font-size:10px}.fhCqya_draft{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);border-radius:4px;align-self:center;padding:2px 5px;font-size:9px}.fhCqya_externalLink{width:58px;color:var(--dsw-alias-label-secondary);cursor:pointer;font:500 10px/1 var(--dsw-font-family);background:0 0;border:1px solid #0000;border-radius:7px;margin:8px 8px 8px 0}.fhCqya_externalLink:hover{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-bg-layer-2)}.fhCqya_empty{min-height:132px;color:var(--dsw-alias-label-secondary);flex-direction:column;justify-content:center;align-items:center;display:flex}.fhCqya_empty>span{color:#60d98a;border:1px solid #60d98a;border-radius:50%;place-items:center;width:28px;height:28px;display:grid}.fhCqya_empty p{color:var(--dsw-alias-label-primary);margin:8px 0 2px;font-size:13px}.fhCqya_empty small{font-size:10px}.fhCqya_detail{gap:14px;width:min(1080px,100% - 44px);margin:22px auto 40px;display:grid}.fhCqya_backToList{border:1px solid var(--dsw-alias-border-l2);width:max-content;min-height:32px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:8px;padding:0 10px}.fhCqya_backToList:hover{color:var(--dsw-alias-state-business-primary)}.fhCqya_detailState{min-height:240px;color:var(--dsw-alias-label-secondary);place-items:center;display:grid}.fhCqya_detailHero,.fhCqya_detailStats,.fhCqya_description,.fhCqya_files{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:14px}.fhCqya_detailHero{justify-content:space-between;align-items:flex-start;gap:24px;padding:22px;display:flex}.fhCqya_detailHero>div>span{color:var(--dsw-alias-label-secondary);font-size:11px}.fhCqya_detailHero h2{letter-spacing:-.025em;max-width:760px;margin:7px 0 14px;font-size:22px;line-height:1.35}.fhCqya_detailHero code{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);border-radius:6px;padding:5px 8px;font-size:11px}.fhCqya_detailHero button{border:1px solid var(--dsw-alias-border-l2);min-width:max-content;min-height:34px;color:var(--dsw-alias-state-business-primary);cursor:pointer;background:0 0;border-radius:8px;padding:0 12px}.fhCqya_detailStats{grid-template-columns:repeat(5,1fr);display:grid;overflow:hidden}.fhCqya_detailStats div{border-right:1px solid var(--dsw-alias-border-l2);flex-direction:column;justify-content:center;min-height:86px;padding:16px;display:flex}.fhCqya_detailStats div:last-child{border:0}.fhCqya_detailStats strong{font:700 18px/1.2 ui-monospace,SFMono-Regular,monospace}.fhCqya_detailStats span{color:var(--dsw-alias-label-secondary);margin-top:7px;font-size:10px}.fhCqya_addition,.fhCqya_clean{color:#3fbf72}.fhCqya_deletion,.fhCqya_conflict{color:var(--dsw-alias-state-error-primary)}.fhCqya_description{padding:18px 20px}.fhCqya_description h3,.fhCqya_files h3{margin:0 0 12px;font-size:13px}.fhCqya_description p{color:var(--dsw-alias-label-secondary);white-space:pre-wrap;margin:0;font-size:12px;line-height:1.7}.fhCqya_files{min-width:0;padding:18px 20px}.fhCqya_files h3 span{color:var(--dsw-alias-label-secondary);font-weight:400}.fhCqya_files ol{margin:0;padding:0;list-style:none}.fhCqya_files li{border-top:1px solid color-mix(in srgb,var(--dsw-alias-border-l2) 65%,transparent)}.fhCqya_files details{min-width:0}.fhCqya_files summary{cursor:pointer;grid-template-columns:22px minmax(0,1fr) auto;align-items:center;gap:8px;min-height:42px;list-style:none;display:grid}.fhCqya_files summary::-webkit-details-marker{display:none}.fhCqya_files summary:before{content:\"›\";color:var(--dsw-alias-label-tertiary);margin-left:-13px;transition:transform .15s;position:absolute}.fhCqya_files details[open] summary:before{transform:rotate(90deg)}.fhCqya_fileStatus{color:var(--dsw-alias-label-secondary);font:700 10px/1 ui-monospace,SFMono-Regular,monospace}.fhCqya_files code{text-overflow:ellipsis;white-space:nowrap;font-size:11px;overflow:hidden}.fhCqya_fileCounts{gap:8px;font:600 10px/1 ui-monospace,SFMono-Regular,monospace;display:flex}.fhCqya_fileCounts i{color:#3fbf72;font-style:normal}.fhCqya_fileCounts b{color:var(--dsw-alias-state-error-primary)}.fhCqya_diffBlock{border:1px solid var(--dsw-alias-border-l2);max-height:520px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);tab-size:2;border-radius:9px;margin:0 0 12px;padding:12px 0;font:10px/1.55 ui-monospace,SFMono-Regular,monospace;overflow:auto}.fhCqya_diffBlock span{min-width:max-content;padding:0 12px;display:block}.fhCqya_diffAdd{color:#62c986;background:#3fbf7217}.fhCqya_diffDelete{color:#e47b82;background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 9%,transparent)}.fhCqya_diffHunk{color:var(--dsw-alias-state-business-primary)}.fhCqya_diffUnavailable{border:1px dashed var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);border-radius:9px;margin:0 0 12px;padding:12px;font-size:11px}.fhCqya_detailActions{align-items:center;gap:8px;min-width:max-content;display:flex}.fhCqya_detailHero .fhCqya_reviewButton{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted);background:var(--dsw-alias-state-business-primary);font-weight:650}.fhCqya_detailHero .fhCqya_reviewButton:hover{filter:brightness(1.08)}.fhCqya_modalBackdrop{z-index:1000;backdrop-filter:blur(5px);background:#00000085;place-items:center;padding:20px;display:grid;position:fixed;inset:0}.fhCqya_reviewDialog{border:1px solid var(--dsw-alias-border-l2);width:min(480px,100%);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);box-shadow:var(--dsw-shadow-lv3);border-radius:16px;padding:24px}.fhCqya_reviewDialog h2{letter-spacing:-.025em;margin:5px 0 6px;font-size:20px}.fhCqya_reviewDialog>p{color:var(--dsw-alias-label-secondary);margin:0 0 20px;font-size:12px;line-height:1.6}.fhCqya_modelField{gap:7px;display:grid}.fhCqya_modelField>span{color:var(--dsw-alias-label-secondary);font-size:11px}.fhCqya_modelField select{border:1px solid var(--dsw-alias-border-l2);width:100%;height:40px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);font:inherit;border-radius:9px;outline:0;padding:0 10px}.fhCqya_modelField select:focus{border-color:var(--dsw-alias-state-business-primary)}.fhCqya_modelHint{min-height:18px;color:var(--dsw-alias-label-tertiary);margin-top:7px;font-size:10px}.fhCqya_reviewError{border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 35%,transparent);color:var(--dsw-alias-state-error-primary);border-radius:8px;margin:0 0 14px;padding:9px 11px;font-size:11px}.fhCqya_reviewDialog footer{justify-content:flex-end;gap:8px;margin-top:22px;display:flex}.fhCqya_reviewDialog footer button{border:1px solid var(--dsw-alias-border-l2);min-height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:8px;padding:0 14px}.fhCqya_reviewDialog footer button:last-child{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted);background:var(--dsw-alias-state-business-primary)}.fhCqya_reviewDialog footer button:disabled{cursor:not-allowed;opacity:.48}.fhCqya_error{min-height:100px;color:var(--dsw-alias-state-error-primary);flex-direction:column;justify-content:center;gap:5px;padding:18px;display:flex}.fhCqya_error span{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;font-size:11px}.fhCqya_notice{color:var(--dsw-alias-label-secondary);margin:0;padding:8px 16px;font-size:10px}.fhCqya_noResults{color:var(--dsw-alias-label-secondary);text-align:center;grid-column:1/-1;padding:80px}@media (width<=760px){.fhCqya_header{flex-direction:column;align-items:flex-start}.fhCqya_actions{width:100%}.fhCqya_search{flex:1;min-width:0}.fhCqya_summary{grid-template-columns:1fr}.fhCqya_summary div{border-right:0;border-bottom:1px solid var(--dsw-alias-border-l2)}.fhCqya_grid{grid-template-columns:1fr;padding-inline:12px}.fhCqya_summary{margin-inline:12px}.fhCqya_detail{width:calc(100% - 24px)}.fhCqya_detailHero{flex-direction:column}.fhCqya_detailActions{flex-wrap:wrap;width:100%}.fhCqya_detailStats{grid-template-columns:repeat(2,1fr)}.fhCqya_detailStats div{border-bottom:1px solid var(--dsw-alias-border-l2)}}@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}.fhCqya_files .fhCqya_diffBlock,.fhCqya_files .fhCqya_diffUnavailable{margin-left:30px}.fhCqya_externalLink svg{fill:none;stroke:currentColor;stroke-width:1.4px;stroke-linecap:round;stroke-linejoin:round;width:15px;height:15px}.fhCqya_reviewResult,.fhCqya_reviewPending{border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 26%,var(--dsw-alias-border-l2));background:var(--dsw-alias-bg-layer-1);border-radius:14px}.fhCqya_reviewResult{min-width:0;padding:18px 20px 20px}.fhCqya_reviewResult>header{justify-content:space-between;align-items:center;gap:16px;display:flex}.fhCqya_reviewResult h3{margin:4px 0 0;font-size:15px}.fhCqya_reviewResult button,.fhCqya_reviewPending button{border:1px solid var(--dsw-alias-border-l2);min-height:32px;color:var(--dsw-alias-state-business-primary);cursor:pointer;background:0 0;border-radius:8px;padding:0 10px}.fhCqya_reviewResult>pre{border:1px solid var(--dsw-alias-border-l2);max-height:640px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font:12px/1.7 var(--dsw-font-family);white-space:pre-wrap;overflow-wrap:anywhere;border-radius:10px;margin:16px 0 0;padding:16px;overflow:auto}.fhCqya_reviewPending{align-items:center;gap:12px;padding:16px 20px;display:flex}.fhCqya_reviewPending strong{flex:1;font-size:13px}.fhCqya_restoreDialog{border:1px solid var(--dsw-alias-border-l2);width:min(500px,100%);max-height:min(620px,100vh - 40px);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);box-shadow:var(--dsw-shadow-lv3);border-radius:16px;flex-direction:column;padding:24px;display:flex}.fhCqya_restoreDialog h2{margin:5px 0 4px;font-size:20px}.fhCqya_restoreDialog>p{color:var(--dsw-alias-label-secondary);margin:0 0 16px;font-size:12px}.fhCqya_restoreDialog ol{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;min-height:0;margin:0;padding:0;list-style:none;overflow:auto}.fhCqya_restoreDialog li+li{border-top:1px solid var(--dsw-alias-border-l2)}.fhCqya_restoreDialog label{cursor:pointer;align-items:center;gap:11px;min-height:54px;padding:8px 12px;display:flex}.fhCqya_restoreDialog label:hover{background:var(--dsw-alias-interactive-bg-hover)}.fhCqya_restoreDialog label>span{flex-direction:column;gap:3px;min-width:0;display:flex}.fhCqya_restoreDialog strong{text-overflow:ellipsis;white-space:nowrap;font-size:12px;overflow:hidden}.fhCqya_restoreDialog small{color:var(--dsw-alias-label-secondary);font-size:10px}.fhCqya_restoreDialog footer{justify-content:flex-end;gap:8px;margin-top:18px;display:flex}.fhCqya_restoreDialog footer button{border:1px solid var(--dsw-alias-border-l2);min-height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:8px;padding:0 14px}.fhCqya_restoreDialog footer button:last-child{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted);background:var(--dsw-alias-state-business-primary)}.fhCqya_restoreDialog footer button:disabled{opacity:.45;cursor:not-allowed}.fhCqya_files summary{grid-template-columns:14px 22px minmax(0,1fr) auto}.fhCqya_files summary:before{content:none}.fhCqya_disclosureIcon{width:14px;height:14px;color:var(--dsw-alias-label-tertiary);place-items:center;transition:transform .15s;display:grid}.fhCqya_disclosureIcon svg{fill:none;stroke:currentColor;stroke-width:1.5px;stroke-linecap:round;stroke-linejoin:round;width:12px;height:12px}.fhCqya_files details[open] .fhCqya_disclosureIcon{transform:rotate(90deg)}";
		const tagId = "@stephenlgf/dsh-pr-assistant/pr-assistant.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephenlgf/dsh-pr-assistant";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var pr_assistant_module_css_default = {
			"actions": "fhCqya_actions",
			"addition": "fhCqya_addition",
			"backToList": "fhCqya_backToList",
			"branchIcon": "fhCqya_branchIcon",
			"clean": "fhCqya_clean",
			"conflict": "fhCqya_conflict",
			"count": "fhCqya_count",
			"countActive": "fhCqya_countActive",
			"deletion": "fhCqya_deletion",
			"description": "fhCqya_description",
			"detail": "fhCqya_detail",
			"detailActions": "fhCqya_detailActions",
			"detailHero": "fhCqya_detailHero",
			"detailState": "fhCqya_detailState",
			"detailStats": "fhCqya_detailStats",
			"diffAdd": "fhCqya_diffAdd",
			"diffBlock": "fhCqya_diffBlock",
			"diffDelete": "fhCqya_diffDelete",
			"diffHunk": "fhCqya_diffHunk",
			"diffUnavailable": "fhCqya_diffUnavailable",
			"disclosureIcon": "fhCqya_disclosureIcon",
			"draft": "fhCqya_draft",
			"empty": "fhCqya_empty",
			"error": "fhCqya_error",
			"externalLink": "fhCqya_externalLink",
			"eyebrow": "fhCqya_eyebrow",
			"fileCounts": "fhCqya_fileCounts",
			"fileStatus": "fhCqya_fileStatus",
			"files": "fhCqya_files",
			"grid": "fhCqya_grid",
			"header": "fhCqya_header",
			"hideRepo": "fhCqya_hideRepo",
			"meta": "fhCqya_meta",
			"modalBackdrop": "fhCqya_modalBackdrop",
			"modelField": "fhCqya_modelField",
			"modelHint": "fhCqya_modelHint",
			"noResults": "fhCqya_noResults",
			"notice": "fhCqya_notice",
			"prList": "fhCqya_prList",
			"prMain": "fhCqya_prMain",
			"prNumber": "fhCqya_prNumber",
			"prRow": "fhCqya_prRow",
			"prTitle": "fhCqya_prTitle",
			"provider": "fhCqya_provider",
			"repo": "fhCqya_repo",
			"repoHeader": "fhCqya_repoHeader",
			"repoTools": "fhCqya_repoTools",
			"restoreDialog": "fhCqya_restoreDialog",
			"reviewButton": "fhCqya_reviewButton",
			"reviewDialog": "fhCqya_reviewDialog",
			"reviewError": "fhCqya_reviewError",
			"reviewPending": "fhCqya_reviewPending",
			"reviewResult": "fhCqya_reviewResult",
			"scrollArea": "fhCqya_scrollArea",
			"search": "fhCqya_search",
			"sidebarAction": "fhCqya_sidebarAction",
			"summary": "fhCqya_summary",
			"titleBack": "fhCqya_titleBack",
			"titleRow": "fhCqya_titleRow",
			"workbench": "fhCqya_workbench"
		};
		//#endregion
		//#region src/client/PrAssistant.tsx
		const EMPTY_REVIEW_EVENTS = {
			entries: [],
			hasMore: false,
			revision: 0,
			change: {
				kind: "replace",
				entries: []
			}
		};
		let disposeWorkbench = null;
		const HIDDEN_REPOSITORIES_KEY = "prAssistant.hiddenRepositories.v1";
		const REVIEW_SESSION_LINKS_KEY = "prAssistant.reviewSessionLinks.v1";
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
		function removeReviewSession(repository, pullRequest) {
			const links = readReviewSessionLinks();
			delete links[reviewLinkKey(repository, pullRequest)];
			window.localStorage.setItem(REVIEW_SESSION_LINKS_KEY, JSON.stringify(links));
		}
		function findReviewSession(ctx, repository, pullRequest) {
			const linked = linkedReviewSession(repository, pullRequest);
			if (linked && ctx.sessions.binding(linked)) return linked;
			const expectedTitle = `[PR #${pullRequest.number}] ${pullRequest.title}`;
			const snapshot = ctx.sessions.list.getSnapshot();
			return snapshot.ids.find((id) => {
				const summary = snapshot.byId[id];
				return summary?.title === expectedTitle && summary.cwd === repository.localPath;
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
		async function inspectWorkspace(workspace) {
			try {
				const query = new URLSearchParams({ path: workspace.path });
				const response = await fetch(`/api/pr-assistant/repository?${query}`, { headers: { accept: "application/json" } });
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
		function SidebarAction({ wide, openWorkbench }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				className: pr_assistant_module_css_default.sidebarAction,
				type: "button",
				title: "PR 助手",
				onClick: openWorkbench,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: pr_assistant_module_css_default.branchIcon,
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {})
					]
				}), wide ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "PR 助手" }) : null]
			});
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
					const platformCommand = repository.provider === "gitee" ? `使用只读命令 gitee code pr view ${pullRequest.number} 和 gitee code pr diff ${pullRequest.number} 获取完整证据。` : `使用 GitHub API 或当前可用的 GitHub 工具读取 PR #${pullRequest.number} 的完整提交与 diff。`;
					const prompt = [
						`请对当前仓库的 PR #${pullRequest.number} 做一次严格的代码评审。`,
						`标题：${detail.title}`,
						`分支：${detail.sourceBranch} → ${detail.targetBranch}`,
						`当前摘要：${detail.changedFiles} 个文件，+${detail.additions}/-${detail.deletions}，${detail.hasConflict ? "存在合并风险" : "未检测到冲突"}。`,
						platformCommand,
						"重点检查正确性、回归风险、安全性、并发/状态一致性、边界条件、性能和缺失测试。",
						"只报告可以用代码证据证明的问题；每条问题标注严重级别、文件路径、紧凑行号范围、触发场景和修复建议。",
						"回复必须简明且仅保留必要信息：不要复述 PR 背景、检查过程或给出泛化建议；每个问题最多一个短段落。",
						"如果没有发现问题，只回复“未发现明确问题”，必要时再用一行列出关键未验证风险。",
						"本次只做只读评审；不要修改代码、提交分支、合并 PR 或向代码平台发表评论，除非我之后明确授权。"
					].join("\n");
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
		function PrAssistantPanel({ ctx, close }) {
			const panelRef = (0, react.useRef)(null);
			const [results, setResults] = (0, react.useState)([]);
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
			const workspaces = (0, react.useSyncExternalStore)((listener) => ctx.workspaces.list.subscribe(listener), () => ctx.workspaces.list.getSnapshot(), () => ctx.workspaces.list.getSnapshot());
			async function refresh() {
				setLoading(true);
				setResults(await Promise.all(workspaces.items.map(inspectWorkspace)));
				setLoading(false);
			}
			(0, react.useEffect)(() => {
				refresh();
			}, [workspaces.items]);
			(0, react.useEffect)(() => {
				if (!selection) return;
				const controller = new AbortController();
				const query = new URLSearchParams({
					path: selection.repository.localPath,
					number: String(selection.pullRequest.number)
				});
				setDetail(null);
				setDetailError(null);
				setDetailLoading(true);
				fetch(`/api/pr-assistant/pull-request?${query}`, {
					headers: { accept: "application/json" },
					signal: controller.signal
				}).then(async (response) => {
					const body = await response.json();
					if (!response.ok) throw new Error(body.error || `请求失败 (${response.status})`);
					setDetail(body);
				}).catch((error) => {
					if (error instanceof Error && error.name === "AbortError") return;
					setDetailError(error instanceof Error ? error.message : "PR 详情读取失败");
				}).finally(() => {
					if (!controller.signal.aborted) setDetailLoading(false);
				});
				return () => controller.abort();
			}, [selection]);
			(0, react.useEffect)(() => {
				const closeOnOutsideNavigation = (event) => {
					if (!(event.target instanceof Element) || panelRef.current?.contains(event.target)) return;
					if (event.target.closest("[role=\"dialog\"], [role=\"menu\"]")) return;
					close();
				};
				document.addEventListener("pointerdown", closeOnOutsideNavigation, true);
				return () => document.removeEventListener("pointerdown", closeOnOutsideNavigation, true);
			}, [close]);
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
			function openAiReview() {
				if (!selection) return;
				if (reviewResult) {
					setReviewOpen(true);
					return;
				}
				const sessionId = findReviewSession(ctx, selection.repository, selection.pullRequest);
				if (sessionId) {
					saveReviewSession(selection.repository, selection.pullRequest, sessionId);
					ctx.sessions.open(sessionId);
					close();
					return;
				}
				removeReviewSession(selection.repository, selection.pullRequest);
				setReviewOpen(true);
			}
			const linkedSessionId = selection ? findReviewSession(ctx, selection.repository, selection.pullRequest) : null;
			const hasLinkedReview = linkedSessionId !== null;
			const reviewResult = useReviewResult(ctx, linkedSessionId);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				ref: panelRef,
				className: pr_assistant_module_css_default.workbench,
				"aria-label": "PR 助手",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
						className: pr_assistant_module_css_default.header,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: pr_assistant_module_css_default.eyebrow,
								children: "REVIEW RADAR"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: pr_assistant_module_css_default.titleRow,
								children: [selection ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									className: pr_assistant_module_css_default.titleBack,
									type: "button",
									"aria-label": "返回 PR 列表",
									title: "返回 PR 列表",
									onClick: () => setSelection(null),
									children: "←"
								}) : null, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", { children: selection ? `#${selection.pullRequest.number} PR 详情` : "PR 助手" })]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: selection ? selection.repository.repository : `${healthy} 个代码仓库 · ${total} 个待处理 PR` })
						] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: pr_assistant_module_css_default.actions,
							children: [!selection ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
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
							] }) : null, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "关闭",
								onClick: close,
								children: "×"
							})]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: pr_assistant_module_css_default.scrollArea,
						children: selection ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("main", {
							className: pr_assistant_module_css_default.detail,
							children: [
								detailLoading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: pr_assistant_module_css_default.detailState,
									children: "正在读取 PR 详情…"
								}) : null,
								detailError ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: pr_assistant_module_css_default.detailState,
									role: "alert",
									children: detailError
								}) : null,
								detail ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
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
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												className: pr_assistant_module_css_default.reviewButton,
												type: "button",
												onClick: openAiReview,
												children: reviewResult ? "重新分析" : hasLinkedReview ? "查看 AI 分析" : "AI 评审"
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => window.open(detail.url, "_blank", "noopener,noreferrer"),
												children: "打开 PR ↗"
											})]
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: pr_assistant_module_css_default.detailStats,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: detail.commitCount ?? "—" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: detail.commitCount === null ? "提交数暂不可用" : "提交" })] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: detail.changedFiles }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "变更文件" })] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", {
												className: pr_assistant_module_css_default.addition,
												children: ["+", detail.additions]
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "新增行" })] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", {
												className: pr_assistant_module_css_default.deletion,
												children: ["−", detail.deletions]
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "删除行" })] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", {
												className: detail.hasConflict ? pr_assistant_module_css_default.conflict : pr_assistant_module_css_default.clean,
												children: detail.hasConflict ? "有风险" : "无冲突"
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "合并状态" })] })
										]
									}),
									detail.description ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: pr_assistant_module_css_default.description,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "说明" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: detail.description })]
									}) : null,
									reviewResult ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
										className: pr_assistant_module_css_default.reviewResult,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: pr_assistant_module_css_default.eyebrow,
											children: "AI REVIEW"
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", { children: "AI 分析结果" })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												if (linkedSessionId) {
													ctx.sessions.open(linkedSessionId);
													close();
												}
											},
											children: "打开评审对话 ↗"
										})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", { children: reviewResult.text })]
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
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: pr_assistant_module_css_default.summary,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: total }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Open PR" })] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: visibleResults.filter((item) => item.openCount > 0).length }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "等待审查的仓库" })] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: visibleResults.filter((item) => item.error).length }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "需要配置" })] })
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("main", {
							className: pr_assistant_module_css_default.grid,
							children: [filtered.map((result) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
								className: pr_assistant_module_css_default.repo,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: pr_assistant_module_css_default.repoHeader,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: pr_assistant_module_css_default.provider,
												children: result.provider ?? "GIT"
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: result.repository ?? result.workspaceTitle }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: result.workspaceTitle })
										] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: pr_assistant_module_css_default.repoTools,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												className: pr_assistant_module_css_default.hideRepo,
												type: "button",
												onClick: () => hideRepository(result.workspaceId),
												children: "隐藏"
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: result.openCount ? pr_assistant_module_css_default.countActive : pr_assistant_module_css_default.count,
												children: result.openCount
											})]
										})]
									}),
									result.error ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
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
						})] })
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
		const inject = [
			"slots",
			"sessions",
			"workspaces",
			"remote",
			"remote.session"
		];
		function apply(ctx) {
			ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
				name: "sidebar.footer.action",
				id: "pr-assistant"
			}, (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SidebarAction, {
				...props,
				openWorkbench: () => {
					if (disposeWorkbench) return;
					const close = () => {
						const dispose = disposeWorkbench;
						disposeWorkbench = null;
						dispose?.();
					};
					disposeWorkbench = ctx.slots.register({
						name: "conversation",
						priority: -100
					}, () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrAssistantPanel, {
						ctx,
						close
					}));
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