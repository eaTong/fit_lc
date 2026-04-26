// Plan status values
export const PlanStatus = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PAUSED: 'paused'
} as const;

// Exercise difficulty values
export const ExerciseDifficulty = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
} as const;

// Exercise category values
export const ExerciseCategory = {
  CHEST: 'chest',
  BACK: 'back',
  LEGS: 'legs',
  SHOULDERS: 'shoulders',
  ARMS: 'arms',
  CORE: 'core'
} as const;

// Equipment values
export const Equipment = {
  BARBELL: 'barbell',
  DUMBBELL: 'dumbbell',
  CABLE: 'cable',
  MACHINE: 'machine',
  BODYWEIGHT: 'bodyweight',
  KETTLEBELL: 'kettlebell',
  BANDS: 'bands',
  OTHER: 'other'
} as const;

// User goal values
export const UserGoal = {
  BULK: 'bulk',
  CUT: 'cut',
  MAINTAIN: 'maintain'
} as const;

// User experience level
export const UserExperience = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
} as const;

// Execution status values
export const ExecutionStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  SKIPPED: 'skipped'
} as const;
