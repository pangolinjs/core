import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

const codeElements = document.querySelectorAll('.js-fesg-section-code')

for (let i = 0; i < codeElements.length; i++) {
  let code = codeElements[i].textContent
  let html = Prism.highlight(code, Prism.languages.html)

  codeElements[i].innerHTML = html
}

class Tab {
  constructor (button, panel) {
    this.button = button
    this.panel = panel

    this.isOpen = false

    this.button.setAttribute('aria-expanded', 'false')
    this.panel.setAttribute('aria-expanded', 'false')
  }

  open () {
    this.button.classList.add('is-expanded')
    this.panel.classList.add('is-expanded')

    this.button.setAttribute('aria-expanded', 'true')
    this.panel.setAttribute('aria-expanded', 'true')

    this.isOpen = true
  }

  close () {
    this.button.classList.remove('is-expanded')
    this.panel.classList.remove('is-expanded')

    this.button.setAttribute('aria-expanded', 'false')
    this.panel.setAttribute('aria-expanded', 'false')

    this.isOpen = false
  }

  toggle () {
    if (this.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }
}

class Navigation {
  constructor (container) {
    this.tabs = []

    let panels = {}
    let buttonElements = container.querySelectorAll('.js-fesg-section-switch-button')
    let panelElements = container.querySelectorAll('.js-fesg-section-switch-panel')

    for (let i = 0; i < panelElements.length; i++) {
      panels[panelElements[i].dataset.switchPanel] = panelElements[i]
    }

    for (let i = 0; i < buttonElements.length; i++) {
      let type = buttonElements[i].dataset.switchTo
      let tab = new Tab(buttonElements[i], panels[type])

      this.tabs.push(tab)
    }

    this.tabs.forEach(tab => {
      tab.button.addEventListener('click', () => {
        let isOpen = tab.isOpen

        this.closeAll()

        if (!isOpen) {
          tab.toggle()
        }
      })
    })

    this.openFirst()
  }

  openFirst () {
    this.tabs[0].open()
  }

  closeAll () {
    this.tabs.forEach(tab => tab.close())
  }
}

const containers = document.querySelectorAll('.js-fesg-section-switch')
const switchers = []

for (let i = 0; i < containers.length; i++) {
  switchers.push(new Navigation(containers[i]))
}
