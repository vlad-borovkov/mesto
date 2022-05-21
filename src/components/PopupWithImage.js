import Popup from "./Popup.js";
import { galleryImage, galleryDescription } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(clickCardValue) {

    galleryImage.src = clickCardValue.link;
    galleryImage.alt = clickCardValue.name;
    galleryDescription.textContent = clickCardValue.name;

    super.open();
  }
}
