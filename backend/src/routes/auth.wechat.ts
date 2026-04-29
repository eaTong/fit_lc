import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fitlc-secret';

const WECHAT_APPID = process.env.WECHAT_APPID;
const WECHAT_SECRET = process.env.WECHAT_SECRET;

router.post('/wechat', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'code is required' });
    }

    // Exchange code for session_key and openid
    const wechatRes = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: WECHAT_APPID,
        secret: WECHAT_SECRET,
        js_code: code,
        grant_type: 'authorization_code'
      }
    });

    const { openid, unionid, session_key, errcode, errmsg } = wechatRes.data;

    if (errcode) {
      console.error('Wechat API error:', errcode, errmsg);
      return res.status(400).json({ message: 'Invalid code' });
    }

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

    if (!user) {
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
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, role: 'normal' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.userProfile?.nickname || user.wechatOpenid?.slice(-6),
        avatar: user.userProfile?.avatar
      }
    });
  } catch (error) {
    console.error('Wechat login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;