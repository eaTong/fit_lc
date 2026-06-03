const { recordActions } = require('../../store/actions');
const storage = require('../../utils/storage');
const logger = require('../../utils/logger');

Page({
  data: {
    phase: 'config', // config, training, rest, complete

    // 配置阶段
    exercises: ['俯卧撑', '深蹲'],
    exerciseIndex: 0,
    pr: '',
    suggestedWeight: 0,
    restOptions: ['45', '60', '90', '120'],
    restIndex: 1,
    restDuration: 60,

    // 训练阶段
    currentSet: 1,
    currentReps: 10,
    weight: 0,

    // 休息阶段
    restCountdown: 60,

    // 完成阶段
    completedSets: 0,
    totalReps: 0,
    totalDuration: 0,

    // 状态
    isPaused: false,

    // 计时器
    timer: null,
    restTimer: null,
    startTime: null,

    // 历史记录（用于重新执行）
    historyRecord: null,

    // 动作搜索相关
    exerciseInput: '',
    exerciseResults: [],
    showExerciseList: false,
    isSearching: false,
    selectedExercise: null,
    searchTimer: null,
    recentExercises: []
  },

  onLoad(options) {
    // 加载最近使用的动作
    const recent = storage.getRecentExercises();
    this.setData({ recentExercises: recent.slice(0, 5) });

    // 检查是否有历史记录ID传入（重新执行）
    if (options.recordId) {
      this.loadHistoryRecord(options.recordId);
    }
  },

  onUnload() {
    this.clearTimers();
  },

  clearTimers() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.restTimer) {
      clearInterval(this.restTimer);
      this.restTimer = null;
    }
  },

  // 动作搜索输入
  onExerciseInput(e) {
    const keyword = e.detail.value;
    this.setData({ exerciseInput: keyword });

    // 防抖 300ms
    if (this.data.searchTimer) {
      clearTimeout(this.data.searchTimer);
    }

    if (!keyword.trim()) {
      this.setData({
        exerciseResults: this.data.recentExercises,
        showExerciseList: true,
        isSearching: false
      });
      return;
    }

    this.setData({ isSearching: true });

    this.data.searchTimer = setTimeout(() => {
      this.doSearch(keyword);
    }, 300);
  },

  // 执行搜索
  doSearch(keyword) {
    const api = require('../../api/exercise');

    api.searchExercises(keyword)
      .then(exercises => {
        this.setData({
          exerciseResults: exercises,
          showExerciseList: true,
          isSearching: false
        });
      })
      .catch(err => {
        logger.error('search exercises failed:', err);
        this.setData({
          exerciseResults: [],
          showExerciseList: true,
          isSearching: false,
          searchError: true
        });
      });
  },

  // 选择动作
  onExerciseSelect(e) {
    const exercise = e.currentTarget.dataset.exercise;
    const { recentExercises } = this.data;

    // 更新选中动作
    this.setData({
      selectedExercise: exercise,
      exerciseInput: exercise.name,
      showExerciseList: false
    });

    // 更新最近使用列表
    const filtered = recentExercises.filter(e => e.id !== exercise.id);
    const updated = [exercise, ...filtered];
    storage.saveRecentExercises(updated);
    this.setData({ recentExercises: updated.slice(0, 5) });
  },

  // 输入框获得焦点
  onExerciseFocus() {
    const { recentExercises, exerciseInput } = this.data;
    if (exerciseInput.trim()) {
      this.setData({ showExerciseList: true });
    } else {
      this.setData({
        exerciseResults: recentExercises.slice(0, 5),
        showExerciseList: true
      });
    }
  },

  // 输入框失去焦点
  onExerciseBlur() {
    // 延迟隐藏，优先处理点击事件
    setTimeout(() => {
      this.setData({ showExerciseList: false });
    }, 200);
  },

  // 动作选择
  onExerciseChange(e) {
    const index = e.detail.value;
    this.setData({ exerciseIndex: index });
    this.calculateSuggestedWeight();
  },

  // PR 输入
  onPrInput(e) {
    this.setData({ pr: e.detail.value });
    this.calculateSuggestedWeight();
  },

  // 休息时长选择
  onRestChange(e) {
    const index = e.detail.value;
    const durations = [45, 60, 90, 120];
    this.setData({
      restIndex: index,
      restDuration: durations[index],
      restCountdown: durations[index]
    });
  },

  // 计算建议重量
  calculateSuggestedWeight() {
    const pr = parseFloat(this.data.pr) || 0;
    if (pr > 0) {
      const suggested = Math.round(pr * 0.65 / 2.5) * 2.5;
      this.setData({ suggestedWeight: suggested });
    } else {
      this.setData({ suggestedWeight: 0 });
    }
  },

  // 获取 PR（从服务器）
  fetchPR(exerciseName) {
    // TODO: 调用 API 获取该动作的历史最大重量
    // GET /api/records/pr/:exerciseName
    // 暂时使用本地估算
  },

  // 开始训练
  onStart() {
    this.setData({
      phase: 'training',
      currentSet: 1,
      currentReps: 10,
      weight: this.data.suggestedWeight || 0,
      completedSets: 0,
      totalReps: 0,
      startTime: Date.now(),
      isPaused: false
    });
  },

  // 次数调整
  onRepsMinus() {
    if (this.data.currentReps > 0) {
      this.setData({ currentReps: this.data.currentReps - 1 });
    }
  },

  onRepsPlus() {
    this.setData({ currentReps: this.data.currentReps + 1 });
  },

  // 完成一组
  onCompleteSet() {
    const { currentSet, currentReps, completedSets, totalReps } = this.data;
    const newCompletedSets = currentSet;
    const newTotalReps = totalReps + currentReps;

    if (currentSet >= 10) {
      // 完成全部训练
      this.finishTraining(newCompletedSets, newTotalReps);
    } else {
      // 进入休息阶段
      this.setData({
        completedSets: newCompletedSets,
        totalReps: newTotalReps,
        phase: 'rest',
        restCountdown: this.data.restDuration,
        isPaused: false
      });
      this.startRestTimer();
    }
  },

  // 休息计时器
  startRestTimer() {
    this.clearTimers();
    this.restTimer = setInterval(() => {
      if (!this.data.isPaused) {
        let countdown = this.data.restCountdown - 1;
        if (countdown <= 0) {
          this.clearTimers();
          wx.vibrateLong();
          this.onRestComplete();
        } else {
          this.setData({ restCountdown: countdown });
        }
      }
    }, 1000);
  },

  // 休息结束
  onRestComplete() {
    const { currentSet } = this.data;
    this.setData({
      phase: 'training',
      currentSet: currentSet + 1,
      currentReps: 10,
      isPaused: false
    });
  },

  // 跳过休息
  onSkipRest() {
    this.clearTimers();
    this.onRestComplete();
  },

  // 暂停/继续
  onPauseTap() {
    this.setData({ isPaused: !this.data.isPaused });
  },

  // 结束训练
  onEnd() {
    this.clearTimers();
    const { currentSet, totalReps } = this.data;
    // 计算已完成组数（当前组-1 + 已完成的组）
    const completedSets = currentSet - 1 + (this.data.phase === 'rest' ? 1 : 0);
    // 加上当前组的次数
    const finalTotalReps = totalReps + (this.data.phase === 'rest' ? 0 : this.data.currentReps);

    this.finishTraining(completedSets, finalTotalReps);
  },

  // 完成训练
  finishTraining(completedSets, totalReps) {
    this.clearTimers();
    const totalDuration = Math.floor((Date.now() - this.data.startTime) / 1000);
    this.setData({
      phase: 'complete',
      completedSets,
      totalReps,
      totalDuration
    });
  },

  // 保存记录
  onSave() {
    const { exercises, exerciseIndex, completedSets, totalReps, totalDuration } = this.data;
    const exerciseName = exercises[exerciseIndex];

    const workoutData = {
      date: Date.now(),
      exercises: [{
        name: exerciseName,
        sets: completedSets,
        reps: totalReps
      }],
      totalDuration,
      source: 'tools',
      toolType: '10x10'
    };

    // 保存到服务器
    recordActions.saveWorkout(workoutData).then(() => {
      wx.showToast({ title: '已保存', icon: 'success' });
      this.saveToLocal(workoutData);
      this.goBack();
    }).catch(err => {
      logger.error('save failed:', err);
      // 保存失败时仍保存到本地
      this.saveToLocal(workoutData);
      this.goBack();
    });
  },

  // 保存到本地
  saveToLocal(workoutData) {
    const history = storage.getToolsHistory('10x10') || [];
    history.unshift({
      id: 'local-' + Date.now(),
      ...workoutData,
      savedToServer: true,
      date: Date.now()
    });
    storage.saveToolsHistory('10x10', history);
  },

  // 不保存
  onDiscard() {
    const { completedSets, totalReps, totalDuration, exercises, exerciseIndex } = this.data;
    const exerciseName = exercises[exerciseIndex];

    // 保存到本地（未同步）
    const history = storage.getToolsHistory('10x10') || [];
    history.unshift({
      id: 'local-' + Date.now(),
      date: Date.now(),
      exerciseName,
      sets: completedSets,
      reps: totalReps,
      totalDuration,
      savedToServer: false
    });
    storage.saveToolsHistory('10x10', history);

    this.goBack();
  },

  // 返回
  goBack() {
    wx.navigateBack();
  },

  // 历史记录
  onHistoryTap() {
    wx.navigateTo({ url: '/pages/tools-history-10x10/tools-history-10x10' });
  },

  // 加载历史记录（重新执行）
  loadHistoryRecord(recordId) {
    const history = storage.getToolsHistory('10x10') || [];
    const record = history.find(r => r.id === recordId);
    if (record) {
      this.setData({
        historyRecord: record,
        exercises: record.exerciseName ? [record.exerciseName] : ['俯卧撑', '深蹲'],
        exerciseIndex: 0,
        suggestedWeight: record.weight || 0,
        restDuration: record.restDuration || 60,
        restIndex: [45, 60, 90, 120].indexOf(record.restDuration || 60)
      });
    }
  }
});