import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface SearchHeaderBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  activeFiltersCount: number;
  onOpenFilters: () => void;
}

export function SearchHeaderBar({
  query,
  onQueryChange,
  activeFiltersCount,
  onOpenFilters,
}: SearchHeaderBarProps) {
  return (
    <View style={styles.headerBlock}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <TextInput
          value={query}
          onChangeText={onQueryChange}
          placeholder="Rechercher un parking…"
          placeholderTextColor={Colors.muted}
          style={styles.searchInput}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Pressable hitSlop={8} onPress={() => onQueryChange('')}>
            <Ionicons name="close-circle" size={18} color={Colors.muted} />
          </Pressable>
        )}
      </View>
      <Pressable style={styles.filterBtn} onPress={onOpenFilters}>
        <Ionicons name="options" size={20} color={Colors.primary} />
        {activeFiltersCount > 0 && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeLabel}>{activeFiltersCount}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    height: 44,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 9,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  filterBadgeLabel: {
    ...Typography.caption,
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});
