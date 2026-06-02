export interface ParkingCoordinates {
  latitude: number;
  longitude: number;
}

export interface ParkingListAvailability {
  availableSpots: number | null;
  reportedAt: string | null;
  isRecent: boolean;
}

export interface ParkingListVotes {
  upvotes: number;
  downvotes: number;
  score: number;
}

export interface ParkingListItem {
  id: string;
  name: string;
  totalSpots: number;
  photos: string[];
  coordinates: ParkingCoordinates;
  distanceMeters: number;
  availability: ParkingListAvailability;
  votes: ParkingListVotes;
  verified: boolean;
  createdAt: string;
}

export interface FindNearbyParkingsResponse {
  parkings: ParkingListItem[];
}

export interface ParkingAuthor {
  id: string;
  username: string;
  photoUrl?: string;
}

export type VoteType = 'UPVOTE' | 'DOWNVOTE';

export interface ParkingAvailability {
  availableSpots: number | null;
  reportedAt: string | null;
  isRecent: boolean;
}

export interface ParkingVotes {
  upvotes: number;
  downvotes: number;
  userVote: VoteType | null;
}

export interface ParkingComment {
  id: string;
  content: string;
  author: ParkingAuthor;
  createdAt: string;
  updatedAt?: string;
}

export interface ParkingDetails {
  id: string;
  name: string;
  totalSpots: number;
  photos: string[];
  coordinates: ParkingCoordinates;
  addedBy: ParkingAuthor;
  availability: ParkingAvailability;
  votes: ParkingVotes;
  recentComments: ParkingComment[];
  createdAt: string;
  updatedAt?: string;
}

export interface ListParkingCommentsResponse {
  items: ParkingComment[];
  nextCursor: string | null;
}

export interface NewParkingPhoto {
  uri: string;
  name: string;
  mimeType: string;
}

export interface CreateParkingPayload {
  name: string;
  totalSpots: number;
  coordinates: ParkingCoordinates;
  photos: NewParkingPhoto[];
}

export interface CreateParkingResponse {
  id: string;
}

export type ParkingRadius = 500 | 1000 | 2000 | 5000 | 10000;

export type ParkingSort = 'distance' | 'recent' | 'popularity';

export interface FindNearbyParams {
  latitude: number;
  longitude: number;
  radius?: ParkingRadius;
  minSpots?: number;
  availableOnly?: boolean;
  verifiedOnly?: boolean;
  sort?: ParkingSort;
}

export interface NearbyParkingItem {
  parking: ParkingListItem;
  distance?: number;
}

export type AddParkingStep = 1 | 2 | 3;
