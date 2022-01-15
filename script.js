const api ="https://type.fit/api/quotes";

async function getQuote(url) {
    const response = await fetch(url);
    const data = await response.json();
    const quoteNum = Math.floor(Math.random() * (1643 - 0) + 0)
    const quote = document.querySelector("#quote")
    const quoteStr = data[quoteNum].text
    typeQuote(quote, quoteStr, 70)
}

function typeQuote(element, text, speed) {
    let index = 0
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

// function displayQuote(data) {
//     let quoteNum = Math.floor(Math.random() * (1643 - 0) + 0)
//     document.querySelector("#quote").innerHTML = data[quoteNum].text
// }

// menu
const menuBtn = document.querySelector(".menu-btn")
const closeMenuBtn = document.querySelector(".close-menu-btn")

menuBtn.addEventListener("click", () => {
    document.querySelector(".menu-panel").style.display = "inline"
})

closeMenuBtn.addEventListener("click", () => {
    document.querySelector(".menu-panel").style.display = "none"
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


// handling task input
const newTaskBtn = document.querySelector(".new-task-btn")
const task = document.querySelector("#task-input")
const cancelBtn = document.querySelector(".cancel-btn")
const addTaskBtn = document.querySelector(".add-task-btn")
const taskList = document.querySelector(".task-list")

newTaskBtn.addEventListener("click", () => {
    document.querySelector(".task-input").style.display = "inline"
})

cancelBtn.addEventListener("click", () => {
    task.value = ""
    document.querySelector(".task-input").style.display = "none"
})

addTaskBtn.addEventListener("click", () => {
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
})

// task removal and completion
function handleTask(e) {
    const p1 = e.target.parentElement
    const p2 = p1.parentElement
    const p3 = p2.parentElement
    if(e.target.classList[1] === "fa-trash-alt") {
        p3.remove()
    } else if (e.target.classList[1] === "fa-check-square") {
        p3.style.opacity = "0.4"
        document.querySelector(".task-desc").style.textDecoration = "line-through"
    } 
}



