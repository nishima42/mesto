export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if(res.ok) { 
      console.log('Ответ получен');
      return res.json();
    } else {      
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo() { // url = 'users/me'
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me', 
    {headers: this._headers})
    .then(this._checkResponse)
  }

  getCardArray() { // МЕТОД ЗАПРОСА КАРТОЧЕК ДЛЯ ЗАГРУЗКИ url = 'cards'
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {headers: this._headers})
    .then(this._checkResponse)
  }

  patchUserInfo(formData) { // метод обновления данных пользователя url = 'users/me'
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: formData.name,
        about: formData.about
      })
    })
    .then(this._checkResponse)
  }

  patchAvatar(avatarLink) { // url = 'users/me/avatar'
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink.avatar
      })
    })
    .then(this._checkResponse)
  }

  postCard({name, link}) { // url = 'cards'
    this._name = name;
    this._link = link;
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: this._name,
        link: this._link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(cardId) { // url = 'cards'
    this._cardId = cardId;
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-59/cards/${this._cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  addLike(id) {
    this._id = id;
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-59/cards/${this._id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
  
  removeLike(id) {
    this._id = id;
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-59/cards/${this._id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
}