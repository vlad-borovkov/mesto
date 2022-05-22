import "./index.css"; // добавьте импорт главного файла стилей

import {
  validConfig,
  initialCards,
  cardsContainer,
  popupUser,
  popupGallery,
  popupAddPlace,
  popupUserOpenButton,
  popupPlaceOpenButton,
  userForm,
  placeForm,
} from "./../utils/constants.js";


import FormValidator from "./../components/FormValidator.js";
import Card from "./../components/Card.js";
import Section from "./../components/Section.js";
import PopupWithImage from "./../components/PopupWithImage.js";
import PopupWithForm from "./../components/PopupWithForm.js";
import UserInfo from "./../components/UserInfo.js";

//поля для ввода информации о пользователе
const nameInput = document.querySelector(
  ".popup__container-form-input_user-name"
);
const descriptionInput = document.querySelector(
  ".popup__container-form-input_user-description"
);

// шаблон-селектор фото-карточки
const cardSelector = "#placeCard";

//запускаем валидацию форм User и Place
const userFormValidation = new FormValidator(validConfig, userForm);
userFormValidation.enableValidation();

const placeFormValidation = new FormValidator(validConfig, placeForm);
placeFormValidation.enableValidation();

//открываем-закрываем popupUser, получаем текущую информацию о пользователея для вывода на дисплей,
const openCloseUserPopup = new PopupWithForm(popupUser, {});
const userInfo = new UserInfo({ firstname: ".profile__info-name", description: ".profile__info-description" });

popupUserOpenButton.addEventListener("click", () => {
  userFormValidation.resetAllError();

  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.firstname;
  descriptionInput.value = currentUserInfo.description;

  openCloseUserPopup.open();
});

//рендерринг данных пользователя в popupUser гибридной связью классов
const popupWithUserInfo = new PopupWithForm(popupUser, {
  handlerSubmitForm: (formData) => {
    const userValue = {
      firstname: formData.firstname,
      description: formData.description,
    };
    userInfo.setUserInfo(userValue)
  },
});
popupWithUserInfo.setEventListeners();

//открываем-закрываем окно добавления фото-карточки
const openClosePlacePopup = new PopupWithForm(popupAddPlace, {});
popupPlaceOpenButton.addEventListener("click", () => {
  placeFormValidation.resetAllError();
  openClosePlacePopup.open();
});

//открываем-закрываем галлерею
const openCloseGalleryPopup = new PopupWithImage(popupGallery);
openCloseGalleryPopup.setEventListeners();

//универсальная функция возвращения карточки после ручного нажатия
const returnClickCard = (data) => {
  const card = new Card(data, cardSelector, (clickValue) => {
    const cardValue = {
      name: clickValue.alt,
      link: clickValue.src,
    };
    openCloseGalleryPopup.open(cardValue);
  });
  const cardElement = card.generateCard();
  return cardElement;
};

//автоматическая загрузка карточек по умолчанию + вывод авто-карточек в popupGallery при handleClick
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const cardElement = returnClickCard(item);
      cardList.addItem(cardElement);
    },
  },
  cardsContainer
);
cardList.renderItems();

//ручное добавление карточек + disable для кнопки submit при повторном открытии формы +
//открытие popupGallery при handleClick
const popupWithFormPlace = new PopupWithForm(popupAddPlace, {
  handlerSubmitForm: (formData) => {
    const inputValue = {
      name: formData.user_place,
      link: formData.link_place,
    };
    placeFormValidation.disabledSubmitButton();
    const cardElement = returnClickCard(inputValue);
    cardList.addItem(cardElement);
  },
});

popupWithFormPlace.setEventListeners();
