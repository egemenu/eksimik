import App from './js/app';
import './scss/main.scss';

/* DOM Content Loader */
document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		new App();
	}, 750);
});
