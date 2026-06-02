import { useCallback, useEffect, useRef, useState } from 'react';
import type { Region } from 'react-native-maps';

import { distanceMeters } from '@/lib/distance';
import type {
  ParkingCoordinates,
  ParkingRadius,
} from '@/types/parking.types';

interface UseMapAutoRefetchOptions {
  initialCenter: ParkingCoordinates | null;
  radius: ParkingRadius;
  thresholdRatio?: number;
  debounceMs?: number;
}

interface UseMapAutoRefetchReturn {
  effectiveCenter: ParkingCoordinates | null;
  setCenter: (center: ParkingCoordinates) => void;
  onRegionChangeComplete: (region: Region) => void;
}

export function useMapAutoRefetch({
  initialCenter,
  radius,
  thresholdRatio = 0.3,
  debounceMs = 400,
}: UseMapAutoRefetchOptions): UseMapAutoRefetchReturn {
  const [effectiveCenter, setEffectiveCenter] =
    useState<ParkingCoordinates | null>(null);
  const lastFetchedCenterRef = useRef<ParkingCoordinates | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!initialCenter || effectiveCenter) return;
    setEffectiveCenter(initialCenter);
    lastFetchedCenterRef.current = initialCenter;
  }, [initialCenter, effectiveCenter]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

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
            console.log(`[map] refetch (moved ${Math.round(moved)}m)`);
        } else if (__DEV__) {
          console.log(`[map] skip (moved ${Math.round(moved)}m)`);
        }
      }, debounceMs);
    },
    [radius, thresholdRatio, debounceMs],
  );

  return { effectiveCenter, setCenter, onRegionChangeComplete };
}
