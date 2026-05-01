// fitlc-mini/utils/storage.js

const CACHE_KEY = 'fitlc_messages';

/**
 * 获取缓存消息
 * @returns {Array|null} 缓存的消息数组，错误时返回 null
 */
function getCachedMessages() {
  try {
    const data = wx.getStorageSync(CACHE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('getCachedMessages failed:', e);
    return null;
  }
}

/**
 * 设置缓存消息
 * @param {Array} messages - 消息数组
 * @returns {boolean} 是否设置成功
 */
function setCachedMessages(messages) {
  try {
    wx.setStorageSync(CACHE_KEY, JSON.stringify(messages));
    return true;
  } catch (e) {
    console.error('setCachedMessages failed:', e);
    return false;
  }
}

module.exports = {
  getCachedMessages,
  setCachedMessages
};
