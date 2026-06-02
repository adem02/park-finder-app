import type { ParkingRadius, ParkingSort } from '@/types/parking.types';

export interface SearchFilters {
  radius: ParkingRadius;
  minSpots: number;
  sort: ParkingSort;
  availableOnly: boolean;
  verifiedOnly: boolean;
}
