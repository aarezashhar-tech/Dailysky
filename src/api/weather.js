import { fetchJson } from './client';

const DIRECT_KEY = import.meta.env.VITE_OWM_API_KEY;
const USE_DIRECT = import.meta.env.DEV && DIRECT_KEY && DIRECT_KEY !== 'paste_your_real_key_here';

export async function getWeatherAndAir(lat, lon) {
  if (USE_DIRECT) {
    const [weather, air] = await Promise.all([
      fetchJson(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${DIRECT_KEY}`),
      fetchJson(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${DIRECT_KEY}`).catch(() => null),
    ]);
    return { weather, air };
  }
  return fetchJson(`/api/weather?lat=${lat}&lon=${lon}`);
}

export async function getForecast(lat, lon) {
  if (USE_DIRECT) {
    return fetchJson(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${DIRECT_KEY}`);
  }
  return fetchJson(`/api/forecast?lat=${lat}&lon=${lon}`);
}

export async function searchCities(query) {
  if (!query || query.trim().length < 2) return [];
  if (USE_DIRECT) {
    return fetchJson(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query.trim())}&limit=5&appid=${DIRECT_KEY}`);
  }
  return fetchJson(`/api/geocode?q=${encodeURIComponent(query.trim())}`);
}

export async function reverseGeocode(lat, lon) {
  if (USE_DIRECT) {
    return fetchJson(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${DIRECT_KEY}`);
  }
  return fetchJson(`/api/geocode?lat=${lat}&lon=${lon}`);
}