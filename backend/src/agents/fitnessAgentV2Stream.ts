/**
 * Fitness Agent V2 Stream
 * 流式版 Agent，支持 SSE 实时推送
 */

import { AIMessage, HumanMessage, ToolMessage } from '@langchain/core/messages';
import { preprocessVision } from './plugins/visionPreprocessor';
import { createChatModel } from './chatFactory';
import { executeToolsBatch, extractToolCallsFromResponse } from './toolExecutor';
import { tryParseUserInput } from './fallbackHandler';
import { buildSystemPrompt, buildHistoryMessages } from './promptBuilder';
import { compressHistory, Message } from './historyCompressor';
import { withTimeout, TimeoutError } from '../utils/withTimeout';
import { getLangfuse, createTraceCallbacks } from '../observability/langfuse';
import type { TraceMetadata } from '../observability/langfuse.types';
import type { StreamEvent } from './streamEvents';

// Tool imports
import { saveWorkoutTool } from '../tools/saveWorkout';
import { saveMeasurementTool } from '../tools/saveMeasurement';
import { queryWorkoutTool } from '../tools/queryWorkout';
import { queryMeasurementTool } from '../tools/queryMeasurement';
import { generatePlanTool } from '../tools/generatePlan';
import { adjustPlanTool } from '../tools/adjustPlan';
import { analyzeExecutionTool } from '../tools/analyzeExecution';

const tools = [
  saveWorkoutTool,
  saveMeasurementTool,
  queryWorkoutTool,
  queryMeasurementTool,
  generatePlanTool,
  adjustPlanTool,
  analyzeExecutionTool
];

// Agent 总超时兜底
const AGENT_TOTAL_TIMEOUT_MS = parseInt(process.env.AGENT_TOTAL_TIMEOUT_MS_TEST || '', 10) || 35_000;

// 每次发送 token 之间的延迟（控制推送速度，避免前端渲染过快）
const TOKEN_DELAY_MS = 15;

import { chunkBySentence, sleep } from './streamChunker';

/**
 * 获取绑定工具的模型
 */
async function getModel(callbacks?: any[]) {
  const baseModel = await createChatModel(callbacks);
  return baseModel.bindTools(tools as any);
}

/**
 * 运行流式健身 Agent V2
 * 返回 AsyncGenerator，可以逐个 yield 事件
 */
export async function* runAgentV2Stream(
  userId: number,
  message: string,
  userContext: any = null,
  historyMessages: Array<{ role: string; content: string }> = [],
  imageUrls: string[] = [],
  options?: { securityHint?: string | null }
): AsyncGenerator<StreamEvent> {
  const traceMeta: TraceMetadata = {
    userId,
    agentVersion: 'v2-stream',
    imageCount: imageUrls.length,
    hasClarificationContext: false,
  };
  const callbacks = createTraceCallbacks(traceMeta);

  // 0. 开始
  yield { type: 'start' };

  // 1. Vision 预处理
  yield { type: 'vision_start' };
  const visionResult = await preprocessVision(message, imageUrls);

  if (visionResult.error) {
    yield { type: 'vision_error', message: visionResult.error };
  } else if (visionResult.reply) {
    // vision 早退
    yield { type: 'final', toolData: visionResult.toolData };
    // 流式推送回复
    for (const chunk of chunkBySentence(visionResult.reply)) {
      yield { type: 'token', delta: chunk };
      await sleep(TOKEN_DELAY_MS);
    }
    yield { type: 'done' };
    return;
  } else {
    yield { type: 'vision_done', analysisPreview: visionResult.imageAnalysis?.slice(0, 80) };
  }

  const processedMessage = visionResult.error ? message : visionResult.message;

  // 2. 历史压缩
  const { recent, summary } = await compressHistory(historyMessages);

  // 3. 构建消息
  const systemPrompt = buildSystemPrompt(userContext, summary || undefined, visionResult.error || undefined, options?.securityHint);
  const history = buildHistoryMessages(
    recent.map(m => ({ role: m.role, content: m.content }))
  );
  const messages = [
    systemPrompt,
    ...history,
    new HumanMessage(processedMessage)
  ];

  // 4. 第一次 LLM 调用（决策是否调 tool）
  yield { type: 'thinking' };
  const model = await getModel(callbacks);
  const firstResponse = await model.invoke(messages, { callbacks });
  const toolCalls = extractToolCallsFromResponse(firstResponse);

  let toolResults: any[] = [];
  let toolDataPayload: any = null;

  if (toolCalls.length > 0) {
    // 5. 执行工具
    for (const tc of toolCalls) {
      yield { type: 'tool_call', tool: tc.name };
    }

    toolResults = await executeToolsBatch(toolCalls, userId);

    for (const r of toolResults) {
      yield { type: 'tool_result', tool: r.toolName, success: r.success, preview: r.result?.aiReply?.slice(0, 100) };
      if (r.success && r.result?.dataType) {
        toolDataPayload = r.result;
      }
    }

    // 6. 第二次 LLM 调用 — 真正流式
    messages.push(firstResponse);
    for (const r of toolResults) {
      messages.push(new ToolMessage({
        content: JSON.stringify(r.result ?? { error: r.error }),
        tool_call_id: r.toolCallId
      }));
    }

    // 流式生成最终回复
    const streamIter = await model.stream(messages);

    for await (const chunk of streamIter) {
      const delta = typeof chunk.content === 'string'
        ? chunk.content
        : Array.isArray(chunk.content)
          ? chunk.content.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('')
          : '';

      if (delta) {
        yield { type: 'token', delta };
        await sleep(TOKEN_DELAY_MS);
      }
    }

    yield { type: 'final', toolData: toolDataPayload, visionError: visionResult.error };
    yield { type: 'done' };
    return;
  }

  // 无工具调用：直接流式输出第一次响应
  const text = typeof firstResponse.content === 'string'
    ? firstResponse.content
    : '';

  if (text) {
    // 尝试 fallback
    const fallbackResult = await tryParseUserInput(text, userId);
    if (fallbackResult.success) {
      toolDataPayload = fallbackResult.toolData;
    }

    // 流式输出
    for (const chunk of chunkBySentence(text)) {
      yield { type: 'token', delta: chunk };
      await sleep(TOKEN_DELAY_MS);
    }
  }

  yield { type: 'final', toolData: toolDataPayload, visionError: visionResult.error };
  yield { type: 'done' };
}

/**
 * 带超时的流式 Agent（供 Express 路由调用）
 */
export async function runAgentV2StreamWithTimeout(
  ...args: Parameters<typeof runAgentV2Stream>
): Promise<AsyncGenerator<StreamEvent>> {
  // 将 generator 包装为带超时的版本
  const gen = runAgentV2Stream(...args);

  // 注意：实际超时需要在调用方处理
  // 这里返回 generator，由 Express 路由控制超时

  return gen;
}