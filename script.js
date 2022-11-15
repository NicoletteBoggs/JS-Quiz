let questions = [
  {
    numb: 1,
    question: "Commonly used data types DO NOT include:",
    answer: "Numbers",
    options: ["Strings", "Booleans", "Array", "Numbers"],
  },
  {
    numb: 2,
    question: "The condition in an if / else statement is enclosed within ____",
    answer: "Parantheses",
    options: ["Quotes", "Curly Brackets", "Parantheses", "Square Brackets"],
  },
  {
    numb: 3,
    question:
      "A very useful tool during development and debugging for printing content to the debugger is:",
    answer: "console.log",
    options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
  },
  {
    numb: 4,
    question: "What is a stack?",
    answer: "a linear data structure performing operations in a LIFO order",
    options: [
      "a collection of functions",
      "javascript jargan",
      "a linear data structure performing operations in a LIFO order",
      "a website containing html,css, and JS",
    ],
  },
  {
    numb: 5,
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language",
    options: [
      "HyperText Markup Language",
      "How To Modify Language",
      "HeadText Markup Language",
      "HyperText Markup Lingo",
    ],
  },
  {
    numb: 6,
    question: "What is a boolean?",
    answer: "a data type that evaluates to true or false",
    options: [
      "a function",
      "a button",
      "a data type that evaluates to true or false",
      "a data type that evaluates to nothing",
    ],
  },
];

//selecting all required elements
const start_btn = document.querySelector(".start_btn");
const timer_sec = document.querySelector(".timer_sec");
const question_title = document.querySelector(".que_text");
const option_list = document.querySelector(".option_list");
const score_text = document.querySelector(".score_text");
const questions_div = document.querySelector(".questions");
const finish_btn = document.querySelector(".finish_btn");
let time_left = 60;
let question_index = 0;
let time_state;

function start_quiz() {
  time_state = setInterval(function () {
    time_left = time_left - 1;
    timer_sec.textContent = time_left;
    if (time_left <= 0) {
      clearInterval(time_state);
      console.log("quiz_over");
    }
  }, 1000);
  start_btn.setAttribute("class", "hide");
  questions_div.removeAttribute("class");
  // call question. display function.
  show_questions();
}
function show_questions() {
  let current_question = questions[question_index];
  question_title.textContent = current_question.questions;
  option_list.innerHTML = "";
  current_question.options.forEach(function (option) {
    var answer_btn = document.createElement("button");
    answer_btn.textContent = option;
    answer_btn.setAttribute("value", option);
    // attach click event to check right from wrong
    answer_btn.onclick = check_answer;
    option_list.append(answer_btn);
  });

  // subtract time for wrong answers
}
function check_answer() {
  if (this.value === questions[question_index].answer) {
    console.log("correct");
  } else {
    console.log("incorrect");
    time_left = time_left - 10;
    timer_sec.textContent = time_left;
  }
  question_index++;
  if (question_index === questions.length) {
    showResults();
  } else {
    show_questions();
  }
}
var submitBtn = document.querySelector(".submit-btn");
function showResults() {
  var finalScore = document.querySelector(".final-score");

  var finish = document.querySelector(".finish");

  finish.removeAttribute("class", "hide");
  clearInterval(time_state);
  questions_div.setAttribute("class", "hide");
  finalScore.textContent = time_left;
  // gather answer containers from our quiz
}
function saveResults() {
  var nameInput = document.querySelector(".name-input");
  var scoreArray = JSON.parse(localStorage.getItem("scores")) || [];

  var newScore = {
    name: nameInput.value,
    newScore: time_left,
  };

  scoreArray.push(newScore);
  localStorage.setItem("scores", JSON.stringify(scoreArray));
}

// display final score
function displayScores() {
  var scoreList = document.querySelector(".score-list");
  var scoreArray = JSON.parse(localStorage.getItem("scores")) || [];
  scoreArray.forEach(function (index) {
    var scoreItem = document.createElement("li");
    scoreItem.textContent =
      "score: " + index.newScore + "-" + "name: " + index.name;
    scoreList.append(scoreItem);
  });
}
displayScores();

submitBtn.onclick = saveResults;
start_btn.onclick = start_quiz;
