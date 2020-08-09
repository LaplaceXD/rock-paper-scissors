function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function MoveData(winsAgainst, losesAgainst) {
    this.winsAgainst = [...winsAgainst];
    this.losesAgainst = [...losesAgainst];
}

let hardMode = true;
const hardBtn = document.querySelector(".difficulty__btn--hard");
const easyBtn = document.querySelector(".difficulty__btn--easy");
const hardRules = document.querySelector(".rules__hard");
const easyRules = document.querySelector(".rules__easy");

let score = 0;
const scoreBoard = document.querySelector(".scoreboard");
const scoreDisplay = document.querySelector(".scoreboard__score");
const resetScore = document.querySelector(".reset-score");
const saveScoreYes = document.querySelector(".save__btn--yes");
const saveScoreNo = document.querySelector(".save__btn--no");

const gameBtns = document.querySelectorAll(".gameview__btn");
const paper = document.querySelector(".gameview__btn--paper");
const rock = document.querySelector(".gameview__btn--rock");
const scissors = document.querySelector(".gameview__btn--scissors");
const spock = document.querySelector(".gameview__btn--spock");
const lizard = document.querySelector(".gameview__btn--lizard");

const backdropConnector = document.querySelector(".gameview__connector");
const gameView = document.querySelector(".gameview");
const picksView = document.querySelector(".picks");

const housePick = document.querySelector(".picks__house");
const playerPick = document.querySelector(".picks__player");

const easyChoices = ["rock", "paper", "scissors"];
const choices = [...easyChoices, "spock", "lizard"];
const paperData = new MoveData(["rock", "spock"], ["scissors", "lizard"]);
const rockData = new MoveData(["scissors", "lizard"], ["paper", "spock"]);
const scissorsData = new MoveData(["paper", "lizard"], ["rock", "spock"]);
const spockData = new MoveData(["scissors", "rock"], ["paper", "lizard"]);
const lizardData = new MoveData(["spock", "paper"], ["scissors", "rock"]);

let houseDataId = null;
let houseMoveBtn = null;
let playerDataId = null;
let playerMoveBtn = null;

const roundOver = document.querySelector(".round-over");
const roundOverStatus = document.querySelector(".round-over__status");
const roundOverBtn = document.querySelector(".round-over__btn");
const playAgainBtn = document.querySelector(".round-over__btn");

function loadData() {
    for (let i = 0; i < gameBtns.length; i++) {
        gameBtns[i].addEventListener("click", match);
    }

    if (localStorage.getItem("score") != "string") score = 0;

    if (localStorage.getItem("save") != "string")
        localStorage.setItem("save", "true");

    if (localStorage.getItem("save") == "true")
        score = localStorage.getItem("score");

    scoreDisplay.textContent = score;
    for (let btn of gameBtns) btn.classList.add("pop");

    paper.setAttribute("data-id", choices.indexOf("paper"));
    rock.setAttribute("data-id", choices.indexOf("rock"));
    scissors.setAttribute("data-id", choices.indexOf("scissors"));
    lizard.setAttribute("data-id", choices.indexOf("lizard"));
    spock.setAttribute("data-id", choices.indexOf("spock"));
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

document.addEventListener("DOMContentLoaded", loadData);

easyBtn.addEventListener("click", function () {
    scoreBoard.classList.remove("hard-active");
    gameView.classList.remove("hard-active");
    easyBtn.classList.add("active");
    hardBtn.classList.remove("active");
    easyRules.classList.add("active");
    hardRules.classList.remove("active");

    hardMode = false;
});

hardBtn.addEventListener("click", function () {
    scoreBoard.classList.add("hard-active");
    gameView.classList.add("hard-active");
    easyBtn.classList.remove("active");
    hardBtn.classList.add("active");
    hardRules.classList.add("active");
    easyRules.classList.remove("active");

    hardMode = true;
});

resetScore.addEventListener("click", function () {
    score = 0;
    localStorage.setItem("score", score);
    scoreDisplay.textContent = score;
});
saveScoreYes.addEventListener("click", function () {
    saveScoreYes.classList.add("active");
    saveScoreNo.classList.remove("active");
    localStorage.setItem("save", "true");
});
saveScoreNo.addEventListener("click", function () {
    saveScoreYes.classList.remove("active");
    saveScoreNo.classList.add("active");
    localStorage.setItem("save", "false");
});

function restartGame() {
    initiateRoundOver(false);
    for (let btn of gameBtns) btn.classList.add("pop");

    housePick.classList.remove("won");
    playerPick.classList.remove("won");
    gameView.classList.remove("has-chosen");
    picksView.classList.remove("active");

    playerPick.removeChild(playerMoveBtn);
    housePick.removeChild(houseMoveBtn);

    houseDataId = null;
    houseMoveBtn = null;
    playerDataId = null;
    playerMoveBtn = null;

    for (let i = 0; i < gameBtns.length; i++) {
        gameBtns[i].addEventListener("click", match);
    }
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
        case "spock":
            return createButtonCopy(spock);
        case "lizard":
            return createButtonCopy(lizard);
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
            case "spock":
                return spockData;
            case "lizard":
                return lizardData;
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
            playerPick.classList.add("won");
            roundOverStatus.textContent = "You Win";
            break;
        case "draw":
            roundOverStatus.textContent = "draw";
            break;
        case "lose":
            score--;
            housePick.classList.add("won");
            roundOverStatus.textContent = "You Lose";
            break;
    }

    if (localStorage.getItem("save") == "true")
        localStorage.setItem("score", score);

    scoreDisplay.textContent = score;
    initiateRoundOver(true);
}

async function match() {
    for (let i = 0; i < gameBtns.length; i++) {
        gameBtns[i].removeEventListener("click", match);
    }

    if (hardMode) houseDataId = Math.floor(Math.random() * choices.length);
    else houseDataId = Math.floor(Math.random() * easyChoices.length);

    playerDataId = this.getAttribute("data-id");

    for (let btn of gameBtns) btn.classList.remove("pop");
    await sleep(200);
    gameView.classList.add("has-chosen");
    await sleep(300);
    picksView.classList.add("active");

    let playerMove = choices[playerDataId];
    playerMoveBtn = getButtonCopy(playerMove);
    playerMoveBtn.classList.add("active");
    playerPick.appendChild(playerMoveBtn);
    await sleep(50);
    playerMoveBtn.classList.add("pop");

    await sleep(500);
    let houseMove = choices[houseDataId];
    houseMoveBtn = getButtonCopy(houseMove);
    houseMoveBtn.classList.add("active");
    housePick.appendChild(houseMoveBtn);
    await sleep(300);
    houseMoveBtn.classList.add("pop");

    let status = compareMoves();
    await sleep(500);
    createDecision(status);
}
