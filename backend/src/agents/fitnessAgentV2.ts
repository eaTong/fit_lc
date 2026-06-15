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
import { clarificationManager } from './clarification';
import { extractClarification补充 } from './clarification/extractClarification';
import { withTimeout, TimeoutError } from '../utils/withTimeout';
import { getLangfuse, createTraceCallbacks } from '../observability/langfuse';
import type { TraceMetadata } from '../observability/langfuse.types';
import { recallMemory, buildMemoryContext } from '../memory/memoryRecall';
import { extractMemory } from '../memory/memoryExtractor';

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

// Agent 总超时兜底（防 tool/DB 慢调用累积导致 HTTP 挂死，Sprint 1 T4）
// 默认 35s；可通过环境变量 AGENT_TOTAL_TIMEOUT_MS_TEST 注入（仅供测试用）
const AGENT_TOTAL_TIMEOUT_MS = parseInt(process.env.AGENT_TOTAL_TIMEOUT_MS_TEST || '', 10) || 35_000;

// 注：S1 T8 起不再缓存 bound model — 每次调用新 bind tools 以注入 callbacks
// （ChatOpenAI 构造很轻量，可接受）
async function getModel(callbacks?: any[]) {
  const baseModel = await createChatModel(callbacks);
  return baseModel.bindTools(tools as any);
}

/**
 * 运行健身 Agent V2（带 35s 总超时兜底）
 * - 单次 LLM 调用由 ChatOpenAI 自身 timeout 30s 保护
 * - 整体流程（LLM × 2 + tool × N）由 withTimeout 35s 兜底
 * - 超时时返回降级 reply，避免 HTTP 请求挂死到 nginx 502
 */
export async function runAgentV2(
  userId: number,
  message: string,
  userContext: any = null,
  historyMessages: Array<{ role: string; content: string }> = [],
  imageUrls: string[] = [],
  options?: { securityHint?: string | null }
): Promise<{
  reply: string;
  toolData: any;
  errors?: string[];
  clarificationEnded?: boolean;
  needsClarification?: boolean;
  visionError?: string;
}> {
  try {
    return await withTimeout(
      _runAgentV2Inner(userId, message, userContext, historyMessages, imageUrls, options),
      AGENT_TOTAL_TIMEOUT_MS,
      `runAgentV2(user=${userId})`
    );
  } catch (e: any) {
    if (e instanceof TimeoutError) {
      console.error('[FitnessAgentV2] Total timeout exceeded:', e.message);
      return {
        reply: '抱歉，AI 响应有点慢，请稍等几秒再试一次。如果一直不行，可以换个简短的描述。',
        toolData: null,
        errors: [e.message],
      };
    }
    throw e;
  }
}

/**
 * 运行健身 Agent V2
 * 历史消息超过阈值时自动压缩
 *
 * 注：导出（不仅是内部函数）便于测试时 mock。
 */
