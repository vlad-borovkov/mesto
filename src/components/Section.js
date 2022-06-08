export default class Section {
  constructor({renderer}, containerSelector) {
    this._container = document
    .querySelector(containerSelector);
    this._rendered = renderer
  }

  addItemAppend(element) {
    this._container.append(element);
  }

  addItemPrepend(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.forEach( item =>
      this._rendered(item));
  }
}
