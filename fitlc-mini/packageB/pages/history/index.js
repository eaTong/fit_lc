const { recordActions } = require('../../../store/actions');
const { authActions } = require('../../../store/actions');
const Store = require('../../../store');

Component({
  data: {
    activeTab: 'all',
    workouts: [],
    measurements: [],
    filteredRecords: [],
    loading: false,
    isEmpty: false
  },

  lifetimes: {
    attached() {
      this.initStore();
      this.loadData();
    }
  },

  pageLifetimes: {
    show() {
      this.initStore();
      this.loadData();
    }
  },

  methods: {
    initStore() {
      const app = getApp();
      this.store = app.store || new Store();
      this.setData({
        workouts: this.store.getState().workouts || [],
        measurements: this.store.getState().measurements || []
      });
      this.updateFilteredRecords();

      this.unsubscribe = this.store.subscribe(state => {
        this.setData({
          workouts: state.workouts || [],
          measurements: state.measurements || []
        });
        this.updateFilteredRecords();
      });
    },

    loadData() {
      this.setData({ loading: true });
      this.fetchRecords();
    },

    fetchRecords() {
      if (!authActions.checkAuth()) {
        wx.redirectTo({ url: '/pages/login/index' });
        return;
      }

      Promise.all([
        recordActions.fetchWorkouts(),
        recordActions.fetchMeasurements()
      ]).then(([workouts, measurements]) => {
        this.setData({
          workouts,
          measurements,
          loading: false
        });
        this.updateFilteredRecords();
      }).catch(err => {
        this.setData({ loading: false });
        console.error('fetch records failed:', err);
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
    },

    updateFilteredRecords() {
      const { activeTab, workouts, measurements } = this.data;

      let records = [];

      if (activeTab === 'all') {
        // Merge and sort by date descending
        const workoutRecords = workouts.map(w => ({
          id: w.id,
          type: 'workout',
          date: w.date,
          summary: `${w.exercises?.length || 0}个动作`,
          detail: `共${this.calculateTotalSets(w)}组`,
          data: w
        }));

        const measurementRecords = measurements.map(m => ({
          id: m.id,
          type: 'measurement',
          date: m.date,
          summary: `${m.items?.length || 0}个部位`,
          detail: this.getMeasurementParts(m),
          data: m
        }));

        records = [...workoutRecords, ...measurementRecords];
      } else if (activeTab === 'workout') {
        records = workouts.map(w => ({
          id: w.id,
          type: 'workout',
          date: w.date,
          summary: `${w.exercises?.length || 0}个动作`,
          detail: `共${this.calculateTotalSets(w)}组`,
          data: w
        }));
      } else if (activeTab === 'measurement') {
        records = measurements.map(m => ({
          id: m.id,
          type: 'measurement',
          date: m.date,
          summary: `${m.items?.length || 0}个部位`,
          detail: this.getMeasurementParts(m),
          data: m
        }));
      }

      // Sort by date descending
      records.sort((a, b) => new Date(b.date) - new Date(a.date));

      this.setData({
        filteredRecords: records,
        isEmpty: records.length === 0
      });
    },

    calculateTotalSets(workout) {
      if (!workout.exercises) return 0;
      return workout.exercises.reduce((total, ex) => total + (ex.sets || 0), 0);
    },

    getMeasurementParts(measurement) {
      if (!measurement.items || measurement.items.length === 0) return '-';
      return measurement.items.map(item => item.body_part).join('、');
    },

    onTabChange(e) {
      const tab = e.currentTarget.dataset.tab;
      this.setData({ activeTab: tab }, () => {
        this.updateFilteredRecords();
      });
    },

    onRecordTap(e) {
      const record = e.currentTarget.dataset.record;
      if (record.type === 'workout') {
        // Navigate to workout detail or chat with the workout data
        wx.navigateTo({
          url: `/pages/chat/index?workoutId=${record.id}`
        });
      } else {
        // Navigate to measurement detail or chat
        wx.navigateTo({
          url: `/pages/chat/index?measurementId=${record.id}`
        });
      }
    },

    onRefresh() {
      this.fetchRecords();
    },

    formatDate(dateStr) {
      if (!dateStr) return '-';
      const date = new Date(dateStr);
      const now = new Date();
      const diff = now - date;
      const oneDay = 24 * 60 * 60 * 1000;

      if (diff < oneDay) {
        return '今天';
      } else if (diff < 2 * oneDay) {
        return '昨天';
      } else if (diff < 7 * oneDay) {
        return `${Math.floor(diff / oneDay)}天前`;
      } else {
        return `${date.getMonth() + 1}月${date.getDate()}日`;
      }
    }
  },

  detached() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
});