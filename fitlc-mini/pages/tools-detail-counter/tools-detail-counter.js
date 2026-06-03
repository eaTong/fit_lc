const { recordActions } = require('../../store/actions');
const storage = require('../../utils/storage');
const logger = require('../../utils/logger');

Page({
  data: {
    phase: 'config', // config, counting, complete

    // 配置阶段
    exercises: ['俯卧撑', '深蹲'],
    exerciseIndex: 0,
    exerciseName: '俯卧撑',
    targetReps: 20,

    // 计数阶段
    currentCount: 0,

    // 完成阶段
    totalCount: 0,

    // 状态
    isPaused: false
  },

  onLoad(options) {
    if (options.recordId) {
      this.loadHistoryRecord(options.recordId);
    }
  },

  // 动作选择
  onExerciseChange(e) {
    const index = e.detail.value;
    this.setData({
      exerciseIndex: index,
      exerciseName: this.data.exercises[index]
    });
  },

  // 目标输入
  onTargetInput(e) {
    this.setData({ targetReps: parseInt(e.detail.value) || 0 });
  },

  // 开始计数
  onStart() {
    this.setData({
      phase: 'counting',
      currentCount: 0,
      isPaused: false
    });
  },

  // 计数
  onCount() {
    if (this.data.isPaused) return;

    const newCount = this.data.currentCount + 1;
    this.setData({ currentCount: newCount });

    // 检查是否达到目标
    if (newCount >= this.data.targetReps && newCount === this.data.targetReps) {
      wx.vibrateLong();
      wx.showToast({ title: '恭喜完成！', icon: 'none' });
    }
  },

  // 暂停/继续
  onPauseTap() {
    this.setData({ isPaused: !this.data.isPaused });
  },

  // 结束
  onEnd() {
    const { currentCount } = this.data;
    this.setData({
      phase: 'complete',
      totalCount: currentCount
    });
  },

  // 保存
  onSave() {
    const { exerciseName, totalCount } = this.data;

    const workoutData = {
      date: Date.now(),
      exercises: [{
        name: exerciseName,
        sets: 1,
        reps: totalCount
      }],
      totalDuration: 0,
      source: 'tools',
      toolType: 'counter'
    };

    recordActions.saveWorkout(workoutData).then(() => {
      wx.showToast({ title: '已保存', icon: 'success' });
      this.saveToLocal({ ...workoutData, savedToServer: true });
      this.goBack();
    }).catch(err => {
      logger.error('save failed:', err);
      this.saveToLocal({ ...workoutData, savedToServer: false });
      this.goBack();
    });
  },

  saveToLocal(data) {
    const history = storage.getToolsHistory('counter') || [];
    history.unshift({
      id: 'local-' + Date.now(),
      ...data,
      date: Date.now()
    });
    storage.saveToolsHistory('counter', history);
  },

  // 不保存
  onDiscard() {
    const { exerciseName, totalCount } = this.data;

    const history = storage.getToolsHistory('counter') || [];
    history.unshift({
      id: 'local-' + Date.now(),
      date: Date.now(),
      exerciseName,
      sets: 1,
      reps: totalCount,
      savedToServer: false
    });
    storage.saveToolsHistory('counter', history);

    this.goBack();
  },

  goBack() {
    wx.navigateBack();
  },

  // 历史记录
  onHistoryTap() {
    wx.navigateTo({ url: '/pages/tools-history-counter/tools-history-counter' });
  },

  // 加载历史记录
  loadHistoryRecord(recordId) {
    const history = storage.getToolsHistory('counter') || [];
    const record = history.find(r => r.id === recordId);
    if (record) {
      this.setData({
        exercises: record.exerciseName ? [record.exerciseName] : ['俯卧撑', '深蹲'],
        exerciseIndex: 0,
        exerciseName: record.exerciseName,
        targetReps: record.targetReps || 20
      });
    }
  }
});