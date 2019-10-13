class CardList {
	constructor(container, cards) {
		this.container = container;
		this.cards = cards;
	}

	addCard(card) {
		this.cards.push(card);
		this.container.appendChild(card.create());
	}

	render() {
		const fragment = document.createDocumentFragment();
		this.cards.forEach((card) => fragment.appendChild(card.create()));
		this.container.appendChild(fragment);
	}
}
