import { Droplets, Wind, Gauge, Eye, Sunrise, Sunset } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatSpeed, formatVisibility, getWindDirection } from '../../utils/units';
import { formatLocalTime } from '../../utils/format';
import { useSettings } from '../../context/SettingsContext';
import './WeatherDetails.css';

export function WeatherDetails({ data }) {
  const { unit } = useSettings();
  if (!data) return null;

  const items = [
    {
      label: 'Humidity',
      value: `${data.main?.humidity ?? '--'}%`,
      icon: Droplets,
    },
    {
      label: 'Wind',
      value: `${formatSpeed(data.wind?.speed, unit)} ${getWindDirection(data.wind?.deg)}`,
      icon: Wind,
    },
    {
      label: 'Pressure',
      value: `${data.main?.pressure ?? '--'} hPa`,
      icon: Gauge,
    },
    {
      label: 'Visibility',
      value: formatVisibility(data.visibility, unit),
      icon: Eye,
    },
    {
      label: 'Sunrise',
      value: data.sys?.sunrise ? formatLocalTime(data.sys.sunrise, data.timezone) : '--',
      icon: Sunrise,
    },
    {
      label: 'Sunset',
      value: data.sys?.sunset ? formatLocalTime(data.sys.sunset, data.timezone) : '--',
      icon: Sunset,
    },
  ];

  return (
    <Card title="Atmospheric Details">
      <div className="wd-grid">
        {items.map(({ label, value, icon: Icon }) => (
          <div className="wd-item" key={label}>
            <div className="wd-label">
              <Icon size={14} />
              <span>{label}</span>
            </div>
            <div className="wd-value">{value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}