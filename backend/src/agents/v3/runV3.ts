/**
 * V3 Agent Run API
 */
import { getAgentGraph } from './graph';
import type { AgentState } from './state';

export async function runAgentV3(
  userId: number,
  message: string,
  _userContext: any = null,
  historyMessages: Array<{ role: string; content: string }> = [],
  imageUrls: string[] = []
): Promise<{ reply: string; toolData: any; errors?: string[]; visionError?: string }> {
  const graph = getAgentGraph();

  const initialState: AgentState = {
    userId,
    message,
    imageUrls,
    history: historyMessages.map(m => ({ role: m.role as any, content: m.content })),
    llmMessages: [],
    toolCalls: [],
    toolResults: [],
    reply: '',
    errors: [],
    isFinal: false,
  };

  const result = await graph.invoke(initialState);

  return {
    reply: result.reply || '',
    toolData: result.toolData,
    errors: result.errors?.length ? result.errors : undefined,
    visionError: result.visionResult?.error,
  };
}

export async function* runAgentV3Stream(
  userId: number,
  message: string,
  _userContext: any = null,
  historyMessages: Array<{ role: string; content: string }> = [],
  imageUrls: string[] = []
) {
  const graph = getAgentGraph();

  const initialState: AgentState = {
    userId,
    message,
    imageUrls,
    history: historyMessages.map(m => ({ role: m.role as any, content: m.content })),
    llmMessages: [],
    toolCalls: [],
    toolResults: [],
    reply: '',
    errors: [],
    isFinal: false,
  };

  for await (const chunk of graph.stream(initialState, { streamMode: 'values' })) {
    yield chunk;
  }
}