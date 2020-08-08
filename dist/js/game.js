function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function MoveData(name, winsAgainst, losesAgainst) {
    this.name = name;
    this.winsAgainst = [...winsAgainst];
    this.losesAgainst = [...losesAgainst];
    choices.push(name);
}

let score = 0;
const scoreDisplay = document.querySelector(".scoreboard__score");

const playAgainBtn = document.querySelector(".round-over__btn");
const gameBtns = document.querySelectorAll(".gameview__btn");

const housePick = document.querySelector(".picks__house");
const playerPick = document.querySelector(".picks__player");

const picksView = document.querySelector(".picks");
const gameView = document.querySelector(".gameview");

const paper = document.querySelector(".gameview__btn--paper");
const rock = document.querySelector(".gameview__btn--rock");
const scissors = document.querySelector(".gameview__btn--scissors");

const choices = [];
const paperData = new MoveData("paper", ["rock"], ["scissors"]);
const rockData = new MoveData("rock", ["scissors"], ["paper"]);
const scissorsData = new MoveData("scissors", ["paper"], ["rock"]);

let houseDataId = null;
let houseMoveBtn = null;
let playerDataId = null;
let playerMoveBtn = null;

const roundOver = document.querySelector(".round-over");
const roundOverStatus = document.querySelector(".round-over__status");
const roundOverBtn = document.querySelector(".round-over__btn");

function loadDataIds() {
    scoreDisplay.textContent = score;
    for (let btn of gameBtns) btn.classList.add("pop");

    paper.setAttribute("data-id", choices.indexOf("paper"));
    rock.setAttribute("data-id", choices.indexOf("rock"));
    scissors.setAttribute("data-id", choices.indexOf("scissors"));
}

function initiateRoundOver(roundIsOver) {
    if (roundIsOver) {
        roundOver.classList.add("active");
        roundOverStatus.classList.add("pop");
        roundOverBtn.classList.add("pop");
    } else {
        roundOver.classList.remove("active");
        roundOverStatus.classList.remove("pop");
        roundOverBtn.classList.remove("pop");
    }
}

document.addEventListener("DOMContentLoaded", loadDataIds);

function restartGame() {
    initiateRoundOver(false);
    for (let btn of gameBtns) btn.classList.add("pop");

    gameView.classList.remove("has-chosen");
    picksView.classList.remove("active");

    playerPick.removeChild(playerMoveBtn);
    housePick.removeChild(houseMoveBtn);

    houseDataId = null;
    houseMoveBtn = null;
    playerDataId = null;
    playerMoveBtn = null;
}

playAgainBtn.addEventListener("click", restartGame);

function getButtonCopy(move) {
    function createButtonCopy(orignal) {
        let button = document.createElement("button");
        button.className = `${orignal.className}`;
        button.innerHTML = `${orignal.innerHTML}`;
        return button;
    }

    switch (move) {
        case "paper":
            return createButtonCopy(paper);
        case "rock":
            return createButtonCopy(rock);
        case "scissors":
            return createButtonCopy(scissors);
    }
}

function compareMoves() {
    function getMoveData(dataid) {
        let move = choices[dataid];

        switch (move) {
            case "paper":
                return paperData;
            case "rock":
                return rockData;
            case "scissors":
                return scissorsData;
        }
    }

    let playerMoveData = getMoveData(playerDataId);

    if (playerMoveData.losesAgainst.some((n) => n == choices[houseDataId]))
        return "lose";
    else if (playerMoveData.winsAgainst.some((n) => n == choices[houseDataId]))
        return "win";

    return "draw";
}

function createDecision(status) {
    switch (status) {
        case "win":
            score++;
            roundOverStatus.textContent = "You Win";
            break;
        case "draw":
            roundOverStatus.textContent = "draw";
            break;
        case "lose":
            score--;
            roundOverStatus.textContent = "You Lose";
            break;
    }

    scoreDisplay.textContent = score;
    initiateRoundOver(true);
}

async function match() {
    houseDataId = Math.floor(Math.random() * choices.length);
    playerDataId = this.getAttribute("data-id");

    for(let btn of gameBtns)
        btn.classList.remove("pop");
    await sleep(200);
    gameView.classList.add("has-chosen");
    picksView.classList.add("active");

    let playerMove = choices[playerDataId];
    playerMoveBtn = getButtonCopy(playerMove);
    playerPick.appendChild(playerMoveBtn);
    await sleep(100);
    playerMoveBtn.classList.add("pop");

    await sleep(500);
    let houseMove = choices[houseDataId];
    houseMoveBtn = getButtonCopy(houseMove);
    housePick.appendChild(houseMoveBtn);
    await sleep(300);
    houseMoveBtn.classList.add("pop");

    let status = compareMoves();
    await sleep(500);
    createDecision(status);
}

for (let i = 0; i < gameBtns.length; i++) {
    gameBtns[i].addEventListener("click", match);
}
