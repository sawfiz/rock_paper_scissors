// Global constants
const gamesToPlay = 5;
const choices = ['rock', 'paper', 'scissors'];

// Global function
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getPlayerChoice() {
  const rockEl = document.getElementById('rock');
  const paperEl = document.getElementById('paper');
  const scissorsEl = document.getElementById('scissors');

  return new Promise((resolve) => {
    rockEl.addEventListener('click', () => resolve('rock'));
    paperEl.addEventListener('click', () => resolve('paper'));
    scissorsEl.addEventListener('click', () => resolve('scissors'));
    //   replaces:  return prompt('rock, paper, scissors');
  });
}

async function displayPlay(winner, loser, winnerChoice, loserChoice) {
  if (winner === 'tie') {
    const tieEl = document.getElementById(`${winnerChoice}`);
    tieEl.classList.add('choice', 'player-choice', 'computer-choice');
    await delay(1000);
    tieEl.classList.remove('player-choice', 'computer-choice');
  } else {
    const winnerChoiceEl = document.getElementById(`${winnerChoice}`);
    winnerChoiceEl.classList.add('win');
    const loserChoiceEl = document.getElementById(`${loserChoice}`);
    loserChoiceEl.classList.add('lose');
    if (winner === 'player') {
      winnerChoiceEl.classList.add('player-choice');
      loserChoiceEl.classList.add('computer-choice');
    } else {
      winnerChoiceEl.classList.add('computer-choice');
      loserChoiceEl.classList.add('player-choice');
    }
    await delay(1000);
    winnerChoiceEl.classList.remove('win', 'player-choice', 'computer-choice');
    loserChoiceEl.classList.remove('lose', 'player-choice', 'computer-choice');
  }
}

function playRound() {
  const youWinSound = new Audio('sounds/youwin.mp3');
  const youLoseSound = new Audio('sounds/youlose.mp3');
  const tieSound = new Audio('sounds/tom.mp3');
  return new Promise((resolve) => {
    getPlayerChoice().then((playerChoice) => {
      const computerChoice = getComputerChoice();

      console.log('Player Choice:', playerChoice);
      console.log('Computer Choice:', computerChoice);

      // Tie game
      if (playerChoice === computerChoice) {
        console.log('Tie!');
        resolve('tie');
        tieSound.play();
        displayPlay('tie', 'tie', playerChoice);
      } else if (
        // Player wins
        (computerChoice === 'rock' && playerChoice === 'paper') ||
        (computerChoice === 'scissors' && playerChoice === 'rock') ||
        (computerChoice === 'paper' && playerChoice === 'scissors')
      ) {
        console.log('Player wins!');
        resolve('player');
        youWinSound.play();
        displayPlay('player', 'computer', playerChoice, computerChoice);
      } else {
        // Computer wins
        console.log('Computer wins!');
        resolve('computer');
        youLoseSound.play();
        displayPlay('computer', 'player', computerChoice, playerChoice);
      }
    });
  });
}

function updateDisplay(winner, playerScore, computerScore) {
  const resultEl = document.getElementById('result');
  resultEl.classList.add('show');
  resultEl.innerText = winner === 'tie' ? 'Tie!' : `${winner} wins!`;

  const playerScoreEl = document.getElementById('player-score');
  playerScoreEl.innerText = playerScore;

  const computerScoreEl = document.getElementById('computer-score');
  computerScoreEl.innerText = computerScore;
}

async function game() {
  let playerScore = 0;
  let computerScore = 0;
  let ties = 0;
  let gamesPlayed = 0;

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    while (gamesPlayed < gamesToPlay) {
      // eslint-disable-next-line no-await-in-loop, no-loop-func
      await playRound().then((winner) => {
        ties += winner === 'tie';
        playerScore += winner === 'player';
        computerScore += winner === 'computer';

        updateDisplay(winner, playerScore, computerScore);

        gamesPlayed += 1;
        console.log(ties, playerScore, computerScore);
        if (gamesPlayed >= gamesToPlay) {
          console.log(
            `Game Over.  Player: ${playerScore}  Computer: ${computerScore}  Ties: ${ties}`
          );
          resolve();
        }
      });
    }
  });
}

function resetScoresDisplay() {
  const playerScoreEl = document.getElementById('player-score');
  playerScoreEl.innerText = '0';

  const computerScoreEl = document.getElementById('computer-score');
  computerScoreEl.innerText = '0';
}

async function gameMaster() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop, no-loop-func
    await game().then(async () => {
      // eslint-disable-next-line no-alert
      await delay(500);
      alert('Play again?');
      resetScoresDisplay();
    });
  }
}

gameMaster();
