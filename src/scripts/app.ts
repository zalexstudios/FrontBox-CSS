/*!************************************************************************
Framework:      FrontBox 1.3.0
Author:         Bartosz Piwek
Repository:     https://github.com/BartoszPiwek/FrontBox
************************************************************************!*/

import { html } from './bootstrap/elements';
import { Browser } from './bootstrap/browser';
import { CookieInformation } from './bootstrap/cookie';
import { InputCounter } from './bootstrap/input-counter';
import { Resize } from './bootstrap/resize';
import { ScrollLock } from './bootstrap/scroll-lock';
import { Burger } from './bootstrap/burger';
import { ElementPlaceholder } from './bootstrap/element-placeholder';
import { Sticky } from './bootstrap/sticky';
import { Tabs } from './bootstrap/tabs';
import { ProtectEmail } from './bootstrap/protect-email';
import { scrollTo } from './bootstrap/scroll-to';
import { polyfill } from './app/polyfill';
import { FrontboxConsole } from './bootstrap/console';
import { Wcag } from './bootstrap/wcag';

/* test-code */
export const frontboxConsole = new FrontboxConsole({
	hide: false,
	open: false,
	autoOpen: false
});
/* end-test-code */

export const scrollLock = new ScrollLock();
export const browser = new Browser();

window.onload = () => {
	const resize = new Resize();

	new Burger({
		button: document.getElementById('burger-button'),
		container: document.getElementById('header'),
		overlay: document.getElementById('burger-overlay')
	});

	new Sticky({
		element: document.getElementById('header-content')
	});

	new Tabs({
		name: 'primary'
	});

	new ProtectEmail({
		elements: document.querySelectorAll('.js_email')
	});

	/* Forms */
	new InputCounter({
		cssClass: {
			wrap: `[data-bind="input-counter"]`,
			input: `.input-counter__input`,
			button: `.input-counter__btn`,
			disable: `--disable`
		}
	});

	/* Informations */
	new CookieInformation({
		templateUrl: 'partials/cookies.html'
	});

	new Wcag();

	// const placeholder = new ElementPlaceholder();
	// placeholder.create(document.getElementById('header'));

	/* Polyfill */
	polyfill({
		scrollbarWidth: browser.scrollbarWidth
	});
	/* Inform stylesheed to remove style fallback for JavaScript elements */
	html.classList.remove('js_no');
	/* test-code */
	frontboxConsole.add({
		title: 'App',
		content: 'Running correct'
	});
	/* end-test-code */
};
