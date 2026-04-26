// @ts-nocheck
import { ChatAnthropic } from "@langchain/anthropic";

interface MuscleInput {
  name: string;
  group: string;
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
 * 生成肌肉详情
 */
async function generateMuscleDetails(muscle: MuscleInput, parentMuscleName: string | null, retries = 3) {
  const model = new ChatAnthropic({
    apiKey: process.env.MINIMAX_API_KEY || '',
    model: "MiniMax-M2.7",
    temperature: 0.7,
    maxTokens: 2048,
  });

  const prompt = `给定肌肉信息：
- 名称：${muscle.name}
- 肌肉群：${muscle.group}
- 上级肌肉：${parentMuscleName || '无'}

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

export const muscleAIService = {
  async generateMuscleDetails(muscle: MuscleInput, parentMuscleName: string | null) {
    return generateMuscleDetails(muscle, parentMuscleName);
  }
};