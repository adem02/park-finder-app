import { apiClient } from './client';
import { Endpoints } from './endpoints';
import type {
  AuthSession,
  LoginPayload,
  RegisterPayload,
} from '@/types/auth.types';

export const AuthApi = {
  async login(payload: LoginPayload): Promise<AuthSession> {
    const { data } = await apiClient.post<AuthSession>(
      Endpoints.auth.login,
      payload,
    );

    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthSession> {
    const { data } = await apiClient.post<AuthSession>(
      Endpoints.auth.register,
      payload,
    );

    return data;
  },
};
