async function getWeatherData(formData) {
  const location = formData.get('location');

  if (!location) {
    return new Error('Location is required');
  }
  try {
    const response = await fetch(`https://weather-app-w2pf.onrender.com/weather?location=${location}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
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
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export { getWeatherData, getAQIData };