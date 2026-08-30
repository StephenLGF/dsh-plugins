# DSH Plugins

面向 DeepSeek Harness 的第三方插件集合。

## 插件

| 插件 | npm 包 | 说明 |
| --- | --- | --- |
| [番茄工作台](./plugins/tomato-board) | `@stephenlgf/dsh-tomato-board` | Gitee Team（番茄）工作台与 Harness 原生对话联动 |

每个插件都在 `plugins/` 下独立维护，拥有自己的 README、版本号、构建产物和 npm 发布配置。

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
