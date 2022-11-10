const gamesToPlay = 5;
let playerScore = 0;
let computerScore = 0;
let ties = 0;
let gamesPlayed = 0;

function resetScores() {
  playerScore = 0;
  computerScore = 0;
  ties = 0;
  gamesPlayed = 0;
}

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function getPlayerChoice(callback) {
  const rockEl = document.getElementById('rock');
  const paperEl = document.getElementById('paper');
  const scissorsEl = document.getElementById('scissors');

  rockEl.addEventListener('click', () => {
    callback('rock');
  });
  paperEl.addEventListener('click', () => {
    callback('paper');
  });
  scissorsEl.addEventListener('click', () => {
    callback('scissors');
  });

  //   return prompt('rock, paper, scissors');
}

function tallyScore(winner) {
  ties += winner === 'tie';
  playerScore += winner === 'player';
  computerScore += winner === 'computer';

  gamesPlayed += 1;
  console.log(ties, playerScore, computerScore);
  if (gamesPlayed >= gamesToPlay) {
    console.log(
      `Game Over.  Player: ${playerScore}  Computer: ${computerScore}  Ties: ${ties}`
    );
    alert('Play again?');
    resetScores();
  }
}

function playRound(playerChoice) {
  let winner;
  // const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();

  console.log('Player Choice: ', playerChoice);
  console.log('Computer Choice:', computerChoice);

  // Tie game
  if (playerChoice === computerChoice) {
    console.log('Tie!');
    winner = 'rock';
  } else if (
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
  tallyScore(winner);
}

function game() {
  getPlayerChoice(playRound);
}

game();
