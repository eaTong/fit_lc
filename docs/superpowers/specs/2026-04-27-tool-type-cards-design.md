# 对话工具类型卡片展示设计

## 概述

为 AI 对话消息扩展基于工具类型的卡片展示，使不同类型的工具调用（训练记录、围度记录、计划生成、查询统计等）在前端以最适合的卡片形式呈现。

## 背景

当前 `ChatMessage.tsx` 仅以纯文本渲染所有 assistant 消息，仅通过检测 `"已保存"` 等关键字显示撤销按钮。系统有 7 个后端工具，但 `SavedData` 类型仅支持 `workout`/`measurement` 两种，无法覆盖：

- 计划生成（`generate_plan`）
- 执行分析（`analyze_execution`）
- 计划调整（`adjust_plan`）
- 记录查询（`query_workout`、`query_measurement`）

## 设计

### 类型扩展

```typescript
// frontend/src/types/index.ts

export type ToolType = 'workout' | 'measurement' | 'plan' | 'query' | 'analysis' | 'adjustment';

export interface SavedData {
  type: ToolType;
  id: number;
  meta?: {
    planId?: number;
    queryResult?: unknown;
    analysisReport?: unknown;
  };
}
```

### 工具→类型映射

| 后端工具 | ToolType | 触发场景 |
|---|---|---|
| `save_workout` | `workout` | 记录训练 |
| `save_measurement` | `measurement` | 记录围度 |
| `generate_plan` | `plan` | 生成健身计划 |
| `query_workout` | `query` | 查询训练统计 |
| `query_measurement` | `query` | 查询围度统计 |
| `analyze_execution` | `analysis` | 分析计划执行 |
| `adjust_plan` | `adjustment` | 调整健身计划 |

### 前端渲染架构

```
ChatMessage.tsx
    ↓ message.savedData?.type
    ├─ 'workout'     → WorkoutCard
    ├─ 'measurement' → MeasurementCard
    ├─ 'plan'        → PlanCard (新建)
    ├─ 'query'       → QueryResultCard (新建)
    ├─ 'analysis'    → AnalysisCard (新建)
    ├─ 'adjustment'  → PlanAdjustCard (新建)
    └─ 无 type       → 纯文本渲染
```

### 组件清单

| 组件 | 用途 | 备注 |
|---|---|---|
| `WorkoutCard` | 训练记录卡片 | 已存在，可能需适配 |
| `MeasurementCard` | 围度记录卡片 | 已存在，可能需适配 |
| `PlanCard` | 计划概览卡片 | 新建，显示计划名称/周期/频率 |
| `QueryResultCard` | 查询结果卡片 | 新建，显示统计汇总数据 |
| `AnalysisCard` | 执行分析卡片 | 新建，显示完成率/建议 |
| `PlanAdjustCard` | 调整确认卡片 | 新建，显示调整内容摘要 |

### 数据流

1. **后端**：工具执行完成后返回标记格式
   - 格式：`__SAVED_TYPE__:{type}:{id}:{json_meta}__MESSAGE__`
   - 示例（计划）：`__SAVED_TYPE__:plan:123:{"name":"增肌计划"}__MESSAGE__计划已生成...`

2. **API 层**（`chatApi.sendMessage`）：解析返回，提取 `savedData`

3. **Store 层**（`chatStore`）：`savedData` 存入 `ChatMessage`

4. **UI 层**（`ChatMessage.tsx`）：根据 `savedData.type` 渲染对应卡片

### 后端兼容

现有 `save_workout`/`save_measurement` 返回格式：
```
__SAVED_ID__:{id}:{type}__{message}
```

扩展为统一格式：
```
__SAVED_TYPE__:{type}:{id}:{meta_json}__MESSAGE__{message}
```

兼容层：旧消息无 `__SAVED_TYPE__` 前缀，走原有解析逻辑。

## 待验证

1. 现有 `WorkoutCard`/`MeasurementCard` 组件结构是否可直接复用
2. 计划相关 API 返回的数据结构
3. 是否需要为查询结果设计专门的统计展示组件

## 实施步骤（初稿）

1. 扩展 `SavedData` 类型定义
2. 统一后端工具返回格式
3. 前端 chatApi 增加解析逻辑
4. 新建各类型卡片组件
5. 修改 `ChatMessage.tsx` 实现条件渲染
6. 适配现有撤销逻辑（`handleUndo`）

## 验收标准

- [ ] 不同工具类型在前端显示对应类型的卡片
- [ ] 卡片内显示关键的汇总信息（非纯文本）
- [ ] 撤销功能仍然正常工作
- [ ] 向后兼容现有 `workout`/`measurement` 类型