const { get, put, post, del } = require('./client');

module.exports = {
  getProfile() {
    return get('/users/me/profile');
  },

  updateProfile(data) {
    return put('/users/me/profile', data);
  },

  changePassword(oldPassword, newPassword) {
    return put('/users/me/password', { oldPassword, newPassword });
  },

  getMetrics(page = 1, limit = 10) {
    return get('/users/me/metrics', { page, limit });
  },

  addMetric(data) {
    return post('/users/me/metrics', data);
  },

  deleteAccount(password) {
    return del('/users/me/account', { password });
  },

  getLatestMeasurements() {
    return get('/users/me/measurements/latest');
  },

  getMeasurementHistory(bodyPart, page = 1, limit = 10) {
    return get('/users/me/measurements/history', { bodyPart, page, limit });
  },

  getCoachConfig() {
    return get('/users/coach-config');
  },

  updateCoachConfig(data) {
    return put('/users/coach-config', data);
  }
};