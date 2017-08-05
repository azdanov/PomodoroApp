import { toggleActionButton } from './scripts'

export let status
const canvas = document.getElementById('timer')
const canvasSize = 640
canvas.width = canvasSize * 2
canvas.height = canvasSize * 2
canvas.style.width = `${canvasSize}px`
canvas.style.height = `${canvasSize}px`

const context = canvas.getContext('2d')
context.scale(2, 2)
const start = 4.72
const centerWidth = canvasSize / 2
const centerHeight = canvasSize / 2
const arcWidth = 140
let mainTime
let shortTime
let longTime
let diff
let bar

let elapsedSeconds = 0
let count = 1
const colors = {
  active: {
    secondaryColor: '#7986cb',
    mainColor: '#37474f',
    backgroundColor: '#eceff1'
  },
  break: {
    secondaryColor: '#37474f',
    mainColor: '#7986cb',
    backgroundColor: '#eceff1'
  }
}

const cycleEvent = new Event('cycle')

function formatTime (seconds) {
  return new Date(seconds * 1000).toISOString().substr(14, 5)
}

function progressBar (mainTime, shortTime, longTime) {
  let timeLength
  if (count === 4) {
    timeLength = longTime
  } else if (count % 2 === 1) {
    timeLength = mainTime
  } else {
    timeLength = shortTime
  }

  diff = (elapsedSeconds / timeLength) * Math.PI * 2
  context.clearRect(0, 0, 640, 640)
  context.beginPath()
  context.lineWidth = 30
  context.arc(centerWidth, centerHeight, arcWidth, 0, 2 * Math.PI, false)
  context.fillStyle = colors.active.backgroundColor
  context.fill()
  context.strokeStyle = count % 2 === 1 ? colors.active.secondaryColor : colors.break.secondaryColor
  context.stroke()
  context.fillStyle = colors.active.mainColor
  context.strokeStyle = count % 2 === 1 ? colors.active.mainColor : colors.break.mainColor
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.lineWidth = 30
  context.font = '5em monospace'
  context.beginPath()
  context.arc(centerWidth, centerHeight, arcWidth, start, diff + start, false)
  context.stroke()

  context.fillText(formatTime(timeLength - elapsedSeconds), centerWidth, centerHeight)

  if (elapsedSeconds >= timeLength) {
    clearTimeout(bar)

    status = 'done'

    if (++count === 5) {
      count = 1
    }

    document.dispatchEvent(cycleEvent)
  }
  elapsedSeconds++
}

export function updateTimes () {
  mainTime = document.getElementById('mainTime').value * 60
  shortTime = document.getElementById('shortTime').value * 60
  longTime = document.getElementById('longTime').value * 60
}

export function resetTimes () {
  mainTime = 25 * 60
  shortTime = 5 * 60
  longTime = 10 * 60
}

const timer = {
  start () {
    updateTimes()
    status = 'on'
    progressBar(mainTime, shortTime, longTime)
    bar = setInterval(progressBar.bind(null, mainTime, shortTime, longTime), 1000)
  },
  toggle () {
    toggleActionButton()

    if (status === 'on') {
      clearTimeout(bar)
      status = 'off'
    } else if (status === 'off') {
      progressBar(mainTime, shortTime, longTime)
      bar = setInterval(progressBar.bind(null, mainTime, shortTime, longTime), 1000)
      status = 'on'
    }
  },
  reset () {
    clearTimeout(bar)
    elapsedSeconds = 0
    if (status === 'on') {
      toggleActionButton()
    }
    status = 'off'
    progressBar(mainTime, shortTime, longTime)
  }
}

document.addEventListener('cycle', () => {
  window.setTimeout(timer.reset, 500)
  window.setTimeout(timer.toggle, 500)
})

export default timer
