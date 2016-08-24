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
