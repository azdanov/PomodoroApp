import timer, {status} from './timer.js'
import appendFavicon from './favicon'
import setupModal from './modal'

const actionButton = document.querySelector('.action [class^=\'icon\']')
const resetButton = document.querySelector('.icon-reset')
const settingsButton = document.querySelector('.icon-cog')

Array.from(document.querySelectorAll('[class^=\'icon\']'))
  .forEach((item) => item.addEventListener('click', event => event.target.parentNode.blur()))

export const toggleActionButton = () => {
  if (status === 'done') {
    return
  }

  if (status === 'on') {
    actionButton.classList.remove('icon-pause')
    actionButton.classList.add('icon-play')
  } else {
    actionButton.classList.remove('icon-play')
    actionButton.classList.add('icon-pause')
  }
}

actionButton.addEventListener('click', timer.toggle)
settingsButton.addEventListener('click', () => {
  if (status === 'on') {
    timer.toggle()
    settingsButton.dataset.timerStatus = 'onHold'
  }
})

resetButton.addEventListener('click', timer.reset)

// Display timer
timer.start()
window.setTimeout(() => {
  timer.toggle()
  actionButton.removeAttribute('hidden')
  resetButton.removeAttribute('hidden')
  settingsButton.removeAttribute('hidden')
}, 50)

appendFavicon()
setupModal()
