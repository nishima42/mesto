import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {validationConfig} from '../utils/validationConfig.js';
import {
  editButton,
  newCardButton,
  profilePopupForm,
  formAddCard,
  avatarButton,
  formEditAvatar,
  cardsContainer,
  profileSelectors,
  imagePopupSelector,
  popupDeleteCardSelector,
  cohortId,
  authorizationToken
} from '../utils/constants.js';

// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ

// СОЗДАНИЕ КЛАССА API ДЛЯ ЗАПРОСОВ
const api = new Api(cohortId, authorizationToken);

// СОЗДАНИЕ КЛАССА USERINFO ДЛЯ УПРАВЛЕНИЯ ДАННЫМИ ПОЛЬЗОВАТЕЛЯ
const userInfo = new UserInfo(profileSelectors);

// СОЗДАНИЕ СЕКЦИИ ДЛЯ ОТРИСОВАННЫХ КАРТОЧЕК И МЕХАНИМ ОТРИСОВКИ
const cardList = new Section({
  data: {},
  renderer: (item, myId) => {
    const cardElement = createCard(item, myId);
    cardList.addItem(cardElement);
  }
}, cardsContainer);

// СОЗДАНИЕ И РАБОТА ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const popupProfile = new PopupWithForm('.profilePopup',
    {handleFormSubmit: (formData) => { 
      api.patchUserInfo(formData)
      .then (() => {
        setUserProfileInfo();
        popupProfile.changeButtonText('Сохранение...');
      })
      .then(() => {
        popupProfile.close();
      })
    }
  });

// СОЗДАНИЕ И РАБОТА ПОПАПА РЕДАКТИРОВАНИЯ АВАТАРА
const popupEditAvatar = new PopupWithForm('.avatarPopup', 
  {handleFormSubmit: (avatarLink) =>{
    api.patchAvatar(avatarLink)
    .then (() => {
      setUserProfileInfo();
      popupEditAvatar.changeButtonText('Сохранение...');
    })
    .then(() => {
      popupEditAvatar.close();
    })
  }
});

// СОЗДАНИЕ И РАБОТА ПОПАПА УДАЛЕНИЯ КАРТОЧКИ
const popupDeleteCard = new PopupWithConfirmation(popupDeleteCardSelector, 
  {handleFormSubmit: (cardId) => {
    api.deleteCard(cardId)
    .then(() => {
      rerenderCards();
    })
    .then(() => {
      popupDeleteCard.close();
    });
  }
}, {});

// СОЗДАНИЕ И РАБОТА ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ
const popupAddCard = new PopupWithForm('.addPopup',
  {handleFormSubmit: (cardData) => {
    api.postCard(cardData)
    .then(() => {
      rerenderCards();
      popupAddCard.changeButtonText('Сохранение...');
    })
    .then(() => {
      popupAddCard.close();
    });
  }
});

// СОЗДАНИЕ ПОПАПА С КАРТИНКОЙ
const imagePopup = new PopupWithImage(imagePopupSelector);

// СОЗДАНИЕ КЛАССА ВАЛИДАЦИИ ДЛЯ КАЖДОГО ПОПАПА
const profileValidation = new FormValidator(validationConfig, profilePopupForm);
const newCardValidation = new FormValidator(validationConfig, formAddCard);
const avatarEditValidation = new FormValidator(validationConfig, formEditAvatar);

// ОБЪЯВЛЕНИЕ ФУНКЦИЙ

// ФУНКЦИЯ ПОЛУЧЕНИЯ ДАННЫХ О ПОЛЬЗОВАТЕЛЕ С СЕРВЕРА И ДАЛЬНЕЙШЕЙ ОТРИСОВКИ КАРТОЧЕК
function setUserProfileInfo() {
  api.getUserInfo() // задействовать метод класса Api (отправить запрос и вернуть ответ)
  .then((result) => { // с полученным ответом ->
    userInfo.setUserInfo(result.name, result.about, result.avatar);
    console.log('Данные пользователя получены'); // -> задействовать метод класса UserInfo (оторбазить данные на странице)
  })
  .then(() => {
    renderAllCards();
  })
}

