const api ="https://type.fit/api/quotes";
const quote = document.querySelector("#quote")

async function getQuote(url) {
    const response = await fetch(url);
    if(response.status >= 200 && response.status <= 299) {
        const data = await response.json();
        const quoteNum = Math.floor(Math.random() * 1643)
        const quoteStr = data[quoteNum].text
        typeQuote(quote, quoteStr, 40)
    } else {
        console.log(response.status, response.statusText);
        quote.innerHTML = "To infinity and beyond"
    }
}

function typeQuote(element, text, speed) {
    let index = 0
    quote.innerHTML = ""
    let timer = setInterval(function() {
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
    new Audio("audios/select.mp3").play();
    document.querySelector(".menu-panel").style.display = "inline"
})

closeMenuBtn.addEventListener("click", () => {
    document.querySelector(".menu-panel").style.display = "none"
})

// music
const playBtn = document.querySelector("#play-music-btn")
const trackTitle = document.querySelector("#curr-song")
const track1 = new Audio("audios/light_speed_highway.mp3")
// const trackList = []
let currTrack = 0

playBtn.addEventListener("click", () => {
    if(currTrack === 0) {
        track1.play()
        track1.loop = true
        trackTitle.innerHTML = "track 1 - light speed highway"
        playBtn.innerHTML = "<i class='fas fa-pause'></i>"
        currTrack = 1
    } else if (currTrack === 1) {
        track1.pause()
        trackTitle. innerHTML = "none"
        playBtn.innerHTML = "<i class='fas fa-play'></i>"
        currTrack = 0
    }
})

// themes
// const deepSpaceBtn = document.querySelector(".deep-space")
// const newEarthBtn = document.querySelector(".new-earth")
// const themePanel = document.querySelector(".themes-panel")
// let deepSpace = true

// themePanel.addEventListener("click", (e) => {
//     const bgs = document.getElementsByClassName("bg")
//     const t = document.querySelector(".banner")
//     const tx = document.body.getElementsByTagName("p")
    
//     if(e.target.classList[0] === "new-earth") {
//         document.querySelector(".alien-quotes").style.backgroundImage = "none"
//         t.style.color = "#000"
//         for(var o = 0; o < tx.length; o++) {
//             tx[o].style.color = "#000"
//         }
//         for(var i = 0; i < bgs.length; i++) {
//             bgs[i].style.backgroundColor = "#B0E4F0"
//         }
//     } else if (e.target.classList[0]==="deep-space") {
//         t.style.color = "#fff"
//         for(var o = 0; o < tx.length; o++) {
//             tx[o].style.color = "#fff"
//         }
//         for(var i = 0; i < bgs.length; i++) {
//             bgs[i].style.backgroundColor = "#000"
//             document.querySelector(".alien-quotes").style.backgroundImage = "url('stars.png')"
//     }
// }})

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
const mssg3 = "You've completed 3 tasks! Check out the menu to see the new character you just unlocked."
const mssg10 = "Wow 10 tasks complete... you jst unlocked another character!"
let score = 0
function collectPoints() {
    score += 1
    points.innerHTML = score
    if(score === 3) {
        console.log("3 points")
        typeQuote(quote, mssg3, 30)
        document.querySelector(".char-panel").style.display = "flex"
    } else if (score === 10) {
        console.log("10points")
        typeQuote(quote, mssg10, 30)
        gifs.push("sun-dancer.webp")
        charArr.push("sun dancer")
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
const charArr = ["UFO", "star banshee"]
const gifs = ["alien.gif", "star-banshee.webp"]
const gif = document.getElementById("gif")
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
        console.log(gifs.length)
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