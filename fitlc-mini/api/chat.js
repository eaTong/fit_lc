// Chat API - 对话相关 API
const { request, get, post } = require('./client');
const storage = require('../utils/storage');
const { sendSSEStream, sendSSEStreamFallback, isChunkedSupported } = require('../utils/sseStream');

/**
 * 处理 SSE 响应的 savedData 计算逻辑
 */
function computeSavedData(res) {
  const needsClarification = res.needsClarification === true || res.toolData?.clarificationSessionId;
  const clarificationEnded = res.clarificationEnded === true;
  const sessionId = res.toolData?.clarificationSessionId || null;

  if (sessionId && res.toolData && !clarificationEnded) {
    storage.saveClarificationSession(sessionId, {
      toolName: res.toolData.toolName || (res.toolData.dataType === 'workout' ? 'save_workout' : 'save_measurement'),
      partialInput: res.toolData.partialInput || {},
      missingFields: res.toolData.missingFields || []
    });
  } else if (clarificationEnded) {
    storage.clearClarificationSession();
  }

  let savedData = null;
  if (res.toolData?.result?.id) {
    savedData = { id: res.toolData.result.id, type: res.toolData.dataType };
  } else if (sessionId && needsClarification) {
    savedData = { type: res.toolData?.dataType || 'workout', clarificationSessionId: sessionId };
  }

  return { needsClarification, clarificationEnded, sessionId, savedData };
}

// Chat Actions
const chatActions = {
  /**
   * 获取聊天记录
   */
  fetchMessages(limit = 50) {
    return get('/chat/messages', { limit }).then(res => res.messages || []);
  },

  /**
   * 发送消息（非流式）
   * - 等待完整响应
   * - 适用于不需要流式体验的场景
   */
  sendMessage(content, imageUrls = []) {
    const clarSession = storage.getClarificationSession();
    const clarificationSessionId = clarSession?.sessionId || null;

    return post('/chat/message', {
      message: content,
      imageUrls,
      clarificationSessionId
    }).then(res => {
      const { needsClarification, clarificationEnded, sessionId, savedData } = computeSavedData(res);

      return {
        assistantMsg: {
          id: `temp-${Date.now()}-assistant`,
          role: 'assistant',
          content: res.reply,
          savedData,
          toolData: res.toolData || null,
          needsClarification,
          clarificationEnded,
          clarificationSessionId: sessionId,
          visionError: res.visionError || undefined,
          createdAt: new Date().toISOString()
        },
        error: res.error
      };
    });
  },

  /**
   * 流式发送消息
   * - 实时返回 token，逐步渲染
   * - 完成后返回完整消息对象
   *
   * options:
   *   - onStart: () => void
   *   - onThinking: () => void
   *   - onToken: (delta, event) => void
   *   - onToolCall: (event) => void
   *   - onToolResult: (event) => void
   *   - onFinal: (event) => void
   *   - onDone: (event) => void
   *   - onError: (event) => void
   *   - historyMessages: Array<{role, content}>
   */
  sendMessageStream(content, imageUrls = [], options = {}) {
    const clarSession = storage.getClarificationSession();
    const historyMessages = options.historyMessages || [];

    // 如果有 clarification session，附加到 history
    const fullHistory = clarSession
      ? [...historyMessages, { role: 'user', content: `[clarification] ${clarSession.sessionId}` }]
      : historyMessages;

    return sendSSEStream(content, imageUrls, {
      ...options,
      historyMessages: fullHistory,
    }).then(result => {
      const { reply, toolData, visionError } = result;

      // 构造虚拟 res 对象，复用 computeSavedData 逻辑
      const virtualRes = {
        reply,
        toolData,
        visionError,
        needsClarification: toolData?.clarificationSessionId !== undefined,
        clarificationEnded: false,
      };

      const { needsClarification, clarificationEnded, sessionId, savedData } = computeSavedData(virtualRes);

      return {
        assistantMsg: {
          id: `temp-${Date.now()}-assistant`,
          role: 'assistant',
          content: reply,
          savedData,
          toolData: toolData || null,
          needsClarification,
          clarificationEnded,
          clarificationSessionId: sessionId,
          visionError,
          createdAt: new Date().toISOString()
        },
        fallback: result.fallback || false
      };
    });
  },

  /**
   * 撤销消息
   */
  revokeMessage(messageId) {
    return post(`/chat/revoke/${messageId}`).then(res => res.success);
  },

  /**
   * 清空全部消息
   */
  clearAllMessages() {
    return post('/chat/revoke/all').then(res => res.success);
  }
};

module.exports = chatActions;