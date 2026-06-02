import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface SearchEmptyStateProps {
  query: string;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export function SearchEmptyState({
  query,
  hasActiveFilters,
  onResetFilters,
}: SearchEmptyStateProps) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIconBox}>
        <Ionicons name="search-outline" size={48} color={Colors.muted} />
      </View>
      <Text style={styles.emptyTitle}>Aucun parking trouvé</Text>
      <Text style={styles.emptyBody}>
        {query
          ? `Aucun résultat pour « ${query} ». Essayez un autre nom ou élargissez le rayon.`
          : hasActiveFilters
            ? 'Essayez d’élargir le rayon ou de réinitialiser les filtres.'
            : 'Soyez le premier à ajouter un parking près de chez vous.'}
      </Text>
      {hasActiveFilters && (
        <Pressable onPress={onResetFilters} style={styles.emptyAction}>
          <Text style={styles.emptyActionLabel}>Réinitialiser les filtres</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  emptyIconBox: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  emptyTitle: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  emptyBody: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  emptyAction: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
  },
  emptyActionLabel: {
    ...Typography.body,
    color: '#fff',
    fontWeight: '700',
  },
});
