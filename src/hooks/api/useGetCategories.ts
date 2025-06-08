import { getEventCategories } from '@/lib/api/services/event-categories';
import { FindParams } from '@/lib/api/types/find';
import { useQuery } from '@tanstack/react-query';

export const EVENT_CATEGORIES_QUERY_KEY = ['getEventCategories'] as const;

export const useGetEventCategories = (params?: FindParams) => {
  return useQuery({
    queryKey: [...EVENT_CATEGORIES_QUERY_KEY, params],
    queryFn: () => getEventCategories(params),
  });
};
