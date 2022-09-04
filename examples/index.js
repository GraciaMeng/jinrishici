import { load } from '../dist/index.js'

async function getData() {
  const result = await load()
  console.log(result)
  pushPage(result)
}
getData()

function pushPage(result) {
  const contentEl = document.querySelector('.content>span')
  contentEl.textContent = result.data.content
}