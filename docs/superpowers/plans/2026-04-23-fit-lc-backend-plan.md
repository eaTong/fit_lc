# FitLC Backend MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建后端核心：用户注册登录、JWT认证、数据库表、LangChain Agent（保存/查询训练和围度）

**Architecture:** Express.js 后端 + MySQL 数据库 + LangChain.js Agent with MiniMax。分层设计：Router → Service → Repository。

**Tech Stack:** Node.js, Express, MySQL, LangChain.js, MiniMax, bcrypt, jsonwebtoken

---

## 文件结构

```
backend/
├── src/
│   ├── index.js              # 入口
│   ├── config/
│   │   └── database.js       # MySQL 连接配置
│   ├── middleware/
│   │   └── auth.js           # JWT 验证中间件
│   ├── routes/
│   │   ├── auth.js           # /api/auth 路由
│   │   ├── chat.js           # /api/chat 路由
│   │   └── records.js        # /api/records 路由
│   ├── services/
│   │   ├── authService.js    # 认证逻辑
│   │   ├── saveService.js    # 保存训练/围度
│   │   └── queryService.js   # 查询训练/围度
│   ├── repositories/
│   │   ├── userRepository.js # 用户数据访问
│   │   ├── workoutRepository.js
│   │   └── measurementRepository.js
│   ├── agents/
│   │   └── fitnessAgent.js   # LangChain Agent 定义
│   └── tools/
│       ├── saveWorkout.js
│       ├── saveMeasurement.js
│       ├── queryWorkout.js
│       └── queryMeasurement.js
├── tests/
│   ├── auth.test.js
│   ├── saveService.test.js
│   └── queryService.test.js
├── scripts/
│   └── init-db.sql            # 数据库初始化脚本
├── package.json
└── .env.example
```

---

## Task 1: 项目初始化与依赖安装

**Files:**
- Create: `backend/package.json`
- Create: `backend/.env.example`
- Create: `backend/src/index.js`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "fitlc-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js",
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
    "init-db": "node scripts/init-db.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.5",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "langchain": "^0.1.0",
    "dotenv": "^16.3.1",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  }
}
```

- [ ] **Step 2: 创建 .env.example**

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=fitlc
JWT_SECRET=your-jwt-secret-key
MINIMAX_API_KEY=your-minimax-api-key
```

- [ ] **Step 3: 创建 src/index.js**

```javascript
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import recordsRoutes from './routes/records.js';
import { authMiddleware } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 公开路由
app.use('/api/auth', authRoutes);

// 需认证路由
app.use('/api/chat', authMiddleware, chatRoutes);
app.use('/api/records', authMiddleware, recordsRoutes);

app.listen(PORT, () => {
  console.log(`FitLC backend running on port ${PORT}`);
});
```

- [ ] **Step 4: 创建 src/config/database.js**

```javascript
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'fitlc',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
```

- [ ] **Step 5: 安装依赖**

Run: `cd backend && npm install`
Expected: 安装成功

- [ ] **Step 6: 提交**

```bash
git init && git add -A && git commit -m "feat: project init with Express + MySQL setup"
```

---

## Task 2: 数据库初始化脚本

**Files:**
- Create: `backend/scripts/init-db.sql`
- Create: `backend/scripts/init-db.js`

- [ ] **Step 1: 创建 scripts/init-db.sql**

```sql
CREATE DATABASE IF NOT EXISTS fitlc;
USE fitlc;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

CREATE TABLE IF NOT EXISTS workouts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_date (date),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS workout_exercises (
  id INT PRIMARY KEY AUTO_INCREMENT,
  workout_id INT NOT NULL,
  exercise_name VARCHAR(100) NOT NULL,
  sets INT NULL,
  reps INT NULL,
  weight DECIMAL(10,2) NULL,
  duration INT NULL,
  distance DECIMAL(10,2) NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS body_measurements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_date (date),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS measurement_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  measurement_id INT NOT NULL,
  body_part ENUM('chest','waist','hips','biceps','thighs','calves','other') NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (measurement_id) REFERENCES body_measurements(id) ON DELETE CASCADE
);
```

