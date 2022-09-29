const questionElement = document.getElementById("question");
const answer1Element = document.getElementById("answer1");
const answer2Element = document.getElementById("answer2");
const answer3Element = document.getElementById("answer3");
const answer4Element = document.getElementById("answer4");

var questionNumber = 0; // Tracks what is the current question

function nextQuestion() {
  incrementquestionNumber();

  questionElement.innerText = questions[`question${questionNumber}`].question;
  answer1Element.innerText = questions[`question${questionNumber}`].button1;
  answer2Element.innerText = questions[`question${questionNumber}`].button2;
  answer3Element.innerText = questions[`question${questionNumber}`].button3;
  answer4Element.innerText = questions[`question${questionNumber}`].button4;
  //   questionElement.innerText = questionText;
}

function incrementquestionNumber() {
  questionNumber++;
  console.log(`Current question: ${questionNumber}`);
}

function checkCorrect() {}

function answer1() {
  console.log("Answer 1 clicked");
}

function answer2() {
  console.log("Answer 2 clicked");
}

function answer3() {
  console.log("Answer 3 clicked");
}

function answer4() {
  console.log("Answer 4 clicked");
}

function startQuiz() {
  questionNumber = 0;

  nextQuestion();
}

startQuiz();
