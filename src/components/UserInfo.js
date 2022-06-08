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
  setUserAvatar(userValueDefault) {
    this._userAvatarInterface.src = userValueDefault.avatar;
  }

  setUserId(userValueDefault) {
    this._userId = userValueDefault._id
}

  getUserId() {
    return this._userId
}

  setUserInfo(userValueDefault) {
    if (userValueDefault.name) {
      this._userNameInterface.textContent = userValueDefault.name;
    }
    if (userValueDefault.about) {
      this._userDescriptionInterface.textContent = userValueDefault.about;
    }
    if (userValueDefault.avatar) {
      this._userAvatarInterface.src = userValueDefault.avatar;
    }

  }
  setUserInfoHandler(userHandlerValue) {
    this._userNameInterface.textContent = userHandlerValue.name;
    this._userDescriptionInterface.textContent = userHandlerValue.about;
  }
}
