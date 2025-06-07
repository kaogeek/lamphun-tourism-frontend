import { useQuery } from '@tanstack/react-query';
import { getPlaces } from '../../lib/api/services/places';
import type { GetPlacesParams } from '../../lib/api/services/places';
import { getEventCategories } from '@/lib/api/services/events-categories';
import { FindParams } from '@/lib/api/types/find';

export const EVENT_CATEGORIES_QUERY_KEY = ['getEventCategories'] as const;

export const useGetEventCategories = (params?: FindParams) => {
  return useQuery({
    queryKey: [...EVENT_CATEGORIES_QUERY_KEY, params],
    queryFn: () => getEventCategories(params),
  });
};
