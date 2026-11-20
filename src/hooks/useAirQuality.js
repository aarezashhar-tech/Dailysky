import { useMemo } from 'react';

const AQI_LEVELS = {
  1: { label: 'Good', color: '#22c55e', advice: 'Air quality is ideal for outdoor activities.' },
  2: { label: 'Fair', color: '#84cc16', advice: 'Acceptable air quality for most individuals.' },
  3: { label: 'Moderate', color: '#eab308', advice: 'Sensitive groups should limit prolonged exertion.' },
  4: { label: 'Poor', color: '#f97316', advice: 'Reduce prolonged or heavy outdoor exertion.' },
  5: { label: 'Very Poor', color: '#ef4444', advice: 'Avoid outdoor physical activities.' },
};

export function useAirQuality(airData) {
  return useMemo(() => {
    const entry = airData?.list?.[0];
    if (!entry) return null;

    const aqi = entry.main?.aqi || 1;
    const meta = AQI_LEVELS[aqi] || AQI_LEVELS[1];

    return {
      aqi,
      ...meta,
      pm2_5: Math.round(entry.components?.pm2_5 ?? 0),
      pm10: Math.round(entry.components?.pm10 ?? 0),
      o3: Math.round(entry.components?.o3 ?? 0),
      no2: Math.round(entry.components?.no2 ?? 0),
    };
  }, [airData]);
}