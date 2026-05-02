import { Router } from 'express';
import { albumService } from '../services/albumService';
import { authMiddleware } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /album/photos:
 *   get:
 *     summary: 获取照片列表
 *     tags: [相册]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: 年份
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *         description: 月份
 *     responses:
 *       200:
 *         description: 照片列表
 */
router.get('/photos', authMiddleware, async (req, res) => {
  const { year, month } = req.query;

  // If year and month are provided, return photos for that month
  if (year && month) {
    const yearNum = Number(year);
    const monthNum = Number(month);

    if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return res.status(400).json({ success: false, error: 'Invalid year or month parameter' });
    }

    const photos = await albumService.getPhotosByMonth(req.user!.id, yearNum, monthNum);
    return res.json({ success: true, data: photos });
  }

  // Otherwise return all photos grouped by month
  const photos = await albumService.getAllPhotos(req.user!.id);

  // Group by year-month
  const grouped: Record<string, typeof photos> = {};
  for (const photo of photos) {
    const date = new Date(photo.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(photo);
  }

  res.json({ success: true, data: grouped });
});

router.delete('/photos/:id', authMiddleware, async (req, res) => {
  try {
    await albumService.deletePhoto(Number(req.params.id), req.user!.id);
    res.json({ success: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    if (message === 'Photo not found') {
      res.status(404).json({ success: false, error: 'Not found' });
    } else if (message === 'Photo belongs to another user') {
      res.status(403).json({ success: false, error: 'Photo belongs to another user' });
    } else {
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
});

export default router;