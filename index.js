// Project: Rock Paper Scissors
// https://www.theodinproject.com/lessons/foundations-rock-paper-scissors

const choicesELs = Array.from(document.querySelectorAll(".choice"));
const resultEl = document.querySelector(".result");
const computerScoreEl = document.querySelector("#computer-score");
const playerScoreEl = document.querySelector("#player-score");

const choices = ["Rock", "Paper", "Scissors"];
const numberOfGames = 5;
let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    let index = Math.floor(Math.random() * choices.length);
    choicesELs[index].classList.add("computer-choice");
    return choices[index];
}

function playOneRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "Tie";
    }
    if (
        (playerSelection === "Rock" && computerSelection === "Scissors") ||
        (playerSelection === "Scissors" && computerSelection === "Paper") ||
        (playerSelection === "Paper" && computerSelection === "Rock")
    ) {
        playerScore++;
        choicesELs[choices.indexOf(playerSelection)].classList.add("win");
        choicesELs[choices.indexOf(computerSelection)].classList.add("lose");
        return `You Win! ${playerSelection} beats ${computerSelection}`;
    }
    if (
        (playerSelection === "Rock" && computerSelection === "Paper") ||
        (playerSelection === "Scissors" && computerSelection === "Rock") ||
        (playerSelection === "Paper" && computerSelection === "Scissors")
    ) {
        computerScore++;
        choicesELs[choices.indexOf(playerSelection)].classList.add("lose");
        choicesELs[choices.indexOf(computerSelection)].classList.add("win");
        return `You Lose! ${computerSelection} beats ${playerSelection}`;
    }
}

async function game(e) {
    clearChoices();
    await delay(100);

    playerSelection = this.id;
    choicesELs[choices.indexOf(playerSelection)].classList.add("player-choice");

    const computerSelection = getComputerChoice();
    resultEl.innerText = playOneRound(playerSelection, computerSelection);
    resultEl.style.cssText = "color: rgba(0, 0, 0, 1); text-shadow: 1px 1px 2px white";

    computerScoreEl.innerText = computerScore;
    playerScoreEl.innerText = playerScore;

    await delay(100);
    if (playerScore >= 5) {
        alert("You win!");
        clearScores();
        return;
    }
    if (computerScore >= 5) {
        alert("You lose!");
        clearScores();
        return;
    }
}

function clearChoices() {
    choicesELs.forEach((element) =>
        element.classList.remove("computer-choice", "player-choice", "win", "lose")
    );
    resultEl.style.cssText = "color: rgba(0,0,0,0); text-shadow: none";
}

function clearScores() {
    playerScore = 0;
    computerScore = 0;
    computerScoreEl.innerText = computerScore;
    playerScoreEl.innerText = playerScore;
}

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

choicesELs.forEach((element) =>
    element.addEventListener("mouseout", clearChoices)
);

choicesELs.forEach((choice) =>
    choice.addEventListener("click", game, { capture: true })
);
