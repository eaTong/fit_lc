// Gallery Page - 相册页
const { albumActions, authActions } = require('../../store/actions');
const Store = require('../../store');

Component({
  data: {
    photos: [],
    groupedPhotos: {},
    months: [],
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    loading: false,
    isEmpty: false
  },

  lifetimes: {
    attached() {
      this.initStore();
      this.initMonths();
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

      this.unsubscribe = this.store.subscribe(state => {
        this.setData({
          photos: state.photos || [],
          groupedPhotos: state.groupedPhotos || {}
        });
        this.updateEmptyState();
      });
    },

    initMonths() {
      const now = new Date();
      const months = [];
      for (let i = 0; i < 12; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push({
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          label: `${d.getFullYear()}年${d.getMonth() + 1}月`
        });
      }
      this.setData({ months });
    },

    loadData() {
      this.setData({ loading: true });
      this.fetchPhotos();
    },

    fetchPhotos() {
      if (!authActions.checkAuth()) {
        wx.redirectTo({ url: '/pages/login/index' });
        return;
      }

      const { currentYear, currentMonth } = this.data;
      albumActions.fetchPhotos(currentYear, currentMonth).then(photos => {
        const groupedPhotos = this.groupPhotosByDate(photos);
        this.setData({
          photos: photos || [],
          groupedPhotos,
          loading: false
        });
        this.updateEmptyState();
      }).catch(err => {
        this.setData({ loading: false });
        console.error('fetch photos failed:', err);
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
    },

    groupPhotosByDate(photos) {
      const grouped = {};
      (photos || []).forEach(photo => {
        const date = photo.created_at || photo.createdAt;
        if (date) {
          const d = new Date(date);
          const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          if (!grouped[dateKey]) {
            grouped[dateKey] = [];
          }
          grouped[dateKey].push(photo);
        }
      });
      return grouped;
    },

    updateEmptyState() {
      const { photos } = this.data;
      this.setData({ isEmpty: !photos || photos.length === 0 });
    },

    onMonthChange(e) {
      const index = e.detail.value;
      const month = this.data.months[index];
      this.setData({
        currentYear: month.year,
        currentMonth: month.month
      });
      this.loadData();
    },

    onPreMonth() {
      let { currentYear, currentMonth } = this.data;
      currentMonth--;
      if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
      }
      this.setData({ currentYear, currentMonth });
      this.loadData();
    },

    onNextMonth() {
      const now = new Date();
      const maxYear = now.getFullYear();
      const maxMonth = now.getMonth() + 1;

      let { currentYear, currentMonth } = this.data;
      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }

      if (currentYear > maxYear || (currentYear === maxYear && currentMonth > maxMonth)) {
        wx.showToast({ title: '没有更多照片', icon: 'none' });
        return;
      }

      this.setData({ currentYear, currentMonth });
      this.loadData();
    },

    onPhotoTap(e) {
      const photo = e.currentTarget.dataset.photo;
      const urls = this.data.photos.map(p => p.url);
      const current = photo.url;
      wx.previewImage({
        current,
        urls
      });
    },

    onRefresh() {
      this.fetchPhotos();
    },

    getCurrentMonthLabel() {
      return `${this.data.currentYear}年${this.data.currentMonth}月`;
    }
  },

  detached() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
});