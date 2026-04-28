# AI 动作变体分析脚本设计

**日期：** 2026-04-28
**状态：** 设计完成，待实施

---

## 1. 目标

写一个一次性脚本，通过 AI 分析现有动作库，自动识别变体关系并生成差异说明，输出报告供人工确认。

---

## 2. 脚本流程

```
1. 读取所有动作（包括 status='draft' 和 'published'）
2. 按名称相似度分组（相同关键词如「卧推」「深蹲」）
3. 对每组内的动作对调用 AI，分析变体关系
4. 输出 JSON 报告供人工确认
5. （后续）管理员执行导入 SQL
```

---

## 3. 分组策略

### 3.1 关键词提取

从动作名称中提取关键词进行匹配：

| 关键词类型 | 示例 | 说明 |
|-----------|------|------|
| 基础动作词 | 卧推、深蹲、划船、推肩、弯举、硬拉 | 动作模式的核心词 |
| 器材前缀 | 杠铃、哑铃、绳索、器械、自重 | 改变动作特性的主要因素 |
| 角度修饰 | 上斜、下斜、斜板、高位、低位 | 改变发力角度 |
| 握法/脚位 | 宽握、窄握、正握、反握 | 细节变化 |

### 3.2 分组规则

**规则 1：基础动作词相同 → 同组**
- 「杠铃卧推」「哑铃卧推」「上斜卧推」→ 都有「卧推」→ 同组

**规则 2：同组动作的变体维度**
- 同一基础动作词下，可能存在多种变体维度：
  - 器材维度：杠铃 vs 哑铃 vs 绳索 vs 器械
  - 角度维度：平卧 vs 上斜 vs 下斜
  - 难度维度：入门 vs 进阶 vs 高级

**规则 3：分组优先级**
1. 首先按基础动作词分组（如「卧推」组、「深蹲」组）
2. 同一基础动作词内，再按「器材」维度两两对比
3. 角度修饰词（上斜/下斜）作为 `posture` 变体类型

### 3.3 具体分组算法

```
1. 定义基础动作词列表：卧推、深蹲、划船、推肩、弯举、硬拉、臂屈伸、下拉、卷腹...

2. 对每个动作：
   a. 检查名称是否包含某个基础动作词
   b. 如果包含，该动作归入该基础动作词组
   c. 如果不包含任何基础动作词，归入「其他」组（单独处理）

3. 对每个基础动作词组（假设有 N 个动作）：
   a. 按器材类型进一步细分：barbell、dumbbell、cable、machine、bodyweight
   b. 在同一器材类型内，提取角度修饰词（上斜/下斜/斜板）
   c. 生成动作对：同器材+不同角度 的两两对比
   d. 跨器材对比：不同器材但同基础动作 的两两对比

4. 输出分组结果：
   {
     "卧推": {
       "barbell": ["杠铃卧推", "上斜杠铃卧推"],
       "dumbbell": ["哑铃卧推"],
       ...
     },
     ...
   }
```

### 3.4 过滤规则

- 同一组内少于 2 个动作：跳过
- 名称完全相同的动作：去重
- 只有一个器材类型的动作：可能无需分析（除非有角度差异）

---

## 4. AI 分析逻辑

### 4.1 输入

每对动作的详细信息：
```json
{
  "exerciseA": {
    "id": 1,
    "name": "杠铃卧推",
    "status": "published",
    "category": "chest",
    "equipment": "barbell",
    "difficulty": "intermediate",
    "description": "经典的胸肌训练动作..."
  },
  "exerciseB": {
    "id": 2,
    "name": "哑铃卧推",
    "status": "draft",
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
      "exerciseA": { "id": 1, "name": "杠铃卧推", "status": "published" },
      "exerciseB": { "id": 5, "name": "哑铃卧推", "status": "draft" },
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
