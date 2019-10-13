const cards = document.querySelector('.places-list');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const formPopupAddCard = document.querySelector('#add-card').content;
const formPopupProfile = document.querySelector('#profile').content;
const bigSizeImage = document.querySelector('#big-size-image').content;
const popupTemplate = document.querySelector('#popup');

const initialCards = [{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	},
	{
		name: 'Нургуш',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
	},
	{
		name: 'Тулиновка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
	},
	{
		name: 'Остров Желтухина',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
	},
	{
		name: 'Владивосток',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
	}
];

const createPopup = (popupTemplate, form) => {
	const template = popupTemplate.cloneNode(true);
	template.children[0].appendChild(form.create());

	return template;
}

const createForm = (inputOptions, formOptions) => {
	const inputs = inputOptions.map((option) => new InputField(option));
	const form = new Form({
		inputs,
		...formOptions
	});

	return form;
}

const openFormAdd = () => {
	const form = createForm(
		[{
				type: 'text',
				value: '',
				inputName: 'name',
				className: 'popup__input_type_name',
				placeholder: 'Название',
				validator: validateString
			},
			{
				type: 'text',
				value: '',
				inputName: 'link',
				className: 'popup__input_type_link-url',
				placeholder: 'Ссылка на картинку',
				validator: validateLink
			}
		], {
			submitText: '+',
			formName: 'new',
			submitCallback: submitFormAdd
		}
	);
	const template = createPopup(formPopupAddCard, form);
	popup.open(template);
	form.validate();
}

const openFormProfile = () => {
	const nameField = userInfoName.textContent;
	const jobField = userInfoJob.textContent;
	const form = createForm(
		[{
				type: 'text',
				inputName: 'name',
				className: '',
				value: nameField,
				placeholder: 'Имя',
				validator: validateString
			},
			{
				type: 'text',
				inputName: 'job',
				className: '',
				value: jobField,
				placeholder: '"О себе',
				validator: validateString
			}
		], {
			submitText: 'Сохранить',
			formName: 'profile',
			submitCallback: submitFormProfile
		}
	);
	const template = createPopup(formPopupProfile, form);
	popup.open(template);
	form.validate();
}

const submitFormProfile = (name, job) => {
	userInfoName.textContent = name;
	userInfoJob.textContent = job;
	popup.close();
}

const submitFormAdd = (name, url) => {
	cardList.addCard(new Card(name, url));
	popup.close();
}

// 0 - пустая строка
// 1 - ок
// 2 - слишком длинная или короткая

const validateLenghtStr = (str, min, max) => {
	if (str.length === 0) return 0;
	if (str.length >= min && str.length <= max) return 1;
	return 2;
}

const validURL = (str) => {
	var pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$',
		'i'
	); // fragment locator
	return !!pattern.test(str);
}

const validateString = (value) => {
	let result;
	let isValid = true;
	switch (validateLenghtStr(value, 2, 30)) {
		case 0:
			result = 'Это обязательное поле';
			isValid = false;
			break;
		case 1:
			result = '';
			break;
		case 2:
			result = 'Должно быть от 2 до 30 символов';
			isValid = false;
			break;
	}

	return {
		isValid,
		result
	};
}

const validateLink = (value) => {
	let isValid = true;
	let result;
	if (validURL(value)) {
		result = '';
	} else {
		result = 'Здесь должна быть ссылка';
		isValid = false;
	}

	return {
		isValid,
		result
	};
}

const popup = new Popup(popupTemplate);

const cardsArray = [];
initialCards.forEach(function (item) {
	const card = new Card(item.name, item.link);
	cardsArray.push(card);
});

const cardList = new CardList(cards, cardsArray);
cardList.render();

const button = document.querySelector('.user-info__button');
button.addEventListener('click', openFormAdd);

const buttonEdit = document.querySelector('.button.user-info__edit');
buttonEdit.addEventListener('click', openFormProfile);