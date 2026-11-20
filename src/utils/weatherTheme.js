export function getWeatherTheme(weatherId, iconCode = '') {
  const isNight = iconCode.endsWith('n');

  if (isNight) return 'theme-night';
  if (!weatherId) return 'theme-clear';

  if (weatherId >= 200 && weatherId < 600) return 'theme-rain';
  if (weatherId >= 600 && weatherId < 700) return 'theme-snow';
  if (weatherId >= 700 && weatherId < 800) return 'theme-mist';
  if (weatherId === 800) return 'theme-clear';
  return 'theme-cloudy';
}