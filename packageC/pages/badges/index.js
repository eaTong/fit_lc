const { achievementActions } = require('../../../store/actions');
const { authActions } = require('../../../store/actions');
const Store = require('../../../store');

Component({
  data: {
    badges: [],
    loading: false,
    isEmpty: false
  },

  lifetimes: {
    attached() {
      this.initStore();
      this.loadData();
    }
  },

  pageLifetimes: {
    show() {
      this.initStore();
      this.loadData();
    }
  },

  methods: {
    initStore() {
      const app = getApp();
      this.store = app.store || new Store();
      this.setData({
        badges: this.store.getState().badges || []
      });

      this.unsubscribe = this.store.subscribe(state => {
        this.setData({
          badges: state.badges || []
        });
      });
    },

    loadData() {
      this.setData({ loading: true });
      this.fetchBadges();
    },

    fetchBadges() {
      if (!authActions.checkAuth()) {
        wx.redirectTo({ url: '/pages/login/index' });
        return;
      }

      achievementActions.fetchBadges().then(badges => {
        this.setData({
          badges,
          loading: false,
          isEmpty: badges.length === 0
        });
      }).catch(err => {
        this.setData({ loading: false });
        console.error('fetch badges failed:', err);
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
    },

    onRefresh() {
      this.fetchBadges();
    },

    formatDate(dateStr) {
      if (!dateStr) return '-';
      const date = new Date(dateStr);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}月${day}日`;
    }
  },

  detached() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
});