import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { useAuthStore } from '@/store/auth.store';

export default function SettingsScreen() {
  const router = useRouter();
  const clearSession = useAuthStore((s) => s.clearSession);

  const handleLogout = async () => {
    await clearSession();
    router.replace('/(onboarding)');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8} accessibilityLabel="Retour">
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>Réglages</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Pressable
          style={styles.logoutBtn}
          onPress={handleLogout}
          accessibilityLabel="Se déconnecter"
        >
          <Ionicons name="log-out-outline" size={20} color={Colors.danger} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: { ...Typography.sectionTitle, color: Colors.textPrimary },
  content: { padding: Spacing.md, gap: Spacing.md },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  logoutText: { ...Typography.body, color: Colors.danger, fontWeight: '600' },
});
