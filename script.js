"use strict";

// welcome page

// selecting buttons on home page
const openGameModeDialog = document.querySelector("#selectDifficulty");
const openGameRulesDialog = document.querySelector("#gameRules");
const closeDialog = document.querySelectorAll(".closeModal");

// selecting dialogs
const gameModeModal = document.querySelector("#gameModeModal");
const gameRulesModal = document.querySelector("#gameRulesModal");

// functions to open dialogs
if (openGameModeDialog)
  openGameModeDialog.addEventListener("click", function () {
    gameModeModal.showModal();
  });

if (openGameRulesDialog)
  openGameRulesDialog.addEventListener("click", function () {
    gameRulesModal.showModal();
  });

// functions to close dialogs
function closeModal() {
  gameModeModal.close();
  gameRulesModal.close();
}

for (let i = 0; i < closeDialog.length; i++) {
  closeDialog[i].addEventListener("click", closeModal);
}

if (gameModeModal)
  gameModeModal.addEventListener("click", function (e) {
    if (e.target === gameModeModal) {
      closeModal();
    }
  });

if (gameRulesModal)
  gameRulesModal.addEventListener("click", function (e) {
    if (e.target === gameRulesModal) {
      closeModal();
    }
  });

// Game logic

const currentPage = document.body.getAttribute("data-page");
if (
  currentPage === "easy" ||
  currentPage === "hard" ||
  currentPage === "ultimate"
) {
  let randomNumber = Math.trunc(Math.random() * 50) + 1;

  let initialScore = Number(document.querySelector("#score").textContent);
  let score = initialScore;
  let highScore = 0;
  let checkGuess = document.querySelector("#checkGuess");

  // FUCTIONS TO KEEP CODE dry
  const displayMessage = function (message) {
    document.querySelector("#message").textContent = message;
  };

  const displayMessageColor = function (color) {
    document.querySelector("#message").style.color = color;
  };

  const randomNumberBackgroundColor = function (backgroundColor) {
    document.querySelector("#randomNumber").style.backgroundColor =
      backgroundColor;
  };

  const inputWidth = function (width) {
    document.querySelector("input").style.width = width;
  };

  const inputBorderColor = function (borderColor) {
    document.querySelector("input").style.borderColor = borderColor;
  };

  const scoreColor = function (color) {
    document.querySelector("#score").style.color = color;
  };

  // check guess logic
  checkGuess.addEventListener("click", function () {
    const guess = Number(document.querySelector("#guess").value);

    // if user does not pick a number
    if (!guess) {
      displayMessage("Select a valid number! 😡");

      // if user picks correct number
    } else if (guess === randomNumber) {
      displayMessage("Yayy!! Correct number! ✅");
      displayMessageColor("green");
      randomNumberBackgroundColor("green");
      inputWidth("100%");
      inputBorderColor("green");
      document.querySelector("#randomNumber").textContent = randomNumber;
      checkGuess.style.display = "none";

      //   update highsocre if user picks correct number
      if (score > highScore) {
        highScore = score;
        document.querySelector("#highscore").textContent = highScore;
        document.querySelector("#highscore").style.color = "green";
      }
      //   when guess is wrong
    } else if (guess !== randomNumber) {
      if (score > 1) {
        score--;
        document.querySelector("#score").textContent = score;
        displayMessageColor("orange");
        displayMessage(
          guess > randomNumber
            ? "Too high, choose again😛"
            : "Too low, choose again😛"
        );
      } else {
        score--;
        displayMessage("You lost the game 🤣😂");
        displayMessageColor("#d70000");
        randomNumberBackgroundColor("#d70000");
        inputWidth("100%");
        inputBorderColor("#d70000");
        scoreColor("#d70000");
        checkGuess.style.display = "none";
        document.querySelector("#randomNumber").textContent = randomNumber;
        document.querySelector("#score").textContent = 0;
      }
    }
  });

  // play again logic
  const playAgain = document.querySelector("#playAgain");

  playAgain.addEventListener("click", function () {
    randomNumber = Math.trunc(Math.random() * 50) + 1;

    score = initialScore;
    document.querySelector("#score").textContent = score;
    displayMessage("Start guessing...");
    displayMessageColor("#e7e7e7");
    randomNumberBackgroundColor("#364153");
    inputWidth("70%");
    inputBorderColor("#b742b6");
    scoreColor("#e7e7e7");
    checkGuess.style.display = "block";
    document.querySelector("#randomNumber").textContent = "?";
    document.querySelector("input").value = "";
  });
}
