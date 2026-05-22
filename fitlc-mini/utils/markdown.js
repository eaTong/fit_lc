/**
 * Markdown 解析工具 - 用于微信小程序 rich-text
 * 支持加粗、斜体、代码、标题、分隔线
 */

/**
 * 转义 HTML 特殊字符
 */
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * 解析 Markdown 并返回 HTML 字符串
 * 用于 rich-text 组件
 */
function parseToHtml(markdown) {
  if (!markdown) return '';

  var result = escapeHtml(markdown);

  // 加粗 - 必须先处理
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/__([^_]+)__/g, '<strong>$1</strong>');

  // 斜体 - 跳过 ** 的情况
  var out = '';
  var i = 0;
  while (i < result.length) {
    if (i < result.length - 1 && result[i] === '*' && result[i + 1] === '*') {
      out += '**';
      i += 2;
    } else if (result[i] === '*') {
      var end = result.indexOf('*', i + 1);
      if (end === -1) {
        out += result[i];
        i++;
      } else {
        out += '<em>' + result.substring(i + 1, end) + '</em>';
        i = end + 1;
      }
    } else {
      out += result[i];
      i++;
    }
  }
  result = out;

  // 代码块
  result = result.replace(/「代码」([^」]+)「\/代码」/g, function(match, code) {
    return '<div class="code-block">' + code.trim() + '</div>';
  });

  // 行内代码
  result = result.replace(/『([^』]+)』/g, '<code class="inline-code">$1</code>');

  // 标题
  result = result.replace(/【标题】(.+)/g, '<h1>$1</h1>');
  result = result.replace(/【小标题】(.+)/g, '<h2>$1</h2>');
  result = result.replace(/【副标题】(.+)/g, '<h3>$1</h3>');

  // 分隔线
  result = result.replace(/──────────/g, '<hr/>');

  // 列表
  result = result.replace(/• (.+)/g, '<li>$1</li>');
  result = result.replace(/(\d+)\. (.+)/g, '<li>$2</li>');

  // 换行
  result = result.replace(/\n/g, '<br/>');

  return result;
}

module.exports = {
  parseToHtml
};