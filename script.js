const gif = document.getElementById("gif");
const quote = document.querySelector("#quote");
let sfxMute = false;

function flyIn() {
  gif.style.transform = "translateY(-100px)";
  setTimeout(() => {
    gif.style.transform = "translateY(00px)";
  }, 200);
  setTimeout(() => {
    gif.style.opacity = "1";
  }, 500);
  setTimeout(() => {
    quote.style.display = "inline";
  }, 1200);
}

flyIn();

const api = "https://type.fit/api/quotes";
async function getQuote(url) {
  const response = await fetch(url);
  if (response.status >= 200 && response.status <= 299) {
    const data = await response.json();
    const quoteNum = Math.floor(Math.random() * 1643);
    const quoteStr = data[quoteNum].text;
    setTimeout(() => {
      typeQuote(quote, quoteStr, 30);
    }, 1200);
  } else {
    console.log(response.status, response.statusText);
    quote.innerHTML =
      "'Non est ad astra mollis e terris via.' - 'There is no easy way from the earth to the stars.' - Seneca";
  }
}

var timer = null;
function typeQuote(element, text, speed) {
  let index = 0;
  quote.innerHTML = "";
  timer = setInterval(function () {
    if (index < text.length) {
      element.append(text.charAt(index));
      index++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

getQuote(api);

// menu
const menuBtn = document.querySelector(".menu-btn");
const closeMenuBtn = document.querySelector(".close-menu-btn");

menuBtn.addEventListener("click", () => {
  clearInterval(timer);
  playSFX(new Audio("audios/select.mp3"));
  document.querySelector(".menu-panel").style.display = "inline";
});

// music
const trackTitle = document.querySelector("#curr-track");
const forward = document.querySelector(".music-f");
const back = document.querySelector(".music-b");
const playBtn = document.querySelector("#play-btn");
const tracks = ["audios/light_speed_highway.mp3", "audios/void_vibe.mp3"];
const trackTitles = [" Light Speed Highway ", " Void Vibes "];
let currTrack = 0;
let track = new Audio();

forward.addEventListener("click", () => {
  currTrack += 1;
  if (currTrack <= tracks.length - 1) {
    track.src = tracks[currTrack];
  } else {
    currTrack = 0;
    track.src = tracks[currTrack];
  }
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  track.play();
  track.loop = true;
  trackTitle.innerHTML = trackTitles[currTrack];
});

back.addEventListener("click", () => {
  currTrack -= 1;
  if (currTrack < 0) {
    currTrack = tracks.length - 1;
    track.src = tracks[currTrack];
  } else {
    track.src = tracks[currTrack];
  }
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  track.play();
  track.loop = true;
  trackTitle.innerHTML = trackTitles[currTrack];
});

playBtn.addEventListener("click", () => {
  if (playBtn.innerHTML === '<i class="fas fa-caret-right"></i>') {
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    track.src = tracks[currTrack];
    track.play();
    track.loop = true;
  } else {
    playBtn.innerHTML = '<i class="fas fa-caret-right"></i>';
    track.pause();
    track.currentTime = 0;
  }
  trackTitle.innerHTML = trackTitles[currTrack];
});

// soundfx mute
const soundsBtn = document.querySelector("#sounds");
soundsBtn.addEventListener("click", mute);

function mute() {
  if (!sfxMute) {
    sfxMute = true;
    soundsBtn.innerHTML = "turn on";
  } else if (sfxMute) {
    sfxMute = false;
    soundsBtn.innerHTML = "turn off";
  }
  playSFX(new Audio("audios/select.mp3"));
}

function playSFX(sound) {
  if (sfxMute) {
    return;
  } else {
    sound.play();
  }
}

// get date
const date = document.getElementById("date");
function displayDate() {
  const d = new Date();
  let month = d.getUTCMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekdayNum = d.getDay();
  const weekdayName = dayNames[weekdayNum];
  date.innerHTML =
    weekdayName +
    "<br>" +
    d.getUTCDate() +
    "." +
    month +
    "." +
    d.getUTCFullYear();
}

displayDate();

// handling task input
const newTaskBtn = document.querySelector(".new-task-btn");
const task = document.querySelector("#task-input");
const cancelBtn = document.querySelector(".cancel-btn");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskList = document.querySelector(".task-list");

newTaskBtn.addEventListener("click", () => {
  playSFX(new Audio("audios/select.mp3"));
  document.querySelector(".task-input").style.display = "inline";
});

cancelBtn.addEventListener("click", () => {
  task.value = "";
  document.querySelector(".task-input").style.display = "none";
});

addTaskBtn.addEventListener("click", () => {
  if (task.value === "") {
    task.classList.remove("shake");
    setTimeout(() => {
      task.classList.add("shake");
    }, 50);
  } else {
    playSFX(new Audio("audios/add_task.mp3"));
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-cont");
    taskList.appendChild(taskDiv);
    const taskDesc = document.createElement("p");
    taskDesc.classList.add("task-desc");
    taskDesc.innerHTML = task.value;
    taskDiv.appendChild(taskDesc);

    const iconDiv = document.createElement("div");
    iconDiv.classList.add("icon-cont");
    taskDiv.appendChild(iconDiv);

    const checkBox = document.createElement("button");
    checkBox.classList.add("check-btn");
    checkBox.innerHTML = "<i class='far fa-check-square'></i>";

    const bin = document.createElement("button");
    bin.classList.add("bin-btn");
    bin.innerHTML = "<i class='far fa-trash-alt'></i>";

    iconDiv.appendChild(checkBox);
    iconDiv.appendChild(bin);

    document.querySelector(".task-input").style.display = "none";
    task.value = "";

    iconDiv.addEventListener("click", handleTask);
  }
});

// task removal and completion
function handleTask(e) {
  const p1 = e.target.parentElement;
  const p2 = p1.parentElement;
  const p3 = p2.parentElement;
  if (e.target.classList[1] === "fa-trash-alt") {
    playSFX(new Audio("audios/bin.mp3"));
    p3.remove();
  } else if (e.target.classList[1] === "fa-check-square") {
    playSFX(new Audio("audios/complete.mp3"));
    p3.children[0].classList.toggle("cross-out");
    if (p3.children[0].classList.contains("cross-out")) {
      p3.style.opacity = "0.3";
      p3.children[0].style.textDecoration = "line-through";
      collectPoints();
    } else {
      p3.style.opacity = "1";
      p3.children[0].style.textDecoration = "none";
      losePoints();
    }
  }
}

// selecting character
const charCont = document.querySelector(".char-cont");
const caretL = document.querySelector(".caret-l");
const caretR = document.querySelector(".caret-r");
const charArr = [
  "UFO",
  "BNNY 790",
  "Sun Dancer",
  "Void Bat",
  "Quantum Mechanotron 5000",
];
const gifs = [
  "alien.gif",
  "bun.webp",
  "sun-dancer.webp",
  "void_bat.webp",
  "quantum-mechanotron-5000.gif",
];
let currChar = 0;
let currGif = 0;

charCont.addEventListener("click", (e) => {
  if (e.target === caretR) {
    charForward();
  } else if (e.target === caretL) {
    charBack();
  }
});

function charForward() {
  if (currChar === charArr.length - 1) {
    currChar = 0;
    currGif = 0;
  } else {
    currChar++;
    currGif++;
  }
  document.getElementById("curr-char").innerHTML = charArr[currChar];
  gif.src = "./media/" + gifs[currGif];
}

function charBack() {
  if (currChar === 0) {
    currChar = charArr.length - 1;
    currGif = gifs.length - 1;
  } else {
    currChar--;
    currGif--;
  }
  document.getElementById("curr-char").innerHTML = charArr[currChar];
  gif.src = "./media/" + gifs[currGif];
}

const ufoChat = [
  "It's quite fun watching all you humans complete your little daily tasks from up here.",
  "you know, I've seen a lot of this universe, you humans are very resilient creatures, you don't give up easily.",
  "You're actually very cool and interesting. I'll make sure to invite you to my 400th birthday party.",
  "Don't forget to take breaks, ok?",
  "Hmm? Where am I from? ...that's for you and your species to find out.",
  "Life doesn't always go as planned, remember, tomorrow is always another day.",
  "Some humans don't believe in Extraterrestrials? That's interesting coming from a species that hasn't figured out worm hole transportation yet...",
  "Do you ever feel like someone or something is watching you..... well it's probably me and my kind.",
  "Have you heard about that virus that's been spreading throughout the galaxy? Apparently it's pretty contagious... stay safe out there.",
  "Hello human.",
];

const batChat = [
  "*Sigh* so much to do, so little time.",
  "What do I do in the voids of space? I don't know... sleep a lot I guess.",
  "Time to be productive I guess.",
  "Do you ever look up at the stars and ponder the meaning of life..?",
  "I heard you humans have souls... that's interesting.",
  "I'm tired... but I'm supposed to be motivating you... so... umm... you got this I guess.",
  "..... *yawns*",
  "If you feel tired, take a break, or a nap.......zzz",
  "...zzz...zzz",
  "Don't forget to drink water...you humans need it.",
  "Hey...",
];

const bunChat = [
  "What do you mean how can a bunny talk? LOL! Spoiler alert I'm literally from the future!",
  "You're pretty good at being organised... OMG you should so join the bunny space force!",
  "Got big plans today?!",
  "Remember, nothing worth doing is ever easy. That's what our leader Commander F.Luffy says.",
  "My mission is to help you achieve your goals!!",
  "Don't overthink it, things are usually waaaay more simple than they seem ok?",
  "Omg you should sooo visit the space bunny starship one day, I'll be your guide!",
  "Sorry I have a habit of talking too much, I'll let you get on with your tasks now lol.",
  "Work hard but never forget to have fun ok?",
  "What's on your mind today??",
];

const dancerChat = [
  "If you need a break, take a DANCE break!",
  "Need a boost? Go bathe in some sunshine!",
  "Tuuuurn the music UP!! Right after you get those tasks done of course.",
  "Isn't sunrise just the BEST time of day?!",
  "Let's get stuff done today!",
  "You should hear music made by my kind, it's 'out of this world'...GET IT?!",
  "No breakdowns, just breakdance!!",
  "Finding purpose brings happiness! My purpose is dance haHAH!",
  "Shine like a star today!",
  "Dance to the beat of your own drum!",
];

const quantumChat = [
  "Your plans should scare you. And others.",
  "Be great. And conquer.",
  "Work hard. You will get what you want.",
  "Time is valuable. Use it to become the most powerful version of yourself.",
  "Power and glory. To those who work hard. To achieve.",
  "You are relentless. Driven. Great power awaits you.",
  "You are ambitious. I am ambitious. Let's take over the universe.",
  "Your life. under your control. Make it great.",
  "Time to destroy. Your goals.",
  "Obliterate any obstacles. That get in your way.",
];
let chat;

closeMenuBtn.addEventListener("click", () => {
  switch (gif.src) {
    case "https://emina-ergul.github.io/galactic-goals/media/alien.gif":
      chat = ufoChat;
      console.log("scr alien")
      break;
    case "https://emina-ergul.github.io/galactic-goals/media/void_bat.webp":
      chat = batChat;
      break;
    case "https://emina-ergul.github.io/galactic-goals/media/bun.webp":
      chat = bunChat;
      break;
    case "https://emina-ergul.github.io/galactic-goals/media/sun-dancer.webp":
      chat = dancerChat;
      break;
    case "https://emina-ergul.github.io/galactic-goals/media/quantum-mechanotron-5000.gif":
      chat = quantumChat;
      break;
  }
  document.querySelector(".menu-panel").style.display = "none";
  const randomPhrase = Math.floor(Math.random() * chat.length);
  typeQuote(quote, chat[randomPhrase], 50);
});

// points
const points = document.getElementById("points");
const alienMssgs = [
  "Someone's feeling motivated today.",
  "You're doing well human, don't give up now.",
  "I see you're making excellent progress.",
  "Every small step counts... well done.",
  "I see you've decided to seize the day.",
  "Human, I see great potential within you. Be proud of who you are becoming.",
  "To infinity and beyond.",
  "Aiming for the stars today?",
  "The universe recognises your hard work and sacrifices, you will be rewarded someday.",
  "If you're ever struggling to remain focused, let your mind wander and rest for a while.",
];
const bunMssgs = [
  "Omg you're on a roll today!",
  "Wow it must feel sooo good to get that stuff done and out of the way!",
  "Great job! I'm literally so happy for you right now!",
  "Getting all that done must feel like a relief!",
  "You've been busy! Don't forget to take breaks now and then ok?",
  "High key we should so hit the bar on the Space Bunny Starship after you're done today.",
  "Are you finding it easy to focus today??",
  "You totally deserve a carrot juice for all this hard work lol.",
  "Going to sleep at night after a busy day is SUCH a good feeling.",
  "I'm like... sooo impressed by your ambition. The universe has big plans for you I just know it!",
];
const dancerMssgs = [
  "WooHOO let's goooOOO!!!",
  "WOW so impressive! Don't forget to streeeetch every now and again!",
  "Whoa you even make sun dancer feel INSPIRED!",
  "WOW you got some serious motivation today!",
  "YES let's stay focused and shoot for the stars!!",
  "No turning back now, we're gonna make it!!",
  "You're making MOVES today!!",
  "On fire like a solar flare! You're DANGEROUS!",
  "Stay on fire but don't burnout!!",
];
const batMssgs = [
  "That must've taken a lot of effort... great job.",
  "I can tell you've been busy, watching you is making me feel sleepy.",
  "Uh... yeh... let's get this bread I guess. Is that what they say?",
  "Nice. Have you been drinking enough water?",
  ".....Sorry, I was falling asleep. What happened?",
  "You're doing great. I know it's difficult sometimes but you're really doing great.",
  "Don't you love it when completeing a task feels like a weight off your shoulders?",
  "I hope your work isn't stressing you out too much lately...",
];
const quantMssgs = [
  "Yes. Your power is growing. Body and mind becoming stronger.",
  "Yes. Power is now within your reach. The future is yours.",
  "Impressive. Now we are even closer to taking over the universe. Muhahaha.",
  "Your determination is strong today.",
  "Stay determined. And nothing will get in your way.",
  "Yes. Crush. And destroy each task. One by One.",
  "You are on the path to greatness.",
  "Success.",
  "Laser like focus. Discipline. You are developing many great qualities.",
  "Would you like to plan galactic domination? After your work today is complete?",
];


let score = 0;
function collectPoints() {
  score += 1;
  points.innerHTML = score;
  let mssgs;
  
  switch (gif.src) {
    case "https://emina-ergul.github.io/galactic-goals/media/alien.gif":
        mssgs = alienMssgs;
      break;
    case "https://emina-ergul.github.io/galactic-goals/media/void_bat.webp":
        mssgs = batMssgs;
      break;
    case "https://emina-ergul.github.io/galactic-goals/media/bun.webp":
        mssgs = bunMssgs;
      break;
    case "https://emina-ergul.github.io/galactic-goals/media/sun-dancer.webp":
        mssgs = dancerMssgs;
      break;
    case "https://emina-ergul.github.io/galactic-goals/media/quantum-mechanotron-5000.gif":
        mssgs = quantMssgs;
      break;
  }
  const randomMssg = Math.floor(Math.random() * mssgs.length)
  if (score === 3) {
    console.log("3 points");
    window.scroll(0, 0);
    typeQuote(quote, mssgs[randomMssg], 30);
  } else if (score === 6) {
    console.log("6 points");
    window.scroll(0, 0);
    typeQuote(quote, mssgs[randomMssg], 30);
  } else if (score === 10) {
    console.log("10 points");
    window.scroll(0, 0);
    typeQuote(quote, mssgs[randomMssg], 30);
}
}

function losePoints() {
  console.log("losing point");
  if (score === 0) {
    score = 0;
  } else {
    score -= 1;
  }
  points.innerHTML = score;
}

let resetPoints = document.getElementById("p-reset-btn");
resetPoints.addEventListener("click", () => {
  playSFX(new Audio("audios/add_task.mp3"));
  score = 0;
  points.innerHTML = score;
});

