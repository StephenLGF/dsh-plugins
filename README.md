# DSH Plugins

面向 DeepSeek Harness 的第三方插件集合。

## 插件

| 插件 | npm 包 | 说明 |
| --- | --- | --- |
| [番茄工作台](./plugins/tomato-board) | `@stephen1620/dsh-tomato-board` | 事项看板、任务日历、PR 助手、团队管理与 Harness 原生对话联动（0.3.5） |

每个插件都在 `plugins/` 下独立维护，拥有自己的 README、版本号、构建产物和 npm 发布配置。

## 番茄工作台

四个页签依次为事项看板、任务日历、PR 助手和团队管理。支持 Task 与跟踪任务日历、需求工时分配、继承父需求迭代、关联 Bug 和每周一键报工；需求排期保存在本地，Task 日期、负责人、状态和 Bug 关联以番茄为准。

安装、配置、数据存储与开发方式见 [番茄工作台 README](./plugins/tomato-board/README.md)。仓库包含构建产物，从 GitHub 或本地目录安装后，服务端更新需完全退出并重启 DSH。

## 仓库结构

```text
dsh-plugins/
├── plugins/
│   └── tomato-board/
├── package.json
└── pnpm-workspace.yaml
```

具体安装、配置和开发说明请进入对应插件目录查看。

## License

各插件的许可证以其目录中的 `LICENSE` 为准。
