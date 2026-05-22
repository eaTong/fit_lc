const { recordActions } = require('../../store/actions');
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
    const localHistory = storage.getToolsHistory('counter') || [];
    this.fetchServerHistory().then(serverHistory => {
      const merged = this.mergeHistory(localHistory, serverHistory);
      this.setData({ history: merged });
      this.applyFilter();
    }).catch(() => {
      this.setData({ history: localHistory });
      this.applyFilter();
    });
  },

  async fetchServerHistory() {
    // TODO: GET /api/records/workouts?source=tools&toolType=counter
    return [];
  },

  mergeHistory(local, server) {
    const result = [...local];
    server.forEach(serverItem => {
      const exists = result.some(item => item.id === serverItem.id);
      if (!exists) {
        result.push({ ...serverItem, savedToServer: true });
      }
    });
    result.sort((a, b) => b.date - a.date);
    return result;
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
      dateText: this.formatDate(item.date)
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

  onFilterChange(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({ filter });
    this.applyFilter();
  },

  onItemTap(e) {
    const recordId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/tools-detail-counter/tools-detail-counter?recordId=${recordId}`
    });
  },

  onDelete(e) {
    const recordId = e.currentTarget.dataset.id;
    const item = this.data.history.find(h => h.id === recordId);
    if (!item) return;

    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      success: (res) => {
        if (res.confirm) {
          this.deleteRecord(recordId, item);
        }
      }
    });
  },

  deleteRecord(recordId, item) {
    if (item.savedToServer && item.serverId) {
      recordActions.deleteWorkout(item.serverId).then(() => {
        this.removeFromLocal(recordId);
      }).catch(() => {
        wx.showToast({ title: '删除失败', icon: 'none' });
      });
    } else {
      this.removeFromLocal(recordId);
    }
  },

  removeFromLocal(recordId) {
    const history = storage.getToolsHistory('counter') || [];
    const filtered = history.filter(item => item.id !== recordId);
    storage.saveToolsHistory('counter', filtered);
    this.loadHistory();
    wx.showToast({ title: '已删除', icon: 'success' });
  }
});