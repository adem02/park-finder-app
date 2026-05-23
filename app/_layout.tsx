import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import 'react-native-reanimated';
import { configureAuth } from '@/api/client';
import { Colors } from '@/constants/Colors';
import { useAuthStore } from '@/store/auth.store';


function useAuthGate() {
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const hydrate = useAuthStore((state) => state.hydrate);
  const clearSession = useAuthStore((state) => state.clearSession);

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

  // TODO: Logique de redirection
  // const router = useRouter();
  // const segments = useSegments();
  // const token = useAuthStore((state) => state.token);
  // useEffect(() => {
  //   if (!isHydrated) return;
  //   const inAuthGroup = segments[0] === '(auth)';
  //   if (!token && !inAuthGroup) {
  //     router.replace('/(auth)/login');
  //   } else if (token && inAuthGroup) {
  //     router.replace('/(tabs)');
  //   }
  // }, [isHydrated, token, segments, router]);

  return isHydrated;
}

export default function RootLayout() {
  const isReady = useAuthGate();

  if (!isReady) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal', title: 'Modal' }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
