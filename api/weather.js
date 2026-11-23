export default async function handler(req, res) {
  const { lat, lon } = req.query;
  const apiKey = process.env.OWM_API_KEY || process.env.VITE_OWM_API_KEY;

  if (!lat || !lon) {
    return res.status(400).json({ message: 'Latitude and longitude are required.' });
  }
  if (!apiKey) {
    return res.status(500).json({ message: 'Server API key is not configured.' });
  }

  try {
    const [weatherRes, airRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`),
      fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    ]);

    if (!weatherRes.ok) {
      return res.status(weatherRes.status).json({ message: 'Failed to fetch current weather.' });
    }

    const weather = await weatherRes.json();
    const air = airRes.ok ? await airRes.json() : null;

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ weather, air });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error fetching weather.' });
  }
}