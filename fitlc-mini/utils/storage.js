// fitlc-mini/utils/storage.js

const CACHE_KEY = 'fitlc_messages';

/**
 * 获取缓存消息
 * @returns {Array} 缓存的消息数组
 */
function getCachedMessages() {
  try {
    const data = wx.getStorageSync(CACHE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('getCachedMessages failed:', e);
    return [];
  }
}

/**
 * 设置缓存消息
 * @param {Array} messages - 消息数组
 */
function setCachedMessages(messages) {
  try {
    wx.setStorageSync(CACHE_KEY, JSON.stringify(messages));
  } catch (e) {
    console.error('setCachedMessages failed:', e);
  }
}

module.exports = {
  getCachedMessages,
  setCachedMessages
};
