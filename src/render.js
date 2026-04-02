function addElem(parentElem, type, text='', classList=[]) {
  var elem = document.createElement(type);

  elem.textContent = text;

  if (Array.isArray(classList) && classList.length) {
    elem.classList.add(...classList);
  }
  
  parentElem.appendChild(elem);

  return elem;
}

function showLoading($container) {
  // TODO
}

function showRadar($container) {
  // TODO
}

function showWeather($container, weather) {
  $container.innerHTML = '';

  const currentCond = weather.currentConditions;

  const $header = addElem($container, 'div', '', ['header']);
  addElem($header, 'h2', currentCond.datetime, ['time']);  // Time needs formating
  addElem($header, 'h2', weather.address, ['location']);

  const $cond = addElem($container, 'div', '', ['conditions']);
  addElem($cond, 'h1', currentCond.temp, ['temp']);
  addElem($cond, 'img', '', ['icon', currentCond.icon]);  // Add image link
  addElem($cond, 'h3', weather.description, ['desc']);
  addElem($cond, 'h5', currentCond.tempmax, ['tempmax']);
  addElem($cond, 'h5', currentCond.tempmin, ['tempmin']);
  addElem($cond, 'h5', currentCond.feelslike, ['feelslike']);
  
  const $today = addElem($container, 'div', '', ['today']);
  for (let hour of weather.hours) {
    const $hour = addElem($today, 'div', '', ['hour']);
    addElem($hour, 'p', hour.datetime, ['time']);  // Time needs formating
    addElem($hour, 'img', '', ['icon', hour.icon]);  // Add image link
    addElem($hour, 'h3', hour.temp, ['temp']);
    addElem($hour, 'p', hour.precipprob, ['precipprob']);
  }

  //  Add weather advisories here

  const $weekly = addElem($container, 'div', '', ['weekly']);
  for (let day of weather.days) {
    const $day = addElem($weekly, 'div', '', ['day']);
    addElem($day, 'h5', day.datetime, ['time']);  // Time needs formating
    addElem($day, 'img', '', ['icon', day.icon]);  // Add image link
    addElem($day, 'p', day.precipprob, ['precipprob']);
    addElem($day, 'h3', day.tempmax, ['tempmax']);
    addElem($day, 'h3', day.tempmin, ['tempmin']);
  }

  const $details = addElem($container, 'div', '', ['details']);
  
  const $aqi = addElem($details, 'div', '', ['row', 'aqi-data']);
  addElem($aqi, 'h4', 'AQI', ['title']);
  const $gradient = addElem($aqi, 'span', '', ['aqi-gradient']);
  const $aqiValue = addElem($gradient, 'h5', weather.aqi.value, ['aqi', weather.aqi.category]);
  $aqiValue.value = weather.aqi.value;

  const $wind = addElem($details, 'div', '', ['card', 'wind-data']);
  addElem($wind, 'img', '', ['icon', 'wind']);  // Add image link
  addElem($wind, 'h4', 'Wind', ['title']);
  addElem($wind, 'p', '', ['desc']);  // Add description generator
  addElem($wind, 'h3', currentCond.windspeed, ['windspeed']);
  addElem($wind, 'h3', currentCond.windgust, ['windgust']);
  addElem($wind, 'h3', currentCond.winddir, ['winddir'])  // Direction needs formating

  const $dewpoint = addElem($details, 'div', '', ['card', 'dewpoint-data']);
  addElem($dewpoint, 'img', '', ['icon', 'dew']);  // Add image link
  addElem($dewpoint, 'h4', 'Dewpoint', ['title']);
  addElem($dewpoint, 'p', '', ['desc']);  // Add description generator
  addElem($dewpoint, 'h2', currentCond.dew, ['dew']);

  const $humidity = addElem($details, 'div', '', ['card', 'humidity-data']);
  addElem($humidity, 'img', '', ['icon', 'humidity']);  // Add image link
  addElem($humidity, 'h4', 'Humidity', ['title']);
  addElem($humidity, 'p', '', ['desc']);  // Add description generator
  addElem($humidity, 'h2', currentCond.humidity, ['humidity']);

  const $pressure = addElem($details, 'div', '', ['card', 'pressure-data']);
  addElem($pressure, 'img', '', ['icon', 'pressure']);  // Add image link
  addElem($pressure, 'h4', 'Air Pressure', ['title']);
  addElem($pressure, 'p', '', ['desc']);  // Add description generator
  addElem($pressure, 'h2', currentCond.pressure, ['pressure']);

  const $uvi = addElem($details, 'div', '', ['card', 'uvi-data']);
  addElem($uvi, 'img', '', ['icon', 'uvi']);  // Add image link
  addElem($uvi, 'h4', 'UV Index', ['title']);
  addElem($uvi, 'p', '', ['desc']);  // Add description generator
  addElem($uvi, 'h2', currentCond.pressure, ['uvi']);

  const $visibility = addElem($details, 'div', '', ['card', 'visibility-data']);
  addElem($visibility, 'img', '', ['icon', 'visibility']);  // Add image link
  addElem($visibility, 'h4', 'Visibility', ['title']);
  addElem($visibility, 'p', '', ['desc']);  // Add description generator
  addElem($visibility, 'h2', currentCond.pressure, ['visibility']);

  const $sun = addElem($details, 'div', '', ['card', 'sun-data']);
  addElem($sun, 'img', '', ['icon', 'sunrise']);  // Add image link
  addElem($sun, 'h4', 'Sunrise', ['title']);
  addElem($sun, 'h3', currentCond.sunrise, ['sunrise']);
  addElem($sun, 'img', '', ['icon', 'sunset']);  // Add image link
  addElem($sun, 'h4', 'Sunset', ['title']);
  addElem($sun, 'h3', currentCond.sunset, ['sunset']);

  const $moon = addElem($details, 'div', '', ['card', 'moon']);
  addElem($moon, 'h4', 'Moon Phase', ['title']);
  addElem($moon, 'h5', ['desc']);  // Add description generator
  const $phase = addElem($moon, 'img', ['icon', 'moonphase']);  // Add image link
  $phase.value = weather.currentCond.moonphase;
}

export { showLoading, showRadar, showWeather };