import client from './client';

export interface PersonalRecord {
  id: number;
  userId: number;
  exerciseName: string;
  recordType: string;
  bestValue: string;
  achievedAt: string;
  workoutId: number | null;
}

export interface Badge {
  id: number;
  code: string;
  name: string;
  description: string;
  iconUrl: string | null;
  tier: string;
  points: number;
  achievedAt?: string;
}

export interface Milestone {
  id: number;
  code: string;
  name: string;
  description: string;
  iconUrl: string | null;
  tier: number;
  threshold: string;
  progress: string;
  achievedAt: string | null;
}

export interface Stats {
  [key: string]: {
    value: number;
    period: string;
    updatedAt: string;
  };
}

export interface CumulativeStats {
  totalWorkouts: number;
  totalVolume: number;
  streakDays: number;
  weeklyWorkouts: number;
  weeklyVolume: number;
}

export interface NewAchievement {
  badges: Badge[];
  milestones: Milestone[];
}

export interface MuscleGroupVolume {
  name: string;
  group: string;
  volume: number;
  percentage: number;
}

export const achievementApi = {
  async getPersonalRecords(): Promise<{ personalRecords: PersonalRecord[] }> {
    const { data } = await client.get('/achievements/personal-records');
    return data;
  },

  async getTopPersonalRecords(limit: number = 10): Promise<{ personalRecords: PersonalRecord[] }> {
    const { data } = await client.get('/achievements/personal-records/top', { params: { limit } });
    return data;
  },

  async getBadges(): Promise<{ badges: Badge[] }> {
    const { data } = await client.get('/achievements/badges');
    return data;
  },

  async getMilestones(): Promise<{ milestones: Milestone[] }> {
    const { data } = await client.get('/achievements/milestones');
    return data;
  },

  async getStats(): Promise<{ stats: Stats }> {
    const { data } = await client.get('/achievements/stats');
    return data;
  },

  async check(type: string, data?: any): Promise<NewAchievement> {
    const { data: result } = await client.post('/achievements/check', { type, data });
    return result;
  },

  async getMuscleVolume(start?: string, end?: string): Promise<{ muscleGroups: MuscleGroupVolume[] }> {
    const { data } = await client.get('/achievements/muscle-volume', {
      params: { start, end },
    });
    return data;
  },
};
