import "./index.css"; // добавьте импорт главного файла стилей
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
} from "./../utils/constants.js";


const userInfo = new UserInfo({
  firstname: ".profile__info-name",
  description: ".profile__info-description",
  avatar: ".profile__avatar_picture",
});

const api = new Api({
  domain: "https://mesto.nomoreparties.co/v1/cohort-42",
  token: "96627758-08f0-44b6-bee2-1f817be1a78f"
});

const openCloseGalleryPopup = new PopupWithImage(popupGallery);

//запускаем валидацию форм User, Place, Avatar...
const userFormValidation = new FormValidator(validConfig, userForm);
userFormValidation.enableValidation();

const placeFormValidation = new FormValidator(validConfig, placeForm);
placeFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(validConfig, avatarForm);
avatarFormValidation.enableValidation();

const popupConfirm = new PopupWithConfirm(popupConfirmDelete);

api.getUserValue()
    .then((res) => {
      const [userData, cardsData] = res;
      userInfo.setUserInfo(userData);
      userInfo.setUserAvatar(userData);
      userInfo.setUserId(userData);
      cardList.renderItems(cardsData)
    })
    .catch((err) => {
      console.log(err)
  })

  const returnClickCard = (data) => {
    const card = new Card(
      data,
      cardSelector,
      (handlerCardClick) => {
        const cardValue = {
          name: handlerCardClick.alt,
          link: handlerCardClick.src,
        };
        openCloseGalleryPopup.open(cardValue);
      },
      (handlerLike) => {
        const cardId = card.getCardId();
        if (!card.isLiked) {
          api.addLikeOnCard(cardId)
            .then((data) => {
              card.setLike();
              card.likesCountUpdate(data.likes);
            })
            .catch((err) => {
              console.log(`ошибка ${err}`);
            });
        } else {
          api.deleteLikeOnCard(cardId)
            .then((data) => {
              card.unsetLike();
              card.likesCountUpdate(data.likes);
            })
            .catch((err) => {
              console.log(`ошибка ${err}`);
            });
        }
      },
      (handlerDelete) => {
        const cardId = card.getCardId()
        const cardElement = evt.target.closest(".card");
        popupConfirm.setHandlerSubmit((evt) => {
          evt.preventDefault();
          popupConfirm.isLoading(true);
          //продолжить на удалении карточки
        })
      },
      "1a98c019797abaeb0c1c917e"
    );
    const cardElement = card.generateCard();
    return cardElement;
  };

const cardList = new Section({
      renderer: (item) => {
        const cardElement = returnClickCard(item);
        cardList.addItem(cardElement);
      },
    },
    cardsContainer
  );




//поля для ввода информации о пользователе
const nameInput = document.querySelector(
  ".popup__container-form-input_user-name"
);
const descriptionInput = document.querySelector(
  ".popup__container-form-input_user-description"
);

// шаблон-селектор фото-карточки
const cardSelector = "#placeCard";



  //открываем-закрываем popupUser, получаем текущую информацию о пользователея для вывода на дисплей,
  const openCloseUserPopup = new PopupWithForm(popupUser, {});
  popupUserOpenButton.addEventListener("click", () => {
    userFormValidation.resetAllError();

    const currentUserInfo = userInfo.getUserInfo();

    nameInput.value = currentUserInfo.firstname;
    descriptionInput.value = currentUserInfo.description;

    openCloseUserPopup.open();
  });


  // вывод авто-карточек в popupGallery при handleClick


//открываем-закрываем popupAvatar
const openCloseAvatarPopup = new PopupWithForm(popupAvatarEdit, {});
popupAvatarOpenButton.addEventListener("click", () => {
  avatarFormValidation.resetAllError();
  avatarFormValidation.disabledSubmitButton();
  openCloseAvatarPopup.open();
});

//смена popupAvatar, отправка аватарки на сервер из формы
const popupWithAvatar = new PopupWithForm(popupAvatarEdit, {
  handlerSubmitForm: (formData) => {
    const avatarUrl = {
      avatar: formData.avatar,
    };
    api.changeAvatar(avatarUrl.avatar).then((replacedAvatar) => {
      const changeAvatar = new UserInfo({
        avatar: ".profile__avatar_picture",
      });
      changeAvatar.setUserAvatar(replacedAvatar);
    });
  },
});
popupWithAvatar.setEventListeners();

//рендерринг данных пользователя в popupUser гибридной связью классов
const popupWithUserInfo = new PopupWithForm(popupUser, {
  handlerSubmitForm: (formData) => {
    const userValue = {
      firstname: formData.firstname,
      description: formData.description,
    };
    api.changeUserInfo(userValue).then((userValue) => {
      const userInfo = new UserInfo({
        firstname: ".profile__info-name",
        description: ".profile__info-description",
      });
      userInfo.setUserInfoHandler(userValue);
    });
  },
});
popupWithUserInfo.setEventListeners();

//открываем-закрываем окно добавления фото-карточки
const openClosePlacePopup = new PopupWithForm(popupAddPlace, {});
popupPlaceOpenButton.addEventListener("click", () => {
  placeFormValidation.resetAllError();
  placeFormValidation.disabledSubmitButton();
  openClosePlacePopup.open();
});

//ручное добавление карточек + disable для кнопки submit при повторном открытии формы + открытие popupGallery при handleClick
const popupWithFormPlace = new PopupWithForm(popupAddPlace, {
  handlerSubmitForm: (formData) => {
    const cardData = {
      name: formData.user_place,
      link: formData.link_place,
    };
    api.handlerAddCard(cardData).then((cardValue) => {
      const arrayWithCard = [];
      arrayWithCard.unshift(cardValue);
      console.log(arrayWithCard);
      const cardList = new Section(
        {
          data: arrayWithCard,
          renderer: (item) => {
            const cardElement = returnClickCard(item);

            cardList.addItem(cardElement);
          },
        },
        cardsContainer
      );
    });
  },
});
popupWithFormPlace.setEventListeners();


//все слушатели
openCloseGalleryPopup.setEventListeners();

// вывод авто-карточек в popupGallery при handleClick
// const cardList = new Section(
//   {
//     data: cardsData,
//     renderer: (item) => {
//       const cardElement = returnClickCard(item);
//       cardList.addItem(cardElement);
//     },
//   },
//   cardsContainer
// );
// cardList.renderItems();

// //универсальная функция возвращения карточки после ручного нажатия
// const returnClickCard = (data) => {
//   const card = new Card(data, cardSelector, (clickValue) => {
//     const cardValue = {
//       name: clickValue.alt,
//       link: clickValue.src,
//     };
//     openCloseGalleryPopup.open(cardValue);
//   });
//   const cardElement = card.generateCard();
//   return cardElement;
// };

// //автоматическая загрузка карточек по умолчанию + вывод авто-карточек в popupGallery при handleClick
// const cardList = new Section(
//   {
//     data: initialCards,
//     renderer: (item) => {
//       const cardElement = returnClickCard(item);
//       cardList.addItem(cardElement);
//     },
//   },
//   cardsContainer
// );
// cardList.renderItems()
