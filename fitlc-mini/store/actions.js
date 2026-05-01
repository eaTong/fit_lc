const config = require('../config');
const api = require('../api/client');

// 认证 action
const authActions = {
  login(code) {
    return api.post('/auth/wechat', { code }).then(res => {
      const app = getApp();
      wx.setStorageSync(config.STORAGE_KEY.TOKEN, res.token);
      wx.setStorageSync(config.STORAGE_KEY.USER, res.user);
      app.store.setState({
        token: res.token,
        user: res.user,
        isAuthenticated: true
      });
      return res;
    });
  },

  logout() {
    const app = getApp();
    wx.removeStorageSync(config.STORAGE_KEY.TOKEN);
    wx.removeStorageSync(config.STORAGE_KEY.USER);
    app.store.clear();
  },

  checkAuth() {
    const token = wx.getStorageSync(config.STORAGE_KEY.TOKEN);
    const user = wx.getStorageSync(config.STORAGE_KEY.USER);
    if (token && user) {
      const app = getApp();
      app.store.setState({ token, user, isAuthenticated: true });
      return true;
    }
    return false;
  }
};

// 聊天 action
const chatActions = {
  sendMessage(message, imageUrls = []) {
    const app = getApp();
    app.store.setState({ isLoading: true });

    return api.post('/chat/message', {
      message,
      imageUrls,
      historyMessages: app.store.getState().chatMessages.slice(-20)
    }).then(res => {
      const messages = [...app.store.getState().chatMessages, res.message];
      app.store.setState({ chatMessages: messages, isLoading: false });

      const cacheLimit = config.CHAT_CACHE_LIMIT;
      if (messages.length > cacheLimit) {
        const cached = messages.slice(-cacheLimit);
        wx.setStorageSync(config.STORAGE_KEY.CHAT_MESSAGES, cached);
      }

      if (res.savedData) {
        recordActions.syncAfterSave(res.savedData);
      }

      return res;
    }).catch(err => {
      app.store.setState({ isLoading: false });
      throw err;
    });
  },

  loadMessages(limit = 50) {
    const app = getApp();
    return api.get('/chat/messages', { limit }).then(messages => {
      app.store.setState({ chatMessages: messages });
      wx.setStorageSync(config.STORAGE_KEY.CHAT_MESSAGES, messages.slice(-config.CHAT_CACHE_LIMIT));
      return messages;
    });
  },

  clearMessages() {
    const app = getApp();
    app.store.setState({ chatMessages: [] });
    wx.removeStorageSync(config.STORAGE_KEY.CHAT_MESSAGES);
  },

  revokeMessage(messageId) {
    const app = getApp();
    const messages = app.store.getState().chatMessages.map(m => {
      if (m.id === messageId) {
        return { ...m, revoked: true };
      }
      return m;
    });
    app.store.setState({ chatMessages: messages });
  }
};

// 记录 action
const recordActions = {
  fetchWorkouts(start, end) {
    const app = getApp();
    return api.get('/records/workouts', { start, end }).then(res => {
      app.store.setState({ workouts: res.workouts });
      return res.workouts;
    });
  },

  fetchMeasurements(start, end) {
    const app = getApp();
    return api.get('/records/measurements', { start, end }).then(res => {
      app.store.setState({ measurements: res.measurements });
      return res.measurements;
    });
  },

  deleteWorkout(id) {
    return api.delete(`/records/workout/${id}`).then(() => {
      const app = getApp();
      const workouts = app.store.getState().workouts.filter(w => w.id !== id);
      app.store.setState({ workouts });
    });
  },

  deleteMeasurement(id) {
    return api.delete(`/records/measurement/${id}`).then(() => {
      const app = getApp();
      const measurements = app.store.getState().measurements.filter(m => m.id !== id);
      app.store.setState({ measurements });
    });
  },

  fetchLatestMeasurement() {
    const app = getApp();
    return api.get('/users/me/measurements/latest').then(res => {
      app.store.setState({ latestMeasurement: res.measurements });
      return res.measurements;
    });
  },

  syncAfterSave(savedData) {
    if (savedData.type === 'workout') {
      this.fetchWorkouts();
    } else if (savedData.type === 'measurement') {
      this.fetchMeasurements();
      this.fetchLatestMeasurement();
    }
  }
};

// 计划 action
const planActions = {
  fetchPlans() {
    const app = getApp();
    return api.get('/plans').then(res => {
      app.store.setState({ plans: res.plans });
      return res.plans;
    });
  },

  fetchPlan(id) {
    const app = getApp();
    return api.get(`/plans/${id}`).then(res => {
      app.store.setState({ currentPlan: res.plan });
      return res.plan;
    });
  },

  generatePlan(userProfile) {
    return api.post('/plans/generate', userProfile).then(res => {
      const app = getApp();
      app.store.setState({ currentPlan: { id: res.plan_id } });
      return res;
    });
  },

  activatePlan(id) {
    return api.post(`/plans/${id}/activate`).then(() => {
      const app = getApp();
      const plans = app.store.getState().plans.map(p => {
        if (p.id === id) return { ...p, status: 'active' };
        return p;
      });
      app.store.setState({ plans });
    });
  },

  recordExecution(planId, execution) {
    return api.post(`/plans/${planId}/execute`, execution);
  }
};

// 动作库 action
const exerciseActions = {
  fetchExercises(filters = {}) {
    const app = getApp();
    return api.get('/exercises', filters).then(res => {
      app.store.setState({ exercises: res.exercises });
      return res.exercises;
    });
  },

  fetchExercise(id) {
    return api.get(`/exercises/${id}`);
  },

  fetchHierarchy() {
    const app = getApp();
    return api.get('/muscles/hierarchy').then(res => {
      app.store.setState({ muscleHierarchy: res.hierarchy });
      return res.hierarchy;
    });
  }
};

// 成就 action
const achievementActions = {
  fetchBadges() {
    const app = getApp();
    return api.get('/achievements/badges').then(res => {
      app.store.setState({ badges: res.badges });
      return res.badges;
    });
  },

  fetchPersonalRecords() {
    const app = getApp();
    return api.get('/achievements/personal-records').then(res => {
      app.store.setState({ personalRecords: res.personalRecords });
      return res.personalRecords;
    });
  }
};

module.exports = {
  authActions,
  chatActions,
  recordActions,
  planActions,
  exerciseActions,
  achievementActions
};