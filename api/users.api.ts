import { apiClient } from './client';
import { Endpoints } from './endpoints';
import type { UserProfile } from '../types/profile.types';

export const UsersApi = {
  async getMe(): Promise<UserProfile> {
    const { data } = await apiClient.get<UserProfile>(Endpoints.users.me);
    return data;
  },
};
