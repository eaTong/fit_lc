const { get, post } = require('./client');

module.exports = {
  sendMessage(message, historyMessages = [], imageUrls = []) {
    return post('/chat/message', { message, historyMessages, imageUrls });
  },

  getMessages(limit = 20) {
    return get('/chat/messages', { limit });
  }
};