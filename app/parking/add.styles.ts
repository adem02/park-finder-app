import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  root: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },
  headerBack: { padding: Spacing.xs },
  headerTitle: {
    ...Typography.pageTitle,
    color: Colors.textPrimary,
    flex: 1,
  },
  headerSpacer: { width: 32 },
  body: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  footer: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  cta: {
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  ctaDisabled: { opacity: 0.5 },
  ctaLabel: {
    ...Typography.cardTitle,
    color: '#fff',
    fontWeight: '700',
  },
  disclaimer: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
});