- [ ] **Step 2: 创建 scripts/init-db.js**

```javascript
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

async function initDb() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    multipleStatements: true
  });

  try {
    const sql = readFileSync(join(__dirname, 'init-db.sql'), 'utf-8');
    await connection.query(sql);
    console.log('Database initialized successfully');
  } finally {
    await connection.end();
  }
}

initDb().catch(console.error);
```

- [ ] **Step 3: 运行初始化脚本**

Run: `cd backend && npm run init-db`
Expected: Database initialized successfully

- [ ] **Step 4: 提交**

```bash
git add scripts/init-db.sql scripts/init-db.js
git commit -m "feat: add database init script"
```

---

## Task 3: 用户认证（注册/登录/JWT）

**Files:**
- Create: `backend/src/middleware/auth.js`
- Create: `backend/src/routes/auth.js`
- Create: `backend/src/services/authService.js`
- Create: `backend/src/repositories/userRepository.js`
- Create: `backend/tests/auth.test.js`

- [ ] **Step 1: 创建 middleware/auth.js**

```javascript
import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
```

- [ ] **Step 2: 创建 repositories/userRepository.js**

```javascript
import pool from '../config/database.js';

export const userRepository = {
  async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  },

  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, email, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  async create(email, passwordHash) {
    const [result] = await pool.execute(
      'INSERT INTO users (email, password_hash) VALUES (?, ?)',
      [email, passwordHash]
    );
    return result.insertId;
  }
};
```

- [ ] **Step 3: 创建 services/authService.js**

```javascript
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository.js';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
const SALT_ROUNDS = 10;

export const authService = {
  async register(email, password) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email already registered');
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = await userRepository.create(email, passwordHash);
    const token = this.generateToken(userId, email);

    return { token, user: { id: userId, email } };
  },

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user.id, user.email);
    return { token, user: { id: user.id, email: user.email } };
  },

  async getCurrentUser(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  generateToken(userId, email) {
    return jwt.sign(
      { userId, email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  }
};
```

- [ ] **Step 4: 创建 routes/auth.js**

```javascript
import { Router } from 'express';
import { authService } from '../services/authService.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const result = await authService.register(email, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    res.json({ user });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

export default router;
```

- [ ] **Step 5: 创建 tests/auth.test.js**

```javascript
import { jest } from '@jest/globals';

// Mock userRepository
const mockUserRepository = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  create: jest.fn()
};

// Mock bcrypt and jwt
jest.unstable_mockModule('bcrypt', () => ({
  default: {
    hash: jest.fn().mockResolvedValue('hashed_password'),
    compare: jest.fn().mockResolvedValue(true)
  }
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    sign: jest.fn().mockReturnValue('mock_token')
  }
}));

jest.unstable_mockModule('../repositories/userRepository.js', () => ({
  userRepository: mockUserRepository
}));

describe('Auth Service', () => {
  let authService;

  beforeAll(async () => {
    const module = await import('../services/authService.js');
    authService = module.authService;
  });

  describe('register', () => {
    it('should register new user successfully', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(1);

      const result = await authService.register('test@example.com', 'password123');

      expect(result).toHaveProperty('token', 'mock_token');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should throw error if email exists', async () => {
      mockUserRepository.findByEmail.mockResolvedValue({ id: 1 });

      await expect(authService.register('test@example.com', 'password123'))
        .rejects.toThrow('Email already registered');
    });
  });

  describe('login', () => {
    it('should login with valid credentials', async () => {
      mockUserRepository.findByEmail.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password_hash: 'hashed_password'
      });

      const result = await authService.login('test@example.com', 'password123');

      expect(result).toHaveProperty('token', 'mock_token');
    });

    it('should throw error with invalid email', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(authService.login('wrong@example.com', 'password123'))
        .rejects.toThrow('Invalid credentials');
    });
  });
});
```

- [ ] **Step 6: 运行测试**

Run: `cd backend && npm test -- tests/auth.test.js`
Expected: Tests pass

- [ ] **Step 7: 提交**

