// Chat API - 对话相关 API
const { request, get, post } = require('./client');

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
    return post('/chat/message', { message: content, imageUrls }).then(res => {
      // 后端返回 { reply, toolData }
      // 检查是否需要补充信息
      const needsMoreInfo = res.toolData?.status === 'needs_more_info';
      const missingFields = res.toolData?.missingFields || [];

      // 返回用户消息和AI回复，构造完整的消息对象
      const userMessage = {
        id: `temp-${timestamp}-user`,
        role: 'user',
        content: content,
        imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
        createdAt: new Date().toISOString()
      };
      const assistantMessage = {
        id: `temp-${timestamp}-assistant`,
        role: 'assistant',
        content: res.reply,
        // 从 toolData 提取 savedData 用于撤销判断
        savedData: res.toolData?.result?.id
          ? { id: res.toolData.result.id, type: res.toolData.dataType }
          : (needsMoreInfo ? { type: res.toolData.dataType || 'workout', needsMoreInfo: true, missingFields } : null),
        toolData: res.toolData || null,
        needsMoreInfo: needsMoreInfo,
        missingFields: missingFields,
        createdAt: new Date().toISOString()
      };
      return [userMessage, assistantMessage];
    });
  },

  // 撤销消息
  revokeMessage(messageId) {
    return post(`/chat/revoke/${messageId}`).then(res => res.success);
  }
};

module.exports = chatActions;