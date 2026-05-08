import { Router, Request, Response } from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { runAgentV2 as runAgent } from '../agents/fitnessAgentV2';
import { userContextService } from '../services/userContextService';
import { albumService } from '../services/albumService';
import prisma from '../config/prisma';

const router = Router();

// Rate limiting: max 20 chat messages per minute per user
const chatRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: { error: '请求过于频繁，请稍后再试' },
  keyGenerator: (req) => req.user?.id ? String(req.user.id) : (ipKeyGenerator(req.ip || '') || 'anonymous'),
});

/**
 * @swagger
 * /chat/messages:
 *   get:
 *     summary: 获取聊天记录
 *     tags: [聊天]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: 返回消息数量限制(最大50)
 *     responses:
 *       200:
 *         description: 消息列表
 */
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

/**
 * @swagger
 * /chat/message:
 *   post:
 *     summary: 发送聊天消息
 *     tags: [聊天]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: 用户消息内容
 *               imageUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 图片URL数组
 *               historyMessages:
 *                 type: array
 *                 description: 历史消息上下文
 *     responses:
 *       200:
 *         description: AI回复和保存的数据
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *                   description: AI对话回复
 *                 savedData:
 *                   type: object
 *                   nullable: true
 *                   description: 保存的数据标识
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: 数据ID
 *                     type:
 *                       type: string
 *                       description: 数据类型(workout/measurement/plan等)
 *                 toolData:
 *                   type: object
 *                   nullable: true
 *                   description: Tool返回的完整数据
 *                   properties:
 *                     aiReply:
 *                       type: string
 *                       description: AI对话回复(用于展示)
 *                     dataType:
 *                       type: string
 *                       description: 数据类型标识
 *                     result:
 *                       type: object
 *                       description: 结构化返回数据
 *       429:
 *         description: 请求过于频繁
 */
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
    const { reply, toolData } = await runAgent(
      userId,
      message,
      userContext,
      historyMessages || [],
      imageUrls || []
    );

    // Extract savedData from toolData for DB storage and context
    const savedData = toolData?.result?.id ? { id: toolData.result.id, type: toolData.dataType } : null;

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

    res.json({ reply, toolData });
  } catch (err) {
    console.error('Chat error:', err);
    // Log error details server-side but return generic message to client
    res.status(500).json({ error: 'Failed to process message' });
  }
});

/**
 * @swagger
 * /chat/revoke/{messageId}:
 *   post:
 *     summary: 撤销消息
 *     tags: [聊天]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: 消息ID
 *     responses:
 *       200:
 *         description: 撤销成功
 *       404:
 *         description: 消息不存在
 */
router.post('/revoke/:messageId', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const messageIdParam = req.params.messageId;
    const messageId = Array.isArray(messageIdParam) ? messageIdParam[0] : messageIdParam;

    // 支持临时ID格式（temp-{timestamp}-{role}）和真实数据库ID
    if (messageId.startsWith('temp-')) {
      // 临时ID无法在数据库中查找，直接返回成功（前端已显示但后端未存储）
      return res.json({ success: true, message: '临时消息已忽略' });
    }

    // 查询真实消息
    const message = await prisma.chatMessage.findFirst({
      where: {
        id: parseInt(messageId),
        userId,
      },
    });

    if (!message) {
      return res.status(404).json({ error: '消息不存在' });
    }

    // 删除消息
    await prisma.chatMessage.delete({
      where: { id: message.id },
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Revoke message error:', err);
    res.status(500).json({ error: 'Failed to revoke message' });
  }
});

export default router;
