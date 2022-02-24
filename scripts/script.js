let popupOpenButton = document.querySelector('.profile__info-edit-button');
let popupCloseButton = document.querySelector('.popup__close-icone');
let popup = document.querySelector('.popup');

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

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    descriptionOutput.textContent = descriptionInput.value;

    turnOffPopupVisability();
};

popupOpenButton.addEventListener('click', turnOnPopupVisability);
popupCloseButton.addEventListener('click', turnOffPopupVisability);
userInformation.addEventListener('submit', formSubmitHandler);
