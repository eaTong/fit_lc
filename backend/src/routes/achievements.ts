import { Router, Request, Response } from 'express';
import { personalRecordService } from '../services/personalRecordService';
import { achievementService } from '../services/achievementService';
import { statsService } from '../services/statsService';
import { statsRepository } from '../repositories/statsRepository';

const router = Router();

/**
 * @swagger
 * /achievements/personal-records:
 *   get:
 *     summary: 获取个人记录
 *     tags: [成就]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 个人记录列表
 */
router.get('/personal-records', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const prs = await personalRecordService.getUserPRs(userId);
    res.json({ personalRecords: prs });
  } catch (err) {
    console.error('Get PRs error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/personal-records/top', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const limit = parseInt(req.query.limit as string) || 10;
    const prs = await personalRecordService.getTopPRs(userId, limit);
    res.json({ personalRecords: prs });
  } catch (err) {
    console.error('Get top PRs error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/badges', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const badges = await achievementService.getUserBadges(userId);
    res.json({ badges });
  } catch (err) {
    console.error('Get badges error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/all-badges', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const result = await achievementService.getAllBadgesWithStatus(userId);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error('Get all badges error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/milestones', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const milestones = await achievementService.getUserMilestones(userId);
    res.json({ milestones });
  } catch (err) {
    console.error('Get milestones error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/stats', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    await statsService.updateAggregatedStats(userId);
    const stats = await statsService.getStats(userId);
    res.json({ stats });
  } catch (err) {
    console.error('Get stats error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/check', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { type, data } = req.body;

    if (!type || !['workout', 'measurement', 'streak'].includes(type)) {
      res.status(400).json({ error: 'Invalid type. Must be workout, measurement, or streak' });
      return;
    }

    await statsService.updateAggregatedStats(userId);

    const [newBadges, newMilestones] = await Promise.all([
      achievementService.checkBadges(userId, { type, data }),
      achievementService.checkMilestones(userId),
    ]);

    res.json({ newBadges, newMilestones });
  } catch (err) {
    console.error('Check achievements error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/muscle-volume', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { start, end } = req.query;

    const startDate = start ? new Date(start as string) : undefined;
    const endDate = end ? new Date(end as string) : undefined;

    const muscleGroups = await statsRepository.getVolumeByMuscleGroup(userId, startDate, endDate);
    res.json({ muscleGroups });
  } catch (err) {
    console.error('Get muscle volume error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
