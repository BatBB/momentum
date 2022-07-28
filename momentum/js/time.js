const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting');

export function showTime() {
  const curDate = new Date();
  const options = { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' };
  time.textContent = curDate.toLocaleTimeString();
  date.textContent = curDate.toLocaleDateString('en', options);
  showGreeting();
  setTimeout(showTime, 1000);
}

export function getTimeOfDay() {
  const day = ['night', 'morning', 'afternoon', 'evening'];
  return day[Math.floor((new Date()).getHours() / 6)];
}

function showGreeting() {
  greeting.textContent = `Good ${getTimeOfDay()}, `
}