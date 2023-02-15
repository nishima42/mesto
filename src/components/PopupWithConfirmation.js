import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, {handleFormSubmit}, {cardId}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._cardId = cardId;
  }

  open(cardId, cardElement) {
    this._cardId = cardId;
    this._cardElement = cardElement;
    super.open()
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId, this._cardElement);
    });
  }
}