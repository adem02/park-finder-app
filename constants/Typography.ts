import { Platform, TextStyle } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

const make = (size: number, weight: TextStyle['fontWeight']): TextStyle => ({
  fontFamily,
  fontSize: size,
  fontWeight: weight,
});

export const Typography = {
  pageTitle: make(22, '600'),
  sectionTitle: make(18, '600'),
  cardTitle: make(16, '500'),
  body: make(14, '400'),
  caption: make(12, '400'),
  badge: make(11, '500'),
} as const;

export type TypographyToken = keyof typeof Typography;