export async function _runAgentV2Inner(
  userId: number,
  message: string,
  userContext: any = null,
  historyMessages: Array<{ role: string; content: string }> = [],
  imageUrls: string[] = [],
  options?: { securityHint?: string | null }
): Promise<{
  reply: string;
  toolData: any;
  errors?: string[];
  clarificationEnded?: boolean;
  needsClarification?: boolean;
  visionError?: string;
}> {
  console.log('[FitnessAgentV2] Starting agent with message:', message.substring(0, 100));

  // 0. Langfuse 观测：构造 trace + callback handler
  const traceMeta: TraceMetadata = {
    userId,
    agentVersion: 'v2',
    imageCount: imageUrls.length,
    hasClarificationContext: false, // 会在 Step 1.6 之后更新
  };
  const callbacks = createTraceCallbacks(traceMeta);
  // 顶层 trace：可选，CallbackHandler 已经会自动建 trace；这里手动建是为了能把 userInput 完整记录
  const fuse = getLangfuse();
  const langfuseTrace = fuse?.trace({
    name: 'runAgentV2',
    userId: String(userId),
    metadata: traceMeta,
    input: { message: message.slice(0, 500), imageUrls },
  });

  // 1. Vision 预处理
  console.log('[Step 1] Vision preprocessing...');
  const visionResult = await preprocessVision(message, imageUrls);
  let processedMessage = visionResult.message;
  let visionError = visionResult.error || undefined;
  console.log('[Step 1] Processed message:', processedMessage.substring(0, 200));

  // 如果 vision 失败：降级（不终止），让主 LLM 基于文字继续帮助用户
  // visionError 会通过 promptBuilder 注入到 system prompt，并通过返回值透传给前端
  if (visionError) {
    console.warn('[FitnessAgentV2] Vision failed, degrading to text-only:', visionError);
    processedMessage = message; // 用用户原始 message，不带【图片解析结果】前缀
  } else if (visionResult.reply) {
    // vision 成功且 plugin 决定直接返回（图片分析独立回复，无需主 LLM）
    console.log('[FitnessAgentV2] Vision succeeded with direct reply, returning early');
    return {
      reply: visionResult.reply,
      toolData: visionResult.toolData || null,
      visionError: undefined,
    };
  }

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

  // 1.6 检查澄清会话
  console.log('[Step 1.6] Checking for active clarification session...');
  const activeClarification = await clarificationManager.getActiveSession(userId);
  if (activeClarification) {
    console.log('[Step 1.6] Found active session:', activeClarification.id);

    const { supplementedInput, hasNewData } = await extractClarification补充(
      processedMessage,
      activeClarification,
      userId
    );

    if (hasNewData) {
      console.log('[Step 1.6] Extracted new data from clarification response');

      const stillMissing = activeClarification.missingFields.filter(f => {
        const fieldPath = f.field;
        if (fieldPath.includes('[')) {
          const parts = fieldPath.split(/[\[\]]/).filter(p => p.length > 0);
          const arrayKey = parts[0];
          let fieldName = 'sets';
          for (let i = parts.length - 1; i >= 0; i--) {
            if (!/^\d+$/.test(parts[i])) {
              fieldName = parts[i].replace(/^\./, '');
              break;
            }
          }
          return !supplementedInput[arrayKey]?.[0]?.[fieldName];
        }
        return supplementedInput[fieldPath] === undefined;
      });

      if (stillMissing.length === 0) {
        // 澄清完成，直接执行工具而不依赖 LLM 再次调用
        await clarificationManager.completeSession(activeClarification.id, userId, supplementedInput);
        console.log('[Step 1.6] Clarification complete, executing tool directly');

        // 直接执行工具，携带完整参数
        const toolResult = await executeToolsBatch([{
          name: activeClarification.toolName,
          input: supplementedInput,
          id: `clarification-complete-${activeClarification.id}`
        }], userId);

        if (toolResult.successCount > 0) {
          const result = toolResult.results[0];
          console.log('[Step 1.6] Tool executed successfully:', result.result?.aiReply);
          return {
            reply: result.result?.aiReply || '信息已保存',
            toolData: result.result
          };
        } else {
          // 工具执行失败，返回错误
          return {
            reply: toolResult.errors[0] || '保存失败，请重试',
            toolData: null
          };
        }
      } else {
        activeClarification.partialInput = supplementedInput;
        activeClarification.missingFields = stillMissing;
        activeClarification.clarificationCount++;
        console.log('[Step 1.6] Still missing:', stillMissing.map(f => f.label).join(', '));

        if (clarificationManager.shouldEndClarification(activeClarification)) {
          const reply = await clarificationManager.generateReply(activeClarification);
          return { reply, toolData: null, clarificationEnded: true };
        }

        const reply = await clarificationManager.generateReply(activeClarification);
        return { reply, toolData: { clarificationSessionId: activeClarification.id }, needsClarification: true };
      }
    } else {
      // 无新数据，也递增计数防止无限循环
      activeClarification.clarificationCount++;
      console.log('[Step 1.6] No new data extracted, generating follow-up question');
      const reply = await clarificationManager.generateReply(activeClarification);
      return { reply, toolData: { clarificationSessionId: activeClarification.id }, needsClarification: true };
    }
  }

  // 1.5 Memory 召回（Sprint 7）：获取用户长期记忆
  console.log('[Step 1.5] Recalling long-term memory...');
  let memoryContext = '';
  try {
    const memories = await recallMemory(userId, processedMessage, { minImportance: 5 });
    if (memories.length > 0) {
      memoryContext = buildMemoryContext(memories);
      console.log('[Step 1.5] Memory recalled:', memories.length, 'items');
    }
  } catch (e) {
    console.warn('[Step 1.5] Memory recall failed:', (e as Error).message);
  }

  // 2. 构建消息
  console.log('[Step 2] Building messages...');
  const systemPrompt = buildSystemPrompt(userContext, historySummary, visionError, options?.securityHint, memoryContext);
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
  const model = await getModel(callbacks);
  console.log('[Step 3] Invoking LLM...');
  console.log('[Step 3] Tool definitions:', tools.map(t => t.name).join(', '));
  const response = await model.invoke(messages, { callbacks });
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
        toolData: fallbackResult.toolData,
        visionError,
      };
    }

    console.log('[Step 5] Fallback failed');
    // 最终返回纯文本
    console.log('[Step 5] Returning text response');
    return {
      reply: extractText(response.content),
      toolData: null,
      visionError,
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

  // 6.1 检查验证失败并创建澄清会话
  for (const result of executionResult.results) {
    if (!result.success && result.validationResult && !result.validationResult.valid) {
      console.log('[Step 6.1] Validation failed, missing fields:', result.validationResult.missingFields.map(f => f.label).join(', '));

      const activeSession = await clarificationManager.getActiveSession(userId);
      if (activeSession && clarificationManager.shouldEndClarification(activeSession)) {
        const reply = await clarificationManager.generateReply(activeSession);
        return { reply, toolData: null, clarificationEnded: true };
      }

      const session = await clarificationManager.createSession({
        toolName: result.toolName,
        userId,
        partialInput: toolCalls.find(tc => tc.name === result.toolName)?.input || {},
        missingFields: result.validationResult.missingFields,
        userMessage: processedMessage,
        llmInterpretation: extractToolInterpretation(response, toolCalls)
      });

      console.log('[Step 6.1] Created clarification session:', session.id);

      const reply = await clarificationManager.generateReply(session);
      return { reply, toolData: { clarificationSessionId: session.id }, needsClarification: true };
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
  const finalResponse = await model.invoke(updatedMessages, { callbacks });

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

  langfuseTrace?.update({ output: { reply: reply?.slice(0, 500) } });

  // Memory 抽取（Sprint 7）：后台异步保存记忆
  try {
    extractMemory(userId, message, reply).then(result => {
      if (result.extracted > 0) {
        console.log('[Memory] Extracted', result.extracted, 'new memories');
      }
    }).catch(e => console.warn('[Memory] Extraction failed:', e.message));
  } catch (e) {
    console.warn('[Memory] Extraction error:', (e as Error).message);
  }

  return {
    reply,
    toolData,
    errors: executionResult.errors.length > 0 ? executionResult.errors : undefined,
    visionError
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

/**
 * 从 LLM 响应中提取工具调用解释
 */
function extractToolInterpretation(response: any, toolCalls: any[]): string {
  if (toolCalls.length > 0) {
    return `调用工具 ${toolCalls[0].name}，参数：${JSON.stringify(toolCalls[0].input)}`;
  }
  return extractText(response.content);
}

// ============== 辅助函数 ==============

/**
 * 清除模型缓存（用于测试或重新加载配置）
 * S1 T8 起无模块级缓存，此函数保留为 noop 以保持向后兼容
 */
export function clearModelCache() {
  // noop — 当前实现不缓存 model
}

/**
 * 获取 Agent 版本
 */
export function getAgentVersion(): string {
  return '2.0.0';
}