# 肌肉库信息补充设计

## 需求概述

补充肌肉库的详细信息：起止点、功能、训练技巧。

## 1. 数据模型扩展

### 1.1 Muscle 模型新增字段

```prisma
model Muscle {
  // ... existing fields (id, name, group, parentId, sortOrder)

  // 新增：肌肉详情（结构化）
  origin        String?  @db.Text  // 起点
  insertion     String?  @db.Text  // 止点
  function      String?  @db.Text  // 功能
  trainingTips  String?  @db.Text  // 训练技巧
}
```

## 2. 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| origin | Text | 肌肉起点 |
| insertion | Text | 肌肉止点 |
| function | Text | 肌肉功能 |
| trainingTips | Text | 训练技巧 |

## 3. 实施步骤

1. 数据库迁移：添加 Muscle 新字段
2. 后端：更新 muscleRepository 支持新字段
3. 前端：肌肉详情页展示新增字段
