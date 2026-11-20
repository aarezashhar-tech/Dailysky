export function formatLocalTime(unixSeconds, timezoneOffsetSeconds = 0) {
  const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000);
  return date.toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatHour(unixSeconds, timezoneOffsetSeconds = 0) {
  const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000);
  return date.toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: 'numeric',
    hour12: true,
  });
}

export function groupForecastByDay(list = [], timezoneOffsetSeconds = 0) {
  const daysMap = new Map();

  list.forEach((item) => {
    const localDate = new Date((item.dt + timezoneOffsetSeconds) * 1000);
    const dayKey = localDate.toISOString().split('T')[0];

    if (!daysMap.has(dayKey)) {
      daysMap.set(dayKey, {
        date: localDate,
        dayKey,
        minTemp: item.main.temp_min,
        maxTemp: item.main.temp_max,
        pops: [item.pop || 0],
        icons: [item.weather[0]],
      });
    } else {
      const existing = daysMap.get(dayKey);
      existing.minTemp = Math.min(existing.minTemp, item.main.temp_min);
      existing.maxTemp = Math.max(existing.maxTemp, item.main.temp_max);
      existing.pops.push(item.pop || 0);
      existing.icons.push(item.weather[0]);
    }
  });

  return Array.from(daysMap.values())
    .slice(0, 5)
    .map((day, idx) => {
      const midWeather = day.icons[Math.floor(day.icons.length / 2)];
      const maxPop = Math.round(Math.max(...day.pops) * 100);
      const dayName =
        idx === 0
          ? 'Today'
          : day.date.toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short' });

      return {
        dayKey: day.dayKey,
        dayName,
        minTemp: day.minTemp,
        maxTemp: day.maxTemp,
        pop: maxPop,
        condition: midWeather.main,
        description: midWeather.description,
        iconCode: midWeather.icon,
      };
    });
}