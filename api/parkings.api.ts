import { apiClient } from './client';
import { Endpoints } from './endpoints';
import type {
  CreateParkingPayload,
  CreateParkingResponse,
  FindNearbyParams,
  FindNearbyParkingsResponse,
  ListParkingCommentsResponse,
  ParkingDetails,
  VoteType,
} from '../types/parking.types';

export const parkingsApi = {
  findNearby: async (
    {
      latitude,
      longitude,
      radius,
      minSpots,
      availableOnly,
      verifiedOnly,
      sort,
    }: FindNearbyParams,
    options?: { signal?: AbortSignal },
  ): Promise<FindNearbyParkingsResponse> => {
    const { data } = await apiClient.get<FindNearbyParkingsResponse>(
      Endpoints.parkings.nearby,
      {
        params: {
          lat: latitude,
          lng: longitude,
          ...(radius ? { radius } : {}),
          ...(minSpots !== undefined ? { minSpots } : {}),
          ...(availableOnly ? { availableOnly: true } : {}),
          ...(verifiedOnly ? { verifiedOnly: true } : {}),
          ...(sort ? { sort } : {}),
        },
        signal: options?.signal,
      },
    );
    return data;
  },

  getDetails: async (id: string): Promise<ParkingDetails> => {
    const { data } = await apiClient.get<ParkingDetails>(
      Endpoints.parkings.details(id),
    );
    return data;
  },

  create: async (
    payload: CreateParkingPayload,
  ): Promise<CreateParkingResponse> => {
    const form = new FormData();
    form.append('name', payload.name);
    form.append('totalSpots', String(payload.totalSpots));
    form.append('coordinates', JSON.stringify(payload.coordinates));

    payload.photos.forEach((photo) => {
      form.append('photos', {
        uri: photo.uri,
        name: photo.name,
        type: photo.mimeType,
      } as unknown as Blob);
    });

    const { data } = await apiClient.post<CreateParkingResponse>(
      Endpoints.parkings.create,
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return data;
  },

  vote: async (id: string, type: VoteType): Promise<void> => {
    await apiClient.post(Endpoints.parkings.vote(id), undefined, {
      params: { type },
    });
  },

  cancelVote: async (id: string): Promise<void> => {
    await apiClient.delete(Endpoints.parkings.vote(id));
  },

  report: async (id: string, availableSpots: number): Promise<void> => {
    await apiClient.post(Endpoints.parkings.report(id), { availableSpots });
  },
  listComments: async (
    id: string,
    params: { cursor?: string; limit?: number } = {},
  ): Promise<ListParkingCommentsResponse> => {
    const { data } = await apiClient.get<ListParkingCommentsResponse>(
      Endpoints.parkings.comments(id),
      {
        params: {
          ...(params.cursor ? { cursor: params.cursor } : {}),
          ...(params.limit ? { limit: params.limit } : {}),
        },
      },
    );
    return data;
  },
};
