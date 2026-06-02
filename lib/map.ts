import type { Region } from 'react-native-maps';

import type { ParkingCoordinates } from '@/types/parking.types';

export const FALLBACK_CENTER: ParkingCoordinates = {
  latitude: 48.8566,
  longitude: 2.3522,
};

export function regionForRadius(
  center: ParkingCoordinates,
  radiusMeters: number,
): Region {
  const delta = Math.max(0.01, (radiusMeters / 111000) * 2.2);
  return {
    latitude: center.latitude,
    longitude: center.longitude,
    latitudeDelta: delta,
    longitudeDelta: delta,
  };
}
