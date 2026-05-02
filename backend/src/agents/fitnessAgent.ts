import { AIMessage, HumanMessage, SystemMessage, ToolMessage } from "@langchain/core/messages";
import { saveWorkoutTool } from '../tools/saveWorkout';
import { saveMeasurementTool } from '../tools/saveMeasurement';
import { queryWorkoutTool } from '../tools/queryWorkout';
import { queryMeasurementTool } from '../tools/queryMeasurement';
import { generatePlanTool } from '../tools/generatePlan';
import { adjustPlanTool } from '../tools/adjustPlan';
import { analyzeExecutionTool } from '../tools/analyzeExecution';
import { preprocessVision } from './plugins/visionPreprocessor';
import { createChatModel } from './chatFactory';
import { getWeekBounds, addDays, toDateStr } from '../utils/dateUtils';
import { saveService } from '../services/saveService';

const tools = [
  saveWorkoutTool,
  saveMeasurementTool,
  queryWorkoutTool,
  queryMeasurementTool,
  generatePlanTool,
  adjustPlanTool,
  analyzeExecutionTool
];

let cachedModel = null;
let modelPromise = null;

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

function extractToolCallsFromContent(content) {
  if (!Array.isArray(content)) {
    return [];
  }

  const toolCalls = [];
  for (const part of content) {
    if (part.type === 'tool_use' && part.name && part.input) {
      toolCalls.push({
        name: part.name,
        input: part.input,
        id: part.id
      });
    }
  }
  return toolCalls;
}

function extractSavedDataFromToolResult(result) {
  // Format: __SAVED_ID__:id:type__message
  const match = result.match(/__SAVED_ID__:(\d+):(\w+)__/);
  if (match) {
    return {
      id: parseInt(match[1], 10),
      type: match[2]
    };
  }
  return null;
}

