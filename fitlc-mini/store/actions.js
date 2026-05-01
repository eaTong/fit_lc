// Actions for Mini Program
const Store = require('./index');
const config = require('../config');
const { get, post } = require('../api/client');
const albumActions = require('../api/album');
const chatActions = require('../api/chat');

// 获取全局 store 实例
function getStore() {
  if (getApp && getApp().store) {
    return getApp().store;
  }
  if (!global.store) {
    global.store = new Store();
  }
  return global.store;
}

// Helper to get auth token
function getToken() {
  return wx.getStorageSync(config.STORAGE_KEY.TOKEN);
}

// Auth Actions
const authActions = {
  checkAuth() {
    const token = getToken();
    if (!token) return false;
    getStore().setState({ token });
    return true;
  },

  login(code) {
    return post('/auth/wechat', { code }).then(res => {
      if (res.token) {
        wx.setStorageSync(config.STORAGE_KEY.TOKEN, res.token);
        wx.setStorageSync(config.STORAGE_KEY.USER, res.user);
        getStore().setState({ token: res.token, user: res.user });
        return res;
      } else {
        throw new Error(res.message || 'Login failed');
      }
    });
  },

  logout() {
    wx.removeStorageSync(config.STORAGE_KEY.TOKEN);
    wx.removeStorageSync(config.STORAGE_KEY.USER);
    getStore().setState({ token: null, user: null });
  }
};

// Record Actions
const recordActions = {
  fetchWorkouts(start, end) {
    return get('/records/workouts', { start, end }).then(workouts => {
      getStore().setState({ workouts });
      return workouts;
    });
  },

  fetchMeasurements(start, end) {
    return get('/records/measurements', { start, end }).then(measurements => {
      getStore().setState({ measurements });
      return measurements;
    });
  },

  fetchLatestMeasurement() {
    return get('/users/me/measurements/latest').then(res => {
      if (res.measurement) {
        getStore().setState({ latestMeasurement: res.measurement });
      }
      return res.measurement || null;
    });
  },

  deleteWorkout(id) {
    return post(`/records/workout/${id}/delete`).then(res => {
      if (res.success) {
        const workouts = getStore().getState().workouts.filter(w => w.id !== id);
        getStore().setState({ workouts });
      }
      return res.success;
    });
  },

  deleteMeasurement(id) {
    return post(`/records/measurement/${id}/delete`).then(res => {
      if (res.success) {
        const measurements = getStore().getState().measurements.filter(m => m.id !== id);
        getStore().setState({ measurements });
      }
      return res.success;
    });
  },

  syncAfterSave(savedData) {
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
      getStore().setState({ plans });
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
    console.log('[ExerciseActions] fetchExercises called');
    return get('/exercises').then(res => {
      console.log('[ExerciseActions] fetchExercises result:', res?.exercises?.length);
      return res.exercises || [];
    });
  },

  fetchExercise(id) {
    return get(`/exercises/${id}`).then(res => res.exercise);
  },

  fetchHierarchy() {
    console.log('[ExerciseActions] fetchHierarchy called');
    return get('/muscles/hierarchy').then(res => {
      console.log('[ExerciseActions] fetchHierarchy result:', res?.hierarchy?.length);
      return res.hierarchy || [];
    });
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
    console.log('[ChatActions] loadMessages called, limit:', limit);
    getStore().setState({ isLoading: true });
    return chatActions.fetchMessages(limit)
      .then(messages => {
        console.log('[ChatActions] messages fetched:', messages.length, JSON.stringify(messages));
        getStore().setState({ chatMessages: messages, isLoading: false });
        return messages;
      })
      .catch(err => {
        console.error('[ChatActions] loadMessages error:', err);
        getStore().setState({ isLoading: false });
        throw err;
      });
  },

  sendMessage(content) {
    getStore().setState({ isLoading: true });
    return chatActions.sendMessage(content)
      .then(message => {
        const messages = [...getStore().getState().chatMessages, message];
        getStore().setState({ chatMessages: messages, isLoading: false });
        return message;
      })
      .catch(err => {
        getStore().setState({ isLoading: false });
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
  store: global.store,
  authActions,
  recordActions,
  planActions,
  exerciseActions,
  achievementActions,
  chatActions: chatActionsExtended,
  albumActions,
  checkAuth
};