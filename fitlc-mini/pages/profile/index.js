const { authActions } = require('../../store/actions');
const { recordActions } = require('../../store/actions');
const { achievementActions } = require('../../store/actions');
const { userActions } = require('../../store/actions');

Page({
  data: {
    user: null,
    displayName: '默认用户',
    avatarText: '👤',
    stats: null,
    latestMeasurement: null,
    userProfile: null,
    latestMetrics: null,
    height: null,
    weight: null,
    bodyFat: null,
    bmi: null,
    loading: false
  },

  onLoad() {
    if (!authActions.checkAuth()) {
      wx.redirectTo({ url: '/pages/login/index' });
      return;
    }

    const app = getApp();
    const user = app.store.getState().user;
    this.setData({
      user,
      displayName: user?.nickname || user?.email || '默认用户',
      avatarText: user?.email ? user.email[0].toUpperCase() : '👤'
    });

    this.unsubscribe = app.store.subscribe(state => {
      const user = state.user;
      this.setData({
        user,
        displayName: user?.nickname || user?.email || '默认用户',
        avatarText: user?.email ? user.email[0].toUpperCase() : '👤',
        latestMeasurement: state.latestMeasurement
      });
    });

    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  onUnload() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },

  loadData() {
    this.setData({ loading: true });

    Promise.all([
      recordActions.fetchLatestMeasurement(),
      achievementActions.fetchStats(),
      userActions.fetchProfile(),
      userActions.fetchLatestMetrics()
    ]).then(([measurements, stats, profile, metrics]) => {
      const height = profile?.height;
      const weight = metrics?.weight;
      const bodyFat = metrics?.bodyFat;
      const bmi = height && weight ? (weight / ((height / 100) * (height / 100))).toFixed(1) : null;

      this.setData({
        latestMeasurement: measurements,
        stats,
        userProfile: profile,
        latestMetrics: metrics,
        height,
        weight,
        bodyFat,
        bmi,
        loading: false
      });
    }).catch(err => {
      this.setData({ loading: false });
      console.error('load profile data failed:', err);
    });
  },

  onLogout() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          authActions.logout();
          wx.redirectTo({ url: '/pages/login/index' });
        }
      }
    });
  },

  // Navigation handlers - subpackage pages use packageX/pages/xxx/index
  goToHistory() {
    wx.navigateTo({ url: '/packageB/pages/history/index' });
  },

  goToMeasurements() {
    wx.navigateTo({ url: '/packageB/pages/measurements/index' });
  },

  goToTrends() {
    wx.navigateTo({ url: '/packageB/pages/trends/index' });
  },

  goToCalendar() {
    wx.navigateTo({ url: '/packageB/pages/calendar/index' });
  },

  goToPlans() {
    wx.navigateTo({ url: '/packageA/pages/plans/index' });
  },

  goToBadges() {
    wx.navigateTo({ url: '/packageC/pages/badges/index' });
  },

  goToGallery() {
    wx.navigateTo({ url: '/packageC/pages/gallery/index' });
  },

  goToExercises() {
    wx.switchTab({ url: '/pages/exercises/index' });
  },

  goToSettings() {
    wx.navigateTo({ url: '/pages/settings/index' });
  }
});