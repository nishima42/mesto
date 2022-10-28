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
  newCardButton,
  profilePopupForm,
  formAddCard,
  cardsContainer,
  profileSelectors,
  imagePopupSelector
} from '../utils/constants.js';

// СОЗДАНИЕ ДУБЛИКАТОВ КЛАССОВ

const cardList = new Section({
  data: initialCards, 
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, cardsContainer);

const popupProfile = new PopupWithForm('.profilePopup', 
    {handleFormSubmit: (formData) => {
      userInfo.setUserInfo();
      popupProfile.close();
    }
  });

  popupProfile.setEventListeners();

  const popupAddCard = new PopupWithForm('.addPopup',
  {handleFormSubmit: (cardData) => {
    const cardElement = createCard(cardData);
    cardList.addItem(cardElement);
    popupAddCard.close();
  }
});

  popupAddCard.setEventListeners();

const profileValidation = new FormValidator(validationConfig, profilePopupForm);
const newCardValidation = new FormValidator(validationConfig, formAddCard);

const userInfo = new UserInfo(profileSelectors);

const imagePopup = new PopupWithImage(imagePopupSelector);

imagePopup.setEventListeners();


profileValidation.enableValidation();
newCardValidation.enableValidation(); 
cardList.renderItems();

// ОТКРЫТИЕ ПОПАПА С КАРТИНКОЙ

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// СОЗДАНИЕ ЭКЗЕМПЛЯРА КАРТОЧКИ

function createCard(cardData) { 
  const card = new Card(cardData, '.card-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// НАЖАТИЕ НА КНОПКУ РЕДАКТИРОВАТЬ ПРОФИЛЬ

editButton.addEventListener('click', () => {
  profileValidation.resetValidation();
  userInfo.getUserInfo(); 
  popupProfile.open();
});

// НАЖАТИЕ НА КНОПКУ ДОБАВИТЬ КАРТОЧКУ

newCardButton.addEventListener('click', () => {
  newCardValidation.resetValidation();
  popupAddCard.open();
});