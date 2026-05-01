// Album API - 相册相关 API
const config = require('../config');

function getToken() {
  return wx.getStorageSync(config.STORAGE_KEY.TOKEN);
}

// Album Actions
const albumActions = {
  fetchPhotos(year, month) {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (!token) {
        reject(new Error('Not authenticated'));
        return;
      }

      wx.request({
        url: `${config.API_BASE_URL}/album/photos`,
        method: 'GET',
        header: { Authorization: `Bearer ${token}` },
        data: { year, month },
        success: (res) => {
          if (res.data.photos) {
            resolve(res.data.photos);
          } else {
            resolve([]);
          }
        },
        fail: () => reject(new Error('Network error'))
      });
    });
  },

  uploadImage(filePath) {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (!token) {
        reject(new Error('Not authenticated'));
        return;
      }

      wx.uploadFile({
        url: `${config.API_BASE_URL}/album/upload`,
        filePath,
        name: 'image',
        header: { Authorization: `Bearer ${token}` },
        success: (res) => {
          const data = JSON.parse(res.data);
          if (data.photo) {
            resolve(data.photo);
          } else {
            reject(new Error(data.message || 'Upload failed'));
          }
        },
        fail: () => reject(new Error('Network error'))
      });
    });
  }
};

module.exports = albumActions;