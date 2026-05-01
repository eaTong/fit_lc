const { chatActions } = require('../../store/actions');
const { recordActions } = require('../../store/actions');
const { authActions } = require('../../store/actions');
const storage = require('../../utils/storage');
const format = require('../../utils/format');

Page({
  data: {
    messages: [],
    inputValue: '',
    isLoading: false,
    isRecording: false,
    scrollTop: 0,
    user: null
  },

  onLoad() {
    // 检查登录
    if (!authActions.checkAuth()) {
      wx.redirectTo({ url: '/pages/login/index' });
      return;
    }

    const app = getApp();
    const user = app.store.getState().user;
    this.setData({ user });

    // 监听状态变化
    this.unsubscribe = app.store.subscribe(state => {
      this.setData({
        messages: state.chatMessages,
        isLoading: state.isLoading
      });
      this.scrollToBottom();
    });

    // 加载缓存消息
    const cached = storage.getCachedMessages();
    if (cached.length > 0) {
      this.setData({ messages: cached });
    }

    // 加载最新消息
    this.loadMessages();
  },

  onUnload() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },

  loadMessages() {
    chatActions.loadMessages(50).catch(err => {
      console.error('load messages failed:', err);
    });
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  onSend() {
    const message = this.data.inputValue.trim();
    if (!message || this.data.isLoading) return;

    this.setData({ inputValue: '', isLoading: true });

    chatActions.sendMessage(message).then(res => {
      this.setData({ isLoading: false });
      this.scrollToBottom();
    }).catch(err => {
      this.setData({ isLoading: false });
      wx.showToast({ title: '发送失败', icon: 'none' });
    });
  },

  onVoiceTap() {
    if (this.data.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  },

  startRecording() {
    wx.startRecord({
      success: () => {
        this.setData({ isRecording: true });
      },
      fail: (err) => {
        console.error('start record failed:', err);
        wx.showToast({ title: '录音失败', icon: 'none' });
      }
    });

    // 最多录 60 秒
    this.recordingTimer = setTimeout(() => {
      this.stopRecording();
    }, 60000);
  },

  stopRecording() {
    wx.stopRecord();
    this.setData({ isRecording: false });
    if (this.recordingTimer) {
      clearTimeout(this.recordingTimer);
      this.recordingTimer = null;
    }
  },

  onImageTap() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const filePath = res.tempFilePaths[0];
        // TODO: 上传图片到服务器，获取 URL 后发送
        wx.showToast({ title: '图片上传中...', icon: 'loading' });
      }
    });
  },

  onMessageTap(e) {
    const messageId = e.currentTarget.dataset.id;
    const message = this.data.messages.find(m => m.id === messageId);
    if (!message || !message.savedData) return;

    wx.showModal({
      title: '撤销确认',
      content: '确定要撤销这条保存的记录吗？',
      success: (res) => {
        if (res.confirm) {
          chatActions.revokeMessage(messageId);
          // 刷新相关数据
          recordActions.syncAfterSave(message.savedData);
        }
      }
    });
  },

  scrollToBottom() {
    setTimeout(() => {
      this.setData({ scrollTop: 999999 });
    }, 100);
  },

  formatTime(timestamp) {
    return format.formatRelativeTime(timestamp);
  }
});