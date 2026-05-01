const { userActions } = require('../../store/actions');
const { authActions } = require('../../store/actions');

Page({
  data: {
    profile: null,
    latestMetrics: null
  },

  onLoad() {
    if (!authActions.checkAuth()) {
      wx.redirectTo({ url: '/pages/login/index' });
      return;
    }
    this.loadData();
  },

  loadData() {
    Promise.all([
      userActions.fetchProfile(),
      userActions.fetchLatestMetrics()
    ]).then(([profile, metrics]) => {
      this.setData({ profile, latestMetrics: metrics });
    }).catch(err => {
      console.error('load settings data failed:', err);
    });
  },

  editNickname() {
    wx.showModal({
      title: '修改昵称',
      editable: true,
      placeholderText: '请输入昵称',
      success: (res) => {
        if (res.confirm && res.content) {
          this.updateProfile({ nickname: res.content });
        }
      }
    });
  },

  editHeight() {
    wx.showModal({
      title: '修改身高',
      editable: true,
      placeholderText: '请输入身高（cm）',
      success: (res) => {
        if (res.confirm && res.content) {
          const height = parseFloat(res.content);
          if (height && height > 0 && height < 300) {
            this.updateProfile({ height });
          } else {
            wx.showToast({ title: '请输入有效身高', icon: 'none' });
          }
        }
      }
    });
  },

  editWeight() {
    this.showMetricInput('体重', '请输入体重（kg）', (value) => {
      this.updateMetric({ weight: value });
    });
  },

  editBodyFat() {
    this.showMetricInput('体脂', '请输入体脂（%）', (value) => {
      this.updateMetric({ bodyFat: value });
    });
  },

  showMetricInput(title, placeholder, callback) {
    wx.showModal({
      title,
      editable: true,
      placeholderText: placeholder,
      success: (res) => {
        if (res.confirm && res.content) {
          const value = parseFloat(res.content);
          if (value && value > 0 && value < 100) {
            callback(value);
          } else {
            wx.showToast({ title: '请输入有效数值', icon: 'none' });
          }
        }
      }
    });
  },

  addMetric() {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    wx.showModal({
      title: '记录体重',
      editable: true,
      placeholderText: '体重（kg）',
      success: (res) => {
        if (res.confirm && res.content) {
          const weight = parseFloat(res.content);
          if (weight && weight > 0) {
            wx.showModal({
              title: '记录体脂（可选）',
              editable: true,
              placeholderText: '体脂（%），留空则不记录',
              success: (res2) => {
                const bodyFat = res2.content ? parseFloat(res2.content) : undefined;
                if (res2.confirm) {
                  this.createMetric({ date: dateStr, weight, bodyFat });
                }
              }
            });
          } else {
            wx.showToast({ title: '请输入有效体重', icon: 'none' });
          }
        }
      }
    });
  },

  updateProfile(data) {
    userActions.updateProfile(data).then(profile => {
      this.setData({ profile });
      wx.showToast({ title: '更新成功', icon: 'success' });
    }).catch(err => {
      console.error('update profile failed:', err);
      wx.showToast({ title: '更新失败', icon: 'none' });
    });
  },

  updateMetric(data) {
    const now = new Date();
    data.date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    userActions.addMetric(data).then(metrics => {
      this.setData({ latestMetrics: metrics });
      wx.showToast({ title: '更新成功', icon: 'success' });
    }).catch(err => {
      console.error('update metric failed:', err);
      wx.showToast({ title: '更新失败', icon: 'none' });
    });
  },

  createMetric(data) {
    userActions.addMetric(data).then(metrics => {
      this.setData({ latestMetrics: metrics });
      wx.showToast({ title: '记录成功', icon: 'success' });
    }).catch(err => {
      console.error('add metric failed:', err);
      wx.showToast({ title: '记录失败', icon: 'none' });
    });
  },

  viewMetricsHistory() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  }
});