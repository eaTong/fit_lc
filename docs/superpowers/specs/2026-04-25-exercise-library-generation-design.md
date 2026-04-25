# 动作库批量生成设计

## 背景

FitLC 需要 500+ 动作覆盖完整健身动作体系。已建立肌肉层级数据（20 个主肌肉），现需要批量生成动作数据。

## 目标

500+ 动作，按肌肉群分批生成，每批审核后导入。

## 生成流程

```
1. AI 按 muscleId 分批生成动作 JSON
     ↓
2. 转换为 SQL seed 文件
     ↓
3. 执行 SQL 导入数据库
     ↓
4. 在 /exercises 页面审核
     ↓
5. 状态 draft → published
```

## 动作字段（最小集）

| 字段 | 说明 |
|------|------|
| name | 动作名称 |
| category | 分类（与肌肉群一致） |
| equipment | barbell/dumbbell/cable/machine/bodyweight/other |
| difficulty | beginner/intermediate/advanced |
| status | draft（待审核） |

注：muscles 关联、description、adjustmentNotes 等字段后续补充。

## 分批计划

| 批次 | 肌肉群 | 主肌肉数 | 预估动作数 |
|------|--------|----------|-----------|
| 1 | 胸部 (chest) | 3 | 50-70 |
| 2 | 背部 (back) | 5 | 80-100 |
| 3 | 腿部 (legs) | 4 | 80-100 |
| 4 | 肩部 (shoulders) | 2 | 40-60 |
| 5 | 手臂 (arms) | 3 | 60-80 |
| 6 | 核心 (core) | 4 | 50-70 |

## 输出文件

- `backend/scripts/seed-exercises-<muscle-group>.sql` — 每批生成的 SQL seed

## 状态

- [x] 胸部生成计划已确认
- [ ] 胸部动作生成中
- [ ] 背部生成计划
- [ ] 腿部生成计划
- [ ] 肩部生成计划
- [ ] 手臂生成计划
- [ ] 核心生成计划