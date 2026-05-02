const { exerciseActions } = require('../../../store/actions');

Component({
  data: {
    exerciseId: null,
    exercise: null,
    relatedExercises: [],
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
      // Re-fetch when page shows
    }
  },

  methods: {
    initStore() {
      const app = getApp();
      const store = app.store || {};
      this.store = store;
    },

    onLoad(options) {
      if (!options.id) {
        this.setData({ error: '缺少动作ID' });
        return;
      }
      this.setData({ exerciseId: options.id });
      this.fetchExerciseDetail(options.id);
    },

    fetchExerciseDetail(exerciseId) {
      this.setData({ isLoading: true, error: '' });

      exerciseActions.fetchExercise(exerciseId).then(exercise => {
        // 预处理中文标签
        const categoryMap = { chest: '胸部', back: '背部', shoulders: '肩部', arms: '手臂', legs: '腿部', core: '核心', cardio: '有氧', fullbody: '全身' };
        const equipmentMap = { barbell: '杠铃', dumbbell: '哑铃', cable: '绳索', machine: '器械', bodyweight: '自重', other: '其他' };
        const difficultyMap = { beginner: '初级', intermediate: '中级', advanced: '高级' };
        const typeMap = { compound: '复合动作', isolation: '孤立动作' };

        exercise._categoryLabel = categoryMap[exercise.category] || exercise.category;
        exercise._equipmentLabel = equipmentMap[exercise.equipment] || exercise.equipment;
        exercise._difficultyLabel = difficultyMap[exercise.difficulty] || exercise.difficulty;
        exercise._typeLabel = typeMap[exercise.exerciseType] || exercise.exerciseType;

        this.setData({ exercise, isLoading: false });
        // 设置导航栏标题
        if (exercise && exercise.name) {
          wx.setNavigationBarTitle({ title: exercise.name });
        }
        this.loadRelatedExercises(exercise);
      }).catch(err => {
        console.error('fetchExercise failed:', err);
        this.setData({ isLoading: false, error: err.message || '加载失败' });
      });
    },

    loadRelatedExercises(exercise) {
      if (!exercise || !exercise.muscles || exercise.muscles.length === 0) {
        return;
      }

      const muscleIds = exercise.muscles.map(m => m.id);

      exerciseActions.fetchExercises().then(exercises => {
        const related = exercises
          .filter(ex => ex.id !== exercise.id)
          .filter(ex => {
            if (!ex.muscles) return false;
            return ex.muscles.some(m => muscleIds.includes(m.id));
          })
          .slice(0, 5);

        this.setData({ relatedExercises: related });
      }).catch(err => {
        console.error('fetch related exercises failed:', err);
      });
    },

    onRelatedExerciseTap(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/packageC/pages/exercise-detail/index?id=${id}`
      });
    },

    // 中文映射
    getCategoryLabel(category) {
      const map = { chest: '胸部', back: '背部', shoulders: '肩部', arms: '手臂', legs: '腿部', core: '核心', cardio: '有氧', fullbody: '全身' };
      return map[category] || category || '';
    },

    getEquipmentLabel(equipment) {
      const map = { barbell: '杠铃', dumbbell: '哑铃', cable: '绳索', machine: '器械', bodyweight: '自重', other: '其他' };
      return map[equipment] || equipment || '';
    },

    getDifficultyLabel(difficulty) {
      const map = { beginner: '初级', intermediate: '中级', advanced: '高级' };
      return map[difficulty] || difficulty || '';
    },

    getExerciseTypeLabel(type) {
      const map = { compound: '复合动作', isolation: '孤立动作' };
      return map[type] || type || '';
    },

    getPrimaryMuscle(exercise) {
      if (!exercise || !exercise.muscles || exercise.muscles.length === 0) {
        return null;
      }
      return exercise.muscles[0].name || null;
    },

    getTargetMuscles(exercise) {
      if (!exercise || !exercise.muscles || exercise.muscles.length === 0) {
        return null;
      }
      return exercise.muscles.map(m => m.name).join('、');
    },

    getSteps(exercise) {
      if (!exercise || !exercise.steps) return [];
      if (typeof exercise.steps === 'string') {
        return exercise.steps.split('\n').filter(s => s.trim());
      }
      return exercise.steps;
    }
  }
});