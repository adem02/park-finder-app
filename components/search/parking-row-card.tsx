import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { formatDistance } from '@/lib/distance';
import type { ParkingListItem } from '@/types/parking.types';

interface ParkingRowCardProps {
  parking: ParkingListItem;
  distanceMeters?: number;
  onPress: () => void;
}

export function ParkingRowCard({
  parking,
  distanceMeters,
  onPress,
}: ParkingRowCardProps) {
  const thumb = parking.photos?.[0];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.thumb}>
        {thumb ? (
          <Image source={{ uri: thumb }} style={styles.thumbImg} />
        ) : (
          <Ionicons name="car-outline" size={28} color={Colors.muted} />
        )}
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {parking.name}
          </Text>
          <View style={styles.freeBadge}>
            <Text style={styles.freeBadgeLabel}>GRATUIT</Text>
          </View>
        </View>

        <Text style={styles.subtitle} numberOfLines={1}>
          {parking.totalSpots} places
        </Text>

        <View style={styles.metaRow}>
          {distanceMeters != null ? (
            <View style={styles.metaItem}>
              <Ionicons
                name="location-outline"
                size={14}
                color={Colors.textSecondary}
              />
              <Text style={styles.metaLabel}>
                {formatDistance(distanceMeters)}
              </Text>
            </View>
          ) : (
            <View />
          )}

          <View style={styles.metaItem}>
            <Ionicons name="checkmark-circle" size={14} color={Colors.success} />
            <Text style={[styles.metaLabel, { color: Colors.success }]}>
              DISPONIBLE
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: Radius.md,
    backgroundColor: Colors.background,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbImg: { width: '100%', height: '100%' },
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    flex: 1,
    ...Typography.cardTitle,
    color: Colors.textPrimary,
  },
  freeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#DBEAFE',
    borderRadius: Radius.sm,
  },
  freeBadgeLabel: {
    ...Typography.badge,
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 0.4,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaLabel: {
    ...Typography.badge,
    color: Colors.textSecondary,
    letterSpacing: 0.3,
  },
});
