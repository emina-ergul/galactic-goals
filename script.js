// const api ="https://type.fit/api/quotes";

// async function getapi(url)
// {
//   const response = await fetch(url);
//   var data = await response.json();
//   console.log(data);
// }

// getapi(api);

// menu
const menuBtn = document.querySelector(".menu-btn")
const closeMenuBtn = document.querySelector(".close-menu-btn")

menuBtn.addEventListener("click", () => {
    document.querySelector(".menu-panel").style.display = "inline"
})

closeMenuBtn.addEventListener("click", () => {
    document.querySelector(".menu-panel").style.display = "none"
})

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
    if(e.target.classList[1] === "fa-trash-alt") {
        console.log("binned")
        const p1 = e.target.parentElement
        const p2 = p1.parentElement
        const p3 = p2.parentElement
        p3.remove()
    } else if (e.target.classList[1] === "fa-check-square") {
        console.log("complete")
        const p1 = e.target.parentElement
        const p2 = p1.parentElement
        const p3 = p2.parentElement
        p3.style.opacity = "0.4"
        document.querySelector(".task-desc").style.textDecoration = "line-through"
    }
}



