# AI 动作变体分析脚本实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建一个一次性脚本，通过 AI 分析现有动作库，识别变体关系并生成差异说明，输出 JSON 报告供人工确认。

**Architecture:**
- 读取所有动作（draft + published）
- 按名称相似度分组（基础动作词 + 器材类型）
- 对每组内动作对调用 AI 分析
- 输出 JSON 报告 + SQL 导入模板

**Tech Stack:** TypeScript + Prisma + LangChain/MiniMax AI

---

## 文件结构

```
backend/scripts/
├── analyzeExerciseVariants.ts    # 主脚本（NEW）
└── output/
    └── exercise_variant_report.json  # 生成的报告
```

---

## Task 1: 创建脚本主文件

**Files:**
- Create: `backend/scripts/analyzeExerciseVariants.ts`

### Step 1: 创建脚本文件

```typescript
import { PrismaClient } from '@prisma/client';
import { createMiniMaxModel } from '../src/lib/ai';

const prisma = new PrismaClient();

// 基础动作词列表
const BASE_EXERCISES = [
  '卧推', '深蹲', '划船', '推肩', '弯举', '硬拉',
  '臂屈伸', '下拉', '卷腹', '腹肌', '平板支撑',
  '飞鸟', '侧平举', '前平举', '面拉', '二头肌',
  '三头肌', '胸肌', '背肌', '腿举', '腿弯举',
];

// 器材关键词
const EQUIPMENT_KEYWORDS: Record<string, string> = {
  '杠铃': 'barbell',
  '哑铃': 'dumbbell',
  '绳索': 'cable',
  '器械': 'machine',
  '自重': 'bodyweight',
  '壶铃': 'kettlebell',
  '弹力带': 'bands',
};

// 角度修饰词
const ANGLE_KEYWORDS = ['上斜', '下斜', '斜板', '高位', '低位', '倾斜'];

interface Exercise {
  id: number;
  name: string;
  status: string;
  category: string;
  equipment: string;
  difficulty: string;
  description: string | null;
}

interface ExercisePair {
  exerciseA: Exercise;
  exerciseB: Exercise;
}

interface AnalysisResult {
  exerciseA: { id: number; name: string; status: string };
  exerciseB: { id: number; name: string; status: string };
  isVariant: boolean;
  variantType: 'equipment' | 'difficulty' | 'posture' | null;
  differenceNotes: string;
  reasoning: string;
}

interface GroupedExercises {
  [baseExercise: string]: {
    [equipment: string]: Exercise[];
  };
}

/**
 * 提取动作的基础动作词
 */
function extractBaseExercise(name: string): string | null {
  for (const base of BASE_EXERCISES) {
    if (name.includes(base)) {
      return base;
    }
  }
  return null;
}

/**
 * 提取器材类型
 */
function extractEquipment(name: string): string {
  for (const [keyword, type] of Object.entries(EQUIPMENT_KEYWORDS)) {
    if (name.includes(keyword)) {
      return type;
    }
  }
  return 'other';
}

/**
 * 提取角度修饰词
 */
function extractAngle(name: string): string | null {
  for (const angle of ANGLE_KEYWORDS) {
    if (name.includes(angle)) {
      return angle;
    }
  }
  return null;
}

/**
 * 分组动作
 */
function groupExercises(exercises: Exercise[]): GroupedExercises {
  const groups: GroupedExercises = {};

  for (const exercise of exercises) {
    const base = extractBaseExercise(exercise.name);
    if (!base) continue;

    if (!groups[base]) {
      groups[base] = {};
    }

    const equipment = extractEquipment(exercise.name);
    if (!groups[base][equipment]) {
      groups[base][equipment] = [];
    }
    groups[base][equipment].push(exercise);
  }

  return groups;
}

/**
 * 生成动作对
 */
function generatePairs(groups: GroupedExercises): ExercisePair[] {
  const pairs: ExercisePair[] = [];

  for (const [base, equipmentGroups] of Object.entries(groups)) {
    const allInBase: Exercise[] = [];

    // 合并所有器材下的动作
    for (const exercises of Object.values(equipmentGroups)) {
      allInBase.push(...exercises);
    }

    // 生成两两对比（只对比不同器材或不同角度的）
    for (let i = 0; i < allInBase.length; i++) {
      for (let j = i + 1; j < allInBase.length; j++) {
        const exA = allInBase[i];
        const exB = allInBase[j];

        // 同一动作跳过
        if (exA.id === exB.id) continue;

        // 同一器材但角度相同跳过
        const equipA = extractEquipment(exA.name);
        const equipB = extractEquipment(exB.name);
        const angleA = extractAngle(exA.name);
        const angleB = extractAngle(exB.name);

        // 如果器材和角度都相同，跳过
        if (equipA === equipB && angleA === angleB) continue;

        pairs.push({ exerciseA: exA, exerciseB: exB });
      }
    }
  }

  return pairs;
}

/**
 * 调用 AI 分析一对动作
 */
async function analyzePair(
  pair: ExercisePair,
  model: any
): Promise<AnalysisResult> {
  const prompt = `你是一个健身教练，分析以下两个动作是否为变体关系。

