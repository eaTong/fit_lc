const { planActions } = require('../../../store/actions');
const Store = require('../../../store');

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
      const store = app.store || new Store();
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

      const dayLabels = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      const today = new Date();
      const dayOfWeek = dayLabels[today.getDay()];

      let exercises = [];

      if (plan.plan_exercises && plan.plan_exercises.length > 0) {
        exercises = plan.plan_exercises
          .filter(pe => pe.day_of_week === dayOfWeek || !pe.day_of_week)
          .map(pe => ({
            id: pe.exercise_id,
            name: pe.exercise?.name || pe.name || '未知动作',
            targetSets: pe.sets || 3,
            targetReps: pe.reps || pe.repetitions || 10,
            sets: this.initSetsArray(pe.sets || 3, pe.reps || 10)
          }));
      } else if (plan.exercises && Array.isArray(plan.exercises)) {
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
          { id: 1, name: '暂无训练动作', targetSets: 0, targetReps: 0, sets: [] }
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

      const executionData = exercises.map(ex => ({
        exerciseId: ex.id,
        sets: ex.sets.map(s => ({
          weight: parseFloat(s.weight) || 0,
          reps: parseInt(s.reps) || 0,
          completed: s.completed,
          notes: s.notes || ''
        })),
        notes: ex.exerciseNotes || ''
      }));

      planActions.recordExecution(planId, {
        date: executionDate,
        exercises: executionData
      }).then(() => {
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

    onBack() {
      wx.navigateBack();
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