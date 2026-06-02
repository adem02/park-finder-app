import { useCallback, useEffect, useMemo, useState } from 'react';

import { parkingsApi } from '@/api/parkings.api';
import type {
  NearbyParkingItem,
  ParkingCoordinates,
  ParkingListItem,
  ParkingRadius,
  ParkingSort,
} from '@/types/parking.types';

interface UseNearbyParkingsOptions {
  center: ParkingCoordinates | null;
  query?: string;
  radius?: ParkingRadius;
  minSpots?: number;
  availableOnly?: boolean;
  verifiedOnly?: boolean;
  sort?: ParkingSort;
}

interface UseNearbyParkingsReturn {
  items: NearbyParkingItem[];
  loading: boolean;
  refreshing: boolean;
  refresh: () => Promise<void>;
}

export function useNearbyParkings({
  center,
  query = '',
  radius,
  minSpots,
  availableOnly,
  verifiedOnly,
  sort,
}: UseNearbyParkingsOptions): UseNearbyParkingsReturn {
  const [parkings, setParkings] = useState<ParkingListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchAt = useCallback(
    async (
      origin: ParkingCoordinates,
      mode: 'initial' | 'refresh',
    ) => {
      if (mode === 'initial') setLoading(true);
      else setRefreshing(true);
      try {
        const res = await parkingsApi.findNearby({
          latitude: origin.latitude,
          longitude: origin.longitude,
          radius,
          minSpots: minSpots && minSpots > 0 ? minSpots : undefined,
          availableOnly: availableOnly || undefined,
          verifiedOnly: verifiedOnly || undefined,
          sort,
        });
        setParkings(res.parkings);
      } catch (e) {
        if (__DEV__) console.warn('[use-nearby-parkings] fetch failed', e);
      } finally {
        setLoading(false);
        setRefreshing(false);
        setHasFetched(true);
      }
    },
    [radius, minSpots, availableOnly, verifiedOnly, sort],
  );

  useEffect(() => {
    if (!center) return;
    void fetchAt(center, hasFetched ? 'refresh' : 'initial');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    center?.latitude,
    center?.longitude,
    radius,
    minSpots,
    availableOnly,
    verifiedOnly,
    sort,
  ]);

  const refresh = useCallback(async () => {
    if (center) await fetchAt(center, 'refresh');
  }, [center, fetchAt]);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? parkings.filter((p) => p.name.toLowerCase().includes(q))
      : parkings;

    return filtered.map<NearbyParkingItem>((parking) => ({
      parking,
      distance: parking.distanceMeters,
    }));
  }, [parkings, query]);

  return { items, loading, refreshing, refresh };
}