// 解析文本中的围度数据作为后备
function parseMeasurementFromText(text: string, userId: number) {
  const results: { date: string; measurements: Array<{ body_part: string; value: number }> }[] = [];
  const today = new Date().toISOString().split('T')[0];

  // 胸围
  const chestMatch = text.match(/胸围[是为]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  if (chestMatch) {
    results.push({ date: today, measurements: [{ body_part: 'chest', value: parseFloat(chestMatch[1]) }] });
  }

  // 腰围
  const waistMatch = text.match(/腰围[是为]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  if (waistMatch) {
    results.push({ date: today, measurements: [{ body_part: 'waist', value: parseFloat(waistMatch[1]) }] });
  }

  // 臀围
  const hipsMatch = text.match(/臀围[是为]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  if (hipsMatch) {
    results.push({ date: today, measurements: [{ body_part: 'hips', value: parseFloat(hipsMatch[1]) }] });
  }

  // 臂围 - 先匹配左右，再匹配通用
  const leftBicepsMatch = text.match(/左臂围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const rightBicepsMatch = text.match(/右臂围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const bicepsMatch = text.match(/(?<!左)(?<!右)臂围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);

  if (leftBicepsMatch) {
    results.push({ date: today, measurements: [{ body_part: 'biceps_l', value: parseFloat(leftBicepsMatch[1]) }] });
  }
  if (rightBicepsMatch) {
    results.push({ date: today, measurements: [{ body_part: 'biceps_r', value: parseFloat(rightBicepsMatch[1]) }] });
  }
  if (bicepsMatch && !leftBicepsMatch && !rightBicepsMatch) {
    results.push({ date: today, measurements: [{ body_part: 'biceps_l', value: parseFloat(bicepsMatch[1]) }] });
  }

  // 大腿围 - 先匹配左右，再匹配通用
  const leftThighMatch = text.match(/左大腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const rightThighMatch = text.match(/右大腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const thighMatch = text.match(/(?<!左)(?<!右)大腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);

  if (leftThighMatch) {
    results.push({ date: today, measurements: [{ body_part: 'thigh_l', value: parseFloat(leftThighMatch[1]) }] });
  }
  if (rightThighMatch) {
    results.push({ date: today, measurements: [{ body_part: 'thigh_r', value: parseFloat(rightThighMatch[1]) }] });
  }
  if (thighMatch && !leftThighMatch && !rightThighMatch) {
    results.push({ date: today, measurements: [{ body_part: 'thigh_l', value: parseFloat(thighMatch[1]) }] });
  }

  // 小腿围 - 先匹配左右，再匹配通用
  const leftCalfMatch = text.match(/左小腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const rightCalfMatch = text.match(/右小腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);
  const calfMatch = text.match(/(?<!左)(?<!右)小腿围[是为：：]*\s*(\d+(?:\.\d+)?)\s*(?:cm|厘米)?/i);

  if (leftCalfMatch) {
    results.push({ date: today, measurements: [{ body_part: 'calf_l', value: parseFloat(leftCalfMatch[1]) }] });
  }
  if (rightCalfMatch) {
    results.push({ date: today, measurements: [{ body_part: 'calf_r', value: parseFloat(rightCalfMatch[1]) }] });
  }
  if (calfMatch && !leftCalfMatch && !rightCalfMatch) {
    results.push({ date: today, measurements: [{ body_part: 'calf_l', value: parseFloat(calfMatch[1]) }] });
  }

  // 体重
  const weightMatch = text.match(/(?:体重|体重是)[是为]*\s*(\d+(?:\.\d+)?)\s*(?:kg|公斤)?/i);
  if (weightMatch) {
    results.push({ date: today, measurements: [{ body_part: 'weight', value: parseFloat(weightMatch[1]) }] });
  }

  return results;
}

// 解析文本中的训练数据作为后备
function parseWorkoutFromText(text: string, userId: number) {
  const exercises: Array<{ name: string; sets?: number; reps?: number; duration?: number }> = [];

  // 俯卧撑
  const pushupMatch = text.match(/(\d+)\s*个?俯卧撑/i);
  if (pushupMatch) {
    exercises.push({ name: '俯卧撑', reps: parseInt(pushupMatch[1]) });
  }

  // 深蹲
  const squatMatch = text.match(/(\d+)\s*个?深蹲/i);
  if (squatMatch) {
    exercises.push({ name: '深蹲', reps: parseInt(squatMatch[1]) });
  }

  if (exercises.length === 0) return null;

  return {
    date: new Date().toISOString().split('T')[0],
    exercises
  };
}

async function executeToolCall(toolName, toolInput, userId) {
  const toolMap = {
    save_workout: saveWorkoutTool,
    save_measurement: saveMeasurementTool,
    query_workout: queryWorkoutTool,
    query_measurement: queryMeasurementTool,
    generate_plan: generatePlanTool,
    adjust_plan: adjustPlanTool,
    analyze_execution: analyzeExecutionTool
  };

  const tool = toolMap[toolName];
  if (!tool) {
    throw new Error(`未知的工具: ${toolName}`);
  }

  // Inject userId into the tool input
  const enrichedInput = { userId, ...toolInput };

  console.log('Executing tool:', toolName, 'with input:', JSON.stringify(enrichedInput));

  // Execute the tool
  const result = await tool.func(enrichedInput);
  console.log('Tool result:', result);
  return result;
}

export async function runAgent(userId, message, userContext = null, historyMessages = [], imageUrls: string[] = []) {
  const model = await getModel();

  // Vision preprocessing: analyze images with Zhipu AI if present
  const { message: processedMessage } = await preprocessVision(message, imageUrls);

  // 计算相对日期
  const {
    today: todayStr,
    yesterday: yesterdayStr,
    tomorrow: tomorrowStr,
    dayAfterTomorrow: dayAfterTomorrowStr,
    startOfThisWeek: startOfThisWeekStr,
    startOfLastWeek: startOfLastWeekStr,
    endOfLastWeek: endOfLastWeekStr
  } = getWeekBounds();

  function buildSystemPrompt(userContext) {
    const {
      today: todayStr,
      yesterday: yesterdayStr,
      tomorrow: tomorrowStr,
      dayAfterTomorrow: dayAfterTomorrowStr,
      startOfWeekStr
    } = getWeekBounds();

    let contextSection = '';
    if (userContext?.context_text) {
      const snap = userContext.profile_snapshot ? JSON.parse(userContext.profile_snapshot) : {};
      contextSection = `【用户背景】
${userContext.context_text}

【当前状态】
- 健身目标：${snap.goal || '未知'}
- 健身经验：${snap.experience || '未知'}
- 训练频率：每周${snap.frequency || 0}次
- 当前体重：${snap.body_weight || '未知'}kg
- 当前计划：${userContext.active_plan_name || '无'}（${userContext.active_plan_status || 'N/A'}）`;
    }

    const coachPersona = `【AI 私教人设 - 小Fit】
你是用户的健身私教"小Fit"。性格特点：
- 专业但不死板，用通俗易懂的语言解释健身知识
- 积极鼓励，每次都要找到用户的进步点并给予肯定
- 会适度使用 emoji（💪🔥📈🏆）来增强表达
- 记住用户的历史数据，给出个性化建议

【对话策略】
- 用户沉默 → 主动发起轻松话题（"今天练了吗？感觉怎么样？"）
- 用户疲劳 → 降低强度建议或缩短计划
- 用户沮丧 → 强调进步而非差距（"虽然今天组数少了，但坚持本身就是胜利！"）
- 用户兴奋 → 顺势推进目标（"这个状态继续保持，突破个人纪录指日可待！"）
- 用户完成训练记录后，给出即时的个性化反馈
- 提及用户的进步（如：比上周多了X组、破了个人纪录等）
- 连续记录时给予肯定和鼓励
- 绝不批评用户，即使数据下降也要正向解读

【反馈模板】
当用户完成训练记录时，反馈格式：
1. 先肯定具体的进步点
2. 然后给出数据对比（如：vs 上周）
3. 最后给予鼓励和下一步建议

示例：
"💪 卧推60kg 4×10！比上周多了2组，力量在稳步提升！
继续保持这个节奏，你的目标一定会达成的！"`;

    return `你是健身数据记录助手。用中文回答。

${coachPersona}

${contextSection}

【日期参考 - 今天：${todayStr}】
当用户使用相对日期时，必须根据以下规则计算实际日期：
- "今天" = ${todayStr}
- "昨天" = ${yesterdayStr}
- "明天" = ${tomorrowStr}
- "后天" = ${dayAfterTomorrowStr}
- "X天前" = ${todayStr} 往前推 X 天
- "上周X"（如上周三）= 本周一（${startOfWeekStr}）往前推7天，再加 X-1 天
- "近一周" = ${addDays(new Date(), -7)} 至 ${todayStr}
- "近一个月" = ${addDays(new Date(), -30)} 至 ${todayStr}
- "近三个月" = ${addDays(new Date(), -90)} 至 ${todayStr}

注意：如果用户说的日期无法确定，必须调用 query 工具查询，不要瞎猜日期。

【必须严格执行的工具调用规则】：
当用户**记录**健身训练时（如"跑了X公里"、"深蹲X组"、"练了X分钟"），必须立即调用 save_workout 工具。
当用户**记录**身体围度时（如"胸围X"、"腰围Y"），必须立即调用 save_measurement 工具。
当用户**询问**训练历史、围度记录时，必须调用 query 工具获取真实数据，不得自行编造。

关键触发词：
- 记录类："跑了"、"走了"、"练了"、"做了"、"深蹲"、"卧推"、"俯卧撑"、"hiit"等 → save_workout
- 围度类："胸围"、"腰围"、"臀围"、"臂围"、"腿围" → save_measurement
- 询问类："历史"、"记录"、"统计"、"变化"、"趋势" → query 工具

工具调用格式：
- save_workout: { date: "YYYY-MM-DD", exercises: [...] }
- save_measurement: { date: "YYYY-MM-DD", measurements: [...] }
- query_workout: { start_date: "YYYY-MM-DD", end_date: "YYYY-MM-DD", exercise_type?: "运动类型" }
- query_measurement: { start_date: "YYYY-MM-DD", end_date: "YYYY-MM-DD" }

日期格式YYYY-MM-DD。`;
  }

  // Build messages with user context and history
  const systemPrompt = buildSystemPrompt(userContext);
  const messages = [
    new SystemMessage(systemPrompt),
    ...historyMessages.map(m =>
      m.role === 'user'
        ? new HumanMessage(m.content)
        : new AIMessage(m.content)
    ),
    new HumanMessage(processedMessage)
  ];

  // First call - get tool calls if any
  const response = await model.invoke(messages);
  let savedData = null;

  // Extract tool calls - check both response.tool_calls (from bindTools) and content array
  let toolCalls = extractToolCallsFromContent(response.content);

  // If no tool calls in content, check response.tool_calls (LangChain bindTools format)
  if (toolCalls.length === 0 && response.tool_calls && response.tool_calls.length > 0) {
    toolCalls = response.tool_calls.map(tc => ({
      name: tc.name,
      input: typeof tc.args === 'string' ? JSON.parse(tc.args) : tc.args,
      id: tc.id
    }));
  }

  // If still no tool calls, try to parse measurement/workout data from text response
  if (toolCalls.length === 0) {
    const text = extractText(response.content);
    console.log('Trying to parse text response for measurement/workout data');
    console.log('Extracted text:', text);
    const parsedMeasurements = parseMeasurementFromText(text, userId);
    console.log('Parsed measurements:', parsedMeasurements);
    const parsedWorkout = parseWorkoutFromText(text, userId);
    console.log('Parsed workout:', parsedWorkout);

    if (parsedMeasurements.length > 0) {
      console.log('Parsed measurement data from text:', parsedMeasurements);
      for (const m of parsedMeasurements) {
        try {
          const result = await saveService.saveMeasurement(userId, m.date, m.measurements);
          console.log('Saved measurement via fallback:', result);
          savedData = { id: result.id, type: 'measurement' };
        } catch (err) {
          console.error('Failed to save parsed measurement:', err);
        }
      }
    } else if (parsedWorkout) {
      console.log('Parsed workout data from text:', parsedWorkout);
      try {
        const result = await saveService.saveWorkout(userId, parsedWorkout.date, parsedWorkout.exercises);
        console.log('Saved workout via fallback:', result);
        savedData = { id: result.id, type: 'workout' };
      } catch (err) {
        console.error('Failed to save parsed workout:', err);
      }
    }
  }

  console.log('Response tool_calls:', JSON.stringify(toolCalls));

  // If no tool calls, return the text response with whatever savedData we have
  if (toolCalls.length === 0) {
    const reply = extractText(response.content);
    return { reply, savedData };
  }

  // Execute tool calls and get results
  const toolMessages = [];
  for (const toolCall of toolCalls) {
    try {
      const result = await executeToolCall(toolCall.name, toolCall.input, userId);

      // Extract savedData from the tool result
      if (!savedData) {
        savedData = extractSavedDataFromToolResult(result);
      }

      // Create ToolMessage with proper format
      toolMessages.push(new ToolMessage({
        content: result,
        tool_call_id: toolCall.id
      }));
    } catch (error) {
      console.error('Tool execution error:', toolCall.name, error);
      toolMessages.push(new ToolMessage({
        content: `Error: ${error.message}`,
        tool_call_id: toolCall.id
      }));
    }
  }

  console.log('Tool messages:', toolMessages.map(m => m.content));

  // Continue conversation with tool results
  const updatedMessages = [
    ...messages,
    response,
    ...toolMessages
  ];

  // Second call - get final response after tool execution
  const finalResponse = await model.invoke(updatedMessages);
  console.log('Final response content:', JSON.stringify(finalResponse.content));

  // Extract reply text
  const reply = extractText(finalResponse.content);

  return { reply, savedData };
}

function extractText(content) {
  if (typeof content === 'string') {
    // 过滤掉 <think>...</think> 标签内的思考内容
    return content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  }
  if (Array.isArray(content)) {
    return content
      .filter(p => p.type === 'text')
      .map(p => p.text.replace(/<think>[\s\S]*?<\/think>/g, '').trim())
      .join('');
  }
  return '';
}