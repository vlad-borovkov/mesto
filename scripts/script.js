const popup = document.querySelector('.popup');
const popupUser = document.querySelector('.popup_type_user');
const popupAddPlace = document.querySelector('.popup_place');
const popupGallery = document.querySelector('.popup_gallery');
//окна popup

const popupUserOpenButton = document.querySelector('.profile__info-edit-button');
const popupPlaceOpenButton = document.querySelector('.profile__add-button');
const popupUserCloseButton = document.querySelector('.popup__user-close-icone');
const popupAddPlaceCloseButton = document.querySelector('.popup_place-close-icone');
const popupGalleryClose = document.querySelector('.popup_gallery-close-icone');
//кнопки открытия-закрытия popup

const userForm = document.querySelector('.popup__container-form_user-form');
const placeForm = document.querySelector('.popup_place-form');
//формы

const nameInput = document.querySelector('.popup__container-form-input_user-name');
const nameOutput = document.querySelector('.profile__info-name');
const descriptionInput = document.querySelector('.popup__container-form-input_user-description');
const descriptionOutput = document.querySelector('.profile__info-description');
const placeInput = document.querySelector('.popup_place_location-input');
const imageInput = document.querySelector('.popup_place_link-input');
//поля для ввода-вывода даты

const placeCardTemplate = document.querySelector('#placeCard').content;
const placeCardContainer = document.querySelector('.photo-grid');
//темплейт фото-карточки

function createCard(name, link) {
  const cardOnPage = placeCardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const deleteButton = cardOnPage.querySelector('.photo-grid__card-delete');

  cardOnPage.querySelector('.photo-grid__card-title').textContent = name;
  cardOnPage.querySelector('.photo-grid__card-image').alt = name;
  cardOnPage.querySelector('.photo-grid__card-image').src = link;

  cardOnPage.querySelector('.photo-grid__card-image').addEventListener('click', function (evt) {
    openPopup(popupGallery);
    document.querySelector('.popup_gallery-image').src = link;
    document.querySelector('.popup_gallery-image').alt = name;
    document.querySelector('.popup_gallery-description').textContent = name;
  })

  cardOnPage.querySelector('.photo-grid__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__like-button_active');
  })

  deleteButton.addEventListener('click', function () {
    const cardItem = deleteButton.closest('.photo-grid__item');
    cardItem.remove();
  })
  const doneCardOnPage = cardOnPage
  return doneCardOnPage
}
//функция создания карточки+слушатели(лайк, удаление, открытие галлереи)

function renderCard(name, link) {
  const renderCardOnPage = placeCardContainer.prepend(createCard(name, link));
  return renderCardOnPage
}
//рендеринг карточки на сайт

initialCards.forEach(function (cardItem) {
  renderCard(cardItem.name, cardItem.link);
});
//загрузка из "коробки"

function openPopup(popup) {
  popup.classList.add('popup_on');
}
popupUserOpenButton.addEventListener('click', (event) => openPopup(popupUser));
popupPlaceOpenButton.addEventListener('click', (event) => openPopup(popupAddPlace));
//функция открытия ВСЕХ popup + слушатели открытия

function closePopup(popup) {
  popup.classList.remove('popup_on');
}
popupUserCloseButton.addEventListener('click', (event) => closePopup(popupUser));
popupAddPlaceCloseButton.addEventListener('click', (event) => closePopup(popupAddPlace));
popupGalleryClose.addEventListener('click', (event) => closePopup(popupGallery));
//функция закрытия ВСЕХ popup + слушатели

function formPlaceSubmit (evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = imageInput.value;

  renderCard(name, link);
  closePopup(popupAddPlace)
  return
};
function formSubmitUser (evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  descriptionOutput.textContent = descriptionInput.value;
  closePopup(popupUser);
  return
};
userForm.addEventListener('submit', formSubmitUser);
placeForm.addEventListener('submit', formPlaceSubmit);
//функции подтверждения форм user и place + слушатели
