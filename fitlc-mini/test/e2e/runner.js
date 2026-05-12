// fitlc-mini/test/e2e/runner.js
// 统一 E2E 测试运行器
const path = require('path');

let automator;
try {
  automator = require('miniprogram-automator');
} catch (e) {
  console.error('Failed to load miniprogram-automator:', e.message);
  console.log('\n需要安装依赖: npm install');
  process.exit(1);
}

const PROJECT_PATH = path.resolve(__dirname, '../..');

let passed = 0;
let failed = 0;

global.miniProgram = null;

// 收集测试用例
const tests = [];

// Jest-like expect
global.expect = (actual) => ({
  toBeDefined: () => {
    if (actual === undefined || actual === null) {
      throw new Error(`Expected value to be defined, but got ${actual}`);
    }
  },
  toContain: (expected) => {
    if (!String(actual).includes(expected)) {
      throw new Error(`Expected "${actual}" to contain "${expected}"`);
    }
  },
  toBe: (expected) => {
    if (actual !== expected) {
      throw new Error(`Expected ${actual} to be ${expected}`);
    }
  },
  toBeTruthy: () => {
    if (!actual) {
      throw new Error(`Expected ${actual} to be truthy`);
    }
  },
  toBeGreaterThanOrEqual: (expected) => {
    if (actual < expected) {
      throw new Error(`Expected ${actual} to be >= ${expected}`);
    }
  }
});

global.describe = (suiteName, fn) => {
  fn();
};

global.test = (testName, fn) => {
  tests.push({ suiteName: global._currentSuite || '', testName, fn });
};

global.it = global.test;
global.beforeAll = (fn) => { global._beforeAll = fn; };
global.afterAll = (fn) => { global._afterAll = fn; };

// 导航辅助函数 - 在分包页面导航前关闭当前页面避免 webview 超限
global.navigateTo = async (path) => {
  try {
    const page = await global.miniProgram.currentPage();
    if (page) {
      await page.close();
    }
  } catch (e) {
    // 忽略关闭错误
  }
  await global.miniProgram.navigateTo(path);
};

async function runTests() {
  console.log('🧪 七练小程序 E2E 测试\n');
  console.log('项目路径:', PROJECT_PATH);

  let miniProgram;

  try {
    console.log('\n📱 启动微信小程序...');
    miniProgram = await automator.launch({
      projectPath: PROJECT_PATH
    });
    global.miniProgram = miniProgram;
    console.log('✓ 启动成功\n');

    const specs = [
      { file: './specs/chat.test.js', name: '聊天页面' },
      { file: './specs/profile.test.js', name: '个人中心' },
      { file: './specs/exercises.test.js', name: '动作库' }
    ];

    for (const spec of specs) {
      tests.length = 0;
      delete global._beforeAll;
      delete global._afterAll;

      console.log(`\n▶ ${spec.name}`);
      global._currentSuite = spec.name;

      try {
        require(spec.file);

        if (global._beforeAll) {
          await global._beforeAll();
        }

        for (const t of tests) {
          try {
            await t.fn();
            passed++;
            console.log(`    ✓ ${t.testName}`);
          } catch (e) {
            failed++;
            console.log(`    ✗ ${t.testName}: ${e.message}`);
          }
        }
      } catch (e) {
        console.log(`  ✗ ${spec.name} 加载失败: ${e.message}`);
        failed++;
      }
    }

    console.log('\n📱 关闭小程序...');
    await miniProgram.close();

  } catch (e) {
    console.error('\n❌ 测试执行失败:', e.message);
  }

  console.log('\n' + '='.repeat(40));
  console.log(`通过: ${passed}  |  失败: ${failed}`);
  console.log('='.repeat(40));

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
