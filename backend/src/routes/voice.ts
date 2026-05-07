// @ts-nocheck
import { Router, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

const router = Router();

/**
 * @swagger
 * /voice/transcribe:
 *   post:
 *     summary: 语音转文字
 *     tags: [语音]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               audio:
 *                 type: string
 *                 format: binary
 *                 description: 音频文件
 *     responses:
 *       200:
 *         description: 转写成功
 *       400:
 *         description: 未提供音频文件
 *       401:
 *         description: 未授权
 */
router.post('/transcribe', async (req: Request, res: Response) => {
  try {
    const files = req.files;
    if (!files || !files.audio) {
      return res.status(400).json({ error: 'No audio file provided', success: false });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized', success: false });
    }

    const audioFile = files.audio as UploadedFile;
    const apiKey = process.env.MINIMAX_API_KEY;

    if (!apiKey) {
      console.error('MINIMAX_API_KEY not configured');
      return res.status(500).json({ error: 'API key not configured', success: false });
    }

    // 调用 MiniMax 语音转文字 API
    const formData = new FormData();
    formData.append('model', 'speech-01');
    formData.append('file', audioFile.buffer, {
      filename: audioFile.name || 'audio.wav',
      contentType: audioFile.mimetype || 'audio/wav'
    });

    const response = await fetch('https://api.minimaxi.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MiniMax API error:', response.status, errorText);
      return res.status(response.status).json({ error: 'Transcription failed', success: false });
    }

    const result = await response.json();

    // MiniMax transcription response: { code: 0, msg: "success", data: { text: "..." } }
    const text = result?.data?.text || result?.text || '';

    res.json({
      success: true,
      text
    });
  } catch (err) {
    console.error('Voice transcription error:', err);
    res.status(500).json({ error: 'Transcription failed', success: false });
  }
});

export default router;
