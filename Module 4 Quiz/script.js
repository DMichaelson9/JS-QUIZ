const questions = [
  {
    question: "Which of the following is not a data type?",
    answers: [
      { text: "Number", correct: false},
      { text: "Boolean", correct: false},
      { text: "String", correct: false},
      { text: "Object", correct: true},
    ]
  },
  {
    question: "What is the correct syntax for a for loop in JavaScript?",
    answers: [
      { text: "for (i = 0; i < 10; i++) {}", correct: false},
      { text: "for (var i = 0; i <= 10; i++) {}", correct: false},
      { text: "for (i = 1 to 10) {}", correct: false},
      { text: "for (i = 0; i < 10; i = i + 1) {}", correct: true},
    ]
  },
  {
    question: "What is Javascript",
    answers: [
      { text: "Rare Item", correct: false},
      { text: "Programming Language", correct: true},
      { text: "Video Game", correct: false},
      { text: "Video editing Software", correct: false},
    ]
  },
  {
    question: "What is the keyword used to declare a variable in JavaScript?",
    answers: [
      { text: "variable", correct: false},
      { text: "const", correct: false},
      { text: "let", correct: false},
      { text: "var", correct: true},
    ]
  },
  {
    question: "What is the difference between == and === in JavaScript?",
    answers: [
      { text: "=== checks for strict equality, == checks for loose equality", correct: true},
      { text: "== checks for strict equality, === checks for loose equality", correct: false},
      { text: "None of the choices", correct: false},
      { text: "No difference", correct: false},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;
const timeLimit = 10;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}


function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  const timerElement = document.createElement("div");
  timerElement.classList.add("timer");
  timerElement.innerHTML = `Time left: ${timeLimit}s`;

  if (document.querySelector(".timer")) {
    document.querySelector(".quiz").removeChild(document.querySelector(".timer"));
  }

  document.querySelector(".quiz").appendChild(timerElement);

  let timeLeft = timeLimit;
  const timerInterval = setInterval(()=>{
    timeLeft--;
    timerElement.innerHTML = `Time left: ${timeLeft}s`;
    if(timeLeft === 0){
      clearInterval(timerInterval);
      selectAnswer({target: {dataset: {correct: "false"}}}); // simulate wrong answer
    }
  }, 1000);

  currentQuestion.answers.forEach(answer => { 
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}


function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}


function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}


function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}


nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz(); 