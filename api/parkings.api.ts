import { apiClient } from './client';
import { Endpoints } from './endpoints';
import type {
  FindNearbyParams,
  FindNearbyParkingsResponse,
} from '../types/parking.types';

export const parkingsApi = {
  findNearby: async ({
    latitude,
    longitude,
    radius,
  }: FindNearbyParams): Promise<FindNearbyParkingsResponse> => {
    const { data } = await apiClient.get<FindNearbyParkingsResponse>(
      Endpoints.parkings.nearby,
      {
        params: {
          lat: latitude,
          lng: longitude,
          ...(radius ? { radius } : {}),
        },
      },
    );
    return data;
  },
};
