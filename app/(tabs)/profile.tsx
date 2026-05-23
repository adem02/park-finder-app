import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { useAuthStore } from '@/store/auth.store';

export default function ProfileScreen() {
  const { user, clearSession } = useAuthStore();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>
          {user ? `Connecté en tant que ${user.username}` : 'Aucun utilisateur'}
        </Text>

        <Pressable
          style={styles.logout}
          onPress={() => {
            void clearSession();
          }}
        >
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  title: { ...Typography.pageTitle, color: Colors.textPrimary },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  logout: {
    marginTop: Spacing.xl,
    backgroundColor: Colors.danger,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.md,
  },
  logoutText: { ...Typography.cardTitle, color: Colors.surface },
});
