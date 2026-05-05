import { personalRecordRepository } from '../repositories/personalRecordRepository';

export interface PRCheckResult {
  isNewPR: boolean;
  oldValue?: number;
  newValue?: number;
  recordType: string;
  exerciseName: string;
}

export const personalRecordService = {
  /**
   * 检查并更新个人记录
   *
   * 判断逻辑：
   * - 有重量 + 次数：计算容量(weight×reps)，记录 max_weight 和 max_volume
   * - 有距离 + 时长：计算速度(distance/duration)，记录 max_distance, max_duration, max_speed
   * - 只有重量：记录 max_weight（如引体向上）
   * - 只有距离：记录 max_distance
   */
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
  ): Promise<PRCheckResult[]> {
    const results: PRCheckResult[] = [];

    // 1. 有重量 + 次数的运动：计算容量
    if (data.weight && data.weight > 0 && data.reps && data.reps > 0) {
      const volume = data.weight * data.reps;

      // 检查最大重量 PR
      const weightResult = await this.checkSinglePR(userId, exerciseName, 'max_weight', data.weight, workoutExerciseId);
      if (weightResult) results.push(weightResult);

      // 检查最大容量 PR
      const volumeResult = await this.checkSinglePR(userId, exerciseName, 'max_volume', volume, workoutExerciseId);
      if (volumeResult) results.push(volumeResult);
    }
    // 只有重量（如引体向上、俯卧撑等自重训练）
    else if (data.weight && data.weight > 0) {
      const weightResult = await this.checkSinglePR(userId, exerciseName, 'max_weight', data.weight, workoutExerciseId);
      if (weightResult) results.push(weightResult);
    }

    // 2. 有距离 + 时长的运动：检查距离、时长、速度
    if (data.distance && data.distance > 0 && data.duration && data.duration > 0) {
      // 速度 = 距离 / 时长(小时)
      const speed = data.distance / (data.duration / 60); // km/h

      // 检查最大距离 PR
      const distanceResult = await this.checkSinglePR(userId, exerciseName, 'max_distance', data.distance, workoutExerciseId);
      if (distanceResult) results.push(distanceResult);

      // 检查最大时长 PR
      const durationResult = await this.checkSinglePR(userId, exerciseName, 'max_duration', data.duration, workoutExerciseId);
      if (durationResult) results.push(durationResult);

      // 检查最高速度 PR
      const speedResult = await this.checkSinglePR(userId, exerciseName, 'max_speed', speed, workoutExerciseId);
      if (speedResult) results.push(speedResult);
    }
    // 只有距离（如跳绳等不计时的运动）
    else if (data.distance && data.distance > 0) {
      const distanceResult = await this.checkSinglePR(userId, exerciseName, 'max_distance', data.distance, workoutExerciseId);
      if (distanceResult) results.push(distanceResult);
    }

    // 返回所有新 PR，如果没有则返回空数组
    return results.filter(r => r.isNewPR);
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
