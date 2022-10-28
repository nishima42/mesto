export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  open() {
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__closeBtn')) {
        this.close();
      }
    });
  }
}