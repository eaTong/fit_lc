import { guardToolCall, UserRole } from '../../../../src/agents/security/toolGuard';

describe('toolGuard', () => {
  describe('whitelist', () => {
    it('normal role can use normal tools', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '2024-01-01',
        exercises: [{ name: '俯卧撑', sets: 3, reps: 10 }]
      });
      expect(result.allowed).toBe(true);
    });

    it('normal role cannot use admin tools', () => {
      const result = guardToolCall('normal', 'admin_export_data', {});
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('not in whitelist');
    });

    it('admin role can use all tools', () => {
      const result = guardToolCall('admin', 'admin_export_data', {});
      expect(result.allowed).toBe(true);
    });

    it('unknown tool returns false', () => {
      const result = guardToolCall('normal', 'unknown_tool', {});
      expect(result.allowed).toBe(false);
    });
  });

  describe('parameter ranges', () => {
    it('valid params pass', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '2024-01-01',
        exercises: [{ name: '俯卧撑', sets: 3, reps: 10, weight: 50 }]
      });
      expect(result.allowed).toBe(true);
    });

    it('out of range params are blocked', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '2024-01-01',
        exercises: [{ name: '俯卧撑', sets: 3, reps: 2000 }] // 超过 max 1000
      });
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('param out of range');
    });

    it('invalid date format is blocked', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '01-01-2024',
        exercises: [{ name: '俯卧撑' }]
      });
      expect(result.allowed).toBe(false);
    });

    it('negative weight is blocked', () => {
      const result = guardToolCall('normal', 'save_workout', {
        date: '2024-01-01',
        exercises: [{ name: '俯卧撑', weight: -10 }]
      });
      expect(result.allowed).toBe(false);
    });

    it('exceeds max exercises is blocked', () => {
      const exercises = Array.from({ length: 51 }, (_, i) => ({ name: `动作${i}` }));
      const result = guardToolCall('normal', 'save_workout', {
        date: '2024-01-01',
        exercises
      });
      expect(result.allowed).toBe(false);
    });
  });

  describe('normalized output', () => {
    it('normalizes valid input', () => {
      const result = guardToolCall('normal', 'save_measurement', {
        date: '2024-01-01',
        measurements: [{ part: '胸围', value: 100, unit: 'cm' }]
      });
      expect(result.normalizedArgs).toBeDefined();
      expect(result.normalizedArgs.measurements[0].value).toBe(100);
    });
  });
});