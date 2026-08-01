import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface MapTopBarProps {
  refreshing: boolean;
  onSearchPress?: () => void;
}

export function MapTopBar({ refreshing, onSearchPress }: MapTopBarProps) {
  return (
    <SafeAreaView pointerEvents="box-none" style={styles.topBar} edges={['top']}>
      <Pressable style={styles.search} onPress={onSearchPress}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <Text style={styles.searchPlaceholder} numberOfLines={1}>
          Rechercher un parking…
        </Text>
      </Pressable>
      {refreshing ? (
        <View style={styles.refreshPill}>
          <ActivityIndicator size="small" color={Colors.primary} />
          <Text style={styles.refreshPillText}>Mise à jour…</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  searchPlaceholder: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: 15,
  },
  refreshPill: {
    alignSelf: 'center',
    marginTop: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.surface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  refreshPillText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});
