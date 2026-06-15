/**
 * Final Reply Node - 生成最终回复
 */
import { ToolMessage } from '@langchain/core/messages';
import { createChatModel } from '../../chatFactory';
import type { AgentState } from '../state';

export async function finalReplyNode(state: AgentState): Promise<Partial<AgentState>> {
  try {
    const model = await createChatModel();

    const messages = [
      ...state.llmMessages,
      ...state.toolResults.map(tr =>
        new ToolMessage({
          content: JSON.stringify(tr.result || { error: tr.error }),
          tool_call_id: tr.toolName,
        })
      )
    ];

    // 流式生成最终回复
    const stream = await model.stream(messages);
    let reply = '';
    for await (const chunk of stream) {
      const delta = typeof chunk.content === 'string' ? chunk.content : '';
      reply += delta;
    }

    const successfulResult = state.toolResults.find(r => r.success && r.result?.dataType);

    return { reply, toolData: successfulResult?.result, isFinal: true };
  } catch (error: any) {
    return { reply: '抱歉，出错了', errors: [error.message], isFinal: true };
  }
}