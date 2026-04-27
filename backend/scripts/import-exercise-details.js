import prisma from '../dist/lib/prisma.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = '../output/exercise-details.json';

async function importExerciseDetails() {
  console.log('开始导入动作详情...');

  const filePath = path.resolve(__dirname, INPUT_FILE);
  if (!fs.existsSync(filePath)) {
    console.error(`文件不存在: ${filePath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const { exercises } = data;

  console.log(`找到 ${exercises.length} 个动作详情`);

  let success = 0;
  let failed = 0;

  for (const exercise of exercises) {
    try {
      const result = await prisma.exercise.update({
        where: { id: exercise.id },
        data: {
          description: exercise.description || null,
          steps: Array.isArray(exercise.steps) ? exercise.steps.join('\n') : exercise.steps,
          safetyNotes: Array.isArray(exercise.safetyNotes) ? exercise.safetyNotes.join('\n') : exercise.safetyNotes,
          commonMistakes: Array.isArray(exercise.commonMistakes) ? exercise.commonMistakes.join('\n') : exercise.commonMistakes,
          adjustmentNotes: typeof exercise.adjustmentNotes === 'object' ? JSON.stringify(exercise.adjustmentNotes) : exercise.adjustmentNotes,
          exerciseType: exercise.exerciseType,
          conversionGuide: typeof exercise.conversionGuide === 'object' ? exercise.conversionGuide : exercise.conversionGuide,
        },
      });
      console.log(`  ✓ 更新: ${result.name}`);
      success++;
    } catch (e) {
      console.error(`  ✗ 失败: ${exercise.name} (id: ${exercise.id}):`, e.message);
      failed++;
    }
  }

  console.log(`\n导入完成！成功: ${success}, 失败: ${failed}`);
}

importExerciseDetails().catch(console.error);