//закрытие всех popup при нажатии ESC
const handleCloseOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector(".popup_on");
    closePopup(currentPopup);
  }
};
