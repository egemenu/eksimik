/* Main holder element */
export const mainHolder = document.getElementById('main');

/* Url list */
export const urls = {
	main: 'https://eksisozluk111.com',
	popular: 'https://eksisozluk111.com/basliklar/m/populer',
	debe: 'https://eksisozluk111.com/m/debe',
	bugunsel: (date) => `https://eksisozluk111.com/basliklar/ara?SearchForm.Keywords=${date}&SearchForm.Author=&SearchForm.When.From=&SearchForm.When.To=&SearchForm.NiceOnly=false&SearchForm.FavoritedOnly=false&SearchForm.SortOrder=Count`,
	yarinsal: (date) => `https://eksisozluk111.com/basliklar/ara?SearchForm.Keywords=${date}&SearchForm.Author=&SearchForm.When.From=&SearchForm.When.To=&SearchForm.NiceOnly=false&SearchForm.FavoritedOnly=false&SearchForm.SortOrder=Count`,
};

/* Queries */
export const queries = {
	first_entry: '#entry-item-list > li:first-of-type',
	entry_list: 'ul.topic-list.partial.mobile > li',
	content: '.content',
	author: '.entry-author',
	date: '.entry-date',
	user: 'ul li:first-of-type a',
	message: '.messages a svg',
	newMessageClassName: 'eksico-color-green',
	track: '.tracked a',
	newTrackClassName: 'new-update',
	search_result_list: '#content-body > .topic-list > li',
};

/* Dummy header */
export const dummyHeader = `<label for="acc-close">
															<ul>
																<li id="gundem">gündem</li>
																<li id="bugunsel">bugünsel</li>
																<li id="yarinsal">yarınsal</li>
																<li id="debe">debe</li>
															</ul>
															<ul class="login">
																<li><a href="https://eksisozluk111.com/giris" target="_blank">giriş</a></li>
															</ul>
														</label>`;

/* Loader */
export const loader = `<div class="loader" id="loader">
												<span></span>
												<span></span>
												<span></span>
											</div>`;


/**
 * @param {string} query Gets parent query
 */
export function removeLoader(query) {
	try {
		mainHolder.querySelector(`${query} .loader`).remove();
	} catch (err) {
		console.error(err);
	}
}

/**
 * @param {HTMLElement} html Raw HTML for parse
*/
export function createHeader(html) {
	const header = document.createElement('header');
	header.innerHTML = dummyHeader;
	// If logged in
	if (html) {
		header.querySelector('.login').firstElementChild.remove();
		const loggedInLink = urls.main + html.querySelector(queries.user).pathname;
		const isNewMessage = html.querySelector(queries.message).classList.contains(queries.newMessageClassName);
		const isNewTrack = html.querySelector(queries.track).classList.contains(queries.newTrackClassName);
		const parsedHeader = `<li><a href="${(loggedInLink)}" target="_blank">ben</a></li>
												 <li class="${ isNewMessage ? 'active' : ''}"><a href="${urls.main + '/mesaj'}" target="_blank">mesaj</a></li>
												 <li class="${ isNewTrack ? 'active' : ''}"><a href="${urls.main + '/basliklar/olay'}" target="_blank">olay</a></li>`;
		header.querySelector('.login').innerHTML += parsedHeader;
		mainHolder.appendChild(header);
	} else {
		mainHolder.appendChild(header);
	}
}

/** Clear Html elements on type change */
export function clearContent() {
	// Needs for Css Accordion
	const closerInput = document.createElement('input');
	closerInput.type = 'radio';
	closerInput.name = 'accordion';
	closerInput.id = 'acc-close';

	// Remove all children except header
	for (const elem of document.querySelectorAll('#main > *:not(header)')) {
		elem.remove();
	}

	// Prepare loading
	mainHolder.appendChild(closerInput);
	mainHolder.innerHTML += loader;
}

/** Entry parser
  * @param {HTMLElement} html Gets raw html
  * @return {object} Entry info
  */
export function firstEntryParser(html) {
	const holderElem = document.createElement('div');
	holderElem.innerHTML = html;
	const mainElem = holderElem.querySelector(queries.first_entry);
	const content = mainElem.querySelector(queries.content);
	const childArr = [...content.children];
	for (const i in childArr) {
		if (childArr[i].nodeName === 'A' && [...childArr[i].classList].includes('b')) {
			childArr[i].className += '  sign';
			childArr[i].target = '_blank';
			childArr[i].href = urls.main + '/' + childArr[i].search;
		}
	}
	const author = mainElem.querySelector(queries.author);
	const date = mainElem.querySelector(queries.date);
	return {
		content: content.innerHTML,
		url: date.getAttribute('href'),
		date: date.innerHTML,
		author: author.innerHTML,
		author_url: author.getAttribute('href'),
	};
}
