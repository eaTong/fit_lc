# 动作库信息补充设计

## 需求概述

补充动作库的详细信息：动作详情（步骤、注意事项、常见错误）和变体关系（类型、转换指南）。

## 1. 数据模型扩展

### 1.1 Exercise 模型新增字段

```prisma
model Exercise {
  // ... existing fields (id, name, category, equipment, difficulty, ...)

  // 新增：动作详情（文本字段，先用简单实现）
  steps           String?  @db.Text    // 动作步骤说明
  safetyNotes     String?  @db.Text    // 注意事项
  commonMistakes  String?  @db.Text   // 常见错误
  exerciseType    String?             // 'compound' 复合动作 / 'isolation' 孤立动作

  // 新增：变体关系
  variantType     String?             // 变体类型：equipment / difficulty / posture
  conversionGuide Json?               // 变体转换指南
}
```

### 1.2 conversionGuide JSON 结构

```json
{
  "sourceEquipment": "barbell",
  "targetEquipment": "dumbbell",
  "formula": "哑铃重量约为杠铃的50-60%，每侧单独计算"
}
```

## 2. 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| steps | Text | 动作步骤说明，纯文本 |
| safetyNotes | Text | 安全注意事项 |
| commonMistakes | Text | 常见错误 |
| exerciseType | String | 'compound' 复合动作 / 'isolation' 孤立动作 |
| variantType | String | equipment 器械变体 / difficulty 难度变体 / posture 姿势变体 |
| conversionGuide | JSON | 变体转换公式，包含 sourceEquipment、targetEquipment、formula |

## 3. 实施步骤

1. 数据库迁移：添加 Exercise 新字段
2. 后端：更新 exerciseRepository 支持新字段
3. 前端：动作详情页展示新增字段

## 4. 前端展示

- 动作详情页展示：步骤、注意事项、常见错误、动作类型
- 变体切换时显示转换指南
