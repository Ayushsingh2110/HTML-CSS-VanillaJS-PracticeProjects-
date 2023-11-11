const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const colorCode = document.createElement('h1');
const container = document.querySelector('.container');

let colorInterval;

function returnColor() {
  const hex = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
}

const startChangeColor = function (e) {
  e.preventDefault();
  startBtn.setAttribute('disabled', '');

  colorInterval = setInterval(changeBGcolor, 1000);
  function changeBGcolor() {
    container.appendChild(colorCode);
    let color = returnColor();
    document.body.style.background = color;
    colorCode.innerText = color;
  }
};

const stopColorChange = (e) => {
  e.preventDefault();
  startBtn.removeAttribute('disabled', '');
  clearInterval(colorInterval);
  colorInterval = null;
};

startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopColorChange);
