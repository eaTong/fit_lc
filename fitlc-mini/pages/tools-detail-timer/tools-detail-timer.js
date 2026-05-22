const storage = require('../../utils/storage');

Page({
  data: {
    phase: 'config', // config, timing, complete

    // 配置阶段
    selectedDuration: 60,
    customDuration: '',
    canStart: true,

    // 计时阶段
    duration: 60,
    remaining: 60,
    displayTime: '01:00',
    isPaused: false,
    timer: null,
    usedCount: 1,

    // 完成阶段
    historyRecord: null
  },

  onLoad(options) {
    if (options.recordId) {
      this.loadHistoryRecord(options.recordId);
    }
  },

  onUnload() {
    this.clearTimer();
  },

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  // 选择快速时长
  onSelectDuration(e) {
    const duration = parseInt(e.currentTarget.dataset.duration);
    this.setData({
      selectedDuration: duration,
      customDuration: ''
    });
    this.updateCanStart(duration);
  },

  // 自定义输入
  onCustomInput(e) {
    const value = e.detail.value;
    this.setData({ customDuration: value });
    const duration = parseInt(value) || 0;
    this.updateCanStart(duration);
  },

  updateCanStart(duration) {
    this.setData({ canStart: duration > 0 });
  },

  // 开始计时
  onStart() {
    const duration = this.data.customDuration
      ? parseInt(this.data.customDuration)
      : this.data.selectedDuration;

    this.setData({
      phase: 'timing',
      duration,
      remaining: duration,
      displayTime: this.formatTime(duration),
      isPaused: false,
      usedCount: this.data.historyRecord?.usedCount || 1
    });

    this.startTimer();
  },

  // 计时器
  startTimer() {
    this.clearTimer();
    this.timer = setInterval(() => {
      if (!this.data.isPaused) {
        let remaining = this.data.remaining - 1;
        if (remaining <= 0) {
          this.clearTimer();
          wx.vibrateLong();
          this.onTimeUp();
        } else {
          this.setData({
            remaining,
            displayTime: this.formatTime(remaining)
          });
        }
      }
    }, 1000);
  },

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  // 时间到
  onTimeUp() {
    this.setData({ phase: 'complete' });
  },

  // 暂停/继续
  onPauseTap() {
    this.setData({ isPaused: !this.data.isPaused });
  },

  // 停止
  onStop() {
    this.clearTimer();
    this.setData({ phase: 'complete' });
  },

  // 再来一次
  onAgain() {
    this.setData({
      phase: 'timing',
      remaining: this.data.duration,
      displayTime: this.formatTime(this.data.duration),
      isPaused: false,
      usedCount: this.data.usedCount + 1
    });
    this.startTimer();
  },

  // 完成
  onFinish() {
    // 保存使用记录
    this.saveToLocal();
    this.goBack();
  },

  saveToLocal() {
    const history = storage.getToolsHistory('timer') || [];
    history.unshift({
      id: 'local-' + Date.now(),
      date: Date.now(),
      duration: this.data.duration,
      usedCount: this.data.usedCount
    });
    storage.saveToolsHistory('timer', history);
  },

  goBack() {
    wx.navigateBack();
  },

  // 历史记录
  onHistoryTap() {
    wx.navigateTo({ url: '/pages/tools-history-timer/tools-history-timer' });
  },

  // 加载历史记录
  loadHistoryRecord(recordId) {
    const history = storage.getToolsHistory('timer') || [];
    const record = history.find(r => r.id === recordId);
    if (record) {
      this.setData({
        historyRecord: record,
        selectedDuration: record.duration,
        customDuration: ''
      });
    }
  }
});