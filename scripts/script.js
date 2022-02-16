let popupOpenButton = document.querySelector('.profile__info-edit-button');
let popupCloseButton = document.querySelector('.popup__close-icone');
let popupOn = document.querySelector('.popup');

let turnOnPopupVisability = function() {
    popupOn.classList.remove('popup_off');
};

let turnOffPopupVisability = function() {
    popupOn.classList.add('popup_off');
};

popupOpenButton.addEventListener('click', turnOnPopupVisability);

popupCloseButton.addEventListener('click', turnOffPopupVisability);





