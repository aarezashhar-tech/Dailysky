import { useQuery } from '@tanstack/react-query';
import { getForecast } from '../api/weatherApi';

export function useForecast(location) {
  return useQuery({
    queryKey: ['forecast', location?.lat, location?.lon],
    queryFn: () => getForecast(location.lat, location.lon),
    enabled: Boolean(location?.lat && location?.lon),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
  });
}