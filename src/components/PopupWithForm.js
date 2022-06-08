import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, {handlerSubmitForm}) {
    super(popupElement);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._handlerSubmitForm = handlerSubmitForm;
    this._inputList = this._popupElement.querySelectorAll(".popup__container-form-input");
    this._submitButton = this._popupElement.querySelector(".popup__container-form-submit-button")


  }


  _getInputValues() {

    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value});

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners()
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(this._getInputValues());
    })
  }


  isLoading(isLoading) {
    if (isLoading === true) {
        this._submitButton.textContent = 'Сохранение...';
        this._submitButton.disabled = true;
    } else {
        this._submitButton.textContent = 'Создать';
        this._submitButton.disabled = false;
    }
}

open(){
  super.open()
}

  close(){
    super.close()
    this._formElement.reset()
    //очистка полей формы
  }

}

