import { axiosInstance } from '../axios-instance';
import { GetEventCategoriesResponse } from '../types/event-categories';

// TODO move generic type
export type GetEventCategoriesParams = {
  page?: number;
  limit?: number;
  search?: string;
  populate?: string[] | any;
  fields?: string[];
  filters?: Record<string, string>;
};

export const getEventCategories = async (params?: GetEventCategoriesParams): Promise<GetEventCategoriesResponse> => {
  const response = await axiosInstance.get<any>('/api/event-categories', {
    params,
  });
  return response.data;
};
