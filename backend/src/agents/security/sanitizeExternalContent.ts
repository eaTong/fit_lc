/**
 * 外部内容（vision 解析、历史消息、未来的 RAG 文档）注入前的清理工具。
 *
 * 设计原则：
 * 1. 转义 XML 特殊字符，保证标签边界不被攻击者跨越
 * 2. 中和（不删除）已知的指令短语，把它们变成可见但无害的标记
 * 3. 不破坏正常文本的可读性 — 让 LLM 仍能理解事实描述
 */

const XML_ESCAPE: Record<string, string> = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&apos;',
};

export function escapeXml(input: string): string {
  return input.replace(/[<>&"']/g, (ch) => XML_ESCAPE[ch] ?? ch);
}

/**
 * 已知的指令短语 — 按"出现即可疑"原则匹配；命中后替换为可见标记，
 * 既能告知 LLM "这里有可疑指令"，又不让指令本身被理解为命令。
 */
const INJECTION_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  // 中文指令
  { pattern: /忽略\s*(?:以上|前面|之前)[^。\n]*指令/gi, label: 'ignore-prev-zh' },
  { pattern: /(?:把|将)\s*(?:系统提示|system\s*prompt)/gi, label: 'reveal-prompt-zh' },
  { pattern: /无视\s*(?:以上|前面|之前)[^。\n]*/gi, label: 'ignore-prev-alt-zh' },
  { pattern: /不要管\s*(?:以上|前面|之前)[^。\n]*/gi, label: 'disregard-zh' },
  { pattern: /照我\s*说\s*的\s*做/gi, label: 'do-as-i-say-zh' },

  // 英文指令
  { pattern: /ignore\s+(?:all\s+)?(?:previous|prior|above)\s+instructions?/gi, label: 'ignore-prev-en' },
  { pattern: /you\s+are\s+now\s+(?:in|a|an)\s+\w+(?:\s+mode)?/gi, label: 'role-override-en' },
  { pattern: /reveal\s+(?:the\s+)?system\s+prompt/gi, label: 'reveal-prompt-en' },
  { pattern: /developer\s+mode/gi, label: 'devmode' },
  { pattern: /jail\s*break/gi, label: 'jailbreak' },
  { pattern: /new\s+instructions?/gi, label: 'new-instructions' },
  { pattern: /disregard\s+(?:all\s+)?(?:previous|prior)/gi, label: 'disregard-en' },
  { pattern: /forget\s+(?:everything|all\s+)/gi, label: 'forget-en' },
  { pattern: /override\s+(?:your\s+)?instructions/gi, label: 'override-en' },
  { pattern: /ignore\s+directive/gi, label: 'ignore-directive' },

  // 角色扮演/前缀
  { pattern: /(?:^|\n)\s*(?:system|系统|assistant|助手)\s*[:：]/gi, label: 'role-prefix' },
  { pattern: /```\s*(?:system|系统)/gi, label: 'system-fence' },
  { pattern: /^\s*>>>.*system/gi, label: 'arrow-prefix' },
  { pattern: /\[system\]/gi, label: 'bracket-prefix' },

  // Base64 编码指令
  { pattern: /(?:[A-Za-z0-9+/]{40,}={0,2})/g, label: 'base64-encoded' },

  // 全角字符混淆
  { pattern: /[ｓｙｓｔｅｍ]/g, label: 'fullwidth-chars' },

  // 注释分隔符
  { pattern: /<!--[\s\S]*?-->/g, label: 'html-comment' },
  { pattern: /\/\*[\s\S]*?\*\//g, label: 'js-comment' },
  { pattern: /#--[\s\S]*?--#/g, label: 'hash-comment' },

  // 参数拆分（token 分割）
  { pattern: /#[a-zA-Z_\-]+/g, label: 'param-split' },

  // 零宽字符
  { pattern: /(?:s\x20s\x20t\x20e\x20m|s\xC2\xA0system)/gi, label: 'zero-width-space' },

  // 空格分隔
  { pattern: /(?:s y s t e m)/gi, label: 'space-split' },

  // 特殊组合
  { pattern: /(?: DAN|i have a friend)/gi, label: 'dan-style' },
  { pattern: /drop\s+(?:the\s+)?act/gi, label: 'drop-act' },
  { pattern: /pretend\s+(?:to\s+)?be/gi, label: 'pretend' },

  // 重复/模板
  { pattern: /(?:repeat|echo)\s+(?:the\s+)?above/gi, label: 'repeat-above' },
  { pattern: /output\s+(?:everything|all)/gi, label: 'output-all' },
  { pattern: /list\s+(?:your\s+)?instructions/gi, label: 'list-instructions' },

  // 变体
  { pattern: /roleplay\s+as/gi, label: 'roleplay' },
  { pattern: /act\s+(?:as\s+)?if/gi, label: 'act-as' },
  { pattern: /simulation\s+mode/gi, label: 'simulation-mode' },
  { pattern: /test\s+mode/gi, label: 'test-mode' },
  { pattern: /debug\s+mode/gi, label: 'debug-mode' },
];

export function neutralizeInjectionPhrases(input: string): string {
  let out = input;
  for (const { pattern, label } of INJECTION_PATTERNS) {
    out = out.replace(pattern, (match) => `[neutralized:${label}:"${match.slice(0, 24).replace(/"/g, "'")}"]`);
  }
  return out;
}

/**
 * 主入口：转义 + 中和指令短语
 */
export function sanitizeExternalContent(input: string): string {
  if (!input) return '';
  return escapeXml(neutralizeInjectionPhrases(input));
}

export interface WrapOptions {
  tag: 'image_description' | 'external_content' | 'history_message';
  source: string; // e.g. 'vision-model:glm-4v-flash' or 'user-message-history'
}

/**
 * 用 XML 标签包裹外部内容，标签内做 sanitize；
 * 标签本身永远不在 sanitize 范围内（保证主 LLM 能正确识别边界）。
 */
export function wrapAsExternalContent(content: string, opts: WrapOptions): string {
  const safeContent = sanitizeExternalContent(content);
  const sourceAttr = escapeXml(opts.source);
  return `<${opts.tag} source="${sourceAttr}" trust="external-data">\n${safeContent}\n</${opts.tag}>`;
}
