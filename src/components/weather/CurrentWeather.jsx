import { Card } from '../ui/Card';
import { WeatherIcon } from './WeatherIcon';
import { LastUpdated } from './LastUpdated';
import { formatTemp } from '../../utils/units';
import { formatLocalTime } from '../../utils/format';
import { useSettings } from '../../context/SettingsContext';
import './CurrentWeather.css';

export function CurrentWeather({ data, cityLabel, dataUpdatedAt, onRefresh, isFetching }) {
  const { unit } = useSettings();
  if (!data) return null;

  const condition = data.weather?.[0];
  const localTime = formatLocalTime(data.dt, data.timezone);

  return (
    <Card>
      <div className="cw-top">
        <div>
          <h1 className="cw-city">
            {cityLabel || data.name}
            {data.sys?.country ? `, ${data.sys.country}` : ''}
          </h1>
          <p className="cw-sub">
            Local time {localTime} • {condition?.description}
          </p>
        </div>
        <LastUpdated dataUpdatedAt={dataUpdatedAt} onRefresh={onRefresh} isFetching={isFetching} />
      </div>

      <div className="cw-main">
        <div className="cw-temp-group">
          <WeatherIcon code={condition?.icon} size={64} />
          <span className="cw-temp">{formatTemp(data.main?.temp, unit)}</span>
        </div>

        <div className="cw-range">
          <div>Feels like {formatTemp(data.main?.feels_like, unit)}</div>
          <div>
            H: {formatTemp(data.main?.temp_max, unit)} • L: {formatTemp(data.main?.temp_min, unit)}
          </div>
        </div>
      </div>
    </Card>
  );
}