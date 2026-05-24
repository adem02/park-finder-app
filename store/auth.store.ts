import { create } from 'zustand';
import {
  StorageKeys,
  secureStorage,
  type SecureStorage,
} from '@/services/secure-storage.service';
import { useProfileStore } from '@/store/profile.store';
import type { AuthSession, AuthUser } from '@/types/auth.types';

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  setSession: (session: AuthSession) => Promise<void>;
  clearSession: () => Promise<void>;
}

const createAuthStore = (storage: SecureStorage) =>
  create<AuthState>((set) => ({
    token: null,
    user: null,
    isHydrated: false,

    hydrate: async () => {
      const [token, rawUser] = await Promise.all([
        storage.get(StorageKeys.accessToken),
        storage.get(StorageKeys.user),
      ]);

      set({
        token,
        user: rawUser ? (JSON.parse(rawUser) as AuthUser) : null,
        isHydrated: true,
      });
    },

    setSession: async ({ accessToken, user }) => {
      await Promise.all([
        storage.set(StorageKeys.accessToken, accessToken),
        storage.set(StorageKeys.user, JSON.stringify(user)),
      ]);

      set({ token: accessToken, user });
    },

    clearSession: async () => {
      await Promise.all([
        storage.remove(StorageKeys.accessToken),
        storage.remove(StorageKeys.user),
      ]);

      set({ token: null, user: null });
      useProfileStore.getState().reset();
    },
  }));

export const useAuthStore = createAuthStore(secureStorage);
