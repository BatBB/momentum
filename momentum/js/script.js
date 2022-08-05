/* -------------- imports -------------- */
import { showTime, getTimeOfDay } from "../js/time.js";
import { setLocalStorage, getLocalStorage } from "../js/save_local_storage.js";
import setBg from "../js/background.js";
import getWeather from "../js/weather.js";
import getQuotes from "../js/quotes.js";
import { createPlayList, setPlayPause, playNext, playPrev, upgradeProgressPlay, clickVolume, changeVolume, playListClick } from "../js/player.js"

/* -------------- Variables -------------- */
const slideNext = document.querySelector('.slide-next'),
  slidePrev = document.querySelector('.slide-prev'),
  city = document.querySelector('.city'),
  changeQuote = document.querySelector('.change-quote'),
  play = document.querySelector('.play'),
  playNextBtn = document.querySelector('.play-next'),
  playPrevBtn = document.querySelector('.play-prev');

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

getQuotes();
changeQuote.addEventListener('click', getQuotes)


/*--------------------------------------------------------------------------------------------------*/
createPlayList();

changeVolume(0.5);

play.addEventListener('click', () => {
  setPlayPause()
});

const volume = document.querySelector('.volume');
volume.addEventListener('click', clickVolume);

playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);

const playItem = document.querySelectorAll('.play-item');
playItem.forEach((el, ind) => {
  el.addEventListener('click', () => {
    playListClick(ind);
  })
})

function toggleActive() {
  document.querySelector('.overlay').classList.toggle('hidden');
  document.querySelector('.popup-settings').classList.toggle('hidden');
}

document.querySelector('.setting').addEventListener('click', () => {
  toggleActive()
})

document.querySelector('.overlay').addEventListener('click', () => {
  toggleActive()
})


function checkBlock(id) {
  const checkbox = document.getElementById(id);
  if (checkbox.checked === false) {
    document.querySelector('.'+id).classList.add('hidden');
  }
  else {
    document.querySelector('.'+id).classList.remove('hidden');
  }
}

document.body.addEventListener('change', (el) =>{
  const className = el.target.classList.value;
  
  if (className.includes('check-block')) {
    switch(el.target.id) {
      case 'time' : checkBlock('time'); break;
      case 'date' : checkBlock('date'); break;
      case 'greeting' : checkBlock('greeting'); break;
      case 'player' : checkBlock('player'); break;
      case 'weather' : checkBlock('weather'); break;
      case 'quote' : checkBlock('quote'); break;
      case 'todo' : checkBlock('todo'); break; 
    }
  }

  if (className.includes('progress-bar')) {
    const progressBar = document.querySelector('.progress-bar');
    upgradeProgressPlay(progressBar.value)
  }

  if (className.includes('city')) {
    getWeather(city.value);
  }

  if (className.includes('volume-range')) {
    const volumeRange = document.querySelector('.volume-range');
    changeVolume(volumeRange.value);
  }
})

// import i18next from 'https://deno.land/x/i18next/index.js';

// i18next.init({
//   lng: 'en',
//   debug: true,
//   resources: {
//     en: {
//       translation: {
//         'morning' : 'Good morning',
//         'afternoon' : 'Good afternoon',
//         'evening' : 'Good evening',
//         'night' : 'Good night',
//         'placeholder' : '[Enter your name]',
//       }
//     },
//     ru: {
//       translation: {
//         'vorning' : 'Доброе утро',
//         'afternoon' : 'Добрый день',
//         'evening' : 'Добрый вечер',
//         'night' : 'Спокойной ночи',
//         'placeholder' : '[Введите свое имя]'
//       }
//     }
//   }
// });

// document.querySelector('.greeting').textContent = i18next.t('greeting');
