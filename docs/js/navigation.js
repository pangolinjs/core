/* STYLEGUIDE NAVIGATION
 * ========================================================================== */

const sgNav = document.querySelector('.js-sg-nav')
const sgNavHideBtn = document.querySelector('.js-sg-nav-hide-btn')
const sgNavBtn = document.querySelectorAll('.js-sg-nav-btn')
const sgNavSubList = document.querySelectorAll('.js-sg-nav-sub')

let sgNavActive = true
let sgNavLastActive = null

/* INITIAL STYLEGUIDE MENU VISIBILITY CHECK
 * ==================================================== */

const sgGetCookie = function (name) {
  let value = '; ' + document.cookie
  let parts = value.split('; ' + name + '=')

  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
}

if (sgGetCookie('sgNavActive') === 'false') {
  sgNavHideBtn.classList.add('is-active')
  sgNav.classList.add('is-hidden')

  sgNavActive = false
}

/* TOGGLE STYLEGUIDE MENU BAR
 * ==================================================== */

const toggleSgMenuBar = function () {
  if (sgNavActive) {
    this.classList.add('is-active')
    sgNav.classList.add('is-hidden')

    sgNavActive = false
    document.cookie = 'sgNavActive=false;path=/'
  } else {
    this.classList.remove('is-active')
    sgNav.classList.remove('is-hidden')

    sgNavActive = true
    document.cookie = 'sgNavActive=true;path=/'
  }

  for (let i = 0; i < sgNavBtn.length; i++) {
    sgNavBtn[i].classList.remove('is-active')
    sgNavSubList[i].classList.remove('is-active')

    sgNavLastActive = null
  }
}

sgNavHideBtn.addEventListener('click', toggleSgMenuBar)

/* TOGGLE STYLEGUIDE MENU DROPDOWN
 * ==================================================== */

const toggleSgMenuDropdown = function (event) {
  event.preventDefault()

  for (let i = 0; i < sgNavBtn.length; i++) {
    sgNavBtn[i].classList.remove('is-active')
    sgNavSubList[i].classList.remove('is-active')
  }

  if (this === sgNavLastActive) {
    this.classList.remove('is-active')
    this.nextElementSibling.classList.remove('is-active')

    sgNavLastActive = null
  } else {
    this.classList.add('is-active')
    this.nextElementSibling.classList.add('is-active')

    sgNavLastActive = this
  }
}

for (let i = 0; i < sgNavBtn.length; i++) {
  sgNavBtn[i].addEventListener('click', toggleSgMenuDropdown)
}
