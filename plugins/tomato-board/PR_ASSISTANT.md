# PR 助手

打开番茄工作台第三个页签“PR 助手”，无需单独安装插件。

支持从 Harness 项目读取 Git origin，汇总 GitHub、企业 Gitee 的 Open PR；可查看分支、作者、文件 diff、提交详情，复制 Commit Hash，启动 AI 评审，或创建冲突处理会话。可隐藏和恢复仓库，单个仓库读取失败不影响其他结果。

## 配置

默认继承番茄工作台的 CLI 路径和 profile。如需配置 GitHub 私有仓库令牌或限定仓库访问范围，在 `tomato-board` 的 config 中添加：

```yaml
prAssistant:
  profile: osc
  githubToken: YOUR_GITHUB_TOKEN
  allowedRoots:
    - /Users/you/projects
```

企业 Gitee 继续复用本机 CLI 登录态。原有隐藏仓库设置、评审会话绑定和模型选择设置继续使用，卸载独立插件不会删除仓库或对话。

## 评审与冲突处理

AI 评审使用 Harness 的实时可用模型目录，在对应仓库创建评审对话；结果完成后回填到 PR 详情。默认评审只读，不修改代码、合并 PR 或发布评论。发布评审评论、冲突处理及推送仍由相应按钮单独触发。

PR 详情中可返回列表，按提交查看可返回 PR 总览。进入评审或冲突处理会话时，才会关闭工作台并跳转到对话。

PR 后端接口统一位于 `/api/tomato-board/pr/`，由番茄工作台提供。修改后端配置后需要重启 DSH。
