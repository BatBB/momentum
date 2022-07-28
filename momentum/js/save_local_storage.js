const name = document.querySelector('.name');

export function setLocalStorage() {
  localStorage.setItem('name', name.value);
  // localStorage.setItem('city', city.value);
}

export function getLocalStorage() {
  if (localStorage.getItem('name')) name.value = localStorage.getItem('name');
  // if (localStorage.getItem('city')) city.value = localStorage.getItem('city');
}
