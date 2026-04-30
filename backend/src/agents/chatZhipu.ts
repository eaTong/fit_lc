/**
 * Zhipu GLM Chat Wrapper
 * Supports both text and multimodal (vision) inputs
 * GLM-4V-Flash is FREE for image understanding
 */

import axios, { AxiosInstance } from 'axios';
import { getModelName, requireApiKey } from '../lib/aiConfig.js';

interface MessageContent {
  role: 'user' | 'assistant' | 'system';
  content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
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
    this.model = getModelName(useVision ? 'vision' : 'chat');

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
    const formattedMessages: MessageContent[] = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

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
      const response = await this.client.post('/chat/completions', requestBody);
      const data = response.data as ChatResponse;

      const choice = data.choices[0];
      return {
        content: choice.message.content,
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
    options?: ChatOptions
  ): Promise<{ content: string; usage?: ChatResponse['usage'] }> {
    const messages: ChatMessage[] = [];

    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }

    messages.push({ role: 'user', content: userMessage });

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
