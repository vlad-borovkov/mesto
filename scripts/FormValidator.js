export const validConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__container-form-input',
  submitButtonSelector: '.popup__container-form-submit-button',
  inactiveButtonClass: 'popup__container-form-submit-button_disabled',
  inputErrorClass: 'popup__container-form-input_type_error',
  errorClass: 'popup__error_visible'
 };

export class FormValidator {
  constructor(config, selectorForm) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = selectorForm;
  }

  enableValidation() {
    const currentForm = this._formElement;

    currentForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      });

    this._setEventListeners(currentForm);
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass)

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, this._errorClass, this._inputErrorClass);

        this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
      });
    });
  }

  _checkInputValidity(formElement, inputElement, errorClass, inputErrorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
    }
    else {
      this._hideInputError(formElement, inputElement, errorClass, inputErrorClass);
    }
  };

  _showInputError(formElement, inputElement, errorMessage, errorClass, inputErrorClass) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(`${inputErrorClass}`);
    errorElement.classList.add(`${errorClass}`);
    errorElement.textContent = errorMessage;
   };

  _hideInputError(formElement, inputElement, errorClass, inputErrorClass) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(`${inputErrorClass}`);
    errorElement.classList.remove(`${errorClass}`);
    errorElement.textContent = "";
  };

  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${inactiveButtonClass}`);
      buttonElement.disabled = true;
    }
    else {
      buttonElement.classList.remove(`${inactiveButtonClass}`);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
}
