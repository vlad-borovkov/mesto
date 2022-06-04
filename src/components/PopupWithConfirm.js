import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupSelector.querySelector(".popup__form");
    this._submitButton = this._popupSelector.querySelector(
      ".popup__container-form-submit-button"
    );
  }

  isLoadingConfirm(isLoading) {
    if (isLoading === true) {
      this._submitButton.textContent = "Удаление...";
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = "Готово";
      this._submitButton.disabled = false;
    }
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      this._handlerSubmitForm(evt);
    });
    super.setEventListeners();
  }

  setHandlerSubmit(handler) {
    this._handlerSubmitForm = handler;
  }
}
