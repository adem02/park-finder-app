import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import type { Contribution, ContributionType } from '@/types/profile.types';

const ICON: Record<ContributionType, keyof typeof Ionicons.glyphMap> = {
  parking: 'car-outline',
  location: 'location-outline',
  photo: 'camera-outline',
};

interface ContributionItemProps {
  item: Contribution;
  onPress?: () => void;
}

export function ContributionItem({ item, onPress }: ContributionItemProps) {
  const content = (
    <>
      <View style={styles.icon}>
        <Ionicons name={ICON[item.type]} size={22} color={Colors.primary} />
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.points}>+{item.points} pts</Text>
        {onPress ? (
          <Ionicons name="chevron-forward" size={16} color={Colors.muted} />
        ) : (
          <Text style={styles.time}>{item.timeAgo}</Text>
        )}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.item, pressed && styles.pressed]}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return <View style={styles.item}>{content}</View>;
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  body: { flex: 1, gap: 2 },
  name: { ...Typography.cardTitle, color: Colors.textPrimary },
  desc: { ...Typography.body, color: Colors.textSecondary },
  right: { alignItems: 'flex-end', gap: 2 },
  points: { ...Typography.caption, color: Colors.success, fontWeight: '700' },
  time: { fontSize: 10, color: Colors.muted },
  pressed: { opacity: 0.7 },
});
