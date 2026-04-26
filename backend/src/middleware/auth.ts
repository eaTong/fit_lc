import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JWTPayload {
  userId: number;
  email: string;
  roles?: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        roles: string[];
      };
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    if (!decoded.userId) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      roles: decoded.roles || []
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.roles?.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}