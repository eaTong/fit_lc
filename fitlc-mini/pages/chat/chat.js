const { chatActions } = require('../../store/actions');
const { recordActions } = require('../../store/actions');
const { authActions } = require('../../store/actions');
const storage = require('../../utils/storage');
const format = require('../../utils/format');
const { parseToHtml, parseToText } = require('../../utils/markdown');
const logger = require('../../utils/logger');
const { sendSSEStream } = require('../../utils/sseStream');

Page({
  data: {
    messages: [],
    inputValue: '',
    isLoading: false,
    isRecording: false,
    inputMode: 'text',  // 'text' | 'voice'
    scrollToId: '',
    recorderManager: null,
    user: null,
    pendingImages: [],  // 待发送的图片列表
    celebrationQueue: [],    // 待展示的成就队列
    currentCelebration: null, // 当前展示的成就
    showCelebration: false,  // 是否显示庆祝弹窗
    showMenu: false,         // 菜单是否显示
    showHistoryManager: false, // 历史管理弹窗是否显示
    statusBarHeight: 20,       // 状态栏高度
    safeAreaTop: 0,            // 安全区域顶部 inset
    parseToHtml: parseToHtml   // 将 markdown 工具暴露到模板用于 rich-text
  },

  onLoad() {
    // 创建录制管理器
    const recorderManager = wx.getRecorderManager();
    recorderManager.onStop((res) => {
      this.tempRecorderPath = res.tempFilePath;
    });
    recorderManager.onError((err) => {
      logger.error('recorder error:', err);
      this.setData({ isRecording: false });
      this.showToast('录音失败', 'error');
    });
    this.setData({ recorderManager });

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
    // 停止录音（如果正在录音）
    if (this.data.isRecording && this.data.recorderManager) {
      this.data.recorderManager.stop();
    }
    if (this.recordingTimer) {
      clearTimeout(this.recordingTimer);
      this.recordingTimer = null;
    }
  },

  loadMessages() {
    logger.log('Loading messages...');
    chatActions.loadMessages(50)
      .then(messages => {
        logger.log('[Chat] Messages loaded:', messages.length);
      })
      .catch(err => {
        logger.error('load messages failed:', err);
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
      this.showToast('录音文件不存在', 'error');
      return;
    }

    this.setData({ isLoading: true });
    this.showToast('语音上传中...', 'loading');

    const { upload } = require('../../api/client');
    upload('/upload/audio', this.tempRecorderPath, 'file').then(uploadRes => {
      const audioUrl = uploadRes.url;
      chatActions.sendMessage(`[语音]${audioUrl}`).then(message => {
        this.setData({ isLoading: false, tempRecorderPath: null });
        this.scrollToBottom();
      }).catch(err => {
        this.setData({ isLoading: false });
        this.showToast('发送失败', 'error');
      });
    }).catch(err => {
      logger.error('upload voice failed:', err);
      this.setData({ isLoading: false });
      this.showToast('语音上传失败', 'error');
    });
  },

  startRecording() {
    this.tempRecorderPath = null;
    const recorderManager = this.data.recorderManager;
    if (!recorderManager) {
      this.showToast('录音功能不可用', 'error');
      return;
    }
    recorderManager.start({
      format: 'mp3',
      duration: 60000
    });
    this.setData({ isRecording: true });

    this.recordingTimer = setTimeout(() => {
      this.stopRecording();
    }, 60000);
  },

  stopRecording() {
    const recorderManager = this.data.recorderManager;
    if (recorderManager) {
      recorderManager.stop();
    }
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
              this.showToast(`${failedImages.length}张图片上传失败`, 'error');
              // 移除上传失败的图片
              const successPaths = uploadedImages.filter(img => !img.error).map(img => img.path);
              const remainingImages = allImages.filter(img => successPaths.includes(img.path));
              this.setData({ pendingImages: remainingImages });
            }
          }).catch(err => {
            logger.error('Upload images failed:', err);
            this.showToast('图片上传失败', 'error');
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

  // 流式发送消息（使用 SSE）
  onSendStream() {
    const message = this.data.inputValue.trim();
    const pendingImages = this.data.pendingImages;
    const messages = this.data.messages;

    if (!message && pendingImages.length === 0) return;
    if (this.data.isLoading) return;

    // 生成临时ID
    const timestamp = Date.now();
    const counter = (this._messageCounter || 0) + 1;
    this._messageCounter = counter;
    const tempId = `temp-${timestamp}-${counter}`;

    // 先显示用户消息
    const uploadedImageUrls = pendingImages.filter(img => img.uploaded && img.url).map(img => img.url);
    const userMessage = {
      id: tempId,
      role: 'user',
      content: message,
      imageUrls: uploadedImageUrls.length > 0 ? uploadedImageUrls : undefined,
      createdAt: new Date().toISOString()
    };

    // 创建空的 assistant 消息（用于流式填充）
    const assistantMessage = {
      id: `temp-${timestamp}-assistant`,
      role: 'assistant',
      content: '',  // 初始为空，逐步填充
      createdAt: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMessage, assistantMessage];
    this.setData({
      isLoading: true,
      inputValue: '',
      messages: updatedMessages
    });
    getApp().store.setState({ chatMessages: updatedMessages });
    this.scrollToBottom();

    // 准备历史消息（用于流式API）
    const historyMessages = messages.slice(-10).map(m => ({
      role: m.role,
      content: m.content
    }));

    // 流式发送
    sendSSEStream(message, uploadedImageUrls, {
      historyMessages,
      onToken: (delta) => {
        // 逐步追加内容
        const msgs = this.data.messages;
        const lastIdx = msgs.length - 1;
        if (lastIdx >= 0 && msgs[lastIdx].role === 'assistant') {
          const newContent = msgs[lastIdx].content + delta;
          const newMessages = [...msgs];
          newMessages[lastIdx] = { ...newMessages[lastIdx], content: newContent };
          this.setData({ messages: newMessages });
          getApp().store.setState({ chatMessages: newMessages });
          this.scrollToBottom();
        }
      },
      onStart: () => {
        console.log('[SSE] Stream started');
      },
      onThinking: () => {
        // 显示思考中状态
        const msgs = this.data.messages;
        const lastIdx = msgs.length - 1;
        if (lastIdx >= 0) {
          const newMessages = [...msgs];
          newMessages[lastIdx] = { ...newMessages[lastIdx], status: 'thinking' };
          this.setData({ messages: newMessages });
        }
      },
      onToolCall: (event) => {
        console.log('[SSE] Tool call:', event.tool);
      },
      onToolResult: (event) => {
        console.log('[SSE] Tool result:', event.success);
      },
      onFinal: (event) => {
        // 保存 toolData
        const msgs = this.data.messages;
        const lastIdx = msgs.length - 1;
        if (lastIdx >= 0) {
          const newMessages = [...msgs];
          newMessages[lastIdx] = {
            ...newMessages[lastIdx],
            toolData: event.toolData,
            visionError: event.visionError
          };
          this.setData({ messages: newMessages });
        }
      },
      onDone: () => {
        this.setData({ isLoading: false });
        console.log('[SSE] Stream done');
      },
      onError: (event) => {
        // 显示错误
        const msgs = this.data.messages;
        const lastIdx = msgs.length - 1;
        if (lastIdx >= 0) {
          const newMessages = [...msgs];
          newMessages[lastIdx] = {
            ...newMessages[lastIdx],
            content: event.message || '出错了，请重试'
          };
          this.setData({ messages: newMessages, isLoading: false });
        }
      }
    }).then(result => {
      // 完成
      this.setData({ isLoading: false });
    }).catch(err => {
      this.handleSendError(err, tempId);
    });
  },

  // 处理发送结果（非流式）
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

      // 图片解析降级提示：当后端 visionError 存在时，在 AI 消息下方追加系统提示
      if (assistantMsg.visionError) {
        newMessages.push({
          id: `sys-${Date.now()}-vision`,
          role: 'system',
          type: 'visionWarning',
          content: `📷 图片暂时未能解析（${assistantMsg.visionError}），请用文字补充`,
          createdAt: new Date().toISOString()
        });
      }

      this.setMessages(newMessages);
    }

    this.setData({ isLoading: false });
    if (assistantMsg && assistantMsg.toolData) {
      this.handleAchievements(assistantMsg);
    }
  },

  // 处理发送错误
  handleSendError(err, tempId) {
    logger.error('send message failed:', err);
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
    this.showToast('发送失败', 'error');
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
      logger.log('Achievements detected, adding to queue:', queue);
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

  // 右上角菜单点击 - 使用 t-action-sheet
  onMenuTap() {
    this.setData({ showMenu: true });
    this.selectComponent('#t-action-sheet').show({
      items: [
        { label: '历史管理', value: 'history' },
        { label: '清空全部记录', value: 'clearall', color: '#e34d59' }
      ]
    });
  },

  // t-action-sheet 选择回调
  onActionSheetSelect(e) {
    const { value } = e.detail;
    this.setData({ showMenu: false });
    if (value === 'history') {
      this.onShowHistoryManager();
    } else if (value === 'clearall') {
      this.onClearAllMessages();
    }
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
      this.showToast('已删除', 'success');
    }).catch(err => {
      logger.error('delete message failed:', err);
      this.showToast('删除失败', 'error');
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
            this.showToast('已清空', 'success');
          }).catch(err => {
            logger.error('clear all messages failed:', err);
            this.showToast('清空失败', 'error');
          });
        }
      }
    });
  },

  // 上传所有待发送的图片
  uploadPendingImages() {
    const { pendingImages } = this.data;
    logger.log('[Chat] uploadPendingImages called, pendingImages:', JSON.stringify(pendingImages));
    // 如果已有上传过的图片，直接返回URLs
    const uploadedUrls = pendingImages.filter(img => img.uploaded && img.url).map(img => img.url);
    logger.log('[Chat] Already uploaded URLs:', uploadedUrls);
    const toUpload = pendingImages.filter(img => !img.uploaded);
    logger.log('[Chat] Images to upload:', toUpload.length);

    if (toUpload.length === 0) {
      logger.log('[Chat] All images already uploaded, returning:', uploadedUrls);
      return Promise.resolve(uploadedUrls);
    }

    const { upload } = require('../../api/client');

    return Promise.all(toUpload.map(img => {
      logger.log('[Chat] Uploading:', img.path);
      return upload('/upload/image', img.path, 'file').then(res => {
        logger.log('[Chat] Upload success:', res.url);
        return res.url;
      }).catch(err => {
        logger.error('[Chat] Upload failed:', err);
        throw err;
      });
    })).then(urls => {
      logger.log('[Chat] All uploads complete, URLs:', urls);
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
    const messages = this.data.messages;
    if (messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    setTimeout(() => {
      this.setData({ scrollToId: 'msg-' + lastMsg.id });
    }, 100);
  },

  formatTime(timestamp) {
    return format.formatRelativeTime(timestamp);
  },

  // 使用统一的 markdown 解析工具
  parseToHtml(text) {
    return parseToHtml(text);
  },

  parseToText(text) {
    return parseToText(text);
  },

  // Toast 便捷方法
  showToast(message, theme) {
    const toast = this.selectComponent('#t-toast');
    if (toast) {
      toast.show({ message, theme: theme || 'none' });
    }
  }
});
