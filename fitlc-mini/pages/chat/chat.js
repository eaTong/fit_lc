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
    pendingImages: [],  // 待发送的图片列表
    celebrationQueue: [],    // 待展示的成就队列
    currentCelebration: null, // 当前展示的成就
    showCelebration: false,  // 是否显示庆祝弹窗
    showMenu: false,         // 菜单是否显示
    showHistoryManager: false // 历史管理弹窗是否显示
  },

  onLoad() {
    // 检查登录
    authActions.checkAuth().then(isAuth => {
      if (!isAuth) {
        wx.redirectTo({ url: '/pages/login/login' });
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
    });
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

    const sendFn = (uploadedUrls) => {
      return chatActions.sendMessage(message, uploadedUrls);
    };

    // 如果有待发送的图片，先上传
    if (pendingImages.length > 0) {
      this.uploadPendingImages().then(uploadedUrls => {
        return sendFn(uploadedUrls);
      }).then((newMessages) => {
        this.setData({ inputValue: '', pendingImages: [], isLoading: false });
        this.scrollToBottom();
        this.handleAchievements(newMessages);
      }).catch(err => {
        console.error('send message failed:', err);
        this.setData({ isLoading: false });
        wx.showToast({ title: '发送失败', icon: 'none' });
      });
    } else {
      // 没有图片，直接发送文字
      sendFn([]).then((newMessages) => {
        this.setData({ inputValue: '', isLoading: false });
        this.scrollToBottom();
        this.handleAchievements(newMessages);
      }).catch(err => {
        console.error('send message failed:', err);
        this.setData({ isLoading: false });
        wx.showToast({ title: '发送失败', icon: 'none' });
      });
    }
  },

  // 处理成就弹窗
  handleAchievements(newMessages) {
    // 查找包含 toolData 的 assistant 消息
    const assistantMsg = newMessages.find(m => m.role === 'assistant' && m.toolData);
    if (!assistantMsg) return;

    const { toolData } = assistantMsg;
    const result = toolData.result || {};
    const achievements = result.achievements || {};

    const queue = [];

    // 检查首次训练/围度
    if (result.isFirstWorkout) {
      queue.push({ type: 'first_workout', data: {} });
    }
    if (result.isFirstMeasurement) {
      queue.push({ type: 'first_measurement', data: {} });
    }
    // 检查 PR 突破（仅训练）
    if (achievements.isNewPR) {
      queue.push({ type: 'pr_break', data: achievements });
    }
    // 检查徽章
    if (achievements.badges && achievements.badges.length > 0) {
      achievements.badges.forEach(badge => {
        queue.push({ type: 'badge', data: { name: badge } });
      });
    }
    // 检查里程碑
    if (achievements.milestones && achievements.milestones.length > 0) {
      achievements.milestones.forEach(milestone => {
        queue.push({ type: 'milestone', data: { name: milestone } });
      });
    }

    if (queue.length > 0) {
      console.log('Achievements detected, adding to queue:', queue);
      this.setData({ celebrationQueue: queue });
      this.showNextCelebration();
    }
  },

  // 展示下一个成就弹窗
  showNextCelebration() {
    const queue = this.data.celebrationQueue;
    if (queue.length === 0) {
      this.setData({ showCelebration: false, currentCelebration: null });
      return;
    }

    const current = queue.shift();
    this.setData({
      currentCelebration: current,
      celebrationQueue: queue,
      showCelebration: true
    });
  },

  // 成就弹窗播放完成回调
  onCelebrationComplete() {
    this.setData({ showCelebration: false });
    // 300ms 后展示下一个
    setTimeout(() => this.showNextCelebration(), 300);
  },

  // 右上角菜单点击
  onMenuTap() {
    this.setData({ showMenu: !this.data.showMenu });
  },

  // 关闭菜单
  onCloseMenu() {
    this.setData({ showMenu: false });
  },

  // 打开历史管理弹窗
  onShowHistoryManager() {
    this.setData({ showMenu: false, showHistoryManager: true });
  },

  // 关闭历史管理弹窗
  onCloseHistoryManager() {
    this.setData({ showHistoryManager: false });
  },

  // 删除单条消息
  onDeleteMessage(e) {
    const messageId = e.detail.messageId;
    chatActions.revokeMessage(messageId).then(() => {
      // 从消息列表中移除
      const messages = this.data.messages.filter(m => m.id !== messageId);
      this.setData({ messages });
      wx.showToast({ title: '已删除', icon: 'success' });
    }).catch(err => {
      console.error('delete message failed:', err);
      wx.showToast({ title: '删除失败', icon: 'none' });
    });
  },

  // 清空全部消息
  onClearAllMessages() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空全部聊天记录吗？此操作不可恢复。',
      success: (res) => {
        if (res.confirm) {
          chatActions.clearAllMessages().then(() => {
            this.setData({ messages: [], showMenu: false, showHistoryManager: false });
            wx.showToast({ title: '已清空', icon: 'success' });
          }).catch(err => {
            console.error('clear all messages failed:', err);
            wx.showToast({ title: '清空失败', icon: 'none' });
          });
        }
      }
    });
  }

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