import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXERCISE_JSON = path.join(__dirname, '../output/exercise-details.json');
const MUSCLE_JSON = path.join(__dirname, '../output/muscle-details-2026-04-25.json');
const OUTPUT_DIR = path.join(__dirname, '../sql-seed');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Load exercise data
const exerciseData = JSON.parse(fs.readFileSync(EXERCISE_JSON, 'utf-8'));
const exercises = exerciseData.exercises || [];
console.log(`Loaded ${exercises.length} exercises from JSON`);

// Load muscle data
const muscleData = JSON.parse(fs.readFileSync(MUSCLE_JSON, 'utf-8'));
const muscles = muscleData.muscles || [];
console.log(`Loaded ${muscles.length} muscles from JSON`);

// Group exercises by category
const byCategory = {};
for (const ex of exercises) {
  const cat = ex.category || 'other';
  if (!byCategory[cat]) byCategory[cat] = [];
  byCategory[cat].push(ex);
}

// Generate SQL for exercises
const categoryMap = {
  chest: 'seed-exercises-chest.sql',
  back: 'seed-exercises-back.sql',
  legs: 'seed-exercises-legs.sql',
  shoulders: 'seed-exercises-shoulders.sql',
  arms: 'seed-exercises-arms.sql',
  core: 'seed-exercises-core.sql',
};

function escapeSQL(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

function escapeMultiline(str) {
  if (!str) return 'NULL';
  const escaped = String(str).replace(/'/g, "''").replace(/\n/g, '\\n');
  return `'${escaped}'`;
}

function generateExerciseSQL(exercise) {
  const id = exercise.id;
  const name = escapeSQL(exercise.name);
  const category = escapeSQL(exercise.category);
  const equipment = escapeSQL(exercise.equipment);
  const difficulty = escapeSQL(exercise.difficulty);
  const description = exercise.description ? escapeSQL(exercise.description) : 'NULL';
  const steps = escapeMultiline(exercise.steps);
  const safetyNotes = escapeMultiline(exercise.safetyNotes);
  const commonMistakes = escapeMultiline(exercise.commonMistakes);
  const adjustmentNotes = exercise.adjustmentNotes ? escapeSQL(exercise.adjustmentNotes) : 'NULL';
  const exerciseType = exercise.exerciseType ? escapeSQL(exercise.exerciseType) : 'NULL';
  const conversionGuide = exercise.conversionGuide ? escapeSQL(JSON.stringify(exercise.conversionGuide)) : 'NULL';
  const suggestedMuscles = exercise.suggestedMuscles ? escapeSQL(JSON.stringify(exercise.suggestedMuscles)) : 'NULL';

  return `INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES (${name}, ${category}, ${equipment}, ${difficulty}, ${description}, ${steps}, ${safetyNotes}, ${commonMistakes}, ${adjustmentNotes}, ${exerciseType}, ${conversionGuide}, 'published', NOW(3), NOW(3));
SET @eid_${id} = LAST_INSERT_ID();`;
}

// Generate exercise SQL files
for (const [cat, catExercises] of Object.entries(byCategory)) {
  const filename = categoryMap[cat];
  if (!filename) {
    console.log(`No mapping for category: ${cat}`);
    continue;
  }

  const filepath = path.join(OUTPUT_DIR, `seed-${cat}-ai.sql`);
  let sql = `-- AI 生成的 ${cat} 动作详情\nUSE fitlc;\n\n`;

  for (const ex of catExercises) {
    sql += generateExerciseSQL(ex) + '\n';
    // Add suggested muscles relationships
    if (ex.suggestedMuscles && Array.isArray(ex.suggestedMuscles)) {
      for (const sm of ex.suggestedMuscles) {
        const muscleName = escapeSQL(sm.name);
        const role = escapeSQL(sm.role);
        sql += `-- Suggested muscle: ${sm.name} (${sm.role})\n`;
      }
    }
    sql += '\n';
  }

  fs.writeFileSync(filepath, sql, 'utf-8');
  console.log(`Generated ${filepath} with ${catExercises.length} exercises`);
}

// Generate muscle SQL
const musclefilepath = path.join(OUTPUT_DIR, 'seed-muscles-ai.sql');
let muscleSQL = `-- AI 生成的肌肉详情\nUSE fitlc;\n\n`;

for (const muscle of muscles) {
  const id = muscle.id;
  const name = escapeSQL(muscle.name);
  const parentId = muscle.parentId ? muscle.parentId : 'NULL';
  const description = muscle.description ? escapeSQL(muscle.description) : 'NULL';
  const function_ = muscle.function ? escapeSQL(muscle.function) : 'NULL';
  const trainingTips = muscle.trainingTips ? escapeSQL(muscle.trainingTips) : 'NULL';

  muscleSQL += `INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES (${name}, ${parentId}, ${description}, ${function_}, ${trainingTips}, NOW(3), NOW(3));
SET @mid_${id} = LAST_INSERT_ID();\n\n`;
}

fs.writeFileSync(musclefilepath, muscleSQL, 'utf-8');
console.log(`Generated ${musclefilepath} with ${muscles.length} muscles`);

console.log('\nDone! SQL files generated in:', OUTPUT_DIR);