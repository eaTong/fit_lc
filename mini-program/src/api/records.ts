import { request } from './request';

export interface WorkoutExercise {
  id: number;
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
  duration?: number;
  distance?: number;
}

export interface Workout {
  id: number;
  date: string;
  exercises: WorkoutExercise[];
  createdAt: string;
}

export interface MeasurementItem {
  bodyPart: string;
  value: number;
}

export interface Measurement {
  id: number;
  date: string;
  items: MeasurementItem[];
  createdAt: string;
}

export async function getWorkouts() {
  return request<Workout[]>({
    url: '/records/workouts'
  });
}

export async function getMeasurements() {
  return request<Measurement[]>({
    url: '/records/measurements'
  });
}

export async function deleteWorkout(id: number) {
  return request({
    url: `/records/workout/${id}`,
    method: 'DELETE'
  });
}

export async function deleteMeasurement(id: number) {
  return request({
    url: `/records/measurement/${id}`,
    method: 'DELETE'
  });
}

export async function restoreWorkout(id: number) {
  return request({
    url: `/records/workout/${id}/restore`,
    method: 'POST'
  });
}

export async function restoreMeasurement(id: number) {
  return request({
    url: `/records/measurement/${id}/restore`,
    method: 'POST'
  });
}