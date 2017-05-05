/* STYLEGUIDE JAVASCRIPT
 *
 * JavaScript specific to the Styleguide navigation.
 * ========================================================================== */

(function () {
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
})();

(function () {
  const a11yButton = {
    active: function (element) {
      element.classList.add('is-active')
    },
    inactive: function (element) {
      element.classList.remove('is-active')
    }
  }

  /* A11Y CONTRAST CECK
   * ==================================================== */

  const a11yContrast = {
    active: false,
    toggle: function (button) {
      const htmlElement = document.querySelector('html')

      if (this.active) {
        htmlElement.style.filter = ''
        a11yButton.inactive(button)
        this.active = false
      } else {
        htmlElement.style.filter = 'grayscale(100%)'
        a11yButton.active(button)
        this.active = true
      }
    }
  }

  document.querySelector('.js-sg-a11y-contrast').addEventListener('click', function () {
    a11yContrast.toggle(this)
  })

  /* A11Y DUPLICATE ID
   * ==================================================== */

  const a11yDuplicateId = {
    active: false,
    toggle: function (button) {
      const elementsWithId = document.querySelectorAll('[id]')

      if (this.active) {
        [...elementsWithId].forEach(function (item) {
          item.style.outline = ''
        })

        a11yButton.inactive(button)
        this.active = false
      } else {
        let idList = {};

        [...elementsWithId].forEach(function (item) {
          let currentId = item.id

          if (idList.hasOwnProperty(currentId)) {
            idList[currentId]++
          } else {
            idList[currentId] = 1
          }
        })

        for (let key in idList) {
          if (idList.hasOwnProperty(key) && idList[key] > 1) {
            console.error('Duplicate ID:');
            [...document.querySelectorAll(`#${key}`)].forEach(function (item) {
              console.log(item)
              item.style.outline = '0.5em solid red'
            })
          }
        }

        a11yButton.active(button)
        this.active = true
      }
    }
  }

  document.querySelector('.js-sg-a11y-duplicate-id').addEventListener('click', function () {
    a11yDuplicateId.toggle(this)
  })

  /* A11Y EMPTY INTERACTIVE ELEMENTS
   * ==================================================== */

  const a11yEmptyInteractiveElements = {
    active: false,
    toggle: function (button) {
      const emptyInteractiveElements = document.querySelectorAll('button:empty, a:empty')

      if (this.active) {
        [...emptyInteractiveElements].forEach(function (item) {
          item.style.outline = ''
          item.style.display = ''
        })

        a11yButton.inactive(button)
        this.active = false
      } else {
        if (emptyInteractiveElements.length) {
          console.error('Empty interactive elements:')
        }

        [...emptyInteractiveElements].forEach(function (item) {
          console.log(item)
          item.style.outline = '0.5em solid red'
          item.style.display = 'inline-block'
        })

        a11yButton.active(button)
        this.active = true
      }
    }
  }

  document.querySelector('.js-sg-a11y-empty-interactive-elements').addEventListener('click', function () {
    a11yEmptyInteractiveElements.toggle(this)
  })

  /* A11Y MISSING ALT
   * ==================================================== */

  const a11yAlt = {
    active: false,
    toggle: function (button) {
      const missingAltAttribute = document.querySelectorAll('img:not([alt])')

      if (this.active) {
        [...missingAltAttribute].forEach(function (item) {
          item.style.outline = ''
        })

        a11yButton.inactive(button)
        this.active = false
      } else {
        if (missingAltAttribute.length) {
          console.error('Missing alt attribute:')
        }

        [...missingAltAttribute].forEach(function (item) {
          console.log(item)
          item.style.outline = '0.5em solid red'
        })

        a11yButton.active(button)
        this.active = true
      }
    }
  }

  document.querySelector('.js-sg-a11y-alt').addEventListener('click', function () {
    a11yAlt.toggle(this)
  })

  /* A11Y MISSING LABEL
   * ==================================================== */

  const a11yLabel = {
    active: false,
    toggle: function (button) {
      const inputElements = document.querySelectorAll('input:not([type="submit"])')

      if (this.active) {
        [...inputElements].forEach(function (item) {
          item.style.outline = ''
        })

        a11yButton.inactive(button)
        this.active = false
      } else {
        let elementsWithMissingLabels = [];

        [...inputElements].forEach(function (item) {
          let itemId = item.id

          if ((!itemId || !document.querySelector(`label[for="${itemId}"]`)) && (item.parentElement.nodeName !== 'LABEL')) {
            elementsWithMissingLabels.push(item)
          }
        })

        if (elementsWithMissingLabels.length) {
          console.error('Missing label:')
        }

        [...elementsWithMissingLabels].forEach(item => {
          console.log(item)
          item.style.outline = '0.5em solid red'
        })

        a11yButton.active(button)
        this.active = true
      }
    }
  }

  document.querySelector('.js-sg-a11y-label').addEventListener('click', function () {
    a11yLabel.toggle(this)
  })
})();

(function () {
  /* AUTO HEIGHT ADJUST FOR IFRAMES
   * ==================================================== */

  const iframes = document.querySelectorAll('.js-sg-iframe')

  const autoHeightAdjust = function (item) {
    // Wait for iframes to finish loading
    item.onload = function () {
      item.style.height = `${item.contentWindow.document.body.scrollHeight}px`
    }
  };

  [...iframes].forEach(autoHeightAdjust)
})()
