import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import type { ParkingAvailability } from '@/types/parking.types';

interface AvailabilityBadgeProps {
  availability: ParkingAvailability;
  totalSpots: number;
}

export function AvailabilityBadge({
  availability,
  totalSpots,
}: AvailabilityBadgeProps) {
  const { availableSpots } = availability;
  const hasReport = availableSpots != null;

  const color = !hasReport
    ? Colors.muted
    : availableSpots === 0
      ? Colors.danger
      : availableSpots < totalSpots / 3
        ? '#F59E0B'
        : Colors.success;

  const label = hasReport
    ? `${availableSpots} place${availableSpots > 1 ? 's' : ''} disponible${availableSpots > 1 ? 's' : ''}`
    : 'Disponibilité non renseignée';

  return (
    <View style={styles.row}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.label, { color }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flexShrink: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: Radius.pill,
  },
  label: {
    ...Typography.body,
    fontWeight: '700',
    flexShrink: 1,
  },
});
