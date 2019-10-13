class Form {
	constructor(options) {
		const {
			inputs,
			submitText,
			formName,
			submitCallback
		} = options;
		this.inputs = inputs;
		this.submitText = submitText;
		this.formName = formName;
		this.form = null;
		this.isValid = false;
		this.submitCallback = submitCallback;

		this.validate = this.validate.bind(this);
	}

	create() {
		const form = document.createElement('form');
		form.classList.add('popup__form');
		form.name = this.formName;

		this.inputs.forEach((input) => {
			const inputNode = input.create();
			inputNode.querySelector('input').addEventListener('input', (evt) => {
				input.value = evt.target.value;
				this.validate();
			});
			form.appendChild(inputNode);
		});

		const submitButton = document.createElement('button');
		submitButton.classList.add('button');
		submitButton.classList.add('popup__button');
		submitButton.type = 'submit';
		submitButton.innerText = this.submitText;
		form.appendChild(submitButton);

		this.form = form;
		this.form.addEventListener('submit', (evt) => {
			this.onSubmit(evt);
		});
		return this.form;
	}

	validate() {
		const results = [];
		this.inputs.forEach((input) => results.push(input.validate()));
		const errors = results.filter((result) => result === false);

		if (errors.length > 0) {
			this.form.querySelector('.popup__button').classList.remove('popup__button_enable');
			this.isValid = false;
			return;
		}

		this.form.querySelector('.popup__button').classList.add('popup__button_enable');
		this.isValid = true;
	}

	onSubmit(evt) {
		evt.preventDefault();

		if (!this.isValid) return;

		const values = this.inputs.map((input) => input.value);
		this.submitCallback(...values);
		this.form.reset();
	}
}