import { FormValidator } from "./FormValidator.js";
import { validConfig } from "./constants.js";
import { initialCards } from "./constants.js";
import { Card } from "./Card.js";
import { openPopup, closePopup } from "./utils.js";

const popupUser = document.querySelector(".popup_type_user");
const popupAddPlace = document.querySelector(".popup_type_place");
const popupGallery = document.querySelector(".popup_type_gallery");
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

const userForm = document.querySelector(".popup__user-form");
const placeForm = document.querySelector(".popup__place-form");
//формы

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

const userFormValidation = new FormValidator(validConfig, userForm);
userFormValidation.enableValidation();

const placeFormValidation = new FormValidator(validConfig, placeForm);
placeFormValidation.enableValidation();
//запускаем валидацию форм

function setDefaultUserValue(name, description) {
  name.value = nameOutput.textContent;
  description.value = descriptionOutput.textContent;
}
//присвоение базовых значение для popup user

popupUserOpenButton.addEventListener("click", () => {
  userFormValidation.resetAllError();
  setDefaultUserValue(nameInput, descriptionInput);
  openPopup(popupUser);
});
popupPlaceOpenButton.addEventListener("click", (event) =>
  openPopup(popupAddPlace)
);
//функция открытия ВСЕХ popup + слушатели открытия

popupUserCloseButton.addEventListener("click", (event) => {
  closePopup(popupUser);
});
popupAddPlaceCloseButton.addEventListener("click", (event) =>
  closePopup(popupAddPlace)
);
popupGalleryClose.addEventListener("click", (event) =>
  closePopup(popupGallery)
);
// закрытие ВСЕХ popup + навешиваем слушатели

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

const renderCard = (cardItem) => {
  placeCardContainer.prepend(createCard(cardItem));
};

function submitPlaceForm() {
  const placeData = {};

  placeData.name = placeInput.value;
  placeData.link = imageInput.value;

  renderCard(placeData);

  //рендеринг карточки на сайт
  closePopup(popupAddPlace);
  placeInput.value = "";
  imageInput.value = "";
  //очистка полей формы
  placeFormValidation.disabledSubmitButton();
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

function createCard(cardItem, cardSelector) {
  const card = new Card(cardItem, cardSelector);
  const cardElementOnPage = card.generateCard();

  return cardElementOnPage;
}
//функция рендеринга карточки

initialCards.forEach(renderCard);
// загрузка из коробки
