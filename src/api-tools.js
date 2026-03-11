export default async (formData) => {
  
  const API_ENDPOINT = 'https:/weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
  const API_KEY = process.env.API_KEY;
  const location = formData.get('location');

  try {
    const response = await fetch(`${API_ENDPOINT}/${location}?key=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}