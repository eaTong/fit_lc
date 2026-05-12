const sharp = require('sharp');
const fs = require('fs');

const svgPath = '/Users/eatong/eaTong_projects/fit_lc/fitlc-mini/assets/logo.svg';
const pngPath = '/Users/eatong/eaTong_projects/fit_lc/fitlc-mini/assets/logo.png';

const svgBuffer = fs.readFileSync(svgPath);

sharp(svgBuffer)
  .png()
  .toFile(pngPath)
  .then(() => {
    console.log('PNG logo 已保存到:', pngPath);
  })
  .catch(err => {
    console.error('转换失败:', err);
  });