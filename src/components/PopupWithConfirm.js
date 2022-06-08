import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._popupElement.querySelector(
      ".popup__container-form-submit-button"
    );
    this._deleteSubmitButton = document.querySelector(
      ".popup__container-form-submit-button_type_delete"
    );
  }

  isLoadingConfirm(isLoading) {
    if (isLoading === true) {
      this._submitButton.textContent = "Удаление...";
      this._submitButton.disabled = true;
    } else {
      this._submitButton.disabled = false;
      this._submitButton.textContent = "Да";
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
