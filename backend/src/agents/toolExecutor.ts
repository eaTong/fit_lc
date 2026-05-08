/**
 * 工具执行器
 * 支持重试机制、统一校验、熔断和错误恢复
 */

import { validateToolInput, formatValidationError, ValidationResult } from '../tools/utils/validation';
import { isCircuitOpen, recordSuccess, recordFailure, toolKey } from './circuitBreaker';

// Tool imports
import { saveWorkoutTool } from '../tools/saveWorkout';
import { saveMeasurementTool } from '../tools/saveMeasurement';
import { queryWorkoutTool } from '../tools/queryWorkout';
import { queryMeasurementTool } from '../tools/queryMeasurement';
import { generatePlanTool } from '../tools/generatePlan';
import { adjustPlanTool } from '../tools/adjustPlan';
import { analyzeExecutionTool } from '../tools/analyzeExecution';

export interface ToolExecutionResult {
  success: boolean;
  toolName: string;
  toolCallId?: string;
  result?: any;
  error?: string;
  validationResult?: ValidationResult;
  retries: number;
}

interface ToolCall {
  name: string;
  input: Record<string, any>;
  id: string;
}

// 配置
const MAX_RETRIES = 2;
const RETRY_DELAY_BASE = 1000; // ms

// 工具映射
const toolMap: Record<string, any> = {
  save_workout: saveWorkoutTool,
  save_measurement: saveMeasurementTool,
  query_workout: queryWorkoutTool,
  query_measurement: queryMeasurementTool,
  generate_plan: generatePlanTool,
  adjust_plan: adjustPlanTool,
  analyze_execution: analyzeExecutionTool
};

// 工具分类（用于并行执行）
export type ToolCategory = 'save' | 'query' | 'plan' | 'analyze';

export function categorizeTool(toolName: string): ToolCategory {
  if (toolName.startsWith('save_')) return 'save';
  if (toolName.startsWith('query_')) return 'query';
  if (toolName === 'generate_plan' || toolName === 'adjust_plan') return 'plan';
  return 'analyze';
}

/**
 * 执行单个工具调用（带重试）
 */
export async function executeToolWithRetry(
  toolCall: ToolCall,
  userId: number
): Promise<ToolExecutionResult> {
  const { name: toolName, input, id: toolCallId } = toolCall;
  const tool = toolMap[toolName];

  if (!tool) {
    return {
      success: false,
      toolName,
      toolCallId,
      error: `未知工具: ${toolName}`,
      retries: 0
    };
  }

  // 预校验
  const enrichedInput = { userId, ...input };
  const validation = validateToolInput(toolName, enrichedInput);

  if (!validation.valid) {
    return {
      success: false,
      toolName,
      toolCallId,
      validationResult: validation,
      error: formatValidationError(validation),
      retries: 0
    };
  }

  // 检查熔断器
  const circuitKey = toolKey(toolName);
  if (isCircuitOpen(circuitKey)) {
    return {
      success: false,
      toolName,
      toolCallId,
      error: `工具 ${toolName} 暂时不可用，请稍后再试（熔断保护）`,
      retries: 0
    };
  }

  // 执行（带重试）
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await tool.func(enrichedInput);

      // 解析结果
      let parsedResult: any;
      try {
        parsedResult = JSON.parse(result);
      } catch {
        parsedResult = { raw: result };
      }

      // 检查是否是 needs_more_info 状态
      if (parsedResult.status === 'needs_more_info') {
        return {
          success: false,
          toolName,
          toolCallId,
          result: parsedResult,
          error: parsedResult.aiReply || '信息不完整',
          validationResult: { valid: false, missingFields: parsedResult.missingFields || [] },
          retries: attempt
        };
      }

      // 成功，记录熔断器
      recordSuccess(circuitKey);

      return {
        success: true,
        toolName,
        toolCallId,
        result: parsedResult,
        retries: attempt
      };

    } catch (e: any) {
      lastError = e;

      // 如果是验证错误，不重试
      if (e.message.includes('不完整') || e.message.includes('缺少')) {
        recordFailure(circuitKey);
        return {
          success: false,
          toolName,
          toolCallId,
          error: e.message,
          retries: attempt
        };
      }

      // 如果还有重试次数，等待后重试
      if (attempt < MAX_RETRIES) {
        const delay = RETRY_DELAY_BASE * Math.pow(2, attempt);
        await sleep(delay);
      }
    }
  }

  // 所有重试都失败
  recordFailure(circuitKey);
  return {
    success: false,
    toolName,
    toolCallId,
    error: lastError?.message || 'Unknown error',
    retries: MAX_RETRIES
  };
}

/**
 * 批量执行工具调用（按类别分组并行）
 */
export async function executeToolsBatch(
  toolCalls: ToolCall[],
  userId: number
): Promise<{
  results: ToolExecutionResult[];
  successCount: number;
  failureCount: number;
  errors: string[];
}> {
  // 按类别分组
  const categorized = categorizeToolCalls(toolCalls);

  // 并行执行各类别
  const executeInCategory = async (calls: ToolCall[]) => {
    return Promise.all(calls.map(call => executeToolWithRetry(call, userId)));
  };

  const [saveResults, queryResults, planResults, analyzeResults] = await Promise.all([
    executeInCategory(categorized.save),
    executeInCategory(categorized.query),
    executeInCategory(categorized.plan),
    executeInCategory(categorized.analyze)
  ]);

  const allResults = [...saveResults, ...queryResults, ...planResults, ...analyzeResults];

  return {
    results: allResults,
    successCount: allResults.filter(r => r.success).length,
    failureCount: allResults.filter(r => !r.success).length,
    errors: allResults.filter(r => !r.success).map(r => `${r.toolName}: ${r.error}`)
  };
}

/**
 * 分类工具调用
 */
function categorizeToolCalls(toolCalls: ToolCall[]): Record<ToolCategory, ToolCall[]> {
  const result: Record<ToolCategory, ToolCall[]> = {
    save: [],
    query: [],
    plan: [],
    analyze: []
  };

  for (const call of toolCalls) {
    const category = categorizeTool(call.name);
    result[category].push(call);
  }

  return result;
}

/**
 * 从 LLM 响应中提取工具调用
 */
export function extractToolCallsFromResponse(response: any): ToolCall[] {
  const toolCalls: ToolCall[] = [];

  // 方式1：从 response.content 数组中提取
  if (Array.isArray(response.content)) {
    for (const part of response.content) {
      if (part.type === 'tool_use' && part.name && part.input) {
        toolCalls.push({
          name: part.name,
          input: part.input,
          id: part.id || part.name
        });
      }
    }
  }

  // 方式2：从 response.tool_calls 中提取（LangChain bindTools 格式）
  if (toolCalls.length === 0 && response.tool_calls && Array.isArray(response.tool_calls)) {
    for (const tc of response.tool_calls) {
      toolCalls.push({
        name: tc.name,
        input: typeof tc.args === 'string' ? JSON.parse(tc.args) : tc.args,
        id: tc.id || tc.name
      });
    }
  }

  return toolCalls;
}

/**
 * 从 LLM 响应中提取文本内容
 */
export function extractTextFromResponse(content: any): string {
  if (typeof content === 'string') {
    // 过滤掉 <think>... 标签内的思考内容
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

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}