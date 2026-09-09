# DSH Plugins

面向 DeepSeek Harness 的第三方插件集合。

## 插件

| 插件 | npm 包 | 说明 |
| --- | --- | --- |
| [番茄工作台](./plugins/tomato-board) | `@stephen1620/dsh-tomato-board` | 事项看板、迭代投入与 Harness 原生对话联动（0.3.0） |
| [PR 助手](./plugins/pr-assistant) | `@stephen1620/dsh-pr-assistant` | 汇总 Open PR、显示分支、查看 diff 与 AI 评审（0.1.2） |

每个插件都在 `plugins/` 下独立维护，拥有自己的 README、版本号、构建产物和 npm 发布配置。

## 仓库结构

```text
dsh-plugins/
├── plugins/
│   ├── tomato-board/
│   └── pr-assistant/
├── package.json
└── pnpm-workspace.yaml
```

具体安装、配置和开发说明请进入对应插件目录查看。

## License

各插件的许可证以其目录中的 `LICENSE` 为准。
