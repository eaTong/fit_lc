const { get } = require('./client');

module.exports = {
  getExercises(filters = {}) {
    return get('/exercises', filters);
  },

  getExercise(id) {
    return get(`/exercises/${id}`);
  }
};