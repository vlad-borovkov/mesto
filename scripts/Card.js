import {
  openPopup,
  popupGallery,
  galleryImage,
  galleryDescription
} from "./utils.js"

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;

  }
  _getTemplateCard() {
    const placeCardTemplate = document.querySelector(this._cardSelector)
    .content.querySelector(".card").cloneNode(true);

    return placeCardTemplate;
  }
  //получение шаблона карточки
  generateCard() {
    this._elementCard = this._getTemplateCard();
    this._deleteButton = this._elementCard.querySelector(
      ".card__delete-button"
    );
    this._likeButton = this._elementCard.querySelector(
      ".card__like-button"
    );
    this._cardImage = this._elementCard.querySelector(
      ".card__image"
    );
    this._cardTitle = this._elementCard.querySelector(
      ".card__title"
    );

    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._elementCard;
  }
  //создание карточки, присваивание значений, навешивание слушателей

  _setEventListeners() {
    this._likeButton
    .addEventListener("click", () => this._switchLike());
    // ставим лайк
    this._cardImage
    .addEventListener("click", () => this._openPopupGallery());
    // открываем галерею
    this._deleteButton
    .addEventListener("click", () => this._deleteCard());
  // удаляю карточку
  }
  _switchLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }
  _deleteCard() {
    this._elementCard.remove();
    this._elementCard = null;
  }
  _openPopupGallery() {
    galleryImage.src = this._link;
    galleryImage.alt = this._name;
    galleryDescription.textContent = this._name;

    openPopup(popupGallery);
  }
  //открой галлерею+слушай нажатие ESC для закрытия
}
