import { exerciseAIService } from '../src/services/exerciseAIService.js';
import prisma from '../dist/lib/prisma.js';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = './output';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function getOutputFile() {
  return path.join(OUTPUT_DIR, `exercise-details.json`);
}

function loadExistingResults() {
  const outputFile = getOutputFile();
  if (fs.existsSync(outputFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));
      console.log(`发现已有文件，加载 ${data.exercises?.length || 0} 条记录`);
      return new Set(data.exercises.map(e => e.id));
    } catch (e) {
      console.log('已有文件解析失败，将重新开始');
    }
  }
  return new Set();
}

function saveResults(results) {
  const outputFile = getOutputFile();
  const output = {
    generatedAt: new Date().toISOString().split('T')[0],
    exercises: results,
  };
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`  [保存进度] ${results.length} 条记录已写入`);
}

async function main() {
  console.log('开始生成动作详情...');

  const exercises = await prisma.exercise.findMany({
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
  });

  console.log(`找到 ${exercises.length} 个动作`);

  const completedIds = loadExistingResults();
  const results = [];

  // 如果已有文件，先加载现有结果
  const outputFile = getOutputFile();
  if (fs.existsSync(outputFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));
      results.push(...data.exercises);
    } catch (e) {}
  }

  let newCount = 0;
  for (const exercise of exercises) {
    // 跳过已完成的
    if (completedIds.has(exercise.id)) {
      console.log(`跳过(已完成): ${exercise.name}`);
      continue;
    }

    console.log(`正在生成: ${exercise.name}...`);

    try {
      const details = await exerciseAIService.generateExerciseDetails(
        { name: exercise.name, category: exercise.category, equipment: exercise.equipment, difficulty: exercise.difficulty },
        null
      );

      if (details) {
        const record = {
          id: exercise.id,
          name: exercise.name,
          category: exercise.category,
          equipment: exercise.equipment,
          difficulty: exercise.difficulty,
          ...details,
        };
        results.push(record);
        newCount++;
        console.log(`  ✓ 完成: ${exercise.name} (${newCount} 新增)`);

        // 每生成一条就保存一次
        saveResults(results);
      } else {
        console.log(`  ✗ 失败: ${exercise.name}`);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (e) {
      console.error(`  ✗ 错误: ${exercise.name}:`, e.message);
    }
  }

  console.log(`\n完成！生成文件: ${outputFile}`);
  console.log(`本次新增: ${newCount}/${exercises.length}`);
  console.log(`总记录: ${results.length}`);
}

main().catch(console.error);