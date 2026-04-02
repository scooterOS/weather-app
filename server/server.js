import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/weather', async (req, res) => {
  const location = req.query.location;
  const API_KEY = process.env.WEATHER_KEY;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }
  if (!API_KEY) {
    return res.status(500).json({ error: 'Missing API key' });
  }

  const API_ENDPOINT = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;

  try {
    const response = await fetch(API_ENDPOINT);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.get('/aqi', async (req, res) => {
  const { latitude, longitude } = req.query;
  const API_KEY = process.env.AQI_KEY;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude required' });
  }
  if (!API_KEY) {
    return res.status(500).json({ error: 'Missing API key' });
  }

  const date = new Date().toISOString().split('T')[0];
  const API_ENDPOINT = `https://www.airnowapi.org/aq/forecast/latLong/?format=json&latitude=${latitude}&longitude=${longitude}&date=${date}&distance=50&API_KEY=${API_KEY}`;

  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch AQI data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});