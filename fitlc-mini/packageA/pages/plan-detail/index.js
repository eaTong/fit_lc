const { planActions } = require('../../../store/actions');

Component({
  data: {
    planId: null,
    plan: null,
    weekDays: [],
    isLoading: false,
    error: '',
    analysis: null,
    // Calendar
    calendarYear: new Date().getFullYear(),
    calendarMonth: new Date().getMonth() + 1,
    calendarDays: []
  },

  lifetimes: {
    attached() {
      this.initStore();
    }
  },

  pageLifetimes: {
    show() {
      if (this.data.planId) {
        this.fetchPlanDetail(this.data.planId);
      }
    }
  },

  methods: {
    initStore() {
      const app = getApp();
      const store = app.store || {};
      this.store = store;

      this.unsubscribe = store.subscribe ? store.subscribe((state) => {
        const currentPlan = state.currentPlan || null;
        this.setData({ plan: currentPlan });
        if (currentPlan) {
          this.formatPlanByWeekDay(currentPlan);
        }
      }) : null;
    },

    onLoad(options) {
      if (!options.id) {
        this.setData({ error: '缺少计划ID' });
        return;
      }
      this.setData({ planId: options.id });
      this.fetchPlanDetail(options.id);
    },

    fetchPlanDetail(planId) {
      this.setData({ isLoading: true, error: '' });

      planActions.fetchPlan(planId).then(plan => {
        this.setData({ plan, isLoading: false });
        this.formatPlanByWeekDay(plan);
        if (plan.status === 'active') {
          this.fetchAnalysis(planId);
        }
        this.initCalendar();
      }).catch(err => {
        console.error('fetchPlan failed:', err);
        this.setData({ isLoading: false, error: err.message || '加载失败' });
      });
    },

    fetchAnalysis(planId) {
      planActions.analyzeExecution(planId).then(analysis => {
        this.setData({ analysis });
        this.buildCalendarData();
      }).catch(err => {
        console.error('analyzeExecution failed:', err);
      });
    },

    onActivate() {
      const { planId } = this.data;
      if (!planId) return;

      wx.showModal({
        title: '激活计划',
        content: '激活后计划将开始执行，确定要激活吗？',
        success: (res) => {
          if (res.confirm) {
            this.doActivate(planId);
          }
        }
      });
    },

    doActivate(planId) {
      wx.showLoading({ title: '激活中...' });
      planActions.activatePlan(planId).then(() => {
        wx.hideLoading();
        wx.showToast({ title: '计划已激活', icon: 'success' });
        this.fetchPlanDetail(planId);
      }).catch(err => {
        wx.hideLoading();
        console.error('activatePlan failed:', err);
        wx.showToast({ title: err.message || '激活失败', icon: 'none' });
      });
    },

    formatPlanByWeekDay(plan) {
      if (!plan) return;

      const dayLabels = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];

      const dayMap = {};
      for (let i = 1; i <= 7; i++) {
        dayMap[i] = { day: dayLabels[i], dayIndex: i, exercises: [] };
      }

      if (plan.plan_exercises && plan.plan_exercises.length > 0) {
        plan.plan_exercises.forEach(pe => {
          const dayIndex = pe.day_of_week;
          if (dayMap[dayIndex]) {
            dayMap[dayIndex].exercises.push({
              id: pe.exercise_id,
              name: pe.exercise?.name || pe.name || '未知动作',
              sets: pe.sets || 3,
              reps: pe.reps || pe.repetitions || 10,
              rest: pe.rest_seconds || 60,
              notes: pe.notes || ''
            });
          }
        });
      } else if (plan.exercises && Array.isArray(plan.exercises)) {
        plan.exercises.forEach((ex, idx) => {
          const dayIndex = idx % 7 || 7;
          if (dayMap[dayIndex]) {
            dayMap[dayIndex].exercises.push({
              id: ex.id,
              name: ex.name || '未知动作',
              sets: ex.sets || 3,
              reps: ex.reps || 10,
              rest: ex.rest_seconds || 60,
              notes: ex.notes || ''
            });
          }
        });
      }

      const weekDays = Object.values(dayMap).filter(d => d.exercises.length > 0);
      this.setData({ weekDays });
    },

    // Calendar
    initCalendar() {
      const now = new Date();
      this.setData({
        calendarYear: now.getFullYear(),
        calendarMonth: now.getMonth() + 1
      });
      this.buildCalendarData();
    },

    buildCalendarData() {
      const { calendarYear, calendarMonth } = this.data;
      const firstDay = new Date(calendarYear, calendarMonth - 1, 1);
      const lastDay = new Date(calendarYear, calendarMonth, 0);
      const daysInMonth = lastDay.getDate();
      const startDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay();

      const days = [];
      // Empty cells before first day
      for (let i = 1; i < startDayOfWeek; i++) {
        days.push({ empty: true });
      }
      // Days of month
      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${calendarYear}-${String(calendarMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const isToday = this.isToday(d);
        days.push({
          day: d,
          date: dateStr,
          isToday,
          status: this.getDayStatus(dateStr)
        });
      }

      this.setData({ calendarDays: days });
    },

    getDayStatus(dateStr) {
      // 注意：当前 analysis API 不包含 executions 历史记录
      // 日历状态需要后端支持 execuitons 字段才可显示
      // 目前返回 'none'，后端完善后可显示实际状态
      const { analysis } = this.data;
      if (!analysis || !analysis.executions) return 'none';
      const exec = analysis.executions.find(e => e.date === dateStr);
      return exec ? exec.status : 'none';
    },

    isToday(day) {
      const now = new Date();
      return now.getFullYear() === this.data.calendarYear &&
             now.getMonth() + 1 === this.data.calendarMonth &&
             now.getDate() === day;
    },

    onPrevMonth() {
      let { calendarYear, calendarMonth } = this.data;
      calendarMonth--;
      if (calendarMonth < 1) {
        calendarMonth = 12;
        calendarYear--;
      }
      this.setData({ calendarYear, calendarMonth });
      this.buildCalendarData();
    },

    onNextMonth() {
      let { calendarYear, calendarMonth } = this.data;
      calendarMonth++;
      if (calendarMonth > 12) {
        calendarMonth = 1;
        calendarYear++;
      }
      this.setData({ calendarYear, calendarMonth });
      this.buildCalendarData();
    },

    onStartExecute() {
      const { planId } = this.data;
      if (!planId) return;

      wx.navigateTo({
        url: `/packageA/pages/plan-execute/index?id=${planId}`
      });
    },

    getGoalLabel(goal) {
      const labels = { bulk: '增肌', cut: '减脂', maintain: '维持' };
      return labels[goal] || goal || '-';
    },

    getStatusLabel(status) {
      const labels = { draft: '草稿', active: '进行中', completed: '已完成', paused: '已暂停' };
      return labels[status] || status || '-';
    },

    getExperienceLabel(exp) {
      const labels = { beginner: '初学者', intermediate: '中级', advanced: '高级' };
      return labels[exp] || exp || '-';
    },

    formatExerciseInfo(exercise) {
      return `${exercise.sets}组 x ${exercise.reps}次`;
    },

    getCompletionRate() {
      const { analysis } = this.data;
      if (!analysis || !analysis.stats) return 0;
      return Math.round(analysis.stats.completionRate || 0);
    },

    getTotalWorkouts() {
      const { analysis } = this.data;
      if (!analysis || !analysis.stats) return 0;
      return analysis.stats.total || 0;
    },

    getCompletedWorkouts() {
      const { analysis } = this.data;
      if (!analysis || !analysis.stats) return 0;
      return analysis.stats.completed || 0;
    },

    getStreakDays() {
      const { analysis } = this.data;
      if (!analysis || !analysis.stats) return 0;
      return analysis.stats.streak || 0;
    },

    getDayProgressClass(dayIndex) {
      // 基于当前日期和计划安排判断状态
      const today = new Date();
      const todayDayOfWeek = today.getDay() === 0 ? 7 : today.getDay();

      // 今天是进行中状态
      if (dayIndex === todayDayOfWeek) {
        return 'in-progress';
      }
      // 已过的训练日显示为已完成（假设用户已完成）
      if (dayIndex < todayDayOfWeek) {
        return 'completed';
      }
      // 未来的日子
      return 'pending';
    },

    getDayProgressWidth(item) {
      // 根据状态返回进度条宽度
      const className = this.getDayProgressClass(item.dayIndex);
      switch (className) {
        case 'completed': return 100;
        case 'in-progress': return 50;
        default: return 0;
      }
    },

    getDayStatusIcon(dayIndex) {
      const className = this.getDayProgressClass(dayIndex);
      switch (className) {
        case 'completed': return '✓';
        case 'in-progress': return '●';
        case 'skipped': return '×';
        default: return '○';
      }
    },

    goBack() {
      wx.navigateBack();
    }
  },

  detached() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
});