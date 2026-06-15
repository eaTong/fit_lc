import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { getFeatureFlagsWithDefaults, shouldUseV3 } from '../../../src/config/featureFlags';

describe('featureFlags', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.FF_USE_V3;
    delete process.env.FF_ENABLE_HITL;
    delete process.env.FF_ENABLE_CHECKPOINT;
    delete process.env.FF_V3_PERCENT;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getFeatureFlagsWithDefaults', () => {
    it('should return defaults when no env set', () => {
      const flags = getFeatureFlagsWithDefaults();
      expect(flags.useV3Agent).toBe(false);
      expect(flags.enableHitl).toBe(false);
      expect(flags.enableCheckpoint).toBe(true);
    });

    it('should respect FF_USE_V3=true', () => {
      process.env.FF_USE_V3 = 'true';
      const flags = getFeatureFlagsWithDefaults();
      expect(flags.useV3Agent).toBe(true);
    });

    it('should respect FF_ENABLE_HITL=true', () => {
      process.env.FF_ENABLE_HITL = 'true';
      const flags = getFeatureFlagsWithDefaults();
      expect(flags.enableHitl).toBe(true);
    });

    it('should respect FF_ENABLE_CHECKPOINT=false', () => {
      process.env.FF_ENABLE_CHECKPOINT = 'false';
      const flags = getFeatureFlagsWithDefaults();
      expect(flags.enableCheckpoint).toBe(false);
    });

    it('should treat non-"true" as false', () => {
      process.env.FF_USE_V3 = '1';
      const flags = getFeatureFlagsWithDefaults();
      expect(flags.useV3Agent).toBe(false);
    });
  });

  describe('shouldUseV3', () => {
    it('should return false when no flag set', () => {
      expect(shouldUseV3()).toBe(false);
    });

    it('should return true when FF_USE_V3=true', () => {
      process.env.FF_USE_V3 = 'true';
      expect(shouldUseV3()).toBe(true);
    });

    it('should override user percent when FF_USE_V3=true', () => {
      process.env.FF_USE_V3 = 'true';
      process.env.FF_V3_PERCENT = '0';
      expect(shouldUseV3(123)).toBe(true);
    });

    it('should respect percentage rollout', () => {
      process.env.FF_V3_PERCENT = '50';
      // userId 0..49 should be in
      expect(shouldUseV3(25)).toBe(true);
      // userId 50..99 should be out
      expect(shouldUseV3(75)).toBe(false);
    });

    it('should default to 0 percent', () => {
      process.env.FF_V3_PERCENT = '0';
      expect(shouldUseV3(1)).toBe(false);
    });

    it('should handle 100% rollout', () => {
      process.env.FF_V3_PERCENT = '100';
      expect(shouldUseV3(50)).toBe(true);
      expect(shouldUseV3(99)).toBe(true);
    });
  });
});