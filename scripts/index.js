// Объявляем переменные
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about')
let profileEditButton = profile.querySelector('.profile__editButton');
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
  profileAbout.textContent = popupInputAbout.value // заменить текстовое содержимое професии
  popupClose();
}

// Добавляем события
profileEditButton.addEventListener('click', popupOpen); // клик по кнопке Редактировать профиль
popupCloseButton.addEventListener('click', popupClose); // клик по кнопке Закрыть попап
popupForm.addEventListener('submit', formSubmit); // отправка формы попапа