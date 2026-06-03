const logger = require('../../utils/logger');
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
    // 获取本地历史
    const localHistory = storage.getToolsHistory('10x10') || [];

    // 获取服务器历史
    this.fetchServerHistory().then(serverHistory => {
      // 合并去重（本地优先）
      const merged = this.mergeHistory(localHistory, serverHistory);
      this.setData({ history: merged });
      this.applyFilter();
    }).catch(() => {
      // 获取失败时使用本地
      this.setData({ history: localHistory });
      this.applyFilter();
    });
  },

  async fetchServerHistory() {
    // TODO: 调用 API 获取工具来源的训练记录
    // GET /api/records/workouts?source=tools&toolType=10x10
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
    // 按时间倒序
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

    // 格式化显示
    filtered = filtered.map(item => ({
      ...item,
      dateText: this.formatDate(item.date),
      durationText: this.formatDuration(item.totalDuration)
    }));

    this.setData({ filteredHistory: filtered });
  },

  formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const todayStr = `${now.getMonth() + 1}月${now.getDate()}日`;
    const dateStr = `${date.getMonth() + 1}月${date.getDate()}日`;

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const itemDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffDays = Math.floor((today - itemDate) / (24 * 60 * 60 * 1000));

    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    return dateStr;
  },

  formatDuration(seconds) {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  },

  onFilterChange(e) {
    this.setData({ filter: e.detail.value });
    this.applyFilter();
  },

  onItemTap(e) {
    const recordId = e.currentTarget.dataset.id;
    // 重新执行：跳转到详情页并传入记录ID
    wx.navigateTo({
      url: `/pages/tools-detail-10x10/tools-detail-10x10?recordId=${recordId}`
    });
  },

  onItemLongPress(e) {
    // 长按触发删除确认（替换原本未挂载的 bind:longpress）
    this.onDelete({ currentTarget: { dataset: { id: e.currentTarget.dataset.id } } });
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
    // 如果是已同步的记录，先删除服务器数据
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
    const history = storage.getToolsHistory('10x10') || [];
    const filtered = history.filter(item => item.id !== recordId);
    storage.saveToolsHistory('10x10', filtered);
    this.loadHistory();
    wx.showToast({ title: '已删除', icon: 'success' });
  }
});