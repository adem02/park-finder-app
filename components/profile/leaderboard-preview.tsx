import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import type { Leaderboard } from '@/types/profile.types';

interface LeaderboardPreviewProps {
  leaderboard: Leaderboard | null;
  currentUserId?: string;
}

const RANK_COLORS = ['#f5b400', '#9aa0a6', '#cd7f32'];

function formatMonth(month: string): string {
  const [y, m] = month.split('-').map((n) => parseInt(n, 10));
  if (!y || !m) return month;
  const names = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];
  return `${names[m - 1]} ${y}`;
}

export function LeaderboardPreview({
  leaderboard,
  currentUserId,
}: LeaderboardPreviewProps) {
  if (!leaderboard) return null;

  const top = leaderboard.entries.slice(0, 3);

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Classement du mois</Text>
        <Text style={styles.month}>{formatMonth(leaderboard.month)}</Text>
      </View>

      {top.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            Aucun classement disponible pour ce mois.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {top.map((entry) => {
            const isMe = entry.userId === currentUserId;
            const color = RANK_COLORS[entry.rank - 1] ?? Colors.textSecondary;
            return (
              <View
                key={entry.userId}
                style={[styles.row, isMe && styles.rowMe]}
              >
                <View
                  style={[styles.rankBubble, { backgroundColor: `${color}22` }]}
                >
                  <Text style={[styles.rankText, { color }]}>
                    #{entry.rank}
                  </Text>
                </View>
                {entry.photoUrl ? (
                  <Image
                    source={{ uri: entry.photoUrl }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={[styles.avatar, styles.avatarFallback]}>
                    <Text style={styles.avatarInitial}>
                      {entry.username.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
                <Text style={styles.name} numberOfLines={1}>
                  {entry.username}
                  {isMe ? ' (vous)' : ''}
                </Text>
                <View style={styles.points}>
                  <Ionicons name="star" size={12} color={Colors.warning} />
                  <Text style={styles.pointsText}>
                    {entry.monthlyPoints.toLocaleString('fr-FR')}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: Spacing.sm },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { ...Typography.sectionTitle, color: Colors.textPrimary },
  month: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  empty: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    alignItems: 'center',
  },
  emptyText: { ...Typography.body, color: Colors.textSecondary },
  list: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.sm,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.md,
  },
  rowMe: { backgroundColor: `${Colors.primary}12` },
  rankBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: { ...Typography.caption, fontWeight: '800' },
  avatar: { width: 32, height: 32, borderRadius: 16 },
  avatarFallback: {
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '700',
  },
  name: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  points: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  pointsText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
});
