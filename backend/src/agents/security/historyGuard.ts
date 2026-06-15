/**
 * 历史窗口兜底：限制消息数量和 token 数量，并对 user 消息做 sanitize。
 */

import { sanitizeExternalContent } from './sanitizeExternalContent';

const MAX_MESSAGES = 20;
const MAX_TOKENS = 8000;

/**
 * 简单的 token 估算器
 * - 中文字符：约 2 字符/token
 * - 英文字符：约 4 字符/token
 */
function estimateTokens(text: string): number {
  const chinese = (text.match(/[一-鿿]/g) || []).length;
  const english = text.length - chinese;
  return Math.ceil(chinese / 2) + Math.ceil(english / 4);
}

export interface HistoryMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * 守卫历史消息：
 * 1. 限制消息数量（max 20）
 * 2. 限制 token 总量（max 8000）
 * 3. 对 user 消息做 sanitize（防注入）
 */
export function guardHistory(messages: HistoryMessage[]): HistoryMessage[] {
  if (!messages || messages.length === 0) return [];

  // 1. Cap to max messages
  const recent = messages.slice(-MAX_MESSAGES);

  // 2. Cap to token budget
  let tokenBudget = MAX_TOKENS;
  const out: HistoryMessage[] = [];

  for (let i = recent.length - 1; i >= 0; i--) {
    const tokens = estimateTokens(recent[i].content);
    if (tokens > tokenBudget) break;
    tokenBudget -= tokens;

    // 3. Sanitize user messages only
    out.unshift({
      role: recent[i].role,
      content:
        recent[i].role === 'user'
          ? sanitizeExternalContent(recent[i].content)
          : recent[i].content,
    });
  }

  return out;
}