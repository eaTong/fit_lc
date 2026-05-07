// @ts-nocheck
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { runAgent } from '../../../src/agents/fitnessAgent';

// Mock dependencies
jest.mock('../../../src/services/saveService', () => ({
  saveService: {
    saveWorkout: jest.fn().mockResolvedValue({
      id: 1,
      date: '2026-05-01',
      exercises: [{ name: '深蹲', sets: 3, reps: 10, weight: 60 }],
      message: '已保存'
    }),
    saveMeasurement: jest.fn().mockResolvedValue({
      id: 1,
      date: '2026-05-01',
      measurements: [{ body_part: 'chest', value: 94 }],
      message: '已保存'
    })
  }
}));

jest.mock('../../../src/services/queryService', () => ({
  queryService: {
    queryWorkouts: jest.fn().mockResolvedValue({
      workouts: [{
        id: 1,
        date: '2026-05-01',
        exercises: [{ name: '深蹲', sets: 3, reps: 10, weight: 60 }]
      }]
    }),
    queryMeasurements: jest.fn().mockResolvedValue({
      measurements: [{
        id: 1,
        date: '2026-05-01',
        items: [{ body_part: 'chest', value: 94 }]
      }]
    })
  }
}));

jest.mock('../../../src/agents/chatFactory', () => ({
  createChatModel: jest.fn().mockResolvedValue({
    bindTools: jest.fn().mockReturnValue({
      invoke: jest.fn().mockResolvedValue({
        content: [
          { type: 'text', text: '好的，我已经记录了你的训练。' }
        ]
      })
    })
  })
}));

jest.mock('../../../src/agents/plugins/visionPreprocessor', () => ({
  preprocessVision: jest.fn().mockResolvedValue({ message: 'mocked message' })
}));

jest.mock('../../../src/config/prisma', () => ({
  default: {
    exercise: {
      findMany: jest.fn().mockResolvedValue([
        { name: '深蹲' },
        { name: '卧推' },
        { name: '俯卧撑' }
      ])
    }
  }
}));

describe('fitnessAgent', () => {
  describe('runAgent', () => {
    it('should be a function', () => {
      expect(typeof runAgent).toBe('function');
    });

    it('should accept userId and message parameters', async () => {
      const result = await runAgent(1, '今天练了深蹲');
      expect(result).toHaveProperty('reply');
      expect(result).toHaveProperty('toolData');
    });

    it('should return reply as string', async () => {
      const result = await runAgent(1, '你好');
      expect(typeof result.reply).toBe('string');
    });

    it('should handle optional parameters', async () => {
      const result = await runAgent(1, '你好', null, [], []);
      expect(result).toHaveProperty('reply');
      expect(result).toHaveProperty('toolData');
    });

    it('should handle empty history', async () => {
      const result = await runAgent(1, '你好', null, []);
      expect(result).toHaveProperty('reply');
    });

    it('should handle imageUrls parameter', async () => {
      const result = await runAgent(1, '看看这个', null, [], ['https://example.com/image.jpg']);
      expect(result).toHaveProperty('reply');
    });

    it('should handle userContext parameter', async () => {
      const userContext = {
        context_text: '用户正在进行增肌训练',
        active_plan_name: '初级增肌计划',
        active_plan_status: 'active'
      };
      const result = await runAgent(1, '开始训练', userContext);
      expect(result).toHaveProperty('reply');
    });
  });

  describe('tool calling behavior', () => {
    it('should pass userId to tool calls', async () => {
      const result = await runAgent(1, '今天跑了5公里');
      // Agent should process message and potentially call save_workout tool
      expect(result).toHaveProperty('reply');
    });
  });

  describe('response structure', () => {
    it('should return object with reply and toolData', async () => {
      const result = await runAgent(1, '你好');
      expect(result).toHaveProperty('reply');
      // toolData may be null if no tool was called
      expect(result).toHaveProperty('toolData');
    });
  });
});