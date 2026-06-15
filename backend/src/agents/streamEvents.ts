/**
 * Stream Events Types
 * 定义流式响应的事件类型
 */

export type StreamEvent =
  | { type: 'start'; traceId?: string }
  | { type: 'vision_start' }
  | { type: 'vision_done'; analysisPreview?: string }
  | { type: 'vision_error'; message: string }
  | { type: 'thinking' }
  | { type: 'token'; delta: string }
  | { type: 'tool_call'; tool: string }
  | { type: 'tool_result'; tool: string; success: boolean; preview?: string }
  | { type: 'final'; toolData?: any; visionError?: string }
  | { type: 'done' }
  | { type: 'error'; message: string };

/**
 * 判断是否为流式 token 事件
 */
export function isTokenEvent(event: StreamEvent): event is { type: 'token'; delta: string } {
  return event.type === 'token';
}

/**
 * 判断是否为结束事件
 */
export function isEndEvent(event: StreamEvent): boolean {
  return event.type === 'done' || event.type === 'error' || event.type === 'final';
}