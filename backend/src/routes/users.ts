import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { userService } from '../services/userService';
import { uploadAvatar } from '../lib/oss';

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
    const { nickname, height, avatar } = req.body;
    const profile = await userService.updateProfile(req.user.id, { nickname, height, avatar });
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

export default router;