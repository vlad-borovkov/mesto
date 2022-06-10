export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._popupCloseIcone = this._popupElement.querySelector(
      ".popup__close-icone"
    );
    this._handleCloseOnEsc = this._handleCloseOnEsc.bind(this);
    this._popupOverlay = this._popupElement;
  }

  setEventListeners() {
    this._popupCloseIcone.addEventListener("click", () => this.close());
    this._popupOverlay.addEventListener("click", this._closeOnOverlay);
  }

  open() {
    this._popupElement.classList.add("popup_on");
    document.addEventListener("keydown", this._handleCloseOnEsc);
  }

  close() {
    this._popupElement.classList.remove("popup_on");
    document.removeEventListener("keydown", this._handleCloseOnEsc);
  }

  _closeOnOverlay = (event) => {
    if (event.target.classList.contains("popup")) {
      this.close();
    }
  };

  _handleCloseOnEsc(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}
