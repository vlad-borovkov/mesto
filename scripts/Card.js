import { closeOnEsc } from "./index.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//массив фото-карточек

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplateCard() {
    const placeCardTemplate = document.
    querySelector('#placeCard').content
    .querySelector('.photo-grid__item').cloneNode(true);

    return placeCardTemplate
  }
//получение шаблона карточки
  generateCard() {
    this._elementCard = this._getTemplateCard();

    this._elementCard.querySelector('.photo-grid__card-image').alt = this._name;
    this._elementCard.querySelector('.photo-grid__card-image').src = this._link;
    this._elementCard.querySelector('.photo-grid__card-title').textContent = this._name;

    this._setEventListeners();

    return this._elementCard
  }
  //создание карточки, присваивание значений, навешивание слушателей

  _setEventListeners() {
    this._elementCard.
    querySelector('.photo-grid__card-delete').
    addEventListener('click', () => this._deleteCard());
    // delete card
    this._elementCard.
    querySelector('.photo-grid__like-button').
    addEventListener('click', () => this._likeSwitcher());
    // like switching
    this._elementCard.
    querySelector('.photo-grid__card-image').
    addEventListener('click', () => this._openPopupGallery());
  }
  _deleteCard() {
    const _deleteButton = this._elementCard.querySelector('.photo-grid__card-delete');
    const _cardForDelete = _deleteButton.closest('.photo-grid__item');

    _cardForDelete.remove();
  }
  _likeSwitcher() {
    const _likeButton = this._elementCard.querySelector('.photo-grid__like-button');

    _likeButton.classList.toggle('photo-grid__like-button_active');
  }

  _openPopupGallery() {
    const _popupGallery = document.querySelector('.popup_type_gallery');
    const _galleryImage = document.querySelector('.popup__gallery-image');
    const _galleryDescription = document.querySelector('.popup__gallery-description');

    _popupGallery.classList.add('popup_on');
    document.addEventListener('keydown', closeOnEsc)

    _galleryImage.src = this._link
    _galleryImage.alt = this._name;
    _galleryDescription.textContent = this._name;
  }
  //открой галлерею+слушай нажатие ESC для закрытия
}

initialCards.forEach(function (cardItem) {
  const placeCardContainer = document.querySelector('.photo-grid');
  const card = new Card(cardItem);
  const CardElement = card.generateCard();

  placeCardContainer.prepend(CardElement);
});
//функция рендеринга карточки и загрузка из коробки
