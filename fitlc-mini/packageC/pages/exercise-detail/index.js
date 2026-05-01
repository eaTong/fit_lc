const { exerciseActions } = require('../../../store/actions');
const { authActions } = require('../../../store/actions');

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
        this.setData({ exercise, isLoading: false });
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

      // Get muscle IDs from the exercise
      const muscleIds = exercise.muscles.map(m => m.id);

      // Fetch all exercises and filter related ones
      exerciseActions.fetchExercises().then(exercises => {
        const related = exercises
          .filter(ex => ex.id !== exercise.id)
          .filter(ex => {
            if (!ex.muscles) return false;
            return ex.muscles.some(m => muscleIds.includes(m.id));
          })
          .slice(0, 5); // Limit to 5 related exercises

        this.setData({ relatedExercises: related });
      }).catch(err => {
        console.error('fetch related exercises failed:', err);
      });
    },

    onRelatedExerciseTap(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/exercise-detail/index?id=${id}`
      });
    },

    onBack() {
      wx.navigateBack();
    },

    getPrimaryMuscle(exercise) {
      if (!exercise || !exercise.muscles || exercise.muscles.length === 0) {
        return '-';
      }
      // Return the first muscle as primary
      return exercise.muscles[0].name || '-';
    },

    getTargetMuscles(exercise) {
      if (!exercise || !exercise.muscles || exercise.muscles.length === 0) {
        return '-';
      }
      return exercise.muscles.map(m => m.name).join('、');
    },

    getSteps(exercise) {
      if (!exercise || !exercise.steps) return [];
      // If steps is a string, split by newlines
      if (typeof exercise.steps === 'string') {
        return exercise.steps.split('\n').filter(s => s.trim());
      }
      return exercise.steps;
    }
  }
});