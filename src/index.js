/**
 * DOM SELECTORS
 */
const startButton = document.querySelector(".js-start-button");
const statusSpan = document.querySelector(".js-status");
const heading = document.querySelector(".js-heading");
const padContainer = document.querySelector(".js-pad-container");
const skillLevelSelect = document.querySelector(".js-skill-level");

/**
 * VARIABLES
 */
let computerSequence = [];
let playerSequence = [];
const maxRoundCount = 8;
let roundCount = 0;

const pads = [
    {
        color: "red",
        selector: document.querySelector(".js-pad-red"),
        sound: new Audio("../assets/simon-says-sound-1.mp3"),
    },
    {
        color: "green",
        selector: document.querySelector(".js-pad-green"),
        sound: new Audio("../assets/simon-says-sound-2.mp3"),
    },
    {
        color: "blue",
        selector: document.querySelector(".js-pad-blue"),
        sound: new Audio("../assets/simon-says-sound-3.mp3"),
    },
    {
        color: "yellow",
        selector: document.querySelector(".js-pad-yellow"),
        sound: new Audio("../assets/simon-says-sound-4.mp3"),
    },
];

/**
 * EVENT LISTENERS
 */
padContainer.addEventListener("click", padHandler);
startButton.addEventListener("click", startButtonHandler);

skillLevelSelect.addEventListener('change', function() {
    const selectedSkillLevel = this.value;
    setLevel(selectedSkillLevel);
});

/**
 * EVENT HANDLERS
 */
function startButtonHandler() {
    roundCount = 1;
    startButton.classList.add('hidden');
    statusSpan.classList.remove('hidden');
    playComputerTurn();
}

function padHandler(event) {
    const { color } = event.target.dataset;
    if (!color) return;
    const pad = pads.find(pad => pad.color === color);
    if (pad && pad.sound) {
        pad.sound.play();
    }
    checkPress(color);
}

function setLevel(level) {
    const levelInt = parseInt(level, 10);
    if (levelInt >= 1 && levelInt <= 4) {
        return maxRoundCount;
    }
    return "Please enter level 1, 2, 3, or 4";
}

/**
 * GAME LOGIC FUNCTIONS
 */
function getRandomItem(collection) {
    if (collection.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * collection.length);
    return collection[randomIndex];
}

function setText(element, text) {
    element.textContent = text;
    return element;
}

function activatePad(color) {
    const pad = pads.find(pad => pad.color === color);
    if (pad) {
        pad.sound.play(); // Play the sound associated with the pad
        pad.selector.classList.add("activated");
        setTimeout(() => {
            pad.selector.classList.remove("activated");
        }, 500);
    }
}

function activatePads(sequence) {
    sequence.forEach((color, index) => {
        const delay = 600 * (index + 1);
        setTimeout(() => {
            activatePad(color);
        }, delay);
    });
}

function playComputerTurn() {
    padContainer.classList.add('unclickable');
    statusSpan.textContent = "The computer's turn...";
    heading.textContent = `Round ${roundCount} of ${maxRoundCount}`;
    const randomPad = getRandomItem(pads);
    computerSequence.push(randomPad.color);
    activatePads(computerSequence);
    setTimeout(() => {
        padContainer.classList.remove('unclickable');
        playHumanTurn();
    }, computerSequence.length * 600 + 1000);
}

function playHumanTurn() {
    padContainer.classList.remove('unclickable');
    const pressesLeft = computerSequence.length - playerSequence.length;
    statusSpan.textContent = `You have ${pressesLeft} press${pressesLeft === 1 ? '' : 'es'} left`;
}

function checkPress(color) {
    playerSequence.push(color);
    const index = playerSequence.length - 1;
    const remainingPresses = computerSequence.length - playerSequence.length;
    statusSpan.textContent = `Presses remaining: ${remainingPresses}`;
    if (computerSequence[index] !== playerSequence[index]) {
        resetGame('Oops! Wrong sequence. Try again.');
        return;
    }
    if (remainingPresses === 0) {
        checkRound();
    }
}

function checkRound() {
    if (roundCount === maxRoundCount) {
        resetGame('Congratulations! You have completed all the rounds!');
    } else {
        roundCount++;
        playerSequence = [];
        statusSpan.textContent = 'Nice! Keep going!';
        setTimeout(playComputerTurn, 1000);
    }
}

function resetGame(message) {
    alert(message);
    setText(heading, "Simon Says");
    startButton.classList.remove("hidden");
    statusSpan.classList.add("hidden");
    padContainer.classList.add("unclickable");
    computerSequence = [];
    playerSequence = [];
    roundCount = 0;
}

/**
 * INITIALIZATION
 */
document.addEventListener('DOMContentLoaded', () => {
    skillLevelSelect.addEventListener('change', function() {
        const selectedSkillLevel = this.value;
        setLevel(selectedSkillLevel);
    });
});
/**
  * Please do not modify the code below.
  * Used for testing purposes.
  *
  */
window.statusSpan = statusSpan;
window.heading = heading;
window.padContainer = padContainer;
window.pads = pads;
window.computerSequence = computerSequence;
window.playerSequence = playerSequence;
window.maxRoundCount = maxRoundCount;
window.roundCount = roundCount;
window.startButtonHandler = startButtonHandler;
window.padHandler = padHandler;
window.setLevel = setLevel;
window.getRandomItem = getRandomItem;
window.setText = setText;
window.activatePad = activatePad;
window.activatePads = activatePads;
window.playComputerTurn = playComputerTurn;
window.playHumanTurn = playHumanTurn;
window.checkPress = checkPress;
window.checkRound = checkRound;
window.resetGame = resetGame;