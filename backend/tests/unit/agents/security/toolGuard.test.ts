import { describe, it, expect } from '@jest/globals';
import { guardToolCall, UserRole } from '../../../../src/agents/security/toolGuard';

describe('toolGuard', () => {
  describe('whitelist - normal role', () => {
    it('normal role can use save_workout (whitelist pass)', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '2024-01-01',
        exercises: [{ name: '俯卧撑' }],
      });
      expect(result.allowed).toBe(true);
    });

    it('normal role can use save_measurement', () => {
      const result = guardToolCall('normal', 'save_measurement', {
        date: '2024-01-01',
        measurements: [{ part: '胸围', value: 100 }],
      });
      expect(result.allowed).toBe(true);
    });

    it('normal role can use query_workout (no args required)', () => {
      const result = guardToolCall('normal', 'query_workout', {});
      expect(result.allowed).toBe(true);
    });

    it('normal role can use analyze_execution (no args required)', () => {
      const result = guardToolCall('normal', 'analyze_execution', { planId: 1 });
      expect(result.allowed).toBe(true);
    });

    it('normal role cannot use admin_export_data', () => {
      const result = guardToolCall('normal', 'admin_export_data', {});
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('not in whitelist');
    });

    it('normal role cannot use unknown tool', () => {
      const result = guardToolCall('normal', 'hacker_tool', {});
      expect(result.allowed).toBe(false);
    });

    it('case sensitive: SAVE_WORKOUT not in whitelist', () => {
      const result = guardToolCall('normal', 'SAVE_WORKOUT', {});
      expect(result.allowed).toBe(false);
    });
  });

  describe('whitelist - admin role', () => {
    it('admin can use admin_export_data', () => {
      const result = guardToolCall('admin', 'admin_export_data', {});
      expect(result.allowed).toBe(true);
    });

    it('admin can use save_workout', () => {
      const result = guardToolCall('admin', 'save_workout', {
        date: '2024-01-01',
        exercises: [{ name: '俯卧撑' }],
      });
      expect(result.allowed).toBe(true);
    });
  });

  describe('save_workout parameter validation', () => {
    const validArgs = {
      date: '2024-01-01',
      exercises: [{ name: '俯卧撑', sets: 3, reps: 10, weight: 50 }],
    };

    it('valid args pass', () => {
      const result = guardToolCall('normal', 'save_workout', validArgs);
      expect(result.allowed).toBe(true);
      expect(result.normalizedArgs).toBeDefined();
    });

    it('exercises must be an array', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '2024-01-01',
        exercises: 'not-array',
      });
      expect(result.allowed).toBe(false);
    });

    it('exercises cannot be empty', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '2024-01-01',
        exercises: [],
      });
      expect(result.allowed).toBe(false);
    });

    it('reps > 1000 is blocked', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '2024-01-01',
        exercises: [{ name: '俯卧撑', reps: 2000 }],
      });
      expect(result.allowed).toBe(false);
    });

    it('sets > 50 is blocked', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '2024-01-01',
        exercises: [{ name: '俯卧撑', sets: 100 }],
      });
      expect(result.allowed).toBe(false);
    });

    it('weight > 1000kg is blocked (suspicious)', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '2024-01-01',
        exercises: [{ name: '深蹲', weight: 9999 }],
      });
      expect(result.allowed).toBe(false);
    });

    it('weight = 0 is allowed (bodyweight)', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '2024-01-01',
        exercises: [{ name: '俯卧撑', weight: 0 }],
      });
      expect(result.allowed).toBe(true);
    });

    it('name > 100 chars is blocked', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '2024-01-01',
        exercises: [{ name: 'x'.repeat(200) }],
      });
      expect(result.allowed).toBe(false);
    });

    it('invalid date format is blocked', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '01-01-2024',
        exercises: [{ name: '俯卧撑' }],
      });
      expect(result.allowed).toBe(false);
    });

    it('missing date is blocked', () => {
      const result = guardToolCall('normal', 'save_workout', {
        exercises: [{ name: '俯卧撑' }],
      });
      expect(result.allowed).toBe(false);
    });
  });

  describe('save_measurement parameter validation', () => {
    it('valid measurement passes', () => {
      const result = guardToolCall('normal', 'save_measurement', {
        date: '2024-01-01',
        measurements: [{ part: '胸围', value: 100, unit: 'cm' }],
      });
      expect(result.allowed).toBe(true);
    });

    it('value > 500 is blocked', () => {
      const result = guardToolCall('normal', 'save_measurement', {
        date: '2024-01-01',
        measurements: [{ part: '胸围', value: 9999 }],
      });
      expect(result.allowed).toBe(false);
    });

    it('negative value is blocked', () => {
      const result = guardToolCall('normal', 'save_measurement', {
        date: '2024-01-01',
        measurements: [{ part: '胸围', value: -10 }],
      });
      expect(result.allowed).toBe(false);
    });

    it('invalid unit is blocked', () => {
      const result = guardToolCall('normal', 'save_measurement', {
        date: '2024-01-01',
        measurements: [{ part: '胸围', value: 100, unit: 'inches' }],
      });
      expect(result.allowed).toBe(false);
    });
  });

  describe('query tools', () => {
    it('query_workout allows empty params', () => {
      const result = guardToolCall('normal', 'query_workout', {});
      expect(result.allowed).toBe(true);
    });

    it('query_workout allows date range', () => {
      const result = guardToolCall('normal', 'query_workout', {
        start_date: '2024-01-01',
        end_date: '2024-12-31',
        exercise_type: '深蹲',
      });
      expect(result.allowed).toBe(true);
    });

    it('query_measurement allows empty params', () => {
      const result = guardToolCall('normal', 'query_measurement', {});
      expect(result.allowed).toBe(true);
    });
  });

  describe('unknown tools fallback', () => {
    it('tool with no validator returns args as-is', () => {
      const result = guardToolCall('normal', 'analyze_execution', { planId: 1 });
      expect(result.allowed).toBe(true);
      expect(result.normalizedArgs).toEqual({ planId: 1 });
    });
  });

  describe('return shape', () => {
    it('denied result has reason', () => {
      const result = guardToolCall('normal', 'admin_export_data', {});
      expect(result.allowed).toBe(false);
      expect(result.reason).toBeDefined();
      expect(typeof result.reason).toBe('string');
    });

    it('allowed result has normalizedArgs', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '2024-01-01',
        exercises: [{ name: '俯卧撑' }],
      });
      expect(result.allowed).toBe(true);
      expect(result.normalizedArgs).toBeDefined();
    });
  });
});