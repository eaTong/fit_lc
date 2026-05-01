const { get, del } = require('./client');

module.exports = {
  getWorkouts(start, end) {
    return get('/records/workouts', { start, end });
  },

  getMeasurements(start, end) {
    return get('/records/measurements', { start, end });
  },

  deleteWorkout(id) {
    return del(`/records/workout/${id}`);
  },

  deleteMeasurement(id) {
    return del(`/records/measurement/${id}`);
  },

  getStats() {
    return get('/records/stats');
  }
};