import { Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { WeatherIcon } from './WeatherIcon';
import { groupForecastByDay } from '../../utils/format';
import { formatTemp } from '../../utils/units';
import { useSettings } from '../../context/SettingsContext';
import './DailyForecast.css';

export function DailyForecast({ forecastData }) {
  const { unit } = useSettings();
  const days = groupForecastByDay(forecastData?.list, forecastData?.city?.timezone || 0);

  if (days.length === 0) return null;

  const weekMin = Math.min(...days.map((d) => d.minTemp));
  const weekMax = Math.max(...days.map((d) => d.maxTemp));
  const span = Math.max(weekMax - weekMin, 1);

  return (
    <Card title="5-Day Forecast" icon={Calendar}>
      <div className="df-list">
        {days.map((day) => {
          const leftPct = ((day.minTemp - weekMin) / span) * 100;
          const widthPct = Math.max(((day.maxTemp - day.minTemp) / span) * 100, 12);

          return (
            <div className="df-row" key={day.dayKey}>
              <span className="df-day">{day.dayName}</span>
              <WeatherIcon code={day.iconCode} size={24} />
              <span className="df-pop">{day.pop > 0 ? `${day.pop}%` : ''}</span>

              <div className="df-temps">
                <span className="df-min">{formatTemp(day.minTemp, unit)}</span>
                <div className="df-bar-track">
                  <div
                    className="df-bar-fill"
                    style={{ marginLeft: `${leftPct}%`, width: `${widthPct}%` }}
                  />
                </div>
                <span className="df-max">{formatTemp(day.maxTemp, unit)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}