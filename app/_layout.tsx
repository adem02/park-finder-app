import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { configureAuth } from '@/api/client';
import { SplashScreen } from '@/components/splash-screen';
import { useAuthStore } from '@/store/auth.store';


function useAuthGate() {
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const hydrate = useAuthStore((state) => state.hydrate);
  const clearSession = useAuthStore((state) => state.clearSession);
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const segments = useSegments();
  const [minDelayElapsed, setMinDelayElapsed] = useState(false);

  useEffect(() => {
    configureAuth(
      () => useAuthStore.getState().token,
      () => {
        void clearSession();
      },
    );
  }, [clearSession]);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    const timer = setTimeout(() => setMinDelayElapsed(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const isReady = isHydrated && minDelayElapsed;

  useEffect(() => {
    if (!isReady) return;
    const inAuthGroup = segments[0] === '(auth)';
    const inOnboardingGroup = segments[0] === '(onboarding)';
    if (inOnboardingGroup) return;
    if (!token && !inAuthGroup) {
      router.replace('/(onboarding)');
    } else if (token && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isReady, token, segments, router]);

  return isReady;
}

export default function RootLayout() {
  const isReady = useAuthGate();

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="contributions" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
