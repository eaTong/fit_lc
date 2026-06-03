/**
 * 日志工具 - 根据环境控制日志输出
 * console.log/console.warn 仅在开发环境输出
 * console.error 始终输出
 */
var isDev = (typeof __wxConfig !== 'undefined' && __wxConfig.envVersion !== 'release') ||
            (typeof __wxConfig === 'undefined');

module.exports = {
  log: function() {
    if (isDev) {
      var args = ['[7fit]'];
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      console.log.apply(console, args);
    }
  },
  warn: function() {
    if (isDev) {
      var args = ['[7fit]'];
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      console.warn.apply(console, args);
    }
  },
  error: function() {
    var args = ['[7fit]'];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    console.error.apply(console, args);
  }
};
