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
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Failed to fetch forecast.' });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1200');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error fetching forecast.' });
  }
}