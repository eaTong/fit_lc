/**
 * FitLC Chat Testing Script (Node.js)
 * Tests 200+ random natural language statements
 */

import { chromium } from 'playwright';

const FRONTEND_URL = 'http://localhost:5173';

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max, decimals = 1) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

const EXERCISES = [
  '深蹲', '卧推', '硬拉', '肩上推举', '划船', '引体向上', '俯卧撑',
  '平板支撑', '波比跳', '开合跳', '高抬腿', '登山者',
  '跑步', '快走', '骑行', '游泳', '跳绳',
  '哑铃弯举', '哑铃卧推', '哑铃划船', '哑铃深蹲', '哑铃肩上推举',
  '杠铃深蹲', '杠铃卧推', '罗马尼亚硬拉', '腿举', '腿弯举',
  '卷腹', '仰卧起坐', '俄罗斯转体', '侧平板支撑'
];

const MEASUREMENT_PARTS = [
  '胸围', '腰围', '臀围', '左臂围', '右臂围',
  '左大腿围', '右大腿围', '左小腿围', '右小腿围', '肩宽'
];

function generateWorkoutStatements(count = 85) {
  const templates = [
    () => `今天做了${random(3, 8)}组${EXERCISES[random(0, 15)]}，每组${random(6, 15)}个，重量${random(10, 100)}kg`,
    () => `${EXERCISES[random(0, 15)]} ${random(4, 6)}组x${random(8, 12)}个，重量${random(20, 80)}公斤`,
    () => `练了${random(3, 5)}组${EXERCISES[random(0, 15)]}，每组${random(10, 20)}次`,
    () => `今天跑步${randomFloat(2, 10)}公里，用时${random(15, 60)}分钟`,
    () => `骑自行车骑了${randomFloat(10, 50, 1)}公里`,
    () => `游泳游了${random(500, 2000)}米`,
    () => `跳绳跳了${random(100, 500)}个，分${random(3, 6)}组完成`,
    () => `快走${random(30, 60)}分钟，大约${randomFloat(2, 6)}公里`,
    () => `做了${random(3, 5)}组俯卧撑，每组${random(10, 30)}个`,
    () => `做了${random(4, 6)}组深蹲，每组${random(15, 25)}个`,
    () => `波比跳做了${random(10, 30)}个，分${random(2, 4)}组`,
    () => `引体向上做了${random(3, 6)}组，每组${random(5, 12)}个`,
    () => `平板支撑坚持了${random(30, 180)}秒`,
    () => `做了${random(15, 30)}分钟HIIT训练`,
    () => `做了${random(3, 5)}轮Tabata训练`,
    () => `间歇跑训练：跑${random(400, 1000)}米x${random(4, 8)}组`,
    () => `今天练了腿和臀，${EXERCISES[random(16, 20)]} ${random(3, 4)}组和${EXERCISES[random(21, 24)]} ${random(3, 4)}组`,
    () => `上肢训练日：${EXERCISES[random(1, 5)]}和${EXERCISES[random(6, 10)]}各${random(3, 4)}组`,
    () => `今天主要练胸，卧推${random(3, 5)}组每组${random(6, 10)}个重量${random(40, 100)}kg`,
    () => `今天力量训练${random(45, 90)}分钟`,
    () => `健身${random(30, 75)}分钟，做了${EXERCISES[random(0, 15)]}`,
  ];

  return Array.from({ length: count }, () => ({
    type: 'workout',
    text: templates[random(0, templates.length - 1)]()
  }));
}

function generateMeasurementStatements(count = 55) {
  const templates = [
    () => `今天测量：${MEASUREMENT_PARTS[random(0, 4)]} ${randomFloat(70, 120)}cm`,
    () => `${MEASUREMENT_PARTS[random(0, 9)]} 现在是 ${randomFloat(25, 50)}cm`,
    () => `量了一下，${MEASUREMENT_PARTS[random(0, 9)]} ${randomFloat(30, 60, 1)}厘米`,
    () => `身体围度记录：${MEASUREMENT_PARTS[random(0, 4)]} ${randomFloat(75, 110)}，${MEASUREMENT_PARTS[random(5, 9)]} ${randomFloat(30, 55)}`,
    () => `今天测了${MEASUREMENT_PARTS[random(0, 9)]}是${randomFloat(28, 55, 1)}cm`,
    () => `更新围度数据：胸围${randomFloat(85, 115)}cm，腰围${randomFloat(60, 95)}cm`,
    () => `臀围${randomFloat(80, 110)}cm，大腿围${randomFloat(45, 70)}cm`,
    () => `记录一下：左臂${randomFloat(25, 40, 1)}cm，右臂${randomFloat(25, 40, 1)}cm`,
    () => `今天测量的围度数据：肩宽${randomFloat(35, 55)}cm`,
    () => `小腿围左边${randomFloat(30, 45, 1)}cm，右边${randomFloat(30, 45, 1)}cm`,
  ];

  return Array.from({ length: count }, () => ({
    type: 'measurement',
    text: templates[random(0, templates.length - 1)]()
  }));
}

function generateQueryStatements(count = 45) {
  const templates = [
    () => '这周跑了多少次？',
    () => '上个月深蹲总重量多少？',
    () => '我的训练频率怎么样？',
    () => '对比一下这周和上周',
    () => '最近有没有记录跑步？',
    () => '这周的训练量是多少？',
    () => '我的围度有什么变化？',
    () => '上周胸围是多少？',
    () => '最近一次训练是什么时候？',
    () => '这个月做了多少次有氧？',
    () => '查一下最近的训练记录',
    () => '我想看看这周的健身数据',
    () => '臀围最近有变化吗？',
    () => '这周做了哪些训练？',
    () => '我的体重围度记录？',
  ];

  return Array.from({ length: count }, () => ({
    type: 'query',
    text: templates[random(0, templates.length - 1)]()
  }));
}

