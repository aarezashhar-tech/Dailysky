import { useQuery } from '@tanstack/react-query';
import { searchCities } from '../api/weatherApi';
import { useDebounce } from './useDebounce';

export function useCitySearch(query) {
  const debouncedQuery = useDebounce(query, 350);

  return useQuery({
    queryKey: ['citySearch', debouncedQuery],
    queryFn: () => searchCities(debouncedQuery),
    enabled: debouncedQuery.trim().length >= 2,
    staleTime: 60 * 60 * 1000,
  });
}