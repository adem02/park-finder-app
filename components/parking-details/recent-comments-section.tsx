import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import type { ParkingComment } from '@/types/parking.types';

import { CommentItem } from './comment-item';

interface RecentCommentsSectionProps {
  comments: ParkingComment[];
  onSeeAll: () => void;
}

export function RecentCommentsSection({
  comments,
  onSeeAll,
}: RecentCommentsSectionProps) {
  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Avis récents</Text>
        <Pressable onPress={onSeeAll} hitSlop={8} style={styles.seeAllBtn}>
          <Text style={styles.seeAllLabel}>VOIR TOUT</Text>
          <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
        </Pressable>
      </View>

      {comments.length === 0 ? (
        <Text style={styles.empty}>
          Aucun avis pour ce parking. Soyez le premier à en laisser un.
        </Text>
      ) : (
        <View style={styles.list}>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...Typography.sectionTitle,
    color: Colors.textPrimary,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllLabel: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  list: {
    gap: Spacing.xs,
  },
  empty: {
    ...Typography.body,
    color: Colors.textSecondary,
    paddingVertical: Spacing.sm,
  },
});
