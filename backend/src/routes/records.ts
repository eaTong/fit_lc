import { Router, Request, Response } from 'express';
import { workoutRepository } from '../repositories/workoutRepository';
import { measurementRepository } from '../repositories/measurementRepository';
import { statsRepository } from '../repositories/statsRepository';

const router = Router();

// Helper to get string query param
function getQueryString(val: unknown): string {
  if (typeof val === 'string') return val;
  if (Array.isArray(val) && typeof val[0] === 'string') return val[0];
  return '';
}

// 获取训练记录
router.get('/workouts', async (req: Request, res: Response) => {
  try {
    const { start, end } = req.query;
    const userId = req.user!.id;

    const startStr = getQueryString(start);
    const endStr = getQueryString(end);

    const workouts = await workoutRepository.findByUserAndDateRange(
      userId,
      startStr || undefined,
      endStr || undefined
    );

    res.json({ workouts });
  } catch (err) {
    console.error('Get workouts error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 获取围度记录
router.get('/measurements', async (req: Request, res: Response) => {
  try {
    const { start, end } = req.query;
    const userId = req.user!.id;

    const startStr = getQueryString(start);
    const endStr = getQueryString(end);

    const measurements = await measurementRepository.findByUserAndDateRange(
      userId,
      startStr || undefined,
      endStr || undefined
    );

    res.json({ measurements });
  } catch (err) {
    console.error('Get measurements error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 获取累计统计数据
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const stats = await statsRepository.getStats(userId);
    res.json(stats);
  } catch (err) {
    console.error('Get stats error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 删除训练记录（软删除）
router.delete('/workout/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const workout = await workoutRepository.findById(Number(id), userId);
    if (!workout) {
      return res.status(404).json({ error: 'Record not found' });
    }

    await workoutRepository.softDelete(Number(id));
    res.json({ success: true });
  } catch (err) {
    console.error('Delete workout error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 删除围度记录（软删除）
router.delete('/measurement/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const measurement = await measurementRepository.findById(Number(id), userId);
    if (!measurement) {
      return res.status(404).json({ error: 'Record not found' });
    }

    await measurementRepository.softDelete(Number(id));
    res.json({ success: true });
  } catch (err) {
    console.error('Delete measurement error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 恢复训练记录
router.post('/workout/:id/restore', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const workout = await workoutRepository.findById(Number(id), userId);
    if (!workout) {
      return res.status(404).json({ error: 'Record not found' });
    }

    await workoutRepository.restore(Number(id));
    res.json({ success: true });
  } catch (err) {
    console.error('Restore workout error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 恢复围度记录
router.post('/measurement/:id/restore', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const measurement = await measurementRepository.findById(Number(id), userId);
    if (!measurement) {
      return res.status(404).json({ error: 'Record not found' });
    }

    await measurementRepository.restore(Number(id));
    res.json({ success: true });
  } catch (err) {
    console.error('Restore measurement error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;