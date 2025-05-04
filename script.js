let [hours, minutes, seconds] = [0, 0, 0];
let timer = null;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function updateDisplay() {
  let h = hours < 10 ? '0' + hours : hours;
  let m = minutes < 10 ? '0' + minutes : minutes;
  let s = seconds < 10 ? '0' + seconds : seconds;
  display.innerText = `${h}:${m}:${s}`;
}

function startTimer() {
  if (timer !== null) return;

  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
  laps.innerHTML = '';
}

function addLap() {
  let lapTime = display.innerText;
  const li = document.createElement('li');
  li.textContent = `Lap: ${lapTime}`;
  laps.appendChild(li);
}

startBtn.onclick = startTimer;
pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;
lapBtn.onclick = addLap;
