class Store {
  constructor() {
    this.state = {
      // 认证
      token: null,
      user: null,
      isAuthenticated: false,

      // 聊天
      chatMessages: [],
      isLoading: false,

      // 动作库
      exercises: [],
      muscleHierarchy: [],

      // 计划
      plans: [],
      currentPlan: null,

      // 记录
      workouts: [],
      measurements: [],
      latestMeasurement: null,

      // 成就
      badges: [],
      personalRecords: [],

      // UI 状态
      isOffline: false,

      // 缓存
      lastSyncTime: null
    };

    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => {
      listener(this.state);
    });
  }

  clear() {
    this.state = {
      ...this.state,
      token: null,
      user: null,
      isAuthenticated: false,
      chatMessages: [],
      plans: [],
      currentPlan: null,
      workouts: [],
      measurements: []
    };
    this.notify();
  }
}

module.exports = Store;