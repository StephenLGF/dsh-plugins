# DSH 番茄工作台

为 DeepSeek Harness Web 提供 Gitee Team（番茄）工作台和原生对话联动。

## 快速安装（推荐）

Clone 仓库后，从插件目录安装到需要使用的 DSH profile。

Web：

```bash
git clone https://github.com/StephenLGF/dsh-plugins.git
cd dsh-plugins/plugins/tomato-board

npx @deepseek-ai/dsh plugin --profile web add .
npx @deepseek-ai/dsh web
```

DSH Desktop：

```bash
npx @deepseek-ai/dsh plugin --profile desktop add .
```

安装完成后退出并重新打开 DSH Desktop。`web` 和 `desktop` 是两个独立 profile，需要分别安装。

安装前请先确认必备的 Gitee CLI 已配置完成，具体要求见下方“必备环境”。

## 0.3.4 更新

- 移除左侧需求池与拖拽安排：点击或划选日期后直接弹出「选择需求」下拉框，选定即进入工时分配。
- 工时分配改为按需求聚合，同一需求的多个时间段合并计算人天，Task 按日期顺序填写且不超过总天数。
- 阶段人天最小单位改为 0.5 天；合计小于总天数时剩余时间保持未分配，填 0 的阶段直接跳过，不再报错。
- 锁定按时间段生效：已有创建成功 Task 的时间段只读（日期不可改）；需求安排不可删除；同需求其它/新增的时间段仍可编辑并再次创建 Task，即分批创建。
- 创建失败或结果未知的时间段需先核对：有 Task 编号时不允许直接重建，无编号时确认番茄中不存在对应 Task 后才可重试；对一个已创建过 Task 的时间段重复提交仍会被拒绝。只读用户的日期按钮不再可点。
- 负责人字段按 Team 原始值格式写入（`label/nickname/username/value`，值取需求负责人的 userId），不再发送 LeanCloud 指针对象。
- 创建 Task 时，番茄创建界面把某些字段限制在固定区间（如「实际完成时间」只允许当前迭代）：计划起止与计划工作量绝不可省，其余字段超范围时**直接不传**并在结果里提示已跳过；字段若为必填则仍然报错说明原因。「实际开始时间/实际工作量/实际完成时间」是一个整体，缺一则三者都不写（API 只接受成套的实际工时）。
- 新增或表单保存时，同一需求未锁定的相邻、重叠时间段自动合并；拖拽改期后，已创建 Task 的时间段也可合并，保留全部创建记录与原 Task 日期。
- 日历每一天重新占满整行周带，空白区域也能点选；时间条改为 20px 高、11px 字号，标题不再被压扁截断，并与日期列严格对齐。
- 日期数字放大到 14px，七天统一显示「月/日」；当前日期不再做任何视觉高亮（仅用 aria-current="date" 标记）。
- 时间条底色统一：需求为蓝色淡底，Task 改为绿色淡底（待创建/待核对用虚线边框＋更浅底色），两类卡片都有底色并带悬停反馈。
- 页签「工时管理」改名为「任务日历」；「选择需求」弹窗简化为标题加一个下拉框。

## 0.3.3 更新

- 迭代投入中，展开团队的成员始终参与加载，切换迭代后不再停留在“读取中”。
- 首次进入先确认有效迭代，切换迭代或刷新时重新读取成员数据，避免复用上一迭代的结果。

## 0.3.2 更新

- 使用 Harness `main` 主内容区展示工作台，保留左侧栏，关闭后返回原对话。
- 刷新成功提示改用 Harness 原生 Toast。

## 界面兼容性

工作台注册到 Harness 的 `main` 主内容区，打开时替换对话页并保留左侧会话栏，关闭后返回原对话。需要支持 `main` keyed slot 和 `ctx.layout.selectPanel` 的 Harness 版本；已在 DSH Desktop 2.0.13 验证。构建时也需要对应版本的 Harness 源码与类型声明。

客户端仅以类型导入 `SessionId`，不依赖浏览器提供 `@deepseek-ai/dsh-session/types` 运行时模块，避免构建工具将其外置后导致插件加载失败。

## 功能

### 事项看板

- 在 Harness 侧栏或对话顶部栏打开番茄工作台，按状态展示事项。
- 支持标题、编号、创建人搜索，以及负责人、空间、类型和状态筛选。
- 支持拖动状态列调整顺序、手动置灰卡片；偏好保存在当前浏览器。
- 每条泳道内的卡片按创建时间倒序排列，最新创建的卡片显示在最上方。
- 点击卡片优先打开已关联对话；未关联时选择 Harness 项目并创建对话。
- 卡片上的独立外链按钮可直接打开番茄事项。
- 对话顶部栏支持查询状态和执行流转；“待测试”因必填字段失败时，可交给当前 AI 对话继续处理。

