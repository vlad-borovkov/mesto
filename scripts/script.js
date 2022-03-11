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

const placeCardOnPage = placeCardTemplate.querySelector('.photo-grid__item').cloneNode(true);
placeCardOnPage.querySelector('.photo-grid__card-image').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
placeCardOnPage.querySelector('.photo-grid__card-title').textContent = 'Черногория';

placeCardContainer.append(placeCardOnPage);

let popup = document.querySelector('.popup');
let popupAddPlace = document.querySelector('.popup-place');
//окна менюшек popup

let popupOpenButton = document.querySelector('.profile__info-edit-button');
let popupPlaceOpenButton = document.querySelector('.profile__add-button');
let popupCloseButton = document.querySelector('.popup__close-icone');
let popupAddPlaceCloseButton = document.querySelector('.popup-place__close-icone');
//кнопки открытия-закрытия


let nameOutput = document.getElementById('name');
let descriptionOutput = document.getElementById('description');
let nameInput = document.getElementById('userName');
let descriptionInput = document.getElementById('userDescription');
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
}

let turnOffPopupPlaceVisability = function() {
  popupAddPlace.classList.remove('popup-place_on');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    descriptionOutput.textContent = descriptionInput.value;
    turnOffPopupVisability();
};

popupPlaceOpenButton.addEventListener('click', turnOnPopupPlaceVisability);
popupAddPlaceCloseButton.addEventListener('click', turnOffPopupPlaceVisability);
popupOpenButton.addEventListener('click', turnOnPopupVisability);
popupCloseButton.addEventListener('click', turnOffPopupVisability);
userInformation.addEventListener('submit', formSubmitHandler);
