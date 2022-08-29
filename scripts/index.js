// Объявляем переменные
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about')
let profileEditButton = profile.querySelector('.profile__editButton');
let addButton = profile.querySelector('.profile__addBtn');
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let popupInputName = popup.querySelector('.popup__input_type_name');
let popupInputAbout = popup.querySelector('.popup__input_type_about');
let popupCloseButton = popup.querySelector('.popup__closeBtn');

// Объявляем функции
function popupOpen() { // функция открытия попапа
  popupInputName.value = profileName.textContent; // вывести текущее имя в поле ввода
  popupInputAbout.value = profileAbout.textContent; // вывести текущую профессию в поле ввода
  popup.classList.add('popup_opened'); // добавить попапу модификатор открытия
}

function popupClose () { // функция закрытия попапа
  popup.classList.remove('popup_opened'); // убрать у попапа модификатор открытия
}

function formSubmit (event) {
  event.preventDefault(); // предотвратить стандартную перезагрузку страницы
  profileName.textContent = popupInputName.value; // заменить текстовое содержимое имени профиля
  profileAbout.textContent = popupInputAbout.value; // заменить текстовое содержимое професии
  popupClose();
}

function addPopupOpen() {
  addPopup.classList.add('popup_opened'); // добавить попапу модификатор открытия
}

function addPopupClose () { // функция закрытия попапа
  addPopup.classList.remove('popup_opened'); // убрать у попапа модификатор открытия
}

// Добавляем события
profileEditButton.addEventListener('click', popupOpen); // клик по кнопке Редактировать профиль
popupCloseButton.addEventListener('click', popupClose); // клик по кнопке Закрыть попап
popupForm.addEventListener('submit', formSubmit); // отправка формы попапа
addButton.addEventListener('click', addPopupOpen);


// Функционал добавления карточки
let addPopup = document.querySelector('.popup_type_add');
let addPopupForm = addPopup.querySelector('.popup__form');
let addPopupInputPlace = addPopup.querySelector('.popup__input_type_place');
let addPopupInputLink = addPopup.querySelector('.popup__input_type_link');
let addPopupCloseButton = addPopup.querySelector('.popup__closeBtn');
let elements = document.querySelector('.elements');
let elementTemplate = document.querySelector('#elementTemplate').content;

function addElement() {
  event.preventDefault();
  let element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__likeButton').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__likeButton_active');
  });
  element.querySelector('.element__image').src = addPopupInputLink.value;
  element.querySelector('.element__name').textContent = addPopupInputPlace.value;
  element.querySelector('.element__popupImage').src = addPopupInputLink.value;
  element.querySelector('.element__popupTitle').textContent = addPopupInputPlace.value;
  elements.prepend(element);
  addPopupClose();
}

addPopupForm.addEventListener('submit', addElement);
addPopupCloseButton.addEventListener('click', addPopupClose);

// Загружаем начальные карточки
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

function addInitial(name, link) {
  let element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__likeButton').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__likeButton_active');
});
  element.querySelector('.element__name').textContent = name;
  element.querySelector('.element__image').src = link;
  element.querySelector('.element__popupImage').src = link;
  element.querySelector('.element__popupTitle').textContent = name;
  elements.append(element);
}

for (let i = 0; i < initialCards.length; i++) {
  addInitial(initialCards[i].name, initialCards[i].link);
}

// Кнопка Удалить
let deleteButton = document.querySelector('.element__deleteButton');
deleteButton.addEventListener('click', function() {
  let element = deleteButton.closest('.element');
  element.remove();
});

// Попап картинки
let picture = document.querySelector('.element');
let pictureImage = picture.querySelector('.element__image');
let picturePopup = picture.querySelector('.element__popup');
let picturePopupCloseBtn = picture.querySelector('.popup__closeBtn');

// Попап картинки - открыть-закрыть
function picturePopupOpen() {
  picturePopup.classList.add('element__popup_opened');
}

function picturePopupClose() {
  picturePopup.classList.remove('element__popup_opened');
}

pictureImage.addEventListener('click', picturePopupOpen);
picturePopupCloseBtn.addEventListener('click', picturePopupClose);