import { useState, useCallback } from 'react';
import { reverseGeocode } from '../api/weatherApi';

export function useGeolocation() {
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState(null);

  const locate = useCallback((onSuccess) => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }

    setLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude: lat, longitude: lon } = pos.coords;
          const places = await reverseGeocode(lat, lon);
          const place = places?.[0];
          onSuccess({
            lat,
            lon,
            name: place?.name || 'Current Location',
            country: place?.country || '',
            state: place?.state || '',
          });
        } catch {
          onSuccess({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            name: 'Current Location',
            country: '',
          });
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        setGeoError(
          err.code === 1
            ? 'Location permission denied. Search for a city instead.'
            : 'Unable to determine your location.'
        );
      },
      { timeout: 10000 }
    );
  }, []);

  return { locate, locating, geoError, clearGeoError: () => setGeoError(null) };
}