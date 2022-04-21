const validConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__container-form-input',
  submitButtonSelector: '.popup__container-form-submit-button',
  inactiveButtonClass: 'popup__container-form-submit-button_disabled',
  inputErrorClass: 'popup__container-form-input_type_error',
  errorClass: 'popup__error_visible'
};

const enableValidation = (object) => {

  const formList = Array.from(document.forms);

      formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
        });
      setEventListeners(formElement, object);
     });
    };

  const setEventListeners = (formElement, object) => {
    const inputList = Array.from(formElement.querySelectorAll(`${object.inputSelector}`));
    const buttonElement = formElement.querySelector(`${object.submitButtonSelector}`);

    toggleButtonState(inputList, buttonElement, object.inactiveButtonClass);

        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, object.errorClass, object.inputErrorClass);

            toggleButtonState(inputList, buttonElement, object.inactiveButtonClass);
          });
        });
     };

const checkInputValidity = (formElement, inputElement, errorClass, inputErrorClass) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
    } else {
      hideInputError(formElement, inputElement, errorClass, inputErrorClass);
    }
};

const showInputError = (formElement, inputElement, errorMessage, errorClass, inputErrorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(`${inputErrorClass}`);
    errorElement.classList.add(`${errorClass}`);
    errorElement.textContent = errorMessage;
   };

const hideInputError = (formElement, inputElement, errorClass, inputErrorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(`${inputErrorClass}`);
    errorElement.classList.remove(`${errorClass}`);
    errorElement.textContent = "";
  };

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

  const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${inactiveButtonClass}`);
      buttonElement.disabled = true;
    }
    else {
      buttonElement.classList.remove(`${inactiveButtonClass}`);
      buttonElement.disabled = false;
    }
  }

enableValidation(validConfig);





