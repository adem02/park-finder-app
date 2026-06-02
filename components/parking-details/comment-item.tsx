import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { formatRelativeDate } from '@/lib/format-relative-date';
import type { ParkingComment } from '@/types/parking.types';

interface CommentItemProps {
  comment: ParkingComment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const initial = comment.author.username.charAt(0).toUpperCase() || '?';

  return (
    <View style={styles.root}>
      <View style={styles.avatar}>
        <Text style={styles.avatarLabel}>{initial}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <Text style={styles.author} numberOfLines={1}>
            {comment.author.username}
          </Text>
          <Text style={styles.date}>
            {formatRelativeDate(comment.createdAt)}
          </Text>
        </View>
        <Text style={styles.content}>{comment.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  author: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    flexShrink: 1,
  },
  date: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  content: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
});
