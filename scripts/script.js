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

function formSubmitHandler (evt) {
    
    let nameInput = document.querySelector('.popup__name');
    let descriptionInput = document.querySelector('.popup__description');
    
    evt.preventDefault();

    let nameOutput = document.getElementById('name');
    let descriptionOutput = document.getElementById('description');
    
    let nameText = nameInput.value;
    let descriptionText = descriptionInput.value;
    
    nameOutput.textContent = nameText; 
    descriptionOutput.textContent = descriptionText;
};

let submitButton = document.querySelector('.popup__submit-button');
submitButton.addEventListener('click', formSubmitHandler);
submitButton.addEventListener('click', turnOffPopupVisability);

 

