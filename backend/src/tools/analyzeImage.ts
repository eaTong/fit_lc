// @ts-nocheck
import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { createZhipuVisionChat } from '../agents/chatZhipu';

export const analyzeImageTool = new DynamicStructuredTool({
  name: "analyze_image",
  description: `当用户发送图片并要求分析体态、体脂率等身体状况时使用。
  注意：这个工具不分析围度（胸围、腰围等），围度需要用户主动输入数字。

  适用场景：
  - "分析一下我的体态"
  - "看看这张照片，我的体脂率是多少"
  - "这张照片中我看起来怎么样"
  - "评估一下我的身形"

  输入：imageUrls 数组（图片URL列表）

  输出：体脂率估算、体态评估（是否含胸、圆肩、骨盆前倾等）、肌肉线条、建议等`,

  schema: z.object({
    imageUrls: z.array(z.string()).describe("要分析的图片URL列表"),
  }),

  func: async ({ imageUrls }) => {
    if (!imageUrls || imageUrls.length === 0) {
      return "没有提供图片，请提供需要分析的照片。";
    }

    try {
      const zhipuChat = createZhipuVisionChat();

      const analysisPrompt = `你是一位专业的健身教练，请分析这张图片中人物的身体状况：

1. 体脂率估算（根据肌肉线条和体态）
2. 体态评估（是否含胸、圆肩、骨盆前倾、驼背等）
3. 肌肉线条评估（主要肌群是否明显）
4. 整体评分（1-10分）
5. 改进建议

请用中文回答，语言专业但通俗易懂。`;

      const result = await zhipuChat.sendMessage(
        analysisPrompt,
        undefined, // no system prompt
        { temperature: 0.7 },
        imageUrls
      );

      return `【图片分析结果】\n${result.content}`;
    } catch (error) {
      console.error('Image analysis error:', error);
      return `图片分析失败：${error.message}。请稍后再试或换一张图片。`;
    }
  }
});
