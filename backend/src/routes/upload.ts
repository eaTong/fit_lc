import { Router, Request, Response } from 'express';
import { uploadChatImage, uploadAudio } from '../config/oss';
import multer from 'multer';

const router = Router();

// Configure multer for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
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
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const ext = file.originalname.split('.').pop() || 'jpg';
    const url = await uploadChatImage(req.user.id, file.buffer, ext);

    res.json({ url });
  } catch (err) {
    console.error('Image upload error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

/**
 * @swagger
 * /upload/audio:
 *   post:
 *     summary: 上传语音消息
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
 *                 description: 音频文件
 *     responses:
 *       200:
 *         description: 上传成功，返回音频URL
 *       400:
 *         description: 未提供音频文件
 *       401:
 *         description: 未授权
 */
const audioUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'));
    }
  }
});

router.post('/audio', audioUpload.single('file'), async (req, res) => {
  try {
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const ext = file.originalname.split('.').pop() || 'mp3';
    const url = await uploadAudio(req.user.id, file.buffer, ext);

    res.json({ url });
  } catch (err) {
    console.error('Audio upload error:', err);
    res.status(500).json({ error: 'Failed to upload audio' });
  }
});

export default router;
