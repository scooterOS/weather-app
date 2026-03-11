import './styles.css';
import render from './render.js';
import getWeatherData from './api-tools.js';


(() => {
  // cache DOM
  const $form = document.getElementById('form');

  // add event listener
  $form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = new FormData($form);
    console.log(formData);
    getWeatherData(formData)
    .then((data) => {
      showWeather(data);
    });
  });

  function showWeather(data) {
    console.log(data);
  }

})();