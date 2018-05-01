import { Selector } from 'testcafe'

fixture`Hello Component`
  .page`http://localhost:8080/components/hello.html`

test('Default', async t => {
  await t.expect(Selector('.hello').innerText).eql('Hello World')
})

test('Longform', async t => {
  await t.expect(Selector('.hello.hello--longform').innerText).eql('Hello World!\nHow are you?')
})