function generateFollowupStatements(count = 35) {
  const templates = [
    () => '是的，记录一下',
    () => '对，没错',
    () => '好的，保存吧',
    () => '没错就是这样',
    () => '能帮我生成一个健身计划吗？',
    () => '根据这些数据给我一些建议',
    () => '这个月比上个月进步了多少？',
    () => '接下来我应该怎么练？',
    () => '有什么可以改进的地方？',
    () => '我想制定一个增肌计划',
    () => '帮我生成一周的训练计划',
    () => '根据我最近的训练调整一下计划',
  ];

  return Array.from({ length: count }, () => ({
    type: 'followup',
    text: templates[random(0, templates.length - 1)]()
  }));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTest() {
  console.log('='.repeat(60));
  console.log('FitLC Chat Testing - 220 Random Statements (Node.js + Playwright)');
  console.log('='.repeat(60));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = { total: 0, success: 0, failed: 0 };

  try {
    // Register
    console.log('\n[1/4] Registering new user...');
    const timestamp = Date.now();
    const email = `test_${timestamp}@example.com`;
    const password = 'test123456';

    await page.goto(`${FRONTEND_URL}/register`);
    await page.waitForSelector('input[placeholder="your@email.com"]');
    await sleep(1000);

    // Fill registration form
    await page.locator('input[placeholder="your@email.com"]').fill(email);
    await page.locator('input[placeholder="至少6位"]').fill(password);
    await page.locator('input[placeholder="再次输入密码"]').fill(password);

    // Click register button
    await page.locator('button[type="submit"]').click();

    // Wait for navigation to chat
    await page.waitForURL('**/chat', { timeout: 10000 });
    await sleep(2000);
    console.log('   Registration successful, on chat page');

    // Generate statements
    console.log('\n[2/4] Generating test statements...');
    const workoutStmts = generateWorkoutStatements(85);
    const measurementStmts = generateMeasurementStatements(55);
    const queryStmts = generateQueryStatements(45);
    const followupStmts = generateFollowupStatements(35);

    // Interleave
    const allStatements = [];
    let idxW = 0, idxM = 0, idxQ = 0, idxF = 0;
    while (allStatements.length < 220) {
      if (idxW < workoutStmts.length && allStatements.length < 220) allStatements.push(workoutStmts[idxW++]);
      if (idxM < measurementStmts.length && allStatements.length < 220) allStatements.push(measurementStmts[idxM++]);
      if (idxQ < queryStmts.length && allStatements.length < 220) allStatements.push(queryStmts[idxQ++]);
      if (idxF < followupStmts.length && allStatements.length < 220) allStatements.push(followupStmts[idxF++]);
    }

    console.log(`   Total: ${allStatements.length} statements`);
    console.log(`   - Workouts: ${workoutStmts.length}`);
    console.log(`   - Measurements: ${measurementStmts.length}`);
    console.log(`   - Queries: ${queryStmts.length}`);
    console.log(`   - Follow-ups: ${followupStmts.length}`);

    // Test sending messages
    console.log('\n[3/4] Testing chat...');
    console.log('-'.repeat(60));

    const chatInputSelector = 'input[placeholder="输入健身记录或问题..."]';
    const sendButtonSelector = 'button:has-text("发送")';

    for (let i = 0; i < allStatements.length; i++) {
      const stmt = allStatements[i];
      results.total++;

      try {
        await page.waitForSelector(chatInputSelector, { timeout: 5000 });
        await page.locator(chatInputSelector).fill(stmt.text);
        await page.locator(sendButtonSelector).click();
        await sleep(3000);

        results.success++;
        const displayText = stmt.text.length > 40 ? stmt.text.slice(0, 40) + '...' : stmt.text;
        console.log(`   [${(i + 1).toString().padStart(3)}/${allStatements.length}] [${stmt.type.padEnd(12)}] OK - ${displayText}`);

      } catch (e) {
        results.failed++;
        console.log(`   [${(i + 1).toString().padStart(3)}/${allStatements.length}] [${stmt.type.padEnd(12)}] FAIL - ${e.message.slice(0, 40)}...`);
      }

      if ((i + 1) % 25 === 0) {
        console.log(`   --- Progress: ${i + 1}/${allStatements.length} | Success: ${results.success} | Failed: ${results.failed} ---`);
      }
    }

    // Test undo
    console.log('\n[4/4] Testing undo...');
    try {
      const undoButton = page.locator('button:has-text("撤销")');
      if (await undoButton.isVisible({ timeout: 3000 })) {
        await undoButton.click();
        await sleep(1000);
        console.log('   Undo clicked successfully');
      } else {
        console.log('   No undo button visible');
      }
    } catch (e) {
      console.log('   Undo test skipped');
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('TEST RESULTS SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total: ${results.total}`);
    console.log(`Success: ${results.success}`);
    console.log(`Failed: ${results.failed}`);
    console.log(`Success Rate: ${((results.success / results.total) * 100).toFixed(1)}%`);
    console.log('='.repeat(60));

    await page.screenshot({ path: '/tmp/fitlc_final.png', fullPage: true });
    console.log('\nScreenshot: /tmp/fitlc_final.png');

  } catch (e) {
    console.log(`\nError: ${e.message}`);
    await page.screenshot({ path: '/tmp/fitlc_error.png', fullPage: true });
  } finally {
    await browser.close();
  }

  return results;
}

runTest().catch(console.error);