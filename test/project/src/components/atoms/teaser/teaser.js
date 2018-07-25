import truncate from './_truncate'

const teaser = document.querySelectorAll('.js-teaser')

for (let i = 0; i < teaser.length; i++) {
  teaser[i].innerHTML = truncate(teaser[i].textContent)
}
