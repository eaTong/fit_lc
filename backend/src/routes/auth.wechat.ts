import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fitlc-secret';

const WECHAT_APPID = process.env.WECHAT_APPID;
const WECHAT_SECRET = process.env.WECHAT_SECRET;

/**
 * @swagger
 * /auth/wechat:
 *   post:
 *     summary: 微信登录
 *     tags: [认证]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 description: 微信授权code
 *     responses:
 *       200:
 *         description: 登录成功，返回token和用户信息
 *       400:
 *         description: code无效
 */
router.post('/wechat', async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    console.log('[WeChat Login] Received code:', code);
    console.log('[WeChat Login] APPID:', WECHAT_APPID ? `${WECHAT_APPID.slice(0, 8)}...` : 'MISSING');

    if (!code) {
      return res.status(400).json({ message: 'code is required' });
    }

    if (!WECHAT_APPID || !WECHAT_SECRET) {
      console.error('[WeChat Login] Missing credentials');
      return res.status(500).json({ message: 'Server misconfiguration' });
    }

    // Exchange code for session_key and openid
    console.log('[WeChat Login] Calling WeChat API...');
    const wechatRes = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: WECHAT_APPID,
        secret: WECHAT_SECRET,
        js_code: code,
        grant_type: 'authorization_code'
      }
    });

    console.log('[WeChat Login] WeChat response:', JSON.stringify(wechatRes.data));

    const { openid, unionid, session_key, errcode, errmsg } = wechatRes.data;

    if (errcode) {
      console.error('[WeChat Login] WeChat API error:', errcode, errmsg);
      return res.status(400).json({ message: 'Invalid code', wechatError: errcode, wechatMsg: errmsg });
    }

    console.log('[WeChat Login] OpenID:', openid);

    // Find or create user
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { wechatOpenid: openid },
          ...(unionid ? [{ wechatUnionid: unionid }] : [])
        ]
      },
      include: { userProfile: true }
    });

    console.log('[WeChat Login] Found user:', user?.id);

    if (!user) {
      console.log('[WeChat Login] Creating new user...');
      // Create new user with normal role
      user = await prisma.user.create({
        data: {
          wechatOpenid: openid,
          wechatUnionid: unionid,
          nickname: `用户${Date.now().toString().slice(-6)}`,
          roles: {
            create: {
              role: {
                connect: { name: 'normal' }
              }
            }
          }
        },
        include: { userProfile: true }
      });
      console.log('[WeChat Login] Created user:', user.id);
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, role: 'normal' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('[WeChat Login] Success! Token generated for user:', user.id);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.userProfile?.nickname || user.wechatOpenid?.slice(-6),
        avatar: user.userProfile?.avatar,
        gender: user.userProfile?.gender
      }
    });
  } catch (error) {
    console.error('[WeChat Login] Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;