/**
 * SSE Utility
 * 处理 Server-Sent Events 响应
 */

import { Response } from 'express';
import type { StreamEvent } from '../agents/streamEvents';

/**
 * 配置 Express Response 为 SSE 模式
 */
export function setupSSEResponse(res: Response): Response {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // 禁用 nginx 缓冲
  res.flushHeaders(); // 立即发送初始 header
  return res;
}

/**
 * 发送 SSE 事件
 */
export function sendSSEEvent(res: Response, event: StreamEvent): void {
  const data = JSON.stringify(event);
  res.write(`data: ${data}\n\n`);
}

/**
 * 发送多个 SSE 事件
 */
export function sendSSEEvents(res: Response, events: StreamEvent[]): void {
  for (const event of events) {
    sendSSEEvent(res, event);
  }
}

/**
 * 结束 SSE 连接
 */
export function endSSE(res: Response): void {
  res.write('data: {"type":"done"}\n\n');
  res.end();
}

/**
 * 发送错误并结束
 */
export function sendSSEError(res: Response, message: string): void {
  res.write(`data: ${JSON.stringify({ type: 'error', message })}\n\n`);
  res.end();
}

/**
 * 保持连接心跳（可选）
 */
export function sendSSEPing(res: Response): void {
  res.write(': ping\n\n');
}