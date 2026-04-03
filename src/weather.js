import './styles.css';
import { showWeather } from './render.js';
import { getAQIData, getWeatherData } from './api-tools.js';


class WeatherMoment {
  constructor(data) {
    this.cloudcover = data.cloudcover;
    this.conditions = data.conditions;
    this.datetime = data.datetime;
    this.dew = data.dew;
    this.feelslike = data.feelslike;
    this.humidity = data.humidity;
    this.icon = data.icon;
    this.moonphase = data.moonphase;
    this.precip = data.precip;
    this.precipprob = data.precipprob;
    this.preciptype = data.preciptype;
    this.pressure = data.pressure;
    this.snow = data.snow;
    this.sunrise = data.sunrise;
    this.sunset = data.sunset;
    this.temp = data.temp;
    this.tempmax = data.tempmax;
    this.tempmin = data.tempmin;
    this.uvindex = data.uvindex;
    this.visibility = data.visibility;
    this.winddir = data.winddir;
    this.windgust = data.windgust;
    this.windspeed = data.windspeed;
  }
}


class Weather {
  constructor(data) {
    this.alerts = data.alerts;
    this.currentConditions = new WeatherMoment(data.currentConditions);
    this.days = data.days.map(d => new WeatherMoment(d));
    this.hours = data.days.map(d => d.hours.map(h => new WeatherMoment(h)));
    this.description = data.description;
    this.address = data.resolvedAddress;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
  }
}


class AQI {
  constructor(data) {
    this.value = data.AQI;
    this.category = data.CategoryName;
  }
}


(() => {
  // cache DOM
  const $form = document.getElementById('form');
  const $display = document.getElementById('display');

  // add event listener
  $form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData($form);
    const weatherData = await getWeatherData(formData);
    const weather = new Weather(weatherData);
    
    console.log(weatherData);
    
    showWeather($display, weather);
  });

})();