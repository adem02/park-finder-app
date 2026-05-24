import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContributionItem } from '@/components/profile/contribution-item';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { useProfileStore } from '@/store/profile.store';
import { recentParkingToContribution } from './(tabs)/profile';

export default function ContributionsScreen() {
  const router = useRouter();
  const { data, loading, error, fetch } = useProfileStore();

  useEffect(() => {
    void fetch();
  }, [fetch]);

  const items = (data?.recentParkings ?? []).map(recentParkingToContribution);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8} accessibilityLabel="Retour">
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>Mes contributions</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading && !data ? (
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : error && !data ? (
        <View style={styles.center}>
          <Text style={[Typography.body, { color: Colors.danger }]}>{error}</Text>
          <Pressable onPress={() => void fetch({ force: true })}>
            <Text style={[Typography.body, { color: Colors.primary, fontWeight: '600' }]}>
              Réessayer
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <ContributionItem item={item} />}
          ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
          onRefresh={() => void fetch({ force: true })}
          refreshing={loading}
          ListEmptyComponent={
            <Text style={[Typography.body, { color: Colors.textSecondary, textAlign: 'center' }]}>
              Aucune contribution pour le moment.
            </Text>
          }
        />
      )}
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
  list: { padding: Spacing.md, flexGrow: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.sm },
});
