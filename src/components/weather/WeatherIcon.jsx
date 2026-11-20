import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
} from 'lucide-react';

export function WeatherIcon({ code = '01d', size = 28 }) {
  const map = {
    '01d': <Sun size={size} color="#fbbf24" />,
    '01n': <Moon size={size} color="#e2e8f0" />,
    '02d': <CloudSun size={size} color="#fcd34d" />,
    '02n': <CloudMoon size={size} color="#cbd5e1" />,
    '03d': <Cloud size={size} color="#94a3b8" />,
    '03n': <Cloud size={size} color="#94a3b8" />,
    '04d': <Cloud size={size} color="#64748b" />,
    '04n': <Cloud size={size} color="#64748b" />,
    '09d': <CloudRain size={size} color="#38bdf8" />,
    '09n': <CloudRain size={size} color="#38bdf8" />,
    '10d': <CloudRain size={size} color="#0ea5e9" />,
    '10n': <CloudRain size={size} color="#0ea5e9" />,
    '11d': <CloudLightning size={size} color="#f59e0b" />,
    '11n': <CloudLightning size={size} color="#f59e0b" />,
    '13d': <CloudSnow size={size} color="#e0f2fe" />,
    '13n': <CloudSnow size={size} color="#e0f2fe" />,
    '50d': <CloudFog size={size} color="#94a3b8" />,
    '50n': <CloudFog size={size} color="#94a3b8" />,
  };

  return map[code] || <CloudSun size={size} color="#fbbf24" />;
}