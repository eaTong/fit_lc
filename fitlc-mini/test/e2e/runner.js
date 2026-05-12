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

    // 主 tab 页面测试
    const mainSpecs = [
      { file: './specs/chat.test.js', name: '聊天页面' },
      { file: './specs/profile.test.js', name: '个人中心' },
      { file: './specs/exercises.test.js', name: '动作库' }
    ];

    // 分包页面测试
    const subpackageSpecs = [
      { file: './specs/plans.test.js', name: '健身计划' },
      { file: './specs/measurements.test.js', name: '围度记录' },
      { file: './specs/badges.test.js', name: '徽章墙' },
      { file: './specs/calendar.test.js', name: '日历' },
      { file: './specs/gallery.test.js', name: '相册' }
    ];

    // 运行主 tab 页面测试
    console.log('======== 主 Tab 页面测试 ========');
    for (const spec of mainSpecs) {
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

    // 运行分包页面测试
    console.log('\n======== 分包页面测试 ========');
    for (const spec of subpackageSpecs) {
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
    if (miniProgram) {
      try {
        await miniProgram.close();
      } catch (closeErr) {
        // 忽略关闭错误
      }
    }
  }

  console.log('\n' + '='.repeat(40));
  console.log(`通过: ${passed}  |  失败: ${failed}`);
  console.log('='.repeat(40));

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
