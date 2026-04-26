import { muscleAIService } from '../src/services/muscleAIService.js';
import prisma from '../dist/lib/prisma.js';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = './output';

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * 主函数
 */
async function main() {
  console.log('开始生成肌肉详情...');

  // 从数据库读取所有肌肉
  const muscles = await prisma.muscle.findMany({
    orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }],
  });

  console.log(`找到 ${muscles.length} 个肌肉`);

  const results = [];

  for (const muscle of muscles) {
    // 查找父肌肉
    const parentMuscle = muscle.parentId
      ? muscles.find(m => m.id === muscle.parentId)
      : null;

    console.log(`正在生成: ${muscle.name}...`);

    try {
      const details = await muscleAIService.generateMuscleDetails({ name: muscle.name, group: muscle.group }, parentMuscle?.name);

      if (details) {
        results.push({
          id: muscle.id,
          name: muscle.name,
          group: muscle.group,
          ...details,
        });
        console.log(`  ✓ 完成: ${muscle.name}`);
      } else {
        console.log(`  ✗ 失败: ${muscle.name}`);
      }

      // 避免 API 限流，添加延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (e) {
      console.error(`  ✗ 错误: ${muscle.name}:`, e.message);
    }
  }

  // 生成输出文件
  const date = new Date().toISOString().split('T')[0];
  const outputFile = path.join(OUTPUT_DIR, `muscle-details-${date}.json`);

  const output = {
    generatedAt: date,
    muscles: results,
  };

  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`\n完成！生成文件: ${outputFile}`);
  console.log(`成功: ${results.length}/${muscles.length}`);
}

main().catch(console.error);