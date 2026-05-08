/**
 * Chat Model Factory
 * Creates the appropriate chat model based on AI_PROVIDER env var
 */

import { getCurrentProvider } from '../config/aiConfig';
import { createMiniMaxModel } from './chatMiniMax';
import { createZhipuChat, createZhipuVisionChat } from './chatZhipu';

/**
 * Get the appropriate chat model based on configuration
 * Returns a LangChain-compatible model instance
 */
export async function createChatModel() {
  const provider = getCurrentProvider();

  if (provider === 'minimax') {
    return createMiniMaxModel();
  } else if (provider === 'zhipu') {
    // For Zhipu, we wrap it to provide a LangChain-compatible interface
    return createZhipuLangChainModel();
  }

  throw new Error(`Unsupported AI provider: ${provider}`);
}

/**
 * Create a Zhipu model that provides a LangChain-compatible interface
 * This wraps the Zhipu API to work with the existing fitnessAgent tool-calling pattern
 */
async function createZhipuLangChainModel() {
  const zhipuChat = createZhipuChat();

  // Create a wrapper that mimics LangChain's ChatModel interface
  //noinspection JSUnusedLocalSymbols
  const model = {
    bindTools: function(_tools: any) {
      return model;
    },
    invoke: async function(input: any) {
      // Handle LangChain message format
      const messages = extractMessagesFromInput(input);

      try {
        const result = await zhipuChat.chat(messages as any, {
          temperature: 0.7,
        });

        return {
          content: result.content,
          additional_kwargs: {},
          response_metadata: {
            usage: result.usage,
          },
        };
      } catch (error) {
        console.error('Zhipu chat error:', error);
        throw error;
      }
    },
    _getConfig: function() {
      return {};
    },
  };

  return model;
}

/**
 * Extract messages from various LangChain input formats
 */
function extractMessagesFromInput(input: any): Array<{ role: string; content: string | { text: string; images?: string[] } }> {
  const messages: Array<{ role: string; content: string | { text: string; images?: string[] } }> = [];

  if (!input) return messages;

  // Handle array of messages
  if (Array.isArray(input)) {
    for (const item of input) {
      if (item._getType) {
        // LangChain message object
        const type = item._getType();
        if (type === 'human') {
          // Check if it's multimodal content with images
          if (item.content && typeof item.content === 'object' && item.content.images) {
            messages.push({ role: 'user', content: { text: item.content.text || '', images: item.content.images } });
          } else {
            const content = typeof item.content === 'string' ? item.content : JSON.stringify(item.content);
            messages.push({ role: 'user', content });
          }
        } else if (type === 'ai') {
          messages.push({ role: 'assistant', content: typeof item.content === 'string' ? item.content : JSON.stringify(item.content) });
        } else if (type === 'system') {
          messages.push({ role: 'system', content: typeof item.content === 'string' ? item.content : JSON.stringify(item.content) });
        }
      } else if (item.role && item.content) {
        if (item.content && typeof item.content === 'object' && item.content.images) {
          messages.push({ role: item.role, content: { text: item.content.text || '', images: item.content.images } });
        } else {
          messages.push({ role: item.role, content: typeof item.content === 'string' ? item.content : JSON.stringify(item.content) });
        }
      }
    }
  }

  return messages;
}

export { createZhipuChat, createZhipuVisionChat };
