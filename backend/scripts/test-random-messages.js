import fetch from 'node-fetch';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE = 'http://localhost:3000/api';

// 生成随机数
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max, decimals = 1) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

// 生成随机日期（最近30天）
const randomDate = () => {
  const now = new Date();
  const daysAgo = random(0, 30);
  const date = new Date(now);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// 运动名称库
const exerciseNames = [
  '深蹲', '卧推', '硬拉', '肩上推举', '划船', '引体向上', '俯卧撑',
  '平板支撑', '波比跳', '开合跳', '高抬腿', '登山者',
  '跑步', '快走', '骑行', '游泳', '跳绳',
  '哑铃弯举', '哑铃卧推', '哑铃划船', '哑铃深蹲', '哑铃肩上推举',
  '杠铃深蹲', '杠铃卧推', '罗马尼亚硬拉', '腿举', '腿弯举',
  '卷腹', '仰卧起坐', '俄罗斯转体', '平板支撑', '侧平板支撑'
];

// 围度部位库
const measurementParts = [
  '胸围', '腰围', '臀围', '左臂围', '右臂围',
  '左大腿围', '右大腿围', '左小腿围', '右小腿围', '肩宽'
];

// 生成运动记录语句
const generateWorkoutStatements = () => {
  const templates = [
    // 力量训练
    () => `今天做了${random(3, 8)}组${exerciseNames[random(0, 15)]}，每组${random(6, 15)}个，重量${random(10, 100)}kg`,
    () => `${exerciseNames[random(0, 15)]} ${random(4, 6)}组x${random(8, 12)}个，重量${random(20, 80)}公斤`,
    () => `练了${random(3, 5)}组${exerciseNames[random(0, 15)]}，每组${random(10, 20)}次`,

    // 有氧训练
    () => `今天跑步${randomFloat(2, 10)}公里，用时${random(15, 60)}分钟`,
    () => `骑自行车骑了${randomFloat(10, 50, 1)}公里`,
    () => `游泳游了${random(500, 2000)}米`,
    () => `跳绳跳了${random(100, 500)}个，分${random(3, 6)}组完成`,
    () => `快走${random(30, 60)}分钟，大约${randomFloat(2, 6)}公里`,

    // 自重训练
    () => `做了${random(3, 5)}组俯卧撑，每组${random(10, 30)}个`,
    () => `做了${random(4, 6)}组深蹲，每组${random(15, 25)}个`,
    () => `波比跳做了${random(10, 30)}个，分${random(2, 4)}组`,
    () => `引体向上做了${random(3, 6)}组，每组${random(5, 12)}个`,
    () => `平板支撑坚持了${random(30, 180)}秒`,

    // HIIT
    () => `做了${random(15, 30)}分钟HIIT训练`,
    () => `做了${random(3, 5)}轮Tabata训练`,
    () => `间歇跑训练：跑${random(400, 1000)}米x${random(4, 8)}组`,

    // 组合训练
    () => `今天练了腿和臀，${exerciseNames[random(16, 20)]} ${random(3, 4)}组和${exerciseNames[random(21, 24)]} ${random(3, 4)}组`,
    () => `上肢训练日：${exerciseNames[random(1, 5)]}和${exerciseNames[random(6, 10)]}各${random(3, 4)}组`,
    () => `今天主要练胸，卧推${random(3, 5)}组每组${random(6, 10)}个重量${random(40, 100)}kg`,

    // 其他
    () => `今天力量训练${random(45, 90)}分钟`,
    () => `练了${random(3, 5)}组${exerciseNames[random(0, 15)]}`,
    () => `健身${random(30, 75)}分钟，做了${exerciseNames[random(0, 15)]}`
  ];

  return templates[random(0, templates.length - 1)]();
};

// 生成围度记录语句
const generateMeasurementStatements = () => {
  const templates = [
    () => `今天测量：${measurementParts[random(0, 4)]} ${randomFloat(70, 120)}cm`,
    () => `${measurementParts[random(0, 9)]} 现在是 ${randomFloat(25, 50)}cm`,
    () => `量了一下，${measurementParts[random(0, 9)]} ${randomFloat(30, 60, 1)}厘米`,
    () => `身体围度记录：${measurementParts[random(0, 4)]} ${randomFloat(75, 110)}，${measurementParts[random(5, 9)]} ${randomFloat(30, 55)}`,
    () => `今天测了${measurementParts[random(0, 9)]}是${randomFloat(28, 55, 1)}cm`,
    () => `更新围度数据：胸围${randomFloat(85, 115)}cm，腰围${randomFloat(60, 95)}cm`,
    () => `臀围${randomFloat(80, 110)}cm，大腿围${randomFloat(45, 70)}cm`,
    () => `记录一下：左臂${randomFloat(25, 40, 1)}cm，右臂${randomFloat(25, 40, 1)}cm`,
    () => `今天测量的围度数据：肩宽${randomFloat(35, 55)}cm`,
    () => `小腿围左边${randomFloat(30, 45, 1)}cm，右边${randomFloat(30, 45, 1)}cm`
  ];

  return templates[random(0, templates.length - 1)]();
};

// 生成200+条语句
const generateStatements = (count) => {
  const statements = [];
  for (let i = 0; i < count; i++) {
    // 70% 运动记录，30% 围度记录
    if (Math.random() < 0.7) {
      statements.push({
        type: 'workout',
        text: generateWorkoutStatements(),
        date: randomDate()
      });
    } else {
      statements.push({
        type: 'measurement',
        text: generateMeasurementStatements(),
        date: randomDate()
      });
    }
  }
  return statements;
};

// 主测试函数
async function runTest() {
  console.log('开始测试...\n');

  // 1. 注册测试用户
  const testEmail = `test_${Date.now()}@example.com`;
  const testPassword = 'test123456';

  console.log(`1. 注册用户: ${testEmail}`);
  const registerRes = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: testPassword })
  });
  const registerData = await registerRes.json();
  console.log(`   注册结果: ${registerRes.status}`);
  if (!registerRes.ok) {
    console.log(`   错误: ${JSON.stringify(registerData)}`);
    return;
  }
  console.log(`   用户ID: ${registerData.user?.id}`);

  // 2. 登录获取token
  console.log(`\n2. 登录获取token`);
  const loginRes = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: testPassword })
  });
  const loginData = await loginRes.json();
  console.log(`   登录结果: ${loginRes.status}`);
  if (!loginRes.ok) {
    console.log(`   错误: ${JSON.stringify(loginData)}`);
    return;
  }
  const token = loginData.token;
  console.log(`   Token获取成功`);

  // 3. 生成并发送200+条语句
  const statements = generateStatements(220);
  console.log(`\n3. 生成${statements.length}条测试语句`);

  const results = {
    success: 0,
    failed: 0,
    errors: []
  };

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    try {
      const res = await fetch(`${API_BASE}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: stmt.text })
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        results.success++;
        if (i < 5) {
          console.log(`   [${i + 1}] ${stmt.type}: ${stmt.text.substring(0, 40)}...`);
          console.log(`       回复: ${data.reply.substring(0, 60)}...`);
        } else if (i === 5) {
          console.log(`   ... (后续输出省略)`);
        }
      } else {
        results.failed++;
        results.errors.push({ index: i, text: stmt.text, error: data.error || 'Unknown error' });
      }
    } catch (err) {
      results.failed++;
      results.errors.push({ index: i, text: stmt.text, error: err.message });
    }

    // 每50条输出进度
    if ((i + 1) % 50 === 0) {
      console.log(`   进度: ${i + 1}/${statements.length} - 成功: ${results.success}, 失败: ${results.failed}`);
    }

    // 避免请求过快
    await new Promise(r => setTimeout(r, 50));
  }

  // 4. 打印结果
  console.log('\n========================================');
  console.log('测试结果汇总');
  console.log('========================================');
  console.log(`总语句数: ${statements.length}`);
  console.log(`成功保存: ${results.success}`);
  console.log(`保存失败: ${results.failed}`);
  console.log(`成功率: ${((results.success / statements.length) * 100).toFixed(1)}%`);

  if (results.failed > 0) {
    console.log('\n失败记录:');
    results.errors.slice(0, 10).forEach(e => {
      console.log(`  [${e.index + 1}] ${e.text.substring(0, 50)}...`);
      console.log(`         错误: ${e.error}`);
    });
    if (results.errors.length > 10) {
      console.log(`  ... 还有${results.errors.length - 10}条失败记录`);
    }
  }

  // 5. 验证数据
  console.log('\n验证保存的数据...');
  const workoutsRes = await fetch(`${API_BASE}/records/workouts`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const workouts = await workoutsRes.json();

  const measurementsRes = await fetch(`${API_BASE}/records/measurements`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const measurements = await measurementsRes.json();

  console.log(`训练记录数: ${Array.isArray(workouts) ? workouts.length : workouts.data?.length || 0}`);
  console.log(`围度记录数: ${Array.isArray(measurements) ? measurements.length : measurements.data?.length || 0}`);
}

runTest().catch(console.error);