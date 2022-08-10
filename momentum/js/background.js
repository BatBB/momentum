import { getTimeOfDay } from "../js/time.js";

const getRandomNum = (length) => Math.floor(Math.random() * length) + 1;
let imageNum = getRandomNum(20);



export default async function setBg() {
  const body = document.body;
  // const bgNum = randomNum.toString().padStart(2, '0');
  const img = new Image();
  const imagesApi = imagesSource.value;
  const query = 'space';


  const source = {
    'github': `https://raw.githubusercontent.com/BatBB/stage1-tasks/assets/images/`,
    'unsplash': `https://api.unsplash.com/photos/random?orientation=landscape&query=${query}&client_id=Y4jwptCA5peGCYzKv764aFLn_T7LifPsqqcKi3NUNqk`,
    'flickr': `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5efd3472330c40a1cf342938bd548e9d&tags=${query}&extras=url_l&format=json&nojsoncallback=1`
  };

  const url = source[imagesApi];

  if (imagesApi === 'github') {
    console.log(imageNum);
    img.src = `${url}${getTimeOfDay()}/${imageNum.toString().padStart(2, '0')}.webp`
  }
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

// const res = await fetch(url);
// const data = await res.json(); 
// img.src = data.photos.photo[5].url_l;

// const imagesApi = imagesSource;
// console.dir(imagesApi.options.selectedIndex);

// const url = source.unsplash;
// const res = await fetch(url);
// const data = await res.json(); 
// console.dir(data.urls.regular);
// img.src = data.urls.regular;