动作 A：
- 名称：${pair.exerciseA.name}
- 器材：${pair.exerciseA.equipment}
- 难度：${pair.exerciseA.difficulty}
- 描述：${pair.exerciseA.description || '无'}

动作 B：
- 名称：${pair.exerciseB.name}
- 器材：${pair.exerciseB.equipment}
- 难度：${pair.exerciseB.difficulty}
- 描述：${pair.exerciseB.description || '无'}

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
- differenceNotes 描述从 A 视角看切换到 B 的注意事项`;

  const response = await model.invoke(prompt);
  let text = '';
  if (typeof response.content === 'string') {
    text = response.content;
  } else if (Array.isArray(response.content)) {
    const textPart = response.content.find((p: any) => p.type === 'text');
    text = textPart?.text || '';
  }

  // 提取 JSON
  const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/```\n?([\s\S]*?)\n?```/);
  const jsonStr = jsonMatch ? jsonMatch[1].trim() : text;

  try {
    const result = JSON.parse(jsonStr);
    return {
      exerciseA: { id: pair.exerciseA.id, name: pair.exerciseA.name, status: pair.exerciseA.status },
      exerciseB: { id: pair.exerciseB.id, name: pair.exerciseB.name, status: pair.exerciseB.status },
      isVariant: result.isVariant,
      variantType: result.variantType,
      differenceNotes: result.differenceNotes || '',
      reasoning: result.reasoning || '',
    };
  } catch (e) {
    return {
      exerciseA: { id: pair.exerciseA.id, name: pair.exerciseA.name, status: pair.exerciseA.status },
      exerciseB: { id: pair.exerciseB.id, name: pair.exerciseB.name, status: pair.exerciseB.status },
      isVariant: false,
      variantType: null,
      differenceNotes: '',
      reasoning: 'JSON 解析失败',
    };
  }
}

async function main() {
  console.log('=== AI 动作变体分析脚本 ===\n');

  // 1. 读取所有动作
  console.log('1. 读取动作库...');
  const exercises = await prisma.exercise.findMany({
    select: {
      id: true,
      name: true,
      status: true,
      category: true,
      equipment: true,
      difficulty: true,
      description: true,
    },
  });
  console.log(`   共 ${exercises.length} 个动作\n`);

  // 2. 分组
  console.log('2. 按名称相似度分组...');
  const groups = groupExercises(exercises);
  const groupCount = Object.keys(groups).length;
  console.log(`   共 ${groupCount} 个基础动作组\n`);

  // 3. 生成动作对
  console.log('3. 生成动作对比对...');
  const pairs = generatePairs(groups);
  console.log(`   共 ${pairs.length} 对需要分析\n`);

  if (pairs.length === 0) {
    console.log('没有需要分析的动作对\n');
    return;
  }

  // 4. 创建 AI 模型
  console.log('4. 初始化 AI 模型...');
  const model = createMiniMaxModel({ temperature: 0.7, maxTokens: 1024 });
  console.log('');

  // 5. 分析每对
  const results: AnalysisResult[] = [];
  const errors: string[] = [];

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    console.log(`   [${i + 1}/${pairs.length}] 分析: ${pair.exerciseA.name} vs ${pair.exerciseB.name}`);

    try {
      const result = await analyzePair(pair, model);
      results.push(result);

      if (result.isVariant) {
        console.log(`      → 变体 (${result.variantType}): ${result.differenceNotes}`);
      } else {
        console.log(`      → 非变体`);
      }
    } catch (e: any) {
      console.log(`      → 错误: ${e.message}`);
      errors.push(`${pair.exerciseA.name} vs ${pair.exerciseB.name}: ${e.message}`);
    }

    // 速率限制
    if (i < pairs.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // 6. 生成报告
  console.log('\n5. 生成报告...');
  const variantPairs = results.filter(r => r.isVariant);
  const nonVariantPairs = results.filter(r => !r.isVariant);

  const report = {
    generatedAt: new Date().toISOString(),
    totalExercises: exercises.length,
    totalPairs: pairs.length,
    analyzedPairs: results.length,
    variantPairs,
    nonVariantPairs,
    errors,
  };

  // 写入文件
  const fs = require('fs');
  const outputPath = `${__dirname}/output/exercise_variant_report.json`;
  fs.mkdirSync(`${__dirname}/output`, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`   报告已保存: ${outputPath}\n`);

  // 生成 SQL
  if (variantPairs.length > 0) {
    const sqlLines = variantPairs.map(v => {
      return `  (${v.exerciseA.id}, ${v.exerciseB.id}, '${v.variantType}', '${v.differenceNotes.replace(/'/g, "''")}', NOW()),`;
    }).join('\n');

    // 双向关系
    const reverseSqlLines = variantPairs.map(v => {
      const reverseNotes = getReverseNotes(v.differenceNotes, v.variantType);
      return `  (${v.exerciseB.id}, ${v.exerciseA.id}, '${v.variantType}', '${reverseNotes.replace(/'/g, "''")}', NOW()),`;
    }).join('\n');

    const sql = `-- 动作变体关系导入 SQL（由管理员审核后执行）\n-- 生成时间: ${new Date().toISOString()}\n\nINSERT INTO exercise_variants (exercise_id, variant_id, variant_type, difference_notes, created_at)\nVALUES\n${sqlLines}\n${reverseSqlLines}\n;`;

    const sqlPath = `${__dirname}/output/exercise_variant_import.sql`;
    fs.writeFileSync(sqlPath, sql);
    console.log(`   SQL 已保存: ${sqlPath}\n`);
  }

  console.log('=== 分析完成 ===');
  console.log(`总动作数: ${exercises.length}`);
  console.log(`分析对数: ${results.length}`);
  console.log(`识别变体: ${variantPairs.length}`);
  console.log(`非变体: ${nonVariantPairs.length}`);
  console.log(`错误: ${errors.length}`);
}

