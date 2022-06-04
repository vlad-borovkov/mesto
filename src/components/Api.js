export default class Api {
  constructor({ domain, token }) {
    this._domain = domain;
    this._headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status} - ${res.statusText}`);
  }

  makeRequest(url, method = "GET", body) {
    const requestUrl = this._domain + url;
    return fetch(requestUrl, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  getUserValue() {
    const infoUsersDefault = "/users/me";
    const cardsFromServer = "/cards";
    return Promise.all([
      this.makeRequest(infoUsersDefault),
      this.makeRequest(cardsFromServer),
    ]);
  }

  changeUserInfo(userValue) {
    this._userName = userValue.firstname;
    this._userDescription = userValue.description;

    const requestUrl = "/users/me";
    const userData = { name: this._userName, about: this._userDescription };
    //передать объект на сервер
    return this.makeRequest(requestUrl, "PATCH", userData);
  }

  changeAvatar(avatarUrl) {
    const requestUrl = "/users/me/avatar";
    return this.makeRequest(requestUrl, "PATCH", avatarUrl);
  }

  handlerAddCard(cardsData) {
    const requestUrl = "/cards";
    return this.makeRequest(requestUrl, "POST", cardsData);
  }

  deleteLikeOnCard(cardId) {
    const requestUrl = `/cards/${cardId}/likes`;
    return this.makeRequest(requestUrl, "DELETE");
  }

  addLikeOnCard(cardId) {
    const requestUrl = `/cards/${cardId}/likes`;
    return this.makeRequest(requestUrl, "PUT");
  }

  deleteCard(cardId) {
    const requestUrl = `/cards/${cardId}`;
    return this.makeRequest(requestUrl, "DELETE");
  }
}
