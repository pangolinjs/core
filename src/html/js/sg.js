/* STYLEGUIDE JAVASCRIPT
 *
 * JavaScript specific to the Styleguide navigation.
 * ========================================================================== */



(function() {
  let sgNav           = document.querySelector('.js-sg-nav');
  let sgNavHideBtn    = document.querySelector('.js-sg-nav-hide-btn');
  let sgNavBtn        = document.querySelectorAll('.js-sg-nav-btn');
  let sgNavSubList    = document.querySelectorAll('.js-sg-nav-sub');
  let sgNavActive     = true;
  let sgNavLastActive = null;



  /* INITIAL STYLEGUIDE MENU VISIBILITY CHECK
   * ==================================================== */

  let sgGetCookie = function(name) {
    let value = '; ' + document.cookie;
    let parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  };

  if (sgGetCookie('sgNavActive') === 'false') {
    sgNavHideBtn.classList.add('is-active');
    sgNav.classList.add('is-hidden');

    sgNavActive = false;
  }



  /* TOGGLE STYLEGUIDE MENU BAR
   * ==================================================== */

  let toggleSgMenuBar = function() {
    if (sgNavActive) {
      this.classList.add('is-active');
      sgNav.classList.add('is-hidden');

      sgNavActive     = false;
      document.cookie = 'sgNavActive=false';
    } else {
      this.classList.remove('is-active');
      sgNav.classList.remove('is-hidden');

      sgNavActive     = true;
      document.cookie = 'sgNavActive=true';
    }

    for (let i = 0; i < sgNavBtn.length; i++) {
      sgNavBtn[i].classList.remove('is-active');
      sgNavSubList[i].classList.remove('is-active');

      sgNavLastActive = null;
    }
  };

  sgNavHideBtn.addEventListener('click', toggleSgMenuBar);



  /* TOGGLE STYLEGUIDE MENU DROPDOWN
   * ==================================================== */

  let toggleSgMenuDropdown = function(event) {
    event.preventDefault();

    for (let i = 0; i < sgNavBtn.length; i++) {
      sgNavBtn[i].classList.remove('is-active');
      sgNavSubList[i].classList.remove('is-active');
    }

    if (this === sgNavLastActive) {
      this.classList.remove('is-active');
      this.nextElementSibling.classList.remove('is-active');

      sgNavLastActive = null;
    } else {
      this.classList.add('is-active');
      this.nextElementSibling.classList.add('is-active');

      sgNavLastActive = this;
    }
  };

  for (let i = 0; i < sgNavBtn.length; i++) {
    sgNavBtn[i].addEventListener('click', toggleSgMenuDropdown);
  }
})();



(function() {
  let a11yButtons = document.querySelectorAll('.js-sg-a11y');



  /* A11Y CONTRAST CECK
   * ==================================================== */

  let a11yContrast = {
    active: false,
    elementList: document.querySelectorAll('html'),
    toggle: function(button) {
      if (this.active) {
        for (let i = 0; i < this.elementList.length; i++) {
          this.elementList[i].style.WebkitFilter = null;
          this.elementList[i].style.filter       = null;
        }
        button.classList.remove('is-active');
        this.active = false;
      } else {
        for (let i = 0; i < this.elementList.length; i++) {
          this.elementList[i].style.WebkitFilter = 'grayscale(100%)';
          this.elementList[i].style.filter       = 'grayscale(100%)';
        }
        button.classList.add('is-active');
        this.active = true;
      }
    }
  };



  /* A11Y HIDE ARIA-HIDDEN="true"
   * ==================================================== */

  let a11yAriaHidden = {
    active: false,
    elementList: document.querySelectorAll('[aria-hidden="true"]'),
    toggle: function(button) {
      if (this.active) {
        for (let i = 0; i < this.elementList.length; i++) {
          this.elementList[i].style.display = null;
        }
        button.classList.remove('is-active');
        this.active = false;
      } else {
        for (let i = 0; i < this.elementList.length; i++) {
          this.elementList[i].style.display = 'none';
        }
        button.classList.add('is-active');
        this.active = true;
      }
    }
  };



  /* A11Y HIGHLIGHT MISSING ALT ATTRIBUTE
   * ==================================================== */

  let a11yAlt = {
    active: false,
    elementList: document.querySelectorAll('img:not([alt])'),
    toggle: function(button) {
      if (this.active) {
        for (let i = 0; i < this.elementList.length; i++) {
          this.elementList[i].style.outline = null;
        }
        button.classList.remove('is-active');
        this.active = false;
      } else {
        for (let i = 0; i < this.elementList.length; i++) {
          this.elementList[i].style.outline = '1em solid red';
        }
        button.classList.add('is-active');
        this.active = true;
      }
    }
  };



  /* TOGGLE A11Y TESTS
   * ==================================================== */

  let toggleA11y = function(event) {
    event.preventDefault();

    if (this.classList.contains('js-sg-a11y-contrast')) {
      a11yContrast.toggle(this);
    } else if (this.classList.contains('js-sg-a11y-aria-hidden')) {
      a11yAriaHidden.toggle(this);
    } else if (this.classList.contains('js-sg-a11y-alt')) {
      a11yAlt.toggle(this);
    }
  };

  for (let i = 0; i < a11yButtons.length; i++) {
    a11yButtons[i].addEventListener('click', toggleA11y);
  }
})();
