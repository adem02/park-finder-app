import { useCallback, useEffect, useState } from 'react';

import { parkingsApi } from '@/api/parkings.api';
import type { ParkingVotes, VoteType } from '@/types/parking.types';

interface UseParkingVoteReturn {
  upvotes: number;
  downvotes: number;
  userVote: VoteType | null;
  pending: boolean;
  toggle: (type: VoteType) => Promise<void>;
}

export function useParkingVote(
  parkingId: string | null,
  initial: ParkingVotes | null,
): UseParkingVoteReturn {
  const [upvotes, setUpvotes] = useState(initial?.upvotes ?? 0);
  const [downvotes, setDownvotes] = useState(initial?.downvotes ?? 0);
  const [userVote, setUserVote] = useState<VoteType | null>(
    initial?.userVote ?? null,
  );
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setUpvotes(initial?.upvotes ?? 0);
    setDownvotes(initial?.downvotes ?? 0);
    setUserVote(initial?.userVote ?? null);
  }, [initial?.upvotes, initial?.downvotes, initial?.userVote]);

  const toggle = useCallback(
    async (type: VoteType) => {
      if (!parkingId || pending) return;

      const prev = { upvotes, downvotes, userVote };
      const isCancel = userVote === type;
      const nextUserVote: VoteType | null = isCancel ? null : type;

      let nextUp = upvotes;
      let nextDown = downvotes;

      if (userVote === 'UPVOTE') nextUp -= 1;
      if (userVote === 'DOWNVOTE') nextDown -= 1;
      if (nextUserVote === 'UPVOTE') nextUp += 1;
      if (nextUserVote === 'DOWNVOTE') nextDown += 1;

      setUpvotes(nextUp);
      setDownvotes(nextDown);
      setUserVote(nextUserVote);
      setPending(true);

      try {
        if (isCancel) {
          await parkingsApi.cancelVote(parkingId);
        } else {
          await parkingsApi.vote(parkingId, type);
        }
      } catch {
        setUpvotes(prev.upvotes);
        setDownvotes(prev.downvotes);
        setUserVote(prev.userVote);
      } finally {
        setPending(false);
      }
    },
    [parkingId, pending, upvotes, downvotes, userVote],
  );

  return { upvotes, downvotes, userVote, pending, toggle };
}
