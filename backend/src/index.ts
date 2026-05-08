import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth';
import authProtectedRoutes from './routes/authProtected';
import authWechatRoutes from './routes/auth.wechat';
import chatRoutes from './routes/chat';
import recordsRoutes from './routes/records';
import plansRoutes from './routes/plans';
import musclesRoutes from './routes/muscles';
import musclesReadonlyRoutes from './routes/muscles.readonly';
import exercisesRoutes from './routes/exercises';
import adminExercisesRouter from './routes/adminExercises';
import adminMusclesRouter from './routes/adminMuscles';
import voiceRoutes from './routes/voice';
import usersRouter from './routes/users';
import achievementsRouter from './routes/achievements';
import triggersRouter from './routes/triggers';
import uploadRouter from './routes/upload';
import albumRoutes from './routes/album';
import { authMiddleware } from './middleware/auth';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 确保日志目录存在
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// 日志文件路径
const accessLogPath = path.join(logDir, 'access.log');
const errorLogPath = path.join(logDir, 'error.log');

// 写入日志的函数
function writeLog(filePath, message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(filePath, `[${timestamp}] ${message}\n`);
}

// 捕获未处理的错误
process.on('uncaughtException', (err) => {
  writeLog(errorLogPath, `Uncaught Exception: ${err.message}\n${err.stack}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  writeLog(errorLogPath, `Unhandled Rejection: ${reason}`);
});

dotenv.config();

// 环境配置
const isProduction = process.env.NODE_ENV === 'production';

// 覆盖 console.log 和 console.error
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

// 格式化日志消息，处理 Error 对象
function formatMessage(...args) {
  return args.map(a => {
    if (a instanceof Error) {
      return `${a.name}: ${a.message}\n${a.stack}`;
    }
    if (typeof a === 'object') {
      try {
        return JSON.stringify(a);
      } catch {
        return String(a);
      }
    }
    return String(a);
  }).join(' ');
}

console.log = (...args) => {
  const message = formatMessage(...args);
  writeLog(accessLogPath, message);
  // 同时输出到终端
  originalConsoleLog.apply(console, args);
};

console.error = (...args) => {
  const message = formatMessage(...args);
  writeLog(errorLogPath, message);
  // 同时输出到终端
  originalConsoleError.apply(console, args);
};

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'));
    }
  }
});

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static badge images
app.use('/badges', express.static(path.join(__dirname, '../public/badges')));

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// HTTP access logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - start;
    const userId = req.user?.id || '-';
    const logLine = `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms user:${userId} ip:${req.ip}`;
    writeLog(accessLogPath, logLine);
    return originalSend.apply(this, arguments as any);
  };
  next();
});

// 公开路由
app.use('/api/auth', authRoutes);
app.use('/api/auth', authWechatRoutes);

// Swagger API 文档
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
  res.json(swaggerSpec);
});

// 需认证路由
app.use('/api/auth', authMiddleware, authProtectedRoutes);

// 需认证路由
app.use('/api/chat', authMiddleware, chatRoutes);
app.use('/api/records', authMiddleware, recordsRoutes);
app.use('/api/plans', authMiddleware, plansRoutes);
app.use('/api/muscles', authMiddleware, musclesRoutes);
app.use('/api/muscles', authMiddleware, musclesReadonlyRoutes);
app.use('/api/exercises', authMiddleware, exercisesRoutes);
app.use('/api/admin/exercises', adminExercisesRouter);
app.use('/api/admin/muscles', adminMusclesRouter);
app.use('/api/voice', authMiddleware, upload.single('audio'), voiceRoutes);
app.use('/api/users', authMiddleware, usersRouter);
app.use('/api/achievements', authMiddleware, achievementsRouter);
app.use('/api/triggers', authMiddleware, triggersRouter);
app.use('/api/upload', authMiddleware, uploadRouter);
app.use('/api/album', authMiddleware, albumRoutes);

app.listen(PORT, () => {
  console.log(`FitLC backend running on port ${PORT}`);
});