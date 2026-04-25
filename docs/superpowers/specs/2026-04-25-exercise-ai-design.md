# 动作库 AI 增强功能设计

## 背景

肌肉库已有完整的 AI 增强功能（`muscleAIService`、`/admin/muscles/generate` 接口、批量生成脚本）。动作库需要类似的能力，为动作生成详细步骤、安全提示、常见错误等描述性信息，并支持肌肉关联建议。

## 目标

1. 前端管理员在添加/编辑动作时，可通过「AI增强」按钮自动生成动作详情
2. 批量脚本可对数据库中所有动作生成 AI 详情，输出 JSON 供审核
3. AI 生成的肌肉关联仅作建议，管理员人工确认后采纳

## 生成的字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `steps` | Text | 动作步骤说明 |
| `safetyNotes` | Text | 安全注意事项 |
| `commonMistakes` | Text | 常见错误 |
| `adjustmentNotes` | Text | 调整说明 |
| `exerciseType` | String | 'compound'（复合动作）或 'isolation'（孤立动作） |
| `conversionGuide` | JSON | 变体转换指南 |
| `suggestedMuscles` | JSON | 建议关联的肌肉列表（含关系类型：agonist/synergist/antagonist/stabilizer） |

## 实现方案

### 1. 后端服务 (`src/services/exerciseAIService.js`)

新建 AI 服务文件，模式与 `muscleAIService.js` 一致：

```javascript
export const exerciseAIService = {
  async generateExerciseDetails(exercise, targetMuscles) {
    // 调用 MiniMax AI 生成动作详情
    // 返回: steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, suggestedMuscles
  }
};
```

### 2. 管理接口 (`src/routes/adminExercises.js`)

新增路由：

```javascript
// POST /api/admin/exercises/generate
router.post('/generate', async (req, res) => {
  const { name, category, equipment, difficulty, targetMuscles } = req.body;
  const details = await exerciseAIService.generateExerciseDetails({ name, category, equipment, difficulty }, targetMuscles);
  res.json(details);
});
```

### 3. 前端 API (`src/api/admin.ts`)

新增方法：

```typescript
async generateExerciseDetails(name, category, equipment, difficulty, targetMuscles?) {
  return client.post('/admin/exercises/generate', { name, category, equipment, difficulty, targetMuscles });
}
```

### 4. 前端管理页面 (`src/pages/admin/Exercises.tsx`)

- 在动作名称输入框后添加「AI增强」按钮
- AI 生成后自动填充所有详情字段
- 肌肉关联建议以勾选列表形式展示，管理员可选择采纳

### 5. 批量脚本 (`scripts/ai-generate-exercise-details.js`)

- 读取数据库所有动作（按 category/equipment 分类）
- 逐个调用 `exerciseAIService.generateExerciseDetails()`
- 输出 JSON 到 `./output/exercise-details-{date}.json`
- 格式与肌肉脚本一致

## 数据流

```
前端 "AI增强" 按钮
    ↓
POST /api/admin/exercises/generate
    ↓
exerciseAIService.generateExerciseDetails()
    ↓
MiniMax AI API
    ↓
返回详情 + 肌肉关联建议
    ↓
前端填充表单字段 + 显示肌肉关联勾选框
```

## 输出 JSON 格式

```json
{
  "generatedAt": "2026-04-25",
  "exercises": [
    {
      "id": 1,
      "name": "杠铃卧推",
      "category": "chest",
      "equipment": "barbell",
      "difficulty": "intermediate",
      "steps": "...",
      "safetyNotes": "...",
      "commonMistakes": "...",
      "adjustmentNotes": "...",
      "exerciseType": "compound",
      "conversionGuide": {...},
      "suggestedMuscles": [
        { "id": 1, "name": "胸大肌", "role": "agonist" },
        { "id": 5, "name": "肱三头肌", "role": "synergist" }
      ]
    }
  ]
}
```

## 肌肉关联关系类型

| 关系 | 说明 |
|------|------|
| agonist | 主发力的肌肉 |
| synergist | 协同发力的肌肉 |
| antagonist | 拮抗肌（如卧推时起稳定作用） |
| stabilizer | 稳定肌 |

## 依赖

- `muscleAIService.js` 作为参考实现
- 现有 `exerciseRepository.ts` 提供动作数据
- 现有 `adminExercises.js` 路由结构

## 测试要点

1. 单个动作 AI 生成接口正常返回
2. 前端 AI 增强按钮正确填充所有字段
3. 批量脚本生成完整 JSON 文件
4. 肌肉关联建议格式正确可解析