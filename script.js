// Set variable elements 
var start = document.getElementById("home");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var timer = document.querySelector(".timeCount");
var progress = document.getElementById("progress");
var result = document.getElementById("result");
var nameInput = document.querySelector("#name");
var scoreInput = document.querySelector("#totalScore");
var submitButton = document.querySelector("#submit");
var msgDiv = document.querySelector("#msg");
var userName = document.querySelector("#userName");
var userScore = document.querySelector("#userScore");


// Create object/questions for quiz
var quizContent = [
    {
        question: `Who invented JavaScript?`, 
        choiceA: `Brendan Eich`, 
        choiceB: `Harry Potter`, 
        choiceC: `Kevin Hrt`, 
        answer: `A`, 
    },
    {
        question: `which event occurs when the user clicks on an HTML element??`, 
        choiceA: `onmouseclick`, 
        choiceB: `onclick`, 
        choiceC: `onchange`, 
        answer: `B`, 
    },
    {
        question: `Which of the following are primitive data types in Javascript?`, 
        choiceA: `All of the below`, 
        choiceB: `Number`, 
        choiceC: `Boolean`, 
        answer: `A`, 
    },
    {
        question: `Which of the below is not something you'd use to declare a variable?`, 
        choiceA: `let`, 
        choiceB: `var`, 
        choiceC: `assign`, 
        answer: `C`, 
    },
    {
        question: `Which below would you use to assign a value to a variable?`, 
        choiceA: `=`, 
        choiceB: `==`, 
        choiceC: `===`, 
        answer: `A`, 
    },
    {
        question: `Which operator is used to assign a value to a variable?`, 
        choiceA: `x`, 
        choiceB: `=`, 
        choiceC: `*`, 
        answer: `B`, 
    },
    
]
// Set ,y variables
var lastQuestion = quizContent.length - 1;
var currentQuestion = 0;
var secondsLeft = 90; 
var score = 0; 

// Function to count down timer
function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft + ` seconds`;
    
        if (secondsLeft === 0) {
          clearInterval(timerInterval);
          endQuiz();
        }
    
    }, 1000);
    
}

// Function show quiz content
function showQuiz() {
    var quiz = quizContent[currentQuestion];
    question.textContent = quiz.question;
    choiceA.textContent = quiz.choiceA;
    choiceB.textContent = quiz.choiceB;
    choiceC.textContent = quiz.choiceC;
}

// Event Listener for when "Start Quiz!" button is clicked
start.addEventListener("click",startQuiz);

// Function to start this quiz
function startQuiz() {
    start.style.display = "none";
    showQuiz();
    quiz.style.display = "block";
    setTime()
}

// Function to check answer
function checkAnswer(answer) {
    if (answer == quizContent[currentQuestion].answer) {
        score++;
    } 

    if (currentQuestion < lastQuestion) {
        currentQuestion++;
        showQuiz();
    } else {
        endQuiz();
    }
}

// Function to end quiz
function endQuiz(){
    quiz.style.display = "none";
    result.style.display = "block";

    totalScore.innerHTML = score; 
}

// Saving score to local storage 
saveScore();

function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
};

function saveScore() {

  var name = localStorage.getItem("name");
  var score = localStorage.getItem("totalScore");

  if (!name) {
  return;
 }

  userName.textContent = name;
  userScore.textContent = score;
};

submitButton.addEventListener("click", function(event) {
event.preventDefault();

  var name = document.querySelector("#name").value;
  var score = document.querySelector("#totalScore").value;

  if (name === "") {
    displayMessage("error", "Name cannot be blank");
  } else if (score === "0") {
    displayMessage("error", "You should try again!");
  } 

    localStorage.setItem("name", name);
    localStorage.setItem("score", score);
    saveScore();
});