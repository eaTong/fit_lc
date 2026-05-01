const { get, del, upload } = require('./client');

module.exports = {
  getPhotos(year, month) {
    return get('/album/photos', { year, month });
  },

  deletePhoto(id) {
    return del(`/album/photos/${id}`);
  },

  uploadImage(filePath) {
    return upload('/upload/image', filePath, 'file');
  }
};