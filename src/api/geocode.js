export default async function handler(req, res) {
  const { q, lat, lon } = req.query;
  const apiKey = process.env.OWM_API_KEY || process.env.VITE_OWM_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'Server API key is not configured.' });
  }

  try {
    const url = q
      ? `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=5&appid=${apiKey}`
      : `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ message: 'Geocoding request failed.' });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error during geocoding.' });
  }
}