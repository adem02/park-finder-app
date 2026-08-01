import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ParkingCoordinates } from '@/types/parking.types';

export type LocationSource = 'fallback' | 'gps' | null;

interface UseCurrentLocationOptions {
  fallback?: ParkingCoordinates;
  accuracy?: Location.LocationAccuracy;
  auto?: boolean;
  /**
   * Si `true`, lance `watchPositionAsync` après le premier fix GPS.
   * Coordonnées mises à jour au fil des déplacements (100 m ou 30 s
   * par défaut), avec cleanup automatique à l'unmount.
   */
  watch?: boolean;
  /** Mètres minimum entre deux updates du watch. */
  distanceInterval?: number;
  /** Millisecondes minimum entre deux updates du watch. */
  timeInterval?: number;
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
  watch = false,
  distanceInterval = 100,
  timeInterval = 30_000,
}: UseCurrentLocationOptions = {}): UseCurrentLocationReturn {
  const [coordinates, setCoordinates] = useState<ParkingCoordinates | null>(
    fallback ?? null,
  );
  const [source, setSource] = useState<LocationSource>(
    fallback ? 'fallback' : null,
  );
  const [loading, setLoading] = useState(false);
  const [denied, setDenied] = useState(false);

  const watchSubRef = useRef<Location.LocationSubscription | null>(null);

  const stopWatching = useCallback(() => {
    watchSubRef.current?.remove();
    watchSubRef.current = null;
  }, []);

  const startWatching = useCallback(async () => {
    if (watchSubRef.current) return;
    try {
      watchSubRef.current = await Location.watchPositionAsync(
        { accuracy, distanceInterval, timeInterval },
        (pos) => {
          setCoordinates({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setSource('gps');
        },
      );
    } catch (e) {
      if (__DEV__) console.warn('[use-current-location] watch failed', e);
    }
  }, [accuracy, distanceInterval, timeInterval]);

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
        if (watch) {
          await startWatching();
        }
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
    [accuracy, fallback, startWatching, watch],
  );

  useEffect(() => {
    if (auto) void refresh(true);
  }, [auto, refresh]);

  // Cleanup à l'unmount ou si `watch` passe à false
  useEffect(() => {
    if (!watch) stopWatching();
    return () => stopWatching();
  }, [watch, stopWatching]);

  return { coordinates, source, loading, denied, refresh };
}
