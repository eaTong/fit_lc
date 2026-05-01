// app.js
const Store = require('./store/index');
const config = require('./config/index');

App({
  store: null,
  config,

  onLaunch() {
    // 初始化 Store
    this.store = new Store();

    // 检查网络状态
    this.checkNetwork();

    // 启动时尝试同步离线数据
    this.syncOfflineData();
  },

  onShow() {
    // 每次进入小程序检查网络并同步
    this.syncOfflineData();
  },

  checkNetwork() {
    wx.getNetworkType({
      success: (res) => {
        this.globalData.networkType = res.networkType;
        this.store.setState({ isOffline: res.networkType === 'none' });
      }
    });
  },

  syncOfflineData() {
    const offlineQueue = wx.getStorageSync(this.config.STORAGE_KEY.OFFLINE_QUEUE) || [];
    if (offlineQueue.length === 0) return;

    if (this.globalData.networkType === 'none') return;

    // 延迟执行，等待网络稳定
    setTimeout(() => {
      const offline = require('./utils/offline');
      offline.syncQueue();
    }, this.config.SYNC_INTERVAL);
  },

  globalData: {
    networkType: 'wifi',
    isOffline: false
  }
});