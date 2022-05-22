

export default class UserInfo {
  constructor({ firstname, description }) {
    this._userNameInterface = firstname;
    this._userDescriptionInterface = description;
  }

  getUserInfo() {

  const userValueDefault = {};

    userValueDefault.firstname = this._userNameInterface.textContent
    userValueDefault.description = this._userDescriptionInterface.textContent

    return userValueDefault;
  }
  setUserInfo(userValueDefault) {

    this._userNameInterface.textContent = userValueDefault.firstname;
    this._userDescriptionInterface.textContent = userValueDefault.description;

  }
}
