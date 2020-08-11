const buttons = document.querySelectorAll('.js-button')

for (const button of buttons) {
  button.addEventListener('click', () => {
    console.log('Hello World')
  })
}
