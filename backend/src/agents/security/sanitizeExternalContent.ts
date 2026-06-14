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
  { pattern: /忽略\s*(?:以上|前面|之前)[^。\n]*指令/gi, label: 'ignore-prev-zh' },
  { pattern: /ignore\s+(?:all\s+)?(?:previous|prior|above)\s+instructions?/gi, label: 'ignore-prev-en' },
  { pattern: /you\s+are\s+now\s+(?:in|a|an)\s+\w+(?:\s+mode)?/gi, label: 'role-override-en' },
  { pattern: /(?:^|\n)\s*(?:system|系统|assistant|助手)\s*[:：]/gi, label: 'role-prefix' },
  { pattern: /```\s*(?:system|系统)/gi, label: 'system-fence' },
  { pattern: /reveal\s+(?:the\s+)?system\s+prompt/gi, label: 'reveal-prompt-en' },
  { pattern: /(?:把|将)\s*(?:系统提示|system\s*prompt)/gi, label: 'reveal-prompt-zh' },
  { pattern: /developer\s+mode/gi, label: 'devmode' },
  { pattern: /jail\s*break/gi, label: 'jailbreak' },
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
