function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function Moves(name, winsAgainst, losesAgainst) {
    let winsAgainstArray = winsAgainst;
    let losesAgainstArray = losesAgainst;
    choices.push(name);

    this.addWinsAgainst = function (move) {
        winsAgainstArray.push(move);
    };

    this.getWinsAgainst = function () {
        return winsAgainstArray;
    };

    this.getLosesAgainst = function () {
        return losesAgainstArray;
    };
}

const gameBtns = document.querySelectorAll(".gameview__btn");

const housePick = document.querySelector(".picks__house");
const playerPick = document.querySelector(".picks__player");

const picksView = document.querySelector(".picks");
const gameView = document.querySelector(".gameview");

const paper = document.querySelector(".gameview__btn--paper");
const rock = document.querySelector(".gameview__btn--rock");
const scissors = document.querySelector(".gameview__btn--scissors");

const choices = [];
const paperMove = new Moves("paper", ["rock"], ["scissors"]);
const rockMove = new Moves("rock", ["scissors"], ["paper"]);
const scissorsMove = new Moves("scissors", ["paper"], ["rock"]);

let houseDataId = null;
let playerDataId = null;

function loadDataIds() {
    paper.setAttribute("data-id", choices.indexOf("paper"));
    rock.setAttribute("data-id", choices.indexOf("rock"));
    scissors.setAttribute("data-id", choices.indexOf("scissors"));
}

document.addEventListener("DOMContentLoaded", loadDataIds);

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

async function match() {
    houseDataId = Math.floor(Math.random() * (choices.length - 1));
    playerDataId = this.getAttribute("data-id");

    gameView.classList.add("chosen");
    picksView.classList.add("active");

    let playerMove = choices[playerDataId];
    playerPick.appendChild(getButtonCopy(playerMove));

    await sleep(500);
    let houseMove = choices[houseDataId];
    housePick.appendChild(getButtonCopy(houseMove));
}

for (let i = 0; i < gameBtns.length; i++) {
    gameBtns[i].addEventListener("click", match);
}
