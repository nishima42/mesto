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

const popupAddCard = document.querySelector('.addPopup');
const formAddCard = popupAddCard.querySelector('.popup__form');
const inputPlace = popupAddCard.querySelector('.inputPlace');
const inputLink = popupAddCard.querySelector('.inputLink');

const cardPopup = document.querySelector('.card-popup');
const cardPopupTitle = cardPopup.querySelector('.card-popup__title');
const cardPopupImage = cardPopup.querySelector('.card-popup__image');

const cardsContainer = document.querySelector('.elements');

//Функции
function openPopup(popup) { // Открыть любой попап
  popup.addEventListener('mousedown', closeByOverlayClick);
  document.addEventListener('keydown', escHandler);
  popup.classList.add('popup_opened');
}

function closePopup(popup) { // Закрыть любой попап
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closeByOverlayClick);
  document.removeEventListener('keydown', escHandler);
}

function openImagePopup(name, link) {
  cardPopupImage.src = link;
  cardPopupImage.alt = name;
  cardPopupTitle.textContent = name;
  openPopup(cardPopup);
}

function createCard(cardCopy) {
  return cardCopy.generateCard();
}

const closeByOverlayClick = (evt) => { //Закрытие через клик по оверлею
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__closeBtn')) {
    closePopup(evt.currentTarget);
  }
};

const escHandler = (evt) => { //Закрытие через ecs
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

editButton.addEventListener('click', function() { //Клик по кнопке Редактировать профиль
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  profileValidation.resetValidation();
  openPopup(profilePopup);
});

profilePopupForm.addEventListener('submit', function(evt) { //Отправить форму попапа Профиль
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(profilePopup);
});

addButton.addEventListener('click', function() { //Клик по кнопке Добавить карточку
  newCardValidation.resetValidation();
  openPopup(popupAddCard);
});

formAddCard.addEventListener('submit', function(evt) { //Отправить форму
  evt.preventDefault();
  const cardData = {name: inputPlace.value, link: inputLink.value};
  const card = new Card(cardData, '.card-template', openImagePopup);
  const cardElement = createCard(card);
  cardsContainer.prepend(cardElement);
  closePopup(popupAddCard);
  formAddCard.reset();
});

initialCards.forEach((item) => {
  const card = new Card(item, '.card-template', openImagePopup);
  const cardElement = createCard(card);
  cardsContainer.append(cardElement)
});

const profileValidation = new FormValidator(validationConfig, profilePopupForm);
const newCardValidation = new FormValidator(validationConfig, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation(); 