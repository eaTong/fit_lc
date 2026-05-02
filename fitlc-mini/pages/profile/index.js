const { authActions } = require('../../store/actions');
const { recordActions } = require('../../store/actions');
const { achievementActions } = require('../../store/actions');
const { userActions } = require('../../store/actions');

Page({
  data: {
    user: null,
    displayName: '默认用户',
    avatarText: '👤',
    avatarUrl: '',
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
      avatarText: user?.email ? user.email[0].toUpperCase() : '👤',
      avatarUrl: user?.avatar || ''
    });

    this.unsubscribe = app.store.subscribe(state => {
      const user = state.user;
      this.setData({
        user,
        displayName: user?.nickname || user?.email || '默认用户',
        avatarText: user?.email ? user.email[0].toUpperCase() : '👤',
        avatarUrl: user?.avatar || '',
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
      const gender = profile?.gender;
      const weight = metrics?.weight;
      const bodyFat = metrics?.bodyFat;
      const bmi = height && weight ? (weight / ((height / 100) * (height / 100))).toFixed(1) : null;

      // Calculate BMI class based on value
      let bmiClass = '';
      if (bmi) {
        const bmiNum = parseFloat(bmi);
        if (bmiNum < 18.5) bmiClass = 'bmi-underweight';
        else if (bmiNum < 24) bmiClass = 'bmi-normal';
        else if (bmiNum < 28) bmiClass = 'bmi-overweight';
        else bmiClass = 'bmi-obese';
      }

      // Calculate body fat class based on gender
      // Men: essential<6, athletes 6-13, fitness 14-17, average 18-24, obese>25
      // Women: essential<14, athletes 14-20, fitness 21-24, average 25-31, obese>32
      let bodyFatClass = '';
      if (bodyFat) {
        const bf = parseFloat(bodyFat);
        if (gender === 'male') {
          if (bf < 6) bodyFatClass = 'bf-essential';
          else if (bf < 14) bodyFatClass = 'bf-athletic';
          else if (bf < 18) bodyFatClass = 'bf-fitness';
          else if (bf < 25) bodyFatClass = 'bf-average';
          else bodyFatClass = 'bf-obese';
        } else if (gender === 'female') {
          if (bf < 14) bodyFatClass = 'bf-essential';
          else if (bf < 21) bodyFatClass = 'bf-athletic';
          else if (bf < 25) bodyFatClass = 'bf-fitness';
          else if (bf < 32) bodyFatClass = 'bf-average';
          else bodyFatClass = 'bf-obese';
        } else {
          // No gender specified, use average ranges
          if (bf < 10) bodyFatClass = 'bf-essential';
          else if (bf < 17) bodyFatClass = 'bf-athletic';
          else if (bf < 22) bodyFatClass = 'bf-fitness';
          else if (bf < 28) bodyFatClass = 'bf-average';
          else bodyFatClass = 'bf-obese';
        }
      }

      // Update nickname from profile if available
      const nickname = profile?.nickname || this.data.user?.nickname;
      const email = profile?.email || this.data.user?.email;
      const avatarUrl = profile?.avatar || this.data.avatarUrl;
      const displayName = nickname || email || '默认用户';
      const avatarText = email ? email[0].toUpperCase() : '👤';

      this.setData({
        latestMeasurement: measurements,
        stats,
        userProfile: profile,
        latestMetrics: metrics,
        height,
        gender,
        weight,
        bodyFat,
        bmi,
        bmiClass,
        bodyFatClass,
        displayName,
        avatarText,
        avatarUrl,
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
  goToMeasurements() {
    wx.navigateTo({ url: '/packageB/pages/measurements/index' });
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

  goToSettings() {
    wx.navigateTo({ url: '/pages/settings/index' });
  }
});