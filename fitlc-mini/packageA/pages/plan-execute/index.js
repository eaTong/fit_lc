const { planActions } = require('../../../store/actions');

Component({
  data: {
    planId: null,
    executionDate: null,
    plan: null,
    exercises: [],
    isLoading: false,
    isSubmitting: false,
    error: '',
    // Progress ring
    completedCount: 0,
    totalCount: 0,
    // Editor modal
    showEditModal: false,
    editingExercise: null,
    editingIndex: -1
  },

  lifetimes: {
    attached() {
      this.initStore();
    }
  },

  pageLifetimes: {
    show() {
      this.drawProgressRing();
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
        this.drawProgressRing();
      }).catch(err => {
        console.error('fetchPlan failed:', err);
        this.setData({ isLoading: false, error: err.message || '加载失败' });
      });
    },

    prepareExercises(plan) {
      if (!plan) return;

      const today = new Date();
      const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay();

      let exercises = [];

      if (plan.plan_exercises && plan.plan_exercises.length > 0) {
        exercises = plan.plan_exercises
          .filter(pe => pe.day_of_week === dayOfWeek)
          .map(pe => ({
            id: pe.exercise_id,
            name: pe.exercise?.name || pe.name || '未知动作',
            targetSets: pe.targetSets ?? pe.sets || 3,
            targetReps: pe.targetReps ?? pe.reps ?? pe.repetitions ?? '8-12',
            targetWeight: pe.targetWeight ?? pe.weight ?? null,
            sets: this.initSetsArray(
              pe.targetSets ?? pe.sets ?? 3,
              pe.targetReps ?? pe.reps ?? 10
            )
          }));
      } else if (plan.exercises && Array.isArray(plan.exercises)) {
        exercises = plan.exercises.map(ex => ({
          id: ex.id,
          name: ex.name || '未知动作',
          targetSets: ex.targetSets ?? ex.sets ?? 3,
          targetReps: ex.targetReps ?? ex.reps ?? '8-12',
          targetWeight: ex.targetWeight ?? ex.weight ?? null,
          sets: this.initSetsArray(
            ex.targetSets ?? ex.sets ?? 3,
            ex.targetReps ?? ex.reps ?? 10
          )
        }));
      }

      if (exercises.length === 0) {
        exercises = [
          { id: 1, name: '今日无训练安排', targetSets: 0, targetReps: 0, sets: [] }
        ];
      }

      const totalCount = exercises.length;
      // 环形进度：只要动作有任意一组完成即算"进行中"
      const completedCount = exercises.filter(ex =>
        ex.sets && ex.sets.length > 0 && ex.sets.some(s => s.completed)
      ).length;

      this.setData({ exercises, totalCount, completedCount });
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

    drawProgressRing() {
      const { completedCount, totalCount } = this.data;
      if (totalCount === 0) return;

      const context = wx.createCanvasContext('progressRing', this);
      const size = 160;
      const baseRadius = 60;
      const lineWidth = 12;

      // 获取设备像素比，处理高清屏幕
      const sysInfo = wx.getSystemInfoSync();
      const pixelRatio = sysInfo.pixelRatio || 2;

      // 设置 canvas 实际渲染尺寸（防止模糊）
      this.setData({ ringSize: size * pixelRatio });

      const center = size / 2;
      const radius = baseRadius;

      // Background circle
      context.setStrokeStyle('#333333');
      context.setLineWidth(lineWidth);
      context.beginPath();
      context.arc(center, center, radius, 0, 2 * Math.PI);
      context.stroke();

      // Progress arc
      const percentage = totalCount > 0 ? completedCount / totalCount : 0;
      const endAngle = percentage * 2 * Math.PI - Math.PI / 2;

      context.setStrokeStyle('#FF4500');
      context.setLineWidth(lineWidth);
      context.setLineCap('round');
      context.beginPath();
      context.arc(center, center, radius, -Math.PI / 2, endAngle);
      context.stroke();

      context.draw();

      this.setData({ completedCount, totalCount });
    },

    onSetWeightChange(e) {
      const { exerciseIndex, setIndex } = e.currentTarget.dataset;
      const weight = e.detail.value;
      const exercises = [...this.data.exercises];
      exercises[exerciseIndex].sets[setIndex].weight = weight;
      this.setData({ exercises });
      this.updateProgress();
    },

    onSetRepsChange(e) {
      const { exerciseIndex, setIndex } = e.currentTarget.dataset;
      const reps = e.detail.value;
      const exercises = [...this.data.exercises];
      exercises[exerciseIndex].sets[setIndex].reps = reps;
      this.setData({ exercises });
      this.updateProgress();
    },

    onSetCompletedChange(e) {
      const { exerciseIndex, setIndex } = e.currentTarget.dataset;
      const completed = e.detail.value;
      const exercises = [...this.data.exercises];
      exercises[exerciseIndex].sets[setIndex].completed = completed;
      this.setData({ exercises });
      this.updateProgress();
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

    updateProgress() {
      const { exercises } = this.data;
      // 环形进度：只要动作有任意一组完成即算"进行中"
      const completedCount = exercises.filter(ex =>
        ex.sets && ex.sets.length > 0 && ex.sets.some(s => s.completed)
      ).length;
      this.setData({ completedCount });
      this.drawProgressRing();
    },

    // Edit Exercise Modal
    onEditExercise(e) {
      const index = e.currentTarget.dataset.index;
      const exercise = this.data.exercises[index];
      if (!exercise) return;

      const firstSet = exercise.sets && exercise.sets[0] ? exercise.sets[0] : null;

      this.setData({
        showEditModal: true,
        editingIndex: index,
        editingExercise: {
          name: exercise.name,
          tempSets: exercise.targetSets || 3,
          tempReps: firstSet ? String(firstSet.reps || '') : '',
          tempWeight: firstSet ? String(firstSet.weight || '') : ''
        }
      });
    },

    onCloseEditModal() {
      this.setData({
        showEditModal: false,
        editingExercise: null,
        editingIndex: -1
      });
    },

    noop() {
      // Prevent tap propagation
    },

    onSelectSets(e) {
      const sets = e.currentTarget.dataset.sets;
      const editingExercise = { ...this.data.editingExercise, tempSets: sets };
      this.setData({ editingExercise });
    },

    onEditRepsInput(e) {
      const reps = e.detail.value;
      const editingExercise = { ...this.data.editingExercise, tempReps: reps };
      this.setData({ editingExercise });
    },

    onEditWeightInput(e) {
      const weight = e.detail.value;
      const editingExercise = { ...this.data.editingExercise, tempWeight: weight };
      this.setData({ editingExercise });
    },

    onConfirmEdit() {
      const { editingExercise, editingIndex, exercises } = this.data;
      if (editingExercise === null || editingIndex < 0) return;

      // 数值边界校验
      const sets = Math.min(Math.max(parseInt(editingExercise.tempSets) || 3, 1), 10);
      const reps = Math.min(Math.max(parseInt(editingExercise.tempReps) || 10, 1), 100);
      const weight = editingExercise.tempWeight ? Math.min(Math.max(parseFloat(editingExercise.tempWeight), 0), 500) : 0;

      // Create new sets array with the edited values
      const newSets = [];
      for (let i = 0; i < sets; i++) {
        newSets.push({
          setIndex: i + 1,
          weight: weight,
          reps: reps,
          completed: i < (exercises[editingIndex].sets?.filter(s => s.completed).length || 0),
          notes: ''
        });
      }

      const updatedExercises = [...exercises];
      updatedExercises[editingIndex] = {
        ...updatedExercises[editingIndex],
        targetSets: sets,
        targetReps: String(reps),
        targetWeight: weight > 0 ? weight : null,
        sets: newSets
      };

      this.setData({
        exercises: updatedExercises,
        showEditModal: false,
        editingExercise: null,
        editingIndex: -1
      });

      this.updateProgress();
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

      const executionPromises = exercises
        .filter(ex => ex.sets && ex.sets.some(s => s.completed))
        .map(ex => {
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