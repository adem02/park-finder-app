import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

export const profileStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },

  scroll: {
    padding: Spacing.md,
    gap: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  loadingBlock: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  errorBlock: {
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xl,
  },
  errorText: { ...Typography.body, color: Colors.danger },
  retryText: { ...Typography.body, color: Colors.primary, fontWeight: '600' },
});