### 迭代投入

- 顶部栏对齐 Harness 对话页样式；顶部 Tab 切换「事项看板 / 任务日历 / 迭代投入」，迭代选择器支持切换迭代并记住上次选择。
- 左侧切换负责人，展示故事点总数、环形分布图和需求列表。
- 需求卡片与事项看板共用对话关联逻辑，点击打开已有对话或选择项目创建新对话；独立的 ↗ 按钮跳转番茄。
- 右侧团队以折叠卡片管理：创建、改名、删除团队，添加或移除成员，成员行以背景比例条展示故事点。
- 点击排行榜成员可切换左侧负责人；第一个团队默认展开并加载，其他团队按展开需要加载。
- 点击团队成员行可切换左侧负责人；第一个团队默认展开并加载，其他团队按展开需要加载。
- 团队、成员及负责人选择保存在当前浏览器，不同步到番茄或其他设备。

统计读取卡片的 `StoryPoint` 字段，仅包含所选迭代中的 `Story`、`EnablerStory` 和 `Task`，包含全部状态。未填写故事点的需求保留在列表，不参与总数和饼图；0 点保留为已估点记录，不占饼图面积。多负责人需求分别计入各负责人。需要调整故事点时，使用外链按钮进入番茄修改，然后刷新统计。

## 0.3.1 更新

团队成员行选中与悬停改为边框高亮（选中实线、悬停半透明），选中头像实心；SP 背景进度条不透明度提高一倍。

## 0.3.0 更新

顶部栏对齐 Harness 对话页样式；团队改为折叠卡片并支持创建、改名、删除与成员管理；全站统一胶囊 Tag 组件（仅类型带色）；空间筛选改为多选下拉并按当前负责人事项派生；迭代统计严格限定 Story / EnablerStory / Task；需求卡片显示状态与未估点标记。

## 0.2.0 更新

新增「迭代投入」页面、多个团队管理和个人故事点分布；需求卡片支持打开 Harness 对话及独立跳转番茄；完善顶部栏、看板筛选与状态列排序。

## 必备环境

- DeepSeek Harness Developer Preview（Web 或 Desktop profile）。
- Node.js `^22.19.0 || >=24.0.0`。
- pnpm（Harness 当前使用 `11.7.0`）。
- **Gitee CLI 是必需依赖**，并且需要包含 `gitee team item search` 命令的 Team 版本。
- Gitee CLI 中已配置并登录可访问番茄的 profile，默认使用 `osc`。

安装插件前建议先检查：

```bash
gitee version
gitee config list
gitee team item search --profile osc --page 1 --size 1 --iql "负责人 = currentUser()"
```

插件只调用本机的 `gitee` CLI，不保存 Gitee PAT 或登录信息。

DSH Desktop 从 Finder 启动时可能无法继承终端的完整 `PATH`。如果 Desktop 中提示找不到 `gitee`，请把 `executable` 配置为 Gitee CLI 的绝对路径，可通过下面的命令查询：

```bash
command -v gitee
```

## 安装

当前版本：`0.3.3`。已安装用户在对应 profile 目录升级：

```bash
cd ~/.dsh/profiles/desktop # Web 用户改为 web
pnpm add @stephen1620/dsh-tomato-board@0.3.3
```

保留已有 `dsh.profile.bundles` 注册项，升级后完全退出并重新打开 Harness。


### 从 npm 安装（推荐）

```bash
npx @deepseek-ai/dsh plugin --profile web add @stephen1620/dsh-tomato-board
npx @deepseek-ai/dsh web
```

### 从 GitHub 安装

仓库已包含构建产物，可以直接安装指定版本：

```bash
npx @deepseek-ai/dsh plugin --profile web add \
  "github:StephenLGF/dsh-plugins#path:/plugins/tomato-board"
npx @deepseek-ai/dsh web
```

也可以 clone 后从本地目录安装：

```bash
git clone https://github.com/StephenLGF/dsh-plugins.git
cd dsh-plugins/plugins/tomato-board
npx @deepseek-ai/dsh plugin --profile web add .
npx @deepseek-ai/dsh web
```

安装命令会识别包中的 `dsh.bundle`，自动把 `cordis.patch.yml` 加入 Web profile，无需手工修改 Harness 配置。

安装到 DSH Desktop 时，将命令中的 profile 改为 `desktop`：

```bash
npx @deepseek-ai/dsh plugin --profile desktop add .
```

卸载：

```bash
npx @deepseek-ai/dsh plugin --profile web remove @stephen1620/dsh-tomato-board
```

## 配置

