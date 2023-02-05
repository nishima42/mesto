export default class Api {
  constructor(cohort, authorization) {
    this._cohort = cohort;
    this._authorization = authorization;
  }
  
  getUserInfo() { // метод запроса данных о пользователе
    return fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {  //отправить GET запрос
      headers: { // с заголовком
        authorization: this._authorization // токен авторизации
      }
    })
    .then((res) => { // затем из полученного ответа
      if(res.ok) {  // если с ответом все ок
        return res.json(); // вернуть результат json
      } else {      
        return Promise.reject(`Ошибка: ${res.status}`);
      } // Вернуть отклоненный промис, если не ок
    })
    .catch((err) => { // если запрос не ушел
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  patchUserInfo(formData) { // метод обновления данных пользователя
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.nameEdit,
        about: formData.aboutEdit
      })
    })
    .then((res) => { // затем из полученного ответа
      if(res.ok) {  // если с ответом все ок
        return res.json(); // вернуть результат json
      } else {      
        return Promise.reject(`Ошибка: ${res.status}`);
      } // Вернуть отклоненный промис, если не ок
    })
    .catch((err) => { // если запрос не ушел
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  patchAvatar(avatarLink) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink.avatar
      })
    })
    .then((res) => { // затем из полученного ответа
      if(res.ok) {  // если с ответом все ок
        return res.json(); // вернуть результат json
      } else {      
        return Promise.reject(`Ошибка: ${res.status}`);
      } // Вернуть отклоненный промис, если не ок
    })
    .catch((err) => { // если запрос не ушел
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  getCardArray() { // МЕТОД ЗАПРОСА КАРТОЧЕК ДЛЯ ЗАГРУЗКИ
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, { 
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => { // затем из полученного ответа
      if(res.ok) { // если ответ ок
        return res.json(); // вернуть результат json
      } else {      
        return Promise.reject(`Ошибка: ${res.status}`);
      } // Вернуть отклоненный промис, если не ок
    })
    .catch((err) => { // если запрос не ушел
      console.log(err); // выведем ошибку в консоль
    });
  }

  postCard({name, link}) {
    this._name = name;
    this._link = link;
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this._name,
        link: this._link
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      } // Вернуть отклоненный промис, если не ок
    })
    .catch((err) => { // если запрос не ушел
      console.log(err); // выведем ошибку в консоль
    });
  }

  deleteCard(cardId) {
    this._cardId = cardId;
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${this._cardId}`, {  
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    })
    .then((res) => { // затем из полученного ответа
      if(res.ok) {  // если с ответом все ок
        return res.json(); // вернуть результат json
      } else {      
        return Promise.reject(`Ошибка: ${res.status}`);
      } // Вернуть отклоненный промис, если не ок
    })
    .catch((err) => { // если запрос не ушел
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  addLike(id) {
    this._id = id;
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${this._id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
      },
    })
    .then((res) => {
      if(res.ok) {
        console.log('лайк добавлен');
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => { // если запрос не ушел
      console.log(err); // выведем ошибку в консоль
    });

  }
  
  removeLike(id) {
    this._id = id;
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${this._id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    })
    .then((res) => {
      if(res.ok) {
        console.log('лайк убран');
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => { // если запрос не ушел
      console.log(err); // выведем ошибку в консоль
    });
  }

}