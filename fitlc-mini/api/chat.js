// Chat API - 对话相关 API
const { request, get, post } = require('./client');

// Chat Actions
const chatActions = {
  // 获取聊天记录
  fetchMessages(limit = 50) {
    return get('/chat/messages', { limit }).then(res => res.messages || []);
  },

  // 发送消息
  sendMessage(content) {
    return post('/chat/message', { content }).then(res => res.message);
  },

  // 撤销消息
  revokeMessage(messageId) {
    return post(`/chat/revoke/${messageId}`).then(res => res.success);
  }
};

module.exports = chatActions;