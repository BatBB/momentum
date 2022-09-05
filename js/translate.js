import language from "./language.js";
import { showTime } from "./time.js";
import getQuotes from "./quotes.js";
import getWeather from "./weather.js";

export default function setting() {
  const lang = localStorage.getItem('lang');
  document.getElementById(localStorage.getItem('lang')).checked = true;
  document.querySelector('.city').placeholder = language.placeHolderCity[lang];
  document.querySelector('.name').placeholder = language.placeHolderName[lang];
  document.querySelector('.time-check-text').textContent = language.time[lang] + ':';
  document.querySelector('.date-check-text').textContent = language.date[lang] + ':';
  document.querySelector('.greeting-check-text').textContent = language.greeting[lang] + ':';
  document.querySelector('.quote-check-text').textContent = language.quote[lang] + ':';
  document.querySelector('.player-check-text').textContent = language.player[lang] + ':';
  document.querySelector('.weather-check-text').textContent = language.weather[lang] + ':';
  document.querySelector('.todo-check-text').textContent = language.todo[lang] + ':';
  document.querySelector('.language-check-text').textContent = language.language[lang] + ':';
  document.querySelector('.background-check-text').textContent = language.background[lang] + ':';
  if (document.querySelector('.city').value.toLowerCase() === 'minsk' || document.querySelector('.city').value.toLowerCase() === 'минск') {
    document.querySelector('.city').value = language.minsk[lang];
  }

  showTime();
  getQuotes();
  getWeather();
}