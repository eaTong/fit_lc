// @ts-nocheck
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { saveMeasurementTool } from '../../../src/tools/saveMeasurement';
import { saveService } from '../../../src/services/saveService';

// Mock dependencies
jest.mock('../../../src/services/saveService', () => ({
  saveService: {
    saveMeasurement: jest.fn().mockResolvedValue({
      id: 1,
      date: '2026-05-01',
      measurements: [{ body_part: 'chest', value: 94 }],
      message: '已保存：chest 94cm'
    })
  }
}));

jest.mock('../../../src/services/statsService', () => ({
  statsService: {
    updateAggregatedStats: jest.fn().mockResolvedValue(undefined)
  }
}));

jest.mock('../../../src/services/achievementService', () => ({
  achievementService: {
    checkBadges: jest.fn().mockResolvedValue([]),
    checkMilestones: jest.fn().mockResolvedValue([])
  }
}));

describe('saveMeasurement tool', () => {
  describe('tool structure', () => {
    it('should be importable', () => {
      expect(saveMeasurementTool).toBeDefined();
    });

    it('should have correct name', () => {
      expect(saveMeasurementTool.name).toBe('save_measurement');
    });

    it('should have a description', () => {
      expect(saveMeasurementTool.description).toBeDefined();
      expect(typeof saveMeasurementTool.description).toBe('string');
      expect(saveMeasurementTool.description.length).toBeGreaterThan(0);
    });

    it('should have a schema', () => {
      expect(saveMeasurementTool.schema).toBeDefined();
    });
  });

  describe('description contains required fields', () => {
    const description = saveMeasurementTool.description;

    it('should mention date field', () => {
      expect(description).toContain('date');
    });

    it('should list supported body parts', () => {
      expect(description).toContain('chest');
      expect(description).toContain('waist');
      expect(description).toContain('hips');
      expect(description).toContain('biceps');
    });

    it('should mention weight and bodyFat', () => {
      expect(description).toContain('weight');
      expect(description).toContain('bodyFat');
    });
  });

  describe('schema validation', () => {
    it('should have date as string in schema', () => {
      expect(saveMeasurementTool.schema.shape).toBeDefined();
      expect(saveMeasurementTool.schema.shape.date).toBeDefined();
    });

    it('should have measurements as array in schema', () => {
      expect(saveMeasurementTool.schema.shape.measurements).toBeDefined();
    });

    it('should have body_part enum in schema', () => {
      const measurementsShape = saveMeasurementTool.schema.shape.measurements;
      expect(measurementsShape).toBeDefined();
    });
  });

  describe('func', () => {
    it('should be an async function', () => {
      expect(typeof saveMeasurementTool.func).toBe('function');
    });

    it('should save measurement with valid input', async () => {
      const result = await saveMeasurementTool.func({
        userId: 1,
        date: '2026-05-01',
        measurements: [{ body_part: 'chest', value: 94 }]
      });

      const parsed = JSON.parse(result);
      expect(parsed).toHaveProperty('aiReply');
      expect(parsed).toHaveProperty('dataType');
      expect(parsed.dataType).toBe('measurement');
    });

    it('should use today date when date not provided', async () => {
      const result = await saveMeasurementTool.func({
        userId: 1,
        measurements: [{ body_part: 'weight', value: 70.5 }]
      });

      const parsed = JSON.parse(result);
      expect(parsed.result).toBeDefined();
    });

    it('should return result with id and measurements', async () => {
      const result = await saveMeasurementTool.func({
        userId: 1,
        date: '2026-05-01',
        measurements: [{ body_part: 'waist', value: 78 }]
      });

      const parsed = JSON.parse(result);
      expect(parsed.result).toBeDefined();
      expect(parsed.result.id).toBeDefined();
      expect(parsed.result.measurements).toBeDefined();
    });

    it('should handle multiple measurements', async () => {
      const result = await saveMeasurementTool.func({
        userId: 1,
        date: '2026-05-01',
        measurements: [
          { body_part: 'chest', value: 94 },
          { body_part: 'waist', value: 78 },
          { body_part: 'hips', value: 96 }
        ]
      });

      const parsed = JSON.parse(result);
      expect(parsed.result.measurements).toHaveLength(3);
    });
  });
});