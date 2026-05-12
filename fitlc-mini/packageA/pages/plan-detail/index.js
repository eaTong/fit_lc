const { planActions } = require('../../../store/actions');

Component({
  data: {
    planId: null,
    plan: null,
    weekDays: [],
    isLoading: false,
    error: '',
    analysis: null
  },

  lifetimes: {
    attached() {
      this.initStore();
    }
  },

  pageLifetimes: {
    show() {
      // Re-fetch when page shows (e.g., back from execute)
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
        // Fetch analysis if plan is active
        if (plan.status === 'active') {
          this.fetchAnalysis(planId);
        }
      }).catch(err => {
        console.error('fetchPlan failed:', err);
        this.setData({ isLoading: false, error: err.message || '加载失败' });
      });
    },

    fetchAnalysis(planId) {
      planActions.analyzeExecution(planId).then(analysis => {
        this.setData({ analysis });
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

      // Week day labels (1=周一 to 7=周日)
      const dayLabels = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];

      // Group exercises by day of week (use day_of_week field)
      const dayMap = {};
      for (let i = 1; i <= 7; i++) {
        dayMap[i] = { day: dayLabels[i], dayIndex: i, exercises: [] };
      }

      // Distribute exercises to days based on plan structure
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
        // Fallback: distribute evenly across training days
        const trainingDays = plan.frequency || 4;
        plan.exercises.forEach((ex, idx) => {
          const dayIndex = idx % 7 || 7; // 1-7
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

      // Convert to array and filter days with exercises
      const weekDays = Object.values(dayMap).filter(d => d.exercises.length > 0);
      this.setData({ weekDays });
    },

    onStartExecute() {
      const { planId } = this.data;
      if (!planId) return;

      wx.navigateTo({
        url: `/packageA/pages/plan-execute/index?id=${planId}`
      });
    },

    getGoalLabel(goal) {
      const labels = {
        bulk: '增肌',
        cut: '减脂',
        maintain: '维持'
      };
      return labels[goal] || goal || '-';
    },

    getStatusLabel(status) {
      const labels = {
        draft: '草稿',
        active: '进行中',
        completed: '已完成',
        paused: '已暂停'
      };
      return labels[status] || status || '-';
    },

    getExperienceLabel(exp) {
      const labels = {
        beginner: '初学者',
        intermediate: '中级',
        advanced: '高级'
      };
      return labels[exp] || exp || '-';
    },

    formatExerciseInfo(exercise) {
      return `${exercise.sets}组 x ${exercise.reps}次`;
    },

    getCompletionRate() {
      const { analysis } = this.data;
      if (!analysis || !analysis.stats) return 0;
      return analysis.stats.completionRate || 0;
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
    }
  },

  detached() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
});