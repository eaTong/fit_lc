const config = require('../config');

const request = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.API_BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${wx.getStorageSync(config.STORAGE_KEY.TOKEN) || ''}`,
        ...options.header
      },
      success: (res) => {
        if (res.statusCode === 401) {
          wx.removeStorageSync(config.STORAGE_KEY.TOKEN);
          wx.removeStorageSync(config.STORAGE_KEY.USER);
          wx.switchTab({ url: '/pages/chat/index' });
          wx.showToast({ title: '登录已过期', icon: 'none' });
          reject(new Error('Unauthorized'));
          return;
        }

        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          wx.showToast({ title: res.data.message || '请求失败', icon: 'none' });
          reject(res.data);
        }
      },
      fail: (err) => {
        wx.showToast({ title: '网络错误', icon: 'none' });
        reject(err);
      }
    });
  });
};

const get = (url, data) => request({ url, method: 'GET', data });
const post = (url, data) => request({ url, method: 'POST', data });
const put = (url, data) => request({ url, method: 'PUT', data });
const del = (url, data) => request({ url, method: 'DELETE', data });

const upload = (url, filePath, name = 'file') => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${config.API_BASE_URL}${url}`,
      filePath,
      name,
      header: {
        'Authorization': `Bearer ${wx.getStorageSync(config.STORAGE_KEY.TOKEN) || ''}`
      },
      success: (res) => {
        const data = JSON.parse(res.data);
        resolve(data);
      },
      fail: reject
    });
  });
};

module.exports = { request, get, post, put, del, upload };