import { useQuery } from '@tanstack/react-query';
import { getWeatherAndAir } from '../api/weatherApi';

export function useWeather(location) {
  return useQuery({
    queryKey: ['weather', location?.lat, location?.lon],
    queryFn: () => getWeatherAndAir(location.lat, location.lon),
    enabled: Boolean(location?.lat && location?.lon),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
}