// Chat API - 对话相关 API
const { request, get, post } = require('./client');
const storage = require('../utils/storage');
const { sendSSEStream } = require('../utils/sseStream');

// Chat Actions
const chatActions = {
  // 获取聊天记录
  fetchMessages(limit = 50) {
    return get('/chat/messages', { limit }).then(res => res.messages || []);
  },

  // 发送消息
  // content: 文字内容
  // imageUrls: 图片URL数组（可选）
  sendMessage(content, imageUrls = []) {
    const timestamp = Date.now();

    // 检查是否有进行中的 clarification session
    const clarSession = storage.getClarificationSession();
    const clarificationSessionId = clarSession?.sessionId || null;

    return post('/chat/message', {
      message: content,
      imageUrls,
      clarificationSessionId
    }).then(res => {
      // 检查是否需要追问（澄清机制）
      const needsClarification = res.needsClarification === true || res.toolData?.clarificationSessionId;
      const clarificationEnded = res.clarificationEnded === true;
      const sessionId = res.toolData?.clarificationSessionId || clarificationSessionId;

      // 如果有新的 clarification session，保存；如果 clarification 结束，清除
      // 两者互斥：新 session 创建时不清除，旧 session 结束时不再保存新 session
      if (sessionId && res.toolData && !clarificationEnded) {
        storage.saveClarificationSession(sessionId, {
          toolName: res.toolData.toolName || (res.toolData.dataType === 'workout' ? 'save_workout' : 'save_measurement'),
          partialInput: res.toolData.partialInput || {},
          missingFields: res.toolData.missingFields || []
        });
      } else if (clarificationEnded) {
        storage.clearClarificationSession();
      }

      // 返回 assistant 消息
      // 构建 savedData：只有真正保存了数据（result.id）或有效的 clarification session 时才设置
      let savedData = null;
      if (res.toolData?.result?.id) {
        // 有保存的数据记录
        savedData = { id: res.toolData.result.id, type: res.toolData.dataType };
      } else if (sessionId && needsClarification) {
        // 有进行中的追问 session（但还没有保存的数据）
        savedData = { type: res.toolData?.dataType || 'workout', clarificationSessionId: sessionId };
      }
      // clarificationEnded 但无 savedData → 无需设置 savedData

      const assistantMsg = {
        id: `temp-${timestamp}-assistant`,
        role: 'assistant',
        content: res.reply,
        savedData,
        toolData: res.toolData || null,
        needsClarification: needsClarification,
        clarificationEnded: clarificationEnded,
        clarificationSessionId: sessionId,
        visionError: res.visionError || undefined,
        createdAt: new Date().toISOString()
      };
      return { assistantMsg, error: res.error };
    });
  },

  // 撤销消息
  revokeMessage(messageId) {
    return post(`/chat/revoke/${messageId}`).then(res => res.success);
  },

  // 清空全部消息
  clearAllMessages() {
    return post('/chat/revoke/all').then(res => res.success);
  }
};

module.exports = chatActions;