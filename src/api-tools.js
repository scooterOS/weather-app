async function getWeatherData(formData) {
  const location = formData.get('location');

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }
  try {
    const response = await fetch(`https://weather-app-w2pf.onrender.com/weather?location=${location}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

async function getAQIData(latitude, longitude) {
  try {
    const response = await fetch(
      `https://weather-app-w2pf.onrender.com/aqi?latitude=${latitude}&longitude=${longitude}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export { getWeatherData, getAQIData };