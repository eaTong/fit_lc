import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { userService } from '../services/userService';
import { uploadAvatar } from '../lib/oss';
import { getCoachConfig, updateCoachConfig } from '../services/coachConfigService';

const router = Router();
router.use(authMiddleware);

router.get('/me/profile', async (req, res) => {
  try {
    const profile = await userService.getProfile(req.user.id);
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/me/profile', async (req, res) => {
  try {
    const { nickname, height, weight, bodyFat, experience, goal, avatar } = req.body;
    const profile = await userService.updateProfile(req.user.id, {
      nickname, height, weight, bodyFat, experience, goal, avatar
    });
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/me/profile/onboarded', async (req, res) => {
  try {
    const { hasOnboarded } = req.body;
    const profile = await userService.updateProfile(req.user.id, { hasOnboarded });
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/me/password', async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await userService.changePassword(req.user.id, oldPassword, newPassword);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/me/avatar', async (req, res) => {
  try {
    const { file, ext } = req.body;
    const url = await uploadAvatar(req.user.id, Buffer.from(file, 'base64'), ext || 'jpg');
    await userService.updateProfile(req.user.id, { avatar: url });
    res.json({ url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/me/metrics', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await userService.getMetrics(req.user.id, page, limit);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/me/metrics', async (req, res) => {
  try {
    const { date, weight, bodyFat } = req.body;
    const record = await userService.addMetric(req.user.id, { date, weight, bodyFat });
    res.json(record);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/me/account', async (req, res) => {
  try {
    const { password } = req.body;
    await userService.deleteAccount(req.user.id, password);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/me/measurements/latest', async (req, res) => {
  try {
    const result = await userService.getMeasurementsLatest(req.user.id);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/me/measurements/history', async (req, res) => {
  try {
    const { bodyPart, page = 1, limit = 10 } = req.query;
    if (!bodyPart) return res.status(400).json({ error: 'bodyPart required' });
    const result = await userService.getMeasurementsHistory(req.user.id, bodyPart as string, parseInt(page as string), parseInt(limit as string));
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/coach-config', async (req, res) => {
  try {
    const config = await getCoachConfig(req.user.id);
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ error: '获取配置失败' });
  }
});

router.put('/coach-config', async (req, res) => {
  try {
    const { enabled, reminderTime, maxDailyMessages } = req.body;
    const config = await updateCoachConfig(req.user.id, {
      enabled,
      reminderTime,
      maxDailyMessages
    });
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ error: '更新配置失败' });
  }
});

export default router;