function getReverseNotes(notes: string, variantType: string | null): string {
  // 生成反向的差异说明
  if (variantType === 'equipment') {
    if (notes.includes('下调') || notes.includes('降低')) {
      return notes.replace(/下调.*?%/, '上调相应比例').replace(/降低.*?%/, '提高相应比例');
    }
    if (notes.includes('哑铃')) {
      return notes.replace('哑铃', '杠铃');
    }
    if (notes.includes('杠铃')) {
      return notes.replace('杠铃', '哑铃');
    }
  }
  return notes;
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### Step 2: Commit

```bash
git add backend/scripts/analyzeExerciseVariants.ts
git commit -m "feat(script): add AI exercise variant analysis script"
```

---

## Task 2: 测试脚本（本地测试）

**Files:**
- Test: 在本地数据库测试脚本（需有测试数据）

### Step 1: 确认脚本语法正确

Run: `cd backend && npx ts-node --transpile-only scripts/analyzeExerciseVariants.ts --help 2>&1 | head -5`

如果报错，检查 import 路径。

### Step 2: Commit

```bash
git add backend/scripts/analyzeExerciseVariants.ts
git commit -m "test: verify script syntax"
```

---

## 自检清单

**1. Spec 覆盖检查：**
- [x] 读取所有动作（draft + published）
- [x] 按名称相似度分组（基础动作词 + 器材类型）
- [x] AI 分析变体关系
- [x] 输出 JSON 报告
- [x] 生成 SQL 导入模板

**2. 占位符扫描：** 无 TBD/TODO

**3. 类型一致性：**
- Exercise interface 字段与 Prisma schema 一致
- AnalysisResult 与 JSON 报告格式一致
