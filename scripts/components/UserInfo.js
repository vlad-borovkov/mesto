import { nameOutput, descriptionOutput } from "../utils/constants.js";

export default class UserInfo {
  constructor({ firstname, description }) {
    this._userName = firstname;
    this._userDescription = description;
  }

  getUserInfo() {
    const userValueDefault = {};
    userValueDefault.firstname = nameOutput.textContent;
    userValueDefault.description = descriptionOutput.textContent;

    return userValueDefault;
  }
  setUserInfo() {
    nameOutput.textContent = this._userName;
    descriptionOutput.textContent = this._userDescription;
  }
}
