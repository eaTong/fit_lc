# AI 动作变体分析脚本设计

**日期：** 2026-04-28
**状态：** 设计完成，待实施

---

## 1. 目标

写一个一次性脚本，通过 AI 分析现有动作库，自动识别变体关系并生成差异说明，输出报告供人工确认。

---

## 2. 脚本流程

```
1. 读取所有 status='published' 的动作
2. 按名称相似度分组（相同关键词如「卧推」「深蹲」）
3. 对每组内的动作对调用 AI，分析变体关系
4. 输出 JSON 报告供人工确认
5. （后续）管理员执行导入 SQL
```

---

## 3. 分组策略

**名称相似度判断：**
- 提取动作名称中的核心词（如「杠铃」「哑铃」「上斜」「下斜」）
- 包含相同核心词的动作分到同一组
- 例如：「杠铃卧推」「哑铃卧推」「上斜哑铃卧推」→「卧推」组

**过滤：**
- 同一组内至少 2 个动作才需要分析
- 排除名称完全相同的动作

---

## 4. AI 分析逻辑

### 4.1 输入

每对动作的详细信息：
```json
{
  "exerciseA": {
    "name": "杠铃卧推",
    "category": "chest",
    "equipment": "barbell",
    "difficulty": "intermediate",
    "description": "经典的胸肌训练动作..."
  },
  "exerciseB": {
    "name": "哑铃卧推",
    "category": "chest",
    "equipment": "dumbbell",
    "difficulty": "intermediate",
    "description": "相比杠铃，角度更自由..."
  }
}
```

### 4.2 AI Prompt

```
你是一个健身教练，分析以下两个动作是否为变体关系。

动作 A：
- 名称：{exerciseA.name}
- 器材：{exerciseA.equipment}
- 难度：{exerciseA.difficulty}
- 描述：{exerciseA.description || '无'}

动作 B：
- 名称：{exerciseB.name}
- 器材：{exerciseB.equipment}
- 难度：{exerciseB.difficulty}
- 描述：{exerciseB.description || '无'}

请判断：
1. A 和 B 是否互为变体？（排除：两者差异太大无法相互替代则不是变体）
2. 如果是变体关系：
   - variantType: equipment（器材不同）/ difficulty（难度不同）/ posture（姿势/角度不同）
   - differenceNotes: 从 A 切换到 B 时需要注意什么？（50字以内）

请以 JSON 格式返回：
{
  "isVariant": true/false,
  "variantType": "equipment" | "difficulty" | "posture" | null,
  "differenceNotes": "差异说明或空字符串",
  "reasoning": "判断理由"
}

要求：
- 只返回 JSON，不要其他内容
- 用中文回答
- differenceNotes 描述从 A 视角看切换到 B 的注意事项
```

### 4.3 输出格式

每对分析结果：
```json
{
  "exerciseA": { "id": 1, "name": "杠铃卧推" },
  "exerciseB": { "id": 5, "name": "哑铃卧推" },
  "isVariant": true,
  "variantType": "equipment",
  "differenceNotes": "重量需下调约20%，注意手臂角度控制",
  "reasoning": "两者目标肌肉相同，器材不同，可相互替代..."
}
```

---

## 5. 脚本输出

### 5.1 报告文件

生成 `exercise_variant_report.json`：
```json
{
  "generatedAt": "2026-04-28T10:00:00Z",
  "totalExercises": 100,
  "totalPairs": 45,
  "variantPairs": [
    {
      "exerciseA": { "id": 1, "name": "杠铃卧推" },
      "exerciseB": { "id": 5, "name": "哑铃卧推" },
      "isVariant": true,
      "variantType": "equipment",
      "differenceNotes": "重量需下调约20%，注意手臂角度控制"
    }
  ],
  "nonVariantPairs": [...],
  "errors": [...]
}
```

### 5.2 导入 SQL（供后续执行）

```sql
-- 变体关系导入模板（由管理员审核后执行）
INSERT INTO exercise_variants (exercise_id, variant_id, variant_type, difference_notes, created_at)
VALUES
  (1, 5, 'equipment', '重量需下调约20%，注意手臂角度控制', NOW()),
  (5, 1, 'equipment', '哑铃卧推更灵活，重量需相应调整', NOW());
```

---

## 6. 脚本文件结构

```
backend/scripts/
└── analyzeExerciseVariants.ts    # 主脚本
```

**依赖：**
- `exerciseAIService.ts` 中的 AI 调用逻辑复用
- Prisma Client 读取动作数据

---

## 7. 执行方式

```bash
cd backend
npx ts-node scripts/analyzeExerciseVariants.ts
```

**Dry-run 模式（默认）：**
只输出报告，不写入数据库

**实际执行：**
```bash
npx ts-node scripts/analyzeExerciseVariants.ts --execute
```

---

## 8. 错误处理

- AI 调用失败：记录错误，继续下一对
- 动作描述为空：跳过该动作对或标记为「数据不足」
- 速率限制：每对分析间隔 500ms

---

## 9. 后续步骤

1. 运行脚本生成报告
2. 管理员审核 `exercise_variant_report.json`
3. 如需调整，编辑报告或直接修改 SQL
4. 执行 SQL 导入变体关系
