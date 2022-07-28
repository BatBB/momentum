const body = document.body;

export default function setBg(day, randomNum) {
  const bgNum = randomNum.toString().padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${day}/${bgNum}.jpg`;
  img.onload = () => {      
    body.style.backgroundImage = `url(${img.src})`;
  }; 
}
