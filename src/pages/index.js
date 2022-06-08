import "./index.css";
import FormValidator from "./../components/FormValidator.js";
import Card from "./../components/Card.js";
import Section from "./../components/Section.js";
import PopupWithImage from "./../components/PopupWithImage.js";
import PopupWithForm from "./../components/PopupWithForm.js";
import UserInfo from "./../components/UserInfo.js";
import Api from "./../components/Api.js";
import PopupWithConfirm from "./../components/PopupWithConfirm.js";

import {
  validConfig,
  cardsContainer,
  popupConfirmDelete,
  popupAvatarEdit,
  popupUser,
  popupGallery,
  popupAddPlace,
  popupUserOpenButton,
  popupPlaceOpenButton,
  popupAvatarOpenButton,
  userForm,
  placeForm,
  avatarForm,
  nameInput,
  descriptionInput,
  cardSelector,
} from "./../utils/constants.js";

//обращаемся к серверу
const api = new Api({
  domain: "https://mesto.nomoreparties.co/v1/cohort-42",
  token: "96627758-08f0-44b6-bee2-1f817be1a78f",
});

//вызываем popups
const popupZoomImage = new PopupWithImage(popupGallery);
const popupConfirm = new PopupWithConfirm(popupConfirmDelete);

//запрос информации пользователя, вставка в разметку
////конфиг для вставки в разметку инфо о пользователе
const userInfo = new UserInfo({
  firstname: ".profile__info-name",
  description: ".profile__info-description",
  avatar: ".profile__avatar-picture",
});
api
  .getUserValue()
  .then((res) => {
    const [userData, cardsData] = res;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userInfo.setUserId(userData);
    cardList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });
//функция создания карточки с колбэками API: лайк, удаление, открытие галлереи
const createCard = (data) => {
  const card = new Card(
    data,
    cardSelector,
    (handlerCardClick) => {
      const cardValue = {
        name: handlerCardClick.alt,
        link: handlerCardClick.src,
      };
      popupZoomImage.open(cardValue);
    },
    (handlerLike) => {
      const cardId = card.getCardId();
      if (!card.isLiked) {
        api
          .addLikeOnCard(cardId)
          .then((data) => {
            card.setLike();
            card.likesCountUpdate(data.likes);
            console.log(data);
          })
          .catch((err) => {
            console.log(`ошибка ${err}`);
          });
      } else {
        api
          .deleteLikeOnCard(cardId)
          .then((data) => {
            card.unsetLike();
            card.likesCountUpdate(data.likes);
          })
          .catch((err) => {
            console.log(`ошибка ${err}`);
          });
      }
      card.setLike();
    },
    (handlerDelete) => {
      const cardId = card.getCardId();
      const cardElement = handlerDelete.closest(".card");
      popupConfirm.setHandlerSubmit((evt) => {
        evt.preventDefault();
        popupConfirm.isLoadingConfirm(true);
        api
          .deleteCard(cardId)
          .then(() => {
            cardElement.remove();
            popupConfirm.close();
          })
          .catch((err) => {
            console.log(`ошибка ${err}`);
          })
          .finally(() => {
            popupConfirm.isLoadingConfirm(false);
          });
      });
      popupConfirm.open();
    },
    userInfo.getUserId()
  );
  const cardElement = card.generateCard();
  return cardElement;
};
//функция вставки карточек в разметку гибридной связью
const cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItemAppend(cardElement);
    },
  },
  cardsContainer
);

//рендерринг данных пользователя в popupUser гибридной связью классов
const popupWithUserInfo = new PopupWithForm(popupUser, {
  handlerSubmitForm: (formData) => {
    popupWithUserInfo.isLoading(true);
    const userValue = {
      firstname: formData.firstname,
      description: formData.description,
    };
    api
      .changeUserInfo(userValue)
      .then((userValue) => {
        userInfo.setUserInfoHandler(userValue);
        popupWithUserInfo.close();
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      })
      .finally(() => {
        popupWithUserInfo.isLoading(false);
      });
  },
});

//добавление на сервер и в разметку карточки в ручную
const popupWithFormPlace = new PopupWithForm(popupAddPlace, {
  handlerSubmitForm: (formData) => {
    const cardData = {
      name: formData.user_place,
      link: formData.link_place,
    };
    popupWithFormPlace.isLoading(true);
    api
      .handlerAddCard(cardData)
      .then((cardValue) => {
        const cardElement = createCard(cardValue);
        cardList.addItemPrepend(cardElement);
        popupWithFormPlace.close();
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      })
      .finally(() => {
        popupWithFormPlace.isLoading(false);
      });
    cardsContainer;
  },
});

//конфиг для вставки аватарки
const changeAvatar = new UserInfo({
  avatar: ".profile__avatar-picture",
});

//смена popupAvatar, отправка аватарки на сервер из формы
const popupWithAvatar = new PopupWithForm(popupAvatarEdit, {
  handlerSubmitForm: (formData) => {
    const avatarUrl = {
      avatar: formData.avatar,
    };
    popupWithAvatar.isLoading(true);
    api
      .changeAvatar(avatarUrl)
      .then((replacedAvatar) => {
        changeAvatar.setUserAvatar(replacedAvatar);
        popupWithAvatar.close();
      })
      .catch((err) => {
        console.log(`ошибка ${err.message}`);
      })
      .finally(() => {
        popupWithAvatar.isLoading(false);
      });
  },
});

//открываем-закрываем popupAvatar
popupAvatarOpenButton.addEventListener("click", () => {
  avatarFormValidation.resetAllError();
  avatarFormValidation.disabledSubmitButton();
  popupWithAvatar.open();
});

//открываем-закрываем popupUser, получаем текущую информацию о пользователея для вывода на дисплей
popupUserOpenButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.firstname;
  descriptionInput.value = currentUserInfo.description;

  userFormValidation.resetAllError();
  userFormValidation.disabledSubmitButton();
  popupWithUserInfo.open();
});

//открываем-закрываем окно добавления фото-карточки
const openClosePlacePopup = new PopupWithForm(popupAddPlace, {});
popupPlaceOpenButton.addEventListener("click", () => {
  placeFormValidation.resetAllError();
  placeFormValidation.disabledSubmitButton();
  openClosePlacePopup.open();
});

//запускаем валидацию форм User, Place, Avatar.
const userFormValidation = new FormValidator(validConfig, userForm);
userFormValidation.enableValidation();

const placeFormValidation = new FormValidator(validConfig, placeForm);
placeFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(validConfig, avatarForm);
avatarFormValidation.enableValidation();

//все слушатели
popupConfirm.setEventListeners();
popupWithAvatar.setEventListeners();
popupWithFormPlace.setEventListeners();
popupWithUserInfo.setEventListeners();
popupZoomImage.setEventListeners();
