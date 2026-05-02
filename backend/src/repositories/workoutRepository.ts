import prisma from '../lib/prisma';

export const workoutRepository = {
  async create(userId: number, date: string) {
    return prisma.workout.create({
      data: {
        userId,
        date: new Date(date)
      }
    });
  },

  async addExercise(workoutId: number, userId: number, exercise: {
    name: string;
    sets?: number;
    reps?: number;
    weight?: number;
    duration?: number;
    distance?: number;
  }) {
    const workout = await prisma.workout.findFirst({
      where: { id: workoutId, userId, deletedAt: null }
    });
    if (!workout) {
      throw new Error('训练记录不存在或已删除');
    }
    return prisma.workoutExercise.create({
      data: {
        workoutId,
        exerciseName: exercise.name,
        sets: exercise.sets ?? null,
        reps: exercise.reps ?? null,
        weight: exercise.weight ?? null,
        duration: exercise.duration ?? null,
        distance: exercise.distance ?? null
      }
    });
  },

  async findByUserAndDateRange(userId: number, startDate?: string, endDate?: string) {
    const where: any = {
      userId,
      deletedAt: null
    };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }

    return prisma.workout.findMany({
      where,
      include: {
        exercises: {
          select: {
            id: true,
            exerciseName: true,
            sets: true,
            reps: true,
            weight: true,
            duration: true,
            distance: true
          }
        }
      },
      orderBy: { date: 'desc' }
    });
  },

  async findById(id: number, userId: number) {
    return prisma.workout.findFirst({
      where: { id, userId, deletedAt: null }
    });
  },

  async softDelete(id: number) {
    return prisma.workout.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  },

  async restore(id: number) {
    return prisma.workout.update({
      where: { id },
      data: { deletedAt: null }
    });
  }
};