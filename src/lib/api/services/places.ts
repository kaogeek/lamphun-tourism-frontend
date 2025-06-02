import { axiosInstance } from '../axios-instance';
import { GetPlacesResponse } from '../types/places';

export type GetPlacesParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export const getPlaces = async (params?: GetPlacesParams): Promise<GetPlacesResponse> => {
  const response = await axiosInstance.get<GetPlacesResponse>('/places', {
    params,
  });
  return response.data;
};
