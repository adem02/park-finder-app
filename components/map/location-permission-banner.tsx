import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface LocationPermissionBannerProps {
  onRetry: () => void;
  onOpenSettings: () => void;
}

export function LocationPermissionBanner({
  onRetry,
  onOpenSettings,
}: LocationPermissionBannerProps) {
  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      <View style={styles.card}>
        <Ionicons name="location-outline" size={22} color={Colors.primary} />
        <Text style={styles.title}>Active ta position</Text>
        <Text style={styles.body}>
          Autorise la localisation pour voir les parkings près de toi.
        </Text>
        <View style={styles.actions}>
          <Pressable style={styles.secondaryBtn} onPress={onRetry}>
            <Text style={styles.secondaryLabel}>Réessayer</Text>
          </Pressable>
          <Pressable style={styles.primaryBtn} onPress={onOpenSettings}>
            <Text style={styles.primaryLabel}>Ouvrir les réglages</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: Spacing.md,
    right: Spacing.md,
    top: '40%',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.xs,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    ...Typography.sectionTitle,
    color: Colors.textPrimary,
  },
  body: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  secondaryBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryLabel: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  primaryBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
  },
  primaryLabel: {
    ...Typography.body,
    color: '#fff',
    fontWeight: '600',
  },
});
