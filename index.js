// Project: Rock Paper Scissors
// https://www.theodinproject.com/lessons/foundations-rock-paper-scissors

const choices = ["rock", "paper", "scissors"];
const numberOfGames = 5;
let playerScore = 0;
let computerScore = 0;


function getPlayerChoice() {
    while (1) {
        input = prompt("Player choice (rock, paper scissors): ").toLowerCase();
        if (choices.includes(input)) {
            return input;
        }
    }
}


function getComputerChoice() {
    let index = Math.floor(Math.random() * choices.length)
    return choices[index]
}


function playOneRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "Tie"
    }
    if (((playerSelection === "rock") && (computerSelection === "scissors")) ||
        ((playerSelection === "scissors") && (computerSelection === "paper")) ||
        ((playerSelection === "paper") && (computerSelection === "rock"))) {
        playerScore++;
        return `You Win! ${playerSelection} beats ${computerSelection}`
    }
    if (((playerSelection === "rock") && (computerSelection === "paper")) ||
        ((playerSelection === "scissors") && (computerSelection === "rock")) ||
        ((playerSelection === "paper") && (computerSelection === "scissor"))) {
        computerScore++;
        return `You Lose! ${computerSelection} beats ${playerSelection}`
    }
}


function game() {
    for (let index = 0; index < numberOfGames; index++) {
        const playerSelection = getPlayerChoice();
        const computerSelection = getComputerChoice();
        console.log(`Player: ${playerSelection}, Computer: ${computerSelection}`)
        console.log(playOneRound(playerSelection.toLocaleLowerCase(), computerSelection))
        console.log(`Player score: ${playerScore}, Computer score: ${computerScore}`);
    }
}

game();
