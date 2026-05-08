import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { cleanDatabase, createTestUser, createTestWorkout, createTestMeasurement } from '../../fixtures/factories';

// Mock auth middleware - inject req.user
let mockUserId = 1;
const mockAuth = (req: any, res: any, next: any) => {
  req.user = { id: mockUserId, email: 'test@example.com' };
  next();
};

// Mock runAgent - controls AI response based on input
// V2 uses runAgentV2, so mock that instead
jest.mock('../../../src/agents/fitnessAgentV2', () => ({
  runAgentV2: jest.fn().mockImplementation(async (userId, message, userContext, history, images) => {
    // Default mock response
    let reply = '好的，我明白了';
    let toolData = null;

    // Analyze message to determine which tool to simulate
    const msgLower = (message || '').toLowerCase();

    // === 查询相关 (优先级高于训练保存) ===
    if (msgLower.includes('这周') || msgLower.includes('上周') || msgLower.includes('查询') ||
        msgLower.includes('对比') || (msgLower.includes('训练') && msgLower.includes('多少'))) {
      toolData = {
        aiReply: '📈 训练记录查询结果\n\n共3次训练，总容量15000kg',
        dataType: 'workout_query',
        result: {
          workouts: [
            { id: 1, date: '2024-01-15', exercises: [{ name: '卧推', weight: 80, sets: 5, reps: 8 }] },
            { id: 2, date: '2024-01-13', exercises: [{ name: '深蹲', weight: 100, sets: 5, reps: 6 }] }
          ],
          summary: { totalWorkouts: 2, totalVolume: 15000, startDate: '2024-01-08', endDate: '2024-01-14' }
        }
      };
      reply = '📈 训练记录查询结果\n\n共3次训练，总容量15000kg';
    }
    // === 训练记录相关 ===
    else if (msgLower.includes('卧推') || msgLower.includes('深蹲') ||
             msgLower.includes('训练') || msgLower.includes('跑步') || msgLower.includes('hiit') ||
             (msgLower.includes('做了') && msgLower.includes('分钟'))) {
      // Check if it has complete workout info
      if (msgLower.includes('80') && msgLower.includes('5') && (msgLower.includes('组') || msgLower.includes('8'))) {
        // Complete workout info - saveWorkout tool returns success
        toolData = {
          aiReply: '训练记录已保存！今天卧推80kg 5组每组8个，总容量3200kg。继续保持！',
          dataType: 'workout',
          status: 'success',
          result: {
            id: 1,
            date: new Date().toISOString().split('T')[0],
            exercises: [{ name: '卧推', weight: 80, sets: 5, reps: 8 }],
            feedback: { personalized_comment: '继续保持！' },
            achievements: { isNewPR: false, badges: [], milestones: [] }
          }
        };
        reply = '训练记录已保存！今天卧推80kg 5组每组8个，总容量3200kg。继续保持！';
      } else if (msgLower.includes('跑步') || msgLower.includes('公里') || msgLower.includes('hiit') || msgLower.includes('有氧')) {
        // Cardio workout
        toolData = {
          aiReply: '有氧训练已记录！跑步5公里，耗时30分钟。',
          dataType: 'workout',
          status: 'success',
          result: {
            id: 2,
            exercises: [{ name: '跑步', distance: 5, duration: 30 }]
          }
        };
        reply = '有氧训练已记录！跑步5公里，耗时30分钟。';
      } else {
        // Incomplete workout info - needs more data
        toolData = {
          aiReply: '请补充训练信息：要记录卧推，需要告诉我重量、组数和每组次数。例如：卧推80kg 5组每组8个',
          dataType: 'workout',
          status: 'needs_more_info',
          missingFields: [{ field: 'reps', label: '次数' }]
        };
        reply = '请补充训练信息：要记录卧推，需要告诉我重量、组数和每组次数。例如：卧推80kg 5组每组8个';
      }
    }
    // === 围度记录相关 ===
    else if (msgLower.includes('胸围') || msgLower.includes('腰围') || msgLower.includes('体重') ||
             msgLower.includes('臂围') || msgLower.includes('大腿') || msgLower.includes('小腿') ||
             msgLower.includes('臀围')) {
      // Measurement save
      if (msgLower.includes('94') || msgLower.includes('78')) {
        toolData = {
          aiReply: '围度记录已保存！胸围94cm，腰围78cm。',
          dataType: 'measurement',
          status: 'success',
          result: {
            id: 1,
            measurements: [{ body_part: 'chest', value: 94 }, { body_part: 'waist', value: 78 }]
          }
        };
        reply = '围度记录已保存！胸围94cm，腰围78cm。';
      } else if (msgLower.includes('70') || msgLower.includes('kg')) {
        toolData = {
          aiReply: '体重记录已保存！当前体重70kg。',
          dataType: 'measurement',
          status: 'success',
          result: {
            id: 2,
            measurements: [{ body_part: 'weight', value: 70 }]
          }
        };
        reply = '体重记录已保存！当前体重70kg。';
      } else if (msgLower.includes('臂围') || msgLower.includes('大腿') || msgLower.includes('小腿')) {
        // Multiple measurements without chest/waist - use generic response
        const measurements: any[] = [];
        if (msgLower.includes('34')) measurements.push({ body_part: 'biceps', value: 34 });
        if (msgLower.includes('58')) measurements.push({ body_part: 'thighs', value: 58 });
        if (msgLower.includes('38')) measurements.push({ body_part: 'calves', value: 38 });

        if (measurements.length > 0) {
          toolData = {
            aiReply: `围度记录已保存！${measurements.map(m => `${m.body_part}${m.value}`).join('、')}。`,
            dataType: 'measurement',
            status: 'success',
            result: { id: 1, measurements }
          };
          reply = `围度记录已保存！`;
        } else {
          reply = '请告诉我具体的围度数值，例如：臂围34、大腿58、小腿38';
        }
      }
    }
    // === 计划生成相关 - 完整信息 ===
    else if ((msgLower.includes('生成计划') && msgLower.includes('增肌')) ||
             (msgLower.includes('新手') && (msgLower.includes('增肌') || msgLower.includes('计划'))) ||
             (msgLower.includes('增肌') && msgLower.includes('计划'))) {
      toolData = {
        aiReply: '健身计划已生成！\n\n计划周期：12周\n训练频率：每周4次\n目标：增肌\n经验水平：中级\n\n训练安排：\n周一：胸部+三头\n周三：背部+二头\n周五：腿部+肩部\n周日：核心+有氧',
        dataType: 'plan',
        result: {
          planId: 1,
          planName: '增肌计划',
          durationWeeks: 12,
          frequency: 4,
          goal: '增肌',
          experience: '中级',
          schedule: [
            { dayOfWeek: 1, dayName: '周一', exercises: ['杠铃卧推', '哑铃飞鸟', '三头肌下压'] },
            { dayOfWeek: 3, dayName: '周三', exercises: ['引体向上', '杠铃划船', '二头肌弯举'] }
          ]
        }
      };
      reply = '健身计划已生成！\n\n计划周期：12周\n训练频率：每周4次';
    }
    // === 计划生成相关 - 需要更多信息 ===
    else if (msgLower.includes('生成计划') || msgLower.includes('帮我') || (msgLower.includes('一周') && msgLower.includes('练'))) {
      toolData = {
        aiReply: '请提供更多信息来生成计划：您的训练目标是什么？一周想练几次？有什么器械可用？',
        dataType: 'plan',
        status: 'needs_more_info'
      };
      reply = '请提供更多信息来生成计划：您的训练目标是什么？一周想练几次？有什么器械可用？';
    }
    // === 撤销相关 ===
    else if (msgLower.includes('撤销') || msgLower.includes('撤回')) {
      reply = '消息已撤销';
    }
    // === 普通对话 ===
    else {
      reply = '好的，我明白了。有什么需要记录的告诉我！';
    }

    return { reply, toolData };
  })
}));

