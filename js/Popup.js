class Popup {
	constructor(container) {
		this.container = container;

		this.close = this.close.bind(this);
	}

	open(popup) {
		this.container.appendChild(popup);
		this.container.classList.add('popup_is-opened');

		const closeButton = this.container.querySelector('.popup__close');
		closeButton.addEventListener('click', this.close);
	}

	close() {
		this.container.firstElementChild.remove();
		this.container.classList.remove('popup_is-opened');
	}
}