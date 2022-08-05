const timerDisplay = document.getElementById("timerDisplay");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
const setTimeInput = document.getElementById("setTimeValue");
const title = document.getElementById("title");
const setBreakTimeInput = document.getElementById("setBreakTimeValue");
const breakTimeForm = document.getElementById("breakTimeForm");
const workTimeForm = document.getElementById("workTimeForm");
const displayWork = document.getElementById("displayWork");
const displayBreak = document.getElementById("displayBreak");
const anotherRound = document.getElementById("anotherRound");
const roundsDisplay = document.getElementById("rounds");

let minutes = 25;
let seconds = 0;
let breakMinutes = 5;
let roundsToStop = 2;
let timer;
let display;
let totalRounds = 0;
let minutesMemory = [];

function decreaseTime() {
    if (roundsToStop !== 0) {
        seconds--;
        if (seconds === -1) {
            minutes--;
            seconds = 59;
            if (minutes === -1) {
                roundsToStop--;
                if (roundsToStop !== 0) {
                    minutes = breakMinutes;
                    seconds = 0;
                } else {
                    minutes = 0;
                    seconds = 0;
                    totalRounds++;
                }
            }
        }
    } else {
        stopTimer();
        minutes = 25;
        seconds = 0;
        breakMinutes = 5;
        roundsToStop = 2;
    }
}

function stopTimer() {
    clearInterval(timer);
    clearInterval(display);
}

function startTimer() {
    timer = setInterval(decreaseTime, 10);
    display = setInterval(updateDisplay, 10);
}

const updateMinutes = () => minutes.toString().length === 2 ? minutes : `0${minutes}`;
const updateSeconds = () => seconds.toString().length === 2 ? seconds : `0${seconds}`;


function updateDisplay() {
    timerDisplay.innerText = `${updateMinutes()} : ${updateSeconds()}`;
    if (roundsToStop === 1) {
        title.innerHTML = `<span style="color:green;">Break Time</span> ${breakMinutes} min`;
    }
    roundsDisplay.innerText = `Total Rounds: ${totalRounds}`;
}

startButton.addEventListener("click", () => {
    if (!(minutes === 0 && seconds === 0)) {
        startTimer();
        startButton.disabled = true;
        stopButton.disabled = false;
        anotherRound.disabled = false;
    }
})
stopButton.addEventListener("click", () => {
    if (!(minutes === 0 && seconds === 0)) {
        stopTimer();
        startButton.disabled = false;
        stopButton.disabled = true;
    }
})

resetButton.addEventListener("click", () => {
    stopTimer();
    minutes = 25;
    breakMinutes = 5;
    seconds = 0;
    totalRounds = 0;
    minutesMemory = [];
    updateDisplay();
    title.innerText = "Pomodoro Timer"
    startButton.disabled = false;
    stopButton.disabled = false;
    displayWork.innerText = "";
    displayBreak.innerText = "";
    anotherRound.disabled = true;
})

anotherRound.addEventListener("click", () => {
    if (totalRounds !== 0) {
        minutes = minutesMemory[0];
        breakMinutes = minutesMemory[1];
        title.innerText = "Pomodoro Timer"
        startTimer();
    }
})

workTimeForm.addEventListener("submit", e => {
    e.preventDefault();

    minutes = setTimeInput.value;
    minutesMemory[0] = minutes;
    updateDisplay();
    displayWork.innerText = `Working Time (${updateMinutes()}:${updateSeconds()})`;
    setTimeInput.value = "";
})

breakTimeForm.addEventListener("submit", e => {
    e.preventDefault();

    breakMinutes = setBreakTimeInput.value;
    minutesMemory[1] = breakMinutes;
    displayBreak.innerText = `Break Time (${breakMinutes}:00)`;
    setBreakTimeInput.value = "";
})