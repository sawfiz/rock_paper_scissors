const choices = ['rock', 'paper', 'scissors'];
const gamesToPlay = 5;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getPlayerChoice() {
  return prompt('rock, paper, scissors');
}

function playRound() {
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();

  console.log('Player Choice: ', playerChoice);
  console.log('Computer Choice:', computerChoice);

  // Tie game
  if (playerChoice === computerChoice) {
    console.log('Tie!');
    return 'tie';
  }
  // Player wins
  if (
    (computerChoice === 'rock' && playerChoice === 'paper') ||
    (computerChoice === 'scissors' && playerChoice === 'rock') ||
    (computerChoice === 'paper' && playerChoice === 'scissors')
  ) {
    console.log('Player wins!');
    return 'player';
  }
  // Computer wins
  console.log('Computer wins!');
  return 'computer';
}

function game() {
  let playerScore = 0;
  let computerScore = 0;
  let ties = 0;
  let gamesPlayed = 0;

  while (gamesPlayed < gamesToPlay) {
    gamesPlayed += 1;
    console.log('Game', gamesPlayed);

    const winner = playRound();
    ties += winner === 'tie';
    playerScore += winner === 'player';
    computerScore += winner === 'computer';
  }

  console.log(`Game Over.  Player: ${playerScore}  Computer: ${computerScore}  Ties: ${ties}`);
}

game();
