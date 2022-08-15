import translate from "./translate.js";
import { showTime } from "./time.js";
import getQuotes from "./quotes.js";
import getWeather from "./weather.js";

export default function setting() {
  const lang = localStorage.getItem('lang');
  document.querySelector('.city').placeholder = translate.placeHolderCity[lang];
  document.querySelector('.name').placeholder = translate.placeHolderName[lang];
  document.querySelector('.time-check-text').textContent = translate.time[lang] + ':';
  document.querySelector('.date-check-text').textContent = translate.date[lang] + ':';
  document.querySelector('.greeting-check-text').textContent = translate.greeting[lang] + ':';
  document.querySelector('.quote-check-text').textContent = translate.quote[lang] + ':';
  document.querySelector('.player-check-text').textContent = translate.player[lang] + ':';
  document.querySelector('.weather-check-text').textContent = translate.weather[lang] + ':';
  document.querySelector('.todo-check-text').textContent = translate.todo[lang] + ':';
  document.querySelector('.language-check-text').textContent = translate.language[lang] + ':';
  document.querySelector('.background-check-text').textContent = translate.background[lang] + ':';

  showTime();
  getQuotes();
  getWeather();
}