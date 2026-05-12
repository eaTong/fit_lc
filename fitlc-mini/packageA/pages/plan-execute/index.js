const { planActions } = require('../../../store/actions');

Component({
  data: {
    planId: null,
    executionDate: null,
    plan: null,
    exercises: [],
    isLoading: false,
    isSubmitting: false,
    error: ''
  },

  lifetimes: {
    attached() {
      this.initStore();
    }
  },

  methods: {
    initStore() {
      const app = getApp();
      const store = app.store;
      this.store = store;

      this.unsubscribe = store.subscribe((state) => {
        this.setData({ plan: state.currentPlan || null });
      });
    },

    onLoad(options) {
      if (!options.id) {
        this.setData({ error: '缺少计划ID' });
        return;
      }
      const planId = options.id;
      const executionDate = options.date || this.formatDate(new Date());
      this.setData({ planId, executionDate });
      this.fetchPlanDetail(planId);
    },

    fetchPlanDetail(planId) {
      this.setData({ isLoading: true, error: '' });

      planActions.fetchPlan(planId).then(plan => {
        this.setData({ plan, isLoading: false });
        this.prepareExercises(plan);
      }).catch(err => {
        console.error('fetchPlan failed:', err);
        this.setData({ isLoading: false, error: err.message || '加载失败' });
      });
    },

    prepareExercises(plan) {
      if (!plan) return;

      // Get current day of week (1=周一 to 7=周日)
      const today = new Date();
      const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay();

      let exercises = [];

      if (plan.plan_exercises && plan.plan_exercises.length > 0) {
        // Filter by numeric day_of_week
        exercises = plan.plan_exercises
          .filter(pe => pe.day_of_week === dayOfWeek)
          .map(pe => ({
            id: pe.exercise_id,
            name: pe.exercise?.name || pe.name || '未知动作',
            targetSets: pe.sets || 3,
            targetReps: pe.reps || pe.repetitions || 10,
            restSeconds: pe.rest_seconds || 60,
            sets: this.initSetsArray(pe.sets || 3, pe.reps || 10)
          }));
      } else if (plan.exercises && Array.isArray(plan.exercises)) {
        // Fallback: distribute evenly
        exercises = plan.exercises.map(ex => ({
          id: ex.id,
          name: ex.name || '未知动作',
          targetSets: ex.sets || 3,
          targetReps: ex.reps || 10,
          sets: this.initSetsArray(ex.sets || 3, ex.reps || 10)
        }));
      }

      if (exercises.length === 0) {
        exercises = [
          { id: 1, name: '今日无训练安排', targetSets: 0, targetReps: 0, sets: [] }
        ];
      }

      this.setData({ exercises });
    },

    initSetsArray(sets, reps) {
      const arr = [];
      for (let i = 0; i < sets; i++) {
        arr.push({
          setIndex: i + 1,
          weight: '',
          reps: reps,
          completed: false,
          notes: ''
        });
      }
      return arr;
    },

    onSetWeightChange(e) {
      const { exerciseIndex, setIndex } = e.currentTarget.dataset;
      const weight = e.detail.value;
      const exercises = [...this.data.exercises];
      exercises[exerciseIndex].sets[setIndex].weight = weight;
      this.setData({ exercises });
    },

    onSetRepsChange(e) {
      const { exerciseIndex, setIndex } = e.currentTarget.dataset;
      const reps = e.detail.value;
      const exercises = [...this.data.exercises];
      exercises[exerciseIndex].sets[setIndex].reps = reps;
      this.setData({ exercises });
    },

    onSetCompletedChange(e) {
      const { exerciseIndex, setIndex } = e.currentTarget.dataset;
      const completed = e.detail.value;
      const exercises = [...this.data.exercises];
      exercises[exerciseIndex].sets[setIndex].completed = completed;
      this.setData({ exercises });
    },

    onSetNotesChange(e) {
      const { exerciseIndex, setIndex } = e.currentTarget.dataset;
      const notes = e.detail.value;
      const exercises = [...this.data.exercises];
      exercises[exerciseIndex].sets[setIndex].notes = notes;
      this.setData({ exercises });
    },

    onExerciseNotesChange(e) {
      const { exerciseIndex } = e.currentTarget.dataset;
      const notes = e.detail.value;
      const exercises = [...this.data.exercises];
      exercises[exerciseIndex].exerciseNotes = notes;
      this.setData({ exercises });
    },

    onCompleteCheckin() {
      const { planId, executionDate, exercises, isSubmitting } = this.data;

      if (isSubmitting) return;

      const hasCompletedSet = exercises.some(ex =>
        ex.sets && ex.sets.some(s => s.completed)
      );

      if (!hasCompletedSet) {
        wx.showToast({
          title: '请至少完成一组动作',
          icon: 'none'
        });
        return;
      }

      this.setData({ isSubmitting: true });

      // Build execution data per exercise (flatten sets to completed reps/weight)
      const executionPromises = exercises
        .filter(ex => ex.sets && ex.sets.some(s => s.completed))
        .map(ex => {
          // Calculate total completed reps and average weight
          const completedSets = ex.sets.filter(s => s.completed);
          const totalReps = completedSets.reduce((sum, s) => sum + (parseInt(s.reps) || 0), 0);
          const totalWeight = completedSets.reduce((sum, s) => sum + (parseFloat(s.weight) || 0), 0);
          const avgWeight = completedSets.length > 0 ? totalWeight / completedSets.length : 0;

          return planActions.recordExecution(planId, {
            plan_exercise_id: ex.id,
            scheduled_date: executionDate,
            completed_reps: totalReps,
            completed_weight: Math.round(avgWeight * 10) / 10,
            status: 'completed',
            notes: ex.exerciseNotes || ''
          });
        });

      Promise.all(executionPromises).then(() => {
        this.setData({ isSubmitting: false });
        wx.showToast({
          title: '打卡成功',
          icon: 'success'
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }).catch(err => {
        console.error('recordExecution failed:', err);
        this.setData({ isSubmitting: false });
        wx.showToast({
          title: err.message || '打卡失败',
          icon: 'none'
        });
      });
    },

    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    getTodayLabel() {
      const dayLabels = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      const today = new Date();
      return `今日 ${dayLabels[today.getDay()]}`;
    }
  },

  detached() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
});