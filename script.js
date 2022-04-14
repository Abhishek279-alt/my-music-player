// Navbar Tabs Change
document.getElementById("songTab").addEventListener("click", () => {
  document.getElementById("artistSongs").style.display = "none";
  document.getElementById("allSongs").style.display = "block";
});
document.getElementById("artistTab").addEventListener("click", () => {
  document.getElementById("allSongs").style.display = "none";
  document.getElementById("artistSongs").style.display = "block";
});

// Songs Array

let songIndex = 0;
songIndex = parseInt(songIndex);
let coverImage = document.getElementById("coverImage");
let trackName = document.getElementById("trackName");
let trackArtist = document.getElementById("trackArtist");
let playGif = document.getElementById("playGif");
let gif = document.getElementById("gifs");
gif.src = "./gifs/1.gif";
coverImage.src = "./images/cover.jpg";

let slider = document.getElementById("slider");

let gifImages = [
  { gifPath: "./gifs/1.gif" },
  { gifPath: "./gifs/2.gif" },
  { gifPath: "./gifs/3.gif" },
  { gifPath: "./gifs/4.gif" },
];

let songs = [
  {
    id: 0,
    trackName: "Bulla Ki Jaana",
    artistName: "Rabbi Shergill",
    filePath: "./Songs/1.mp3",
    coverPath: "./cover/1.jpg",
    trackLength: "05:09",
  },
  {
    id: 1,
    trackName: "Smooth Criminal",
    artistName: "Michael Jackson",
    filePath: "./Songs/2.mp3",
    coverPath: "./cover/2.jpg",
    trackLength: "04:17",
  },
  {
    id: 2,
    trackName: "Tanha Dil",
    artistName: "Shaan",
    filePath: "./Songs/3.mp3",
    coverPath: "./cover/3.jpg",
    trackLength: "04:52",
  },
  {
    id: 3,
    trackName: "Gorillaz",
    artistName: "Stylo",
    filePath: "./Songs/4.mp3",
    coverPath: "./cover/4.jpg",
    trackLength: "05:02",
  },
  {
    id: 4,
    trackName: "La Isla Bonita",
    artistName: "Madonna",
    filePath: "./Songs/5.mp3",
    coverPath: "./cover/5.jpg",
    trackLength: "03:47",
  },
  {
    id: 5,
    trackName: "Bailamos",
    artistName: "Enrique Iglesias",
    filePath: "./Songs/6.mp3",
    coverPath: "./cover/6.jpg",
    trackLength: "03:34",
  },
  {
    id: 6,
    trackName: "O Sanam",
    artistName: "Lucky Ali",
    filePath: "./Songs/7.mp3",
    coverPath: "./cover/7.jpg",
    trackLength: "03:43",
  },
  {
    id: 7,
    trackName: "Ek Pal Ka Jeena",
    artistName: "Lucky Ali",
    filePath: "./Songs/8.mp3",
    coverPath: "./cover/7.jpg",
    trackLength: "06:37",
  },
  {
    id: 8,
    trackName: "Hairat",
    artistName: "Lucky Ali",
    filePath: "./Songs/9.mp3",
    coverPath: "./cover/7.jpg",
    trackLength: "04:09",
  },
  {
    id: 9,
    trackName: "Bijuria",
    artistName: "Sonu Nigam",
    filePath: "./Songs/10.mp3",
    coverPath: "./cover/8.jpg",
    trackLength: "04:45",
  },
  {
    id: 10,
    trackName: "Mohabbat Kabhi Maine",
    artistName: "Sonu Nigam",
    filePath: "./Songs/11.mp3",
    coverPath: "./cover/8.jpg",
    trackLength: "05:30",
  },
  {
    id: 11,
    trackName: "Tu",
    artistName: "Sonu Nigam",
    filePath: "./Songs/12.mp3",
    coverPath: "./cover/8.jpg",
    trackLength: "04:26",
  },
];

let audioTrack = new Audio();

// Song Info
let songItems = Array.from(document.getElementsByClassName("songItem"));
// console.log(songItems);
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songListName")[0].innerText =
    songs[i].trackName;
  element.getElementsByClassName("songListArtist")[0].innerText =
    songs[i].artistName;
});

