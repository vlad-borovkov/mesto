import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handlerSubmitForm}) {
    super(popupSelector);
    this._formElement = this._popupSelector.querySelector(".popup__form");
    this._handlerSubmitForm = handlerSubmitForm;
    this._inputList = this._popupSelector.querySelectorAll(".popup__container-form-input");
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
      this.close()
    })
  }

  close(){
    super.close()
    this._formElement.reset()
    //очистка полей формы
  }
}

