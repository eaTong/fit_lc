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
    inputMode: 'text',  // 'text' | 'voice'
    scrollTop: 0,
    user: null,
    pendingImages: []  // 待发送的图片列表
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
        isLoading: state.isLoading,
        user: state.user
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
    console.log('Loading messages...');
    chatActions.loadMessages(50)
      .then(messages => {
        console.log('Messages loaded:', messages.length, messages);
      })
      .catch(err => {
        console.error('load messages failed:', err);
      });
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  onSwitchMode() {
    const newMode = this.data.inputMode === 'text' ? 'voice' : 'text';
    // 如果正在录音，停止
    if (this.data.isRecording && newMode === 'text') {
      this.stopRecording();
    }
    this.setData({ inputMode: newMode });
  },

  onVoiceTouchStart() {
    if (this.data.inputMode !== 'voice') return;
    this.startRecording();
  },

  onVoiceTouchEnd() {
    if (this.data.inputMode !== 'voice' || !this.data.isRecording) return;
    this.stopRecording();
    // 发送语音消息
    this.sendVoiceMessage();
  },

  sendVoiceMessage() {
    if (!this.tempRecorderPath) {
      wx.showToast({ title: '录音文件不存在', icon: 'none' });
      return;
    }

    this.setData({ isLoading: true });
    wx.showToast({ title: '语音上传中...', icon: 'loading' });

    const { upload } = require('../../api/client');
    upload('/upload/audio', this.tempRecorderPath, 'file').then(uploadRes => {
      const audioUrl = uploadRes.url;
      chatActions.sendMessage(`[语音]${audioUrl}`).then(message => {
        this.setData({ isLoading: false, tempRecorderPath: null });
        this.scrollToBottom();
      }).catch(err => {
        this.setData({ isLoading: false });
        wx.showToast({ title: '发送失败', icon: 'none' });
      });
    }).catch(err => {
      console.error('upload voice failed:', err);
      this.setData({ isLoading: false });
      wx.showToast({ title: '语音上传失败', icon: 'none' });
    });
  },

  startRecording() {
    this.tempRecorderPath = null;
    wx.startRecord({
      success: (res) => {
        this.tempRecorderPath = res.tempFilePath;
        this.setData({ isRecording: true });
      },
      fail: (err) => {
        console.error('start record failed:', err);
        wx.showToast({ title: '录音失败', icon: 'none' });
      }
    });

    this.recordingTimer = setTimeout(() => {
      this.stopRecording();
    }, 60000);
  },

  stopRecording() {
    wx.stopRecord({
      success: (res) => {
        if (!this.tempRecorderPath) {
          this.tempRecorderPath = res.tempFilePath;
        }
      },
      fail: (err) => {
        console.error('stop record failed:', err);
      }
    });
    this.setData({ isRecording: false });
    if (this.recordingTimer) {
      clearTimeout(this.recordingTimer);
      this.recordingTimer = null;
    }
  },

  onImageTap() {
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 将选择的图片临时保存到 pendingImages
        const newImages = res.tempFilePaths.map(path => ({ path, uploaded: false, url: '' }));
        this.setData({
          pendingImages: [...this.data.pendingImages, ...newImages]
        });
      }
    });
  },

  // 移除待发送的图片
  onRemovePendingImage(e) {
    const index = e.currentTarget.dataset.index;
    const pendingImages = [...this.data.pendingImages];
    pendingImages.splice(index, 1);
    this.setData({ pendingImages });
  },

  // 发送消息（包含文字和所有待发送图片）
  onSend() {
    const message = this.data.inputValue.trim();
    const { pendingImages } = this.data;

    if (!message && pendingImages.length === 0) return;
    if (this.data.isLoading) return;

    this.setData({ isLoading: true });

    // 如果有待发送的图片，先上传
    if (pendingImages.length > 0) {
      this.uploadPendingImages().then(uploadedUrls => {
        return chatActions.sendMessage(message, uploadedUrls);
      }).then(() => {
        this.setData({ inputValue: '', pendingImages: [], isLoading: false });
        this.scrollToBottom();
      }).catch(err => {
        console.error('send message failed:', err);
        this.setData({ isLoading: false });
        wx.showToast({ title: '发送失败', icon: 'none' });
      });
    } else {
      // 没有图片，直接发送文字
      chatActions.sendMessage(message).then(() => {
        this.setData({ inputValue: '', isLoading: false });
        this.scrollToBottom();
      }).catch(err => {
        console.error('send message failed:', err);
        this.setData({ isLoading: false });
        wx.showToast({ title: '发送失败', icon: 'none' });
      });
    }
  },

  // 上传所有待发送的图片
  uploadPendingImages() {
    const { pendingImages } = this.data;
    const { upload } = require('../../api/client');

    const uploadPromises = pendingImages.map(img => {
      return upload('/upload/image', img.path, 'file').then(res => res.url);
    });

    return Promise.all(uploadPromises);
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