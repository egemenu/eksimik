import Config from './config'
import Entry from './entry'
import Parser from './parser'

const engine = () => {
	fetch(Config.url.popular)
		.then(res => res.text())
		.catch(() => {
			let main = new Parser(
				document.getElementById('main'),
				'#main > .loader'
			).remover()
			main.innerHTML
        += '<div style="text-align: center; margin: 10px auto;">Bağlantı Hatası!</div>'
		})
		.then(html => {
			let entryList = [
				...new Parser(`${ html }`, Config.handler.entry_list).getElementList(),
			].slice(0, 10)
			let main = new Parser(
				document.getElementById('main'),
				'#main > .loader'
			).remover()
			for (let index in entryList) {
				main.innerHTML += new Entry(index, entryList[index]).makeTitle()
				setTimeout(() => {
					new Entry(index, entryList[index]).eventListenerAdder()
				}, 100)
			}
		})
}

document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		engine()
	}, 400)
})
