import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const envTestPath = path.join(process.cwd(), '.env.test');
if (fs.existsSync(envTestPath)) {
  const envContent = fs.readFileSync(envTestPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0 && !line.startsWith('#')) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

const source = new PrismaClient({
  datasources: { db: { url: 'mysql://eaTong:eaTong%40123@localhost:3306/fitlc' } }
});

const target = new PrismaClient();

async function syncMusclesAndExercises() {
  console.log('Syncing muscles...');

  const muscles = await source.muscle.findMany({});
  console.log('Found', muscles.length, 'muscles in source');

  await target.$executeRawUnsafe('DELETE FROM `muscles`');

  for (const muscle of muscles) {
    await target.muscle.create({
      data: {
        id: muscle.id,
        name: muscle.name,
        group: muscle.group,
        parentId: muscle.parentId,
        sortOrder: muscle.sortOrder
      }
    });
  }
  console.log('Muscles synced');

  const exercises = await source.exercise.findMany({});
  console.log('Found', exercises.length, 'exercises in source');

  await target.$executeRawUnsafe('DELETE FROM `exercises`');

  for (const ex of exercises) {
    await target.exercise.create({
      data: {
        id: ex.id,
        name: ex.name,
        category: ex.category,
        equipment: ex.equipment,
        difficulty: ex.difficulty,
        instructions: ex.instructions
      }
    });
  }
  console.log('Exercises synced');

  const exerciseMuscles = await source.exerciseMuscle.findMany({});
  console.log('Found', exerciseMuscles.length, 'exercise-muscle relationships');

  await target.$executeRawUnsafe('DELETE FROM `exercise_muscles`');

  // Group by exerciseId+muscleId and take the first (primary if exists)
  const seen = new Set<string>();
  for (const em of exerciseMuscles) {
    const key = `${em.exerciseId}-${em.muscleId}`;
    if (!seen.has(key)) {
      seen.add(key);
      await target.exerciseMuscle.create({
        data: {
          exerciseId: em.exerciseId,
          muscleId: em.muscleId,
          role: em.role || 'primary'
        }
      });
    }
  }
  console.log('Exercise-muscle relationships synced (unique pairs)');

  await source.$disconnect();
  await target.$disconnect();
  console.log('Done!');
}

syncMusclesAndExercises().catch(e => { console.error(e); process.exit(1); });