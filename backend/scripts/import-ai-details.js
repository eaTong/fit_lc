import prisma from '../dist/lib/prisma.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXERCISE_JSON = path.join(__dirname, '../output/exercise-details.json');
const MUSCLE_JSON = path.join(__dirname, '../output/muscle-details-2026-04-25.json');

async function importExerciseDetails() {
  console.log('开始导入动作详情...');

  const exerciseData = JSON.parse(fs.readFileSync(EXERCISE_JSON, 'utf-8'));
  const exercises = exerciseData.exercises || [];
  console.log(`找到 ${exercises.length} 个动作详情`);

  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (const exercise of exercises) {
    try {
      const result = await prisma.exercise.update({
        where: { id: exercise.id },
        data: {
          steps: Array.isArray(exercise.steps) ? exercise.steps.join('\n') : (exercise.steps || null),
          safetyNotes: Array.isArray(exercise.safetyNotes) ? exercise.safetyNotes.join('\n') : (exercise.safetyNotes || null),
          commonMistakes: Array.isArray(exercise.commonMistakes) ? exercise.commonMistakes.join('\n') : (exercise.commonMistakes || null),
          adjustmentNotes: exercise.adjustmentNotes || null,
          exerciseType: exercise.exerciseType || null,
          conversionGuide: exercise.conversionGuide || null,
          status: 'published',
        },
      });
      console.log(`  ✓ 更新: ${result.name}`);
      success++;
    } catch (e) {
      console.error(`  ✗ 失败: ${exercise.name} (id: ${exercise.id}):`, e.message);
      failed++;
    }
  }

  console.log(`\n动作导入完成！成功: ${success}, 失败: ${failed}`);
}

async function importMuscleDetails() {
  console.log('\n开始导入肌肉详情...');

  const muscleData = JSON.parse(fs.readFileSync(MUSCLE_JSON, 'utf-8'));
  const muscles = muscleData.muscles || [];
  console.log(`找到 ${muscles.length} 个肌肉详情`);

  let success = 0;
  let failed = 0;

  for (const muscle of muscles) {
    try {
      const result = await prisma.muscle.update({
        where: { id: muscle.id },
        data: {
          origin: muscle.origin || null,
          insertion: muscle.insertion || null,
          function: typeof muscle.function === 'string' ? muscle.function : (Array.isArray(muscle.function) ? muscle.function.join('\n') : null),
          trainingTips: typeof muscle.trainingTips === 'string' ? muscle.trainingTips : (Array.isArray(muscle.trainingTips) ? muscle.trainingTips.join('\n') : null),
        },
      });
      console.log(`  ✓ 更新: ${result.name}`);
      success++;
    } catch (e) {
      console.error(`  ✗ 失败: ${muscle.name} (id: ${muscle.id}):`, e.message);
      failed++;
    }
  }

  console.log(`\n肌肉导入完成！成功: ${success}, 失败: ${failed}`);
}

async function main() {
  try {
    await importExerciseDetails();
    await importMuscleDetails();
    console.log('\n全部完成！');
  } catch (e) {
    console.error('导入失败:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();