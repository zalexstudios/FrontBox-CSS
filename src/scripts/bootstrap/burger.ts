import { scrollLock } from '../app';
import { Component } from './component';

/**
 * Toggle burger container
 *
 * @version					1.0
 * @style						burger.scss
 * @require					ScrollLock
 * @changelog
 * 28.08.2019 Cleaning
 * 26.06.2019 Add
 */

interface IBurger {
	button: HTMLElement;
	container: HTMLElement;
	overlay?: HTMLElement;
	cssClassActive?: string;
	expandTime?: number;
}

export class Burger extends Component {
	private button: HTMLElement;
	private container: HTMLElement;
	private overlay?: HTMLElement;

	private active: boolean = false;
	private moving: boolean = false;

	private expandTime: number = 200;

	private cssClassActive: string = 'js_burger-active';

	constructor(param: IBurger) {
		super(param);
	}

	public onInit() {
		this.button.onclick = () => {
			this.toggle();
		};

		if (this.overlay) {
			this.overlay.onclick = () => {
				this.toggle();
			};
		}
	}

	private toggle() {
		if (this.moving) {
			return false;
		}
		this.moving = true;
		this.active = !this.active;

		scrollLock.change(this.active);
		this.container.classList.toggle(this.cssClassActive);

		window.setTimeout(() => {
			this.moving = false;
		}, this.expandTime);
	}
}
