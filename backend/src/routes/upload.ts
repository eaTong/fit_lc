// @ts-nocheck
import { Router } from 'express';
import { uploadChatImage } from '../lib/oss';
import multer from 'multer';

const router = Router();

// Configure multer for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (jpg/png/webp) are allowed'));
    }
  }
});

/**
 * @swagger
 * /upload/image:
 *   post:
 *     summary: 上传聊天图片
 *     tags: [上传]
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
 *         description: 上传成功，返回图片URL
 *       400:
 *         description: 未提供图片文件
 *       401:
 *         description: 未授权
 */
router.post('/image', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const ext = req.file.originalname.split('.').pop() || 'jpg';
    const url = await uploadChatImage(req.user.id, req.file.buffer, ext);

    res.json({ url });
  } catch (err) {
    console.error('Image upload error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

export default router;
