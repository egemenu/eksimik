import * as helpers from './helpers';
import fetcher from './fetcher';

const dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};

const today = new Date();
const tomorrow = new Date(new Date().setHours(0, 0, 0, 0) + 86400000);
const formatDate = (date) => date.toLocaleDateString('tr-TR', dateOptions).replace(/ /g, '+');

/** Main function */
export default function() {
	fetcher(helpers.urls.popular);

	document.addEventListener('click', (event) => {
		if (event.target.id === 'debe') {
			helpers.clearContent();
			fetcher(helpers.urls.debe);
		} else if (event.target.id === 'gundem') {
			helpers.clearContent();
			fetcher(helpers.urls.popular);
		} else if (event.target.id === 'bugunsel') {
			helpers.clearContent();
			fetcher(helpers.urls.bugunsel(formatDate(today)));
		} else if (event.target.id === 'yarinsal') {
			helpers.clearContent();
			fetcher(helpers.urls.yarinsal(formatDate(tomorrow)));
		}
	});
}
