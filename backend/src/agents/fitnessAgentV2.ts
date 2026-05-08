/**
 * Fitness Agent V2
 * 优化版 Agent，支持：
 * - 批量工具调用（并行执行）
 * - 统一校验
 * - Fallback 机制
 * - 重试机制
 */

import { AIMessage, HumanMessage, ToolMessage } from '@langchain/core/messages';
import { preprocessVision } from './plugins/visionPreprocessor';
import { createChatModel } from './chatFactory';
import { executeToolsBatch, extractToolCallsFromResponse, ToolExecutionResult } from './toolExecutor';
import { tryParseUserInput } from './fallbackHandler';
import { buildSystemPrompt, buildHistoryMessages } from './promptBuilder';
import { compressHistory, markToolMessages, Message } from './historyCompressor';

// 工具列表（用于 bindTools）
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

// 模型缓存
let cachedModel: any = null;
let modelPromise: Promise<any> | null = null;

async function getModel() {
  if (cachedModel) {
    return cachedModel;
  }
  if (modelPromise) {
    return modelPromise;
  }
  modelPromise = (async () => {
    const model = await createChatModel();
    cachedModel = model.bindTools(tools as any);
    return cachedModel;
  })();
  return modelPromise;
}

/**
 * 运行健身 Agent V2
 * 历史消息超过阈值时自动压缩
 */
export async function runAgentV2(
  userId: number,
  message: string,
  userContext: any = null,
  historyMessages: Array<{ role: string; content: string }> = [],
  imageUrls: string[] = []
): Promise<{
  reply: string;
  toolData: any;
  errors?: string[];
}> {
  console.log('[FitnessAgentV2] Starting agent with message:', message.substring(0, 100));

  // 1. Vision 预处理
  const { message: processedMessage } = await preprocessVision(message, imageUrls);
  console.log('[FitnessAgentV2] Processed message:', processedMessage.substring(0, 100));

  // 1.5 历史消息压缩（如果需要）
  const rawMessages: Message[] = historyMessages.map(m => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
    timestamp: Date.now()  // 默认时间戳
  }));
  const { recent: compressedHistory, summary: historySummary } = await compressHistory(rawMessages);

  // 2. 构建消息
  const systemPrompt = buildSystemPrompt(userContext, historySummary);
  const history = buildHistoryMessages(
    compressedHistory.map(m => ({ role: m.role, content: m.content }))
  );
  const messages = [
    systemPrompt,
    ...history,
    new HumanMessage(processedMessage)
  ];

  console.log('[FitnessAgentV2] Messages prepared:', messages.length, 'history compressed:', compressedHistory.length !== historyMessages.length);

  // 3. LLM 调用
  const model = await getModel();
  console.log('[FitnessAgentV2] Invoking model...');
  const response = await model.invoke(messages);
  console.log('[FitnessAgentV2] Model response received');

  // 4. 提取工具调用
  const toolCalls = extractToolCallsFromResponse(response);
  console.log('[FitnessAgentV2] Extracted tool calls:', toolCalls.length);

  // 5. 处理工具调用
  if (toolCalls.length === 0) {
    // 无工具调用 → 尝试 fallback
    console.log('[FitnessAgentV2] No tool calls, trying fallback...');
    const fallbackResult = await tryParseUserInput(
      extractText(response.content),
      userId
    );

    if (fallbackResult.success) {
      console.log('[FitnessAgentV2] Fallback succeeded');
      return {
        reply: fallbackResult.reply,
        toolData: fallbackResult.toolData
      };
    }

    // 最终返回纯文本
    console.log('[FitnessAgentV2] Fallback failed, returning text response');
    return {
      reply: extractText(response.content),
      toolData: null
    };
  }

  // 6. 执行工具（批量并行）
  console.log('[FitnessAgentV2] Executing', toolCalls.length, 'tool calls...');
  const executionResult = await executeToolsBatch(toolCalls, userId);
  console.log('[FitnessAgentV2] Execution complete:', executionResult.successCount, 'success,', executionResult.failureCount, 'failed');

  // 7. 构建 ToolMessage
  const toolMessages = buildToolMessages(response, toolCalls, executionResult.results);

  // 8. 二次 LLM 调用
  console.log('[FitnessAgentV2] Calling model for final response...');
  const updatedMessages = [
    ...messages,
    response,
    ...toolMessages
  ];
  const finalResponse = await model.invoke(updatedMessages);

  // 9. 提取最终回复
  const reply = extractText(finalResponse.content);

  // 10. 获取成功的 toolData（如果有）
  const successfulResult = executionResult.results.find(r => r.success && r.result);
  const toolData = successfulResult?.result || null;

  console.log('[FitnessAgentV2] Done. Success:', executionResult.successCount, 'Errors:', executionResult.errors.length);

  return {
    reply,
    toolData,
    errors: executionResult.errors.length > 0 ? executionResult.errors : undefined
  };
}

/**
 * 构建 ToolMessage 数组
 */
function buildToolMessages(
  response: any,
  toolCalls: Array<{ name: string; input: any; id: string }>,
  results: ToolExecutionResult[]
): ToolMessage[] {
  const toolMessages: ToolMessage[] = [];

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const toolCall = toolCalls[i];

    if (result.success) {
      // 成功结果
      const content = typeof result.result === 'string'
        ? result.result
        : JSON.stringify(result.result);

      toolMessages.push(new ToolMessage({
        content,
        tool_call_id: result.toolCallId || toolCall.id
      }));
    } else {
      // 失败或需要补充信息
      let errorContent: string;

      if (result.validationResult && !result.validationResult.valid) {
        // 需要补充信息
        const missingLabels = result.validationResult.missingFields.map(f => f.label).join('、');
        errorContent = JSON.stringify({
          status: 'needs_more_info',
          aiReply: `信息不完整，需要补充：${missingLabels}`,
          dataType: toolCall.name.replace('_', ''),
          missingFields: result.validationResult.missingFields
        });
      } else {
        // 执行错误
        errorContent = JSON.stringify({
          status: 'error',
          aiReply: result.error || '工具执行失败',
          dataType: toolCall.name.replace('_', '')
        });
      }

      toolMessages.push(new ToolMessage({
        content: errorContent,
        tool_call_id: result.toolCallId || toolCall.id
      }));
    }
  }

  return toolMessages;
}

/**
 * 从响应内容中提取文本
 */
function extractText(content: any): string {
  if (typeof content === 'string') {
    return content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  }
  if (Array.isArray(content)) {
    return content
      .filter((p: any) => p.type === 'text')
      .map((p: any) => p.text?.replace(/<think>[\s\S]*?<\/think>/g, '').trim())
      .join('');
  }
  return '';
}

// ============== 辅助函数 ==============

/**
 * 清除模型缓存（用于测试或重新加载配置）
 */
export function clearModelCache() {
  cachedModel = null;
  modelPromise = null;
}

/**
 * 获取 Agent 版本
 */
export function getAgentVersion(): string {
  return '2.0.0';
}