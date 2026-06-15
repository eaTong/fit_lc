/**
 * SSE Stream Utility for Mini Program
 * 处理流式响应读取和事件解析
 */

const API_BASE = 'https://fitlc.com';

/**
 * 发送流式消息并处理 SSE 响应
 * @param {string} content - 消息内容
 * @param {string[]} imageUrls - 图片URL数组
 * @param {Object} options - 选项
 * @param {Function} onToken - token 事件回调
 * @param {Function} onEvent - 所有事件回调
 * @returns {Promise<{reply: string, toolData: any}>}
 */
function sendSSEStream(content, imageUrls = [], options = {}) {
  const {
    onToken,
    onEvent,
    onStart,
    onThinking,
    onToolCall,
    onToolResult,
    onFinal,
    onDone,
    onError,
    historyMessages = []
  } = options;

  return new Promise((resolve, reject) => {
    let reply = '';
    let toolData = null;
    let visionError = undefined;
    let events = [];

    // 使用 wx.request 的 enableChunked
    const task = wx.request({
      url: `${API_BASE}/api/chat/stream`,
      method: 'POST',
      header: {
        'Authorization': `Bearer ${getApp().globalData.token}`,
        'Content-Type': 'application/json'
      },
      data: {
        message: content,
        imageUrls,
        historyMessages
      },
      enableChunked: true, // 关键：启用 chunked 模式

      success(res) {
        // 成功处理
      },

      fail(err) {
        reject(err);
      }
    });

    // 手动处理 chunked 数据（需要使用 SocketTask）
    // 注意：小程序的 enableChunked 支持有限，可能需要使用 wx.connectSocket

    // 由于小程序对 SSE 支持有限，使用备选方案
    // 如果 chunked 不可用，回退到普通请求
    task.onChunkReceived((res) => {
      try {
        const data = res.data;
        const lines = data.split('\n\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const event = JSON.parse(line.slice(6));

            events.push(event);

            // 调用对应回调
            switch (event.type) {
              case 'start':
                onStart?.(event);
                break;
              case 'thinking':
                onThinking?.(event);
                break;
              case 'token':
                reply += event.delta;
                onToken?.(event.delta, event);
                break;
              case 'tool_call':
                onToolCall?.(event);
                break;
              case 'tool_result':
                onToolResult?.(event);
                break;
              case 'final':
                toolData = event.toolData;
                visionError = event.visionError;
                onFinal?.(event);
                break;
              case 'done':
                onDone?.(event);
                break;
              case 'error':
                onError?.(event);
                break;
            }

            onEvent?.(event);
          }
        }
      } catch (e) {
        console.error('Parse SSE event error:', e);
      }
    });

    // 完成时返回
    task.onHeadersReceived((res) => {
      // headers received
    });

    // 等待完成
    const originalAbort = task.abort.bind(task);
    task.abort = function() {
      originalAbort();
      resolve({ reply, toolData, visionError, events });
    };
  });
}

/**
 * 备选方案：使用 WebSocket 模拟 SSE
 * 如果 wx.request 的 enableChunked 不可用，使用 wx.connectSocket
 */
function sendSSEStreamWS(content, imageUrls = [], options = {}) {
  const {
    onToken,
    onEvent,
    onStart,
    onThinking,
    onToolCall,
    onToolResult,
    onFinal,
    onDone,
    onError,
    historyMessages = []
  } = options;

  return new Promise((resolve, reject) => {
    let reply = '';
    let toolData = null;
    let visionError = undefined;
    let ws = null;

    // 创建 WebSocket 连接
    ws = wx.connectSocket({
      url: `wss://fitlc.com/ws/chat/stream`,
      protocols: ['authorization', getApp().globalData.token]
    });

    ws.onOpen(() => {
      // 发送初始化消息
      ws.send({
        data: JSON.stringify({
          action: 'start',
          message: content,
          imageUrls,
          historyMessages
        })
      });
    });

    ws.onMessage((res) => {
      try {
        const event = JSON.parse(res.data);

        switch (event.type) {
          case 'start':
            onStart?.(event);
            break;
          case 'thinking':
            onThinking?.(event);
            break;
          case 'token':
            reply += event.delta;
            onToken?.(event.delta, event);
            break;
          case 'tool_call':
            onToolCall?.(event);
            break;
          case 'tool_result':
            onToolResult?.(event);
            break;
          case 'final':
            toolData = event.toolData;
            visionError = event.visionError;
            onFinal?.(event);
            break;
          case 'done':
            onDone?.(event);
            ws.close();
            resolve({ reply, toolData, visionError });
            break;
          case 'error':
            onError?.(event);
            ws.close();
            reject(new Error(event.message));
            break;
        }

        onEvent?.(event);
      } catch (e) {
        console.error('Parse WS message error:', e);
      }
    });

    ws.onError((err) => {
      reject(err);
    });

    ws.onClose(() => {
      resolve({ reply, toolData, visionError });
    });
  });
}

module.exports = {
  sendSSEStream,
  sendSSEStreamWS
};