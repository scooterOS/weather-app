import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/weather', async (req, res) => {
  const location = req.query.location;
  const API_KEY = process.env.WEATHER_KEY;

  const API_ENDPOINT = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;

  try {
    const response = await fetch(API_ENDPOINT);
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

  const date = new Date().toLocaleDateString('en-US').replaceAll('/', '-');

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