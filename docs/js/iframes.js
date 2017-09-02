/* STYLEGUIDE IFRAMES
 * ========================================================================== */

const iframes = document.querySelectorAll('.js-sg-iframe')

const autoHeightAdjust = function (item) {
  // Wait for iframes to finish loading
  item.onload = function () {
    item.style.height = `${item.contentWindow.document.body.scrollHeight}px`
  }
};

[...iframes].forEach(autoHeightAdjust)
