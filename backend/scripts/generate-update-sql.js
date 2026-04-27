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

function escapeSQL(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

function escapeMultiline(str) {
  if (!str) return 'NULL';
  const escaped = String(str).replace(/'/g, "''").replace(/\n/g, '\\n');
  return `'${escaped}'`;
}

// Generate UPDATE SQL for exercises
const updateFile = path.join(OUTPUT_DIR, 'update-exercises-ai.sql');
let sql = `-- AI 更新的动作详情 (UPDATE 语句)\nUSE fitlc;\n\n`;

for (const ex of exercises) {
  const id = ex.id;
  const steps = escapeMultiline(ex.steps);
  const safetyNotes = escapeMultiline(ex.safetyNotes);
  const commonMistakes = escapeMultiline(ex.commonMistakes);
  const adjustmentNotes = ex.adjustmentNotes ? escapeSQL(ex.adjustmentNotes) : 'NULL';
  const exerciseType = ex.exerciseType ? escapeSQL(ex.exerciseType) : 'NULL';
  const conversionGuide = ex.conversionGuide ? JSON.stringify(ex.conversionGuide) : 'NULL';
  const suggestedMuscles = ex.suggestedMuscles ? JSON.stringify(ex.suggestedMuscles) : 'NULL';

  sql += `-- ${ex.name} (id: ${id})\n`;
  sql += `UPDATE exercises SET\n`;
  sql += `  steps = ${steps},\n`;
  sql += `  safetyNotes = ${safetyNotes},\n`;
  sql += `  commonMistakes = ${commonMistakes},\n`;
  sql += `  adjustmentNotes = ${adjustmentNotes},\n`;
  sql += `  exerciseType = ${exerciseType},\n`;
  sql += `  conversionGuide = ${conversionGuide},\n`;
  sql += `  status = 'published'\n`;
  sql += `WHERE id = ${id};\n\n`;
}

fs.writeFileSync(updateFile, sql, 'utf-8');
console.log(`Generated ${updateFile}`);

// Generate UPDATE SQL for muscles
const muscleUpdateFile = path.join(OUTPUT_DIR, 'update-muscles-ai.sql');
let muscleSQL = `-- AI 更新的肌肉详情 (UPDATE 语句)\nUSE fitlc;\n\n`;

for (const m of muscles) {
  const id = m.id;
  const description = m.description ? escapeSQL(m.description) : 'NULL';
  const function_ = m.function ? escapeSQL(m.function) : 'NULL';
  const trainingTips = m.trainingTips ? escapeSQL(m.trainingTips) : 'NULL';

  muscleSQL += `-- ${m.name} (id: ${id})\n`;
  muscleSQL += `UPDATE muscles SET\n`;
  muscleSQL += `  description = ${description},\n`;
  muscleSQL += `  function = ${function_},\n`;
  muscleSQL += `  trainingTips = ${trainingTips}\n`;
  muscleSQL += `WHERE id = ${id};\n\n`;
}

fs.writeFileSync(muscleUpdateFile, muscleSQL, 'utf-8');
console.log(`Generated ${muscleUpdateFile}`);

console.log('\nDone! UPDATE SQL files generated in:', OUTPUT_DIR);