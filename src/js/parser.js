import Config from './config';

/** Ayıklayıcı */
class Parser {
	/**
	 * Html elemanı ve sorguyla işlem yapar
	 * @param {HTMLElement} html Gelen Html elemanı
	 * @param {string} query Gelen sorgu
	 */
	constructor(html, query) {
		this.html = html;
		this.query = query;
	}
	/**
	 * Verilen HTML elemanından sorgulanan elemanları ayıklar ve gönderir
	 * @return {obj} Ayıklanmış nodeList
	 */
	getElementList() {
		const holder = document.createElement('div');
		holder.innerHTML = this.html;
		return holder.querySelectorAll(this.query);
	}
	/**
	 * Girdiyi ayıklar.
	 * @return {object} Girdi bilgileri.
	 */
	parseEntry() {
		const holderElem = document.createElement('div');
		holderElem.innerHTML = this.html;
		const mainElem = holderElem.querySelector(this.query);
		const content = mainElem.querySelector(Config.handler.content);
		const childArr = [...content.children];
		for (const i in childArr) {
			if (childArr[i].nodeName === 'A' && [...childArr[i].classList].includes('b')) {
				childArr[i].className += '  sign';
				childArr[i].target = '_blank';
				childArr[i].href = Config.url.main + '/' + childArr[i].search;
			}
		}
		const author = mainElem.querySelector(Config.handler.author);
		const date = mainElem.querySelector(Config.handler.date);
		return {
			content: content.innerHTML,
			url: date.getAttribute('href'),
			date: date.innerHTML,
			author: author.innerHTML,
			author_url: author.getAttribute('href'),
		};
	}
	/**
	 * Verilen HTML elemanından ilgili query'i yakalarsa siler
	 * @return {HTMLElement} Silinen eleman.
	 */
	remover() {
		const mainElem = this.html;
		const childElem = mainElem.querySelector(this.query);
		try {
			mainElem.removeChild(childElem);
		} catch (err) {
			console.error(err);
		}
		return mainElem;
	}
}

export default Parser;
