// @ts-nocheck
import { ChatAnthropic } from "@langchain/anthropic";

interface ExerciseInput {
  name: string;
  category: string;
  equipment: string;
  difficulty: string;
}

interface MuscleInput {
  name: string;
}

/**
 * 解析 AI 响应文本，提取 JSON
 */
function extractJson(text: string): string {
  let jsonStr = text.trim();
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/) || text.match(/```json([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }
  jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
  return jsonStr;
}

/**
 * 生成动作详情
 */
async function generateExerciseDetails(exercise: ExerciseInput, targetMuscles: MuscleInput[] | null, retries = 3) {
  const model = new ChatAnthropic({
    apiKey: process.env.MINIMAX_API_KEY || '',
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
    let text: string | undefined;
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
    } catch (e: any) {
      console.error(`AI 生成失败 (尝试 ${attempt + 1}/${retries}):`, e.message);
      if (attempt < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
      }
    }
  }
  throw new Error('AI 生成失败，请重试');
}

export const exerciseAIService = {
  async generateExerciseDetails(exercise: ExerciseInput, targetMuscles: MuscleInput[] | null) {
    return generateExerciseDetails(exercise, targetMuscles);
  }
};