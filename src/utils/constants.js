//массив фото-карточек
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// конфиг валидации
export const validConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__container-form-input",
  submitButtonSelector: ".popup__container-form-submit-button",
  inactiveButtonClass: "popup__container-form-submit-button_disabled",
  inputErrorClass: "popup__container-form-input_type_error",
  errorClass: "popup__error_visible",
  commonErrorClass: ".popup__error",
};

//разметка для вставки карточки
export const cardsContainer = ".photo-grid";

//кнопки открытия popup
export const popupUserOpenButton = document.querySelector(
  ".profile__info-edit-button"
);
export const popupPlaceOpenButton = document.querySelector(
  ".profile__add-button"
);

//окна popup
export const popupUser = document.querySelector(".popup_type_user");
export const popupGallery = document.querySelector(".popup_type_gallery");
export const popupAddPlace = document.querySelector(".popup_type_place");

//формы
export const userForm = document.querySelector(".popup__user-form");
export const placeForm = document.querySelector(".popup__place-form");

//элементы popup галлереи
export const galleryImage = document.querySelector(".popup__gallery-image");
export const galleryDescription = document.querySelector(
  ".popup__gallery-description"
);

//вывод информации о пользователе
export const nameOutput = document.querySelector(".profile__info-name");
export const descriptionOutput = document.querySelector(
  ".profile__info-description"
);

// //поля для ввода информации для карточки на всякий случай
// const placeInput = document.querySelector(
//   ".popup__container-form-input_location"
// );
// const imageInput = document.querySelector(".popup__container-form-input_link");

// //кнопки открытия-закрытия отдельного popup на всякий случай
// const popupAddPlaceCloseButton = document.querySelector(
//   ".popup__place-close-icone"
// );
// const popupUserCloseButton = document.querySelector(".popup__user-close-icone");
// const popupGalleryClose = document.querySelector(".popup__gallery-close-icone");
