import { useCallback, useEffect, useState } from 'react';

import { parkingsApi } from '@/api/parkings.api';
import { extractErrorMessage } from '@/lib/extract-error-message';
import type { ParkingDetails } from '@/types/parking.types';

interface UseParkingDetailsReturn {
  details: ParkingDetails | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useParkingDetails(id: string | null): UseParkingDetailsReturn {
  const [details, setDetails] = useState<ParkingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(
    async (parkingId: string, mode: 'initial' | 'refresh') => {
      if (mode === 'initial') setLoading(true);
      else setRefreshing(true);
      setError(null);
      try {
        const data = await parkingsApi.getDetails(parkingId);
        setDetails(data);
      } catch (e) {
        setError(extractErrorMessage(e, 'Impossible de charger ce parking.'));
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!id) return;
    void fetchDetails(id, 'initial');
  }, [fetchDetails, id]);

  const refresh = useCallback(async () => {
    if (id) await fetchDetails(id, 'refresh');
  }, [fetchDetails, id]);

  return { details, loading, refreshing, error, refresh };
}
