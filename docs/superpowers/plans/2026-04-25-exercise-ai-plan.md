# 动作库 AI 增强功能实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为动作库添加 AI 增强功能，支持前端单个动作生成和批量脚本生成

**Architecture:** 新建 `exerciseAIService.js` 作为 AI 生成核心服务，参考 `muscleAIService.js` 的模式。在 `adminExercises.js` 添加 `/generate` 路由，前端 API 和页面添加 AI 增强按钮，批量脚本生成 JSON 输出。

**Tech Stack:** Node.js + LangChain ChatAnthropic + MiniMax API, React + TypeScript

---

## 文件结构

```
backend/
├── src/
│   ├── services/
│   │   └── exerciseAIService.js     # 新建: AI 生成服务
│   └── routes/
│       └── adminExercises.js         # 修改: 添加 /generate 端点
├── scripts/
│   └── ai-generate-exercise-details.js  # 新建: 批量生成脚本
frontend/
├── src/
│   ├── api/
│   │   └── admin.ts                 # 修改: 添加 generateExerciseDetails
│   └── pages/
│       └── admin/
│           └── Exercises.tsx        # 修改: 添加 AI 增强按钮
```

---

## Task 1: 创建 exerciseAIService.js

**Files:**
- Create: `backend/src/services/exerciseAIService.js`
- Reference: `backend/src/services/muscleAIService.js`

- [ ] **Step 1: 创建 exerciseAIService.js 文件**

参考 `muscleAIService.js` 创建 `exerciseAIService.js`，使用相同的 MiniMax API 配置：

```javascript
import { ChatAnthropic } from "@langchain/anthropic";

function extractJson(text) {
  let jsonStr = text.trim();
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/) || text.match(/```json([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }
  jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
  return jsonStr;
}

async function generateExerciseDetails(exercise, targetMuscles, retries = 3) {
  const model = new ChatAnthropic({
    apiKey: process.env.MINIMAX_API_KEY,
    baseURL: "https://api.minimaxi.com/anthropic/v1",
    model: "MiniMax-M2.7",
    temperature: 0.7,
    maxTokens: 2048,
  });

  const prompt = `给定动作信息：
- 名称：${exercise.name}
- 肌肉群：${exercise.category}
- 器材：${exercise.equipment}
- 难度：${exercise.difficulty}
${targetMuscles ? `- 目标肌肉：${targetMuscles.map(m => m.name).join('、')}` : ''}

请为这个动作生成以下信息（JSON格式）：
{
  "steps": "动作步骤说明",
  "safetyNotes": "安全注意事项",
  "commonMistakes": "常见错误",
  "adjustmentNotes": "调整说明",
  "exerciseType": "compound 或 isolation",
  "conversionGuide": { "变体类型": "转换建议" },
  "suggestedMuscles": [
    { "name": "肌肉名称", "role": "agonist/synergist/antagonist/stabilizer" }
  ]
}

要求：
- 用中文回答
- steps 包含 4-6 步详细动作步骤
- safetyNotes 包含 2-3 条安全提示
- commonMistakes 包含 2-3 条常见错误
- exerciseType 为 'compound'（复合动作）或 'isolation'（孤立动作）
- suggestedMuscles 根据动作类型推荐相关肌肉，role 为 agonist(主发力)、synergist(协同)、antagonist(拮抗)、stabilizer(稳定)
- 只返回JSON，不要其他内容`;

  for (let attempt = 0; attempt < retries; attempt++) {
    let text;
    try {
      const response = await model.invoke(prompt);
      if (typeof response.content === 'string') {
        text = response.content;
      } else if (Array.isArray(response.content)) {
        const textPart = response.content.find(p => p.type === 'text');
        text = textPart?.text || '';
      }
      if (!text) {
        throw new Error('Empty response');
      }
      const jsonStr = extractJson(text);
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error(`AI 生成失败 (尝试 ${attempt + 1}/${retries}):`, e.message);
      if (attempt < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
      }
    }
  }
  throw new Error('AI 生成失败，请重试');
}

