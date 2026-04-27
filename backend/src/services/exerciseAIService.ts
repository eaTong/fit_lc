// @ts-nocheck
import { createMiniMaxModel } from '../agents/chatMiniMax';

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

  // 移除思考标签块（多行格式）
  // 匹配从 <think>\n 到 \n</think>\ 的完整块
  jsonStr = jsonStr.replace(/<begin_thinking>\n[\s\S]*?\n<\/end_thinking>\n/gi, '');
  jsonStr = jsonStr.replace(/<thinking>\n[\s\S]*?\n<\/thinking>\n/gi, '');
  jsonStr = jsonStr.replace(/<think turn="[^"]*">\n[\s\S]*?\n<\/think>\n/gi, '');
  jsonStr = jsonStr.replace(/<think>>\n[\s\S]*?\n<\/think>\n/gi, '');
  jsonStr = jsonStr.replace(/<think>\n[\s\S]*?\n<\/think>\n/gi, '');

  // 移除单行思考标签（备用）
  jsonStr = jsonStr.replace(/<begin_thinking>[\s\S]*?<\/end_thinking>/gi, '');
  jsonStr = jsonStr.replace(/<thinking>[\s\S]*?<\/thinking>/gi, '');
  jsonStr = jsonStr.replace(/<think turn="[^"]*">[\s\S]*?<\/think>/gi, '');
  jsonStr = jsonStr.replace(/<think>[\s\S]*?<\/think>/gi, '');

  // 移除 ```json 代码块
  const jsonMatch = jsonStr.match(/```json\n([\s\S]*?)\n```/) || jsonStr.match(/```\n([\s\S]*?)\n```/) || jsonStr.match(/```json([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  // 移除所有剩余的 <...> 标签
  jsonStr = jsonStr.replace(/<[^>]*>/g, '');

  // 清理尾部逗号
  jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');

  return jsonStr.trim();
}

/**
 * 生成动作详情
 */
async function generateExerciseDetails(exercise: ExerciseInput, targetMuscles: MuscleInput[] | null, retries = 3) {
  const model = createMiniMaxModel({ temperature: 0.7, maxTokens: 4096 });

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
        throw new Error('AI 返回为空');
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