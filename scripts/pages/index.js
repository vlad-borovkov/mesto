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
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//поля для ввода информации о пользователе
const nameInput = document.querySelector(
  ".popup__container-form-input_user-name"
);
const descriptionInput = document.querySelector(
  ".popup__container-form-input_user-description"
);

// шаблон-селектор фото-карточки
const cardSelector = "#placeCard";

//запускаем валидацию форм
const userFormValidation = new FormValidator(validConfig, userForm);
userFormValidation.enableValidation();

const placeFormValidation = new FormValidator(validConfig, placeForm);
placeFormValidation.enableValidation();

//открываем-закрываем окно добавления фото-карточки
const openClosePlacePopup = new Popup(popupAddPlace);

popupPlaceOpenButton.addEventListener("click", () =>
  openClosePlacePopup.open()
);

//получаем текущую информацию о пользователея для вывода на дисплей, открываем-закрываем popupUser
const openCloseUserPopup = new Popup(popupUser);

const userInfo = new UserInfo({});
userInfo.getUserInfo();

popupUserOpenButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.firstname;
  descriptionInput.value = currentUserInfo.description;

  openCloseUserPopup.open();
});

//рендерринг данных пользователя в popupUser гибридной связью классов
const popupWithUserInfo = new PopupWithForm({
  popupSelector: popupUser,
  handlerSubmitForm: (formData) => {
    const userValue = {
      firstname: formData.firstname,
      description: formData.description,
    };
    const setInfo = new UserInfo(userValue);
    setInfo.setUserInfo();
  },
});
popupWithUserInfo.setEventListeners();

//автоматическая загрузка карточек по умолчанию + вывод авто-карточек в popupGallery при handleClick
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardSelector, (clickValue) => {
        const cardValue = {
          name: clickValue.alt,
          link: clickValue.src,
        };
        const openCloseGalleryPopup = new PopupWithImage({
          popupSelector: popupGallery,
          clickCardValue: cardValue,
        });
        openCloseGalleryPopup.open();
      });
      
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  cardsContainer
);
cardList.renderItems();

//ручное добавление карточек + disable для кнопки submit при повторном открытии формы +
//открытие popupGallery при handleClick
const popupWithFormPlace = new PopupWithForm({
  popupSelector: popupAddPlace,
  handlerSubmitForm: (formData) => {
    const inputValue = {
      name: formData.user_place,
      link: formData.link_place,
    };
    placeFormValidation.disabledSubmitButton();

    const handleAddCard = new Card(inputValue, cardSelector, (clickValue) => {
      const cardValue = {
        name: clickValue.alt,
        link: clickValue.src,
      };
      const openCloseGalleryPopup = new PopupWithImage({
        popupSelector: popupGallery,
        clickCardValue: cardValue,
      });

      openCloseGalleryPopup.open();
    });
    const cardElement = handleAddCard.generateCard();
    cardList.addItem(cardElement);
  },
});
popupWithFormPlace.setEventListeners();
