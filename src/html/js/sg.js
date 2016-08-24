/* STYLEGUIDE JAVASCRIPT
 *
 * JavaScript specific to the Styleguide navigation.
 * ========================================================================== */



(function() {
  let sgNav           = document.querySelector('.sg-nav');
  let sgNavHideBtn    = document.querySelector('.sg-nav__hide-btn');
  let sgNavBtn        = document.querySelectorAll('.sg-nav__button');
  let sgNavSubList    = document.querySelectorAll('.sg-nav__sub-list');
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
    sgNavHideBtn.classList.add('sg-nav__hide-btn--active');
    sgNav.classList.add('sg-nav--hidden');

    sgNavActive = false;
  }



  /* TOGGLE STYLEGUIDE MENU BAR
   * ==================================================== */

  let toggleSgMenuBar = function() {
    if (sgNavActive) {
      this.classList.add('sg-nav__hide-btn--active');
      sgNav.classList.add('sg-nav--hidden');

      sgNavActive     = false;
      document.cookie = 'sgNavActive=false';
    } else {
      this.classList.remove('sg-nav__hide-btn--active');
      sgNav.classList.remove('sg-nav--hidden');

      sgNavActive     = true;
      document.cookie = 'sgNavActive=true';
    }

    for (let i = 0; i < sgNavBtn.length; i++) {
      sgNavBtn[i].classList.remove('sg-nav__button--active');
      sgNavSubList[i].classList.remove('sg-nav__sub-list--visible');

      sgNavLastActive = null;
    }
  };

  sgNavHideBtn.addEventListener('click', toggleSgMenuBar);



  /* TOGGLE STYLEGUIDE MENU DROPDOWN
   * ==================================================== */

  let toggleSgMenuDropdown = function(event) {
    event.preventDefault();

    for (let i = 0; i < sgNavBtn.length; i++) {
      sgNavBtn[i].classList.remove('sg-nav__button--active');
      sgNavSubList[i].classList.remove('sg-nav__sub-list--visible');
    }

    if (this === sgNavLastActive) {
      this.classList.remove('sg-nav__button--active');
      this.nextElementSibling.classList.remove('sg-nav__sub-list--visible');

      sgNavLastActive = null;
    } else {
      this.classList.add('sg-nav__button--active');
      this.nextElementSibling.classList.add('sg-nav__sub-list--visible');

      sgNavLastActive = this;
    }
  };

  for (let i = 0; i < sgNavBtn.length; i++) {
    sgNavBtn[i].addEventListener('click', toggleSgMenuDropdown);
  }
})();
