import file from './casey-horner-JxtcTiWIJXQ-unsplash.jpg'

/** @type {HTMLImageElement} */
const image = document.querySelector('.js-media-image')

if (image) {
  image.src = file
}
