import prisma from '../config/prisma';

export const roleRepository = {
  async findByUserId(userId: number) {
    return prisma.userRole.findMany({
      where: { userId },
      include: { role: true }
    });
  },

  async findByName(name: string) {
    return prisma.role.findUnique({
      where: { name }
    });
  },

  async createUserRole(userId: number, roleId: number) {
    return prisma.userRole.create({
      data: { userId, roleId }
    });
  },

  async deleteUserRoles(userId: number) {
    return prisma.userRole.deleteMany({
      where: { userId }
    });
  }
};