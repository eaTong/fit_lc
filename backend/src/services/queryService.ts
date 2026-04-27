import { workoutRepository } from '../repositories/workoutRepository';
import { measurementRepository } from '../repositories/measurementRepository';

export const queryService = {
  async queryWorkouts(userId, startDate, endDate, exerciseType) {
    const workouts = await workoutRepository.findByUserAndDateRange(userId, startDate, endDate);

    // Group by workout and filter by exercise type if specified
    const grouped = groupWorkouts(workouts);

    let filtered = grouped;
    if (exerciseType) {
      filtered = grouped.filter(w =>
        w.exercises.some(e => e.name.includes(exerciseType))
      );
    }

    return formatWorkoutResponse(filtered);
  },

  async queryMeasurements(userId, startDate, endDate, bodyPart) {
    const measurements = await measurementRepository.findByUserAndDateRange(userId, startDate, endDate);

    const grouped = groupMeasurements(measurements);

    let filtered = grouped;
    if (bodyPart) {
      filtered = grouped.filter(m =>
        m.items.some(i => i.body_part === bodyPart)
      );
    }

    return formatMeasurementResponse(filtered);
  }
};

function groupWorkouts(rows) {
  const map = new Map();
  for (const row of rows) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        date: row.date,
        exercises: []
      });
    }
    if (row.exercise_name) {
      map.get(row.id).exercises.push({
        name: row.exercise_name,
        sets: row.sets,
        reps: row.reps,
        weight: row.weight,
        duration: row.duration,
        distance: row.distance
      });
    }
  }
  return Array.from(map.values());
}

function groupMeasurements(rows) {
  const map = new Map();
  for (const row of rows) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        date: row.date,
        items: []
      });
    }
    if (row.body_part) {
      map.get(row.id).items.push({
        body_part: row.body_part,
        value: row.value
      });
    }
  }
  return Array.from(map.values());
}

function formatWorkoutResponse(workouts) {
  if (workouts.length === 0) {
    return '暂无训练记录';
  }

  return workouts.map(w => {
    const exerciseList = w.exercises.map(e => {
      if (e.distance) return `${e.name}: ${e.distance}km`;
      if (e.duration) return `${e.name}: ${e.duration}分钟`;
      if (e.weight && e.sets && e.reps) {
        return `${e.name}: ${e.sets}组 x ${e.reps}次 @ ${e.weight}kg`;
      }
      if (e.sets && e.reps) {
        return `${e.name}: ${e.sets}组 x ${e.reps}次`;
      }
      return e.name;
    }).join('\n  ');
    return `${w.date}:\n  ${exerciseList}`;
  }).join('\n\n');
}

function formatMeasurementResponse(measurements) {
  if (measurements.length === 0) {
    return '暂无围度记录';
  }

  return measurements.map(m => {
    const itemList = m.items.map(i => `${i.body_part} ${i.value}cm`).join('、');
    return `${m.date}: ${itemList}`;
  }).join('\n');
}