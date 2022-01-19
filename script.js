const gif = document.getElementById("gif")
const quote = document.querySelector("#quote")

function flyIn() {
    gif.style.transform = "translateY(-100px)"
    setTimeout(() => {
        gif.style.transform = "translateY(00px)"
    }, 200);
    setTimeout(() => {
        gif.style.opacity = "1"
    }, 500);
    setTimeout(() => {
        quote.style.display = "inline"
    }, 1200);
}

flyIn()

const api ="https://type.fit/api/quotes";


async function getQuote(url) {
    const response = await fetch(url);
    if(response.status >= 200 && response.status <= 299) {
        const data = await response.json();
        const quoteNum = Math.floor(Math.random() * 1643)
        const quoteStr = data[quoteNum].text
        setTimeout(() => {
            typeQuote(quote, quoteStr, 30)
        }, 1200);
    } else {
        console.log(response.status, response.statusText);
        quote.innerHTML = "'Non est ad astra mollis e terris via.' - 'There is no easy way from the earth to the stars.' - Seneca"
    }
}

var timer = null
function typeQuote(element, text, speed) {
    let index = 0
    quote.innerHTML = ""
    timer = setInterval(function() {
        if(index < text.length) {
            element.append(text.charAt(index))
            index++
        } else {
            clearInterval(timer)
        }
    },speed)
}

getQuote(api);

// menu
const menuBtn = document.querySelector(".menu-btn")
const closeMenuBtn = document.querySelector(".close-menu-btn")

menuBtn.addEventListener("click", () => {
    clearInterval(timer)
    new Audio("audios/select.mp3").play();
    document.querySelector(".menu-panel").style.display = "inline"
})

const ufoChat = ["It's quite fun watching all you humans complete your little daily tasks from up here.", "you know, I've seen a lot of this universe, you humans are very resilient creatures, you don't give up easily.", "You're actually pretty cool... wanna come to my 400th birthday party?", "Don't forget to take breaks, ok?", "Hmm? Where am I from? ...that's for you and your species to find out.", "Life doesn't always go as planned, remember, tomorrow is always another day", "Some humans don't believe in Extraterrestrials? That's interesting coming from a species that hasn't figured out worm hole transportation yet...", "Do you ever feel like someone or something is watching you..... well it's probably me and my kind.", "Have you heard about that virus that's been spreading throughout the galaxy? Apparently it's pretty contagious... stay safe out there."]

const batChat = ["*Sigh* so much to do, so little time.", "What do I do in the voids of space? I don't know... sleep a lot I guess.","Time to be productive I guess.","Do you ever look up at the stars and ponder the meaning of life..?", "I heard you humans have souls... that's interesting.", "I'm tired... but I'm supposed to be motivating you... so... umm... you got this I guess.", "..... *yawns*", "If you feel tired, take a break, or a nap.......zzz", "...zzz...zzz", "Don't forget to drink water...you humans need it."]

const bunChat = ["What do you mean how can a bunny talk? LOL! Spoiler alert I'm literally from the future!", "You're pretty good at being organised... OMG you should so join the bunny space force!", "Got big plans today?!", "Remember, nothing worth doing is ever easy. That's what our leader Commander F.Luffy says.", "My mission is to help you achieve your goals!!", "Don't overthink it, things are usually waaaay more simple than they seem ok?", "Omg you should sooo visit the space bunny starship one day, I'll be your guide!", "Sorry I have a habit of talking too much, I'll let you get on with your tasks now lol.", "Work hard but never forget to have fun ok?", "I'm like... sooo impressed by your ambition. The universe has big plans for you I just know it!"]

const dancerChat = ["If you need a break, take a DANCE break!", "Need a boost? Go bathe in some sunshine!", "Tuuuurn the music UP!! Right after you get those tasks done of course.", "Isn't sunrise just the BEST time of day?!", "Let's get stuff done today!", "You should hear music made by my kind, it's 'out of this world'...GET IT?!", "No breakdowns, just breakdance!!", "Finding purpose brings happiness! My purpose is dance haHAH!", "Shine like a star today!", "Dance to the beat of your own drum!"]

