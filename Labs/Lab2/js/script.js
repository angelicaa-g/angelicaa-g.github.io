//alert("running external js code!");

// Global vars
let randomNumber = Math.floor(Math.random() * 99) + 1; // random number between 1 to 99
let attempts = 0;
let totalWins = 0;
let totalLosses = 0;


// Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

initializeGame();

function initializeGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  attempts = 0;
  console.log("randomNumber: " + randomNumber);

  // Hide Reset, show Guess
  document.querySelector("#resetBtn").style.display = "none";
  document.querySelector("#guessBtn").style.display = "inline";

  let playerGuess = document.querySelector("#playerGuess");
  playerGuess.focus();
  playerGuess.value = "";

  let feedback = document.querySelector("#feedback");
  feedback.textContent = "";

  document.querySelector("#guesses").textContent = "";
  document.querySelector("#attemptsLeft").textContent = 7; // reset attempts
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

  let remaining = 7 - attempts;
  document.querySelector("#attemptsLeft").textContent = remaining;
  feedback.style.color = "purple";

  if (guess == randomNumber) {
    feedback.textContent = "You guessed it!";
    feedback.style.color = "Green";
    totalWins++;
    document.querySelector("#wins").textContent = totalWins;
    gameOver();
  } else {
    document.querySelector("#guesses").textContent += guess + " ";
    if (attempts == 7) {
     feedback.textContent = `Sorry, you lost! The number was ${randomNumber}.`;
      feedback.style.color = "red";
      totalLosses++;
      document.querySelector("#losses").textContent = totalLosses;
      gameOver();
    } else if (guess > randomNumber) {
      feedback.textContent = "Guess was high!";
    } else {
      feedback.textContent = "Guess was low!";
    }
  }
}

function gameOver() {
  let guessBtn = document.querySelector("#guessBtn");
  let resetBtn = document.querySelector("#resetBtn");

  guessBtn.style.display = "none"; // hides guess button
  resetBtn.style.display = "inline"; // shows reset button
}

document.querySelector("h1").style.color = "purple";
