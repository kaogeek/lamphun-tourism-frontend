import { useQuery } from '@tanstack/react-query';
import { getPlaces } from '../../lib/api/services/places';
import type { GetPlacesParams } from '../../lib/api/services/places';
import { getEventCategories, GetEventCategoriesParams } from '@/lib/api/services/events-categories';

export const EVENT_CATEGORIES_QUERY_KEY = ['getEventCategories'] as const;

export const useGetEventCategories = (params?: GetEventCategoriesParams) => {
  return useQuery({
    queryKey: [...EVENT_CATEGORIES_QUERY_KEY, params],
    queryFn: () => getEventCategories(params),
  });
};
