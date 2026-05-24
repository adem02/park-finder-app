import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

const AVATAR =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80';

interface PerkProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  background: string;
}

function Perk({ icon, label, color, background }: PerkProps) {
  return (
    <View style={styles.perk}>
      <View style={[styles.perkIcon, { backgroundColor: background }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.perkLabel}>{label}</Text>
    </View>
  );
}

export function SlideKarma() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.rewardPill}>
          <View style={styles.rewardIcon}>
            <Ionicons name="flash" size={18} color={Colors.surface} />
          </View>
          <View>
            <Text style={styles.rewardLabel}>RÉCOMPENSE</Text>
            <Text style={styles.rewardValue}>+50 Points</Text>
          </View>
        </View>

        <View style={styles.avatarWrapper}>
          <Image source={{ uri: AVATAR }} style={styles.avatar} />
          <View style={styles.medal}>
            <Ionicons name="ribbon" size={18} color={Colors.surface} />
          </View>
        </View>

        <Text style={styles.tier}>CONTRIBUTEUR ÉLITE</Text>
        <Text style={styles.karmaRow}>
          <Text style={styles.karmaValue}>2,450 </Text>
          <Text style={styles.karmaUnit}>Karma Points</Text>
        </Text>

        <View style={styles.levelRow}>
          <Text style={styles.levelText}>Niveau 12</Text>
          <Text style={styles.levelText}>Prochain : Niveau 13</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>

        <View style={styles.perks}>
          <Perk
            icon="car-sport"
            label="Rapide"
            color="#006c49"
            background="#6cf8bb"
          />
          <Perk
            icon="ribbon"
            label="Précis"
            color="#825100"
            background="#ffddb8"
          />
          <Perk
            icon="heart"
            label="Altruiste"
            color="#0058be"
            background="#d8e2ff"
          />
        </View>
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>Gagnez des Points Karma</Text>
        <Text style={styles.description}>
          Chaque signalement vous rapporte des points pour monter en niveau et
          devenir un contributeur d&apos;élite.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
    gap: Spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: Colors.surface,
    borderRadius: 28,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    position: 'relative',
  },
  rewardPill: {
    position: 'absolute',
    top: -Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  rewardIcon: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: '#006c49',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardLabel: {
    ...Typography.caption,
    fontSize: 9,
    color: Colors.textSecondary,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  rewardValue: {
    ...Typography.cardTitle,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  avatarWrapper: {
    marginTop: Spacing.md,
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: Radius.pill,
    borderWidth: 3,
    borderColor: '#d8e2ff',
  },
  medal: {
    position: 'absolute',
    bottom: -2,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: Radius.pill,
    backgroundColor: '#006c49',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.surface,
  },
  tier: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginTop: Spacing.sm,
  },
  karmaRow: { textAlign: 'center' },
  karmaValue: {
    ...Typography.pageTitle,
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  karmaUnit: {
    ...Typography.pageTitle,
    fontSize: 22,
    fontWeight: '700',
    color: '#825100',
  },
  levelRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  levelText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  progressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: '#e1e2ec',
    borderRadius: Radius.pill,
    overflow: 'hidden',
  },
  progressFill: {
    width: '70%',
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
  },
  perks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: Spacing.md,
  },
  perk: { alignItems: 'center', gap: Spacing.xs },
  perkIcon: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  perkLabel: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  textBlock: {
    alignItems: 'center',
    gap: Spacing.sm,
    maxWidth: 360,
  },
  title: {
    ...Typography.pageTitle,
    fontSize: 26,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  description: {
    ...Typography.body,
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
