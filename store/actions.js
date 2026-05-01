// Actions for Mini Program
const Store = require('./index');
const config = require('../config');

const store = new Store();

// Helper to get auth token
function getToken() {
  return wx.getStorageSync(config.STORAGE_KEY.TOKEN);
}

// Auth Actions
const authActions = {
  checkAuth() {
    const token = getToken();
    if (!token) return false;
    store.setState({ token });
    return true;
  },

  login(code) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${config.API_BASE_URL}/auth/login`,
        method: 'POST',
        data: { code },
        success: (res) => {
          if (res.data.token) {
            wx.setStorageSync(config.STORAGE_KEY.TOKEN, res.data.token);
            wx.setStorageSync(config.STORAGE_KEY.USER, res.data.user);
            store.setState({ token: res.data.token, user: res.data.user });
            resolve(res.data);
          } else {
            reject(new Error(res.data.message || 'Login failed'));
          }
        },
        fail: () => reject(new Error('Network error'))
      });
    });
  },

  logout() {
    wx.removeStorageSync(config.STORAGE_KEY.TOKEN);
    wx.removeStorageSync(config.STORAGE_KEY.USER);
    store.setState({ token: null, user: null });
  }
};

// Record Actions
const recordActions = {
  fetchWorkouts(start, end) {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (!token) {
        reject(new Error('Not authenticated'));
        return;
      }

      wx.request({
        url: `${config.API_BASE_URL}/records/workouts`,
        method: 'GET',
        header: { Authorization: `Bearer ${token}` },
        data: { start, end },
        success: (res) => {
          if (res.data.workouts) {
            store.setState({ workouts: res.data.workouts });
            resolve(res.data.workouts);
          } else {
            reject(new Error(res.data.message || 'Failed to fetch workouts'));
          }
        },
        fail: () => reject(new Error('Network error'))
      });
    });
  },

  fetchMeasurements(start, end) {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (!token) {
        reject(new Error('Not authenticated'));
        return;
      }

      wx.request({
        url: `${config.API_BASE_URL}/records/measurements`,
        method: 'GET',
        header: { Authorization: `Bearer ${token}` },
        data: { start, end },
        success: (res) => {
          if (res.data.measurements) {
            store.setState({ measurements: res.data.measurements });
            resolve(res.data.measurements);
          } else {
            reject(new Error(res.data.message || 'Failed to fetch measurements'));
          }
        },
        fail: () => reject(new Error('Network error'))
      });
    });
  },

  fetchLatestMeasurement() {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (!token) {
        reject(new Error('Not authenticated'));
        return;
      }

      wx.request({
        url: `${config.API_BASE_URL}/records/measurements/latest`,
        method: 'GET',
        header: { Authorization: `Bearer ${token}` },
        success: (res) => {
          if (res.data.measurement) {
            store.setState({ latestMeasurement: res.data.measurement });
            resolve(res.data.measurement);
          } else {
            resolve(null);
          }
        },
        fail: () => reject(new Error('Network error'))
      });
    });
  },

  deleteWorkout(id) {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (!token) {
        reject(new Error('Not authenticated'));
        return;
      }

      wx.request({
        url: `${config.API_BASE_URL}/records/workout/${id}`,
        method: 'DELETE',
        header: { Authorization: `Bearer ${token}` },
        success: (res) => {
          if (res.data.success) {
            const workouts = store.getState().workouts.filter(w => w.id !== id);
            store.setState({ workouts });
            resolve(true);
          } else {
            reject(new Error(res.data.message || 'Failed to delete'));
          }
        },
        fail: () => reject(new Error('Network error'))
      });
    });
  },

  deleteMeasurement(id) {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (!token) {
        reject(new Error('Not authenticated'));
        return;
      }

      wx.request({
        url: `${config.API_BASE_URL}/records/measurement/${id}`,
        method: 'DELETE',
        header: { Authorization: `Bearer ${token}` },
        success: (res) => {
          if (res.data.success) {
            const measurements = store.getState().measurements.filter(m => m.id !== id);
            store.setState({ measurements });
            resolve(true);
          } else {
            reject(new Error(res.data.message || 'Failed to delete'));
          }
        },
        fail: () => reject(new Error('Network error'))
      });
    });
  }
};

// Plan Actions
const planActions = {
  fetchPlans() {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (!token) {
        reject(new Error('Not authenticated'));
        return;
      }

      wx.request({
        url: `${config.API_BASE_URL}/plans`,
        method: 'GET',
        header: { Authorization: `Bearer ${token}` },
        success: (res) => {
          if (res.data.plans) {
            store.setState({ plans: res.data.plans });
            resolve(res.data.plans);
          } else {
            reject(new Error(res.data.message || 'Failed to fetch plans'));
          }
        },
        fail: () => reject(new Error('Network error'))
      });
    });
  }
};

// Exercise Actions
const exerciseActions = {
  fetchExercises() {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (!token) {
        reject(new Error('Not authenticated'));
        return;
      }

      wx.request({
        url: `${config.API_BASE_URL}/exercises`,
        method: 'GET',
        header: { Authorization: `Bearer ${token}` },
        success: (res) => {
          if (res.data.exercises) {
            resolve(res.data.exercises);
          } else {
            reject(new Error(res.data.message || 'Failed to fetch exercises'));
          }
        },
        fail: () => reject(new Error('Network error'))
      });
    });
  },

  fetchExercise(id) {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (!token) {
        reject(new Error('Not authenticated'));
        return;
      }

      wx.request({
        url: `${config.API_BASE_URL}/exercises/${id}`,
        method: 'GET',
        header: { Authorization: `Bearer ${token}` },
        success: (res) => {
          if (res.data.exercise) {
            resolve(res.data.exercise);
          } else {
            reject(new Error(res.data.message || 'Failed to fetch exercise'));
          }
        },
        fail: () => reject(new Error('Network error'))
      });
    });
  },

  fetchHierarchy() {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (!token) {
        reject(new Error('Not authenticated'));
        return;
      }

      wx.request({
        url: `${config.API_BASE_URL}/muscles/hierarchy`,
        method: 'GET',
        header: { Authorization: `Bearer ${token}` },
        success: (res) => {
          if (res.data.hierarchy) {
            resolve(res.data.hierarchy);
          } else {
            resolve([]);
          }
        },
        fail: () => reject(new Error('Network error'))
      });
    });
  }
};

// Achievement Actions
const achievementActions = {
  fetchBadges() {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (!token) {
        reject(new Error('Not authenticated'));
        return;
      }

      wx.request({
        url: `${config.API_BASE_URL}/achievement/badges`,
        method: 'GET',
        header: { Authorization: `Bearer ${token}` },
        success: (res) => {
          if (res.data.badges) {
            resolve(res.data.badges);
          } else {
            reject(new Error(res.data.message || 'Failed to fetch badges'));
          }
        },
        fail: () => reject(new Error('Network error'))
      });
    });
  },

  fetchStats() {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (!token) {
        reject(new Error('Not authenticated'));
        return;
      }

      wx.request({
        url: `${config.API_BASE_URL}/achievement/stats`,
        method: 'GET',
        header: { Authorization: `Bearer ${token}` },
        success: (res) => {
          if (res.data.stats) {
            resolve(res.data.stats);
          } else {
            resolve(null);
          }
        },
        fail: () => reject(new Error('Network error'))
      });
    });
  }
};

function checkAuth() {
  return authActions.checkAuth();
}

module.exports = {
  store,
  authActions,
  recordActions,
  planActions,
  exerciseActions,
  achievementActions,
  checkAuth
};