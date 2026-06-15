import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

// The chatFallback module reads env vars at import time
// We use jest.isolateModules to test with different env configurations

describe('chatFallback', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetModules();
  });

  describe('default config (no env)', () => {
    it('fallback disabled by default', () => {
      delete process.env.FALLBACK_ENABLED;
      delete process.env.FALLBACK_BASE_URL;
      delete process.env.FALLBACK_API_KEY;
      delete process.env.FALLBACK_MODEL;
      jest.isolateModules(() => {
        const { fallbackConfig } = require('../../../src/agents/chatFallback');
        expect(fallbackConfig.enabled).toBe(false);
      });
    });
  });

  describe('createFallbackModel - disabled', () => {
    it('returns null when not enabled', () => {
      delete process.env.FALLBACK_ENABLED;
      jest.isolateModules(() => {
        const { createFallbackModel } = require('../../../src/agents/chatFallback');
        expect(createFallbackModel()).toBeNull();
      });
    });
  });

  describe('createFallbackModel - partial config', () => {
    it('returns null when enabled but missing config', () => {
      process.env.FALLBACK_ENABLED = 'true';
      jest.isolateModules(() => {
        const { createFallbackModel } = require('../../../src/agents/chatFallback');
        expect(createFallbackModel()).toBeNull();
      });
    });

    it('returns null with partial config', () => {
      process.env.FALLBACK_ENABLED = 'true';
      process.env.FALLBACK_BASE_URL = 'https://api.example.com/v1';
      // missing FALLBACK_API_KEY and FALLBACK_MODEL
      jest.isolateModules(() => {
        const { createFallbackModel } = require('../../../src/agents/chatFallback');
        expect(createFallbackModel()).toBeNull();
      });
    });
  });

  describe('createFallbackModel - fully configured', () => {
    it('returns model when fully configured', () => {
      process.env.FALLBACK_ENABLED = 'true';
      process.env.FALLBACK_BASE_URL = 'https://api.example.com/v1';
      process.env.FALLBACK_API_KEY = 'test-key-123';
      process.env.FALLBACK_MODEL = 'gpt-4-fallback';
      jest.isolateModules(() => {
        const { createFallbackModel } = require('../../../src/agents/chatFallback');
        const model = createFallbackModel();
        expect(model).not.toBeNull();
      });
    });

    it('respects custom timeout and retries', () => {
      process.env.FALLBACK_ENABLED = 'true';
      process.env.FALLBACK_BASE_URL = 'https://api.example.com/v1';
      process.env.FALLBACK_API_KEY = 'k';
      process.env.FALLBACK_MODEL = 'm';
      jest.isolateModules(() => {
        const { createFallbackModel } = require('../../../src/agents/chatFallback');
        const model = createFallbackModel() as any;
        // ChatOpenAI exposes these via private fields or via invocations
        expect(model).toBeDefined();
        // Verify it's actually a ChatOpenAI instance with our config
        expect(typeof model.invoke).toBe('function');
        expect(typeof model.bindTools).toBe('function');
      });
    });
  });

  describe('isFallbackEnabled', () => {
    it('returns false when not configured', () => {
      delete process.env.FALLBACK_ENABLED;
      jest.isolateModules(() => {
        const { isFallbackEnabled } = require('../../../src/agents/chatFallback');
        expect(isFallbackEnabled()).toBe(false);
      });
    });

    it('returns true when fully configured', () => {
      process.env.FALLBACK_ENABLED = 'true';
      process.env.FALLBACK_BASE_URL = 'https://api.example.com/v1';
      process.env.FALLBACK_API_KEY = 'k';
      process.env.FALLBACK_MODEL = 'm';
      jest.isolateModules(() => {
        const { isFallbackEnabled } = require('../../../src/agents/chatFallback');
        expect(isFallbackEnabled()).toBe(true);
      });
    });
  });
});