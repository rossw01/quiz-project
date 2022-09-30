const startResetElement = document.getElementById("startButton");
const questionElement = document.getElementById("question");
const questionResultElement = document.getElementById("answerResult");
const numberOfQuestions = Object.keys(questions).length;
const answerElementList = document.getElementsByClassName("answer");
const resultElement = document.getElementById("result");
const introElement = document.getElementById("intro");
const imageElement = document.getElementById("questionImage");

var displayedIntro = false;
var buttonsHidden = false;

var questionNumber = 0; // Tracks what is the current question
var score = 0; // Tracks current score

function displayIntro() {
  questionElement.style.display = "none";
  startResetElement.innerText = "Start";
}

function hideIntro() {
  buttonsHidden = true;
  questionElement.style.display = "block";
  introElement.style.display = "none";
  startResetElement.innerText = "Reset";
}

function generateResult() {
  if (score < 21) {
    return outcomes.worst;
  } else if (score < 31) {
    return outcomes.mid;
  } else if (score < 41) {
    return outcomes.best;
  }
}

function toggleButtons() {
  if (!buttonsHidden) {
    // If we're not already on the results screen...
    for (let i = 0; i < answerElementList.length; i++) {
      answerElementList[i].style.display = "none";
    }
    questionImage.style.display = "none"; // Hides image at end of quiz
  } else {
    resultElement.style.display = "none";
    questionImage.style.display = "block"; // Displays image on quiz start
    for (let i = 0; i < answerElementList.length; i++) {
      answerElementList[i].style.display = "block";
    }
    buttonsHidden = false;
  }
}

function nextQuestion() {
  questionNumber++;
  console.log(
    `Current question number: ${questionNumber}, there are ${numberOfQuestions} questions`
  );
  // If no more questions left, display "End of quiz!"
  if (questionNumber > numberOfQuestions - 1) {
    questionElement.innerText = "End of quiz!";
    toggleButtons();
    resultElement.innerText = generateResult();
    resultElement.style.display = "block";
    buttonsHidden = true;
  } else {
    // TODO: Change pic of question
    imageElement.src = `./images/q${questionNumber}.jpg`;
    // Only update the questions/answer boxes if the quiz isn't finished
    questionElement.innerText = questions[`question${questionNumber}`].question;
    // Add corresponding answers from questions obj to the answer boxes inner text
    for (var i = 0; i < answerElementList.length; i++) {
      {
        answerElementList[i].innerText =
          questions[`question${questionNumber}`][`button${i + 1}`].text;
      }
    }
  }
}

// Ran through button click in HTML
function userChose(userChoice) {
  if (!(questionNumber > numberOfQuestions)) {
    // Make sure not to check questions obj once we have gone through all questions
    score +=
      questions[`question${questionNumber}`][`button${userChoice}`].points;
    console.log(`score is now ${score}`);
    new Audio("./sounds/correct.mp3").play();
    nextQuestion();
  }
}

function startQuiz() {
  toggleButtons();
  if (!displayedIntro) {
    // if first time running...
    displayIntro();
    displayedIntro = true;
  } else if (displayedIntro) {
    hideIntro();
    toggleButtons();
    questionNumber = 0; // Reset current question index
    score = 0;
  }
  nextQuestion();
}

startQuiz();
