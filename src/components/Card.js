export default class Card {
  constructor(data, cardSelector, handlerCardClick, handlerLike, handlerDelete, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handlerCardClick = handlerCardClick;
    this._isCurrentUserCard = userId === data.owner._id;
    this._handlerLike = handlerLike;
    this._handlerDelete = handlerDelete;
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

  getCardId() {
    return this._cardId
  }

  setLike() {
    this._likeButton.classList.add('card__like-button_active');
    this.isLiked = true
  }

  unsetLike() {
    this._likeButton.classList.remove('card__like-button_active')
    this.isLiked = false
  }

  likesCountUpdate(data) {
    this._countLike.textContent = data.length;
}

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

    if (!this._isCurrentUserCard) {
        this._elementCard.querySelector(".card__delete-button").remove()
      }

    this._countLike = this._elementCard.querySelector('.card__like-counter');
    this._countLike.textContent = this._likes.length;

    this._setEventListeners();

    return this._elementCard;
  }

  _setEventListeners() {
    // ставим лайк
    this._likeButton.addEventListener("click", (event) => {
      this._handlerLike(event.target);
    })
    // открываем галерею
    this._cardImage.addEventListener("click", (event) => {
      this._handlerCardClick(event.target);
    });
    // удаляю карточку
    if (this._isCurrentUserCard) {
      this._cardSelector.querySelector(".card__delete-button").addEventListener("click", (event) => this._handlerDelete(event));
    }

  }
  _switchLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

}
