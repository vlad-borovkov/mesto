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
export const popupAvatarOpenButton = document.querySelector(".profile__avatar");

//поля для ввода информации о пользователе
export const nameInput = document.querySelector(
  ".popup__container-form-input_user-name"
);
export const descriptionInput = document.querySelector(
  ".popup__container-form-input_user-description"
);

// шаблон-селектор фото-карточки
export const cardSelector = "#placeCard";

//окна popup
export const popupUser = document.querySelector(".popup_type_user");
export const popupGallery = document.querySelector(".popup_type_gallery");
export const popupAddPlace = document.querySelector(".popup_type_place");
export const popupAvatarEdit = document.querySelector(".popup_type_avatar");
export const popupConfirmDelete = document.querySelector(".popup_type_delete");

//формы
export const userForm = document.querySelector(".popup__user-form");
export const placeForm = document.querySelector(".popup__place-form");
export const avatarForm = document.querySelector(".popup__avatar-form");

//вывод информации о пользователе
export const nameOutput = document.querySelector(".profile__info-name");
export const descriptionOutput = document.querySelector(
  ".profile__info-description"
);

//кнопки подтверждения форм
export const avatarSubmitButton = document.querySelector(
  ".popup__container-form-submit-button_type_avatar"
);
export const userSubmitButton = document.querySelector(
  ".popup__container-form-submit-button_active"
);
export const placeSubmitButton = document.querySelector(
  ".popup__container-form-submit-button_type_place"
);
export const deleteSubmitButton = document.querySelector(
  ".popup__container-form-submit-button_type_delete"
);