默认配置位于 [`cordis.patch.yml`](./cordis.patch.yml)：

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `executable` | `gitee` | Gitee CLI 可执行文件名或绝对路径 |
| `profile` | `osc` | Gitee CLI profile |
| `iql` | 空字符串 | 看板附加查询条件，负责人由界面选择；不影响迭代投入统计 |
| `tomatoOrigin` | `https://osc.gitee.work` | 番茄站点地址 |
| `tomatoTenant` | `xly-poc` | 番茄租户 |
| `cacheTtlMs` | `15000` | 事项查询缓存时间（毫秒，最大 300000） |
| `maxItems` | `5000` | 单次最多读取的事项数（最大 20000） |
| `excludedStatuses` | `测试通过` 等 | 不在工作台展示的状态列表 |
| `priorityNames` | 常用 P0–P4 UUID 映射 | 按租户覆盖优先级 UUID 与显示名的对应关系 |

如需覆盖配置，可在 Harness 的用户 patch 中对 `tomato-board` 节点进行修改。最终生效配置可用下面的命令检查：

```bash
npx @deepseek-ai/dsh --profile web --dump-config
```

## 开发与构建

在本仓库直接构建，源码与 `lib/` 产物均留在 `plugins/tomato-board`，无需复制到 Harness：

```bash
npm run build:tomato-board
```

构建工具仍使用已安装依赖的 Harness checkout，默认查找本仓库同级的 `deepseek-harness`。其他位置可显式指定：

```bash
DSH_HARNESS_ROOT=/absolute/path/to/deepseek-harness npm run build:tomato-board
```

本机 desktop、web profile 的 `node_modules/@stephen1620/dsh-tomato-board` 软链直接指向本仓库 `plugins/tomato-board`。前端构建后刷新页面加载；服务端改动需要重启 DSH。构建期间应用可能读到正在更新的产物，构建成功后再刷新。`lib` 提交到 Git，安装已发布的包不需要本地构建环境。

## 发布

版本号采用语义化版本。建议每次发布同时创建 Git tag 和 GitHub Release：

```bash
cd plugins/tomato-board
npm version patch --no-git-tag-version # 或 minor / major
git add package.json
git commit -m "release(tomato-board): v0.2.0"
git tag tomato-board-v0.2.0
git push origin main --follow-tags
```

如果需要 npm 一键安装，再执行：

```bash
npm login
pnpm publish --access public
```

`prepack` 会检查 `lib` 是否完整且客户端产物是否与当前源码一致，不会在独立仓库中重新执行依赖 Harness workspace 的构建。

作用域包首次发布必须使用 `--access public`。发布前应确认 npm 账号拥有 `@stephen1620` scope；如果没有，需要改用自己可发布的 scope，并同步修改包名、README 安装命令和 Harness 卸载命令。

## License

[MIT](./LICENSE)

## 任务日历（工时管理）

工作台的「任务日历」页签显示以本周为中心、前后各两周的日历，周六、周日作为每周的前两列。点击某一天，或按住鼠标划选连续几天，松开指针后立刻弹出「选择需求」下拉框，选定后直接进入该需求的工时分配；不需要先选需求，也不再提供左侧需求池和拖拽。一个连续日期范围保存为一个时间段，同一需求可以有多个时间段。

工时分配按需求聚合：同一需求的所有时间段合并为一个计划，点击任意时间段的卡片打开的都是同一个弹窗，人天合计按全部日期去重计算，且不能超过总天数（可以少于，剩余时间保持未分配）。阶段按需求与项目理解、方案设计、功能开发、联调与验证、Bug 修复填写人天，每个阶段至少 0.5 人天并按 0.5 递增；留空或填 0 的阶段视为不分配，直接跳过。需求安排不可删除；未被 Task 锁定的时间段可以改期或新增，已创建 Task 覆盖的时间段锁定；新增时间段仍可分批创建。每个已分配阶段创建一个直属 Task。标题由需求主题和阶段动作生成，可在确认前修改；阶段输入仅在弹窗中保留，保存时间段不会保存阶段草稿。所属项目及负责人从需求实时继承，团队和工时成本归属参考需求或同项目近期任务的一致取值，缺失时必须手动选择；API 不假设网页的字段联动会执行。分类仅允许软件开发和修复 BUG 对应的当前选项。

创建 Task 时统一填写计划日期与预估工作量，并同时将实际工作量、实际开始与完成日期填写为与计划一致；服务器按实时字段约束校验，计划字段及必填字段超范围时拒绝提交；可选的实际工时字段超范围时整组跳过，并展示跳过记录。阶段按该需求全部日期的先后顺序安排，每天容量为 1 人天，0.5 人天的阶段可以与其他阶段共享同一天。周末仅作视觉区分，不自动排除。

历史安排和每个 Task 的创建结果保存到 `$DSH_HOME/tomato-worktime/<配置范围摘要>.json`（未设置 DSH_HOME 时使用 `~/.dsh`）。可在插件配置中设置 `worktimeDataFile` 更换路径。文件按 profile、番茄域名和租户隔离，原子替换并串行写入；刷新、翻周和重启均不清除。显示区间内当前登录人的番茄历史 Task 独立读取，包含已完成事项，不继承看板状态过滤。

