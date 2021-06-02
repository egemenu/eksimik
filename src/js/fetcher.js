import * as helpers from './helpers';
import Entry from './entry';

/** Fetch urls
 * @param {string} url Incoming url
 */
export default function(url) {
	fetch(url)
		.then((res) => res.text())
		.catch(() => {
			/* Remove loader and show error text if there is connection issue */
			helpers.removeLoader('#main');
			helpers.mainHolder.innerHTML += `<div class="connection-error">Bağlantı Hatası!</div>`;
		})
		.then((html) => {
			const rawHtml = document.createElement('div');
			rawHtml.innerHTML = `${ html }`;

			// Create header if there isn't
			if (!helpers.mainHolder.querySelector('header') && html) {
				helpers.createHeader(rawHtml.querySelector('.mobile-notification-icons'));
			}

			// Extract entries raw html
			const entryList = [
				...rawHtml.querySelectorAll(url.includes('ara?') ? helpers.queries.search_result_list : helpers.queries.entry_list),
			];

			// Remove loading
			helpers.removeLoader('#main');

			/* Add parsed entry elements to accordion */
			for (const i in entryList) {
				if (i) {
					const newEntry = new Entry(i, entryList[i], url);
					helpers.mainHolder.appendChild(newEntry.titleInputElement);
					helpers.mainHolder.appendChild(newEntry.titleSectionElement);
				}
			}
		});
}
