/**
 * 将微信 API 包装为 Promise
 */
const promisify = (fn) => {
  return (args) => {
    return new Promise((resolve, reject) => {
      fn({
        ...args,
        success: resolve,
        fail: reject
      });
    });
  };
};

module.exports = { promisify };