import { FormValidator } from "./FormValidator.js";
import { validConfig } from "./Constants.js";
import { initialCards } from "./Constants.js";
import { Card } from "./Card.js";

export const popupUser = document.querySelector(".popup_type_user");
const popupAddPlace = document.querySelector(".popup_type_place");
export const popupGallery = document.querySelector(".popup_type_gallery");
//окна popup

const popupUserOpenButton = document.querySelector(
  ".profile__info-edit-button"
);
const popupPlaceOpenButton = document.querySelector(".profile__add-button");
const popupUserCloseButton = document.querySelector(".popup__user-close-icone");
const popupAddPlaceCloseButton = document.querySelector(
  ".popup__place-close-icone"
);
const popupGalleryClose = document.querySelector(".popup__gallery-close-icone");
//кнопки открытия-закрытия popup

export const galleryImage = document.querySelector(".popup__gallery-image");
export const galleryDescription = document.querySelector(
  ".popup__gallery-description"
);
//элементы popup галлереи

const userForm = document.querySelector(".popup__user-form");
const placeForm = document.querySelector(".popup__place-form");
//формы

const buttonSubmitPlace = document.querySelector(
  ".popup__container-form-submit-button_type_place"
);
//кнопка формы Place

const nameInput = document.querySelector(
  ".popup__container-form-input_user-name"
);
const nameOutput = document.querySelector(".profile__info-name");
const descriptionInput = document.querySelector(
  ".popup__container-form-input_user-description"
);
const descriptionOutput = document.querySelector(".profile__info-description");
const placeInput = document.querySelector(
  ".popup__container-form-input_location"
);
const imageInput = document.querySelector(".popup__container-form-input_link");
//поля для ввода-вывода даты

const placeCardContainer = document.querySelector(".photo-grid");
//разметка для вставки карточки

function setDefaultUserValue(name, description) {
  name.value = nameOutput.textContent;
  description.value = descriptionOutput.textContent;
}
//присвоение базовых значение для popup user

export function openPopup(somePopup) {
  somePopup.classList.add("popup_on");
  document.addEventListener("keydown", handleCloseOnEsc);
}
popupUserOpenButton.addEventListener("click", () => {
  const resetError = new FormValidator(validConfig, userForm);
  resetError.resetAllError();
  setDefaultUserValue(nameInput, descriptionInput);
  openPopup(popupUser);
});
popupPlaceOpenButton.addEventListener("click", (event) =>
  openPopup(popupAddPlace)
);
//функция открытия ВСЕХ popup + слушатели открытия

function closePopup(somePopup) {
  somePopup.classList.remove("popup_on");
  document.removeEventListener("keydown", handleCloseOnEsc);
}
popupUserCloseButton.addEventListener("click", (event) => {
  closePopup(popupUser);
});
popupAddPlaceCloseButton.addEventListener("click", (event) =>
  closePopup(popupAddPlace)
);
popupGalleryClose.addEventListener("click", (event) =>
  closePopup(popupGallery)
);
//функция закрытия ВСЕХ popup + слушатели

const closeOnOverlay = () => {
  const popupList = Array.from(document.querySelectorAll(".popup"));

  popupList.forEach((popupElement) => {
    popupElement.addEventListener("click", function (event) {
      if (event.target.classList.contains("popup")) {
        closePopup(event.target);
      }
    });
  });
};
closeOnOverlay();
//закрытие всех popup при клике на overlay

const handleCloseOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector(".popup_on");
    closePopup(currentPopup);
  }
};
//закрытие всех popup при нажатии ESC

function submitPlaceForm() {
  const placeData = {};

  placeData.name = placeInput.value;
  placeData.link = imageInput.value;

  placeCardContainer.prepend(createCard(placeData, placeForm));
  //рендеринг карточки на сайт
  closePopup(popupAddPlace);
  placeInput.value = "";
  imageInput.value = "";
  //очистка полей формы
  const buttonForDisabled = new FormValidator(validConfig, placeForm);
  buttonForDisabled.disabledSubmitButton();
}
//функция подтверждения формы Place + сброс ошибок и значений по умолчанию при повторном открытии

function submitUserForm() {
  nameOutput.textContent = nameInput.value;
  descriptionOutput.textContent = descriptionInput.value;
  closePopup(popupUser);
}
userForm.addEventListener("submit", submitUserForm);
placeForm.addEventListener("submit", submitPlaceForm);
//функции подтверждения форм user и place + слушатели

const userFormValidation = new FormValidator(validConfig, userForm);
userFormValidation.enableValidation();

const placeFormValidation = new FormValidator(validConfig, placeForm);
placeFormValidation.enableValidation();
//запускаем валидацию форм

function createCard(cardItem, cardSelector) {
  const card = new Card(cardItem, cardSelector);
  const cardElementOnPage = card.generateCard();

  return cardElementOnPage;
}
//функция рендеринга карточки
initialCards.forEach(function (cardItem) {
  placeCardContainer.prepend(createCard(cardItem));
});
// загрузка из коробки
