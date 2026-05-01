// API Client - 封装 wx.request
const config = require('../config');

// 通用请求封装
function request(options) {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync(config.STORAGE_KEY.TOKEN);

    wx.request({
      url: `${config.API_BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options.header
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject(new Error(res.data?.message || 'Request failed'));
        }
      },
      fail: (err) => {
        reject(new Error(err.errMsg || 'Network error'));
      }
    });
  });
}

// GET 请求
function get(url, data) {
  // 添加时间戳防止缓存
  const cacheBust = `_t=${Date.now()}`;
  const separator = url.includes('?') ? '&' : '?';
  url = `${url}${separator}${cacheBust}`;
  return request({ url, method: 'GET', data });
}

// POST 请求
function post(url, data) {
  return request({ url, method: 'POST', data });
}

// PUT 请求
function put(url, data) {
  return request({ url, method: 'PUT', data });
}

// DELETE 请求
function del(url, data) {
  return request({ url, method: 'DELETE', data });
}

// 上传文件
function upload(url, filePath, name = 'file') {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync(config.STORAGE_KEY.TOKEN);

    wx.uploadFile({
      url: `${config.API_BASE_URL}${url}`,
      filePath: filePath,
      name: name,
      header: {
        'Authorization': token ? `Bearer ${token}` : ''
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(res.data));
          } catch (e) {
            resolve(res.data);
          }
        } else {
          reject(new Error('Upload failed'));
        }
      },
      fail: (err) => {
        reject(new Error(err.errMsg || 'Upload error'));
      }
    });
  });
}

module.exports = {
  request,
  get,
  post,
  put,
  del,
  upload
};