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

// const getRandomNum = () => Math.floor(Math.random() * 20) + 1;
// let randomNum = getRandomNum();

showTime();
getLocalStorage();

setBg();

// const getSlideNext = () => {
//   if (randomNum !== 20) randomNum++;
//   else randomNum = 1;
//   setBg(getTimeOfDay(), randomNum);
// }
// const getSlidePrev = () => {
//   if (randomNum !== 1) randomNum--;
//   else randomNum = 20;
//   setBg(getTimeOfDay(), randomNum);
// }

// slidePrev.addEventListener('click', getSlidePrev);
// slideNext.addEventListener('click', getSlideNext);

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

function hiddenBlock(id) {
  const checkbox = document.getElementById(id);
  if (checkbox.checked === false) {
    document.querySelector('.' + id).classList.add('hidden');
  }
  else {
    document.querySelector('.' + id).classList.remove('hidden');
  }
}
document.body.addEventListener('click', (el) => {
  const className = el.target.classList[0];
  switch (className) {
    case 'slide-next':
      setBg('next');
      break;
    case 'slide-prev':
      setBg('prev');
      break;
    case 'setting': {
      document.querySelector('.popup-settings').classList.remove('hidden');
      document.querySelector('.overlay').classList.remove('hidden');
      break;
    }
    case 'overlay': {
      document.querySelector('.popup-settings').classList.add('hidden');
      document.querySelector('.overlay').classList.add('hidden');
      document.querySelector('.popup-todo').classList.add('hidden');
      break;
    }
    case 'todo': {
      document.querySelector('.popup-todo').classList.remove('hidden');
      document.querySelector('.overlay').classList.remove('hidden');
      break;
    }
    case 'todo-add': {
      createTodoList();
      break;
    }
    case 'todo-remove': {
      el.target.parentElement.remove();
      break;
    }
    case 'item-text': {
      el.target.classList.toggle('complete');
      break;
    }
  }

})

document.body.addEventListener('change', (el) => {
  switch (el.target.classList.value) {
    case 'progress-bar':
      const progressBar = document.querySelector('.progress-bar');
      upgradeProgressPlay(progressBar.value)
      break;
    case 'city':
      getWeather(city.value);
      break;
    case 'volume-range':
      const volumeRange = document.querySelector('.volume-range');
      changeVolume(volumeRange.value);
      break;
    case 'check-block':
      switch (el.target.id) {
        case 'time': hiddenBlock('time'); break;
        case 'date': hiddenBlock('date'); break;
        case 'greeting': hiddenBlock('greeting'); break;
        case 'player': hiddenBlock('player'); break;
        case 'weather': hiddenBlock('weather'); break;
        case 'quote': hiddenBlock('quote'); break;
        case 'todo': hiddenBlock('todo'); break;
      }
      break;
  }

  switch (el.target.value) {
    case 'github':
      document.querySelector('.images-tag').classList.add('hidden');
      break;
    case 'unsplash':
      document.querySelector('.images-tag').classList.remove('hidden');
      setBg();
      break;
    case 'flickr':
      document.querySelector('.images-tag').classList.remove('hidden');
      setBg();
      break;
  }
  if (tag.value) {
    setBg();
  }
})

function createTodoList() {
  const todoText = document.querySelector('.todo-text');
  const todoItems = document.querySelector('.todo-items');
  const li = document.createElement('li');
  if (todoText.value) {
    li.classList.add('todo-item');
    li.innerHTML = `<span class="item-text">${todoText.value}</span>` + '<span class="todo-remove"></span>'
    todoText.value = '';
    todoItems.append(li);
  }
  // li.textContent = todoText.value;
}

// document.querySelector('.todo-remove').addEventListener('click', () => {
//   // // const todoText = document.querySelector('.todo-text');
//   // const todoItem = document.querySelector('.todo-item');
//   // const li = document.removeChild();
//   console.dir(document.parentElement());
// })


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
