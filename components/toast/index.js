module.exports = {
  show(title, icon = 'none', duration = 2000) {
    wx.showToast({ title, icon, duration });
  },
  success(title) {
    wx.showToast({ title, icon: 'success', duration: 2000 });
  },
  fail(title) {
    wx.showToast({ title, icon: 'error', duration: 2000 });
  },
  loading(title = '加载中...') {
    wx.showToast({ title, icon: 'loading', duration: 3000 });
  },
  hide() {
    wx.hideToast();
  }
};