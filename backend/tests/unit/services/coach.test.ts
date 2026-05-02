import { describe, it, expect, beforeAll } from '@jest/globals';
import { generateWorkoutFeedback } from '../../../src/services/coachFeedbackService';
import { getCoachConfig, updateCoachConfig } from '../../../src/services/coachConfigService';
import prisma from '../../../src/config/prisma';

describe('AI Coach Feedback', () => {
  const testUserId = 1; // 使用 seed-test-user

  beforeAll(async () => {
    // 确保测试用户存在
    await prisma.user.upsert({
      where: { id: testUserId },
      create: {
        id: testUserId,
        email: 'test@test.com',
        passwordHash: '$2b$10$test'
      },
      update: {}
    });
  });

  it('should generate feedback for new workout', async () => {
    // 先创建一条训练记录
    const workout = await prisma.workout.create({
      data: {
        userId: testUserId,
        date: new Date(),
        exercises: {
          create: { exerciseName: '深蹲', sets: 4, reps: 10, weight: 60 }
        }
      },
      include: { exercises: true }
    });

    const feedback = await generateWorkoutFeedback(testUserId, workout.id);

    expect(feedback).toHaveProperty('pr_detected');
    expect(feedback).toHaveProperty('consistency_streak');
    expect(feedback).toHaveProperty('personalized_comment');
    expect(typeof feedback.personalized_comment).toBe('string');
  });

  it('should handle invalid userId gracefully', async () => {
    const feedback = await generateWorkoutFeedback(-999, 999);

    expect(feedback.pr_detected).toBe(false);
    expect(feedback.volume_change).toBe('same');
    expect(feedback.consistency_streak).toBe(0);
    expect(feedback.personalized_comment).toBe('记录成功！');
  });
});

describe('Coach Config API', () => {
  const testUserId = 1;

  it('should get default config', async () => {
    const config = await getCoachConfig(testUserId);
    expect(config.enabled).toBe(true);
    expect(config.maxDailyMessages).toBe(3);
  });

  it('should update config', async () => {
    const config = await updateCoachConfig(testUserId, {
      enabled: false,
      reminderTime: '10:00'
    });
    expect(config.enabled).toBe(false);
    expect(config.reminderTime).toBe('10:00');
  });

  it('should restore config', async () => {
    await updateCoachConfig(testUserId, { enabled: true });
    const config = await getCoachConfig(testUserId);
    expect(config.enabled).toBe(true);
  });
});