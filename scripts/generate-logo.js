const fs = require('fs');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <title>七练 Logo</title>

  <defs>
    <linearGradient id="sevenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff5500"/>
      <stop offset="100%" stop-color="#ff3300"/>
    </linearGradient>
  </defs>

  <!-- 背景 -->
  <rect width="512" height="512" fill="#0a0a0a"/>

  <!-- 数字7 - 左右翻转，只保留7 -->
  <g transform="translate(0, 40)">
    <!-- 顶部横杠 -->
    <rect x="72" y="140" width="360" height="60" rx="10" fill="url(#sevenGrad)"/>

    <!-- 横杠右端白色点缀 -->
    <rect x="404" y="156" width="12" height="28" rx="6" fill="#ffffff"/>

    <!-- 斜向部分 - 翻转到左边 -->
    <path d="M 152 200 L 292 200 L 92 490 L 12 490"
          fill="none"
          stroke="url(#sevenGrad)"
          stroke-width="65"
          stroke-linecap="round"
          stroke-linejoin="round"/>

    <!-- 斜腿底部白色强调 -->
    <rect x="27" y="472" width="65" height="16" rx="8" fill="#ffffff"/>
  </g>
</svg>`;

const svgPath = '/Users/eatong/eaTong_projects/fit_lc/fitlc-mini/assets/logo.svg';
fs.writeFileSync(svgPath, svgContent);
console.log('SVG logo 已保存');