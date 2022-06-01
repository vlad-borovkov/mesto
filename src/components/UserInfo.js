export default class UserInfo {
  constructor({ firstname, description, avatar }) {
    this._userNameInterface = document.querySelector(firstname);
    this._userDescriptionInterface = document.querySelector(description);
    this._userAvatarInterface = document.querySelector(avatar)
  }

  getUserInfo() {

  const userValueDefault = {};

    userValueDefault.firstname = this._userNameInterface.textContent;
    userValueDefault.description = this._userDescriptionInterface.textContent;

    return userValueDefault;
  }
  setUserInfo(userValueDefault) {
    this._userNameInterface.textContent = userValueDefault.name;
    this._userDescriptionInterface.textContent = userValueDefault.about;
    this._userAvatarInterface.src = userValueDefault.avatar;
  }
}
