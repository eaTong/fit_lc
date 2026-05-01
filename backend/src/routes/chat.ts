import { Router, Request, Response } from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { runAgent } from '../agents/fitnessAgent';
import { userContextService } from '../services/userContextService';
import { albumService } from '../services/albumService';
import prisma from '../lib/prisma';

const router = Router();

// Rate limiting: max 20 chat messages per minute per user
const chatRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: { error: '请求过于频繁，请稍后再试' },
  keyGenerator: (req) => req.user?.id ? String(req.user.id) : (ipKeyGenerator(req.ip || '') || 'anonymous'),
});

router.get('/messages', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);

    const messages = await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    // Return in chronological order (oldest first)
    res.json({ messages: messages.reverse() });
  } catch (err) {
    console.error('Get messages error:', err);
    res.status(500).json({ error: 'Failed to get messages' });
  }
});

router.post('/message', chatRateLimiter, async (req: Request, res: Response) => {
  try {
    const { message, imageUrls, historyMessages } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const userId = req.user!.id;

    // Get or create user context
    const userContext = await userContextService.getOrCreateContext(userId);

    // Call agent with context, history and optional images
    const { reply, savedData } = await runAgent(
      userId,
      message,
      userContext,
      historyMessages || [],
      imageUrls || []
    );

    // Save user message and assistant reply to database
    try {
      const userMessage = await prisma.chatMessage.create({
        data: {
          userId,
          role: 'user',
          content: message,
          imageUrls: imageUrls?.length > 0 ? imageUrls : undefined,
        },
      });

      // Sync images to album after user message is saved
      if (imageUrls && imageUrls.length > 0) {
        albumService.syncPhotosFromMessage(userId, imageUrls, userMessage.id).catch((err) => {
        console.error('Failed to sync photos from message:', err);
      });
      }

      await prisma.chatMessage.create({
        data: {
          userId,
          role: 'assistant',
          content: reply,
          savedData: savedData as any,
          isFromCoach: false,
        },
      });
    } catch (dbErr) {
      console.error('Failed to save chat messages:', dbErr);
      // Don't fail the request if DB save fails
    }

    // Async refresh context (don't wait)
    setImmediate(() => {
      const dialogue = `用户：${message}\nAI：${reply}${savedData ? '\n[保存了' + savedData.type + '记录]' : ''}`;
      userContextService.refreshContextWithLock(userId, dialogue);
    });

    res.json({ reply, savedData });
  } catch (err) {
    console.error('Chat error:', err);
    // Log error details server-side but return generic message to client
    res.status(500).json({ error: 'Failed to process message' });
  }
});

export default router;