import { axiosInstance } from '../axios-instance';
import { FindParams } from '../types/find';
import { GetPlaceCategoriesResponse } from '../types/place-categories';

export const getPlaceCategories = async (params?: FindParams): Promise<GetPlaceCategoriesResponse> => {
  const response = await axiosInstance.get<GetPlaceCategoriesResponse>('/api/place-categories', {
    params,
  });
  return response.data;
};