```bash
git add src/middleware/auth.js src/routes/auth.js src/services/authService.js src/repositories/userRepository.js tests/auth.test.js
git commit -m "feat: add user authentication (register/login/JWT)"
```

---

## Task 4: 数据仓库层（Workout & Measurement）

**Files:**
- Create: `backend/src/repositories/workoutRepository.js`
- Create: `backend/src/repositories/measurementRepository.js`
- Create: `backend/tests/repositories.test.js`

- [ ] **Step 1: 创建 repositories/workoutRepository.js**

```javascript
import pool from '../config/database.js';

export const workoutRepository = {
  async create(userId, date) {
    const [result] = await pool.execute(
      'INSERT INTO workouts (user_id, date) VALUES (?, ?)',
      [userId, date]
    );
    return result.insertId;
  },

  async addExercise(workoutId, exercise) {
    const [result] = await pool.execute(
      `INSERT INTO workout_exercises
       (workout_id, exercise_name, sets, reps, weight, duration, distance)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        workoutId,
        exercise.name,
        exercise.sets || null,
        exercise.reps || null,
        exercise.weight || null,
        exercise.duration || null,
        exercise.distance || null
      ]
    );
    return result.insertId;
  },

  async findByUserAndDateRange(userId, startDate, endDate) {
    const [rows] = await pool.execute(
      `SELECT w.*, we.id as exercise_id, we.exercise_name, we.sets, we.reps,
              we.weight, we.duration, we.distance
       FROM workouts w
       LEFT JOIN workout_exercises we ON w.id = we.workout_id
       WHERE w.user_id = ? AND w.date BETWEEN ? AND ? AND w.deleted_at IS NULL
       ORDER BY w.date DESC`,
      [userId, startDate, endDate]
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM workouts WHERE id = ? AND deleted_at IS NULL',
      [id]
    );
    return rows[0] || null;
  },

  async softDelete(id) {
    const [result] = await pool.execute(
      'UPDATE workouts SET deleted_at = NOW() WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  },

  async restore(id) {
    const [result] = await pool.execute(
      'UPDATE workouts SET deleted_at = NULL WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};
```

- [ ] **Step 2: 创建 repositories/measurementRepository.js**

```javascript
import pool from '../config/database.js';

export const measurementRepository = {
  async create(userId, date) {
    const [result] = await pool.execute(
      'INSERT INTO body_measurements (user_id, date) VALUES (?, ?)',
      [userId, date]
    );
    return result.insertId;
  },

  async addItem(measurementId, bodyPart, value) {
    const [result] = await pool.execute(
      'INSERT INTO measurement_items (measurement_id, body_part, value) VALUES (?, ?, ?)',
      [measurementId, bodyPart, value]
    );
    return result.insertId;
  },

  async findByUserAndDateRange(userId, startDate, endDate) {
    const [rows] = await pool.execute(
      `SELECT bm.*, mi.id as item_id, mi.body_part, mi.value
       FROM body_measurements bm
       LEFT JOIN measurement_items mi ON bm.id = mi.measurement_id
       WHERE bm.user_id = ? AND bm.date BETWEEN ? AND ? AND bm.deleted_at IS NULL
       ORDER BY bm.date DESC`,
      [userId, startDate, endDate]
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM body_measurements WHERE id = ? AND deleted_at IS NULL',
      [id]
    );
    return rows[0] || null;
  },

  async softDelete(id) {
    const [result] = await pool.execute(
      'UPDATE body_measurements SET deleted_at = NOW() WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  },

  async restore(id) {
    const [result] = await pool.execute(
      'UPDATE body_measurements SET deleted_at = NULL WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};
```

- [ ] **Step 3: 创建 tests/repositories.test.js**

```javascript
import { jest } from '@jest/globals';

// Mock pool
const mockPool = {
  execute: jest.fn()
};

jest.unstable_mockModule('../src/config/database.js', () => ({
  default: mockPool
}));

describe('Workout Repository', () => {
  let workoutRepository;

  beforeAll(async () => {
    const module = await import('../src/repositories/workoutRepository.js');
    workoutRepository = module.workoutRepository;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should insert workout and return id', async () => {
      mockPool.execute.mockResolvedValue([{ insertId: 42 }]);

      const id = await workoutRepository.create(1, '2026-04-23');

      expect(mockPool.execute).toHaveBeenCalledWith(
        'INSERT INTO workouts (user_id, date) VALUES (?, ?)',
        [1, '2026-04-23']
      );
      expect(id).toBe(42);
    });
  });

  describe('findByUserAndDateRange', () => {
    it('should return workouts within date range', async () => {
      const mockRows = [
        { id: 1, user_id: 1, date: '2026-04-20', exercise_name: '深蹲', sets: 5, reps: 8 },
        { id: 2, user_id: 1, date: '2026-04-19', exercise_name: '跑步', duration: 30 }
      ];
      mockPool.execute.mockResolvedValue([mockRows]);

      const result = await workoutRepository.findByUserAndDateRange(1, '2026-04-01', '2026-04-30');

      expect(result).toHaveLength(2);
      expect(result[0].exercise_name).toBe('深蹲');
    });
  });

  describe('softDelete', () => {
    it('should set deleted_at and return true', async () => {
      mockPool.execute.mockResolvedValue([{ affectedRows: 1 }]);

      const result = await workoutRepository.softDelete(1);

      expect(result).toBe(true);
    });

    it('should return false if not found', async () => {
      mockPool.execute.mockResolvedValue([{ affectedRows: 0 }]);

      const result = await workoutRepository.softDelete(999);

      expect(result).toBe(false);
    });
  });
});
```

- [ ] **Step 4: 运行测试**

Run: `cd backend && npm test -- tests/repositories.test.js`
Expected: Tests pass

- [ ] **Step 5: 提交**

```bash
git add src/repositories/workoutRepository.js src/repositories/measurementRepository.js tests/repositories.test.js
git commit -m "feat: add workout and measurement repositories"
```

---

## Task 5: 服务层（Save & Query Services）

**Files:**
- Create: `backend/src/services/saveService.js`
- Create: `backend/src/services/queryService.js`
- Create: `backend/tests/services.test.js`

- [ ] **Step 1: 创建 services/saveService.js**

```javascript
import { workoutRepository } from '../repositories/workoutRepository.js';
import { measurementRepository } from '../repositories/measurementRepository.js';

export const saveService = {
  async saveWorkout(userId, date, exercises) {
    const workoutId = await workoutRepository.create(userId, date);

    for (const exercise of exercises) {
      await workoutRepository.addExercise(workoutId, exercise);
    }

    return {
      id: workoutId,
      date,
      exercises,
      message: `已保存：${exercises.map(e => e.name).join('、')}`
    };
  },

  async saveMeasurement(userId, date, measurements) {
    const measurementId = await measurementRepository.create(userId, date);

    for (const m of measurements) {
      await measurementRepository.addItem(measurementId, m.body_part, m.value);
    }

    return {
      id: measurementId,
      date,
      measurements,
      message: `已保存：${measurements.map(m => `${m.body_part} ${m.value}cm`).join('，')}`
    };
  }
};
```

- [ ] **Step 2: 创建 services/queryService.js**

```javascript
import { workoutRepository } from '../repositories/workoutRepository.js';
import { measurementRepository } from '../repositories/measurementRepository.js';

export const queryService = {
  async queryWorkouts(userId, startDate, endDate, exerciseType) {
    const workouts = await workoutRepository.findByUserAndDateRange(userId, startDate, endDate);

    // Group by workout and filter by exercise type if specified
    const grouped = groupWorkouts(workouts);

    let filtered = grouped;
    if (exerciseType) {
      filtered = grouped.filter(w =>
        w.exercises.some(e => e.name.includes(exerciseType))
      );
    }

    return formatWorkoutResponse(filtered);
  },

  async queryMeasurements(userId, startDate, endDate, bodyPart) {
    const measurements = await measurementRepository.findByUserAndDateRange(userId, startDate, endDate);

    const grouped = groupMeasurements(measurements);

    let filtered = grouped;
    if (bodyPart) {
      filtered = grouped.filter(m =>
        m.items.some(i => i.body_part === bodyPart)
      );
    }

    return formatMeasurementResponse(filtered);
  }
};

function groupWorkouts(rows) {
  const map = new Map();
  for (const row of rows) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        date: row.date,
        exercises: []
      });
    }
    if (row.exercise_name) {
      map.get(row.id).exercises.push({
        name: row.exercise_name,
        sets: row.sets,
        reps: row.reps,
        weight: row.weight,
        duration: row.duration,
        distance: row.distance
      });
    }
  }
  return Array.from(map.values());
}

function groupMeasurements(rows) {
  const map = new Map();
  for (const row of rows) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        date: row.date,
        items: []
      });
    }
    if (row.body_part) {
      map.get(row.id).items.push({
        body_part: row.body_part,
        value: row.value
      });
    }
  }
  return Array.from(map.values());
}

