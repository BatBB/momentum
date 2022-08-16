/* -------------- imports -------------- */
import settings from "./settings.js";
import { showTime, getTimeOfDay } from "../js/time.js";
import { setLocalStorage, getLocalStorage } from "../js/save_local_storage.js";
import setBg from "../js/background.js";
import getWeather from "../js/weather.js";
import getQuotes from "../js/quotes.js";
import { createPlayList, setPlayPause, playNext, playPrev, upgradeProgressPlay, clickVolume, changeVolume, playListClick } from "../js/player.js"
import translate from "./translate.js";

/* -------------- Variables -------------- */
const city = document.querySelector('.city'),
  play = document.querySelector('.play'),
  playNextBtn = document.querySelector('.play-next'),
  playPrevBtn = document.querySelector('.play-prev');

if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'en');
const lang = localStorage.getItem('lang');

const consoleText = `Score: 160 out of 160 
1. Часы и календарь +15
2. Приветствие +10
3. Смена фонового изображения +20
4. Виджет погоды +15
5. Виджет цитата дня +10
6. Аудиоплеер +15
7. Продвинутый аудиоплеер +20
8. Перевод приложения на два языка (en/ru) +15
9. Получение фонового изображения от API +10 
10. Настройки приложения +20
11. Дополнительный функционал на выбор: ToDo List +10')`;

console.log(consoleText);

settings();

showTime();
getLocalStorage();

setBg();

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

const input = document.querySelector('.name');
input.addEventListener('input', resizeInput);
resizeInput.call(input);

function resizeInput() {
  this.style.width = this.value.length === 0 ? '360px' : ((this.value.length + 0.5) + 'ex');
}

city.value = localStorage.getItem('city') || translate.minsk[lang];
localStorage.setItem('city', city.value)
getWeather()

getQuotes();
// changeQuote.addEventListener('click', getQuotes)


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
    case 'change-quote':
      getQuotes();
      break;
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
      localStorage.setItem('city', city.value)
      getWeather();
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
    case 'en':
      localStorage.setItem('lang', 'en');
      settings('en');
      break;
    case 'ru':
      localStorage.setItem('lang', 'ru');
      settings('ru');
      break;
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
}


