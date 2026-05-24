export interface ParkingCoordinates {
  latitude: number;
  longitude: number;
}

export interface ParkingListItem {
  id: string;
  name: string;
  totalSpots: number;
  photos: string[];
  coordinates: ParkingCoordinates;
  createdAt: string;
}

export interface FindNearbyParkingsResponse {
  parkings: ParkingListItem[];
}

export type ParkingRadius = 500 | 1000 | 2000 | 5000 | 10000;

export interface FindNearbyParams {
  latitude: number;
  longitude: number;
  radius?: ParkingRadius;
}
