import * as helpers from './helpers';
import fetcher from './fetcher';

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
		}
	});
}
