import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface AvatarProps {
  name: string;
  level: number;
  photoUrl?: string;
}

export function Avatar({ name, level, photoUrl }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <View style={styles.wrapper}>
      {photoUrl ? (
        <Image source={{ uri: photoUrl }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.placeholder]}>
          <Text style={styles.initial}>{initial}</Text>
        </View>
      )}
      <View style={styles.levelBadge}>
        <Text style={styles.levelText}>Level {level}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative' },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: Colors.surface,
  },
  placeholder: {
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: { fontSize: 36, fontWeight: '700', color: Colors.primary },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -8,
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.pill,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  levelText: { ...Typography.caption, color: Colors.surface, fontWeight: '700' },
});
