export class FormValidator {
  constructor(config, selectorForm) {
    this._formElement = selectorForm;
    this._commonErrorClass = config.commonErrorClass;
    this._errorList = Array.from(
      this._formElement.querySelectorAll(this._commonErrorClass)
    );
    this._inputSelector = config.inputSelector;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  enableValidation() {

    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(`${this._inputErrorClass}`);
    errorElement.classList.add(`${this._errorClass}`);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(`${this._inputErrorClass}`);
    errorElement.classList.remove(`${this._errorClass}`);
    errorElement.textContent = "";
  }

  _toggleButtonState() {
    this.disabledSubmitButton()
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(`${this._inactiveButtonClass}`);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(`${this._inactiveButtonClass}`);
      this._buttonElement.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  resetAllError() {

    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove("popup__container-form-input_type_error");
    });

    this._errorList.forEach((errorElement) => {
      errorElement.innerText = "";
    });
    }
    //сброс ошибки в input и span при повторном открытии окна USER

  disabledSubmitButton() {
    this._buttonElement.classList.add(
      this._inactiveButtonClass
    );
    this._buttonElement.disabled = true;
    //дизабл для кнопки в форме
  }

}
