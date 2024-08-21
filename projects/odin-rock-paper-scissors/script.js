function getComputerChoice() {
    let num = Math.random();
    if (num <= 0.33) return "rock";
    else if (num <= 0.66) return "paper";
    else return "scissors";
}

function getHumanChoice() {
    return prompt("choose rock, paper, or scissors: ");
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
    switch (humanChoice.toLowerCase()) {
        case "rock":
            switch (computerChoice.toLowerCase()) {
                case "paper":
                    console.log("You lose! Paper beats rock!");
                    computerScore += 1;
                    break;
                case "scissors":
                    console.log("You win! Rock beats scissors!");
                    humanScore += 1;
                    break;
                default:
                    console.log("You tied!");
                    break;
            }
            break;
        case "paper":
            switch (computerChoice.toLowerCase()) {
                case "scissors":
                    console.log("You lose! Scissors beats paper!");
                    computerScore += 1;
                    break;
                case "rock":
                    console.log("You win! Paper beats rock!");
                    humanScore += 1;
                    break;
                default:
                    console.log("You tied!");
                    break;
            }
            break;
        case "scissors":
            switch (computerChoice.toLowerCase()) {
                case "rock":
                    console.log("You lose! Rock beats scissors!");
                    computerScore += 1;
                    break;
                case "paper":
                    console.log("You win! Scissors beats paper!");
                    humanScore += 1;
                    break;
                default:
                    console.log("You tied!");
                    break;
            }
            break;
        default:
            console.log(humanChoice + " is not a valid option. Please try again!")
            break;
    }
}

let rockButton = document.createElement("button");
rockButton.textContent = "Rock";
rockButton.addEventListener("click", () => buttonClick("rock"));
let paperButton = document.createElement("button");
paperButton.textContent = "Paper";
paperButton.addEventListener("click", () => buttonClick("paper"));
let scissorsButton = document.createElement("button");
scissorsButton.textContent = "Scissors";
scissorsButton.addEventListener("click", () => buttonClick("scissors"));

let scoreText = document.createElement("div");
scoreText.textContent = "Computer score: 0 | Human score: 0"

let winnerText = document.createElement("div");

let body = document.querySelector("body");
body.append(rockButton, paperButton, scissorsButton, scoreText, winnerText);

function buttonClick(choice) {
    playRound(choice, getComputerChoice());

    scoreText.textContent = `Computer score: ${computerScore} | Human score: ${humanScore}`;

    function winState(winner) {
        winnerText.textContent = `${winner} wins!`
        rockButton.setAttribute("disabled", true);
        paperButton.setAttribute("disabled", true);
        scissorsButton.setAttribute("disabled", true);
    }
    if (computerScore >= 5) {
        winState("Computer");
    } else if (humanScore >= 5) {
        winState("Human");
    }
}