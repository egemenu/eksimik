import * as helpers from './helpers';

/** Entry class */
class Entry {
	/**
	 * @param {number} index Required for pure CSS accordion & Entry numbers
	 * @param {HTMLElement} element Raw HTML
	 * @param {string} url Required for Entry type
	 */
	constructor(index, element, url) {
		this._id = index;
		this._url = url;
		this._element = element;
	}
	/**
	 * @return {string} Entry type detection
	 */
	get type() {
		return this._url.includes('debe') ? 'debe' : 'gundem';
	}
	/**
	 * @return {string} Entry url
	 */
	get url() {
		return helpers.urls.main + this._element.firstElementChild.getAttribute('href');
	}
	/**
	 * @return {string} Entry title
	 */
	get title() {
		let title = '';
		if (this.type === 'debe') {
			title = this._element.firstElementChild.firstElementChild.innerText;
		} else {
			title = this._element.firstElementChild.innerHTML.trim().split('<small')[0];
		}
		return title;
	}
	/**
	 * @return {string} Entry's info/counter
	 */
	get statusCounter() {
		let counter = '';
		if (this.type === 'debe') {
			counter = `#${parseInt(this._id, 10) + 1}`;
		} else {
			if (this._element.firstElementChild.childElementCount > 0) {
				counter = this._element.firstElementChild.firstElementChild.innerText;
			}
		}
		return counter;
	}
	/**
	 * Required for accordion management
	 * @return {HTMLElement} Accordion's input element.
	 */
	get titleInputElement() {
		const inputElement = document.createElement('input');
		inputElement.type = 'radio';
		inputElement.name = 'accordion';
		// Don't need it anymore
		// inputElement.setAttribute('data-url', this.url);
		inputElement.id = `acc-${ this._id }`;
		inputElement.className = 'act';

		return inputElement;
	}
	/**
	 * Required for accordion management
	 * @return {HTMLElement} Readable title in HTML format
	 */
	get titleSectionElement() {
		const sectionElement = document.createElement('section');
		sectionElement.className = 'act';

		const labelElement = document.createElement('label');
		labelElement.htmlFor = `acc-${this._id}`;

		const smallElement = document.createElement('small');
		smallElement.innerText = this.statusCounter;

		labelElement.innerText = this.title;
		labelElement.appendChild(smallElement);

		const labelCloseElement = document.createElement('label');
		labelCloseElement.htmlFor = 'acc-close';

		const articleElement = document.createElement('article');
		articleElement.id = `article-${this._id}`;
		articleElement.innerHTML += helpers.loader;

		sectionElement.appendChild(labelElement);
		sectionElement.appendChild(labelCloseElement);
		sectionElement.appendChild(articleElement);

		// Add one time listener
		const crateEntryHandler = () => {
			this.createEntry();
			sectionElement.removeEventListener( 'click', crateEntryHandler, false);
		};
		sectionElement.addEventListener( 'click', crateEntryHandler, false);

		return sectionElement;
	}
	/**
	 * Creates entry and adds to DOM
	 */
	createEntry() {
		const article = document.getElementById('article-' + this._id);
		fetch(this.url)
			.then((res) => res.text())
			.then((html) => {
				const entry = helpers.firstEntryParser(`${ html }`);
				helpers.removeLoader(`#article-${this._id}`);
				article.innerHTML += entry.content;
				article.innerHTML += `<footer>
																<a href="${ helpers.urls.main + entry.url }" target="_blank">başlığa git</a>
																<span>
																	<a href="${ helpers.urls.main + entry.url }" target="_blank">${ entry.date }</a>
																	<a href="${ helpers.urls.main + entry.author_url }" target="_blank">${ entry.author }</a>
																</span>
															</footer>`;
			});
	}
}

export default Entry;
