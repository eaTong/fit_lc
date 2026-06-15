import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import type { Response } from 'express';
import {
  setupSSEResponse,
  sendSSEEvent,
  sendSSEEvents,
  endSSE,
  sendSSEError,
  sendSSEPing,
} from '../../../src/utils/sse';
import { isTokenEvent, isEndEvent, type StreamEvent } from '../../../src/agents/streamEvents';

/**
 * Mock Express Response for SSE testing
 */
function createMockResponse(): Response {
  const headers: Record<string, string> = {};
  const writes: string[] = [];
  let ended = false;

  const res = {
    setHeader: jest.fn((name: string, value: string) => {
      headers[name] = value;
      return res;
    }),
    flushHeaders: jest.fn(),
    write: jest.fn((chunk: string) => {
      writes.push(chunk);
      return true;
    }),
    end: jest.fn(() => {
      ended = true;
      return res;
    }),
    getHeader: (name: string) => headers[name],
    getAllWrites: () => writes.join(''),
    isEnded: () => ended,
  };

  return res as unknown as Response;
}

describe('SSE Utility', () => {
  describe('setupSSEResponse', () => {
    it('should set all required SSE headers', () => {
      const res = createMockResponse();
      setupSSEResponse(res);
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/event-stream');
      expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-cache');
      expect(res.setHeader).toHaveBeenCalledWith('Connection', 'keep-alive');
      expect(res.setHeader).toHaveBeenCalledWith('X-Accel-Buffering', 'no');
    });

    it('should call flushHeaders to send headers immediately', () => {
      const res = createMockResponse();
      setupSSEResponse(res);
      expect(res.flushHeaders).toHaveBeenCalled();
    });

    it('should return the response object for chaining', () => {
      const res = createMockResponse();
      const result = setupSSEResponse(res);
      expect(result).toBe(res);
    });
  });

  describe('sendSSEEvent', () => {
    it('should serialize event to JSON with SSE format', () => {
      const res = createMockResponse();
      sendSSEEvent(res, { type: 'start' });
      expect(res.write).toHaveBeenCalledWith('data: {"type":"start"}\n\n');
    });

    it('should serialize token event with delta', () => {
      const res = createMockResponse();
      sendSSEEvent(res, { type: 'token', delta: '你好' });
      expect(res.write).toHaveBeenCalledWith('data: {"type":"token","delta":"你好"}\n\n');
    });

    it('should serialize error event with message', () => {
      const res = createMockResponse();
      sendSSEEvent(res, { type: 'error', message: 'failed' });
      expect(res.write).toHaveBeenCalledWith('data: {"type":"error","message":"failed"}\n\n');
    });

    it('should end with double newline (SSE spec)', () => {
      const res = createMockResponse();
      sendSSEEvent(res, { type: 'thinking' });
      const call = (res.write as jest.Mock).mock.calls[0][0];
      expect(call).toMatch(/\n\n$/);
    });

    it('should start with "data: " prefix', () => {
      const res = createMockResponse();
      sendSSEEvent(res, { type: 'done' });
      const call = (res.write as jest.Mock).mock.calls[0][0];
      expect(call).toMatch(/^data: /);
    });
  });

  describe('sendSSEEvents', () => {
    it('should write each event in order', () => {
      const res = createMockResponse();
      sendSSEEvents(res, [
        { type: 'start' },
        { type: 'thinking' },
        { type: 'token', delta: 'hi' },
        { type: 'done' },
      ]);
      const writeCalls = (res.write as jest.Mock).mock.calls.map(c => c[0]);
      expect(writeCalls).toHaveLength(4);
      expect(writeCalls[0]).toContain('"start"');
      expect(writeCalls[1]).toContain('"thinking"');
      expect(writeCalls[2]).toContain('"hi"');
      expect(writeCalls[3]).toContain('"done"');
    });

    it('should handle empty array', () => {
      const res = createMockResponse();
      sendSSEEvents(res, []);
      expect(res.write).not.toHaveBeenCalled();
    });
  });

  describe('endSSE', () => {
    it('should write done event and end response', () => {
      const res = createMockResponse();
      endSSE(res);
      expect(res.write).toHaveBeenCalledWith('data: {"type":"done"}\n\n');
      expect(res.end).toHaveBeenCalled();
    });

    it('should mark response as ended', () => {
      const res = createMockResponse();
      endSSE(res);
      expect((res as any).isEnded()).toBe(true);
    });
  });

  describe('sendSSEError', () => {
    it('should write error event and end response', () => {
      const res = createMockResponse();
      sendSSEError(res, '网络错误');
      expect(res.write).toHaveBeenCalledWith('data: {"type":"error","message":"网络错误"}\n\n');
      expect(res.end).toHaveBeenCalled();
    });

    it('should escape message in JSON', () => {
      const res = createMockResponse();
      sendSSEError(res, 'Error: "connection failed"');
      const call = (res.write as jest.Mock).mock.calls[0][0];
      // JSON.stringify should handle quotes
      expect(call).toContain('\\"connection failed\\"');
    });
  });

  describe('sendSSEPing', () => {
    it('should write SSE comment as heartbeat', () => {
      const res = createMockResponse();
      sendSSEPing(res);
      expect(res.write).toHaveBeenCalledWith(': ping\n\n');
    });

    it('should NOT end the response (ping is a heartbeat)', () => {
      const res = createMockResponse();
      sendSSEPing(res);
      expect(res.end).not.toHaveBeenCalled();
    });

    it('should use SSE comment syntax (starts with :)', () => {
      const res = createMockResponse();
      sendSSEPing(res);
      const call = (res.write as jest.Mock).mock.calls[0][0] as string;
      expect(call.startsWith(':')).toBe(true);
    });
  });

  describe('SSE protocol compliance', () => {
    it('all event writes follow data: prefix + JSON + double newline', () => {
      const res = createMockResponse();
      const events: StreamEvent[] = [
        { type: 'start', traceId: 'abc' },
        { type: 'vision_start' },
        { type: 'vision_done', analysisPreview: 'see' },
        { type: 'vision_error', message: 'err' },
        { type: 'thinking' },
        { type: 'token', delta: 'x' },
        { type: 'tool_call', tool: 'save_workout' },
        { type: 'tool_result', tool: 't', success: true, preview: 'p' },
        { type: 'final', toolData: { id: 1 }, visionError: undefined },
      ];
      sendSSEEvents(res, events);
      const writes = (res.write as jest.Mock).mock.calls.map(c => c[0]);
      writes.forEach(w => {
        expect(w).toMatch(/^data: \{/);
        expect(w).toMatch(/\}\n\n$/);
      });
    });
  });
});

