let popupOpenButton = document.querySelector('.profile__info-edit-button');
let popupCloseButton = document.querySelector('.popup__close-icone');
let popup = document.querySelector('.popup');

let nameOutput = document.getElementById('name');
let descriptionOutput = document.getElementById('description');

let nameInput = document.querySelector('.popup__name');
let descriptionInput = document.querySelector('.popup__description'); 

let turnOnPopupVisability = function() {
    popup.classList.add('popup_on');
    nameInput.value = nameOutput.innerText;
    descriptionInput.value = descriptionOutput.innerText;
};

let turnOffPopupVisability = function() {
    popup.classList.remove('popup_on');
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value; 
    descriptionOutput.textContent = descriptionInput.value;
};

popupOpenButton.addEventListener('click', turnOnPopupVisability);
popupCloseButton.addEventListener('click', turnOffPopupVisability);

userInformation.addEventListener('submit', formSubmitHandler);
userInformation.addEventListener('submit', turnOffPopupVisability);