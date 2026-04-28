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

// 工具类型
export type ToolType = 'workout' | 'measurement' | 'plan' | 'adjustment' | 'query' | 'analysis';

// 保存型工具 meta
export interface SaveMeta {
  type: ToolType;
  id: number;
}

// 查询型工具 meta
export interface QueryMeta {
  type: 'query';
  queryType: 'workout' | 'measurement';
  summary: {
    totalWorkouts?: number;
    totalVolume?: number;
    totalDuration?: number;
    changes?: Record<string, number>;  // bodyPart -> value change
  };
}

// 分析型工具 meta
export interface AnalysisMeta {
  type: 'analysis';
  completionRate: number;
  completed: number;
  skipped: number;
  pending: number;
  suggestions: string[];
}

// 统一 SavedData
export interface SavedData {
  type: ToolType;
  id?: number;  // 仅保存型工具有 id
  meta?: QueryMeta | AnalysisMeta;
}
```

### 工具→类型映射

| 后端工具 | ToolType | 是否保存型 | `id` 含义 | `meta` 内容 |
|---|---|---|---|---|
| `save_workout` | `workout` | ✅ | workout record id | — |
| `save_measurement` | `measurement` | ✅ | measurement record id | — |
| `generate_plan` | `plan` | ✅ | plan id | plan meta |
| `adjust_plan` | `adjustment` | ❌ | plan id | adjustment description |
| `query_workout` | `query` | ❌ | — | QueryMeta |
| `query_measurement` | `query` | ❌ | — | QueryMeta |
| `analyze_execution` | `analysis` | ❌ | — | AnalysisMeta |

**「保存型」vs「查询型」区分：**
- **保存型**：创建/修改实体，有撤销需求，`handleUndo` 有意义
- **查询型**：仅读取数据，无撤销概念，结果通过 `meta` 传递

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

### 后端返回格式

**保存型工具：**
```
__SAVED_TYPE__:{type}:{id}:{meta_json}__MESSAGE__{message}
```
示例（训练）：
```
__SAVED_TYPE__:workout:123:{}__MESSAGE__训练记录已保存，深蹲100kg 5组
```

**查询型工具：**
```
__SAVED_TYPE__:query:{queryType}:{queryMeta_json}__MESSAGE__{message}
```
示例（查询）：
```
__SAVED_TYPE__:query:workout:{"summary":{"totalWorkouts":5,"totalVolume":5000}}__MESSAGE__本周共训练5次，总容量5000kg
```

**分析型工具：**
```
__SAVED_TYPE__:analysis:{analysisMeta_json}__MESSAGE__{message}
```
示例（分析）：
```
__SAVED_TYPE__:analysis:{"completionRate":75,"completed":9,"skipped":1,"pending":2,"suggestions":["建议增加有氧"]}__MESSAGE__计划执行分析报告...
```

**调整型工具：**
```
__SAVED_TYPE__:adjustment:{planId}:{"description":"周三换成练胸"}__MESSAGE__{message}
```

兼容层：旧消息无 `__SAVED_TYPE__` 前缀，走原有解析逻辑。

## 待验证

1. 现有 `WorkoutCard`/`MeasurementCard` 组件结构是否可直接复用
2. 计划相关 API 返回的数据结构（plan meta）
3. 各后端工具 `func` 返回值是否已按新格式输出
4. `handleUndo` 需区分保存型（有id可撤销）和查询型（无id不显示撤销）

## 实施步骤（初稿）

1. 扩展 `SavedData` 类型定义（区分保存型/查询型）
2. 后端各工具 `func` 返回值适配新格式
3. 前端 chatApi 增加解析逻辑
4. 新建 `QueryResultCard` / `AnalysisCard` / `PlanCard` / `PlanAdjustCard` 组件
5. 修改 `ChatMessage.tsx` 实现条件渲染
6. 适配撤销逻辑（仅保存型显示撤销按钮）

## 验收标准

- [ ] 不同工具类型在前端显示对应类型的卡片
- [ ] 卡片内显示关键的汇总信息（非纯文本）
- [ ] 撤销功能仅对保存型工具显示
- [ ] 向后兼容现有 `workout`/`measurement` 类型