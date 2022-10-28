export default class UserInfo {
  constructor({nameEdit, aboutEdit}) {
    this._profileName = nameEdit;
    this._profileAbout = aboutEdit;
  }

  getUserInfo() {
    document.querySelector('.inputName').value = this._profileName.textContent;
    document.querySelector('.inputAbout').value = this._profileAbout.textContent;

  }

  setUserInfo() {
    this._profileName.textContent = document.querySelector('.inputName').value;
    this._profileAbout.textContent = this._profileAbout.textContent = document.querySelector('.inputAbout').value;
  }
}