/* -------------- imports -------------- */
import { showTime, getTimeOfDay} from "../js/time.js";
import { setLocalStorage, getLocalStorage } from "../js/save_local_storage.js";
import setBg from "../js/background.js"


/* -------------- Variables -------------- */
const slideNext = document.querySelector('.slide-next'),
      slidePrev = document.querySelector('.slide-prev');


showTime();
getLocalStorage();

const getRandomNum = () => Math.floor(Math.random() * 20) + 1;
let randomNum = getRandomNum();

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
