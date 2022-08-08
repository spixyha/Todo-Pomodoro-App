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
let timeLeft = minutes * 60;
let roundsToStop = 2;
let timer;
let display;
let totalRounds = 0;
let minutesMemory = [];

function decreaseTime() {
    if (timeLeft !== 0) {
        timeLeft--;
        minutes = Math.floor(timeLeft / 60);
        seconds = timeLeft % 60;
    } else {
        if (roundsToStop !== 1) {
            timeLeft = breakMinutes * 60;
            roundsToStop--;
        } else {
            anotherRound.disabled = false;
            totalRounds++;
            updateDisplay();
            stopTimer();
        }
    }
}

function stopTimer() {
    clearInterval(timer);
    clearInterval(display);
}

function startTimer() {
    timer = setInterval(decreaseTime, 100);
    display = setInterval(updateDisplay, 100);
}

const updateMinutes = () => Math.floor(timeLeft / 60).toString().length === 2 ? Math.floor(timeLeft / 60) : `0${Math.floor(timeLeft / 60)}`;
const updateSeconds = () => (timeLeft % 60).toString().length === 2 ? timeLeft % 60 : `0${timeLeft % 60}`;


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
    timeLeft = minutes * 60;
    totalRounds = 0;
    roundsToStop = 2;
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
    timeLeft = minutesMemory[0] * 60;
    breakMinutes = minutesMemory[1];
    roundsToStop = 2;
    title.innerText = "Pomodoro Timer"
    startTimer();
    anotherRound.disabled = true;
})

workTimeForm.addEventListener("submit", e => {
    e.preventDefault();

    timeLeft = setTimeInput.value * 60;
    minutesMemory[0] = Math.floor(timeLeft / 60);
    updateDisplay();
    displayWork.innerText = `Working Time (${updateMinutes()}:${updateSeconds()})`;
    setTimeInput.value = "";
    console.log(minutesMemory);
})

breakTimeForm.addEventListener("submit", e => {
    e.preventDefault();

    breakMinutes = setBreakTimeInput.value;
    minutesMemory[1] = breakMinutes;
    displayBreak.innerText = `Break Time (${breakMinutes}:00)`;
    setBreakTimeInput.value = "";
    console.log(minutesMemory);
})