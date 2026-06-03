const logger = require('../../utils/logger');
const storage = require('../../utils/storage');

Page({
  data: {
    filter: 'all',
    history: [],
    filteredHistory: []
  },

  onLoad() {
    this.loadHistory();
  },

  onShow() {
    this.loadHistory();
  },

  loadHistory() {
    const localHistory = storage.getToolsHistory('timer') || [];
    this.setData({ history: localHistory });
    this.applyFilter();
  },

  applyFilter() {
    const { history, filter } = this.data;
    const now = Date.now();
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const monthAgo = now - 30 * 24 * 60 * 60 * 1000;

    let filtered;
    switch (filter) {
      case 'week':
        filtered = history.filter(item => item.date >= weekAgo);
        break;
      case 'month':
        filtered = history.filter(item => item.date >= monthAgo);
        break;
      default:
        filtered = history;
    }

    filtered = filtered.map(item => ({
      ...item,
      dateText: this.formatDate(item.date),
      durationText: this.formatDuration(item.duration),
      usedCount: item.usedCount || 1
    }));

    this.setData({ filteredHistory: filtered });
  },

  formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - new Date(date.getFullYear(), date.getMonth(), date.getDate())) / (24 * 60 * 60 * 1000));

    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  },

  formatDuration(seconds) {
    if (!seconds) return '0秒';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return secs > 0 ? `${mins}分${secs}秒` : `${mins}分钟`;
    }
    return `${secs}秒`;
  },

  onFilterChange(e) {
    this.setData({ filter: e.detail.value });
    this.applyFilter();
  },

  onItemTap(e) {
    const recordId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/tools-detail-timer/tools-detail-timer?recordId=${recordId}`
    });
  },

  onItemLongPress(e) {
    this.onDelete({ currentTarget: { dataset: { id: e.currentTarget.dataset.id } } });
  },

  onDelete(e) {
    const recordId = e.currentTarget.dataset.id;

    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      success: (res) => {
        if (res.confirm) {
          const history = storage.getToolsHistory('timer') || [];
          const filtered = history.filter(item => item.id !== recordId);
          storage.saveToolsHistory('timer', filtered);
          this.loadHistory();
          wx.showToast({ title: '已删除', icon: 'success' });
        }
      }
    });
  }
});