const rulesBtn = document.querySelector(".btn--rules");
const rules = document.querySelector(".rules");
const rulesClose = document.querySelector(".rules__close");
const gameView = document.querySelector(".gameview");

let rulesOpen = false;

rulesBtn.addEventListener("click", function () {
    rules.classList.add("active");
    rulesOpen = true;
});

rulesClose.addEventListener("click", function () {
    rules.classList.remove("active");
    rulesOpen = false;
});
