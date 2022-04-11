const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//массив фото-карточек


const placeCardTemplate = document.querySelector('#placeCard').content;
let placeCardContainer = document.querySelector('.photo-grid');


function createCard(name, link) {
  const CardOnPage = placeCardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const deleteButton = CardOnPage.querySelector('.photo-grid__card-delete');

  let article = CardOnPage.querySelector('.photo-grid__card-title').textContent = name;
  let altDescription = CardOnPage.querySelector('.photo-grid__card-image').alt = name;
  let image = CardOnPage.querySelector('.photo-grid__card-image').src = link;

  CardOnPage.querySelector('.photo-grid__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__like-button_active');
  })

  deleteButton.addEventListener('click', function () {
    const cardItem = deleteButton.closest('.photo-grid__item');
    cardItem.remove();
  })

  let renderCard = placeCardContainer.append(CardOnPage);
  return renderCard;
}
//функция создания карточки+слушатели(лайк, удаление)

initialCards.forEach(function (cardItem) {
  createCard(cardItem.name, cardItem.link);
});
//загрузка из "коробки"

function formPlaceSubmit (evt) {
  evt.preventDefault();
  let name = placeInput.value;
  let link = imageInput.value;

  let renderCard = createCard(name, link);
  turnOffPopupPlaceVisability()
  return renderCard
};
//добавление картинки и места через кнопку

let popup = document.querySelector('.popup');
let popupAddPlace = document.querySelector('.popup-place');
let popupGallery = document.querySelector('.popup-gallery');
//окна popup

let popupOpenButton = document.querySelector('.profile__info-edit-button');
let popupPlaceOpenButton = document.querySelector('.profile__add-button');
let popupCloseButton = document.querySelector('.popup__close-icone');
let popupAddPlaceCloseButton = document.querySelector('.popup-place__close-icone');
let placeSubmitButton = document.querySelector('.popup-place__submit-button');
//кнопки

let nameOutput = document.getElementById('name');
let descriptionOutput = document.getElementById('description');
let nameInput = document.getElementById('userName');
let descriptionInput = document.getElementById('userDescription');
let imageInput = document.getElementById('linkImage');
let placeInput = document.getElementById('userPlace');
//поля для ввода текста в popup

let turnOnPopupVisability = function() {
    popup.classList.add('popup_on');
    nameInput.value = nameOutput.textContent;
    descriptionInput.value = descriptionOutput.textContent;
};

let turnOffPopupVisability = function() {
    popup.classList.remove('popup_on');
};

let turnOnPopupPlaceVisability = function() {
    popupAddPlace.classList.add('popup-place_on');
};

let turnOffPopupPlaceVisability = function() {
  popupAddPlace.classList.remove('popup-place_on');
};

let turnOnPopupGallery = function() {
  popupGallery.classList.add('popup__gallery_on');
};

let turnOffPopupGallery = function() {
  popupGallery.classList.remove('popup__gallery_on');
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    descriptionOutput.textContent = descriptionInput.value;
    turnOffPopupVisability();
};

placeSubmitButton.addEventListener('click', formPlaceSubmit);
popupPlaceOpenButton.addEventListener('click', turnOnPopupPlaceVisability);
popupAddPlaceCloseButton.addEventListener('click', turnOffPopupPlaceVisability);
popupOpenButton.addEventListener('click', turnOnPopupVisability);
popupCloseButton.addEventListener('click', turnOffPopupVisability);
userInformation.addEventListener('submit', formSubmitHandler);
