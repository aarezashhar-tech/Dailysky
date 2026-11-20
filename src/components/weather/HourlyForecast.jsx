import { Clock } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from 'recharts';
import { Card } from '../ui/Card';
import { WeatherIcon } from './WeatherIcon';
import { formatHour } from '../../utils/format';
import { useSettings } from '../../context/SettingsContext';
import './HourlyForecast.css';

export function HourlyForecast({ forecastData }) {
  const { unit } = useSettings();
  const list = forecastData?.list?.slice(0, 8) || [];
  const tz = forecastData?.city?.timezone || 0;

  if (list.length === 0) return null;

  const chartData = list.map((item) => {
    const raw = item.main.temp;
    const temp = Math.round(unit === 'imperial' ? (raw * 9) / 5 + 32 : raw);
    return {
      time: formatHour(item.dt, tz),
      temp,
      pop: Math.round((item.pop || 0) * 100),
      icon: item.weather?.[0]?.icon,
    };
  });

  return (
    <Card title="24-Hour Trend" icon={Clock}>
      <div className="hf-chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 12, left: 12, bottom: 0 }}>
            <defs>
              <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" hide />
            <Tooltip
              contentStyle={{
                background: '#0f172a',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '0.82rem',
              }}
              formatter={(value) => [`${value}°`, 'Temp']}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#38bdf8"
              strokeWidth={2.5}
              fill="url(#tempFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="hf-strip">
        {chartData.map((slot, idx) => (
          <div className="hf-slot" key={idx}>
            <span className="hf-time">{slot.time}</span>
            <WeatherIcon code={slot.icon} size={22} />
            <span className="hf-temp">{slot.temp}°</span>
            <span className="hf-pop">{slot.pop > 0 ? `${slot.pop}%` : '\u00A0'}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}