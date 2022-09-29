const questionElement = document.getElementById("question");
const questionResultElement = document.getElementById("answerResult");
const numberOfQuestions = Object.keys(questions).length;
const answerElementList = document.getElementsByClassName("answer");
const resultElement = document.getElementById("result");
const introElement = document.getElementById("intro");

var displayedIntro = false;
var buttonsHidden = true;

var questionNumber = 0; // Tracks what is the current question
var score = 0; // Tracks current score

function displayIntro() {
  questionElement.style.display = "none";
}

function hideIntro() {
  questionElement.style.display = "block";
  introElement.style.display = "none";
}

function generateResult() {
  if (score < 21) {
    return "Worst outcome";
  } else if (score < 31) {
    return "Good outcome";
  } else if (score < 41) {
    return "Best outcome!";
  }
}

function toggleButtons() {
  if (!buttonsHidden) {
    // If we're not already on the results screen...
    for (let i = 0; i < answerElementList.length; i++) {
      answerElementList[i].style.display = "none";
    }
  } else {
    resultElement.style.display = "none";
    for (let i = 0; i < answerElementList.length; i++) {
      answerElementList[i].style.display = "block";
    }
    buttonsHidden = false;
  }
}

function nextQuestion() {
  questionNumber++;
  // If no more questions left, display "End of quiz!"
  if (questionNumber > numberOfQuestions) {
    questionElement.innerText = "End of quiz!";
    toggleButtons();
    resultElement.innerText = generateResult();
    resultElement.style.display = "block";
    buttonsHidden = true;
  } else {
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

// function displayFeedback(result) {
//   // questionResultElement.innerText = result; // Set innerText to "Correct" or "Incorrect"
//   if (!(questionNumber > numberOfQuestions)) {
//     if (result == "Correct") {
//       questionResultElement.style.color = "Green";
//     } else {
//       questionResultElement.style.color = "Red";
//     }
//     questionResultElement.style.transition = "none";
//     questionResultElement.style.opacity = "1";
//     questionResultElement.textContent = result; // Set innerText to "Correct" or "Incorrect"
//     void questionResultElement.offsetHeight; // Allows us to transition again (for some reason)
//     questionResultElement.style.transition = "opacity 1s";
//     questionResultElement.style.opacity = "0";
//   }
// }

// Ran through button click in HTML
function userChose(userChoice) {
  if (!(questionNumber > numberOfQuestions)) {
    // Make sure not to check questions obj once we have gone through all questions
    score +=
      questions[`question${questionNumber}`][`button${userChoice}`].points;
    console.log(`score is now ${score}`);
    new Audio("/sounds/correct.mp3").play();
    nextQuestion();
  }
}

function startQuiz() {
  buttonsHidden = false;
  toggleButtons();
  if (!displayedIntro) {
    // if first time running...
    displayIntro();
    displayedIntro = true;
  } else if (displayedIntro) {
    buttonsHidden = true;
    hideIntro();
    toggleButtons();

    questionNumber = 0; // Reset current question index
    score = 0;
  }
  nextQuestion();
}

startQuiz();
