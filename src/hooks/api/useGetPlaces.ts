import { useQuery } from '@tanstack/react-query';
import { getPlaces } from '../../lib/api/services/places';
import type { GetPlacesParams } from '../../lib/api/services/places';

export const PLACES_QUERY_KEY = ['places'] as const;

export const useGetPlaces = (params?: GetPlacesParams) => {
  return useQuery({
    queryKey: [...PLACES_QUERY_KEY, params],
    queryFn: () => getPlaces(params),
  });
};
