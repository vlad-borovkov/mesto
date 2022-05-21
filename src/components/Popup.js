export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._visiblePopup = document.querySelector(".popup_on");
    this._popupCloseIcone = this._popupSelector.querySelector(
      ".popup__close-icone"
    );
    this._handleCloseOnEsc = this._handleCloseOnEsc.bind(this);
    this._popupOverlay = this._popupSelector;
  }
  setEventListeners() {
    this._popupCloseIcone.addEventListener("click", () => this.close());
    this._popupOverlay.addEventListener("click", this._closeOnOverlay);
  }

  open() {
    this._popupSelector.classList.add("popup_on");
    document.addEventListener("keydown", this._handleCloseOnEsc);
  }

  close() {
    this._popupSelector.classList.remove("popup_on");
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
