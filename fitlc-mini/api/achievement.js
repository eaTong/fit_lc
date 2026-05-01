const { get, post } = require('./client');

module.exports = {
  getPersonalRecords() {
    return get('/achievements/personal-records');
  },

  getTopRecords(limit = 10) {
    return get('/achievements/personal-records/top', { limit });
  },

  getBadges() {
    return get('/achievements/badges');
  },

  getMilestones() {
    return get('/achievements/milestones');
  },

  getStats() {
    return get('/achievements/stats');
  },

  checkAchievements(type, data) {
    return post('/achievements/check', { type, data });
  },

  getMuscleVolume(start, end) {
    return get('/achievements/muscle-volume', { start, end });
  }
};