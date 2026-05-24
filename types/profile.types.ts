export type ContributionType = 'parking' | 'location' | 'photo';

export interface Contribution {
  id: string;
  type: ContributionType;
  name: string;
  description: string;
  points: number;
  timeAgo: string;
}

export interface ProfileUser {
  id: string;
  username: string;
  email?: string;
  photoUrl?: string;
}

export interface ProfileStats {
  parkingsAdded: number;
  reportsCount: number;
  votesCount: number;
  points: number;
  level: number;
  nextLevelThreshold: number;
  progressToNextLevel: number;
  pointsToNextLevel: number;
}

export interface ProfileBadge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
}

export interface ProfileRank {
  rank: number;
  percentile: string;
  monthlyPoints: number;
}

export interface ProfileRecentParking {
  id: string;
  name: string;
  score: number;
  votesCount: number;
}

export interface UserProfile {
  user: ProfileUser;
  stats: ProfileStats;
  badges: ProfileBadge[];
  rank: ProfileRank | null;
  recentParkings: ProfileRecentParking[];
}
