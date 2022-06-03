export default class Section {
  constructor({renderer}, containerSelector) {
    this._container = document
    .querySelector(containerSelector);
    this._rendered = renderer
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.forEach(item =>
      this._rendered(item));
  }
}
