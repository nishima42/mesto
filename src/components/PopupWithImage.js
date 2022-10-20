import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, {name, link}) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open() {
    const popupImage = document.querySelector('.card-popup__image');
    const popupTitle = document.querySelector('.card-popup__title');
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupTitle.textContent = this._name
    super.open();
  }

  close() {
    super.close();
  }

  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }

  setEventListeners() {
    super.setEventListeners();
  }
}