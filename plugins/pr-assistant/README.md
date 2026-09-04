# DSH PR Assistant

在 DeepSeek Harness 中汇总所有项目对应仓库的 Open Pull Request。

## 功能

- 自动读取 Harness 项目及其 Git `origin`
- 支持 GitHub 与企业 Gitee 仓库
- 汇总每个仓库的 Open PR 数量
- 查看 PR 标题、作者和更新时间；卡片上的外链图标可直接打开 PR
- 点击 PR 进入内置详情页，标题左侧可返回列表
- 详情展示分支、提交数、文件变更、增删行和冲突状态
- 文件差异支持逐文件展开，直接查看带增删色彩的具体 diff
- 点击提交数量可切换到独立的提交视图，并可返回 PR 总览
- 提交视图支持复制完整 Commit Hash，并按需展开每个提交自己的文件与 diff
- 可在详情页启动 AI 评审，并从 Harness 当前实际可用的模型中选择处理模型
- AI 评审会创建仓库对话并写入 PR 上下文，结果完成后自动回填到详情页
- 同一 PR 会绑定评审对话；已有结果时可“重新分析”并创建新会话
- 评审默认只读且回复简明，不修改代码、合并 PR 或发布评论
- 可隐藏仓库，并从隐藏列表中单选恢复；不会删除本地仓库或 Harness 项目
- 仓库和详情内容使用独立滚动区域，长列表可完整浏览
- 单个仓库失败时保留其他仓库结果

## 配置

企业 Gitee 仓库复用本机 Gitee CLI 登录态；GitHub 私有仓库或需要提高 API 限额时，可以配置令牌：

```yaml
- insert:
    - id: pr-assistant
      name: '@stephen1620/dsh-pr-assistant'
      config:
        executable: gitee
        profile: osc
        githubToken: YOUR_GITHUB_TOKEN
```

GitHub 令牌仅由服务端用于 API 请求，不会发送到浏览器。

## 安装

### 从 npm 安装（推荐）

在 DSH profile 目录下用 pnpm 安装，然后把包名加入 `dsh.profile.bundles`：

```bash
cd ~/.dsh/profiles/web
pnpm add @stephen1620/dsh-pr-assistant
npx @deepseek-ai/dsh web
```

安装后编辑 `~/.dsh/profiles/web/package.json`，在 `dsh.profile.bundles` 数组里追加 `"@stephen1620/dsh-pr-assistant"`，重启 DSH 即可加载。

DSH Desktop 将 `web` 换成 `desktop`：

```bash
cd ~/.dsh/profiles/desktop
pnpm add @stephen1620/dsh-pr-assistant
```

同样把包名加入 `desktop` profile 的 `dsh.profile.bundles`，然后重新打开应用。

### 从 GitHub 安装

仓库已包含构建产物，可以直接安装指定版本：

```bash
cd ~/.dsh/profiles/web
pnpm add "github:StephenLGF/dsh-plugins#path:/plugins/pr-assistant"
npx @deepseek-ai/dsh web
```

也可以 clone 后从本地目录安装：

```bash
git clone https://github.com/StephenLGF/dsh-plugins.git
cd ~/.dsh/profiles/web
pnpm add /absolute/path/to/dsh-plugins/plugins/pr-assistant
npx @deepseek-ai/dsh web
```

卸载：

```bash
cd ~/.dsh/profiles/web
pnpm remove @stephen1620/dsh-pr-assistant
```

记得同步从 `dsh.profile.bundles` 中移除该包名。

当前版本：`0.1.0`。

## AI 评审

打开任意 PR 详情后点击“AI 评审”，选择 Harness 模型并启动。助手会在该仓库对应的 Workspace 中创建独立对话、切换到所选模型，并要求它读取完整 PR 与 diff 后给出带文件位置和严重级别的简明评审结果。

模型列表来自 Harness 的实时模型目录，只展示当前可路由的模型；Harness 默认模型会被优先选中。

PR 与评审对话的关系保存在本地。分析进行中时详情页会显示处理状态；会话完成后，最新 AI 输出会回填到“AI 分析结果”。点击“打开评审对话”可查看完整上下文；点击“重新分析”会选择模型并创建新会话，随后替换当前绑定。

旧版本已经创建的评审对话，会按仓库路径和 PR 标题自动识别并补充绑定。如果绑定的对话已经删除，下次分析时会重新创建。

## 开发与构建

插件依赖 Harness workspace 包，需要将源码同步到 DeepSeek Harness monorepo 后构建：

```bash
rsync -a --exclude lib /path/to/dsh-plugins/plugins/pr-assistant/ \
  /path/to/deepseek-harness/packages/client/pr-assistant/
cd /path/to/deepseek-harness
pnpm exec tsc -b packages/client/pr-assistant
pnpm --dir packages/client/pr-assistant bundle
```

## 限制

- GitHub 单个仓库最多分页统计 5000 个 Open PR。
- 企业 Gitee 当前通过 CLI 最多读取 100 个 Open PR。
- GitHub 对超大或二进制文件可能不返回具体 patch，此时详情页会显示无法展示文本差异的提示。
