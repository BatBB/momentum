import language from './language.js'

const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting-text');
  
export function showTime() {
  const lang = localStorage.getItem('lang');
  const curDate = new Date();
  const options = { month: 'long', day: 'numeric', weekday: 'long' };
  time.textContent = curDate.toLocaleTimeString();
  date.textContent = curDate.toLocaleDateString(lang, options);
  showGreeting(lang);
  setTimeout(showTime, 1000);
}

export function getTimeOfDay() {
  const day = ['night', 'morning', 'afternoon', 'evening'];
  return day[Math.floor((new Date()).getHours() / 6)];
}

function showGreeting(lang) {
  greeting.textContent = language[getTimeOfDay()][lang]
} 