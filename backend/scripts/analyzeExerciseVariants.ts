import { PrismaClient } from '@prisma/client';
import { createMiniMaxModel } from '../src/agents/chatMiniMax';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const OUTPUT_DIR = path.join(__dirname, 'output');

// 基础动作词
const BASE_EXERCISES = [
  '卧推', '深蹲', '划船', '推肩', '弯举', '硬拉',
  '臂屈伸', '下拉', '卷腹', '腹肌', '平板支撑',
  '飞鸟', '侧平举', '前平举', '面拉', '二头肌',
  '三头肌', '胸肌', '背肌', '腿举', '腿弯举',
];

// 器材关键词映射
const EQUIPMENT_KEYWORDS: Record<string, string> = {
  '杠铃': 'barbell',
  '哑铃': 'dumbbell',
  '绳索': 'cable',
  '器械': 'machine',
  '自重': 'bodyweight',
  '壶铃': 'kettlebell',
  '弹力带': 'bands',
};

// 角度关键词
const ANGLE_KEYWORDS = ['上斜', '下斜', '斜板', '高位', '低位', '倾斜'];

interface ExerciseInfo {
  id: number;
  name: string;
  equipment: string;
  difficulty: string;
  description: string | null;
}

interface PairAnalysis {
  exerciseA: ExerciseInfo;
  exerciseB: ExerciseInfo;
  isVariant: boolean;
  variantType: string | null;
  differenceNotes: string;
  reasoning: string;
}

// 确保输出目录存在
function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

// 提取基础动作词
function extractBaseExercise(name: string): string | null {
  for (const base of BASE_EXERCISES) {
    if (name.includes(base)) {
      return base;
    }
  }
  return null;
}

// 提取器材类型
function extractEquipment(name: string): string | null {
  for (const [keyword, equipment] of Object.entries(EQUIPMENT_KEYWORDS)) {
    if (name.includes(keyword)) {
      return equipment;
    }
  }
  return null;
}

// 提取角度信息
function extractAngle(name: string): string | null {
  for (const angle of ANGLE_KEYWORDS) {
    if (name.includes(angle)) {
      return angle;
    }
  }
  return null;
}

// 判断两个动作是否应该配对比较
function shouldPair(exerciseA: ExerciseInfo, exerciseB: ExerciseInfo): boolean {
  if (exerciseA.id === exerciseB.id) return false;

  const baseA = extractBaseExercise(exerciseA.name);
  const baseB = extractBaseExercise(exerciseB.name);

  // 基础动作词不同，不配对
  if (!baseA || !baseB || baseA !== baseB) {
    return false;
  }

  // 至少有一个有器材关键词
  const equipA = extractEquipment(exerciseA.name);
  const equipB = extractEquipment(exerciseB.name);

  if (!equipA && !equipB) {
    return false;
  }

  // 如果器材相同，检查角度
  if (equipA && equipB && equipA === equipB) {
    const angleA = extractAngle(exerciseA.name);
    const angleB = extractAngle(exerciseB.name);
    // 器材相同但角度不同，可以配对
    // Fix: allow pairing if angles are different (including when only one has an angle)
    if (angleA !== angleB) {
      return true;
    }
    // 其他情况器材相同不做配对
    return false;
  }

  return true;
}

// 生成配对
function generatePairs(exercises: ExerciseInfo[]): Array<[ExerciseInfo, ExerciseInfo]> {
  const pairs: Array<[ExerciseInfo, ExerciseInfo]> = [];
  const n = exercises.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (shouldPair(exercises[i], exercises[j])) {
        pairs.push([exercises[i], exercises[j]]);
      }
    }
  }

  return pairs;
}