describe('Stream Event Helpers', () => {
  describe('isTokenEvent', () => {
    it('returns true for token events', () => {
      expect(isTokenEvent({ type: 'token', delta: 'a' })).toBe(true);
    });

    it('returns false for non-token events', () => {
      expect(isTokenEvent({ type: 'start' })).toBe(false);
      expect(isTokenEvent({ type: 'thinking' })).toBe(false);
      expect(isTokenEvent({ type: 'done' })).toBe(false);
    });
  });

  describe('isEndEvent', () => {
    it('returns true for done events', () => {
      expect(isEndEvent({ type: 'done' })).toBe(true);
    });

    it('returns true for error events', () => {
      expect(isEndEvent({ type: 'error', message: 'x' })).toBe(true);
    });

    it('returns true for final events', () => {
      expect(isEndEvent({ type: 'final' })).toBe(true);
    });

    it('returns false for stream events', () => {
      expect(isEndEvent({ type: 'start' })).toBe(false);
      expect(isEndEvent({ type: 'token', delta: 'x' })).toBe(false);
      expect(isEndEvent({ type: 'thinking' })).toBe(false);
    });
  });
});

describe('Stream Event Type Safety', () => {
  it('token event requires delta field', () => {
    const event: StreamEvent = { type: 'token', delta: 'hi' };
    if (event.type === 'token') {
      expect(event.delta).toBe('hi');
    }
  });

  it('error event requires message field', () => {
    const event: StreamEvent = { type: 'error', message: 'failed' };
    if (event.type === 'error') {
      expect(event.message).toBe('failed');
    }
  });

  it('tool_result event has success boolean', () => {
    const event: StreamEvent = { type: 'tool_result', tool: 't', success: true };
    if (event.type === 'tool_result') {
      expect(event.success).toBe(true);
      expect(event.tool).toBe('t');
    }
  });
});