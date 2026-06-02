import { create } from 'zustand';
import { UsersApi } from '@/api/users.api';
import type { Leaderboard, UserProfile } from '@/types/profile.types';
import { extractErrorMessage } from '@/lib/extract-error-message';

interface ProfileState {
  data: UserProfile | null;
  leaderboard: Leaderboard | null;
  loading: boolean;
  error: string | null;
  fetch: (opts?: { force?: boolean }) => Promise<void>;
  reset: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  data: null,
  leaderboard: null,
  loading: false,
  error: null,

  async fetch({ force = false } = {}) {
    const { loading, data } = get();
    if (loading) return;
    if (data && !force) return;

    set({ loading: true, error: null });
    try {
      const [profile, leaderboard] = await Promise.all([
        UsersApi.getMe(),
        UsersApi.getLeaderboard().catch(() => null),
      ]);
      set({ data: profile, leaderboard, loading: false });
    } catch (e) {
      set({
        loading: false,
        error: extractErrorMessage(e, 'Impossible de charger le profil.'),
      });
    }
  },

  reset() {
    set({ data: null, leaderboard: null, loading: false, error: null });
  },
}));
