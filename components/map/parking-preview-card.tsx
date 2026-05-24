import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import type { ParkingListItem } from '@/types/parking.types';

interface ParkingPreviewCardProps {
  parking: ParkingListItem;
  distanceMeters?: number;
  onClose: () => void;
  onPressDetails: () => void;
}

export function ParkingPreviewCard({
  parking,
  distanceMeters,
  onClose,
  onPressDetails,
}: ParkingPreviewCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {parking.name}
          </Text>
          <Text style={styles.subtitle}>
            {parking.totalSpots} places
            {distanceMeters != null
              ? ` • ${formatDistance(distanceMeters)}`
              : ''}
          </Text>
        </View>
        <Pressable hitSlop={12} onPress={onClose} style={styles.close}>
          <Ionicons name="close" size={20} color={Colors.textSecondary} />
        </Pressable>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPressDetails}
        style={styles.cta}
      >
        <Ionicons name="navigate" size={18} color="#fff" />
        <Text style={styles.ctaLabel}>Voir les détails</Text>
      </TouchableOpacity>
    </View>
  );
}

const formatDistance = (m: number) =>
  m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  title: {
    ...Typography.pageTitle,
    fontSize: 18,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  close: {
    padding: Spacing.xs,
  },
  cta: {
    marginTop: Spacing.md,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  ctaLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
