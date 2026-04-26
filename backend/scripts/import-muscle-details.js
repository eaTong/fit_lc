import prisma from '../dist/lib/prisma.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = '../output/muscle-details-2026-04-25.json';

async function importMuscleDetails() {
  console.log('开始导入肌肉详情...');

  // 读取 JSON 文件
  const filePath = path.resolve(__dirname, INPUT_FILE);
  if (!fs.existsSync(filePath)) {
    console.error(`文件不存在: ${filePath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const { muscles } = data;

  console.log(`找到 ${muscles.length} 个肌肉详情`);

  let success = 0;
  let failed = 0;

  for (const muscle of muscles) {
    try {
      const result = await prisma.muscle.update({
        where: { id: muscle.id },
        data: {
          origin: muscle.origin,
          insertion: muscle.insertion,
          function: muscle.function,
          trainingTips: Array.isArray(muscle.trainingTips)
            ? muscle.trainingTips.join('\n')
            : muscle.trainingTips,
        },
      });
      console.log(`  ✓ 更新: ${result.name}`);
      success++;
    } catch (e) {
      console.error(`  ✗ 失败: ${muscle.name} (id: ${muscle.id}):`, e.message);
      failed++;
    }
  }

  console.log(`\n导入完成！成功: ${success}, 失败: ${failed}`);
}

importMuscleDetails().catch(console.error);