import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { authService } from '../services/authService';

const router = Router();

router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await authService.getCurrentUser(req.user!.id);
    res.json({ user });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

export default router;