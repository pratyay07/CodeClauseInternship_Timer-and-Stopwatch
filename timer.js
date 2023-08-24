let hourText = document.getElementById("hour")
let minuteText = document.getElementById("minute")
let secondText = document.getElementById("second")

let hourInput = document.getElementById("hourInput")
let minuteInput = document.getElementById("minuteInput")
let secondInput = document.getElementById("secondInput")

let editTimerContainer = document.getElementById("editTimer")

let editBtn = document.getElementById("editBtn")
let pauseBtn = document.getElementById("pauseBtn")
let startBtn = document.getElementById("startBtn")
let resetBtn = document.getElementById("resetBtn")
let setTimerBtn = document.getElementById("setTimer")
let clearTimerBtn = document.getElementById("clearTimer")
let editTimerCloseBtn = document.getElementById("editTimerCloseBtn")

let paused = false;
let timer;

var alarmSound = 'sounds/mixkit-alert-alarm-1005.wav';

const playAlarmSound = () => {
  var audio = new Audio(alarmSound);
  audio.play();
}

const getMilliSeconds = () => {
    let h = Number(hourText.innerHTML)
    let m = Number(minuteText.innerHTML)
    let s = Number(secondText.innerHTML)
    return ((h*60*60+m*60+s)*1000)
}


const timerInterval = (countDownTime) => {
    if(!paused){
        var now = new Date().getTime()
        var interval = countDownTime - now
        let h = Number(hourText.innerHTML)
        let m = Number(minuteText.innerHTML)
        let s = Number(secondText.innerHTML)
        h = Math.floor(interval / (1000 * 60 * 60));
        m = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
        s = Math.floor((interval % (1000 * 60)) / 1000);
        hourText.innerHTML = h < 10 ? ("0"+h) : h
        minuteText.innerHTML = m < 10 ? ("0"+m) : m
        secondText.innerHTML = s < 10 ? ("0"+s) : s
        if (interval <= 0) {
            clearInterval(timer);
            timer = null
            paused = true
            setTimeout(()=>{
                resetTimer()
            }, 7000)
            hourText.innerHTML = "00"
            minuteText.innerHTML = "00"
            secondText.innerHTML = "00"
            playAlarmSound()
        }
    }
}

const syncUI = () => {
    let h = Number(hourInput.value)
    let m = Number(minuteInput.value)
    let s = Number(secondInput.value)
    hourText.innerHTML = h < 10 ? ("0"+h) : h
    minuteText.innerHTML = m < 10 ? ("0"+m) : m
    secondText.innerHTML = s < 10 ? ("0"+s) : s
}

const showHideEditTimer = () => {
    if(editTimerContainer.style.display == "none") editTimerContainer.style.display = "flex"
    else editTimerContainer.style.display = "none"
}

const editTimer = () => {
    showHideEditTimer()
}
const pauseTimer = () => {
    paused = true;
    pauseBtn.style.display = "none"
    startBtn.style.display = "block"
    resetBtn.style.cursor = "pointer"
    clearInterval(timer);
}
const startTimer = () => {
    paused = false
    pauseBtn.style.display = "block"
    startBtn.style.display = "none"
    resetBtn.style.cursor = "no-drop"
    var countDownTime = Date.now() + getMilliSeconds()
    timer = setInterval(timerInterval, 1000, countDownTime)
}
const resetTimer = () => {
    pauseBtn.style.display = "none"
    startBtn.style.display = "block"
    clearInterval(timer)
    timer = null
    syncUI()
}
const setTimer = () => {
    syncUI()
    showHideEditTimer()
}
const clearTimer = () => {
    hourInput.value = 0
    minuteInput.value = 0
    secondInput.value = 0
    syncUI()
}

editBtn.addEventListener("click", () => {
    editTimer()
})
pauseBtn.addEventListener("click", () => pauseTimer())
startBtn.addEventListener("click", () => {
    if(Number(hourText.innerHTML)>0 || Number(minuteText.innerHTML) > 0 || Number(secondText.innerHTML) > 0) startTimer()
})
resetBtn.addEventListener("click", () => {
    paused && resetTimer()
})
setTimerBtn.addEventListener("click", () => setTimer())
clearTimerBtn.addEventListener("click", () => clearTimer())
editTimerCloseBtn.addEventListener("click", () => showHideEditTimer())


setTimer()