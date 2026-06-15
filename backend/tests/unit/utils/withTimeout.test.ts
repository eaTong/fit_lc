import { describe, it, expect } from '@jest/globals';
import { withTimeout, TimeoutError } from '../../../src/utils/withTimeout';

describe('withTimeout', () => {
  it('在 timeout 之内 resolve 应正常返回', async () => {
    const result = await withTimeout(
      new Promise((res) => setTimeout(() => res('ok'), 50)),
      200,
      'op-A'
    );
    expect(result).toBe('ok');
  });

  it('超过 timeout 应抛 TimeoutError', async () => {
    await expect(
      withTimeout(
        new Promise((res) => setTimeout(() => res('late'), 300)),
        100,
        'op-B'
      )
    ).rejects.toBeInstanceOf(TimeoutError);
  });

  it('TimeoutError 应包含 operationLabel', async () => {
    try {
      await withTimeout(new Promise(() => {}), 50, 'agent-call');
    } catch (e: any) {
      expect(e).toBeInstanceOf(TimeoutError);
      expect(e.message).toContain('agent-call');
      expect(e.operationLabel).toBe('agent-call');
    }
  });
});
