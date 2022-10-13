export class Card { // Класс Карточка
  constructor(data, templateSelector, openImagePopup) { // принимается объект со свойствами и класс шаблона
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
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
    this._setEventListeners(); // добавить к полученной карточке слушатели событий
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    
    return this._element; // вернуть заполненный клон шаблона
  }

  _setEventListeners() { // метод установки всех слушателей
    this._likeButton.addEventListener('click', () => { // добавить слушатель клика к кнопке лайк этого элемента
      this._handleLikeButton(); // вызвать указанный метод при событии
    });

    this._element.querySelector('.element__deleteButton').addEventListener('click', () => { //добавить слушатель клика к кнопке удалить этого элемента
      this._handleDeleteButton(); // вызвать метод удаления
    });

    this._cardImage.addEventListener('click', () => {
      this._openImagePopup(this._name, this._link);
    });
  }

  _handleLikeButton() { // метод переключения стиля кнопки лайк
    this._likeButton.classList.toggle('element__likeButton_active'); // в этом элементе переключить стиль кнопки лайк
  }

  _handleDeleteButton() { // метод удаления карточки
    this._element.remove(); // удалить эту карточку
    this._element = null;
  }
}