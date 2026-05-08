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
  console.log('[Step 1] Vision preprocessing...');
  const { message: processedMessage } = await preprocessVision(message, imageUrls);
  console.log('[Step 1] Processed message:', processedMessage.substring(0, 200));

  // 1.5 历史消息压缩（如果需要）
  console.log('[Step 1.5] Compressing history, original messages:', historyMessages.length);
  const rawMessages: Message[] = historyMessages.map(m => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
    timestamp: Date.now()
  }));
  const { recent: compressedHistory, summary: historySummary } = await compressHistory(rawMessages);
  console.log('[Step 1.5] History compressed:', historyMessages.length, '->', compressedHistory.length, 'messages');
  if (historySummary) {
    console.log('[Step 1.5] History summary:', historySummary.substring(0, 200));
  }

  // 2. 构建消息
  console.log('[Step 2] Building messages...');
  const systemPrompt = buildSystemPrompt(userContext, historySummary);
  const history = buildHistoryMessages(
    compressedHistory.map(m => ({ role: m.role, content: m.content }))
  );
  const messages = [
    systemPrompt,
    ...history,
    new HumanMessage(processedMessage)
  ];
  console.log('[Step 2] Messages prepared:', messages.length, '(system +', history.length, 'history + 1 current)');

  // 3. LLM 调用
  const model = await getModel();
  console.log('[Step 3] Invoking LLM...');
  console.log('[Step 3] Tool definitions:', tools.map(t => t.name).join(', '));
  const response = await model.invoke(messages);
  console.log('[Step 3] LLM response received, content type:', typeof response.content);

  // 4. 提取工具调用
  console.log('[Step 4] Extracting tool calls...');
  const toolCalls = extractToolCallsFromResponse(response);
  console.log('[Step 4] Tool calls extracted:', toolCalls.length);
  for (const tc of toolCalls) {
    console.log('[Step 4]   -', tc.name, ':', JSON.stringify(tc.input).substring(0, 100));
  }

  // 5. 处理工具调用
  if (toolCalls.length === 0) {
    console.log('[Step 5] No tool calls detected');
    console.log('[Step 5] Raw response content:', extractText(response.content).substring(0, 300));

    // 无工具调用 → 尝试 fallback
    console.log('[Step 5] Trying fallback parsing...');
    const fallbackResult = await tryParseUserInput(
      extractText(response.content),
      userId
    );

    if (fallbackResult.success) {
      console.log('[Step 5] Fallback succeeded:', fallbackResult.reply);
      console.log('[Step 5] ToolData:', JSON.stringify(fallbackResult.toolData)?.substring(0, 200));
      return {
        reply: fallbackResult.reply,
        toolData: fallbackResult.toolData
      };
    }

    console.log('[Step 5] Fallback failed');
    // 最终返回纯文本
    console.log('[Step 5] Returning text response');
    return {
      reply: extractText(response.content),
      toolData: null
    };
  }

  // 6. 执行工具（批量并行）
  console.log('[Step 6] Executing', toolCalls.length, 'tool calls in parallel...');
  const executionResult = await executeToolsBatch(toolCalls, userId);
  console.log('[Step 6] Execution complete:', executionResult.successCount, 'success,', executionResult.failureCount, 'failed');
  for (const r of executionResult.results) {
    if (r.success) {
      console.log('[Step 6]   ✓', r.toolName, '->', JSON.stringify(r.result)?.substring(0, 100));
    } else {
      console.log('[Step 6]   ✗', r.toolName, '->', r.error);
    }
  }

  // 7. 构建 ToolMessage
  console.log('[Step 7] Building tool messages for second LLM call...');
  const toolMessages = buildToolMessages(response, toolCalls, executionResult.results);

  // 8. 二次 LLM 调用
  console.log('[Step 8] Calling LLM for final response with tool results...');
  const updatedMessages = [
    ...messages,
    response,
    ...toolMessages
  ];
  console.log('[Step 8] Updated messages count:', updatedMessages.length);
  const finalResponse = await model.invoke(updatedMessages);

  // 9. 提取最终回复
  const reply = extractText(finalResponse.content);
  console.log('[Step 9] Final reply:', reply.substring(0, 200));

  // 10. 获取成功的 toolData（如果有）
  const successfulResult = executionResult.results.find(r => r.success && r.result);
  const toolData = successfulResult?.result || null;
  if (toolData) {
    console.log('[Step 10] ToolData attached:', JSON.stringify(toolData)?.substring(0, 200));
  }

  console.log('[Complete] Agent finished. Success:', executionResult.successCount, 'Errors:', executionResult.errors.length);

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