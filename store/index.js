// Simple Store implementation for Mini Program
class Store {
  constructor() {
    this.state = {
      user: null,
      token: null,
      workouts: [],
      measurements: [],
      latestMeasurement: null,
      plans: [],
      chatMessages: [],
      isLoading: false
    };
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => listener(this.state));
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

module.exports = Store;