export default class Api {
  constructor(token) {
    this._baseUrl = 'https://nomoreparties.co/v1/cohort-42',
    this._token = token
  }

  getUserValue() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token,
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Что-то пошло не так: ${res.status}`))


    .catch((err) => {
      console.log(err);
    });
  }

  getInitialCards() {
    fetch(this.baseUrl, {
      method: this.method,
      headers: {
        authorization: this.authorization
      },
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      })

      .catch((err) => {
        console.log('Ошибка ${`err`}. Запрос не выполнен');
      });
  }


}

