class Card {
  constructor(placeData, placeSelector, openPopup, popupIllustration, illustrationImage, illustrationName) {
      this._name = placeData.name;
      this._link = placeData.link;
      this._placeSelector = placeSelector;
      this._openPopup = openPopup;
      this._popupIllustration = popupIllustration;
      this._illustrationImage = illustrationImage;
      this._illustrationName = illustrationName;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._placeSelector)
      .content
      .cloneNode(true);

    return placeElement;
  }

  createPlaceCard() {
    this._placeElement = this._getTemplate();
    this._placeImage = this._placeElement.querySelector('.place__image');
    this._placeImage.src = this._link;
    this._placeImage.alt = this._name;
    this._placeElement.querySelector('.place__title').textContent = this._name;

    this._setEventListeners();

    return this._placeElement;
  }

  _setEventListeners() {
    this._placeImage.addEventListener('click', () => this._openIllustration() );
    this._placeElement.querySelector('.place__remove-button').addEventListener('click', this._removeElement);
    this._placeElement.querySelector('.place__like-button').addEventListener('click', this._toggleLike);
  }

  _removeElement(event) {
    event.target.closest('.place').remove();
  }

  _toggleLike(event) {
    event.currentTarget.classList.toggle('place__like-button_active');
  }

  _openIllustration() {
    this._illustrationImage.src = this._link;
    this._illustrationImage.alt = this._name;
    this._illustrationName.textContent = this._name;

    this._openPopup(this._popupIllustration);
  }
}

export { Card };
