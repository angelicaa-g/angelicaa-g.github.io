//alert("running extrenal js code!")

//global vars

let random_number = Math.floor(Math.random() * 99) + 1 //random number between 1 to 99
let attempts = 0;

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

initializeGame()

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";

   document.querySelector("#guessBtn").style.display = "inline";
  
   
  let playerGuess = document.querySelector("#playerGuess");
  playerGuess.focus();   
  playerGuess.value = ""; 
  let feedback = document.querySelector("#feedback");
feedback.textContent = "";
document.querySelector("#guesses").textContent = "";

}

function checkGuess() {
let guess = document.querySelector("#playerGuess").value;
console.log("Player guess: " + guess);

let feedback = document.querySelector("#feedback");

if (guess < 1 || guess > 99) {
  feedback.textContent = "Please enter a value between 1 and 99!";
  feedback.style.color = "red";
  return;
}
attempts++;
console.log("Attempts: " + attempts);
feedback.style.color = "orange";

if (guess == randomNumber) {
  feedback.textContent = "You guessed it! You won!";
  feedback.style.color = "darkgreen";
  gameOver();
}
else{
    document.querySelector("#guesses").textContent += guess + " ";
    if(attempts == 7){
        feedback.textContent = "Sorry, you lost!"
        feedback.style.color = "red"
        gameOver();
    }
    else if(guess > random_number){
        feedback.textContent = "Guess was high!"

    }
    else{
         feedback.textContent = "Guess was low!"
    }
}


}

function gameOver(){
let guessBtn = document.querySelector("#guessBtn");
let resetBtn = document.querySelector("#resetBtn");

guessBtn.style.display = "none";   // hides guess button
resetBtn.style.display = "inline" // shows reset button

}



document.querySelector("h1").style.color = "purple"