import { useSettings } from '../../context/SettingsContext';

export function UnitToggle() {
  const { unit, toggleUnit } = useSettings();
  return (
    <button
      type="button"
      className="ds-icon-btn"
      onClick={toggleUnit}
      title="Switch temperature and speed units"
    >
      {unit === 'metric' ? '°C / km/h' : '°F / mph'}
    </button>
  );
}