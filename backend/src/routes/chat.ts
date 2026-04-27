import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { runAgent } from '../agents/fitnessAgent';
import { userContextService } from '../services/userContextService';

const router = Router();

// Rate limiting: max 20 chat messages per minute per user
const chatRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: { error: '请求过于频繁，请稍后再试' },
  keyGenerator: (req) => req.user?.id ? String(req.user.id) : (req.ip || 'anonymous'),
});

router.post('/message', chatRateLimiter, async (req: Request, res: Response) => {
  try {
    const { message, historyMessages } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const userId = req.user!.id;

    // Get or create user context
    const userContext = await userContextService.getOrCreateContext(userId);

    // Call agent with context and history
    const { reply, savedData } = await runAgent(
      userId,
      message,
      userContext,
      historyMessages || []
    );

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