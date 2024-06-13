let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loses: 0,
  ties: 0,
};

updateScoreElement();

function playGame(playerMove, computerMove) {
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      score.ties++;
      result = "Tie.";
    } else if (computerMove === "paper") {
      score.loses++;
      result = "You lose.";
    } else if (computerMove === "scissors") {
      score.wins++;
      result = "You win.";
    }
  }

  if (playerMove === "paper") {
    if (computerMove === "rock") {
      score.wins++;
      result = "You win.";
    } else if (computerMove === "paper") {
      score.ties++;
      result = "Tie.";
    } else if (computerMove === "scissors") {
      score.loses++;
      result = "You lose.";
    }
  }

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      score.loses++;
      result = "You lose.";
    } else if (computerMove === "paper") {
      score.wins++;
      result = "You win.";
    } else if (computerMove === "scissors") {
      score.ties++;
      result = "Tie.";
    }
  }

  //alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}\n Wins = ${score.wins}  Loses = ${score.loses}  Ties = ${score.ties}`);

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You<img src="images/${playerMove}-emoji.png" class="move-icon">
                 <img src="images/${computerMove}-emoji.png" class="move-icon">
                 Computer`;

  updateScoreElement();

  return result;
}

function pickComputerMove() {
  let computerMove = "";
  const randoNumber = Math.random();

  if (randoNumber >= 0 && randoNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randoNumber >= 1 / 3 && randoNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randoNumber >= 2 / 3 && randoNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins = ${score.wins}  Loses = ${score.loses}  Ties = ${score.ties}`;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove, pickComputerMove());
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  const computerMove = pickComputerMove();
  let result = playGame("rock", computerMove);
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  const computerMove = pickComputerMove();
  let result = playGame("paper", computerMove);
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  const computerMove = pickComputerMove();
  let result = playGame("scissors", computerMove);
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    const computerMove = pickComputerMove();
    let result = playGame("rock", computerMove);
  } else if (event.key === "p") {
    const computerMove = pickComputerMove();
    let result = playGame("paper", computerMove);
  } else if (event.key === "s") {
    const computerMove = pickComputerMove();
    let result = playGame("scissors", computerMove);
  }
});
