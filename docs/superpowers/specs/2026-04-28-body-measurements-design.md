# 身体围度总览页面设计

## 概述

为 FitLC 用户提供身体围度总览页面，集中展示用户所有部位的围度数据，支持快速查看最新围度和历史趋势。

## 背景

当前用户通过 AI 对话记录围度，分散在对话消息中，缺乏统一的查看入口。用户需要：
- 集中查看所有部位的最新围度
- 快速识别未填写的部位
- 了解各部位围度变化趋势

## 设计

### 部位定义

围度部位共 12 项：

| 部位 | body_part 值 | 说明 |
|---|---|---|
| 颈围 | `neck` | 新增 |
| 胸围 | `chest` | 已有 |
| 肩宽 | `shoulder` | 新增 |
| 左臂围 | `biceps_l` | 现有 biceps 拆分 |
| 右臂围 | `biceps_r` | 现有 biceps 拆分 |
| 腰围 | `waist` | 已有 |
| 臀围 | `hips` | 已有 |
| 左大腿围 | `thigh_l` | 现有 thighs 拆分 |
| 右大腿围 | `thigh_r` | 现有 thighs 拆分 |
| 左小腿围 | `calf_l` | 现有 calves 拆分 |
| 右小腿围 | `calf_r` | 现有 calves 拆分 |

**body_part 枚举变更：**
```prisma
body_part String @map("body_part") @db.VarChar(20)
// 旧: chest/waist/hips/biceps/thighs/calves/other
// 新: neck/chest/shoulder/biceps_l/biceps_r/waist/hips/thigh_l/thigh_r/calf_l/calf_r/other
```

### 数据迁移

现有 `biceps` 记录迁移到新格式时，默认同步到 `biceps_l` 和 `biceps_r`（左右对称），无需用户重新录入。

```sql
-- 迁移脚本示例
UPDATE measurement_items
SET body_part = 'biceps_l'
WHERE body_part = 'biceps';

INSERT INTO measurement_items (measurement_id, body_part, value)
SELECT measurement_id, 'biceps_r', value
FROM measurement_items
WHERE body_part = 'biceps_l';
```

### AI 对话录入逻辑

- 用户明确说「左臂」「右臂」→ 记录对应侧（`biceps_l` 或 `biceps_r`）
- 用户只说「臂围」→ 同时记录 `biceps_l` 和 `biceps_r`（默认值相同）
- 同样逻辑适用于 thigh/calf

### 页面结构

```
/measurements
├── 页面标题
├── 部位卡片网格（2列 × 6行）
│   └── 每个部位一行：部位名 + 数值 + 单位 + 趋势图标
├── 底部快捷操作
│   └── "通过对话记录" 跳转 /chat
└── 空状态（全部未填写）
    └── 引导用户开始记录
```

### 部位卡片

每个部位显示：
- 部位名称（左侧）
- 最新数值 + 单位 cm（右侧）
- 趋势图标 + 颜色：↑ 红色（上升）/ ↓ 绿色（下降）/ — 灰色（持平/无历史）
- 空状态：显示 "—" 灰色

### 趋势计算

```
trend = latest_value - previous_value
if trend > 0: "↑"
if trend < 0: "↓"
if trend == 0 or no previous: "—"
```

### API 设计

| 方法 | 路径 | 描述 |
|---|---|---|
| GET | `/api/users/me/measurements/latest` | 获取所有部位最新围度 |
| GET | `/api/users/me/measurements/history?bodyPart=chest&page=1&limit=10` | 获取某部位历史记录（分页） |

**GET `/api/users/me/measurements/latest` 响应：**
```json
{
  "measurements": {
    "neck": { "value": 38.5, "date": "2026-04-20" },
    "chest": { "value": 94, "date": "2026-04-20" },
    "shoulder": null,
    "biceps_l": { "value": 34, "date": "2026-04-15" },
    "biceps_r": { "value": 34, "date": "2026-04-15" },
    "waist": { "value": 78, "date": "2026-04-20" },
    "hips": { "value": 95, "date": "2026-04-20" },
    "thigh_l": null,
    "thigh_r": null,
    "calf_l": null,
    "calf_r": null
  }
}
```

**GET `/api/users/me/measurements/history?bodyPart=chest&page=1&limit=10` 响应：**
```json
{
  "bodyPart": "chest",
  "history": [
    { "value": 94, "date": "2026-04-20" },
    { "value": 93.5, "date": "2026-03-15" },
    { "value": 92, "date": "2026-02-01" }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15
  }
}
```

## 实施步骤

1. **数据库**：扩展 `MeasurementItem.body_part` 支持新枚举值，执行数据迁移（biceps → biceps_l + biceps_r）
2. **后端 API**：在 `users.ts` 路由新增 `measurements/latest` 和 `measurements/history`
3. **后端服务**：扩展 `userService.ts` 或新建 `measurementService.ts`
4. **前端 API**：新增 `userApi.getMeasurementsLatest()` 和 `getMeasurementsHistory()`
5. **前端页面**：新建 `Measurements.tsx`
6. **前端组件**：新建 `MeasurementCard` 组件
7. **前端路由**：配置 `/measurements` 路由
8. **空状态 / 引导**：显示引导用户记录

## 验收标准

- [ ] 页面展示 12 个部位的当前围度
- [ ] 未填写的部位显示为空状态
- [ ] 有记录的部位显示趋势图标
- [ ] 点击部位可查看该部位历史记录
- [ ] 页面有空状态引导