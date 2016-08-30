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
  /* eslint no-console: 0 */

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

  let a11yContrastButton = document.querySelector('.js-sg-a11y-contrast');
  a11yContrastButton.addEventListener('click', function() {
    a11yContrast.toggle(this);
  });



  /* A11Y DUPLICATE ID
   * ==================================================== */

  let a11yDuplicateId = {
    active: false,
    elementList: document.querySelectorAll('[id]'),
    idList: {},
    toggle: function(button) {
      if (this.active) {

        document.querySelectorAll('[id]').forEach(function(item) {
          item.style.outline = null;
        });

        this.idList = {};
        button.classList.remove('is-active');
        this.active = false;

      } else {
        for (let i = 0; i < this.elementList.length; i++) {
          let currentId = this.elementList[i].id;
          if (this.idList.hasOwnProperty(currentId)) {

            this.idList[currentId]++;
          } else {
            this.idList[currentId] = 1;
          }
        }

        for (let key in this.idList) {
          if (this.idList.hasOwnProperty(key) && this.idList[key] > 1) {
            console.error('Duplicate ID:');
            document.querySelectorAll(`#${key}`).forEach(function(item) {
              item.style.outline = '0.5em solid red';
              console.log(item);
            });
          }
        }

        button.classList.add('is-active');
        this.active = true;

      }
    }
  };

  let a11yDuplicateIdButton = document.querySelector('.js-sg-a11y-duplicate-id');
  a11yDuplicateIdButton.addEventListener('click', function() {
    a11yDuplicateId.toggle(this);
  });



  /* A11Y HIGHLIGHT MISSING ALT
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
          this.elementList[i].style.outline = '0.5em solid red';
          console.error('Missing alt attribute:');
          console.log(this.elementList[i]);
        }
        button.classList.add('is-active');
        this.active = true;
      }
    }
  };

  let a11yAltButton = document.querySelector('.js-sg-a11y-alt');
  a11yAltButton.addEventListener('click', function() {
    a11yAlt.toggle(this);
  });
})();
