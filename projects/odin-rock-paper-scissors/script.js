function getComputerChoice() {
    let num = Math.random();
    if (num <= 0.33) return "rock";
    else if (num <= 0.66) return "paper";
    else return "scissors";
}

function getHumanChoice() {
    return prompt("choose rock, paper, or scissors: ");
}

let humanScore = computerScore = 0;

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

function playGame() {
    for (let i = 0; i < 5; i++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();

        playRound(humanSelection, computerSelection);
    }
    console.log("Computer score: " + computerScore + "\nHuman score: " + humanScore);
    if (humanScore > computerScore) console.log("Human wins!"); else console.log("Computer wins!");
}