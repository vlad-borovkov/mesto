let popup = document.querySelector('.popup');
let popupAddPlace = document.querySelector('.popup-place');
//место для popup с картинкой

let popupOpenButton = document.querySelector('.profile__info-edit-button');
let popupPlaceOpenButton = document.querySelector('.profile__add-button');
let popupCloseButton = document.querySelector('.popup__close-icone');
let popupAddPlaceCloseButton = document.querySelector('.popup-place__close-icone');



let nameOutput = document.getElementById('name');
let descriptionOutput = document.getElementById('description');

let nameInput = document.getElementById('userName');
let descriptionInput = document.getElementById('userDescription');

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
