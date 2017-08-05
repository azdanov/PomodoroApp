import timer, {updateTimes, resetTimes} from './timer'

export default function setupModal () {
  const settingsButton = document.querySelector('.icon-cog')
  const modal = document.querySelector('.modal')
  const modalBackground = document.querySelector('.modal-background')
  const closeButton = document.querySelector('.modal-close')
  const saveButton = document.getElementById('save')
  const resetButton = document.getElementById('reset')

  const closeModal = () => {
    modal.classList.remove('is-active')
  }

  const resumeTimer = () => {
    if (settingsButton.dataset.timerStatus === 'onHold') {
      timer.toggle()
      settingsButton.dataset.timerStatus = ''
    }
  }

  settingsButton.addEventListener('click', () => {
    modal.classList.add('is-active')
  })

  modalBackground.addEventListener('click', closeModal)
  closeButton.addEventListener('click', closeModal)
  modalBackground.addEventListener('click', resumeTimer)
  closeButton.addEventListener('click', resumeTimer)

  saveButton.addEventListener('click', closeModal)
  resetButton.addEventListener('click', closeModal)

  saveButton.addEventListener('click', updateTimes)
  resetButton.addEventListener('click', resetTimes)

  saveButton.addEventListener('click', timer.reset)
  resetButton.addEventListener('click', timer.reset)
}
