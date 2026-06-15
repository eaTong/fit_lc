/**
 * SSE Stream Utility for Mini Program
 * 处理流式响应读取和事件解析
 *
 * 修复：
 * 1. Promise 正常完成时 resolve（监听 onDone 事件）
 * 2. 错误时 reject
 * 3. iOS 兼容：fallback 到普通 request + 长轮询
 * 4. 超时处理
 */

const API_BASE = 'https://fitlc.com';

/**
 * 解析 SSE 文本块为事件数组
 */
function parseSSEChunk(text) {
  const events = [];
  const lines = text.split('\n\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    // SSE comment (keep-alive)
    if (trimmed.startsWith(':')) continue;
    // Only process data: lines (ignore event:, id:, retry: etc.)
    if (trimmed.startsWith('data: ')) {
      try {
        events.push(JSON.parse(trimmed.slice(6)));
      } catch (e) {
        console.warn('[SSE] Parse error:', e.message, 'chunk:', trimmed.slice(0, 50));
      }
    }
  }
  return events;
}

/**
 * 检查是否支持 chunked 模式
 */
function isChunkedSupported() {
  // iOS 13+ 支持 enableChunked，低版本不支持
  // Android 全版本支持
  const sys = wx.getSystemInfoSync();
  if (sys.platform !== 'ios') return true;
  // 简单判断：基础库版本 >= 2.10.0 支持
  const version = (sys.SDKVersion || '0').split('.').map(Number);
  if (version[0] > 2) return true;
  if (version[0] === 2 && version[1] >= 10) return true;
  return false;
}

/**
 * 主方案：使用 wx.request + enableChunked
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
    historyMessages = [],
    timeout = 30000
  } = options;

  return new Promise((resolve, reject) => {
    let reply = '';
    let toolData = null;
    let visionError = undefined;
    let finished = false;
    let isUnsupported = false;
    let buffer = ''; // 处理跨 chunk 的事件

    // 兼容：基础库不支持时回退到普通请求
    if (!isChunkedSupported()) {
      console.warn('[SSE] enableChunked not supported, fallback to normal request');
      return sendSSEStreamFallback(content, imageUrls, options)
        .then(resolve)
        .catch(reject);
    }

    const cleanup = () => {
      finished = true;
    };

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
      enableChunked: true,
      timeout,

      success(res) {
        if (!finished) {
          // 处理最后一批数据
          if (res.data) {
            const events = parseSSEChunk(res.data);
            processEvents(events, true);
          }
        }
      },

      fail(err) {
        if (finished) return;
        cleanup();
        // 处理不支持 enableChunked 的情况
        if (err && (err.errMsg?.includes('fail') || err.errMsg?.includes('not support'))) {
          console.warn('[SSE] Chunked failed, fallback:', err.errMsg);
          isUnsupported = true;
          return sendSSEStreamFallback(content, imageUrls, options)
            .then(resolve)
            .catch(reject);
        }
        reject(err);
      }
    });

    if (!task) {
      // task 为 null，说明 enableChunked 完全不支持
      return sendSSEStreamFallback(content, imageUrls, options)
        .then(resolve)
        .catch(reject);
    }

    /**
     * 处理事件列表
     */
    function processEvents(events, isFinal = false) {
      for (const event of events) {
        // 触发回调
        switch (event.type) {
          case 'start':
            onStart?.(event);
            break;
          case 'vision_start':
          case 'vision_done':
            // Vision 事件也触发 onEvent 但不特别处理
            break;
          case 'vision_error':
            visionError = event.message;
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
            if (event.visionError) visionError = event.visionError;
            onFinal?.(event);
            break;
          case 'done':
            onDone?.(event);
            if (!finished) {
              cleanup();
              resolve({ reply, toolData, visionError });
            }
            return;
          case 'error':
            onError?.(event);
            if (!finished) {
              cleanup();
              reject(new Error(event.message || 'SSE error'));
            }
            return;
        }
        onEvent?.(event);
      }

      // 如果是最终批但没有 done 事件（异常情况），也 resolve
      if (isFinal && !finished) {
        cleanup();
        resolve({ reply, toolData, visionError });
      }
    }

    task.onChunkReceived((res) => {
      try {
        if (!res.data) return;

        // 拼接 buffer 处理跨 chunk 事件
        buffer += res.data;
        const events = parseSSEChunk(buffer);

        // 找到最后一个完整的事件结尾位置
        const lastSepIdx = buffer.lastIndexOf('\n\n');
        if (lastSepIdx >= 0) {
          buffer = buffer.slice(lastSepIdx + 2);
        }

        if (events.length > 0) {
          processEvents(events, false);
        }
      } catch (e) {
        console.error('[SSE] Chunk error:', e);
      }
    });

    // 超时处理
    setTimeout(() => {
      if (!finished) {
        console.warn('[SSE] Timeout, aborting');
        try { task.abort(); } catch (e) {}
        cleanup();
        resolve({ reply, toolData, visionError, timeout: true });
      }
    }, timeout);
  });
}

/**
 * Fallback: 不支持 chunked 时的备选方案
 * 等待完整响应后一次性返回
 */
function sendSSEStreamFallback(content, imageUrls = [], options = {}) {
  const { onToken, onStart, onFinal, historyMessages = [] } = options;

  return new Promise((resolve, reject) => {
    onStart?.();

    wx.request({
      url: `${API_BASE}/api/chat/message`,
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
      success(res) {
        const reply = res.data.reply || '';
        // 模拟流式效果：按字符分块
        const tokens = reply.match(/[\s\S]/g) || [];
        let current = '';
        const interval = setInterval(() => {
          if (tokens.length === 0) {
            clearInterval(interval);
            onFinal?.({ toolData: res.data.toolData });
            resolve({
              reply,
              toolData: res.data.toolData,
              visionError: res.data.visionError,
              fallback: true
            });
            return;
          }
          const ch = tokens.shift();
          current += ch;
          onToken?.(ch);
        }, 20); // 20ms/字符 模拟流式

        // 兜底超时
        setTimeout(() => {
          clearInterval(interval);
          onFinal?.({ toolData: res.data.toolData });
          resolve({
            reply: current,
            toolData: res.data.toolData,
            visionError: res.data.visionError,
            fallback: true
          });
        }, Math.min(reply.length * 20 + 1000, 30000));
      },
      fail: reject
    });
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
    let finished = false;

    ws = wx.connectSocket({
      url: `wss://fitlc.com/ws/chat/stream`,
      protocols: ['authorization', getApp().globalData.token]
    });

    ws.onOpen(() => {
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
            if (!finished) {
              finished = true;
              ws.close();
              resolve({ reply, toolData, visionError });
            }
            break;
          case 'error':
            onError?.(event);
            if (!finished) {
              finished = true;
              ws.close();
              reject(new Error(event.message));
            }
            break;
        }

        onEvent?.(event);
      } catch (e) {
        console.error('[WS] Parse message error:', e);
      }
    });

    ws.onError((err) => {
      if (!finished) {
        finished = true;
        reject(err);
      }
    });

    ws.onClose(() => {
      if (!finished) {
        finished = true;
        resolve({ reply, toolData, visionError });
      }
    });
  });
}

module.exports = {
  sendSSEStream,
  sendSSEStreamWS,
  sendSSEStreamFallback,
  isChunkedSupported,
  parseSSEChunk
};