/**
 * Vision Preprocessor Plugin
 * Analyzes images using Zhipu AI and injects the result into the message context
 * Works with MiniMax as the main AI by preprocessing images before main prompt
 */

import axios from 'axios';
import { createZhipuVisionChat } from '../chatZhipu';
import { wrapAsExternalContent, sanitizeExternalContent } from '../security/sanitizeExternalContent';

export interface VisionPreprocessorResult {
  message: string;
  imageAnalysis: string | null;
  reply?: string;      // 直接可返回给用户的回复
  toolData?: any;      // 可选的 tool 数据
  error?: string;
}

export async function preprocessVision(
  message: string,
  imageUrls: string[]
): Promise<VisionPreprocessorResult> {
  // No images - skip preprocessing
  if (!imageUrls || imageUrls.length === 0) {
    console.log('[VisionPreprocessor] No images, skipping preprocessing');
    return { message, imageAnalysis: null };
  }

  console.log(`[VisionPreprocessor] Processing ${imageUrls.length} image(s):`, imageUrls);

  try {
    const zhipuChat = createZhipuVisionChat();
    console.log('[VisionPreprocessor] Zhipu chat created, model: glm-4v-flash');

    // 统一的 prompt 描述 - 与主模型使用相同的健身教练 persona
    // 但不需要 tools，只需要图片分析描述
    const analysisPrompt = `你是一位专业的健身教练，具备丰富的运动科学和营养学知识。请分析用户发送的图片：

1. **身体状况评估**
   - 体脂率估算（根据肌肉线条和体态）
   - 体态分析（是否含胸、圆肩、骨盆前倾、驼背等）

2. **肌肉线条评估**
   - 主要肌群线条是否明显
   - 整体肌肉发展是否均衡

3. **评分与建议**
   - 整体评分（1-10分）
   - 具体改进建议（针对发现的问题）
   - 训练方向建议

请用专业但通俗易懂的中文回答，格式清晰有条理。`;

    console.log('[VisionPreprocessor] Calling Zhipu API...');
    const result = await zhipuChat.sendMessage(
      analysisPrompt,
      undefined,
      { temperature: 0.7 },
      imageUrls
    );

    console.log('[VisionPreprocessor] sendMessage returned, result type:', typeof result, ', keys:', result ? Object.keys(result) : 'null');
    console.log('[VisionPreprocessor] result.content type:', typeof result?.content);

    // Validate result
    if (!result || typeof result.content !== 'string' || !result.content.trim()) {
      console.error('[VisionPreprocessor] Invalid result from Zhipu API:', result);
      return { message, imageAnalysis: null, error: '图片解析失败' };
    }

    const imageAnalysis = result.content;
    console.log(`[VisionPreprocessor] Analysis complete, length: ${imageAnalysis.length}`);

    // 构建直接可返回的 reply - 健身教练视角的分析回复
    const reply = `📸 **图片分析结果**\n\n${imageAnalysis}\n\n---\n💡 如果你想基于这张图片制定训练计划或记录身体围度，请直接告诉我。`;

    // 用 XML 标签包裹外部内容 + 中和指令短语，防御间接 Prompt Injection
    const safeImageBlock = wrapAsExternalContent(imageAnalysis, {
      tag: 'image_description',
      source: 'vision-model:glm-4v-flash',
    });
    const safeUserBlock = `<user_message>\n${sanitizeExternalContent(message)}\n</user_message>`;
    const enrichedMessage = `${safeImageBlock}\n\n${safeUserBlock}`;

    return {
      message: enrichedMessage,
      imageAnalysis,
      reply,      // 直接可返回的回复
      toolData: {
        aiReply: reply,
        dataType: 'image_analysis',
        result: { imageAnalysis }
      }
    };
  } catch (error) {
    console.error('[VisionPreprocessor] Failed with error:', error);
    console.error('[VisionPreprocessor] Error message:', error instanceof Error ? error.message : 'Unknown error');

    let errorMsg = '图片解析失败';
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
      console.error(`[VisionPreprocessor] Axios error: ${status}`, data);
      if (status === 400) {
        const msg = data?.error?.message || data?.contentFilter?.[0]?.message;
        errorMsg = msg ? `图片解析失败：${msg}` : '图片解析失败：内容可能被系统过滤';
      } else if (status === 401) {
        errorMsg = '图片解析失败：API密钥无效';
      } else if (status === 429) {
        errorMsg = '图片解析失败：请求过于频繁';
      }
    }

    return {
      message,
      imageAnalysis: null,
      error: errorMsg
    };
  }
}