const quantumChat = ["Your plans should scare you. And others.", "Be great. And conquer", "Work hard. You will get what you want.", "Time is valuable. Use it to become powerful.", "Power and glory. To those who work hard. To achieve.", "You are relentless. Driven. Great power awaits you.", "You are ambitious. I am ambitious. Let's take over the universe.", "Your life. under your control. Make it great.", "Time to destroy. Your goals.", "Obliterate any obstacles. That get in your way." ]

closeMenuBtn.addEventListener("click", () => {
    let chat
    switch (gif.src) {
        case "media/alien.gif":
            chat = ufoChat
            break;
        case "media/void_bat.webp":
            chat = batChat
            break;
        case "media/bun.webp":
            chat = bunChat
            break;
        case "media/sun-dancer.webp":
            chat = dancerChat
            break;
        case "media/quantum-mechanotron-5000.webp":
            chat = quantumChat
            break;
    }
    document.querySelector(".menu-panel").style.display = "none"
    const randomPhrase = Math.floor(Math.random()* chat.length)
    typeQuote(quote, chat[randomPhrase], 50)
})

// music
const trackTitle = document.querySelector("#curr-track")
const forward = document.querySelector(".music-f")
const back = document.querySelector(".music-b")
const playBtn = document.querySelector("#play-btn")
const tracks = ["audios/light_speed_highway.mp3", "audios/void_vibe.mp3"]
const trackTitles = [" Light Speed Highway ", " Void Vibes "]
let currTrack = 0
let track = new Audio

forward.addEventListener("click", () => {
    currTrack+=1
    if(currTrack <= tracks.length -1) {
        track.src = tracks[currTrack]
    } else {
        currTrack = 0
        track.src = tracks[currTrack]
    }
    playBtn.innerHTML = '<i class="fas fa-pause"></i>'
    track.play()
    track.loop = true
    trackTitle.innerHTML = trackTitles[currTrack]
})

back.addEventListener("click", () => {
    currTrack-=1
    console.log(currTrack)
    if(currTrack < 0) {
        currTrack = tracks.length -1
        track.src = tracks[currTrack]
    } else {
        track.src = tracks[currTrack]
        
    }
    playBtn.innerHTML = '<i class="fas fa-pause"></i>'
    track.play()
    track.loop = true
    trackTitle.innerHTML = trackTitles[currTrack]
})

playBtn.addEventListener("click", () => {
    if(playBtn.innerHTML === '<i class="fas fa-caret-right"></i>') {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>'
        track.src = tracks[currTrack]
        track.play()
        track.loop = true
    } else {
        playBtn.innerHTML = '<i class="fas fa-caret-right"></i>'
        track.pause()
        track.currentTime = 0
    }
    trackTitle.innerHTML = trackTitles[currTrack]
})

// get date
const date = document.getElementById("date")
function displayDate() {
    const d = new Date()
    let month = d.getUTCMonth() +1
    if(month < 10) {
        month = "0" + month
    }
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const weekdayNum = d.getDay()
    const weekdayName = dayNames[weekdayNum]
    date.innerHTML = weekdayName + "<br>" + d.getUTCDate() + "." + month + "." + d.getUTCFullYear()
}

displayDate()

// handling task input
const newTaskBtn = document.querySelector(".new-task-btn")
const task = document.querySelector("#task-input")
const cancelBtn = document.querySelector(".cancel-btn")
const addTaskBtn = document.querySelector(".add-task-btn")
const taskList = document.querySelector(".task-list")

newTaskBtn.addEventListener("click", () => {
    new Audio("audios/select.mp3").play();
    document.querySelector(".task-input").style.display = "inline"
})

cancelBtn.addEventListener("click", () => {
    task.value = ""
    document.querySelector(".task-input").style.display = "none"
})

