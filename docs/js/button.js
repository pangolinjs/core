const button = document.querySelector('.js-pangolin-sidebar-toggle')

let dragging = false
let yPosition = 0
let yElement = 0

/**
 * Set intial dragging parameters
 */
function dragStart (event) {
  dragging = true
  yElement = event.pageY - button.offsetTop

  document.addEventListener('mousemove', dragMove)
  document.addEventListener('mouseup', dragEnd)
}

/**
 * Moves the button
 * @param {Event} event
 */
function dragMove (event) {
  if (dragging) {
    yPosition = event.pageY

    let position = yPosition - yElement

    if (position < 0) {
      position = 0
    }

    if ((position + button.offsetHeight) > window.innerHeight) {
      position = window.innerHeight - button.offsetHeight
    }

    button.style.top = position + 'px'
  }
}

/**
 * Exits the dragging
 */
function dragEnd () {
  dragging = false

  document.removeEventListener('mousemove', dragMove)
  document.removeEventListener('mouseup', dragEnd)
}

button.addEventListener('mousedown', dragStart)
