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
  popupDeleteCardSelector
} from '../utils/constants.js';

// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ

// СОЗДАНИЕ КЛАССА API ДЛЯ ЗАПРОСОВ
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'da3bb534-b32f-465f-b594-c7994d501830',
    'Content-Type': 'application/json'
  }
});

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

// СОЗДАНИЕ И РАБОТА ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ
const popupAddCard = new PopupWithForm('.addPopup',
  {handleFormSubmit: (cardData) => {
    popupAddCard.changeButtonText('Сохранение...');
    api.postCard(cardData)
    .then((res) => {
      const cardElement = createCard(res, res.owner._id);
      cardList.prependCard(cardElement);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.changeButtonText('Создать');
    });
  }
});

// СОЗДАНИЕ И РАБОТА ПОПАПА РЕДАКТИРОВАНИЯ АВАТАРА
const popupEditAvatar = new PopupWithForm('.avatarPopup', 
  {handleFormSubmit: (avatarLink) =>{
    popupEditAvatar.changeButtonText('Сохранение...');
    api.patchAvatar(avatarLink)
    .then ((res) => {
      setUserInfo(res);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.changeButtonText('Сохранить');
    })
  }
});

// СОЗДАНИЕ И РАБОТА ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const popupProfile = new PopupWithForm('.profilePopup',
    {handleFormSubmit: (formData) => { 
      popupProfile.changeButtonText('Сохранение...');
      api.patchUserInfo(formData)
      .then ((res) => {
        setUserInfo(res);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupProfile.changeButtonText('Сохранить');
      })
    }
  });

// СОЗДАНИЕ И РАБОТА ПОПАПА УДАЛЕНИЯ КАРТОЧКИ
const popupDeleteCard = new PopupWithConfirmation(popupDeleteCardSelector, 
  {handleFormSubmit: (cardId, cardElement) => {
    api.deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(err);
    });
  }
}, {});

// СОЗДАНИЕ ПОПАПА С КАРТИНКОЙ
const imagePopup = new PopupWithImage(imagePopupSelector);

// СОЗДАНИЕ КЛАССА ВАЛИДАЦИИ ДЛЯ КАЖДОГО ПОПАПА
const profileValidation = new FormValidator(validationConfig, profilePopupForm);
const newCardValidation = new FormValidator(validationConfig, formAddCard);
const avatarEditValidation = new FormValidator(validationConfig, formEditAvatar);

// ОБЪЯВЛЕНИЕ ФУНКЦИЙ

// ФУНКЦИЯ ПЕРВОНАЧАЛЬНОЙ ЗАГРУЗКИ ИНФО ПОЛЬЗОВАТЕЛЯ И КАРТОЧЕК
function loadInitialInfo() {
  Promise.all([api.getCardArray(), api.getUserInfo()])
  .then((results) => {
    const cardArray = results[0];
    const myId = results[1]._id;
    setUserInfo(results[1])
    cardList.refreshData(cardArray);
    cardList.renderItems(myId);
  })
  .catch((err) => { // если запрос не ушел
    console.log(err); // выведем ошибку в консоль
  });
}

// ФУНКЦИИ ПОСТАНОВКИ/СНЯТИЯ ЛАЙКА
function addLike(card) {
  api.addLike(card.getId())
  .then((res) => {
    card.addLike(res);
  })
  .catch((err) => {
    console.log(err);
  })
}

function removeLike(card) {
  api.removeLike(card.getId())
  .then((res) => {
    card.removeLike(res);
  })
  .catch((err) => {
    console.log(err);
  })
}

// ФУНКЦИЯ НАЖАТИЯ НА КНОПКУ УДАЛИТЬ
function handleDeleteButton(cardId, cardElement) {
  popupDeleteCard.open(cardId, cardElement);
}

function setUserInfo(info) {
  userInfo.setUserInfo(info.name, info.about, info.avatar);
}

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА С КАРТИНКОЙ
function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// ФУНКЦИЯ СОЗДАНИЯ ЭКЗЕМПЛЯРА КАРТОЧКИ
function createCard(cardData, myId) {
  const card = new Card(cardData, '.card-template', handleCardClick, addLike, removeLike, handleDeleteButton, myId);
  const cardElement = card.generateCard();
  return cardElement;
}

// ВЫЗОВЫ ФУНКЦИЙ

loadInitialInfo();

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
  profileValidation.resetValidation();
  popupProfile.setInputValues(userInfo.getUserInfo())
  popupProfile.open();
});

// СЛУШАТЕЛЬ: НАЖАТИЕ НА КНОПКУ ДОБАВИТЬ КАРТОЧКУ
newCardButton.addEventListener('click', () => {
  newCardValidation.resetValidation();
  popupAddCard.open();
});

// СЛУШАТЕЛЬ: НАЖАТИЕ НА КНОПКУ РЕДАКТИРОВАТЬ АВАТАР
avatarButton.addEventListener('click', () => {
  avatarEditValidation.resetValidation();
  popupEditAvatar.open();
});
