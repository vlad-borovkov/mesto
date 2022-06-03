import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupSelector.querySelector(".popup__form");
    this._submitBitton = this._popupSelector.querySelector(
      ".popup__container-form-submit-button"
    );
  }

  isLoading(isLoading) {
    if (isLoading === true) {
      this._submitBitton.textContent = "Удаление...";
      this._submitBitton.disabled = true;
    } else {
      this._submitBitton.textContent = "Ок";
      this._submitBitton.disabled = false;
    }
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) =>
      this._handlerSubmitForm(evt)
    );
    super.setEventListeners();
  }

  setHandlerSubmit(handler) {
    this._handlerSubmitForm = handler;
  }
}
