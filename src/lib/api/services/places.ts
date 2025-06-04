import { axiosInstance } from '../axios-instance';
import { GetPlaceByIdResponse, GetPlacesResponse } from '../types/places';

export type GetPlacesParams = {
  page?: number;
  limit?: number;
  search?: string;
  populate?: string[];
  fields?: string[];
  filters?: Record<string, string>;
};

export const getPlaces = async (params?: GetPlacesParams): Promise<GetPlacesResponse> => {
  const response = await axiosInstance.get<GetPlacesResponse>('/api/places', {
    params,
  });
  return response.data;
};

export const getPlaceById = async (id: string): Promise<GetPlaceByIdResponse> => {
  const response = await axiosInstance.get<GetPlaceByIdResponse>(`/api/places/${id}`, {
    params: {
      populate: ['placeCategory', 'coverImage'],
      fields: ['name', 'shortDescription', 'createdAt', 'updatedAt', 'address'],
    },
  });
  return response.data;
};

export const getPopularPlaces = async (): Promise<GetPlacesResponse> => {
  const response = await axiosInstance.get<GetPlacesResponse>('/api/places', {
    params: {
      pagination: { pageSize: 3 },
      populate: ['placeCategory', 'coverImage'],
      fields: ['name', 'shortDescription', 'createdAt', 'updatedAt', 'address'],
      filters: { popular: { $eq: true } },
    },
  });
  return response.data;
};
