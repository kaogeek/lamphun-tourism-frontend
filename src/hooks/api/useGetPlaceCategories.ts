import { getPlaceCategories } from '@/lib/api/services/place-categories';
import { FindParams } from '@/lib/api/types/find';
import { useQuery } from '@tanstack/react-query';

export const PLACE_CATEGORIES_QUERY_KEY = ['placeCategories'] as const;

export const placeCategoriesQueryConfig = (params?: FindParams) => ({
  queryKey: [...PLACE_CATEGORIES_QUERY_KEY, params] as const,
  queryFn: () => getPlaceCategories(params),
});

export const useGetPlaceCategories = (params?: FindParams) => {
  return useQuery(placeCategoriesQueryConfig(params));
};
