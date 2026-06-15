/**
 * Stream Chunker
 * 文本流式分块工具
 */

/**
 * 按句子/段落 chunk 文本
 */
export function* chunkBySentence(text: string, chunkSize: number = 20): Generator<string> {
  if (!text) return;

  // 按标点分割
  const sentences = text.split(/([。！？；\n])/);
  let buffer = '';

  for (const part of sentences) {
    if (/[。！？；\n]/.test(part)) {
      // 标点符号，加入并 yield
      buffer += part;
      if (buffer.length >= chunkSize) {
        yield buffer;
        buffer = '';
      } else {
        yield buffer;
        buffer = '';
      }
    } else {
      buffer += part;
      if (buffer.length >= chunkSize) {
        yield buffer;
        buffer = '';
      }
    }
  }

  // 剩余
  if (buffer) yield buffer;
}

/**
 * Sleep utility
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}