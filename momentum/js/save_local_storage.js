import setBg from "./background.js";


const name = document.querySelector('.name');
const city = document.querySelector('.city');


export function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('timeSetting', document.getElementById('time').checked);
  localStorage.setItem('dateSetting', document.getElementById('date').checked);
  localStorage.setItem('greetingSetting', document.getElementById('greeting').checked);
  localStorage.setItem('quoteSetting', document.getElementById('quote').checked);
  localStorage.setItem('playerSetting', document.getElementById('player').checked);
  localStorage.setItem('weatherSetting', document.getElementById('weather').checked);
  localStorage.setItem('todoSetting', document.getElementById('todo').checked);
  localStorage.setItem('imagesSourceSetting', document.getElementById('imagesSource').value);
}

export function getLocalStorage() {
  if (localStorage.getItem('name')) name.value = localStorage.getItem('name');
  if (localStorage.getItem('city')) city.value = localStorage.getItem('city');

  if (localStorage.getItem('timeSetting') === null) document.getElementById('time').checked = true;
  if (localStorage.getItem('dateSetting') === null) document.getElementById('date').checked = true;
  if (localStorage.getItem('greetingSetting') === null) document.getElementById('greeting').checked = true;
  if (localStorage.getItem('quoteSetting') === null) document.getElementById('quote').checked = true;
  if (localStorage.getItem('playerSetting') === null) document.getElementById('player').checked = true;
  if (localStorage.getItem('weatherSetting') === null) document.getElementById('weather').checked = true;
  if (localStorage.getItem('todoSetting') === null) document.getElementById('todo').checked = true;
  
  document.querySelectorAll('.check-block').forEach(el => {
    if (el.checked = localStorage.getItem(el.id + 'Setting') === 'true') document.querySelector('.' + el.id).classList.remove('hidden');
    else document.querySelector('.' + el.id).classList.add('hidden');
  });

  if (localStorage.getItem('imagesSourceSetting') === null) document.getElementById('imagesSource').value = 'github';

  document.getElementById('imagesSource').value = localStorage.getItem('imagesSourceSetting');
  if (document.getElementById('imagesSource').value !== 'github') document.querySelector('.images-tag').classList.remove('hidden');
  setBg();

}
