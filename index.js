/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
// Project: Rock Paper Scissors
// https://www.theodinproject.com/lessons/foundations-rock-paper-scissors

const choicesELs = Array.from(document.querySelectorAll('.choice'));
const resultEl = document.querySelector('.result');
const computerScoreEl = document.querySelector('#computer-score');
const playerScoreEl = document.querySelector('#player-score');

const modalEl = document.querySelector('.modal');
const modelTextEl = document.querySelector('.modal-text');
const closeModalEl = document.querySelector('.modal-btn');

const youWinEl = new Audio('sounds/youwin.mp3');
const youLoseEl = new Audio('sounds/youlose.mp3');
const tieEl = new Audio('sounds/tom.mp3');

const choices = ['Rock', 'Paper', 'Scissors'];
const numberOfGames = 5;
let playerScore = 0;
let computerScore = 0;

// Returns computer's choice
function getComputerChoice() {
  const index = Math.floor(Math.random() * choices.length);
  return index;
}

// eslint-disable-next-line consistent-return
function playOneRound(playerSelection, computerSelection) {
  // Tie game
  if (playerSelection === computerSelection) {
    tieEl.play();
    return 'Tie';
  }

  if (
    // Player wins
    (playerSelection === 'Rock' && computerSelection === 'Scissors') ||
    (playerSelection === 'Scissors' && computerSelection === 'Paper') ||
    (playerSelection === 'Paper' && computerSelection === 'Rock')
  ) {
    playerScore += 1;
    // Raise the player choice
    choicesELs[choices.indexOf(playerSelection)].classList.add('win');
    // Lower the compuer choice
    choicesELs[choices.indexOf(computerSelection)].classList.add('lose');
    // Play "you win" sound
    youWinEl.play();
    return `You Win! ${playerSelection} beats ${computerSelection}`;
  }

  if (
    // Computer wins
    (playerSelection === 'Rock' && computerSelection === 'Paper') ||
    (playerSelection === 'Scissors' && computerSelection === 'Rock') ||
    (playerSelection === 'Paper' && computerSelection === 'Scissors')
  ) {
    computerScore += 1;
    // Raise the computer choice
    choicesELs[choices.indexOf(playerSelection)].classList.add('lose');
    // Loser the player choice
    choicesELs[choices.indexOf(computerSelection)].classList.add('win');
    // Play "you lose" sound
    youLoseEl.play();
    return `You Lose! ${computerSelection} beats ${playerSelection}`;
  }
}

// Reset scores
function clearScores() {
  playerScore = 0;
  computerScore = 0;
  computerScoreEl.innerText = computerScore;
  playerScoreEl.innerText = playerScore;
}

// Reset display for a new play
function clearChoices() {
  choicesELs.forEach((choice) =>
    choice.classList.remove('computer-choice', 'player-choice', 'win', 'lose')
  );
  resultEl.classList.remove('show');
}

function game() {
  clearChoices();

  // 'this' is the choice element clicked on.
  // 'id' is defined for the element in HTML, e.g., 'rock', 'paper', 'scissors'
  // playerSelection is the index of the 'id' in the choices array, 0, 1, 2
  const playerSelection = choices.indexOf(this.id);

  // Add aqua border to player's choice
  choicesELs[playerSelection].classList.add('player-choice');

  const computerSelection = getComputerChoice();
  // Add coral border to computer's choice
  choicesELs[computerSelection].classList.add('computer-choice');

  // Show the result of the play
  resultEl.innerText = playOneRound(
    choices[playerSelection],
    choices[computerSelection]
  );
  resultEl.classList.add('show');

  // Update the scores
  computerScoreEl.innerText = computerScore;
  playerScoreEl.innerText = playerScore;

  // Check game score
  if (playerScore >= numberOfGames) {
    modalEl.showModal();
    modelTextEl.innerText = 'You win!';
  }
  if (computerScore >= numberOfGames) {
    modalEl.showModal();
    modelTextEl.innerText = 'You lose!';
  }
}

// Capture the click on choice elements and call the game function
choicesELs.forEach((choice) =>
  choice.addEventListener('click', game)
  // choice.addEventListener('click', game, { capture: true })
);

// Only clear choices colors and positions when the players mouseout
// This allows time for the user to understand the result of the play
choicesELs.forEach((choice) =>
  choice.addEventListener('mouseout', clearChoices)
);

// Modal 'Restart' button
closeModalEl.addEventListener('click', () => {
  modalEl.close();
  clearScores();
});
