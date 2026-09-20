import { execFile } from "node:child_process";
import { realpath } from "node:fs/promises";
import { isAbsolute, relative } from "node:path";
import { promisify } from "node:util";
import { randomUUID } from "node:crypto";
//#region lib/types/index.js
const execFileAsync = promisify(execFile);
const ROUTE = "/api/pr-assistant/repository";
const DETAIL_ROUTE = "/api/pr-assistant/pull-request";
const COMMIT_ROUTE = "/api/pr-assistant/commit";
const CONFLICT_PREFLIGHT_ROUTE = "/api/pr-assistant/conflict/preflight";
const CONFLICT_STATUS_ROUTE = "/api/pr-assistant/conflict/status";
const CONFLICT_PUSH_ROUTE = "/api/pr-assistant/conflict/push";
const REVIEW_COMMENT_ROUTE = "/api/pr-assistant/review/comment";
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
function sendJson(response, status, body) {
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
	const result = await execFileAsync(config.executable || "gitee", [
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
		const result = await execFileAsync(config.executable || "gitee", [
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
	const executable = config.executable || "gitee";
	const profile = config.profile || "osc";
	const common = {
		cwd: path,
		timeout: 3e4,
		maxBuffer: 32 * 1024 * 1024
	};
	const [detailResult, diffResult, commits] = await Promise.all([
		execFileAsync(executable, [
			"code",
			"pr",
			"view",
			String(number),
			"--json",
			"--profile",
			profile
		], common),
		execFileAsync(executable, [
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
		const result = await execFileAsync(config.executable || "gitee", [
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
	return (await execFileAsync("git", [
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
		const result = await execFileAsync(config.executable || "gitee", [
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
const name = "pr-assistant";
const inject = ["webServer"];
function apply(ctx, config = {}) {
	const webServer = ctx.get("webServer");
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: ROUTE,
		async handler(request, response) {
			if (request.method !== "GET") return sendJson(response, 405, { error: "Method not allowed" });
			const requestedPath = new URL(request.url ?? ROUTE, "http://localhost").searchParams.get("path")?.trim();
			if (!requestedPath) return sendJson(response, 400, { error: "缺少仓库路径" });
			try {
				sendJson(response, 200, await loadRepository(await validateRepositoryPath(requestedPath, config), config));
			} catch (error) {
				sendJson(response, error instanceof ClientInputError ? 400 : 502, { error: error instanceof Error ? error.message : "PR 读取失败" });
			}
		}
	}), "pr-assistant: repository route");
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: DETAIL_ROUTE,
		async handler(request, response) {
			if (request.method !== "GET") return sendJson(response, 405, { error: "Method not allowed" });
			const url = new URL(request.url ?? DETAIL_ROUTE, "http://localhost");
			const requestedPath = url.searchParams.get("path")?.trim();
			const number = Number(url.searchParams.get("number"));
			if (!requestedPath || !Number.isInteger(number) || number <= 0) return sendJson(response, 400, { error: "无效的 PR 详情请求" });
			try {
				sendJson(response, 200, await loadPullRequest(await validateRepositoryPath(requestedPath, config), number, config));
			} catch (error) {
				sendJson(response, error instanceof ClientInputError ? 400 : 502, { error: error instanceof Error ? error.message : "PR 详情读取失败" });
			}
		}
	}), "pr-assistant: pull request detail route");
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: COMMIT_ROUTE,
		async handler(request, response) {
			if (request.method !== "GET") return sendJson(response, 405, { error: "Method not allowed" });
			const url = new URL(request.url ?? COMMIT_ROUTE, "http://localhost");
			const requestedPath = url.searchParams.get("path")?.trim();
			const sha = url.searchParams.get("sha")?.trim();
			if (!requestedPath || !sha || !/^[a-f0-9]{7,64}$/iu.test(sha)) return sendJson(response, 400, { error: "无效的提交详情请求" });
			try {
				sendJson(response, 200, await loadCommit(await validateRepositoryPath(requestedPath, config), sha, config));
			} catch (error) {
				sendJson(response, error instanceof ClientInputError ? 400 : 502, { error: error instanceof Error ? error.message : "提交详情读取失败" });
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
				sendJson(response, 200, {
					published: true,
					...await publishReviewComment(await canonicalRepository(requestedPath, config), number, comment, config)
				});
			} catch (error) {
				sendJson(response, error instanceof ClientInputError ? 400 : 502, { error: error instanceof Error ? error.message : "PR 评论发布失败" });
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
				sendJson(response, 200, {
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
				sendJson(response, error instanceof ClientInputError ? 400 : 502, { error: error instanceof Error ? error.message : "冲突处理预检失败" });
			}
		}
	}), "pr-assistant: conflict preflight route");
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: CONFLICT_STATUS_ROUTE,
		async handler(request, response) {
			if (request.method !== "GET") return sendJson(response, 405, { error: "Method not allowed" });
			const id = new URL(request.url ?? CONFLICT_STATUS_ROUTE, "http://localhost").searchParams.get("operationId")?.trim();
			const operation = id ? conflictOperations.get(id) : void 0;
			if (!operation || Date.now() - operation.createdAt > 1440 * 60 * 1e3) return sendJson(response, 404, { error: "冲突处理记录不存在或已过期" });
			try {
				sendJson(response, 200, await conflictStatus(operation));
			} catch (error) {
				sendJson(response, 502, { error: error instanceof Error ? error.message : "冲突处理状态读取失败" });
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
				sendJson(response, 200, {
					pushed: true,
					sha: await git(operation.path, ["rev-parse", "HEAD"]),
					sourceBranch: operation.sourceBranch
				});
			} catch (error) {
				sendJson(response, error instanceof ClientInputError ? 400 : 502, { error: error instanceof Error ? error.message : "推送失败" });
			}
		}
	}), "pr-assistant: conflict push route");
}
//#endregion
export { apply, inject, name };