创建前保存操作记录，逐个创建并回读核对父故事、标题、项目、负责人、分类、人天和日期。失败时停止并保留已成功、未开始、结果待核对的记录；未知结果不自动重试；有 Task 编号时拒绝直接重建，无编号时须先人工核对并确认重试。已创建 Task 覆盖的时间段不可直接改期或整批重建。进程异常退出遗留的 `.lock` 文件需先核对创建结果并确认无其他工作台写入，再人工解除；本版本不自动恢复未知写入。

插件的服务端路由在 DSH 进程启动时注册，前端 bundle 则随页面刷新：重新构建后必须完全退出并重新打开 DSH（仅刷新页面只更新界面），否则创建 Task 会提示“工时服务仍是旧版本”。

桌面进程 PATH 缺少用户目录时，插件会查找 `~/.local/bin/gitee`、`~/go/bin/gitee` 和常用安装目录；也可在配置 `executable` 中指定绝对路径。无法定位时返回具体配置提示。

### Task 删除与拖拽改期

需求安排不可删除，原有删除接口也会拒绝操作。点击 Task 打开详情，可修改计划起止日期或确认移入番茄回收站；删除 Task 可能连同其后代一起回收，确认界面会明确提示。需求安排和其他 Task 保留。

当前登录用户可将 Task 时间条拖到目标日期，按拖动天数平移计划起止日期并保留时长；拖住跨周 Task 的中间日期时以实际抓取日期为基准。Task 可以移到需求原时间段之外，日历仍会展示。需求时间条也可以拖动：以当前时间段为单位，仅移动该段；同需求的其他时间段及所有 Task 保持原位。需求和 Task 的左右边缘均提供拖拽手柄，可调整开始、结束日期；需求边缘只调整需求时间段，Task 日期保持不变。改期仅更新计划日期，实际日期与人天保持不变。其他负责人的日历只读。

拖动或调整需求时间段后，同一需求连续或重叠的时间段自动合并，跨周同样生效。合并保留所有 Task 的日期、创建结果与待核对记录，不更新番茄 Task。

Task 弹窗提供计划日期、删除和关联 Bug。关联区域显示 Bug 的最新状态，优先从父需求的实现层级（后代缺陷）提供候选，并支持按标题或编号搜索其他缺陷。选择后通过番茄原生 `Relations` 字段关联，先显示结果，再后台提交；失败时撤回预显示并提示核对。当前 osc/xly-poc 使用其原生 Relates 类型；其他租户通过 `bugLinkTypeId` 和 `bugLinkNames`（该类型的 inward/outward 文案）配置关联类型。关系不在本地另存。

日历 Task 右侧用红色数字显示已关联 Bug 的数量（包括已关闭的 Bug，未关联时不显示）。数量独立后台读取，每批最多并行查询 3 个 Task，使用 30 秒内存缓存；只统计实际关联，不计父需求候选。弹窗关联与回退会立即同步红标，旧的后台结果不会覆盖新数量；其他负责人的 Task 同样支持查看。

服务端写入前校验事项类型、当前负责人和原日期；改期后回读验证。同步结果未知时保留操作日志并拒绝重复写入，需要先在番茄核对。重建前端后刷新加载，新增 Task 同步、Bug 关联接口需要重启 DSH。

日历最大宽度 1280px、高度 640px，使用 `margin: auto` 居中，工具栏与日历等宽对齐，小窗口自动缩小。拖动、调整边缘和删除会先更新日历显示，再后台同步；同步期间保留日历内容，旧读取结果不会覆盖预显示。失败时撤回预显示并提示原因。需求拖动仅保存当前时间段的本地日期，不调用番茄 Task 更新接口。

拖动时间条或其边缘时，会高亮整个预览日期范围，并在日历上方显示起止日期；范围可跨周，仅高亮本次拖动的时间段。整周内所有日期格子（包括时间条覆盖的位置）都能接收拖放，松开时按实际预览日期保存。左右手柄使用 14px 触发区，起止边界不会互相越过。

每周是独立的纵向滚动区域：卡片按泳道撑开周内容，超出周高度时可滚动查看全部卡片，日期数字保持在该周顶部。周标题和日期列预留相同滚动条空间，拖放按周内容区域识别日期，跨周高亮继续保留。

事项看板按负责人将最近一次成功读取的列表缓存在当前浏览器 localStorage。刷新页面或重新打开时优先展示缓存，并后台读取最新数据；读取失败保留已有卡片并显示错误。成功返回空列表也会覆盖旧缓存。切换负责人会切换对应缓存并取消旧请求，避免不同负责人的返回结果串用。第一次使用或缓存不可用时仍需完成一次服务器读取。