// ФУНКЦИЯ СОЗДАНИЯ ЭКЗЕМПЛЯРА КАРТОЧКИ
function createCard(cardData, myId) {
  const card = new Card(cardData, '.card-template', handleCardClick, addLike, removeLike, handleDeleteButton, myId);
  const cardElement = card.generateCard();
  return cardElement;
}

// ФУНКЦИЯ ОТРИСОВКИ ВСЕХ КАРТОЧЕК
function renderAllCards() {
  Promise.all([api.getCardArray(), api.getUserInfo()])
  .then((results) => {
    const cardArray = results[0];
    const myId = results[1]._id;
    cardList.refreshData(cardArray);
    cardList.renderItems(myId);
    console.log('Карточки отрисованы');
  })
}

// ФУНКЦИЯ ПЕРЕРИСОВКИ КАРТОЧЕК
function rerenderCards() {
  cardList.clearSection();
  renderAllCards();
}

// ФУНКЦИИ ПОСТАНОВКИ/СНЯТИЯ ЛАЙКА
function addLike(id) {
  api.addLike(id);
}

function removeLike(id) {
  api.removeLike(id);
}

// ФУНКЦИЯ НАЖАТИЯ НА КНОПКУ УДАЛИТЬ
function handleDeleteButton(cardId) {
  popupDeleteCard.open(cardId);
}

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА С КАРТИНКОЙ
function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// ВЫЗОВЫ ФУНКЦИЙ

// ВЫЗОВ ФУНКЦИИ setUserProfileInfo
setUserProfileInfo();

// УСТАНОВИТЬ СЛУШАТЕЛИ СОБЫТИЙ НА ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
popupProfile.setEventListeners(); 

// УСТАНОВИТЬ СЛУШАТЕЛИ СОБЫТИЙ НА ПОПАП РЕДАКТИРОВАНИЯ АВАТАРА
popupEditAvatar.setEventListeners();

// УСТАНОВИТЬ СЛУШАТЕЛИ СОБЫТИЙ НА ПОПАП УДАЛЕНИЯ КАРТОЧКИ
popupDeleteCard.setEventListeners();

// УСТАНОВИТЬ СЛУШАТЕЛИ СОБЫТИЙ НА ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
popupAddCard.setEventListeners(); 

// УСТАНОВИТЬ СЛУШАТЕЛИ СОБЫТИЙ НА ПОПАП С КАРТИНКОЙ
imagePopup.setEventListeners();

// АКТИВИРОВАНИЕ ВАЛИДАЦИИ ДЛЯ КАЖДОГО ПОПАПА
profileValidation.enableValidation();
newCardValidation.enableValidation(); 
avatarEditValidation.enableValidation(); 

// УСТАНОВКА СЛУШАТЕЛЕЙ

// СЛУШАТЕЛЬ: НАЖАТИЕ НА КНОПКУ РЕДАКТИРОВАТЬ ПРОФИЛЬ
editButton.addEventListener('click', () => {
  popupProfile.changeButtonText('Сохранить');
  profileValidation.resetValidation();
  userInfo.getUserInfo(); 
  popupProfile.open();
});

// СЛУШАТЕЛЬ: НАЖАТИЕ НА КНОПКУ ДОБАВИТЬ КАРТОЧКУ
newCardButton.addEventListener('click', () => {
  popupAddCard.changeButtonText('Создать');
  newCardValidation.resetValidation();
  popupAddCard.open();
});

// СЛУШАТЕЛЬ: НАЖАТИЕ НА КНОПКУ РЕДАКТИРОВАТЬ АВАТАР
avatarButton.addEventListener('click', () => {
  popupEditAvatar.changeButtonText('Сохранить');
  avatarEditValidation.resetValidation();
  popupEditAvatar.open();
});