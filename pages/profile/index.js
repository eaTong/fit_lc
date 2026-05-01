const { authActions } = require('../../store/actions');
const { recordActions } = require('../../store/actions');
const { achievementActions } = require('../../store/actions');

Page({
  data: {
    user: null,
    stats: null,
    latestMeasurement: null,
    loading: false
  },

  onLoad() {
    if (!authActions.checkAuth()) {
      wx.redirectTo({ url: '/pages/login/index' });
      return;
    }

    const app = getApp();
    this.setData({ user: app.store.getState().user });

    this.unsubscribe = app.store.subscribe(state => {
      this.setData({
        user: state.user,
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
      achievementActions.fetchStats()
    ]).then(([measurements, stats]) => {
      this.setData({
        latestMeasurement: measurements,
        stats,
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

  // Navigation handlers
  goToHistory() {
    wx.navigateTo({ url: '/pages/history/index' });
  },

  goToMeasurements() {
    wx.navigateTo({ url: '/pages/measurements/index' });
  },

  goToTrends() {
    wx.navigateTo({ url: '/pages/trends/index' });
  },

  goToCalendar() {
    wx.navigateTo({ url: '/pages/calendar/index' });
  },

  goToPlans() {
    wx.navigateTo({ url: '/pages/plans/index' });
  },

  goToBadges() {
    wx.navigateTo({ url: '/pages/badges/index' });
  },

  goToGallery() {
    wx.navigateTo({ url: '/pages/gallery/index' });
  },

  goToExercises() {
    wx.switchTab({ url: '/pages/exercises/index' });
  },

  goToSettings() {
    wx.navigateTo({ url: '/pages/settings/index' });
  }
});