# DSH 番茄工作台

为 DeepSeek Harness Web 提供 Gitee Team（番茄）工作台和原生对话联动。

## 功能

- 在 Harness 侧栏打开番茄工作台，按状态展示当前用户负责的事项。
- 支持标题、编号、创建人搜索和事项类型筛选。
- 点击卡片时优先打开已关联的 Harness 对话。
- 尚未关联时选择 Harness 项目，并在对应仓库中创建原生对话。
- 在卡片和对话标题栏快速跳转到番茄事项页面。

当前版本不包含事项状态流转、拖拽和 AI 分析。

## 必备环境

- DeepSeek Harness Developer Preview（Web profile）。
- Node.js `^22.19.0 || >=24.0.0`。
- pnpm（Harness 当前使用 `11.7.0`）。
- **Gitee CLI 是必需依赖**，并且需要包含 `gitee team item search` 命令的 Team 版本。
- Gitee CLI 中已配置并登录可访问番茄的 profile，默认使用 `osc`。

安装插件前建议先检查：

```bash
gitee version
gitee config list
gitee team item search --profile osc --page 1 --page-size 1 --iql "负责人 = currentUser()"
```

插件只调用本机的 `gitee` CLI，不保存 Gitee PAT 或登录信息。

## 安装

### 从 npm 安装（发布 npm 后推荐）

```bash
npx @deepseek-ai/dsh plugin --profile web add @stephenlgf/dsh-tomato-board
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

卸载：

```bash
npx @deepseek-ai/dsh plugin --profile web remove @stephenlgf/dsh-tomato-board
```

## 配置

默认配置位于 [`cordis.patch.yml`](./cordis.patch.yml)：

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `executable` | `gitee` | Gitee CLI 可执行文件名或绝对路径 |
| `profile` | `osc` | Gitee CLI profile |
| `iql` | 当前用户负责的 Story、Bug 等 | 工作台查询条件 |
| `tomatoOrigin` | `https://osc.gitee.work` | 番茄站点地址 |
| `tomatoTenant` | `xly-poc` | 番茄租户 |

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
git commit -m "release(tomato-board): v0.1.1"
git tag tomato-board-v0.1.1
git push origin main --follow-tags
```

如果需要 npm 一键安装，再执行：

```bash
npm login
pnpm publish --access public
```

作用域包首次发布必须使用 `--access public`。发布前应确认 npm 账号拥有 `@stephenlgf` scope；如果没有，需要改用自己可发布的 scope，并同步修改包名、README 安装命令和 Harness 卸载命令。

## License

[MIT](./LICENSE)
