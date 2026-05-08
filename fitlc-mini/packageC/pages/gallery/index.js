// Gallery Page - 相册页
const { albumActions, authActions } = require('../../../store/actions');

Component({
  data: {
    photos: [],
    groupedPhotos: {},
    months: [],
    loading: false,
    loadingMore: false,
    hasMore: true,
    cursor: null,
    isEmpty: false,
    uploading: false
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
      this.store = app.store;

      this.unsubscribe = this.store.subscribe(state => {
        this.setData({
          photos: state.photos || [],
          groupedPhotos: state.groupedPhotos || {}
        });
        this.updateEmptyState();
      });
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

      albumActions.fetchPhotosPaginated(null, 50).then(res => {
        const groupedPhotos = this.groupPhotosByMonth(res.photos);
        this.setData({
          photos: res.photos || [],
          groupedPhotos,
          cursor: res.nextCursor,
          hasMore: res.hasMore,
          loading: false
        });
        this.updateEmptyState();
      }).catch(err => {
        this.setData({ loading: false });
        console.error('fetch photos failed:', err);
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
    },

    fetchMorePhotos() {
      const { cursor, loadingMore, hasMore } = this.data;
      if (!hasMore || loadingMore) return;

      this.setData({ loadingMore: true });
      albumActions.fetchPhotosPaginated(cursor, 50).then(res => {
        const allPhotos = [...this.data.photos, ...res.photos];
        const groupedPhotos = this.groupPhotosByMonth(allPhotos);
        this.setData({
          photos: allPhotos,
          groupedPhotos,
          cursor: res.nextCursor,
          hasMore: res.hasMore,
          loadingMore: false
        });
      }).catch(err => {
        this.setData({ loadingMore: false });
        console.error('fetch more photos failed:', err);
      });
    },

    groupPhotosByMonth(photos) {
      const grouped = {};
      (photos || []).forEach(photo => {
        const date = photo.created_at || photo.createdAt;
        if (date) {
          const d = new Date(date);
          const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
          if (!grouped[monthKey]) {
            grouped[monthKey] = [];
          }
          grouped[monthKey].push(photo);
        }
      });
      return grouped;
    },

    updateEmptyState() {
      const { photos } = this.data;
      this.setData({ isEmpty: !photos || photos.length === 0 });
    },

    onScrollToLower() {
      this.fetchMorePhotos();
    },

    onPhotoTap(e) {
      const photo = e.currentTarget.dataset.photo;
      const urls = this.data.photos.map(p => p.ossUrl || p.url);
      const current = photo.ossUrl || photo.url;
      wx.previewImage({
        current,
        urls
      });
    },

    onPhotoLongPress(e) {
      const photo = e.currentTarget.dataset.photo;
      wx.showModal({
        title: '删除照片',
        content: '确定要删除该照片吗？',
        success: (res) => {
          if (res.confirm) {
            this.deletePhoto(photo.id);
          }
        }
      });
    },

    deletePhoto(id) {
      albumActions.deletePhoto(id).then(() => {
        const photos = this.data.photos.filter(p => p.id !== id);
        const groupedPhotos = this.groupPhotosByMonth(photos);
        this.setData({ photos, groupedPhotos });
        this.updateEmptyState();
        wx.showToast({ title: '删除成功', icon: 'success' });
      }).catch(err => {
        console.error('delete photo failed:', err);
        wx.showToast({ title: '删除失败', icon: 'none' });
      });
    },

    onUploadTap() {
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const filePath = res.tempFiles[0].tempFilePath;
          this.uploadPhoto(filePath);
        }
      });
    },

    uploadPhoto(filePath) {
      this.setData({ uploading: true });
      albumActions.uploadPhoto(filePath).then(photo => {
        const photos = [photo, ...this.data.photos];
        const groupedPhotos = this.groupPhotosByMonth(photos);
        this.setData({ photos, groupedPhotos, uploading: false });
        this.updateEmptyState();
        wx.showToast({ title: '上传成功', icon: 'success' });
      }).catch(err => {
        this.setData({ uploading: false });
        console.error('upload photo failed:', err);
        wx.showToast({ title: '上传失败', icon: 'none' });
      });
    },

    onRefresh() {
      this.fetchPhotos();
    }
  },

  detached() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
});