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

// 将 measurement 的 items 数组扁平化为一级属性
function flattenMeasurement(measurement: any) {
  if (!measurement) return null;
  const { id, date, items, ...rest } = measurement;
  const result: any = { id, date, ...rest };
  if (items && Array.isArray(items)) {
    for (const item of items) {
      // 将 bodyPart 转为 snake_case（如 biceps_l）
      result[item.bodyPart] = Number(item.value);
    }
  }
  return result;
}

/**
 * @swagger
 * /records/workouts:
 *   get:
 *     summary: 获取训练记录
 *     tags: [记录]
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *         description: 开始日期 (YYYY-MM-DD)
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *         description: 结束日期 (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: 训练记录列表
 */
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

/**
 * @swagger
 * /records/measurements:
 *   get:
 *     summary: 获取围度记录
 *     tags: [记录]
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *         description: 开始日期 (YYYY-MM-DD)
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *         description: 结束日期 (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: 围度记录列表
 */
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

/**
 * @swagger
 * /records/measurement:
 *   post:
 *     summary: 创建或更新围度记录（单个部位）
 *     tags: [记录]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 description: 日期 (YYYY-MM-DD)，不提供则使用今天
 *               body_part:
 *                 type: string
 *                 description: 部位名称 (如 weight, chest, biceps_l)
 *               value:
 *                 type: number
 *                 description: 测量值
 *               measurements:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     body_part:
 *                       type: string
 *                     value:
 *                       type: number
 *                 description: 部位列表（与 body_part/value 二选一）
 *     responses:
 *       200:
 *         description: 保存成功
 *       400:
 *         description: 参数错误
 */
router.post('/measurement', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { date, body_part, value, measurements } = req.body;

    const measurementDate = date || new Date().toISOString().split('T')[0];

    // 支持两种格式：单独 body_part/value 或 measurements 数组
    let items: { bodyPart: string; value: number }[] = [];

    if (measurements && Array.isArray(measurements)) {
      items = measurements.map((m: any) => ({
        bodyPart: m.body_part,
        value: m.value
      }));
    } else if (body_part && value !== undefined) {
      items = [{ bodyPart: body_part, value }];
    } else {
      return res.status(400).json({ error: 'body_part/value or measurements array is required' });
    }

    // 查找当天是否已有记录
    let measurement = await measurementRepository.findByDate(userId, measurementDate);

    if (measurement) {
      // 更新或添加每个部位
      for (const item of items) {
        await measurementRepository.upsertItem(measurement.id, item.bodyPart, item.value);
      }
      // 重新获取完整记录
      measurement = await measurementRepository.findById(measurement.id, userId);
    } else {
      // 创建新记录
      measurement = await measurementRepository.createWithItems(userId, measurementDate, items);
    }

    // 扁平化返回格式，将 items 数组转为一级属性
    const flatMeasurement = flattenMeasurement(measurement);
    res.json({ measurement: flatMeasurement });
  } catch (err) {
    console.error('Create measurement error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /records/stats:
 *   get:
 *     summary: 获取累计统计数据
 *     tags: [记录]
 *     responses:
 *       200:
 *         description: 统计数据
 */
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