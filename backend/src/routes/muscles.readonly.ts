import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /muscles/readonly:
 *   get:
 *     summary: 获取肌肉列表（公开）
 *     tags: [肌肉]
 *     responses:
 *       200:
 *         description: 肌肉列表
 */
// GET /api/muscles - List all muscles (for normal users)
router.get('/', async (_req, res) => {
  try {
    const muscles = await prisma.muscle.findMany({
      orderBy: [
        { group: 'asc' },
        { sortOrder: 'asc' }
      ]
    });

    res.json(muscles);
  } catch (error) {
    console.error('Failed to fetch muscles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @swagger
 * /muscles/readonly/{id}:
 *   get:
 *     summary: 获取肌肉详情（公开）
 *     tags: [肌肉]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 肌肉ID
 *     responses:
 *       200:
 *         description: 肌肉详情
 *       404:
 *         description: 肌肉不存在
 */
// GET /api/muscles/:id - Get muscle detail
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const muscle = await prisma.muscle.findUnique({
      where: { id: parseInt(id) },
      include: {
        exercises: {
          include: {
            exercise: true
          }
        }
      }
    });

    if (!muscle) {
      return res.status(404).json({ message: 'Muscle not found' });
    }

    res.json(muscle);
  } catch (error) {
    console.error('Failed to fetch muscle detail:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;