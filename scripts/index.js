// Объявляем переменные
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about')
let profileEditButton = profile.querySelector('.profile__editButton');
let popup = document.querySelector('.popup');
let popupInputName = popup.querySelector('.popup__input_type_name');
let popupInputAbout = popup.querySelector('.popup__input_type_about');
let popupSubmitButton = popup.querySelector('.popup__submitBtn');
let popupCloseButton = popup.querySelector('.popup__closeBtn');
let elements = document.querySelector('.elements');
let likeButtons = document.querySelectorAll('.element__likeButton');

// Объявляем функции
function popupOpen() { // функция открытия попапа
  popup.classList.add('popup_opened'); // добавить попапу модификатор открытия
  popupInputName.value = profileName.textContent; // вывести текущее имя в поле ввода
  popupInputAbout.value = profileAbout.textContent; // вывести текущую профессию в поле ввода
}

function popupClose () { // функция закрытия попапа
  popup.classList.remove('popup_opened'); // убрать у попапа модификатор открытия
}

function formSubmit () {
  event.preventDefault(); // предотвратить стандартную перезагрузку страницы
  popup.classList.remove('popup_opened'); // убрать у попапа модификатор открытия
  profileName.textContent = popupInputName.value; // заменить текстовое содержимое имени профиля
  profileAbout.textContent = popupInputAbout.value // заменить текстовое содержимое професии
}

function likeToggle () { //функция переключения активности кнопки лайк
  event.preventDefault(); // предотвратить стандартную перезагрузку страницы
  likeButtons.classList.toggle('element__likeButton_active'); //переключаем модификатор стиля кнопки
  console.log('Лайк переключен');
}

// Добавляем события
profileEditButton.addEventListener('click', popupOpen); // клик по кнопке Редактировать профиль
popupCloseButton.addEventListener('click', popupClose); // клик по кнопке Закрыть попап
popup.addEventListener('submit', formSubmit); // отправка формы попапа