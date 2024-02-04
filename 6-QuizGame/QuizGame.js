//getting start button
const _startQuizButton = document.getElementById('startButton');
_startQuizButton.addEventListener('click', GenerateQuiz);

//getting elements required
const _quizCardBody = document.getElementById('quiz_card');
const _quizQuestion = document.getElementById('quiz-question');
const _quizOptions = document.getElementById('quiz-options');
const _nextQuestion = document.getElementById('next-question');
const _endGame = document.getElementById('end-game');
const _resultBox = document.getElementById('result');
const _rightAnswerCount = document.querySelectorAll('#rightAnswer_count');
const _wrongAnswerCount = document.querySelectorAll('#wrongAnswer_count');
const _totalAttempt = document.getElementById('total-attempt');
const _successRate = document.getElementById('success-rate');
const _finalResultBody = document.getElementById('FinalResult');
const _playAgainBtn = document.getElementById('play-again-btn');

//initializing variables required
let QuestionData;
let rightAnswer = 0;
let wrongAnswer = 0;

//on first loading of page
document.addEventListener('DOMContentLoaded', function () {
  _quizCardBody.style.display = 'none';
  _resultBox.style.display = 'none';
  _finalResultBody.style.display = 'none';
});

//First START button get clicked and this function executes
function GenerateQuiz() {
  GetQuizQuestions();
  _finalResultBody.style.display = 'none';
  _startQuizButton.style.display = 'none';
  _nextQuestion.addEventListener('click', GetQuizQuestions);
  _endGame.addEventListener('click', EndGame);
}

/*This function gets data from api 
and executes "showQuestion" function 
to display question */
async function GetQuizQuestions() {
  /* removing 'next' button after getting new question and adding it again after some
  time ensures that user don't click 'next' button too frequently*/
  _nextQuestion.style.display = 'none'; //remove next button
  setTimeout(() => (_nextQuestion.style.display = 'block'), 3000); //add it again after 7 sec
  _resultBox.style.display = 'none';

  const quiz_api = 'https://opentdb.com/api.php?amount=1';
  try {
    const response = await fetch(quiz_api);
    const data = await response.json();
    QuestionData = data.results[0];
    if (QuestionData) {
      showQuestion();
      if (_quizCardBody.style.display === 'none') {
        _quizCardBody.style.display = 'block';
      }
    } else {
      console.log('No question data found');
    }
  } catch (err) {
    console.log(err);
  }
}

/*this function gets invoked by "GetQuizQuestions" 
and it displays question to user */
async function showQuestion() {
  // Clear existing options
  _quizOptions.innerHTML = '';

  //assign question
  _quizQuestion.innerHTML = QuestionData.question;

  const options = [
    QuestionData.correct_answer,
    ...QuestionData.incorrect_answers,
  ];
  //add new options
  options.sort().forEach((element) => {
    const optionNode = document.createElement('li');
    optionNode.className = 'option';
    optionNode.innerHTML = element;
    _quizOptions.appendChild(optionNode);
  });
  addListnersToOptions();
}

/* this function checks which option is clicked
and invokes a function */
function addListnersToOptions() {
  // Remove previous event listeners from options
  _quizOptions.querySelectorAll('li').forEach(function (option) {
    option.removeEventListener('click', handleOptionClick);
  });

  //add new event listners to options
  _quizOptions.querySelectorAll('li').forEach(function (option) {
    option.addEventListener('click', handleOptionClick);
  });
}

/* this function handles the click event on options */
function handleOptionClick(e) {
  const selectedOption = e.currentTarget;
  if (_quizOptions.querySelector('.selected')) {
    _quizOptions.querySelector('.selected').classList.remove('selected');
  }
  selectedOption.classList.add('selected');
  checkAnswer(selectedOption.innerText);
}

/* this function checks answer and invokes function to shows result  */
function checkAnswer(selection) {
  _quizOptions.querySelectorAll('li').forEach(function (option) {
    if (option.innerText === QuestionData.correct_answer) {
      option.style.backgroundColor = 'lightgreen';
    } else {
      option.style.backgroundColor = '#FF7F7F';
    }
  });
  if (selection === QuestionData.correct_answer) {
    console.log('right answer');
    rightAnswer += 1;
    showResult('Right Answer');
    _rightAnswerCount.forEach((element) => (element.innerText = rightAnswer));
  } else {
    wrongAnswer += 1;
    showResult('Wrong Answer');
    _wrongAnswerCount.forEach((element) => (element.innerText = wrongAnswer));
  }
}

/* this function shows result */
function showResult(result) {
  _resultBox.innerText = result;
  _resultBox.style.display = 'block';
}

/* End Game and show final result and reset everything*/
function EndGame() {
  _endGame.removeEventListener('click', EndGame);
  //display final result
  _totalAttempt.innerText = rightAnswer + wrongAnswer;
  _successRate.innerHTML =
    (rightAnswer / (rightAnswer + wrongAnswer)) * 100 || '0';

  //hiding quiz-card body
  _quizCardBody.style.display = 'none';

  //showing Final result body
  _finalResultBody.style.display = 'block';

  //removing all event listners and elements in quiz-card
  _quizOptions.querySelectorAll('li').forEach(function (option) {
    option.removeEventListener('click', handleOptionClick);
  });
  _nextQuestion.removeEventListener('click', GetQuizQuestions);
  _quizQuestion.innerHTML = '';
  _quizOptions.innerHTML = '';
  _resultBox.innerHTML = '';

  _playAgainBtn.style.display = 'none';
  setTimeout(() => {
    _playAgainBtn.addEventListener('click', GenerateQuiz);
    _playAgainBtn.style.display = 'block';
  }, 3000);
}
