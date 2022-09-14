//Профиль
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const editButton = profile.querySelector('.profile__editButton');
const addButton = profile.querySelector('.profile__addBtn');


//Функции открыть/закрыть любой попап
function openPopup(popup) { // Открыть любой попап
  const errorMessages = popup.querySelectorAll('.popup__input-error');
  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = '';
  });

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Дописать сброс ошибки при открытии попапа
  popup.addEventListener('click', closeByOverlayClick);
  document.addEventListener('keydown', escHandler);
  popup.classList.add('popup_opened');
}

function closePopup(popup) { // Закрыть любой попап
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closeByOverlayClick);
  document.removeEventListener('keydown', escHandler);
}

//Обработчики кнопок закрытия
const closeButtons = document.querySelectorAll('.popup__closeBtn');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const closeByOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

const escKeyCode = 27;

const escHandler = (evt) => {
  if (evt.keyCode === escKeyCode) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

//Попап профиль
const profilePopup = document.querySelector('.profilePopup');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const inputName = profilePopup.querySelector('.inputName');
const inputAbout = profilePopup.querySelector('.inputAbout');
const profilePopupClose = profilePopup.querySelector('.popup__closeBtn');

//Действия с попапом Профиль
editButton.addEventListener('click', function() { // Клик по кнопке Редактировать профиль
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(profilePopup);
});

profilePopupForm.addEventListener('submit', function(evt) { // Отправить форму попапа Профиль
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(profilePopup);
});

//Попап Добавить
const popupAddCard = document.querySelector('.addPopup');
const formAddCard = popupAddCard.querySelector('.popup__form');
const inputPlace = popupAddCard.querySelector('.inputPlace');
const inputLink = popupAddCard.querySelector('.inputLink');
const addPopupClose = popupAddCard.querySelector('.popup__closeBtn');

// Попап карточки
const cardPopup = document.querySelector('.card-popup');
const cardPopupTitle = cardPopup.querySelector('.card-popup__title');
const cardPopupImage = cardPopup.querySelector('.card-popup__image');
const cardPopupClose = cardPopup.querySelector('.popup__closeBtn');

//Карточки
const cards = document.querySelector('.elements');

// Функция Создать карточку
const cardTemplate = document.querySelector('#elementTemplate').content;  // Определили переменную Шаблон карточки

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

//Действия с попапом Добавить
addButton.addEventListener('click', function() { // Клик по кнопке Добавить карточку
  const cardSubmitButton = popupAddCard.querySelector('.popup__submitBtn');
  cardSubmitButton.disabled = true;
  cardSubmitButton.classList.add('popup__submitBtn_inactive');
  openPopup(popupAddCard);
});

formAddCard.addEventListener('submit', function(evt) {  // Отправить форму
  evt.preventDefault();
  const cardElement = {name: inputPlace.value, link: inputLink.value};
  const newCard = createCard(cardElement);
  cards.prepend(newCard);
  closePopup(popupAddCard);
  formAddCard.reset();
});


// Функция первоначальной загрузки карточек
function appendCard(item) {
  const initialCard = createCard(item);
  cards.append(initialCard);
}

initialCards.forEach(appendCard);