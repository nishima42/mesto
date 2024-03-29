export default class Card { // Класс Карточка
  constructor(data, templateSelector, handleCardClick, addLike, removeLike, handleDeleteButton, myId) { // принимается объект со свойствами и класс шаблона
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._likesArray = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._handleDeleteButton = handleDeleteButton;
    this._myId = myId;
  }

  _getTemplate() { // метод клонирования шаблона
    const cardElement = document // во всем документе
      .querySelector(this._templateSelector) // найти указанный шаблон
      .content // внутри которого
      .querySelector('.element') // найти класс .element
      .cloneNode(true); // и клонировать

    return cardElement; // вернуть клон шаблона
  }

  generateCard() { // метод создания карточки
    this._element = this._getTemplate(); // вызвать клонирование шаблона
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__likeButton');
    this._likeQuantity = this._element.querySelector('.element__likeQuantity');
    this._setEventListeners(); // добавить к полученной карточке слушатели событий
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeQuantity.textContent = this._likes;
    this._element.querySelector('.element__name').textContent = this._name;
    if(this._myId != this._ownerId) {
      this._element.querySelector('.element__deleteButton').classList.add('element__deleteButton_hidden');
    };
    if(this.isLiked(this._data)) {
      this._likeButton.classList.add('element__likeButton_active');
    };
    return this._element; // вернуть заполненный клон шаблона
  }

  _setEventListeners() { // метод установки всех слушателей
    this._likeButton.addEventListener('click', () => { // добавить слушатель клика к кнопке лайк этого элемента
      this._handleLikeButton(this); // вызвать указанный метод при событии
    });

    this._element.querySelector('.element__deleteButton').addEventListener('click', () => { //добавить слушатель клика к кнопке удалить этого элемента
      this._handleDeleteButton(this._id, this._element); // вызвать метод удаления
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeButton(card) { // метод переключения стиля кнопки лайк
    if(this._likeButton.classList.contains('element__likeButton_active')) {
      this._removeLike(card);
    } else {
      this._addLike(card);
    }
  }

  getId() {
    return this._id;
  }

  addLike(card) {
    this._likeButton.classList.add('element__likeButton_active');
    this._likeQuantity.textContent = card.likes.length;
  }

  removeLike(card) {
    this._likeButton.classList.remove('element__likeButton_active');
    this._likeQuantity.textContent = card.likes.length;
  }

  isLiked(card) {
    const isLiked = card.likes.some(item => {
      return item._id === this._myId
    })
    return isLiked;
  }

}