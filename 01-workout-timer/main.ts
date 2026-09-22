const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const sixtyButton = document.getElementById("sixty");
const ninetyButton = document.getElementById("ninety");
const hundredTwentyButton = document.getElementById("hundredtwenty");

let seconds = 90;
let isRunning = false;
let intervalId: ReturnType<typeof setInterval> | null = null;

const updateDisplay = () => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const displayMinutes = String(minutes).padStart(2, "0");
  const displaySeconds = String(remainingSeconds).padStart(2, "0");
  if (timerElement) {
    timerElement.textContent = `${displayMinutes}:${displaySeconds}`;
  }
};

const setTimer = (newSeconds: number) => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
  intervalId = null;
  isRunning = false;
  seconds = newSeconds;
  updateDisplay();
};

if (startButton) {
  startButton.addEventListener("click", () => {
    if (isRunning) {
      return;
    }
    isRunning = true;

    intervalId = setInterval(() => {
      seconds = seconds - 1;
      updateDisplay();

      if (seconds <= 0) {
        if (intervalId !== null) {
          clearInterval(intervalId);
        }
        intervalId = null;
        isRunning = false;
      }
    }, 1000);
  });
}

if (sixtyButton) {
  sixtyButton.addEventListener("click", () => {
    setTimer(60);
  });
}
if (ninetyButton) {
  ninetyButton.addEventListener("click", () => {
    setTimer(90);
  });
}
if (hundredTwentyButton) {
  hundredTwentyButton.addEventListener("click", () => {
    setTimer(120);
  });
}

if (resetButton) {
  resetButton.addEventListener("click", () => {
    setTimer(90);
  });
}
