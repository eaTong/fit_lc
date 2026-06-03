/**
 * Chat Sender Module - 处理所有与发送消息相关的逻辑
 *
 * 职责：
 * - 文字消息发送
 * - 语音消息发送（录音 + 上传 + 发送）
 * - 图片消息发送（选择 + 上传 + 发送）
 * - 发送结果/错误处理
 * - 临时消息管理（乐观更新）
 */

const { chatActions } = require('../../store/actions');
const logger = require('../../utils/logger');

/**
 * 创建发送模块实例
 * @param {Page} page - 小程序 Page 实例
 * @returns {Object} 发送模块方法集合
 */
function createSender(page) {
  /** 消息计数器，用于生成唯一临时 ID */
  let _messageCounter = 0;

  /**
   * 生成临时消息 ID
   * @returns {string} 临时 ID，格式 temp-{timestamp}-{counter}
   */
  function generateTempId() {
    const timestamp = Date.now();
    _messageCounter += 1;
    return `temp-${timestamp}-${_messageCounter}`;
  }

  /**
   * 统一设置消息并同步到 store
   * @param {Array} messages - 新消息列表
   */
  function setMessages(messages) {
    page.setData({ messages });
    getApp().store.setState({ chatMessages: messages });
    scrollToBottom();
  }

  /**
   * 滚动到底部
   */
  function scrollToBottom() {
    const messages = page.data.messages;
    if (messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    setTimeout(() => {
      page.setData({ scrollToId: 'msg-' + lastMsg.id });
    }, 100);
  }

  /**
   * 上传所有待发送的图片
   * @returns {Promise<string[]>} 已上传图片的 URL 列表
   */
  function uploadPendingImages() {
    const { pendingImages } = page.data;
    logger.log('[Sender] uploadPendingImages called, pendingImages:', JSON.stringify(pendingImages));

    const uploadedUrls = pendingImages.filter(img => img.uploaded && img.url).map(img => img.url);
    logger.log('[Sender] Already uploaded URLs:', uploadedUrls);

    const toUpload = pendingImages.filter(img => !img.uploaded);
    logger.log('[Sender] Images to upload:', toUpload.length);

    if (toUpload.length === 0) {
      logger.log('[Sender] All images already uploaded, returning:', uploadedUrls);
      return Promise.resolve(uploadedUrls);
    }

    const { upload } = require('../../api/client');

    return Promise.all(toUpload.map(img => {
      logger.log('[Sender] Uploading:', img.path);
      return upload('/upload/image', img.path, 'file').then(res => {
        logger.log('[Sender] Upload success:', res.url);
        return res.url;
      }).catch(err => {
        logger.error('[Sender] Upload failed:', err);
        throw err;
      });
    })).then(urls => {
      logger.log('[Sender] All uploads complete, URLs:', urls);
      return [...uploadedUrls, ...urls];
    });
  }

  /**
   * 处理发送结果
   * @param {Object} result - 发送返回结果 { assistantMsg, error }
   * @param {string} tempId - 临时消息 ID
   */
  function handleSendResult(result, tempId) {
    const { assistantMsg, error } = result;
    const messages = page.data.messages;

    if (error) {
      const errorMsg = {
        id: `temp-${Date.now()}-error`,
        role: 'assistant',
        content: `图片解析失败了：${error}\n\nAI无法分析这张图片，你可以换个图片试试，或者直接描述你的健身需求。`,
        createdAt: new Date().toISOString()
      };
      const newMessages = [...messages, errorMsg];
      setMessages(newMessages);
    } else if (assistantMsg) {
      const realId = `msg-${Date.now()}`;
      const realUserMsg = { ...messages.find(m => m.id === tempId), id: realId };
      const newMessages = messages.map(m => m.id === tempId ? realUserMsg : m);
      newMessages.push({ ...assistantMsg, id: realId + '-assistant' });
      setMessages(newMessages);
    }

    page.setData({ isLoading: false });
    if (assistantMsg && assistantMsg.toolData) {
      // 通知庆祝模块处理成就
      if (page._celebration && page._celebration.handleAchievements) {
        page._celebration.handleAchievements(assistantMsg);
      }
    }
  }

  /**
   * 处理发送错误
   * @param {Error} err - 错误对象
   * @param {string} tempId - 临时消息 ID
   */
  function handleSendError(err, tempId) {
    logger.error('send message failed:', err);
    page.setData({ isLoading: false, pendingImages: [] });

    const messages = page.data.messages;
    const tempMsg = messages.find(m => m.id === tempId);
    if (tempMsg) {
      const realId = `msg-${Date.now()}`;
      const realUserMsg = { ...tempMsg, id: realId };
      const newMessages = messages.map(m => m.id === tempId ? realUserMsg : m);
      setMessages(newMessages);
    }
    page.setData({ inputValue: page.data.messages.find(m => m.id === tempId)?.content || '' });
    showToast('发送失败', 'error');
  }

  /**
   * 显示 Toast 提示
   * @param {string} message - 提示文字
   * @param {string} theme - 主题 'success' | 'error' | 'loading' | 'none'
   */
  function showToast(message, theme) {
    const toast = page.selectComponent('#t-toast');
    if (toast) {
      toast.show({ message, theme: theme || 'none' });
    }
  }

  return {
    /**
     * 发送消息（文字 + 图片）
     */
    onSend() {
      const message = page.data.inputValue.trim();
      const pendingImages = page.data.pendingImages;
      const messages = page.data.messages;

      if (!message && pendingImages.length === 0) return;
      if (page.data.isLoading) return;

      const tempId = generateTempId();

      // 乐观更新：先显示用户消息
      const uploadedImageUrls = pendingImages.filter(img => img.uploaded && img.url).map(img => img.url);
      const userMessage = {
        id: tempId,
        role: 'user',
        content: message,
        imageUrls: uploadedImageUrls.length > 0 ? uploadedImageUrls : undefined,
        createdAt: new Date().toISOString()
      };

      const updatedMessages = [...messages, userMessage];
      page.setData({
        isLoading: true,
        inputValue: '',
        messages: updatedMessages
      });
      getApp().store.setState({ chatMessages: updatedMessages });
      scrollToBottom();

      const sendFn = (uploadedUrls) => {
        return chatActions.sendMessage(message, uploadedUrls);
      };

      // 有图片先上传
      if (pendingImages.length > 0) {
        uploadPendingImages().then(uploadedUrls => {
          page.setData({ pendingImages: [] });
          return sendFn(uploadedUrls);
        }).then((result) => {
          handleSendResult(result, tempId);
        }).catch(err => {
          handleSendError(err, tempId);
        });
      } else {
        sendFn([]).then((result) => {
          handleSendResult(result, tempId);
        }).catch(err => {
          handleSendError(err, tempId);
        });
      }
    },

    /**
     * 输入内容变化
     * @param {Object} e - 输入事件
     */
    onInput(e) {
      page.setData({ inputValue: e.detail.value });
    },

    /**
     * 切换输入模式（文字/语音）
     */
    onSwitchMode() {
      const newMode = page.data.inputMode === 'text' ? 'voice' : 'text';
      if (page.data.isRecording && newMode === 'text') {
        this.stopRecording();
      }
      page.setData({ inputMode: newMode });
    },

    /**
     * 选择图片
     */
    onImageTap() {
      wx.chooseImage({
        count: 9,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const newImages = res.tempFilePaths.map(path => ({ path, uploaded: false, url: '' }));
          const currentImages = page.data.pendingImages;
          const allImages = [...currentImages, ...newImages];
          page.setData({ pendingImages: allImages });

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
              const updatedImages = allImages.map(img => {
                const uploaded = uploadedImages.find(u => u.path === img.path);
                return uploaded || img;
              });
              page.setData({ pendingImages: updatedImages });
              const failedImages = uploadedImages.filter(img => img.error);
              if (failedImages.length > 0) {
                showToast(`${failedImages.length}张图片上传失败`, 'error');
                const successPaths = uploadedImages.filter(img => !img.error).map(img => img.path);
                const remainingImages = allImages.filter(img => successPaths.includes(img.path));
                page.setData({ pendingImages: remainingImages });
              }
            }).catch(err => {
              logger.error('Upload images failed:', err);
              showToast('图片上传失败', 'error');
            });
          }
        }
      });
    },

    /**
     * 移除待发送图片
     * @param {Object} e - 事件对象
     */
    onRemovePendingImage(e) {
      const index = e.currentTarget.dataset.index;
      const pendingImages = [...page.data.pendingImages];
      pendingImages.splice(index, 1);
      page.setData({ pendingImages });
    },

    /**
     * 语音触摸开始
     */
    onVoiceTouchStart() {
      if (page.data.inputMode !== 'voice') return;
      this.startRecording();
    },

    /**
     * 语音触摸结束
     */
    onVoiceTouchEnd() {
      if (page.data.inputMode !== 'voice' || !page.data.isRecording) return;
      this.stopRecording();
      this.sendVoiceMessage();
    },

    /**
     * 发送语音消息
     */
    sendVoiceMessage() {
      if (!page.tempRecorderPath) {
        showToast('录音文件不存在', 'error');
        return;
      }

      page.setData({ isLoading: true });
      showToast('语音上传中...', 'loading');

      const { upload } = require('../../api/client');
      upload('/upload/audio', page.tempRecorderPath, 'file').then(uploadRes => {
        const audioUrl = uploadRes.url;
        chatActions.sendMessage(`[语音]${audioUrl}`).then(message => {
          page.setData({ isLoading: false, tempRecorderPath: null });
          scrollToBottom();
        }).catch(err => {
          page.setData({ isLoading: false });
          showToast('发送失败', 'error');
        });
      }).catch(err => {
        logger.error('upload voice failed:', err);
        page.setData({ isLoading: false });
        showToast('语音上传失败', 'error');
      });
    },

    /**
     * 开始录音
     */
    startRecording() {
      page.tempRecorderPath = null;
      const recorderManager = page.data.recorderManager;
      if (!recorderManager) {
        showToast('录音功能不可用', 'error');
        return;
      }
      recorderManager.start({
        format: 'mp3',
        duration: 60000
      });
      page.setData({ isRecording: true });

      page.recordingTimer = setTimeout(() => {
        this.stopRecording();
      }, 60000);
    },

    /**
     * 停止录音
     */
    stopRecording() {
      const recorderManager = page.data.recorderManager;
      if (recorderManager) {
        recorderManager.stop();
      }
      page.setData({ isRecording: false });
      if (page.recordingTimer) {
        clearTimeout(page.recordingTimer);
        page.recordingTimer = null;
      }
    },

    /**
     * 统一设置消息并同步到 store（外部可调用）
     * @param {Array} messages - 消息列表
     */
    setMessages,

    /**
     * 替换指定临时消息
     * @param {string} tempId - 临时消息 ID
     * @param {Object} newMsg - 新消息对象
     */
    replaceMessage(tempId, newMsg) {
      if (!newMsg) return;
      const { messages } = page.data;
      const newMessages = messages.map(m => m.id === tempId ? newMsg : m);
      page.setData({ messages: newMessages });
      scrollToBottom();
    },

    /**
     * 滚动到底部
     */
    scrollToBottom,

    /**
     * 显示 Toast
     */
    showToast
  };
}

module.exports = { createSender };
