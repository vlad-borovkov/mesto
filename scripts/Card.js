import {
  openPopup,
  popupGallery,
  galleryImage,
  galleryDescription,
} from "./index.js";

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._elementCard = this._getTemplateCard();
    this._likeButton = this._elementCard.querySelector(
      ".card__like-button"
    );
    this._cardImage = this._elementCard.querySelector(
      ".card__image"
    );
    this._cardTitle = this._elementCard.querySelector(
      ".card__title"
    );
  }

  _getTemplateCard() {
    const placeCardTemplate = document
      .querySelector("#placeCard")
      .content.querySelector(".card")
      .cloneNode(true);

    return placeCardTemplate;
  }
  //получение шаблона карточки
  generateCard() {
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._elementCard;
  }
  //создание карточки, присваивание значений, навешивание слушателей

  _setEventListeners() {
    this._elementCard
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._deleteCard());
    // удаляю карточку
    this._elementCard
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._switchLike());
    // ставим лайк
    this._elementCard
      .querySelector(".card__image")
      .addEventListener("click", () => this._openPopupGallery());
    // открываем галерею
  }
  _deleteCard() {
    this._element = null;
    this._elementCard.remove();
  }
  _switchLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _openPopupGallery() {
    openPopup(popupGallery);

    galleryImage.src = this._link;
    galleryImage.alt = this._name;
    galleryDescription.textContent = this._name;
  }
  //открой галлерею+слушай нажатие ESC для закрытия
}
