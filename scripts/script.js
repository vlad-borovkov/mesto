const popup = document.querySelector('.popup');
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

const nameInput = document.querySelector('.popup__container-form-input_user-name');
const nameOutput = document.querySelector('.profile__info-name');
const descriptionInput = document.querySelector('.popup__container-form-input_user-description');
const descriptionOutput = document.querySelector('.profile__info-description');
const placeInput = document.querySelector('.popup__container-form-input_location');
const imageInput = document.querySelector('.popup__container-form-input_link');
//поля для ввода-вывода даты

const placeCardTemplate = document.querySelector('#placeCard').content;
const placeCardContainer = document.querySelector('.photo-grid');
//темплейт фото-карточки


function defaultUserValue (name, description) {
  name.value = "Жак-Ив Кусто";
  description.value = "Исследователь океана";
  return
}
defaultUserValue (nameInput, descriptionInput);
//присвоение базовых значение для профиля user

function createCard(name, link) {
  const cardOnPage = placeCardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const deleteButton = cardOnPage.querySelector('.photo-grid__card-delete');

  cardOnPage.querySelector('.photo-grid__card-title').textContent = name;
  cardOnPage.querySelector('.photo-grid__card-image').alt = name;
  cardOnPage.querySelector('.photo-grid__card-image').src = link;

  cardOnPage.querySelector('.photo-grid__card-image').addEventListener('click', function (evt) {
    openPopup(popupGallery);
    document.querySelector('.popup__gallery-image').src = link;
    document.querySelector('.popup__gallery-image').alt = name;
    document.querySelector('.popup__gallery-description').textContent = name;
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



function openPopup(somePopup) {
  somePopup.classList.add('popup_on');
  document.addEventListener('keydown', closeOnEsc);
  closeOnOverlay();
}



popupUserOpenButton.addEventListener('click', (event) => openPopup(popupUser));
popupPlaceOpenButton.addEventListener('click', (event) => openPopup(popupAddPlace));
//функция открытия ВСЕХ popup + слушатели открытия

function closePopup(somePopup) {
  somePopup.classList.remove('popup_on');
}
popupUserCloseButton.addEventListener('click', (event) => closePopup(popupUser));
popupAddPlaceCloseButton.addEventListener('click', (event) => closePopup(popupAddPlace));
popupGalleryClose.addEventListener('click', (event) => closePopup(popupGallery));
//функция закрытия ВСЕХ popup + слушатели

const closeOnOverlay = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));

  popupList.forEach((popupElement) => {
  popupElement.addEventListener('click', function (event) {
   if (event.target.classList.contains("popup_type_user")) {
    closePopup(popupUser);
      };
    if (event.target.classList.contains("popup_type_place")) {
        closePopup(popupAddPlace);
      };
    if (event.target.classList.contains("popup_type_gallery")) {
        closePopup(popupGallery);
      };
    });
  });
};

const closeOnEsc = (evt) => {
  const currentPopup = document.querySelector(".popup_on");
     if (evt.key === 'Escape') {
      closePopup(currentPopup);
     }
}

//закрытие всех popup при клике на overlay и ESC

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





