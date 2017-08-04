import timer, {status} from './timer.js'
import appendFavicon from './favicon'

const actionButton = document.querySelector('.action [class^=\'icon\']')
const resetButton = document.querySelector('.icon-reset')
const settingsButton = document.querySelector('.icon-cog')
const fiveMinutes = 300
const twentyFiveMinutes = 1500

Array.from(document.querySelectorAll('[class^=\'icon\']'))
  .forEach((item) => item.addEventListener('click', event => event.target.parentNode.blur()))

const toggleActionButton = (event) => {
  if (status === undefined) {

  }
  if (event.currentTarget.classList.toString() === 'icon-reset') {
    if (actionButton.classList.toString() === 'icon-play') {
      actionButton.classList.remove('icon-play')
      actionButton.classList.add('icon-pause')
    }
    return
  }

  if (actionButton.classList.toString() === 'icon-pause') {
    actionButton.classList.remove('icon-pause')
    actionButton.classList.add('icon-play')
  } else {
    actionButton.classList.remove('icon-play')
    actionButton.classList.add('icon-pause')
  }
}

actionButton.addEventListener('click', toggleActionButton)
resetButton.addEventListener('click', toggleActionButton)

actionButton.addEventListener('click', timer.toggle)
resetButton.addEventListener('click', timer.reset)

// Display timer
timer.start(fiveMinutes)
window.setTimeout(() => {
  timer.toggle()
}, 50)

appendFavicon()
