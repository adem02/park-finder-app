import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

export const authStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.md,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  body: { padding: Spacing.lg, gap: Spacing.lg },
  intro: { gap: Spacing.xs },
  title: {
    ...Typography.pageTitle,
    fontSize: 22,
    color: Colors.textPrimary,
  },
  subtitle: { ...Typography.body, color: Colors.textSecondary },
  form: { gap: Spacing.md },
  forgot: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '700',
  },
  socials: { flexDirection: 'row', gap: Spacing.md },
});
