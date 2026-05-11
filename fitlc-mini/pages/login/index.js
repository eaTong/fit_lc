const { authActions } = require('../../store/actions');
const { checkAuth } = require('../../store/actions');

Page({
  data: {
    loading: false,
    error: ''
  },

  onLoad() {
    // 检查是否已登录（异步）
    authActions.checkAuth().then(isAuth => {
      if (isAuth) {
        wx.switchTab({ url: '/pages/chat/index' });
      }
    });
  },

  onLogin() {
    if (this.data.loading) return;

    this.setData({ loading: true, error: '' });

    // 使用静默登录
    wx.login({
      success: (loginRes) => {
        if (!loginRes.code) {
          this.setData({ loading: false, error: '获取登录凭证失败' });
          return;
        }

        // 发送 code 到后端，换 token
        authActions.login(loginRes.code).then(res => {
          this.setData({ loading: false });
          wx.switchTab({ url: '/pages/chat/index' });
        }).catch(err => {
          this.setData({ loading: false, error: err.message || '登录失败' });
        });
      },
      fail: () => {
        this.setData({ loading: false, error: '网络错误' });
      }
    });
  }
});