// Media Player Buttons JS

let buttonPlay = document.getElementById("play-pause");
buttonPlay.addEventListener("click", () => {
  if (audioTrack.paused || audioTrack.currentTime <= 0) {
    audioTrack.play();
    buttonPlay.classList.remove("fa-circle-play");
    buttonPlay.classList.add("fa-circle-pause");
    playGif.style.opacity = 1;
    document.body.style.backgroundImage = `url(${gifImages[index].gifPath})`;
  } else {
    audioTrack.pause();
    buttonPlay.classList.remove("fa-circle-pause");
    buttonPlay.classList.add("fa-circle-play");
    playGif.style.opacity = 0;
    document.body.style.backgroundImage = "none";
  }
});

// Songs list click

songItems.forEach((element, i) => {
  element.addEventListener("click", (e) => {
    // console.log(e.target);
    audioTrack.src = songs[i].filePath;
    audioTrack.currentTime = 0;
    audioTrack.play();

    trackName.innerText = songs[i].trackName;
    trackArtist.innerText = songs[i].artistName;
    coverImage.src = songs[i].coverPath;

    document.getElementById("end").innerText = songs[i].trackLength;

    buttonPlay.classList.remove("fa-circle-play");
    buttonPlay.classList.add("fa-circle-pause");

    playGif.style.opacity = 1;
    songIndex = songs[i].id;
  });
});

// gif click

gif.addEventListener("click", () => {
  if (playGif.style.opacity == 1) {
    let index = Math.floor(Math.random() * 4);
    gif.src = gifImages[index].gifPath;
    document.body.style.backgroundImage = `url(${gifImages[index].gifPath})`;
  }
});

// Song track time update

audioTrack.addEventListener("timeupdate", () => {
  // console.log("time updated");
  progress = parseInt((audioTrack.currentTime / audioTrack.duration) * 100);
  slider.value = progress;
  // console.log(progress);
  if (progress == 100) {
    audioTrack.pause();
    buttonPlay.classList.remove("fa-circle-pause");
    buttonPlay.classList.add("fa-circle-play");
    playGif.style.opacity = 0;
  }
});

slider.addEventListener("change", () => {
  audioTrack.currentTime = (audioTrack.duration * slider.value) / 100;
});

audioTrack.addEventListener("timeupdate", () => {
  trackSeconds = parseInt(audioTrack.currentTime);
  trackMinutes = 0;
  count = 1;
  multi = 60 * count;
  while (trackSeconds >= multi) {
    trackSeconds = trackSeconds - multi;
    trackMinutes = trackMinutes + 1;
    count += 1;
  }
  function leftFillNum(num, targetLength) {
    // format the number upto two digit length(Stackoverflow code)
    return num.toString().padStart(targetLength, "0");
  }
  trackSeconds = leftFillNum(trackSeconds, 2);
  trackMinutes = leftFillNum(trackMinutes, 2);
  let startTime = trackMinutes + ":" + trackSeconds;
  // console.log(startTime);
  document.getElementById("start").innerText = startTime;
});

// Step-Backward Button Click

document.getElementById("backward").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioTrack.src = `./Songs/${songIndex + 1}.mp3`;
  trackName.innerText = songs[songIndex].trackName;
  trackArtist.innerText = songs[songIndex].artistName;
  coverImage.src = songs[songIndex].coverPath;
  audioTrack.currentTime = 0;
  document.getElementById("end").innerText = songs[songIndex].trackLength;
  audioTrack.play();
  buttonPlay.classList.remove("fa-circle-play");
  buttonPlay.classList.add("fa-circle-pause");
});

// Step-Forward Button Click

document.getElementById("forward").addEventListener("click", () => {
  if (songIndex >= 11) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  audioTrack.src = `./Songs/${songIndex + 1}.mp3`;
  trackName.innerText = songs[songIndex].trackName;
  trackArtist.innerText = songs[songIndex].artistName;
  coverImage.src = songs[songIndex].coverPath;
  audioTrack.currentTime = 0;
  document.getElementById("end").innerText = songs[songIndex].trackLength;
  audioTrack.play();
  buttonPlay.classList.remove("fa-circle-play");
  buttonPlay.classList.add("fa-circle-pause");
});
