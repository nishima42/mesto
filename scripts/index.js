//Профиль
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const editButton = profile.querySelector('.profile__editButton');
const addButton = profile.querySelector('.profile__addBtn');

//Функции открыть/закрыть любой попап
function openPopup(popup) { // Открыть любой попап
  popup.classList.add('popup_opened');
}

function closePopup(popup) { // Закрыть любой попап
  popup.classList.remove('popup_opened');
}

//Обработчик кнопок закрытия
const closeButtons = document.querySelectorAll('.popup__closeBtn');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

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
})

//Попап Добавить
const addPopup = document.querySelector('.addPopup');
const addPopupForm = addPopup.querySelector('.popup__form');
const inputPlace = addPopup.querySelector('.inputPlace');
const inputLink = addPopup.querySelector('.inputLink');
const addPopupClose = addPopup.querySelector('.popup__closeBtn');

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
  cardElement.querySelector('.element__name').textContent = inputPlace.value || item.name;
  cardElement.querySelector('.element__image').src = inputLink.value || item.link;
  cardElement.querySelector('.element__image').alt = inputPlace.value || item.name;
  cardElement.querySelector('.element__likeButton').addEventListener('click', function(evt) {  // Лайк карточек
    evt.target.classList.toggle('element__likeButton_active');  // Переключение стиля цели
});
  cardElement.querySelector('.element__deleteButton').addEventListener('click', function(evt) {  // Удаление карточек
    evt.target.closest('.element').remove();  // Удаление ближайшего родителя цели
});
  cardElement.querySelector('.element__image').addEventListener('click', function(evt) {
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
  openPopup(addPopup);
});

addPopupForm.addEventListener('submit', function(evt) {  // Отправить форму
  evt.preventDefault();
  const cardElement = createCard();
  cards.prepend(cardElement);
  closePopup(addPopup);
  addPopopForm.reset();
});

// Массив с данными начальных карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функция первоначальной загрузки карточек
function loadInitial(item) {
  const initialCard = createCard(item);
  cards.append(initialCard);
}

initialCards.forEach(loadInitial);