// Mock userContextService
jest.mock('../../../src/services/userContextService', () => ({
  userContextService: {
    getOrCreateContext: jest.fn().mockResolvedValue({}),
    refreshContextWithLock: jest.fn()
  }
}));

// Mock albumService
jest.mock('../../../src/services/albumService', () => ({
  albumService: {
    syncPhotosFromMessage: jest.fn().mockResolvedValue(undefined)
  }
}));

// Mock chatHistoryService
jest.mock('../../../src/services/chatHistoryService', () => ({
  chatHistoryService: {
    saveMessage: jest.fn().mockImplementation(async (userId, role, content, replyToId) => {
      return { id: Date.now(), userId, role, content, replyToId };
    }),
    getMessages: jest.fn().mockResolvedValue([])
  }
}));

import chatRouter from '../../../src/routes/chat';
import prisma from '../../../src/config/prisma';

describe('chat routes - AI Conversation Scenarios', () => {
  let testUser: any;
  let testWorkout: any;
  let testMeasurement: any;

  beforeAll(async () => {
    testUser = await createTestUser();
    mockUserId = testUser.id;
  });

  afterAll(async () => {
    await cleanDatabase();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean up messages but ensure user exists for each test
    await prisma.chatMessage.deleteMany({});
    // Ensure test user exists (may have been deleted by cleanDatabase from other files)
    const existingUser = await prisma.user.findUnique({ where: { id: testUser.id } });
    if (!existingUser) {
      testUser = await createTestUser();
      mockUserId = testUser.id;
    }
  });

  // Create app with auth middleware
  const app = express();
  app.use(express.json());
  app.use('/chat', mockAuth, chatRouter);

  describe('AI Tool: saveWorkout (训练记录保存)', () => {
    it('should save complete workout info (卧推80kg 5组每组8个)', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '今天卧推80kg 5组每组8个' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('reply');
      expect(res.body.reply).toContain('训练记录已保存');
      expect(res.body).toHaveProperty('toolData');
      expect(res.body.toolData.dataType).toBe('workout');
      expect(res.body.toolData.status).toBe('success');
    });

    it('should save cardio workout (跑步5公里)', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '今天跑步跑了5公里' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toContain('有氧训练已记录');
      expect(res.body.toolData.dataType).toBe('workout');
      expect(res.body.toolData.result.exercises[0]).toHaveProperty('distance', 5);
    });

    it('should ask for more info when workout data is incomplete', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '今天练了卧推' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toContain('请补充');
      expect(res.body.toolData.status).toBe('needs_more_info');
      expect(res.body.toolData.missingFields).toBeDefined();
    });

    it('should handle workout with duration (hiit 30分钟)', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '做了30分钟hiit' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toContain('有氧训练已记录');
      expect(res.body.toolData.result.exercises[0]).toHaveProperty('duration', 30);
    });
  });

  describe('AI Tool: saveMeasurement (围度记录保存)', () => {
    it('should save body measurements (胸围94 腰围78)', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '今天胸围94，腰围78' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toContain('围度记录已保存');
      expect(res.body.toolData.dataType).toBe('measurement');
      expect(res.body.toolData.result.measurements).toContainEqual(
        expect.objectContaining({ body_part: 'chest', value: 94 })
      );
      expect(res.body.toolData.result.measurements).toContainEqual(
        expect.objectContaining({ body_part: 'waist', value: 78 })
      );
    });

    it('should save weight measurement (70kg)', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '今早体重70kg' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toContain('体重记录已保存');
      expect(res.body.toolData.result.measurements).toContainEqual(
        expect.objectContaining({ body_part: 'weight', value: 70 })
      );
    });

    it('should save multiple measurements at once', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '测了一下胸围94、腰围78、臀围100' });

      expect(res.status).toBe(200);
      expect(res.body.toolData.result.measurements.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('AI Tool: queryWorkout (训练记录查询)', () => {
    it('should query workouts this week', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '这周训练了多少次？' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toContain('训练记录查询');
      expect(res.body.toolData.dataType).toBe('workout_query');
      expect(res.body.toolData.result).toHaveProperty('workouts');
      expect(res.body.toolData.result).toHaveProperty('summary');
    });

    it('should return workout summary with volume', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '对比一下这周和上周的训练' });

      expect(res.status).toBe(200);
      expect(res.body.toolData.dataType).toBe('workout_query');
      expect(res.body.toolData.result.summary).toHaveProperty('totalWorkouts');
      expect(res.body.toolData.result.summary).toHaveProperty('totalVolume');
    });
  });

  describe('AI Tool: generatePlan (计划生成)', () => {
    it('should generate plan for bulking goal', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '我是新手，想要增肌，帮我生成一个计划' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toContain('计划已生成');
      expect(res.body.toolData.dataType).toBe('plan');
      expect(res.body.toolData.result).toHaveProperty('planId');
      expect(res.body.toolData.result.schedule).toBeDefined();
    });

    it('should ask for more info when profile is incomplete', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '帮我生成一个计划' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toContain('请提供更多信息');
      expect(res.body.toolData.status).toBe('needs_more_info');
    });

    it('should generate plan with correct frequency and duration', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '我想一周练4次，12周增肌计划' });

      expect(res.status).toBe(200);
      expect(res.body.toolData.result.frequency).toBe(4);
      expect(res.body.toolData.result.durationWeeks).toBe(12);
    });
  });

  describe('Message Revocation (撤销消息)', () => {
    it('should revoke existing message', async () => {
      // Create a message first
      const msg = await prisma.chatMessage.create({
        data: { userId: testUser.id, role: 'user', content: 'Test message' }
      });

      const res = await request(app)
        .post(`/chat/revoke/${msg.id}`)
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });

    it('should return 404 for non-existent message', async () => {
      const res = await request(app)
        .post('/chat/revoke/99999')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(404);
    });

    it('should handle temporary message IDs (for optimistic UI)', async () => {
      const res = await request(app)
        .post('/chat/revoke/temp-123456-user')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Error Handling', () => {
    it('should return 400 if message is missing', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 if message is empty string', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('Chat History (聊天记录)', () => {
    it('should get chat messages for user', async () => {
      // Create some messages
      await prisma.chatMessage.createMany({
        data: [
          { userId: testUser.id, role: 'user', content: 'Hello' },
          { userId: testUser.id, role: 'assistant', content: 'Hi there!' }
        ]
      });

      const res = await request(app)
        .get('/chat/messages')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('messages');
      expect(Array.isArray(res.body.messages)).toBe(true);
    });

    it('should return empty array when no messages', async () => {
      const res = await request(app)
        .get('/chat/messages')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body.messages).toEqual([]);
    });

    it('should limit messages with query param', async () => {
      // Create 5 messages
      for (let i = 0; i < 5; i++) {
        await prisma.chatMessage.create({
          data: { userId: testUser.id, role: 'user', content: `Message ${i}` }
        });
      }

      const res = await request(app)
        .get('/chat/messages?limit=3')
        .set('Authorization', 'Bearer mock-token');

      expect(res.status).toBe(200);
      expect(res.body.messages.length).toBeLessThanOrEqual(3);
    });
  });

  describe('Mixed AI Scenarios (混合场景)', () => {
    it('should handle greeting and respond appropriately', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '你好' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('reply');
    });

    it('should handle encouragement without tool call', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '加油，我要坚持训练' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('reply');
    });

    it('should handle multiple measurements in one message', async () => {
      const res = await request(app)
        .post('/chat/message')
        .set('Authorization', 'Bearer mock-token')
        .send({ message: '臂围34、大腿58、小腿38' });

      expect(res.status).toBe(200);
      expect(res.body.toolData).toBeDefined();
      expect(res.body.toolData.result).toBeDefined();
      expect(res.body.toolData.result.measurements).toBeDefined();
      expect(res.body.toolData.result.measurements.length).toBeGreaterThanOrEqual(2);
      // Check that measurements have body_part and value
      const measurements = res.body.toolData.result.measurements;
      expect(measurements.some((m: any) => m.body_part === 'biceps' && m.value === 34)).toBe(true);
      expect(measurements.some((m: any) => m.body_part === 'thighs' && m.value === 58)).toBe(true);
    });
  });
});