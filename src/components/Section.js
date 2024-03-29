export default class Section {
  constructor({data, renderer}, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  
  addItem(element) {
    this._container.append(element);
  }

  renderItems(myId) {
    this._myId = myId;
    this._renderedItems.forEach(item => {
      this._renderer(item, this._myId);
    });
  }

  refreshData(newData) {
    this._renderedItems = newData;
    console.log('Список карточек обновлен');
  }
  
  prependCard(element) {
    this._container.prepend(element);
  }

}  