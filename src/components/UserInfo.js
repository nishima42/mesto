export default class UserInfo {
  constructor({nameEdit, aboutEdit, avatarEdit}) {
    this._profileName = nameEdit;
    this._profileAbout = aboutEdit;
    this._avatarEdit = avatarEdit
  }

  getUserInfo() {
    document.querySelector('.inputName').value = this._profileName.textContent;
    document.querySelector('.inputAbout').value = this._profileAbout.textContent;

  }

  setUserInfo(nameServer, aboutServer, avatarServer) { // устанавливает инфо
    this._profileName.textContent = nameServer;
    this._profileAbout.textContent = aboutServer;
    this._avatarEdit.src = avatarServer;
  }
}