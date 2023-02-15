export default class UserInfo {
  constructor({name, about, avatarEdit}) {
    this._profileName = name;
    this._profileAbout = about;
    this._avatarEdit = avatarEdit
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
    };
  }

  setUserInfo(nameServer, aboutServer, avatarServer) { // устанавливает инфо
    this._profileName.textContent = nameServer;
    this._profileAbout.textContent = aboutServer;
    this._avatarEdit.src = avatarServer;
  }
}