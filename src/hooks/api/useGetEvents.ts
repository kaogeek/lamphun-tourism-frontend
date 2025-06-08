import { getEvents } from '@/lib/api/services/events';
import { FindParams } from '@/lib/api/types/find';
import { useQuery } from '@tanstack/react-query';

export const EVENT_QUERY_KEY = ['getEvents'] as const;

export const useGetEvents = (params?: FindParams) => {
  return useQuery({
    queryKey: [...EVENT_QUERY_KEY, params],
    queryFn: () => getEvents(params),
  });
};
