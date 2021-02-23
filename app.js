//initializing UI with the elements
const ui = new UI(
  document.getElementById("start-button"),
  document.getElementById("pause-button"),
  document.getElementById("reset-button"),
  document.getElementById("timer-display")
);

//initializing timer
const timer = new Timer();

//timer constructor
function Timer() {
  this.startTime = 0;
  this.elapsedTime = 0;
  this.timerInterval;
}

//start stopwatch
Timer.prototype.start = function () {
  ui.startBtn.disabled = true;
  console.log(ui.startBtn);
  this.startTime = Date.now() - this.elapsedTime;
  this.timerInterval = setInterval(() => {
    this.elapsedTime = Date.now() - this.startTime;
    ui.display(ui.convertToString(this.elapsedTime));
  }, 10);
};

//pause stopwatch
Timer.prototype.pause = function () {
  ui.startBtn.disabled = false;
  clearInterval(this.timerInterval);
};

//reset stopwatch
Timer.prototype.reset = function () {
  clearInterval(this.timerInterval);
  this.elapsedTime = 0;
  ui.display("00:00:00");
};

//UI constructor
function UI(startBtn, pauseBtn, resetBtn, timerDisplay) {
  this.startBtn = startBtn;
  this.pauseBtn = pauseBtn;
  this.resetBtn = resetBtn;
  this.timerDisplay = timerDisplay;
  this.startBtn.addEventListener("click", () => {
    timer.start();
  });
  this.pauseBtn.addEventListener("click", () => {
    timer.pause();
  });
  this.resetBtn.addEventListener("click", () => {
    timer.reset();
  });
}

//display timer
UI.prototype.display = function (displayTime) {
  this.timerDisplay.innerHTML = displayTime;
};

//convert time to string
UI.prototype.convertToString = function (time) {
  let hours = time / 3600000;
  let roundedHour = Math.floor(hours);

  let minutes = (hours - roundedHour) * 60;
  let roundedMinutes = Math.floor(minutes);

  let seconds = (minutes - roundedMinutes) * 60;
  let roundedSeconds = Math.floor(seconds);

  let miliSec = (seconds - roundedSeconds) * 100;
  let roundedMs = Math.floor(miliSec);

  let formattedMin = roundedMinutes.toString().padStart(2, "0");
  let formattedSec = roundedSeconds.toString().padStart(2, "0");
  let formattedMs = roundedMs.toString().padStart(2, "0");

  return formattedMin + ":" + formattedSec + ":" + formattedMs;
};
