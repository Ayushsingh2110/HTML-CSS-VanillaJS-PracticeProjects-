let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#submit');
const inputNum = document.querySelector('#guessField');
const previousGuesses = document.querySelector('.guesses');
const remainingChance = document.querySelector('.remainingGuesses');
const LoworHigh = document.querySelector('.lowOrHi');
const StartOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let GuessCount = 0;

let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (event) {
    event.preventDefault();
    const guess = parseInt(inputNum.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  //to vlaidate whether guess number is of right format or not
  if (isNaN(guess)) {
    alert('Please enter a valid number');
  } else if (guess < 1 || guess > 100) {
    alert('Please enter a number between 1 and 100');
  } else {
    if (GuessCount === 11) {
      displayGuess(guess);
      displayMessage(`Game Over, random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  //to check if guess number is right or not
  if (guess == randomNumber) {
    displayMessage('You guessed it right !!');
    endGame();
  } else if (guess < randomNumber) {
    displayMessage('Number is low');
  } else if (guess > randomNumber) {
    displayMessage('Number is high');
  }
}

function displayGuess(guess) {
  //to display eneter guessed number
  inputNum.value = '';
  previousGuesses.innerHTML += `${guess} `;
  GuessCount++;
  remainingChance.innerHTML = `${10 - GuessCount}`;
}

function displayMessage(message) {
  //to display message by manipulating DOM
  LoworHigh.innerHTML = `<h2>${message}</h2>`;
}

function newGame() {
  //start new game
  document.querySelector('#newGame').addEventListener('click', function () {
    randomNumber = parseInt(Math.random() * 100 + 1);
    GuessCount = 0;
    previousGuesses.innerHTML = '';
    remainingChance.innerHTML = '10';
    inputNum.removeAttribute('disabled');
    StartOver.removeChild(p);
    playGame = true;
  });
}

function endGame() {
  //end game
  inputNum.value = '';
  inputNum.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Start new game</h2>`;
  StartOver.appendChild(p);
  playGame = false;
  newGame();
}
