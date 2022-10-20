import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards} from '../utils/initial-сards.js';
import {validationConfig} from '../utils/validationConfig.js';
import {
  editButton,
  addButton,
  profilePopupForm,
  formAddCard,
  cardsContainer
} from '../utils/constants.js';

// ЗАГРУЗКА НАЧАЛЬНЫХ КАРТОЧЕК ЧЕРЕЗ КЛАССЫ SECTION И CARD

const initialCardsList = new Section({
  data: initialCards, 
  renderer: (item) => {
    const card = new Card(item, '.card-template', handleCardClick);
    const cardElement = card.generateCard();
    initialCardsList.addItem(cardElement);
  }
}, cardsContainer);

initialCardsList.renderItems();

// ЗАПУСК ВАЛИДАЦИИ ДЛЯ ДВУХ ФОРМ

const profileValidation = new FormValidator(validationConfig, profilePopupForm);
const newCardValidation = new FormValidator(validationConfig, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation(); 

//  ОТКРЫТИЕ ПОПАПА С КАРТИНКОЙ

function handleCardClick(name, link) {
  const imageData = {name, link};
  const imagePopup = new PopupWithImage('.card-popup', imageData);
  imagePopup.open();
}

// ОТКРЫТИЕ ПОПАПА С ФОРМОЙ (РЕДАКТИРОВАТЬ ПРОФИЛЬ)

editButton.addEventListener('click', () => {
  profileValidation.resetValidation();
  const popupProfile = new PopupWithForm('.profilePopup', 
    {handleFormSubmit: (formData) => {
      const userInfo = new UserInfo(formData);
      userInfo.setUserInfo();
      popupProfile.close();
    }
  });
  const userData = {
    nameEdit: document.querySelector('.profile__name').textContent,
    aboutEdit: document.querySelector('.profile__about').textContent
  };
  const userInfo = new UserInfo(userData);
  userInfo.getUserInfo(); 
  popupProfile.open();
});

// ОТКРЫТИЕ ПОПАПА С ФОРМОЙ (ДОБАВИТЬ КАРТОЧКУ)

addButton.addEventListener('click', () => {
  newCardValidation.resetValidation();
  const popupAddCard = new PopupWithForm('.addPopup',
  {handleFormSubmit: (cardData) => {
    const newCard = new Section({
      data: cardData, 
      renderer: () => {
        const card = new Card(cardData, '.card-template', handleCardClick);
        const cardElement = card.generateCard();
        newCard.addItem(cardElement);
      }
    }, cardsContainer)
    newCard.renderNewCard();
    popupAddCard.close();
  }});
  popupAddCard.open();
});