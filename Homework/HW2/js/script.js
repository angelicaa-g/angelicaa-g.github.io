//Event Listener
document.querySelector("button").addEventListener("click", gradeQuiz);

//Global variables
var score = 0;
var attempts = localStorage.getItem("total_attempts");



displayQ4Choices();
displayQ5Choices();

//Functions
function displayQ4Choices() {
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  q4ChoicesArray = _.shuffle(q4ChoicesArray);
  for (let i = 0; i < q4ChoicesArray.length; i++) {
    document.querySelector("#q4Choices").innerHTML += 
      `<input type="radio" name="q4" id="${q4ChoicesArray[i]}" 
       value="${q4ChoicesArray[i]}">
       <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label><br>`;
  }
} 

function displayQ5Choices() {
  let q5ChoicesArray = ["Alaska", "Texas", "California", "Montana"];
  q5ChoicesArray = _.shuffle(q5ChoicesArray);
  document.querySelector("#q5Choices").innerHTML = "";

  for (let i = 0; i < q5ChoicesArray.length; i++) {
    document.querySelector("#q5Choices").innerHTML += 
      `<div class="form-check form-check-inline">
         <input class="form-check-input" type="radio" name="q5" id="${q5ChoicesArray[i]}" value="${q5ChoicesArray[i]}">
         <label class="form-check-label" for="${q5ChoicesArray[i]}">${q5ChoicesArray[i]}</label>
       </div>`;
  }
}

function rightAnswer(index){
  document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
  document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
  document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png'>";
  score += 10;
}

function wrongAnswer(index){
  document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect";
  document.querySelector(`#q${index}Feedback`).className = "bg-danger text-white";
  document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

//Validation
function isFormValid(){
  let isValid = true;
  if (document.querySelector("#q1").value == "") {
    isValid = false;
    document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
  }
  return isValid;
}

function gradeQuiz(){
  console.log("Grading quiz..");
  document.querySelector("#validationFdbk").innerHTML = ""; 
  if (!isFormValid()) {
    return;
  }

  // Reset score and get responses
  score = 0;
  let q1Response = document.querySelector("#q1").value.toLowerCase().trim();
  let q2Response = document.querySelector("#q2").value;
  let q4Response = document.querySelector("input[name=q4]:checked").value;

  console.log(q1Response, q2Response);

  //Grading question 1
  if (q1Response == "sacramento") {
    rightAnswer(1);
  } else {
    wrongAnswer(1);
  }

  //Grading question 2
  if (q2Response == "mo") {
    rightAnswer(2);
  } else {
    wrongAnswer(2);
  }

  //Grading question 3
  if (document.querySelector("#Jefferson").checked && 
    document.querySelector("#Roosevelt").checked && 
    !document.querySelector("#Jackson").checked && 
    !document.querySelector("#Franklin").checked) {
  rightAnswer(3);
  }
  else {
  wrongAnswer(3);
  }
  //Question 4
  if (q4Response == "Rhode Island") {
  rightAnswer(4);
  }
  else {
  wrongAnswer(4);
  }

  // Question 5
if (
  document.querySelector("#Alaska").checked &&
  !document.querySelector("#Texas").checked &&
  !document.querySelector("#California").checked &&
  !document.querySelector("#Montana").checked
) {
  rightAnswer(5);
} else {
  wrongAnswer(5);
}

// Question 6
let q6Response = parseInt(document.querySelector("#q6").value);

if (q6Response === 50) {
  rightAnswer(6);
} else {
  wrongAnswer(6);
}

// Question 7
let q7Response = document.querySelector("input[name=q7]:checked").value;

if (q7Response == "True") {
  rightAnswer(7);
} else {
  wrongAnswer(7);
}

// Question 8
let q8Response = document.querySelector("#q8").value;

if (q8Response === "Canada") {
  rightAnswer(8);
} else {
  wrongAnswer(8);
}

// Question 9
let q9Response = document.querySelector("#q9").value.toLowerCase().trim();

if (q9Response === "new york" || q9Response === "new york city") {
  rightAnswer(9);
} else {
  wrongAnswer(9);
}

// Question 10
let q10Response = document.querySelector("input[name=q10]:checked").value;

if (q10Response === "Northern") {
  rightAnswer(10);
} else {
  wrongAnswer(10);
}

  //Display total
  document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
  document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
  localStorage.setItem("total_attempts", attempts); 

let msg = ""

if (score > 80){
  msg = "Congratulations on scoring more than 80 points!"
}
else{
  msg = "" //clears message 
}

document.querySelector("#congratsMsg").innerHTML = msg;  

}