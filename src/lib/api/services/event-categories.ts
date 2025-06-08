import { axiosInstance } from '../axios-instance';
import { GetEventCategoriesResponse } from '../types/event-categories';
import { FindParams } from '../types/find';

export const getEventCategories = async (params?: FindParams): Promise<GetEventCategoriesResponse> => {
  const response = await axiosInstance.get<any>('/api/event-categories', {
    params,
  });

  return response.data;
};
