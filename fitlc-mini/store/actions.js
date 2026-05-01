// Actions for Mini Program
const Store = require('./index');
const config = require('../config');
const { get, post } = require('../api/client');
const albumActions = require('../api/album');
const chatActions = require('../api/chat');

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
    return post('/auth/login', { code }).then(res => {
      if (res.token) {
        wx.setStorageSync(config.STORAGE_KEY.TOKEN, res.token);
        wx.setStorageSync(config.STORAGE_KEY.USER, res.user);
        store.setState({ token: res.token, user: res.user });
        return res;
      } else {
        throw new Error(res.message || 'Login failed');
      }
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
    return get('/records/workouts', { start, end }).then(workouts => {
      store.setState({ workouts });
      return workouts;
    });
  },

  fetchMeasurements(start, end) {
    return get('/records/measurements', { start, end }).then(measurements => {
      store.setState({ measurements });
      return measurements;
    });
  },

  fetchLatestMeasurement() {
    return get('/records/measurements/latest').then(res => {
      if (res.measurement) {
        store.setState({ latestMeasurement: res.measurement });
      }
      return res.measurement || null;
    });
  },

  deleteWorkout(id) {
    return post(`/records/workout/${id}/delete`).then(res => {
      if (res.success) {
        const workouts = store.getState().workouts.filter(w => w.id !== id);
        store.setState({ workouts });
      }
      return res.success;
    });
  },

  deleteMeasurement(id) {
    return post(`/records/measurement/${id}/delete`).then(res => {
      if (res.success) {
        const measurements = store.getState().measurements.filter(m => m.id !== id);
        store.setState({ measurements });
      }
      return res.success;
    });
  },

  syncAfterSave(savedData) {
    // 刷新相关数据
    if (savedData?.type === 'workout') {
      this.fetchWorkouts();
    } else if (savedData?.type === 'measurement') {
      this.fetchMeasurements();
      this.fetchLatestMeasurement();
    }
  }
};

// Plan Actions
const planActions = {
  fetchPlans() {
    return get('/plans').then(plans => {
      store.setState({ plans });
      return plans;
    });
  },

  generatePlan(params) {
    return post('/plans/generate', params).then(plan => plan);
  },

  activatePlan(id) {
    return post(`/plans/${id}/activate`).then(res => res.success);
  }
};

// Exercise Actions
const exerciseActions = {
  fetchExercises() {
    return get('/exercises').then(res => res.exercises || []);
  },

  fetchExercise(id) {
    return get(`/exercises/${id}`).then(res => res.exercise);
  },

  fetchHierarchy() {
    return get('/muscles/hierarchy').then(res => res.hierarchy || []);
  }
};

// Achievement Actions
const achievementActions = {
  fetchBadges() {
    return get('/achievement/badges').then(res => res.badges || []);
  },

  fetchStats() {
    return get('/achievement/stats').then(res => res.stats || null);
  }
};

// Re-export chat actions with store integration
const chatActionsExtended = {
  ...chatActions,

  loadMessages(limit = 50) {
    store.setState({ isLoading: true });
    return chatActions.fetchMessages(limit)
      .then(messages => {
        store.setState({ chatMessages: messages, isLoading: false });
        return messages;
      })
      .catch(err => {
        store.setState({ isLoading: false });
        throw err;
      });
  },

  sendMessage(content) {
    store.setState({ isLoading: true });
    return chatActions.sendMessage(content)
      .then(message => {
        const messages = [...store.getState().chatMessages, message];
        store.setState({ chatMessages: messages, isLoading: false });
        return message;
      })
      .catch(err => {
        store.setState({ isLoading: false });
        throw err;
      });
  },

  revokeMessage(messageId) {
    return chatActions.revokeMessage(messageId);
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
  chatActions: chatActionsExtended,
  albumActions,
  checkAuth
};