import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import type { ProfileBadge } from '@/types/profile.types';

interface BadgesSectionProps {
  badges: ProfileBadge[];
}

// Icône + couleur par nom de badge (fallback tant que l'API ne renvoie pas
// systématiquement une iconUrl, et pour les badges à venir non mappés ici).
const BADGE_ICONS: Record<
  string,
  { icon: keyof typeof Ionicons.glyphMap; color: string }
> = {
  Explorer: { icon: 'compass-outline', color: Colors.primary },
  Precise: { icon: 'checkmark-done-outline', color: Colors.success },
};
const DEFAULT_BADGE_ICON: { icon: keyof typeof Ionicons.glyphMap; color: string } =
  { icon: 'medal', color: Colors.warning };

export function BadgesSection({ badges }: BadgesSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes badges</Text>
        <View style={styles.counter}>
          <Ionicons name="trophy" size={14} color={Colors.warning} />
          <Text style={styles.counterText}>
            {badges.length} débloqué{badges.length > 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {badges.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="ribbon-outline" size={32} color={Colors.muted} />
          <Text style={styles.emptyText}>
            Aucun badge pour le moment. Contribuez pour en débloquer !
          </Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {badges.map((b) => {
            const fallbackIcon = BADGE_ICONS[b.name] ?? DEFAULT_BADGE_ICON;
            return (
              <View key={b.id} style={styles.badge}>
                {b.iconUrl ? (
                  <Image source={{ uri: b.iconUrl }} style={styles.icon} />
                ) : (
                  <View
                    style={[
                      styles.icon,
                      styles.iconFallback,
                      { backgroundColor: `${fallbackIcon.color}20` },
                    ]}
                  >
                    <Ionicons
                      name={fallbackIcon.icon}
                      size={28}
                      color={fallbackIcon.color}
                    />
                  </View>
                )}
                <Text style={styles.name} numberOfLines={2}>
                  {b.name}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      <Text style={styles.soonNote}>
        Progression détaillée par badge : Bientôt
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: Spacing.md },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { ...Typography.sectionTitle, color: Colors.textPrimary },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${Colors.warning}20`,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  counterText: {
    ...Typography.caption,
    color: Colors.warning,
    fontWeight: '700',
  },
  empty: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  badge: {
    width: '30%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.sm,
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  iconFallback: {
    backgroundColor: `${Colors.warning}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  soonNote: {
    ...Typography.caption,
    color: Colors.muted,
    fontStyle: 'italic',
  },
});
