import { Card } from "./Card.js";
import { validConfig, FormValidator } from "./FormValidator.js";

const popupUser = document.querySelector('.popup_type_user');
const popupAddPlace = document.querySelector('.popup_type_place');
const popupGallery = document.querySelector('.popup_type_gallery');
//окна popup

const popupUserOpenButton = document.querySelector('.profile__info-edit-button');
const popupPlaceOpenButton = document.querySelector('.profile__add-button');
const popupUserCloseButton = document.querySelector('.popup__user-close-icone');
const popupAddPlaceCloseButton = document.querySelector('.popup__place-close-icone');
const popupGalleryClose = document.querySelector('.popup__gallery-close-icone');
//кнопки открытия-закрытия popup

const userForm = document.querySelector('.popup__user-form');
const placeForm = document.querySelector('.popup__place-form');
//формы

const submitPlaceButton = document.querySelector('.popup__container-form-submit-button_type_place');
//кнопка формы Place

const nameInput = document.querySelector('.popup__container-form-input_user-name');
const nameOutput = document.querySelector('.profile__info-name');
const descriptionInput = document.querySelector('.popup__container-form-input_user-description');
const descriptionOutput = document.querySelector('.profile__info-description');
const placeInput = document.querySelector('.popup__container-form-input_location');
const imageInput = document.querySelector('.popup__container-form-input_link');
//поля для ввода-вывода даты

const placeCardContainer = document.querySelector('.photo-grid');
//разметка для вставки карточки


function defaultUserValue (name, description) {
  name.value = nameOutput.textContent
  description.value = descriptionOutput.textContent;
};
//присвоение базовых значение для профиля user

function errorUserReset() {
  popupUser.querySelector('.name-input-error').innerText = "";
  popupUser.querySelector('.description-input-error').innerText = "";

  popupUser.querySelector('#name-input').classList.remove('popup__container-form-input_type_error');
  popupUser.querySelector('#description-input').classList.remove('popup__container-form-input_type_error');
};
//сброс ошибки в input и span при повторном открытии окна USER

function openPopup(somePopup) {
  somePopup.classList.add('popup_on');
  document.addEventListener('keydown', closeOnEsc)
};
popupUserOpenButton.addEventListener('click', () => {
  errorUserReset();
  openPopup(popupUser);
  defaultUserValue(nameInput, descriptionInput);
});
popupPlaceOpenButton.addEventListener('click', (event) => openPopup(popupAddPlace));
//функция открытия ВСЕХ popup + слушатели открытия


function closePopup(somePopup) {
  somePopup.classList.remove('popup_on');
  document.removeEventListener('keydown', closeOnEsc);
}
popupUserCloseButton.addEventListener('click', (event) => {
  closePopup(popupUser);
});
popupAddPlaceCloseButton.addEventListener('click', (event) => closePopup(popupAddPlace));
popupGalleryClose.addEventListener('click', (event) => closePopup(popupGallery));
//функция закрытия ВСЕХ popup + слушатели

const closeOnOverlay = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));

  popupList.forEach((popupElement) => {
  popupElement.addEventListener('click', function (event) {
   if (event.target.classList.contains('popup')) {
      closePopup(event.target)
      };
    });
  });
};
closeOnOverlay();
//закрытие всех popup при клике на overlay

export const closeOnEsc = (evt) => {
     if (evt.key === 'Escape') {
      const currentPopup = document.querySelector('.popup_on');
      closePopup(currentPopup);
      document.removeEventListener('keydown', closeOnEsc);
     }
}
//закрытие всех popup при нажатии ESC

function submitPlaceForm () {
  const placeData = {};

  placeData.name = placeInput.value;
  placeData.link = imageInput.value;

  const card = new Card(placeData);
  const CardElement = card.generateCard();

  placeCardContainer.prepend(CardElement);
//рендеринг карточки на сайт
  closePopup(popupAddPlace)
  placeInput.value = "";
  imageInput.value = "";
//очистка полей формы
  submitPlaceButton.classList.add('popup__container-form-submit-button_disabled');
  submitPlaceButton.disabled = true;
//дизабл для кнопки в форме
};
//функция подтверждения формы Place + сброс ошибок и значений по умолчанию при повторном открытии

function submitUserForm () {
  nameOutput.textContent = nameInput.value;
  descriptionOutput.textContent = descriptionInput.value;
  closePopup(popupUser);
};
userForm.addEventListener('submit', submitUserForm);
placeForm.addEventListener('submit', submitPlaceForm);
//функции подтверждения форм user и place + слушатели

const UserFormValidation = new FormValidator(validConfig, userForm);
UserFormValidation.enableValidation()

const PlaceFormValidation = new FormValidator(validConfig, placeForm);
PlaceFormValidation.enableValidation()
//запускаем валидацию форм

