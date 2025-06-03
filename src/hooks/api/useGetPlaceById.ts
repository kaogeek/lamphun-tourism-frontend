import { useQuery } from '@tanstack/react-query';
import { getPlaceById } from '../../lib/api/services/places';

export const useGetPlaceById = (id: string) => {
  return useQuery({
    queryKey: ['place', id],
    queryFn: () => getPlaceById(id),
    enabled: !!id,
  });
};
