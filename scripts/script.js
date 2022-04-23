const popupUser = document.querySelector('.popup_type_user');
const popupAddPlace = document.querySelector('.popup_type_place');
const popupGallery = document.querySelector('.popup_type_gallery');
//окна popup

const galleryImage = document.querySelector('.popup__gallery-image');
const galleryDescription = document.querySelector('.popup__gallery-description');
//элементы галлереи

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

const placeCardContainer = document.querySelector('.photo-grid');
const placeCardTemplate = document.querySelector('#placeCard').content;
//темплейт фото-карточки и место её вставки

function createCard(name, link) {
  const cardOnPage = placeCardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const deleteButton = cardOnPage.querySelector('.photo-grid__card-delete');
  const cardImage = cardOnPage.querySelector('.photo-grid__card-image');
  const cardTitle = cardOnPage.querySelector('.photo-grid__card-title');
  //при выносе этих переменных в ГОВ, рендерится только одни карточка, код перестаёт работать

  cardTitle.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  cardImage.addEventListener('click', function (evt) {
    openPopup(popupGallery);
    galleryImage.src = link;
    galleryImage.alt = name;
    galleryDescription.textContent = name;
  })

  cardOnPage.querySelector('.photo-grid__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__like-button_active');
  })

  deleteButton.addEventListener('click', function () {
    const cardItem = deleteButton.closest('.photo-grid__item');
    cardItem.remove();
  })

  return cardOnPage
}
//функция создания карточки+слушатели(лайк, удаление, открытие галлереи)

function renderCard(name, link) {
  placeCardContainer.prepend(createCard(name, link));
}
//рендеринг карточки на сайт

initialCards.forEach(function (cardItem) {
  renderCard(cardItem.name, cardItem.link);
});
//загрузка из "коробки"

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

const closeOnEsc = (evt) => {
     if (evt.key === 'Escape') {
      const currentPopup = document.querySelector('.popup_on');
      closePopup(currentPopup);
     }
}
//закрытие всех popup при нажатии ESC

function formPlaceSubmit (evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = imageInput.value;

  renderCard(name, link);
  closePopup(popupAddPlace)
  placeInput.value = "";
  imageInput.value = "";

  validConfig.submitButtonSelector.classList.add('popup__container-form-submit-button_disabled');
  validConfig.submitButtonSelector.disabled = true;
};
//функция подтверждения формы user + сброс ошибок и значений по умолчанию при повторном открытии

function formSubmitUser (evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  descriptionOutput.textContent = descriptionInput.value;
  closePopup(popupUser);
};
userForm.addEventListener('submit', formSubmitUser);
placeForm.addEventListener('submit', formPlaceSubmit);
//функции подтверждения форм user и place + слушатели





