import Popup from "./Popup.js";
import { galleryImage, galleryDescription } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._galleryImage = document.querySelector(".popup__gallery-image");
    this._galleryDescription = document.querySelector(
  ".popup__gallery-description"
);
  }

  open(clickCardValue) {

    this._galleryImage.src = clickCardValue.link;
    this._galleryImage.alt = clickCardValue.name;
    this._galleryDescription.textContent = clickCardValue.name;

    super.open();
  }
}
