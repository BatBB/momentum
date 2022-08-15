import translate from "./translate.js";

const weatherError = document.querySelector('.weather-error'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  wind = document.querySelector('.wind'),
  humidity = document.querySelector('.humidity');

async function getWeather() {
  const lang = localStorage.getItem('lang')
  const city = localStorage.getItem('city')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=c9d98867ee9c39fb37e15a59e70caa33&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.message) {
    weatherError.textContent = data.message;
    weatherIcon.classList.remove(weatherIcon.classList[2]);
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  }
  else {
    weatherError.textContent = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${translate.wind[lang]}: ${Math.round(data.wind.speed)} ${translate.windSpeed[lang]}`;
    humidity.textContent = `${translate.humidity[lang]}: ${Math.round(data.main.humidity)} %.`;
  }
}

export default getWeather;