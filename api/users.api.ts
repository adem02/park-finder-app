import { apiClient } from './client';
import { Endpoints } from './endpoints';
import type { Leaderboard, UserProfile } from '../types/profile.types';

export const UsersApi = {
  async getMe(): Promise<UserProfile> {
    const { data } = await apiClient.get<UserProfile>(Endpoints.users.me);
    return data;
  },

  async getLeaderboard(month?: string): Promise<Leaderboard> {
    const { data } = await apiClient.get<Leaderboard>(
      Endpoints.users.leaderboard,
      { params: month ? { month } : undefined },
    );
    return data;
  },
};
