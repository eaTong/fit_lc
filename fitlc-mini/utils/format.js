// fitlc-mini/utils/format.js

/**
 * 格式化相对时间
 * @param {number} timestamp - 时间戳
 * @returns {string} 相对时间字符串
 */
function formatRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  if (diff < 60000) return '刚刚';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`;
  return new Date(timestamp).toLocaleDateString('zh-CN');
}

/**
 * 格式化重量
 * @param {number} weight - 重量数值
 * @returns {string} 格式化后的重量字符串
 */
function formatWeight(weight) {
  if (weight >= 1000) {
    return `${(weight / 1000).toFixed(1)}t`;
  }
  return `${weight}kg`;
}

module.exports = {
  formatRelativeTime,
  formatWeight
};
