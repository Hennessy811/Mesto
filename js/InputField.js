class InputField {
	constructor(options) {
		const {
			type,
			inputName,
			className,
			placeholder,
			validator,
			value
		} = options;
		this.type = type;
		this.inputName = inputName;
		this.className = className;
		this.placeholder = placeholder;
		this.input = null;
		this.value = value;
		this.validator = validator;
		this.errorField = null;
	}

	create() {
		const input = document.createElement('input');
		input.type = this.type;
		input.name = this.inputName;
		input.placeholder = this.placeholder;
		input.classList.add('popup__input');

		if (this.className) input.classList.add(this.className);
		if (this.value) input.value = this.value;

		const error = document.createElement('div');
		error.classList.add('popup__input-error');
		error.classList.add(`error-${this.inputName}`);
		error.setAttribute('aria-live', 'polite');

		const container = document.createElement('div');
		container.appendChild(input);
		container.appendChild(error);

		this.input = container;
		this.errorField = error;
		return container;
	}

	validate() {
		const {
			isValid,
			result
		} = this.validator(this.value);
		this.errorField.textContent = result;
		return isValid;
	}
}