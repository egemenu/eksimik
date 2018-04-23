import Config from './config'
import Parser from './parser'

export default class Entry {
	constructor (index, elem) {
		this.main_url = Config.url.main
		this.id = index
		this.elem = elem
		this.url = Config.url.main + this.elem.firstElementChild.getAttribute('href')
		this.title = this.elem.firstElementChild.innerHTML.split('<small')[0]
		this.count = this.elem.firstElementChild.firstElementChild.innerText
		this.loader = `<div class="loader" id="loader">
    								<span></span>
    								<span></span>
    								<span></span>
									</div>`
	}
	makeTitle () {
		return `<input type="radio" name="accordion" id="acc-${ this.id }" data-url="${ this.url }"/>
						<section>
							<label for="acc-${ this.id }">${ this.title }<small>${ this.count }</small></label>
							<label for="acc-close"></label>	
								<article id="article-${ this.id }">${ this.loader }</article>
						</section>`
	}
	eventListenerAdder () {
		let elem = document.getElementById('acc-' + this.id)
		elem.addEventListener(
			'click',
			() => {
				this.createEntry()
			},
			false
		)
	}
	createEntry () {
		const article = document.getElementById('article-' + this.id)
		if (article.firstElementChild.classList.contains('loader'))
			fetch(this.url)
				.then(res => res.text())
				.then(html => {
					let entry = new Parser(`${ html }`, Config.handler.first_entry).parseEntry()
					let article = new Parser(document.querySelector('#article-' + this.id), '#article-' + this.id + ' .loader').remover()
					article.innerHTML += entry.content
					article.innerHTML += `<footer>
  																<a href="${ this.main_url + entry.url }" target="_blank">başlığa git</a>
																	<span>
																		<a href="${ this.main_url + entry.url }" target="_blank">${ entry.date }</a>
																		<a href="${ this.main_url + entry.author_url }" target="_blank">${ entry.author }</a>
																	</span>
																</footer>`
				})
	}

}