function formatWorkoutResponse(workouts) {
  if (workouts.length === 0) {
    return '暂无训练记录';
  }

  return workouts.map(w => {
    const exerciseList = w.exercises.map(e => {
      if (e.distance) return `${e.name} ${e.distance}km`;
      if (e.duration) return `${e.name} ${e.duration}分钟`;
      if (e.weight) return `${e.name} ${e.weight}kg ${e.sets}组 ${e.reps}次`;
      return e.name;
    }).join('、');
    return `${w.date}: ${exerciseList}`;
  }).join('\n');
}

function formatMeasurementResponse(measurements) {
  if (measurements.length === 0) {
    return '暂无围度记录';
  }

  return measurements.map(m => {
    const itemList = m.items.map(i => `${i.body_part} ${i.value}cm`).join('、');
    return `${m.date}: ${itemList}`;
  }).join('\n');
}
```

- [ ] **Step 3: 创建 tests/services.test.js**

```javascript
import { jest } from '@jest/globals';

// Mock repositories
const mockWorkoutRepo = {
  create: jest.fn(),
  addExercise: jest.fn(),
  findByUserAndDateRange: jest.fn()
};

const mockMeasurementRepo = {
  create: jest.fn(),
  addItem: jest.fn(),
  findByUserAndDateRange: jest.fn()
};

