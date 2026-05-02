import prisma from '../config/prisma';

export const userRepository = {
  async create(email: string, passwordHash: string) {
    return prisma.user.create({
      data: { email, passwordHash }
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { roles: { include: { role: true } } }
    });
  },

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      include: { roles: { include: { role: true } } }
    });
  },

  async updatePassword(id: number, newPasswordHash: string) {
    return prisma.user.update({
      where: { id },
      data: { passwordHash: newPasswordHash }
    });
  }
};