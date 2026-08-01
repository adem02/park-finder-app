import { Ionicons } from '@expo/vector-icons';

export type NavApp = {
  key: 'apple' | 'google' | 'waze';
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  /** null = app garantie présente sur iOS, pas besoin de canOpenURL */
  scheme: string | null;
  buildUrl: (lat: number, lng: number, label: string) => string;
};

export const NAV_APPS: NavApp[] = [
  {
    key: 'apple',
    label: 'Plans',
    icon: 'map',
    color: '#007AFF',
    scheme: null,
    buildUrl: (lat, lng, label) =>
      `maps://?daddr=${lat},${lng}&q=${encodeURIComponent(label)}&dirflg=d`,
  },
  {
    key: 'google',
    label: 'Google Maps',
    icon: 'navigate',
    color: '#4285F4',
    scheme: 'comgooglemaps://',
    buildUrl: (lat, lng, _label) =>
      `comgooglemaps://?daddr=${lat},${lng}&directionsmode=driving`,
  },
  {
    key: 'waze',
    label: 'Waze',
    icon: 'car-sport',
    color: '#33CCFF',
    scheme: 'waze://',
    buildUrl: (lat, lng, _label) =>
      `waze://?ll=${lat},${lng}&navigate=yes`,
  },
];