import { execFile } from "node:child_process";
import process$1 from "node:process";
import { promisify } from "node:util";
import { accessSync, constants } from "node:fs";
import { homedir } from "node:os";
import { delimiter, dirname, isAbsolute, join } from "node:path";
import { mkdir, open, readFile, rename, unlink, writeFile } from "node:fs/promises";
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
/** Every planned date of one requirement, de-duplicated and chronological. */
function unitDates(units) {
	const dates = /* @__PURE__ */ new Set();
	for (const unit of units) for (const day of datesBetween(unit.start, unit.end)) dates.add(day);
	return [...dates].sort();
}
/**
* Allocate person-days across one requirement's ordered dates. Half days are the
* smallest unit, so two stages may share a date; a plan may leave time
* unallocated but may never exceed the planned total.
*/
function allocateGroupTasks(dates, tasks) {
	if (!dates.length) throw new Error("请先选择需求的日期");
	if (!tasks.length || tasks.length > 20) throw new Error("请填写至少一个阶段的人天");
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
		const first = Math.floor(spent + 1e-8);
		spent += task.days;
		const last = Math.ceil(spent - 1e-8) - 1;
		return {
			...task,
			title: task.title.trim(),
			start: dates[first] ?? "",
			end: dates[last] ?? "",
			status: "pending"
		};
	});
	if (spent > dates.length + 1e-6) throw new Error(`阶段合计不能大于 ${dates.length} 人天，当前为 ${Number(spent.toFixed(4))} 人天`);
	return result;
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
	const group = store.units.filter((unit) => unit.itemKey === itemKey).sort((a, b) => a.start < b.start ? -1 : a.start > b.start ? 1 : 0);
	let previous;
	for (const unit of group) {
		if (previous) {
			if (!(unitHasCreatedTasks(unit, store.units) || unitHasCreatedTasks(previous, store.units) || unit.tasks.some((task) => task.status !== "pending") || previous.tasks.some((task) => task.status !== "pending")) && unit.start <= addDays(previous.end, 1)) {
				if (unit.end > previous.end) previous.end = unit.end;
				if (!previous.cost && unit.cost) previous.cost = unit.cost;
				if (!previous.team && unit.team) previous.team = unit.team;
				if (!previous.category && unit.category) previous.category = unit.category;
				previous.revision += 1;
				previous.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
				store.units.splice(store.units.indexOf(unit), 1);
				continue;
			}
		}
		previous = unit;
	}
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
		if (value.version !== 1 || !Array.isArray(value.units)) throw new Error("历史工时数据格式异常，已保留原文件");
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
	route("/api/tomato-board/worktime", "GET", async (_, query) => {
		const store = await load();
		const assignee = query.get("assignee");
		if (!assignee) return store;
		if (assignee !== "currentUser()" && !/^[A-Za-z0-9_.@-]{1,128}$/u.test(assignee)) throw new Error("无效的负责人");
		return assignee === "currentUser()" ? store : {
			...store,
			units: []
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
		if (!ranges.length || new Set(ranges.map((range) => range.id)).size !== ranges.length) throw new Error("请选择有效且不重复的时间段");
		return serial(async () => {
			const store = await load();
			const group = store.units.filter((unit) => unit.itemKey === itemKey);
			const claims = list(input.units).map(record);
			if (group.length !== claims.length || group.some((unit) => !claims.some((claim) => claim.id === unit.id && claim.revision === unit.revision))) throw new Error("安排已变化，请刷新后编辑");
			if (group.some((unit) => !ranges.some((range) => range.id === unit.id))) throw new Error("请先通过删除操作移除已有时间段");
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
			const existing = store.units.find((value) => value.id === unit.id);
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
	route("/api/tomato-board/worktime/delete", "POST", async (request) => {
		const input = await body(request);
		if (typeof input.id !== "string") throw new Error("缺少操作单元");
		return serial(async () => {
			const store = await load();
			const unit = store.units.find((value) => value.id === input.id);
			if (!unit) return {
				id: input.id,
				removed: false
			};
			if (unit.revision !== input.revision) throw new Error("安排已变化，请刷新后重试");
			const created = unit.tasks.filter((task) => task.status === "created").length;
			store.units.splice(store.units.indexOf(unit), 1);
			mergeRanges(store, unit.itemKey);
			await save(store);
			return {
				id: unit.id,
				removed: true,
				created
			};
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
			const batch = claims.map((claim) => {
				const unit = store.units.find((value) => value.id === claim.id);
				if (!unit || unit.itemKey !== first.itemKey || unit.revision !== claim.revision) throw new Error("安排已变化，请刷新后重试");
				if (unitHasCreatedTasks(unit, store.units)) throw new Error("该时间段已创建 Task，请新增时间段后再安排");
				return unit;
			});
			const unresolved = store.units.filter((unit) => unit.itemKey === first.itemKey).flatMap((unit) => unit.tasks.filter((task) => (task.status === "uncertain" || task.status === "creating") && (batch.includes(unit) || batch.some((range) => task.start <= range.end && task.end >= range.start))));
			if (unresolved.some((task) => task.itemKey)) throw new Error("已有 Task 编号但创建结果待核对，请先核对番茄记录，不能直接重复创建");
			if (unresolved.length && input.confirmRetry !== true) throw new Error("创建结果待核对，请先确认番茄中没有对应 Task，再确认重试");
			const group = store.units.filter((value) => value.itemKey === first.itemKey);
			const tasks = allocateGroupTasks(unitDates(batch), list(input.tasks).map(record).map((task) => ({
				stage: String(task.stage ?? ""),
				title: String(task.title ?? ""),
				days: Number(task.days)
			})).filter((task) => task.days !== 0));
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
			for (const unit of batch) unit.tasks = [];
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
async function loadSprints(config) {
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
async function loadStoryItems(config, sprint, assignee) {
	const owner = assignee === "currentUser()" ? assignee : JSON.stringify(assignee);
	const iql = `迭代 = ${JSON.stringify(sprint)} and 负责人 in [${owner}] and 类型 in [Story, EnablerStory, Task]`;
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
			"key,name,status,itemType,StoryPoint,assignee,sprint",
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
			const isPlanningItem = [
				"Story",
				"EnablerStory",
				"Task"
			].includes(item.itemType);
			if (item.itemKey && isPlanningItem && itemSprints.includes(sprint)) items.set(item.itemKey, {
				...item,
				storyPoints: storyPointValue(fields.StoryPoint),
				tomatoUrl: tomatoItemUrl(config, item.itemKey)
			});
		}
		const total = Number(payload.count ?? payload.total);
		if (!(Number(payload.nextPageIndex) > page || payload.hasMore === true || payload.hasNext === true || (Number.isFinite(total) ? page * 50 < total : values.length === 50)) || !values.length) return {
			items: [...items.values()].slice(0, limit),
			truncated: items.size > limit
		};
		if (page * 50 >= limit) return {
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
		}
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
	ctx.effect(() => webServer.register({
		kind: "exact",
		path: "/api/tomato-board/story-points",
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
