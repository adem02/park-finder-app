import type { ParkingRadius, ParkingSort } from '@/types/parking.types';
import type { SearchFilters } from '@/types/search.types';

export const DEFAULT_SEARCH_FILTERS: SearchFilters = {
  radius: 2000,
  minSpots: 0,
  sort: 'distance',
  availableOnly: false,
  verifiedOnly: false,
};

export const RADIUS_OPTIONS: { value: ParkingRadius; label: string }[] = [
  { value: 500, label: '500 m' },
  { value: 1000, label: '1 km' },
  { value: 2000, label: '2 km' },
  { value: 5000, label: '5 km' },
  { value: 10000, label: '10 km' },
];

export const MIN_SPOTS_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: 'Tous' },
  { value: 5, label: '5+' },
  { value: 10, label: '10+' },
  { value: 20, label: '20+' },
  { value: 50, label: '50+' },
];

export const SORT_OPTIONS: { value: ParkingSort; label: string }[] = [
  { value: 'distance', label: 'Distance' },
  { value: 'recent', label: 'Plus récents' },
  { value: 'popularity', label: 'Popularité' },
];
