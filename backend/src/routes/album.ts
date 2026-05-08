import { Router } from 'express';
import { albumService } from '../services/albumService';
import { authMiddleware } from '../middleware/auth';
import multer from 'multer';
import { uploadChatImage } from '../config/oss';

const router = Router();

// Configure multer for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (jpg/png/webp/gif) are allowed'));
    }
  }
});

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

/**
 * @swagger
 * /album/photos/paginated:
 *   get:
 *     summary: 分页获取照片（用于无限滚动）
 *     tags: [相册]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *         description: 分页游标（上次返回的 createdAt），null 表示首次查询
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: 每页数量
 *     responses:
 *       200:
 *         description: 分页照片结果
 */
router.get('/photos/paginated', authMiddleware, async (req, res) => {
  const { cursor, limit } = req.query;
  const limitNum = limit ? Math.min(Number(limit), 100) : 50;

  const result = await albumService.getPhotosPaginated(
    req.user!.id,
    cursor as string | null,
    limitNum
  );

  res.json({ success: true, data: result });
});

/**
 * @swagger
 * /album/photos/upload:
 *   post:
 *     summary: 上传照片到相册
 *     tags: [相册]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: 图片文件
 *     responses:
 *       200:
 *         description: 上传成功
 *       400:
 *         description: 未提供图片文件
 */
router.post('/photos/upload', authMiddleware, upload.single('file'), async (req: any, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file provided' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const ext = req.file.originalname.split('.').pop() || 'jpg';
    const url = await uploadChatImage(req.user.id, req.file.buffer, ext);

    // Create album photo record
    const photo = await albumService.addPhoto(req.user.id, url);

    res.json({ success: true, data: photo });
  } catch (err) {
    console.error('Album upload error:', err);
    res.status(500).json({ success: false, error: 'Failed to upload image' });
  }
});

export default router;