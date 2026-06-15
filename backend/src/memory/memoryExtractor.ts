/**
 * Memory Extractor
 * 从对话中异步抽取有价值的信息作为记忆
 */

import { createChatModel } from '../agents/chatFactory';
import { memoryStore, type Memory, type MemoryType } from './memoryStore';

const EXTRACTION_PROMPT = `你是一个记忆抽取助手。从用户对话中抽取值得长期记忆的信息。

抽取类型：
- episodic: 重要事件（如"上周膝盖受伤了"、"今天突破了卧推PR"）
- semantic: 事实知识（如"我膝盖不好不能做深蹲"、"我喜欢早上训练"）
- procedural: 习惯/偏好（如"我每次训练前会喝咖啡"、"我喜欢练胸背腿三分化"）

重要度评分(1-10)：
- 10: 必须记住的健康/安全信息
- 7-9: 对训练规划重要的偏好
- 5-6: 一般性习惯
- 1-4: 不太重要

只返回需要记忆的内容，不需要回复用户。

格式要求：
如果无重要信息，返回"无需记忆"。
否则返回JSON数组：
[{"type":"episodic|semantic|procedural","content":"...","importance":数字}]`;

/**
 * 从对话中抽取记忆
 */
export async function extractMemory(
  userId: number,
  userMessage: string,
  assistantReply: string
): Promise<{ extracted: number; memories: Memory[] }> {
  try {
    const model = createChatModel();
    const combined = `用户说：${userMessage}\n\nAI回复：${assistantReply}`;

    const response = await model.invoke(combined);

    const text = typeof response.content === 'string' ? response.content : '';
    if (text.includes('无需记忆')) {
      return { extracted: 0, memories: [] };
    }

    // 解析 JSON
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) {
      return { extracted: 0, memories: [] };
    }

    const items = JSON.parse(match[0]);
    const memories: Memory[] = [];

    for (const item of items) {
      const memory: Memory = {
        userId,
        type: item.type as MemoryType,
        content: item.content,
        importance: Math.min(10, Math.max(1, item.importance || 5)),
      };
      await memoryStore.add(memory);
      memories.push(memory);
    }

    return { extracted: memories.length, memories };
  } catch (error) {
    console.error('[MemoryExtractor] failed:', error);
    return { extracted: 0, memories: [] };
  }
}