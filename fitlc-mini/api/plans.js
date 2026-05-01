const { get, post, put, del } = require('./client');

module.exports = {
  getPlans() {
    return get('/plans');
  },

  getPlan(id) {
    return get(`/plans/${id}`);
  },

  generatePlan(userProfile, exercises) {
    return post('/plans/generate', { userProfile, exercises });
  },

  updatePlan(id, data) {
    return put(`/plans/${id}`, data);
  },

  deletePlan(id) {
    return del(`/plans/${id}`);
  },

  activatePlan(id) {
    return post(`/plans/${id}/activate`);
  },

  recordExecution(id, execution) {
    return post(`/plans/${id}/execute`, execution);
  },

  getAnalysis(id) {
    return get(`/plans/${id}/analysis`);
  }
};