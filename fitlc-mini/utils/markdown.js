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
 * 第一步：将原生 Markdown 转换为中间标记格式
 * 用于后续渲染为 HTML 或纯文本
 */
function _parseToIntermediate(mdText) {
  if (!mdText) return '';
  var result = mdText;

  // 代码块：```code``` -> 「代码」code「/代码」
  result = result.replace(/```(\w*)\n?([\s\S]*?)```/g, function(match, lang, code) {
    return '\u300C\u4EE3\u7801\u300D' + code.trim() + '\u300C/\u4EE3\u7801\u300D';
  });

  // 行内代码：`code` -> 『code』
  result = result.replace(/`([^`]+)`/g, '\u300E$1\u300F');

  // 加粗：**text** 或 __text__ -> 【text】
  result = result.replace(/\*\*([^*]+)\*\*/g, '\u3010$1\u3011');
  result = result.replace(/__([^_]+)__/g, '\u3010$1\u3011');

  // 斜体：*text* 或 _text_ -> _text_
  result = result.replace(/\*([^*]+)\*/g, '_$1_');
  result = result.replace(/_([^_]+)_/g, '_$1_');

  // 标题：# title -> 【标题】
  result = result.replace(/^### (.+)$/gm, '\u3010\u526F\u6807\u9898\u3011$1');
  result = result.replace(/^## (.+)$/gm, '\u3010\u5C0F\u6807\u9898\u3011$1');
  result = result.replace(/^# (.+)$/gm, '\u3010\u6807\u9898\u3011$1');

  // 分隔线：--- -> ───
  result = result.replace(/^---$/gm, '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  // 列表：- item -> • item
  result = result.replace(/^[\u2022\-\*] (.+)$/gm, '\u2022 $1');
  // 有序列表：1. item
  result = result.replace(/^\d+\. (.+)$/gm, '$1.');

  return result;
}

/**
 * 解析 Markdown 并返回 HTML 字符串
 * 用于 rich-text 组件
 */
function parseToHtml(markdownText) {
  if (!markdownText) return '';

  // 先转为中间格式
  var result = _parseToIntermediate(markdownText);
  // 再转义 HTML
  result = escapeHtml(result);

  // 加粗 - 必须先处理
  result = result.replace(/\u3010([^\u3011]+)\u3011/g, '<strong>$1</strong>');

  // 斜体 - 跳过 【 的情况
  var out = '';
  var i = 0;
  while (i < result.length) {
    if (i < result.length - 1 && result[i] === '\u3010' && result[i + 1] === '\u3010') {
      out += '\u3010\u3010';
      i += 2;
    } else if (result[i] === '_' && i > 0 && result[i - 1] !== '\\') {
      var end = result.indexOf('_', i + 1);
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
  result = result.replace(/\u300C\u4EE3\u7801\u300D([^\u300C]+)\u300C\/\u4EE3\u7801\u300D/g, function(match, code) {
    return '<div class="code-block">' + code.trim() + '</div>';
  });

  // 行内代码
  result = result.replace(/\u300E([^\u300F]+)\u300F/g, '<code class="inline-code">$1</code>');

  // 标题
  result = result.replace(/\u3010\u6807\u9898\u3011(.+)/g, '<h1>$1</h1>');
  result = result.replace(/\u3010\u5C0F\u6807\u9898\u3011(.+)/g, '<h2>$1</h2>');
  result = result.replace(/\u3010\u526F\u6807\u9898\u3011(.+)/g, '<h3>$1</h3>');

  // 分隔线
  result = result.replace(/\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500/g, '<hr/>');

  // 列表
  result = result.replace(/\u2022 (.+)/g, '<li>$1</li>');
  result = result.replace(/(\d+)\. (.+)/g, '<li>$2</li>');

  // 换行
  result = result.replace(/\n/g, '<br/>');

  return result;
}

/**
 * 解析 Markdown 并返回纯文本
 * 用于不需要 rich-text 渲染的场景
 */
function parseToText(markdownText) {
  if (!markdownText) return '';
  // 先转为中间格式
  var result = _parseToIntermediate(markdownText);
  return result;
}

module.exports = {
  parseToHtml,
  parseToText
};
