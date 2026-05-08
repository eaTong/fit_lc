/**
 * Zhipu GLM Chat Wrapper
 * Supports both text and multimodal (vision) inputs
 * GLM-4V-Flash is FREE for image understanding
 */

import axios, { AxiosInstance } from 'axios';
import { getModelName, requireApiKey } from '../config/aiConfig';

interface MultimodalContent {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: { url: string };
}

interface MessageContent {
  role: 'user' | 'assistant' | 'system';
  content: string | MultimodalContent[];
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string | { text: string; images?: string[] };
}

interface ChatOptions {
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
}

interface ChatResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: number;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class ZhipuChat {
  private client: AxiosInstance;
  private model: string;

  constructor(useVision = false) {
    const apiKey = requireApiKey('zhipu');
    // 直接使用 Zhipu 的模型，而不是根据 provider 获取
    this.model = useVision
      ? (process.env.ZHIPU_VISION_MODEL || 'glm-4v-flash')
      : (process.env.ZHIPU_CHAT_MODEL || 'glm-4-plus');

    this.client = axios.create({
      baseURL: 'https://open.bigmodel.cn/api/paas/v4',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async chat(
    messages: ChatMessage[],
    options?: ChatOptions
  ): Promise<{ content: string; usage?: ChatResponse['usage'] }> {
    // Convert ChatMessage[] to API format
    const formattedMessages = messages.map((msg): MessageContent => {
      // Handle multimodal content (text + images)
      if (typeof msg.content === 'object' && msg.content !== null && 'images' in msg.content) {
        const contentParts: MultimodalContent[] = [];
        const msgContent = msg.content as { text?: string; images?: string[] };

        if (msgContent.text) {
          contentParts.push({ type: 'text', text: msgContent.text });
        }

        if (msgContent.images && msgContent.images.length > 0) {
          for (const imageUrl of msgContent.images) {
            contentParts.push({ type: 'image_url', image_url: { url: imageUrl } });
          }
        }

        return { role: msg.role, content: contentParts };
      }

      return { role: msg.role, content: msg.content as string };
    });

    const requestBody: Record<string, unknown> = {
      model: this.model,
      messages: formattedMessages,
    };

    if (options) {
      if (options.temperature !== undefined) {
        requestBody.temperature = options.temperature;
      }
      if (options.top_p !== undefined) {
        requestBody.top_p = options.top_p;
      }
      if (options.max_tokens !== undefined) {
        requestBody.max_tokens = options.max_tokens;
      }
    }

    try {
      console.log('[ZhipuChat] Sending request to API...');
      const response = await this.client.post('/chat/completions', requestBody);
      console.log('[ZhipuChat] Response received, status:', response.status);
      const data = response.data as ChatResponse;
      console.log('[ZhipuChat] Response data keys:', Object.keys(data || {}));

      const choice = data.choices?.[0];
      console.log('[ZhipuChat] Choice:', choice);
      if (!choice) {
        console.error('[ZhipuChat] No choice in response:', data);
        throw new Error('Zhipu API returned no choices');
      }

      return {
        content: choice.message?.content || '',
        usage: data.usage,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;
        console.error(`Zhipu API error: ${status}`, data);

        if (status === 401) {
          throw new Error('ZHIPU_API_KEY is invalid or expired');
        } else if (status === 403) {
          throw new Error('Zhipu API access forbidden - check quota');
        } else if (status === 429) {
          throw new Error('Zhipu API rate limit exceeded');
        }
      }
      throw error;
    }
  }

  /**
   * Send a single user message and get response
   */
  async sendMessage(
    userMessage: string,
    systemPrompt?: string,
    options?: ChatOptions,
    imageUrls?: string[]
  ): Promise<{ content: string; usage?: ChatResponse['usage'] }> {
    const messages: ChatMessage[] = [];

    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }

    const content = imageUrls && imageUrls.length > 0
      ? { text: userMessage, images: imageUrls }
      : userMessage;

    messages.push({ role: 'user', content });

    return this.chat(messages, options);
  }
}

/**
 * Create a Zhipu chat instance for text-only conversations
 */
export function createZhipuChat(): ZhipuChat {
  return new ZhipuChat(false);
}

/**
 * Create a Zhipu chat instance with vision (image understanding) support
 * Uses GLM-4V-Flash which is FREE
 */
export function createZhipuVisionChat(): ZhipuChat {
  return new ZhipuChat(true);
}
