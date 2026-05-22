const fs = require('fs');

// 工具 TabBar 图标 - 扳手/工具组合
const toolsIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81 81" width="81" height="81">
  <title>工具</title>

  <!-- 工具图标 - 组合：扳手+哑铃 -->
  <g transform="translate(10, 10)">
    <!-- 扳手主体 -->
    <path d="M 20 8 L 32 20 L 28 24 L 16 12 Z" fill="#ff4500"/>
    <path d="M 32 20 L 44 8 L 48 12 L 36 24 Z" fill="#ff4500"/>

    <!-- 扳手柄 -->
    <rect x="14" y="22" width="12" height="36" rx="2" fill="#ff4500" transform="rotate(-45, 20, 40)"/>

    <!-- 哑铃杠 -->
    <rect x="8" y="48" width="45" height="6" rx="3" fill="#ff4500"/>

    <!-- 哑铃片左 -->
    <rect x="6" y="42" width="8" height="18" rx="2" fill="#ff4500"/>

    <!-- 哑铃片右 -->
    <rect x="48" y="42" width="8" height="18" rx="2" fill="#ff4500"/>
  </g>
</svg>`;

// 10*10 训练图标 - 表格/网格
const workout10x10Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81 81" width="81" height="81">
  <title>10*10训练</title>

  <g transform="translate(10, 10)">
    <!-- 10x10 网格图案 -->
    <!-- 横向线 -->
    <rect x="5" y="12" width="50" height="4" rx="2" fill="#ff4500"/>
    <rect x="5" y="24" width="50" height="4" rx="2" fill="#ff4500"/>
    <rect x="5" y="36" width="50" height="4" rx="2" fill="#ff4500"/>
    <rect x="5" y="48" width="50" height="4" rx="2" fill="#ff4500"/>

    <!-- 纵向线 -->
    <rect x="12" y="8" width="4" height="44" rx="2" fill="#ff4500"/>
    <rect x="24" y="8" width="4" height="44" rx="2" fill="#ff4500"/>
    <rect x="36" y="8" width="4" height="44" rx="2" fill="#ff4500"/>
    <rect x="48" y="8" width="4" height="44" rx="2" fill="#ff4500"/>
  </g>
</svg>`;

// 计数器图标 - 数字递进
const counterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81 81" width="81" height="81">
  <title>计数器</title>

  <g transform="translate(8, 12)">
    <!-- 数字 1, 2, 3 递进 -->
    <text x="5" y="24" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#888888">1</text>
    <text x="22" y="32" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ff4500">2</text>
    <text x="44" y="44" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#ff4500">3</text>

    <!-- 底部加号 -->
    <rect x="48" y="50" width="18" height="4" rx="2" fill="#ff4500"/>
    <rect x="55" y="43" width="4" height="18" rx="2" fill="#ff4500"/>
  </g>
</svg>`;

// 计时器图标 - 时钟/倒计时
const timerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81 81" width="81" height="81">
  <title>计时器</title>

  <g transform="translate(10, 10)">
    <!-- 圆形表盘 -->
    <circle cx="30" cy="30" r="28" fill="none" stroke="#ff4500" stroke-width="5"/>

    <!-- 时针 -->
    <line x1="30" y1="30" x2="30" y2="14" stroke="#ff4500" stroke-width="4" stroke-linecap="round"/>

    <!-- 分针 -->
    <line x1="30" y1="30" x2="42" y2="30" stroke="#ff4500" stroke-width="3" stroke-linecap="round"/>

    <!-- 顶部装饰 -->
    <rect x="26" y="2" width="8" height="6" rx="2" fill="#ff4500"/>

    <!-- 底部指针装饰 -->
    <circle cx="30" cy="30" r="4" fill="#ff4500"/>
  </g>
</svg>`;

// 保存文件
const basePath = '/Users/eatong/eaTong_projects/fit_lc/fitlc-mini/assets/';

// 保存 TabBar 工具图标
fs.writeFileSync(basePath + 'tabbar/tools.svg', toolsIconSvg);
console.log('TabBar tools 图标已保存');

// 保存工具详情页图标
fs.writeFileSync(basePath + 'tools/workout-10x10.svg', workout10x10Svg);
fs.writeFileSync(basePath + 'tools/counter.svg', counterSvg);
fs.writeFileSync(basePath + 'tools/timer.svg', timerSvg);
console.log('工具详情页图标已保存');

// 生成 PNG 版本（需要转换为 PNG）
// 注：小程序 TabBar 需要 PNG 图标，这里生成 SVG 供设计参考
console.log('\n图标设计完成，建议使用 Design Tools 将 SVG 转换为 PNG：');
console.log('- assets/tabbar/tools.png (81x81)');
console.log('- assets/tools/workout-10x10.png');
console.log('- assets/tools/counter.png');
console.log('- assets/tools/timer.png');