/**
 * Plan LLM Service
 * 用 reasoning model 生成个性化健身计划
 * LLM 失败时回退到规则引擎
 */

import { z } from 'zod';
import { ChatOpenAI } from '@langchain/openai';

// Plan 结构化输出 Schema
export const PlanSchema = z.object({
  goal: z.string(),
  weeklyFrequency: z.number().int().min(1).max(7),
  durationWeeks: z.number().int().min(2).max(24),
  schedule: z.array(z.object({
    dayOfWeek: z.number().int().min(1).max(7),
    focus: z.string(),
    exercises: z.array(z.object({
      name: z.string(),
      sets: z.number().int().min(1).max(10),
      reps: z.string(),  // e.g. "8-12"
      restSeconds: z.number().int().min(30).max(300),
      notes: z.string().optional(),
    })).min(1).max(12),
  })).min(1).max(7),
  rationale: z.string(),  // 给用户看的推理过程
});

export type PlanOutput = z.infer<typeof PlanSchema>;

export interface PlanLLMInput {
  goal: string;
  frequency: number;
  experience: string;
  equipment: string;
  targetMuscles?: string[];
  conditions?: string;
  durationWeeks: number;
}

export interface PlanLLMContext {
  recentWorkouts: string;       // 过去训练摘要
  memories: string;             // 用户记忆
  profile: string;              // 用户画像
  allowedExercises: string[];   // 可用动作列表
}

/**
 * 获取 Reasoning Model 配置
 */
function getReasoningConfig() {
  return {
    apiKey: getReasoningApiKey(),
    model: getReasoningModel(),
    baseURL: getReasoningBaseUrl(),
  };
}

/**
 * 构建 Plan 生成提示词
 */
function buildPrompt(input: PlanLLMInput, ctx: PlanLLMContext): string {
  return `你是一个专业的健身计划设计师。根据用户信息生成个性化训练计划。

## 用户信息
- 目标：${input.goal}
- 训练频率：每周 ${input.frequency} 次
- 经验：${input.experience}
- 可用器材：${input.equipment}
${input.targetMuscles?.length ? `- 目标肌肉：${input.targetMuscles.join(', ')}` : ''}
${input.conditions ? `- 注意事项：${input.conditions}` : ''}
- 计划周期：${input.durationWeeks} 周

## 近期训练记录
${ctx.recentWorkouts || '无近期记录'}

## 用户画像
${ctx.profile || '未知'}

## 关于用户的已知信息
${ctx.memories || '暂无'}

## 可用动作库（${ctx.allowedExercises.length} 个）
${ctx.allowedExercises.slice(0, 50).join('、')}

## 要求
1. 计划应循序渐进，每周适当增加强度
2. 考虑用户的注意事项（伤病、限制等）
3. 动作选择要结合可用器材
4. 每次训练包含 4-8 个动作
5. 输出必须严格符合 JSON Schema 格式
6. rationale 字段用中文解释为什么这样设计`;
}

/**
 * 创建 Reasoning Chat 模型
 */
function createReasoningModel() {
  const config = getReasoningConfig();
  return new ChatOpenAI({
    apiKey: config.apiKey,
    model: config.model,
    temperature: 0.7,
    maxTokens: 4096,
    timeout: 30_000,
    configuration: { baseURL: config.baseURL },
  });
}

/**
 * LLM 生成计划
 */
export async function generatePlanLLM(
  input: PlanLLMInput,
  ctx: PlanLLMContext
): Promise<PlanOutput> {
  const model = createReasoningModel();
  const prompt = buildPrompt(input, ctx);

  const response = await model.invoke([
    { role: 'system', content: '你是一个专业的健身计划设计师。只输出 JSON。' },
    { role: 'user', content: prompt },
  ]);

  const text = typeof response.content === 'string' ? response.content : '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Failed to parse LLM output: no JSON found');

  const parsed = JSON.parse(match[0]);
  return PlanSchema.parse(parsed);
}
