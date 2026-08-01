import { useCallback, useEffect, useRef, useState } from 'react';
import type { Region } from 'react-native-maps';

import { distanceMeters } from '@/lib/distance';
import type {
  ParkingCoordinates,
  ParkingRadius,
} from '@/types/parking.types';

interface UseMapAutoRefetchOptions {
  /** Position GPS de l'utilisateur (mise à jour continue si watch actif). */
  userLocation: ParkingCoordinates | null;
  /** Rayon de fetch en mètres. */
  radius: ParkingRadius;
  /**
   * Ratio de distance parcourue (par rapport au rayon) au-delà duquel on
   * refetch. Par défaut 0.8 → refetch uniquement quand l'user sort quasi
   * intégralement de la zone déjà chargée.
   */
  thresholdRatio?: number;
  /** Debounce des `onRegionChangeComplete` (pan/zoom) en ms. */
  debounceMs?: number;
}

interface UseMapAutoRefetchReturn {
  /** Centre autour duquel `useNearbyParkings` doit fetcher. */
  effectiveCenter: ParkingCoordinates | null;
  /** Force un centre (ex: bouton recentrer). */
  setCenter: (center: ParkingCoordinates) => void;
  /** À passer à `<MapView onRegionChangeComplete={...} />`. */
  onRegionChangeComplete: (region: Region) => void;
}

/**
 * Décide quand refetch les parkings :
 * - au pan/zoom : si le centre visible s'éloigne de plus de `thresholdRatio`
 *   du dernier centre fetché → refetch (debouncé)
 * - au déplacement physique de l'user (GPS watch) : idem si l'user sort de
 *   plus de `thresholdRatio` du dernier centre fetché → refetch silencieux
 */
export function useMapAutoRefetch({
  userLocation,
  radius,
  thresholdRatio = 0.8,
  debounceMs = 400,
}: UseMapAutoRefetchOptions): UseMapAutoRefetchReturn {
  const [effectiveCenter, setEffectiveCenter] =
    useState<ParkingCoordinates | null>(null);
  const lastFetchedCenterRef = useRef<ParkingCoordinates | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialise le centre effectif à la première position GPS connue
  useEffect(() => {
    if (!userLocation || effectiveCenter) return;
    setEffectiveCenter(userLocation);
    lastFetchedCenterRef.current = userLocation;
  }, [userLocation, effectiveCenter]);

  // Cleanup du timer debounce
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  // Refetch silencieux si l'user a physiquement bougé au-delà du seuil
  useEffect(() => {
    if (!userLocation) return;
    const ref = lastFetchedCenterRef.current;
    if (!ref) return;
    const moved = distanceMeters(ref, userLocation);
    if (moved > radius * thresholdRatio) {
      lastFetchedCenterRef.current = userLocation;
      setEffectiveCenter(userLocation);
      if (__DEV__)
        console.log(
          `[map] user moved ${Math.round(moved)}m → silent refetch`,
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation?.latitude, userLocation?.longitude, radius, thresholdRatio]);

  const setCenter = useCallback((center: ParkingCoordinates) => {
    lastFetchedCenterRef.current = center;
    setEffectiveCenter(center);
  }, []);

  const onRegionChangeComplete = useCallback(
    (region: Region) => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        const newCenter: ParkingCoordinates = {
          latitude: region.latitude,
          longitude: region.longitude,
        };
        const ref = lastFetchedCenterRef.current;
        if (!ref) {
          lastFetchedCenterRef.current = newCenter;
          setEffectiveCenter(newCenter);
          if (__DEV__) console.log('[map] refetch (no ref)');
          return;
        }
        const moved = distanceMeters(ref, newCenter);
        if (moved > radius * thresholdRatio) {
          lastFetchedCenterRef.current = newCenter;
          setEffectiveCenter(newCenter);
          if (__DEV__)
            console.log(`[map] refetch pan (moved ${Math.round(moved)}m)`);
        } else if (__DEV__) {
          console.log(`[map] skip pan (moved ${Math.round(moved)}m)`);
        }
      }, debounceMs);
    },
    [radius, thresholdRatio, debounceMs],
  );

  return { effectiveCenter, setCenter, onRegionChangeComplete };
}
