import type { Contribution, ProfileRecentParking } from '@/types/profile.types';

export const PARKING_POINTS = 20;

export function recentParkingToContribution(
  p: ProfileRecentParking,
): Contribution {
  return {
    id: p.id,
    type: 'parking',
    name: p.name,
    description: `${p.score >= 0 ? '+' : ''}${p.score} • ${p.votesCount} votes`,
    points: PARKING_POINTS,
    timeAgo: '',
  };
}
