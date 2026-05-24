import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

interface PrimaryButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  loading?: boolean;
}

export function PrimaryButton({
  label,
  loading,
  disabled,
  style,
  ...rest
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...rest}
      disabled={isDisabled}
      style={(state) => [
        styles.button,
        isDisabled && styles.disabled,
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Colors.surface} />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xs,
  },
  disabled: { opacity: 0.5 },
  label: {
    ...Typography.cardTitle,
    color: Colors.surface,
    fontWeight: '600',
  },
});
