const { planActions } = require('../../../store/actions');

Component({
  data: {
    planId: null,
    plan: null,
    weekDays: [],
    isLoading: false,
    error: ''
  },

  lifetimes: {
    attached() {
      this.initStore();
    }
  },

  pageLifetimes: {
    show() {
      // Re-fetch when page shows (e.g., back from execute)
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
      }).catch(err => {
        console.error('fetchPlan failed:', err);
        this.setData({ isLoading: false, error: err.message || '加载失败' });
      });
    },

    formatPlanByWeekDay(plan) {
      if (!plan || !plan.exercises) return;

      // Week day labels
      const dayLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

      // Group exercises by weekday
      const dayMap = {};
      dayLabels.forEach((label, index) => {
        dayMap[index] = { day: label, dayIndex: index, exercises: [] };
      });

      // Distribute exercises to days based on plan structure
      if (plan.plan_exercises && plan.plan_exercises.length > 0) {
        plan.plan_exercises.forEach(pe => {
          const dayIndex = pe.day_of_week !== undefined ? pe.day_of_week : pe.dayIndex;
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
          const dayIndex = idx % 7;
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

    onBack() {
      wx.navigateBack();
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

    formatExerciseInfo(exercise) {
      return `${exercise.sets}组 x ${exercise.reps}次`;
    }
  },

  detached() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
});