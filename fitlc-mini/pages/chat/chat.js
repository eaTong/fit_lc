const { chatActions } = require('../../store/actions');
const { recordActions } = require('../../store/actions');
const { authActions } = require('../../store/actions');
const storage = require('../../utils/storage');
const format = require('../../utils/format');
const markdown = require('../../utils/markdown');

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
    showHistoryManager: false, // 历史管理弹窗是否显示
    statusBarHeight: 20,       // 状态栏高度
    safeAreaTop: 0,            // 安全区域顶部 inset
    markdown: markdown         // 将 markdown 工具暴露到模板用于 rich-text
  },

  onLoad() {
    // 获取安全区域和状态栏高度
    const systemInfo = wx.getSystemInfoSync();
    const safeArea = systemInfo.safeArea;
    const statusBarHeight = systemInfo.statusBarHeight || 20;
    const safeAreaTop = safeArea ? (safeArea.top - statusBarHeight) : 0;
    // navbar 总高度 = 状态栏 + 固定 88rpx
    const navbarHeight = statusBarHeight + 88;
    this.setData({ statusBarHeight, safeAreaTop, navbarHeight });
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
        console.log('[Chat] Messages loaded:', messages.length);
        messages.forEach((m, i) => {
          console.log(`[Chat] Msg ${i}: role=${m.role}, content=${(m.content || '').substring(0, 50)}, toolData=${!!m.toolData}, aiReply=${m.toolData?.aiReply?.substring(0, 50)}`);
        });
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
        // 将选择的图片添加到 pendingImages 先显示
        const newImages = res.tempFilePaths.map(path => ({ path, uploaded: false, url: '' }));
        const currentImages = this.data.pendingImages;
        const allImages = [...currentImages, ...newImages];
        this.setData({ pendingImages: allImages });

        // 立即上传所有未上传的图片
        const toUpload = allImages.filter(img => !img.uploaded);
        if (toUpload.length > 0) {
          const { upload } = require('../../api/client');
          const uploadPromises = toUpload.map(img => {
            return upload('/upload/image', img.path, 'file').then(res => ({
              path: img.path,
              uploaded: true,
              url: res.url
            })).catch(err => ({
              path: img.path,
              uploaded: false,
              error: err
            }));
          });

          Promise.all(uploadPromises).then(uploadedImages => {
            // 更新 pendingImages 中的上传状态
            const updatedImages = allImages.map(img => {
              const uploaded = uploadedImages.find(u => u.path === img.path);
              return uploaded || img;
            });
            this.setData({ pendingImages: updatedImages });
            // 检查是否有上传失败的图片
            const failedImages = uploadedImages.filter(img => img.error);
            if (failedImages.length > 0) {
              wx.showToast({ title: `${failedImages.length}张图片上传失败`, icon: 'none' });
              // 移除上传失败的图片
              const successPaths = uploadedImages.filter(img => !img.error).map(img => img.path);
              const remainingImages = allImages.filter(img => successPaths.includes(img.path));
              this.setData({ pendingImages: remainingImages });
            }
          }).catch(err => {
            console.error('Upload images failed:', err);
            wx.showToast({ title: '图片上传失败', icon: 'none' });
          });
        }
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
    const pendingImages = this.data.pendingImages;
    const messages = this.data.messages;

    if (!message && pendingImages.length === 0) return;
    if (this.data.isLoading) return;

    // 生成临时ID用于后续替换（使用计数器避免时间戳冲突）
    const timestamp = Date.now();
    const counter = (this._messageCounter || 0) + 1;
    this._messageCounter = counter;
    const tempId = `temp-${timestamp}-${counter}`;

    // 先立即显示用户消息（使用已上传的URL）
    const uploadedImageUrls = pendingImages.filter(img => img.uploaded && img.url).map(img => img.url);
    const userMessage = {
      id: tempId,
      role: 'user',
      content: message,
      imageUrls: uploadedImageUrls.length > 0 ? uploadedImageUrls : undefined,
      createdAt: new Date().toISOString()
    };

    // 更新 page data 和 store
    const updatedMessages = [...messages, userMessage];
    this.setData({
      isLoading: true,
      inputValue: '',
      messages: updatedMessages
    });
    // 同时更新 store，保持一致性
    getApp().store.setState({ chatMessages: updatedMessages });
    this.scrollToBottom();

    const sendFn = (uploadedUrls) => {
      return chatActions.sendMessage(message, uploadedUrls);
    };

    // 如果有待发送的图片，先上传
    if (pendingImages.length > 0) {
      this.uploadPendingImages().then(uploadedUrls => {
        this.setData({ pendingImages: [] });
        return sendFn(uploadedUrls);
      }).then((result) => {
        this.handleSendResult(result, tempId);
      }).catch(err => {
        this.handleSendError(err, tempId);
      });
    } else {
      // 没有图片，直接发送文字
      sendFn([]).then((result) => {
        this.handleSendResult(result, tempId);
      }).catch(err => {
        this.handleSendError(err, tempId);
      });
    }
  },

  // 处理发送结果
  handleSendResult(result, tempId) {
    const { assistantMsg, error } = result;
    const messages = this.data.messages;

    if (error) {
      // 图片解析失败，创建错误消息
      const errorMsg = {
        id: `temp-${Date.now()}-error`,
        role: 'assistant',
        content: `图片解析失败了：${error}\n\nAI无法分析这张图片，你可以换个图片试试，或者直接描述你的健身需求。`,
        createdAt: new Date().toISOString()
      };
      const newMessages = [...messages, errorMsg];
      this.setMessages(newMessages);
    } else if (assistantMsg) {
      // 用真实ID替换临时用户消息ID
      const realId = `msg-${Date.now()}`;
      const realUserMsg = { ...messages.find(m => m.id === tempId), id: realId };
      const newMessages = messages.map(m => m.id === tempId ? realUserMsg : m);
      newMessages.push({ ...assistantMsg, id: realId + '-assistant' });
      this.setMessages(newMessages);
    }

    this.setData({ isLoading: false });
    if (assistantMsg && assistantMsg.toolData) {
      this.handleAchievements(assistantMsg);
    }
  },

  // 处理发送错误
  handleSendError(err, tempId) {
    console.error('send message failed:', err);
    // 清空待发送图片，避免重新发送
    this.setData({ isLoading: false, pendingImages: [] });
    // 用真实ID替换临时ID
    const messages = this.data.messages;
    const tempMsg = messages.find(m => m.id === tempId);
    if (tempMsg) {
      const realId = `msg-${Date.now()}`;
      const realUserMsg = { ...tempMsg, id: realId };
      const newMessages = messages.map(m => m.id === tempId ? realUserMsg : m);
      this.setMessages(newMessages);
    }
    this.setData({ inputValue: this.data.messages.find(m => m.id === tempId)?.content || '' });
    wx.showToast({ title: '发送失败', icon: 'none' });
  },

  // 统一设置消息并同步到store
  setMessages(messages) {
    this.setData({ messages });
    getApp().store.setState({ chatMessages: messages });
    this.scrollToBottom();
  },

  // 替换临时消息
  replaceMessage(tempId, newMsg) {
    if (!newMsg) return;
    const { messages } = this.data;
    const newMessages = messages.map(m => m.id === tempId ? newMsg : m);
    this.setData({ messages: newMessages });
    this.scrollToBottom();
  },

  // 处理成就弹窗
  handleAchievements(assistantMsg) {
    if (!assistantMsg || !assistantMsg.toolData) return;

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
  },

  // 上传所有待发送的图片
  uploadPendingImages() {
    const { pendingImages } = this.data;
    console.log('[Chat] uploadPendingImages called, pendingImages:', JSON.stringify(pendingImages));
    // 如果已有上传过的图片，直接返回URLs
    const uploadedUrls = pendingImages.filter(img => img.uploaded && img.url).map(img => img.url);
    console.log('[Chat] Already uploaded URLs:', uploadedUrls);
    const toUpload = pendingImages.filter(img => !img.uploaded);
    console.log('[Chat] Images to upload:', toUpload.length);

    if (toUpload.length === 0) {
      console.log('[Chat] All images already uploaded, returning:', uploadedUrls);
      return Promise.resolve(uploadedUrls);
    }

    const { upload } = require('../../api/client');

    return Promise.all(toUpload.map(img => {
      console.log('[Chat] Uploading:', img.path);
      return upload('/upload/image', img.path, 'file').then(res => {
        console.log('[Chat] Upload success:', res.url);
        return res.url;
      }).catch(err => {
        console.error('[Chat] Upload failed:', err);
        throw err;
      });
    })).then(urls => {
      console.log('[Chat] All uploads complete, URLs:', urls);
      // 合并已上传和新上传的URL
      return [...uploadedUrls, ...urls];
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
  },

  // 解析 Markdown 格式文本为可显示格式
  parseMarkdown(text) {
    if (!text) return '';
    let result = text;

    // 代码块：```code``` -> 「代码」
    result = result.replace(/```(\w*)\n?([\s\S]*?)```/g, (match, lang, code) => {
      return `「代码」${code.trim()}「/代码」`;
    });

    // 行内代码：`code` -> 『code』
    result = result.replace(/`([^`]+)`/g, '『$1』');

    // 加粗：**text** 或 __text__ -> 【text】
    result = result.replace(/\*\*([^*]+)\*\*/g, '【$1】');
    result = result.replace(/__([^_]+)__/g, '【$1】');

    // 斜体：*text* 或 _text_ -> _$1_
    result = result.replace(/\*([^*]+)\*/g, '_$1_');
    result = result.replace(/_([^_]+)_/g, '_$1_');

    // 标题：# title -> 【标题】
    result = result.replace(/^### (.+)$/gm, '【副标题】$1');
    result = result.replace(/^## (.+)$/gm, '【小标题】$1');
    result = result.replace(/^# (.+)$/gm, '【标题】$1');

    // 分隔线：--- -> ───
    result = result.replace(/^---$/gm, '──────────');

    // 列表：- item -> • item
    result = result.replace(/^[•\-\*] (.+)$/gm, '• $1');
    // 有序列表：1. item
    result = result.replace(/^\d+\. (.+)$/gm, '$1.');

    return result;
  }
});