const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting-text');

export function showTime() {
  const curDate = new Date();
  const options = { month: 'long', day: 'numeric', weekday: 'long' };
  time.textContent = curDate.toLocaleTimeString('en');
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