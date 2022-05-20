import Popup from "./Popup.js";
import { galleryImage, galleryDescription } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, clickCardValue }) {
    super(popupSelector);
    this._link = clickCardValue.link;
    this._name = clickCardValue.name;
  }

  open() {
    galleryImage.src = this._link;
    galleryImage.alt = this._name;
    galleryDescription.textContent = this._name;

    super.open();
  }
}
