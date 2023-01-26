// Variables for buttons

const startStopBtn = document.querySelector("#startStopBtn");
const resetBtn = document.querySelector("#resetBtn");
const lapBtn = document.querySelector("#lapBtn");

// Variables for time values

let seconds = 0;
let minutes = 0;
let hours = 0;

// Variables for leading zero

let leadingSeconds = 0;
let leadingMinutes = 0;
let leadingHours = 0;

// Variables for set interval and timer status

let timerInterval = null;

let timerStatus = "stopped";

// Array to store lap times
let lapTimes = [];

// Lap display
let lapDisplay = document.getElementById("lap-times");

// **************************************************************************************
// Stop watch function

function stopWatch() {
    seconds++;

    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++;

        if (minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }

        if (hours === 100) {
            reset();
        }
    }

    if (seconds < 10) {
        leadingSeconds = "0" + seconds.toString();
    } else {
        leadingSeconds = seconds;
    }

    if (minutes < 10) {
        leadingMinutes = "0" + minutes.toString();
    } else {
        leadingMinutes = minutes;
    }

    if (hours < 10) {
        leadingHours = "0" + hours.toString();
    } else {
        leadingHours = hours;
    }

    let displayTimer = (document.getElementById("timer").innerText =
        leadingHours + ":" + leadingMinutes + ":" + leadingSeconds);
}
// **************************************************************************************

startStopBtn.addEventListener("click", function () {
    if (timerStatus === "stopped") {
        timerInterval = window.setInterval(stopWatch, 1000);
        document.getElementById("startStopBtn").innerHTML =
            '<i class="fa-solid fa-pause" id="pause"></i>';
        timerStatus = "started";
    } else {
        window.clearInterval(timerInterval);
        document.getElementById("startStopBtn").innerHTML =
            '<i class="fa-solid fa-play" id="play"></i>';
        timerStatus = "stopped";
    }
});

//  reset timer function
// **************************************************************************************
function reset() {
    window.clearInterval(timerInterval);

    seconds = 0;
    minutes = 0;
    hours = 0;

    document.getElementById("timer").innerHTML = "00:00:00";
    document.getElementById("startStopBtn").innerHTML =
        '<i class="fa-solid fa-play" id="play"></i>';
    timerStatus = "stopped";

    // Reset lap times and lap display
    lapTimes = [];
    // --------------------------------------------------
    // let lapDisplay = document.getElementById("lap-times");
    lapDisplay.innerHTML = "";
}
// **************************************************************************************

// Reset Event

resetBtn.addEventListener("click", reset);

// Lap Event

lapBtn.addEventListener("click", function () {
    if (timerStatus === "started" && lapTimes.length < 5) {
        // Format lap time
        let lapTime =
            leadingHours + ":" + leadingMinutes + ":" + leadingSeconds;
        lapTimes.push(lapTime);

        // Display lap times
        // --------------------------------------------------
        lapDisplay.innerHTML = "";
        for (let i = 0; i < lapTimes.length; i++) {
            lapDisplay.innerHTML +=
                "<li>Lap " + (i + 1) + ": " + lapTimes[i] + "</li>";
        }
    }
});
