import type { ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

export interface TextFieldProps extends TextInputProps {
  label: string;
  rightAction?: ReactNode;
  rightAdornment?: ReactNode;
  errorText?: string;
}

export function TextField({
  label,
  rightAction,
  rightAdornment,
  errorText,
  style,
  ...inputProps
}: TextFieldProps) {
  return (
    <View style={styles.field}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {rightAction}
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholderTextColor={Colors.muted}
          {...inputProps}
          style={[styles.input, !!rightAdornment && styles.inputWithAdornment, style]}
        />
        {rightAdornment ? (
          <View style={styles.adornment}>{rightAdornment}</View>
        ) : null}
      </View>
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: Spacing.xs },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontWeight: '700',
  },
  inputWrapper: { position: 'relative', justifyContent: 'center' },
  input: {
    height: 48,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    ...Typography.body,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  inputWithAdornment: { paddingRight: 44 },
  adornment: {
    position: 'absolute',
    right: Spacing.md,
    height: 48,
    justifyContent: 'center',
  },
  error: { ...Typography.caption, color: Colors.danger },
});
