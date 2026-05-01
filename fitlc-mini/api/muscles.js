const { get } = require('./client');

module.exports = {
  getMuscles() {
    return get('/muscles');
  },

  getHierarchy() {
    return get('/muscles/hierarchy');
  },

  getMuscle(id) {
    return get(`/muscles/${id}`);
  }
};