import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SettingsContext = createContext(null);

const DEFAULT_CITY = {
  name: 'London',
  country: 'GB',
  lat: 51.5074,
  lon: -0.1278,
};

export function SettingsProvider({ children }) {
  const [unit, setUnit] = useLocalStorage('dailysky_unit', 'metric');
  const [themeMode, setThemeMode] = useLocalStorage('dailysky_theme', 'dark');
  const [selectedCity, setSelectedCity] = useLocalStorage('dailysky_city', DEFAULT_CITY);
  const [recentCities, setRecentCities] = useLocalStorage('dailysky_recents', [DEFAULT_CITY]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const toggleUnit = () => setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  const toggleThemeMode = () => setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const selectCity = (city) => {
    setSelectedCity(city);
    setRecentCities((prev) => {
      const filtered = prev.filter(
        (c) => !(Math.abs(c.lat - city.lat) < 0.05 && Math.abs(c.lon - city.lon) < 0.05)
      );
      return [city, ...filtered].slice(0, 5);
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        unit,
        toggleUnit,
        themeMode,
        toggleThemeMode,
        selectedCity,
        selectCity,
        recentCities,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}