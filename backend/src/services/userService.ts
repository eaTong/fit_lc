import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';

export const userService = {
  async getProfile(userId: number) {
    return prisma.userProfile.findUnique({ where: { userId } });
  },

  async updateProfile(userId: number, data: { nickname?: string; height?: number; avatar?: string }) {
    return prisma.userProfile.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });
  },

  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!valid) throw new Error('原密码错误');

    const hash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash: hash } });
    return true;
  },

  async getMetrics(userId: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [records, total] = await Promise.all([
      prisma.bodyMetrics.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        skip,
        take: limit,
      }),
      prisma.bodyMetrics.count({ where: { userId } }),
    ]);
    return { records, total, page, limit };
  },

  async addMetric(userId: number, data: { date: string; weight: number; bodyFat?: number }) {
    return prisma.bodyMetrics.create({
      data: {
        userId,
        date: new Date(data.date),
        weight: data.weight,
        bodyFat: data.bodyFat,
      },
    });
  },

  async deleteAccount(userId: number, password: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('密码错误');

    await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });
    return true;
  },

  async getMeasurementsLatest(userId: number) {
    const measurements = await prisma.bodyMeasurement.findMany({
      where: { userId, deletedAt: null },
      orderBy: { date: 'desc' },
      include: { items: true },
    });

    const latestByPart: Record<string, { value: number; date: string }> = {};

    for (const m of measurements) {
      for (const item of m.items) {
        if (!latestByPart[item.bodyPart]) {
          latestByPart[item.bodyPart] = {
            value: Number(item.value),
            date: m.date.toISOString().split('T')[0],
          };
        }
      }
    }

    const allParts = ['neck', 'chest', 'shoulder', 'biceps_l', 'biceps_r', 'waist', 'hips', 'thigh_l', 'thigh_r', 'calf_l', 'calf_r'];
    const result: Record<string, { value: number; date: string } | null> = {};
    for (const part of allParts) {
      result[part] = latestByPart[part] || null;
    }

    return { measurements: result };
  },

  async getMeasurementsHistory(userId: number, bodyPart: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const items = await prisma.measurementItem.findMany({
      where: { bodyPart },
      include: { measurement: { where: { userId, deletedAt: null } } },
      orderBy: { measurement: { date: 'desc' } },
      skip,
      take: limit,
    });

    const history = items
      .filter(i => i.measurement)
      .map(i => ({
        value: Number(i.value),
        date: i.measurement.date.toISOString().split('T')[0],
      }));

    const total = await prisma.measurementItem.count({
      where: { bodyPart, measurement: { userId, deletedAt: null } },
    });

    return { bodyPart, history, pagination: { page, limit, total } };
  },
};