let mainHourText = document.getElementById("mainTimerHour")
let mainMinuteText = document.getElementById("mainTimerMinute")
let mainSecondText = document.getElementById("mainTimerSecond")
let mainMilliText = document.getElementById("mainTimerMilli")

let lapHourText = document.getElementById("lapTimerHour")
let lapMinuteText = document.getElementById("lapTimerMinute")
let lapSecondText = document.getElementById("lapTimerSecond")
let lapMilliText = document.getElementById("lapTimerMilli")

let splitBtn = document.getElementById("splitBtn")
let pauseBtn = document.getElementById("pauseBtn")
let startBtn = document.getElementById("startBtn")
let resetBtn = document.getElementById("resetBtn")

let lapList = document.getElementById("lapList")

let paused = false, count = 0
let timer
let h=0, m=0, s=0, ms=0
let lh=0, lm=0, ls=0, lms=0
let lapTime = ""
let totTime = ""

const resetLapList = () => {
    const l = lapList.children.length
    for(let i=l-1; i>=1; i--){
        lapList.children[i].remove()
    }
}

const updateLapUI = () => {
    lapHourText.innerHTML = lh < 10 ? ("0"+lh) : lh
    lapMinuteText.innerHTML = lm < 10 ? ("0"+lm) : lm
    lapSecondText.innerHTML = ls < 10 ? ("0"+ls) : ls
    lapMilliText.innerHTML = lms < 10 ? ("00"+lms) : lms < 100 ? ("0"+lms) : lms
}

const updateUI = () => {
    mainHourText.innerHTML = h < 10 ? ("0"+h) : h
    mainMinuteText.innerHTML = m < 10 ? ("0"+m) : m
    mainSecondText.innerHTML = s < 10 ? ("0"+s) : s
    mainMilliText.innerHTML = ms < 10 ? ("00"+ms) : ms < 100 ? ("0"+ms) : ms
}

const resetUI = () => {
    h=0, lh=0
    m=0, lm=0
    s=0, ls=0 
    ms=0, lms=0
    updateUI()
    updateLapUI()
    resetLapList()
}

const timerInterval = () => {
    if(!paused){
        // MAIN TIMER
        if(ms>=1000){
            s++;
            ms = 0
        }
        if(s>=60){
            m++;
            s = 0
        }
        if(m>=60){
            h++;
            m = 0
        }
        // LAP TIMER
        if(lms>=1000){
            ls++;
            lms = 0
        }
        if(ls>=60){
            lm++;
            ls = 0
        }
        if(lm>=60){
            lh++;
            lm = 0
        }
        updateUI()
        updateLapUI()
        ms += 10
        lms += 10
    }
}

const createLapItem = () => {
    lapTime = lh + ":" + lm + ":" + ls + ":" + lms
    totTime = h + ":" + m + ":" + s + ":" + ms
    let li = document.createElement("li")
    let span1 = document.createElement("span")
    let span2 = document.createElement("span")
    let span3 = document.createElement("span")
    span1.innerHTML = "#"+(count+1)
    span2.innerHTML = lapTime
    span3.innerHTML = totTime
    li.appendChild(span1)
    li.appendChild(span2)
    li.appendChild(span3)
    lapList.appendChild(li)
    count++;
}

const splitTImer = () => {
    createLapItem()
    lh=0
    lm=0
    ls=0
    lms=0
    updateLapUI()
}
const pauseTImer = () => {
    paused = true
    pauseBtn.style.display = "none"
    startBtn.style.display = "block"
    resetBtn.style.cursor = "pointer"
    clearInterval(timer);
    createLapItem()
}
const startTImer = () => {
    paused = false
    pauseBtn.style.display = "block"
    startBtn.style.display = "none"
    resetBtn.style.cursor = "no-drop"
    timer = setInterval(timerInterval, 10)
}
const resetTImer = () => {
    pauseBtn.style.display = "none"
    startBtn.style.display = "block"
    clearInterval(timer)
    timer = null
    resetUI()
}

splitBtn.addEventListener("click", () => {splitTImer()})
pauseBtn.addEventListener("click", () => {pauseTImer()})
startBtn.addEventListener("click", () => {startTImer()})
resetBtn.addEventListener("click", () => {paused && resetTImer()})