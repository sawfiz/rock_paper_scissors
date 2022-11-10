// Global constants
const gamesToPlay = 5;
const choices = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getPlayerChoice() {
  const rockEl = document.getElementById('rock');
  const paperEl = document.getElementById('paper');
  const scissorsEl = document.getElementById('scissors');

  return new Promise((resolve) => {
    rockEl.addEventListener('click', () => {
      resolve('rock');
    });
    paperEl.addEventListener('click', () => {
      resolve('paper');
    });
    scissorsEl.addEventListener('click', () => {
      resolve('scissors');
    });
    //   return prompt('rock, paper, scissors');
  });
}

function playRound() {
  let winner;
  return new Promise((resolve) => {
    getPlayerChoice().then((playerChoice) => {
      const computerChoice = getComputerChoice();

      console.log('Player Choice: ', playerChoice);
      console.log('Computer Choice:', computerChoice);

      // Tie game
      if (playerChoice === computerChoice) {
        console.log('Tie!');
        winner = 'tie';
      } else if (
        // Player wins
        (computerChoice === 'rock' && playerChoice === 'paper') ||
        (computerChoice === 'scissors' && playerChoice === 'rock') ||
        (computerChoice === 'paper' && playerChoice === 'scissors')
      ) {
        console.log('Player wins!');
        winner = 'player';
      } else {
        // Computer wins
        console.log('Computer wins!');
        winner = 'computer';
      }
      resolve(winner);
    });
  });
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

async function gameMaster() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    await game().then(() => {
      // eslint-disable-next-line no-alert
      alert('Play again?');
    });
  }
}

gameMaster();
