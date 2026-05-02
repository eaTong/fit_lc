/**
 * Vision Preprocessor Plugin
 * Analyzes images using Zhipu AI and injects the result into the message context
 * Works with MiniMax as the main AI by preprocessing images before main prompt
 */

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
    return { message, imageAnalysis: null };
  }

  console.log(`[VisionPreprocessor] Processing ${imageUrls.length} image(s)`);

  try {
    const zhipuChat = createZhipuVisionChat();

    const analysisPrompt = `你是一位专业的健身教练，请分析这张图片中人物的身体状况：

1. 体脂率估算（根据肌肉线条和体态）
2. 体态评估（是否含胸、圆肩、骨盆前倾、驼背等）
3. 肌肉线条评估（主要肌群是否明显）
4. 整体评分（1-10分）
5. 改进建议

请用中文回答，语言专业但通俗易懂。格式简洁。`;

    const result = await zhipuChat.sendMessage(
      analysisPrompt,
      undefined,
      { temperature: 0.7 },
      imageUrls
    );

    console.log(`[VisionPreprocessor] Analysis complete, length: ${result.content.length}`);

    // Inject analysis result into message as prefix
    const enrichedMessage = `【图片解析结果】\n${result.content}\n\n用户原始消息：${message}`;

    return {
      message: enrichedMessage,
      imageAnalysis: result.content
    };
  } catch (error) {
    console.error('[VisionPreprocessor] Error:', error);
    // On error, still pass through the original message but log the error
    return {
      message,
      imageAnalysis: null
    };
  }
}