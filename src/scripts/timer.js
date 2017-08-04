let canvas = document.getElementById('timer')
let context = canvas.getContext('2d')
let elapsedSeconds = 0
let start = 4.72
let centerWidth = context.canvas.width / 2
let centerHeight = context.canvas.height / 2
let arcWidth = 140
let diff
let bar
export let status
let timeMemory

function formatTime (seconds) {
  return new Date(seconds * 1000).toISOString().substr(11, 8)
}

function progressBar (timeLength) {
  diff = (elapsedSeconds / timeLength) * Math.PI * 2
  context.clearRect(0, 0, 320, 320)
  context.beginPath()
  context.lineWidth = 30
  context.arc(centerWidth, centerHeight, arcWidth, 0, 2 * Math.PI, false)
  context.fillStyle = '#ECEFF1'
  context.fill()
  context.strokeStyle = '#7986cb'
  context.stroke()
  context.fillStyle = '#37474f'
  context.strokeStyle = '#37474f'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.lineWidth = 30
  context.font = '4em monospace'
  context.beginPath()
  context.arc(centerWidth, centerHeight, arcWidth, start, diff + start, false)
  context.stroke()

  context.fillText(formatTime(elapsedSeconds), centerWidth, centerHeight)

  if (elapsedSeconds >= timeLength) {
    clearTimeout(bar)
    status = 'done'
  }

  elapsedSeconds++
}

const timer = {
  start (timeLength) {
    timeMemory = timeLength
    status = 'on'
    bar = setInterval(progressBar.bind(null, timeMemory), 50)
  },
  toggle () {
    if (status === 'on') {
      clearTimeout(bar)
      status = 'off'
    } else if (status === 'off') {
      bar = setInterval(progressBar.bind(null, timeMemory), 50)
      status = 'on'
    }
  },
  reset () {
    clearTimeout(bar)
    elapsedSeconds = 0
    status = 'on'
    bar = setInterval(progressBar.bind(null, timeMemory), 50)
  }
}

export default timer
