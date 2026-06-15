/**
 * Tool Dispatch Node - 执行工具
 */
import { executeToolsBatch } from '../../toolExecutor';
import type { AgentState } from '../state';

export async function toolDispatchNode(state: AgentState): Promise<Partial<AgentState>> {
  if (!state.toolCalls?.length) return {};

  const results = await executeToolsBatch(state.toolCalls, state.userId);

  return {
    toolResults: results.results.map(r => ({
      toolName: r.toolName,
      success: r.success,
      result: r.result,
      error: r.error,
    }))
  };
}