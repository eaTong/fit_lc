# AI 肌肉详情生成实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建脚本使用 AI 批量生成肌肉库的详细信息

**Architecture:**
- Node.js 脚本直接调用 MiniMax AI API
- Prisma ORM 读取肌肉数据
- JSON 文件输出结果供管理员审核

**Tech Stack:** Node.js, Prisma ORM, MiniMax AI API

---

## 任务清单

### Task 1: 创建脚本框架

**Files:**
- Create: `backend/scripts/ai-generate-muscle-details.js`
- Create: `backend/scripts/output/` (目录)

- [ ] **Step 1: 创建目录**

```bash
mkdir -p /Users/eatong/eaTong_projects/fit_lc/backend/scripts/output
```

- [ ] **Step 2: 创建脚本文件**

Create: `backend/scripts/ai-generate-muscle-details.js`

```javascript
import { ChatAnthropic } from "@langchain/anthropic";
import prisma from '../src/lib/prisma.js';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = './output';

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * 为单个肌肉生成详情
 */
async function generateMuscleDetails(muscle, parentMuscle) {
  const model = new ChatAnthropic({
    apiKey: process.env.MINIMAX_API_KEY,
    baseURL: "https://api.minimaxi.com/anthropic/v1",
    model: "MiniMax-M2.7",
    temperature: 0.7,
    maxTokens: 1024,
  });

  const prompt = `给定肌肉信息：
- 名称：${muscle.name}
- 肌肉群：${muscle.group}
- 上级肌肉：${parentMuscle?.name || '无'}

请为这个肌肉生成以下信息（JSON格式）：
{
  "origin": "起点位置描述",
  "insertion": "止点位置描述",
  "function": "主要功能描述",
  "trainingTips": "训练技巧和建议"
}

要求：
- 用中文回答
- origin 和 insertion 描述肌肉的解剖学起止点
- function 描述肌肉的主要功能
- trainingTips 包含2-3条训练建议
- 只返回JSON，不要其他内容`;

  const response = await model.invoke(prompt);
  const text = response.content[0].text;

  // 解析 JSON
  try {
    // 尝试提取 JSON（可能包含在 markdown 代码块中）
    let jsonStr = text;
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error(`解析 JSON 失败 for ${muscle.name}:`, e.message);
    return null;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('开始生成肌肉详情...');

  // 从数据库读取所有肌肉
  const muscles = await prisma.muscle.findMany({
    orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }],
  });

  console.log(`找到 ${muscles.length} 个肌肉`);

  const results = [];

  for (const muscle of muscles) {
    // 查找父肌肉
    const parentMuscle = muscle.parentId
      ? muscles.find(m => m.id === muscle.parentId)
      : null;

    console.log(`正在生成: ${muscle.name}...`);

    try {
      const details = await generateMuscleDetails(muscle, parentMuscle);

      if (details) {
        results.push({
          id: muscle.id,
          name: muscle.name,
          group: muscle.group,
          ...details,
        });
        console.log(`  ✓ 完成: ${muscle.name}`);
      } else {
        console.log(`  ✗ 失败: ${muscle.name}`);
      }

      // 避免 API 限流，添加延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (e) {
      console.error(`  ✗ 错误: ${muscle.name}:`, e.message);
    }
  }

  // 生成输出文件
  const date = new Date().toISOString().split('T')[0];
  const outputFile = path.join(OUTPUT_DIR, `muscle-details-${date}.json`);

  const output = {
    generatedAt: date,
    muscles: results,
  };

  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`\n完成！生成文件: ${outputFile}`);
  console.log(`成功: ${results.length}/${muscles.length}`);
}

main().catch(console.error);
```

- [ ] **Step 3: 提交**

```bash
git add backend/scripts/ai-generate-muscle-details.js
git commit -m "feat: 添加 AI 肌肉详情生成脚本"
```

---

### Task 2: 测试运行脚本

**Files:**
- Run: `cd backend && node scripts/ai-generate-muscle-details.js`

- [ ] **Step 1: 确保环境变量存在**

检查 `.env` 文件包含 `MINIMAX_API_KEY`

- [ ] **Step 2: 运行脚本**

```bash
cd /Users/eatong/eaTong_projects/fit_lc/backend && node scripts/ai-generate-muscle-details.js
```

Expected: 脚本运行，生成 JSON 文件到 `output/muscle-details-YYYY-MM-DD.json`

- [ ] **Step 3: 检查输出文件**

```bash
cat /Users/eatong/eaTong_projects/fit_lc/backend/scripts/output/muscle-details-*.json | head -50
```

---

### Task 3: 提交输出目录**

**Files:**
- Modify: `.gitignore` (添加 output 目录忽略)

- [ ] **Step 1: 添加 .gitignore 规则**

在 `.gitignore` 添加：
```
# AI 生成的数据
backend/scripts/output/*.json
!backend/scripts/output/.gitkeep
```

- [ ] **Step 2: 创建 .gitkeep**

```bash
touch /Users/eatong/eaTong_projects/fit_lc/backend/scripts/output/.gitkeep
```

- [ ] **Step 3: 提交**

```bash
git add .gitignore backend/scripts/output/.gitkeep
git commit -m "chore: 添加 output 目录忽略规则"
```

---

## 实施检查清单

- [ ] 脚本 `ai-generate-muscle-details.js` 创建成功
- [ ] 脚本能正确读取数据库中的肌肉列表
- [ ] 脚本能调用 AI API 生成详情
- [ ] 脚本能输出 JSON 文件
- [ ] JSON 文件包含所有 4 个字段：origin, insertion, function, trainingTips
