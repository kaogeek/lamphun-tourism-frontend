import { FindParams } from '@/lib/api/types/find';
import { useQuery } from '@tanstack/react-query';
import { getPlaces } from '../../lib/api/services/places';

export const PLACES_QUERY_KEY = ['places'] as const;

export const placesQueryConfig = (params?: FindParams) => ({
  queryKey: [...PLACES_QUERY_KEY, params] as const,
  queryFn: () => getPlaces(params),
});

export const useGetPlaces = (params?: FindParams) => {
  return useQuery(placesQueryConfig(params));
};
