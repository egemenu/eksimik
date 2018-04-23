import Config from './config'

export default class Parser {
	constructor (html, query) {
		this.html = html
		this.query = query
	}
	getElementList () {
		let obj = document.createElement('div')
		obj.innerHTML = this.html
		return obj.querySelectorAll(this.query)
	}
	getElement () {
		let obj = document.createElement('div')
		obj.innerHTML = this.html
		return obj.querySelector(this.query)
	}
	parseEntry () {
		let obj = document.createElement('div')
		obj.innerHTML = this.html
		let holder = obj.querySelector(this.query)
		let content = holder.querySelector(Config.handler.content)
		let childArr = [ ...content.children ]
		for (let i in childArr)
			if (childArr[i].nodeName === 'A' && [ ...childArr[i].classList ].includes('b')) {
				childArr[i].className += '  sign'
				childArr[i].target = '_blank'
				childArr[i].href = Config.url.main + '/' + childArr[i].search
			}
		let author = holder.querySelector(Config.handler.author)
		let date = holder.querySelector(Config.handler.date)
		return {
			content: content.innerHTML,
			url: date.getAttribute('href'),
			date: date.innerHTML,
			author: author.innerHTML,
			author_url: author.getAttribute('href'),
		}
	}
	remover () {
		let obj = this.html
		let child = obj.querySelector(this.query)
		obj.removeChild(child)
		return obj
	}
}
