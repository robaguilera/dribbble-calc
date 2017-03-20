'use strict';

// init by cashing the DOM variables and adding event listeners
let clockBtn = document.querySelector('#js-start-clock');
let incrementExercise = document.querySelector('#js-increment-exercise');
let incrementSet = document.querySelector('#js-increment-set');
let decrementExericse = document.querySelector('#js-decrement-exercise');
let decrementSet = document.querySelector('#js-decrement-set');
let stopTimer = document.querySelector('#js-stop-clock');
let hour = document.querySelector('.hour');
let min = document.querySelector('.min');
let sec = document.querySelector('.sec');
let clockFlag = false;
let timerId;

clockBtn.addEventListener('click', toggleTimer);
stopTimer.addEventListener('click', stopClock);

incrementExercise.addEventListener('click', function() {
    incrementValue('exercise-total');
});

incrementSet.addEventListener('click', function() {
    incrementValue('set-total');
});

decrementExericse.addEventListener('click', function() {
    decrementValue('exercise-total');
});

decrementSet.addEventListener('click', function() {
    decrementValue('set-total')
});

let time = {
    currentHour: 0,
    currentMinute: 0,
    currentSecond: 0
}


function toggleTimer() {

    function startClock() {
        time.currentSecond += 1;
        if (time.currentSecond >= 59) {
            time.currentMinute += 1;
            time.currentSecond = 0
            min.textContent = time.currentMinute;
        }
        if (time.currentMinute >= 59) {
            time.currentHour += 1;
            time.currentSecond = 0;
            time.currentMinute = 0;
            hour.textContent = time.currentHour;
        }
        sec.textContent = time.currentSecond;
    }

    if (clockFlag === false) {
        clockBtn.textContent = 'Pause';
        timerId = setInterval(startClock, 1000)
        clockFlag = true;
    } else {
        clockBtn.textContent = 'Resume';
        clearInterval(timerId)
        timerId = null;
        clockFlag = false;
    }

}

function stopClock() {
    let pvHour = document.querySelector('.pv-hour');
    let pvMin = document.querySelector('.pv-min');
    let pvSec = document.querySelector('.pv-sec');
    pvHour.textContent = time.currentHour;
    pvMin.textContent = time.currentMinute;
    pvSec.textContent = time.currentSecond;
    clearInterval(timerId);
    // abstract into reset function
    time.currentSecond = 0;
    time.currentMinute = 0;
    time.currentHour = 0;
    hour.textContent = '00';
    min.textContent = '00';
    sec.textContent = '00';
    clockBtn.textContent = 'Start';
    clockFlag = false;
}

// increment and decrement the total values
function incrementValue(target) {
    let elTotal = document.getElementById(target);
    let total = parseInt(elTotal.textContent);
    total += 1;
    elTotal.textContent = total;
}

function decrementValue(target) {
    let elTotal = document.getElementById(target);
    let total = parseInt(elTotal.textContent);
    total -= 1;
    total <= 0 ? total = 0 : total = total;
    elTotal.textContent = total;
}
