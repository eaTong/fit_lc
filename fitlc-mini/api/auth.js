const { post } = require('./client');

module.exports = {
  wechatLogin(code) {
    return post('/auth/wechat', { code });
  },

  register(email, password) {
    return post('/auth/register', { email, password });
  },

  login(email, password) {
    return post('/auth/login', { email, password });
  },

  getCurrentUser() {
    return post('/auth/me', {});
  }
};