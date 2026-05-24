import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface RankingCardProps {
  rank: number;
  progressPct: number;
  total?: number;
  city?: string;
  percentileLabel?: string;
}

export function RankingCard({
  rank,
  progressPct,
  total,
  city,
  percentileLabel,
}: RankingCardProps) {
  const pct = Math.max(0, Math.min(1, progressPct));
  const subtitle = percentileLabel
    ? `Vous êtes dans le top ${percentileLabel} des contributeurs.`
    : 'Continuez à contribuer pour grimper au classement.';
  const cityLine =
    total && city
      ? `sur ${total.toLocaleString('fr-FR')} à ${city}`
      : city
        ? `à ${city}`
        : 'ce mois-ci';

  return (
    <View style={styles.card}>
      <View style={styles.decor} />
      <View style={styles.top}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Classement Local</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="medal" size={40} color="#6cf8bb" />
      </View>
      <View style={styles.rankRow}>
        <Text style={styles.rank}>#{rank}</Text>
        <Text style={styles.city}>{cityLine}</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${Math.round(pct * 100)}%` }]} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.hint}>Progression du niveau</Text>
        <Text style={styles.hint}>{Math.round(pct * 100)}% complété</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2170E4',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    overflow: 'hidden',
    gap: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  decor: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  titleBlock: { flex: 1, gap: 4, paddingRight: Spacing.sm },
  title: { fontSize: 20, fontWeight: '600', color: '#fefcff', lineHeight: 28 },
  subtitle: { ...Typography.body, color: 'rgba(254,252,255,0.9)' },
  rankRow: { flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.xs },
  rank: { fontSize: 48, fontWeight: '800', color: '#fefcff', lineHeight: 52 },
  city: {
    ...Typography.caption,
    color: 'rgba(254,252,255,0.8)',
    fontWeight: '600',
    marginBottom: 6,
  },
  progressTrack: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBar: { height: 8, backgroundColor: '#6cf8bb', borderRadius: 999 },
  footer: { flexDirection: 'row', justifyContent: 'space-between' },
  hint: { ...Typography.caption, color: 'rgba(254,252,255,0.8)', fontWeight: '600' },
});
