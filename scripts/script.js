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


const placeCardTemplate = document.querySelector('#placeCard').content;
let placeCardContainer = document.querySelector('.photo-grid');


function createCard(name, link) {
  const CardOnPage = placeCardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const deleteButton = CardOnPage.querySelector('.photo-grid__card-delete');


  const article = CardOnPage.querySelector('.photo-grid__card-title').textContent = name;
  const altDescription = CardOnPage.querySelector('.photo-grid__card-image').alt = name;
  const image = CardOnPage.querySelector('.photo-grid__card-image').src = link;

  CardOnPage.querySelector('.photo-grid__card-image').addEventListener('click', function () {
    turnOnPopupGallery()
    document.querySelector('.popup_gallery-image').src = link;
    document.querySelector('.popup_gallery-image').alt = name;
    document.querySelector('.popup_gallery-description').textContent = name;
  })

  CardOnPage.querySelector('.photo-grid__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__like-button_active');
  })

  deleteButton.addEventListener('click', function () {
    const cardItem = deleteButton.closest('.photo-grid__item');
    cardItem.remove();
  })

  let renderCard = placeCardContainer.prepend(CardOnPage);
  return renderCard;
}
//функция создания карточки+слушатели(лайк, удаление, открытие галлереи)

initialCards.forEach(function (cardItem) {
  createCard(cardItem.name, cardItem.link);
});
//загрузка из "коробки"

function formPlaceSubmit (evt) {
  evt.preventDefault();
  let name = placeInput.value;
  let link = imageInput.value;

  let renderCard = createCard(name, link);
  turnOffPlacePopup()
  return renderCard
};
//добавление картинки и места через кнопку

let popup = document.querySelector('.popup_user');
let popupAddPlace = document.querySelector('.popup_place');
let popupGallery = document.querySelector('.popup_gallery');
//окна popup

let popupOpenButton = document.querySelector('.profile__info-edit-button');
let popupPlaceOpenButton = document.querySelector('.profile__add-button');
let popupCloseButton = document.querySelector('.popup_user-close-icone');
let popupAddPlaceCloseButton = document.querySelector('.popup_place-close-icone');
let popupGalleryClose = document.querySelector('.popup_gallery-close-icone');
//кнопки открытия-закрытия popup

const userForm = document.querySelector('.popup_user-form');
const placeForm = document.querySelector('.popup_place-form');
//формы

const nameInput = document.querySelector('.popup_user_name-input');
const nameOutput = document.querySelector('.profile__info-name');
const descriptionInput = document.querySelector('.popup_user_description-input');
const descriptionOutput = document.querySelector('.profile__info-description');
const placeInput = document.querySelector('.popup_place_location-input');
const imageInput = document.querySelector('.popup_place_link-input');
//поля для ввода-вывода даты

let turnOnUserPopup = function() {
    popup.classList.add('popup_user_on');
    nameInput.value = nameOutput.textContent;
    descriptionInput.value = descriptionOutput.textContent;
};

let turnOffUserPopup = function() {
    popup.classList.remove('popup_user_on');
};

let turnOnPlacePopup = function() {
    popupAddPlace.classList.add('popup_place_on');
};

let turnOffPlacePopup = function() {
  popupAddPlace.classList.remove('popup_place_on');
};

let turnOnPopupGallery = function() {
  popupGallery.classList.add('popup_gallery_on');
};

let turnOffPopupGallery = function() {
  popupGallery.classList.remove('popup_gallery_on');
};

function formSubmitUser (evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    descriptionOutput.textContent = descriptionInput.value;
    turnOffUserPopup();
};

userForm.addEventListener('submit', formSubmitUser);
placeForm.addEventListener('submit', formPlaceSubmit);

popupPlaceOpenButton.addEventListener('click', turnOnPlacePopup);
popupAddPlaceCloseButton.addEventListener('click', turnOffPlacePopup);
popupOpenButton.addEventListener('click', turnOnUserPopup);
popupCloseButton.addEventListener('click', turnOffUserPopup);
popupGalleryClose.addEventListener('click', turnOffPopupGallery);
//слушатели открытия-закрытия, сабмита
