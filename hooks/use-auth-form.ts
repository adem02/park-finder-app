import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { AuthApi } from '@/api/auth.api';
import { extractErrorMessage } from '@/lib/extract-error-message';
import { useAuthStore } from '@/store/auth.store';
import type { AuthMode } from '@/types/auth.types';

interface UseAuthFormReturn {
  mode: AuthMode;
  isLogin: boolean;
  email: string;
  password: string;
  username: string;
  isSubmitting: boolean;
  error: string | null;
  canSubmit: boolean;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setUsername: (value: string) => void;
  switchMode: (next: AuthMode) => void;
  submit: () => Promise<void>;
}

const FALLBACK_ERROR: Record<AuthMode, string> = {
  login: 'Email ou mot de passe incorrect',
  register: 'Impossible de créer le compte',
};

export function useAuthForm(initialMode: AuthMode = 'login'): UseAuthFormReturn {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLogin = mode === 'login';

  const canSubmit = useMemo(
    () =>
      email.length > 0 &&
      password.length > 0 &&
      (isLogin || username.length > 0) &&
      !isSubmitting,
    [email, password, username, isLogin, isSubmitting],
  );

  const switchMode = useCallback(
    (next: AuthMode) => {
      if (next === mode) return;
      setMode(next);
      setError(null);
    },
    [mode],
  );

  const submit = useCallback(async () => {
    if (!canSubmit) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const payload = { email: email.trim(), password };
      const session = isLogin
        ? await AuthApi.login(payload)
        : await AuthApi.register({ ...payload, username: username.trim() });

      await setSession(session);
      router.replace('/(tabs)');
    } catch (err) {
      setError(extractErrorMessage(err, FALLBACK_ERROR[mode]));
    } finally {
      setIsSubmitting(false);
    }
  }, [canSubmit, email, password, username, isLogin, mode, setSession, router]);

  return {
    mode,
    isLogin,
    email,
    password,
    username,
    isSubmitting,
    error,
    canSubmit,
    setEmail,
    setPassword,
    setUsername,
    switchMode,
    submit,
  };
}
