const sharp = require('sharp');
const fs = require('fs');

const svgPath = './assets/logo.svg';
const pngPath = './assets/logo.png';

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