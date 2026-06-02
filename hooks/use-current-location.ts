import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';

import type { ParkingCoordinates } from '@/types/parking.types';

export type LocationSource = 'fallback' | 'gps' | null;

interface UseCurrentLocationOptions {
  fallback?: ParkingCoordinates;
  accuracy?: Location.LocationAccuracy;
  auto?: boolean;
}

interface UseCurrentLocationReturn {
  coordinates: ParkingCoordinates | null;
  source: LocationSource;
  loading: boolean;
  denied: boolean;
  refresh: (silent?: boolean) => Promise<void>;
}

export function useCurrentLocation({
  fallback,
  accuracy = Location.Accuracy.Balanced,
  auto = true,
}: UseCurrentLocationOptions = {}): UseCurrentLocationReturn {
  const [coordinates, setCoordinates] = useState<ParkingCoordinates | null>(
    fallback ?? null,
  );
  const [source, setSource] = useState<LocationSource>(
    fallback ? 'fallback' : null,
  );
  const [loading, setLoading] = useState(false);
  const [denied, setDenied] = useState(false);

  const refresh = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setDenied(true);
          if (fallback) {
            setCoordinates(fallback);
            setSource('fallback');
          }
          return;
        }
        setDenied(false);
        const pos = await Location.getCurrentPositionAsync({ accuracy });
        setCoordinates({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setSource('gps');
      } catch (e) {
        if (__DEV__) console.warn('[use-current-location] failed', e);
        if (fallback) {
          setCoordinates(fallback);
          setSource('fallback');
        }
      } finally {
        setLoading(false);
      }
    },
    [accuracy, fallback],
  );

  useEffect(() => {
    if (auto) void refresh(true);
  }, [auto, refresh]);

  return { coordinates, source, loading, denied, refresh };
}
