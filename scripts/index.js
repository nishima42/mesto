import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initial-сards.js';
import {validationConfig} from './validationConfig.js';

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const editButton = profile.querySelector('.profile__editButton');
const addButton = profile.querySelector('.profile__addBtn');

const profilePopup = document.querySelector('.profilePopup');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const inputName = profilePopup.querySelector('.inputName');
const inputAbout = profilePopup.querySelector('.inputAbout');
const profilePopupClose = profilePopup.querySelector('.popup__closeBtn');

const popupAddCard = document.querySelector('.addPopup');
const formAddCard = popupAddCard.querySelector('.popup__form');
const inputPlace = popupAddCard.querySelector('.inputPlace');
const inputLink = popupAddCard.querySelector('.inputLink');
const addPopupClose = popupAddCard.querySelector('.popup__closeBtn');

const cardPopup = document.querySelector('.card-popup');
const cardPopupTitle = cardPopup.querySelector('.card-popup__title');
const cardPopupImage = cardPopup.querySelector('.card-popup__image');
const cardPopupClose = cardPopup.querySelector('.popup__closeBtn');

const cards = document.querySelector('.elements');

const cardTemplate = document.querySelector('#elementTemplate').content;  // Определили переменную Шаблон карточки

const closeButtons = document.querySelectorAll('.popup__closeBtn');
const escKeyCode = 27;

//Функции
function openPopup(popup) { // Открыть любой попап
  popup.addEventListener('click', closeByOverlayClick);
  document.addEventListener('keydown', escHandler);
  popup.classList.add('popup_opened');
}

function closePopup(popup) { // Закрыть любой попап
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closeByOverlayClick);
  document.removeEventListener('keydown', escHandler);
}

function resetValidationErrors(popup) { //Сброс ошибок валидации
  const errorMessages = popup.querySelectorAll('.popup__input-error');
  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = '';
  });
}

function disableSubmitButton(popup) { // Деактивировать кнопку сабмита
 const submitButton = popup.querySelector('.popup__submitBtn');
  submitButton.disabled = true;
}
/*
function createCard(item) {  // Функция создания карточки из шаблона с подставлением данных из инпута или массива
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  cardElement.querySelector('.element__name').textContent = item.name;
  elementImage.src = item.link;
  elementImage.alt = item.name;
  cardElement.querySelector('.element__likeButton').addEventListener('click', function(evt) {  // Лайк карточек
    evt.target.classList.toggle('element__likeButton_active');  // Переключение стиля цели
});
  cardElement.querySelector('.element__deleteButton').addEventListener('click', function(evt) {  // Удаление карточек
    evt.target.closest('.element').remove();  // Удаление ближайшего родителя цели
});
elementImage.addEventListener('click', function(evt) {
    const targetPic = evt.target;
    cardPopupImage.src = targetPic.src;
    cardPopupImage.alt = targetPic.alt;
    cardPopupTitle.textContent = targetPic.alt;
    openPopup(cardPopup);
});
  return cardElement
}

function appendCard(item) { //Функция первоначальной загрузки карточек
  const initialCard = createCard(item);
  cards.append(initialCard);
}
*/
const closeByOverlayClick = (evt) => { //Закрытие через клик по оверлею
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

const escHandler = (evt) => { //Закрытие через ecs
  if (evt.keyCode === escKeyCode) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

//initialCards.forEach(appendCard); //Вызов загрузки начальных карточек

closeButtons.forEach((button) => { //Обработчик всех кнопок закрытия
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

editButton.addEventListener('click', function() { //Клик по кнопке Редактировать профиль
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  resetValidationErrors(profilePopup);
  openPopup(profilePopup);
});

profilePopupForm.addEventListener('submit', function(evt) { //Отправить форму попапа Профиль
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(profilePopup);
});

addButton.addEventListener('click', function() { //Клик по кнопке Добавить карточку
  const cardSubmitButton = popupAddCard.querySelector('.popup__submitBtn');
  cardSubmitButton.classList.add('popup__submitBtn_inactive');
  disableSubmitButton(popupAddCard);
  resetValidationErrors(popupAddCard);
  openPopup(popupAddCard);
});

formAddCard.addEventListener('submit', function(evt) { //Отправить форму
  evt.preventDefault();
  const cardData = {name: inputPlace.value, link: inputLink.value};
  const card = new Card(cardData, '.card-template');
  const cardElement = card.generateCard();
  cards.prepend(cardElement);
  closePopup(popupAddCard);
  formAddCard.reset();
});

initialCards.forEach((item) => {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();

  cards.append(cardElement)
});

document.querySelectorAll('.popup__form').forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});