import { Router, Request, Response } from 'express';
import { triggerService } from '../services/triggerService';

const router = Router();

/**
 * @swagger
 * /triggers/eligible/{type}:
 *   get:
 *     summary: 获取符合条件的触发器
 *     tags: [触发器]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: 触发器类型
 *     responses:
 *       200:
 *         description: 触发器列表
 */
router.get('/eligible/:type', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const triggerType = req.params.type as string;
    const triggers = await triggerService.getEligibleTriggers(userId, triggerType);
    res.json({ triggers });
  } catch (err) {
    console.error('Get eligible triggers error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/record', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { triggerType, triggerKey, payload } = req.body;

    if (!triggerType || !triggerKey) {
      res.status(400).json({ error: 'triggerType and triggerKey are required' });
      return;
    }

    const result = await triggerService.recordAndMaybeTrigger(userId, triggerType, triggerKey, payload);
    res.json(result);
  } catch (err) {
    console.error('Record trigger error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/should-trigger', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const triggerType = req.query.triggerType as string;
    const triggerKey = req.query.triggerKey as string;

    if (!triggerType || !triggerKey) {
      res.status(400).json({ error: 'triggerType and triggerKey are required' });
      return;
    }

    const shouldTrigger = await triggerService.shouldTrigger(userId, triggerType, triggerKey);
    res.json({ shouldTrigger });
  } catch (err) {
    console.error('Check trigger eligibility error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/history', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const limit = parseInt(req.query.limit as string) || 100;
    const history = await triggerService.getTriggerHistory(userId, limit);
    res.json({ history });
  } catch (err) {
    console.error('Get trigger history error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid id' });
      return;
    }

    await triggerService.deleteTrigger(id);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete trigger error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