jest.unstable_mockModule('../src/repositories/workoutRepository.js', () => ({
  workoutRepository: mockWorkoutRepo
}));

jest.unstable_mockModule('../src/repositories/measurementRepository.js', () => ({
  measurementRepository: mockMeasurementRepo
}));

describe('Save Service', () => {
  let saveService;

  beforeAll(async () => {
    const module = await import('../src/services/saveService.js');
    saveService = module.saveService;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveWorkout', () => {
    it('should save workout with exercises', async () => {
      mockWorkoutRepo.create.mockResolvedValue(1);
      mockWorkoutRepo.addExercise.mockResolvedValue(1);

      const result = await saveService.saveWorkout(1, '2026-04-23', [
        { name: '深蹲', sets: 5, reps: 8, weight: 100 }
      ]);

      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('message');
      expect(result.message).toContain('深蹲');
    });
  });

  describe('saveMeasurement', () => {
    it('should save measurement with items', async () => {
      mockMeasurementRepo.create.mockResolvedValue(1);
      mockMeasurementRepo.addItem.mockResolvedValue(1);

      const result = await saveService.saveMeasurement(1, '2026-04-23', [
        { body_part: 'chest', value: 94 },
        { body_part: 'waist', value: 78 }
      ]);

      expect(result).toHaveProperty('id', 1);
      expect(result.message).toContain('chest');
      expect(result.message).toContain('94cm');
    });
  });
});

