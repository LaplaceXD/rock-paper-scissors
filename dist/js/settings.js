const settingsBtn = document.querySelector(".btn--settings");
const settings = document.querySelector(".settings");
const settingsClose = document.querySelector(".settings__close");
const gameView = document.querySelector(".gameview");

let settingsOpen = false;

settingsBtn.addEventListener("click", function () {
    settings.classList.add("active");
    settingsOpen = true;
});

settingsClose.addEventListener("click", function () {
    settings.classList.remove("active");
    settingsOpen = false;
});
