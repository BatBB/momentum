/* -------------- imports -------------- */
import { showTime, getTimeOfDay} from "../js/time.js";
import { setLocalStorage, getLocalStorage } from "../js/save_local_storage.js";
import setBg from "../js/background.js";
import getWeather from "../js/weather.js";


/* -------------- Variables -------------- */
const slideNext = document.querySelector('.slide-next'),
      slidePrev = document.querySelector('.slide-prev'),
      city = document.querySelector('.city');

const getRandomNum = () => Math.floor(Math.random() * 20) + 1;
let randomNum = getRandomNum();


showTime();
getLocalStorage();


setBg(getTimeOfDay(), randomNum);

const getSlideNext = () => {
  if (randomNum !== 20) randomNum++;
  else randomNum = 1;
  setBg(getTimeOfDay(), randomNum);
}
const getSlidePrev = () => {
  if (randomNum !== 1) randomNum--;
  else randomNum = 20;
  setBg(getTimeOfDay(), randomNum);
}

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);


window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);


const input = document.querySelector('.name');
input.addEventListener('input', resizeInput); 
resizeInput.call(input);

function resizeInput() {
  this.style.width = this.value.length === 0 ? '335px' : ((this.value.length + 0.5) + 'ex');
}

city.value = localStorage.getItem('city') || 'Minsk';
getWeather(city.value)
city.addEventListener('change', () => {
  getWeather(city.value);
})
