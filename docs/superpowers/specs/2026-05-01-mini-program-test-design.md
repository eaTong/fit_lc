# FitLC Mini Program 自动化测试方案

## 概述

为 FitLC 微信小程序建立分层自动化测试体系，覆盖单元测试、页面逻辑测试、E2E 测试三个层级。

## 技术选型

| 层级 | 工具 | 原因 |
|------|------|------|
| 单元测试 | Jest | 标准 JS 测试框架，配置灵活 |
| 页面逻辑测试 | Jest + Manual Mock | 小程序页面逻辑独立，直接测试 |
| E2E 测试 | miniprogram-automator | 微信官方自动化工具 |

## 目录结构

```
fitlc-mini/
├── test/
│   ├── unit/                 # 单元测试
│   │   └── utils/
│   │       ├── format.test.js
│   │       └── storage.test.js
│   ├── page/               # 页面逻辑测试
│   │   └── chat/
│   │       └── index.test.js
│   └── e2e/                # E2E 测试
│       └── specs/
│           ├── login.spec.js
│           └── chat.spec.js
├── jest.config.js
└── package.json
```

## 测试分层

### Layer 1: 单元测试

**范围：** 纯工具函数、业务逻辑

```javascript
// test/unit/utils/format.test.js
const format = require('../../../../utils/format');

describe('format', () => {
  test('formatRelativeTime', () => {
    const now = Date.now();
    expect(format.formatRelativeTime(now)).toBe('刚刚');
  });
});
```

### Layer 2: 页面逻辑测试

**范围：** 页面 onLoad, onSend 等方法逻辑

**Mock 策略：**
- Mock `wx.request` 返回预设数据
- Mock `wx.redirectTo`、`wx.navigateTo`
- Mock `getApp()` 返回测试 store

```javascript
// test/page/chat/index.test.js
const mockApp = { store: { getState: () => ({}), subscribe: () => () => {} } };

jest.mock('../../../../utils/storage', () => ({ getCachedMessages: () => [] }));
jest.mock('../../../../store/actions', () => ({ chatActions: { loadMessages: () => {} } }));
jest.mock('../../../../utils/format', () => ({ formatRelativeTime: () => '' }));

describe('Chat Page', () => {
  test('onLoad redirect when not auth', () => {
    // 测试登录校验逻辑
  });
});
```

### Layer 3: E2E 测试

**范围：** 真实 UI + 真实 API

**覆盖范围：**
| 可测试 | 不可测试 |
|--------|----------|
| 登录/注册流程 | 录音功能 |
| 页面跳转 | 相机 |
| 表单输入提交 | AI 响应时间 |

**E2E 用例：**

```javascript
// test/e2e/specs/login.spec.js
const automator = require('miniprogram-automator');

describe('Login Flow', () => {
  let miniProgram;

  beforeAll(async () => {
    miniProgram = await automator.launch({
      projectPath: './fitlc-mini'
    });
  });

  test('login with valid credentials', async () => {
    await miniProgram.navigateTo('/pages/login/index');
    await miniProgram.page.waitFor('input[type="phone"]');
    await miniProgram.page.input('input[type="phone"]', '13800138000');
    await miniProgram.page.input('input[type="password"]', 'Test123456');
    await miniProgram.page.tap('.login-btn');
    // 验证跳转
  });
});
```

## 环境配置

### 后端 API
- 地址：`http://localhost:3000`
- 启动：`cd backend && npm run dev`

### 测试数据
- 通过 `backend/scripts/seed.ts` 生成测试用户
- 默认测试账号：`test@example.com` / `Test123456`

### 运行命令

```bash
# 单元测试
cd fitlc-mini && npm test

# E2E 测试（需打开微信开发者工具）
cd fitlc-mini && npm run test:e2e
```

## 依赖安装

```json
{
  "scripts": {
    "test": "jest",
    "test:e2e": "miniprogram-automator test"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "miniprogram-automator": "^2.2.0"
  }
}
```

## Jest 配置

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.js'],
  moduleDirectories: ['node_modules', '..'],
  // Mock 微信 API
  globalConfig: {
    wx: {
      request: jest.fn(),
      redirectTo: jest.fn(),
      navigateTo: jest.fn(),
    }
  }
};
```

## 测试用例规划

### Unit (8 cases)
- [ ] format.formatRelativeTime - 时间格式化
- [ ] format.formatWeight - 重量格式化
- [ ] storage.getCachedMessages - 消息缓存
- [ ] storage.setCachedMessages - 消息缓存写入
- [ ] authActions.checkAuth - 登录校验
- [ ] chatActions.loadMessages - 加载消息
- [ ] chatActions.sendMessage - 发送消息
- [ ] recordActions.syncAfterSave - 同步保存

### Page Logic (6 cases)
- [ ] chat/index.onLoad - 加载校验
- [ ] chat/index.onSend - 发送消息
- [ ] chat/index.scrollToBottom - 滚动到底部
- [ ] login/index.onSubmit - 表单提交
- [ ] profile/index.onLoad - 个人资料加载
- [ ] exercises/index.onLoad - 动作库加载

### E2E (9 cases)
- [ ] login.spec.js - 登录成功
- [ ] login.spec.js - 登录失败（错误密码）
- [ ] login.spec.js - 无账号跳转
- [ ] chat.spec.js - 发送消息
- [ ] chat.spec.js - 页面跳转（从聊天页到个人中心）
- [ ] chat.spec.js - 消息列表加载
- [ ] profile.spec.js - 个人资料展示
- [ ] exercises.spec.js - 动作库列表
- [ ] exercises.spec.js - 动作详情查看

## 限制说明

1. E2E 需本地打开微信开发者工具
2. 录音、相机等原生功能无法测试
3. AI 响应时间不稳定，E2E 中跳过或 Mock