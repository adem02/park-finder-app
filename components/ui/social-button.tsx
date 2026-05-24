import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface SocialButtonProps extends Omit<PressableProps, 'children'> {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  iconSize?: number;
}

export function SocialButton({
  icon,
  label,
  iconSize = 18,
  style,
  ...rest
}: SocialButtonProps) {
  return (
    <Pressable
      {...rest}
      style={(state) => [
        styles.button,
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      <Ionicons name={icon} size={iconSize} color={Colors.textPrimary} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
  },
  label: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
});
