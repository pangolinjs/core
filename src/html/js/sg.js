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

  let a11yButton = {
    active: function(element) {
      element.classList.add('is-active');
    },
    inactive: function(element) {
      element.classList.remove('is-active');
    }
  };

  /* A11Y CONTRAST CECK
   * ==================================================== */

  let a11yContrast = {
    active: false,
    toggle: function(button) {
      let htmlElement = document.querySelector('html');
      if (this.active) {

        htmlElement.removeAttribute('style');
        a11yButton.inactive(button);
        this.active = false;

      } else {

        htmlElement.style.WebkitFilter = 'grayscale(100%)';
        htmlElement.style.filter       = 'grayscale(100%)';
        a11yButton.active(button);
        this.active = true;

      }
    }
  };

  document.querySelector('.js-sg-a11y-contrast').addEventListener('click', function() {
    a11yContrast.toggle(this);
  });



  /* A11Y DUPLICATE ID
   * ==================================================== */

  let a11yDuplicateId = {
    active: false,
    toggle: function(button) {
      let elementsWithId = document.querySelectorAll('[id]');

      if (this.active) {

        [...elementsWithId].forEach(function(item) {
          item.removeAttribute('style');
        });

        a11yButton.inactive(button);
        this.active = false;

      } else {

        let idList = {};

        [...elementsWithId].forEach(function(item) {
          let currentId = item.id;

          if (idList.hasOwnProperty(currentId)) {
            idList[currentId]++;
          } else {
            idList[currentId] = 1;
          }
        });

        for (let key in idList) {

          if (idList.hasOwnProperty(key) && idList[key] > 1) {
            console.error('Duplicate ID:');
            [...document.querySelectorAll(`#${key}`)].forEach(function(item) {
              console.log(item);
              item.style.outline = '0.5em solid red';
            });
          }

        }

        a11yButton.active(button);
        this.active = true;
      }
    }
  };

  document.querySelector('.js-sg-a11y-duplicate-id').addEventListener('click', function() {
    a11yDuplicateId.toggle(this);
  });



  /* A11Y MISSING ALT
   * ==================================================== */

  let a11yAlt = {
    active: false,
    toggle: function(button) {
      let missingAltAttribute = document.querySelectorAll('img:not([alt]), object:not([alt])');

      if (this.active) {

        [...missingAltAttribute].forEach(function(item) {
          item.removeAttribute('style');
        });

        a11yButton.inactive(button);
        this.active = false;

      } else {

        [...missingAltAttribute].forEach(function(item) {
          console.error('Missing alt attribute:');
          console.log(item);
          item.style.outline = '0.5em solid red';
        });

        a11yButton.active(button);
        this.active = true;

      }
    }
  };

  document.querySelector('.js-sg-a11y-alt').addEventListener('click', function() {
    a11yAlt.toggle(this);
  });



  /* A11Y MISSING LABEL
   * ==================================================== */

  let a11yLabel = {
    active: false,
    toggle: function(button) {
      let inputElements = document.querySelectorAll('input:not([type="submit"])');

      if (this.active) {

        [...inputElements].forEach(function(item) {
          item.removeAttribute('style');
        });

        a11yButton.inactive(button);
        this.active = false;

      } else {

        [...inputElements].forEach(function(item) {
          let itemId = item.id;

          if ((!itemId || !document.querySelector(`label[for="${itemId}"]`)) && (item.parentElement.nodeName !== 'LABEL')) {
            console.error('Missing label:');
            console.log(item);
            item.style.outline = '0.5em solid red';
          }
        });

        a11yButton.active(button);
        this.active = true;

      }
    }
  };

  document.querySelector('.js-sg-a11y-label').addEventListener('click', function() {
    a11yLabel.toggle(this);
  });
})();
