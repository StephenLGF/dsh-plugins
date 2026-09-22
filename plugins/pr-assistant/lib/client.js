window.__ModuleLoader__.load({
	id: "@stephen1620/dsh-pr-assistant",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region \0dsh-css:/Users/gengfeng/dsh-tomato-board/plugins/pr-assistant/src/client/pr-assistant.module.css.mjs
		const css = ".-pwDiG_sidebarAction{width:100%;min-height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;background:0 0;border:0;border-radius:10px;align-items:center;gap:9px;padding:0 10px;display:flex}.-pwDiG_sidebarAction:hover{background:var(--dsw-alias-interactive-bg-hover)}.-pwDiG_branchIcon{flex:0 0 18px;width:18px;height:18px;position:relative}.-pwDiG_branchIcon:before{content:\"\";border-bottom:1.5px solid;border-left:1.5px solid;border-radius:0 0 0 5px;width:8px;height:8px;position:absolute;top:4px;left:4px}.-pwDiG_branchIcon i{background:var(--dsw-alias-bg-base);border:1.5px solid;border-radius:50%;width:5px;height:5px;position:absolute}.-pwDiG_branchIcon i:first-child{top:0;left:1px}.-pwDiG_branchIcon i:nth-child(2){bottom:0;left:1px}.-pwDiG_branchIcon i:last-child{top:7px;right:0}.-pwDiG_workbench{width:100%;height:100%;min-height:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-family:var(--dsw-font-family);border-left:1px solid var(--dsw-alias-border-l2);flex-direction:column;display:flex;position:relative;overflow:hidden}.-pwDiG_scrollArea{flex:1;min-height:0;overflow:hidden}.-pwDiG_header{z-index:5;box-sizing:border-box;border-bottom:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb,var(--dsw-alias-bg-base) 90%,transparent);backdrop-filter:blur(18px);justify-content:space-between;align-items:center;gap:16px;min-height:60px;padding:11px 20px;display:flex;position:sticky;top:0}.-pwDiG_eyebrow{color:var(--dsw-alias-state-business-primary);letter-spacing:.2em;font:700 9px/1.2 ui-monospace,SFMono-Regular,monospace;display:none}.-pwDiG_titleRow{align-items:center;gap:8px;margin-top:0;display:flex}.-pwDiG_header h1{letter-spacing:-.015em;margin:0;font-size:16px;line-height:22px}.-pwDiG_titleBack{border:1px solid var(--dsw-alias-border-l2);width:28px;height:28px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:8px;padding:0;font-size:16px}.-pwDiG_titleBack:hover{color:var(--dsw-alias-state-business-primary)}.-pwDiG_header p{color:var(--dsw-alias-label-secondary);margin:1px 0 0;font-size:11px;line-height:14px}.-pwDiG_actions{align-items:center;gap:8px;display:flex}.-pwDiG_actions button{border:1px solid var(--dsw-alias-border-l2);min-height:34px;color:inherit;background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:9px;padding:0 13px}.-pwDiG_actions button:last-child{width:34px;padding:0;font-size:20px}.-pwDiG_actions button:disabled{opacity:.5;cursor:wait}.-pwDiG_search{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:9px;align-items:center;gap:7px;width:210px;min-height:34px;padding:0 10px;display:flex}.-pwDiG_search input{width:100%;color:inherit;font:inherit;background:0 0;border:0;outline:0}.-pwDiG_grid{box-sizing:border-box;overscroll-behavior-inline:contain;scrollbar-gutter:stable;grid-auto-columns:minmax(360px,1fr);grid-auto-flow:column;gap:14px;height:100%;min-height:0;padding:18px 22px;display:grid;overflow:auto hidden}.-pwDiG_repo{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);min-width:0;height:100%;min-height:0;box-shadow:0 1px 0 color-mix(in srgb,var(--dsw-alias-label-primary) 5%,transparent);border-radius:14px;flex-direction:column;display:flex;overflow:hidden}.-pwDiG_repoIdentity{align-items:center;gap:9px;min-width:0;display:flex}.-pwDiG_repoTools{flex:none;align-items:center;gap:10px;display:flex}.-pwDiG_hideRepo{color:var(--dsw-alias-label-secondary);cursor:pointer;font:500 11px/16px var(--dsw-font-family);background:0 0;border:0;padding:0}.-pwDiG_hideRepo:hover{color:var(--dsw-alias-state-error-primary)}.-pwDiG_repoHeader{z-index:1;border-bottom:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);flex:none;justify-content:space-between;align-items:center;gap:14px;min-height:54px;padding:10px 14px;display:flex;position:relative}.-pwDiG_provider{color:var(--dsw-alias-state-business-primary);letter-spacing:.12em;text-transform:uppercase;flex:none;font:700 9px/1 ui-monospace,SFMono-Regular,monospace}.-pwDiG_repo h2{letter-spacing:-.015em;text-overflow:ellipsis;white-space:nowrap;min-width:0;margin:0;font-size:14px;overflow:hidden}.-pwDiG_count,.-pwDiG_countActive{border:1px solid var(--dsw-alias-border-l2);background:0 0;border-radius:7px;place-items:center;min-width:max-content;height:24px;padding:0 7px;font:700 13px/1 ui-monospace,SFMono-Regular,monospace;display:grid}.-pwDiG_count{color:var(--dsw-alias-label-tertiary)}.-pwDiG_countActive{color:var(--dsw-alias-state-business-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary) 34%,var(--dsw-alias-border-l2));background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 6%,transparent)}.-pwDiG_prList{overscroll-behavior:contain;scrollbar-gutter:stable;flex:1;min-height:0;margin:0;padding:0;list-style:none;overflow-y:auto}.-pwDiG_prList li+li{border-top:1px solid color-mix(in srgb,var(--dsw-alias-border-l2) 70%,transparent)}.-pwDiG_prRow{align-items:stretch;display:flex}.-pwDiG_prMain{min-width:0;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;flex:1;grid-template-columns:auto minmax(0,1fr) auto;gap:4px 9px;padding:11px 10px 11px 16px;display:grid}.-pwDiG_prRow:hover{background:var(--dsw-alias-interactive-bg-hover)}.-pwDiG_prNumber{color:var(--dsw-alias-state-business-primary);font:650 11px/18px ui-monospace,SFMono-Regular,monospace}.-pwDiG_prTitle{text-overflow:ellipsis;white-space:nowrap;font-size:13px;line-height:18px;overflow:hidden}.-pwDiG_branches,.-pwDiG_meta{min-width:0;color:var(--dsw-alias-label-secondary);grid-column:2/-1;font-size:10px}.-pwDiG_branches{flex-wrap:wrap;align-items:center;gap:5px;display:flex}.-pwDiG_sourceBranch,.-pwDiG_targetBranch{border:1px solid;border-radius:5px;align-items:center;gap:5px;min-width:0;max-width:100%;padding:2px 7px;display:inline-flex}.-pwDiG_sourceBranch{color:#c993ff;background:#9b59d01a;border-color:#9b59d061}.-pwDiG_targetBranch{color:#55c889;background:#3fbf721a;border-color:#3fbf7261}.-pwDiG_branches b{flex:none;font-size:9px;font-weight:650}.-pwDiG_branches code{min-width:0;color:inherit;text-overflow:ellipsis;white-space:nowrap;font:10px/14px ui-monospace,SFMono-Regular,monospace;overflow:hidden}.-pwDiG_draft,.-pwDiG_conflictTag,.-pwDiG_unknownTag{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);border-radius:4px;align-self:center;padding:2px 5px;font-size:9px}.-pwDiG_conflictTag{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 45%,transparent);color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent)}.-pwDiG_unknownTag{color:var(--dsw-alias-label-tertiary)}.-pwDiG_externalLink{width:58px;color:var(--dsw-alias-label-secondary);cursor:pointer;font:500 10px/1 var(--dsw-font-family);background:0 0;border:1px solid #0000;border-radius:7px;margin:8px 8px 8px 0}.-pwDiG_externalLink:hover{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-bg-layer-2)}.-pwDiG_empty{min-height:132px;color:var(--dsw-alias-label-secondary);flex-direction:column;flex:1;justify-content:center;align-items:center;display:flex}.-pwDiG_empty>span{color:#60d98a;border:1px solid #60d98a;border-radius:50%;place-items:center;width:28px;height:28px;display:grid}.-pwDiG_empty p{color:var(--dsw-alias-label-primary);margin:8px 0 2px;font-size:13px}.-pwDiG_empty small{font-size:10px}.-pwDiG_detail{gap:14px;width:min(1080px,100% - 44px);height:100%;margin:0 auto;padding:22px 0 40px;display:grid;overflow-y:auto}.-pwDiG_backToList{border:1px solid var(--dsw-alias-border-l2);width:max-content;min-height:32px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);cursor:pointer;border-radius:8px;padding:0 10px}.-pwDiG_backToList:hover{color:var(--dsw-alias-state-business-primary)}.-pwDiG_detailState{min-height:240px;color:var(--dsw-alias-label-secondary);place-items:center;display:grid}.-pwDiG_detailHero,.-pwDiG_detailStats,.-pwDiG_description,.-pwDiG_files{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:14px}.-pwDiG_detailHero{justify-content:space-between;align-items:flex-start;gap:24px;padding:22px;display:flex}.-pwDiG_detailHero>div>span{color:var(--dsw-alias-label-secondary);font-size:11px}.-pwDiG_detailHero h2{letter-spacing:-.025em;max-width:760px;margin:7px 0 14px;font-size:22px;line-height:1.35}.-pwDiG_detailHero code{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);border-radius:6px;padding:5px 8px;font-size:11px}.-pwDiG_detailHero button{border:1px solid var(--dsw-alias-border-l2);min-width:max-content;min-height:34px;color:var(--dsw-alias-state-business-primary);cursor:pointer;background:0 0;border-radius:8px;padding:0 12px}.-pwDiG_detailStats{grid-template-columns:repeat(5,1fr);display:grid;overflow:hidden}.-pwDiG_detailStats div{border-right:1px solid var(--dsw-alias-border-l2);flex-direction:column;justify-content:center;min-height:86px;padding:16px;display:flex}.-pwDiG_detailStats div:last-child{border:0}.-pwDiG_detailStats strong{font:700 18px/1.2 ui-monospace,SFMono-Regular,monospace}.-pwDiG_detailStats span{color:var(--dsw-alias-label-secondary);margin-top:7px;font-size:10px}.-pwDiG_addition,.-pwDiG_clean{color:#3fbf72}.-pwDiG_deletion,.-pwDiG_conflict{color:var(--dsw-alias-state-error-primary)}.-pwDiG_unknown{color:var(--dsw-alias-label-secondary)}.-pwDiG_description{padding:18px 20px}.-pwDiG_description h3,.-pwDiG_files h3{margin:0 0 12px;font-size:13px}.-pwDiG_description p{color:var(--dsw-alias-label-secondary);white-space:pre-wrap;margin:0;font-size:12px;line-height:1.7}.-pwDiG_files{min-width:0;padding:18px 20px}.-pwDiG_files h3 span{color:var(--dsw-alias-label-secondary);font-weight:400}.-pwDiG_files ol{margin:0;padding:0;list-style:none}.-pwDiG_files li{border-top:1px solid color-mix(in srgb,var(--dsw-alias-border-l2) 65%,transparent)}.-pwDiG_files details{min-width:0}.-pwDiG_files summary{cursor:pointer;grid-template-columns:22px minmax(0,1fr) auto;align-items:center;gap:8px;min-height:42px;list-style:none;display:grid}.-pwDiG_files summary::-webkit-details-marker{display:none}.-pwDiG_files summary:before{content:\"›\";color:var(--dsw-alias-label-tertiary);margin-left:-13px;transition:transform .15s;position:absolute}.-pwDiG_files details[open] summary:before{transform:rotate(90deg)}.-pwDiG_fileStatus{color:var(--dsw-alias-label-secondary);font:700 10px/1 ui-monospace,SFMono-Regular,monospace}.-pwDiG_files code{text-overflow:ellipsis;white-space:nowrap;font-size:11px;overflow:hidden}.-pwDiG_fileCounts{gap:8px;font:600 10px/1 ui-monospace,SFMono-Regular,monospace;display:flex}.-pwDiG_fileCounts i{color:#3fbf72;font-style:normal}.-pwDiG_fileCounts b{color:var(--dsw-alias-state-error-primary)}.-pwDiG_diffBlock{border:1px solid var(--dsw-alias-border-l2);max-height:520px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);tab-size:2;border-radius:9px;margin:0 0 12px;padding:12px 0;font:10px/1.55 ui-monospace,SFMono-Regular,monospace;overflow:auto}.-pwDiG_diffBlock span{min-width:max-content;padding:0 12px;display:block}.-pwDiG_diffAdd{color:#62c986;background:#3fbf7217}.-pwDiG_diffDelete{color:#e47b82;background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 9%,transparent)}.-pwDiG_diffHunk{color:var(--dsw-alias-state-business-primary)}.-pwDiG_diffUnavailable{border:1px dashed var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);border-radius:9px;margin:0 0 12px;padding:12px;font-size:11px}.-pwDiG_detailActions{align-items:center;gap:8px;min-width:max-content;display:flex}.-pwDiG_detailHero .-pwDiG_reviewButton{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted);background:var(--dsw-alias-state-business-primary);font-weight:650}.-pwDiG_detailHero .-pwDiG_reviewButton:hover{filter:brightness(1.08)}.-pwDiG_modalBackdrop{z-index:1000;backdrop-filter:blur(5px);background:#00000085;place-items:center;padding:20px;display:grid;position:fixed;inset:0}.-pwDiG_reviewDialog{border:1px solid var(--dsw-alias-border-l2);width:min(480px,100%);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);box-shadow:var(--dsw-shadow-lv3);border-radius:16px;padding:24px}.-pwDiG_reviewDialog h2{letter-spacing:-.025em;margin:5px 0 6px;font-size:20px}.-pwDiG_reviewDialog>p{color:var(--dsw-alias-label-secondary);margin:0 0 20px;font-size:12px;line-height:1.6}.-pwDiG_modelField{gap:7px;display:grid}.-pwDiG_modelField>span{color:var(--dsw-alias-label-secondary);font-size:11px}.-pwDiG_modelField select{border:1px solid var(--dsw-alias-border-l2);width:100%;height:40px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);font:inherit;border-radius:9px;outline:0;padding:0 10px}.-pwDiG_modelField select:focus{border-color:var(--dsw-alias-state-business-primary)}.-pwDiG_modelHint{min-height:18px;color:var(--dsw-alias-label-tertiary);margin-top:7px;font-size:10px}.-pwDiG_reviewError{border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 35%,transparent);color:var(--dsw-alias-state-error-primary);border-radius:8px;margin:0 0 14px;padding:9px 11px;font-size:11px}.-pwDiG_reviewDialog footer{justify-content:flex-end;gap:8px;margin-top:22px;display:flex}.-pwDiG_reviewDialog footer button{border:1px solid var(--dsw-alias-border-l2);min-height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:8px;padding:0 14px}.-pwDiG_reviewDialog footer button:last-child{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted);background:var(--dsw-alias-state-business-primary)}.-pwDiG_reviewDialog footer button:disabled{cursor:not-allowed;opacity:.48}.-pwDiG_error{min-height:100px;color:var(--dsw-alias-state-error-primary);flex-direction:column;justify-content:center;gap:5px;padding:18px;display:flex}.-pwDiG_error span{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;font-size:11px}.-pwDiG_notice{color:var(--dsw-alias-label-secondary);margin:0;padding:8px 16px;font-size:10px}.-pwDiG_noResults{color:var(--dsw-alias-label-secondary);text-align:center;grid-column:1/-1;padding:80px}@media (width<=760px){.-pwDiG_header{flex-direction:column;align-items:flex-start}.-pwDiG_actions{width:100%}.-pwDiG_search{flex:1;min-width:0}.-pwDiG_grid{grid-auto-columns:calc(100vw - 24px);padding:12px}.-pwDiG_detail{width:calc(100% - 24px)}.-pwDiG_detailHero{flex-direction:column}.-pwDiG_detailActions{flex-wrap:wrap;width:100%}.-pwDiG_detailStats{grid-template-columns:repeat(2,1fr)}.-pwDiG_detailStats div{border-bottom:1px solid var(--dsw-alias-border-l2)}}@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}.-pwDiG_files .-pwDiG_diffBlock,.-pwDiG_files .-pwDiG_diffUnavailable{margin-left:30px}.-pwDiG_externalLink svg{fill:none;stroke:currentColor;stroke-width:1.4px;stroke-linecap:round;stroke-linejoin:round;width:15px;height:15px}.-pwDiG_reviewResult,.-pwDiG_reviewPending{border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 26%,var(--dsw-alias-border-l2));background:var(--dsw-alias-bg-layer-1);border-radius:14px}.-pwDiG_reviewResult{min-width:0;padding:18px 20px 20px}.-pwDiG_reviewResult>header{justify-content:space-between;align-items:center;gap:16px;display:flex}.-pwDiG_reviewResultActions{align-items:center;gap:8px;display:flex}.-pwDiG_reviewResultActions button:disabled{opacity:.5;cursor:wait}.-pwDiG_commentSuccess{color:#3fbf72;border:1px solid #3fbf7266;border-radius:8px;margin-top:12px;padding:9px 11px;font-size:11px}.-pwDiG_reviewResult h3{margin:4px 0 0;font-size:15px}.-pwDiG_reviewResult button,.-pwDiG_reviewPending button{border:1px solid var(--dsw-alias-border-l2);min-height:32px;color:var(--dsw-alias-state-business-primary);cursor:pointer;background:0 0;border-radius:8px;padding:0 10px}.-pwDiG_reviewResult>pre{border:1px solid var(--dsw-alias-border-l2);max-height:640px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font:12px/1.7 var(--dsw-font-family);white-space:pre-wrap;overflow-wrap:anywhere;border-radius:10px;margin:16px 0 0;padding:16px;overflow:auto}.-pwDiG_reviewPending{align-items:center;gap:12px;padding:16px 20px;display:flex}.-pwDiG_reviewPending strong{flex:1;font-size:13px}.-pwDiG_restoreDialog{border:1px solid var(--dsw-alias-border-l2);width:min(500px,100%);max-height:min(620px,100vh - 40px);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);box-shadow:var(--dsw-shadow-lv3);border-radius:16px;flex-direction:column;padding:24px;display:flex}.-pwDiG_restoreDialog h2{margin:5px 0 4px;font-size:20px}.-pwDiG_restoreDialog>p{color:var(--dsw-alias-label-secondary);margin:0 0 16px;font-size:12px}.-pwDiG_restoreDialog ol{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;min-height:0;margin:0;padding:0;list-style:none;overflow:auto}.-pwDiG_restoreDialog li+li{border-top:1px solid var(--dsw-alias-border-l2)}.-pwDiG_restoreDialog label{cursor:pointer;align-items:center;gap:11px;min-height:54px;padding:8px 12px;display:flex}.-pwDiG_restoreDialog label:hover{background:var(--dsw-alias-interactive-bg-hover)}.-pwDiG_restoreDialog label>span{flex-direction:column;gap:3px;min-width:0;display:flex}.-pwDiG_restoreDialog strong{text-overflow:ellipsis;white-space:nowrap;font-size:12px;overflow:hidden}.-pwDiG_restoreDialog small{color:var(--dsw-alias-label-secondary);font-size:10px}.-pwDiG_restoreDialog footer{justify-content:flex-end;gap:8px;margin-top:18px;display:flex}.-pwDiG_restoreDialog footer button{border:1px solid var(--dsw-alias-border-l2);min-height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:8px;padding:0 14px}.-pwDiG_restoreDialog footer button:last-child{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted);background:var(--dsw-alias-state-business-primary)}.-pwDiG_restoreDialog footer button:disabled{opacity:.45;cursor:not-allowed}.-pwDiG_files summary{grid-template-columns:14px 22px minmax(0,1fr) auto}.-pwDiG_files summary:before{content:none}.-pwDiG_disclosureIcon{width:14px;height:14px;color:var(--dsw-alias-label-tertiary);place-items:center;transition:transform .15s;display:grid}.-pwDiG_disclosureIcon svg{fill:none;stroke:currentColor;stroke-width:1.5px;stroke-linecap:round;stroke-linejoin:round;width:12px;height:12px}.-pwDiG_files details[open] .-pwDiG_disclosureIcon{transform:rotate(90deg)}.-pwDiG_commits{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:14px;min-width:0;padding:18px 20px}.-pwDiG_commitsHeading{align-items:center;gap:6px;margin:0 0 10px;font-size:13px;display:flex}.-pwDiG_commitsCount{border:1px solid color-mix(in srgb,var(--dsw-alias-state-business-primary) 34%,var(--dsw-alias-border-l2));min-width:22px;height:20px;color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 6%,transparent);cursor:pointer;border-radius:6px;justify-content:center;align-items:center;padding:0 6px;font:700 11px/1 ui-monospace,SFMono-Regular,monospace;display:inline-flex}.-pwDiG_commitsCount:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary) 14%,transparent)}.-pwDiG_commits ol{margin:0;padding:0;list-style:none}.-pwDiG_commits li{border-top:1px solid color-mix(in srgb,var(--dsw-alias-border-l2) 65%,transparent);grid-template-columns:64px minmax(0,1fr) 28px;align-items:center;gap:10px;min-height:48px;display:grid}.-pwDiG_commits li>code{color:var(--dsw-alias-state-business-primary);font:10px/1 ui-monospace,SFMono-Regular,monospace}.-pwDiG_commits li>div{flex-direction:column;gap:3px;min-width:0;display:flex}.-pwDiG_commits strong{text-overflow:ellipsis;white-space:nowrap;font-size:12px;font-weight:550;overflow:hidden}.-pwDiG_commits li span{color:var(--dsw-alias-label-secondary);font-size:10px}.-pwDiG_commits button{width:28px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:1px solid #0000;border-radius:7px;padding:0;font-size:13px}.-pwDiG_commits button:hover{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-state-business-primary)}.-pwDiG_commitView{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:14px;min-width:0;padding:18px 20px}.-pwDiG_commitView h3{margin:0 0 10px;font-size:13px}.-pwDiG_commitView h3 span{color:var(--dsw-alias-label-secondary);font-weight:400}.-pwDiG_commitList{margin:0;padding:0;list-style:none}.-pwDiG_commitList li+li{border-top:1px solid color-mix(in srgb,var(--dsw-alias-border-l2) 65%,transparent)}.-pwDiG_commitRow{align-items:center;gap:8px;display:flex}.-pwDiG_commitMain{min-width:0;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;flex:1;grid-template-columns:14px minmax(0,1fr);align-items:center;gap:9px;padding:11px 6px;display:grid}.-pwDiG_commitMain:hover{background:var(--dsw-alias-interactive-bg-hover)}.-pwDiG_commitMeta{flex-direction:column;gap:3px;min-width:0;display:flex}.-pwDiG_commitMain strong{text-overflow:ellipsis;white-space:nowrap;font-size:12px;font-weight:550;overflow:hidden}.-pwDiG_commitMain span{color:var(--dsw-alias-label-secondary);font-size:10px}.-pwDiG_commitShaButton{min-height:26px;color:var(--dsw-alias-state-business-primary);cursor:pointer;font:inherit;background:0 0;border:1px solid #0000;border-radius:7px;align-items:center;gap:5px;padding:0 8px;display:inline-flex}.-pwDiG_commitShaButton:hover{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2)}.-pwDiG_commitShaButton code{color:inherit;font:600 11px/1 ui-monospace,SFMono-Regular,monospace}.-pwDiG_commitShaCopyHint{color:var(--dsw-alias-label-tertiary);font-size:11px}.-pwDiG_commitShaButton[aria-pressed=true] .-pwDiG_commitShaCopyHint{color:#3fbf72}.-pwDiG_commitExternal{width:28px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:1px solid #0000;border-radius:7px;padding:0;font-size:13px}.-pwDiG_commitExternal:hover{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-state-business-primary)}.-pwDiG_commitBody{padding:10px 12px 16px 34px}.-pwDiG_commitState{min-height:72px;color:var(--dsw-alias-label-secondary);place-items:center;font-size:11px;display:grid}.-pwDiG_commitFiles{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);border-radius:10px;margin:6px 0 0;padding:0;list-style:none;overflow:hidden}.-pwDiG_commitFiles li+li{border-top:1px solid color-mix(in srgb,var(--dsw-alias-border-l2) 65%,transparent)}.-pwDiG_commitFiles summary{cursor:pointer;grid-template-columns:14px 22px minmax(0,1fr) auto;align-items:center;gap:8px;min-height:42px;padding:0 14px;list-style:none;display:grid}.-pwDiG_commitFiles summary::-webkit-details-marker{display:none}.-pwDiG_commitFiles summary:before{content:none}.-pwDiG_commitFiles details[open] .-pwDiG_disclosureIcon{transform:rotate(90deg)}.-pwDiG_commitFiles .-pwDiG_diffBlock,.-pwDiG_commitFiles .-pwDiG_diffUnavailable{margin-left:14px;margin-right:14px}.-pwDiG_detailStats .-pwDiG_commitStat{border:0;border-right:1px solid var(--dsw-alias-border-l2);min-height:86px;color:inherit;text-align:left;cursor:pointer;background:0 0;flex-direction:column;justify-content:center;padding:16px;display:flex}.-pwDiG_detailStats .-pwDiG_commitStat:hover{background:var(--dsw-alias-interactive-bg-hover)}.-pwDiG_detailStats .-pwDiG_commitStat:disabled{cursor:default;opacity:.65}.-pwDiG_detailStats .-pwDiG_commitStat strong{font:700 18px/1.2 ui-monospace,SFMono-Regular,monospace}.-pwDiG_detailStats .-pwDiG_commitStat span{color:var(--dsw-alias-state-business-primary);margin-top:7px;font-size:10px}.-pwDiG_detailHero .-pwDiG_conflictButton{border-color:var(--dsw-alias-state-error-primary);color:#fff;background:var(--dsw-alias-state-error-primary);font-weight:650}.-pwDiG_conflictResult{border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 28%,var(--dsw-alias-border-l2));background:var(--dsw-alias-bg-layer-1);border-radius:14px;min-width:0;padding:18px 20px 20px}.-pwDiG_conflictResult>header{justify-content:space-between;align-items:center;gap:16px;display:flex}.-pwDiG_conflictResult h3{margin:4px 0 0;font-size:15px}.-pwDiG_conflictResultActions{gap:8px;display:flex}.-pwDiG_conflictResult button{border:1px solid var(--dsw-alias-border-l2);min-height:32px;color:var(--dsw-alias-state-business-primary);cursor:pointer;background:0 0;border-radius:8px;padding:0 10px}.-pwDiG_conflictResult .-pwDiG_pushButton{color:#fff;background:#2f9f5d;border-color:#3fbf72;font-weight:650}.-pwDiG_conflictFacts{flex-wrap:wrap;gap:8px;margin-top:14px;display:flex}.-pwDiG_conflictFacts>span{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);border-radius:7px;padding:6px 8px;font-size:10px}.-pwDiG_conflictFacts code{color:var(--dsw-alias-label-primary)}.-pwDiG_conflictChanges,.-pwDiG_conflictLogic{margin-top:16px}.-pwDiG_conflictChanges h4,.-pwDiG_conflictLogic h4{margin:0 0 8px;font-size:12px}.-pwDiG_conflictChanges ol{margin:0;padding:0;list-style:none}.-pwDiG_conflictChanges li{border-top:1px solid var(--dsw-alias-border-l2);align-items:center;gap:9px;min-height:30px;display:flex}.-pwDiG_conflictChanges b{width:22px;color:var(--dsw-alias-state-business-primary);font:700 10px/1 ui-monospace,SFMono-Regular,monospace}.-pwDiG_conflictChanges code{overflow-wrap:anywhere;font-size:11px}.-pwDiG_conflictLogic pre{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);max-height:520px;font:12px/1.65 var(--dsw-font-family);white-space:pre-wrap;overflow-wrap:anywhere;border-radius:9px;margin:0;padding:14px;overflow:auto}.-pwDiG_conflictSuccess{color:#3fbf72;border:1px solid #3fbf7266;border-radius:8px;margin-top:12px;padding:9px 11px;font-size:11px}";
		const tagId = "@stephen1620/dsh-pr-assistant/pr-assistant.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@stephen1620/dsh-pr-assistant";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var pr_assistant_module_css_default = {
			"actions": "-pwDiG_actions",
			"addition": "-pwDiG_addition",
			"backToList": "-pwDiG_backToList",
			"branchIcon": "-pwDiG_branchIcon",
			"branches": "-pwDiG_branches",
			"clean": "-pwDiG_clean",
			"commentSuccess": "-pwDiG_commentSuccess",
			"commitBody": "-pwDiG_commitBody",
			"commitExternal": "-pwDiG_commitExternal",
			"commitFiles": "-pwDiG_commitFiles",
			"commitList": "-pwDiG_commitList",
			"commitMain": "-pwDiG_commitMain",
			"commitMeta": "-pwDiG_commitMeta",
			"commitRow": "-pwDiG_commitRow",
			"commitShaButton": "-pwDiG_commitShaButton",
			"commitShaCopyHint": "-pwDiG_commitShaCopyHint",
			"commitStat": "-pwDiG_commitStat",
			"commitState": "-pwDiG_commitState",
			"commitView": "-pwDiG_commitView",
			"commits": "-pwDiG_commits",
			"commitsCount": "-pwDiG_commitsCount",
			"commitsHeading": "-pwDiG_commitsHeading",
			"conflict": "-pwDiG_conflict",
			"conflictButton": "-pwDiG_conflictButton",
			"conflictChanges": "-pwDiG_conflictChanges",
			"conflictFacts": "-pwDiG_conflictFacts",
			"conflictLogic": "-pwDiG_conflictLogic",
			"conflictResult": "-pwDiG_conflictResult",
			"conflictResultActions": "-pwDiG_conflictResultActions",
			"conflictSuccess": "-pwDiG_conflictSuccess",
			"conflictTag": "-pwDiG_conflictTag",
			"count": "-pwDiG_count",
			"countActive": "-pwDiG_countActive",
			"deletion": "-pwDiG_deletion",
			"description": "-pwDiG_description",
			"detail": "-pwDiG_detail",
			"detailActions": "-pwDiG_detailActions",
			"detailHero": "-pwDiG_detailHero",
			"detailState": "-pwDiG_detailState",
			"detailStats": "-pwDiG_detailStats",
			"diffAdd": "-pwDiG_diffAdd",
			"diffBlock": "-pwDiG_diffBlock",
			"diffDelete": "-pwDiG_diffDelete",
			"diffHunk": "-pwDiG_diffHunk",
			"diffUnavailable": "-pwDiG_diffUnavailable",
			"disclosureIcon": "-pwDiG_disclosureIcon",
			"draft": "-pwDiG_draft",
			"empty": "-pwDiG_empty",
			"error": "-pwDiG_error",
			"externalLink": "-pwDiG_externalLink",
			"eyebrow": "-pwDiG_eyebrow",
			"fileCounts": "-pwDiG_fileCounts",
			"fileStatus": "-pwDiG_fileStatus",
			"files": "-pwDiG_files",
			"grid": "-pwDiG_grid",
			"header": "-pwDiG_header",
			"hideRepo": "-pwDiG_hideRepo",
			"meta": "-pwDiG_meta",
			"modalBackdrop": "-pwDiG_modalBackdrop",
			"modelField": "-pwDiG_modelField",
			"modelHint": "-pwDiG_modelHint",
			"noResults": "-pwDiG_noResults",
			"notice": "-pwDiG_notice",
			"prList": "-pwDiG_prList",
			"prMain": "-pwDiG_prMain",
			"prNumber": "-pwDiG_prNumber",
			"prRow": "-pwDiG_prRow",
			"prTitle": "-pwDiG_prTitle",
			"provider": "-pwDiG_provider",
			"pushButton": "-pwDiG_pushButton",
			"repo": "-pwDiG_repo",
			"repoHeader": "-pwDiG_repoHeader",
			"repoIdentity": "-pwDiG_repoIdentity",
			"repoTools": "-pwDiG_repoTools",
			"restoreDialog": "-pwDiG_restoreDialog",
			"reviewButton": "-pwDiG_reviewButton",
			"reviewDialog": "-pwDiG_reviewDialog",
			"reviewError": "-pwDiG_reviewError",
			"reviewPending": "-pwDiG_reviewPending",
			"reviewResult": "-pwDiG_reviewResult",
			"reviewResultActions": "-pwDiG_reviewResultActions",
			"scrollArea": "-pwDiG_scrollArea",
			"search": "-pwDiG_search",
			"sidebarAction": "-pwDiG_sidebarAction",
			"sourceBranch": "-pwDiG_sourceBranch",
			"targetBranch": "-pwDiG_targetBranch",
			"titleBack": "-pwDiG_titleBack",
			"titleRow": "-pwDiG_titleRow",
			"unknown": "-pwDiG_unknown",
			"unknownTag": "-pwDiG_unknownTag",
			"workbench": "-pwDiG_workbench"
		};
		//#endregion
		//#region ../../../../../../Users/gengfeng/dsh-tomato-board/plugins/pr-assistant/src/client/PrAssistant.tsx
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
				fetch(`/api/pr-assistant/commit?${query}`, {
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
		function PrAssistantPanel({ ctx, close }) {
			const panelRef = (0, react.useRef)(null);
			const refreshGeneration = (0, react.useRef)(0);
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
			const [commitView, setCommitView] = (0, react.useState)(false);
			const [conflict, setConflict] = (0, react.useState)(null);
			const [conflictStatus, setConflictStatus] = (0, react.useState)(null);
			const [conflictBusy, setConflictBusy] = (0, react.useState)(false);
			const [conflictError, setConflictError] = (0, react.useState)(null);
			const [pushed, setPushed] = (0, react.useState)(false);
			const [commentBusy, setCommentBusy] = (0, react.useState)(false);
			const [commentStatus, setCommentStatus] = (0, react.useState)(null);
			const workspaces = (0, react.useSyncExternalStore)((listener) => ctx.workspaces.list.subscribe(listener), () => ctx.workspaces.list.getSnapshot(), () => ctx.workspaces.list.getSnapshot());
			async function refresh() {
				const generation = ++refreshGeneration.current;
				setLoading(true);
				try {
					const next = await inspectWorkspaces(workspaces.items);
					if (generation === refreshGeneration.current) setResults(next);
				} finally {
					if (generation === refreshGeneration.current) setLoading(false);
				}
			}
			(0, react.useEffect)(() => {
				refresh();
			}, [workspaces.items]);
			(0, react.useEffect)(() => {
				if (!selection) return;
				setCommitView(false);
				const controller = new AbortController();
				const query = new URLSearchParams({
					path: selection.repository.localPath,
					number: String(selection.pullRequest.number),
					_t: String(Date.now())
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
				setConflict(selection ? conflictLink(selection.repository, selection.pullRequest) : null);
				setConflictStatus(null);
				setConflictError(null);
				setPushed(false);
				setCommentStatus(null);
			}, [selection]);
			(0, react.useEffect)(() => {
				if (!conflict) return;
				let active = true;
				let timer;
				const refreshStatus = async () => {
					try {
						const query = new URLSearchParams({ operationId: conflict.operationId });
						const status = await readApiJson(await fetch(`/api/pr-assistant/conflict/status?${query}`, { headers: { accept: "application/json" } }));
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
			}, [conflict]);
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
					await readApiJson(await fetch("/api/pr-assistant/review/comment", {
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
					const preflight = await readApiJson(await fetch("/api/pr-assistant/conflict/preflight", {
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
					await readApiJson(await fetch("/api/pr-assistant/conflict/push", {
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
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: pr_assistant_module_css_default.eyebrow,
								children: "REVIEW RADAR"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
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
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: selection ? commitView ? `${detail?.commits.length ?? 0} 个提交` : selection.repository.repository : `${healthy} 个代码仓库 · ${total} 个待处理 PR` })
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
		const inject = [
			"slots",
			"layout",
			"sessions",
			"workspaces",
			"remote",
			"remote.session"
		];
		function apply(ctx) {
			const close = () => ctx.layout.selectPanel(null);
			ctx.slots.inject("main", () => ctx.slots.register({
				name: "main",
				key: "pr-assistant",
				id: "pr-assistant-panel"
			}, () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PrAssistantPanel, {
				ctx,
				close
			})));
			ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
				name: "sidebar.footer.action",
				id: "pr-assistant"
			}, (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SidebarAction, {
				...props,
				openWorkbench: () => ctx.layout.selectPanel("pr-assistant")
			})));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map