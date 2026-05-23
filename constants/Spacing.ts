export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const Radius = {
  sm: 6,
  md: 12,
  lg: 20,
  pill: 999,
} as const;

export type SpacingToken = keyof typeof Spacing;
