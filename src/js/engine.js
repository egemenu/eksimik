import Config from './config';
import Entry from './entry';
import Parser from './parser';

/** Ana fonksiyon */
export default function() {
	fetch(Config.url.popular)
		.then((res) => res.text())
		.catch(() => {
			/* Bağlantı yoksa loader'i sil ve hata göster */
			const main = new Parser(
				document.getElementById('main'),
				'#main > .loader'
			).remover();

			main.innerHTML +=
			`<div class="connection-error">Bağlantı Hatası!</div>`;
		})
		.then((html) => {
			/* İlk 10 girdiyi ayıkla */
			const entryList = [
				...new Parser(`${ html }`, Config.handler.entry_list).getElementList(),
			].slice(0, 10);

			/* Loader'ı kaldır */
			const main = new Parser(
				document.getElementById('main'),
				'#main > .loader'
			).remover();

			/* Girdi başlıklarını ve listener'ı accordion'a ekle */
			for (const index in entryList) {
				if (index) {
					main.innerHTML += new Entry(index, entryList[index]).makeEntryTitle();
					setTimeout(() => {
						new Entry(index, entryList[index]).eventListenerAdder();
					}, 100);
				}
			}
		});
}
