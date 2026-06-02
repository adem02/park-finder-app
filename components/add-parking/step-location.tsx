import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import type { ParkingCoordinates } from '@/types/parking.types';

interface StepLocationProps {
  coordinates: ParkingCoordinates | null;
  locating: boolean;
  onRefresh: () => void;
}

export function StepLocation({
  coordinates,
  locating,
  onRefresh,
}: StepLocationProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Position du parking</Text>
      <Text style={styles.help}>
        Le parking sera enregistré à votre position actuelle. Approchez-vous de
        l’entrée pour plus de précision.
      </Text>

      <View style={styles.card}>
        <Ionicons name="location" size={28} color={Colors.primary} />
        {locating ? (
          <View style={styles.cardBody}>
            <Text style={styles.cardLabel}>Localisation en cours…</Text>
            <ActivityIndicator color={Colors.primary} />
          </View>
        ) : coordinates ? (
          <View style={styles.cardBody}>
            <Text style={styles.cardLabel}>Position détectée</Text>
            <Text style={styles.cardValue}>
              {coordinates.latitude.toFixed(5)},{' '}
              {coordinates.longitude.toFixed(5)}
            </Text>
          </View>
        ) : (
          <View style={styles.cardBody}>
            <Text style={styles.cardLabel}>Position indisponible</Text>
            <Text style={styles.cardValue}>
              Activez la localisation pour continuer.
            </Text>
          </View>
        )}
      </View>

      <Pressable onPress={onRefresh} style={styles.ghostBtn}>
        <Ionicons name="locate" size={18} color={Colors.primary} />
        <Text style={styles.ghostBtnLabel}>Actualiser ma position</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: Spacing.md },
  title: { ...Typography.sectionTitle, color: Colors.textPrimary },
  help: { ...Typography.body, color: Colors.textSecondary },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardBody: { flex: 1, gap: 2 },
  cardLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cardValue: { ...Typography.cardTitle, color: Colors.textPrimary },
  ghostBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: '#DBEAFE',
  },
  ghostBtnLabel: {
    ...Typography.badge,
    color: Colors.primary,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});
