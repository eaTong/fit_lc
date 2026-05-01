// Album API - 相册相关 API
const { request, get, del, upload } = require('./client');

// Album Actions
const albumActions = {
  // 获取指定月份的照片
  fetchPhotos(year, month) {
    return get('/album/photos', { year, month }).then(res => res.photos || []);
  },

  // 获取所有照片（按月分组）
  fetchAllPhotos() {
    return get('/album/photos').then(res => res.data || {});
  },

  // 删除照片
  deletePhoto(id) {
    return del(`/album/photos/${id}`);
  },

  // 上传图片
  uploadImage(filePath) {
    return upload('/album/upload', filePath, 'image').then(res => res.photo);
  }
};

module.exports = albumActions;