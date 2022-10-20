import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popup = document.querySelector(this._popupSelector);
  }
  
  open() {
    super.open();
  }

  close() {
    this._popup.querySelector('.popup__form').reset();
    super.close();
    
  }

  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}