export function formatTemp(celsius, unit = 'metric') {
  if (celsius === undefined || celsius === null) return '--';
  const val = unit === 'imperial' ? (celsius * 9) / 5 + 32 : celsius;
  return `${Math.round(val)}°`;
}

export function formatSpeed(metersPerSec, unit = 'metric') {
  if (metersPerSec === undefined || metersPerSec === null) return '--';
  if (unit === 'imperial') {
    return `${Math.round(metersPerSec * 2.23694)} mph`;
  }
  return `${Math.round(metersPerSec * 3.6)} km/h`;
}

export function formatVisibility(meters, unit = 'metric') {
  if (meters === undefined || meters === null) return '--';
  if (unit === 'imperial') {
    return `${(meters / 1609.34).toFixed(1)} mi`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

export function getWindDirection(deg) {
  if (deg === undefined || deg === null) return '';
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}