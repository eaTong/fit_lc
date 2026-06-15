/**
 * LLM Call Node - 调用 LLM 决定是否调工具
 */
import { HumanMessage } from '@langchain/core/messages';
import { createChatModel } from '../../chatFactory';
import { extractToolCallsFromResponse } from '../../toolExecutor';
import { buildSystemPrompt, buildHistoryMessages } from '../../promptBuilder';
import { saveWorkoutTool } from '../../../tools/saveWorkout';
import { saveMeasurementTool } from '../../../tools/saveMeasurement';
import { queryWorkoutTool } from '../../../tools/queryWorkout';
import { queryMeasurementTool } from '../../../tools/queryMeasurement';
import { generatePlanTool } from '../../../tools/generatePlan';
import { adjustPlanTool } from '../../../tools/adjustPlan';
import { analyzeExecutionTool } from '../../../tools/analyzeExecution';
import type { AgentState } from '../state';

const tools = [
  saveWorkoutTool,
  saveMeasurementTool,
  queryWorkoutTool,
  queryMeasurementTool,
  generatePlanTool,
  adjustPlanTool,
  analyzeExecutionTool,
];

export async function llmCallNode(state: AgentState): Promise<Partial<AgentState>> {
  const model = await createChatModel();
  const boundModel = model.bindTools(tools);

  const message = state.visionResult?.message || state.message;
  const systemPrompt = buildSystemPrompt(null, state.historySummary || undefined);
  const history = buildHistoryMessages(state.history.map(m => ({ role: m.role, content: m.content })));

  const messages = [systemPrompt, ...history, new HumanMessage(message)];

  const response = await boundModel.invoke(messages);
  const toolCalls = extractToolCallsFromResponse(response);

  let reply = '';
  if (typeof response.content === 'string') {
    reply = response.content;
  } else if (Array.isArray(response.content)) {
    reply = response.content.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('');
  }

  return { llmMessages: [response], toolCalls, reply };
}