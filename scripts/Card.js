export class Card { // Класс Карточка
  constructor(data, templateSelector) { // принимается объект со свойствами и класс шаблона
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    this._setEventListeners(); // добавить к полученной карточке слушатели событий
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element; // вернуть заполненный клон шаблона
  }

  _setEventListeners() { // метод установки всех слушателей
    this._element.querySelector('.element__likeButton').addEventListener('click', () => { // добавить слушатель клика к кнопке лайк этого элемента
      this._handleLikeButton(); // вызвать указанный метод при событии
    });

    this._element.querySelector('.element__deleteButton').addEventListener('click', () => { //добавить слушатель клика к кнопке удалить этого элемента
      this._handleDeleteButton(); // вызвать метод удаления
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openImagePopup;
    });
  }

  _handleLikeButton() { // метод переключения стиля кнопки лайк
    this._element.querySelector('.element__likeButton').classList.toggle('element__likeButton_active'); // в этом элементе переключить стиль кнопки лайк
  }

  _handleDeleteButton() { // метод удаления карточки
    this._element.querySelector('.element__deleteButton').closest('.element').remove(); // удалить карточку, ближайшую к кнопке удалить текущей карточки
  }

  _openImagePopup() { // метод открытия попапа картинки
    cardPopupImage.src = this._link;
    cardPopupImage.alt = this._name;
    cardPopupTitle.textContent = this._name;
    openPopup(cardPopup);
  }
}