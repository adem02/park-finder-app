import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

export const profileStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerBrand: {
    ...Typography.pageTitle,
    color: Colors.primary,
    fontSize: 26,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll: {
    padding: Spacing.md,
    gap: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  hero: { alignItems: 'center', paddingTop: Spacing.md, gap: Spacing.sm },
  displayName: {
    ...Typography.pageTitle,
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  userBadge: { ...Typography.body, color: Colors.textSecondary, fontStyle: 'italic' },

  statsRow: { flexDirection: 'row', gap: Spacing.md },

  contribSection: { gap: Spacing.md },
  contribHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { ...Typography.sectionTitle, color: Colors.textPrimary },
  seeAll: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
