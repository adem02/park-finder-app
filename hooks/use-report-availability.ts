import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { parkingsApi } from '@/api/parkings.api';
import { extractErrorMessage } from '@/lib/extract-error-message';

interface UseReportAvailabilityOptions {
  parkingId: string | null;
  onReported?: () => void | Promise<void>;
}

interface UseReportAvailabilityReturn {
  visible: boolean;
  submitting: boolean;
  open: () => void;
  close: () => void;
  confirm: (availableSpots: number) => Promise<void>;
}

export function useReportAvailability({
  parkingId,
  onReported,
}: UseReportAvailabilityOptions): UseReportAvailabilityReturn {
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  const confirm = useCallback(
    async (availableSpots: number) => {
      if (!parkingId) return;
      setSubmitting(true);
      try {
        await parkingsApi.report(parkingId, availableSpots);
        setVisible(false);
        await onReported?.();
      } catch (e) {
        Alert.alert(
          'Erreur',
          extractErrorMessage(e, 'Le signalement a échoué, réessayez.'),
        );
      } finally {
        setSubmitting(false);
      }
    },
    [parkingId, onReported],
  );

  return { visible, submitting, open, close, confirm };
}
