class Card {
	constructor(name, url) {
		this.name = name;
		this.url = url;
		this.card = null;
	}

	create() {
		const oneCard = document.createElement('div');
		oneCard.classList.add('place-card');

		const imgCard = document.createElement('div');
		imgCard.classList.add('place-card__image');
		imgCard.style.backgroundImage = `url(${this.url})`;
		imgCard.onclick = (evt) => {
			if (evt.target.classList.contains('place-card__delete-icon')) return;
			const template = bigSizeImage.cloneNode(true);
			const popupImage = template.querySelector('.popup__image');
			popupImage.src = event.target.style.backgroundImage.slice(5, -2);
			popup.open(template);
		};

		const btnImgCard = document.createElement('button');
		btnImgCard.classList.add('place-card__delete-icon');
		btnImgCard.onclick = (evt) => {
			evt.preventDefault();
			this.remove();
		};

		const descCard = document.createElement('div');
		descCard.classList.add('place-card__description');

		const h3Card = document.createElement('h3');
		h3Card.classList.add('place-card__name');
		h3Card.textContent = this.name;

		const btnLike = document.createElement('button');
		btnLike.classList.add('place-card__like-icon');
		btnLike.onclick = (evt) => {
			evt.preventDefault();
			this.like();
		};

		oneCard.appendChild(imgCard);
		imgCard.appendChild(btnImgCard);
		oneCard.appendChild(descCard);
		descCard.appendChild(h3Card);
		descCard.appendChild(btnLike);

		this.card = oneCard;
		return this.card;
	}

	like() {
		this.card.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
	}

	remove() {
		this.card.remove();
	}
}