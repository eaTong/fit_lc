// fitlc-mini/utils/storage.js
const logger = require('./logger');

const CACHE_KEY = 'fitlc_messages';

// 工具历史记录的 key 前缀
const TOOLS_HISTORY_PREFIX = 'tools_history_';

// 最近动作缓存的 key
const RECENT_EXERCISES_KEY = 'recent_exercises';

/**
 * 获取缓存消息
 * @returns {Array|null} 缓存的消息数组，错误时返回 null
 */
function getCachedMessages() {
  try {
    const data = wx.getStorageSync(CACHE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    logger.error('getCachedMessages failed:', e);
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
    logger.error('setCachedMessages failed:', e);
    return false;
  }
}

/**
 * 获取工具历史记录
 * @param {string} toolType - 工具类型：'10x10', 'counter', 'timer'
 * @returns {Array} 历史记录数组
 */
function getToolsHistory(toolType) {
  try {
    const key = TOOLS_HISTORY_PREFIX + toolType;
    const data = wx.getStorageSync(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    logger.error('getToolsHistory failed:', e);
    return [];
  }
}

/**
 * 保存工具历史记录
 * @param {string} toolType - 工具类型
 * @param {Array} history - 历史记录数组
 * @returns {boolean} 是否保存成功
 */
function saveToolsHistory(toolType, history) {
  try {
    const key = TOOLS_HISTORY_PREFIX + toolType;
    wx.setStorageSync(key, JSON.stringify(history));
    return true;
  } catch (e) {
    logger.error('saveToolsHistory failed:', e);
    return false;
  }
}

/**
 * 获取最近使用的动作
 * @returns {Array} 最近动作数组，每个元素 {id, name, category, equipment}
 */
function getRecentExercises() {
  try {
    const data = wx.getStorageSync(RECENT_EXERCISES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    logger.error('getRecentExercises failed:', e);
    return [];
  }
}

/**
 * 保存最近使用的动作
 * @param {Array} exercises - 动作数组
 * @returns {boolean} 是否保存成功
 */
function saveRecentExercises(exercises) {
  try {
    // 最多保留 10 个
    const trimmed = exercises.slice(0, 10);
    wx.setStorageSync(RECENT_EXERCISES_KEY, JSON.stringify(trimmed));
    return true;
  } catch (e) {
    logger.error('saveRecentExercises failed:', e);
    return false;
  }
}

module.exports = {
  getCachedMessages,
  setCachedMessages,
  getToolsHistory,
  saveToolsHistory,
  getRecentExercises,
  saveRecentExercises
};
