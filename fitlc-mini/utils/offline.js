const storage = require('./storage');
const api = require('../api/client');

/**
 * 检查网络状态
 */
const isNetworkAvailable = () => {
  return new Promise((resolve) => {
    wx.getNetworkType({
      success: (res) => {
        resolve(res.networkType !== 'none');
      },
      fail: () => resolve(false)
    });
  });
};

/**
 * 同步离线队列
 */
const syncQueue = async () => {
  const isAvailable = await isNetworkAvailable();
  if (!isAvailable) return;

  const queue = storage.getOfflineQueue();
  if (queue.length === 0) return;

  console.log(`Syncing ${queue.length} offline items...`);

  for (const item of queue) {
    try {
      await processQueueItem(item);
    } catch (err) {
      console.error('Failed to sync item:', item, err);
    }
  }

  storage.clearOfflineQueue();
  storage.set('lastSyncTime', Date.now());
};

/**
 * 处理队列中的单个项
 */
const processQueueItem = (item) => {
  switch (item.type) {
    case 'chat_message':
      return api.post('/chat/message', {
        message: item.data.message,
        imageUrls: item.data.imageUrls || [],
        isOffline: true,
        timestamp: item.timestamp
      });

    case 'workout':
      return Promise.resolve();

    case 'measurement':
      return Promise.resolve();

    default:
      console.warn('Unknown offline item type:', item.type);
      return Promise.resolve();
  }
};

/**
 * 记录离线操作
 */
const recordOffline = (type, data) => {
  storage.addToOfflineQueue(type, data);
};

/**
 * 监听网络状态变化
 */
const watchNetworkChange = (callback) => {
  wx.onNetworkStatusChange((res) => {
    if (res.isConnected) {
      syncQueue();
    }
    callback(res);
  });
};

module.exports = {
  isNetworkAvailable,
  syncQueue,
  recordOffline,
  watchNetworkChange
};