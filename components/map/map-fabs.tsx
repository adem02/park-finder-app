import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';

interface MapFabsProps {
  onRecenter: () => void;
  onAdd: () => void;
}

export function MapFabs({ onRecenter, onAdd }: MapFabsProps) {
  return (
    <View pointerEvents="box-none" style={styles.fabs}>
      <Pressable
        accessibilityLabel="Recentrer"
        onPress={onRecenter}
        style={styles.fabSecondary}
      >
        <Ionicons name="locate" size={22} color={Colors.primary} />
      </Pressable>

      <Pressable
        accessibilityLabel="Ajouter un parking"
        onPress={onAdd}
        style={styles.fabPrimary}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  fabs: {
    position: 'absolute',
    right: Spacing.md,
    bottom: Spacing.lg,
    gap: Spacing.sm,
    alignItems: 'flex-end',
  },
  fabSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  fabPrimary: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
