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

## 功能

### 事项看板

- 在 Harness 侧栏或对话顶部栏打开番茄工作台，按状态展示事项。
- 支持标题、编号、创建人搜索，以及负责人、空间、类型和状态筛选。
- 支持拖动状态列调整顺序、手动置灰卡片；偏好保存在当前浏览器。
- 点击卡片优先打开已关联对话；未关联时选择 Harness 项目并创建对话。
- 卡片上的独立外链按钮可直接打开番茄事项。
- 对话顶部栏支持查询状态和执行流转；“待测试”因必填字段失败时，可交给当前 AI 对话继续处理。

### 迭代投入

- 顶部栏对齐 Harness 对话页样式；顶部 Tab 切换「事项看板 / 迭代投入」，迭代选择器支持切换迭代并记住上次选择。
- 左侧切换负责人，展示故事点总数、环形分布图和需求列表。
- 需求卡片与事项看板共用对话关联逻辑，点击打开已有对话或选择项目创建新对话；独立的 ↗ 按钮跳转番茄。
- 右侧团队以折叠卡片管理：创建、改名、删除团队，添加或移除成员，成员行以背景比例条展示故事点。
- 点击排行榜成员可切换左侧负责人；第一个团队默认展开并加载，其他团队按展开需要加载。
- 点击团队成员行可切换左侧负责人；第一个团队默认展开并加载，其他团队按展开需要加载。
- 团队、成员及负责人选择保存在当前浏览器，不同步到番茄或其他设备。

统计读取卡片的 `StoryPoint` 字段，仅包含所选迭代中的 `Story`、`EnablerStory` 和 `Task`，包含全部状态。未填写故事点的需求保留在列表，不参与总数和饼图；0 点保留为已估点记录，不占饼图面积。多负责人需求分别计入各负责人。需要调整故事点时，使用外链按钮进入番茄修改，然后刷新统计。

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

当前版本：`0.3.0`。已安装用户在对应 profile 目录升级：

```bash
cd ~/.dsh/profiles/desktop # Web 用户改为 web
pnpm add @stephen1620/dsh-tomato-board@0.3.0
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

该插件依赖 Harness 尚未独立发布的 workspace 包，因此源码构建需要放在 Harness monorepo 中进行。不要使用目录软链；Harness 的插件发现不会遍历该软链。

```bash
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install

rsync -a --delete \
  --exclude .git \
  --exclude node_modules \
  --exclude lib \
  /absolute/path/to/dsh-plugins/plugins/tomato-board/ \
  packages/client/tomato-board/

pnpm exec tsc -b packages/client/tomato-board
pnpm --dir packages/client/tomato-board bundle
```

构建完成后，把 `packages/client/tomato-board/lib/` 同步回本仓库。`lib` 会提交到 Git，确保 GitHub 安装不依赖用户本地具备 Harness 源码构建环境。

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
