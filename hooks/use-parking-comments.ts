import { useCallback, useEffect, useRef, useState } from 'react';

import { parkingsApi } from '@/api/parkings.api';
import { extractErrorMessage } from '@/lib/extract-error-message';
import type { ParkingComment } from '@/types/parking.types';

interface UseParkingCommentsReturn {
  comments: ParkingComment[];
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  error: string | null;
  hasMore: boolean;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
}

export function useParkingComments(id: string | null): UseParkingCommentsReturn {
  const [comments, setComments] = useState<ParkingComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cursorRef = useRef<string | null>(null);
  const hasMoreRef = useRef(true);

  const fetchFirstPage = useCallback(
    async (parkingId: string, mode: 'initial' | 'refresh') => {
      if (mode === 'initial') setLoading(true);
      else setRefreshing(true);
      setError(null);
      try {
        const { items, nextCursor } = await parkingsApi.listComments(parkingId);
        setComments(items);
        cursorRef.current = nextCursor;
        hasMoreRef.current = nextCursor != null;
      } catch (e) {
        setError(extractErrorMessage(e, 'Impossible de charger les avis.'));
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!id) return;
    void fetchFirstPage(id, 'initial');
  }, [fetchFirstPage, id]);

  const refresh = useCallback(async () => {
    if (id) await fetchFirstPage(id, 'refresh');
  }, [fetchFirstPage, id]);

  const loadMore = useCallback(async () => {
    if (!id || !hasMoreRef.current || !cursorRef.current || loadingMore) return;
    setLoadingMore(true);
    try {
      const { items, nextCursor } = await parkingsApi.listComments(id, {
        cursor: cursorRef.current,
      });
      setComments((prev) => [...prev, ...items]);
      cursorRef.current = nextCursor;
      hasMoreRef.current = nextCursor != null;
    } catch (e) {
      setError(extractErrorMessage(e, 'Impossible de charger les avis.'));
    } finally {
      setLoadingMore(false);
    }
  }, [id, loadingMore]);

  return {
    comments,
    loading,
    loadingMore,
    refreshing,
    error,
    hasMore: hasMoreRef.current,
    refresh,
    loadMore,
  };
}
