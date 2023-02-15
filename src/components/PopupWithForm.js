import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__submitBtn');
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
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

  changeButtonText(text) {
    this._text = text;
    this._submitButton.textContent = this._text;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
}