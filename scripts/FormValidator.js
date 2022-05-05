export class FormValidator {
  constructor(config, selectorForm) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = selectorForm;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners(this._formElement);
  }

  _setEventListeners(formElement) {
    this._toggleButtonState(
      this._inputList,
      this._buttonElement,
      this._inactiveButtonClass
    );

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(
          formElement,
          inputElement,
          this._errorClass,
          this._inputErrorClass
        );

        this._toggleButtonState(
          this._inputList,
          this._buttonElement,
          this._inactiveButtonClass
        );
      });
    });
  }

  _checkInputValidity(formElement, inputElement, errorClass, inputErrorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        errorClass,
        inputErrorClass
      );
    } else {
      this._hideInputError(
        formElement,
        inputElement,
        errorClass,
        inputErrorClass
      );
    }
  }

  _showInputError(
    formElement,
    inputElement,
    errorMessage,
    errorClass,
    inputErrorClass
  ) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(`${inputErrorClass}`);
    errorElement.classList.add(`${errorClass}`);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(formElement, inputElement, errorClass, inputErrorClass) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(`${inputErrorClass}`);
    errorElement.classList.remove(`${errorClass}`);
    errorElement.textContent = "";
  }

  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${inactiveButtonClass}`);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(`${inactiveButtonClass}`);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  resetAllError() {
    const popupError = this._formElement.querySelectorAll(".popup__error");

    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove("popup__container-form-input_type_error");
    });

    popupError.forEach((errorElement) => {
      errorElement.innerText = "";
    });
    }
    //сброс ошибки в input и span при повторном открытии окна USER

  disabledSubmitButton() {
    this._buttonElement.classList.add(
      "popup__container-form-submit-button_disabled"
    );
    this._buttonElement.disabled = true;
    //дизабл для кнопки в форме
  }

}
