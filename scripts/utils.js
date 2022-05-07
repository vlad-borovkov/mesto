const handleCloseOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector(".popup_on");
    closePopup(currentPopup);
  }
};
//закрытие всех popup при нажатии ESC
export function openPopup(somePopup) {
  somePopup.classList.add("popup_on");
  document.addEventListener("keydown", handleCloseOnEsc);
}
function closePopup(somePopup) {
  somePopup.classList.remove("popup_on");
  document.removeEventListener("keydown", handleCloseOnEsc);
}

export const popupUser = document.querySelector(".popup_type_user");
export const popupGallery = document.querySelector(".popup_type_gallery");
//окна popup

export const galleryImage = document.querySelector(".popup__gallery-image");
export const galleryDescription = document.querySelector(
  ".popup__gallery-description"
);

//элементы popup галлереи
