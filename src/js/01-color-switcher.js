const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;
let intervalId = null;

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);

function startColorChange() {
  startButton.disabled = true;
  intervalId = setInterval(changeBodyColor, 1000);
}

function stopColorChange() {
  startButton.disabled = false;
  clearInterval(intervalId);
}

function changeBodyColor() {
  const randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
