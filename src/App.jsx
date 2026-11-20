import { SettingsProvider, useSettings } from './context/SettingsContext';
import { useWeather } from './hooks/useWeather';
import { useForecast } from './hooks/useForecast';
import { getWeatherTheme } from './utils/weatherTheme';
import { getFriendlyErrorMessage } from './utils/errors';
import { Header } from './components/layout/Header';
import { OfflineBanner } from './components/layout/OfflineBanner';
import { CurrentWeather } from './components/weather/CurrentWeather';
import { WeatherDetails } from './components/weather/WeatherDetails';
import { HourlyForecast } from './components/weather/HourlyForecast';
import { DailyForecast } from './components/weather/DailyForecast';
import { AirQuality } from './components/weather/AirQuality';
import { Skeleton } from './components/ui/Skeleton';
import { ErrorState } from './components/ui/ErrorState';
import { EmptyState } from './components/ui/EmptyState';

function Dashboard() {
  const { selectedCity } = useSettings();
  const weatherQuery = useWeather(selectedCity);
  const forecastQuery = useForecast(selectedCity);

  const weather = weatherQuery.data?.weather;
  const air = weatherQuery.data?.air;
  const themeClass = getWeatherTheme(weather?.weather?.[0]?.id, weather?.weather?.[0]?.icon);

  return (
    <div className={`app-shell ${themeClass}`}>
      <OfflineBanner />
      <div className="container">
        <Header />

        {!selectedCity ? (
          <div style={{ marginTop: '1.5rem' }}>
            <EmptyState />
          </div>
        ) : weatherQuery.isError && !weather ? (
          <div style={{ marginTop: '1.5rem' }}>
            <ErrorState
              message={getFriendlyErrorMessage(weatherQuery.error)}
              onRetry={() => {
                weatherQuery.refetch();
                forecastQuery.refetch();
              }}
            />
          </div>
        ) : (
          <main className="dashboard-grid">
            <div className="dashboard-col">
              {weatherQuery.isLoading ? (
                <>
                  <Skeleton height="210px" />
                  <Skeleton height="240px" />
                  <Skeleton height="160px" />
                </>
              ) : (
                <>
                  <CurrentWeather
                    data={weather}
                    cityLabel={selectedCity.name}
                    dataUpdatedAt={weatherQuery.dataUpdatedAt}
                    onRefresh={() => {
                      weatherQuery.refetch();
                      forecastQuery.refetch();
                    }}
                    isFetching={weatherQuery.isFetching}
                  />
                  <WeatherDetails data={weather} />
                  <AirQuality airData={air} />
                </>
              )}
            </div>

            <div className="dashboard-col">
              {forecastQuery.isLoading ? (
                <>
                  <Skeleton height="310px" />
                  <Skeleton height="300px" />
                </>
              ) : (
                <>
                  <HourlyForecast forecastData={forecastQuery.data} />
                  <DailyForecast forecastData={forecastQuery.data} />
                </>
              )}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <Dashboard />
    </SettingsProvider>
  );
}