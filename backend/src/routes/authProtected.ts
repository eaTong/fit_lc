import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { authService } from '../services/authService';

const router = Router();

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: 获取当前用户信息
 *     tags: [认证]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 用户信息
 *       401:
 *         description: 未授权
 */
router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await authService.getCurrentUser(req.user!.id);
    res.json({ user });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

export default router;
