const config = require('../config');

/**
 * 同步存储
 */
const set = (key, value) => {
  try {
    wx.setStorageSync(key, value);
    return true;
  } catch (e) {
    console.error('Storage set error:', e);
    return false;
  }
};

/**
 * 同步获取
 */
const get = (key, defaultValue = null) => {
  try {
    const value = wx.getStorageSync(key);
    return value !== '' ? value : defaultValue;
  } catch (e) {
    console.error('Storage get error:', e);
    return defaultValue;
  }
};

/**
 * 同步删除
 */
const remove = (key) => {
  try {
    wx.removeStorageSync(key);
  } catch (e) {
    console.error('Storage remove error:', e);
  }
};

/**
 * 清除所有存储
 */
const clear = () => {
  try {
    wx.clearStorageSync();
  } catch (e) {
    console.error('Storage clear error:', e);
  }
};

/**
 * 获取离线队列
 */
const getOfflineQueue = () => {
  return get(config.STORAGE_KEY.OFFLINE_QUEUE, []);
};

/**
 * 添加到离线队列
 */
const addToOfflineQueue = (type, data) => {
  const queue = getOfflineQueue();
  queue.push({
    type,
    data,
    timestamp: Date.now()
  });
  if (queue.length > 100) {
    queue.shift();
  }
  set(config.STORAGE_KEY.OFFLINE_QUEUE, queue);
};

/**
 * 清空离线队列
 */
const clearOfflineQueue = () => {
  remove(config.STORAGE_KEY.OFFLINE_QUEUE);
};

/**
 * 获取缓存消息
 */
const getCachedMessages = () => {
  return get(config.STORAGE_KEY.CHAT_MESSAGES, []);
};

module.exports = {
  set,
  get,
  remove,
  clear,
  getOfflineQueue,
  addToOfflineQueue,
  clearOfflineQueue,
  getCachedMessages
};