export default class UserInfo {
  constructor({nameEdit, aboutEdit}) {
    this._profileName = nameEdit;
    this._profileAbout = aboutEdit;
  }

  getUserInfo() {
    document.querySelector('.inputName').value = this._profileName;
    document.querySelector('.inputAbout').value = this._profileAbout;
  }

  setUserInfo() {
    document.querySelector('.profile__name').textContent = this._profileName;
    document.querySelector('.profile__about').textContent = this._profileAbout;
  }
}