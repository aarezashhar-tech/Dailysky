export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function getFriendlyErrorMessage(error) {
  if (!navigator.onLine) {
    return 'You appear to be offline. Showing cached data if available.';
  }
  if (error?.status === 401) {
    return 'Invalid API key. Check your VITE_OWM_API_KEY in .env.';
  }
  if (error?.status === 404) {
    return 'Location not found. Try searching for a nearby major city.';
  }
  if (error?.status === 429) {
    return 'Too many requests. Please wait a moment and try again.';
  }
  return error?.message || 'Unable to load weather data. Please try again.';
}