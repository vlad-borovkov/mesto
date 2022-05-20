export default class Card {
  constructor(data, cardSelector, handlerCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handlerCardClick = handlerCardClick;
  }
  //получение шаблона карточки
  _getTemplateCard() {
    const placeCardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return placeCardTemplate;
  }
  //создание карточки, присваивание значений, навешивание слушателей
  generateCard() {
    this._elementCard = this._getTemplateCard();
    this._deleteButton = this._elementCard.querySelector(
      ".card__delete-button"
    );
    this._likeButton = this._elementCard.querySelector(".card__like-button");
    this._cardImage = this._elementCard.querySelector(".card__image");
    this._cardTitle = this._elementCard.querySelector(".card__title");

    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._elementCard;
  }
  _setEventListeners() {
    // ставим лайк
    this._likeButton.addEventListener("click", () => this._switchLike());
    // открываем галерею
    this._cardImage.addEventListener("click", (event) => {
      this._handlerCardClick(event.target);
    });
    // удаляю карточку
    this._deleteButton.addEventListener("click", () => this._deleteCard());
  }
  _switchLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }
  _deleteCard() {
    this._elementCard.remove();
    this._elementCard = null;
  }
}
