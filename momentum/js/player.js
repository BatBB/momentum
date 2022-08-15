import playList from "../js/playList.js"

const play = document.querySelector('.play');

const audio = new Audio();

let playNum = 0,
  pauseTime = 0;

export function createPlayList() {
  const playListContainer = document.querySelector('.play-list')
  playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    playListContainer.append(li);
  })
}


let isPlay = false;

export function playAudio() {
  const playItem = document.querySelectorAll('.play-item'),
    trackTitle = document.querySelector('.track-title'),
    duration = document.querySelector('.duration');

  audio.src = playList[playNum].src;
  audio.currentTime = pauseTime;
  let temp = playList[playNum].title;
  trackTitle.textContent = temp;
  duration.textContent = playList[playNum].duration;
  audio.play();
  isPlay = true;
  play.classList.add('pause');
  playItem[playNum].classList.add('item-active');

  upgradeProgressPlay();
}


export function upgradeProgressPlay(remoteTime) {
  const progressBar = document.querySelector('.progress-bar');
  const current = document.querySelector('.current');

  if (audio.duration) progressBar.max = Math.floor(audio.duration);

  if (remoteTime) audio.currentTime = remoteTime;
  current.textContent = `${Math.floor(audio.currentTime / 60).toString().padStart(2, '0')}:${Math.floor(audio.currentTime % 60).toString().padStart(2, '0')}`;
  progressBar.value = audio.currentTime;

}
setInterval(upgradeProgressPlay, 500)


export function playNext() {
  const playItem = document.querySelectorAll('.play-item');
  playItem[playNum].classList.remove('item-active');
  playNum = playNum === playList.length - 1 ? 0 : playNum + 1;
  pauseTime = 0;
  playAudio();
}

export function playPrev() {
  const playItem = document.querySelectorAll('.play-item');
  playItem[playNum].classList.remove('item-active');
  playNum = playNum === 0 ? playList.length - 1 : playNum - 1;
  pauseTime = 0;
  playAudio();
}


export function setPlayPause() {
  const playItem = document.querySelectorAll('.play-item');
  if (!isPlay) {
    playAudio();
  }
  else {
    audio.pause();
    pauseTime = audio.currentTime;
    isPlay = false;
    play.classList.remove('pause');
    playItem[playNum].classList.remove('item-active');
  }
}


export function playListClick(index) {
  const playItem = document.querySelectorAll('.play-item');
  playItem.forEach(el => {
    el.classList.remove('item-active');
  })
  if (!isPlay || index !== playNum) {
    playNum = index;
    pauseTime = 0;
    playAudio();
  }
  else {
    audio.pause();
    pauseTime = audio.currentTime;
    isPlay = false;
    play.classList.remove('pause');
  }
}

let lastVolume = 0.5;

export function clickVolume() {
  const volume = document.querySelector('.volume');
  const volumeRange = document.querySelector('.volume-range');

  if (document.querySelector('.mute')) {
    audio.volume = lastVolume;
    volume.classList.remove('mute');
    volumeRange.value = lastVolume;
  }
  else {
    lastVolume = audio.volume;
    audio.volume = 0;
    volumeRange.value = 0;
    volume.classList.add('mute');
  }
}

export function changeVolume(valueVolume) {
  audio.volume = valueVolume;
  const volume = document.querySelector('.volume');
  if (valueVolume > 0.5) {
    volume.classList.add('volume-2');
    volume.classList.remove('mute');
  }
  else if (valueVolume > 0) {
    volume.classList.remove('volume-2');
    volume.classList.remove('mute');
  }
  else volume.classList.add('mute')
}

audio.addEventListener('ended', playNext);

