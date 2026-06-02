import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import type { VoteType } from '@/types/parking.types';

interface VoteButtonsProps {
  upvotes: number;
  downvotes: number;
  userVote: VoteType | null;
  pending: boolean;
  onToggle: (type: VoteType) => void;
}

interface VoteButtonProps {
  type: VoteType;
  active: boolean;
  count: number;
  pending: boolean;
  onPress: (type: VoteType) => void;
}

function VoteButton({ type, active, count, pending, onPress }: VoteButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSequence(
      withSpring(0.9, { mass: 0.4, damping: 8, stiffness: 220 }),
      withSpring(1.15, { mass: 0.4, damping: 6, stiffness: 220 }),
      withSpring(1, { mass: 0.4, damping: 10, stiffness: 220 }),
    );
    onPress(type);
  };

  const isUp = type === 'UPVOTE';
  const activeColor = isUp ? Colors.success : Colors.danger;
  const activeStyle = isUp ? styles.btnUpActive : styles.btnDownActive;
  const iconName = active
    ? isUp
      ? 'thumbs-up'
      : 'thumbs-down'
    : isUp
      ? 'thumbs-up-outline'
      : 'thumbs-down-outline';
  const prefix = isUp ? '+' : '-';

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        disabled={pending}
        onPress={handlePress}
        style={[styles.btn, active && activeStyle]}
      >
        <Ionicons
          name={iconName}
          size={18}
          color={active ? activeColor : Colors.textSecondary}
        />
        <Text style={[styles.count, active && { color: activeColor }]}>
          {prefix}
          {count}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

export function VoteButtons({
  upvotes,
  downvotes,
  userVote,
  pending,
  onToggle,
}: VoteButtonsProps) {
  return (
    <View style={styles.row}>
      <VoteButton
        type="UPVOTE"
        active={userVote === 'UPVOTE'}
        count={upvotes}
        pending={pending}
        onPress={onToggle}
      />
      <VoteButton
        type="DOWNVOTE"
        active={userVote === 'DOWNVOTE'}
        count={downvotes}
        pending={pending}
        onPress={onToggle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  btnUpActive: {
    backgroundColor: '#D1FAE5',
    borderColor: Colors.success,
  },
  btnDownActive: {
    backgroundColor: '#FEE2E2',
    borderColor: Colors.danger,
  },
  count: {
    ...Typography.caption,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
});
