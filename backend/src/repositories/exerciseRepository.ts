import prisma from '../lib/prisma';

export const exerciseRepository = {
  async findAll(filters?: {
    category?: string;
    equipment?: string;
    difficulty?: string;
    status?: string;
  }) {
    const where: any = {};
    if (filters?.category) where.category = filters.category;
    if (filters?.equipment) where.equipment = filters.equipment;
    if (filters?.difficulty) where.difficulty = filters.difficulty;
    if (filters?.status) where.status = filters.status;

    return prisma.exercise.findMany({
      where,
      include: {
        muscles: { include: { muscle: true } },
      },
      orderBy: { name: 'asc' }
    });
  },

  async findById(id: number) {
    return prisma.exercise.findUnique({
      where: { id },
      include: {
        muscles: { include: { muscle: true } },
        variants: {
        select: {
          id: true,
          variantId: true,
          variantType: true,
          differenceNotes: true,
          variant: { select: { id: true, name: true } }
        }
      },
      },
    });
  },

  async create(data: {
    name: string;
    category: string;
    equipment: string;
    difficulty: string;
    description?: string;
    adjustmentNotes?: string;
    videoUrl?: string;
    isVariant?: boolean;
    parentId?: number;
    tags?: string[];
    status?: string;
    steps?: string;
    safetyNotes?: string;
    commonMistakes?: string;
    exerciseType?: string;
    variantType?: string;
    conversionGuide?: any;
  }) {
    return prisma.exercise.create({
      data: {
        name: data.name,
        category: data.category,
        equipment: data.equipment,
        difficulty: data.difficulty,
        description: data.description,
        adjustmentNotes: data.adjustmentNotes,
        videoUrl: data.videoUrl,
        isVariant: data.isVariant ?? false,
        parentId: data.parentId,
        tags: data.tags ? JSON.stringify(data.tags) : null,
        status: data.status ?? 'draft',
        steps: data.steps,
        safetyNotes: data.safetyNotes,
        commonMistakes: data.commonMistakes,
        exerciseType: data.exerciseType,
        variantType: data.variantType,
        conversionGuide: data.conversionGuide,
      },
    });
  },

  async update(id: number, data: {
    name?: string;
    category?: string;
    equipment?: string;
    difficulty?: string;
    description?: string;
    adjustmentNotes?: string;
    videoUrl?: string;
    tags?: string[];
    status?: string;
    steps?: string;
    safetyNotes?: string;
    commonMistakes?: string;
    exerciseType?: string;
    variantType?: string;
    conversionGuide?: any;
  }) {
    const updateData: any = { ...data };
    if (data.tags !== undefined) {
      updateData.tags = JSON.stringify(data.tags);
    }
    return prisma.exercise.update({
      where: { id },
      data: updateData,
    });
  },

  async delete(id: number) {
    return prisma.exercise.delete({ where: { id } });
  },

  async addMuscle(exerciseId: number, muscleId: number, role: string) {
    return prisma.exerciseMuscle.create({
      data: { exerciseId, muscleId, role },
    });
  },

  async removeMuscle(exerciseId: number, muscleId: number) {
    return prisma.exerciseMuscle.deleteMany({
      where: { exerciseId, muscleId },
    });
  },

  async updateMuscles(exerciseId: number, muscles: { muscleId: number; role: string }[]) {
    await prisma.$transaction(async (tx) => {
      await tx.exerciseMuscle.deleteMany({ where: { exerciseId } });
      for (const m of muscles) {
        await tx.exerciseMuscle.create({ data: { exerciseId, muscleId: m.muscleId, role: m.role } });
      }
    });
  },

  async getMusclesByExerciseId(exerciseId: number) {
    return prisma.exerciseMuscle.findMany({
      where: { exerciseId },
      include: { muscle: true },
    });
  },
};