// 构建 AI prompt
function buildPrompt(exerciseA: ExerciseInfo, exerciseB: ExerciseInfo): string {
  return `你是一个健身教练，分析以下两个动作是否为变体关系。

动作 A：
- 名称：${exerciseA.name}
- 器材：${exerciseA.equipment}
- 难度：${exerciseA.difficulty}
- 描述：${exerciseA.description || '无'}

动作 B：
- 名称：${exerciseB.name}
- 器材：${exerciseB.equipment}
- 难度：${exerciseB.difficulty}
- 描述：${exerciseB.description || '无'}

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
}

// 解析 AI 响应
function parseAIResponse(text: string): {
  isVariant: boolean;
  variantType: string | null;
  differenceNotes: string;
  reasoning: string;
} {
  let jsonStr = text.trim();

  // 移除思考标签
  jsonStr = jsonStr.replace(/<begin_thinking>[\s\S]*?<\/end_thinking>/gi, '');
  jsonStr = jsonStr.replace(/<thinking>[\s\S]*?<\/thinking>/gi, '');
  jsonStr = jsonStr.replace(/<think[^>]*>[\s\S]*?<\/think>/gi, '');
  jsonStr = jsonStr.replace(/<think>[\s\S]*?<\/think>/gi, '');

  // 移除代码块
  const jsonMatch = jsonStr.match(/```json\n([\s\S]*?)\n```/) || jsonStr.match(/```\n([\s\S]*?)\n```/) || jsonStr.match(/```json([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  // 移除所有剩余标签
  jsonStr = jsonStr.replace(/<[^>]*>/g, '');

  // 清理尾部逗号
  jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('JSON 解析失败:', jsonStr.substring(0, 200));
    return {
      isVariant: false,
      variantType: null,
      differenceNotes: '',
      reasoning: '解析失败',
    };
  }
}

// 生成反向差异说明
// Simplified: use same notes for both directions since this is a one-time script
// Human reviewers can edit the reverse notes in the generated SQL before importing
function generateReverseNotes(notes: string, variantType: string): string {
  // For a one-time analysis script, just use the same notes both ways
  // Human reviewer can edit reverse notes in the generated SQL
  return notes;
}

// 分析配对
async function analyzePair(
  exerciseA: ExerciseInfo,
  exerciseB: ExerciseInfo,
  model: ReturnType<typeof createMiniMaxModel>
): Promise<PairAnalysis> {
  const prompt = buildPrompt(exerciseA, exerciseB);

  try {
    const response = await model.invoke(prompt);
    const content = typeof response.content === 'string'
      ? response.content
      : Array.isArray(response.content)
        ? response.content.map(c => typeof c === 'string' ? c : 'text' in c ? c.text : '').join('')
        : '';

    const result = parseAIResponse(content);

    return {
      exerciseA,
      exerciseB,
      isVariant: result.isVariant,
      variantType: result.variantType,
      differenceNotes: result.differenceNotes || '',
      reasoning: result.reasoning || '',
    };
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error(`  AI 调用失败: ${exerciseA.name} vs ${exerciseB.name}:`, errorMessage);
    return {
      exerciseA,
      exerciseB,
      isVariant: false,
      variantType: null,
      differenceNotes: '',
      reasoning: `错误: ${errorMessage}`,
    };
  }
}

// 生成 SQL 导入模板
function generateSQL(analyses: PairAnalysis[]): string {
  const variantPairs = analyses.filter(a => a.isVariant);

  let sql = '-- Exercise Variant Relations Import Template\n';
  sql += '-- Generated at: ' + new Date().toISOString() + '\n\n';
  sql += 'BEGIN;\n\n';
  sql += '-- Delete existing variant relations (optional - uncomment if needed)\n';
  sql += '-- DELETE FROM exercise_variants WHERE 1=1;\n\n';
  sql += 'INSERT INTO exercise_variants (exercise_id, variant_id, variant_type, difference_notes, created_at) VALUES\n';

  const values: string[] = [];
  for (const pair of variantPairs) {
    const notesAtoB = pair.differenceNotes.replace(/'/g, "''");
    const notesBtoA = generateReverseNotes(pair.differenceNotes, pair.variantType || '').replace(/'/g, "''");

    // A -> B
    values.push(`  (${pair.exerciseA.id}, ${pair.exerciseB.id}, '${pair.variantType || 'equipment'}', '${notesAtoB}', NOW())`);
    // B -> A
    values.push(`  (${pair.exerciseB.id}, ${pair.exerciseA.id}, '${pair.variantType || 'equipment'}', '${notesBtoA}', NOW())`);
  }

  sql += values.join(',\n');
  sql += ';\n\n';
  sql += 'COMMIT;\n';

  return sql;
}

// 主函数
async function main() {
  console.log('=== 动作变体分析脚本 ===\n');

  ensureOutputDir();

  // 读取所有动作 (draft + published)
  const exercises = await prisma.exercise.findMany({
    where: {
      status: { in: ['draft', 'published'] },
    },
    select: {
      id: true,
      name: true,
      equipment: true,
      difficulty: true,
      description: true,
    },
  });

  console.log(`找到 ${exercises.length} 个动作 (draft + published)\n`);

  // 生成配对
  const pairs = generatePairs(exercises);
  console.log(`生成 ${pairs.length} 个配对\n`);

  // 创建 AI 模型
  const model = createMiniMaxModel({ temperature: 0.7, maxTokens: 1024 });

  // 分析配对
  const results: PairAnalysis[] = [];
  const errors: Array<{ pair: string; error: string }> = [];

  for (let i = 0; i < pairs.length; i++) {
    const [exerciseA, exerciseB] = pairs[i];
    console.log(`[${i + 1}/${pairs.length}] 分析: ${exerciseA.name} vs ${exerciseB.name}`);

    const result = await analyzePair(exerciseA, exerciseB, model);
    results.push(result);

    if (result.reasoning.includes('错误:')) {
      errors.push({
        pair: `${exerciseA.name} vs ${exerciseB.name}`,
        error: result.reasoning,
      });
    } else if (result.isVariant) {
      console.log(`  ✓ 变体 (${result.variantType}): ${result.differenceNotes || '无备注'}`);
    } else {
      console.log(`  ✗ 非变体`);
    }

    // 500ms 延迟
    if (i < pairs.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // 分类结果
  const variantPairs = results.filter(r => r.isVariant);
  const nonVariantPairs = results.filter(r => !r.isVariant);

  // 生成报告
  const report = {
    generatedAt: new Date().toISOString(),
    totalExercises: exercises.length,
    totalPairs: pairs.length,
    analyzedPairs: results.length,
    variantPairs: variantPairs.map(p => ({
      exerciseA: { id: p.exerciseA.id, name: p.exerciseA.name },
      exerciseB: { id: p.exerciseB.id, name: p.exerciseB.name },
      variantType: p.variantType,
      differenceNotes: p.differenceNotes,
    })),
    nonVariantPairs: nonVariantPairs.map(p => ({
      exerciseA: { id: p.exerciseA.id, name: p.exerciseA.name },
      exerciseB: { id: p.exerciseB.id, name: p.exerciseB.name },
      reasoning: p.reasoning,
    })),
    errors,
  };

  // 保存 JSON 报告
  const reportPath = path.join(OUTPUT_DIR, 'exercise_variant_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\n报告已保存: ${reportPath}`);

  // 生成 SQL
  const sql = generateSQL(results);
  const sqlPath = path.join(OUTPUT_DIR, 'exercise_variant_import.sql');
  fs.writeFileSync(sqlPath, sql, 'utf-8');
  console.log(`SQL 已保存: ${sqlPath}`);

  // 统计
  console.log('\n=== 统计 ===');
  console.log(`总配对数: ${pairs.length}`);
  console.log(`变体配对数: ${variantPairs.length}`);
  console.log(`非变体配对数: ${nonVariantPairs.length}`);
  console.log(`错误数: ${errors.length}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());