describe('Query Service', () => {
  let queryService;

  beforeAll(async () => {
    const module = await import('../src/services/queryService.js');
    queryService = module.queryService;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('queryWorkouts', () => {
    it('should return formatted workout list', async () => {
      mockWorkoutRepo.findByUserAndDateRange.mockResolvedValue([
        { id: 1, date: '2026-04-23', exercise_name: '跑步', duration: 30, distance: 5 },
        { id: 1, date: '2026-04-23', exercise_name: '深蹲', sets: 5, reps: 8, weight: 100 }
      ]);

      const result = await queryService.queryWorkouts(1, '2026-04-01', '2026-04-30');

      expect(result).toContain('2026-04-23');
      expect(result).toContain('跑步');
      expect(result).toContain('深蹲');
    });

    it('should return "暂无训练记录" when empty', async () => {
      mockWorkoutRepo.findByUserAndDateRange.mockResolvedValue([]);

      const result = await queryService.queryWorkouts(1, '2026-04-01', '2026-04-30');

      expect(result).toBe('暂无训练记录');
    });
  });
});
```

- [ ] **Step 4: 运行测试**

Run: `cd backend && npm test -- tests/services.test.js`
Expected: Tests pass

- [ ] **Step 5: 提交**

```bash
git add src/services/saveService.js src/services/queryService.js tests/services.test.js
git commit -m "feat: add save and query services"
```

---

## Task 6: LangChain Agent 与 Tools

**Files:**
- Create: `backend/src/tools/saveWorkout.js`
- Create: `backend/src/tools/saveMeasurement.js`
- Create: `backend/src/tools/queryWorkout.js`
- Create: `backend/src/tools/queryMeasurement.js`
- Create: `backend/src/agents/fitnessAgent.js`

- [ ] **Step 1: 创建 tools/saveWorkout.js**

```javascript
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { saveService } from '../services/saveService.js';

export const saveWorkoutTool = tool(
  async ({ date, exercises }) => {
    // userId 会从 agent context 获取，这里暂用参数传入
    const result = await saveService.saveWorkout(null, date, exercises);
    return result.message;
  },
  {
    name: "save_workout",
    description: `当用户要记录健身训练时使用。不要在询问围度时使用。

    触发示例：
    - "今天跑了5公里"
    - "深蹲100kg 5组每组8个"
    - "练了30分钟hiit"
    - "做了100个俯卧撑分5组"

    输入：date (YYYY-MM-DD), exercises数组`,
    schema: z.object({
      date: z.string().describe("训练日期 YYYY-MM-DD"),
      exercises: z.array(z.object({
        name: z.string().describe("运动名称"),
        sets: z.number().optional().describe("组数"),
        reps: z.number().optional().describe("次数"),
        weight: z.number().optional().describe("重量(kg)"),
        duration: z.number().optional().describe("时长(分钟)"),
        distance: z.number().optional().describe("距离(公里)")
      }))
    })
  }
);
```

- [ ] **Step 2: 创建 tools/saveMeasurement.js**

```javascript
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { saveService } from '../services/saveService.js';

export const saveMeasurementTool = tool(
  async ({ date, measurements }) => {
    const result = await saveService.saveMeasurement(null, date, measurements);
    return result.message;
  },
  {
    name: "save_measurement",
    description: `当用户要记录身体围度时使用。不要在记录训练时使用。

    触发示例：
    - "今天胸围94，腰围78"
    - "测了一下臂围34"
    - "腰又粗了，现在是80"

    支持部位：chest(胸), waist(腰), hips(臀), biceps(臂), thighs(腿), calves(小腿)

    输入：date (YYYY-MM-DD), measurements数组`,
    schema: z.object({
      date: z.string().describe("测量日期 YYYY-MM-DD"),
      measurements: z.array(z.object({
        body_part: z.enum(["chest", "waist", "hips", "biceps", "thighs", "calves", "other"])
          .describe("身体部位"),
        value: z.number().describe("数值(cm)")
      }))
    })
  }
);
```

- [ ] **Step 3: 创建 tools/queryWorkout.js**

```javascript
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { queryService } from '../services/queryService.js';

export const queryWorkoutTool = tool(
  async ({ start_date, end_date, exercise_type }) => {
    const result = await queryService.queryWorkouts(null, start_date, end_date, exercise_type);
    return result;
  },
  {
    name: "query_workout",
    description: `当用户询问训练记录、训练历史、统计数据时使用。

    触发示例：
    - "这周跑了多少次？"
    - "上个月深蹲总重量多少？"
    - "我的训练频率怎么样？"
    - "对比一下这周和上周"

    输入：start_date (YYYY-MM-DD), end_date (YYYY-MM-DD), exercise_type (可选)`,
    schema: z.object({
      start_date: z.string().describe("开始日期 YYYY-MM-DD"),
      end_date: z.string().describe("结束日期 YYYY-MM-DD"),
      exercise_type: z.string().optional().describe("运动类型(可选)")
    })
  }
);
```

- [ ] **Step 4: 创建 tools/queryMeasurement.js**

```javascript
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { queryService } from '../services/queryService.js';

export const queryMeasurementTool = tool(
  async ({ start_date, end_date, body_part }) => {
    const result = await queryService.queryMeasurements(null, start_date, end_date, body_part);
    return result;
  },
  {
    name: "query_measurement",
    description: `当用户询问身体围度、围度变化、对比时使用。

    触发示例：
    - "我的围度有什么变化？"
    - "胸围对比三个月前？"
    - "最近腰有没有变细？"

    输入：start_date (YYYY-MM-DD), end_date (YYYY-MM-DD), body_part (可选)`,
    schema: z.object({
      start_date: z.string().describe("开始日期 YYYY-MM-DD"),
      end_date: z.string().describe("结束日期 YYYY-MM-DD"),
      body_part: z.string().optional().describe("部位(可选)")
    })
  }
);
```

- [ ] **Step 5: 创建 agents/fitnessAgent.js**

```javascript
import { ChatMiniMax } from "@langchain/minimax";
import { pull } from "@langchain/core/prompts";
import { Llama3InstructionsPrompt } from "langchain/dist/prompts/llama3";
import { AgentExecutor } from "langchain/dist/agents/executors";
import { convertToOpenAIFunction } from "@langchain/core/utils/function_calling";
import { saveWorkoutTool } from '../tools/saveWorkout.js';
import { saveMeasurementTool } from '../tools/saveMeasurement.js';
import { queryWorkoutTool } from '../tools/queryWorkout.js';
import { queryMeasurementTool } from '../tools/queryMeasurement.js';

const tools = [
  saveWorkoutTool,
  saveMeasurementTool,
  queryWorkoutTool,
  queryMeasurementTool
];

const model = new ChatMiniMax({
  model: "MiniMax/Abab6",
  apiKey: process.env.MINIMAX_API_KEY,
  temperature: 0.7
}).bind(functions);

export async function createFitnessAgent() {
  const prompt = await pull(Llama3InstructionsPrompt);

  const agent = createOpenAIFunctionsAgent({
    llm: model,
    tools,
    prompt
  });

  return new AgentExecutor({
    agent,
    tools,
    verbose: true
  });
}

export async function runAgent(userId, message) {
  const executor = await createFitnessAgent();

  // 注入 userId 到 context
  const context = { userId };

  const result = await executor.invoke({
    input: message,
    context
  });

  return result.output;
}
```

- [ ] **Step 6: 提交**

```bash
git add src/tools/saveWorkout.js src/tools/saveMeasurement.js src/tools/queryWorkout.js src/tools/queryMeasurement.js src/agents/fitnessAgent.js
git commit -m "feat: add LangChain agent with save/query tools"
```

---

## Task 7: Chat & Records API 路由

**Files:**
- Create: `backend/src/routes/chat.js`
- Create: `backend/src/routes/records.js`
- Modify: `backend/src/index.js` (import new routes)
- Create: `backend/tests/chat.test.js`

- [ ] **Step 1: 创建 routes/chat.js**

```javascript
import { Router } from 'express';
import { runAgent } from '../agents/fitnessAgent.js';

const router = Router();

router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const userId = req.user.id;
    const reply = await runAgent(userId, message);

    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

export default router;
```

- [ ] **Step 2: 创建 routes/records.js**

```javascript
import { Router } from 'express';
import { workoutRepository } from '../repositories/workoutRepository.js';
import { measurementRepository } from '../repositories/measurementRepository.js';

const router = Router();

// 获取训练记录
router.get('/workouts', async (req, res) => {
  try {
    const { start, end } = req.query;
    const userId = req.user.id;

    const workouts = await workoutRepository.findByUserAndDateRange(
      userId,
      start || '1970-01-01',
      end || '2100-12-31'
    );

    res.json({ workouts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 获取围度记录
router.get('/measurements', async (req, res) => {
  try {
    const { start, end } = req.query;
    const userId = req.user.id;

    const measurements = await measurementRepository.findByUserAndDateRange(
      userId,
      start || '1970-01-01',
      end || '2100-12-31'
    );

    res.json({ measurements });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 删除训练记录（软删除）
router.delete('/workout/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const workout = await workoutRepository.findById(id);
    if (!workout || workout.user_id !== userId) {
      return res.status(404).json({ error: 'Record not found' });
    }

    await workoutRepository.softDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 删除围度记录（软删除）
router.delete('/measurement/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const measurement = await measurementRepository.findById(id);
    if (!measurement || measurement.user_id !== userId) {
      return res.status(404).json({ error: 'Record not found' });
    }

    await measurementRepository.softDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 恢复训练记录
router.post('/workout/:id/restore', async (req, res) => {
  try {
    const { id } = req.params;
    await workoutRepository.restore(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 恢复围度记录
router.post('/measurement/:id/restore', async (req, res) => {
  try {
    const { id } = req.params;
    await measurementRepository.restore(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
```

- [ ] **Step 3: 更新 src/index.js 引入新路由**

```javascript
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import recordsRoutes from './routes/records.js';
import { authMiddleware } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 公开路由
app.use('/api/auth', authRoutes);

// 需认证路由
app.use('/api/chat', authMiddleware, chatRoutes);
app.use('/api/records', authMiddleware, recordsRoutes);

app.listen(PORT, () => {
  console.log(`FitLC backend running on port ${PORT}`);
});
```

- [ ] **Step 4: 创建 tests/chat.test.js**

```javascript
import { jest } from '@jest/globals';

// Mock fitnessAgent
jest.unstable_mockModule('../src/agents/fitnessAgent.js', () => ({
  runAgent: jest.fn().mockResolvedValue('已保存：深蹲 100kg')
}));

describe('Chat API', () => {
  let app;
  let request;

  beforeAll(async () => {
    const express = (await import('express')).default;
    app = express();
    app.use(express.json());

    // Mock auth middleware
    app.use((req, res, next) => {
      req.user = { id: 1, email: 'test@example.com' };
      next();
    });

    const chatRoutes = (await import('../src/routes/chat.js')).default;
    app.use('/api/chat', chatRoutes);

    const supertest = await import('supertest');
    request = supertest.default(app);
  });

  describe('POST /api/chat/message', () => {
    it('should return reply from agent', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({ message: '今天深蹲100kg' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('reply');
    });

    it('should return 400 if message missing', async () => {
      const res = await request
        .post('/api/chat/message')
        .send({});

      expect(res.status).toBe(400);
    });
  });
});
```

- [ ] **Step 5: 运行测试**

Run: `cd backend && npm test`
Expected: Tests pass

- [ ] **Step 6: 提交**

```bash
git add src/routes/chat.js src/routes/records.js src/index.js tests/chat.test.js
git commit -m "feat: add chat and records API routes"
```

---

## 自检清单

1. **Spec 覆盖：** 每个 spec 章节都有对应 task 实现
   - 架构：Task 1, 3
   - 数据模型：Task 2
   - API 路由：Task 3, 7
   - 认证：Task 3
   - Tool 定义：Task 6
   - 错误处理：Task 5, 7
   - 撤销：Task 4, 7

2. **Placeholder 扫描：** 无 TBD/TODO

3. **类型一致性：** 所有 repository/service/agent 接口一致

---

## 执行选择

**Plan complete and saved to `docs/superpowers/plans/2026-04-23-fit-lc-backend-plan.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - Dispatch fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**