import { axiosInstance } from '../axios-instance';
import { GetEventsResponse } from '../types/event';
import { FindParams } from '../types/find';

export const getEvents = async (params?: FindParams): Promise<GetEventsResponse> => {
  const response = await axiosInstance.get<any>('/api/events', {
    params,
  });

  return response.data;
};
