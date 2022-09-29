const questionElement = document.getElementById("question");
const answer1Element = document.getElementById("answer1");
const answer2Element = document.getElementById("answer2");
const answer3Element = document.getElementById("answer3");
const answer4Element = document.getElementById("answer4");
const scoreElement = document.getElementById("score");
const questionResultElement = document.getElementById("answerResult");
const numberOfQuestions = Object.keys(questions).length;

const answerElementList = [
  answer1Element,
  answer2Element,
  answer3Element,
  answer4Element,
];

var questionNumber = 0; // Tracks what is the current question
var score = 0; // Tracks current score

function nextQuestion() {
  questionNumber++;
  // If no more questions left, display "End of quiz!"
  if (questionNumber > numberOfQuestions) {
    questionElement.innerText = "End of quiz!";
  } else {
    // Only update the questions/answer boxes if the quiz isn't finished
    questionElement.innerText = questions[`question${questionNumber}`].question;
    // Add corresponding answers from questions obj to the answer boxes inner text
    for (var i = 0; i < answerElementList.length; i++) {
      {
        answerElementList[i].innerText =
          questions[`question${questionNumber}`][`button${i + 1}`];
      }
    }
  }
}

function displayFeedback(result) {
  // questionResultElement.innerText = result; // Set innerText to "Correct" or "Incorrect"
  if (!(questionNumber > numberOfQuestions)) {
    if (result == "Correct") {
      questionResultElement.style.color = "Green";
    } else {
      questionResultElement.style.color = "Red";
    }
    questionResultElement.style.transition = "none";
    questionResultElement.style.opacity = "1";
    questionResultElement.textContent = result; // Set innerText to "Correct" or "Incorrect"
    void questionResultElement.offsetHeight; // Allows us to transition again (for some reason)
    questionResultElement.style.transition = "opacity 1s";
    questionResultElement.style.opacity = "0";
  }
}

function checkCorrect(userChoice) {
  if (!(questionNumber > numberOfQuestions)) {
    // Make sure not to check questions obj once we have gone through all questions
    if (userChoice == questions[`question${questionNumber}`].answer) {
      score++;
      scoreElement.innerText = score;
      new Audio("/sounds/correct.mp3").play();
      displayFeedback("Correct");
      nextQuestion();
    } else {
      new Audio("sounds/incorrect.mp3").play();
      displayFeedback("Incorrect");
      nextQuestion();
      // TODO: Play Sound
    }
  }
}

function startQuiz() {
  questionNumber = 0; // Reset current question index
  score = 0;
  scoreElement.innerText = 0;

  nextQuestion();
}

startQuiz();
