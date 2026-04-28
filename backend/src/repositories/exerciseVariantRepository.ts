import prisma from '../lib/prisma';

export const exerciseVariantRepository = {
  async findByExerciseId(exerciseId: number) {
    // 获取 asSource（该动作的变体）和 asTarget（以该动作为变体）
    const [asSource, asTarget] = await Promise.all([
      prisma.exerciseVariant.findMany({
        where: { exerciseId },
        include: { variant: { select: { id: true, name: true } } }
      }),
      prisma.exerciseVariant.findMany({
        where: { variantId: exerciseId },
        include: { exercise: { select: { id: true, name: true } } }
      })
    ]);
    return { asSource, asTarget };
  },

  async create(data: { exerciseId: number; variantId: number; variantType: string; differenceNotes?: string }) {
    return prisma.exerciseVariant.create({ data });
  },

  async update(id: number, data: { variantType?: string; differenceNotes?: string }) {
    return prisma.exerciseVariant.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.exerciseVariant.delete({ where: { id } });
  },
};