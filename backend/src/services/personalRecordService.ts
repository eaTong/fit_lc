import { personalRecordRepository } from '../repositories/personalRecordRepository';

export interface PRCheckResult {
  isNewPR: boolean;
  oldValue?: number;
  newValue?: number;
  recordType: string;
  exerciseName: string;
}

export const personalRecordService = {
  async checkAndUpdatePR(
    userId: number,
    exerciseName: string,
    workoutExerciseId: number,
    data: {
      weight?: number;
      reps?: number;
      duration?: number;
      distance?: number;
    }
  ): Promise<PRCheckResult> {
    const results: PRCheckResult[] = [];

    if (data.weight && data.weight > 0) {
      const weightResult = await this.checkSinglePR(userId, exerciseName, 'weight', data.weight, workoutExerciseId);
      if (weightResult) results.push(weightResult);
    }

    if (data.reps && data.reps > 0) {
      const repsResult = await this.checkSinglePR(userId, exerciseName, 'reps', data.reps, workoutExerciseId);
      if (repsResult) results.push(repsResult);
    }

    if (data.duration && data.duration > 0) {
      const durationResult = await this.checkSinglePR(userId, exerciseName, 'duration', data.duration, workoutExerciseId);
      if (durationResult) results.push(durationResult);
    }

    if (data.distance && data.distance > 0) {
      const distanceResult = await this.checkSinglePR(userId, exerciseName, 'distance', data.distance, workoutExerciseId);
      if (distanceResult) results.push(distanceResult);
    }

    return results.find(r => r.isNewPR) || { isNewPR: false, recordType: '', exerciseName };
  },

  async checkSinglePR(
    userId: number,
    exerciseName: string,
    recordType: string,
    value: number,
    workoutExerciseId: number
  ): Promise<PRCheckResult | null> {
    const existing = await personalRecordRepository.findByUserAndExercise(userId, exerciseName);
    const existingRecord = existing.find(r => r.recordType === recordType);

    if (!existingRecord || value > Number(existingRecord.bestValue)) {
      const oldValue = existingRecord ? Number(existingRecord.bestValue) : undefined;
      await personalRecordRepository.upsert(userId, exerciseName, recordType, value, workoutExerciseId);
      return {
        isNewPR: true,
        oldValue,
        newValue: value,
        recordType,
        exerciseName,
      };
    }

    return null;
  },

  async getUserPRs(userId: number) {
    return personalRecordRepository.findByUserId(userId);
  },

  async getPRsByExercise(userId: number, exerciseName: string) {
    return personalRecordRepository.findByUserAndExercise(userId, exerciseName);
  },

  async getTopPRs(userId: number, limit: number = 10) {
    return personalRecordRepository.getTopPRs(userId, limit);
  },
};
