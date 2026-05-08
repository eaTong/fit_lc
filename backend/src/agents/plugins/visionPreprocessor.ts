/**
 * Vision Preprocessor Plugin
 * Analyzes images using Zhipu AI and injects the result into the message context
 * Works with MiniMax as the main AI by preprocessing images before main prompt
 */

import axios from 'axios';
import { createZhipuVisionChat } from '../chatZhipu';

export interface VisionPreprocessorResult {
  message: string;
  imageAnalysis: string | null;
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
    console.log('[VisionPreprocessor] Zhipu chat created, model should be glm-4v-flash');

    const analysisPrompt = `你是一位专业的健身教练，请分析这张图片中人物的身体状况：

1. 体脂率估算（根据肌肉线条和体态）
2. 体态评估（是否含胸、圆肩、骨盆前倾、驼背等）
3. 肌肉线条评估（主要肌群是否明显）
4. 整体评分（1-10分）
5. 改进建议

请用中文回答，语言专业但通俗易懂。格式简洁。`;

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
      return { message, imageAnalysis: null };
    }

    console.log(`[VisionPreprocessor] Analysis complete, length: ${result.content.length}`);
    console.log(`[VisionPreprocessor] Analysis preview: ${result.content.substring(0, 100)}...`);

    // Inject analysis result into message as prefix
    const enrichedMessage = `【图片解析结果】\n${result.content}\n\n用户原始消息：${message}`;

    return {
      message: enrichedMessage,
      imageAnalysis: result.content
    };
  } catch (error) {
    console.error('[VisionPreprocessor] Failed with error:', error);
    console.error('[VisionPreprocessor] Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('[VisionPreprocessor] Error stack:', error instanceof Error ? error.stack : 'No stack');
    // 区分错误类型
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
      console.error(`[VisionPreprocessor] Axios error: ${status}`, data);
      if (status === 400) {
        console.error('[VisionPreprocessor] Image URL may be inaccessible or format not supported');
      } else if (status === 401) {
        console.error('[VisionPreprocessor] Invalid API key');
      } else if (status === 429) {
        console.error('[VisionPreprocessor] Rate limit exceeded');
      }
    } else {
      console.error('[VisionPreprocessor] Error:', error);
    }
    // On error, still pass through the original message but log the error
    return {
      message,
      imageAnalysis: null
    };
  }
}