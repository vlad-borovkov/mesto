export default class Api {
  constructor({domain, token}) {
    this._domain = domain;
    this._headers = {authorization: token, "Content-Type": "application/json",}
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`${res.status} - ${res.statusText}`)
}

makeRequest(url, method = "GET", body) {
  const requestUrl = this._domain + url;
  return fetch(
    requestUrl,
    {
      method: method,
      headers: this._headers,
      body: JSON.stringify(body)
    }).then(this._checkResponse)
}

  getUserValue() {
    const infoUsersDefault="/users/me";
    const cardsFromServer="/cards";
    return Promise.all([
      this.makeRequest(infoUsersDefault),
      this.makeRequest(cardsFromServer)
    ])
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

  deleteLikeOnCard(cardId) {
    const requestUrl = `/cards/${cardId}/likes`;
    return this.makeRequest(requestUrl, "DELETE")
  }

  addLikeOnCard(cardId) {
    const requestUrl = `/cards/${cardId}/likes`;
    return this.makeRequest(requestUrl, "PUT")
  }

}
