# 同一事项的详情状态与搜索状态不一致

核对时间：2026-10-28 14:50（Asia/Shanghai）。

- 环境：`https://osc.gitee.work`，租户 `xly-poc`。
- 事项：`proxima-59478`，事项 ID：`GSNFmBPxGi`。
- CLI：`1.0.0-team.20260813.7`，commit `c768e8e82f1254e2163c64f536e775e2ad0d0c9d`。

## CLI 复现

```sh
gitee team item view proxima-59478 --profile osc --output json

gitee team item search --iql 'key = "proxima-59478"' \
  --size 1 --fields key,status,itemType --profile osc --output json
```

详情查询返回的 `status` 核心字段：

```json
{"objectId":"NAdDkq70zT","name":"不修复","type":"InProgress"}
```

搜索命中 `proxima-59478`，`count=1`，但其 `status` 为：

```json
{"objectId":"HqdG1eLkKc","name":"新建","type":"Start"}
```

## 独立 MCP 交叉验证

`getItemDetail` 参数：

```json
{"itemKey":"proxima-59478","detail":"compact","fields":["状态"],"includeComments":false,"includeEmpty":false}
```

返回核心字段：

```json
{"itemId":"GSNFmBPxGi","itemKey":"proxima-59478","value":{"状态":"不修复"}}
```

`searchItems` 参数：

```json
{"find":{},"iql":"key = \"proxima-59478\"","fields":["状态"],"resultMode":"compact","size":1,"from":0}
```

返回核心字段：

```json
{"count":1,"items":[{"itemId":"GSNFmBPxGi","itemKey":"proxima-59478","状态":{"objectId":"HqdG1eLkKc","name":"新建","type":"Start"},"status":"新建"}]}
```

## 排查结论

两个独立查询链路都复现“详情为不修复、搜索为新建”，且事项 ID 一致。因此可以排除工作台页面缓存或 CLI 单独的结果展示问题作为唯一原因。

建议反馈为“详情读取与搜索读取的状态不一致”，请平台核查搜索数据源、状态更新后的索引同步及缓存失效。现有证据不能直接确认具体内部故障点。本次只执行了读取，没有修改事项状态。
