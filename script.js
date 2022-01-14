// const api ="https://type.fit/api/quotes";

// async function getapi(url)
// {
//   const response = await fetch(url);
//   var data = await response.json();
//   console.log(data);
// }

// getapi(api);

const menuBtn = document.querySelector(".menu-btn")
const closeMenuBtn = document.querySelector(".close-menu-btn")

menuBtn.addEventListener("click", () => {
    document.querySelector(".menu-panel").style.display = "inline"
})

closeMenuBtn.addEventListener("click", () => {
    document.querySelector(".menu-panel").style.display = "none"
})