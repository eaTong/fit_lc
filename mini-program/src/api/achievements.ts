import { request } from './request';

export interface Stats {
  totalWorkouts: number;
  totalVolume: number;
  streakDays: number;
  weeklyWorkouts: number;
  monthlyWorkouts: number;
}

export interface MuscleVolume {
  group: string;
  name: string;
  volume: number;
  percentage: number;
}

export interface Badge {
  id: number;
  code: string;
  name: string;
  description: string;
  category: string;
  tier: string;
  achievedAt?: string;
}

export interface PersonalRecord {
  id: number;
  exerciseName: string;
  recordType: string;
  bestValue: number;
  achievedAt: string;
}

export async function getStats() {
  return request<Stats>({
    url: '/achievements/stats'
  });
}

export async function getMuscleVolume() {
  return request<MuscleVolume[]>({
    url: '/achievements/muscle-volume'
  });
}

export async function getBadges() {
  return request<Badge[]>({
    url: '/achievements/badges'
  });
}

export async function getPersonalRecords() {
  return request<PersonalRecord[]>({
    url: '/achievements/personal-records'
  });
}