export const exerciseAIService = {
  async generateExerciseDetails(exercise, targetMuscles) {
    return generateExerciseDetails(exercise, targetMuscles);
  }
};
```

- [ ] **Step 2: 提交**

```bash
git add backend/src/services/exerciseAIService.js
git commit -m "feat: 添加 exerciseAIService AI 生成服务"
```

---

## Task 2: 修改 adminExercises.js 添加 /generate 端点

**Files:**
- Modify: `backend/src/routes/adminExercises.js`
- Add route for POST /api/admin/exercises/generate

- [ ] **Step 1: 在 adminExercises.js 顶部添加 exerciseAIService 导入**

```javascript
import { exerciseAIService } from '../services/exerciseAIService.js';
```

- [ ] **Step 2: 在 PATCH /:id/publish 路由后添加 /generate 路由**

```javascript
// POST /api/admin/exercises/generate - AI 生成动作详情
router.post('/generate', async (req, res) => {
  try {
    const { name, category, equipment, difficulty, targetMuscles } = req.body;
    if (!name || !category || !equipment || !difficulty) {
      return res.status(400).json({ error: 'name, category, equipment, difficulty 是必填项' });
    }
    const details = await exerciseAIService.generateExerciseDetails(
      { name, category, equipment, difficulty },
      targetMuscles
    );
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

- [ ] **Step 3: 提交**

```bash
git add backend/src/routes/adminExercises.js
git commit -m "feat: adminExercises 添加 /generate AI 生成端点"
```

---

## Task 3: 修改前端 admin.ts 添加 generateExerciseDetails API

**Files:**
- Modify: `frontend/src/api/admin.ts`

- [ ] **Step 1: 在 admin.ts 添加 generateExerciseDetails 方法**

在 `generateMuscleDetails` 方法后添加：

```typescript
async generateExerciseDetails(name: string, category: string, equipment: string, difficulty: string, targetMuscles?: any[]) {
  const { data } = await client.post('/admin/exercises/generate', { name, category, equipment, difficulty, targetMuscles });
  return data;
},
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/api/admin.ts
git commit -m "feat: admin API 添加 generateExerciseDetails 方法"
```

---

## Task 4: 修改 admin/Exercises.tsx 添加 AI 增强按钮

**Files:**
- Modify: `frontend/src/pages/admin/Exercises.tsx`
- Reference: `frontend/src/pages/Muscles.tsx` 的 AI 增强实现

- [ ] **Step 1: 添加 aiLoading state 和 generateWithAI 函数**

参考 Muscles.tsx 的实现模式：

```typescript
const [aiLoading, setAiLoading] = useState(false);

const generateWithAI = async (source: 'add' | 'edit') => {
  const name = source === 'add' ? newExercise.name : editExercise.name;
  const category = source === 'add' ? newExercise.category : editExercise.category;
  const equipment = source === 'add' ? newExercise.equipment : editExercise.equipment;
  const difficulty = source === 'add' ? newExercise.difficulty : editExercise.difficulty;

  if (!name.trim() || !category || !equipment || !difficulty) {
    alert('请先填写动作名称、选择分类、器材和难度');
    return;
  }

  setAiLoading(true);
  try {
    const details = await adminApi.generateExerciseDetails(name, category, equipment, difficulty);
    
    if (source === 'add') {
      setNewExercise(prev => ({
        ...prev,
        steps: details.steps || prev.steps,
        safetyNotes: details.safetyNotes || prev.safetyNotes,
        commonMistakes: details.commonMistakes || prev.commonMistakes,
        adjustmentNotes: details.adjustmentNotes || prev.adjustmentNotes,
        exerciseType: details.exerciseType || prev.exerciseType,
      }));
    } else {
      setEditExercise(prev => ({
        ...prev,
        steps: details.steps || prev.steps,
        safetyNotes: details.safetyNotes || prev.safetyNotes,
        commonMistakes: details.commonMistakes || prev.commonMistakes,
        adjustmentNotes: details.adjustmentNotes || prev.adjustmentNotes,
        exerciseType: details.exerciseType || prev.exerciseType,
      }));
    }
  } catch (err: any) {
    alert(err.response?.data?.error || 'AI 生成失败');
  } finally {
    setAiLoading(false);
  }
};
```

- [ ] **Step 2: 在动作名称输入框后添加 AI 增强按钮**

在添加/编辑模态框的动作名称 input 后添加按钮，参考 Muscles.tsx 的按钮样式：

```tsx
<div className="flex items-center justify-between">
  <label className="block text-text-secondary text-sm mb-2">动作名称</label>
  <Button
    size="sm"
    variant="outline"
    onClick={() => generateWithAI('add')}
    disabled={aiLoading || !newExercise.name.trim()}
  >
    {aiLoading ? '生成中...' : 'AI增强'}
  </Button>
</div>
```

- [ ] **Step 3: 提交**

```bash
git add frontend/src/pages/admin/Exercises.tsx
git commit -m "feat: Exercises 管理页面添加 AI 增强按钮"
```

---

## Task 5: 创建批量生成脚本 ai-generate-exercise-details.js（可断点续传）

**Files:**
- Create: `backend/scripts/ai-generate-exercise-details.js`
- Reference: `backend/scripts/ai-generate-muscle-details.js`

- [ ] **Step 1: 创建支持断点续传的脚本文件**

```javascript
import { exerciseAIService } from '../src/services/exerciseAIService.js';
import prisma from '../dist/lib/prisma.js';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = './output';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function getOutputFile() {
  const date = new Date().toISOString().split('T')[0];
  return path.join(OUTPUT_DIR, `exercise-details-${date}.json`);
}

function loadExistingResults() {
  const outputFile = getOutputFile();
  if (fs.existsSync(outputFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));
      console.log(`发现已有文件，加载 ${data.exercises?.length || 0} 条记录`);
      return new Set(data.exercises.map(e => e.id));
    } catch (e) {
      console.log('已有文件解析失败，将重新开始');
    }
  }
  return new Set();
}

function saveResults(results) {
  const outputFile = getOutputFile();
  const output = {
    generatedAt: new Date().toISOString().split('T')[0],
    exercises: results,
  };
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`  [保存进度] ${results.length} 条记录已写入`);
}

async function main() {
  console.log('开始生成动作详情...');

  const exercises = await prisma.exercise.findMany({
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
  });

  console.log(`找到 ${exercises.length} 个动作`);

  const completedIds = loadExistingResults();
  const results = [];

  // 如果已有文件，先加载现有结果
  const outputFile = getOutputFile();
  if (fs.existsSync(outputFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));
      results.push(...data.exercises);
    } catch (e) {}
  }

  let newCount = 0;
  for (const exercise of exercises) {
    // 跳过已完成的
    if (completedIds.has(exercise.id)) {
      console.log(`跳过(已完成): ${exercise.name}`);
      continue;
    }

    console.log(`正在生成: ${exercise.name}...`);

    try {
      const details = await exerciseAIService.generateExerciseDetails(
        { name: exercise.name, category: exercise.category, equipment: exercise.equipment, difficulty: exercise.difficulty },
        null
      );

      if (details) {
        const record = {
          id: exercise.id,
          name: exercise.name,
          category: exercise.category,
          equipment: exercise.equipment,
          difficulty: exercise.difficulty,
          ...details,
        };
        results.push(record);
        newCount++;
        console.log(`  ✓ 完成: ${exercise.name} (${newCount} 新增)`);

        // 每生成一条就保存一次
        saveResults(results);
      } else {
        console.log(`  ✗ 失败: ${exercise.name}`);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (e) {
      console.error(`  ✗ 错误: ${exercise.name}:`, e.message);
    }
  }

  console.log(`\n完成！生成文件: ${outputFile}`);
  console.log(`本次新增: ${newCount}/${exercises.length}`);
  console.log(`总记录: ${results.length}`);
}

main().catch(console.error);
```

- [ ] **Step 2: 提交**

```bash
git add backend/scripts/ai-generate-exercise-details.js
git commit -m "feat: 添加动作详情批量生成脚本(支持断点续传)"
```

---

## Task 6: 验证构建

- [ ] **Step 1: 后端构建**

```bash
cd backend && npm run build
```

- [ ] **Step 2: 前端构建**

```bash
cd frontend && npm run build
```

- [ ] **Step 3: 提交验证构建**

```bash
git add -A && git commit -m "chore: 验证构建成功"
```

---

## 自检清单

- [ ] Spec 覆盖：所有 AI 生成字段（steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, suggestedMuscles）都有对应的任务实现
- [ ] 占位符检查：计划中无 TBD、TODO 或模糊描述
- [ ] 类型一致性：函数签名、属性名称在各任务间保持一致