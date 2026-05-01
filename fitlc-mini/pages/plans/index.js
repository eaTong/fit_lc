const { planActions } = require('../../store/actions');
const Store = require('../../store');

Component({
  data: {
    plans: [],
    filteredPlans: [],
    activeTab: 'all',
    isLoading: false,
    statusTabs: [
      { id: 'all', label: '全部' },
      { id: 'active', label: '进行中' },
      { id: 'completed', label: '已完成' },
      { id: 'paused', label: '已暂停' },
    ],
  },

  lifetimes: {
    attached() {
      this.initStore();
      this.fetchPlans();
    },
  },

  pageLifetimes: {
    show() {
      this.initStore();
      this.fetchPlans();
    },
  },

  methods: {
    initStore() {
      const app = getApp();
      const store = app.store || new Store();
      this.store = store;

      this.setData({ plans: store.getState().plans || [] });
      this.updateFilteredPlans();

      this.unsubscribe = store.subscribe((state) => {
        this.setData({ plans: state.plans || [] });
        this.updateFilteredPlans();
      });
    },

    fetchPlans() {
      this.setData({ isLoading: true });
      planActions.fetchPlans().then(() => {
        const plans = this.store.getState().plans || [];
        this.setData({ plans, isLoading: false });
        this.updateFilteredPlans();
      }).catch(() => {
        this.setData({ isLoading: false });
      });
    },

    updateFilteredPlans() {
      const { plans, activeTab } = this.data;
      const filtered = activeTab === 'all'
        ? plans
        : plans.filter(p => p.status === activeTab);
      this.setData({ filteredPlans: filtered });
    },

    onTabChange(e) {
      const tab = e.currentTarget.dataset.id;
      this.setData({ activeTab: tab }, () => {
        this.updateFilteredPlans();
      });
    },

    goToPlanDetail(e) {
      const planId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/plan-detail/index?id=${planId}`,
      });
    },

    onCreatePlan() {
      wx.navigateTo({
        url: '/pages/plan-generate/index',
      });
    },

    getStatusLabel(status) {
      const labels = {
        draft: '草稿',
        active: '进行中',
        completed: '已完成',
        paused: '已暂停',
      };
      return labels[status] || status;
    },

    getStatusColor(status) {
      const colors = {
        draft: '#888888',
        active: '#4CAF50',
        completed: '#2196F3',
        paused: '#FF4500',
      };
      return colors[status] || '#888888';
    },

    getGoalLabel(goal) {
      const labels = {
        bulk: '增肌',
        cut: '减脂',
        maintain: '维持',
      };
      return labels[goal] || goal;
    },

    formatDate(dateStr) {
      if (!dateStr) return '-';
      const date = new Date(dateStr);
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    },

    calculateProgress(plan) {
      if (!plan.start_date || !plan.duration_weeks) return 0;
      const start = new Date(plan.start_date);
      const now = new Date();
      const days = Math.floor((now - start) / (1000 * 60 * 60 * 24));
      const totalDays = plan.duration_weeks * 7;
      return Math.min(100, Math.floor((days / totalDays) * 100));
    },
  },

  detached() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
});