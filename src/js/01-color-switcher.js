const startBtn = document.querySelector(".js-start");
const stopBtn = document.querySelector(".js-stop");
const body = document.querySelector('body');

let timerId = null;

startBtn.addEventListener("click", (evt) => {
    evt.target.disabled = true;
  timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
  }, 1000);
    
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.disabled = false;
});
