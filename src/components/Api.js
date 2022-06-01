export default class Api {
  constructor(token) {
    (this._baseUrl = "https://nomoreparties.co/v1/cohort-42"),
      (this._token = token);
  }

  getUserValue() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Что-то пошло не так: ${res.status}`)
      )

      .catch((err) => {
        console.log(err);
      });
  }

  changeUserInfo(userData) {
    this._userName = userData.firstname;
    this._userDescription = userData.description;

    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this._userName,
        about: this._userDescription,
      }),
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Что-то пошло не так: ${res.status}`)
      )

      .catch((err) => {
        console.log(err);
      });
  }

  changeAvatar(avatarUrl) {
    this._avatarUrl = avatarUrl;
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: this._avatarUrl,
      }),
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Что-то пошло не так: ${res.status}`)
      )

      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Что-то пошло не так: ${res.status}`)
      )

      .catch((err) => {
        console.log(err);
      });
  }

  handlerAddCard(cardsData) {
    this._cardName = cardsData.name;
    this._cardLink = cardsData.link;

    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this._cardName,
        link: this._cardLink
      }),
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Что-то пошло не так: ${res.status}`)
      )

      .catch((err) => {
        console.log(err);
      });
  }
}
