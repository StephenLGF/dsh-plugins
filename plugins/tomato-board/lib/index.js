import { execFile } from "node:child_process";
import process$1 from "node:process";
import { promisify } from "node:util";
import { accessSync, constants } from "node:fs";
import { homedir } from "node:os";
import { delimiter, dirname, isAbsolute, join, relative } from "node:path";
import { mkdir, open, readFile, realpath, rename, unlink, writeFile } from "node:fs/promises";
import { createHash, randomUUID } from "node:crypto";
//#region src/cli-path.ts
/** Resolve a CLI for GUI processes whose inherited PATH omits user bin folders. */
function resolveCliExecutable(executable, path = process.env.PATH ?? "", home = homedir()) {
	if (isAbsolute(executable) || executable.includes("/") || executable.includes("\\")) return executable;
	const directories = [
		...path.split(delimiter).filter(Boolean),
		join(home, ".local", "bin"),
		join(home, "go", "bin"),
		"/opt/homebrew/bin",
		"/usr/local/bin"
	];
	for (const directory of directories) {
		const candidate = join(directory, executable);
		try {
			accessSync(candidate, constants.X_OK);
			return candidate;
		} catch {}
	}
	throw new Error(`找不到 ${executable} 可执行文件，请在番茄工作台插件配置 executable 中填写绝对路径`);
}
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
function teamPeriod(start, end) {
	const period = {
		start: teamDate(start),
		end: teamDate(end)
	};
	if (!period.start || !period.end || period.end < period.start) throw new Error("迭代缺少有效起止日期，请先在番茄中补全");
	return period;
}
const amount = (raw) => {
	if (typeof raw !== "number" && typeof raw !== "string" || raw === "" || typeof raw === "string" && !raw.trim()) return null;
	const value = Number(raw);
	return Number.isFinite(value) && value >= 0 ? value : null;
};
const days = (start, end) => Math.round((Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 864e5) + 1;
/** Story estimates and Task effort have different units and must stay separate. */
function teamItemMetrics(itemType, fields, inSprint, period) {
	const start = teamDate(fields.DateSDate);
	const end = teamDate(fields.qiwangwanchengriqi);
	const hasDates = Boolean(start && end && end >= start);
	const overlaps = hasDates && start <= period.end && end >= period.start;
	if (itemType === "Task") {
		if (!overlaps) return null;
		const plannedDays = amount(fields.planStoryPoint);
		const overlapDays = days(start < period.start ? period.start : start, end > period.end ? period.end : end);
		return {
			storyPoints: null,
			plannedDays,
			periodDays: plannedDays === null ? null : Number((plannedDays * overlapDays / days(start, end)).toFixed(4)),
			plannedStart: start,
			plannedEnd: end
		};
	}
	if (!["Story", "EnablerStory"].includes(itemType) || (hasDates ? !overlaps : !inSprint)) return null;
	return {
		storyPoints: amount(fields.StoryPoint),
		plannedDays: null,
		periodDays: null,
		plannedStart: start,
		plannedEnd: end
	};
}
//#endregion
//#region src/pr-assistant.ts
const execFileAsync$1 = promisify(execFile);
const ROUTE$1 = "/api/tomato-board/pr/repository";
const DETAIL_ROUTE = "/api/tomato-board/pr/pull-request";
const COMMIT_ROUTE = "/api/tomato-board/pr/commit";
const CONFLICT_PREFLIGHT_ROUTE = "/api/tomato-board/pr/conflict/preflight";
const CONFLICT_STATUS_ROUTE = "/api/tomato-board/pr/conflict/status";
const CONFLICT_PUSH_ROUTE = "/api/tomato-board/pr/conflict/push";
const REVIEW_COMMENT_ROUTE = "/api/tomato-board/pr/review/comment";
const MAX_REVIEW_COMMENT_LENGTH = 2e4;
var ClientInputError = class extends Error {};
const conflictOperations = /* @__PURE__ */ new Map();
function normalizeGiteeConflictStatus(detail) {
	if (detail.has_conflict === true || detail.has_conflicts === true || detail.conflicts === true) return "conflicting";
	if (detail.has_conflict === false || detail.has_conflicts === false || detail.conflicts === false) return "mergeable";
	const status = String(detail.merge_status || detail.detailed_merge_status || "").toLowerCase();
	if ([
		"cannot_be_merged",
		"conflict",
		"conflicts"
	].includes(status)) return "conflicting";
	if ([
		"can_be_merged",
		"mergeable",
		"can_be_merged_recheck"
	].includes(status)) return "mergeable";
	return "unknown";
}
function normalizeGithubConflictStatus(detail) {
	if (detail.mergeable === true) return "mergeable";
	if (detail.mergeable === false) return "conflicting";
	return "unknown";
}
function sendJson$1(response, status, body) {
	response.statusCode = status;
	response.setHeader("content-type", "application/json; charset=utf-8");
	response.setHeader("cache-control", "no-store");
	response.end(JSON.stringify(body));
}
function parseRemote(remote) {
	const normalized = remote.trim().replace(/^git@([^:]+):/u, "https://$1/").replace(/\.git$/u, "");
	const url = new URL(normalized);
	const segments = url.pathname.replace(/^\//u, "").split("/").filter(Boolean);
	const repository = segments.at(-1);
	const owner = segments.at(-2);
	const provider = url.hostname === "github.com" ? "github" : url.hostname.includes("gitee") ? "gitee" : null;
	if (!provider || !owner || !repository) throw new Error(`暂不支持该 Git 远端：${url.hostname}`);
	return {
		provider,
		owner,
		repository,
		url: `https://${url.hostname}/${owner}/${repository}`
	};
}
function parseCliJson(stdout) {
	const withoutAnsi = stdout.replace(/\u001b\[[0-9;?]*[ -/]*[@-~]/gu, "").trim();
	const start = withoutAnsi.search(/[\[{]/u);
	if (start < 0) throw new Error("Gitee CLI 未返回 JSON");
	return JSON.parse(withoutAnsi.slice(start));
}
async function loadGiteePullRequests(path, config) {
	const result = await execFileAsync$1(resolveCliExecutable(config.executable || "gitee"), [
		"code",
		"pr",
		"list",
		"--states",
		"opened",
		"--states",
		"drafted",
		"--limit",
		"100",
		"--json",
		"--profile",
		config.profile || "osc"
	], {
		cwd: path,
		timeout: 3e4,
		maxBuffer: 16 * 1024 * 1024
	});
	const payload = parseCliJson(result.stdout || result.stderr);
	const record = payload && typeof payload === "object" ? payload : {};
	const items = Array.isArray(record.data) ? record.data : Array.isArray(payload) ? payload : [];
	const meta = record.meta && typeof record.meta === "object" ? record.meta : {};
	const total = Number(meta.total_count);
	return {
		items,
		total: Number.isFinite(total) ? total : items.length,
		truncated: items.length < total
	};
}
function countDiffLines(diff) {
	let additions = 0;
	let deletions = 0;
	for (const line of diff.split("\n")) {
		if (line.startsWith("+") && !line.startsWith("+++")) additions += 1;
		if (line.startsWith("-") && !line.startsWith("---")) deletions += 1;
	}
	return {
		additions,
		deletions
	};
}
function normalizeGiteeFile(value) {
	if (!value || typeof value !== "object") return null;
	const file = value;
	const path = String(file.new_path || file.old_path || "");
	if (!path) return null;
	const counts = countDiffLines(String(file.diff || ""));
	return {
		path,
		previousPath: String(file.old_path || path),
		...counts,
		status: file.new_file === true ? "added" : file.deleted_file === true ? "deleted" : file.renamed_file === true ? "renamed" : "modified",
		diff: String(file.diff || "")
	};
}
async function loadGiteeCommits(path, number, config) {
	try {
		const remote = await git(path, [
			"remote",
			"get-url",
			"origin"
		]);
		const pathname = new URL(remote.replace(/^git@([^:]+):/u, "https://$1/")).pathname.replace(/^\//u, "").replace(/\.git$/u, "");
		const project = encodeURIComponent(pathname);
		const result = await execFileAsync$1(resolveCliExecutable(config.executable || "gitee"), [
			"api",
			"GET",
			`/open/code/api/v8/projects/${project}/merge_requests/${number}/commits`,
			"--profile",
			config.profile || "osc",
			"-o",
			"json"
		], {
			cwd: path,
			timeout: 3e4,
			maxBuffer: 16 * 1024 * 1024
		});
		const payload = parseCliJson(result.stdout || result.stderr);
		if (!Array.isArray(payload)) return null;
		return payload.map((value) => {
			const commit = value && typeof value === "object" ? value : {};
			return {
				sha: String(commit.id || ""),
				title: String(commit.title || commit.message || "").split("\n")[0] || "",
				author: String(commit.author_name || ""),
				committedAt: String(commit.created_at || commit.committed_date || ""),
				url: ""
			};
		});
	} catch {
		return null;
	}
}
async function loadGiteePullRequest(path, number, config) {
	const executable = resolveCliExecutable(config.executable || "gitee");
	const profile = config.profile || "osc";
	const common = {
		cwd: path,
		timeout: 3e4,
		maxBuffer: 32 * 1024 * 1024
	};
	const [detailResult, diffResult, commits] = await Promise.all([
		execFileAsync$1(executable, [
			"code",
			"pr",
			"view",
			String(number),
			"--json",
			"--profile",
			profile
		], common),
		execFileAsync$1(executable, [
			"code",
			"pr",
			"diff",
			String(number),
			"--json",
			"--profile",
			profile
		], common),
		loadGiteeCommits(path, number, config)
	]);
	const detailValue = parseCliJson(detailResult.stdout || detailResult.stderr);
	const detail = detailValue && typeof detailValue === "object" ? detailValue : {};
	const diffValue = parseCliJson(diffResult.stdout || diffResult.stderr);
	const files = (Array.isArray(diffValue) ? diffValue : []).map(normalizeGiteeFile).filter((file) => file !== null);
	const authorValue = detail.author;
	const author = authorValue && typeof authorValue === "object" ? authorValue : {};
	const additions = files.reduce((sum, file) => sum + file.additions, 0);
	const deletions = files.reduce((sum, file) => sum + file.deletions, 0);
	const conflictStatus = normalizeGiteeConflictStatus(detail);
	return {
		number,
		title: String(detail.title || ""),
		description: String(detail.description || ""),
		author: String(author.name || author.user_name || ""),
		sourceBranch: String(detail.source_branch || ""),
		targetBranch: String(detail.target_branch || ""),
		url: String(detail.web_url || detail.html_url || ""),
		updatedAt: String(detail.updated_at || ""),
		commitCount: commits?.length ?? null,
		commits: commits ?? [],
		additions,
		deletions,
		changedFiles: files.length,
		conflictStatus,
		mergeStatus: String(detail.merge_status || detail.detailed_merge_status || ""),
		files
	};
}
async function loadGithubPullRequest(identity, number, config) {
	const base = `https://api.github.com/repos/${encodeURIComponent(identity.owner)}/${encodeURIComponent(identity.repository)}`;
	const [detailValue, filesValue, commitsValue] = await Promise.all([
		requestJson(`${base}/pulls/${number}`, config.githubToken, "github"),
		requestJsonPages(`${base}/pulls/${number}/files?per_page=100`, config.githubToken, "github", 30),
		requestJsonPages(`${base}/pulls/${number}/commits?per_page=100`, config.githubToken, "github", 50)
	]);
	const detail = detailValue && typeof detailValue === "object" ? detailValue : {};
	const authorValue = detail.user;
	const author = authorValue && typeof authorValue === "object" ? authorValue : {};
	const headValue = detail.head;
	const head = headValue && typeof headValue === "object" ? headValue : {};
	const baseValue = detail.base;
	const target = baseValue && typeof baseValue === "object" ? baseValue : {};
	const files = (Array.isArray(filesValue) ? filesValue : []).map((value) => {
		const file = value && typeof value === "object" ? value : {};
		return {
			path: String(file.filename || ""),
			previousPath: String(file.previous_filename || file.filename || ""),
			additions: Number(file.additions || 0),
			deletions: Number(file.deletions || 0),
			status: [
				"added",
				"deleted",
				"renamed"
			].includes(String(file.status)) ? file.status : "modified",
			diff: String(file.patch || "")
		};
	});
	const commits = (Array.isArray(commitsValue) ? commitsValue : []).map((value) => {
		const item = value && typeof value === "object" ? value : {};
		const commitValue = item.commit && typeof item.commit === "object" ? item.commit : {};
		const authorValue = commitValue.author && typeof commitValue.author === "object" ? commitValue.author : {};
		const accountValue = item.author && typeof item.author === "object" ? item.author : {};
		return {
			sha: String(item.sha || ""),
			title: String(commitValue.message || "").split("\n")[0] || "",
			author: String(accountValue.login || authorValue.name || ""),
			committedAt: String(authorValue.date || ""),
			url: String(item.html_url || "")
		};
	});
	const conflictStatus = normalizeGithubConflictStatus(detail);
	return {
		number,
		title: String(detail.title || ""),
		description: String(detail.body || ""),
		author: String(author.login || ""),
		sourceBranch: String(head.ref || ""),
		targetBranch: String(target.ref || ""),
		url: String(detail.html_url || ""),
		updatedAt: String(detail.updated_at || ""),
		commitCount: Number(detail.commits || 0),
		commits,
		additions: Number(detail.additions || 0),
		deletions: Number(detail.deletions || 0),
		changedFiles: Number(detail.changed_files || files.length),
		conflictStatus,
		mergeStatus: String(detail.mergeable_state || ""),
		files
	};
}
async function loadPullRequest(path, number, config) {
	const identity = parseRemote(await git(path, [
		"remote",
		"get-url",
		"origin"
	]));
	return identity.provider === "gitee" ? loadGiteePullRequest(path, number, config) : loadGithubPullRequest(identity, number, config);
}
async function loadCommit(path, sha, config) {
	const remote = await git(path, [
		"remote",
		"get-url",
		"origin"
	]);
	const identity = parseRemote(remote);
	if (identity.provider === "gitee") {
		const pathname = new URL(remote.replace(/^git@([^:]+):/u, "https://$1/")).pathname.replace(/^\//u, "").replace(/\.git$/u, "");
		const project = encodeURIComponent(pathname);
		const result = await execFileAsync$1(resolveCliExecutable(config.executable || "gitee"), [
			"api",
			"GET",
			`/open/code/api/v8/projects/${project}/repository/commits/${encodeURIComponent(sha)}/diff`,
			"--profile",
			config.profile || "osc",
			"-o",
			"json"
		], {
			cwd: path,
			timeout: 3e4,
			maxBuffer: 32 * 1024 * 1024
		});
		const payload = parseCliJson(result.stdout || result.stderr);
		return { files: (Array.isArray(payload) ? payload : []).map(normalizeGiteeFile).filter((file) => file !== null) };
	}
	const value = await requestJson(`https://api.github.com/repos/${encodeURIComponent(identity.owner)}/${encodeURIComponent(identity.repository)}/commits/${encodeURIComponent(sha)}`, config.githubToken, "github");
	const record = value && typeof value === "object" ? value : {};
	return { files: (Array.isArray(record.files) ? record.files : []).map((value) => {
		const file = value && typeof value === "object" ? value : {};
		return {
			path: String(file.filename || ""),
			previousPath: String(file.previous_filename || file.filename || ""),
			additions: Number(file.additions || 0),
			deletions: Number(file.deletions || 0),
			status: [
				"added",
				"deleted",
				"renamed"
			].includes(String(file.status)) ? file.status : "modified",
			diff: String(file.patch || "")
		};
	}) };
}
async function git(cwd, args) {
	return (await execFileAsync$1("git", [
		"-C",
		cwd,
		...args
	], {
		timeout: 3e4,
		maxBuffer: 16 * 1024 * 1024
	})).stdout.trim();
}
async function gitExit(cwd, args) {
	try {
		return {
			ok: true,
			output: await git(cwd, args)
		};
	} catch (error) {
		const value = error;
		return {
			ok: false,
			output: String(value.stdout || value.stderr || "").trim()
		};
	}
}
function requireBranchName(value, label) {
	if (!value || value.startsWith("-") || value.length > 255) throw new ClientInputError(`${label}无效`);
	return value;
}
async function canonicalRepository(path, config) {
	const resolved = await validateRepositoryPath(path, config);
	const root = await realpath(await git(resolved, ["rev-parse", "--show-toplevel"]));
	if (root !== resolved) throw new ClientInputError("请选择 Git 仓库根目录，不能使用仓库子目录");
	return root;
}
async function readJsonBody(request) {
	if (String(request.headers["content-type"] || "").split(";", 1)[0]?.trim().toLowerCase() !== "application/json") throw new ClientInputError("Content-Type 必须为 application/json");
	const chunks = [];
	let size = 0;
	await new Promise((resolve, reject) => {
		request.on("data", (chunk) => {
			size += chunk.byteLength;
			if (size > 64 * 1024) reject(new ClientInputError("请求体过大"));
			else chunks.push(chunk);
		});
		request.on("end", () => resolve());
		request.on("error", (error) => reject(error || /* @__PURE__ */ new Error("请求读取失败")));
	});
	try {
		const value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
		if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
		return value;
	} catch (error) {
		if (error instanceof ClientInputError) throw error;
		throw new ClientInputError("请求体必须是 JSON 对象");
	}
}
function assertMutationRequest(request) {
	if (request.method !== "POST") throw new ClientInputError("Method not allowed");
	if (request.headers["x-pr-assistant-action"] !== "1") throw new ClientInputError("缺少操作确认标头");
	const site = request.headers["sec-fetch-site"];
	if (site && site !== "same-origin" && site !== "none") throw new ClientInputError("拒绝跨站请求");
	const origin = request.headers.origin;
	const host = request.headers.host;
	if (origin && host && new URL(String(origin)).host !== String(host)) throw new ClientInputError("拒绝跨站请求");
}
async function branchSha(path, branch) {
	requireBranchName(branch, "分支名");
	if (!(await gitExit(path, [
		"check-ref-format",
		"--branch",
		branch
	])).ok) throw new ClientInputError("PR 分支名无效");
	return git(path, [
		"rev-parse",
		"--verify",
		`refs/remotes/origin/${branch}^{commit}`
	]);
}
async function refreshBranches(path, sourceBranch, targetBranch) {
	requireBranchName(sourceBranch, "源分支");
	requireBranchName(targetBranch, "目标分支");
	for (const branch of new Set([sourceBranch, targetBranch])) if (!(await gitExit(path, [
		"check-ref-format",
		"--branch",
		branch
	])).ok) throw new ClientInputError(`PR 分支名无效：${branch}`);
	await git(path, [
		"fetch",
		"--no-tags",
		"origin",
		`+refs/heads/${sourceBranch}:refs/remotes/origin/${sourceBranch}`,
		`+refs/heads/${targetBranch}:refs/remotes/origin/${targetBranch}`
	]);
	return {
		sourceSha: await branchSha(path, sourceBranch),
		targetSha: await branchSha(path, targetBranch)
	};
}
async function requestJson(url, token, provider) {
	const headers = {
		accept: "application/json",
		"user-agent": "dsh-pr-assistant"
	};
	if (token) headers.authorization = provider === "github" ? `Bearer ${token}` : `token ${token}`;
	const response = await fetch(url, {
		headers,
		signal: AbortSignal.timeout(15e3)
	});
	const body = await response.json();
	if (!response.ok) {
		const message = body && typeof body === "object" && "message" in body ? String(body.message) : `HTTP ${response.status}`;
		throw new Error(message);
	}
	return body;
}
async function requestJsonPages(endpoint, token, provider, maxPages) {
	const items = [];
	for (let page = 1; page <= maxPages; page += 1) {
		const body = await requestJson(`${endpoint}${endpoint.includes("?") ? "&" : "?"}page=${page}`, token, provider);
		if (!Array.isArray(body)) throw new Error("代码平台返回了无法识别的分页数据");
		items.push(...body);
		if (body.length < 100) break;
	}
	return items;
}
async function validateRepositoryPath(path, config) {
	if (!isAbsolute(path)) throw new ClientInputError("仓库路径必须是绝对路径");
	const resolved = await realpath(path);
	if (!config.allowedRoots?.length) return resolved;
	if (!(await Promise.all(config.allowedRoots.map((root) => realpath(root)))).some((root) => {
		const child = relative(root, resolved);
		return child === "" || !child.startsWith("..") && !isAbsolute(child);
	})) throw new ClientInputError("仓库路径不在 allowedRoots 允许范围内");
	return resolved;
}
async function loadPullRequests(endpoint, token, provider) {
	const items = [];
	for (let page = 1; page <= 50; page += 1) {
		const body = await requestJson(`${endpoint}${endpoint.includes("?") ? "&" : "?"}page=${page}`, token, provider);
		if (!Array.isArray(body)) throw new Error("代码平台返回了无法识别的 PR 数据");
		items.push(...body);
		if (body.length < 100) return {
			items,
			truncated: false
		};
	}
	return {
		items,
		truncated: true
	};
}
async function loadRepository(path, config) {
	const [root, remote] = await Promise.all([git(path, ["rev-parse", "--show-toplevel"]), git(path, [
		"remote",
		"get-url",
		"origin"
	])]);
	const identity = parseRemote(remote);
	const loaded = identity.provider === "gitee" ? await loadGiteePullRequests(path, config) : await loadPullRequests(`https://api.github.com/repos/${encodeURIComponent(identity.owner)}/${encodeURIComponent(identity.repository)}/pulls?state=open&per_page=100`, config.githubToken, identity.provider).then((result) => ({
		...result,
		total: result.items.length
	}));
	const { items, truncated } = loaded;
	return {
		...identity,
		root,
		openCount: loaded.total,
		truncated,
		pullRequests: items.map((value) => {
			const item = value && typeof value === "object" ? value : {};
			const authorValue = item.user ?? item.author;
			const author = authorValue && typeof authorValue === "object" ? authorValue : {};
			const headValue = item.head;
			const head = headValue && typeof headValue === "object" ? headValue : {};
			const baseValue = item.base;
			const base = baseValue && typeof baseValue === "object" ? baseValue : {};
			return {
				number: Number(item.number || item.iid || item.id || 0),
				title: String(item.title ?? ""),
				author: String(author.login ?? author.name ?? ""),
				updatedAt: String(item.updated_at ?? ""),
				url: String(item.html_url || item.web_url || item.url || ""),
				draft: item.draft === true || item.state === "drafted",
				conflictStatus: identity.provider === "gitee" ? normalizeGiteeConflictStatus(item) : "unknown",
				sourceBranch: String(item.source_branch || head.ref || ""),
				targetBranch: String(item.target_branch || base.ref || "")
			};
		})
	};
}
async function publishReviewComment(path, number, body, config) {
	const identity = parseRemote(await git(path, [
		"remote",
		"get-url",
		"origin"
	]));
	await loadPullRequest(path, number, config);
	if (identity.provider === "gitee") {
		const result = await execFileAsync$1(resolveCliExecutable(config.executable || "gitee"), [
			"code",
			"pr",
			"comment",
			String(number),
			"--body",
			body,
			"--repo",
			`${identity.owner}/${identity.repository}`,
			"--profile",
			config.profile || "osc"
		], {
			cwd: path,
			timeout: 3e4,
			maxBuffer: 4 * 1024 * 1024
		});
		return {
			provider: identity.provider,
			output: String(result.stdout || result.stderr).trim()
		};
	}
	if (!config.githubToken) throw new ClientInputError("GitHub PR 评论需要配置 githubToken，当前无法授权发布");
	const endpoint = `https://api.github.com/repos/${encodeURIComponent(identity.owner)}/${encodeURIComponent(identity.repository)}/issues/${number}/comments`;
	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			accept: "application/vnd.github+json",
			authorization: `Bearer ${config.githubToken}`,
			"content-type": "application/json",
			"user-agent": "dsh-pr-assistant",
			"x-github-api-version": "2022-11-28"
		},
		body: JSON.stringify({ body }),
		signal: AbortSignal.timeout(15e3)
	});
	const value = await response.json();
	if (!response.ok) {
		if (response.status === 401 || response.status === 403) throw new ClientInputError("GitHub 评论无法授权：githubToken 无效或缺少 Issues/Pull requests 评论写权限");
		throw new ClientInputError(`GitHub 评论发布失败：${String(value.message || `HTTP ${response.status}`)}`);
	}
	return {
		provider: identity.provider,
		url: String(value.html_url || "")
	};
}
async function conflictStatus(operation) {
	const currentBranch = await git(operation.path, ["branch", "--show-current"]);
	const headSha = await git(operation.path, ["rev-parse", "HEAD"]);
	const porcelain = await git(operation.path, ["status", "--porcelain=v1"]);
	const unresolved = (await gitExit(operation.path, [
		"diff",
		"--name-only",
		"--diff-filter=U"
	])).output.split("\n").filter(Boolean);
	const sourceAncestor = (await gitExit(operation.path, [
		"merge-base",
		"--is-ancestor",
		operation.sourceSha,
		headSha
	])).ok;
	const targetMerged = (await gitExit(operation.path, [
		"merge-base",
		"--is-ancestor",
		operation.targetSha,
		headSha
	])).ok;
	const changed = await git(operation.path, [
		"diff",
		"--name-status",
		`${operation.sourceSha}..${headSha}`
	]);
	const diff = await git(operation.path, [
		"diff",
		"--no-ext-diff",
		"--unified=3",
		`${operation.sourceSha}..${headSha}`
	]);
	const commits = await git(operation.path, [
		"log",
		"--format=%H%x09%s",
		`${operation.sourceSha}..${headSha}`
	]);
	const clean = porcelain === "";
	const hasCommit = headSha !== operation.sourceSha && sourceAncestor;
	const pushReady = currentBranch === operation.sourceBranch && clean && unresolved.length === 0 && hasCommit && targetMerged;
	return {
		operationId: operation.id,
		number: operation.number,
		sourceBranch: operation.sourceBranch,
		targetBranch: operation.targetBranch,
		sourceSha: operation.sourceSha,
		targetSha: operation.targetSha,
		currentBranch,
		headSha,
		clean,
		unresolved,
		sourceAncestor,
		targetMerged,
		hasCommit,
		pushReady,
		changedFiles: changed ? changed.split("\n").map((line) => {
			const [status, ...parts] = line.split("	");
			return {
				status,
				path: parts.at(-1) || ""
			};
		}) : [],
		commits: commits ? commits.split("\n").map((line) => {
			const [sha, ...title] = line.split("	");
			return {
				sha,
				title: title.join("	")
			};
		}) : [],
		diff: diff.slice(0, 512 * 1024),
		diffTruncated: diff.length > 512 * 1024
	};
}
function registerPrAssistant(ctx, config = {}) {
	const webServer = ctx.get("webServer");
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: ROUTE$1,
		async handler(request, response) {
			if (request.method !== "GET") return sendJson$1(response, 405, { error: "Method not allowed" });
			const requestedPath = new URL(request.url ?? ROUTE$1, "http://localhost").searchParams.get("path")?.trim();
			if (!requestedPath) return sendJson$1(response, 400, { error: "缺少仓库路径" });
			try {
				sendJson$1(response, 200, await loadRepository(await validateRepositoryPath(requestedPath, config), config));
			} catch (error) {
				sendJson$1(response, error instanceof ClientInputError ? 400 : 502, { error: error instanceof Error ? error.message : "PR 读取失败" });
			}
		}
	}), "pr-assistant: repository route");
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: DETAIL_ROUTE,
		async handler(request, response) {
			if (request.method !== "GET") return sendJson$1(response, 405, { error: "Method not allowed" });
			const url = new URL(request.url ?? DETAIL_ROUTE, "http://localhost");
			const requestedPath = url.searchParams.get("path")?.trim();
			const number = Number(url.searchParams.get("number"));
			if (!requestedPath || !Number.isInteger(number) || number <= 0) return sendJson$1(response, 400, { error: "无效的 PR 详情请求" });
			try {
				sendJson$1(response, 200, await loadPullRequest(await validateRepositoryPath(requestedPath, config), number, config));
			} catch (error) {
				sendJson$1(response, error instanceof ClientInputError ? 400 : 502, { error: error instanceof Error ? error.message : "PR 详情读取失败" });
			}
		}
	}), "pr-assistant: pull request detail route");
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: COMMIT_ROUTE,
		async handler(request, response) {
			if (request.method !== "GET") return sendJson$1(response, 405, { error: "Method not allowed" });
			const url = new URL(request.url ?? COMMIT_ROUTE, "http://localhost");
			const requestedPath = url.searchParams.get("path")?.trim();
			const sha = url.searchParams.get("sha")?.trim();
			if (!requestedPath || !sha || !/^[a-f0-9]{7,64}$/iu.test(sha)) return sendJson$1(response, 400, { error: "无效的提交详情请求" });
			try {
				sendJson$1(response, 200, await loadCommit(await validateRepositoryPath(requestedPath, config), sha, config));
			} catch (error) {
				sendJson$1(response, error instanceof ClientInputError ? 400 : 502, { error: error instanceof Error ? error.message : "提交详情读取失败" });
			}
		}
	}), "pr-assistant: commit detail route");
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: REVIEW_COMMENT_ROUTE,
		async handler(request, response) {
			try {
				assertMutationRequest(request);
				const body = await readJsonBody(request);
				const requestedPath = typeof body.path === "string" ? body.path.trim() : "";
				const number = Number(body.number);
				const comment = typeof body.body === "string" ? body.body.trim() : "";
				if (!requestedPath || !Number.isInteger(number) || number <= 0) throw new ClientInputError("无效的 PR 评论请求");
				if (!comment) throw new ClientInputError("评论正文不能为空");
				if (comment.length > MAX_REVIEW_COMMENT_LENGTH) throw new ClientInputError(`评论正文不能超过 ${MAX_REVIEW_COMMENT_LENGTH} 个字符`);
				sendJson$1(response, 200, {
					published: true,
					...await publishReviewComment(await canonicalRepository(requestedPath, config), number, comment, config)
				});
			} catch (error) {
				sendJson$1(response, error instanceof ClientInputError ? 400 : 502, { error: error instanceof Error ? error.message : "PR 评论发布失败" });
			}
		}
	}), "pr-assistant: review comment route");
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: CONFLICT_PREFLIGHT_ROUTE,
		async handler(request, response) {
			try {
				assertMutationRequest(request);
				const body = await readJsonBody(request);
				const requestedPath = typeof body.path === "string" ? body.path.trim() : "";
				const number = Number(body.number);
				if (!requestedPath || !Number.isInteger(number) || number <= 0) throw new ClientInputError("无效的冲突处理请求");
				const path = await canonicalRepository(requestedPath, config);
				const detail = await loadPullRequest(path, number, config);
				if (detail.conflictStatus !== "conflicting") throw new ClientInputError("该 PR 当前未确认存在冲突");
				const sourceBranch = requireBranchName(detail.sourceBranch, "源分支");
				const targetBranch = requireBranchName(detail.targetBranch, "目标分支");
				if (await git(path, ["status", "--porcelain=v1"])) throw new ClientInputError("工作区存在未提交修改，请先提交或暂存后再处理冲突");
				const { sourceSha, targetSha } = await refreshBranches(path, sourceBranch, targetBranch);
				let currentBranch = await git(path, ["branch", "--show-current"]);
				if (currentBranch !== sourceBranch) {
					await git(path, (await gitExit(path, [
						"show-ref",
						"--verify",
						"--quiet",
						`refs/heads/${sourceBranch}`
					])).ok ? ["switch", sourceBranch] : [
						"switch",
						"--track",
						"-c",
						sourceBranch,
						`origin/${sourceBranch}`
					]);
					currentBranch = await git(path, ["branch", "--show-current"]);
				}
				if (await git(path, ["rev-parse", "HEAD"]) !== sourceSha) throw new ClientInputError("本地源分支与远端不一致，请先同步后重试");
				const operation = {
					id: randomUUID(),
					path,
					number,
					sourceBranch,
					targetBranch,
					sourceSha,
					targetSha,
					createdAt: Date.now()
				};
				conflictOperations.set(operation.id, operation);
				sendJson$1(response, 200, {
					operationId: operation.id,
					path,
					number,
					sourceBranch,
					targetBranch,
					sourceSha,
					targetSha,
					currentBranch
				});
			} catch (error) {
				sendJson$1(response, error instanceof ClientInputError ? 400 : 502, { error: error instanceof Error ? error.message : "冲突处理预检失败" });
			}
		}
	}), "pr-assistant: conflict preflight route");
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: CONFLICT_STATUS_ROUTE,
		async handler(request, response) {
			if (request.method !== "GET") return sendJson$1(response, 405, { error: "Method not allowed" });
			const id = new URL(request.url ?? CONFLICT_STATUS_ROUTE, "http://localhost").searchParams.get("operationId")?.trim();
			const operation = id ? conflictOperations.get(id) : void 0;
			if (!operation || Date.now() - operation.createdAt > 1440 * 60 * 1e3) return sendJson$1(response, 404, { error: "冲突处理记录不存在或已过期" });
			try {
				sendJson$1(response, 200, await conflictStatus(operation));
			} catch (error) {
				sendJson$1(response, 502, { error: error instanceof Error ? error.message : "冲突处理状态读取失败" });
			}
		}
	}), "pr-assistant: conflict status route");
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: CONFLICT_PUSH_ROUTE,
		async handler(request, response) {
			try {
				assertMutationRequest(request);
				const body = await readJsonBody(request);
				const id = typeof body.operationId === "string" ? body.operationId : "";
				const expectedHead = typeof body.expectedHead === "string" ? body.expectedHead : "";
				if (!/^[a-f0-9]{40,64}$/iu.test(expectedHead)) throw new ClientInputError("无效的提交版本");
				const operation = conflictOperations.get(id);
				if (!operation || Date.now() - operation.createdAt > 1440 * 60 * 1e3) throw new ClientInputError("冲突处理记录不存在或已过期");
				const status = await conflictStatus(operation);
				if (!status.pushReady || status.headSha !== expectedHead) throw new ClientInputError("仓库状态已变化，当前结果不允许推送");
				await git(operation.path, [
					"fetch",
					"--no-tags",
					"origin",
					`+refs/heads/${operation.sourceBranch}:refs/remotes/origin/${operation.sourceBranch}`
				]);
				if (await branchSha(operation.path, operation.sourceBranch) !== operation.sourceSha) throw new ClientInputError("远端源分支已更新，请重新开始冲突处理");
				await git(operation.path, [
					"push",
					"origin",
					`HEAD:refs/heads/${operation.sourceBranch}`
				]);
				sendJson$1(response, 200, {
					pushed: true,
					sha: await git(operation.path, ["rev-parse", "HEAD"]),
					sourceBranch: operation.sourceBranch
				});
			} catch (error) {
				sendJson$1(response, error instanceof ClientInputError ? 400 : 502, { error: error instanceof Error ? error.message : "推送失败" });
			}
		}
	}), "pr-assistant: conflict push route");
}
//#endregion
//#region src/worktime-model.ts
/** A Task may cover several ranges even though its record belongs to the first. */
function unitHasCreatedTasks(unit, units) {
	return units.some((owner) => owner.itemKey === unit.itemKey && owner.tasks.some((task) => task.status === "created" && task.start <= unit.end && task.end >= unit.start));
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
/**
* Allocate person-days across one requirement's ordered dates. Half days are the
* smallest unit, so two stages may share a date; a plan may leave time
* unallocated but may never exceed the planned total.
*/
function allocateGroupTasks(dates, tasks, existing = [], contextDates = dates) {
	if (!dates.length) throw new Error("请先选择需求的日期");
	if (!tasks.length || tasks.length > 20) throw new Error("请填写至少一个阶段的人天");
	const slots = availableWorktimeSlots(dates, existing, contextDates);
	if (!slots.length) throw new Error("该时间段已创建 Task，当前没有剩余人天，请延长时间段后再安排");
	let spent = 0;
	const result = tasks.map((task) => {
		if (![
			"understand",
			"design",
			"develop",
			"verify",
			"bugfix"
		].includes(task.stage) || !task.title.trim() || task.title.length > 240 || !Number.isFinite(task.days) || task.days <= 0) throw new Error("任务标题或人天无效");
		if (task.days < .499999999) throw new Error("每个阶段至少 0.5 人天");
		if (Math.abs(task.days * 2 - Math.round(task.days * 2)) > 1e-9) throw new Error("每个阶段需按 0.5 人天递增");
		const first = Math.round(spent * 2);
		spent += task.days;
		const last = Math.round(spent * 2) - 1;
		return {
			...task,
			title: task.title.trim(),
			start: slots[first] ?? "",
			end: slots[last] ?? "",
			allocationSlots: slots.slice(first, last + 1),
			status: "pending"
		};
	});
	if (spent > slots.length / 2 + 1e-6) throw new Error(`阶段合计不能大于剩余 ${slots.length / 2} 人天，当前为 ${Number(spent.toFixed(4))} 人天`);
	return result;
}
//#endregion
//#region src/task-bugs.ts
const record$1 = (value) => value && typeof value === "object" && !Array.isArray(value) ? value : {};
const text$1 = (value) => typeof value === "string" ? value : value && typeof value === "object" ? text$1(record$1(value).name) : "";
const array = (value) => Array.isArray(value) ? value : [];
const keyPattern$1 = /^[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-\d+$/u;
const bugTypes = [
	"Bug",
	"测试缺陷",
	"线上Bug",
	"升级问题"
];
const bugFilter = `类型 in ${JSON.stringify(bugTypes)}`;
const isBug = (row) => bugTypes.includes(text$1(row.itemType)) || bugTypes.includes(text$1(record$1(row.itemType).key));
const bug = (row) => ({
	itemKey: text$1(row.key),
	title: text$1(row.name),
	status: text$1(row.status)
});
/** All reads and writes use native Team data; no local relationship cache. */
function createTaskBugService(run, config) {
	const names = config.bugLinkNames?.length ? config.bugLinkNames : ["relates to", "relates to2"];
	const countCache = /* @__PURE__ */ new Map();
	const countReads = /* @__PURE__ */ new Map();
	function rememberCount(itemKey, count) {
		if (countCache.size >= 500 && !countCache.has(itemKey)) countCache.delete(countCache.keys().next().value);
		countCache.set(itemKey, {
			count,
			expires: Date.now() + 3e4
		});
	}
	async function task(itemKey) {
		if (!keyPattern$1.test(itemKey)) throw new Error("无效的 Task 编号");
		const value = record$1(await run([
			"team",
			"item",
			"view",
			itemKey
		]));
		if (text$1(value.itemType) !== "Task") throw new Error("请选择 Task");
		if (!text$1(value.objectId)) throw new Error("Task 缺少事项标识");
		return value;
	}
	async function search(iql) {
		const items = /* @__PURE__ */ new Map();
		for (let page = 1; page <= 20; page++) {
			const payload = record$1(await run([
				"team",
				"item",
				"search",
				"--iql",
				`${bugFilter} and (${iql})`,
				"--fields",
				"key,name,status,itemType",
				"--size",
				"50",
				"--page",
				String(page)
			]));
			if (!Array.isArray(payload.items)) throw new Error("番茄返回的缺陷列表格式异常");
			for (const row of payload.items.map(record$1).filter(isBug)) {
				const value = bug(row);
				if (keyPattern$1.test(value.itemKey)) items.set(value.itemKey, value);
			}
			if (payload.items.length < 50 || Number(payload.nextPageIndex) === -1 || Number.isFinite(Number(payload.count)) && page * 50 >= Number(payload.count)) return [...items.values()];
		}
		throw new Error("缺陷超过 1000 条，请在番茄中缩小范围");
	}
	function linkedQuery(item) {
		return names.map((name) => `item in linkedItemsOf(${JSON.stringify(`id = ${text$1(item.objectId)}`)}, ${JSON.stringify(name)})`).join(" or ");
	}
	async function count(itemKey) {
		const cached = countCache.get(itemKey);
		if (cached && cached.expires > Date.now()) return cached.count;
		const pending = countReads.get(itemKey);
		if (pending) return pending;
		const snapshot = countCache.get(itemKey);
		const read = (async () => {
			const payload = record$1(await run([
				"team",
				"item",
				"search",
				"--iql",
				`${bugFilter} and (${linkedQuery(await task(itemKey))})`,
				"--size",
				"1",
				"--fields",
				"key"
			]));
			const value = Number(payload.count);
			if (payload.count == null || !Number.isSafeInteger(value) || value < 0) throw new Error("番茄返回的关联 Bug 数量异常");
			const newer = countCache.get(itemKey);
			if (newer && newer !== snapshot) return newer.count;
			rememberCount(itemKey, value);
			return value;
		})();
		countReads.set(itemKey, read);
		try {
			return await read;
		} finally {
			if (countReads.get(itemKey) === read) countReads.delete(itemKey);
		}
	}
	return {
		async counts(itemKeys) {
			if (!Array.isArray(itemKeys) || itemKeys.length > 100 || itemKeys.some((key) => typeof key !== "string" || !keyPattern$1.test(key))) throw new Error("无效的 Task 编号列表（最多 100 个）");
			const keys = [...new Set(itemKeys)];
			const counts = {};
			const failed = [];
			let index = 0;
			await Promise.all(Array.from({ length: Math.min(3, keys.length) }, async () => {
				while (index < keys.length) {
					const key = keys[index++];
					try {
						counts[key] = await count(key);
					} catch {
						failed.push(key);
					}
				}
			}));
			return {
				counts,
				failed
			};
		},
		async load(itemKey, query = "") {
			const value = await task(itemKey);
			if (query) {
				if (query.length > 120) throw new Error("搜索内容不能超过 120 字");
				if (keyPattern$1.test(query)) {
					const target = record$1(await run([
						"team",
						"item",
						"view",
						query
					]));
					return { items: isBug(target) ? [bug(target)] : [] };
				}
				return { items: await search(`标题 ~ ${JSON.stringify(query)}`) };
			}
			const ancestor = record$1(value.ancestor);
			const parent = text$1(ancestor.objectId) ? {
				itemKey: text$1(ancestor.key),
				title: text$1(ancestor.name)
			} : null;
			const [linked, suggested] = await Promise.all([search(linkedQuery(value)), parent ? search(`ancestors in ${JSON.stringify([text$1(ancestor.objectId)])}`) : Promise.resolve([])]);
			rememberCount(itemKey, linked.length);
			return {
				linked,
				suggested,
				parent,
				canLink: Boolean(config.bugLinkTypeId)
			};
		},
		async link(itemKey, bugKey) {
			if (!config.bugLinkTypeId) throw new Error("尚未配置番茄事项关联类型");
			if (!keyPattern$1.test(bugKey)) throw new Error("无效的 Bug 编号");
			const [source, target, user] = await Promise.all([
				task(itemKey),
				run([
					"team",
					"item",
					"view",
					bugKey
				]).then(record$1),
				run([
					"team",
					"user",
					"current"
				]).then(record$1)
			]);
			if (!array(record$1(source.values).assignee).map(record$1).some((owner) => text$1(user.userId) && text$1(owner.objectId ?? owner.value) === text$1(user.userId) || text$1(user.username) && text$1(owner.username) === text$1(user.username))) throw new Error("只能关联自己负责的 Task");
			if (!isBug(target) || !text$1(target.objectId)) throw new Error("请选择有效的缺陷事项");
			const existing = await search(linkedQuery(source));
			if (existing.some((item) => item.itemKey === bugKey)) {
				rememberCount(itemKey, existing.length);
				return {
					bug: bug(target),
					count: existing.length
				};
			}
			await run([
				"team",
				"item",
				"edit",
				itemKey,
				"--values",
				JSON.stringify({ Relations: { links: [{
					linkType: config.bugLinkTypeId,
					destinationItems: [text$1(target.objectId)]
				}] } })
			]);
			rememberCount(itemKey, existing.length + 1);
			return {
				bug: bug(target),
				count: existing.length + 1
			};
		}
	};
}
//#endregion
//#region src/worktime.ts
const keyPattern = /^[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-\d+$/u;
const record = (value) => value && typeof value === "object" && !Array.isArray(value) ? value : {};
const text = (value) => typeof value === "string" ? value : Array.isArray(value) ? text(value[0]) : value && typeof value === "object" ? text(record(value).name ?? record(value).label ?? record(value).value) : "";
const list = (value) => Array.isArray(value) ? value : [];
const fieldValues = (raw) => record(record(raw).values ?? record(raw).value);
const localDate = (value) => {
	if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/u.test(value)) return value.slice(0, 10);
	if (typeof value !== "number") return "";
	return new Date(value + 8 * 36e5).toISOString().slice(0, 10);
};
const timestamp = (value) => Date.parse(`${value}T00:00:00+08:00`);
function freezeAllocations(store, itemKey) {
	const group = [...store.units, ...store.archivedUnits ?? []].filter((unit) => unit.itemKey === itemKey);
	for (const [task, slots] of plannedTaskSlots(unitDates(group), group.flatMap((unit) => unit.tasks))) task.allocationSlots = slots;
}
async function body(request) {
	if (!request[Symbol.asyncIterator]) throw new Error("请求不支持 JSON 正文");
	let value = "";
	for await (const chunk of request) {
		value += typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf8");
		if (Buffer.byteLength(value) > 64 * 1024) throw new Error("请求内容过大");
	}
	return record(JSON.parse(value));
}
function validateUnit(value) {
	if (typeof value.id !== "string" || !/^[a-zA-Z0-9-]{8,80}$/u.test(value.id) || typeof value.itemKey !== "string" || !keyPattern.test(value.itemKey) || typeof value.start !== "string" || typeof value.end !== "string") throw new Error("无效的需求或日期安排");
	datesBetween(value.start, value.end);
	return {
		id: value.id,
		itemKey: value.itemKey,
		title: "",
		workspace: "",
		start: value.start,
		end: value.end
	};
}
async function storyContext(run, itemKey) {
	if (!keyPattern.test(itemKey)) throw new Error("无效的需求编号");
	const story = record(await run([
		"team",
		"item",
		"view",
		itemKey
	]));
	if (![
		"Story",
		"EnablerStory",
		"Bug",
		"测试缺陷",
		"线上Bug",
		"升级问题"
	].includes(text(story.itemType))) throw new Error("请选择故事或缺陷需求");
	const workspace = text(record(story.workspace).key);
	const fields = fieldValues(story);
	const project = text(fields.view_project);
	if (!workspace || !project) throw new Error("需求缺少所属空间或所属项目，请先在番茄中补全");
	const assignees = list(fields.assignee).map(record);
	if (!assignees.length || assignees.some((user) => !text(user.objectId))) throw new Error("需求未设置有效负责人，请先在番茄中补全");
	return {
		story,
		fields,
		workspace,
		project,
		assignees
	};
}
async function metadata(run, itemKey) {
	const context = await storyContext(run, itemKey);
	const { project, workspace, assignees, fields } = context;
	const definitions = list(await run([
		"team",
		"field",
		"workspace",
		"--workspace",
		workspace,
		"--item-type",
		"Task",
		"--fields",
		"data,property"
	])).map(record);
	if (!definitions.length) throw new Error("无法读取 Task 创建字段");
	const options = (key) => {
		const field = definitions.find((field) => field.key === key);
		return list(record(field?.data).customData ?? record(field?.schema).options).map(record).map((option) => ({
			label: text(option.label),
			value: text(option.value)
		}));
	};
	const recentValues = list(record(await run([
		"team",
		"item",
		"search",
		"--iql",
		`所属空间 = ${JSON.stringify(text(record(context.story.workspace).name))} and 类型 = Task and view_project = ${JSON.stringify(project)} order by 创建时间 desc`,
		"--size",
		"10",
		"--fields",
		"key,Dropdown2,suoshutuandui"
	])).items).map(fieldValues);
	const unanimous = (key) => {
		const values = [...new Set(recentValues.map((value) => text(value[key])).filter(Boolean))];
		return values.length === 1 ? values[0] : "";
	};
	const range = list(record(definitions.find((field) => field.key === "ActualFinishTime")?.property).range).map(localDate).filter(Boolean);
	return {
		context,
		definitions,
		options,
		data: {
			project,
			assignee: assignees.map((user) => text(user.objectId)).join(","),
			assigneeName: assignees.map((user) => text(user.label ?? user.username ?? user.objectId)).join("、"),
			teams: options("suoshutuandui").map((option) => option.label),
			costs: options("Dropdown2").map((option) => option.label),
			categories: options("Dropdown_task").map((option) => option.label).filter((value) => [
				"软件开发",
				"修复BUG",
				"bug修复",
				"Bug修复"
			].includes(value)),
			suggestedTeam: text(fields.suoshutuandui) || unanimous("suoshutuandui"),
			suggestedCost: text(fields.Dropdown2) || unanimous("Dropdown2"),
			suggestionSource: recentValues.length ? "继承需求字段；空值参考同项目近期 Task 的一致取值，请核对" : "继承需求字段；缺失项请手动选择",
			actualRange: range.length === 2 ? range : null
		}
	};
}
/** Gitee Team user fields take label/nickname/username/value objects, never LeanCloud pointers. */
function userValue(user) {
	const nickname = text(user.nickname);
	const username = text(user.username);
	const label = text(user.label) || (nickname && username ? `${nickname}(${username})` : username || nickname);
	return Object.fromEntries([
		["label", label],
		["nickname", nickname],
		["username", username],
		["value", text(user.objectId)]
	].filter(([, value]) => value !== ""));
}
/** One requirement is one plan, so touching or overlapping ranges merge into one unit. */
function mergeRanges(store, itemKey) {
	const original = new Map(store.units.map((unit) => [unit.id, unit]));
	store.units = mergeRequirementRanges(store.units, itemKey, true).map((unit) => original.get(unit.id) === unit ? unit : {
		...unit,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	return store.units.find((unit) => unit.itemKey === itemKey);
}
/** The unit that now owns a date the caller used to address. */
function survivor(store, itemKey, day) {
	return store.units.find((unit) => unit.itemKey === itemKey && unit.start <= day && day <= unit.end) ?? store.units.find((unit) => unit.itemKey === itemKey);
}
/** Register durable planning and verified task-creation routes within the workboard. */
function registerWorktime(ctx, deps) {
	const hash = createHash("sha256").update(deps.scope).digest("hex").slice(0, 16);
	const file = deps.dataFile || join(process.env.DSH_HOME || join(homedir(), ".dsh"), "tomato-worktime", `${hash}.json`);
	const load = async () => {
		let raw;
		try {
			raw = await readFile(file, "utf8");
		} catch (error) {
			if (error.code === "ENOENT") return {
				version: 1,
				units: []
			};
			throw error;
		}
		const value = JSON.parse(raw);
		if (value.version !== 1 || !Array.isArray(value.units) || value.archivedUnits !== void 0 && !Array.isArray(value.archivedUnits)) throw new Error("历史工时数据格式异常，已保留原文件");
		return value;
	};
	const save = async (store) => {
		await mkdir(dirname(file), {
			recursive: true,
			mode: 448
		});
		const temp = `${file}.${randomUUID()}.tmp`;
		await writeFile(temp, JSON.stringify(store, null, 2) + "\n", {
			mode: 384,
			flag: "wx"
		});
		await rename(temp, file);
	};
	let queue = Promise.resolve();
	const serial = (fn) => {
		const next = queue.then(async () => {
			await mkdir(dirname(file), {
				recursive: true,
				mode: 448
			});
			let lock;
			try {
				lock = await open(`${file}.lock`, "wx", 384);
			} catch (error) {
				if (error.code === "EEXIST") throw new Error("工时记录正在由其他工作台修改，请稍后刷新；异常退出遗留锁需先核对创建结果");
				throw error;
			}
			try {
				return await fn();
			} finally {
				await lock.close();
				await unlink(`${file}.lock`);
			}
		});
		queue = next.catch(() => void 0);
		return next;
	};
	const route = (path, method, action) => {
		ctx.effect(() => deps.server.register({
			kind: "exact",
			path,
			async handler(request, response) {
				const send = (status, value) => {
					response.statusCode = status;
					response.setHeader("content-type", "application/json; charset=utf-8");
					response.setHeader("cache-control", "no-store");
					response.end(JSON.stringify(value));
				};
				if (request.method !== method) return send(405, { error: "Method not allowed" });
				if (method !== "GET" && deps.crossSite(request)) return send(403, { error: "拒绝跨站修改请求" });
				try {
					send(200, await action(request, new URL(request.url ?? path, "http://localhost").searchParams));
				} catch (error) {
					send(400, { error: error instanceof Error ? error.message : "工时操作失败" });
				}
			}
		}), `tomato-board: ${path}`);
	};
	const taskBugs = createTaskBugService(deps.run, deps);
	route("/api/tomato-board/worktime/task-bug-counts", "POST", async (request) => {
		const input = await body(request);
		if (!Array.isArray(input.itemKeys)) throw new Error("缺少 Task 编号列表");
		return taskBugs.counts(input.itemKeys);
	});
	route("/api/tomato-board/worktime/task-bugs", "GET", async (_, query) => taskBugs.load(query.get("itemKey") ?? "", query.get("q")?.trim() ?? ""));
	route("/api/tomato-board/worktime/task-bug", "POST", async (request) => {
		const input = await body(request);
		return serial(() => taskBugs.link(String(input.itemKey ?? ""), String(input.bugKey ?? "")));
	});
	route("/api/tomato-board/worktime", "GET", async (_, query) => {
		const store = await load();
		const assignee = query.get("assignee");
		if (!assignee) return store;
		if (assignee !== "currentUser()" && !/^[A-Za-z0-9_.@-]{1,128}$/u.test(assignee)) throw new Error("无效的负责人");
		return assignee === "currentUser()" ? store : {
			...store,
			units: [],
			archivedUnits: []
		};
	});
	route("/api/tomato-board/worktime/metadata", "GET", async (_, query) => (await metadata(deps.run, query.get("itemKey") ?? "")).data);
	route("/api/tomato-board/worktime/ranges", "POST", async (request) => {
		const input = await body(request);
		const itemKey = String(input.itemKey ?? "");
		const ranges = list(input.ranges).map((value) => validateUnit({
			...record(value),
			itemKey
		}));
		if (!keyPattern.test(itemKey) || !Array.isArray(input.ranges) || new Set(ranges.map((range) => range.id)).size !== ranges.length) throw new Error("请选择有效且不重复的时间段");
		return serial(async () => {
			const store = await load();
			if (store.groupOperations?.some((operation) => operation.itemKey === itemKey)) throw new Error("需求上次移动结果待核对，请先核对番茄");
			const group = store.units.filter((unit) => unit.itemKey === itemKey);
			const claims = list(input.units).map(record);
			if (group.length !== claims.length || group.some((unit) => !claims.some((claim) => claim.id === unit.id && claim.revision === unit.revision))) throw new Error("安排已变化，请刷新后编辑");
			const removed = group.filter((unit) => !ranges.some((range) => range.id === unit.id));
			freezeAllocations(store, itemKey);
			if (removed.some((unit) => unit.tasks.length)) store.archivedUnits = [...store.archivedUnits ?? [], ...removed.filter((unit) => unit.tasks.length)];
			if (!ranges.length) {
				store.units = store.units.filter((unit) => unit.itemKey !== itemKey);
				await save(store);
				return { units: [] };
			}
			const { story, workspace, assignees } = await storyContext(deps.run, itemKey);
			const next = ranges.map((range) => {
				const existing = store.units.find((unit) => unit.id === range.id);
				if (existing && existing.itemKey !== itemKey) throw new Error("时间段编号已被其他需求使用");
				if (existing && unitHasCreatedTasks(existing, store.units)) {
					if (existing.start !== range.start || existing.end !== range.end) throw new Error("已创建 Task 的时间段不能改动日期");
					return existing;
				}
				return {
					...existing,
					...range,
					title: text(story.name),
					workspace,
					tasks: existing?.tasks ?? [],
					assignees: assignees.flatMap((user) => [text(user.username), text(user.objectId)]).filter(Boolean),
					cost: String(input.cost ?? existing?.cost ?? ""),
					team: String(input.team ?? existing?.team ?? ""),
					category: String(input.category ?? existing?.category ?? ""),
					revision: (existing?.revision ?? 0) + 1,
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				};
			});
			store.units = [...store.units.filter((unit) => unit.itemKey !== itemKey), ...next];
			mergeRanges(store, itemKey);
			await save(store);
			return { units: store.units.filter((unit) => unit.itemKey === itemKey) };
		});
	});
	route("/api/tomato-board/worktime/unit", "POST", async (request) => {
		const input = await body(request);
		const unit = validateUnit(input);
		return serial(async () => {
			const store = await load();
			if (store.groupOperations?.some((operation) => operation.itemKey === unit.itemKey)) throw new Error("需求上次移动结果待核对，请先核对番茄");
			const existing = store.units.find((value) => value.id === unit.id);
			freezeAllocations(store, unit.itemKey);
			if (existing && existing.itemKey !== unit.itemKey) throw new Error("需求安排不可替换，请新增安排");
			if (!existing && input.revision !== void 0) throw new Error("安排已发生变化，请刷新后编辑");
			if (existing && existing.revision !== input.revision) throw new Error("安排已发生变化，请刷新后编辑");
			if (existing && unitHasCreatedTasks(existing, store.units)) throw new Error("已创建 Task 的时间段不能改动日期；请新增安排以保留历史");
			const { story, workspace, assignees } = await storyContext(deps.run, unit.itemKey);
			const value = {
				...unit,
				title: text(story.name),
				workspace,
				tasks: existing?.tasks ?? [],
				assignees: assignees.flatMap((user) => [text(user.username), text(user.objectId)]).filter(Boolean),
				revision: (existing?.revision ?? 0) + 1,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
				...Object.fromEntries([
					"cost",
					"team",
					"category"
				].filter((key) => typeof input[key] === "string").map((key) => [key, input[key]]))
			};
			if (existing) store.units[store.units.indexOf(existing)] = value;
			else store.units.push(value);
			mergeRanges(store, value.itemKey);
			await save(store);
			return { unit: survivor(store, value.itemKey, value.start) ?? value };
		});
	});
	route("/api/tomato-board/worktime/delete", "POST", async () => {
		throw new Error("需求安排不可删除，请对具体 Task 执行删除操作");
	});
	/** Verify ownership and the version of a remote Task before writing dates. */
	async function ownedTask(itemKey, start, end, user) {
		const raw = record(await deps.run([
			"team",
			"item",
			"view",
			itemKey
		]));
		if (text(raw.itemType) !== "Task") throw new Error("只允许对 Task 同步日期或删除");
		const values = fieldValues(raw);
		if (!list(values.assignee).map(record).some((owner) => text(user.userId) && text(owner.objectId ?? owner.value) === text(user.userId) || text(user.username) && text(owner.username) === text(user.username))) throw new Error("只能修改当前登录用户负责的 Task");
		if (localDate(values.DateSDate) !== start || localDate(values.qiwangwanchengriqi) !== end) throw new Error("Task 日期已变化，请刷新后重试");
		return values;
	}
	async function writeTaskDates(itemKey, start, end) {
		await deps.run([
			"team",
			"item",
			"edit",
			itemKey,
			"--values",
			JSON.stringify({
				DateSDate: timestamp(start),
				qiwangwanchengriqi: timestamp(end)
			})
		]);
		const actual = fieldValues(await deps.run([
			"team",
			"item",
			"view",
			itemKey
		]));
		if (localDate(actual.DateSDate) !== start || localDate(actual.qiwangwanchengriqi) !== end) throw new Error("计划日期回读不一致");
	}
	route("/api/tomato-board/worktime/requirement", "POST", async (request) => {
		const input = await body(request);
		if (!["move", "resize"].includes(String(input.action))) throw new Error("无效的需求操作");
		if (input.action === "move" && (!Number.isInteger(input.delta) || Math.abs(Number(input.delta)) > 366)) throw new Error("移动范围最多 366 天");
		if (input.action === "resize") datesBetween(String(input.start ?? ""), String(input.end ?? ""));
		return serial(async () => {
			const store = await load();
			const group = store.units.filter((unit) => unit.itemKey === input.itemKey && unit.id === input.id);
			freezeAllocations(store, String(input.itemKey));
			const claims = list(input.units).map(record);
			if (!group.length || claims.length !== group.length || group.some((unit) => !claims.some((claim) => claim.id === unit.id && claim.revision === unit.revision))) throw new Error("需求安排已变化，请刷新后重试");
			if (store.groupOperations?.some((operation) => operation.itemKey === input.itemKey)) throw new Error("需求上次移动结果待核对，请先核对番茄");
			const change = input.action === "move" ? {
				action: "move",
				id: String(input.id),
				delta: Number(input.delta)
			} : {
				action: "resize",
				id: String(input.id),
				start: String(input.start),
				end: String(input.end)
			};
			if (change.action === "resize" && !group.some((unit) => unit.id === change.id)) throw new Error("时间段不存在");
			const next = applyRequirementChange(group, change).map((unit) => ({
				...unit,
				tasks: [...unit.tasks]
			}));
			for (const unit of next) datesBetween(unit.start, unit.end);
			for (const unit of next) {
				unit.revision += 1;
				unit.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
			}
			store.units = store.units.map((unit) => next.find((value) => value.id === unit.id) ?? unit);
			store.units = mergeRequirementRanges(store.units, String(input.itemKey));
			await save(store);
			return { units: store.units };
		});
	});
	route("/api/tomato-board/worktime/task", "POST", async (request) => {
		const input = await body(request);
		const itemKey = String(input.itemKey ?? "");
		if (!keyPattern.test(itemKey) || !["move", "delete"].includes(String(input.action))) throw new Error("无效的 Task 操作");
		if (input.action === "delete" && input.confirm !== true) throw new Error("请确认将 Task 及其后代移入回收站");
		const start = String(input.start ?? "");
		const end = String(input.end ?? "");
		if (input.action === "move") datesBetween(start, end);
		return serial(async () => {
			const store = await load();
			if (store.taskOperations?.some((operation) => operation.itemKey === itemKey)) throw new Error("该 Task 上次同步结果待核对，请先在番茄确认，不能重复提交");
			if (store.groupOperations?.some((operation) => operation.tasks.some((task) => task.itemKey === itemKey))) throw new Error("所属需求上次移动结果待核对，请先核对番茄");
			const user = record(await deps.run([
				"team",
				"user",
				"current"
			]));
			await ownedTask(itemKey, String(input.expectedStart), String(input.expectedEnd), user);
			const local = [...store.units, ...store.archivedUnits ?? []].flatMap((unit) => unit.tasks.map((task) => ({
				unit,
				task
			}))).filter((value) => value.task.itemKey === itemKey);
			for (const key of new Set(local.map(({ unit }) => unit.itemKey))) freezeAllocations(store, key);
			const operation = {
				itemKey,
				action: String(input.action),
				...input.action === "move" ? {
					start,
					end
				} : {},
				startedAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			store.taskOperations = [...store.taskOperations ?? [], operation];
			await save(store);
			try {
				if (input.action === "delete") {
					await deps.run([
						"team",
						"item",
						"delete",
						itemKey,
						"--yes"
					]);
					for (const { unit, task } of local) unit.tasks = unit.tasks.filter((value) => value !== task);
				} else {
					await writeTaskDates(itemKey, start, end);
					for (const { task } of local) {
						task.start = start;
						task.end = end;
						delete task.allocationSlots;
					}
					for (const key of new Set(local.map(({ unit }) => unit.itemKey))) freezeAllocations(store, key);
				}
				for (const { unit } of local) {
					unit.revision += 1;
					unit.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
				}
				store.taskOperations = store.taskOperations.filter((value) => value !== operation);
				await save(store);
				deps.invalidate();
				return {
					itemKey,
					action: input.action,
					start,
					end
				};
			} catch (error) {
				throw new Error(`Task 同步结果待核对，请刷新并在番茄确认：${error instanceof Error ? error.message : "操作失败"}`);
			}
		});
	});
	route("/api/tomato-board/worktime/create", "POST", async (request) => {
		const input = await body(request);
		const claims = (list(input.units).length ? list(input.units) : typeof input.id === "string" ? [{
			id: input.id,
			revision: input.revision
		}] : []).map((raw) => {
			const value = record(raw);
			return {
				id: String(value.id ?? ""),
				revision: Number(value.revision)
			};
		});
		if (!claims.length) throw new Error("缺少操作单元");
		return serial(async () => {
			const store = await load();
			const first = store.units.find((value) => value.id === claims[0].id);
			if (!first) throw new Error("安排不存在，请先保存");
			if (store.groupOperations?.some((operation) => operation.itemKey === first.itemKey)) throw new Error("需求上次移动结果待核对，请先核对番茄");
			const batch = claims.map((claim) => {
				const unit = store.units.find((value) => value.id === claim.id);
				if (!unit || unit.itemKey !== first.itemKey || unit.revision !== claim.revision) throw new Error("安排已变化，请刷新后重试");
				return unit;
			});
			const unresolved = [...store.units, ...store.archivedUnits ?? []].filter((unit) => unit.itemKey === first.itemKey).flatMap((unit) => unit.tasks.filter((task) => (task.status === "uncertain" || task.status === "creating") && (batch.includes(unit) || batch.some((range) => task.start <= range.end && task.end >= range.start))));
			if (unresolved.some((task) => task.itemKey)) throw new Error("已有 Task 编号但创建结果待核对，请先核对番茄记录，不能直接重复创建");
			if (unresolved.length && input.confirmRetry !== true) throw new Error("创建结果待核对，请先确认番茄中没有对应 Task，再确认重试");
			const group = store.units.filter((value) => value.itemKey === first.itemKey);
			const dates = unitDates(batch);
			const drafts = list(input.tasks).map(record).map((task) => ({
				stage: String(task.stage ?? ""),
				title: String(task.title ?? ""),
				days: Number(task.days)
			})).filter((task) => task.days !== 0);
			const existing = [...group, ...(store.archivedUnits ?? []).filter((unit) => unit.itemKey === first.itemKey)].flatMap((unit) => unit.tasks);
			freezeAllocations(store, first.itemKey);
			const tasks = allocateGroupTasks(dates, drafts, existing, unitDates([...group, ...(store.archivedUnits ?? []).filter((unit) => unit.itemKey === first.itemKey)]));
			const { options, data, context, definitions } = await metadata(deps.run, first.itemKey);
			const optionValue = (key, label) => {
				const match = options(key).find((option) => option.label === label);
				if (!match) throw new Error(`请选择有效的 ${key}`);
				return [match.value];
			};
			const common = {
				view_project: [context.project],
				Dropdown2: optionValue("Dropdown2", input.cost),
				suoshutuandui: optionValue("suoshutuandui", input.team),
				Dropdown_task: optionValue("Dropdown_task", input.category),
				assignee: context.assignees.map(userValue)
			};
			if (!data.categories.includes(String(input.category))) throw new Error("任务分类仅支持软件开发或修复BUG");
			const planKeys = new Set([
				"DateSDate",
				"qiwangwanchengriqi",
				"planStoryPoint"
			]);
			const actualKeys = [
				"StoryPoint1",
				"StartDate",
				"ActualFinishTime"
			];
			const actualLabels = {
				StoryPoint1: "实际工作量",
				StartDate: "实际开始时间",
				ActualFinishTime: "实际完成时间"
			};
			const prepared = tasks.map((task) => {
				const values = {
					...common,
					DateSDate: timestamp(task.start),
					qiwangwanchengriqi: timestamp(task.end),
					planStoryPoint: task.days,
					StoryPoint1: task.days,
					StartDate: timestamp(task.start),
					ActualFinishTime: timestamp(task.end)
				};
				const skipped = /* @__PURE__ */ new Set();
				const skippedLabels = [];
				for (const field of definitions) {
					const key = String(field.key);
					if (field.required === true && ![
						"name",
						"workspace",
						"itemType"
					].includes(key) && !(key in values)) throw new Error(`创建界面新增必填字段：${text(field.name)}，请先补充支持`);
					const value = values[key];
					const range = list(record(field.property).range);
					if (!(typeof value === "number" && range.length === 2 && typeof range[0] === "number" && typeof range[1] === "number" && (value < range[0] || value > range[1]))) continue;
					if (field.required === true || planKeys.has(key)) throw new Error(`${text(field.name)}允许范围为 ${localDate(range[0])}～${localDate(range[1])}，所选日期超出范围，无法创建 Task`);
					delete values[key];
					skipped.add(key);
					skippedLabels.push(text(field.name));
				}
				if (actualKeys.some((key) => skipped.has(key))) for (const key of actualKeys) {
					if (!(key in values)) continue;
					delete values[key];
					if (skipped.has(key)) continue;
					skipped.add(key);
					skippedLabels.push(actualLabels[key]);
				}
				if (skippedLabels.length) task.skipped = skippedLabels;
				return {
					task,
					values,
					skipped
				};
			});
			for (const unit of batch) unit.tasks = unit.tasks.filter((task) => task.status === "created");
			if (input.confirmRetry === true) for (const unit of store.archivedUnits ?? []) unit.tasks = unit.tasks.filter((task) => !unresolved.includes(task) || Boolean(task.itemKey));
			for (const task of tasks) (batch.find((unit) => unit.start <= task.start && task.start <= unit.end) ?? batch[0]).tasks.push(task);
			for (const unit of batch) {
				unit.project = context.project;
				unit.team = String(input.team);
				unit.cost = String(input.cost);
				unit.category = String(input.category);
				unit.revision += 1;
				unit.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
			}
			await save(store);
			for (const { task, values, skipped } of prepared) {
				task.status = "creating";
				await save(store);
				try {
					const created = record(await deps.run([
						"team",
						"item",
						"create",
						"--workspace",
						context.workspace,
						"--item-type",
						"Task",
						"--parent",
						first.itemKey,
						"--title",
						task.title,
						"--values",
						JSON.stringify(values)
					]));
					const key = text(created.itemKey ?? created.key ?? record(created.result).itemKey);
					if (!keyPattern.test(key)) throw new Error("创建返回缺少事项编号，结果待核对");
					task.itemKey = key;
					await save(store);
					const verified = record(await deps.run([
						"team",
						"item",
						"view",
						key
					]));
					const actual = fieldValues(verified);
					if (!list(verified.ancestors).map((value) => text(record(value).objectId ?? value)).includes(text(context.story.objectId ?? context.story.itemId))) throw new Error("父故事校验失败");
					const broken = [
						["name", text(verified.name) === task.title],
						["view_project", text(actual.view_project) === text(values.view_project)],
						["Dropdown2", text(actual.Dropdown2) === text(values.Dropdown2)],
						["suoshutuandui", text(actual.suoshutuandui) === text(values.suoshutuandui)],
						["Dropdown_task", text(actual.Dropdown_task) === text(values.Dropdown_task)],
						["planStoryPoint", Number(actual.planStoryPoint) === task.days],
						["DateSDate", localDate(actual.DateSDate) === task.start],
						["qiwangwanchengriqi", localDate(actual.qiwangwanchengriqi) === task.end]
					].find(([field, ok]) => !ok && !skipped.has(field));
					if (broken) throw new Error(`Task ${broken[0]} 回读校验失败`);
					const readBackActual = [
						["StoryPoint1", Number(actual.StoryPoint1) === task.days],
						["StartDate", localDate(actual.StartDate) === task.start],
						["ActualFinishTime", localDate(actual.ActualFinishTime) === task.end]
					];
					for (const [field, ok] of readBackActual) {
						if (ok || skipped.has(field)) continue;
						skipped.add(field);
						task.skipped = [...task.skipped ?? [], actualLabels[field]];
					}
					const owners = list(actual.assignee).map((value) => text(record(value).objectId ?? record(value).value));
					if (!context.assignees.every((user) => owners.includes(text(user.objectId)))) throw new Error("Task 负责人回读校验失败");
					task.status = "created";
				} catch (error) {
					task.status = "uncertain";
					task.error = error instanceof Error ? error.message : "创建结果待核对";
					await save(store);
					return {
						unit: first,
						units: group,
						error: `已保留创建记录，请核对后处理：${task.error}`
					};
				}
				await save(store);
			}
			deps.invalidate();
			return {
				unit: first,
				units: group
			};
		});
	});
	route("/api/tomato-board/worktime/history", "GET", async (_, query) => {
		const start = query.get("start") ?? "";
		const end = query.get("end") ?? "";
		datesBetween(start, end);
		const assignee = query.get("assignee") || "currentUser()";
		if (assignee !== "currentUser()" && !/^[A-Za-z0-9_.@-]{1,128}$/u.test(assignee)) throw new Error("无效的负责人");
		const iql = `负责人 in [${assignee === "currentUser()" ? assignee : JSON.stringify(assignee)}] and 类型 = Task and DateSDate <= ${JSON.stringify(end)} and qiwangwanchengriqi >= ${JSON.stringify(start)}`;
		const tasks = [];
		for (let page = 1; page <= 100; page += 1) {
			const payload = record(await deps.run([
				"team",
				"item",
				"search",
				"--iql",
				iql,
				"--page",
				String(page),
				"--size",
				"50",
				"--fields",
				"key,name,status,DateSDate,qiwangwanchengriqi,planStoryPoint,StartDate,ActualFinishTime,StoryPoint1"
			]));
			const rows = list(payload.items);
			for (const raw of rows) {
				const item = record(raw);
				const value = fieldValues(item);
				tasks.push({
					itemKey: text(item.key ?? item.itemKey),
					title: text(item.name ?? item.title),
					status: text(item.status),
					start: localDate(value.DateSDate),
					end: localDate(value.qiwangwanchengriqi),
					days: Number(value.planStoryPoint) || 0
				});
			}
			const total = Number(payload.count ?? payload.total);
			if (!rows.length || (Number.isFinite(total) ? tasks.length >= total : rows.length < 50)) return { tasks };
		}
		return {
			tasks,
			truncated: true
		};
	});
}
//#endregion
//#region src/index.ts
const execFileAsync = promisify(execFile);
const ROUTE = "/api/tomato-board/items";
const OPEN_ROUTE = "/api/tomato-board/open";
const TRANSITIONS_ROUTE = "/api/tomato-board/transitions";
const TRANSITION_ROUTE = "/api/tomato-board/transition";
const FILTERS_ROUTE = "/api/tomato-board/filters";
const DEFAULT_PRIORITY_NAMES = new Map([
	["69e65065-4b34-4109-bca9-0154e548554a", "P0"],
	["8f7912a5-9176-4a79-a269-2269ac42b5a2", "P1"],
	["ca8c3e43-3e7b-444d-8940-d0967d944921", "P2"],
	["ec31e4c1-b55b-479d-be97-86d5f7bf38ef", "P2"],
	["1a3e1092-7d70-42ee-ad38-0e8d953c4c23", "P3"],
	["faae52da-28c8-46fc-96dd-db9cdb28b557", "P4"]
]);
let itemsCache = null;
let itemsInFlight = null;
function firstText(value) {
	if (typeof value === "string") return value.trim();
	if (Array.isArray(value)) return value.map(firstText).find(Boolean) ?? "";
	if (value && typeof value === "object") {
		const record = value;
		for (const key of [
			"name",
			"label",
			"nickname",
			"username",
			"value",
			"key"
		]) {
			const text = firstText(record[key]);
			if (text) return text;
		}
	}
	return "";
}
function textList(value) {
	return [...new Set((Array.isArray(value) ? value : value ? [value] : []).map(firstText).filter(Boolean))];
}
function unwrapItems(payload) {
	if (Array.isArray(payload)) return payload;
	if (!payload || typeof payload !== "object") return [];
	const record = payload;
	for (const key of [
		"items",
		"data",
		"result"
	]) {
		const value = record[key];
		if (Array.isArray(value)) return value;
		if (value && typeof value === "object" && Array.isArray(value.items)) return value.items;
	}
	return [];
}
function unwrapTransitions(payload) {
	if (Array.isArray(payload)) return payload;
	if (!payload || typeof payload !== "object") return [];
	const record = payload;
	for (const key of [
		"transitions",
		"data",
		"result"
	]) {
		const value = record[key];
		if (Array.isArray(value)) return value;
		if (value && typeof value === "object" && Array.isArray(value.transitions)) return value.transitions;
	}
	return [];
}
function normalizeItem(raw, priorityNames = DEFAULT_PRIORITY_NAMES) {
	const item = raw && typeof raw === "object" ? raw : {};
	const nested = item.value && typeof item.value === "object" ? item.value : item.values && typeof item.values === "object" ? item.values : item;
	const workspaceValue = item.workspace ?? nested.workspace ?? nested["所属空间"];
	const workspace = workspaceValue && typeof workspaceValue === "object" ? workspaceValue : {};
	const workspaceKey = firstText(workspace.key);
	const workspaceName = firstText(workspace.name ?? workspaceValue);
	return {
		itemKey: firstText(item.itemKey ?? item.key ?? item.id ?? nested.itemKey ?? nested.key),
		title: firstText(item.title ?? item.name ?? nested.title ?? nested.name ?? nested["标题"]),
		status: firstText(item.status ?? nested.status ?? nested["状态"]),
		itemType: firstText(item.itemType ?? item.type ?? nested.itemType ?? nested["类型"]),
		workspace: workspaceKey || workspaceName,
		workspaceKey,
		workspaceName,
		creator: firstText(item.creator ?? item.createdBy ?? nested["创建人"] ?? nested.createdBy),
		createdAt: firstText(item.createdAt ?? nested.createdAt ?? nested["创建时间"]),
		assignees: textList(item.assignees ?? item.assignee ?? nested.assignees ?? nested.assignee ?? nested["负责人"]),
		priority: (() => {
			const priority = firstText(item.priority ?? nested.priority ?? nested["优先级"]);
			return priorityNames.get(priority) ?? priority;
		})()
	};
}
function normalizeTransition(raw) {
	if (!raw || typeof raw !== "object") return null;
	const value = raw;
	const transition = firstText(value.transition);
	const targetStatus = firstText(value.targetStatus ?? value.status);
	if (!transition || !targetStatus) return null;
	return {
		transition,
		targetStatus,
		disabled: value.disabled === true,
		...firstText(value.disabledReason) ? { disabledReason: firstText(value.disabledReason) } : {}
	};
}
function tomatoItemUrl(config, itemKey) {
	const origin = config.tomatoOrigin || "https://osc.gitee.work";
	const tenant = config.tomatoTenant || "xly-poc";
	const workspace = itemKey.replace(/-\d+$/u, "");
	const target = new URL(`/_team/${encodeURIComponent(tenant)}/item/${encodeURIComponent(itemKey)}`, origin);
	target.searchParams.set("workspace", workspace);
	target.searchParams.set("tenant", tenant);
	target.searchParams.set("hiddenHeader", "true");
	target.searchParams.set("from", "one");
	target.searchParams.set("frameless", "true");
	return target.toString();
}
function cliSettings(config) {
	return {
		executable: resolveCliExecutable(config.executable || process$1.env.TOMATO_CLI_EXECUTABLE || "gitee"),
		profile: config.profile || process$1.env.TOMATO_PROFILE || "osc"
	};
}
async function runJson(config, args) {
	const { executable, profile } = cliSettings(config);
	const result = await execFileAsync(executable, [
		...args,
		"--profile",
		profile,
		"--output",
		"json"
	], {
		timeout: 12e4,
		maxBuffer: 16 * 1024 * 1024
	});
	return JSON.parse(result.stdout);
}
async function loadTransitions(config, itemKey) {
	return unwrapTransitions(await runJson(config, [
		"team",
		"transition",
		"list",
		itemKey
	])).map(normalizeTransition).filter((value) => value !== null);
}
async function loadItem(config, itemKey) {
	return normalizeItem(await runJson(config, [
		"team",
		"item",
		"view",
		itemKey
	]));
}
async function executeTransition(config, itemKey, transitionName) {
	const selected = (await loadTransitions(config, itemKey)).find((transition) => transition.transition === transitionName);
	if (!selected || selected.disabled) throw new Error(selected?.disabledReason || "当前状态不支持该流转");
	const before = await loadItem(config, itemKey);
	await runJson(config, [
		"team",
		"transition",
		"execute",
		itemKey,
		"--transition",
		selected.transition
	]);
	const after = await loadItem(config, itemKey);
	if (after.status !== selected.targetStatus) throw new Error(`流转后状态校验失败：期望「${selected.targetStatus}」，实际「${after.status || "未知"}」`);
	return {
		itemKey,
		previousStatus: before.status,
		currentStatus: after.status,
		targetStatus: selected.targetStatus
	};
}
function itemKeyFromRoute(requestUrl, route) {
	const pathname = new URL(requestUrl ?? route, "http://localhost").pathname;
	const itemKey = decodeURIComponent(pathname.slice(route.length).replace(/^\/+/, "")).trim();
	return /^[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-\d+$/u.test(itemKey) ? itemKey : "";
}
function assigneeIql(config, assignee) {
	const base = config.iql?.trim();
	const clause = `负责人 in [${assignee === "currentUser()" ? "currentUser()" : JSON.stringify(assignee)}]`;
	return base ? `(${base}) and ${clause}` : clause;
}
async function loadItems(config, assignee) {
	const { executable, profile } = cliSettings(config);
	const iql = assigneeIql(config, assignee);
	const priorityNames = new Map([...DEFAULT_PRIORITY_NAMES, ...Object.entries(config.priorityNames ?? {})]);
	const rawItems = [];
	let page = 1;
	let truncated = false;
	const maxItems = Math.max(1, Math.min(config.maxItems ?? 5e3, 2e4));
	while (rawItems.length < maxItems) {
		const result = await execFileAsync(executable, [
			"team",
			"item",
			"search",
			"--profile",
			profile,
			"--page",
			String(page),
			"--size",
			"50",
			"--iql",
			iql,
			"--fields",
			"key,name,status,itemType,workspace,priority,createdBy,assignee,createdAt",
			"--output",
			"json"
		], {
			timeout: 12e4,
			maxBuffer: 16 * 1024 * 1024
		});
		const payload = JSON.parse(result.stdout);
		const pageItems = unwrapItems(payload);
		rawItems.push(...pageItems);
		const record = payload && typeof payload === "object" ? payload : {};
		const total = Number(record.count ?? record.total ?? record.data?.count);
		const hasMore = record.hasNext === true || record.hasMore === true || Number.isFinite(total) && rawItems.length < total || !Number.isFinite(total) && pageItems.length === 50;
		if (rawItems.length >= maxItems && hasMore) {
			truncated = true;
			break;
		}
		if (!hasMore || pageItems.length === 0) break;
		page += 1;
	}
	const excludedStatuses = new Set(config.excludedStatuses ?? [
		"测试通过",
		"测试完成",
		"不修复",
		"已取消"
	]);
	return {
		items: rawItems.slice(0, maxItems).map((item) => normalizeItem(item, priorityNames)).filter((item) => item.itemKey && item.title && item.status && !excludedStatuses.has(item.status)).map((item) => ({
			...item,
			tomatoUrl: tomatoItemUrl(config, item.itemKey)
		})),
		truncated
	};
}
function loadItemsCached(config, assignee) {
	const ttl = Math.max(0, Math.min(config.cacheTtlMs ?? 15e3, 3e5));
	const key = JSON.stringify([
		cliSettings(config),
		assignee,
		config.iql,
		config.maxItems,
		config.excludedStatuses,
		config.priorityNames,
		config.tomatoOrigin,
		config.tomatoTenant
	]);
	if (itemsCache?.key === key && itemsCache.expiresAt > Date.now()) return Promise.resolve(itemsCache.value);
	if (itemsInFlight?.key === key) return itemsInFlight.promise;
	const promise = loadItems(config, assignee).then((value) => {
		itemsCache = {
			key,
			expiresAt: Date.now() + ttl,
			value
		};
		return value;
	}).finally(() => {
		if (itemsInFlight?.promise === promise) itemsInFlight = null;
	});
	itemsInFlight = {
		key,
		promise
	};
	return promise;
}
async function loadFilters(config) {
	const users = [];
	const workspaces = [];
	for (let page = 1; page <= 100; page += 1) {
		const payload = await runJson(config, [
			"team",
			"user",
			"list",
			"--page",
			String(page),
			"--size",
			"300"
		]);
		const record = payload && typeof payload === "object" ? payload : {};
		const values = Array.isArray(record.users) ? record.users : [];
		users.push(...values);
		if (!record.nextPageIndex || values.length === 0) break;
	}
	for (let page = 1; page <= 100; page += 1) {
		const payload = await runJson(config, [
			"team",
			"workspace",
			"list",
			"--page",
			String(page),
			"--size",
			"100"
		]);
		const record = payload && typeof payload === "object" ? payload : {};
		const values = Array.isArray(record.workspaces) ? record.workspaces : [];
		workspaces.push(...values);
		if (!record.nextPageIndex || values.length === 0) break;
	}
	return {
		users: users.map((value) => {
			const user = value && typeof value === "object" ? value : {};
			return {
				username: firstText(user.username),
				name: firstText(user.nickname ?? user.name ?? user.username)
			};
		}).filter((user) => user.username),
		workspaces: workspaces.map((value) => {
			const workspace = value && typeof value === "object" ? value : {};
			return {
				key: firstText(workspace.key),
				name: firstText(workspace.name ?? workspace.key)
			};
		}).filter((workspace) => workspace.key || workspace.name)
	};
}
function fieldObjectIds(raw) {
	return [...new Set((Array.isArray(raw) ? raw : raw ? [raw] : []).flatMap((value) => {
		if (typeof value === "string") return [value.trim()];
		if (!value || typeof value !== "object") return [];
		const record = value;
		return [
			record.objectId,
			record.value,
			record.id
		].map(firstText).filter(Boolean);
	}).filter(Boolean))];
}
function storyPointValue(raw) {
	if (raw === null || raw === void 0 || raw === "" || typeof raw === "boolean") return null;
	if (typeof raw !== "number" && typeof raw !== "string") return null;
	if (typeof raw === "string" && !raw.trim()) return null;
	const value = Number(raw);
	return Number.isFinite(value) && value >= 0 ? value : null;
}
async function readSprints(config) {
	const sprints = [];
	for (let page = 1; page <= 100; page += 1) {
		const payload = await runJson(config, [
			"team",
			"sprint",
			"list",
			"--status",
			"active,notStarted,completed",
			"--page",
			String(page),
			"--size",
			"100"
		]);
		const values = Array.isArray(payload.sprints) ? payload.sprints : [];
		sprints.push(...values);
		if (!(Number(payload.nextPageIndex) > page) || !values.length) return { sprints };
	}
	throw new Error("迭代数量超出读取上限，请缩小查询范围");
}
const sprintReads = /* @__PURE__ */ new Map();
function loadSprints(config) {
	const key = JSON.stringify([
		config.executable,
		config.profile,
		config.tomatoOrigin,
		config.tomatoTenant
	]);
	const cached = sprintReads.get(key);
	if (cached && cached.expires > Date.now()) return cached.promise;
	if (sprintReads.size >= 20) sprintReads.delete(sprintReads.keys().next().value);
	const promise = readSprints(config).catch((error) => {
		if (sprintReads.get(key)?.promise === promise) sprintReads.delete(key);
		throw error;
	});
	sprintReads.set(key, {
		expires: Date.now() + 3e4,
		promise
	});
	return promise;
}
async function loadStoryItems(config, sprint, assignee) {
	const owner = assignee === "currentUser()" ? assignee : JSON.stringify(assignee);
	const selected = (await loadSprints(config)).sprints.find((value) => firstText(value.sprintId ?? value.objectId) === sprint);
	if (!selected) throw new Error("所选迭代不存在或无权查看，请刷新迭代列表");
	const period = teamPeriod(selected.startDate, selected.endDate);
	const window = `DateSDate <= ${JSON.stringify(period.end)} and qiwangwanchengriqi >= ${JSON.stringify(period.start)}`;
	const iql = `负责人 in [${owner}] and ((迭代 = ${JSON.stringify(sprint)} and 类型 in [Story, EnablerStory]) or (类型 in [Story, EnablerStory, Task] and ${window}))`;
	const items = /* @__PURE__ */ new Map();
	const limit = Math.max(1, Math.min(config.maxItems ?? 5e3, 2e4));
	for (let page = 1;; page += 1) {
		const payload = await runJson(config, [
			"team",
			"item",
			"search",
			"--iql",
			iql,
			"--fields",
			"key,name,status,itemType,StoryPoint,planStoryPoint,DateSDate,qiwangwanchengriqi,assignee,sprint",
			"--page",
			String(page),
			"--size",
			"50"
		]);
		const values = unwrapItems(payload);
		for (const raw of values) {
			const item = normalizeItem(raw);
			const record = raw;
			const fields = record.values ?? record.value ?? record;
			const itemSprints = fieldObjectIds(fields.sprint ?? fields.Sprint ?? fields["迭代"]);
			const metrics = teamItemMetrics(item.itemType, fields, itemSprints.includes(sprint), period);
			if (item.itemKey && metrics) items.set(item.itemKey, {
				...item,
				...metrics,
				tomatoUrl: tomatoItemUrl(config, item.itemKey)
			});
		}
		const total = Number(payload.count ?? payload.total);
		if (!(Number(payload.nextPageIndex) > page || payload.hasMore === true || payload.hasNext === true || (Number.isFinite(total) ? page * 50 < total : values.length === 50)) || !values.length) return {
			period,
			items: [...items.values()].slice(0, limit),
			truncated: items.size > limit
		};
		if (page * 50 >= limit) return {
			period,
			items: [...items.values()].slice(0, limit),
			truncated: true
		};
	}
}
function isCrossSite(request) {
	const header = (name) => {
		const value = request.headers?.[name] ?? request.headers?.[name.toLowerCase()];
		return Array.isArray(value) ? value[0] : value;
	};
	if (header("sec-fetch-site") === "cross-site") return true;
	const origin = header("origin");
	const host = header("host");
	if (!origin || !host) return false;
	try {
		return new URL(origin).host !== host;
	} catch {
		return true;
	}
}
function sendJson(response, status, body) {
	response.statusCode = status;
	response.setHeader("content-type", "application/json; charset=utf-8");
	response.setHeader("cache-control", "no-store");
	response.end(JSON.stringify(body));
}
function errorBody(error, fallback) {
	if (!(error instanceof Error)) return { error: fallback };
	const detail = error;
	return {
		error: error.message || fallback,
		details: {
			stderr: typeof detail.stderr === "string" ? detail.stderr.slice(-4e3) : "",
			stdout: typeof detail.stdout === "string" ? detail.stdout.slice(-4e3) : ""
		}
	};
}
const name = "tomato-board";
const inject = ["webServer"];
function apply(ctx, config = {}) {
	const webServer = ctx.get("webServer");
	registerPrAssistant(ctx, {
		...config.executable ? { executable: config.executable } : {},
		profile: config.profile || process$1.env.TOMATO_PROFILE || "osc",
		...config.prAssistant
	});
	registerWorktime(ctx, {
		server: webServer,
		run: (args) => runJson(config, args),
		crossSite: isCrossSite,
		scope: JSON.stringify([
			config.profile || process$1.env.TOMATO_PROFILE || "osc",
			config.tomatoOrigin ?? "https://osc.gitee.work",
			config.tomatoTenant ?? "xly-poc"
		]),
		...config.worktimeDataFile ? { dataFile: config.worktimeDataFile } : {},
		invalidate: () => {
			itemsCache = null;
		},
		bugLinkTypeId: config.bugLinkTypeId ?? ((config.tomatoOrigin ?? "https://osc.gitee.work") === "https://osc.gitee.work" && (config.tomatoTenant ?? "xly-poc") === "xly-poc" ? "c1FJJzOlPe" : ""),
		...config.bugLinkNames ? { bugLinkNames: config.bugLinkNames } : {}
	});
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: "/api/tomato-board/sprints",
		async handler(request, response) {
			if (request.method !== "GET") return sendJson(response, 405, { error: "Method not allowed" });
			try {
				sendJson(response, 200, await loadSprints(config));
			} catch (error) {
				sendJson(response, 502, errorBody(error, "迭代读取失败"));
			}
		}
	}), "tomato-board: sprints");
	for (const path of ["/api/tomato-board/team-management", "/api/tomato-board/story-points"]) ctx.effect(() => webServer.register({
		kind: "exact",
		path,
		async handler(request, response) {
			if (request.method !== "GET") return sendJson(response, 405, { error: "Method not allowed" });
			const query = new URL(request.url ?? "/", "http://localhost").searchParams;
			const sprint = query.get("sprint") ?? "";
			const assignee = query.get("assignee") || "currentUser()";
			if (!/^[A-Za-z0-9_-]{1,128}$/u.test(sprint) || assignee !== "currentUser()" && !/^[A-Za-z0-9_.@-]{1,128}$/u.test(assignee)) return sendJson(response, 400, { error: "无效的迭代或负责人" });
			try {
				sendJson(response, 200, await loadStoryItems(config, sprint, assignee));
			} catch (error) {
				sendJson(response, 502, errorBody(error, "故事点读取失败"));
			}
		}
	}), "tomato-board: story points");
	ctx.effect(() => webServer.register({
		kind: "prefix",
		path: "/api/tomato-board/story-point",
		async handler(request, response) {
			if (request.method !== "POST") return sendJson(response, 405, { error: "Method not allowed" });
			if (isCrossSite(request)) return sendJson(response, 403, { error: "拒绝跨站修改请求" });
			const itemKey = itemKeyFromRoute(request.url, "/api/tomato-board/story-point");
			const points = storyPointValue(new URL(request.url ?? "/", "http://localhost").searchParams.get("value"));
			if (!itemKey || points === null) return sendJson(response, 400, { error: "请输入非负有限故事点数值" });
			try {
				await runJson(config, [
					"team",
					"item",
					"edit",
					itemKey,
					"--values",
					JSON.stringify({ StoryPoint: points })
				]);
				const raw = await runJson(config, [
					"team",
					"item",
					"view",
					itemKey
				]);
				const actual = storyPointValue((raw.values ?? raw.value ?? raw).StoryPoint);
				if (actual !== points) throw new Error("故事点保存后校验失败，请刷新后重试");
				itemsCache = null;
				sendJson(response, 200, {
					itemKey,
					storyPoints: actual
				});
			} catch (error) {
				sendJson(response, 502, errorBody(error, "故事点保存失败"));
			}
		}
	}), "tomato-board: edit story point");
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: ROUTE,
		async handler(request, response) {
			if (request.method !== "GET") {
				sendJson(response, 405, { error: "Method not allowed" });
				return;
			}
			const assignee = new URL(request.url ?? ROUTE, "http://localhost").searchParams.get("assignee")?.trim() || "currentUser()";
			if (assignee !== "currentUser()" && !/^[A-Za-z0-9_.@-]{1,128}$/u.test(assignee)) {
				sendJson(response, 400, { error: "无效的负责人用户名" });
				return;
			}
			try {
				sendJson(response, 200, await loadItemsCached(config, assignee));
			} catch (error) {
				sendJson(response, 502, { error: error instanceof Error ? error.message : "番茄事项读取失败" });
			}
		}
	}), "tomato-board: HTTP items route");
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: FILTERS_ROUTE,
		async handler(request, response) {
			if (request.method !== "GET") return sendJson(response, 405, { error: "Method not allowed" });
			try {
				sendJson(response, 200, await loadFilters(config));
			} catch (error) {
				sendJson(response, 502, { error: error instanceof Error ? error.message : "筛选项读取失败" });
			}
		}
	}), "tomato-board: HTTP filters route");
	ctx.effect(() => webServer.register({
		kind: "prefix",
		path: OPEN_ROUTE,
		handler(request, response) {
			if (request.method !== "GET") {
				sendJson(response, 405, { error: "Method not allowed" });
				return;
			}
			const itemKey = itemKeyFromRoute(request.url, OPEN_ROUTE);
			if (!itemKey) {
				sendJson(response, 400, { error: "无效的番茄事项编号" });
				return;
			}
			response.statusCode = 302;
			response.setHeader("location", tomatoItemUrl(config, itemKey));
			response.setHeader("cache-control", "no-store");
			response.end();
		}
	}), "tomato-board: HTTP external item route");
	ctx.effect(() => webServer.register({
		kind: "prefix",
		path: TRANSITIONS_ROUTE,
		async handler(request, response) {
			if (request.method !== "GET") {
				sendJson(response, 405, { error: "Method not allowed" });
				return;
			}
			const itemKey = itemKeyFromRoute(request.url, TRANSITIONS_ROUTE);
			if (!itemKey) {
				sendJson(response, 400, { error: "无效的番茄事项编号" });
				return;
			}
			try {
				const [item, transitions] = await Promise.all([loadItem(config, itemKey), loadTransitions(config, itemKey)]);
				sendJson(response, 200, {
					itemKey,
					currentStatus: item.status,
					tomatoUrl: tomatoItemUrl(config, itemKey),
					transitions
				});
			} catch (error) {
				sendJson(response, 502, { error: error instanceof Error ? error.message : "番茄流转状态读取失败" });
			}
		}
	}), "tomato-board: HTTP transitions route");
	ctx.effect(() => webServer.register({
		kind: "prefix",
		path: TRANSITION_ROUTE,
		async handler(request, response) {
			if (request.method !== "POST") {
				sendJson(response, 405, { error: "Method not allowed" });
				return;
			}
			if (isCrossSite(request)) {
				sendJson(response, 403, { error: "拒绝跨站状态流转请求" });
				return;
			}
			const url = new URL(request.url ?? TRANSITION_ROUTE, "http://localhost");
			const itemKey = itemKeyFromRoute(request.url, TRANSITION_ROUTE);
			const transition = url.searchParams.get("transition")?.trim() ?? "";
			if (!itemKey || !transition || transition.length > 160) {
				sendJson(response, 400, { error: "无效的番茄流转请求" });
				return;
			}
			try {
				sendJson(response, 200, await executeTransition(config, itemKey, transition));
			} catch (error) {
				sendJson(response, 502, errorBody(error, "番茄事项流转失败"));
			}
		}
	}), "tomato-board: HTTP transition route");
}
//#endregion
export { apply, inject, name };
