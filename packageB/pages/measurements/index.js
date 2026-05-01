// Measurements Page - 围度记录页
const { recordActions, authActions } = require('../../../store/actions');
const Store = require('../../../store');

Component({
  data: {
    latestMeasurement: null,
    measurements: [],
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

      this.unsubscribe = this.store.subscribe(state => {
        this.setData({
          measurements: state.measurements || [],
          latestMeasurement: state.latestMeasurement || this.getLatestFromList(state.measurements)
        });
        this.updateEmptyState();
      });
    },

    getLatestFromList(measurements) {
      if (!measurements || measurements.length === 0) return null;
      const sorted = [...measurements].sort((a, b) =>
        new Date(b.date) - new Date(a.date)
      );
      return sorted[0];
    },

    loadData() {
      this.setData({ loading: true });
      this.fetchData();
    },

    fetchData() {
      if (!authActions.checkAuth()) {
        wx.redirectTo({ url: '/pages/login/index' });
        return;
      }

      Promise.all([
        recordActions.fetchMeasurements(),
        recordActions.fetchLatestMeasurement()
      ]).then(([measurements, latestMeasurement]) => {
        this.setData({
          measurements: measurements || [],
          latestMeasurement: latestMeasurement || this.getLatestFromList(measurements),
          loading: false
        });
        this.updateEmptyState();
      }).catch(err => {
        this.setData({ loading: false });
        console.error('fetch measurements failed:', err);
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
    },

    updateEmptyState() {
      const { measurements } = this.data;
      this.setData({ isEmpty: !measurements || measurements.length === 0 });
    },

    onMeasurementTap(e) {
      const measurement = e.currentTarget.dataset.measurement;
      wx.navigateTo({
        url: `/pages/chat/index?measurementId=${measurement.id}`
      });
    },

    onRefresh() {
      this.fetchData();
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
    },

    formatDetailDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    },

    getMeasurementParts(measurement) {
      if (!measurement.items || measurement.items.length === 0) return '-';
      return measurement.items.map(item => item.body_part).join('、');
    }
  },

  detached() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
});