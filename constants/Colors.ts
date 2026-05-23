export const Colors = {
  primary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',

  background: '#F9FAFB',
  surface: '#FFFFFF',

  textPrimary: '#111827',
  textSecondary: '#6B7280',

  border: '#E5E7EB',
  muted: '#9CA3AF',
} as const;

export const PinColors = {
  available: Colors.success,
  recent: Colors.warning,
  full: Colors.danger,
  unverified: Colors.muted,
} as const;

export const VoteColors = {
  upvoteActive: Colors.primary,
  downvoteActive: Colors.danger,
  inactive: Colors.muted,
} as const;

export type ColorToken = keyof typeof Colors;
