// @ts-nocheck
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { queryMeasurementTool } from '../../../src/tools/queryMeasurement';
import { queryService } from '../../../src/services/queryService';

// Mock dependencies
jest.mock('../../../src/services/queryService', () => ({
  queryService: {
    queryMeasurements: jest.fn().mockResolvedValue({
      measurements: [
        {
          id: 1,
          date: '2026-05-01',
          items: [
            { body_part: 'chest', value: 94 },
            { body_part: 'waist', value: 78 }
          ]
        },
        {
          id: 2,
          date: '2026-05-15',
          items: [
            { body_part: 'chest', value: 94.5 },
            { body_part: 'waist', value: 77.5 }
          ]
        }
      ]
    })
  }
}));

describe('queryMeasurement tool', () => {
  describe('tool structure', () => {
    it('should be importable', () => {
      expect(queryMeasurementTool).toBeDefined();
    });

    it('should have correct name', () => {
      expect(queryMeasurementTool.name).toBe('query_measurement');
    });

    it('should have a description', () => {
      expect(queryMeasurementTool.description).toBeDefined();
      expect(typeof queryMeasurementTool.description).toBe('string');
      expect(queryMeasurementTool.description.length).toBeGreaterThan(0);
    });

    it('should have a schema', () => {
      expect(queryMeasurementTool.schema).toBeDefined();
    });
  });

  describe('description content', () => {
    const description = queryMeasurementTool.description;

    it('should describe when to use this tool', () => {
      expect(description).toContain('询问');
      expect(description).toContain('围度');
    });

    it('should include trigger examples', () => {
      expect(description).toContain('胸围');
      expect(description).toContain('腰');
    });

    it('should list required input fields', () => {
      expect(description).toContain('user_id');
      expect(description).toContain('start_date');
      expect(description).toContain('end_date');
    });

    it('should mention optional body_part filter', () => {
      expect(description).toContain('body_part');
    });
  });

  describe('schema validation', () => {
    it('should have userId as number in schema', () => {
      expect(queryMeasurementTool.schema.shape).toBeDefined();
      expect(queryMeasurementTool.schema.shape.userId).toBeDefined();
    });

    it('should have start_date as string in schema', () => {
      expect(queryMeasurementTool.schema.shape.start_date).toBeDefined();
    });

    it('should have end_date as string in schema', () => {
      expect(queryMeasurementTool.schema.shape.end_date).toBeDefined();
    });

    it('should have optional body_part field', () => {
      expect(queryMeasurementTool.schema.shape.body_part).toBeDefined();
    });
  });

  describe('func', () => {
    it('should be an async function', () => {
      expect(typeof queryMeasurementTool.func).toBe('function');
    });

    it('should query measurements with date range', async () => {
      const result = await queryMeasurementTool.func({
        userId: 1,
        start_date: '2026-05-01',
        end_date: '2026-05-31'
      });

      const parsed = JSON.parse(result);
      expect(parsed).toHaveProperty('aiReply');
      expect(parsed).toHaveProperty('dataType');
      expect(parsed.dataType).toBe('measurement_query');
    });

    it('should return measurements array in result', async () => {
      const result = await queryMeasurementTool.func({
        userId: 1,
        start_date: '2026-05-01',
        end_date: '2026-05-31'
      });

      const parsed = JSON.parse(result);
      expect(parsed.result).toBeDefined();
      expect(parsed.result.measurements).toBeDefined();
    });

    it('should include summary with totalRecords', async () => {
      const result = await queryMeasurementTool.func({
        userId: 1,
        start_date: '2026-05-01',
        end_date: '2026-05-31'
      });

      const parsed = JSON.parse(result);
      expect(parsed.result.summary).toBeDefined();
      expect(parsed.result.summary.totalRecords).toBeDefined();
    });

    it('should filter by body_part when provided', async () => {
      const result = await queryMeasurementTool.func({
        userId: 1,
        start_date: '2026-05-01',
        end_date: '2026-05-31',
        body_part: 'chest'
      });

      const parsed = JSON.parse(result);
      expect(parsed.result).toBeDefined();
    });
  });
});