addTaskBtn.addEventListener("click", () => {
    if(task.value === "") {
        task.classList.remove("shake")
        setTimeout(() => {
            task.classList.add("shake")
        }, 50)
    } else {
        new Audio("audios/add_task.mp3").play();
    const taskDiv = document.createElement("div")
    taskDiv.classList.add("task-cont")
    taskList.appendChild(taskDiv)
    const taskDesc = document.createElement("p")
    taskDesc.classList.add("task-desc")
    taskDesc.innerHTML = task.value
    taskDiv.appendChild(taskDesc)

    const iconDiv = document.createElement("div")
    iconDiv.classList.add("icon-cont")
    taskDiv.appendChild(iconDiv)

    const checkBox = document.createElement("button")
    checkBox.classList.add("check-btn")
    checkBox.innerHTML = "<i class='far fa-check-square'></i>"

    const bin = document.createElement("button")
    bin.classList.add("bin-btn")
    bin.innerHTML = "<i class='far fa-trash-alt'></i>"

    iconDiv.appendChild(checkBox)
    iconDiv.appendChild(bin)

    document.querySelector(".task-input").style.display = "none"
    task.value = ""

    iconDiv.addEventListener("click", handleTask)
    }
})

// task removal and completion
function handleTask(e) {
    const p1 = e.target.parentElement
    const p2 = p1.parentElement
    const p3 = p2.parentElement
    if(e.target.classList[1] === "fa-trash-alt") {
        new Audio("audios/bin.mp3").play();
        p3.remove()
    } else if (e.target.classList[1] === "fa-check-square") {
        new Audio("audios/complete.mp3").play();
        p3.children[0].classList.toggle("cross-out")
        if(p3.children[0].classList.contains("cross-out")) {
            p3.style.opacity = "0.3"
            p3.children[0].style.textDecoration = "line-through"
            collectPoints()
        } else {
            p3.style.opacity = "1"
            p3.children[0].style.textDecoration = "none"
            losePoints()
        }
        
    } 
}

// points
const points = document.getElementById("points")
const mssgs3 = "You've completed 3 tasks! Thats great!"
const mssgs6 = "Wow 6 tasks complete... you're on a roll!"
let score = 0
function collectPoints() {
    score += 1
    points.innerHTML = score
    if(score === 3) {
        console.log("3 points")
        window.scroll(0,0)
        typeQuote(quote, mssgs3, 30)
    } else if (score === 6) {
        console.log("6 points")
        window.scroll(0,0)
        typeQuote(quote, mssgs6, 30)
    }
}

function losePoints() {
    console.log("losing point")
    if(score === 0) {
        score = 0
    } else {
        score -= 1
    }
    points.innerHTML = score
}

let resetPoints = document.getElementById("p-reset-btn")
resetPoints.addEventListener("click", () => {
    score = 0
    points.innerHTML = score
})

// selecting character
const charCont = document.querySelector(".char-cont")
const caretL = document.querySelector(".caret-l")
const caretR = document.querySelector(".caret-r")
const charArr = ["UFO", "BNNY 790", "Sun Dancer", "Void Bat", "Quantum Mechanotron 5000"]
const gifs = ["alien.gif", "bun.webp", "sun-dancer.webp", "void_bat.webp", "quantum-mechanotron-5000.gif"]
let currChar = 0
let currGif = 0

charCont.addEventListener("click", (e) => {
    if(e.target === caretR) {
        console.log("right")
        charForward()
    } else if(e.target === caretL) {
        console.log("left")
        charBack()
    }
})

function charForward() {
    if(currChar === charArr.length -1) {
        currChar = 0
        currGif = 0
    } else {
        currChar++
        currGif++
    }
    document.getElementById("curr-char").innerHTML = charArr[currChar]
    gif.src = "media/" + gifs[currGif]
}

function charBack() {
    if(currChar === 0) {
        currChar = charArr.length -1
        currGif = gifs.length -1
    } else {
        currChar--
        currGif--
    }
    document.getElementById("curr-char").innerHTML = charArr[currChar]
    gif.src = "media/" + gifs[currGif]
}