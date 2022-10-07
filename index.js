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

const youWinEl = new Audio('sounds/youwin.mp3');
const youLoseEl = new Audio('sounds/youlose.mp3');
const tieEl = new Audio('sounds/tom.mp3');

const choices = ['Rock', 'Paper', 'Scissors'];
const numberOfGames = 5;
let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const index = Math.floor(Math.random() * choices.length);
  choicesELs[index].classList.add('computer-choice');
  return choices[index];
}

// eslint-disable-next-line consistent-return
function playOneRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    tieEl.play();
    return 'Tie';
  }
  if (
    (playerSelection === 'Rock' && computerSelection === 'Scissors') ||
    (playerSelection === 'Scissors' && computerSelection === 'Paper') ||
    (playerSelection === 'Paper' && computerSelection === 'Rock')
  ) {
    playerScore += 1;
    choicesELs[choices.indexOf(playerSelection)].classList.add('win');
    choicesELs[choices.indexOf(computerSelection)].classList.add('lose');
    youWinEl.play();
    return `You Win! ${playerSelection} beats ${computerSelection}`;
  }
  if (
    (playerSelection === 'Rock' && computerSelection === 'Paper') ||
    (playerSelection === 'Scissors' && computerSelection === 'Rock') ||
    (playerSelection === 'Paper' && computerSelection === 'Scissors')
  ) {
    computerScore += 1;
    choicesELs[choices.indexOf(playerSelection)].classList.add('lose');
    choicesELs[choices.indexOf(computerSelection)].classList.add('win');
    youLoseEl.play();
    return `You Lose! ${computerSelection} beats ${playerSelection}`;
  }
}

function clearScores() {
  playerScore = 0;
  computerScore = 0;
  computerScoreEl.innerText = computerScore;
  playerScoreEl.innerText = playerScore;
}

function clearChoices() {
  choicesELs.forEach((element) =>
    element.classList.remove('computer-choice', 'player-choice', 'win', 'lose')
  );
  resultEl.style.cssText = 'color: rgba(0,0,0,0); text-shadow: none';
}

function delay(time) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function game() {
  clearChoices();
  await delay(100);

  const playerSelection = this.id;
  choicesELs[choices.indexOf(playerSelection)].classList.add('player-choice');

  const computerSelection = getComputerChoice();
  resultEl.innerText = playOneRound(playerSelection, computerSelection);
  resultEl.style.cssText =
    'color: rgba(0, 0, 0, 1); text-shadow: 1px 1px 2px white';

  computerScoreEl.innerText = computerScore;
  playerScoreEl.innerText = playerScore;

  await delay(100);
  if (playerScore >= numberOfGames) {
    alert('You win!');
    clearScores();
  }
  if (computerScore >= numberOfGames) {
    alert('You lose!');
    clearScores();
  }
}

choicesELs.forEach((element) =>
  element.addEventListener('mouseout', clearChoices)
);

choicesELs.forEach((choice) =>
  choice.addEventListener('click', game, { capture: true })
);
