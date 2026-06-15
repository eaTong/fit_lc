/**
 * Retry Utility
 * 通用重试 helper
 */

/**
 * 带重试的 Promise 执行
 * @param {Function} fn - 要执行的异步函数
 * @param {Object} options - 选项
 * @returns {Promise}
 */
function withRetry(fn, options = {}) {
  const {
    maxRetries = 3,
    delay = 1000,
    backoff = 2,
    onRetry,
    shouldRetry
  } = options;

  return new Promise((resolve, reject) => {
    let attempts = 0;

    const attempt = () => {
      attempts++;

      fn()
        .then(resolve)
        .catch(err => {
          // 判断是否应该重试
          const retryable = shouldRetry
            ? shouldRetry(err, attempts)
            : isRetryableError(err);

          if (retryable && attempts < maxRetries) {
            const waitTime = delay * Math.pow(backoff, attempts - 1);
            onRetry?.(err, attempts, waitTime);

            setTimeout(attempt, waitTime);
          } else {
            reject(err);
          }
        });
    };

    attempt();
  });
}

/**
 * 判断错误是否可重试
 */
function isRetryableError(err) {
  if (!err) return false;

  // 网络错误
  if (err.message?.includes('network') ||
      err.message?.includes('timeout') ||
      err.message?.includes('ENOTFOUND') ||
      err.message?.includes('ECONNREFUSED')) {
    return true;
  }

  // 429 Too Many Requests
  if (err.status === 429 || err.statusCode === 429) {
    return true;
  }

  // 5xx 服务端错误
  if (err.status >= 500 || err.statusCode >= 500) {
    return true;
  }

  return false;
}

/**
 * 错误码定义
 */
const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',
  SERVER_ERROR: 'SERVER_ERROR',
  RATE_LIMIT: 'RATE_LIMIT',
  INVALID_REQUEST: 'INVALID_REQUEST',
  AUTH_ERROR: 'AUTH_ERROR',
  UNKNOWN: 'UNKNOWN'
};

/**
 * 解析错误码
 */
function parseErrorCode(err) {
  if (!err) return ERROR_CODES.UNKNOWN;

  if (err.message?.includes('network')) return ERROR_CODES.NETWORK_ERROR;
  if (err.message?.includes('timeout')) return ERROR_CODES.TIMEOUT;
  if (err.status === 429 || err.statusCode === 429) return ERROR_CODES.RATE_LIMIT;
  if (err.status >= 500 || err.statusCode >= 500) return ERROR_CODES.SERVER_ERROR;
  if (err.status === 401 || err.statusCode === 401) return ERROR_CODES.AUTH_ERROR;
  if (err.status === 400 || err.statusCode === 400) return ERROR_CODES.INVALID_REQUEST;

  return ERROR_CODES.UNKNOWN;
}

/**
 * 错误消息映射
 */
function getErrorMessage(code) {
  const messages = {
    [ERROR_CODES.NETWORK_ERROR]: '网络连接失败，请检查网络',
    [ERROR_CODES.TIMEOUT]: '请求超时，请稍后重试',
    [ERROR_CODES.SERVER_ERROR]: '服务器繁忙，请稍后重试',
    [ERROR_CODES.RATE_LIMIT]: '请求过于频繁，请稍后再试',
    [ERROR_CODES.INVALID_REQUEST]: '请求参数有误',
    [ERROR_CODES.AUTH_ERROR]: '登录已过期，请重新登录',
    [ERROR_CODES.UNKNOWN]: '出错了，请稍后重试'
  };

  return messages[code] || messages[ERROR_CODES.UNKNOWN];
}

module.exports = {
  withRetry,
  isRetryableError,
  ERROR_CODES,
  parseErrorCode,
  getErrorMessage
};